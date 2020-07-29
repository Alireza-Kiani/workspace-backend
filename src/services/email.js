import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'workspace.email.test@gmail.com',
        pass: 'wzv99azQfqT9gJU'
    }
});

export const sendEmail = async (to, subject, text, cb) => {
    const mailOptions = { from: process.env.emailAddress, to, subject, text };
    await transporter.sendMail(mailOptions, cb);
}
