

import authService from '../services/authService'

class AuthController {
    async signUp(req, res) {
        try {
            const { email, password } = req.body
            const data = await authService.signUp(email, password)
            res.json(data)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body
            const data = await authService.signIn(email, password)
            res.json(data)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    
    async getCurrentUser(req, res) {
        try {
            const user = await authService.getCurrentUser()
            res.json(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default new AuthController()
