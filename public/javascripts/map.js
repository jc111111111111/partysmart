var map = null;
var longlat = {
	latitude: null,
	longitude: null
};
var credentials =  "AuOBx0ig6ttgyEVpoxLMgb9qfROJn2lzSaegxDJeBMXE9T1zoeEuBu5_87bZLG5v";

function CallRestService(request)
{
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", request);
	document.body.appendChild(script);
}

function GetMap()
{
	// Initialize the map
	var mapOptions = {
	         credentials: credentials,
					 //umass long & lat
	         center: new Microsoft.Maps.Location(42.3889, -72.5278),
	         mapTypeId: Microsoft.Maps.MapTypeId.road,
	         zoom: 13,
	         showScalebar: true
	         }

	map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
}

function CurrentLocation(){
	map.entities.clear();
	var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);
	geoLocationProvider.getCurrentPosition();

	//bing maps api cannot return current long and lat
	navigator.geolocation.getCurrentPosition(function(position){
		longlat.latitude = position.coords.latitude;
		longlat.longitude = position.coords.longitude;


		map.getCredentials(MakeBingMapsRESTRequest);
		//var address = result.resourceSets[0].resources[0].address.formattedAddress;
		//$("#address").val (address);
	});
}

function MakeBingMapsRESTRequest(credentials){
	var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" + longlat.latitude + "," + longlat.longitude + "?o=json&key=" + credentials;
	CallRestService(geocodeRequest);
}

function ClickGeocode(credentials)
{
	map.entities.clear();
	map.getCredentials(MakeGeocodeRequest);
}

function MakeGeocodeRequest(credentials)
{

	var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURI(document.getElementById('address').value) + "&output=json&jsonp=GeocodeCallback&key=" + credentials;

	CallRestService(geocodeRequest);
}

function GeocodeCallback(result)
{
	console.log(result);
	if (result &&
				 result.resourceSets &&
				 result.resourceSets.length > 0 &&
				 result.resourceSets[0].resources &&
				 result.resourceSets[0].resources.length > 0)
	{
		 // Set the map view using the returned bounding box
		 var bbox = result.resourceSets[0].resources[0].bbox;
		 var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(bbox[0], bbox[1]), new Microsoft.Maps.Location(bbox[2], bbox[3]));
		 map.setView({ bounds: viewBoundaries});

		 // Add a pushpin at the found location
		 var location = new Microsoft.Maps.Location(result.resourceSets[0].resources[0].point.coordinates[0], result.resourceSets[0].resources[0].point.coordinates[1]);
		 var address = result.resourceSets[0].resources[0].address.formattedAddress;
		 var pushpin = new Microsoft.Maps.Pushpin(location);
		 map.entities.push(pushpin);

		 longlat = location;
		 $("#address").val (address);

	}
}

//Address timer
var typingTimer;
var doneTypingInterval = 1000;
var $input = $('#address');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(ClickGeocode, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});
