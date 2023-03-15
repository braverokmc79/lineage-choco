////
////
//// created: 2018-08-13
//// author: scpark
//// description: async 광고 배너 뷰 API 서버 통신
////
////


var ddaacAdUrl = 'http://ddaac.cafe24.com/ad/code/';
var windowWidth = window.innerWidth;
var size = getAdsSize();
var percent = 0;
var zero = 0;
var half = 0.5;

function getAdsFromDdacApi(placeId, size, parent, device) {
//	if (device != 'iOS') device = 'etc';
	$.ajax({
		type: "POST",
	    dataType: "html",
	    url: ddaacAdUrl,
	    data: {
	    	place_id: placeId,
	    	size: size,
	    	device: device
	    },
	    success: function (d) {
	    	parent.append(d);
	    	return d;
	    }, error: function (e) {
	    	return 0;
	    }
	});
}

function checkMobileDevice() {
	if ( stristr($_SERVER['HTTP_USER_AGENT'],'ipad') ) {
//	    return "ipad";
		return 'iOS';
	} else if( stristr($_SERVER['HTTP_USER_AGENT'],'iphone') ||
	    strstr($_SERVER['HTTP_USER_AGENT'],'iphone') ) {
//		return "iphone";
		return 'iOS';
	} else if( stristr($_SERVER['HTTP_USER_AGENT'],'blackberry') ) {
		return "blackberry";
	} else if( stristr($_SERVER['HTTP_USER_AGENT'],'android') ) {
		return "android";
	} else {
		return "etc";
	}
}


function getAdsSize() {
	if (windowWidth >= 992)
		return 'lg';
	else if (windowWidth < 992 && windowWidth >= 768)
		return 'sm';
	else
		return 'xs'; 
}

// PC 수직 좌측 광고
	$('#pcVerticalLeftAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- pcVerticalLeft --><ins class="adsbygoogle"style="display:inline-block;width:300px;height:600px"data-ad-client="ca-pub-2592940546088488"data-ad-slot="8765553097"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');

// PC 수직 우측 광고
	$('#pcVerticalRightAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- pcVerticalRgith --><ins class="adsbygoogle"style="display:inline-block;width:300px;height:600px"data-ad-client="ca-pub-2592940546088488"data-ad-slot="9228587524"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');

// 모바일 메인 상단 광고
	$('#mMainUpperAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="7642374814" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 메인 하단 광고
	$('#mMainFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="8290926289" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 컨텐츠 메뉴 상단
	$('#contentsUpperAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="9608819330" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 컨텐츠 메뉴 하단
	$('#contentsFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="1815333062" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 컨텐츠 디테일 하단
	$('#mPostViewFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="7976173461" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 컨텐츠 디테일 내부 하단
	$('#mPostViewInsideBelowAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="3046817394" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 덱 메뉴 상단
	$('#deckUpperAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="6458969865" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 덱 메뉴 하단
	$('#deckFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block;" data-ad-client="ca-pub-2592940546088488" data-ad-slot="1558938921" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

//	 공통 덱 디테일 상단
	$('#deckViewUpperAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="3483637953" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 덱 디테일 하단
	$('#deckViewFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="9665902924" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 덱 디테일 내부
	$('#deckViewInsideAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="2908922887" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 덱 디테일 내부 하단
	$('#deckViewInsideBelowAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="5401873210" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

//	 공통 카드평가 내부 하단
	$('#cardEstimateFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="2062745073" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 카드평가 카드리스트 하단
	$('#cardEstimateViewFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="5174750306" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 모바일 카드평가 카드리스트 상단
	$('#mCardEstimateViewUpperAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="8104165970" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 트위터 상단
	$('#twitterUpperAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="9852361915" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 트위터 하단
	$('#twitterFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="4600035230" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 게시판 리스트 하단
	$('#boardFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="7721022592" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');
// 공통 게시판 글 하단
	$('#boardViewFooterAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="7861866662" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

// 공통 게시판 글 내부 하단
	$('#boardViewInsideAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="2801111679" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');

//테스트 광고
		$('#testAd').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2592940546088488" data-ad-slot="6458969865" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle || []).push({});</script>');
