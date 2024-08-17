import { useContext } from 'react'
import { InventoryContext } from '../InventoryContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
    createInventoryItem,
    getAllInventoryItems,
    getOneInventoryItem,
} from './queries'
import { CreateInventoryItemFormFields } from '@/Schemas/Inventory/CreateInventoryItem.schema'

export const useAllInventoryItems = () => {
    return useQuery({
        queryKey: ['allInventoryItems'],
        queryFn: getAllInventoryItems,
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
    return useMutation({
        mutationFn: ({ item }: { item: CreateInventoryItemFormFields }) =>
            createInventoryItem(item),
    })
}
