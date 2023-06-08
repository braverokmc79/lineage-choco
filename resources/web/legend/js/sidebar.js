var sidebar_id;
var sidebar_size = "-320px";

function is_sidebar() {
	var side;
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(width > 480) {
		side = 'left';
	} else {
		side = 'left';
	}
	return side;
}

function ani_sidebar(div, type, val) {
	if(type == "left") {
		div.animate({ left : val }); 
	} else {
		div.animate({ right : val }); 
	}
}

function sidebar_mask(opt) {
	var mask = $("#sidebar-box-mask");
	if(opt == 'show') {
		mask.show();
		$('html, body').css({'overflow': 'hidden', 'height': '100%'});
	} else {
		mask.hide();
		$('html, body').css({'overflow': '', 'height': ''});
	}
}

function sidebar_open(id) {

	var div = $("#sidebar-box");
	var side = is_sidebar();
	var is_div = div.css(side);
	var is_size;
	var is_open;
	var is_show;

	if(id == sidebar_id) {
		if(is_div === sidebar_size) {
			is_show = false;
			ani_sidebar(div, side, '0px'); 
			if(side == "left") {
				sidebar_mask('show');
			} else {
				sidebar_mask('hide');
			}
		} else {
			is_show = false;
			ani_sidebar(div, side, sidebar_size); 
			sidebar_mask('hide');
		}
	} else {
		if(is_div === sidebar_size) {
			is_show = true;
			ani_sidebar(div, side, '0px'); 
		} else {
			is_show = true;
		}

		if(side == "left") {
			sidebar_mask('show');
		} else {
			sidebar_mask('hide');
		}
	}



	sidebar_id = id;

	return false;
}

function sidebar_href(url) {

	$('.sidebar-menu .panel-collapse').hide();

	document.location.href = decodeURIComponent(url);

	return false;
}



// sidebar Response Count
function sidebar_response() {

	var $labels = $('.sidebarLabel');
	var $counts = $('.sidebarCount');
	var url = sidebar_url + '/response.php?count=1';

	$.get(url, function(data) {
		if (data.count > 0) {
			$counts.text(number_format(data.count));
			$labels.show();
		} else {
			$labels.hide();
		}
	}, "json");
	return false;
}


$(document).ready(function () {

	$('.sidebar-close').on('click', function () {
		var div = $("#sidebar-box");
		var side = is_sidebar();
		ani_sidebar(div, side, sidebar_size); 
		sidebar_mask('hide');
		return false;
    });

	// Sidebar Menu
	$('.sidebar-menu .ca-head').on('click', function () {
		var clicked_toggle = $(this);

		if(clicked_toggle.hasClass('active')) {
			clicked_toggle.parents('.sidebar-menu').find('.ca-head').removeClass('active');
		} else {
			clicked_toggle.parents('.sidebar-menu').find('.ca-head').removeClass('active');
			clicked_toggle.addClass('active');
		}
	});

	// Sidebar Goto Top
	$('.sidebar-scrollup').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });

	// Sidebar Change
	$(window).resize(function() {
		var side = is_sidebar(); 
		if(side == 'left') {
			side = 'right';
		} else {
			side = 'left';
		}
		if($("#sidebar-box").css(side) != '') {
			$("#sidebar-box").css(side, '');
			sidebar_mask('hide');
		}
	});
	
	
	
   $('.menu-li .menu-a').hover(function(){
		$(this).addClass("on-menu");
		$('.menu-ul').addClass('on-hover');
	},function(){
		$(this).removeClass("on-menu");
		$('.menu-ul').removeClass('on-hover');
	});
	
	$(".nav-user a").on("mouseover", function(e){
		$(".nav-user a").css("color", "rgba(255,255,255,.3)");
		$(this).css("color", "#fff");
	});

	$(".nav-user a").on("mouseout", function(e){
		$(".nav-user a").css("color", "#fff");
	});
});