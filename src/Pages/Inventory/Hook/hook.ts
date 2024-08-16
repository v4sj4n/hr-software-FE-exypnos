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
  const allItems = useQuery({
    queryKey: ['allInventoryItems'],
    queryFn: getAllInventoryItems,
  })
  return allItems
}

export const useGetOneInventoryItem = () => {
  const { searchParams } = useContext(InventoryContext)
  const oneItem = useQuery({
    queryKey: ['oneInventoryItem', searchParams.get('selectedInventoryItem')],
    queryFn: () =>
      getOneInventoryItem(searchParams.get('selectedInventoryItem') as string),
  })
  return oneItem
}

export const useCreateInventoryItem = () => {
  const createItem = useMutation({
    mutationFn: ({ item }: { item: CreateInventoryItemFormFields }) =>
      createInventoryItem(item),
  })
  return createItem
}
