/* Email verifier */

const nodemailer = require('nodemailer');;



const transporter = nodemailer.createTransport("SMTP",{
  service: 'gmail',
  auth: {
    username

    userid

    password

    email

  }


  transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
});
