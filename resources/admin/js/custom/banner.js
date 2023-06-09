$(document).ready(function() {
	$("input:file[name='uploadfile']").change(function() {
		var str = $(this).val();
		var fileName = str.split('\\').pop().toLowerCase();
		//alert(fileName);

		if (!checkFileName(fileName)) {
			$(this).val("");
		}
	});


	$('.toolbar_unit:last-child').css('display', 'none');
	$('.toolbar_unit:first-child').css('display', 'none');

	$('.image-link').magnificPopup({
		type: 'image',
	});
});


function writeBtn() {
	$("#frm1").submit();
}


function fileUploadCheck(fileVal) {
	//파일명 길이
	let fileLength = fileVal.length;
	//파일의 확장자 추출
	let fileDot = fileVal.lastIndexOf(".");
	//파일의 확장자 소문자로 변경
	
	return fileVal.substring(fileDot + 1, fileLength).toLowercase();
}




function readImage(input) {

	// 인풋 태그에 파일이 있는 경우
	if (input.files && input.files[0]) {

		// 이미지 파일인지 검사 (생략)

		// FileReader 인스턴스 생성
		const reader = new FileReader()

		// 이미지가 로드가 된 경우
		reader.onload = e => {
			//document.getElementById("preview-image")
			const previewImage = $(input).parent(".file_area_sub").find("img").attr("src", e.target.result);

		}

		// reader가 이미지 읽도록 하기
		reader.readAsDataURL(input.files[0])
	}
}



function checkFileName(str) {

	//1. 확장자 체크
	var ext = str.split('.').pop().toLowerCase();
	if ($.inArray(ext, ['zip', 'jpg', 'jpeg', 'png', 'gif', 'bmp']) == -1) {
		//alert(ext);
		alert(ext + '파일은 업로드 하실 수 없습니다.');

		return false;
	}

	//2. 파일명에 특수문자 체크
	var pattern = /[\{\}\/?,;:|*~`!^\+<>@\#$%&\\\=\'\"]/gi;
	if (pattern.test(str)) {
		//alert("파일명에 허용된 특수문자는 '-', '_', '(', ')', '[', ']', '.' 입니다.");
		alert('파일명에 특수문자를 제거해주세요.');

		return false;
	}

	return true;
}


/* 업로드 체크 */
function fileCheck(e) {
	// 사이즈체크
	const maxSize = 2 * 1024 * 1024    //2MB
	let fileSize = 0;

	// 브라우저 확인
	const browser = navigator.appName;

	// 익스플로러일 경우
	if (browser == "Microsoft Internet Explorer") {
		var oas = new ActiveXObject("Scripting.FileSystemObject");
		fileSize = oas.getFile(file.value).size;
	} else {
		fileSize = e.files[0].size;
	}

	if (fileSize > maxSize) {
		alert("첨부파일 사이즈는 2MB 이내로 등록 가능합니다.    ");
		$(e).val("");
		return;
	}

	readImage(e);
}





function findBoardTypeByTitleList(event) {
	const boardType = event.value;

	if (boardType) {
		$.ajax({
			type: "POST",
			url: "/admin/scheduleManage/findBoardTypeByTitleList",
			data: { boardType },
			success: function(res) {

				
				const titleList = res.map(board => {
					console.log(board.agoTime);
					let agoTime = "";
					if (parseInt(board.agoTime) >= 1) {
						agoTime = "[" + board.agoTime + "일전]"
					} else {
						agoTime = "[오늘]";
					}

					let title = "";
					if (board.title.length >= 20) {
						title = board.title.substring(0, 20) + "...";
					} else {
						title = board.title;
					}

					title = title + " " + agoTime;
					return ("<option  value='/board/" + boardType + "/read/" + board.bno + "' >" + title + "</option>")
				});

				$("#boardTitleList").html(titleList);
				setBoardLink();
			},
			error: function(err) {
				console.error("에러 : ", err);
			}
		})
	}
}

function setBoardLink() {
	const url = $("#boardTitleList").val();
	$('#url').val(url);
}




/*********************
 * 
 *  모달 창 제어
 * 
 */

//업데이트 모달show
function updateModalShow(bannerId) {
	//console.log("bannerId : ", JSON.stringify(bannerId));
	const param = {
		bannerId
	}
	$.ajax({
		url: "/admin/banner/updateModal",
		type: "post",
		contentType: "application/json",
		data: JSON.stringify(param),
		success: function(res) {
			console.log(res);
			const {bannerOrder, mainTitle,subTitle,subTitle2, url, atchPath ,atchFileName} =res;
			$("#modal-bannerId").val(bannerId);
			
			$("#modal-bannerOrder").val(bannerOrder);
			$("#modal-mainTitle").val(mainTitle);
			$("#modal-subTitle").val(subTitle);
			$("#modal-subTitle2").val(subTitle2);
			$("#modal-url").val(url);
			$("#modal-bannerId").val(bannerId);
	
	
	

	
			let html="";
			if(atchFileName!=null && atchFileName!="" ){
				
				let imgURL="";
				if(atchFileName.indexOf("https://") > -1){
					imgURL=atchFileName;
				
				}else{
					imgURL=`/displayFile?fileName=${atchPath}${atchFileName}`;
				}
				
				
				html=`<div class="modal-atch-img">	
		     		  <a href="#" onclick="return false" >
						 <img class="img-responsive" src="${imgURL}" onerror="this.src='https://via.placeholder.com/147x88'" />
		
					 </a>
				 <span id="deleteFileBanner">x</span>
				 </div>	`;
				 
				 
				 
				 $("#modal-file-message").hide();
				 
				 $('.image-link').magnificPopup({type: 'image'});

			}else{
				
				html=`<input type="file" name="uploadfile" class="" accept="image/*" id="modal-uploadfile" onchange="fileCheck(this)">`
				 $("#modal-file-message").show();
			}

			 $("#modal-file_area_sub").html(html);
						
			$("#deleteFileBanner").on("click", function(){
					deleteFileBanner();
			});
			
		},
		error: function(error) {
			console.error("에러 : ", error);
		}
	});

	$('#myModal').modal("show");
}

//모달 닫기
function closeModal() {
	$('#myModal').modal("hide");
}

function deleteBanner(){
	
	if(confirm("정말 삭제 하시겠습니까?")){
		const param = {
				bannerId:$("#modal-bannerId").val()
		}
		$.ajax({
			url: "/admin/banner/deleteBanner",
			type: "post",
			contentType: "application/json",
			data: JSON.stringify(param),
			success: function(res) {
				console.log("res : ", res);
				if(res=="success"){
					location.reload();
				}else{
					alert("파일 삭제 처리 오류");
				}
			},
			error: function(error) {
				console.error("에러 : ", error);
			}
		
		});
		
	}	
}


function deleteFileBanner(){
	if(confirm("정말 삭제 하시겠습니까?")){
		const param = {
				bannerId:$("#modal-bannerId").val()
		}
		$.ajax({
			url: "/admin/banner/deleteFileBanner",
			type: "post",
			contentType: "application/json",
			data: JSON.stringify(param),
			success: function(res) {
				//console.log("res : ", res);
				if(res=="success"){
					const html=`<input type="file" name="uploadfile" class="" accept="image/*" id="modal-uploadfile" onchange="fileCheck(this)">`
				 	$("#modal-file-message").show();
				 	$("#modal-file_area_sub").html(html);
				}else{
					alert("파일 삭제 처리 오류");
				}
				
				
			},
			error: function(error) {
				console.error("에러 : ", error);
			}
		
		});
		
	}	
}

/** 
 * 참조 : https://truecode-95.tistory.com/167
 * 
 * 
*/

function updateBanner(){
	let formData =new FormData();
	
	const data={
		"bannerId" :$("#modal-bannerId").val(),
		"bannerOrder" :$("#modal-bannerOrder").val(),
		"mainTitle" :$("#modal-mainTitle").val(),
		"subTitle" :$("#modal-subTitle").val(),
		"subTitle2" :$("#modal-subTitle2").val(),
		"url" :$("#modal-url").val()
	}
	
	// input class 값 
	let fileInput = $('#modal-uploadfile');
	// fileInput 개수를 구한다.
	for (var i = 0; i < fileInput.length; i++) {
		if (fileInput[i].files.length > 0) {
			for (var j = 0; j < fileInput[i].files.length; j++) {
				console.log(" fileInput[i].files[j] :::"+ fileInput[i].files[j]);
				
				// formData에 'file'이라는 키값으로 fileInput 값을 append 시킨다.  
				formData.append('uploadfile', $('#modal-uploadfile')[i].files[j]);
			}
		}
	}
	
	// 'key'라는 이름으로 위에서 담은 data를 formData에 append한다. type은 json  
	formData.append('bannerVO', new Blob([ JSON.stringify(data) ], {type : "application/json"}));

	$.ajax({
		url: "/admin/banner/updateBanner",
		type: "post",
 		data: formData,
	    contentType: false,               // * 중요 *
	    processData: false,               // * 중요 *
	    enctype : 'multipart/form-data',  // * 중요 *
		success: function(res) {
			if(res=="success"){
				location.reload();
			}else{
				alert("배너 수정 오류");
			}
			
		},
		error: function(error) {
			console.error("에러 : ", error);
		}
	
	});
	
}


function modalFindBoardTypeByTitleList(event) {
	const boardType = event.value;

	if (boardType) {
		$.ajax({
			type: "POST",
			url: "/admin/scheduleManage/findBoardTypeByTitleList",
			data: { boardType },
			success: function(res) {

				const titleList = res.map(board => {
					console.log(board.agoTime);
					let agoTime = "";
					if (parseInt(board.agoTime) >= 1) {
						agoTime = "[" + board.agoTime + "일전]"
					} else {
						agoTime = "[오늘]";
					}

					let title = "";
					if (board.title.length >= 20) {
						title = board.title.substring(0, 20) + "...";
					} else {
						title = board.title;
					}

					title = title + " " + agoTime;
					return ("<option  value='/board/" + boardType + "/read/" + board.bno + "' >" + title + "</option>")
				});

				$("#modal-boardTitleList").html(titleList);
				modalSetBoardLink();
			},
			error: function(err) {
				console.error("에러 : ", err);
			}
		})
	}
}

function modalSetBoardLink() {
	const url = $("#modal-boardTitleList").val();
	$('#modal-url').val(url);
}


