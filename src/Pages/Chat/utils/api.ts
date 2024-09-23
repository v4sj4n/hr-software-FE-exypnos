import { User } from '@/Pages/Chat/Interfaces/types'
const API_URL = import.meta.env.VITE_API_URL

function getAuthToken(): string | null {
    return localStorage.getItem('access_token')
}

export async function fetchUsers(page = 1, limit = 10): Promise<User[]> {
    try {
        const response = await fetch(
            `${API_URL}/user?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            },
        )
        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`)
        }
        const users: User[] = await response.json()
        return users
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    }
}
