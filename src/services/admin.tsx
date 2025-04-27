import { Movie } from "../types/movie";
import { api } from "./common/api";

// Movies API
export const adminApi = {
  getMoviesList: () => api.get(`admin/getMoviesList`),
  addMovie: (movie: Movie) => api.post(`admin/addMovie`, movie),
  updateMovie: (id: string, changes: Partial<Movie>) =>
    api.put(`admin/updateMovie`, {
      match: { id },
      ...changes,
    }),
  deleteMovie: (movieId: string) =>
    api.delete(`admin/deleteMovie?id=${movieId}`),
};
