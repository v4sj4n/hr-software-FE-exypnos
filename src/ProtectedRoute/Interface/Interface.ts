import React from 'react'

export interface User {
    email: string
    _id: string
    name: string
    firstName: string
    lastName: string
    phone: string
    role: string
    imageUrl: string
}

export interface AuthContextType {
    isAuthenticated: boolean
    userRole: string | null
    currentUser: User | null
    login: (access_token: string, role: string, user: User) => void
    logout: () => void
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
    undefined,
)
