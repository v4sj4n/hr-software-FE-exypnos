import { createContext, ReactNode, Dispatch, SetStateAction, FC } from 'react'
import { useSearchParams } from 'react-router-dom'

interface VacationContextType {
  searchParams: URLSearchParams
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>
}

const defaultContextValue: VacationContextType = {
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
}

export const VacationContext =
  createContext<VacationContextType>(defaultContextValue)

const VacationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <VacationContext.Provider
      value={{
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </VacationContext.Provider>
  )
}

export default VacationProvider
