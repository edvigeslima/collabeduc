<?php

	require("conn.php");
	
	if(!isset($_COOKIE['sid'])){
		header("Location: index.php");
		exit(0);
	}
	
	$sid = $_COOKIE['sid'];
	$query = "DELETE FROM `session` WHERE `id` = '$sid';";
	$result = @mysql_query($query);
	
	setcookie('sid','', time()-3600);
	unset ($_COOKIE['sid']);

	header('Location:index.php');
?>