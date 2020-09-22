'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles:{
        afterCreate(result,data){
            strapi.services.history.create({
                contentType:'article',
                action:'create',
                author:data.author,
                content:data
            })

        },
        afterUpdate(result,params,data){
            strapi.services.history.create({
                contentType:'article',
                action:'update',
                author:result.author,
                content:result
               
            });

        }
    }
};
