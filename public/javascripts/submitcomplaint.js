$("#submit").click(function() {
    var date = new Date();
        var request = $.ajax({

            url: "/text",
            async: true,
            type: "POST",
            data: {
              address: $('#address').text(),
              note: $('#textarea').val(),
              time: date.toLocaleString()
              },

            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
        });
    });
