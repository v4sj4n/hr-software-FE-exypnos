import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

interface AssetContextType {
  assets: Asset[];
  setAssets: Dispatch<SetStateAction<Asset[]>>;
  createModalOpen: boolean;
  handleCloseCreateModalOpen: () => void;
  handleOpenCreateModalOpen: () => void;
  singleAssetID: string | null;
  setSingleAssetID: Dispatch<SetStateAction<string | null>>;
  viewAssetModalOpen: boolean;
  handleCloseViewAssetModalOpen: () => void;
  handleOpenViewAssetModalOpen: () => void;
}

const defaultContextValue: AssetContextType = {
  assets: [],
  setAssets: () => {},
  createModalOpen: false,
  handleCloseCreateModalOpen: () => {},
  handleOpenCreateModalOpen: () => {},
  singleAssetID: null,
  setSingleAssetID: () => {},
  viewAssetModalOpen: false,
  handleCloseViewAssetModalOpen: () => {},
  handleOpenViewAssetModalOpen: () => {},
};

export const InventoryContext =
  createContext<AssetContextType>(defaultContextValue);

export const InventoryProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [assets, setAssets] = useState<InventoryItem[]>([]);

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const handleCloseCreateModalOpen = () => setCreateModalOpen(false);
  const handleOpenCreateModalOpen = () => setCreateModalOpen(true);
  const [singleAssetID, setSingleAssetID] = useState<string | null>(null);
  const [viewAssetModalOpen, setViewAssetModalOpen] = useState<boolean>(false);
  const handleCloseViewAssetModalOpen = () => setViewAssetModalOpen(false);
  const handleOpenViewAssetModalOpen = () => setViewAssetModalOpen(true);

  return (
    <InventoryContext.Provider
      value={{
        assets,
        setAssets,
        createModalOpen,
        handleCloseCreateModalOpen,
        handleOpenCreateModalOpen,
        singleAssetID,
        setSingleAssetID,
        viewAssetModalOpen,
        handleCloseViewAssetModalOpen,
        handleOpenViewAssetModalOpen,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
