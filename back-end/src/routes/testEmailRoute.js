import {sendEmail} from "../util/sendEmail";

export const testEmailRoute = {
  path: '/api/test-email',
  method: 'post',
  handler: async (req, res) => {
    const {to} = req.body;
    try {
     await sendEmail('gunalmel@med.umich.edu', to, 'Test Email', 'This is a test email', '<h1>This is a test email</h1>');
      res.sendStatus(200);
    }catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}
