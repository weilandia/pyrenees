// game can be played at https://weilandia.github.io/pyrenees/
// character code is loaded from ./character.js
// level code is loaded from ./level.js

var scrollPos;
var character;
var lvl;

function startGame() {
  character.startGame(10, lvl.ground.y);
  scrollPos = 0;
}

function resetGame() {
  character = new Character(width, height)
  lvl = new Level(width, height);
  lvl.setup();
  startGame();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}

function draw() {
  push();

  translate(scrollPos, 1);
  lvl.draw();
  character.draw();

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
    character.score += lvl.sword.value;
  }

  for (var c = 0; c < lvl.coins.length; c++) {
    var coin = lvl.coins[c];

    if (dist(character.x, character.y, coin.x, coin.y) < 50 && coin.isFound === false) {
      lvl.coins[c].isFound = true;
      character.score += coin.value;
    }
  }
}

function handleCanyons() {
  if (!character.isPlummeting) {
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
  } else {
    character.y += 5;
  }
}

function drawScoreIndicator() {
  fill(255);
  textSize(30);
  text(character.score, width - 100, 50);
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

  character.keyPressed(keyCode);

  return false;
}

function keyReleased() {
  character.keyReleased(keyCode);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
