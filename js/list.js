$(document).ready(function(e){
	$(".item-curMonth").click(function(){
		var dateStr = $(this).attr('data');
		var changeStr = dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6); //改变格式
        $('#list').html("");
		show_list(changeStr);
	})
})

function show_list(today_date){
	$.ajax({
        type: 'GET',
        url: 'API/read_school.php',
        dataType: 'json',
        data: {
        	today_date: today_date,
        },
        success:function (data){
            $.each(data, function (id, obj) {
                append_list(today_date,obj.activity_id,obj.activity_title,obj.activity_spot,obj.activity_info,obj.start_time,obj.end_time,obj.moral_score,obj.state,obj.hold_department);
            })
    	},
    })
}

function append_list(today,activity_id,activity_title,activity_spot,activity_info,start_time,end_time,moral_score,state,hold_department){
    var start = start_time.split(" ")[1].substr(0,5);
    var end  = end_time.split(" ")[1].substr(0,5);
    var onetitle = '<div id="schedule" class="schedule">\
        <a class="schedule-line" href="#event-modal">\
            <div class="schedule-desc left">\
                <div class="schedule-first-colm left">\
                    <div class="schedule-start-time">'+start+'</div>\
                    <div class="schedule-end-time">-'+end+'</div>\
                </div>\
                <div class="schedule-second-colm left">\
                    <div class="schedule-title">'+activity_title+'</div>\
                </div>\
            </div>\
            <div class="schedule-cls right">\
                <span class="icon-cross"></span>\
            </div>\
        </a>\
        <div id="event-modal" class="event-modal">\
            <div class="event-modal-content">\
                <div class="event-modal-title">'+activity_title+'</div>\
                <div class="event-modal-info">\
                    <div class="event-modal-date">'+today+'</div>\
                    <div class="event-modal-time">\
                        <span class="event-modal-starttime">'+start+'</span>\
                        -\
                        <span class="event-modal-endtime">'+end+'</span>\
                    </div>\
                    <div class="event-modal-place">'+activity_spot+'</div>\
                    <div class="event-modal-place">'+state+'</div>\
                </div>\
                <div class="event-modal-desc">主办单位：'+hold_department+'</div>\
                <div class="event-modal-desc">德育分值：'+moral_score+'</div>\
                <div class="event-modal-desc">详细信息：'+activity_info+'</div>\
            </div>\
        </div>\
    </div>';
	$("#list").append(onetitle);
}
