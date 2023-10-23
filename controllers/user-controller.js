const ApiError = require('../exceptions/api-error')
const UserService = require('../service/user-service')
const {validationResult} = require('express-validator')

class UserController{
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {s
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const { email, password } = req.body

            const userData = await UserService.registration(email,password)
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            console.log('####', req.body);

            const {email, password} = req.body

            const userData = await UserService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

            return res.json(userData)

        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {

        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {

        } catch(e) {
            next(e)
        }
    }

    //test

    async getUsers(req, res, next) {
        try {
            res.json(['123', '456'])
        } catch(e) {
            next(e)
        }
    }

    //test

}

module.exports = new UserController()