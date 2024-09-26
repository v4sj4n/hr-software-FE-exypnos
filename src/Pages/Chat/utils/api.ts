import AxiosInstance from '@/Helpers/Axios'
import { User } from '@/ProtectedRoute/Interface/Interface'

export async function fetchUsers(page = 1, limit = 10): Promise<User[]> {
    try {
        const response = await AxiosInstance.get(
            `/user?page=${page}&limit=${limit}`,
        )
        if (!response) {
            throw new Error(`Error fetching users: ${response}`)
        }
        const users: User[] = await response.data
        return users
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    }
}
