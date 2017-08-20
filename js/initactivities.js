$(document).ready(function(e){
	$.getJSON("API/read_activities.php",function(data){
		/*
		未根据时间分类是否为历史事件
		*/
	
		var thiscollg = data.collg;
		console.log(thiscollg)
		var activities = data.activities;
	
		/*
		初始化搜索栏，显示关注人数最多的前三个
		*/
		var star_sorted = activities.sort(function(a,b){
			return b.stars-a.stars
		});
		console.log(star_sorted[0])
		var n_showstars
		if(activities.length<=3){
			n_showstars = activities_length-1
		}else{
			n_showstars = 2
		}
		console.log(star_sorted)
		for(var i = 0;i<=n_showstars;i++){
			the_star = star_sorted[i];
			var template
			if(the_star.hold_department =="yiban"){

				template = $(".yiban-template").clone(true);
      			template.find(".main-line-title").html("<span class='main-line-collg' id='collg-yiban'>易班</span>"+the_star.activity_name)


			}else if(the_star.hold_department == "school"){
	      		
	      		template = $(".school-template").clone(true);
	      		template.find(".main-line-title").html("<span class='main-line-collg' id='collg-school'>校会</span>"+the_star.activity_name)


			}else{
				//分解院
				var collgs=the_star.hold_department.split("|");
				//span标签
				var spanstr=""
				var collglogo = "collg-scss"
				$.each(collgs,function(i,item){
					if(item===""){

					}else{
						spanstr += "<span class='main-line-collg' id='"+collglogo+"'>"+item+"</span>"
					}
				})
				if($.inArray(thiscollg,collgs)===-1){//院外活动
	      			template = $(".nocolg-template").clone(true);
	      		}else{
	      			template = $(".incolg-template").clone(true);
	      		}
	      		template.find(".main-line-title").html(spanstr+the_star.activity_name)


			}

      		template.find("img").attr("src",the_star.pic1)
      		if(the_star.start_time[5]+the_star.start_time[6]+the_star.start_time[8]+the_star.start_time[9]===the_star.end_time[5]+the_star.end_time[6]+the_star.end_time[8]+the_star.end_time[9]){
      			template.find(".main-line-date").html("<span class='main-line-start-date'>"+the_star.start_time[5]+the_star.start_time[6]+"月"+the_star.start_time[8]+the_star.start_time[9]+"日"+"</span>")
      		}else{
      			template.find(".main-line-start-date").html(the_star.start_time[5]+the_star.start_time[6]+"月"+the_star.start_time[8]+the_star.start_time[9]+"日")
      			template.find(".main-line-end-date").html(the_star.end_time[5]+the_star.end_time[6]+"月"+the_star.end_time[8]+the_star.end_time[9]+"日")
      		}
      		template.find("#join-num").html(the_star.stars)

      		template.removeClass("hide");
      		template.removeClass("yiban-template");
      		template.removeClass("school-template");
      		template.removeClass("nocolg-template");
      		template.removeClass("incolg-template");
      		$(".sidebar").find("#main-school").append(template);
		}

		/*
		初始化mainbar的三栏：校级，院内，院外
		*/

	    $.each(activities, function(i, activity){
	      	//$("div").append(activity + " ");
	      	if(activity.hold_department==="yiban"){
	      		console.log(activity.activity_name)
	      		var template = $(".yiban-template").clone(true);
	      		console.log(template.find(".main-line-title").html())
	      		template.find(".main-line-title").html("<span class='main-line-collg' id='collg-yiban'>易班</span>"+activity.activity_name)
	      		template.find("img").attr("src",activity.pic1)
	      		if(activity.start_time[5]+activity.start_time[6]+activity.start_time[8]+activity.start_time[9]===activity.end_time[5]+activity.end_time[6]+activity.end_time[8]+activity.end_time[9]){
	      			template.find(".main-line-date").html("<span class='main-line-start-date'>"+activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日"+"</span>")
	      		}else{
	      			template.find(".main-line-start-date").html(activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日")
	      			template.find(".main-line-end-date").html(activity.end_time[5]+activity.end_time[6]+"月"+activity.end_time[8]+activity.end_time[9]+"日")
	      		}
	      		template.find("#join-num").html(activity.stars)

	      		template.removeClass("hide");
	      		template.removeClass("yiban-template");
	      		$(".mainbar").find("#main-school").append(template);
	      	}else if(activity.hold_department==="school"){
	      		console.log(activity.activity_name)
	      		var template = $(".school-template").clone(true);
	      		template.find(".main-line-title").html("<span class='main-line-collg' id='collg-school'>校会</span>"+activity.activity_name)
	      		template.find("img").attr("src",activity.pic1)
	      		if(activity.start_time[5]+activity.start_time[6]+activity.start_time[8]+activity.start_time[9]===activity.end_time[5]+activity.end_time[6]+activity.end_time[8]+activity.end_time[9]){
	      			template.find(".main-line-date").html("<span class='main-line-start-date'>"+activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日"+"</span>")
	      		}else{
	      			template.find(".main-line-start-date").html(activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日")
	      			template.find(".main-line-end-date").html(activity.end_time[5]+activity.end_time[6]+"月"+activity.end_time[8]+activity.end_time[9]+"日")
	      		}
	      		template.find("#join-num").html(activity.stars)


	      		template.removeClass("hide");
	      		template.removeClass("school-template");
	      		$(".mainbar").find("#main-school").append(template);
	      	}else{
	      		//分解院
				var collgs=activity.hold_department.split("|");
				//span标签
				var spanstr=""
				var collglogo = "collg-scss"
				$.each(collgs,function(i,item){
					if(item===""){

					}else{
						spanstr += "<span class='main-line-collg' id='"+collglogo+"'>"+item+"</span>"
					}
				})
	      		if($.inArray(thiscollg,collgs)===-1){//院外活动
	      			var template = $(".nocolg-template").clone(true);
	      			template.find(".main-line-title").html(spanstr+activity.activity_name)
	      			template.find("img").attr("src",activity.pic1)
		      		if(activity.start_time[5]+activity.start_time[6]+activity.start_time[8]+activity.start_time[9]===activity.end_time[5]+activity.end_time[6]+activity.end_time[8]+activity.end_time[9]){
		      			template.find(".main-line-date").html("<span class='main-line-start-date'>"+activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日"+"</span>")
		      		}else{
		      			template.find(".main-line-start-date").html(activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日")
		      			template.find(".main-line-end-date").html(activity.end_time[5]+activity.end_time[6]+"月"+activity.end_time[8]+activity.end_time[9]+"日")
		      		}
	      			template.find("#join-num").html(activity.stars)


		      		template.removeClass("hide");
	      			template.removeClass("nocolg-template");
		      		$(".mainbar").find("#main-nocolg").append(template);

	      		}else{//院内活动
	      			var template = $(".incolg-template").clone(true);
	      			template.find(".main-line-title").html(spanstr+activity.activity_name)
	      			template.find("img").attr("src",activity.pic1)
		      		if(activity.start_time[5]+activity.start_time[6]+activity.start_time[8]+activity.start_time[9]===activity.end_time[5]+activity.end_time[6]+activity.end_time[8]+activity.end_time[9]){
		      			template.find(".main-line-date").html("<span class='main-line-start-date'>"+activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日"+"</span>")
		      		}else{
		      			template.find(".main-line-start-date").html(activity.start_time[5]+activity.start_time[6]+"月"+activity.start_time[8]+activity.start_time[9]+"日")
		      			template.find(".main-line-end-date").html(activity.end_time[5]+activity.end_time[6]+"月"+activity.end_time[8]+activity.end_time[9]+"日")
		      		}
	      			template.find("#join-num").html(activity.stars)


		      		template.removeClass("hide");
	      			template.removeClass("incolg-template");
		      		$(".mainbar").find("#main-incolg").append(template);
	      		}

	      	}
	    });
	});
})