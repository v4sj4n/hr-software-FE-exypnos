import { useContext, useEffect } from "react";
import { Asset, UserWithAsset } from "../TAsset";
import { AssetsContext } from "../AssetsContext";
import { useFetch } from "@/Hooks/useFetch";
import { User } from "@/Context/AuthProvider";

export const useAllAssets = () => {
  const { data, error, loading } = useFetch<Asset[]>("/asset", 10);
  const { setAssets } = useContext(AssetsContext);

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

export const useGetUsersWithAssets = () => {
  const { data, error, loading } = useFetch<UserWithAsset[]>("/asset/user", 30);
  const { setUsersWithAssets } = useContext(AssetsContext);

  useEffect(() => {
    if (data) {
      setUsersWithAssets(data);
    }
  }, [data, setUsersWithAssets]);

  return {
    error,
    loading,
  };
};

export const useOneAsset = <T,>(serial: string) => {
  const { data, error, loading } = useFetch<T>(`/asset/sn/${serial}`);

  return {
    data,
    error,
    loading,
  };
};

export const useGetUsers = () => {
  const { data, error, loading } = useFetch<User[]>("/user", 30);

  return {
    data,
    error,
    loading,
  };
};
