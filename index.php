<!--CollabEduc-->
<!doctype html>
<html>
	<head>
		<title>CollabEduc</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
		<script src="chat.js"></script>
	</head>

	<body>
		<div id="login">
			<img src="media/logo.png" id="imgpos"></img>
			<form action="login.php" method="post">
				<div id="username">
					<img src="media/user_icon.png" width="30" height="30" align="center"></img>
					<input type="email" name="user_email"><br>
				</div>
				<div id="password">
					<img src="media/key.svg" width="30" height="30" align="center"></img>
					<input type="password" name="user_password"><br>
				</div>
				<div id="submit_login">
					<input type="submit" value="Entrar">
				</div>
			</form>
		</div>
	</body>
</html>
