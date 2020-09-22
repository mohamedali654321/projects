
const forgotPasswordTempalet=require('./email-templates/forgot-password');
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url:'https://b6cbfc17c583.ngrok.io',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '2077f8bd2746c47f5303da92783c0811'),
    },
    forgotPassword:{
      from:'mmmmali654321@gmail.com',
      replyTo:'mohamed@gmail.com',
      emailTemplate:forgotPasswordTempalet
    }

  },
  cron:{
    enabled:true
  }
});
