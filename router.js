//导包
const express = require('express');
const control = require('./controllers/control');
//实例化路由
const router = express.Router();
//监听端口，实现函数
router
    .get('/login',control.showLogin)
    .post('/login',control.handleLogin);


//导出路由
module.exports = router;