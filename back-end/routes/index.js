var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
  host: "smtp.gmail.com", // hostname
  auth: {
    user: 'monaleasecodecave@gmail.com',
    pass: 'codecave123'
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var subject = req.body.subject
  var email = req.body.email
  var message = req.body.message
  email = email.toString();
  message = message.toString();
  subject = subject.toString();
  var mail = {
    to: email,  //Change to email address that you want to receive messages on
    subject: subject,
    text: message
  }
  console.log(email);
  console.log(message);
  console.log(subject);
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success',
        content:  `${message}`

      })
    }
  })
})

module.exports = router;
