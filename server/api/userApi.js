const mysql = require('mysql');
const models = require('../db.js');
const $sql = require('../sqlMap.js');
const express = require('express');
const formidable = require('formidable');

const router = express.Router();

var conn = mysql.createConnection(models.mysql);
//初始链接数据库
conn.connect(function(err){
    if(err){
        console.log('连接失败userApi');
    }else{
        console.log('连接成功userApi');
    }
})

//删除留言
router.use('/delect_words',(req,res)=>{
    const sql = $sql.user.delect_word;
    conn.query(sql,[req.body.params],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.send('删除成功');
        }
    })
})
//对于评论的发送邮件处理
router.use('/relply_email',require('./email.js'));
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
//添加新的标签
router.post('/settags',(req,res)=>{
    const sql = $sql.user.insert_tags;
    const font_size = (parseInt(Math.random()*20)+10)+"px";
    const opacity = Math.random()+0.2;
    conn.query(sql,[req.body.params.tags,font_size,opacity],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            const sql = $sql.user.getTag;
            conn.query(sql,function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    res.status(200).json(result);
                }
            })
        }
    })
})
//删除标签
router.post('/delet_tag',(req,res)=>{
    const sql = $sql.user.delete_tags;
    const sql_gettag = $sql.user.getTag;
    conn.query(sql,[req.body.params.delect_id],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            console.log('已经删除了一个标签')
            conn.query(sql_gettag,function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    res.status(200).json(result);
                }
            })
        }
    })
})
//删除文章
router.post('/deleteArtical',(req,res)=>{
    const sql = $sql.user.delete_artical;
    conn.query(sql,[req.body.params.id],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            console.log('已经删除一个文章');
            res.status(200).send('已经删除该文章').end();
        }
    })
})
//首次查询文章详情
router.post('/showArtical',(req,res)=>{
    const sql = $sql.user.select_artical;
    const tagsql = $sql.user.select_tag;
    let results = {};
    conn.query(sql,[req.body.params.id],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            results.title=result[0].title;
            results.main=result[0].main;
            results.font_number=result[0].font_number;
            results.date=result[0].date;
            conn.query(tagsql,[req.body.params.id],function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    let tags = {};
                    for(let i in result){
                        // tags.push(result[i].name);
                        tags[result[i].id]=result[i].name;
                    }
                    results.tags = tags;
                    res.status(200).json(results);
                }
            })
            // res.status(200).json(result);
        }
    })
})
//组件加载查询artical简单数据
router.post('/selartical',(req,res)=>{
    const sql = $sql.user.select_artical_simple;
    conn.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            res.json(result);
        }
    })
});
//组件初始加载标签数据
router.post('/gettag',(req,res)=>{
    const sql = $sql.user.getTag;
	conn.query(sql,function(err,result){
		if(err){
			console.log(err);
		}
		if(result){
            res.status(200).json(result);
		}
	})
})
//添加文章
router.post('/add',(req,res)=>{
    const isId = req.body.params.id;
    const title = req.body.params.title;
    const main = req.body.params.main;
    const font_number = parseInt(req.body.params.font_number);
    const date = req.body.params.date;
    const tag = req.body.params.tag;

    const sql = $sql.user.addarticle; //插入文章
    const getlast = $sql.user.getLastid; //查询最后插入文章的id号
    let insertTag = $sql.user.inserttag;//插入对应的标签

    const data = [isId,title,main,font_number,date];
	conn.query(sql,data,function(err,result){
		if(err){
			console.log(err);
		}
		if(result){
            conn.query(getlast,function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    conn.query(getlast,function(err,result){
                        if(err){
                            console.log(err);
                        }
                        if(result){
                            //result[0]["LAST_INSERT_ID()"]  取出的最后插入数据的id
                            let insert_last = -1;
                            if(result[0]["LAST_INSERT_ID()"]==0){
                                insert_last=isId; 
                            }else{
                                insert_last=result[0]["LAST_INSERT_ID()"];
                            }
                            for(let i in tag){
                                insertTag = insertTag+'('+insert_last+','+tag[i]+'),';
                            }
                            insertTag = insertTag.substring(0,insertTag.length-1);
                            conn.query(insertTag,function(err,result){
                                if(err){
                                    console.log(err);
                                }
                                if(result){
                                    console.log('插入1条artical等数据结束');
                                    res.status(200).send('数据插入均成功');
                                }
                            })
                        }
                    })
                }
            })
		}
	})

})
//对于上传图片数据的保存
router.post('/uploadImg',(req,res)=>{
    var form=new formidable.IncomingForm();
    form.keepExtensions=true;    //设置该属性为true可以使得上传的文件保持原来的文件的扩展名。
    form.uploadDir=__dirname+'/../public/upload';   //设置上传文件存放的文件夹，默认为系统的临时文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
    //form.parse(request, [callback]) 该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    form.parse(req,function(err,fields,files){
        if(err){
            throw err;
        }
        var image=files.imgFile;  //这是整个files流文件对象,是转换成有利于传输的数据格式
        var path=image.path;      //从本地上传的资源目录加文件名:如E:\\web\\blog\\upload\\upload_0a14.jpg
        /*下面这里是通过分割字符串来得到文件名*/
        var arr=path.split('\\');//注split可以用字符或字符串分割
        var name=arr[arr.length-1];
        /*上面这里是通过分割字符串来得到文件名*/
        var url=name;
        console.log(url);
        var info = {
            "error": 0,
            "url": url
        };
        //info是用来返回页面的图片地址
        res.send(info);
    })
}) 
// router.post('/public/images',(req,res)=>{
//     console.log(req.body.params.theurl);
//     res.sendFile(req.body.params.theurl);
// })

module.exports = router;