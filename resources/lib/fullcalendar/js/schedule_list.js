let $calendar;
document.addEventListener('DOMContentLoaded', function() {
	//FullCalendar 초기 셋팅 및 데이터 불러오기
	getFullCalendarEvent();
});

//FullCalendar 초기 셋팅
function getFullCalendarEvent() {
	const calendarEl = document.getElementById('calendar');
	$calendar = new FullCalendar.Calendar(calendarEl, {

		googleCalendarApiKey: 'AIzaSyC0FUZQDQQz--Jk247ww0WFXmtkCxoKoRE',
		//className은  되도록 캘린더랑 맞추길
		eventSources: [
			{
				googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
				className: '대한민국의 휴일',
				color: '#be5683', //rgb,#ffffff 등의 형식으로 할 수 있다
				//textColor: 'black' 
			},

		],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,myCustomButton'
		},
		//initialDate: currentDatePage, // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
		locale: 'ko', // 한국어 설정
		editable: false, // 수정 가능
		droppable: false, // 드래그 가능
		drop: function(arg) { // 드래그 엔 드롭 성공시
		},
		defaultView: 'timeGridWeek',
		navLinks: false, // can click day/week names to navigate views	
		allDaySlot: false,
		eventLimit: true, // allow "more" link when too many events
		dateClick: function(arg) {
			
		},
		eventClick: function(info) {
			//여기서 info 가 아니라 event 로 처리해야 함
			event.preventDefault();
			//만약 구글 캘린던라면 링크 이동 중단 처리
			if (info.event.url.includes('https://www.google.com/calendar/')) {
				return;
			}
			

			const url = info.event.url;
			if(url!="" || url!="#"){
				location.href=url;
			}
		},
	});  

	//DB에서  데이터 가져오기
	const arr = getCalendarDataInDB();
	$.each(arr, function(index, item) {
		$calendar.addEvent(item);
	});


	$calendar.render();
	return $calendar;
}

//arr 는 테스트용으로 DB 에서 스케즐 데이터를 가져오지 못했을 경우 테스트용 데이터
function getCalendarDataInDB() {
	//arr 임의 데이터
	let arr = [{
		title: 'evt111',
		start: '2023-03-22T10:30:00',
		end: '2023-03-23T10:30:00',
		backgroundColor: "#52cdff",
		color: "#000",
		textColor: "#fff",
		url: "https://daum.net"
	}];

	$.ajax({
		contentType: 'application/json',
		dataType: 'json',
		url: '/schedule/selectEventList',
		type: 'GET',
		async: false,
		success: function(res) {

			arr = res;
		},
		error: function(res) {
			console.log(res);
		}
	});
	return arr;
}




