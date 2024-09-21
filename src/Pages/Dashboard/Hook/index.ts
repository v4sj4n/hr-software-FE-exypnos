import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { handleFetchNotes, handleNoteCreation, handleNoteDeletion } from './queries'

export const useNoteCreation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            title,
            description,
            willBeReminded,
            date,
            userId,
        }: {
            title: string
            description: string
            willBeReminded: boolean
            date: string
            userId: string
        }) =>
            handleNoteCreation(
                title,
                description,
                willBeReminded,
                date,
                userId,
            ),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            })
        },
    })
}

export const useGetNotes = (userId: string) => {
    return useQuery({
        queryKey: ['notes', userId],
        queryFn: () => handleFetchNotes(userId),
    })
}


export const useNoteDeletion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            noteId
        }: {
            noteId: string
        }) =>
            handleNoteDeletion(
                noteId
            ),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            })
        },
    })
}