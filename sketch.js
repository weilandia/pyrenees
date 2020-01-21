// game can be played at https://weilandia.github.io/pyrenees/

var gameCharX;
var gameCharY;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var scrollPos;

function startGame() {
  // ./level.js
  initializeLevel();

  gameCharX = 10;
  gameCharY = lvl.ground.y;
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  scrollPos = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startGame();
}

function draw() {
  push();
  translate(scrollPos, 1);
  drawLevel();

  // ./character.js
  drawCharacter({
    isLeft: isLeft,
    isRight: isRight,
    isFalling: isFalling,
    isPlummeting: isPlummeting
  });

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

  if (isLeft) {
    gameCharX = constrain(gameCharX - 4, 5, lvl.endX - 10);

    if (gameCharX > width * 0.8 && scrollPos < 0) {
      scrollPos += 4;
    }
  }

  if (isRight && gameCharX < lvl.endX - 10) {
    gameCharX = constrain(gameCharX + 4, 0, lvl.endX - 10);

    if (gameCharX > width * 0.8 && scrollPos > -(lvl.endX - width)) {
      scrollPos -= 4;
    }
  }

  if (gameCharY < lvl.ground.y) {
    isFalling = true;
    gameCharY += 2;
  } else {
    isFalling = false;
  }

  if (dist(gameCharX, gameCharX, lvl.sword.x, gameCharX) < 5 && lvl.sword.isFound === false) {
    lvl.sword.isFound = true;
    lvl.score += lvl.sword.value;
  }

  for (var c = 0; c < lvl.coins.length; c++) {
    var coin = lvl.coins[c];

    if (dist(gameCharX, gameCharY, coin.x, coin.y) < 50 && coin.isFound === false) {
      lvl.coins[c].isFound = true;
      lvl.score += coin.value;
    }
  }

  for (var c = 0; c < lvl.canyons.length; c ++) {
    var canyon = lvl.canyons[c];

    if (
      gameCharX >= canyon[0] &&
      gameCharX < canyon[1] &&
      gameCharY === lvl.ground.y
    ) {
      isPlummeting = true;
    }
  }

  if (isPlummeting) {
    gameCharY += 5;
  }

  checkPlayerDie();

  fill(255);
  textSize(30);
  text(lvl.score, width - 100, 50);

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

function resetGame() {
  character.lives = 3;
  startGame();
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
  if (gameCharY >= height && character.lives > 0) {
    character.lives -= 1;
    startGame();
  }
}

function checkFlagpole() {
  if (dist(gameCharX, gameCharX, lvl.flagpole.x, gameCharX) < 5 && lvl.flagpole.isReached === false) {
    lvl.flagpole.isReached = true;
  }
}

function keyPressed() {
  if (lvl.flagpole.isReached || character.lives < 1) {
    keyCode == 32 && resetGame();
    return;
  }

  if (keyCode == 32 && gameCharY === lvl.ground.y) {
    gameCharY -= 100;
  }

  if (keyCode === LEFT_ARROW) {
    isLeft = true;
  }

  if (keyCode === RIGHT_ARROW) {
    isRight = true;
  }

  return false;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    isLeft = false;
  }

  if (keyCode === RIGHT_ARROW) {
    isRight = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
