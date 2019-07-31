// 导包mysql
const mysql = require('mysql');

//配置
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'news'
});
//开启链接数据库
connection.connect();
//导出模块
module.exports = connection;