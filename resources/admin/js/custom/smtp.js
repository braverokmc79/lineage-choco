const smtp={
	
	init:function(){
		const _this=this;
		
		$("#smtpUpdateBtn").on("click", function(e){
			_this.smtpUpdate();
		});
					
	},
	
	
	smtpUpdate:function(){
		const emailName=$("#emailName").val();
		const host=$("#host").val();
		const username=$("#username").val();
		const password=$("#password").val();
		
		if(emailName===""){
			$("#emailName").focus();
			alert("이메일발송자명을 입력하세요.");			
			return;
		}
		
		if(host===""){
			$("#host").focus();
			alert("host를 입력하세요.");			
			return;
		}
		
		if(username===""){
			$("#username").focus();
			alert("username을 입력하세요.");			
			return;
		}
		
		if(password===""){
			$("#password").focus();
			alert("password을 입력하세요.");			
			return;
		}		
		
		const data={
			emailName:emailName,
			host:host,
			username:username,
			password:password
		}
		
		$.ajax({
			url:"/admin/smtp/smtpUpdate",
			type:"post",
			contentType:"application/json",
			data:JSON.stringify(data),
			success:function(res){
				console.log("success");
				console.log(res);
				if(res===1){
					alert("수정 처리 되었습니다.");
				}
			},
			error:function(res){
				console.log("failed");
				console.log(res);
			}
			
		})
		
	}
}

smtp.init()
