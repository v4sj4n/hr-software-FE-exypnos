import { useContext } from 'react'
import { InventoryContext } from '../InventoryContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    createInventoryItem,
    getAllInventoryItems,
    getOneInventoryItem,
} from './queries'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { useForm } from '@tanstack/react-form'
import { AxiosError } from 'axios'

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

export const useCreateItemForm = () => {
    const { setError } = useContext(InventoryContext)
    const { mutate, isError, error } = useCreateInventoryItem()

    const form = useForm({
        defaultValues: {
            type: 'laptop',
            serialNumber: '',
        },
        onSubmit: async ({ value }) => {
            mutate({
                type: value.type as 'laptop' | 'monitor',
                serialNumber: value.serialNumber,
            })
            if (isError) {
                if (error instanceof AxiosError) {
                    if (error?.response?.data?.message) {
                        setError(error?.response?.data?.message)
                        return
                    }
                    if (error.code === 'ERR_NETWORK') {
                        setError(
                            'No internet connection. Please try again later.',
                        )
                        return
                    }
                }
                setError('An error occurred. Please try again later.')
            }
        },
        validatorAdapter: valibotValidator(),
    })

    return { form }
}
