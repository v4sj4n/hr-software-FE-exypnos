import React, { createContext } from 'react';
import { UserProfileData } from '../../../../Employees/interfaces/Employe';


export interface ProfileContextType {
  user: UserProfileData | null;
  error: string | null;
  isLoading: boolean;
  isCurrentUser: boolean;
  isAdmin: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);