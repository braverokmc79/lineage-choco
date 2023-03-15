// 마커를 담을 배열입니다
var markers = [];
var marker = [];
let totalData; //총 데이터 수
let dataPerPage=15; //한 페이지에 나타낼 글 수
let pageCount = 10; //페이징에 나타낼 페이지 수
let globalCurrentPage=1; //현재 페이지
let searchType;
let keyword;
		
var customOverlay;
let convertToggle=$("#convertToggle").val()!="false" ?  true: false;
if(convertToggle){
	$("#left-handle").show();
	$("#dataPerPage").hide();
}else{
	$("#left-handle").hide();
	$("#dataPerPage").show();
	
}


var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 


// 지도 타입 변경 컨트롤을 생성한다
var mapTypeControl = new kakao.maps.MapTypeControl();
// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
// 지도에 확대 축소 컨트롤을 생성한다
var zoomControl = new kakao.maps.ZoomControl();
// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
// 지도 중심 좌표 변화 이벤트를 등록한다
kakao.maps.event.addListener(map, 'center_changed', function() {
	//console.log('지도의 중심 좌표는 ' + map.getCenter().toString() +' 입니다.');
});
// 지도 확대 레벨 변화 이벤트를 등록한다
kakao.maps.event.addListener(map, 'zoom_changed', function() {
	//console.log('지도의 현재 확대레벨은 ' + map.getLevel() +'레벨 입니다.');
});
// 지도 영역 변화 이벤트를 등록한다
kakao.maps.event.addListener(map, 'bounds_changed', function() {
	var mapBounds = map.getBounds(),
		message = '지도의 남서쪽, 북동쪽 영역좌표는 ' +
			mapBounds.toString() + '입니다.';
	//console.log(message); 
});
// 지도 시점 변화 완료 이벤트를 등록한다
kakao.maps.event.addListener(map, 'idle', function() {
	var message = '지도의 중심좌표는 ' + map.getCenter().toString() + ' 이고,' +
		'확대 레벨은 ' + map.getLevel() + ' 레벨 입니다.';
	//console.log(message);
});
// 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
	//console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
});
// 지도 드래깅 이벤트를 등록한다 (드래그 시작 : dragstart, 드래그 종료 : dragend)
kakao.maps.event.addListener(map, 'drag', function() {
	var message = '지도를 드래그 하고 있습니다. ' +
		'지도의 중심 좌표는 ' + map.getCenter().toString() + ' 입니다.';
	//console.log(message);
});


// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
async function searchPlaces() {	
   const data=await mapList();
    placesSearchCB(data);
}

function  mapList(){	
	
	return new Promise((resolve, reject)=>{		

		searchType=$("#board-search-select").val();
		keyword=$("#keyword").val();
		
		$.get(`/lineage/mapList?page=${globalCurrentPage}&perPageNum=${dataPerPage}&searchType=${searchType}&keyword=${keyword}`, function(res){			
		 	const result=res.list.filter(item=>{
				return item.latitude!=null				
			});	
			
			
			if(result.length==0){
				$("#map").hide();
				$("#pagingul").hide();
				$(".blank-text").show();
				return;
			}else{
				$("#pagingul").show();
				$("#map").show();
				$(".blank-text").hide();
			}
			
			
			 //dataPerPage 선택값 가져오기
			dataPerPage=res.pageMaker.perPageNum;			
			totalData=res.pageMaker.totalCount;
			pageCount=res.pageMaker.displayPageNum;
			globalCurrentPage=res.pageMaker.page;
				 
			 //페이징 표시 호출
			paging(totalData, dataPerPage, pageCount, globalCurrentPage);
							 			 	
		 	resolve(result);			
		})	
	});		
}

    
// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data) {
	let status="BAD";
	if(data) status="OK";
	
    if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        // 페이지 번호를 표출합니다
       // displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {
	
	//console.log(" places.length : ",places.length);
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].latitude, places[i].longitude),
            marker = addMarker(placePosition, i,  places[i]), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        if(i < 3){
			bounds.extend(placePosition);
		}		
        
		var latitude =places[i].latitude;
		var longitude =places[i].longitude;
		var placeData=places[i];
        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title, bno, latitude, longitude, placeData) {
/*	        kakao.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, title,bno ,latitude, longitude);
            });
            */
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title,bno ,latitude, longitude ,placeData);
            });


            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title, bno ,latitude, longitude ,placeData);
            };

            itemEl.onmouseout =  function () {
				$(".overlaybox").show();
                infowindow.close();
            };
        })(marker, places[i].place ,places[i].bno ,latitude, longitude, placeData);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
	//console.log( "index : ", index);
	
	
    var el = document.createElement('li'),
    itemStr = `<span class="markerbg marker_${(index+1)}"></span>
                <div class="info" data-bno='${places.bno}' id="markerbg-${places.bno}">
                <h5>${places.place}</h5>`;

    if (places.road_address_name) {
        itemStr += '    <span>' + places.address + '</span>' +
                    '   <span class="jibun gray">' +  places.address  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.username  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';
	el.id = `item_${places.bno}`;
    return el;
}



// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, place) {


///A 유형
var imageSrc = '/resources/web/images/marker_red.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(48, 48), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(position.Ma, position.La); // 마커가 표시될 위치입니다

// 마커를 생성합니다
marker = new kakao.maps.Marker({
    position: markerPosition, 
    image: markerImage // 마커이미지 설정 
});



///B 유형
var content = `<div class="overlaybox" id="overlaybox-${place.bno}" onmouseover="overlayboxOver('${place.bno}')">
        <div class="boxtitle" onclick="openNewWindowKakoMap('${place.address}')"  >${place.place}</div>
        <div class="first"        
         onclick="openNewWindow('${place.bno}', '${place.boardType}')"
         
         style="background:url('/displayFile?fileName=${place.fileName}') no-repeat;" >        
       
            <div class="triangle text">${idx+1}</div>
            <div class="movietitle text">${place.title}</div>
        </div>
        <ul>
            <li class="up">
            	<span><i class="fa fa-map-marker"></i> : ${place.address}</span>              
            </li>
             <li class="up">
            	<span><i class="fa fa-user"></i> : ${place.username}</span>              
            </li>
             <li class="up" style="display:flex; justify-content: space-between;">
            	<span><i class="fa fa-calendar"></i> : ${place.createdDateString}</span> 
            	<span><i class="fas fa-hourglass-end"></i>  : ${place.customDate}</span>             	          
            </li>  
            <li class="up" style="display:flex; justify-content: space-between;">
            	<span><img class="board-star-img" src="/resources/web/images/star_grey.png"> : ${place.likeCnt}</span> 
            	<span ><i class="fa fa-eye"></i> : ${place.viewCnt}</span>   
            	<span ><i class="fa fa-comments"></i> : ${place.replyCnt}</span>                	          
            </li>             
        </ul>
    </div>
    <div class="marker-img" id="markerImg-${place.bno}" style="display:none">
    	<img src="/resources/web/images/marker_red.png">
    </div>
    
    `;

	// 커스텀 오버레이를 생성합니다
	customOverlay = new kakao.maps.CustomOverlay({
	    position: position,
	    content: content,
	    xAnchor: 0.3,
	    yAnchor: 0.91
	});
	
	if(convertToggle){
		// 커스텀 오버레이를 지도에 표시합니다
		customOverlay.setMap(map);		
	}else{		
	   marker.setMap(map); // 지도 위에 마커를 표출합니다
	}
	
   
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다
    return marker;
}

function overlayboxOver(bno){
	 $(`.overlaybox`).css("background", "url('/resources/web/images/box_movie.png') no-repeat");
	 $(`#overlaybox-${bno}`).css("background", "url('/resources/web/images/box_movie5.png') no-repeat");
	 $(`.item`).css("background" ,"#fff");
	 $(`#item_${bno}`).css("background" ,"aliceblue");
}
	
	
// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
    
    if(customOverlay){		
	    for ( var i = 0; i < customOverlay.length; i++ ) {
       		 customOverlay[i].setMap(null);
   		}   
   		 customOverlay = [];
   		 
	}
	
	if(marker){
		//console.log(" maker 지우기 ");
	    for ( var i = 0; i < marker.length; i++ ) {
       		 marker[i].setMap(null);
   		}   
   	   marker = [];   		 
	}
	
	$(".overlaybox").remove();
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
}


function paging(totalData, dataPerPage, pageCount, currentPage) {

  totalPage = Math.ceil(totalData / dataPerPage); //총 페이지 수
  
  if(totalPage<pageCount){
    pageCount=totalPage;
  }
  
  let pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹
  let last = pageGroup * pageCount; //화면에 보여질 마지막 페이지 번호
  
  if (last > totalPage) {
    last = totalPage;
  }

  let first = last - (pageCount - 1); //화면에 보여질 첫번째 페이지 번호
  let next = last + 1;
  let prev = first - 1;

  let pageHtml = "";

  if (prev > 0) {
    pageHtml += "<li><a href='#' id='prev'> 이전 </a></li>";
  }

 //페이징 번호 표시 
  for (var i = first; i <= last; i++) {
    if (currentPage == i) {
      pageHtml +=
        "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
    } else {
      pageHtml += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
    }
  }

  if (last < totalPage) {
    pageHtml += "<li><a href='#' id='next'> 다음 </a></li>";
  }

  $("#pagingul").html(pageHtml);
  let displayCount = "";
  displayCount = "현재 1 - " + totalPage + " 페이지 / " + totalData + "건";
  $("#displayCount").text(displayCount);


  //페이징 번호 클릭 이벤트 
  $("#pagingul li a").click(function () {
	//console.log("마커 지우기");
	//removeMarker();
	
    let $id = $(this).attr("id");
    selectedPage = $(this).text();

    if ($id == "next") selectedPage = next;
    if ($id == "prev") selectedPage = prev;
    
    //전역변수에 선택한 페이지 번호를 담는다...
    globalCurrentPage = selectedPage;
    //페이징 표시 재호출
    paging(totalData, dataPerPage, pageCount, selectedPage);
    //글 목록 표시 재호출
     //displayData(selectedPage, dataPerPage);
    
     searchPlaces();
  });
}


// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title , bno ,latitude,longitude ,place) {
	if(convertToggle){
		 $(".overlaybox").hide();	 
		 $(`.overlaybox`).css("background", "url('/resources/web/images/box_movie.png') no-repeat");
		 $(`#overlaybox-${bno}`).css("background", "url('/resources/web/images/box_movie5.png') no-repeat");
		 $(`#overlaybox-${bno}`).show();	 	 
		 $(`.item`).css("background" ,"#fff");
		 $(`#item_${bno}`).css("background" ,"aliceblue");
		 panTo(latitude, longitude);		
	}else{		
		
	var content = `<div class="overlaybox" id="overlaybox-${place.bno}" onmouseover="overlayboxOver('${place.bno}')">
	        <div class="boxtitle" onclick="openNewWindowKakoMap('${place.address}')"  >${place.place}</div>
	        <div class="first"        
	         onclick="openNewWindow('${place.bno}', '${place.boardType}')"
	         
	         style="background:url('/displayFile?fileName=${place.fileName}') no-repeat;" >        
	       
	            <div class="triangle text">${place.bno}</div>
	            <div class="movietitle text">${place.title}</div>
	        </div>
	        <ul>
	            <li class="up">
	            	<span><i class="fa fa-map-marker"></i> : ${place.address}</span>              
	            </li>
	             <li class="up">
	            	<span><i class="fa fa-user"></i> : ${place.username}</span>              
	            </li>
	             <li class="up" style="display:flex; justify-content: space-between;">
	            	<span><i class="fa fa-calendar"></i> : ${place.createdDateString}</span> 
	            	<span><i class="fas fa-hourglass-end"></i>  : ${place.customDate}</span>             	          
	            </li>  
	            <li class="up" style="display:flex; justify-content: space-between;">
	            	<span><img class="board-star-img" src="/resources/web/images/star_grey.png"> : ${place.likeCnt}</span> 
	            	<span ><i class="fa fa-eye"></i> : ${place.viewCnt}</span>   
	            	<span ><i class="fa fa-comments"></i> : ${place.replyCnt}</span>                	          
	            </li>             
	  
	        </ul>
	    </div>
	    <div class="marker-img" id="markerImg-${place.bno}" style="display:none">
	    	<img src="/resources/web/images/marker_red.png">
	    </div>
	    
	    `;
	     infowindow.setContent(content);
	     infowindow.open(map, marker);	
	     
     	$(".overlaybox").parent().parent().css("background", "none");
     	$(".overlaybox").parent().parent().css("border", "none");		
		$(".overlaybox").parent().css("left", " 63px");
		$(".overlaybox").parent().css("top", "6px");
	
	}
	 
	 
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

function openNewWindow(bno ,boardType){
	var openNewWindow = window.open("about:blank");
	boardType=boardType.replace("place_", "");
	
	openNewWindow.location.href = `/lineage/${boardType}/read/`+bno;
}

function openNewWindowKakoMap(q){
	var openNewWindow = window.open("about:blank");
	openNewWindow.location.href = "https://map.kakao.com/?q="+q;
}


function panTo(latitude, longitude) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(latitude, longitude);    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}        

$("button[title='스카이뷰']").click();

$("#left-handle").on("click", function(e){
	$('#menu_wrap').animate({width:"toggle"},400);
});


$(function(){
	
	$("#makerInfoShow").on("click", function(e){	
	  	location.href="/lineage/map?convertToggle=false";
	});
	
	
	$("#makerInfoShowAll").on("click", function(e){
		location.href="/lineage/map?convertToggle=true";
	});
	
	
	$("#dataPerPage").on("change", function(e){		
		 dataPerPage=$("#dataPerPage").val();
		 searchPlaces();				
	});
	
	
	$(".border-search-submit").on("click", function(e){
		searchPlaces();				
	})
	
})





