import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface ChatContextType {
    selectedConversation: string | null
    setSelectedConversation: Dispatch<SetStateAction<string | null>>
}

export const ChatContext = createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children }: any) => {
    const [selectedConversation, setSelectedConversation] = useState<
        string | null
    >(null)

    return (
        <ChatContext.Provider
            value={{ selectedConversation, setSelectedConversation }}
        >
            {children}
        </ChatContext.Provider>
    )
}
