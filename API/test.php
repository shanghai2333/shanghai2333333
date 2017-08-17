<?php 
	$today = "2017-08-04";
	$today233 = "2017-08-04 23:59:00";
	if( strtotime($today)<strtotime($today233)){
		echo strtotime($today);
		echo '<br>';
		echo strtotime($today233);
	}

?>