// 접근성 - 비활성 처리
function setInertness (dialog) {
	var ommits = ["script", "meta", "link", "style", "base"];
	for(var i = -1, node; node = dialog.parentNode.children[++i];){
		if(node == dialog || ommits.indexOf(node.tagName.toLowerCase()) > -1)
			continue;
		// 대화상자 외 요소들에 `aria-hidden=true`, `inert` 속성 설정
		node.setAttribute("aria-hidden", "true");
		node.setAttribute("inert", "");
	}
}
// 접근성 - 비활성화 처리 해제
function unsetInertness () {
	var nodes = $('[inert]');
	for(var i = -1, node = null; node = nodes[++i];){
		node.removeAttribute('aria-hidden');
		node.removeAttribute('inert');
	}

}


//약관 레이어 띄우기
function fnOpenLayer(trmsCd, e){
	var html;
	$.ajax({
		async:false,
		method: "POST",
		url: "/layerPopup.jsp",
		data: "trmsCd="+trmsCd
	})
	.done(function(data) {
		html = data;
	})
	.always(function() {
	});
	
	return html;
}

$(document).ready(function(){
	$('a').hover(function() {window.onbeforeunload=null;});

	/* s : 210112: 추가/수정 */
	// 하단 동의문 처리
	var agreePopId;
	$('.footerAgreePop').click(function(e){
		agreePopId = $(this).attr("id");
		
		var trmsCd = $(this).data("cd");
		if(trmsCd == undefined) trmsCd = $(this).attr("data-cd")

		// 약관 레이어 띄우기
		var html = fnOpenLayer(trmsCd, e);
		$('#layerAgreePopFooter .agreementFooter').html(html);

		$('#layerAgreePopFooter .dim').fadeIn();
		$('#layerAgreePopFooter .agreementFooter').fadeIn();
		$('#layerAgreePopFooter .layer-pop').attr("tabIndex", "0").focus(); /* 2022-04-20 수정 : 웹접근성 */


		// 하단 동의문 레이어팝업 닫기
		$('#layerAgreePopClose, #layerAgreePopCloseFirst').click(function(){ $("#layerAgreePop").attr('hidden',true);
			unsetInertness();
			$("#layerAgreePopCloseFirst").removeAttr("tabindex");
			$('#'+agreePopId).attr("tabIndex", "0").focus();
		});

		// 하단 동의문 레이어팝업 내 focus 이동
		$("#layerAgreePopClose").keydown(function(event) {
			if (event.keyCode == '9' && !event.shiftKey) {
				event.preventDefault();
				$("#layerAgreePopCloseFirst").attr("tabindex", "0").focus();
			}
		});

        //2022-01-05 웹접근성 추가 하단 이용약관, 개인정보처리방침 팝업 닫는 경우 포커스 이동
        $('#layerAgreePopFooter .agreementFooter .pop-btn .close').on('click', function(e){
            e.preventDefault();
            setTimeout(function(){
                $('#'+agreePopId).attr("tabIndex", "0").focus();
            });
        });

	});

	// 동의문 공통 영역 레이어팝업 내 focus 이동
	$('.agreewrapcss a').keydown(function(event) {
		if (event.keyCode == '9' && !event.shiftKey) {
			event.preventDefault();
			$('.openlayerChck .intextboxwrap').focus();
		}
	});
});

	/*e: 210112: 추가/수정*/

var openlayer = function(gubun){
	// 열린레이어 닫기
	$(".layeragreecss").removeClass("openlayerChck");
	$(".layeragreecss").fadeOut("fast");

	// 새로운 레이어 열기
	$("#layeragree"+gubun).addClass("openlayerChck");
	$("#layeragree"+gubun).fadeIn("fast");
	$("#layeragree"+gubun).focus();
}

var closelayer = function(gubun){
	$(".layeragreecss").removeClass("openlayerChck");
	$("#layeragree"+gubun).fadeOut("fast",function() {
		$(".agreewrap"+gubun).find("a").focus();
	});
}

function winResize(){

	if ($("#certifyWrap").length > 0) {
		gubun = "certifyWrap";
	} else if ($("#wrap").length > 0) {
		gubun = "wrap";
	} else if ($("#bridgeWrap").length > 0) {
		gubun = "bridgeWrap";
	} else {
		gubun = "mainCertifyWrap";
	}

	// 리사이징
	var w,h
	if(window.innerWidth && window.innerHeight && window.outerWidth && window.outerHeight) {
		w = $('#'+gubun).outerWidth() + (window.outerWidth - window.innerWidth);
		h = $('#'+gubun).outerHeight() + (window.outerHeight - window.innerHeight);
	} else {
		var dw = $(document).outerWidth();
		var dh = $(document).outerHeight();

		var ww = $(window).width();
		var wh =$(window).height();
		window.resizeTo(dw,dh);

		var lastw = dw - $(window).width();
		var lasth = dh - $(window).height();
		w = $('#'+gubun).outerWidth() + lastw;
		h = $('#'+gubun).outerHeight() + lasth;
	}

	window.resizeTo(w,h);//2021-11-08 수정
}

$(function()
{
	$(document).on("keyup","input:text[numberOnly]",function(){$(this).val(
	$(this).val().replace(/[^0-9]/gi,""));});
});

function maxLengthCheck(object,len) {
	if (object.value.length > len) {
		object.value = object.value.slice(0,len);
	}
}


// POST방식으로 페이지 이동, 오류 발생시 GET으로 전달
function goPostUrl(url, param) {
	try {
		var f = document.createElement("form");
		f.method = "post";
		f.name = "postForm";
		f.action = url;

		for (var p in param) {
			var inputData = document.createElement("input");
			inputData.type = "hidden";
			inputData.name = p;
			inputData.value = param[p];
			f.appendChild(inputData);
		}
		document.body.appendChild(f);
		f.submit();
	} catch(e) {
		var getUrl = url + "?accesstoken=getToken";
		for (var p in param) {
			getUrl = getUrl + "&" + p+"="+param[p];
		}
		location.href = getUrl;
	}
}

// POST방식으로 페이지 이동, 오류 발생시 GET으로 전달
function goPostTargetUrl(url, param, target) {
	try {
		var f = document.createElement("form");
		f.method = "post";
		f.target = target;
		f.name = "postForm";
		f.action = url;

		for (var p in param) {
			var inputData = document.createElement("input");
			inputData.type = "hidden";
			inputData.name = p;
			inputData.value = param[p];
			f.appendChild(inputData);
		}
		document.body.appendChild(f);
		f.submit();
	} catch(e) {
		alert("페이지 호출에 실패했습니다.");
	}
}

// ajax로 구현 변경
function fnCaptchaCheck(gubun) {
	// 자동인증 방지 문자 확인
	if (document.frm.answer.value == '') {
		alert('보안숫자를 입력해 주세요.');
		document.frm.answer.focus();
		return false;
	}
}

function checkWin() {
	var tp = navigator.platform;
	var ua= navigator.userAgent;

	if (tp == "Win32" || tp == "Win64"){
		if(ua.search("Windows Phone") >= 0){
			return "Windows Phone";
		} else {
			return "WINDOWS";
		}
	}
	return "NONE";
}

// 입력값 체크
function checkRegExp(value,type) {
	try {
		var regExp = new RegExp();
		if (type === 'MYNUM1') { // 주민번호 앞자리
			regExp = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
		} else if (type === 'MYNUM2') { // 주민번호 7번째 자리
			regExp = jc=/^\d{1}$/;
		} else if (type === 'JUMIN2') { // 주민번호 뒷자리 자리
			regExp = jc=/^\d{7}$/;
		} else if (type === 'BIRTHDATE') { // 생년월일 8자리
			regExp = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
		} else if (type === 'MOBILENO') { // 휴대폰번호
			regExp = /^(\d{3})(\d{3,4})(\d{4})$/;
		} else if (type === 'mbphn_no') { // 휴대폰번호
			regExp = /^(\d{3})(\d{3,4})(\d{4})$/;
		} else if (type === 'AUTHNUM') { // 인증 번호
			regExp = jc=/^\d{6}$/;
		} else if (type === 'NAME') { // 이름
			regExp = /\d/g;
			var rs = value.match(regExp);
			if (rs !== null && rs.length > 3) {
				return false;
			}
			if (startsOrEndsWithWhitespace(value)) {
				return false;
			}
			return true;
		}
		// 정규식 결과
		return regExp.test(value);
	} catch (e) {
		//console.log(e);
		return true;
	}
}

function startsOrEndsWithWhitespace(value) {
	return /^\s|\s$/.test(value);
}

function containsWhitespace(value) {
	return /\s/.test(value);
}
