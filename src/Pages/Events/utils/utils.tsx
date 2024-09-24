import AxiosInstance from '@/Helpers/Axios'
import { EventsData } from '../Interface/Events'

export const fetchEvents = async (
    search: string,
    pageParam: number,
    currentUserId: number | undefined,
): Promise<EventsData[]> => {

    const Limit = 6
    const response = await AxiosInstance.get<EventsData[]>(
        `/event/user/${currentUserId}?search=${search}&page=${pageParam}&limit=${Limit}`,
    )
    return response.data
}
