<?php
$data = $_POST;
$activity_name = $data['activity-name'];
$hold_department = "|";
$hold_department = $hold_department.(trim($data['hold-collg-1'])?trim($data['hold-collg-1'])."|":"");
$hold_department = $hold_department.(trim($data['hold-collg-2'])?trim($data['hold-collg-2'])."|":"");
$hold_department = $hold_department.(trim($data['hold-collg-3'])?trim($data['hold-collg-3'])."|":"");
$hold_department = $hold_department.(trim($data['hold-collg-4'])?trim($data['hold-collg-4'])."|":"");
$hold_department = $hold_department.(trim($data['hold-collg-5'])?trim($data['hold-collg-5'])."|":"");
$start_time = $data['start-time'];
$end_time = $data['end-time'];
$activity_detail = $data['activity-detail'];
$activity_spot="";
if(isset($data['activity-spot'])&&!empty($data['activity-spot'])){
	$activity_spot = $data['activity-spot'];
}
$moral_score = 0;
if($data['moral-score-check']==="yes"){
	$moral_score = $data['moral-score'];
}
if($data['info-collect-check']==="yes"){
	$ifname=(isset($data['signup-name']))?"1":"0";
	$ifcollg=(isset($data['signup-collg']))?"1":"0";
	$ifgender=(isset($data['signup-sex']))?"1":"0";
	$ifsid=(isset($data['signup-id']))?"1":"0";
	$ifmobile=(isset($data['signup-phone']))?"1":"0";
	$ifqq=(isset($data['signup-qq']))?"1":"0";
	$ifemail=(isset($data['signup-email']))?"1":"0";
	$infocollect_other = $data['othertitle'];
	$infocollect_other_des = $data['otherdescribe'];
}else{
	$ifname=$ifcollg=$ifgender=$ifsid=$ifmobile=$ifqq=$ifemail=0;
	$infocollect_other_des=$infocollect_other="";
}
if($data['strong-check']=="yes"){
	$ifstrong = 1;
}else{
	$ifstrong = 0;
}

$pic1 = "1";
$pic2 = "2";
$pic3 = "3";
?>

<?php
include("connect.php");
	//initialize

try {
	$query = $DBH->prepare("insert into all_activities (activity_name, activity_spot, activity_detail, activity_pic1, activity_pic2, activity_pic3, moral_score, hold_department, ifstrong, start_time, end_time, infocollect_name, infocollect_collg, infocollect_gender, infocollect_sid, infocollect_mobile, infocollect_qq, infocollect_email, infocollect_other, infocollect_other_des) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ");
	$query->bindParam(1,$activity_name);
	$query->bindParam(2,$activity_spot);
	$query->bindParam(3,$activity_detail);
	$query->bindParam(4,$pic1);
	$query->bindParam(5,$pic2);
	$query->bindParam(6,$pic3);
	$query->bindParam(7,$moral_score);
	$query->bindParam(8,$hold_department);
	$query->bindParam(9,$ifstrong);
	$query->bindParam(10,$start_time);
	$query->bindParam(11,$end_time);
	$query->bindParam(12,$ifname);
	$query->bindParam(13,$ifcollg);
	$query->bindParam(14,$ifgender);
	$query->bindParam(15,$ifsid);
	$query->bindParam(16,$ifmobile);
	$query->bindParam(17,$ifqq);
	$query->bindParam(18,$ifemail);
	$query->bindParam(19,$infocollect_other);
	$query->bindParam(20,$infocollect_other_des);
	$query->execute();	


}
catch(PDOException $e){
	//print_r($query->errorInfo());
	die($e->getMessage());
}
?>