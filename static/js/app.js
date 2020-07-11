
//// TO DO ////
//// Connect to data
//// Choose a sample
// info out of sample
//// Use the D3 library to read in samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// for(var i=1; i<=24; i++){
//   d3.selectAll("#selDataset").
// }

// d3.selectAll("#selDataset").on("change", barPlot)

function Plots(sampleID) {

  // let dropDown = d3.selectAll("#selDataset");
  // let sampleID = dropDown.property("value")

  let url = "data/samples.json"
  let sampSize = 10
  d3.json(url).then(function(data){
    let sampleInfo = data
    let sample = +data.samples[sampleID].id
    let otuIDs = (data.samples[sampleID].otu_ids).slice(0,sampSize)
    let otuLabels = (data.samples[sampleID].otu_labels).slice(0,sampSize)
    let otuValues = (data.samples[sampleID].sample_values).slice(0,sampSize)
    console.log(sample)
    console.log(otuIDs)
    console.log(otuValues)
    console.log(otuLabels)
    console.log(sampleInfo)

    let IDs = []
    otuIDs.forEach(function(entry) {
      IDs.push("OTU"+entry)
    })
    console.log(IDs)

// Bar chart
    let trace1 = {
      type: "bar",
      y: IDs,
      x: otuValues,
      text: otuLabels,
      orientation: "h"
    };

    let barData = [trace1];
    let barLayout = {
      title: "Bar Chart!",
      yaxis: {autorange: 'reversed'}
    };

    Plotly.newPlot("bar",barData,barLayout);


// Bubble chart
    let trace2 = {
      x: IDs,
      y: otuValues,
      mode: "markers"
    };
    let bubbleData = [trace2];
    let bubbleLayout = {
      title: "Bubbles!"
    }
    Plotly.newPlot("bubble",bubbleData,bubbleLayout)
  })
}

Plots(1)
