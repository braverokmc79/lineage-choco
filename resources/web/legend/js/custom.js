/*
 *  Amina App 1.0
 *
 *  Copyright (c) 2015 Amina
 *  http://amina.co.kr
 *
 */

(function($) {
	$.fn.amina_menu = function(option) {
        var cfg = { name: '.sub', show: '', hide: '' };

		if(typeof option == "object")
            cfg = $.extend(cfg, option);

		var subname = cfg.name;
		var submenu = $(this).find(subname).parent();

		submenu.each(function(i){
			$(this).hover(
				function(e){
					var targetmenu = $(this).children(subname + ":eq(0)");
					if (targetmenu.queue().length <= 1) {
						switch(cfg.show) {
							case 'show'  : targetmenu.show(); break;
							case 'fade'  : targetmenu.fadeIn(300, 'swing'); break;
							default		 : targetmenu.slideDown(300, 'swing'); break;
						}
					}
				},
				function(e){
					var targetmenu = $(this).children(subname + ":eq(0)");
					switch(cfg.hide) {
						case 'fade'		: targetmenu.fadeOut(100, 'swing'); break;
						case 'slide'	: targetmenu.slideUp(100, 'swing'); break;
						default			: targetmenu.hide(); break;
					}
				}
			) //end hover
			$(this).click(function(){
				$(this).children(subname + ":eq(0)").hide();
			})
		}); //end submenu.each()

		$(this).find(subname).css({display:"none", visibility:"visible"});
	}
}(jQuery));

function go_page(url) {
	document.location.href = decodeURIComponent(url);
	return false;
}

function tsearch_submit(f) {

	if (f.stx.value.length < 2) {
		alert("검색어는 두글자 이상 입력하십시오.");
		f.stx.select();
		f.stx.focus();
		return false;
	}

	f.action = f.url.value;

	return true;
}

$(document).ready(function() {

    $('#favorite').on('click', function(e) {
        var bookmarkURL = window.location.href;
        var bookmarkTitle = document.title;
        var triggerDefault = false;

        if (window.sidebar && window.sidebar.addPanel) {
            // Firefox version < 23
            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
        } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
            // Firefox version >= 23 and Opera Hotlist
            var $this = $(this);
            $this.attr('href', bookmarkURL);
            $this.attr('title', bookmarkTitle);
            $this.attr('rel', 'sidebar');
            $this.off(e);
            triggerDefault = true;
        } else if (window.external && ('AddFavorite' in window.external)) {
            // IE Favorite
            window.external.AddFavorite(bookmarkURL, bookmarkTitle);
        } else {
            // WebKit - Safari/Chrome
            alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
        }

        return triggerDefault;
    });

	// Tooltip
    $('body').tooltip({
		selector: "[data-toggle='tooltip']"
    });

	// Mobile Menu
    $('#mobile_nav').sly({
		horizontal: 1,
		itemNav: 'centered', //basic
		smart: 1,
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: menu_startAt,
		speed: 300,
		elasticBounds: 1,
		dragHandle: 1,
		dynamicHandle: 1
    });

	if(menu_sub) {
		$('#mobile_nav_sub').sly({
			horizontal: 1,
			itemNav: 'centered', //basic
			smart: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: menu_subAt,
			speed: 300,
			elasticBounds: 1,
			dragHandle: 1,
			dynamicHandle: 1
		});
	}

	$(window).resize(function(e) {
		$('#mobile_nav').sly('reload');
		if(menu_sub) {
			$('#mobile_nav_sub').sly('reload');
		}
	});

	// Amina Menu
	$('.nav-slide').amina_menu({name:'.sub-slide', show: sub_show, hide: sub_hide});

	// Carousel Swipe
	$(".swipe-carousel").swiperight(function(e) {
		e.preventDefault();
		$(this).carousel('prev');
	});
	
	$(".swipe-carousel").swipeleft(function(e) {  
		e.preventDefault();
		$(this).carousel('next');
	});

	// Top & Bottom Button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 250) {
			$('#go-btn').fadeIn();
		} else {
			$('#go-btn').fadeOut();
		}
	});

	$('.go-top').on('click', function () {
		$('html, body').animate({ scrollTop: '0px' }, 500);
		return false;
	});

	$('.go-bottom').on('click', function () {
		$('html, body').animate({ scrollTop: $(document).height() }, 500);
		return false;
	});



	// 군주
	$(".c_1").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic1.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	// 기사
	$(".c_2").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic2.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".c_3").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic3.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".c_4").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic4.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".c_5").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic5.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".c_6").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic6.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".c_7").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic7.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});



	// 군주
	$(".m_1").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic1.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_armor.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	// 기사
	$(".m_2").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic2.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_armor.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".m_3").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic3.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_armor.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".m_4").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic4.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_armor.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".m_5").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic5.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_armor.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".m_6").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic6.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_armor.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".m_7").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic7.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_armor.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});


	// 군주
	$(".e_1").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic1.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_etc.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	// 기사
	$(".e_2").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic2.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_etc.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".e_3").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic3.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_etc.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".e_4").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic4.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_etc.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".e_5").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic5.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_etc.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".e_6").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic6.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_etc.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});
	$(".e_7").click(function(){
		var item_sca = $("input[name=item_sca]").val();
		var item_stx = $("input[name=item_stx]").val();
		var item_class = "ic7.png";
		$(".table-item").remove();
		//alert(item_sca);
		var url = "/ajax_item_etc.php";
		var params = "item_sca="+item_sca+"&item_stx="+item_stx+"&item_class="+item_class;
		$.ajax({      
			type:"POST",  
			url:url,
			data:params,
			success:function(data){
				if(data){
					$("#item-result").html(data);
				}
			}
		});
	});




});
