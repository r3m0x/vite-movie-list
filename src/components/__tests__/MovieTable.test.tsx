import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieTable from "../MovieTable";
import { Movie } from "../../types/movie";

// Mock data for testing
const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Movie 1",
    description: "Description 1",
    rating: 4,
    showtime: new Date(2023, 11, 25, 18, 0).toISOString(),
    totalSeatsCount: 100,
    availableSeatsCount: 50,
  },
  {
    id: "2",
    title: "Movie 2",
    description: "Description 2",
    rating: 5,
    showtime: new Date(2023, 11, 26, 20, 0).toISOString(),
    totalSeatsCount: 80,
    availableSeatsCount: 30,
  },
  {
    id: "3",
    title: "Another Movie",
    description: "Description 3",
    rating: 3,
    showtime: new Date(2023, 11, 27, 15, 0).toISOString(),
    totalSeatsCount: 120,
    availableSeatsCount: 0,
  },
];

describe("MovieTable", () => {
  it("renders the correct number of movies initially", () => {
    render(<MovieTable movies={mockMovies} />);

    // Check if all movies are rendered in the table
    const movieRows = screen.getAllByRole("row");
    // First row is the header, so we expect mockMovies.length + 1 rows
    expect(movieRows.length).toBe(mockMovies.length + 1);
  });

  it("filters movies by title correctly", () => {
    render(<MovieTable movies={mockMovies} />);

    // Filter by title "Movie"
    const titleInput = screen.getByPlaceholderText("Filter by title...");
    fireEvent.change(titleInput, { target: { value: "Movie 1" } });

    // Check filtered count - should only show movies with "Movie" in the title
    const movieRows = screen.getAllByRole("row");
    expect(movieRows.length - 1).toBe(1); // 2 movies have "Movie" in the title
  });

  it("filters movies by rating correctly", () => {
    render(<MovieTable movies={mockMovies} />);

    // Filter by rating 5
    const ratingSelect = screen.getByLabelText("Rating");
    fireEvent.change(ratingSelect, { target: { value: "5" } });

    // Check filtered count - should only show movies with rating 5
    const movieRows = screen.getAllByRole("row");
    expect(movieRows.length - 1).toBe(1); // Only 1 movie has rating 5
  });

  it("filters movies by available seats correctly", () => {
    render(<MovieTable movies={mockMovies} />);

    // Filter by available seats
    const availableSeatsCheckbox = screen.getByLabelText("Has available seats");
    fireEvent.click(availableSeatsCheckbox);

    // Check filtered count - should only show movies with available seats
    const movieRows = screen.getAllByRole("row");
    expect(movieRows.length - 1).toBe(2); // 2 movies have available seats
  });

  it("combines multiple filters correctly", () => {
    render(<MovieTable movies={mockMovies} />);

    // Apply title filter
    const titleInput = screen.getByPlaceholderText("Filter by title...");
    fireEvent.change(titleInput, { target: { value: "Movie" } });

    // Apply rating filter
    const ratingSelect = screen.getByLabelText("Rating");
    fireEvent.change(ratingSelect, { target: { value: "4" } });

    // Check filtered count - should only show movies with "Movie" in title and rating 4
    const movieRows = screen.getAllByRole("row");
    expect(movieRows.length - 1).toBe(1); // Only 1 movie matches both criteria
  });
});
