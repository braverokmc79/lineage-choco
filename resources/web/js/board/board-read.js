
const bno=$("#bno").val();
const title=$("#title").val();
const place=$("#place").val();
const fileName=$("#fileName").val();
const address=$("#address").val();
const username=$("#board_username").val();
const createdDate=$("#createdDate").val();
const customDate=$("#customDate").val();
const likeCnt=$("#likeCnt").val();
const viewCnt=$("#viewCnt").val();
const replyCnt=$("#replyCnt").val();




///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


$(document).ready(function(){	
	

	
	//추천 like 불러오기
	 getLike();
	 //댓글 불러오기
	 replyList();
	
	$('.board-edit-input').focusin(function() {
		$(this).css("border", "1px solid #607d8b");
	});

	$('.board-edit-input').focusout(function() {
		$(this).css("border", "1px solid #ececec");
	});

	
//////////////////////////////
	//로그인 후 게시판 작성한 한 유저
//////////////////////////////
	
		$('.editBoardLoginedUser').click(function(){	
			var sId =$("#USER_userId").val();
			var bId=$("#board_userId").val();
			var isAdmin=$("#isAdmin").val();
			if(sId != bId && isAdmin=="false") {			
				alert("관리자 또는 글작성자만 게시글만 삭제 가능합니다.");	
				return;
				
			}else {		
				$("#directForm").submit();
			}
		});

		
		$('.deleteBoardLoginedUser').click(function(){
			var sId =$("#USER_userId").val();
			var bId=$("#board_userId").val();
			var isAdmin=$("#isAdmin").val();
			if(sId != bId && isAdmin=="false") {
				alert("관리자 또는 글작성자만 게시글만 삭제 가능합니다.");	
				return;
			}else {					
				if (confirm("정말 삭제하시겠습니까?")) {
					$.ajax({
						type: "POST",
						dataType: "text",
						url: $("#board_url").val()+"/removeDirect",
						data: {
							bno: $("#bno").val()
						},
						success: function (result) {		
							if ($.trim(result) == "SUCCESS") {
								//tSuccess("삭제 처리 되었습니다.");
								location.href=$("#board_url").val()+"/list";
							} else 
								alert(msg);
						}
					});
				}			
			}			
		});

//////////////////////////////
			//비밀번호로 게시판 작성한  유저
//////////////////////////////

		var modal = $('#boardModal');
		var tip = $('.board-edit-tip');
		var title = $('.modal-title');
		var body = $('.modal-body');
		var editType = $('.editType');
		
		$('.editBoard').click(function() {
			editType.text("1");
			title.text("게시글 수정");
			$("#modalSubmit").val("수정");
			$(".board-edit-input").val("");
			tip.empty();
			tip.append("<p class='board-edit-tip'>* 작성 시 입력하신 비밀번호를 입력해주세요.</p>");
		});

		$('.deleteBoard').click(function() {
			editType.text("2");
			title.text("게시글 삭제");
			$("#modalSubmit").val("삭제");
			$(".board-edit-input").val("");
			tip.empty();
			tip.append("<p class='board-edit-tip'>* 작성 시 입력하신 비밀번호를 입력해주세요.</p>");
		});
		
		
		
		
		

		$('.board-edit-submit').click(function() {
			var boardPassword = $('.board-edit-input').val();
			var type = $('.editType').text();
			var section = $('#editType').text();

			if(boardPassword==""){
				alert("비밀번호를 입력해 주세요.");
				$('.board-edit-input').focus();
				return;
			}
			
			if(type=='1'){				
				$.ajax({
					url:"/board/passwordConfirm",
					type:"post",
					dataType:"text",
					data:{
						bno:$("#bno").val(),
						boardPassword:boardPassword			
					},
					success:function(result){	
						console.log(result);
						var re= $.trim(result);	
						if(re==0){
							alert("비밀번호가 일치하지 않습니다.");
							$('.board-edit-input').val("");
							return;
						}
						
						if(re==1){
							$("#directForm").attr("action", "/board/boardEdit");
							$("#formPw").val(boardPassword);
							$("#directForm").submit();
						}
						
					},error:function(result){
						console.log(result);
						
					}
				});									
				
			}
			
			
			if(type=='2'){
				$.ajax({
					url:"/board/passwordConfirm",
					type:"post",
					dataType:"text",
					data:{
						bno:$("#bno").val(),
						boardPassword:boardPassword			
					},
					success:function(result){	
						console.log(result);
						var re= $.trim(result);	
						if(re==0){
							alert("비밀번호가 일치하지 않습니다.");
							return;
						}
						
						
						if(re==1){
							$.ajax({
								type: "POST",
								dataType: "text",
								url: $("#board_url").val()+"/remove",
								data: {
									bno: $("#bno").val(),
									boardPassword:boardPassword
								},
								success: function (result) {		
									if ($.trim(result) == "SUCCESS") {
										alert("삭제되었습니다.");
										location.href="/board/list";
									} else 
										alert(msg);
								}
							});
						}
						
					},error:function(result){
						console.log(result);
						
					}
				});									
				
				
			}
			
			
		});	

		
//////////////////////////////
//////////////////////////////
		
	// 추천/추천취소 버튼 클릭 시 이벤트 
	$('#boardThumb').click(function (e) {
		e.preventDefault();
		
		const uid=$("#USER_uid").val();
		if(!uid){
			alert("로그인후 이용 가능합니다.")
			return; 
		}
		
		$.ajax({
			type: "POST",
			dataType: "text",
			data:{
				bno:$("#bno").val(),
				uid:uid
			},
	        url: "/like/update",
	        success:function(result){	        	
	        	let cnt =Number($("#likeCount").val());
	        	console.log(" result : ", result,  cnt);
	        	let html ='';
	        	if(Number(result)===1){
	        		cnt=cnt+1;
	        		html +='<img class="board-star-img" src="/resources/web/images/star.png">';
	        		html +='<div style="color: #999; display: inline;">추천 취소</div> ';
	        		html +='<input type="hidden" id="likeCount" value="'+cnt+'">';
	        		
	        	}else if(Number(result)===0){
	        		cnt=cnt-1;	        		
	        		html +='<img class="board-star-img" src="/resources/web/images/star_grey.png">'; 
	        		html +='<span style="color: #999;">추천</span>';     
	        		html +='<input type="hidden" id="likeCount" value="'+cnt+'">';		        		
	        	}
	        	$('#boardThumb').html(html);
	        	$("#topLikeCount").html("<img class='board-star-img' src='/resources/web/images/star_grey.png'>"+cnt+"</span>");
	        	
	        }, error: function (result) {
	        	console.log(result);
	        }
		});
	});
		

	
//////////////////////////////
//////////////////////////////댓글 
//	private String boardType; 	
//	private String boardSubType;


  //댓글 등록
  $("#clicktoshow3").on("click", function(e){
	   var sessionCheck=$("#USER_userId").val();
		
	   var bno =$("#bno").val();
	   var content=$("#content").val();
	   const isSecret=$("#isSecret").is(":checked");
	   const boardType=$("#board_type").val();
 	   const boardSubType=$("#boardSubType").val();
		   
	  if(content==""){
		  alert("내용을 입력해 주세요.");
		  return;
	  }
		
	   if(sessionCheck==""){
		   var username=$("#clicktoshow1").val();
		   var replyPassword=$("#clicktoshow2").val();
		   
		   if(username==""){
			   alert("작성자를 입력해 주세요.");
			   return;
		   }
		   
		   if(replyPassword==""){
			   alert("비밀번호를 입력해 주세요.");
			   return;
		   }
	   }
	  
	  
		$.ajax({
			url:"/comment/replies/create",
	        type:"post",
			data :{
				bno:  bno,
				content: content,
				username:username,
				replyPassword:replyPassword,
				isSecret:isSecret,
				boardType:boardType,
				boardSubType:boardSubType
			},
			dataType:'text',		
			success:function(result){
				if(result=="success"){
					replyList();
					tSuccess("등록 되었습니다.");
					$("#content").val("");
					$("#clicktoshow1").val("");
					$("#clicktoshow2").val("");
					
				}else{
					console.dir(result);	
				}
			},
			error:function(result){
				console.dir(result);
			}
		});
	  
  });





	$('.board-view-desc img').css('cursor', 'pointer');
	$('.board-view-desc img').click(function() {
		var url = $(this).attr('src');

		if (url.indexOf("http") != -1) {
			window.open(url, '_blank');
		} else { 
			window.open("/"+url, '_blank');
		}
	});




	$("#modalSubmit2").on("click", function(){
		var rno=$("#modalRno").val();
		var replyPassword=$("#modalPassword").val();		
		if(replyPassword==""){
			alert("비밀번호를 입력해 주세요.");
			return;
		}
		$.ajax({
			url:"/comment/replies/removePassowrd/"+rno,
			type:"post",
			dataTye:"text",
			data:{
				rno:rno,
				replyPassword:replyPassword
			},
			success:function(result){
				if($.trim(result)=="SUCCESS"){
					alert("삭제 했습니다.");
					location.reload();
				}else{
					alert("비밀번호가 일치하지 않습니다.");
					$("#modalPassword").val("");
				}
			},
			error:function(result){
				alert("비밀번호가 일치하지 않습니다.");
				$("#modalPassword").val("");
			}			
		});		
		
	});
	
	
	
	//쪽지 보내기
	$(".noteModal").on("click", function(){
			$("#note-title").val("");
			$("#note-textarea").val("");
			$("#note-uid").val($("#board_uid").val());
			$("#note-username").val($("#board_username").val());				
	});
	
	$("#note-send-btn").on("click", function(){
		const receiveId =$("#note-uid").val();
		const title =$("#note-title").val();
		const content=$("#note-textarea").val();
/*		if(!title){			
			tWarning("제목을 입력해 주세요.");
			$("#note-title").focus();
			return;
		}*/
		if(!content){			
			tWarning("내용을 입력해 주세요.");
			$("#note-textarea").focus();
			return;
		}
		$.ajax({
			url:"/note/send",
			type:"post",
			data:{receiveId,title,content},
			success:function(res){
				console.log("res");
				if(res==="success"){
					tSuccess("전송 처리 되었습니다.");
					$("#noteModal").modal("hide");
				}
			},
			error:function(error){
				tError("에러  : ",error);
				$("#noteModal").modal("hide");	
			}			
		})			
		
	});
	
	
	
	

});

let page=$("#page").val();
//getInList(page);
function getInList(page){
	if(page==undefined || page==""){
		page=1;
	}
	$.ajax({
		type: "GET",
		dataType: "html",
		data:{
			bno:$("#bno").val(),
			page:page
		},
        url: $("#board_url").val()+"/inlist",
        success: function (result) {
        	$(".board-container").html(result);
        	
    		//갤러리형 리스트형 전환 버튼
    		const listType =window.localStorage.getItem("listType");
    		//갤러리형 리스트형
  
    		if(listType===null|| listType==="gallery"){
    			$("#btn-listView").removeClass("right-board");
    			$("#btn-listView").addClass("default");    		
    			$("#listView").hide();
    			
    			$("#btn-galleryView").removeClass("default");
    			$("#btn-galleryView").addClass("right-board");
    			$("#galleryView").show();
    		}else{
    			$("#btn-galleryView").removeClass("right-board");
    			$("#btn-galleryView").addClass("default"); 
    			$("#galleryView").hide();
    			
    			$("#btn-listView").removeClass("default");
    			$("#btn-listView").addClass("right-board");
    			$("#listView").show();	
    		}
        	
        	//페이지 네이션
    		$(".board-paging li a").on("click", function(e){
				e.preventDefault();
				getInList(e.target.dataset.page);	
			})
        },
        error:function(result){
		  console.log( "error :  " ,result);
		  
        }        
	});	
}

prevNextBoard(page);
function prevNextBoard(page){
	if(page==undefined || page==""){
		page=1;
	}
	$.ajax({
		type: "GET",
		dataType: "html",
		data:{
			bno:$("#bno").val(),
			page:page
		},
        url: $("#board_url").val()+"/prevNextBoard",
        success: function (result) {
		
        	$(".prev_next_style").html(result);
        	
        },
        error:function(result){
		  console.log( "error :  " ,result);
		  
        }        
	});	
}


function getLike(){
	$.ajax({
		type: "GET",
		data:{bno:$("#bno").val()},
        url: "/like/list",
        success: function (res) {			
        	$("#topLikeCount").html("<img class='board-star-img' src='/resources/web/images/star_grey.png'><i class='topLikeCount-i'>"+res+"</i></span>");
        },
        error:function(result){
        	console.log(result);
        }        
	});	
}


//댓글 불러오기
function replyList(page){
	
	
	if(page=="" || page==undefined){
		page=1;
	}	
	var boardType=$("#board_type").val();
	
	var bno=$("#bno").val();
	var sessionCheck=$("#USER_username").val();		
	$.get("/comment/replies/all/"+bno +"?page="+page+"&boardType="+boardType, function(data){
		
		$("#comment_list_box").html(data);
		
		if(sessionCheck!=""){
			$("#clicktoshow1").val(sessionCheck);
		}
		dateFormat();
		
		var replyCount=$("#replyListSize").val();
		$("#boardComment2").html(replyCount);
		if(parseInt(replyCount)==0){
			$("#cmt-count-box").html("");
		}

		//페이지 네이션
		$(".reply-pagination a").on("click", function(e){
			e.preventDefault();
			replyList(e.target.dataset.page);	
		})
	});
		
}

//댓글 폼 열기
function updateReplyForm(rno){	
	$(".cmt-reply-box").hide();
	$("#mb_comment_reply_"+rno).show();	
}

function updateCancle(rno){
	replyList(1);
}



//댓글 업데이트 하기
function updateReply(rno){
	

	const content=$("#mb_content_"+rno).val();
	const isSecret=$("#mb_isSecret_"+rno).is(":checked");
	  
	if(!content){
		alert("내용을 입력해 주세요.");
		$("#mb_content_"+rno).foucs();
		return;
	}
	
	
	
	
	$.ajax({
		url:"/comment/replies/update",
		type:"put",
		data:{
			rno,
			content,
			isSecret
		},
		success:function(res){
			if ($.trim(res)=="success") {					
				replyList(1);
			}
		},
		error:function(error){
			console.log("에러 : ", error);
		}
	})
}



//로그인 한 유저 댓글 삭제
function replyDelete(rno){
	if (confirm("정말 삭제하시겠습니까?") == true) {
		$.ajax({
			type: "DELETE",
			url: "/comment/replies/delete/" + rno,
			success: function (result) {
				if ($.trim(result) == "SUCCESS") {					
					replyList(1);
				}
			}, error: function (d) {
				alert(d.error);
			}
		});
	}
}

//비밀번호로 댓글 삭제
function deleteComment(rno){
	$("#modalRno").val(rno);
}		




dateFormat1();
function dateFormat(){
	var moments = document.getElementsByClassName('moment');
	for (var i = 0; i < moments.length; ++i) {
	    var item = moments[i];  
	    item.innerHTML = moment(item.textContent, "YYYY-MM-DD hh:mm:ss").fromNow();
	}
}	

function dateFormat1(){
	var moments = document.getElementsByClassName('moment1');
	for (var i = 0; i < moments.length; ++i) {
	    var item = moments[i];  
	    item.innerHTML = moment(item.textContent, "YYYY-MM-DD hh:mm:ss").fromNow();
	}
}


function listView(){
	$("#btn-galleryView").removeClass("right-board");
	$("#btn-galleryView").addClass("default"); 
	$("#galleryView").hide();
	
	
	$("#btn-listView").removeClass("default");
	$("#btn-listView").addClass("right-board"); 
	$("#listView").show();	
	window.localStorage.setItem("listType", "list");
}

function galleryView(){
	$("#btn-listView").removeClass("right-board");
	$("#btn-listView").addClass("default");    		
	$("#listView").hide();
	
	$("#btn-galleryView").removeClass("default");
	$("#btn-galleryView").addClass("right-board");
	$("#galleryView").show();
	
	window.localStorage.setItem("listType", "gallery");
}



