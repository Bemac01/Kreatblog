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

    const mailOptions = {
        to: emailto,
        subject,
        html: `
        <h3>Use this code to ${content}</h3>
        <p>Your verification code is: <strong>${code}</strong></p>
        `,
    };  

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;