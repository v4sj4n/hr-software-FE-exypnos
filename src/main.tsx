import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import { AuthProvider } from './Context/AuthProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './Theme/ThemeContext.tsx' 

import './index.scss'

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
                    <Router />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
)
