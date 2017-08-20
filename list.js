$(document).ready(function(e){

  $('.schedule-line').click(function(){
    $(".event-modal-overlay").css({
      "z-index" : "1002",
      "display" : "block",
      "opacity" : "0.5"
    })
    $('.event-modal').css({
      "z-index" : "1003",
      "display" : "block",
      "opacity" : "1",
      "transform" : "scaleX(1)",
      "top" : "10%"
    })
  })
  $('.event-modal-overlay').click(function(){
    $(this).css({
      "z-index" : "999",
      "display" : "none",
      "opacity" : "1"
    })
    $('.event-modal').css({
      "display" : "none",
      "opacity" : "0",
      "transform" : "scaleX(0.7)",
      "top" : "80%"
    })
  })
  $('.event-finished').click(function(){
    $('.event-modal-overlay').css({
      "z-index" : "999",
      "display" : "none",
      "opacity" : "1"
    })
    $('.event-modal').css({
      "display" : "none",
      "opacity" : "0",
      "transform" : "scaleX(0.7)",
      "top" : "80%"
    })
  })
  $('.cancel').click(function(){
    $('.event-modal-overlay').css({
      "z-index" : "999",
      "display" : "none",
      "opacity" : "1"
    })
    $('.event-modal').css({
      "display" : "none",
      "opacity" : "0",
      "transform" : "scaleX(0.7)",
      "top" : "80%"
    })
  })
  $('.schedule-cls').click(function(e){
    e.stopPropagation();

    var $deleteEvent = $(this).parent();
    var $deleteEventNextAll = $deleteEvent.nextAll();
    $deleteEvent.addClass('zoom-out-right');
    setTimeout(function(){
      $deleteEventNextAll.addClass('list-up');
    },800);
    setTimeout(function(){
      $deleteEvent.remove();
    },900);
    $(".schedule-line").removeClass('list-up');
    //console.log($deleteEventNextAllNum);
    // ------------------------------------------
    //     这需要从数据库中删除日程，并重新加载数据库中存在的日程
    // ------------------------------------------
  })


    var myDate = new Date();    
    var today233 = myDate.toLocaleDateString(); //可以获取当前日期
    var today_y=today233.split("/")[2];
    var today_m=today233.split("/")[0];
    var today_d=today233.split("/")[1];
    show_list(today_y+"-"+today_m+"-"+today_d);
    
	$(".item-curMonth").click(function(){
        $('#list1').html("");
		var dateStr = $(this).attr('data');
		var changeStr = dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6); //改变格式
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
//个人事件
    $.post("API/showmyactivity.php",
      { 
        chosentime:today_date
      },function(text_str){
        var text = text_str;
        if (text['status']=="success"){
          //得到每条个人事件的记录并显示在前端
          for (var a in text['data']){
            var activity_id=text['data'][a]['id'];
            var activity_title=text['data'][a]['activity_title'];
            var activity_info=text['data'][a]['activity_info'];
            var start_time=text['data'][a]['start_time'];
            var end_time=text['data'][a]['end_time'];

            var start = start_time.split(" ")[1].substr(0,5);
            var end  = end_time.split(" ")[1].substr(0,5);
            var onetitle = $('#list').clone(true);
            onetitle.find(".schedule-start-time").html(start);
            onetitle.find(".schedule-end-time").html(end);
            onetitle.find(".title233").html(activity_title);
            onetitle.find("a").attr("class","schedule-line");
            onetitle.find("a").attr("onclick","change_model_for_my('"+today_date+"','"+activity_id+"','"+activity_title+"','"+activity_info+"','"+start_time+"','"+end_time+"')");
            onetitle.find(".delete233").attr("onclick","delete_for_my("+activity_id+")");
            $("#list1").append(onetitle);

          }
        }
        else{
          Materialize.toast("遇到未知错误~~~",3000);
        }
      });
}

function append_list(today,activity_id,activity_title,activity_spot,activity_info,start_time,end_time,moral_score,state,hold_department){
    var start = start_time.split(" ")[1].substr(0,5);
    var end  = end_time.split(" ")[1].substr(0,5);
    var onetitle = $('#list').clone(true);
    onetitle.find(".schedule-start-time").html(start);
    onetitle.find(".schedule-end-time").html(end);
    onetitle.find(".title233").html(activity_title);
    onetitle.find("a").attr("class","schedule-line");
    onetitle.find("a").attr("onclick","change_model('"+today+"','"+activity_id+"','"+activity_title+"','"+activity_spot+"','"+activity_info+"','"+start_time+"','"+end_time+"','"+moral_score+"','"+state+"','"+hold_department+"')");
	onetitle.find(".delete233").attr("onclick","delete233("+activity_id+")");
    $("#list1").append(onetitle);
}

function change_model(today,activity_id,activity_title,activity_spot,activity_info,start_time,end_time,moral_score,state,hold_department){
    var model = $('#event-modal');
    model.find(".event-modal-title").html(activity_title);
    model.find(".event-modal-date").html("今天是："+today);
    model.find(".event-modal-starttime").html("起始时间："+start_time);
    model.find(".event-modal-endtime").html("结束时间："+end_time);
    model.find(".event-modal-spot").html("活动地点："+activity_spot);
    model.find(".event-modal-state").html("当前状态："+state);
    model.find(".event-modal-detail").html("活动详情："+activity_info);
    model.find(".event-modal-moral").html("德育分值："+moral_score);
    model.find(".event-modal-hold").html("主办单位："+hold_department);
    model.find(".event-finished").attr("onclick","finish_state('"+activity_id+"','"+moral_score+"')");
    if(state == "已完成"){
        model.find(".event-finished").attr("class","event-finished hide");
    }
    if(state == "未完成"){
        model.find(".event-finished").attr("class","event-finished btn-flat");
    }
}

function finish_state(this_id,moral_score){
    $.ajax({
        type: 'POST',
        url: 'API/change_state.php',
        dataType: 'json',
        data: {
            activity_id: this_id,
        },
        success:function (data){
            if(data.result == "success"){
                alert("恭喜您完成计划！");
                location.reload(true);
            }else{
                alert("error");
            }
        },
    });

    $.ajax({
        type: 'POST',
        url: 'API/add_moral.php',
        dataType: 'json',
        data: {
            moral_score: moral_score,
        },
        success:function (data){
            var moralnow = data.result;
    // ------------------------------------------
    //   //修改当前德育分
    // ------------------------------------------
            alert(moralnow);  
        },
    })

}

function delete233(activity_id){
    $.ajax({
        type: 'POST',
        url: 'API/delete.php',
        dataType: 'json',
        data: {
            activity_id: activity_id,
        },
        success:function (data){
            if(data.result == "success"){
            }
        },
    })
}


//以下为个人事件相关函数
function finish_add_new(){
    //添加
    $.post("API/addmyactivity.php",
      {
        activity_title:$("[name='edit-event-name']").val(),
        activity_info:$("[name='edit-event-desc']").val(),
        start_time:$("[name='edit-event-starttime']").val(),
        end_time:$("[name='edit-event-endtime']").val()
      },function(text_str){
        var text = text_str;
        if (text['status']=="success"){
         /* var id=text['my_activity_id'];
        //这个id前端要记下
            var onetitle = $('#list').clone(true);
            onetitle.find(".schedule-start-time").html($("[name='edit-event-starttime']").val());
            onetitle.find(".schedule-end-time").html($("[name='edit-event-endtime']").val());
            onetitle.find(".title233").html($("[name='edit-event-name']").val());
            onetitle.find("a").attr("class","schedule-line");
            //onetitle.find("a").attr("onclick","change_model_for_my('"+today_date+"','"+activity_id+"','"+activity_title+"','"+activity_info+"','"+start_time+"','"+end_time+"')");
            onetitle.find(".delete233").attr("onclick","delete_for_my("+id+")");
            $("#list1").append(onetitle);   */
            Materialize.toast("添加成功！",3000);

        }
        else{
          //try {
               // Materialize.toast(errormsg[type],4000);
            //} catch(e) {
                Materialize.toast("遇到未知错误~~~",3000);
            //}
        }
      });
}

function change_model_for_my(today,activity_id,activity_title,activity_info,start_time,end_time){
    var model = $('#event-modal');
    model.find(".event-modal-title").html(activity_title);
    model.find(".event-modal-date").html("今天是："+today);
    model.find(".event-modal-starttime").html("起始时间："+start_time);
    model.find(".event-modal-endtime").html("结束时间："+end_time);
    model.find(".event-modal-detail").html("活动详情："+activity_info);
    model.find(".event-finished").attr("class","event-finished hide");
}

function delete_for_my(activity_id){
    $.post("api/deletemyactivity.php",
      { 
        my_activity_id:activity_id
      },function(text_str){
        var text = text_str;
        if (text['status']=="success"){
          Materialize.toast("删除成功！",4000);
        }
        else{
          Materialize.toast("遇到未知错误~~~",3000);
        }
      });
}