import AxiosInstance from "@/Helpers/Axios";

export const getAllVacations = async () => {
  const res = await AxiosInstance.get("/vacation");
  return res.data;
};

export const getVacation = async (id: string) => {
  const res = await AxiosInstance.get(`/vacation/${id}`);
  return res.data;
};
