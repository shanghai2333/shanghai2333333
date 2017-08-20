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

    $sql_query = "SELECT * FROM `my_activity` WHERE `id` = '".$my_activity_id."' ";
    $result = $db->query($sql_query);

    if($result == True && $result->num_rows == 0){

        $result->close();
        echo(json_encode(array('status' => 'exist error')));
    }
    else{
        $sql_query = "DELETE FROM `my_activity` WHERE 
            `id` = '".$my_activity_id."'";
        $res = $db->query($sql_query);

        if($res == True){
            echo(json_encode(array('status' => 'success')));
        }
        else{
            echo(json_encode(array('status' => 'delete error')));
        }

        $res->close();
    }


    //$sql_update = "UPDATE `ihome_praise` SET
        //`is_read` = '0' WHERE `question_id` = '".$question_id."'";
 ?>