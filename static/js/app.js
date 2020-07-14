
//// TO DO ////
// Fix the Demographic Table. It appends instead of updating. 

// define global variables for easy change later
const url = "data/samples.json"
const sampSize = 10

// Create a function to build the plots
function Plots(sampleID) {
  d3.json(url).then(function(data){
    let sampleInfo = data
    let sample = +data.samples[sampleID].id
    let otuIDs = (data.samples[sampleID].otu_ids)
    let topOtuIDs = (data.samples[sampleID].otu_ids).slice(0,sampSize)
    let otuLabels = (data.samples[sampleID].otu_labels)
    let otuValues = (data.samples[sampleID].sample_values)
    let topOtuLabels = (data.samples[sampleID].otu_labels).slice(0,sampSize)
    let topOtuValues = (data.samples[sampleID].sample_values).slice(0,sampSize)
    
    console.log(sampleInfo)
    
    // Format the ID names for graph labeling
    let IDs = []
    topOtuIDs.forEach(function(entry) {
      IDs.push("OTU"+entry)
    })
    console.log(IDs)
    
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
      title: "Top Ten OTUs",
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
      title: "OTU Prevalence"
    }
    Plotly.newPlot("bubble",bubbleData,bubbleLayout)
    })
  }

// Create a function to fill Demographic Info 
function MetaData(sampleID){
  d3.json(url).then(function(data){
    let metaID = data.metadata[sampleID].id
    let metaBb = data.metadata[sampleID].bbtype
    let metaAge = data.metadata[sampleID].age
    let metaEth = data.metadata[sampleID].ethnicity
    let metaGen = data.metadata[sampleID].gender
    let metaLoc = data.metadata[sampleID].location
    let metaWFreq = data.metadata[sampleID].wfreq

    let meta = d3.selectAll("#sample-metadata")
    meta
      .append("p").text(`id: ${metaID}`)
      .append("p").text(`ethnicity: ${metaEth}`)
      .append("p").text(`gender: ${metaGen}`)
      .append("p").text(`age: ${metaAge}`)
      .append("p").text(`location: ${metaLoc}`)
      .append("p").text(`bbtype: ${metaBb}`)
      .append("p").text(`wfreq: ${metaWFreq}`)
    })    
  }

d3.json(url).then(function(data){

  // Create a start-up function
  function init() {
    Plots(0)
    MetaData(0)
  };

  // Iterate through the sample names and add it to the dropdown
  let samps = data.names
  samps.forEach(function(name){
    d3.selectAll("#selDataset")
    .append("option").text(name)
  })

  // Find the index of the drop down selection
  let selection = d3.selectAll("#selDataset");
  console.log(selection.node().value);

  selection.on("change", function() {
    let num = selection.node().value
    samps.forEach(function(d,i){
      if(num === d){
        // Call the functions with the selection's index
        Plots(i)
        MetaData(i)
        }
      })
    })

init()
;
});
