//导包
const connection = require('../config/db_config');
//操作数据库
//查询邮箱
exports.checkEmail = (email,callback) => {
    const sqlstr = 'select * from users where email=?';
    connection.query(sqlstr,email,(err,data) => {
        //回调函数
        if(err) return callback(err,null);
        callback(null,data);
    });
};
//验证昵称
exports.chaeckNickname = (nickname,callback) => {
    const sqlstr = 'select * from users where nickname = ?';
    connection.query(sqlstr,nickname,(err,data) => {
        if(err) return callback(err,null);
        callback(null,data);
    });
};
//添加新用户
exports.addUser = (body,callback) => {
    const sqlstr = 'insert into users set ?';
    connection.query(sqlstr,body,(err,data) => {
        if(err) return callback(err,null);
        callback(null,data);
    });
};
    