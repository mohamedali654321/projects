'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    CreateComment:async(ctx)=>{
        const {id}=ctx.params;
        const {user}=ctx.state;
        console.log(id,user);
        ctx.request.body.author=user;
        ctx.request.body.post=id;
        let entity=await strapi.services.coment.create(ctx.request.body);
        return await entity;

    }
};
