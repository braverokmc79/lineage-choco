

$(function() {
	replyList(1);

});





function replyList(page) {
	if (page == "" || page == undefined) {
		page = 1;
	}



	$.getJSON("/admin/main/replyList?page=" + page, function(data) {

		//소식·서버통계·이벤트
		const replyList = data.replyAllList.map((comment) => {


			let boardType = "";

			if (comment.boardType == "lineage_news") {
				boardType = `<label class="badge badge-primary">공지사항</label>`;

			} else if (comment.boardType == "lineage_stats") {
				boardType = `<label class="badge badge-success">서버통계</label>`;

			} else if (comment.boardType == "events") {
				boardType = `<label class="badge badge-warning">이벤트</label>`;

			} else if (comment.boardType == "lineage_update"){
				boardType = `<label class="badge badge-info">업데이트</label>`;

			} else {
				boardType = `<label class="badge badge-danger">커뮤니티</label>`;

			}

			let tooltipContent = comment.content.replaceAll(`<br>`, `\n`);

			let content = comment.content;
			if (comment.content.length > 30) {
				content = comment.content.substring(0, 60) + "...";
			}

			let createdDate = moment(comment.createdDate).format('YYYY-MM-DD Ah:mm');
			return `<tr>
              <td class="py-1">
                ${comment.num}
              </td>
              <td>
                ${boardType}
              </td>
              <td class="commentContent" >
                <a href="/board/${comment.boardType}/read/${comment.bno}?#mb_cmt${comment.rno}"
                 className="task-tooltip" title="${tooltipContent}"
                
                 
                >${content}</a>
              </td>
              <td>
              	${comment.username}
              </td>
              <td>
             		${createdDate}
              </td>
              <td>
            
              	 <button type="button" onclick="deleteComment(${comment.rno})"    class="delete-comment btn  btn-sm btn-danger btn-rounded btn-fw ">삭제</button>
               
              </td>
           </tr>`

		})

		$("#replyList").html(replyList);
		if(data.totalCount==0){
			const html=`<tr><td colspan="6" class="text-center">등록된 댓글이 없습니다.</td></tr>`;
			$("#replyList").html(html);
		}
		

	

		$("#replyList-pagination").html(data.pagination);


	})
	
	
}

function deleteComment(rno) {
	if (confirm("정말 삭제하시겠습니까?") == true) {
		$.ajax({
			type: "DELETE",
			url: "/comment/replies/delete/" + rno,
			success: function(result) {
				if ($.trim(result) == "SUCCESS") {
					replyList(1);
				}
			}, error: function(d) {
				alert(d.error);
			}
		});
	}
}

function replyPagination(page){

	replyList(page);
	
}





