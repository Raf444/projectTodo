


class userController{


    
    async postUser(req,res){
        const {body} = req
        try {
            const newUser = await req.app.services.user.postUser(body)
            res.send(newUser)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async postSignInToken(req,res){
        const {email,password} = req.body
        try {
            const token = await req.app.services.user.postSignInToken(email,password)
            res.send(token)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async postSignOutToken(req,res){
        const {jwt} = req.body
        try {
            const token = await req.app.services.user.postSignOutToken(jwt)
            res.send(token)
        } catch (error) {
            res.status(500).send(error.message)

        }
    }

    async putRefreshToken(req,res){
        const {id} = req.params
        const token =req.headers.authorization && req.headers.authorization.split(" ")[1]
        if(!token)res.status(401).send("token not found the authorization token")
        
        try {
            const refreshToken = await req.app.services.user.putRefreshToken(id,token)
            res.send(refreshToken)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async getUserInfo(req,res){
        const token = req.headers.authorization.split(" ")[1]
        try {
           
            const userInfo = await req.app.services.user.getUserInfo(token)
            res.send(userInfo)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
       
    async putUserInfo(req,res){
        const {body} = req
        const token = req.headers.authorization.split(' ')[1]
        try {
            const updateUser = await req.app.services.user.putUserInfo(body,token)
            res.send(updateUser)
        } catch (error) {
            res.status(500).send(error.message)

        }
    }

    async putUserPassword(req,res){
        const {body} = req
        const token = req.headers.authorization.split(' ')[1]
        try {
            const updateUserPassword = await req.app.services.user.putUserPassword(body,token)
            res.send(updateUserPassword)
        } catch (error) {
            res.status(500).send(error.message)

        }
    }
}

module.exports = userController