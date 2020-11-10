function getplots(id)
{
    //Read samples.json
    d3.json("samples.json").then(sampledata =>{
        console.log(sampledata);
        var id = sampledata.samples[0].otu_ids;
        console.log(id);
        var samplevalues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(samplevalues);
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels);
    // Get top 10 otu id's for the plot and reversing it .
        var otu_top = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
    // Get otu id's to the desired form for the plot
        var otu_id = otu_top.map(d => "OTU" + d);
        console.log(`OTU ID : ${otu_id}`);
    //Get the top 10 labels for the plot 
        var lab = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU Label : ${lab}`);
        var trace = {
            x:samplevalues,
            y: otu_id,
            text : labels,
            marker :{
                color :'lightcoral'},
            type: "bar",
            orientation : "h"


        };
    //Create data variable
        var data = [trace];
    //Create layout variable to set plots layout
        var layout ={
            title:"Top 10 OTU",
            yaxis :{
                tickmode :"linear",
            },
            margin :{
                l:100,
                r:100,
                t:100,
                b:30
            }
        };
    //Create the bar plot 
    Plotly.newPlot("bar",data,layout);

// Bubble Chart
    var trace1 = {
        x: sampledata.samples[0].otu_ids,
        y: sampledata.samples[0].sample_values,
        mode:"markers",
        marker: {
            size:sampledata.samples[0].sample_values,
            color:sampledata.samples[0].otu_ids
        },
        text: sampledata.samples[0].otu_labels
    };
// Setting the bubble plot layout
    var layout1 = {
        xaxis :{title:"OTU ID"},
        height :600,
        width :1000
    };
// Create data variable
    var data1 = [trace1];
// Creating bubble plot
    Plotly.newPlot("bubble",data1,layout1);
    });
}
//Create function for the change in events
function optionChanged(id){
    getplots(id);
    getdemo(id);
}
// Function for demographics

function getdemo(id){
    // Read the json to get data
    d3.json("samples.json").then(data => {
        var metadata = data.metadata;
        console.log(metadata);
    
    // Filter metadata info by id
    var metaid = metadata.filter(meta => meta.id.toString() === id)[0];
    // Select the demographic panel to put the data in 
    var demoinfo = d3.select("#sample-metadata");

    // Clear demographic panel each time before another id info is displayed
    demoinfo.html("");

    // Read the necessary demographic data for id and append the info to panel
    
    Object.entries(metaid).forEach((key) =>{
        demoinfo.append("h5").text(key[0].toUpperCase() + ":" +key[1] + "\n");
    });

    });
}

// Create function for initializing the data

function init(){
    // Select dropdown menu
    var dropdown = d3.select("#selDataset");
    // Read the data
    d3.json("samples.json").then(data =>{
        console.log(data);
    // Get ID data to the dropdown menu
    data.names.forEach(function(name){
        dropdown.append("option").text(name).property("value");
    });
    //Call the functions to display data and plot the graph 
    getplots(data.names[0]);
    getdemo(data.names[0]);
    });
}
init();