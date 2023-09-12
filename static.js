let submitButton = document.querySelector("#myButton");
let artistInput = document.querySelector("#artistInput");
//let artist = artistInput.value;
let popInput = document.querySelector("#popInput");
//let popularity = popInput.value;
let message = document.querySelector("#message");

function myFunction() {
    message.innerHTML = "I also like " + artistInput.value + " with popularity of " + popInput.value;
    init()
}

function init() {
    url = `http://127.0.0.1:5501/api/v1.0/${artistInput.value}/${popInput.value}`
    d3.json(url).then(function(data){
        console.log(data)
        plotDurationBarGraph(data)
        plotPopularityPieChart(data)
        plotGaugeChart(data)
        plotTempoHistogram(data)
        
    })
console.log(url)
}


d3.json(url).then(function(data){
    console.log(data)
})



function plotDurationBarGraph(jsonData) {
    // Extract the second array from the JSON data
    var Array = jsonData;

    // Extract the duration values from the second array
    var durationData = Array.map(function(song) {
        return song.duration;
    });

    // Extract the song names from the second array
    var songNames = Array.map(function(song) {
        return song.song;
    });

    // Create the trace for the bar graph
    var trace = {
        x: songNames,
        y: durationData,
        type: 'bar'
    };

    // Create the layout for the bar graph
    var layout = {
        title: 'Duration of Recommended Songs Based on ' + artistInput.value,
        xaxis: {
            title: 'Song'
        },
        yaxis: {
            title: 'Duration (Seconds)'
        }
    };

    // Combine the trace and layout and plot the graph
    Plotly.newPlot('bar', [trace], layout);
};
// need to make a plot of the artist only to show case difference between artist and recommendations
// also make it into ascending order

function plotPopularityPieChart(jsonData) {
    jsonData.sort((a, b) => b.popularity - a.popularity);
    jsonData = jsonData.slice(0,30);
    var artistSongCount = {};
    $.each(jsonData, function(key, value) {
        var artst = value.artist;
        if (artistSongCount[artst]) {
            artistSongCount[artst]++;
        }
        else {
            artistSongCount[artst] = 1;
        }
    });
    console.log(artistSongCount);
    var trace = {
        type: 'pie',
        labels: Object.keys(artistSongCount),
        values: Object.values(artistSongCount)
    };
    var display = {
        title: 'Percent of Artist Recommendations based on ' + artistInput.value,
        height: 600,
        width: 700,
        font: {size:8}
    }
    Plotly.newPlot('pie', [trace], display);
}

function plotTempoHistogram(jsonData, jsonArtist) {
    // Extract the tempo values from the first array
    var Array = jsonData;
    var ArrayPopularity = Array.map(function(song) {
        return song.popularity;
    });
    var ArrayDanceability = Array.map(function(song){
        return song.danceability
    });

    var Artist = Array.map(function(song){
        return song.artist
    })
    var Song = Array.map(function(song){
        return song.song
    })

    // Create the traces for the histogram
    var trace1 = {
        x: ArrayDanceability,
        y:ArrayPopularity,
        mode:'markers',
        type: 'scatter',
        name: 'Artist & Songs',
        text: Artist
    };
    // Create the layout for the histogram
    var layout = {
        title: 'Correlaton of Popularity and Danceability of Song Recs based on '+ artistInput.value,
        xaxis: {
            title: 'Danceability '
        },
        yaxis: {
            title: 'Popularity'
        }
    };

    // Combine the traces and layout and plot the graph
    Plotly.newPlot('tempo-histogram', [trace1], layout);
}
// need to add popout for information on the html for each of the scatterplots

function plotGaugeChart(jsonData){
    var Array = jsonData;
    var ArrayEnergy = Array.map(function(song){
        return song.energy
    })
    function getAverage(array) {
        const sum = array.reduce((acc, val) => acc + val, 0);
        return sum / array.length * 100;
    }

    var averageEnergy = getAverage(ArrayEnergy);

    var trace = {
        domain: {x:[0, 100], y:[0,100]},
        value: averageEnergy,
        title: {text: "Average Energy for Recommendations based on " + artistInput.value, font: {size:28}},
        type: "indicator",
        mode: "gauge+number",
         height: 600,
        width: 700,
        gauge: {
            axis: {range: [null, 100]},
            bar: {color: "Greens(68,166,198)"},
            steps: [
                {range: [0,10], color: "rgb(233,245,248)"},
                {range: [10,20], color: "rgb(218,237,244)"},
                {range: [20,30], color: "rgb(203,230,239)"},
                {range: [30,40], color: "rgb(188,223,235)"},
                {range: [40,50], color: "rgb(173,216,230)"},
                {range: [50,60], color: "rgb(158,209,225)"},
                {range: [60,70], color: "rgb(143,202,221)"},
                {range: [70,80], color: "rgb(128,195,216)"},
                {range: [80,90], color: "rgb(113,187,212)"},
                {range: [90,100], color: "rgb(98,180,207)"},

            ]
        }
    }
    Plotly.newPlot("gauge", [trace]);
}
