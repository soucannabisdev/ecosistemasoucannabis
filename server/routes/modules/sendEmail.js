const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        ciphers: 'SSLv3',
    },
});

function SendMail(emailto, subject, html){
    transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: emailto,
        subject: subject,
        html: html,
    }, 
    (error, info) => {
        if (error) {
            console.error('Erro ao enviar o email: ' + error);
            return false
        } else {
            console.log('Email enviado com sucesso: ' + info.response);
            return true
        }
    });

}

module.exports = SendMail