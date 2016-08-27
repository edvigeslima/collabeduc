<?php
	require("conn.php");
	if(empty($_POST['user_email'])){
	
	}
	
	if(empty($_POST['user_password'])){
	
	}
	
	$username = trim($_POST['user_email']);
	$password = trim($_POST['user_password']);
	$hash = hash("sha512", $password);
	
	$query = "SELECT * FROM `users` WHERE `email` = '$username' AND `password` = '$hash';";
	$result = @mysql_query($query);
	
	if($result && mysql_num_rows($result) > 0){
		$user = mysql_fetch_assoc($result);
		$sessionid = uniqid(rand(), true);
		if(mysql_query("INSERT INTO session VALUES('$sessionid',NOW()+3600,'$user[id]')")){
			setcookie('sid', $sessionid);
			header("Location: collabeduc.php");
			echo "Ivan eh um fofo! =}";
		}
	}else{
		header("Location: index.php?errcode=1");
	}
?>