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
});

$(document).on("click","#active", function() {
  $(this).attr("class","collection-item");
});

$(document).on("click",".collection-item", function() {
  $(this).attr("class","collection-item active");
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

  $('.collection').val("");
  request.responseJSON.forEach(function(party) {
    $('.collection').append("<a href='#!' class='collection-item'>" + party.address + "</a>")
  });
}
