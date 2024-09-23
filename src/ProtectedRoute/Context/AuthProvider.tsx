import React, { useState, useEffect } from 'react'
import { AuthContext, User } from '../Interface/Interface'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        const user_role = localStorage.getItem('user_role')
        const storedUserData = localStorage.getItem('user')

        if (access_token && user_role && storedUserData) {
            const user: User = JSON.parse(storedUserData)
            setIsAuthenticated(true)
            setUserRole(user_role)
            setCurrentUser(user)
        }
    }, [])

    const login = (access_token: string, role: string, user: User) => {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('user_role', role)
        localStorage.setItem('user', JSON.stringify(user))
        setIsAuthenticated(true)
        setUserRole(role)
        setCurrentUser(user)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_role')
        localStorage.removeItem('user')
        setIsAuthenticated(false)
        setUserRole(null)
        setCurrentUser(null)
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, userRole, currentUser, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
