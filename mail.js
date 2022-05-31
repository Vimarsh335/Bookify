require('dotenv').config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const sendMail = (name, email, subject, text, cb) => {
    const mailOptions = {
        sender: email,
        from: name,
        to: 'vimarsh.gupta2019@vitstudent.ac.in',
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}
// Exporting the sendmail
module.exports = sendMail;