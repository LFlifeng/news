//导包
const m_user = require('../models/m_user');


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
    m_user.checkEmail(body.email,(err,data) => {
        //console.log(data);
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
        //把 req.session.user写入mysql中
        req.session.user = data[0];
        console.log(req.session.user);

        return res.send({
            code: 200,
            msg: '你可以登陆了！！！真好！'
        });
    });
};
//处理用户退出的请求
exports.handleSignout = (req,res) => {
    //删除session用户信息
    delete req.session.user;
    //服务端重定向 返回到登陆页面
    res.redirect('/login');
};
//渲染注册页面
exports.showLogup = (req,res) => {
    res.render('signup.html');
};
//处理注册请求
exports.handleLogup = (req,res) => {
    //获取表单数据
    const body = req.body;
    //验证邮箱 body.email === 数据库
    m_user.checkEmail(body.email,(err,data) => {
        if(err) return res.send({
            code: 500,
            msg: err.message
        });
        //邮箱已存在
        if(data[0]) return res.send({
            code: 1,
            msg: '邮箱已存在'
        });
        // 邮箱不存在，验证昵称
        m_user.checkNickname(body.nickname,(err,data) => {
            if(err) return res.send({
                code: 500,
                msg: err.message
            });
            //昵称存在
            if(data[0]) return res.send({
                code: 2,
                msg: err.message
            });
        });  
        //昵称不存在，可以添加新用户
        m_user.addUser(body,(err,data) =>{
            if(err) return res.send({
                code: 500,
                msg: err.message
            });
            res.send({
                code: 200,
                msg: '注册成功'
            });
        });
    });
};