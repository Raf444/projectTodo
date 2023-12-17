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
        const  successToken = jwt.sign({ userId:user._id }, process.env.SECRET_WORD, { expiresIn: '1h' });
        const saveToken = await this.models.token.create({
            owner:user._id,
            successToken
        })
        if(saveToken)return successToken
    
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

async putRefreshToken(id){
    try {
        const user  = await this.models.token.findOne({owner:id})
        if(!user)throw new Error("user or userId not found")
        const refreshToken = jwt.sign({ userId:id }, process.env.SECRET_WORD, { expiresIn: '30d' })
        const addRefreshToken = await this.models.token.replaceOne({owner:id},{owner:id,refreshToken:refreshToken})
        if(!addRefreshToken)throw new Error("refreshToken not generetad")
        console.log("addRefreshToken",addRefreshToken);
        console.log("refreshToken",refreshToken);
        return refreshToken
    } catch (error) {
        throw new Error(error.message)
    }
}
    }


module.exports = userService