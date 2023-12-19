const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

// class auth{

//     constructor(models){
//         this.models = models
//     }
    
    const tokenVerify =   async (req,res,next)=>{
        if(req.url == 'user/sign-in')next()
        if(req.url == 'user/sign-out')next()
        try {
            
        const token = req.headers.authorization.split(" ")[1]
        if(!token) throw new Error("token the headres authorization not fonud")
        const decoded =  jwt.verify(token,process.env.SECRET_WORD)
        const verifyDBsuccesToken = await this.models.token.findOne({successToken:token,owner:decoded.userId})
        const verifyDBrefreshToken = await this.models.token.findOne({refreshToken:token,owner:decoded.userId})
        if(!verifyDBrefreshToken && !verifyDBsuccesToken)throw new Error("token not found the tokenDB")
        next()
        } catch (error) {
            throw error
        }
        //  return true
        // next()

    }
// }

module.exports = {tokenVerify:tokenVerify}