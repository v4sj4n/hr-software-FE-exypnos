import { useContext } from 'react'
import { PasswordContext, PasswordContextType } from './PasswordContext'

export const usePassword = (): PasswordContextType => {
    const context = useContext(PasswordContext)
    if (context === undefined) {
        throw new Error('usePassword must be used within a PasswordProvider')
    }
    return context
}
