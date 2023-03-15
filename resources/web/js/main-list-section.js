
let pageCount=0;
let firstData="";

function getBookList(page){	
	if(!page){
		pageCount =pageCount+40;
		page=pageCount;
	}
	
	const keyword=$("#type1q").val();
	const st=$("input[name='st']").val();

	$.ajax({
		url:"/book/aladin/ajaxGetList",
		type:"get",
		data:{
			page:page,
			keyword:keyword
		},
		success:function(res){
			
			let result="";	
			let cnt=0;
			for(let i of res){	
				if(page===1 && cnt===0){
					firstData=`${i.title}`;
				}			
				if(page!==1&& 	firstData===`${i.title}`){
					$("#more").remove();
					return;
				}
				
				result +=`
					<li class="cell" onclick="location.href='/book/aladin/read/${i.isbn13}?keyword=${keyword}&st=${st}'" >
						<div class="img-box">
							<img src="${i.fileName}"  alt="${i.title}">							
						</div>
						<div class="product-name">${i.title}</div>
						<div class="product-price">${i.author }</div>
					</li>				
				`;
				
				++cnt;							
			}
			
			$("#resultRow").append(result);
			
		},
		error:function(error){
			console.err("에러 :", error);
		}
	})
}
getBookList(1);