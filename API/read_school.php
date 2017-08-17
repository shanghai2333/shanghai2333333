<?php
	include_once("connect.php");

	//$username = $_SESSION['username'];    //yiban
	$username = "Carol";
	$today_date = $_GET['today_date']; //当天的日期

	try{
		$sql = $DBH->prepare("SELECT * FROM personal_activity WHERE username = ?");
		$sql->bindParam(1,$username);
	    $sql->execute();
	    $allrows = $sql->fetchAll(PDO::FETCH_ASSOC);
	    $results = []; 
	    foreach($allrows as $row){
            $start_time = $row['start_time'];
            $end_time = $row['end_time'];
            if( (strtotime($start_time)<=strtotime($today_date)) && (strtotime($today_date)<=strtotime($end_time)) ){
            	$results[] = $row; //加入到当天的事件列表
            }
        }
        print(json_encode($results, JSON_UNESCAPED_UNICODE));
	}catch (PDOException $e) {
        print('{"result":"Database Error"}');
        die();
    }    

?>