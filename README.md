# GEOG 458 Lab 03: US 2020 COVID-19 Mapping

## Introduction
This lab introduces mapping of 2020 Covid-19 rates and counts by county in the United States. The rates map is a choropleth map and the Covid-19 case counts is a proportional symbol map. Is is constructed with the help of Mapbox, a helpful map styler.

## Data
The data for the Covid-19 case counts (proportional symbol) comes originally from <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">The New York Times</a>. For the Covid-19 rates per 1000 residents (choropleth), it comes from the <a href="https://data.census.gov/cedsci/table g=0100000US%24050000d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true"> 2018 ACS 5 year estimate data</a>.

## Functions
For the Covid-19 cases by county map, simply click on a proportional symbol to reveal the exact amount of cases that county experienced in 2020. The larger the dot/circle, the greater the amount of cases in that county. For the Covid-19 rates per 1000 residents map, simply hover over any county in the United States (contiguous) to reveal the name and rate of cases. Hovering anywhere else on the map will produce no value on the middle-left text box. The darker the color of the map, the greater rate at which residents experienced Covid-19 in 2020.

## Links/Screenshot

[Choropleth - Map 1 (Rates)]()

![1](img\choropleth.jpg)

[Proportional Symbol - Map 2 (Cases)]()

![2](img\propsymbol.jpg)

## Acknowledgement
Maps were created with the help of <a href="https://www.mapbox.com/mapbox-studio">Mapbox Studio</a> 
This assigment can be found <a href="https://github.com/jakobzhao/geog458/tree/master/labs/lab03">here</a>
Special thanks to Bo Zhao and Steven Bao