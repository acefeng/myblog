//sql语句
var sqlMap = {
	//用户
	user:{
		//数据添加
		// add: 'insert into local(id, title, promulgator, time, comment) values (0,?,?,?,?)',
		//数据查找
		//show_local: 'select * from local',
		//show_artical: 'select * from address where id=articalid'
		
		//==============以下为用户端============================
		//获取管理员密码
		getUser:'SELECT * FROM user WHERE name=?',
		//设置留言
		m_setWords:'insert into words(id, main, name, date, email) values (0,?,?,?,?)',
		//获取所有经过时间排序后的文章
		m_getDescArticel:'SELECT id,date,title from artical ORDER BY date DESC LIMIT ?,10',
		//获取特定文章的后一个文章
		m_getAfterArtical:'select * from artical where id = (select id from artical where id > ? order by id asc limit 1)',
		//获取特定文章的前一个文章
		m_getPreArtical:'select * from artical where id = (select id from artical where id < ? order by id desc limit 1);',
		//获取特定文章
		m_getIndexArtical:'SELECT * FROM artical WHERE id=?',
		//获取artical个数
		m_getcountArtical:'SELECT COUNT(*) FROM artical',
		//获取所有的文章 并每次提取出5个
		m_getAllArticel:'SELECT * FROM artical LIMIT ?,5',


		//==============以下均为管理员端==========================
		//删除留言信息
		delect_word:'DELETE FROM words WHERE id=?',
		//更改数据库中回复内容
		set_reply:'UPDATE words SET my_reply=? WHERE id=?',
		//获取自己的邮箱信息
		getUseremail:'SELECT * FROM user',
		//获取所有的words数据
		getAllWords:'SELECT * FROM words ORDER BY date DESC',
		//获取最后插入数据的id
		getLastid:'SELECT LAST_INSERT_ID()',
		//添加文章内容
		addarticle:'replace into artical(id, title, main, font_number, date, good) values (?,?,?,?,?,0)',
		//获取全体标签
		getTag:'SELECT * FROM label',
		//插入文章对应的标签数据 注意使用的时候使用字符串拼接起来后面的数据
		inserttag:'replace `artical-label` VALUES ',
		//获取组件加载初始数据
		select_artical_simple:'SELECT id,title,date,font_number FROM artical',
		//获取对应id的文章内容
		select_artical:'SELECT * FROM artical WHERE id=?',
		//有文章id获取相应的标签
		select_tag:'SELECT label.* FROM label INNER JOIN (SELECT `artical-label`.label_id FROM `artical-label` WHERE `artical-label`.artical_id=?) as t1 on t1.label_id=label.id',
		//删除文章
		delete_artical:'DELETE FROM artical WHERE id=?',
		//删除标签
		delete_tags:'DELETE FROM label WHERE id=?',
		//插入新标签
		insert_tags:'insert into label(id, name, font_size, opacity) values (0,?,?,?)',
		//根据tag的id来取出所有的文章标题和id还有时间
		tag_artical:'SELECT t1.id,t1.title,t1.date FROM artical as t1 INNER JOIN `artical-label` as t2 ON t1.id=t2.artical_id WHERE t2.label_id=?'
	}
}
module.exports = sqlMap;