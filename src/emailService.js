import nodemailer from 'nodemailer';
import eventEmitter from './eventEmitter.js';

eventEmitter.on('userRegistered', async ({ username, email }) => {
  console.log(`Preparing email for ${username}...`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'username@gmail.com',
      pass: 'password'
    }
  });

  const mailOptions = {
    from: 'username@gmail.com',
    to: email,
    subject: 'Welcome to our system!',
    text: `Hello, ${username}! Thanks for registering.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('🔴 Error sending email:', error);
  }
});