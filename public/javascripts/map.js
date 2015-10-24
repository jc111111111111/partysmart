var map = null;
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
	map = new Microsoft.Maps.Map(document.getElementById("mapDiv"),{
	credentials: "AuOBx0ig6ttgyEVpoxLMgb9qfROJn2lzSaegxDJeBMXE9T1zoeEuBu5_87bZLG5v",
	mapTypeId: Microsoft.Maps.MapTypeId.road,
	center: new Microsoft.Maps.Location(42.3889, -72.5278)});
}

function ClickCurrentLocation(){
 var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);
 geoLocationProvider.getCurrentPosition();
}

function ClickGeocode(credentials)
{
	map.getCredentials(MakeGeocodeRequest);
}

function MakeGeocodeRequest(credentials)
{

	var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURI(document.getElementById('txtQuery').value) + "&output=json&jsonp=GeocodeCallback&key=" + credentials;

	CallRestService(geocodeRequest);
}

function GeocodeCallback(result)
{

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
		 console.log(address);
		 var pushpin = new Microsoft.Maps.Pushpin(location);
		 map.entities.push(pushpin);
	}
}
