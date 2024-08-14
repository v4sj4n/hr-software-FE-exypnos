import { createContext, ReactNode, Dispatch, SetStateAction, FC } from 'react'
import { useSearchParams } from 'react-router-dom'

interface HoldingsContextType {
  searchParams: URLSearchParams
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>
}

const defaultContextValue: HoldingsContextType = {
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
}

export const HoldingsContext =
  createContext<HoldingsContextType>(defaultContextValue)

const HoldingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <HoldingsContext.Provider
      value={{
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </HoldingsContext.Provider>
  )
}

export default HoldingsProvider
