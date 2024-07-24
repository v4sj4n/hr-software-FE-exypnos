import { createContext } from 'react';
import { UserProfileData } from '../../Employees/Hook';

export interface FileUploadContextType {
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  previewImage: string | null;
  error: string | null;
  isLoading: boolean;
  userImage: UserProfileData | null;
}

export const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);