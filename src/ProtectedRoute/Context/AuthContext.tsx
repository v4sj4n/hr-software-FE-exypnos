import { useContext } from 'react'
import { AuthContextType, AuthContext } from '../Interface/Interface'

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
