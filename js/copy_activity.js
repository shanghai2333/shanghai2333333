function replace_space(str) {
   return str.replace(/(\s+)|(-+)/g, "");
}
function replace_special(str){
	str = str.replace(/</g,"(");
	str = str.replace(/>/g,")");
	return str;
}
function regIsPhone(fData) 
{
 var reg = /^(\+86)?(1[0-9]{10})$/; 
 return reg.test(fData); 
} 
function regIsQQ(qdata)
{
	var reg = /[1-9][0-9]{4,}/ ;
	return reg.test(qdata);
}
function regIsid(idata)
{
	var reg = /[1-9][0-9]{9}/;
	return reg.test(idata);
}
function regDataLength(fData)
{ var valLength = fData.length;
 var reg = new RegExp("^[\u0391-\uFFE5]$"); 
 var result = 0; for(i=0; i< valLength; i++) 
	{ 
 	if(reg.test(fData.charAt(i))) 
 		{ 
 			result += 2; 
 		} 
 	else {
 	 result ++; 
 	}
 	 }
 	 return result;
} 
function GetQueryString(name) //采用正则表达式获取地址栏参数
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


$(document).ready(function(){
	$("#signup_add").click(function(){
		var activity_id = GetQueryString("id");
		var name = replace_space($("#signup-name").val());
		var collg = replace_space($("#signup-collg").val());
		var sex = replace_space($("#signup-sex").val());
		var studentid = replace_space($("#signup-id").val());
		var phone = replace_space($("#signup-phone").val());
		var qq = replace_space($("#signup-qq").val());
		var email = replace_space($("#signup-email").val());
		var desc = replace_space(replace_special($("#signup-desc").val()));

		if( (qq && (!regIsQQ(qq))) || (studentid && (!regIsid(studentid)) )|| (phone && (!regIsPhone(phone)))){
			alert("请正确填写信息！");
		}else{
			if(regDataLength(name)>20||regDataLength(collg)>20||regDataLength(sex)>5||regDataLength(studentid)>10||regDataLength(desc)>200){//长度验证
				alert("信息超出长度限制！");
			}else{
				$.ajax({
					url:"API/copy_activity.php",
					type:"post",
					datatype:"JSON",
					data:{
						activity_id:activity_id,
						name:name,
						collg:collg,
						sex:sex,
						studentid:studentid,
						phone:phone,
						qq:qq,
						email:email,
						signup_desc:desc,
					},
					success:function(data){
						if(data=="success"){
							alert("提交成功！");
						}
						else if(data=="error"){
							alert("提交失败！");
						}
					},
				})
			}
		}
	})

})
