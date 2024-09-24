import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './Theme/ThemeContext.tsx'
import './index.scss'
import { AuthProvider } from './ProtectedRoute/Context/AuthProvider.tsx'
import { ChatProvider } from './Pages/Chat/context/ChatContext.tsx'
import { SocketProvider } from './Pages/Chat/context/SocketContext.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchInterval: 1000 * 60 * 1,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <SocketProvider>
                        <ChatProvider>
                            <Router />
                        </ChatProvider>
                    </SocketProvider>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
)
