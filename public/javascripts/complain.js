var longlat = {
	latitude: null,
	longitude: null
};

$(document).ready(function() {
 // executes when HTML-Document is loaded and DOM is ready
 navigator.geolocation.getCurrentPosition(function(position){
   longlat.latitude = position.coords.latitude;
   longlat.longitude = position.coords.longitude;
   RequestParties();
 });

   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
   $('.modal-trigger').leanModal();
});

function RequestParties() {

  request = $.ajax({
      url: "/party/all",
      async: false,
      type: "POST",
      data: {
          latitude: longlat.latitude,
          longitude: longlat.longitude,
        },

      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
  });

  $('#loading').text("");
	if(request.responseJSON.length == 0){
		  $('#loading').append("No parties around you");
	} else {
  	request.responseJSON.forEach(function(party) {
    	$('.collection').append("<a href='#!' onclick='complain(this)' class='collection-item'>" + party.address + "</a>")
  	});
	}
}

  function complain(element) {
    $('#address').text(element.innerHTML);
    $('#modalComplaint').openModal();
  }
