//导包
const express = require('express');
const control = require('./controllers/control');
const c_topic = require('./controllers/c_topic');
//实例化路由
const router = express.Router();
//监听端口，实现函数
router
    .get('/login',control.showLogin)
    .post('/login',control.handleLogin)
    .get('/index',c_topic.showIndex)
    .get('/topic/create',c_topic.createTopic)
    .post('/topic/create',c_topic.handleCreateTopic)
    .get('/logout',control.handleSignout)
    //动态路由
    .get('/topic/detail/:topicId',c_topic.showTopicDetail)
    .get('/topic/:topicId/delete',c_topic.handleDeleteTopic)
    .get('/topic/:topicId/edit',c_topic.showEditTopic)
    .post('/topic/edit/:topicId',c_topic.handleEditTopic)
    .get('/logup',control.showLogup)
    .post('/logup',control.handleLogup);



//导出路由
module.exports = router;