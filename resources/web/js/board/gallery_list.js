let pageCount = 0;
let firstData = "";

function galleryList() {

	const keyword = $("#keyword").val();
	const searchType = $("#searchType").val();
	let page = parseInt($("#page").val());
	const tempEndPage = parseInt($("#tempEndPage").val());

	if (page >= tempEndPage) {
		$("#more").hide();
		return;
	}
	console.log(page, tempEndPage, keyword, searchType);

	$.ajax({
		url: "/lineage/galleryList",
		type: "get",
		data: {
			page,
			keyword,
			searchType
		},
		success: function(res) {
			page += 1;
			$("#page").val(page);			
			$("#animated-thumbnails-gallery").append(res);

			jQuery("#animated-thumbnails-gallery")
				.justifiedGallery({
					captions: false,
					lastRow: "hide",
					rowHeight: 180,
					margins: 5
				}).on("jg.complete", function() {
					window.lightGallery(
						document.getElementById("animated-thumbnails-gallery"),
						{
							autoplayFirstVideo: false,
							pager: false,
							galleryId: "nature",
							plugins: [lgZoom, lgThumbnail],
							mobileSettings: {
								controls: false,
								showCloseIcon: false,
								download: false,
								rotate: false
							}
						}
					);
				});
				
				
				if (page >= tempEndPage) {
					$("#more").hide();			
				}
		},
		error: function(error) {
			console.error("에러 :", error);
		}
	})
}
