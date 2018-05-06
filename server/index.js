//node后端主程序
const userApi = require('./api/userApi.js');

const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());
(function(){
	var keys = [];
	for(var i=0;i<100000;i++){
		keys[i] = 'a_' +Math.random();
	}
	app.use(cookieSession({
		name:'sess_id',
		keys:keys,
		maxAge:2*60*1000 //20min
	}))
})()

app.use(express.static('public'));
//后端api路由
//userApi用来处理上传文件等初始准备和相应步骤
app.use('/api/user',userApi); //localhost:8080/#/admin 上传新的新闻

app.listen(3000);
console.log('succes listen at port:3000');



