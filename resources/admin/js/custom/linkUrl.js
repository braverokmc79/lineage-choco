const updateLinkUrl={
	
	init:function(){
		const _this=this;
		
		$("#updateLinkUrl").on("click", function(e){
			_this.updateLinkUrl();
		});
					
	},
	
	
	updateLinkUrl:function(){
		const data=$("#frm1").serializeObject();
		console.log("data  : " ,JSON.stringify(data));
		
		$.ajax({
			url:"/admin/linkUrl/update",
			type:"post",
			contentType:"application/json",
			data:JSON.stringify(data),
			success:function(res){
				console.log("success");
				console.log(res);
				if(res===1){
					alert("업데이트 처리 되었습니다.");
					location.reload();
				}
			},
			error:function(res){
				console.log("failed");
				console.log(res);
			}
			
		})
		
	},
	
	
}

jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }//if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
 
    return obj;
};
updateLinkUrl.init()
