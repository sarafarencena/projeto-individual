const supabase = require('../config/supabase');
const db = require('../config/db');

class AuthService {
    async signUp(email, password, userData = {}) {
        try {
            
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData
                }
            });
            
            console.log(error, data)
            
            if (error) throw new Error(`Signup failed: ${error.message}`);

            if (userData) {
                const { name, class: className, course, group } = userData;
                
                try {
                    await db.query(
                        'INSERT INTO users (name, class, course, "group", email, created_at) VALUES ($1, $2, $3, $4, $5, $6);',
                        [name, className, course, group, email, new Date()]
                    );
                } catch (dbError) {
                    console.error('Database insert error:', dbError);
                }
            }

            return data;
        } catch (error) {
            throw new Error(`Authentication error: ${error.message}`);
        }
    }

    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            if (error) throw new Error(`Sign in failed: ${error.message}`);

            // double check to guarantee the data returns correctly
            if (!data?.user || !data?.session) {
                throw new Error("User or session not returned from Supabase");
            }
            
            return {
                user: data.user,
                session: data.session
            };
        } catch (error) {
            throw new Error(`Authentication error: ${error.message}`);
        }
    }

    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw new Error(`Sign out failed: ${error.message}`);
            return { message: 'Signed out successfully' };
        } catch (error) {
            throw new Error(`Authentication error: ${error.message}`);
        }
    }

    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw new Error(`Get user failed: ${error.message}`);
            return user;
        } catch (error) {
            throw new Error(`Authentication error: ${error.message}`);
        }
    }

    async refreshToken() {
        try {
            const { data, error } = await supabase.auth.refreshSession();
            if (error) throw new Error(`Token refresh failed: ${error.message}`);
            return data;
        } catch (error) {
            throw new Error(`Authentication error: ${error.message}`);
        }
    }
}

module.exports = new AuthService();