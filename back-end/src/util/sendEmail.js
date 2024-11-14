const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

// mg.messages.create('sandbox682345909a2e4b9da239888232fb4a94.mailgun.org', {
//   from: "mailgun@sandbox682345909a2e4b9da239888232fb4a94.mailgun.org",
//   to: ["michr.cric+jdoe@gmail.com"],
//   subject: "Hello",
//   text: "Testing some Mailgun awesomeness!",
//   html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
//   .then(msg => console.log(msg)) // logs response data
//   .catch(err => console.log(err));


export const sendEmail = (from, to, subject, text, html) => {
  return mg.messages.create('sandbox-123.mailgun.org', {
    from,
    to,
    subject,
    text,
    html
  });
}
