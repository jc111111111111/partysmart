$("#submit").click(function() {
        var request = $.ajax({

            url: "/party",
            async: false,
            type: "POST",
            data: {
              party: {
                date: getDate(),
                phone: $('#telephone').val(),
                email: $('#email').val(),
                address: $('#address').val(),
                coordinates: {
                  latitude: location[0],
                  longitude: location[1]
                },
              },
            },

            contentType: "application/x-www-form-urlencoded", //This is what made the difference.
            dataType: "json",

        });
        console.log(request);
    });

function getDate() {
  var dateTime = new Date($(".datepicker").datepicker("getDate"));
  var strDateTime =  dateTime.getDate() + "/" + (dateTime.getMonth()+1) + "/" + dateTime.getFullYear();
  console.log(strDateTime);
  
  return strDateTime;
}
