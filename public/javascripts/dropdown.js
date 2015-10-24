$(document).ready(function() {
            createDropDown($("#courseSubjectSelect"));
            createDropDown($("#genEdSelect"));
            createDropDown($("#courseCareerSelect"));
            createDropDown($("#daysSelect"));
            createDropDown($("#courseComponentSelect"));
            createDropDown($("#courseNumberSelect"));
            
            $(".dropdown dt a").click(function() {
                //$(".dropdown dd ul").toggle();
                $(this).parent().parent().find(">dd ul").toggle();
                $(this).toggleClass("open closed");
            });

            $(document).bind('click', function(e) {
                var $clicked = $(e.target);
                if (! $clicked.parents().hasClass("dropdown")) {
                    $(".dropdown dd ul").hide();
                    $(".open").toggleClass("open closed");
                }
            });
                        
            $(".dropdown dd ul li a").click(function() {
                var text = $(this).html();
                //$(".dropdown dt a").html(text);
                $(this).parent().parent().parent().parent().find(">dt a").html(text);
                $(".dropdown dd ul").hide();
                
                var source = $(".source");
                source.val($(this).find("span.value").html())
            });
});
        
function createDropDown(source){
            //var source = $(".source");
            var selected = source.find("option[selected]");
            var options = $("option", source);
            
            source.parent().prepend('<dl id="target" class="dropdown"></dl>')
            source.parent().children(":first").append('<dt><a href="#" class="closed" id="' + source.attr('id') + '">' + selected.text() + 
                '<span class="value">' + selected.val() + 
                '</span></a></dt>')
            source.parent().children(":first").append('<dd><ul id="' + source.attr('id') + 'Drop"></ul></dd>')

            options.each(function(){
                source.parent().children(":first").find(">dd ul").append('<li><a href="#">' + 
                    $(this).text() + '<span class="value">' + 
                    $(this).val() + '</span></a></li>');
            });
            
            source.css("display", "none");
}