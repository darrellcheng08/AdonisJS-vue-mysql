'use strict'

class LoginController {

    async login ({ request, auth, response }) {
        try {
            const { username, password, remember_me } = request.all()
            const token = await auth.remember(remember_me).attempt(username, password)
            return response.json({
                status: 'success',
                message: 'Login successful',
                api_token: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'Username/Password is incorrect',
                color: 'error'
            })
        }
    }

    async checkLogin({ auth, request }) {
        try {
            await auth.check()
        } catch (error) {
            response.send('You are not logged in')
        }
    }

    async logout ({ auth, request, response }) {
        await auth.logout()
        response.redirect('/login')
    }

}

module.exports = LoginController
