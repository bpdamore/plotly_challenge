
//// TO DO ////
//// Connect to data
//// Choose a sample
// info out of sample
//// Use the D3 library to read in samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
// Add p in div with id sample-metadata
// define the data url
const url = "data/samples.json"
d3.json(url).then(function(data){

  function init() {
    Plots(0)
  };
  let samps = data.names
  samps.forEach(function(name){
    d3.selectAll("#selDataset")
    .append("option").text(name)
  })

  let selection = d3.selectAll("#selDataset");

  console.log(selection.node().value);
  
  selection.on("change", function() {
    let num = selection.node().value
    samps.forEach(function(d,i){
      if(num === d){
        Plots(i)
      }
    })
    })
    // Plots(num)


  function Plots(sampleID) {
    let sampSize = 10
      // Define variables for our graphs
    let sampleInfo = data
    let sample = +data.samples[sampleID].id
    let otuIDs = (data.samples[sampleID].otu_ids)
    let topOtuIDs = (data.samples[sampleID].otu_ids).slice(0,sampSize)
    let otuLabels = (data.samples[sampleID].otu_labels)
    let otuValues = (data.samples[sampleID].sample_values)
    let topOtuLabels = (data.samples[sampleID].otu_labels).slice(0,sampSize)
    let topOtuValues = (data.samples[sampleID].sample_values).slice(0,sampSize)
    // Define metadata for the Demographic Info
    let metaID = data.metadata[sampleID].id
    let metaBb = data.metadata[sampleID].bbtype
    let metaAge = data.metadata[sampleID].age
    let metaEth = data.metadata[sampleID].ethnicity
    let metaGen = data.metadata[sampleID].gender
    let metaLoc = data.metadata[sampleID].location
    let metaWFreq = data.metadata[sampleID].wfreq
    console.log(data)

    let IDs = []
    topOtuIDs.forEach(function(entry) {
      IDs.push("OTU"+entry)
    })
    console.log(IDs)

    metaData()

    function metaData(){
    // Add the metadata info
    let meta = d3.selectAll("#sample-metadata")

    meta
      .append("p").text(`id: ${metaID}`)
      .append("p").text(`ethnicity: ${metaEth}`)
      .append("p").text(`gender: ${metaGen}`)
      .append("p").text(`age: ${metaAge}`)
      .append("p").text(`location: ${metaLoc}`)
      .append("p").text(`bbtype: ${metaBb}`)
      .append("p").text(`wfreq: ${metaWFreq}`)
    }

    
// Bar chart
    let trace1 = {
      type: "bar",
      y: IDs,
      x: topOtuValues,
      text: topOtuLabels,
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
      x: otuIDs,
      y: otuValues,
      text:otuLabels,
      mode: "markers",
      marker: {
        size: otuValues,
        color: otuIDs,
        colorscale: 'Blackbody'
      }
    };
    let bubbleData = [trace2];
    let bubbleLayout = {
      title: "Bubbles!"
    }
    Plotly.newPlot("bubble",bubbleData,bubbleLayout)
    }

init()
;
});


// // d3.selectAll("#selDataset").on("change", Plots(sampleID))
