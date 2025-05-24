const supabase = require('../config/supabase');

class AuthMiddleware {
    async verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'No token provided' });
            }

            const token = authHeader.substring(7);
            
            const { data: { user }, error } = await supabase.auth.getUser(token);
            
            if (error || !user) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async optionalAuth(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.substring(7);
                const { data: { user }, error } = await supabase.auth.getUser(token);
                
                if (!error && user) {
                    req.user = user;
                }
            }
            
            next();
        } catch (error) {
            console.error('Optional auth middleware error:', error);
            next();
        }
    }
}

module.exports = new AuthMiddleware();