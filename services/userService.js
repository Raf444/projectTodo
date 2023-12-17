const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class userService{
    constructor(models){
        this.models = models
    }


async postUser(body) {
    try {
        const hashPassword = await bcrypt.hash(body.password, process.env.SALT_PASSWORD);
        const newUser = await this.models.user.create({ ...body, password: hashPassword });
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

async postSignInToken(email,password){
    const user =  await this.models.user.findOne({email:email})
    if(!user){
            throw new Error("not found email")
    }
    if(!password){
        throw new Error('password is invalid')
    }
    const passwordCompare = await bcrypt.compare(password,user.password)
    if(passwordCompare){
        const  token = jwt.sign({ userId:user._id }, process.env.SECRET_WORD, { expiresIn: '1h' });
        const saveToken = await this.models.token.create({
            owner:user._id,
            token:token
        })
        if(saveToken)return token
    
    }else{
        throw new Error("password invalid")
    }
}

async postSignOutToken(token){
    const decoded = jwt.verify(token,process.env.SECRET_WORD)
    if(decoded){     
        const deleteToken = await this.models.token.deleteOne({owner:decoded.userId})
        console.log("decoded : " ,decoded);
        console.log("deleteToken : ", deleteToken);
        if(deleteToken.deletedCount > 0){
            return deleteToken
        }else{
            throw new Error("token not deleted")
        }
    }else{
        console.log(decoded);
        throw new Error("token invalid")
    }
}
    }


module.exports = userService