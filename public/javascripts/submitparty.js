$("#submit").click(function() {
        var request = $.ajax({

            url: "/party",
            async: true,
            type: "POST",
            data: {
                date: $(".datepicker").val(),
                phone: $('#telephone').val(),
                email: $('#email').val(),
                address: $('#address').val(),
                coordinates: {
                  latitude: location[0],
                  longitude: location[1]
                },
              },

            contentType: "application/x-www-form-urlencoded", //This is what made the difference.
            dataType: "json",

        });
        console.log(request);
    });
