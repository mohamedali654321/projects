'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const{sanitizeEntity,parseMultipartData}=require('strapi-utils');
const Shopify=require('shopify-api-node');
const shopify=new Shopify({
    shopName:'strapi-example',
    apiKey:'617bfc0647ec9ea8852cd22751f8200d',
    password:'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'

})
module.exports = {
    async findOne(ctx){
        const{id}=ctx.params;
        let entities;
        entities=await strapi.services.product.findOne({id});
        entities.shopify=await shopify.product.get(entities.shopifyID);
        return await sanitizeEntity(entities,{model:strapi.models.product});

    }

};
