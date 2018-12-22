// 导入数据
const moment = require('moment');
const m_topic = require('../models/m_topic');

//渲染列表页
exports.showIndex = (req,res) => {
    // 拿到文章信息
    m_topic.allTopics((err,data) => {
        if(err) 
            return res.send({
                code: 500,
                msg: '服务器又出错了！！！'
            });
        
        res.render('index.html',{
            topics: data,
            user: req.session.user
        });
    });
};
// 渲染发布新文章的页面
exports.createTopic = (req,res) => {
    res.render('topic/create.html',{
            // topics: data,
            user: req.session.user
        });
};
//处理添加新文章的请求
exports.handleCreateTopic = (req,res) => {
    //获取表单数据
    const body = req.body;
    console.log(body);
    // 给body添加成员
    body.createdAt = moment().format();
    //userId: 用来区分每个文章的创建者是谁
    body.userId = req.session.user.id;
    //将获取的表单数据添加到数据库中并返回结果
    m_topic.addTopic(body,(err,data) => {
        if(err) return res.send({
            code: 500,
            msg: '服务器又崩了'
        });
        res.send({
            code: 200,
            msg: '添加成功'
        });
        
    });
};
//渲染文章详情页
exports.showTopicDetail = (req,res) => {
    // console.log(data);
    const topicId = req.params.topicId;

    m_topic.topicById(topicId,(err,data) => {
        if(err) return res.send({
            code: 500,
            msg: err.message
        });
    
    res.render('topic/show.html',{
        topic: data[0],
        user: req.session.user,
        sessionUserId: req.session.user ? req.session.user.id : 0
    })
});
};
//处理删除文章的请求
exports.handleDeleteTopic = (req,res) => {
    //获取动态路由参数的值
    const topicId = req.params.topicId;
    m_topic.deleteTopicById(topicId,(err,data) => {
        if(err) return res.send({
            code: 500,
            msg: err.message
        });
        res.redirect('/index');
    });
};
//渲染编辑页面
exports.showEditTopic = (req,res) => {
    const topicId = req.params.topicId;
    m_topic.topicById(topicId,(err,data) => {
        if(err) return res.send({
            code: 500,
            msg: err.message
        });
        res.render('topic/edit.html',{
            topic: data[0],
            user: req.session.user
        });
    });
};
//处理编辑文章的请求
exports.handleEditTopic = (req,res) => {
    const topicId = req.params.topicId;
    const body = req.body;//获取数据
    m_topic.editTopic = (topicId,body,(err,data) => {
        if(err) return res.send({
            code: 500,
            msg: err.message
        });
        console.log(data);
        // res.send({
        //     topic: data[0]
        // });
        res.send({
            code: 200,
            msg: '编辑成功'
        });
    
    });
    
};