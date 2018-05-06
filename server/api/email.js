const mysql = require('mysql');
const models = require('../db.js');
const $sql = require('../sqlMap.js');
const express = require('express');
var nodemailer = require('nodemailer');  

const router = express.Router();

var conn = mysql.createConnection(models.mysql);
//初始链接数据库
conn.connect(function(err){
    if(err){
        console.log('连接失败replyemail');
    }else{
        console.log('连接成功replyemail');
    }
})

 
//处理发送邮件的路由
router.post('/',(req,res)=>{
    const email_sql = $sql.user.getUseremail;
    const words_sql = $sql.user.getAllWords;
    const set_reply = $sql.user.set_reply;

    const r_email = req.body.params.r_email;
    const r_id = req.body.params.r_id;
    const r_title = req.body.params.r_title;
    const r_main = req.body.params.r_main;
    conn.query(email_sql,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result){
            const user_email = result[0].admin_email;
            const admin_emailEmpower = result[0].admin_emailEmpower;
            //创建一个传输的对象
            const transporter = nodemailer.createTransport({  
                service: 'qq',  
                auth: {  
                user: user_email,  
                pass: admin_emailEmpower //授权码,通过qq邮箱获取  
                }  
            });
            const mailOptions = {  
                from: user_email, // 发送者  
                to: r_email, // 接受者,可以同时发送多个,以逗号隔开  
                subject: r_title, // 标题  
                //text: 'Hello world', // 文本  
                html:r_main  
            }; 
            transporter.sendMail(mailOptions, function (err, info) {  
                if (err) {  
                    console.log(err);  
                    res.send('发送失败');
                }else{
                    conn.query(set_reply,[r_main,r_id],(err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        if(result){
                            conn.query(words_sql,(err,result)=>{
                                if(err){
                                    console.log(err);
                                }
                                if(result){
                                    res.json(result);
                                }
                            })
                        }
                    })
                    
                }  
            });  
        }
        
    })
     
      
   
})

module.exports = router;