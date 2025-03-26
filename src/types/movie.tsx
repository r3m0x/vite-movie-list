import { Slot } from "./slot";

interface Movie {
    id: number;
}

interface MovieDetails {
    title: string;
    description?: string;
    duration?: number;
    availableSeatsCount: number;
    showtime: Slot[]
}

export interface MovieListingItemType extends Movie, MovieDetails { };