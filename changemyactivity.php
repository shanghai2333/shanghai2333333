<?php
    header('Content-type:text/json');
    session_start();
    include_once("connect.php");
    include_once("../header_api_session.php");
    include_once("../iapp.php");
    if(!isset($_SESSION['token'])||!isset($_SESSION['usrid'])||!isset($_SESSION['name'])){
        exit('illegal access!');
    }else{
        $username = $_SESSION['usrid'];
    }


    include "db_config.php";
    $db = new mysqli($db_host,$db_user,$db_password,$db_database);
    if (!$db)
    {
      exit(json_encode(array('status'=>'error')));
    }
    $db->query("set names 'utf8'");

    if(array_key_exists('my_activity_id', $_REQUEST))
        $my_activity_id = htmlspecialchars($_REQUEST['my_activity_id']);
    else
        exit(json_encode(array('status'=>'parameter error')));

    if(array_key_exists('activity_title', $_REQUEST))
        $activity_title = htmlspecialchars($_REQUEST['activity_title']);
    else
        exit(json_encode(array('status'=>'parameter error')));

    if(array_key_exists('activity_info', $_REQUEST))
        $activity_info = htmlspecialchars($_REQUEST['activity_info']);
    else
        exit(json_encode(array('status'=>'parameter error')));

    if(array_key_exists('start_time', $_REQUEST))
        $start_time = htmlspecialchars($_REQUEST['start_time']);
    else
        exit(json_encode(array('status'=>'parameter error')));

    if(array_key_exists('end_time', $_REQUEST))
        $end_time = htmlspecialchars($_REQUEST['end_time']);
    else
        exit(json_encode(array('status'=>'parameter error')));

    $sql_query = "SELECT * FROM `my_activity` WHERE `id` = '".$my_activity_id."' ";
    $result = $db->query($sql_query);

    if($result == True && $result->num_rows == 0){

        $result->close();
        echo(json_encode(array('status' => 'exist error')));
    }
    else{
        $sql_query = "UPDATE `my_activity` SET
            `activity_title` = '".$activity_title."' , 
            `activity_info` = '".$activity_info."', 
            `start_time` = '".$start_time."' , 
            `end_time` = '".$end_time."' 
             WHERE `id` = '".$my_activity_id."'";
        $res = $db->query($sql_query);

        if($res == True){
            echo(json_encode(array('status' => 'success')));
        }
        else{
            echo(json_encode(array('status' => 'update error')));
        }

        $res->close();
    }


    //$sql_update = "UPDATE `ihome_praise` SET
        //`is_read` = '0' WHERE `question_id` = '".$question_id."'";
 ?>