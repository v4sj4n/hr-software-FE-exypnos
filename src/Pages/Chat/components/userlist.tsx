import React from 'react';
import { User } from '@/Pages/Chat/Interfaces/types';
import AxiosInstance from '@/Helpers/Axios';
import { useQuery } from '@tanstack/react-query';
import { UserProfileData } from '../../Employees/interfaces/Employe'

interface UserListProps {
  users: User[];
  recipientId: string;
  setRecipientId: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ recipientId, setRecipientId }) => {
  const fetchUsers = async () => {
    const response = await AxiosInstance.get('/user')
    console.log('Fetched user profile:', response.data)
    return response.data
  }

  const { data: UserProfileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUsers,
})

  return (
    <select value={recipientId} onChange={(e) => setRecipientId(e.target.value)}>
      <option value="">--Select a user--</option>
      {UserProfileData?.map((user: UserProfileData) => (
        <option key={user._id} value={user._id}>
          {user.firstName} {user.lastName}
        </option>
      ))}
    </select>
  );
};

export default UserList;
