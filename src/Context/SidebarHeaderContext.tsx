import { createContext, ReactNode, useState, FC } from 'react'

interface SidebarHeaderContextType {
    isSidebarOpen: boolean
    toggleSidebar: () => void
}

const defaultContextValue: SidebarHeaderContextType = {
    isSidebarOpen: true,
    toggleSidebar: () => {},
}

export const SidebarHeaderContext =
    createContext<SidebarHeaderContextType>(defaultContextValue)

const SidebarHeaderProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <SidebarHeaderContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
            }}
        >
            {children}
        </SidebarHeaderContext.Provider>
    )
}

export default SidebarHeaderProvider
