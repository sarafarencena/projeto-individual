import supabase from '../config/db'

class AuthService {
    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        
        if (error) throw error
        return data
    }

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        
        if (error) throw error
        return data
    }

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        return user
    }
}

export default new AuthService()
