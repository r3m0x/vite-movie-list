import { z } from "zod";

export const movieDetailsSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
  totalSeatsCount: z.number().int().min(1, "Total seats must be at least 1"),
  availableSeatsCount: z.number().int().min(0, "Available seats must be at least 0"),
});

export const showtimeSchema = z.object({
  showtime: z.string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      {
        message: "Showtime must be a valid date format",
      }
    ),
});

export const movieSchema = movieDetailsSchema.merge(showtimeSchema);

export type MovieFormData = z.infer<typeof movieSchema>;