const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



class userService{
    constructor(models){
        this.models = models
    }

    

async postUser(body) {
    try {
        const hashPassword = await bcrypt.hash(body.password, 10);
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

async getUserInfo(token){ //! ogtagorcel sarqvac middleware vory stuguma tokenery dostupic araj

    const tokenDecod = jwt.verify(token,process.env.SECRET_WORD)

//!
    const verifyDBsuccesToken = await this.models.token.findOne({successToken:token,owner:tokenDecod.userId})
        const verifyDBrefreshToken = await this.models.token.findOne({refreshToken:token,owner:tokenDecod.userId})
        if(!verifyDBrefreshToken && !verifyDBsuccesToken)throw new Error("token not found the tokenDB")
//!
    const userInfo = await this.models.user.findOne({_id:tokenDecod.userId})
    if(!userInfo)throw new Error("user not found or token invalid")
    return userInfo

}

async putUserInfo(body,token){
    const tokenDecod = jwt.decode(token,process.env.SECRET_WORD)
    if(!tokenDecod)throw new Error("token invalid ")
    const tokenDBsuccess = await this.models.token.findOne({successToken:body.token})
    const tokenDBrefresh = await this.models.token.findOne({refreshToken:body.token})
    if(!tokenDBsuccess && !tokenDBrefresh) throw new Error("this token not found the tokenDB")
    const updateUser = await this.models.user.updateOne({_id:tokenDecod.userId},{$set:{name:body.name,surname:body.surname}})
    console.log(updateUser);
    if(updateUser.n == 0 ) throw new Error("something went wrong")
    return updateUser
}

async putUserPassword(body,token){
    const tokenDecod = jwt.decode(token,process.env.SECRET_WORD)
    if(!tokenDecod)throw new Error("token invalid ")
    const tokenDBsuccess = await this.models.token.findOne({successToken:token})
    const tokenDBrefresh = await this.models.token.findOne({refreshToken:token})
    if(!tokenDBsuccess && !tokenDBrefresh) throw new Error("this token not found the tokenDB")

    if(body.newPassword !== body.confirmNewPassword)throw new Error("confirmNewPassword invalid ")

    const user = await this.models.user.findOne({_id:tokenDecod.userId})
    const verfyPassword = await bcrypt.compare(body.oldPassword,user.password)
    console.log(body.oldPassword);
    console.log(verfyPassword);
    if(!verfyPassword)throw new Error('oldPassword invalid')


    const hashPassword = await bcrypt.hash(body.newPassword,10)
    const updateUserPassword = await this.models.user.updateOne({_id:tokenDecod.userId},{$set:{password:hashPassword}})
    if(updateUserPassword.n == 0 ) throw new Error("something went wrong")
    return updateUserPassword
}

    }


module.exports = userService