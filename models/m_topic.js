//导包
const connection = require('../config/db_config');
//sql语句
//获取所有文章
exports.allTopics = (callback) => {
    const sqlstr = 'select * from topics';
    connection.query(sqlstr,(err,data) => {
        if(err) return callback(err,null);
        callback(null,data);
    });
};
//添加新文章
exports.addTopic = (body,callback) => {
    const sqlstr = 'insert into topics set ?';
    connection.query(sqlstr,body,(err,data) => {
        if(err) return callback(err,null);
        callback(null,data);
    });
};
//根据id找文章
exports.topicById = (topicId,callback) => {
    const sqlstr = 'select * from topics where id = ?';
    connection.query(sqlstr,topicId,(err,data) => {
        console.log(data);
        if(err) return callback(err,null);
        callback(null,data);

    });
};
//根据id删除数据
exports.deleteTopicById = (topicId,callback) => {
    const sqlstr = 'delete from topics where id = ?';
    connection.query(sqlstr,topicId,(err,data) => {
        if(err) return callback(err,null);
        callback(null,data);
    });
};
//根据id编辑文章
exports.editTopic = (topicId,body,callback) => {
    const sqlstr = 'update topics set ? where id = ?';
    connection.query(sqlstr,[body,topicId],(err,data) => {
        if(err) return callback(err,null);
        callback(null,data);
    });
};