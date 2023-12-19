


class userController{


    
    async postUser(req,res){
        const {body} = req
        try {
            const newUser = await req.app.services.user.postUser(body)
            res.json({data:newUser})
        } catch (error) {
            res.status(500).json({err:error.message})
        }
    }

    async postSignInToken(req,res){
        const {email,password} = req.body
        try {
            const token = await req.app.services.user.postSignInToken(email,password)
            res.json({success:true,token:token})
        } catch (error) {
            res.status(500).json({err:error.message})
        }
    }

    async postSignOutToken(req,res){
        const {jwt} = req.body
        try {
            const token = await req.app.services.user.postSignOutToken(jwt)
            res.json({success:true,token:token})
        } catch (error) {
            res.status(500).json({err:error.message})

        }
    }

    async putRefreshToken(req,res){
        const {id} = req.params
        const token =req.headers.authorization && req.headers.authorization.split(" ")[1]
        if(!token)res.json({err:"token not found the authorization token"})
        
        try {
            const refreshToken = await req.app.services.user.putRefreshToken(id,token)
            res.json({success:true,refreshToken})
        } catch (error) {
            res.status(500).json({err:error.message})
        }
    }

    async getUserInfo(req,res){
        const token = req.headers.authorization.split(" ")[1]
        try {
           
            const userInfo = await req.app.services.user.getUserInfo(token)
            res.json({data:userInfo})
        } catch (error) {
            res.status(500).json({err:error.message})
        }
    }

    async putUserInfo(req,res){
        const {body} = req
        const token = req.headers.authorization.split(' ')[1]
        try {
            const updateUser = await req.app.services.user.putUserInfo(body,token)
            res.json({success:true,data:updateUser})
        } catch (error) {
            res.status(500).json({err:error.message})

        }
    }

    async putUserPassword(req,res){
        const {body} = req
        const token = req.headers.authorization.split(' ')[1]
        try {
            const updateUserPassword = await req.app.services.user.putUserPassword(body,token)
            res.json({success:true,data:updateUserPassword})
        } catch (error) {
            res.status(500).json({err:error.message})

        }
    }
}

module.exports = userController