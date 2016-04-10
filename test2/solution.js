function intersects(fig1, fig2) {

  if (!isArray(fig1) || !isArray(fig2))
    return [];

  var result = [];

  var lines1 = pointsToLines(fig1);
  var lines2 = pointsToLines(fig2);

  //console.dir(lines1);

  for (var i = 0; i < lines1.length; i++) {
    for (var j = 0; j < lines2.length; j++) {
      var c = intersect(lines1[i], lines2[j]);
      if (c) {
        //result.push(c);
        result.push([
          {x:c.x - 2, y:c.y - 2},
          {x:c.x + 2, y:c.y - 2},
          {x:c.x + 2, y:c.y + 2},
          {x:c.x - 2, y:c.y + 2}
        ]);
      }
    }
  }

  return result;

  /*return [
    [
      { x: 60,  y: 240 },
      { x: 90,  y: 240 },
      { x: 120, y: 180 },
      { x: 90,  y: 90  },
      { x: 60,  y: 150 },
    ],
    [
      { x: 270, y: 240 },
      { x: 300, y: 240 },
      { x: 300, y: 150 },
      { x: 270, y: 90  },
      { x: 240, y: 180 },
    ],
    [
      { x: 150, y: 180 },
      { x: 180, y: 240 },
      { x: 210, y: 180 },
      { x: 210, y: 90  },
      { x: 180, y: 60  },
      { x: 150, y: 90  }
    ]
  ];*/
}

function isArray(value) {
    return (typeof value == "object") && (value instanceof Array);
}

function pointsToLines(points) {
  var lines = [];
  var len = points.length;
  for (var i = 0; i < len; i++) {
    lines.push({
      a:points[i],
      b:points[(i + 1) % len]
    });
  }
  return lines;
}

function intersect(line1, line2) {
  var m = ((line2.b.x - line2.a.x) * (line1.a.y - line2.a.y) - (line2.b.y - line2.a.y) * (line1.a.x - line2.a.x));
  var n = ((line2.b.y - line2.a.y) * (line1.b.x - line1.a.x) - (line2.b.x - line2.a.x) * (line1.b.y - line1.a.y));

  var Ua = m / n;

  if (n == 0) {
    if (m == 0) {
      //Прямые совпадают
    } else {
      //Прямые параллельны
    }
    return null;
  }

  var result = {
    x:line1.a.x + Ua * (line1.b.x - line1.a.x),
    y:line1.a.y + Ua * (line1.b.y - line1.a.y)
  };

  // Проверка попадания в интервал
  var a = (result.x >= line1.a.x && result.x <= line1.b.x) || (result.x >= line1.b.x && result.x <= line1.a.x);
  var c = (result.x >= line2.a.x && result.x <= line2.b.x) || (result.x >= line2.b.x && result.x <= line2.a.x);
  var e = (result.y >= line1.a.y && result.y <= line1.b.y) || (result.y >= line1.b.y && result.y <= line1.a.y);
  var g = (result.y >= line2.a.y && result.y <= line2.b.y) || (result.y >= line2.b.y && result.y <= line2.a.y);

  if (a && c && e && g) {
    //Прямые имеют точку пересечения
    return result;
  }

  return null;
}
