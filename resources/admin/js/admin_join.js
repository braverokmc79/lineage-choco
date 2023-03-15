
const toDate=new Date();
const year=toDate.getFullYear()-15;
const month=toDate.getMonth()+1;
const day =toDate.getDate();
//document.getElementById('birth').value = `${year}-${month}-${day}`;

/* 회원가입 유효성검사 통과유무 변수 */
var $home; //contextPath
var mailCheck; //메일
var mailchCheck; //메일 중복검사
var pwCheck; //비밀번호
var pwchCheck; //비밀번호 확인
var pwckcorCheck; //비밀번호 확인 일치 확인
var nameCheck; //이름
var phoneCheck; //전화번호


const autoHyphen = (target) => {
	 target.value = target.value
	   .replace(/[^0-9]/g, '')
	   .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

const usernameValidation = $('.usernameValidation');  
const phoneValidation = $('.phoneValidation');
const username = $('#username');    
const oriUsername = $("#oriUsername").val();  
const phone = $('#phone');
const oriPhone =  $("#oriPhone").val();  

const checkedValueColor = "#4CAF50";
const usedValueColor = "#ff1744";
const defaultColor = "#aaa";


//회원가입 버튼(회원가입 기능 작동)
$(document).ready(function () {
	$home = $("meta[name='home']").attr("content");
	$type = $("#type").val();

	if ($type != "update") {
		
		$("#userId").on("propertychange change keyup paste input", function () {
			
			$('#idCheck').text("");
			$('#idCheck').hide();

			var userId = $('#userId').val(); // .id_input에 입력되는 값		
			$('#userId').attr("check", "1");
			
			
			var data = {
				userId: userId
			}; // '컨트롤에 넘길 데이터 이름' : '데이터(.id_input에 입력되는 값)'

			$.ajax({
				type: "POST",
				url: $home + "/admin/member/memberIdChk",
				data: data,
				success: function (result) {
					$('#idCheck').show();
					if (result != "fail") {
						if(userId!==""){
							$('#userId').attr("check", "0");
							$('#idCheck').css("color", "green");
							$('#idCheck').text("사용 가능한 아이디입니다.");
							$("#id-check-result").val("true");
						}else{
							$('#idCheck').css("color", "red");
							$('#idCheck').text("아이디를 입력해 주세요.");
							$("#id-check-result").val("false");
						}
			
					} else {
						$('#idCheck').css("color", "red");
						$('#idCheck').text("아이디가 이미 존재합니다.");
						$("#id-check-result").val("false");
					}
				}
			}); // ajax 종료	

		});




		$("#email").on("propertychange change keyup paste input", function () {

			console.log("이메일 중복검사	");				
			$('#emailCheck').hide();

			var email = $('#email').val(); // .id_input에 입력되는 값		

			$('#email').attr("check", "1");
			
			var data = {
				email: email
			}; // '컨트롤에 넘길 데이터 이름' : '데이터(.id_input에 입력되는 값)'

			$.ajax({
				type: "POST",
				url: $home + "/admin/member/memberEmailChk",
				data: data,
				success: function (result) {
					$('#emailCheck').show();
					if (result != "fail") {
						
						if(CheckEmail(email)){
							$('#email').attr("check", "0");
							$('#emailCheck').css("color", "green");
							$('#emailCheck').text("사용 가능한 이메일입니다.");
							$("#email-check-result").val("true");
						}else{
							$('#emailCheck').css("color", "red");
							if(email===""){
								$('#emailCheck').text("이메일을 입력해 주세요.");
							}else{
								$('#emailCheck').text("이메일이 형식이 맞지 않습니다.");	
							}							
							$("#email-check-result").val("false");
						}
				
					} else {
						$('#emailCheck').css("color", "red");
						$('#emailCheck').text("이메일이 이미 존재합니다.");
						$("#email-check-result").val("false");
					}
				}
			}); // ajax 종료	
		});
		
		
	} 	//if ($type != "update") {
	
	
		
		
	$('#username').on('keyup', function() {
		username.removeClass("checkedValue");
		username.removeClass("usedValue");
		username.attr("check", "1");
		
		if (username.val() == "") {
			usernameValidation.text("닉네임을 입력해주세요.");
			usernameValidation.css("color", usedValueColor);
			return;
		}		

		$.ajax({
			type: "POST",
			dataType: "text",
			data: {
				username: username.val()
			},
			url: "/join/usernameDbCheck",
			success: function(result) {
				const d = parseInt($.trim(result));

				if (d == 0) {
					if (username.val() == "") {
						usernameValidation.text("닉네임을 입력해주세요.");
						usernameValidation.css("color", usedValueColor);
					} else {
						// 중복 없음
						username.addClass("checkedValue");
						username.attr("check", "0");						
						usernameValidation.text("등록 가능한 닉네임 입니다.");
						usernameValidation.css("color", checkedValueColor);
					}

				} else if (d > 0) {
						username.addClass("usedValue");
						usernameValidation.text("이미 사용중인 닉네임 입니다.");
						usernameValidation.css("color", usedValueColor);

				}
			}
		});

		
	});
	
	
	$('#phone').on('keyup', function() {
		phone.removeClass("checkedValue");
		phone.removeClass("usedValue");
		phone.attr("check", "1");

		if (phone.val() == "") {
			phoneValidation.text("휴대폰 번호를 입력해 주세요.");
			phoneValidation.css("color", usedValueColor);
			return;
		}
		
		
		if(phone.val().length<13){
			phoneValidation.text("휴대폰 번호를 입력해 주세요.");
			phoneValidation.css("color", usedValueColor);
			return;
		}
		
		const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;	  
	    if(!patternPhone.test(phone.val())){
		    phoneValidation.text("핸드폰 번호를 확인 해주세요.");
			phoneValidation.css("color", usedValueColor);
	        return;
	    }  
		
	    
		$.ajax({
			type: "POST",
			dataType: "text",
			data: {
				phone: phone.val()
			},
			url: "/join/phoneDbCheck",
			success: function(result) {
				console.log("휴대폰 중복 검사 : ",result);

				var d = parseInt($.trim(result));

				if (d == 0) {

					if (phone.val() == "") {
						phoneValidation.text("휴대폰 번호를 입력해 주세요.");
						phoneValidation.css("color", usedValueColor);
					} else {
						// 중복 없음
						phone.addClass("checkedValue");
						phone.attr("check", "0");						
						phoneValidation.text("등록 가능한 번호입니다.");
						phoneValidation.css("color", checkedValueColor);
					}

				} else if (d > 0) {
					console.log(" oriPhone :", oriPhone);
					
					if(oriPhone){						
						if(oriPhone!=phone.val()){
							phone.addClass("usedValue");
							phone.attr("check", "1");
							phoneValidation.text("이미 사용중인 번호입니다.");
							phoneValidation.css("color", usedValueColor);
							
						}else{
							phone.addClass("checkedValue");
							phone.attr("check", "0");						
							phoneValidation.text("등록 가능한 번호입니다.");
							phoneValidation.css("color", checkedValueColor);
						}
										
					}else{
						
							phone.attr("check", "1");
							phone.addClass("usedValue");
							phoneValidation.text("이미 사용중인 번호입니다.");
							phoneValidation.css("color", usedValueColor);
					}
				}
			}
		});

	});
		





	$(".join_button").click(function () {

		var userId = $("#userId").val();
		var email = $("#email").val();
		var pw = $("#pw").val();
		var pwck = $("#pwck_input").val();
		var username = $("#username");		
		var phone = $("#phone");
		var radioCheck = $("input[name='gender']").is(":checked");


		//이메일 유효성 검사
		if (email == "") {
			alert("이메일을 확인해주세요");
			$("#email").focus();
			return
		}
		
		//아이디 유효성 검사
		if (userId == "") {
			alert("아이디를 확인해주세요");
			$("#userId").focus();
			return
		}



		//비밀번호 유효성 검사
/*		if (pw == "") {
			alert("비밀번호를 확인해주세요");
			$("#pw").focus();
			return;
		}

		//비밀번호 확인 유효성 검사
		if (pwck == "") {
			alert("비밀번호 확인을 확인해주세요");
			$("#pwck_input").focus();
			return;
		}
*/

		if (!passConfirm()) {
			return;
		}

		//이름 유효성 검사
		if (username.val() == "") {
			alert("닉네임을 확인 확인해주세요");
			$("#username").focus();
			return;
		}

/*		if (!radioCheck) {
			alert("성별을 체크해 주세요");
			return;
		}

		//전화번호 유효성 검사
		if (phone.val() == "") {
			alert("전화번호를 확인 확인해주세요");
			$("#phone").focus();
			return;
		}

*/

		if ($type == "update") {
			$("#frm1").attr("action", "memberUpdate");
			
			
			if(parseInt(username.attr("check"))!=0){
				alert("닉네임을 확인해 주세요.");
				username.focus();
				return;
			}
			
					
/*			if(parseInt(phone.attr("check"))!=0){
				alert("전화번호를 확인해 주세요.");
				phone.focus();
				return;
			}*/
			
		} else {
			var idCheckResult = $("#id-check-result").val();
			if (idCheckResult == "false") {
				alert("사용할수 없는 아이디 입니다.");
				return;
			}
						
			var emailCheckResult = $("#email-check-result").val();
			if (emailCheckResult == "false") {
				alert("사용할수 없는 이메일 입니다.");
				return;
			}
				

			if(parseInt(username.attr("check"))!=0){
				alert("닉네임을 확인해 주세요.");
				username.focus();
				return;
			}
			
					
	/*		if(parseInt(phone.attr("check"))!=0){
				alert("전화번호를 확인해 주세요.");
				phone.focus();
				return;
			}*/
		
			$("#frm1").attr("action", "memberCreate");
					
			
		}

		$("#frm1").submit();

	});
});






//비밀번호  검사
function passConfirm() {
	var password = document.getElementById("password").value;
	var pwch = document.getElementById("pwck_input").value;

	if (password != pwch) {
		alert("비밀번호가 일치하지 않습니다");
		return false;
	} else {
		return true;
	}
}

function CheckEmail(str)
{                                                 
     var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
     if(!reg_email.test(str)) {                            
          return false;         
     }                            
     else {                       
          return true;         
     }                            
}  


