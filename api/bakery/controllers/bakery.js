'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx){
        const body=ctx.request.body;
        const data=await strapi.services.bakery.create(body);
       // ctx.created(data);
        strapi.emitToAllUsers(data);
    }
};
