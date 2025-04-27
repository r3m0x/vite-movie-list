import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { userApi } from "../services/user";
import { Ticket } from "../types/ticket";

export const useTickets = () => {
  return useQuery<Ticket[], Error>({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response: AxiosResponse<Ticket[]> = await userApi.getMyBookings();
      return response?.data || [];
    },
  });
};