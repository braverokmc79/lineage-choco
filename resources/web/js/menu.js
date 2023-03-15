function main() {
    $('.icon-menu').click(function() {
        $('.menu').animate({
            left: "0px"
        }, 200);
            
        $('body').animate({
            left: "285px"
        }, 200);

        $("#dark").show();
        $('body').css({'overflow':'hidden'});
        $('body').bind('touchmove', function(e){e.preventDefault()});
        $('.carousel').hide();
        
        $('.icon-close').click(function() {
            $('body').unbind('scroll'); 
            $('body').unbind('touchmove');
            $('body').css({'overflow':'visible'});
            $('.menu').animate({
               left: "-285px"
               }, 0);

            $('body').animate({
               left: "0px"
               }, 200);   

            $("#dark").hide();
            $('.carousel').show();
        });
        
        $('#dark').click(function() {
            $('body').unbind('scroll'); 
            $('body').unbind('touchmove');
            $('body').css({'overflow':'visible'});
            $('.menu').animate({
               left: "-285px"
               }, 0);

            $('body').animate({
               left: "0px"
               }, 200);   

            $("#dark").hide();
            $('.carousel').show();
        });
    });

}

   
$(document).ready(main);