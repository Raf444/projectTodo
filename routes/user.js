const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const controller = new userController()

//  /user
router.post('/',controller.postUser)

router.post('/sign-in',controller.postSignInToken)
router.post('/sign-out',controller.postSignOutToken)



module.exports = router