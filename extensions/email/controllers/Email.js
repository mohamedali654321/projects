module.exports={
    async send(ctx)

    {
        const options={
            to:ctx.request.body.to,
            from:ctx.request.body.from,
            replyTo:ctx.request.body.from,
            subject:ctx.request.body.subject,
            text:ctx.request.body.text,
            html:'<h1>text</h1>'

        }
       const email= await strapi.plugins["email"].services.email.send(options);
       ctx.send('Email sent')
       return await email;

    }
}