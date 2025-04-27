import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { userApi } from "../services/user";
import { Movie } from "../types/movie";

export const useMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response: AxiosResponse<Movie[]> = await userApi.getMoviesList();
      return response?.data || [];
    },
  });
};