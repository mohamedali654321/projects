module.exports=async(ctx,next)=>{
    if(ctx.state.user.role.name === "Admin")
    {
        ctx.request.body.admin=ctx.state.user.id;
        console.log(ctx.request.body.admin);
        return await next();
    }
    else{
        return await ctx.unauthorized("Not allow to do this action");
    }
   
}
