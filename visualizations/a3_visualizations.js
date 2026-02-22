console.log("JS loaded. vl:", typeof vl, "d3:", typeof d3, "vegaEmbed:", typeof vegaEmbed);

async function fetchData() {
  const csvPath = "./Assignment_3_Analysis.csv";
  console.log("Trying CSV:", csvPath);

  const data = await d3.csv(csvPath, d3.autoType);

  console.log("Loaded rows:", data.length);
  console.log("First row keys:", Object.keys(data[0] || {}));
  return data;
}

fetchData()
  .then((data) => {
    // V1: Global Sales by Genre and Platform
    const v1 = vl
      .markPoint({ filled: false })
      .data(data)
      .encode(
        vl.y().fieldN("Genre").title("Genre"),
        vl.x().fieldN("Platform").title("Platform"),
        vl.size().fieldQ("Global_Sales").aggregate("sum").title("Sum of Global_Sales"),
        vl.tooltip([
          { field: "Genre", type: "nominal" },
          { field: "Platform", type: "nominal" },
          { field: "Global_Sales", type: "quantitative", aggregate: "sum", title: "Sum Global Sales" },
        ])
      )
      .width("container")
      .height(380)
      .toSpec();

    // V2: markRect, avg Global sales by Platform, colored by Genre
    const v2 = vl
      .markRect()
      .data(data)
      .encode(
        vl.y().fieldN("Platform").sort("-x").title("Platform"),
        vl.x().fieldQ("Global_Sales").aggregate("average").title("Average Global Sales (M)"),
        vl.color().fieldN("Genre").title("Genre"),
        vl.tooltip([
          { field: "Platform", type: "nominal" },
          { field: "Genre", type: "nominal" },
          { field: "Global_Sales", type: "quantitative", aggregate: "average", title: "Avg Global Sales (M)" },
        ])
      )
      .width("container")
      .height(420)
      .toSpec();

    // V3: Regional Sales vs. Platform
    const v3 = vl
      .markPoint({ filled: false })
      .data(data)
      .encode(
        vl.y().fieldN("Platform").title("Platform"),
        vl.x().fieldQ("NA_Sales").aggregate("average").title("Average of NA_Sales"),
        vl.color().fieldQ("EU_Sales").aggregate("average").title("Average of EU_Sales"),
        vl.size().fieldQ("JP_Sales").aggregate("average").title("Average of JP_Sales"),
        vl.tooltip([
          { field: "Platform", type: "nominal" },
          { field: "NA_Sales", type: "quantitative", aggregate: "average", title: "Avg NA" },
          { field: "EU_Sales", type: "quantitative", aggregate: "average", title: "Avg EU" },
          { field: "JP_Sales", type: "quantitative", aggregate: "average", title: "Avg JP" },
        ])
      )
      .width("container")
      .height(420)
      .toSpec();

    // V4: Shooter only, total sales over Year, colored by Platform
    const v4 = vl
      .markLine()
      .data(data)
      .transform(vl.filter('datum["Genre"] == "Shooter"'))
      .encode(
        vl.x().fieldQ("Year").title("Year"),
        vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Shooter Sales (M)"),
        vl.color().fieldN("Platform").title("Platform"),
        vl.tooltip([
          { field: "Year", type: "quantitative" },
          { field: "Platform", type: "nominal" },
          { field: "Global_Sales", type: "quantitative", aggregate: "sum", title: "Total Shooter Sales (M)" },
        ])
      )
      .width("container")
      .height(420)
      .toSpec();

    render("#view", v1);
    render("#view2", v2);
    render("#view3", v3);
    render("#view4", v4);
  })
  .catch((err) => {
    console.error("FAILED (data load or render):", err);
  });

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec, { actions: false });
  result.view.run();
}