$("#submit").click(function() {
        var request = $.ajax({

            url: "/text",
            async: true,
            type: "POST",
            data: {
                date: $(".datepicker").val(),
                phone: $('#telephone').val(),
                email: $('#email').val(),
                address: $('#address').val(),
                latitude: longlat.latitude,
                longitude: longlat.longitude
              },

            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
        });
    });
