var character = {
  x: -20,
  y: -20,
  score: 0,
  lives: 3,
  scale: 0.7,
  isLeft: false,
  isRight: false,
  isFalling: false,
  isPlummeting: false,
  colors: {
    tone: [228, 190, 120],
    tunic: 48,
    hat: [230, 32, 32],
    boots: [116, 87, 74]
  }
};

function chScale(n) {
  return character.scale * n;
}

function drawCharacter() {
  var profile = character.isLeft || character.isRight;
  var xDir = character.isLeft ? -1 : 1;
  var gameCharX = character.x;
  var gameCharY = character.y

  fill(character["colors"]["boots"]);
  if (character.isFalling) {
    ellipse(gameCharX - chScale(6), gameCharY - chScale(3), chScale(10), chScale(7));
    ellipse(gameCharX + chScale(6), gameCharY - chScale(3), chScale(10), chScale(7));
  } else {
    ellipse(gameCharX - chScale(6), gameCharY, chScale(10), chScale(7));
    ellipse(gameCharX + chScale(6), gameCharY, chScale(10), chScale(7));
  }

  fill(character["colors"]["tunic"]);
  if (profile) {
    rect(gameCharX - chScale(4), gameCharY - chScale(16), chScale(8), chScale(15));
    rect(gameCharX - chScale(4), gameCharY - chScale(20), chScale(8), chScale(15));
    rect(gameCharX - chScale(6), gameCharY - chScale(18), chScale(12), chScale(15));
  } else {
    rect(gameCharX - chScale(7.5), gameCharY - chScale(16), chScale(15), chScale(15));
    rect(gameCharX - chScale(7.5), gameCharY - chScale(20), chScale(15), chScale(15));
    rect(gameCharX - chScale(10), gameCharY - chScale(18), chScale(20), chScale(15));
  }

  fill(character["colors"]["tone"]);
  if (profile) {
    if (character.isFalling) {
      ellipse(gameCharX + chScale(5) * xDir, gameCharY - chScale(15), chScale(7));
    } else {
      ellipse(gameCharX + chScale(5) * xDir, gameCharY - chScale(13), chScale(7));
    }
  } else {
    if (character.isFalling) {
      ellipse(gameCharX - chScale(10), gameCharY - chScale(20), chScale(7));
      ellipse(gameCharX + chScale(10), gameCharY - chScale(15), chScale(7));
    } else {
      ellipse(gameCharX - chScale(10), gameCharY - chScale(13), chScale(7));
      ellipse(gameCharX + chScale(10), gameCharY - chScale(13), chScale(7));
    }
  }

  // head
  rect(gameCharX - chScale(5), gameCharY - chScale(28), chScale(10), chScale(10));
  rect(gameCharX - chScale(7), gameCharY - chScale(34), chScale(14), chScale(14));

  if (profile) {
    if (character.isLeft) {
      rect(gameCharX - chScale(8), gameCharY - chScale(29), chScale(1), chScale(3));
    } else {
      rect(gameCharX + chScale(7), gameCharY - chScale(29), chScale(1), chScale(3));
    }
  } else {
    rect(gameCharX - chScale(9), gameCharY - chScale(32), chScale(18), chScale(5));
  }

  // hat
  fill(character["colors"]["hat"]);
  rect(gameCharX - chScale(3.5), gameCharY - chScale(40), chScale(7), chScale(5));

  fill(character["colors"]["tunic"]);
  rect(gameCharX - chScale(7), gameCharY - chScale(38), chScale(14), chScale(5));

  // eyes
  if (profile) {
    if (character.isLeft) {
      rect(gameCharX - chScale(3), gameCharY - chScale(31), chScale(2), chScale(3));
    } else {
      rect(gameCharX + chScale(2), gameCharY - chScale(31), chScale(2), chScale(3));
    }
  } else {
    rect(gameCharX - chScale(4), gameCharY - chScale(31), chScale(2), chScale(3));
    rect(gameCharX + chScale(2), gameCharY - chScale(31), chScale(2), chScale(3));
  }

  // mouth
  if (profile) {
    if (character.isLeft) {
      rect(gameCharX - chScale(4.5), gameCharY - chScale(25), chScale(3), chScale(1));
    } else {
      rect(gameCharX + chScale(2.5), gameCharY - chScale(25), chScale(3), chScale(1));
    }
  } else {
    rect(gameCharX - chScale(2.5), gameCharY - chScale(25), chScale(5), chScale(1));
  }
}
