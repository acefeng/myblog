const mysql = require('mysql');
const models = require('../db.js');
const $sql = require('../sqlMap.js');
const express = require('express');
const formidable = require('formidable');
const crypto = require('crypto');

const router = express.Router();

var conn = mysql.createConnection(models.mysql);
//初始链接数据库
conn.connect(function(err){
    if(err){
        console.log('连接失败mainApi');
    }else{
        console.log('连接成功mainApi');
    }
})

//登出接口
router.post('/login_out',(req,res)=>{
    req.session.username = "";
    req.session.password = "";
    res.end('{"success":"登出成功"}');
})
//登录接口
router.post('/login',(req,res)=>{
    const sql = $sql.user.getUser;
    const user_name = req.body.params.user_name;
    const user_password = req.body.params.user_password;
    conn.query(sql,[user_name],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            if(result.length==0){
                res.end('{"err":"不存在该用户"}');
            }else if(result[0].password!=user_password){
                res.end('{"err":"密码错误"}');
            }else{
                req.session.user_name = user_name;
                req.session.user_password = user_password;
                res.end(`{"success":"登陆成功","user_name":"${user_name}"}`);
            }
        }
    })
})
//获取所有评论内容
router.post('/getAllwords',(req,res)=>{
    const sql = $sql.user.getAllWords;
    conn.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.status(200).json(result);
        }
    })
})
//设置留言
router.post('/setWords',(req,res)=>{
    const sql = $sql.user.m_setWords;
    conn.query(sql,[req.body.params.main,req.body.params.name,req.body.params.date,req.body.params.email],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.send('提交成功').end();
        }
    })
})
//获取特定标签的文章列表
router.post('/tag_artical',(req,res)=>{
    const sql = $sql.user.tag_artical;
    conn.query(sql,[req.body.params.tid],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.json(result);
        }
    })
})
//获取所有的标签
router.post('/gettags',(req,res)=>{
    const sql = $sql.user.getTag;
    conn.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.json(result);
        }
    })
})
//获取特定排序后的文章
router.post('/getDescArticel',(req,res)=>{
    const m_getDescArticel = $sql.user.m_getDescArticel;
    const getCountArtical = $sql.user.m_getcountArtical;
    const index = (req.body.params.pag-1)*10;
    conn.query(m_getDescArticel,[index],function(err,result){
        let results = [];
        if(err){
            console.log(err);
        }
        if(result){
            results.push(result);
            conn.query(getCountArtical,function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    results.push(result);
                    res.json(results);
                }
            })
        }
    })
})
//获取特定文章内容和前后文章id
router.post('/getIndexArtical',(req,res)=>{
    const sql = $sql.user.m_getIndexArtical;
    const pre_sql = $sql.user.m_getPreArtical;
    const after_sql = $sql.user.m_getAfterArtical;
    const this_tags = $sql.user.select_tag;
    conn.query(sql,[req.body.params.indexId],function(err,result){
        let results = [];
        if(err){
            console.log(err);
        }
        if(result){
            results.push(result);
            conn.query(pre_sql,[req.body.params.indexId],function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    results.push(result);
                    conn.query(after_sql,[req.body.params.indexId],function(err,result){
                        if(err){
                            console.log(err);
                        }
                        if(result){
                            results.push(result);
                            conn.query(this_tags,[req.body.params.indexId],function(err,result){
                                if(err){
                                    console.log(err);
                                }
                                if(result){
                                    results.push(result);
                                    res.json(results);
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
//获取所有文章内容
router.post('/getAllArticel',(req,res)=>{
    const getAllarticel = $sql.user.m_getAllArticel;
    const getCountArtical = $sql.user.m_getcountArtical;
    const index = (req.body.params.pag-1)*5;
    conn.query(getAllarticel,[index],function(err,result){
        let results = [];
        if(err){
            console.log(err);
        }
        if(result){
            results.push(result);
            conn.query(getCountArtical,function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    results.push(result);
                    res.json(results);
                }
            })
        }
    })
})

module.exports = router;