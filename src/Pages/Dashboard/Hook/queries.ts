import AxiosInstance from '@/Helpers/Axios'

export const handleNoteCreation = async (
    title: string,
    description: string,
    willBeReminded: boolean,
    date: string,
    userId: string,
) => {
    await AxiosInstance.post(`/note/`, {
        title,
        description,
        willBeReminded,
        date,
        userId,
    })
}
export const handleFetchNotes = async (userId: string) => {
    return (await AxiosInstance.get(`/note/user/${userId}/all`)).data
}
export const handleNoteDeletion = async (noteId: string) => {
    return await AxiosInstance.delete(`/note/${noteId}`)
}
