const ApiError = require('../exceptions/api-error')
const userModel = require('../models/user-model')
const userService = require('../service/user-service')
const UserService = require('../service/user-service')
const {validationResult} = require('express-validator')

class UserController{
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            console.log('#$%', errors);
            if(!errors.isEmpty()) {
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
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
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

            const users = await userService.getUsers()
            return res.json(users)
        } catch(e) {
            next(e)
        }
    }

    //test

}

module.exports = new UserController()