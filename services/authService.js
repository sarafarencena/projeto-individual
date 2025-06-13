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

            // Sincronizar usuário com tabela users usando o ID do Supabase
            if (data.user && userData) {
                const { name, class: className, course, group } = userData;

                try {
                    await db.query(
                        'INSERT INTO users (id, name, class, course, "group", email, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO UPDATE SET name = $2, class = $3, course = $4, "group" = $5, email = $6;',
                        [data.user.id, name, className, course, group, email, new Date()]
                    );
                    console.log('User synced to database:', data.user.id);
                } catch (dbError) {
                    console.error('Database insert error:', dbError);
                    // Não falha o signup se houver erro no banco
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

            // Verificar se usuário existe na tabela users, se não existir, criar
            try {
                const { rows } = await db.query('SELECT id FROM users WHERE id = $1', [data.user.id]);

                if (rows.length === 0) {
                    // Usuário não existe na tabela, vamos criar com dados básicos
                    // Usar ON CONFLICT para evitar erro de email duplicado
                    await db.query(
                        'INSERT INTO users (id, name, email, created_at) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET id = $1',
                        [data.user.id, data.user.email, data.user.email, new Date()]
                    );
                    console.log('User synced in database during signin:', data.user.id);
                } else {
                    console.log('User already exists in database:', data.user.id);
                }
            } catch (dbError) {
                console.error('Database sync error during signin:', dbError);
                // Não falha o login se houver erro no banco
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