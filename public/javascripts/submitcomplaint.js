$("#submit").click(function() {
        var request = $.ajax({

            url: "/text",
            async: true,
            type: "POST",
            data: {
              address: $('#address').text(),
              note: $('#textarea')
              },

            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
        });
    });
