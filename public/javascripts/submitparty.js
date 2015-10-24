$("#submit").click(function() {
        var request = $.ajax({

            url: "/party",
            async: true,
            type: "POST",
            data: {
                date: "'92",
                /*
                phone: $('#telephone').val(),
                email: $('#email').val(),
                address: $('#address').val(),
                */
                phone: "12345",
                email: "a@a.a",
                address: "123 aa ln",
                coordinates: {
                  latitude: 14,
                  longitude: 12
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
