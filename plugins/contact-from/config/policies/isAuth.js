module.exports=async(ctx,next)=>{
    if(ctx.state.user)
    {
        ctx.request.body.user=ctx.state.user.id;
        console.log(ctx.request.body.user)
        return await next();
    }
    else{
        return await ctx.unauthorized('login frist go to :'+'http://localhost:1337/auth/local');
    }
}