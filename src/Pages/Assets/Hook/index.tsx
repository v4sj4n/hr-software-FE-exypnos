import { useContext, useEffect } from "react";
import { Asset, UserWithAsset } from "../TAsset";
import { AssetsContext } from "../AssetsContext";
import { useFetch } from "@/Hooks/useFetch";

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
