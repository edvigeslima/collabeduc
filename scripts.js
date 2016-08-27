(function() { 
  /*
  	//TODO move all $("#..") to an one load property set
  */
  var serveraddr = "127.0.0.1";
  App.init = function() { 
    App.canvas = document.createElement('canvas');
    App.canvas.height = 400;
    App.canvas.width = 800;
    document.getElementById(App.whiteboardid).appendChild(App.canvas);
    App.internal = {};
    App.internal.question_context = $("#" + App.question_context);
    App.internal.question_header = $("#" + App.question_header);
    App.internal.alt1_text = $("#" + App.alt1_text);
    App.internal.alt1 = $("#" + App.alt1);
    App.internal.alt2_text = $("#" + App.alt2_text);
    App.internal.alt2 = $("#" + App.alt2);
    App.internal.alt3_text = $("#" + App.alt3_text);
    App.internal.alt3 = $("#" + App.alt3);
    App.internal.alt4_text = $("#" + App.alt4_text);
    App.internal.alt4 = $("#" + App.alt4);
    App.internal.answer_button = $("#" + App.answer_button);
    App.internal.timer = null;
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = "#ECD018";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    App.questions = {current : -1, data : []};
    App.collabeduc = io('http://' +  serveraddr + ':4000/collabeduc');
    App.collabeduc.on("controller", function (data) {
        if (data.type == "acceptJoin") { 
            App.roomid = data.roomid;
            App.chat.emit("joinChat", {chatid : App.roomid, sender :  App.name});
            App.whiteboard.emit("joinBoard", { boardid : App.roomid});
            //Fake console message
            App.message("system", "Joined room: " + App.roomid);
        } else if (data.type == "noRooms") {
            alert("No more rooms available");
        } else if (data.type == "startRoom") {
            App.message("system", "Room started!");
            App.questions.data = data.questions;
            App.player = document.getElementById(App.playerid);
            App.player.onplay = function() {
                App.ctx.updateQuestion(); 
            }
            App.player.src = data.video;
            App.player.play();
        }
    });
    App.chat = io('http://' + serveraddr + ':4000/chat');
    App.chat.on("message", function(data) {
        return App.message(data.type, data.msg, data.sender);
    });
    //App.chat.emit("joinChat", {chatid : App.roomid, sender :  App.name});
    App.whiteboard = io('http://' +  serveraddr + ':4000/whiteboard');
    App.whiteboard.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type);
    });
    //App.whiteboard.emit("joinBoard", { boardid : App.roomid});
    App.draw = function(x, y, type) {
      if (type === "dragstart") {
        App.ctx.beginPath();
        return App.ctx.moveTo(x, y);
      } else if (type === "drag") {
        App.ctx.lineTo(x, y);
        return App.ctx.stroke();
      } else {
        return App.ctx.closePath();
      }
    };
    App.message = function (type, msg, sender) {
        if (type == 'usermsg') 
        {
            $("#" + App.messageboxid).append("<div><span class=\"user_name\">"+sender+"</span> : <span class=\"user_message\">"+msg+"</span></div>");
        }
        if (type == 'system')
        {
            $('#' + App.messageboxid).append("<div class=\"system_msg\">"+msg+"</div>");
        }
        return true;
    };
    $('#' + App.senderid).click(function(){ //use clicks message send button
        var message = $('#' + App.messageid).val(); //get message text 
        if(message == ""){ //emtpy message?
            alert("Enter Some message Please!");
            return;
        }
        App.message("usermsg", message, App.name);
        App.chat.emit('sendMessage', {
            sender: App.name,
            type: "usermsg",
            msg: message
        });
        $('#' + App.messageid).val('');
    });
    App.collabeduc.emit("joinRoom", user);
    App.ctx.updateQuestion = function() {
        var qlen = App.questions.data.length;
        if ((qlen > 0) && (App.questions.current < (qlen - 1))) {
            var c = ++App.questions.current;
            var currentTime = App.player.currentTime;
            var ex_time = App.questions.data[c].ex_time - currentTime;
            setTimeout(function () { 
                var question = App.questions.data[c];
                var duration = question.duration;
                App.internal.timer = new Timer(duration, App.timerid);
                App.internal.answer_button.prop("disabled", false);
                App.internal.question_header.text(question.title);
                App.internal.alt1_text.text(question.alt_1);
                App.internal.alt2_text.text(question.alt_2);
                App.internal.alt3_text.text(question.alt_3);
                App.internal.alt4_text.text(question.alt_4);
                App.internal.answer_button.unbind("click").click(function() {
                    var answered = false;
                    var data = {id:question.id, answer:-1};
                    if (App.internal.alt1.prop("checked")) {
                        data.answer = 0; 
                        answered = true;
                    } else if (App.internal.alt2.prop("checked")) {
                        data.answer = 1; 
                        answered = true;
                    } else if (App.internal.alt3.prop("checked")) {
                        data.answer = 2; 
                        answered = true;
                    } else if (App.internal.alt4.prop("checked")) {
                        data.answer = 3; 
                        answered = true;
                    }

                    if (answered) {
                        //TODO Change answer verification to server side
                        data.correct_answer = data.answer == question.alt_c;
                        App.collabeduc.emit("answer", data);
                        $(this).prop("disabled", true);
                    }
                });
                App.player.pause(); 
                App.internal.question_context.css("display", "block");
                App.internal.timer.start();
                setTimeout(function() {
                    App.internal.question_context.css("display", "none");
                    App.player.play();
                }, duration * 1000);
            }, (ex_time) * 1000);
        }
    };
  };
  /*
  	Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(e) {
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $(this).offset();
    e.offsetX = e.layerX // - offset.left;
    e.offsetY = e.layerY // - offset.top;
    x = e.offsetX;
    y = e.offsetY;
    App.draw(x, y, type);
    App.whiteboard.emit('drawClick', {
      x: x,
      y: y,
      type: type
    });
  }); 
}).call(this);
