import React from 'react'
import { StructureContext } from '../Interface/Index'

export const useStructureContext = () => {
    const context = React.useContext(StructureContext)
    if (context === undefined) {
        throw new Error(
            'useStructureContext must be used within a StructureProvider',
        )
    }
    return context
}
