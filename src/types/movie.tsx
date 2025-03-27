export interface Movie {
    id: string;
    title: string;
    description?: string;
    totalSeatsCount: number;
    availableSeatsCount: number;
}