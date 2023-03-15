/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	config.language = 'ko';
    config.uiColor = '#aeb8e3';
    config.height = 700;
    config.toolbarCanCollapse = true;
    //config.font_defaultLabel ='나눔';
    config.fontSize_defaultLabel ='12px';
    config.font_names = '나눔/Nanum Gothic;노토산/Noto Sans KR;굴림/Gulim;돋움/Dotum;바탕/Batang;궁서/Gungsuh;맑은 고딕/Malgun;Arial/arial;Comic Sans MS/comic;Courier New/cour;Georgia/georgia;Lucida Sans/LSANS;Tahoma/tahoma;Times New Roman/times;Trebuchet MS/trebuc;Verdana/verdana;';    // 사용 가능한 폰트 설정
};
