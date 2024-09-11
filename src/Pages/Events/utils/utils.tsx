import AxiosInstance from '@/Helpers/Axios'
import { EventsData } from '../Interface/Events'

export const fetchEvents = async (
    search: string,
    pageParam: number,
): Promise<EventsData[]> => {
    const Limit = 6
    const response = await AxiosInstance.get<EventsData[]>(
        `/event?search=${search}&page=${pageParam}&limit=${Limit}`,
    )
    return response.data
}
