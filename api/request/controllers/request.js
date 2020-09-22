'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity,parseMultipartData}=require('strapi-utils')
module.exports = {
    async customCreate(ctx){
        let entities;
        if(ctx.is('multipart'))
        {
            const {data,files}=parseMultipartData(ctx);
            entities=await strapi.services.request.create(data,{files});
        }
        else{
            entities=await strapi.services.request.create(ctx.request.body);
        }
        return await sanitizeEntity(entities,{model:strapi.models.request});

    }
};
