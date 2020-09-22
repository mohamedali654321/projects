module.exports=async(ctx,next)=>{
    if(ctx.is('multipart'))
    {
        const data=JSON.parse(ctx.request.body.data);
        data.author=ctx.state.user;
        ctx.request.body.data=JSON.stringify(data);
        console.log(ctx.request.body.data)

    }
    else{
        ctx.request.body.author=ctx.state.user;
        console.log(ctx.request.body.author)

    }
   
   
  
   
   
    return await next();


}