import { useContext } from 'react'
import { InventoryContext } from '../InventoryContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    createInventoryItem,
    getAllInventoryItems,
    getOneInventoryItem,
} from './queries'
import { CreateInventoryItemFormFields } from '@/Schemas/Inventory/CreateInventoryItem.schema'

export const useAllInventoryItems = () => {
    const { searchParams } = useContext(InventoryContext)
    return useQuery({
        queryKey: [
            'allInventoryItems',
            searchParams.get('page'),
            searchParams.get('limit'),
        ],
        queryFn: () =>
            getAllInventoryItems(
                searchParams.get('page') as string,
                searchParams.get('limit') as string,
            ),
    })
}

export const useGetOneInventoryItem = () => {
    const { searchParams } = useContext(InventoryContext)
    return useQuery({
        queryKey: [
            'oneInventoryItem',
            searchParams.get('selectedInventoryItem'),
        ],
        queryFn: () =>
            getOneInventoryItem(
                searchParams.get('selectedInventoryItem') as string,
            ),
    })
}

export const useCreateInventoryItem = () => {
    const { handleCloseCreateModalOpen } = useContext(InventoryContext)

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            type,
            serialNumber,
        }: {
            type: 'laptop' | 'monitor'
            serialNumber: string
        }) => createInventoryItem(type, serialNumber),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['allInventoryItems'],
            })
            handleCloseCreateModalOpen()
        },
    })
}
