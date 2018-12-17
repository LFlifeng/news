//导包
const connection = require('../config/db_config');
//操作数据库
exports.checkEmail = (email,callback) => {
    const sqlstr = 'select * from users where email=?';
    connection.query(sqlstr,email,(err,data) => {
        //回调函数
        if(err) return callback(err,null);
        callback(null,data);
    });
};

    