'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const qs =require('qs');

module.exports = {
    async find(ctx){
        const query=qs.stringify({
            _where:[{price_lte:13},{stars_lt:2}]
        });
        const qry= await strapi.services.restaurant.find();
        return qry;
    }
   
};
