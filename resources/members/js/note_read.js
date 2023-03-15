let messageInterval;


$(function(){
	//쪽지 보내기
	$(".noteModal").on("click", function(){
			$("#note-title").val("");
			$("#note-textarea").val("");
			$("#note-uid").val($("#sendId").val());
			$("#note-username").val($("#sendName").val());				
	});

	$("#note-send-btn").on("click", function(){
		const receiveId =$("#note-uid").val();
		const title =$("#note-title").val();
		const content=$("#note-textarea").val();
/* 		if(!title){			
			tWarning("제목을 입력해 주세요.");
			$("#note-title").focus();
			return;
		} */
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
					$("#noteModal").modal("hide");
					tSuccess("전송 처리 되었습니다.");
					getMessageList();
				}
			},
			error:function(error){
				tErrro("에러  : "+error);
				$("#noteModal").modal("hide");	
			}			
		})			
		
	});
	
	$(".msg_send_btn").on("click", function(event){		
		messgeSend();
	});
	
	
	$(".write_msg").on("keyup", function(event){
		 if (event.keyCode === 13) {
	    	  messgeSend();
	      }
	});
	
	const group=$("#group").val();
	if(parseInt(group)===1){
		$(".show-on-btn").html("전체쪽지 내용닫기");
		$(".show-on-btn").removeClass("btn-primary");
		$(".show-on-btn").addClass("btn-warning");
		noteShow();		
	}
	history.replaceState({}, null, location.pathname);
})



function messgeSend(){
	const receiveId =$("#note-uid").val();
	const content=$(".write_msg").val();
	if(!content){
		alert("내용을 입력해 주세요.");
		$(".write_msg").focus();
		return;
	}
	$.ajax({
		url:"/note/send",
		type:"post",
		data:{
			receiveId:$("#sendId").val(),
			title:null,
			content:content
		},
		success:function(res){
			console.log("res");
			if(res==="success"){				
				$("#noteModal").modal("hide");
				$(".write_msg").val("");
				getMessageList();
			}
		},
		error:function(error){
			console.log(" 에러 : ", error);				
		}			
	})			
	
}


function noteShow(e){	
	
	if($("#message-container").css("display")=="none"){	
		$("#noteShowText").hide();
		getMessageList();	
		
		let NOTICE_COUNT_SETINTERVAL=parseInt($("#NOTICE_COUNT_SETINTERVAL").val());
		messageInterval =setInterval(function(){			
			getMessageList();
		}, NOTICE_COUNT_SETINTERVAL);
		
		$(e).html("전체쪽지 내용닫기");
		$(e).removeClass("btn-primary");
		$(e).addClass("btn-warning");
	}else{
		$("#noteShowText").show();
		$(e).html("전체쪽지 내용보기");
		$(e).removeClass("btn-warning");
		$(e).addClass("btn-primary");
		
		
		clearTimeout( messageInterval );
	}
	$("#message-container").slideToggle();	
}

function getMessageList(){
	$.ajax({
		url:'/members/note/messageList',
		data:{sendId:$("#sendId").val()},
		success:function(res){
			$(".msg_history").html(res);	
			$(".msg_history").scrollTop($(".msg_history")[0].scrollHeight); 
		},
		error:function(error){
			console.log("error: ", error);
		}
	})
}

function deleteNote(noteId){	
	if(confirm("정말 삭제 하시겠습니까?")) {
		$.ajax({
			url:"/members/note/deleteNote",
			type:"delete",
			data:{noteId},
			success:function(res){
				if(res=="success"){
					 getMessageList();
				}
			},
			error:function(error){
				console.log("error : ", error);
			}
		});			
	}	
}


function deleteMyNote(noteId){	
	if(confirm("정말 삭제 하시겠습니까?")) {
		$.ajax({
			url:"/members/note/deleteMyNote",
			type:"delete",
			data:{noteId},
			success:function(res){
				if(res=="success"){				
					 getMessageList();
				}
			},
			error:function(error){
				console.log("error : ", error);
			}
		});			
	}	
}
