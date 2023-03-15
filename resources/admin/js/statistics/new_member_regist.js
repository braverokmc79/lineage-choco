const storeBackgroundColor = [
	'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
	'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
	'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
	'rgba(255, 99, 132, 0.2)'
];
const storeBorderColor = [
	'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
	'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
	'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
	'rgba(255,99,132,1)'
];
let options = {
	scales: {
		yAxes: [{
			ticks: {
				beginAtZero: true
			}
		}]
	},
	legend: {
		display: false
	},
	elements: {
		point: {
			radius: 0
		}
	}

};
function listNewMemberRegistPerDay(currentMonth) {
	
	let  ym =currentMonth.split("-");
	$('.card-title').html("새회원 가입수:&nbsp;  "+ym[0] + '년 ' + ym[1]+"월");
	//thisMonth = new Date(ym[0],  parseInt(ym[1]) - 1, 1);	
	$(".year-month").html(ym[0] + '년 ' + ym[1]+"월");
	
	$.ajax({
		url: "/admin/statistics/listNewMemberRegistPerDay",
		type:"POST",
		data: { currentMonth },
		success: function(response) {
			$("#barChart").remove();
			$("#lineChart").remove();
			$("#barChartDiv").append('<canvas id="barChart"></canvas>');
			$("#lineChartDiv").append('<canvas id="lineChart"></canvas>');

			let labels = [];
			let chartData = [];
			let backgroundColor = [];
			let borderColor = [];
			let myChartData ;
			let barChartCanvas;
			let barChart ;
			let lineChartCanvas ;
			let lineChart;
			
			//console.log("listNewMemberRegistPerDay  : ", response);
			let i = 0;
			response.filter(item => {
				//console.log("item  : ", item);
				labels.push(item.createdDate+"일");
				chartData.push(item.cnt);

				backgroundColor.push(storeBackgroundColor[i]);
				borderColor.push(storeBorderColor[i]);
				i++;
			});

			myChartData = {
				labels,
				datasets: [{
					label: '회원가입',
					data: chartData,
					backgroundColor,
					borderColor,
					borderWidth: 1,
					fill: false
				}]
			};
			//console.log(myChartData);


			if ($("#barChart").length) {
				barChartCanvas = $("#barChart").get(0).getContext("2d");
				barChart = new Chart(barChartCanvas, {
					type: 'bar',
					data: myChartData,
					options
				});
			}

			  if ($("#lineChart").length) {
			    lineChartCanvas = $("#lineChart").get(0).getContext("2d");
			    lineChart = new Chart(lineChartCanvas, {
			      type: 'line',
			      data: myChartData,
			      options: options
			    });
			  }
	 

		},
		error: function(error) {
			console.log(" error : ", error);
		}
	})
}



function calendarInit() {

    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
  
    
    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // console.log(prevDate, prevDay, nextDate, nextDay);
		
        let curMonth=(("00"+(currentMonth + 1).toString()).slice(-2));
        // 현재 월 표기
        $('.year-month').text(currentYear + '년 ' + curMonth+"월");
		$(".card-title").html("새회원 가입수: &nbsp;"+currentYear + '년 ' + curMonth+"월");
      
        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }
    }

    // 이전달로 이동
    $('.go-prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
        let custmomMonth=thisMonth.getFullYear()+"-"+(("00"+(thisMonth.getMonth()+1).toString()).slice(-2));
        listNewMemberRegistPerDay(custmomMonth);
        $("#currentMonth").val(custmomMonth);
    });

    // 다음달로 이동
    $('.go-next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth); 
        let custmomMonth=thisMonth.getFullYear()+"-"+(("00"+(thisMonth.getMonth()+1).toString()).slice(-2));
        listNewMemberRegistPerDay(custmomMonth);
        $("#currentMonth").val(custmomMonth);
    });
}



$(function() {
	let currentMonth = $("#currentMonth").val();
	listNewMemberRegistPerDay(currentMonth);
	$("#currentMonth").on("change", function(e) {
		currentMonth = $("#currentMonth").val();
			
		listNewMemberRegistPerDay(currentMonth);
	});


 
	calendarInit();
});

