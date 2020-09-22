'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    async create(data,{files}={}){
        console.log(data);
  const entry=await strapi.query('rest').create(data);
  if(files){
      await strapi.entityService.uploadFiles(entry,{files},{model:'rest'});
      return this.findOne({id:entry.id});
  }
  return entry

    }
};
