import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  FC,
} from 'react'
import { UserWithHoldings } from './TAsset'
import { useSearchParams } from 'react-router-dom'

interface HoldingsContextType {
  searchParams: URLSearchParams
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>
  usersWithHoldings: UserWithHoldings[]
  setUsersWithHoldings: Dispatch<SetStateAction<UserWithHoldings[]>>
  userHoldings: UserWithHoldings | null
  setUserHoldings: Dispatch<SetStateAction<UserWithHoldings | null>>
  modalOpen: boolean
  handleCloseModal: () => void
  handleOpenModal: () => void
}

const defaultContextValue: HoldingsContextType = {
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  usersWithHoldings: [],
  setUsersWithHoldings: () => {},
  userHoldings: null,
  setUserHoldings: () => {},
  modalOpen: false,
  handleCloseModal: () => {},
  handleOpenModal: () => {},
}

export const HoldingsContext =
  createContext<HoldingsContextType>(defaultContextValue)

const HoldingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [usersWithHoldings, setUsersWithHoldings] = useState<
    UserWithHoldings[]
  >([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [userHoldings, setUserHoldings] = useState<UserWithHoldings | null>(
    null
  )
  const handleCloseModal = () => setModalOpen(false)
  const handleOpenModal = () => setModalOpen(true)

  return (
    <HoldingsContext.Provider
      value={{
        searchParams,
        setSearchParams,
        usersWithHoldings,
        setUsersWithHoldings,
        modalOpen,
        handleCloseModal,
        handleOpenModal,
        userHoldings,
        setUserHoldings,
      }}
    >
      {children}
    </HoldingsContext.Provider>
  )
}

export default HoldingsProvider
