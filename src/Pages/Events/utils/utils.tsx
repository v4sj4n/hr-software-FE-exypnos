import { debounce } from '@/Helpers/debounce.ts'
import AxiosInstance from '@/Helpers/Axios';
import { EventsData } from '../Interface/Events';

export const fetchEvents = async (search: string,pageParam: number): Promise<EventsData[]> => {
  const Limit = 6
  const response = await AxiosInstance.get<EventsData[]>(`/event?search=${search}&page=${pageParam}&limit=${Limit}`);
  console.log("urllll",`/event?search=${search}&page=${pageParam}&limit=${Limit}` )
  console.log('Fetched events:', response.data);
  return response.data;
};

export const debouncedSetSearchParams = (setSearchParams: Function) => {
  return debounce((value: string) => {
    setSearchParams((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set('search', value);
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
  }, 500);
};