const nodemail = require('nodemailer');
const { userEmail, userPassword } = require('../config/keys');

const sendEmail = async ({emailto, subject, code, content}) => {
    const transporter = nodemail.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
                user: userEmail,
                pass: userPassword
        } 
    });


    await transporter.sendMail({
        to: emailto,
        subject,
        html: `
        <div>
            <h3>Use this code to ${content}</h3>
            <p>Your verification code is: <strong>${code}</strong></p>
        </div>
        `,
    });
    
};

module.exports = sendEmail;