const jwt = require('jsonwebtoken');
const secret_key='HiIamAGirl'
const fetchUser=(req,res,next)=>{
let token=req.header('auth-token')
if(!token)
{
    return res.status(401).send('please authenticate using valid token')
}
try{
let data=jwt.verify(token,secret_key)
req.user=data
next();
}
catch(error){
    return res.status(401).send('please authenticate using valid token')
}

}

module.exports=fetchUser