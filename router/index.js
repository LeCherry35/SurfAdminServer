const Router = require('express').Router
const userController = require('../controllers/user-controller')
const bodyParser = require('body-parser')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')

const router = new Router()

const jsonParser = bodyParser.json()

router.post('/registration', 
    jsonParser, 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
)
router.post('/login', 
    jsonParser, 
    userController.login
)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

//test

router.get('/users', 
    authMiddleware,
    userController.getUsers
)

//test

module.exports = router