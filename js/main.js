// Map 2 - Proportional Symbol
mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 4, // starting zoom
center: [-95.8187, 38.6989]
});

const grades = [1000, 2000, 4000, 10000, 20000],
            radius = [1, 2, 4, 10, 25],
            colors = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000']

//load data to the map as new layers.
//map.on('load', function loadingData() {
map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

// when loading a geojson, there are two steps
// add a source of the data and then add the layer out of the source
map.addSource('counts', {
type: 'geojson',
data: 'assets/us-covid-2020-counts.geojson'
});

map.addLayer({
'id': 'cases-point',
'type': 'circle',
'source': 'counts',
'minzoom': 3,
'paint': {
// increase the radii of the circle as the zoom level and dbh value increases
'circle-radius': {
'property': 'cases',
    'stops': [
        [grades[0], colors[0]],
        [grades[1], colors[1]],
        [grades[2], colors[2]],
        [grades[3], colors[3]],
        [grades[4], colors[4]]
    ]
},
'circle-color': {
'property': 'cases',
'stops': [
[grades[0], colors[0]],
[grades[1], colors[1]],
[grades[2], colors[2]]
]
},
'circle-stroke-width': 1,
'circle-stroke-color': '#636363',
'circle-opacity': 0.5,
'circle-radius': {
    'property': 'cases',
    'stops': [
        [grades[0], radius[0]],
        [grades[1], radius[1]],
        [grades[2], radius[2]],
        [grades[3], radius[3]],
        [grades[4], radius[4]]
    ]
}
}
},
'waterway-label'
);


// click on tree to view magnitude in a popup
map.on('click', 'cases-point', (event) => {
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML(`<strong>Total Cases</strong> ${event.features[0].properties.mag}`)
        .addTo(map);
    });

});
// create legend
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<strong><center>Cases by County</center></strong>'],
vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
vbreak = grades[i];
// you need to manually adjust the radius of each dot on the legend 
// in order to make sure the legend can be properly referred to the dot on the map.
dot_radii = 2 * radii[i];
labels.push(
'<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
'px; height: ' +
dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
'</span></p>');

}
// add the data source
const source =
'<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">The New York Times</a></p>';
// combine all the html codes.
legend.innerHTML = labels.join('') + source;

// MAP 1 - Choropleth
async function geojsonFetch() {
    let response = await fetch('assets/us-covid-2020-rates.geojson');
    let rateData = await response.json();

    map.on('load', function loadingData() {
        map.addSource('rateData', {
            type: 'geojson',
            data: rateData
        });

        map.addLayer({
            'id': 'rateData-layer',
            'type': 'fill',
            'source': 'rateData',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'rates'],
                    '#fcfbfd', // stop_output_0
                    20, // stop_input_0
                    '#efedf5', // stop_output_1
                    40, // stop_input_1
                    '#dadaeb', // stop_output_2
                    60, // stop_input_2
                    '#bcbddc', // stop_output_3
                    80, // stop_input_3
                    '#9e9ac8', // stop_output_4
                    100, // stop_input_4
                    '#807dba', // stop_output_5
                    120, // stop_input_5
                    '#6a51a3', // stop_output_6
                    140, // stop_input_6
                    "#4a1486" // stop_output_7
                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.6,
            }
        });

        const layers = [
            '0-20',
            '21-40',
            '41-60',
            '61-80',
            '81-100',
            '101-120',
            '121-140',
            '140+'
        ];
        const colors = [
            '#fcfbfd',
            '#efedf5',
            '#dadaeb',
            '#bcbddc',
            '#9e9ac8',
            '#807dba',
            '#6a51a3',
            '#4a1486'
        ];

    // create legend
    const legend = document.getElementById('legend');
    legend.innerHTML = "<b><center>Covid-19 Rates (per 1000)</center><br><br>";
    const source = '<p style="text-align: center; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">Covid-19-data</a></p>';
        
        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });
        
        legend.innerHTML += source;
    });

    map.on('mousemove', ({
        point
    }) => {
        const state = map.queryRenderedFeatures(point, {
            layers: ['rateData-layer']
        });
        document.getElementById('text-escription').innerHTML = state.length ?
            `<h3>${state[0].properties.county + " County, " + state[0].properties.state}</h3>
            <p><strong>2020 COVID-19 Rate: <em>${state[0].properties.rates}</strong></em></p>` :
            `<p> </p>`;

    });
}

geojsonFetch();