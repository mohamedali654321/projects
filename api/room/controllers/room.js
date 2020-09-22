'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    book:async(ctx)=>{
        const body=ctx.request.body;
        if(!body.roomId)
        {
           throw new Error('Validation Error: roomId must not be null');
          // ctx.error('Validation Error: roomId must not be null')
        }
        if(!body.date)
        {
            throw new Error('Validation Error: date must not be null');
        }

        const bookingResult=await strapi.services.room.bookRoom(body.roomId,body.date,ctx);
        console.log(bookingResult)
        
        return  bookingResult;
    }
};
