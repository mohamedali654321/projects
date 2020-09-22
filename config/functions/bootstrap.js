'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  
    var io = require('socket.io')(strapi.server);
    const users=[];
    
    io.on('connection', function(socket){
        socket.userID=(Math.random()* 10000000000000000);
        console.log('new user connected userID'+" "+socket.userID);
        users.push(socket);

     
      socket.emit('hello', JSON.stringify({message: 'Hello food lover'}));
     
      socket.on('disconnect', ()=>{
          users.forEach((user,i)=>{
              if(user.userID === socket.userID)
              {
                  users.splice(i,1);
                  console.log(user.userID);
                  console.log('a user disconnected',user.userID)
              }
          })
        
      }  );
    });
    strapi.io = io;
    strapi.emitToAllUsers=(food)=>{
        io.emit("food_ready",food);
    }
   
  };
