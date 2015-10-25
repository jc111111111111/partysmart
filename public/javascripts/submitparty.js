$(document).ready(function(){
  $('.modal-trigger').leanModal();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 1,
    min: true
  });
});

$("#submit").click(function() {
        if($(".datepicker").val() == "" ||  $('#telephone').val() == "" || $('#address').val() == ""){
          $('#modalFailure').openModal();
        } else{
        var request = $.ajax({

            url: "/party/add",
            async: false,
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
        $('#modalSuccess').openModal();
      }
    });
