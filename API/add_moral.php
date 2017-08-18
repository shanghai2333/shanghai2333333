<?php
	include_once("connect.php");

	//$username = $_SESSION['username'];    //yiban
	$username = "Carol";
	$moral_score = $_POST['moral_score'];

	try{
		$sql = $DBH->prepare("SELECT * FROM moral_score WHERE username = ?");
		$sql->bindParam(1,$username);
	    $sql->execute();
	    $allrow = $sql->fetch(PDO::FETCH_ASSOC);
	    if($allrow){
	    	$now = $allrow['moral_score'] + $moral_score;
	    	$sql = $DBH->prepare("UPDATE moral_score SET moral_score = ? WHERE username = ?");
			$sql->bindParam(1,$now);
			$sql->bindParam(2,$username);
		    $sql->execute();
	    }else{
	    	$now = $moral_score;
	    	$sql = $DBH->prepare("INSERT INTO moral_score(username,moral_score) VALUES (?,?)");
			$sql->bindParam(1,$username);
			$sql->bindParam(2,$now);
		    $sql->execute();
	    }

	    $result = array("result"=>$now);
        print(json_encode($result, JSON_UNESCAPED_UNICODE));

	}catch (PDOException $e) {
        print('{"result":"Database Error"}');
        die();
    }    

?>