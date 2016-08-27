var rooms = require("./rooms.js");
var db = require("./db.js");
(function() { 
  console.error("Started");
  var conn = db.init();
  var io;
  io = require('socket.io').listen(4000);
  var collabeduc = {
                        //max_rooms : 10,
                        //max_users_per_room : 4,
                        //min_users_per_room : 3,
                        rooms : rooms.rooms,
                        socket : io.of("/collabeduc"),
                   };
  console.error("Configuring rooms. Max rooms: " + collabeduc.rooms.length);
  for (var i = 0; i < collabeduc.rooms.length; i++) {
      var room = collabeduc.rooms[i];
      console.error("Configuring room: " + room.id); 
      console.error("Quering questions"); 
      var f = function (r) {
        conn.query("SELECT * FROM `questoes` INNER JOIN `videos` ON `questoes`.video_id = `videos`.id where `video_id` = '" + r.video_id +"'",
                    function(err, rows, fields) {
                        if (!err) {
                            console.error(rows.length + " questions found for room: " + r.id);
                            if (rows.length > 0) {
                                r.questions = rows;
                                r.video_path = rows[0].path;
                            } //TODO Treat 0 size questions
                        } else {
                            console.error("Query error in room: " + r.id);
                        }
                    }
                );
      }
      f(room); 
  }
  //TODO We should wait until all queries are done
  collabeduc.socket.on('connection', function(socket) {
      socket.roomid = null;
      console.error("Client connected");
      socket.on("answer", function(data) {
          console.error("User: " + socket.user_data.nome
                + "(id: " + socket.user_data.id + ") Answered question: "
                + data.id + " with value: " + data.answer + " correct?: " + data.correct_answer);
      });
      socket.on("joinRoom", function(data) {
        var foundRoom = null;
        for (var i = 0; i < collabeduc.rooms.length; i++) {
            var room = collabeduc.rooms[i];
            if (room.current_users < room.max_users) {
                console.error("Found free room at id: " + room.id + " with " +  room.current_users + " users");
                room.current_users++;
                socket.emit('controller', { type : 'acceptJoin', roomid : room.id });
                socket.roomid = room.id;
                socket.join(room.id);
                socket.user_data = data
                foundRoom = room;
                break;
            } 
        }
        if (null == foundRoom) {
            //No more rooms
            socket.emit("controller", { type : 'noRooms' });
        } else {
            if (foundRoom.current_users == foundRoom.min_users) {
                //TODO Send message to start room
                console.error("Starting room: " + foundRoom.id);
                var data = { type : 'startRoom', questions : foundRoom.questions, video : foundRoom.video_path};
                socket.broadcast.to(foundRoom.id).emit("controller", data);
                socket.emit("controller", data);
                //io.sockets.in(foundRoom.id).emit("controller", {type : 'startRoom'}); //, questions : foundRoom.questions});
            }
        }
      });
      socket.on("disconnect", function() {
        console.error("User disconected");
        //TODO Avoid for loop search
        if (null != socket.roomid) {
            for (var i = 0; i < collabeduc.rooms.length; i++) {
                var room = collabeduc.rooms[i];
                if (socket.roomid == room.id) {
                    room.current_users--;
                    //TODO Treat user disconnection
                    //What will we do? If room is not started no problem, but if it was already started?
                    break;
                }
            }
        }
      });
  });
  var whiteboard = io.of("/whiteboard");
  //var nsp = io.sockets;
  console.error("Starting whiteboard");
  whiteboard.on('connection', function(socket) {
    console.log("Connected whiteboard!");
    socket.on('drawClick', function(data) {
      socket.broadcast.to(socket.boardid).emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
    socket.on("joinBoard", function(data) {
        socket.boardid = data.boardid;
        console.error("Join board: " + socket.boardid);
        socket.join(socket.boardid);
    });
  });
  console.error("Started whiteboard");
  console.error("Starting chat");
  var chat = io.of("/chat");
  chat.on('connection', function(socket) {
    console.log("Connected chat!");
    socket.on('sendMessage', function(data) {
      socket.broadcast.to(socket.chatid).emit('message', { 
        sender: socket.sender,
        msg: data.msg,
        type: "usermsg"
      });
    });
    socket.on("joinChat", function(data) {
        socket.chatid = data.chatid;
        socket.sender = data.sender;
        console.error("Join chat: " + socket.chatid + " sender " + socket.sender);
        socket.join(socket.chatid);
        socket.broadcast.to(socket.chatid).emit('message', {
            msg: socket.sender + " entrou!",
            type: "system"
      });
    });
    socket.on("disconnect", function() {
        socket.broadcast.to(socket.chatid).emit('message', {
            msg: socket.sender + " saiu!",
            type: "system"
        });
    });
  }); 
  console.error("Started chat");
}).call(this);
