<?php
	$yb_id = "123456";

	include("../connect.php");
	try{
		$sql = $DBH->prepare("SELECT * FROM all_activities");
	    $sql->execute();
	    $allrows = $sql->fetchAll(PDO::FETCH_ASSOC);
	    $result1 = [];
	    $result2 = [];
	    $result3 = [];
	    foreach($allrows as $row){
	    	$getstars = $DBH->prepare("select count(*) as starnum from user_star where activityid = ?");
	    	$getstars->bindParam(1,$row['id']);
	    	$getstars->execute();
	    	$stars = $getstars->fetch();
	    	$row['stars'] = $stars['starnum'];

	    	if($row['hold_department']=="yiban"){
	    		$result1[] = $row;
	    	}else if($row['hold_department']=="school"){
	    		$result2[] = $row;
	    	}else{
	    		$result3[] = $row;
	    	}
	    }
	   $result_activities = array_merge($result1,$result2,$result3);
	   //获取学生所在院系
	   $getstucollg = $DBH->prepare("select collg from user_info where ybid = ?");
	   $getstucollg->bindParam(1,$yb_id);
	   $getstucollg->execute();
	   $collg = $getstucollg -> fetch();
	   $result = [];
	   $result['collg'] = $collg['collg'];
	   $result['activities']=$result_activities;
	   print(json_encode($result, JSON_UNESCAPED_UNICODE));
	}catch(PDOException $e){
	//print_r($query->errorInfo());
		die($e->getMessage());
	}
?>