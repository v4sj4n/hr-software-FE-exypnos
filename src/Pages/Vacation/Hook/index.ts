import { useQuery } from "@tanstack/react-query";
import { getAllVacations, getVacation } from "./queries";

export const useGetVacations = () => {
  const allVacations = useQuery({
    queryKey: ["vacations"],
    queryFn: getAllVacations,
  });
  return allVacations;
};

export const useGetVacation = (id: string) => {
  const singleVacation = useQuery({
    queryKey: ["vacation", id],
    queryFn: () => getVacation(id),
  });
  return singleVacation;
};
