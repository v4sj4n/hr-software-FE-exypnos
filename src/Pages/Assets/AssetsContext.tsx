import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import { UserWithAsset } from "./TAsset";
import { useSearchParams } from "react-router-dom";

interface AssetContextType {
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
  usersWithAssets: UserWithAsset[];
  setUsersWithAssets: Dispatch<SetStateAction<UserWithAsset[]>>;
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
}

const defaultContextValue: AssetContextType = {
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  usersWithAssets: [],
  setUsersWithAssets: () => {},
  modalOpen: false,
  handleCloseModal: () => {},
  handleOpenModal: () => {},
};

export const AssetsContext =
  createContext<AssetContextType>(defaultContextValue);

const AssetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersWithAssets, setUsersWithAssets] = useState<UserWithAsset[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);

  return (
    <AssetsContext.Provider
      value={{
        searchParams,
        setSearchParams,
        usersWithAssets,
        setUsersWithAssets,
        modalOpen,
        handleCloseModal,
        handleOpenModal,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export default AssetProvider;
