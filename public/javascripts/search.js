$(document).ready(function() { //-------------- HEADER EVENTS --------------// $('body').on('mouseover', '.cartSelect', function() {
      $('.cartSelect').animate({borderColor: '#666666'}, 80);
      $('#selectOutline').animate({borderColor: '#666666'}, 80);
   });
   $('body').on('mouseleave', '.cartSelect', function() {
      $('.cartSelect').animate({borderColor: '#CCCCCB'}, 80);
      $('#selectOutline').animate({borderColor: '#AAAAAA'}, 80);
   });
   
   $('body').on('mouseenter', '.calendar', function() {
      $(this).animate({borderWidth: '3px'}, 100);
      //$('.search').animate({borderWidth: '0px'}, 100);
   });
   $('body').on('mouseleave', '.calendar', function() {
      $(this).animate({borderWidth: '0px'}, 100);
      //$('.search').animate({borderWidth: '3px'}, 100);
   });
   
   $('body').on('click', '#ajaxButton', function() {
      $.ajax({
               type: 'GET',
               url: '/courses',
      }).done(function(data) {
	var text = JSON.stringify(data, null, 10);
	text = text.replace(/ /g, "&nbsp")
	text = text.replace(/\\"/g, "\"")
        $('#main').append(text.replace(/\\n/g, "<br>"));
        //$('#main').append(text);
      });
   });
   
   //------------- SEARCHBAR EVENTS -------------//
   $('body').on('mouseenter', '.filter', function() {
      $(this).animate({borderColor: '#666666'}, 60);
      $(this).prev().animate({borderColor: '#666666'}, 60);
   });
   $('body').on('mouseleave', '.filter', function() {
      $(this).animate({borderColor: '#CCCCCB'}, 60);
      $(this).prev().animate({borderColor: '#AAAAAA'}, 60);
   })
});
