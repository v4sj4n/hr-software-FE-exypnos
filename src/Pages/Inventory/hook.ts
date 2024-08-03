import AxiosInstance from "@/Helpers/Axios";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { CreateAssetFormFields } from "@/Schemas/Assets/CreateAsset.schema";
import { useContext, useEffect } from "react";
import { InventoryContext } from "./components/InventoryContext";
import { useFetch } from "@/Hooks/useFetch";
import { InventoryItem } from "./InventoryType";

export const useAllAssets = () => {
  const { data, error, loading } = useFetch<InventoryItem[]>("/asset", 10);
  const { setAssets } = useContext(InventoryContext);

  useEffect(() => {
    if (data) {
      setAssets(data);
    }
  }, [data, setAssets]);

  return {
    error,
    loading,
  };
};

export const useOneAsset = <T>(serial: string) => {
  const { data, error, loading } = useFetch<T>(`/asset/sn/${serial}`);

  return {
    data,
    error,
    loading,
  };
};

export const onSubmit = async (
  data,
  { setError, setAssets, handleCloseCreateModalOpen },
) => {
  try {
    const res = await AxiosInstance.post("/asset", data);
    console.log("Asset created successfully:", res.data);
    if (res.status === 201) {
      setAssets((prevAssets) => [...prevAssets, res.data]);
      handleCloseCreateModalOpen();
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      setError("root", {
        message: err?.response?.data?.message,
      });
    } else {
      setError("root", {
        message: "An error occurred while creating the asset",
      });
    }
  }
};
