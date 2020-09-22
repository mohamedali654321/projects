'use strict';

/**
 * contact-from.js controller
 *
 * @description: A set of functions called "actions" of the `contact-from` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    const{user}=ctx.state;
    const {username,email}=user;
    console.log(username);
    console.log(email);
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'success'
    });
  },
  create:async(ctx)=>{
    const{user}=ctx.state;
    const {username,email,id}=user;

    ctx.request.body.user=id;
    const {message}=ctx.request.body;
    const {to}=ctx.request.body;
    // console.log(username);
    // console.log(email);
    // console.log(message);
    const data={username,email,message,to};
    if(!data.username || !data.email || !data.message || !data.to){
      return ctx.badRequest('All Parameters Required');
    }
    else{
      console.log(data);
      const result=await strapi.entityService.create({
        data
      },{model:"plugins::contact-from.message"});
      return await result;
    }
  } 
};
