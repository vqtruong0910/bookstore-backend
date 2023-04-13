const nodemailer = require("nodemailer");
const getObjMailConfig = require("../config/mailconfig");

const transportfc = async () => {
  try {
    const smtp = await getObjMailConfig();
    return nodemailer.createTransport(smtp);
  } catch (error) {
    throw error;
  }
};

const sendEmail = async (to, subject, text) => {
  const msg = { to, subject, text };
  const transport = await transportfc();
  return new Promise((resolve, reject) => {
    transport.sendMail(msg, (error, resoponse) => {
      if (error) return reject(error);
      return resolve(resoponse);
    });
  });
};

const sendVerificationEmail = async (to, token) => {
  try {
    const subject = "Email Verification";
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `${process.env.CLIENT_HOST}/verify_email_checked?token=${token}`;
    const text = `Dear user,To verify your email, click on this link: ${verificationEmailUrl} If you did not create an account, then ignore this email.`;
    return sendEmail(to, subject, text);
  } catch (error) {
    throw new Error('can not send email');
  }
};

const sendEmailResetPassword = async (to, token) => {
  try {
    const subject = "Email verification change password";
    const verificationPasswordURL = `${process.env.CLIENT_HOST}/change_password?email=${to}&token=${token}`;
    const text = `Dear user, To verify your password change, click on this link:${verificationPasswordURL} If you did not change your password, then ignore this email.`;
    return sendEmail(to, subject, text);
  } catch (error) {
    throw new Error('can not send email');
  }
}
module.exports = {
  transportfc,
  sendEmail,
  sendVerificationEmail,
  sendEmailResetPassword,
};
