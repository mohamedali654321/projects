'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity,parseMultipartData}=require('strapi-utils')
module.exports = {
    async find(ctx){
        let entities;
        if(ctx.query._q)
        {
            entities=await strapi.services.papper.search(ctx.query);
        }
        else{
            entities=await strapi.services.papper.find(ctx.query,['author','author.group','author.role']);
        }
        return await entities;
    },
    async comment(ctx){
        let entities;
        ctx.request.body.author=ctx.state.user.id;
        console.log(ctx.request.body.author)
        ctx.request.body.papper=ctx.params.id;
        console.log(ctx.request.body.papper);
        entities=await strapi.services.commment.create(ctx.request.body);
        return await entities;
    }
};
