
/*휴대폰 체크 정규식*/
const autoHyphen = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

/*휴대폰 번호로 아이디 찾기*/
function findPhoneId22(){
	const phone=$("#phone");
	if (phone.val() == "") {
		alert("휴대폰 번호를 입력해 주세요.");		
		return;
	}
	
	const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;	  
    if(!patternPhone.test(phone.val())){
    	alert("핸드폰 번호를 확인 해주세요.");		
        return;
    }
    	
	$.ajax({
			type: "POST",
			dataType: "text",
			data: {
				phone: phone.val()
			},
			url: "/findIdPassword/phoneDbCheck",
			success: function(result) {	
				var d = parseInt($.trim(result));
				if (d == 0) {
					alert('가입된 휴대전화 번호가 아닙니다.');
				} else if (d > 0) {
					phone.val("");
					alert('가입하신 휴대전화 번호로 아이디가 전송되었습니다.');
				}
			}
	});	
}


function findPhoneId(){
	const phone=$("#phone");
	if (phone.val() == "") {
		alert("휴대폰 번호를 입력해 주세요.");		
		return;
	}
	
	const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;	  
    if(!patternPhone.test(phone.val())){
    	alert("올바른 전화번호 형식이 아닙니다. 휴대폰 번호를 확인 해주세요.");	
    	phone.focus();
        return;
    }
    loading_pop_klover();
	$.ajax({
			type: "POST",
			dataType: "text",
			data: {
				phone: phone.val()
			},
			url: "/findIdPassword/getUserIdToPhone",
			success: function(result) {
				loadingnBtnLayerClose();
				if (result==="") {
					alert('가입된 휴대전화 번호가 아닙니다.');
					phone.focus();
				} else{
					const userId=JSON.parse(result).userId;
					//alert(`가입하신 휴대전화는 아이디는 ${userId} 입니다.`);
					$("#pop-layer-context").html(`가입하신 아이디는 "${userId}" 입니다.`);
					pop_klover(this, '#klover-layer');
					phone.val("");
				}
			}
	});	
}



/*1-1이메일로 아이디 찾기*/
function findEmailID(){
	const email=$("#email");
	if (email.val() == "") {
		alert("이메일을 입력해 주세요.");		
		return;
	}
	
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(!reg_email.test(email.val())) {		
		 alert("이메일을 형식이 맞지 않습니다.");		
	     return ;         
	}  
		
	$.ajax({
			type: "POST",
			dataType: "text",
			data: {
				email: email.val()
			},
			url: "/findIdPassword/emailDbCheck",
			success: function(result) {	
				const d = parseInt($.trim(result));
				if(d===0){
					alert("등록된 이메일이 아닙니다.");
					return;
				}				
				loading_pop_klover();
				emailSendId();			
			},
			error:function(error){
				console.log(" 에러 :", error);
			}
	});	
}

/*1-2이메일로 아이디 정보 보내기*/
function emailSendId(){	
	$.ajax({
		type: "POST",
		dataType: "text",
		data: {
			email: $("#email").val()
		},
		url: "/findIdPassword/sendId",
		success: function(result) {	
			if(result==="success"){
				loadingnBtnLayerClose();
				$("#email").val("");
				alert("가입하신 이메일로 아이디가 전송되었습니다.");				
			}	
			
		},error:function(error){
			console.log(" 에러 :", error);
		}		
	});		
}



/*2. 이메일로 아이디 정보 가져오기*/
function getEmailToPhone(){	
	const email=$("#email");
	if (email.val() == "") {
		alert("이메일을 입력해 주세요.");		
		return;
	}
	
	const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(!reg_email.test(email.val())) {		
		 alert("이메일을 형식이 맞지 않습니다.");		
	     return ;         
	}  
	loading_pop_klover();
	$.ajax({
		type: "POST",
		dataType: "text",
		data: {
			email: $("#email").val()
		},
		url: "/findIdPassword/getEmailToPhone",
		success: function(result) {	
				loadingnBtnLayerClose();
				if (result==="") {
					alert('가입된 이메일이  아닙니다.');
					email.focus();
				} else{
					const userId=JSON.parse(result).userId;
					//alert(`가입하신 휴대전화는 아이디는 ${userId} 입니다.`);
					$("#pop-layer-context").html(`가입하신 아이디는 "${userId}" 입니다.`);
					pop_klover(this, '#klover-layer');
					email.val("");
				}
		},error:function(error){
			console.log(" 에러 :", error);
		}		
	});		
}






/************************************************************************************ */
/************************************************************************************ */
/************************************************************************************ */



/*아이디와 휴대폰으로 비밀번호 찾기*/
function findPhonePassword(){
	const userId=$("#userId1").val();
	if(!userId){
		$("#userId1").focus();
		alert("아이디를 입력해 주세요.");
		return ;
	}
	
	const phone=$("#phone");
	if (phone.val() == "") {
		alert("휴대폰 번호를 입력해 주세요.");		
		return;
	}
	
	const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;	  
    if(!patternPhone.test(phone.val())){
    	alert("핸드폰 번호를 확인 해주세요.");		
        return;
    }
/*    	
	$.ajax({
			type: "POST",
			data: {
				userId:userId,
				phone: phone.val()
			},
			url: "/findIdPassword/idPhoneCheck",
			success: function(result) {	
				console.log(" result : ", result);				
				var d = parseInt($.trim(result));
				if (d == 0) {
					alert('아이디 또는 휴대전화 번호가 일치하지 않습니다.');
				} else if (d > 0) {
					alert('가입하신 휴대전화로 임시비밀번호가 전송되었습니다');
					$("#userId1").val("");
					$("#phone").val("");
				}
			}
	});
	*/
	
		loading_pop_klover();
	$.ajax({
			type: "POST",
			data: {
				userId:userId,
				phone: phone.val()
			},
			url: "/findIdPassword/findPhoneAndPasswordPopupShow",
			success: function(result) {	
				console.log(" result : ", result);				
				loadingnBtnLayerClose();
				
				if (result==="Not Found") {
					alert('아이디 또는 휴대폰 정보가 일치하지 않습니다.');
				
				} else{
					$("#pop-layer-context").html(`임시비밀번호는 "${result}" 입니다.`);
					pop_klover(this, '#klover-layer');
					$("#userId1").val("");
					phone.val("");
				}		
			}
	});		
}


/*1-2아이디와 이메일로 비밀번호 찾기*/
function findEmailPassword(){
	const userId=$("#userId2").val();
	if(!userId){
		$("#userId2").focus();
		alert("아이디를 입력해 주세요.");
		return ;
	}
	
	const email=$("#email");
	if (email.val() == "") {
		alert("이메일을 입력해 주세요.");		
		return;
	}
	
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(!reg_email.test(email.val())) {		
		 alert("이메일을 형식이 맞지 않습니다.");		
	     return ;         
	}  
		
	$.ajax({
			type: "POST",
			data: {
				userId:userId,
				email: email.val()
			},
			url: "/findIdPassword/findEmailPassword",
			success: function(result) {	
				const d = parseInt($.trim(result));
				if(d===0){
					alert("아이디 또는 이메일이 일치하지 않습니다.");
					return;
				}				
				loading_pop_klover();
				emailSendPassword();			
			},
			error:function(error){
				console.log(" 에러 :", error);
			}
	});	
}


/*1-2이메일로 임시 비밀번호 발송*/
function emailSendPassword(){	
	const userId=$("#userId2").val();
	if(!userId){
		$("#userId2").focus();
		alert("아이디를 입력해 주세요.");
		return ;
	}
	
	$.ajax({
		type: "POST",
		dataType: "text",
		data: {
			userId:userId,
			email: $("#email").val()
		},
		url: "/findIdPassword/emailSendPassword",
		success: function(result) {	
				
			if(result==="success"){
				loadingnBtnLayerClose();
				$("#userId2").val("");
				$("#email").val("");
				alert('가입하신 이메일로 임시비밀번호가 전송되었습니다');
				
			}	
			
		},error:function(error){
			console.log(" 에러 :", error);
		}		
	});		
}




//2-1 이디와 이메일로 비밀번호 찾은후 팝업 보여주기
function findEmailPasswordPopupShow(){
	const userId=$("#userId2").val();
	if(!userId){
		$("#userId2").focus();
		alert("아이디를 입력해 주세요.");
		return ;
	}
	
	const email=$("#email");
	if (email.val() == "") {
		alert("이메일을 입력해 주세요.");		
		return;
	}
	
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(!reg_email.test(email.val())) {		
		 alert("이메일을 형식이 맞지 않습니다.");		
	     return ;         
	}  
	loading_pop_klover();	
	$.ajax({
			type: "POST",
			data: {
				userId:userId,
				email: email.val()
			},
			url: "/findIdPassword/findEmailPasswordPopupShow",
			success: function(result) {	
				console.log(result);
				loadingnBtnLayerClose();
				
				if (result==="Not Found") {
					alert('아이디 또는 이메일 정보가 일치하지 않습니다.');
				
				} else{

					$("#pop-layer-context").html(`임시비밀번호는 "${result}" 입니다.`);
					pop_klover(this, '#klover-layer');
					$("#userId2").val("");
					email.val("");
				}		
							
			},
			error:function(error){
				console.log(" 에러 :", error);
			}
	});	
}
 
   
   


function pop_klover(event,el){      
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
                  