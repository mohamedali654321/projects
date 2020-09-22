module.exports=async (ctx,next)=>{
    if(ctx.state.user.role.name === "Admin")
    {
        ctx.request.body.user=ctx.state.user.id;
        console.log(ctx.request.body.user)
        return await next();
    }
  return await  ctx.unauthorized('dont have permission ');
}