const adminMidleware = async(req,res,next)=>{
    try {
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message:"Access denied : user not admin"})
        }
        next()
    } catch (error) {
        next(error)
        
    }
}
module.exports=adminMidleware;