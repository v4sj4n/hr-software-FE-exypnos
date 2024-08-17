import AxiosInstance from "@/Helpers/Axios";
import { FormEvent } from "react";

export const getHoldings = async (users: string, search: string) => {
  const res = await AxiosInstance.get(
    `/asset/user?users=${users}&search=${search}`,
  );
  return res.data;
};

export const getUserHoldings = async (userId: string) => {
  const res = await AxiosInstance.get(`/asset/user/${userId}`);
  return res.data;
};

export const handleItemReturn = async (
  event: FormEvent<HTMLFormElement>,
  assetId: string,
  status: string,
) => {
  event.preventDefault();
  const payload = {
    userId: null,
    returnDate: new Date().toISOString(),
    status,
  };
  await AxiosInstance.patch(`/asset/${assetId}`, payload);
};

export const handleItemAssign = async (
  event: FormEvent<HTMLFormElement>,
  assetId: string,
  userId: string,
) => {
  event.preventDefault();
  const payload = {
    userId,
    takenDate: new Date().toISOString(),
  };
  await AxiosInstance.patch(`/asset/${assetId}`, payload);
};
