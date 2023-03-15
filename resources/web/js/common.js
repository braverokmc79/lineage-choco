 
//기본 옵션 설정 
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
} 
 
 
//토스트 메시지 설정    
function tWarning(title, content){
    toastr.remove();
    toastr.clear();

    if(title==""){
      toastr.warning(content);  
    }else{
      toastr.warning(title, content);   
    }           
}
 
function tInfo(title, content){
    toastr.remove();
    toastr.clear(); 
    if(title=="")toastr.info(content);  
    else toastr.info(title, content);           
}
 
function tSuccess(title, content){
    toastr.remove();
    toastr.clear();
    if(title=="")toastr.success(content);
    else toastr.success(title, content);        
}
 
function tError(title, content){
    toastr.remove();
    toastr.clear();
    if(title=="")toastr.error(content); 
    else toastr.error(title, content);          
}
 
 
function tConfirm(content){
    toastr.remove();
    toastr.clear();     
    toastr.warning(
        "<div class='text-center'><button type='button' id='confirmationRevertYes' class='mb-xs mt-xs mr-xs btn btn-sm btn-danger'>예</button>" +
        "&nbsp;&nbsp;&nbsp;<button type='button' id='confirmationRevertNo' class='mb-xs mt-xs mr-xs btn btn-sm btn-info'>아니오</button><div>" ,
        content,                
      {
          closeButton: false,
          allowHtml: true,
          onShown: function (toast) {
              $("#confirmationRevertYes").click(function(){
                   
                 alert("ok");
              });
              
              $("#confirmationRevertNo").click(function(){
                   
                     alert("no");
              });             
            }
      });
}



//로딩바 시작 함수
function loading_pop_klover() {

	var $el = $('#loading-klover-layer');        //레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('loading-klover-dimBg');    //dimmed 레이어를 감지하기 위한 boolean 변수
	

	isDim ? $('.loading-dim-layer').fadeIn() : $el.fadeIn();

	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// 화면의 중앙에 레이어를 띄운다.
	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight / 2,
			marginLeft: -$elWidth / 2
		})
	} else {
		$el.css({ top: 0, left: 0 });
	}
	
	return false;
}


//로딩바 닫기합수
function loadingnBtnLayerClose(){
	$('.loading-dim-layer').fadeOut();	
}



function enterkey() {
	if (window.event.keyCode == 13) {
		 $(".searchBtn").click();
    }
}


function noticeCount(){
  $.ajax({
		url:"/note/noticeCount",
		type:"POST",			
		success:function(res){
			$("#NOTICE_COUNT_SETINTERVAL").val(res.NOTICE_COUNT_SETINTERVAL);			
			if(parseInt(res.noticeCount)>0){				
				$("#noticeCount").html(`<span class="badge badge-danger badge-counter">${res.noticeCount}+</span>`);					
			}else{
				$("#notificationMessage").hide();
			}							
		},
		error:function(error){
			console.log("error : ", error);
		}
	});		
}





$( document ).ready(function() {
	
			//서머노트 이미지 클릭시 로테이션으로 변경하기
		$('.board-view-desc img').on({'click': function() {
		         var src = $(this).attr('src');
		         const link=src.replace('/displayFile?fileName', 'displayFile?fileName');
		         console.log(link);
		         $(this).attr('src', link);
		         const $this=this;
		         setTimeout(()=>{
		        	 $($this).attr('src', src);
		         },  100);
		    }
		});
	
	
	
	  $(".searchBtn").on("click",function(){	
	  	 	let st=$('input[name="st"]:checked').val();
	  	 	if(st===undefined){
	  	 		st="integrated";
	  	 	}	  	 	
	  	 	$("#keyword").val($("#type1q").val());
	  	 	$("#st").val(st);
	  	 	
	  	 	if(st==="collection"){
	  	 		$("#topSearche").attr("action", "/book/collection/list");	  	 		
	  	 	}else{
	  	 		$("#topSearche").attr("action", "/book/aladin/list");	  	 
	  	 	}	  	 	
	  	 	$("#topSearche").submit();
	  });
	  
	  $("#boardScrap").on("click", function(e){
			$_this=$(this);
			const bno=$_this.attr("data-bno");	
			if(bno==-1){
				tWarning("이미 스크랩 되었습니다.");
				return;
			}	
			$.ajax({
				url:"/scrap/insertScrap",
				type:"POST",
				data:{bno},
				success:function(res){
					$("#boardScrap").html(`<i class="fas fa-check"></i>스크랩`);
					$_this.attr("data-bno", -1);
					tSuccess("스크랩 처리 되었습니다.");
					console.log("res : ",res);
				},
				error:function(error){
					console.log("error : ", error);
				}
			});			
	  });
	            
	
	const role=$("#role").val();
	let noticeCountlearTimeout; 
	if(role){	
		
		noticeCount();		
		setTimeout(function(){
			let NOTICE_COUNT_SETINTERVAL=parseInt($("#NOTICE_COUNT_SETINTERVAL").val());			
			//console.log("NOTICE_COUNT_SETINTERVAL : " ,NOTICE_COUNT_SETINTERVAL);
			
			noticeCountlearTimeout=setInterval(function(){				
				noticeCount();
			}, NOTICE_COUNT_SETINTERVAL);							
		}, 2000);
							

				
	}else{
		 clearTimeout(noticeCountlearTimeout);	
	}
	     
	     
	//알림 버튼 클릭시 메시지 목록 가져오기
   $("#noticeCountBtn").on("click", function(){
		$.ajax({
				url:"/note/notificationMessage",
				type:"POST",
				success:function(res){
					
					$("#notificationMessage").html(res);					
				},
				error:function(error){
					console.log("error : ", error);
				}
			});		
				
    });
	   
	            
});



function pop_klover(el){      
    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('klover-dimBg');    //dimmed 레이어를 감지하기 위한 boolean 변수
 
    isDim ? $('.klover-dim-layer').fadeIn() : $el.fadeIn();
 
    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();
 
    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }
 
    $el.find('a.btn-layerClose').click(function(){
        isDim ? $('.klover-dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });
     
    $('.pop-klover .klover-dimBg').click(function(){
        $('.klover-dim-layer').fadeOut();
        return false;
    });
 
    return false;
}


