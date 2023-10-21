const Router = require('express').Router
const userController = require('../controllers/user-controller')
const bodyParser = require('body-parser')
const {body} = require('express-validator')

const router = new Router()

const jsonParser = bodyParser.json()

router.post('/registration', 
    body('email').isEmail(),
    // body('password').isLength({min: 3, max: 32}),
    jsonParser, 
    userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

//test

router.get('/users', userController.getUsers)

//test

module.exports = router