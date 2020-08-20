import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: "sandbox2bdfd759d25b4ff7adc69d167465d4d0.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
    const emailData = {
        from: "cscim918@gmail.com",
        to: "cscim918@gmail.com",
        subject,
        html
    }
    return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello~ ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://number.com/verification/${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
};