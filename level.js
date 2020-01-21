var lvl, mountains, ground, moon, stars, sword;

function initializeLevel() {
  lvl = {
    score: 0,
    startX: -5,
    endX: 7000,
    flagpole: {
      x: 6950,
      isReached: false
    },
    sky: {
      fill: [22, 27, 34]
    },
    ground: {
      y: height - height / 4.0,
      fill: [194, 178, 128],
      darkFill: [146, 125, 85],
      bounds: []
    },
    mountains: {
      objects: []
    },
    moon: {
      x: 720,
      y: 90,
      diameter: 90,
      fill: 210
    },
    trees: {
      objects: []
    },
    stars: {
      count: 50,
      fill: [255, 255, 255, 205],
      objects: []
    },
    clouds: {
      objects: []
    },
    sword: {
      handleFill: [30, 0, 140],
      jewelFill: [127, 0, 14],
      bladeFill: 170,
      height: 12.5,
      isFound: false,
      value: 1
    },
    canyons: [],
    coins: []
  };

  buildGround();
  buildTrees();
  buildMountains();
  buildStars();
  buildClouds();
  buildSword();
  buildCoins();
}

function drawLevel() {
  background(lvl.sky.fill);

  drawStars();
  drawSky();
  drawMountains();
  drawGround();
  drawTrees();
  drawClouds();
  drawSword(lvl.sword.x, lvl.sword.y);
  drawCoins();
  drawFlagpole();
}

function buildGround() {
  var startX = lvl.startX;
  var endX;

  for (var i = 100; i < lvl.endX; i += 800) {
    var canyonStart = i + round(random(0, 60));
    var canyonEnd = canyonStart + round(random(50, 120));
    lvl.canyons.push([canyonStart, canyonEnd]);
  }

  for (var c = 0; c < lvl.canyons.length; c++) {
    var canyon = lvl.canyons[c];
    lvl.ground.bounds.push([startX, canyon[0]]);
    startX = canyon[1];

    if (c === lvl.canyons.length - 1) {
      lvl.ground.bounds.push([canyon[1], lvl.endX]);
    }
  }
}

function buildCoins() {
  var coinBounds = lvl.ground.bounds.slice(1, lvl.ground.bounds.length - 1);

  for (var c = 0; c < coinBounds.length; c++) {
    for (var n = 0; n < 2; n++) {
      var coinBound = coinBounds[c];
      var coinX = random(coinBound[0], coinBound[1]);
      var coinY = random(lvl.ground.y, lvl.ground.y - 100);

      lvl.coins.push({
        x: coinX,
        y: coinY,
        isFound: false,
        value: 1,
        size: round(random(1, 3))
      });
    }
  }
}

function drawFlagpole() {
  stroke(100);
  strokeWeight(4);
  line(lvl.flagpole.x, lvl.ground.y, lvl.flagpole.x, lvl.ground.y - 150);
  strokeWeight(0);

  var y = lvl.ground.y;

  fill(255, 204, 150);

  if (lvl.flagpole.isReached) {
    fill(105, 204, 150);
    y -= 130;
  }

  triangle(lvl.flagpole.x, y, lvl.flagpole.x, y - 20, lvl.flagpole.x + 20, y - 10);
}

function drawCoins() {
  for (var c = 0; c < lvl.coins.length; c++) {
    var coin = lvl.coins[c];
    if (coin.isFound) continue;
    stroke(255, 215, 0);
    strokeWeight(random(coin.size * 4, coin.size * 8));
    point(coin.x, coin.y);
  }

  noStroke();
}

function buildSword() {
  var swordBounds = lvl.ground.bounds[1];
  lvl.sword.x = random(swordBounds[0], swordBounds[1]);
  lvl.sword.y = lvl.ground.y - 12.5;
}

function drawSword(x, y) {
  if (lvl.sword.isFound) return;

  fill(lvl.sword.bladeFill);
  rect(x, y, 4, 12.5);
  triangle(x + 2, y + 15, x, y + 12.5, x + 4, y + 12.5);
  fill(lvl.sword.handleFill);
  rect(x - 5, y - 1, 14, 1);
  rect(x + 1, y - 6, 2, 5);
  fill(lvl.sword.jewelFill);
  quad(x + 2, y - 4, x + 3.5, y - 6, x + 2, y - 8, x + 0.5, y - 6);
}

function buildMountains() {
  var bounds = lvl.ground.bounds;

  for (var i = 0; i < bounds.length; i++) {
    var bound = bounds[i];
    var mountainCount = bound[1] - bound[0] < 500 ? 0 : round(random(0, 2));

    for (var m = 1; m <= mountainCount; m += 1) {
      var x = random(bound[0], bound[1] - 250);
      var y = random(height / 3.0, height / 1.25);
      var width = random(200, 450);

      var mountain = {
        x: x,
        y: y,
        width: width,
        fill: random(40, 55)
      };

      lvl.mountains.objects.push(mountain);
    }
  }
}

function drawMountains() {
  for (var m = 0; m < lvl.mountains.objects.length; m++) {
    var mountain = lvl.mountains.objects[m];

    noStroke();
    fill(mountain.fill);
    triangle(
      mountain.x,
      height,
      mountain.x + mountain.width,
      height,
      mountain.x + mountain.width / 2,
      height - mountain.y
    );
  }
}

function drawGround() {
  noStroke();

  var y = lvl.ground.y;

  for (var b = 0; b < lvl.ground.bounds.length; b++) {
    var bounds = lvl.ground.bounds[b];

    var startX = bounds[0];
    var endX = bounds[1];

    fill(lvl.ground.fill);
    rect(startX, y, endX - startX + 5, height - y);

    fill(lvl.ground.darkFill);
    rect(startX + 5, y + 5, endX - startX, height - y);

    fill(lvl.sky.fill);
    for (var x = startX; x < endX; x += 10) {
      quad(x, y, x + 5, y, x + 10, y + 5, x + 5, y + 5);
    }
  }

  noStroke();
}

function buildStars() {
  for (i = 0; i < lvl.stars.count * (lvl.endX / width); i += 1) {
    lvl.stars.objects.push({
      strokeWeight: random(6),
      x: random(lvl.endX),
      y: random(height)
    });
  }
}

function drawStars() {
  stroke(lvl.stars.fill);

  for (var s = 0; s < lvl.stars.objects.length; s++) {
    var star = lvl.stars.objects[s];

    strokeWeight(star.strokeWeight);
    point(star.x, star.y);
  }
}

function buildClouds() {
  for (var i = 0; i < (lvl.endX / width) * 4; i += 1) {
    var x = random(0, lvl.endX);
    var y = random(0, lvl.ground.y - 300);

    lvl.clouds.objects.push({
      fill: lvl.moon.fill - random(100, 150),
      layers: [
        { x: x, y: y + 40, w: random(80, 120), h: 7 },
        {
          x: x + random(5, 15),
          y: y + 37,
          w: random(80, 120),
          h: random(5, 10)
        },
        {
          x: x + random(5, 15) * 2,
          y: y + 35,
          w: random(80, 120),
          h: random(5, 10)
        },
        {
          x: x + random(5, 15) * 3,
          y: y + 37,
          w: random(80, 120),
          h: random(5, 10)
        },
        {
          x: x + random(5, 15) * 4,
          y: y + 40,
          w: random(80, 120),
          h: random(5, 10)
        }
      ]
    });
  }
}

function drawClouds() {
  for (var c = 0; c < lvl.clouds.objects.length; c++) {
    drawCloud(lvl.clouds.objects[c]);
  }
}

function drawCloud(cloud) {
  fill(cloud.fill);

  for (var l = 0; l < cloud.layers.length; l++) {
    var layer = cloud.layers[l];
    ellipse(layer.x, layer.y, layer.w, layer.h);
  }
}

function buildTrees() {
  var bounds = lvl.ground.bounds;

  for (var i = 0; i < bounds.length; i++) {
    var bound = bounds[i];
    var treeCount = (bound[1] - bound[0]) / 150 + round(random(-1, 1));

    for (var t = 1; t <= treeCount; t += 1) {
      var x = random(bound[0], bound[1]);
      var branchCount = random(2, 4);
      var branchHeight = random(10, 14);
      var trunkHeight = random(3, 25);

      var tree = {
        x: x,
        y: lvl.ground.y,
        branchCount: branchCount,
        branchWidth: random(20, 40),
        trunkWidth: random(10, 20),
        branchHeight: branchHeight,
        trunkHeight: trunkHeight,
        branchColor: [80, random(50, 90), 30],
        trunkColor: [random(50, 80), random(10, 30), 14]
      };

      lvl.trees.objects.push(tree);
    }
  }
}

function drawTrees() {
  for (var t = 0; t < lvl.trees.objects.length; t++) {
    drawTree(lvl.trees.objects[t]);
  };
}

function drawTree(tree) {
  fill(tree.trunkColor);

  var trunkTop = tree.y - tree.trunkHeight;
  rect(
    tree.x - tree.trunkWidth / 2,
    trunkTop,
    tree.trunkWidth,
    tree.trunkHeight
  );

  fill(tree.branchColor);

  for (var i = 0; i < round(tree.branchCount); i += 1) {
    var totalHeight = tree.branchHeight * tree.branchCount;

    triangle(
      tree.x,
      tree.y - tree.branchHeight - totalHeight - tree.trunkHeight,
      tree.x - tree.branchWidth,
      tree.y - tree.branchHeight * i - tree.trunkHeight,
      tree.x + tree.branchWidth,
      tree.y - tree.branchHeight * i - tree.trunkHeight
    );
  }
}

function drawSky() {
  noStroke();

  fill(lvl.sky.fill);
  ellipse(lvl.moon.x, lvl.moon.y, lvl.moon.diameter + 10);
  fill(lvl.moon.fill);
  ellipse(lvl.moon.x, lvl.moon.y, lvl.moon.diameter);
}
