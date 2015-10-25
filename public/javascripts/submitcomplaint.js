$("#submit").click(function() {
        var request = $.ajax({

            url: "/text",
            async: true,
            type: "POST",
            data: {
              address: $('#address').text(),
              note: $('#textarea').val()
              },

            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
        });
    });
