import AxiosInstance from '@/Helpers/Axios'
import { EventsData } from '../Interface/Events'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';

export const useFetchEvent = () => {
    const { currentUser } = useAuth()
  
    const isAdminOrHR = currentUser?.role === 'hr' || currentUser?.role === 'admin'
    const currentUserId = currentUser?._id
  
    const fetchEvents = async (
      search: string,
      pageParam: number,
    ): Promise<{ data: EventsData[]; totalPages: number }> => {
      const limit = 6
      const baseUrl = isAdminOrHR ? '/event' : `/event/user/${currentUserId}`
      
      try {
        const response = await AxiosInstance.get(
          `${baseUrl}?search=${search}&page=${pageParam}&limit=${limit}`
        )
        
        return response.data
      } catch (error) {
        console.error('Error fetching events:', error)
        throw error
      }
    }
  
    return { fetchEvents }
  }

