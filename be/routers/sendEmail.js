const express = require('express');
const { createTransport } = require('nodemailer');
const email = express.Router();

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'reva94@ethereal.email',
    pass: 'bHGbFzNZcapgKuRaQH',
  },
});

email.post('/send-email', async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required.' });
    }

    const mailOptions = {
      from: 'pippo@pippoforever.com',
      to: 'reva94@ethereal.email',
      subject,
      text: message, // Use 'text' instead of 'message'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while sending the email.' });
      } else {
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

module.exports = email;
