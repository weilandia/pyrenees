var gameCharX;
var gameCharY;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var scrollPos;

function reset() {
  initializeSetting();

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
  reset();
}

function draw() {
  push();
  translate(scrollPos, 1);
  drawSetting();

  character({
    isLeft: isLeft,
    isRight: isRight,
    isFalling: isFalling,
    isPlummeting: isPlummeting
  });

  pop();

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
  
  if (gameCharY >= height) {
    fill(255);
    textSize(100);
    text('Game Over', 5, 100);
    textSize(20);
    text('Press any key to start over.', 10, 130);
  }
  
  if (gameCharX >= lvl.endX - 20) {
    fill(255);
    textSize(100);
    text('Finished!', 5, 100);
    textSize(20);
    text('Press any key to start over.', 10, 130);
  }
  
  fill(255);
  textSize(30);
  text(lvl.score, width - 100, 50);
}

function keyPressed() {
  if (keyCode == 32 && gameCharY === lvl.ground.y) {
    gameCharY -= 100;
  }

  if (keyCode === LEFT_ARROW) {
    isLeft = true;
  }

  if (keyCode === RIGHT_ARROW) {
    isRight = true;
  }
  
  if (gameCharY >= height || gameCharX >= lvl.endX - 20) {
    reset();
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
