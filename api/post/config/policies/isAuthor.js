module.exports=async (ctx,next)=>{
    if(ctx.state.user){
        return await next();
    }
    else{
        ctx.unauthorized('login frist http://localhost:1337/auth/local');
    }
}