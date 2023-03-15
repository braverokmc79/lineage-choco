
$(document).ready(function() {
    //$('.dropdown-toggle').dropdown();
    //nav opecity
    $('.nav-title').mouseenter(function() {
        $(this).fadeTo('fast', 1);
    });
    $('.nav-title').mouseleave(function() {
        $(this).fadeTo('fast', 1);
    });
    
    var acc = document.getElementsByClassName("accordion-section-title");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function(){
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            };
    }
   
    //button fade
    $('.button').mouseenter(function() {
        $(this).fadeTo('fast', 1);
    });
    $('.button').mouseleave(function() {
        $(this).fadeTo('fast', 0.8);
    });
    
    //show hidden comment
    function myFunction(event) {
        event.preventDefault();
        document.getElementById("div6").innerHTML="Test";
    }
    $("#submitbtn").on('click', function(e) {
        e.preventDefault();
        $('#clicktoshow1').removeClass('hidden');
        $('#clicktoshow2').removeClass('hidden');
        $('#clicktoshow3').removeClass('hidden');
    });
    
    $('.postbox').mouseenter(function() {
        $(this).addClass('shadow');
    });
    $('.postbox').mouseleave(function() {
        $(this).removeClass('shadow');
    });
    
    $('.carousel').on('slide.bs.carousel', function () {
    });
    
    $('.player-hover').removeClass('player-hover');
    
    
    //자바스크립트 콤마
    Number.prototype.format = function(){
        if(this==0) return 0;
        var reg = /(^[+-]?\d+)(\d{3})/;
        var n = (this + '');
        while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
        return n;
    };
    
    String.prototype.format = function(){
        var num = parseFloat(this);
        if( isNaN(num) ) return "0";
        return num.format();
    };
    
    //twitch stream link
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    

    $('#ab1').click(function() {
        //var link = $(document).getElementById("ab1");
        if (document.getElementById("ab1name") != null)
            var twitchLink = document.getElementById("ab1name").innerHTML;
        else
            var twitchLink = null;
        location.href = 'http://dda.ac/twitch/twitchView?streamer=' + twitchLink;
    });

    $('#ab2').click(function() {
        //var link = $(document).getElementById("ab1");
        if (document.getElementById("ab2name") != null)
            var twitchLink = document.getElementById("ab2name").innerHTML;
        else
            var twitchLink = null;
        location.href = 'http://dda.ac/twitch/twitchView?streamer=' + twitchLink;
    });

    $('#ab3').click(function() {
        //var link = $(document).getElementById("ab1");
        if (document.getElementById("ab3name") != null)
            var twitchLink = document.getElementById("ab3name").innerHTML;
        else
            var twitchLink = null;
        location.href = 'http://dda.ac/twitch/twitchView?streamer=' + twitchLink;
    });

    $('#ko1').click(function() {
        //var link = $(document).getElementById("ab1");
        if (document.getElementById("ko1name") != null)
            var twitchLink = document.getElementById("ko1name").innerHTML;
        else
            var twitchLink = null;
        location.href = 'http://dda.ac/twitch/twitchView?streamer=' + twitchLink;
    });

    $('#ko2').click(function() {
        //var link = $(document).getElementById("ab1");
        if (document.getElementById("ko2name") != null)
            var twitchLink = document.getElementById("ko2name").innerHTML;
        else
            var twitchLink = null;
        location.href = 'http://dda.ac/twitch/twitchView?streamer=' + twitchLink;
    });

    $('#ko3').click(function() {
        //var link = $(document).getElementById("ab1");
        if (document.getElementById("ko3name") != null)
            var twitchLink = document.getElementById("ko3name").innerHTML;
        else
            var twitchLink = null;
        location.href = 'http://dda.ac/twitch/twitchView?streamer=' + twitchLink;
    });
    
    $('#p6301').click(function() {$('#p6301dimg').html('<img style="width:100%" src="/static/img/p6301.jpg">');});
    $('#p6302').click(function() {$('#p6302dimg').html('<img style="width:100%" src="/static/img/p6302.jpg">');});
    $('#p6303').click(function() {$('#p6303dimg').html('<img style="width:100%" src="/static/img/p6303.jpg">');});
    $('#p6304').click(function() {$('#p6304dimg').html('<img style="width:100%" src="/static/img/p6304.jpg">');});
    $('#p6305').click(function() {$('#p6305dimg').html('<img style="width:100%" src="/static/img/p6305.jpg">');});
    $('#p6306').click(function() {$('#p6306dimg').html('<img style="width:100%" src="/static/img/p6306.jpg">');});
    $('#p6307').click(function() {$('#p6307dimg').html('<img style="width:100%" src="/static/img/p6307.jpg">');});
    $('#p6308').click(function() {$('#p6308dimg').html('<img style="width:100%" src="/static/img/p6308.jpg">');});
    $('#p6309').click(function() {$('#p6309dimg').html('<img style="width:100%" src="/static/img/p6309.jpg">');});
    $('#p6310').click(function() {$('#p6310dimg').html('<img style="width:100%" src="/static/img/p6310.jpg">');});
    $('#p6311').click(function() {$('#p6311dimg').html('<img style="width:100%" src="/static/img/p6311.jpg">');});
    $('#p6312').click(function() {$('#p6312dimg').html('<img style="width:100%" src="/static/img/p6312.jpg">');});
    $('#p6313').click(function() {$('#p6313dimg').html('<img style="width:100%" src="/static/img/p6313.jpg">');});
    $('#p6314').click(function() {$('#p6314dimg').html('<img style="width:100%" src="/static/img/p6314.jpg">');});
    $('#p6315').click(function() {$('#p6315dimg').html('<img style="width:100%" src="/static/img/p6315.jpg">');});
    $('#p6316').click(function() {$('#p6316dimg').html('<img style="width:100%" src="/static/img/p6316.jpg">');});
    $('#p6317').click(function() {$('#p6317dimg').html('<img style="width:100%" src="/static/img/p6317.jpg">');});
    $('#p6318').click(function() {$('#p6318dimg').html('<img style="width:100%" src="/static/img/p6318.jpg">');});
    $('#p6319').click(function() {$('#p6319dimg').html('<img style="width:100%" src="/static/img/p6319.jpg">');});
    $('#p6320').click(function() {$('#p6320dimg').html('<img style="width:100%" src="/static/img/p6320.jpg">');});
    $('#p6321').click(function() {$('#p6321dimg').html('<img style="width:100%" src="/static/img/p6321.jpg">');});
    $('#p6322').click(function() {$('#p6322dimg').html('<img style="width:100%" src="/static/img/p6322.jpg">');});
    $('#p6323').click(function() {$('#p6323dimg').html('<img style="width:100%" src="/static/img/p6323.jpg">');});
    $('#p6324').click(function() {$('#p6324dimg').html('<img style="width:100%" src="/static/img/p6324.jpg">');});
    $('#p6325').click(function() {$('#p6325dimg').html('<img style="width:100%" src="/static/img/p6325.jpg">');});
    $('#p6326').click(function() {$('#p6326dimg').html('<img style="width:100%" src="/static/img/p6326.jpg">');});
    $('#p6327').click(function() {$('#p6327dimg').html('<img style="width:100%" src="/static/img/p6327.jpg">');});
    $('#p6328').click(function() {$('#p6328dimg').html('<img style="width:100%" src="/static/img/p6328.jpg">');});
    $('#p6329').click(function() {$('#p6329dimg').html('<img style="width:100%" src="/static/img/p6329.jpg">');});
    $('#p6330').click(function() {$('#p6330dimg').html('<img style="width:100%" src="/static/img/p6330.jpg">');});
    $('#p6331').click(function() {$('#p6331dimg').html('<img style="width:100%" src="/static/img/p6331.jpg">');});
    $('#p6332').click(function() {$('#p6332dimg').html('<img style="width:100%" src="/static/img/p6332.jpg">');});
    $('#p6333').click(function() {$('#p6333dimg').html('<img style="width:100%" src="/static/img/p6333.jpg">');});
    $('#p6334').click(function() {$('#p6334dimg').html('<img style="width:100%" src="/static/img/p6334.jpg">');});
    $('#p6335').click(function() {$('#p6335dimg').html('<img style="width:100%" src="/static/img/p6335.jpg">');});
    $('#p6336').click(function() {$('#p6336dimg').html('<img style="width:100%" src="/static/img/p6336.jpg">');});
    $('#p6337').click(function() {$('#p6337dimg').html('<img style="width:100%" src="/static/img/p6337.jpg">');});
    $('#p6338').click(function() {$('#p6338dimg').html('<img style="width:100%" src="/static/img/p6338.jpg">');});
    $('#p6339').click(function() {$('#p6339dimg').html('<img style="width:100%" src="/static/img/p6339.jpg">');});
    $('#p6340').click(function() {$('#p6340dimg').html('<img style="width:100%" src="/static/img/p6340.jpg">');});
    
    //p69 유럽 라스트콜
    $('#p6901').click(function() {$('#p6901dimg').html('<img style="width:100%" src="/static/img/p6901.jpg">');});
    $('#p6902').click(function() {$('#p6902dimg').html('<img style="width:100%" src="/static/img/p6902.jpg">');});
    $('#p6903').click(function() {$('#p6903dimg').html('<img style="width:100%" src="/static/img/p6903.jpg">');});
    $('#p6904').click(function() {$('#p6904dimg').html('<img style="width:100%" src="/static/img/p6904.jpg">');});
    $('#p6905').click(function() {$('#p6905dimg').html('<img style="width:100%" src="/static/img/p6905.jpg">');});
    $('#p6906').click(function() {$('#p6906dimg').html('<img style="width:100%" src="/static/img/p6906.jpg">');});
    $('#p6907').click(function() {$('#p6907dimg').html('<img style="width:100%" src="/static/img/p6907.jpg">');});
    $('#p6908').click(function() {$('#p6908dimg').html('<img style="width:100%" src="/static/img/p6908.jpg">');});
    $('#p6909').click(function() {$('#p6909dimg').html('<img style="width:100%" src="/static/img/p6909.jpg">');});
    $('#p6910').click(function() {$('#p6910dimg').html('<img style="width:100%" src="/static/img/p6910.jpg">');});
    $('#p6911').click(function() {$('#p6911dimg').html('<img style="width:100%" src="/static/img/p6911.jpg">');});
    $('#p6912').click(function() {$('#p6912dimg').html('<img style="width:100%" src="/static/img/p6912.jpg">');});
    $('#p6913').click(function() {$('#p6913dimg').html('<img style="width:100%" src="/static/img/p6913.jpg">');});
    $('#p6914').click(function() {$('#p6914dimg').html('<img style="width:100%" src="/static/img/p6914.jpg">');});
    $('#p6915').click(function() {$('#p6915dimg').html('<img style="width:100%" src="/static/img/p6915.jpg">');});
    $('#p6916').click(function() {$('#p6916dimg').html('<img style="width:100%" src="/static/img/p6916.jpg">');});
    $('#p6917').click(function() {$('#p6917dimg').html('<img style="width:100%" src="/static/img/p6917.jpg">');});
    $('#p6918').click(function() {$('#p6918dimg').html('<img style="width:100%" src="/static/img/p6918.jpg">');});
    $('#p6919').click(function() {$('#p6919dimg').html('<img style="width:100%" src="/static/img/p6919.jpg">');});
    $('#p6920').click(function() {$('#p6920dimg').html('<img style="width:100%" src="/static/img/p6920.jpg">');});
    $('#p6921').click(function() {$('#p6921dimg').html('<img style="width:100%" src="/static/img/p6921.jpg">');});
    $('#p6922').click(function() {$('#p6922dimg').html('<img style="width:100%" src="/static/img/p6922.jpg">');});
    $('#p6923').click(function() {$('#p6923dimg').html('<img style="width:100%" src="/static/img/p6923.jpg">');});
    $('#p6924').click(function() {$('#p6924dimg').html('<img style="width:100%" src="/static/img/p6924.jpg">');});
    $('#p6925').click(function() {$('#p6925dimg').html('<img style="width:100%" src="/static/img/p6925.jpg">');});
    $('#p6926').click(function() {$('#p6926dimg').html('<img style="width:100%" src="/static/img/p6926.jpg">');});
    $('#p6927').click(function() {$('#p6927dimg').html('<img style="width:100%" src="/static/img/p6927.jpg">');});
    $('#p6928').click(function() {$('#p6928dimg').html('<img style="width:100%" src="/static/img/p6928.jpg">');});
    $('#p6929').click(function() {$('#p6929dimg').html('<img style="width:100%" src="/static/img/p6929.jpg">');});
    $('#p6930').click(function() {$('#p6930dimg').html('<img style="width:100%" src="/static/img/p6930.jpg">');});
    $('#p6931').click(function() {$('#p6931dimg').html('<img style="width:100%" src="/static/img/p6931.jpg">');});
    $('#p6932').click(function() {$('#p6932dimg').html('<img style="width:100%" src="/static/img/p6932.jpg">');});
    $('#p6933').click(function() {$('#p6933dimg').html('<img style="width:100%" src="/static/img/p6933.jpg">');});
    $('#p6934').click(function() {$('#p6934dimg').html('<img style="width:100%" src="/static/img/p6934.jpg">');});
    $('#p6935').click(function() {$('#p6935dimg').html('<img style="width:100%" src="/static/img/p6935.jpg">');});
    $('#p6936').click(function() {$('#p6936dimg').html('<img style="width:100%" src="/static/img/p6936.jpg">');});
    $('#p6937').click(function() {$('#p6937dimg').html('<img style="width:100%" src="/static/img/p6937.jpg">');});
    $('#p6938').click(function() {$('#p6938dimg').html('<img style="width:100%" src="/static/img/p6938.jpg">');});
    $('#p6939').click(function() {$('#p6939dimg').html('<img style="width:100%" src="/static/img/p6939.jpg">');});
    $('#p6940').click(function() {$('#p6940dimg').html('<img style="width:100%" src="/static/img/p6940.jpg">');});
    
    //p71템포스톰 14
    $('#p7101').click(function() {$('#p7101dimg').html('<img style="width:100%" src="/static/img/p7101.jpg">');});
    $('#p7102').click(function() {$('#p7102dimg').html('<img style="width:100%" src="/static/img/p7102.jpg">');});
    $('#p7103').click(function() {$('#p7103dimg').html('<img style="width:100%" src="/static/img/p7103.jpg">');});
    $('#p7104').click(function() {$('#p7104dimg').html('<img style="width:100%" src="/static/img/p7104.jpg">');});
    $('#p7105').click(function() {$('#p7105dimg').html('<img style="width:100%" src="/static/img/p7105.jpg">');});
    $('#p7106').click(function() {$('#p7106dimg').html('<img style="width:100%" src="/static/img/p7106.jpg">');});
    $('#p7107').click(function() {$('#p7107dimg').html('<img style="width:100%" src="/static/img/p7107.jpg">');});
    $('#p7108').click(function() {$('#p7108dimg').html('<img style="width:100%" src="/static/img/p7108.jpg">');});
    $('#p7109').click(function() {$('#p7109dimg').html('<img style="width:100%" src="/static/img/p7109.jpg">');});
    
    
});