module.exports=async(ctx,next)=>{
    if(ctx.state.user)
    {
        ctx.request.body.user=ctx.state.user.id;
       return await next();
    }
    else{
        return await ctx.unauthorized('login frist'+ " " +'http://localhost:1336/auth/local' );
    }
   
   
}