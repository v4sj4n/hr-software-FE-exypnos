// Helper function to get the authentication token
function getAuthToken() {
    return localStorage.getItem('access_token');
  }
  
  // Fetch all users with optional pagination (default: page 1, limit 10)
  export async function fetchUsers(page = 1, limit = 10) {
    try {
      const response = await fetch(`http://localhost:3000/user?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`  // Include the auth token in the header
        }
      });
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];  // Return an empty array if there's an error
    }
  }
  
  // Search users by name
  export async function searchUsersByName(name: string) {
    try {
      const response = await fetch(`http://localhost:3000/user/search/${name}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`  // Include the auth token in the header
        }
      });
      if (!response.ok) {
        throw new Error(`Error searching users: ${response.statusText}`);
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error searching users:', error);
      return [];  // Return an empty array if there's an error
    }
  }
  
  // Fetch a specific user by ID
  export async function fetchUserById(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`  // Include the auth token in the header
        }
      });
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return null;  // Return null if there's an error
    }
  }
  