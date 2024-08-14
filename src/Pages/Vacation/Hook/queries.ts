import AxiosInstance from '@/Helpers/Axios'

export const getAllVacations = async () => {
  const res = await AxiosInstance.get('/vacation')
  return res.data
}
