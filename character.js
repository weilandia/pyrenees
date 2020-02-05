function Character(width, height) {
  this.x = -20;
  this.y = -20;
  this.score = 0;
  this.lives = 3;
  this.size = height / 800;
  this.isLeft = false;
  this.isRight = false;
  this.isFalling = false;
  this.isPlummeting = false;
  this.colors = {
    tone: [228, 190, 120],
    tunic: 48,
    hat: [230, 32, 32],
    boots: [116, 87, 74]
  };

  this.startGame = function(x, y) {
    this.x = x;
    this.y = y;
    this.isPlummeting = false;
  }

  this.keyPressed = function(keyCode) {
    if (keyCode == 32 && character.y === lvl.ground.y) {
      character.y -= 100;
    }

    if (keyCode === LEFT_ARROW) {
      character.isLeft = true;
    }

    if (keyCode === RIGHT_ARROW) {
      character.isRight = true;
    }
  }

  this.keyReleased = function(keyCode) {
    if (keyCode === LEFT_ARROW) {
      character.isLeft = false;
    }

    if (keyCode === RIGHT_ARROW) {
      character.isRight = false;
    }
  }

  this.scale = function(n) {
    return this.size * n;
  };

  this.draw = function() {
    var profile = this.isLeft || this.isRight;
    var xDir = this.isLeft ? -1 : 1;

    fill(this.colors.boots);
    if (this.isFalling) {
      ellipse(this.x - this.scale(6), this.y - this.scale(3), this.scale(10), this.scale(7));
      ellipse(this.x + this.scale(6), this.y - this.scale(3), this.scale(10), this.scale(7));
    } else {
      ellipse(this.x - this.scale(6), this.y, this.scale(10), this.scale(7));
      ellipse(this.x + this.scale(6), this.y, this.scale(10), this.scale(7));
    }

    fill(this.colors.tunic);
    if (profile) {
      rect(this.x - this.scale(4), this.y - this.scale(16), this.scale(8), this.scale(15));
      rect(this.x - this.scale(4), this.y - this.scale(20), this.scale(8), this.scale(15));
      rect(this.x - this.scale(6), this.y - this.scale(18), this.scale(12), this.scale(15));
    } else {
      rect(this.x - this.scale(7.5), this.y - this.scale(16), this.scale(15), this.scale(15));
      rect(this.x - this.scale(7.5), this.y - this.scale(20), this.scale(15), this.scale(15));
      rect(this.x - this.scale(10), this.y - this.scale(18), this.scale(20), this.scale(15));
    }

    fill(this.colors.tone);
    if (profile) {
      if (this.isFalling) {
        ellipse(this.x + this.scale(5) * xDir, this.y - this.scale(15), this.scale(7));
      } else {
        ellipse(this.x + this.scale(5) * xDir, this.y - this.scale(13), this.scale(7));
      }
    } else {
      if (this.isFalling) {
        ellipse(this.x - this.scale(10), this.y - this.scale(20), this.scale(7));
        ellipse(this.x + this.scale(10), this.y - this.scale(15), this.scale(7));
      } else {
        ellipse(this.x - this.scale(10), this.y - this.scale(13), this.scale(7));
        ellipse(this.x + this.scale(10), this.y - this.scale(13), this.scale(7));
      }
    }

    // head
    rect(this.x - this.scale(5), this.y - this.scale(28), this.scale(10), this.scale(10));
    rect(this.x - this.scale(7), this.y - this.scale(34), this.scale(14), this.scale(14));

    if (profile) {
      if (this.isLeft) {
        rect(this.x - this.scale(8), this.y - this.scale(29), this.scale(1), this.scale(3));
      } else {
        rect(this.x + this.scale(7), this.y - this.scale(29), this.scale(1), this.scale(3));
      }
    } else {
      rect(this.x - this.scale(9), this.y - this.scale(32), this.scale(18), this.scale(5));
    }

    // hat
    fill(this.colors.hat);
    rect(this.x - this.scale(3.5), this.y - this.scale(40), this.scale(7), this.scale(5));

    fill(this.colors.tunic);
    rect(this.x - this.scale(7), this.y - this.scale(38), this.scale(14), this.scale(5));

    // eyes
    if (profile) {
      if (this.isLeft) {
        rect(this.x - this.scale(3), this.y - this.scale(31), this.scale(2), this.scale(3));
      } else {
        rect(this.x + this.scale(2), this.y - this.scale(31), this.scale(2), this.scale(3));
      }
    } else {
      rect(this.x - this.scale(4), this.y - this.scale(31), this.scale(2), this.scale(3));
      rect(this.x + this.scale(2), this.y - this.scale(31), this.scale(2), this.scale(3));
    }

    // mouth
    if (profile) {
      if (this.isLeft) {
        rect(this.x - this.scale(4.5), this.y - this.scale(25), this.scale(3), this.scale(1));
      } else {
        rect(this.x + this.scale(2.5), this.y - this.scale(25), this.scale(3), this.scale(1));
      }
    } else {
      rect(this.x - this.scale(2.5), this.y - this.scale(25), this.scale(5), this.scale(1));
    }
  };
};
