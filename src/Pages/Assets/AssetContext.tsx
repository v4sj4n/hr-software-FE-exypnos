import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  FC,
} from 'react'
import { Asset } from './TAsset'

interface AssetContextType {
  assets: Asset[]
  setAssets: Dispatch<SetStateAction<Asset[]>>
  modalOpen: boolean
  handleCloseModal: () => void
  handleOpenModal: () => void
}

const defaultContextValue: AssetContextType = {
  assets: [],
  setAssets: () => {},
  modalOpen: false,
  handleCloseModal: () => {},
  handleOpenModal: () => {},
}

export const AssetsContext = createContext<AssetContextType>(defaultContextValue)

const AssetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const handleCloseModal = () => setModalOpen(false)
  const handleOpenModal = () => setModalOpen(true)

  return (
    <AssetsContext.Provider
      value={{
        assets,
        setAssets,
        modalOpen,
        handleCloseModal,
        handleOpenModal,
      }}
    >
      {children}
    </AssetsContext.Provider>
  )
}

export default AssetProvider
