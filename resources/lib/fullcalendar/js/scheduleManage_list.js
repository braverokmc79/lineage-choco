let $g_arg;	//모달창에서 호출하는 함수에서 참조하기 위함)
let $calendar;
let $daterangeStartDate = "";
let $daterangeEndDate = "";
document.addEventListener('DOMContentLoaded', function() {

	//FullCalendar 초기 셋팅 및 데이터 불러오기
	getFullCalendarEvent();
	$('body').on('click', 'button.fc-prev-button', function(e) {
		console.log("prev1");
	});

	$('body').on('click', 'button.fc-next-button', function(e) {
		console.log("next");
	});
});

//FullCalendar 초기 셋팅
function getFullCalendarEvent(currentDatePage) {
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

		customButtons: {
			myCustomButton: {
				text: '일정입력',
				click: function(event) {
					onSelectEvent(event);
				}
			}
		},


		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,myCustomButton'
		},
		initialDate: currentDatePage, // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
		locale: 'ko', // 한국어 설정
		editable: true, // 수정 가능
		droppable: true, // 드래그 가능
		drop: function(arg) { // 드래그 엔 드롭 성공시

		},
		defaultView: 'timeGridWeek',
		navLinks: false, // can click day/week names to navigate views	
		allDaySlot: false,
		eventLimit: true, // allow "more" link when too many events
		//minTime: '10:00:00',
		//maxTime: '24:00:00',
		//contentHeight: 'auto',

		dateClick: function(arg) {
			//해당월  페이지 이동을 위한 날짜가져오기
			var getData = this.getCurrentData();
			var currentDatePage = moment(getData.currentDate).format('YYYY-MM-DD');
			$("#currentDatePage").val(currentDatePage);
			insertModalOpen(arg);

		},


		eventClick: function(info) {
			//여기서 info 가 아니라 event 로 처리해야 함
			event.preventDefault();


			//만약 구글 캘린던라면 링크 이동 중단 처리
			if (info.event.url.includes('https://www.google.com/calendar/')) {
				return;
			}

			//해당월  페이지 이동을 위한 날짜가져오기
			var getData = this.getCurrentData();
			var currentDatePage = moment(getData.currentDate).format('YYYY-MM-DD');
			$("#currentDatePage").val(currentDatePage);

			var url = info.event.url;
			//모달창 호출
			updateModalOpen(info.event.id, url);

		},

		eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
			//console.log(" 이벤트가 추가되면 발생하는 이벤트" ,obj);
		},
		eventChange: function(obj) { // 이벤트가 수정되면 발생하는 이벤트
			console.log("1.벤트가 수정되면 발생하는 이벤트 ", obj);
			const scheduleId = obj.event._def.publicId;
			const startDate = moment(obj.event._instance.range.start).format();
			const endDate = moment(obj.event._instance.range.end).format();
			const param = {
				scheduleId,
				startDate,
				endDate
			}
			console.log("2.벤트가 수정되면 발생하는 이벤트 ", obj.event._def.url);
			//만약 구글 캘린던라면 링크  중단 처리
			if (obj.event._def.url.includes('https://www.google.com/calendar/')) {
				alert("지정된 공휴일은 업데이트 처리 될수 없습니다.");
				getFullCalendarEvent();
				return;
			}

			$.ajax({
				url: "/admin/scheduleManage/updateSch",
				type: "POST",
				data: param,
				dataType: "text",
				success: function(result) {
					console.log(" 업데이트 : ", result);
				},
				error: function(result) {
					console.log("error:");
					console.log(result);
				}
			});

		},

		select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
			/*   console.log(" 드래그 ", arg)
			  var title = prompt('Event Title:');
			  if (title) {
				calendar.addEvent({
				  title: title,
				  start: arg.start,
				  end: arg.end,
				  allDay: arg.allDay
				})
			  }
			  calendar.unselect() */
		}

	});  //End  ------------  var calendar = new FullCalendar.Calendar(calendarEl,


	//DB에서  데이터 가져오기
	const arr = getCalendarDataInDB();
	$.each(arr, function(index, item) {
		$calendar.addEvent(item);
	});


	$calendar.render();

	$calendar.on('dateClick', function(info) {
		// console.log('clicked on ' + info.dateStr);
	});
	return $calendar;
}

//일정 입력
function onSelectEvent() {
	insertModalOpen("onSelectEvent");
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
		url: '/admin/scheduleManage/selectEventList',
		type: 'post',
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


// 받은 날짜값을 date 형태로 형변환 해주어야 한다.
function convertDate(date) {
	var date = new Date(date);
	alert(date.yyyymmdd());
}

/*

******************************************************************************************************	
	  여기서 부터 모달 JS
 ******************************************************************************************************
 *
 */
function customDaterangePicker() {

	$('input[name="daterange"]').daterangepicker({
		"showDropdowns": true,
		"showWeekNumbers": true,
		"showISOWeekNumbers": true,
		"timePicker": true,
		"timePicker24Hour": true,
		"timePickerSeconds": true,
		"locale": {
			"format": "YYYY-MM-DD Ah:mm",
			"separator": " - ",
			"applyLabel": "적용",
			"cancelLabel": "취소",
			"fromLabel": "From",
			"toLabel": "To",
			"customRangeLabel": "사용자 지정",
			"weekLabel": "W",
			"daysOfWeek": [
				"일",
				"월",
				"화",
				"수",
				"목",
				"금",
				"토"
			],
			"monthNames": [
				"1월",
				"2월",
				"3월",
				"4월",
				"5월",
				"6월",
				"7월",
				"8월",
				"9월",
				"10월",
				"11월",
				"12월"
			],
			"firstDay": 1
		},
		"autoUpdateInput": false,
		"alwaysShowCalendars": true,
		"startDate": $daterangeStartDate,
		"endDate": $daterangeEndDate,

		"minDate": "2000-12-31",
		"maxDate": "2050-12-31"
	}, function(start, end, label) {


		$("#startDate").val(moment(start).format());
		$("#endDate").val(moment(end).format());
		$("#daterange").val(start.format('YYYY-MM-DD Ah:mm') + "  ~   " + end.format('YYYY-MM-DD Ah:mm'));

	});

}



//이벤트 등록 모달
function insertModalOpen(arg) {
	$(".scheDeleteBtn").css("display", "none");
	$(".schInsertBtn").css("display", "block");
	$(".schUpdateBtn").css("display", "none");

	$(".modal-title").text("일정 등록");
	$("#title").val("");
	$("#url").val("");
	$("#textColor").val("#ffffff");
	$("#color").val("#1466b8");
	$("#backgroundColor").val("#3788d8");


	if (arg == "onSelectEvent") {
		const date1 = new Date();
		arg = {
			dateStr: moment(date1).format('YYYY MM DD')
		}
	}

	$g_arg = arg;

	//초기 해당일 날짜 셋팅
	$daterangeStartDate = arg.dateStr + " AM12:00";
	$daterangeEndDate = arg.dateStr + " PM1:00";
	$("#daterange").val($daterangeStartDate + "  ~   " + $daterangeEndDate);
	const sd1 = new Date(arg.dateStr + "T12:00:00");
	const ed1 = new Date(arg.dateStr + "T13:00:00");
	$("#startDate").val(moment(sd1).format());
	$("#endDate").val(moment(ed1).format());
	$(".daterangepicker_input input[name=daterangepicker_start]").val($daterangeStartDate);
	$(".daterangepicker_input input[name=daterangepicker_end]").val($daterangeEndDate);
	//end - 초기 해당일 날짜 셋팅


	customDaterangePicker();

	$('.insertModal').modal("show");
}



//스케쥴 등록
function insertSch(modal, arg) {
	const scheduleName = $("#title").val();
	const url = $("#url").val();
	const textColor = $("#textColor").val();
	const color = $("#color").val();
	const backgroundColor = $("#backgroundColor").val();
	const startDate = $("#startDate").val();
	const endDate = $("#endDate").val();

	if ($('.insertModal #end').val() <= $('.insertModal #start').val()) {
		alert('종료시간을 시작시간보다 크게 선택해주세요');
		$('.insertModal #end').focus();
		return;
	}
	if ($('.' + modal + ' #title').val() == '') {
		alert('제목을 입력해주세요');
		$("#title").focus();
		return;
	}

	if (startDate == "" || startDate == "Invalid date") {
		alert("시작 날짜를 다시 선택해 주세요.");
		return;
	}

	if (endDate == "" || endDate == "Invalid date") {
		alert("종료 날짜를 다시 선택해 주세요.");
		return;
	}

	const param = {
		scheduleName: scheduleName,
		url: url,
		textColor: textColor,
		color: color,
		backgroundColor: backgroundColor,
		startDate: startDate,
		endDate: endDate
	}

	//스케줄 작성
	$.ajax({
		url: "/admin/scheduleManage/addSchedule",
		type: "POST",
		data: param,
		dataType: "text",
		success: function(result) {
			//console.log(result);

			loadEvents();

		},
		error: function(result) {
			console.log("error:");
			console.log(result);
		}
	});

}

//캘린더 Refresh
function loadEvents() {
	$calendar.destroy();
	const currentDatePage = $("#currentDatePage").val();
	//캘린더 데이터 목록 다시 불러오기
	getFullCalendarEvent(currentDatePage);

	$('.insertModal').modal("hide");
}

//모달 닫기
function closeModal() {
	$('.insertModal').modal("hide");
}

//이벤트 수정 및 삭제 모달
function updateModalOpen(id, url) {

	const currentState = "admin";
	$(".scheDeleteBtn").css("display", "block");
	$(".schInsertBtn").css("display", "none");
	$(".schUpdateBtn").css("display", "block");

	$(".modal-title").text("일정 수정");

	if (currentState == "admin") {

		$.ajax({
			url: "/admin/scheduleManage/getEvent",
			type: "POST",
			data: { id: id },
			dataType: "json",
			success: function(data) {

				const { id, title, url, textColor, color, backgroundColor, start, end } = data;

				$("#scheduleId").val(id);
				$("#title").val(title);
				$("#url").val(data.url);
				$("#textColor").val(textColor);
				$("#color").val(color);
				$("#backgroundColor").val(backgroundColor);

				//초기 해당일 날짜 셋팅
				$("#startDate").val(start);
				$("#endDate").val(end);


				$daterangeStartDate = moment(start).format('YYYY-MM-DD Ah:mm');
				$daterangeEndDate = moment(end).format('YYYY-MM-DD Ah:mm');
				$("#daterange").val($daterangeStartDate + "  ~   " + $daterangeEndDate);

				$(".daterangepicker_input input[name=daterangepicker_start]").val($daterangeStartDate);
				$(".daterangepicker_input input[name=daterangepicker_end]").val($daterangeEndDate);
				//end -  해당일 날짜 셋팅
				//date picker 호출
				customDaterangePicker();
				$('.insertModal').modal("show");
			},
			error: function(result) {
				console.log("error:");
				console.log(result);
			}
		});


	} else {
		//구글 이동
		//window.open(url);
	}
}


//삭제 처리 
function deleteSch() {
	const id = $("#scheduleId").val();
	if (confirm("정말 삭제 하시겠습니까?")) {
		$.ajax({
			url: "/admin/scheduleManage/deleteSch",
			type: "POST",
			data: { id: id },
			dataType: "json",
			success: function(result) {
				// console.log(result);
				if (result == 1) {
					loadEvents();
				} else {
					console.log("error");
				}
			},
			error: function(result) {
				console.log("error:");
				console.log(result);
			}
		});

	}

}



//스케쥴 수정
function updateSch(modal, arg) {
	const scheduleId = $("#scheduleId").val();
	const url = $("#url").val();
	const textColor = $("#textColor").val();
	const color = $("#color").val();
	const backgroundColor = $("#backgroundColor").val();
	const scheduleName = $("#title").val();
	const startDate = $("#startDate").val();
	const endDate = $("#endDate").val();


	if ($('.insertModal #end').val() <= $('.insertModal #start').val()) {
		alert('종료시간을 시작시간보다 크게 선택해주세요');
		$('.insertModal #end').focus();
		return;
	}
	if ($('.' + modal + ' #title').val() == '') {
		alert('제목을 입력해주세요');
		$("#title").focus();
		return;
	}

	if (startDate == "" || startDate == "Invalid date") {
		alert("시작 날짜를 다시 선택해 주세요.");
		return;
	}

	if (endDate == "" || endDate == "Invalid date") {
		alert("종료 날짜를 다시 선택해 주세요.");
		return;
	}

	const param = {
		scheduleId: scheduleId,
		scheduleName: scheduleName,
		url: url,
		textColor: textColor,
		color: color,
		backgroundColor: backgroundColor,
		startDate: startDate,
		endDate: endDate
	}


	$.ajax({
		url: "/admin/scheduleManage/updateSch",
		type: "POST",
		data: param,
		dataType: "text",
		success: function(result) {
			loadEvents();
		},
		error: function(result) {
			console.log("error:");
			console.log(result);
		}
	});

}



/*

******************************************************************************************************	
	  여기서 부터는 fullcalendar 과 상관없는  게시판 목록 가져오기
 ******************************************************************************************************
 *
 */

function findBoardTypeByTitleList(event) {
	const boardType = event.value;

	if (boardType) {
		$.ajax({
			type: "POST",
			url: "/admin/scheduleManage/findBoardTypeByTitleList",
			data: { boardType },
			success: function(res) {

				console.log(res);
				const titleList = res.map(board => {
					console.log(board.agoTime);
					let agoTime = "";
					if (parseInt(board.agoTime) >= 1) {
						agoTime = "[" + board.agoTime + "일전]"
					} else {
						agoTime = "[오늘]";
					}

					let title = "";
					if (board.title.length >= 20) {
						title = board.title.substring(0, 20) + "...";
					} else {
						title = board.title;
					}

					title = title + " " + agoTime;
					return ("<option  value='/board/" + boardType + "/read/" + board.bno + "' >" + title + "</option>")
				});

				$("#boardTitleList").html(titleList);
				setBoardLink();
			},
			error: function(err) {
				console.error("에러 : ", err);
			}
		})
	}
}

function setBoardLink() {
	const url = $("#boardTitleList").val();
	$('#url').val(url);
}