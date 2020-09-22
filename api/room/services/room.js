'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    bookRoom:async(roomId,date,ctx)=>{
        try {
            const room=await strapi.query('room').findOne({id:roomId});
            const existingBooking=await strapi.query('booking').findOne({'room.id':roomId,bookingDate:date});
            
            if(existingBooking)
            {
                ctx.send(`Room ${room.title} is already bokking at ${new Date(date).toDateString()}` );
            }
            const{id,title,capacity,image,description}=room
            const newBooking={
                bookingDate:date,
                room:{
                    id,
                    title,
                    capacity,
                    description,
                    image
                }
            }
            const result=await strapi.query('booking').create(newBooking);
            
            return await result;
            
        } catch (error) {
            console.log(error);
            
        }

    }
};
