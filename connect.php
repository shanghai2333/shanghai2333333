
<?php
	$db_user = 'root';
	$db_password = 'root';
	$db_database = 'buptca';
	$db_host = 'localhost';
	try{
		$DBH=new PDO("mysql:host=$db_host;dbname=$db_database;charset=utf8",
		$db_user,$db_password,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
	}
	catch(PDOException $ex){
		die($ex->getMessage());
		die("Unable Connect To DataBase");
	}
?>