//node处理管理员端主程序
const userApi = require('./api/userApi.js');
//node处理用户端主程序
const mainApi = require('./api/mainApi.js')

const bodyParser = require('body-parser');
const express = require('express');
// const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use(cookieParser());
//session
function demo(){
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var result = '';
    for(var i = 0; i < 100 ; i ++) {
        var id = Math.ceil(Math.random()*35);
        result += chars[id];
    }
    return result;
}
var session=require('express-session');
var RedisStore = require('connect-redis')(session);
app.use(session({
    store: new RedisStore({host:'127.0.0.1',port:'6379'}),
    secret:demo(),               //设置 session 签名
    name:'my_blog',
    cookie:{maxAge:60*1000*60*24}, // 储存的时间 24小时
    resave:false,             // 每次请求都重新设置session
    saveUninitialized:true
}));
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
app.use(function (req, res, next) {
    if (!req.session) {
      return next(new Error('oh no')) // handle error
    }
    // console.log(req.sessionID.length);
    // console.log(req.headers.cookie);
    if(req.headers.cookie){
        var session_id=req.headers.cookie.replace(/^my_blog=s\%3A|\..*$/g,'');
        if(session_id!=req.sessionID){
            client.get(`sess:${session_id}`,function(err,result){  
                if(err){  
                    console.log(err);  
                }
                if(result){
                    client.set(`sess:${req.sessionID}`,result,function(err,resu){  
                        if(err){  
                            console.log(err);  
                        }else{  
                            client.ttl(`sess:${session_id}`,(err,data)=>{
                                if(err){
                                    console.log(err)
                                }
                                if(data){
                                    client.expire(`sess:${req.sessionID}`, data, (err, isSuccess) => {
                                        if (err) {
                                            //your code
                                            console.log(err);
                                        } else {
                                            //your another code
                                            console.log('更改时间成功');
                                        }
                                    });
                                }
                            })
                            if(JSON.parse(result).user_name){
                                req.session.user_name=JSON.parse(result).user_name;
                                req.session.user_password=JSON.parse(result).user_password;
                            }
                            console.log('cookie-session数据重新设置成功')
                        }  
                    }); 
                }  
            }); 
        }
        
    }
    next() // otherwise continue
})

app.use(express.static('public'));
//后端api路由
//userApi用来处理上传文件等初始准备和相应步骤
// app.use('/api/main',function(req,res,next){
//     req.session.user01 = req.headers.cookie;
//     next();
// });
// app.use('/api/user',function(req,res,next){
//     if(req.session.user01==req.headers.cookie){
//         next();
//     }else{
//         res.end('false');
//     }
// })
app.use('/api/user',userApi); //localhost:8080/#/admin 上传新的新闻
app.use('/api/main',mainApi);

app.listen(3000);
console.log('succes listen at port:3000');



