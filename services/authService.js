const supabase = require('../config/db');

class AuthService {
    async signUp(email, password, userData = {}) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        });
        
        if (error) throw error;

        if (data?.user) {
            const { name, class: className, course, group } = userData;
            const { error: insertError } = await supabase
                .from('users')
                .insert([
                    {
                        id: data.user.id,
                        name,
                        class: className,
                        course,
                        group,
                        email,
                        created_at: new Date().toISOString()
                    }
                ]);
            
            if (insertError) throw insertError;
        }

        return data;
    }

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) throw error;
        return {
            user: data.user,
            session: data.session
        };
    }

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { message: 'Signed out successfully' };
    }

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    }
}

module.exports = new AuthService();
