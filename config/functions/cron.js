'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */
const _=require('lodash');

module.exports = {
  '*/1 * * * *': async () => {
    // fetch articles to publish
    const draftArticleToPublish = await strapi.api.article.services.article.find({
      status: 'draft',
      publish_at_lt: new Date(),
    });
    //console.log(draftArticleToPublish);
    // update status of articles
    draftArticleToPublish.forEach(async article => {
      await strapi.api.article.services.article.update({ id: article.id }, { status: 'published' });
      //console.log(article);
    });
  
  },
  '*/1 * * * *': async () => {
    const status1= await strapi.api.orderr.services.orderr.find({
    orderStatus:'order_confirmation'

    });
    status1.forEach(async order=>{
      await strapi.api.orderr.services.orderr.update({id:order.id},{ orderStatus:'preparation'});
    })
  },
  '0 2 * * *': () => {
    strapi.config.functions.docker();
  }
  
 
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
};
