'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity}=require('strapi-utils')
module.exports = {
    async create(ctx){
        let entities;
        ctx.request.body.user=ctx.state.user.id;
        console.log(ctx.request.body.user)
        entities=await strapi.services.comment.create(ctx.request.body);
        return await sanitizeEntity(entities,{model:strapi.models.comment})


    }
};
