// declare the map variable here to give it a global scope
let myMap;

function fetchData(url){
    //load the data
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer using the fetched json and add it to the map object
            L.geoJSON(json, {
    			style: styleAll,
    			pointToLayer: generateCircles,
				onEachFeature: addPopups
				})
				.addTo(myMap);
			
        })
};



// we might as well declare our baselayer(s) here too
const CartoDB_Positron = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
	{
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
	}
);
//Q1 new baselayer
	var Stadia_StamenTonerDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
	 }
);

//add the basemap style(s) to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
let baseLayers = {
	"CartoDB": CartoDB_Positron,
	//Q1 new baselayer
	"Stamen Toner Dark": Stadia_StamenTonerDark
};

function initialize(){
    loadMap();
};

function loadMap(){
	//now reassign the map variable by actually making it a useful object, this will load your leaflet map
	myMap = L.map('mapdiv', {
		center: [46.58, -78.19]
		,zoom: 5
		,maxZoom: 18
		,minZoom: 3
		,layers: CartoDB_Positron
	});

	fetchData("https://raw.githubusercontent.com/brubcam/GEOG-464_Lab-7/refs/heads/main/DATA/train-stations.geojson")

	//declare basemap selector widget
	let lcontrol = L.control.layers(baseLayers);
	//add the widget to the map
	lcontrol.addTo(myMap);
};

function generateCircles(feature, latlng) {
	return L.circleMarker(latlng);
}

function styleAll(feature, latlng) {
	
	var styles = {dashArray:null, dashOffset:null, lineJoin:null, lineCap:null, stroke:false, color:'#000', opacity:1, weight:1, fillColor:null, fillOpacity:0 };

	if (feature.geometry.type == "Point") {
		styles.fillColor = '#fff',
		styles.fillOpacity = 0.5,	
		styles.stroke=true,
		styles.radius=9
		if (!feature.properties.postal_code) {
			styles.fillColor = 'cyan'
			styles.fillOpacity = 0.5,	
			styles.stroke=true,
			styles.radius=9
		}
	}
	
	return styles;
}
function addPopups(feature, layer){
	layer.bindPopup();

}




// window.onload = initialize();