const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({email})
        if (candidate) {
                throw ApiError.BadRequest(`user with email ${email} already exists`)
            }
            
            const hashPassword = await bcrypt.hash(password, 3)
            const user = await userModel.create({email, password: hashPassword})

        const userDto = new UserDto(user)
        const tokens =tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await userModel.findOne({email})
        if(!user) {
            throw ApiError.BadRequest('No user with this email')
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)
        if(!isPassCorrect) {
            throw ApiError.BadRequest('Wrong password')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(email) {
        const token = await tokenService.removeToken
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findToken(refreshToken)

        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        
        const user = userModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getUsers() {
        const users = await userModel.find()
        return users
    }
}

module.exports = new UserService()