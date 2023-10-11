const Router = require('express').Router
const userController = require('../controllers/user-controller')
var bodyParser = require('body-parser')

const router = new Router()

var jsonParser = bodyParser.json()

router.post('/registration', jsonParser, userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

//test

router.get('/users', userController.getUsers)

//test

module.exports = router