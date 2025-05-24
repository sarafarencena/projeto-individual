

const authService = require('../services/authService');

class AuthController {
    async signUp(req, res) {
        try {
            const { email, password, name, class: className, course, group } = req.body;
            const data = await authService.signUp(email, password, {
                name,
                class: className,
                course,
                group
            });
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const data = await authService.signIn(email, password);
            
            // Set session cookie if needed
            if (data.session) {
                res.cookie('session', data.session.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
            }
            
            res.json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async signOut(req, res) {
        try {
            await authService.signOut();
            res.clearCookie('session');
            res.json({ message: 'Signed out successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    async getCurrentUser(req, res) {
        try {
            const user = await authService.getCurrentUser();
            if (!user) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
