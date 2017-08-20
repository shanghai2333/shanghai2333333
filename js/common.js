$(document).ready(function(){
	resize();
	$("#showbar .nav-classify-part").click(function(){
		$("#showbar .nav-classify-part.selected").removeClass('selected');
		$(this).addClass('selected');

		var selectId = $(this).attr("id");
		var selectPart = selectId.split('-');
		console.log(selectPart[1]);
		$("#showbar .main-classify-part.selected").removeClass('selected');
		$("#showbar #main-"+selectPart[1]).addClass('selected');
	})
	$("#search").click(function(){
		$("#searchbar").removeClass('hide');
		$("#searchbar").removeClass('zoom-out-left');
		$("#searchbar").addClass('zoom-in-right');
		$("#showbar").removeClass('zoom-in-left');
		$("#showbar").addClass('zoom-out-right');
		setTimeout(function(){
			$("#showbar").addClass('hide');
		},500);
	})
	$("#close").click(function(){
		$("#showbar").removeClass('hide');
		$("#searchbar").addClass('zoom-out-left');
		$("#searchbar").removeClass('zoom-in-right');
		$("#showbar").addClass('zoom-in-left');
		$("#showbar").removeClass('zoom-out-left');
		$("#showbar").removeClass('zoom-out-right');
		setTimeout(function(){
			$("#searchbar").addClass('hide');
		},500);
	})

	$(".main-line").click(function(){
		$("#detailbar").removeClass('hide');
		$("#detailbar").addClass('zoom-in-left');
		$("#detailbar").removeClass('zoom-out-right');
		$("#showbar").addClass('zoom-out-left');
		$("#showbar").removeClass('zoom-in-right');
		setTimeout(function(){
			$("#showbar").addClass('hide');
		},500);
		
	})
	$(".nav-detail-cls").click(function(){
		$("#detailbar").removeClass('zoom-in-left');
		$("#detailbar").addClass('zoom-out-right');
		$("#showbar").removeClass('zoom-in-left');
		$("#showbar").removeClass('zoom-out-left');
		$("#showbar").addClass('zoom-in-right');
		$("#showbar").removeClass('hide');
		setTimeout(function(){
			$("#detailbar").addClass('hide');
		},500);
	})
	$(".nav-detail-collect").click(function(){
		if($(this).find("span").attr("class") == 'icon-star-empty'){
			$(this).find("span").removeClass('icon-star-empty');
			$(this).find("span").addClass('icon-star-full');
		}
		else{
			$(this).find("span").addClass('icon-star-empty');
			$(this).find("span").removeClass('icon-star-full');
		}
	})
})
function resize(){
	var winW = $(window).width();
	var winH = $(window).height();
	$("#main-content").height(winH);
}