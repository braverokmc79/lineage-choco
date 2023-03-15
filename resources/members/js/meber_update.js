const checkedValueColor = "#4CAF50";
const usedValueColor = "#ff1744";
const defaultColor = "#aaa";


$(function(){
	$(".updateMember").on("click", function(){
		const password=$("#password");
		const pwckInput=$("#pwck_input");
		const username=$("#username");
		
		if(!password.val()){
			alert("비밀번호를 입력해 주세요.");
			password.focus();
			return;
		}
		
		if(!pwckInput.val()){
			alert("비밀번호를 확인을 입력해 주세요.");
			pwckInput.focus();
			return;
		}
		
		if(password.val()!=pwckInput.val()){
			alert("비밀번호와 비밀번화 확인이 일치하지 않습니다..");
			pwckInput.focus();
			return;
		}
		
		if(!username.val()){
			alert("닉네임을 입력해 주세요.");
			username.focus();
			return;
		}
		
		const usernameCheck=parseInt(username.attr("check"));
		console.log("usernameCheck : ",  usernameCheck);
		if(usernameCheck==0){
			$("#frm1").submit();
		}		
		
	});
	
	$('#username').on('keyup', function() {
		var username=$("#username");
		var usernameValidation=$("#usernameValidation");
		
	
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
				console.log(" result : ",result);
				
					
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
});

