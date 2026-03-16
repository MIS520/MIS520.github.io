import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;

const width = window.innerWidth;
const height = window.innerHeight;
const repelRadius = 100;

const catColors = ["orange", "gray", "black", "brown", "pink"];
let cats = [];

async function prepareVis() {
  svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "lightyellow");

  svg.append("text")
    .attr("id", "hint")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "24px")
    .text("click to start");
}

function drawCat(x, y) {
  const color = catColors[cats.length % catColors.length];

  const group = svg.append("g");

  // body
  group.append("ellipse")
    .attr("cx", x)
    .attr("cy", y + 15)
    .attr("rx", 18)
    .attr("ry", 12)
    .attr("fill", color);

  // head
  group.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 12)
    .attr("fill", color);

  // left ear
  group.append("polygon")
    .attr("points", `${x - 9},${y - 5} ${x - 15},${y - 15} ${x - 3},${y - 11}`)
    .attr("fill", color);

  // right ear
  group.append("polygon")
    .attr("points", `${x + 9},${y - 5} ${x + 15},${y - 15} ${x + 3},${y - 11}`)
    .attr("fill", color);

  // eyes
  group.append("circle").attr("cx", x - 4).attr("cy", y - 2).attr("r", 2).attr("fill", "black");
  group.append("circle").attr("cx", x + 4).attr("cy", y - 2).attr("r", 2).attr("fill", "black");

  // nose
  group.append("circle").attr("cx", x).attr("cy", y + 3).attr("r", 1.5).attr("fill", "pink");

  cats.push({ group, x, y });
}

async function drawVis() {
  svg.on("click", function (event) {
    d3.select("#hint").remove();
    const [x, y] = d3.pointer(event);
    drawCat(x, y);
  });

  svg.on("mousemove", function (event) {
    const [mx, my] = d3.pointer(event);

    cats.forEach(cat => {
      const dx = cat.x - mx;
      const dy = cat.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < repelRadius && dist > 0) {
        const moveX = (dx / dist) * (repelRadius - dist) * 0.3;
        const moveY = (dy / dist) * (repelRadius - dist) * 0.3;
        cat.x += moveX;
        cat.y += moveY;

        cat.group.attr("transform", `translate(${cat.x - mx + moveX}, ${cat.y - my + moveY})`);
      }
    });
  });
}

async function runApp() {
  await prepareVis();
  await drawVis();
}

runApp();