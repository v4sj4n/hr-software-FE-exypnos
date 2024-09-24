import AxiosInstance from '@/Helpers/Axios'
import { EventsData } from '../Interface/Events'

export const fetchEvents = async (
    search: string,
    pageParam: number,
    currentUserId: number | undefined,
): Promise<{ data: EventsData[]; totalPages: number }> => {
    const Limit = 6
    if (!currentUserId) {
        console.error("Current user ID is undefined")
        return { data: [], totalPages: 0 }
    }
    const response = await AxiosInstance.get<{ data: EventsData[]; totalPages: number }>(
        `/event/user/${currentUserId}?search=${search}&page=${pageParam}&limit=${Limit}`,
    )
    return response.data
}
