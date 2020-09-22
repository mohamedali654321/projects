'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity,parseMultipartData}=require('strapi-utils');
module.exports = {
    async create(ctx){
        let entities;
        ctx.request.body.admin=ctx.state.user.id;
        if(ctx.is('multipart'))
        {
            const{data,files}=parseMultipartData(ctx);
            entities=await strapi.services.productt.create(data,{files});
        }
        else{
            entities=await strapi.services.productt.create(ctx.request.body);
        }
        return await entities;
    },
    async update(ctx){
        const {id}=ctx.params;
        let entities;
        const [product]=await strapi.services.productt.find({id:ctx.params.id,'admin.id':ctx.state.user.id});
        console.log(product);
        if(!product)
        {
            ctx.unauthorized('there is no product by this id');
        }
        if(product){
            entities=await strapi.services.productt.update({id},ctx.request.body);
        }
        return await sanitizeEntity(entities,{model:strapi.models.productt});
        


    },
    async delete(ctx){
        const {id}=ctx.params;
        let entities;
        const [product]=await strapi.services.productt.find({id:ctx.params.id,'admin.id':ctx.state.user.id});
        if(!product)
        {
           return await ctx.badRequest('there is no product by this id');

        }
        if(product)
        {
            entities=await strapi.services.productt.delete({id});
        }
        return await sanitizeEntity(entities,{model:strapi.models.productt});
    }
};
