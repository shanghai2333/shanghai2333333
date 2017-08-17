<?php
	include_once("connect.php");

	//$username = $_SESSION['username'];    //yiban

	$activity_id = $_POST['activity_id'];
	$name = $_POST['name'];
	$collg = $_POST['collg'];
	$sex = $_POST['sex'];
	$studentid = $_POST['studentid'];
	$phone = $_POST['phone'];
	$qq = $_POST['qq'];
	$email = $_POST['email'];
	$signup_desc = $_POST['signup_desc'];

	try{
		$sql = $DBH->prepare("insert into sign_up(activity_id, username,name,collg,sex,studentid,phone,qq,email,signup_desc) values (?,?,?,?,?,?,?,?,?,?)");
		$sql->bindParam(1,$activity_id);
		$sql->bindParam(2,$username);
		$sql->bindParam(3,$name);
		$sql->bindParam(4,$collg);
		$sql->bindParam(5,$sex);
		$sql->bindParam(6,$studentid);
		$sql->bindParam(7,$phone);
		$sql->bindParam(8,$qq);
		$sql->bindParam(9,$email);
		$sql->bindParam(10,$signup_desc);
		$sql->execute();
		//print_r($sql->errorInfo());
		echo "success";
	}catch(PDOException $e){
		echo "error";
		die($e->getMessage());
	}

	try{
		$sql = $DBH->prepare("SELECT activity_name,activity_spot,activity_detail,moral_score,hold_department,start_time,end_time FROM all_activities WHERE id = ?;");
	    $sql->bindParam(1,$activity_id);
	    $sql->execute();
	    $result = $sql->fetch(PDO::FETCH_ASSOC);

	    $activity_title = $result['activity_name'];
	    $activity_spot = $result['activity_spot'];
	    $activity_info = $result['activity_detail'];
	    $hold_department = $result['hold_department'];
	    $start_time = $result['start_time'];
	    $end_time = $result['end_time'];
	    $moral_score = =$result['moral_score'];
	    $state = "未完成";
	}catch(PDOException $e){
		die($e->getMessage());
	}


	try{
		$sql = $DBH->prepare("insert into personal_activity(username,activity_id,activity_title,activity_spot,activity_info,hold_department,start_time,end_time,moral_score,state) values(?,?,?,?,?,?,?,?,?,?)");

		$sql->bindParam(1,$username);
		$sql->bindParam(2,$activity_id);
		$sql->bindParam(3,$activity_title);
		$sql->bindParam(4,$activity_spot);
		$sql->bindParam(5,$activity_info);
		$sql->bindParam(6,$hold_department);
		$sql->bindParam(7,$start_time);
		$sql->bindParam(8,$end_time);
		$sql->bindParam(9,$moral_score);
		$sql->bindParam(10,$state);
		$sql->execute();

	}catch(PDOException $e){
		die($e->getMessage());
	}

?>

