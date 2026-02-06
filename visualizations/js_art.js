const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let W, H;
const lineW = 10; //line width in px

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.width * (650 / 700); // keep original aspect ratio

  W = canvas.width;
  H = canvas.height;

  drawCat();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function clearCanvas() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
}

function drawEllipse(cx, cy, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.lineWidth = lineW;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

function drawPolyline(points) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.lineWidth = lineW;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

function drawCat() {
  clearCanvas();

  // head
  drawEllipse(
    W * 0.52, //multipliers are percentages from the edges (left/top)
    H * 0.60,
    W * 0.38,
    H * 0.26
  );

  // left ear
  drawPolyline([
    [W * 0.14, H * 0.30],
    [W * 0.30, H * 0.39],
    [W * 0.18, H * 0.48],
    [W * 0.14, H * 0.30]
  ]);

  // right ear
  drawPolyline([
    [W * 0.74, H * 0.18],
    [W * 0.74, H * 0.38],
    [W * 0.60, H * 0.35],
    [W * 0.74, H * 0.18]
  ]);

  // eyes
  drawPolyline([
    [W * 0.34, H * 0.54],
    [W * 0.38, H * 0.48],
    [W * 0.42, H * 0.54]
  ]);

  drawPolyline([
    [W * 0.54, H * 0.54],
    [W * 0.58, H * 0.48],
    [W * 0.62, H * 0.54]
  ]);
}

drawCat();
