// game can be played at https://weilandia.github.io/pyrenees/
// character code is loaded from ./character.js
// level code is loaded from ./level.js

var scrollPos;

function startGame() {
  character.x = 10;
  character.y = lvl.ground.y;
  character.isPlummeting = false;

  scrollPos = 0;
}

function resetGame() {
  character.lives = 3;
  initializeLevel();
  startGame();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}

function draw() {
  push();

  translate(scrollPos, 1);
  drawLevel();
  drawCharacter();

  pop();

  if (character.lives < 1) {
    gameOver();
    return;
  }

  if (lvl.flagpole.isReached) {
    levelComplete();
    return;
  } else {
    checkFlagpole();
  }

  handleMovement();
  handleCanyons();
  handleItemCollection();

  checkPlayerDie();

  drawScoreIndicator();
  drawLifeIndicator();
}

function handleMovement() {
  if (character.isLeft) {
    character.x = constrain(character.x - 4, 5, lvl.endX - 10);

    if (character.x > width * 0.8 && scrollPos < 0) {
      scrollPos += 4;
    }
  }

  if (character.isRight && character.x < lvl.endX - 10) {
    character.x = constrain(character.x + 4, 0, lvl.endX - 10);

    if (character.x > width * 0.8 && scrollPos > -(lvl.endX - width)) {
      scrollPos -= 4;
    }
  }

  if (character.y < lvl.ground.y) {
    character.isFalling = true;
    character.y += 2;
  } else {
    character.isFalling = false;
  }
}

function handleItemCollection() {
  if (dist(character.x, character.x, lvl.sword.x, character.x) < 5 && lvl.sword.isFound === false) {
    lvl.sword.isFound = true;
    lvl.score += lvl.sword.value;
  }

  for (var c = 0; c < lvl.coins.length; c++) {
    var coin = lvl.coins[c];

    if (dist(character.x, character.y, coin.x, coin.y) < 50 && coin.isFound === false) {
      lvl.coins[c].isFound = true;
      lvl.score += coin.value;
    }
  }
}

function handleCanyons() {
  for (var c = 0; c < lvl.canyons.length; c ++) {
    var canyon = lvl.canyons[c];

    if (
      character.x >= canyon[0] &&
      character.x < canyon[1] &&
      character.y === lvl.ground.y
    ) {
      character.isPlummeting = true;
    }
  }

  if (character.isPlummeting) {
    character.y += 5;
  }
}

function drawScoreIndicator() {
  fill(255);
  textSize(30);
  text(lvl.score, width - 100, 50);
}

function drawLifeIndicator() {
  for (var l = 0; l < character.lives; l++) {
    stroke([0, 255, 0, 50]);

    if (character.lives < 2) {
      stroke([255, 0, 0, 50]);
    }

    strokeWeight(30);
    point(25 + l * 40, 40);
    noStroke();
  }
}

function levelComplete() {
  fill(255);
  textSize(100);
  text('Level complete!', 5, 100);
  textSize(20);
  text('Press space to continue.', 10, 130);
}

function gameOver() {
  fill(255);
  textSize(100);
  text('Game Over', 5, 100);
  textSize(20);
  text('Press space to continue.', 10, 130);
}

function checkPlayerDie() {
  if (character.y >= height && character.lives > 0) {
    character.lives -= 1;
    startGame();
  }
}

function checkFlagpole() {
  if (dist(character.x, character.x, lvl.flagpole.x, character.x) < 5 && lvl.flagpole.isReached === false) {
    lvl.flagpole.isReached = true;
  }
}

function keyPressed() {
  if (lvl.flagpole.isReached || character.lives < 1) {
    keyCode == 32 && resetGame();
    return;
  }

  if (keyCode == 32 && character.y === lvl.ground.y) {
    character.y -= 100;
  }

  if (keyCode === LEFT_ARROW) {
    character.isLeft = true;
  }

  if (keyCode === RIGHT_ARROW) {
    character.isRight = true;
  }

  return false;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    character.isLeft = false;
  }

  if (keyCode === RIGHT_ARROW) {
    character.isRight = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
