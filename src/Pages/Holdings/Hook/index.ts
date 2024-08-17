import { FormEvent, useContext } from "react";
import { HoldingsContext } from "../HoldingsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHoldings,
  getUserHoldings,
  handleItemAssign,
  handleItemReturn,
} from "./queries";

export const useEmployeesWithHoldings = () => {
  const { searchParams } = useContext(HoldingsContext);
  return useQuery({
    queryKey: [
      "usersWithHoldings",
      searchParams.get("users"),
      searchParams.get("search"),
    ],
    queryFn: () =>
      getHoldings(
        searchParams.get("users") || "",
        searchParams.get("search") || "",
      ),
  });
};

export const useGetUserHoldings = () => {
  const { searchParams } = useContext(HoldingsContext);
  return useQuery({
    queryKey: ["userHoldings", searchParams.get("selectedHolding")],
    queryFn: () =>
      getUserHoldings(searchParams.get("selectedHolding") as string),
  });
};

export const useHandleItemAssigner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      event,
      assetId,
      userId,
    }: {
      event: FormEvent<HTMLFormElement>;
      assetId: string;
      userId: string;
    }) => handleItemAssign(event, assetId, userId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["usersWithHoldings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userHoldings"],
      });
    },
  });
};

export const useHandleItemReturner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      event,
      assetId,
      status,
    }: {
      event: FormEvent<HTMLFormElement>;
      assetId: string;
      status: string;
    }) => handleItemReturn(event, assetId, status),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["usersWithHoldings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userHoldings"],
      });
    },
  });
};
