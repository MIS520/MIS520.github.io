import define1 from "./26670360aa6f343b@226.js";
import define2 from "./701d3341aea4345e@298.js";

function _1(md){return(
md`# Assignment 3: Vega-Lite Visualizations`
)}

function _videoGamesFile(FileAttachment){return(
FileAttachment("Assignment_3_Analysis.csv")
)}

function _videoGamesData(videoGamesFile){return(
videoGamesFile.csv({typed: true})
)}

function _7(md){return(
md`## Step 2: Visual Explorations with Vega-Lite`
)}

function _8(md){return(
md`### V1: Global Sales by Genre and Platform`
)}

function _9(vl,videoGamesData){return(
vl.markPoint()
  .data(videoGamesData)
  .encode(
    vl.y().field('Genre').type('nominal'),
    vl.x().field('Platform').type('nominal'),
    vl.size().field('Global_Sales').type('quantitative').aggregate('sum')
  )
  .render()
)}

function _10(md){return(
md`Q: Which genres generate the highest total global sales across different platforms?, Which platforms perform strongest for specific genres? <br>
Reflection:
- Action and Sports consistently show larger bubbles across multiple platforms, suggesting they dominate global sales
- Certain platforms like PS2, PS3, Wii, and X360 have noticeably larger totals across several genres.
- Some genre platform combinations are strong outliers, meaning success is concentrated rather than evenly spread
- Older or less popular platforms show very small totals, indicating limited overall impact.
- Sales dominance seems driven by specific high performing genre platform pairings rather than uniform success across all categories.`
)}

function _11(md){return(
md`### V2: Sales Over Time by Platform and Genre`
)}

function _12(vl,videoGamesData){return(
vl.markRect()
  .data(videoGamesData)
  .encode(
    vl.y().fieldN("Platform").sort("-x"),
    vl.x().fieldQ("Global_Sales").aggregate("average").title("Average Global Sales (M)"),
    vl.size().aggregate("count").title("Count of Records"),
    vl.color().fieldN("Genre").title("Genre")
  )
  .render()
)}

function _13(md){return(
md`### V3: Regional Sales vs. Platform `
)}

function _14(vl,videoGamesData){return(
vl.markPoint()
  .data(videoGamesData)
  .encode(
    vl.y().fieldN("Platform"),
    vl.x().fieldQ("NA_Sales").aggregate("average"),
    vl.color().fieldQ("EU_Sales").aggregate("average"),
    vl.size().fieldQ("JP_Sales").aggregate("average")
  )
  .render()
)}

function _15(vl,videoGamesData){return(
vl.markLine()
  .data(videoGamesData)
  .transform(
    vl.filter('datum["Genre"] == "Shooter"')
  )
  .encode(
    vl.x().fieldQ("Year").title("Year"),
    vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Shooter Sales (M)"),
    vl.color().fieldN("Platform").title("Platform")
  )
  .render()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Assignment_3_Analysis.csv", {url: new URL("./files/60d26fd69d1aeb437be920fed911545f7f2ddc68284ef9ce5d0183a7e3c1f5e2f0182df0c3e79cbae25f03048486fe06012d0a257d45d7eb143cd517c6f4af44.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  const child2 = runtime.module(define2);
  main.import("printTable", child2);
  const child3 = runtime.module(define2);
  main.import("printTableTypes", child3);
  main.variable(observer("videoGamesFile")).define("videoGamesFile", ["FileAttachment"], _videoGamesFile);
  main.variable(observer("videoGamesData")).define("videoGamesData", ["videoGamesFile"], _videoGamesData);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["vl","videoGamesData"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["vl","videoGamesData"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["vl","videoGamesData"], _14);
  main.variable(observer()).define(["vl","videoGamesData"], _15);
  return main;
}
