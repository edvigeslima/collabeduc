<?php
	require("conn.php");
	
	if(!isset($_COOKIE['sid'])){
		header("Location: index.php");
		exit(0);
	}
	
	$sid = $_COOKIE['sid'];
	$query = "SELECT * FROM `session` WHERE `id` = '$sid';";
	$result = @mysql_query($query);
	
	if($result && mysql_num_rows($result) > 0){
		$session = mysql_fetch_assoc($result);
		$result = mysql_query("SELECT * FROM `users` WHERE `id` = '$session[user]';");
		if($result && mysql_num_rows($result) > 0){
			$user = mysql_fetch_assoc($result);
		} else{
			header("Location: index.php");
			exit(0);
		}
	} else{
		header("Location: index.php");
		exit(0);
	} 
?>
<!--CollabEduc-->
<!doctype html>
<html>
	<head>
		<title>CollabEduc</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
		<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>-->
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
		<script src="timer.js"></script>
        <script type="text/javascript" src="js/jquery.event.drag-2.0.js"></script>
        <script src="http://127.0.0.1:4000/socket.io/socket.io.js"></script>
        <script type="text/javascript"> 
			<?php
				echo "var user = {id: '$user[id]', nome:'$user[nome]', matricula: '$user[matricula]', email: '$user[email]'};";
			?>
            var App = {
                //roomid : "12345",
                name : user.nome,
                messageid : "message",
                messageboxid: "message_box",
                senderid: "send-btn",
                whiteboardid : "whiteboard_area",
                playerid : 'videoclass',
                timerid : 'timer_out',
                answer_button : 'send_answer',
                question_header : 'question_header',
                alt1_text : 'alt_1_text',
                alt1 : 'alt_1',
                alt2_text : 'alt_2_text',
                alt2 : 'alt_2',
                alt3_text : 'alt_3_text',
                alt3 : 'alt_3',
                alt4_text : 'alt_4_text',
                alt4 : 'alt_4',
                question_context : 'question_area',
            };
		</script>
        <script type="text/javascript" src="scripts.js"></script>
        <script type="text/javascript">
            $(function() {
                return App.init();
            });
        </script>
	</head>

	<body>
		<div id="user_area" style="text-align:right; width:100%">
		<?php
			echo "Ol&aacute; $user[nome]";
		?>	
		<a href="logout.php">Sair</a>
		</div>
		<div id="class_area">
            <div id="question_video_area">
                <div id="question_area" style="display:none">
                    <span id="question_header"></span><br>
                    <input type="radio" name="alternativas" id="alt_1" /><span id="alt_1_text"></span><br>
                    <input type="radio" name="alternativas" id="alt_2" /><span id="alt_2_text"></span><br>
                    <input type="radio" name="alternativas" id="alt_3" /><span id="alt_3_text"></span><br>
                    <input type="radio" name="alternativas" id="alt_4" /><span id="alt_4_text"></span><br>
                    <input type="button" id="send_answer" value="Responder" />
                    <span id="timer_out"><span>
                </div>
                <div id="video_area">
                    <video id="videoclass">	
                    </video>
                </div>
            </div>
			<div id="whiteboard_area">
				<!--<canvas></canvas>-->
			</div>
		</div>
		<div id="chat_area">
			<div class="chat_wrapper">
			<div class="message_box" id="message_box"></div>
			<div class="panel">	
			<input type="text" name="message" id="message" placeholder="Message" style="width:80%" />
			<button id="send-btn">Send</button>
			</div>
			</div>
		</div>
	</body>
</html>
