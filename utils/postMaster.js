import nodemailer from 'nodemailer';
import fs from 'fs';
import { promisify } from 'util';
import ejs from 'ejs';

const readFile = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectedUnauthorized: false
    }
});


const sendMail = async (to, subject, templatePath, templateData) => {
  try {
    const template = await readFile(templatePath, 'utf8');
    const html = ejs.render(template, templateData);

    const info = await transporter.sendMail({
      from: `"QuicKart" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendMail;