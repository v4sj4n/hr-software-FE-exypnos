// userApi.ts
export async function fetchUsers(page = 1, limit = 10) {
    const response = await fetch(`http://localhost:3000/user?page=${page}&limit=${limit}`);
    const users = await response.json();
    return users;
  }
  
  export async function searchUsersByName(name: string) {
    const response = await fetch(`http://localhost:3000/user/search/${name}`);
    const users = await response.json();
    return users;
  }
  
  export async function fetchUserById(id: string) {
    const response = await fetch(`http://localhost:3000/user/${id}`);
    const user = await response.json();
    return user;
  }
  