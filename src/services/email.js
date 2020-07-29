import nodeMailer from "nodemailer";

import api from "events";

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'workspace.email.test@gmail.com',
        pass: 'wzv99azQfqT9gJU'
    }
});


export const sendEmail = async (to, subject, text) => {

    const mailOptions = {
        from: process.env.emailAddress,
        to,
        subject,
        text
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return  {error, status: "Failed"};
        } else {
            console.log('Email sent: ' + info.response);
            return {info, status: "Succeed"};
        }
    });
}
