'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity,parseMultipartData}=require('strapi-utils');
const Filter=require('bad-words');

module.exports = {
    async create(ctx){
        const filter=new Filter();
        let entities;
        entities=await strapi.services.cooment.create(ctx.request.body);
        entities=sanitizeEntity(entities,{model:strapi.models.cooment});
       console.log(entities.content);
       if(entities.content !== filter.clean(entities.content))
       {
           await strapi.plugins['email'].services.email.send({
               to:'paulbocuse@strapi.io',
               from:'admin@strapi.io',
               subject:'bad comment',
               text:`
               comment of id ${entities.id} have bad words comment: ${entities.content}
               `
           });

       }
       return await entities;

    }
};
