var nodemailer = require('nodemailer');

exports.send = function(req, res, next) {
    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails
    var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: '22980937@qq.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: 'emyvuxtghxsbbjbe'
        }
    });
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '22980937@qq.com', // 发件地址
        to: 'lvqinbo@163.com', // 收件列表
        subject: 'Hello Node email', // 标题
        //text和html两者只支持一种
        text: 'lyz, 你好，又给你发邮件了！', // 标题
        html: '<h1>Hello Node Email ?</h1>' // html 内容
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.render('index', {
                title: err
            })
        }
        res.render('index', {
            title: info.accepted
        })
        console.log('Message sent: ' + info.response);
    });
}