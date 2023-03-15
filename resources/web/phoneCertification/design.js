// window size responsive

$(function(){
	// checkbox 이미 체크되어 있을 경우
	$('input[type="checkbox"]').each(function(){
		checkboxSet($(this));
	});

	// cheecbox 클래스 add/remove
	$(document).on('change', 'input[type="checkbox"]', function(){
		checkboxSet($(this));
	});

	// radio 클래스 add/remove
	$(".licensee-list").on('change', 'input[type="radio"]', function(){
		$('input[type="radio"]').next('label').removeClass('checked');
		checkboxSet($(this));
	});

	$('.licensee-list').on('click', 'label', function(){
		if(navigator.appVersion.indexOf('MSIE') != -1){
			$("#" + $(this).attr("for")).click();

			$('input[type="radio"]').next('label').removeClass('checked');
			if($("#" + $(this).attr("for")).prop('checked')){
				$("#" + $(this).attr("for")).next('label').addClass('checked');
			}
		}
	});

	// radio 클래스 add/remove + .current
	$(".agency_select").on('change', 'input[type="radio"]', function(){
		$('input[type="radio"]').next('label').removeClass('checked').find('.current').remove();

		if($(this).prop('checked') == true ){
			$(this).next('label').addClass('checked').append('<span class="current"></span>');
		}
	});

	$('.agency_select').on('click', 'input[type="radio"]+label', function(){
		if(navigator.appVersion.indexOf('MSIE') != -1){
			$("#" + $(this).attr("for")).click();

			$('input[type="radio"]').next('label').removeClass('checked').find('.current').remove();

			if($("#" + $(this).attr("for")).prop('checked')){
				$("#" + $(this).attr("for")).next('label').addClass('checked').append('<span class="current"></span>');
			}
		}
	});
});

function checkboxSet(input){
	if(input.prop('checked')){
		input.next('label').addClass('checked');
	} else {
		input.next('label').removeClass('checked');
	}
}

// GNB 갯수에 따른 class명
function gnbSet(){
	if($('.gnb_wrap').length){
		var gnbLen = $('.gnb_wrap').find('li').length;
		$('.gnb_wrap').addClass('col-'+gnbLen);
	}
}
$(function(){
	$(window).on("load", function(){
		gnbSet();
	});
});

// setting fn
$(function(){
	$.fn.extend({
		// input focus
		inputFocus: function () {
			var $input = $('.input input, .input textarea');
			$input.focus(function(){
				$(this).parent().addClass('focus');
				if($(this).parent('.input_mynum').length > 0){
					$(this).parent().parent().parent().parent().addClass('focus');
				}
			}).blur(function(){
				$(this).parent().removeClass('focus');
				if($('.input').children('textarea').length){
					$('.input textarea').parent().addClass('textarea');
				}
				if($(this).parent('.input_mynum').length > 0){
					$(this).parent().parent().parent().parent().removeClass('focus');
				}
			}).blur();
			$('.input_cal input').focus(function(){
				$(this).parent().removeClass('focus');
			});
		}
	});
});

// 통신사 선택 시
$(function(){
	$(".agreelist .check2").on("click", function() {
		var Count = $('.agreelist.required input:checked').length;

		if($(this).parents().hasClass('all')){
			agreeAll();
		} else {
			if(Count == $(".agreelist.required li").length){
				$('.btn_skip').addClass('on');
				$('.agreelist.all li input').prop('checked', true).next('label').addClass('checked');
			} else {
				$('.btn_skip').removeClass('on');
				$('.agreelist.all li input').prop('checked', false).next('label').removeClass('checked');
			}
		}
	});
});

// 전체 동의 시
function agreeAll(){
	if($(".agreelist.all li input").prop("checked")){
		$('.agreelist.required .check2 input').prop("checked", true).next('label').addClass('checked');
		$('.btn_skip').addClass('on');
	}else{
		$('.agreelist.required .check2 input').prop("checked", false).next('label').removeClass('checked');
		$('.btn_skip').removeClass('on');
	}
}

// PASS 인증 동그라미 ani
function twinkle(){
	setTimeout(function(){
		$(".twinkle>div:eq(0)").addClass("on");
	}, 0);
	setTimeout(function(){
		$(".twinkle>div:eq(1)").addClass("on");
	}, 500);
	setTimeout(function(){
		$(".twinkle>div:eq(2)").addClass("on");
	}, 1000);
	setTimeout(function(){
		$(".twinkle>div:eq(3)").addClass("on");
	}, 1500);
	setTimeout(function(){
		$(".twinkle>div:eq(4)").addClass("on");
	}, 2000);
	setTimeout(function(){
		$(".twinkle>div:eq(5)").addClass("on");
	}, 2500);
}

// 주민등록번호
$(function(){
	if($(".mynum").length > 0){
		$(".input_mynum input").bind("keyup", function(e) {
			var keyCode = e.keyCode || e.which;
			var byte = $(this).val();
			var del = $(this).val()+1;
			var _this = $(this).parent();
			_this.find('.mark i').removeClass();
			if(byte.length == 1){
				_this.find('.mark i:eq(0)').addClass('on');
			}else if(byte.length == 2){
				_this.find('.mark i:eq(0)').addClass('on');
				_this.find('.mark i:eq(1)').addClass('on');
			}else if(byte.length == 3){
				_this.find('.mark i:eq(0)').addClass('on');
				_this.find('.mark i:eq(1)').addClass('on');
				_this.find('.mark i:eq(2)').addClass('on');
			}else if(byte.length == 4){
				_this.find('.mark i:eq(0)').addClass('on');
				_this.find('.mark i:eq(1)').addClass('on');
				_this.find('.mark i:eq(2)').addClass('on');
				_this.find('.mark i:eq(3)').addClass('on');
			}else if(byte.length == 5){
				_this.find('.mark i:eq(0)').addClass('on');
				_this.find('.mark i:eq(1)').addClass('on');
				_this.find('.mark i:eq(2)').addClass('on');
				_this.find('.mark i:eq(3)').addClass('on');
				_this.find('.mark i:eq(4)').addClass('on');
			}else if(byte.length == 6){
				_this.find('.mark i:eq(0)').addClass('on');
				_this.find('.mark i:eq(1)').addClass('on');
				_this.find('.mark i:eq(2)').addClass('on');
				_this.find('.mark i:eq(3)').addClass('on');
				_this.find('.mark i:eq(4)').addClass('on');
				_this.find('.mark i:eq(5)').addClass('on');
			}else{
				_this.find('.mark i').removeClass();
			}
		});
	}
});

// common fn
$(function(){
	$(".input").inputFocus();
});

//layer-popup
function pop_open(){
	$('.dim').fadeIn(200);
	$('.layer-pop').fadeIn(200);
	$(".input").inputFocus();
}

function pop_close(){
	$('.dim').fadeOut(200);
	$('.layer-pop').fadeOut(200);

	// _focus = $(this);
	$(this).focus();

	// $('#wrap #header').attr("tabIndex" , "0").focus();  /* 210118: 추가/수정 */
}

$(function(){
	// 팝업 클릭 시
	var _focus = '';
	$('body').on('click', '.btn_popup', function(){
		_focus = $(this);
		_focus.focus();
		pop_open();
	});

	// 팝업 닫기 시
	$('body').on('click', '.pop-btn .close', function(){
		_focus = $(this);
		_focus.focus();
		pop_close();
	});

	// 팝업 오픈 시 텝 이동
	$(".pop-btn .close").keydown(function(event) {
		 if (event.keyCode == '9' && !event.shiftKey) {
			event.preventDefault();
			$(".layer-pop").attr("tabIndex" , "0").focus();/* 210118: 추가/수정 */
			//$(".pop-con_02").attr("tabIndex" , "0").focus();/* 2022-04-20 삭제 : 웹접근성 */
		}
	});
});


//2021-10-27 추가 : #wrap 여백 컨트롤 footer fixed 대응
$(function(){

    var el = $('#wrap');
    var $footer = el.find('#footer');
    var $banner = el.find('.footerBanner');

    if($banner.length > 0){
        el.css({
            "padding-bottom" : $footer.outerHeight() + $banner.outerHeight()
        });
    }else if($footer.length > 0){
        el.css({
            "padding-bottom" : $footer.outerHeight()
        });
    }
});