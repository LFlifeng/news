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


//渲染登陆页
exports.showLogin = (req,res) => {
    res.render('login.html');
};
// 处理表单请求
exports.handleLogin = (req,res) => {
    //获取表单数据
    const body = req.body;
    console.log(body);
    //查询数据库
    const sqlstr = 'select * from users where email=?';
    connection.query(sqlstr,body.email,(err,data) => {
        // console.log(data);
        if(err) throw err;
        // 判断邮箱是否存在
        if(data.length === 0)
          return res.send({
                code: 1,
                msg: '邮箱不存在'
            }); //邮箱不存在
       
        // 邮箱存在，则判断密码是否正确
        if(data[0].password !== body.password)
            return res.send({
                code: 2,
                msg: '密码不正确'
            });//密码错误
        //邮箱密码均正确
        return res.send({
            code: 200,
            msg: '你可以登陆了！！！真好！'
        });
    });
};
