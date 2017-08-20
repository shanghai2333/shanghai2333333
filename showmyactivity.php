<?php
    header('Content-type:text/json');
    session_start();
    include_once("connect.php");
    include_once("../header_api_session.php");
    include_once("../iapp.php");
    if(!isset($_SESSION['token'])||!isset($_SESSION['usrid'])||!isset($_SESSION['name'])){
        exit('illegal access!');
    }else{
        $username = $_SESSION['name'];
    }

    
    include "db_config.php";
    $db = new mysqli($db_host,$db_user,$db_password,$db_database);
    if (!$db)
    {
      exit(json_encode(array('status'=>'error')));
    }
    $db->query("set names 'utf8'");

    if(array_key_exists('chosentime', $_REQUEST))
        $chosentime = htmlspecialchars($_REQUEST['chosentime']);
    else
        exit(json_encode(array('status'=>'parameter error')));

    $sql_query = "SELECT * FROM `my_activity` WHERE (`username` = '".$username."' AND DATE_FORMAT(`start_time`,'%Y-%m-%d') <= '".$chosentime."' AND DATE_FORMAT(`end_time`,'%Y-%m-%d') >= '".$chosentime."' )";
    $result = $db->query($sql_query);

    $feedback = array('status' => 'success','data' => array());

    if($result == True){

        foreach ($result as $row => $value) {
            $feedback['data'][] = $value;       
        }
        echo json_encode($feedback);
    }
    else{
        echo(json_encode(array('status' => 'select error')));
    }
    
 ?>