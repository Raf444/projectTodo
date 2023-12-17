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
        try {
            const refreshToken = await req.app.services.user.putRefreshToken(id)
            res.json({success:true,refreshToken})
        } catch (error) {
            res.status(500).json({err:error.message})
        }
    }
}

module.exports = userController