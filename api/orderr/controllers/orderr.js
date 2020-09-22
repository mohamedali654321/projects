'use strict';

const { update } = require("lodash");


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx){
        const{user}=ctx.state;
        
        let entities;
        ctx.request.body.user=ctx.state.user.id;
        entities=await strapi.services.orderr.create(ctx.request.body);
        return await entities;


    },
    async delete(ctx){

        const{id}=ctx.params;
        const[orders]=await strapi.services.orderr.find({id:ctx.params.id,'user.id':ctx.state.user.id});
        if(!orders)
        {
          return await ctx.badRequset('there no order by this id');
        }
        if(orders)
        {
            entities=await strapi.services.orderr.delete({id});
        }
        return await entities;
    }

};
