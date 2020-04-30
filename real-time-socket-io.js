var http = require('http');
var SocketIO = require('socket.io');

function makeSocketIOServer(app) {
    var server = http.Server(app);
    var io = SocketIO(server);
    makeListeners(io);
    return server;
}

function makeListeners(io) {

    io.on('connection', function (socket) {
        console.log('connected');

        socket.on('ball_enter', function (data) {
            console.log('ball_enter', data.roomID, socket.id);
            socket.join(data.roomID);
            data.socketID = socket.id;
            io.in(data.roomID).emit('ball_enter', data);
        });

        socket.on('BALL_AHI_UPDATE', function (data) {
            console.log(JSON.stringify(data));
            // 全局广播，本聊天室会收到所有聊天室的消息
            // io.emit('ahiUpdate', data);
            // 局部广播，本聊天室只会收到本室的消息
            console.log(socket.id);
            io.in(data.roomID).emit('ahiUpdate', data);
        });
        // 有聊天室上线（即：有用户打开页面查看）
        socket.on('client_enter', function (data) {
            console.log('client_enter', data, socket.id);
            // io.emit('client_enter', data);
            // 加入聊天室
            socket.join(data.roomID);
            // 成员在线+1
            // data.roomID in chatMap ? chatMap[data.roomID]++ : chatMap[data.roomID] = 1;
            // 向球广播消息，即：喊球起来接客。没有人查看页面的话，球不用上传实时数据，节省流量/请求
            // socket.broadcast.emit('client_enter', data);
            data.socketID = socket.id;
            io.in(data.roomID).emit('client_enter', data);
        });

        // socket.on("heart_beat", function (data) {
        //   console.log('heart_beat', data);
        //   io.in(data.roomID).emit('heart_beat', data);
        // });

        // 有人离开聊天室，成员-1，为0则关闭聊天室
        socket.on("disconnecting", function () {
            var rooms = socket.rooms;
            console.log('all rooms:', rooms);
            // 每次有人员离开，都要告诉球。若聊天室已关闭，则球停止上报数据
            // io.emit('client_leave', Object.keys(rooms));
            Object.keys(rooms).forEach(room => io.emit('member_leave', room));
            // You can loop through your rooms and emit an action here of leaving
        });

        socket.on('disconnect', function () {
            console.log('disconnected', socket.id);
        });
    });
}

module.exports = makeSocketIOServer;