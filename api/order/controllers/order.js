'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity}=require('strapi-utils')
module.exports = {
    async find(ctx){
        if(!ctx.state.user)
        {
            return await ctx.unauthorized('please login frist')
        }
        const {user}=ctx.state
        console.log(user);
        const entities= await strapi.services.order.find({user:user.id},["order"]);
        entities.map( entity=>{
         const result= sanitizeEntity(entity,{model:strapi.models.order});
         if(result.user && result.user.email)
         {
             delete result.user.email;
         }
         
         return  result;
        });
        return entities;
        
    }
};
