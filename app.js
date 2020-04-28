'use strict';

var express = require('express');
var http = require('http');
var SocketIO = require('socket.io');

var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

var app = express();
var server = http.Server(app);
var io = SocketIO(server);

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res) {
  res.render('index', { currentTime: new Date() });
});

// 模拟打开页面查看数据
app.get('/user', function (req, res) {
  res.render('user');
});
app.get('/user1', function (req, res) {
  res.render('user1');
});

// 模拟球
app.get('/ball', function (req, res) {
  res.render('ball');
});
app.get('/ball1', function (req, res) {
  res.render('ball1');
});

// socket.io
// var chatMap = {}; // 各聊天室（即：机构），及其成员（即：浏览器页面）在线数map
io.on('connection', function (socket) {
  console.log('a connection established');

  socket.on('ball_enter', function (data) {
    console.log('ball_enter', data.chatRoomId);
    io.in(data.chatRoomId).emit('ball_enter', data);
  });

  socket.on('BALL_AHI_UPDATE', function (data) {
    console.log(JSON.stringify(data));
    // 全局广播，本聊天室会收到所有聊天室的消息
    // io.emit('ahiUpdate', data);
    // 局部广播，本聊天室只会收到本室的消息
    io.in(data.chatRoomId).emit('ahiUpdate', data);
  });
  // 有聊天室上线（即：有用户打开页面查看）
  socket.on('client_enter', function (data) {
    console.log('client_enter', data);
    // io.emit('client_enter', data);
    // 加入聊天室
    socket.join(data.chatRoomId);
    // 成员在线+1
    // data.chatRoomId in chatMap ? chatMap[data.chatRoomId]++ : chatMap[data.chatRoomId] = 1;
    // 向球广播消息，即：喊球起来接客。没有人查看页面的话，球不用上传实时数据，节省流量/请求
    socket.broadcast.emit('client_enter', data);
  });

  // 有人离开聊天室，成员-1，为0则关闭聊天室
  socket.on("disconnecting", function () {
    var rooms = socket.rooms;
    console.log('all rooms:', rooms);
    // 每次有人员离开，都要告诉球。若聊天室已关闭，则球停止上报数据
    io.emit('client_leave', Object.keys(rooms));
    // You can loop through your rooms and emit an action here of leaving
  });

  socket.on('disconnect', function () {
    console.log('disconnected');
  });
});


// 可以将一类的路由单独保存在一个文件中
app.use('/todos', require('./routes/todos'));
app.use('/add', require('./routes/add'));

app.use(function (req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use(function (err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = server;
