import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import AdminMovieFormPage from "../../page/admin/movie-form";
import { AuthChecker } from "../../components/common/AuthChecker";

export const Route = createFileRoute("/admin/movies")({
  component: () => (
    <AuthChecker requiredLogin={true} requireAdmin={true}>
      <AdminMovieFormPage />
    </AuthChecker>
  ),
  validateSearch: z.object({
    movieId: z.string().optional(),
  }),
  staticData: {
    label: "Manage Movies",
    hideInNav: true,
  },
});
