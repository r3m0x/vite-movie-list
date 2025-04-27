import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import AdminMovieFormPage from "../../page/admin/movie-form";

export const Route = createFileRoute("/admin/movies")({
  component: AdminMovieFormPage,
  validateSearch: z.object({
    movieId: z.string().optional(),
  }),
  staticData: {
    label: "Manage Movies",
    hideInNav: true,
  },
});
