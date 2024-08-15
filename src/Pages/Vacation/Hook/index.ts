import { useQuery } from "@tanstack/react-query";
import { getAllVacations, getVacation } from "./queries";
import { useContext } from "react";
import { VacationContext } from "../VacationContext";

export const useGetVacations = () => {
  const allVacations = useQuery({
    queryKey: ["vacations"],
    queryFn: getAllVacations,
  });
  return allVacations;
};

export const useGetVacation = (id: string) => {
  const { searchParams } = useContext(VacationContext);
  const singleVacation = useQuery({
    queryKey: ["vacation", id, searchParams.get("selectedVacation") as string],
    queryFn: () => getVacation(id),
  });
  return singleVacation;
};
