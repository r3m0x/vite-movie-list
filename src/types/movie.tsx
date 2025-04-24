export interface Movie {
    id: string;
    title: string;
    description?: string;
    rating?: number;
    showtime: string;
    totalSeatsCount: number;
    availableSeatsCount: number;
}