import { User } from '@/Pages/Chat/Interfaces/types';

// Helper function to get the authentication token
function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

// Fetch all users with optional pagination (default: page 1, limit 10)
export async function fetchUsers(page = 1, limit = 10): Promise<User[]> {
  try {
    const response = await fetch(`http://localhost:3000/user?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
