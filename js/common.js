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
		$("#searchbar").removeClass('zoom-out-left');
		$("#searchbar").addClass('zoom-in-right');
		$("#showbar").removeClass('zoom-in-left');
		$("#showbar").addClass('zoom-out-right');
	})
	$("#close").click(function(){
		$("#searchbar").addClass('zoom-out-left');
		$("#searchbar").removeClass('zoom-in-right');
		$("#showbar").addClass('zoom-in-left');
		$("#showbar").removeClass('zoom-out-right');
	})
})
function resize(){
	var winW = $(window).width();
	var winH = $(window).height();
	$("#main-content").height(winH);
}