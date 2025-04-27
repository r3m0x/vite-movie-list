import { useCallback, useMemo, useState } from 'react';
import { Movie } from '../types/movie';
import { SortingState } from '@tanstack/react-table';

export interface MovieFilterOptions {
  titleFilter: string;
  ratingFilter: string;
  hasAvailableSeatsFilter: boolean;
  showtimeFilter: string;
}

export const useMovieFilters = (movies: Movie[]) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [hasAvailableSeatsFilter, setHasAvailableSeatsFilter] = useState(false);
  const [showtimeFilter, setShowtimeFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const filterByTitle = useCallback((movie: Movie) => {
    return !titleFilter || movie.title.toLowerCase().includes(titleFilter.toLowerCase());
  }, [titleFilter]);

  const filterByRating = useCallback((movie: Movie) => {
    return !ratingFilter || movie.rating === parseInt(ratingFilter);
  }, [ratingFilter]);

  const filterByAvailableSeats = useCallback((movie: Movie) => {
    return !hasAvailableSeatsFilter || movie.availableSeatsCount > 0;
  }, [hasAvailableSeatsFilter]);

  const filterByShowtime = useCallback((movie: Movie) => {
    if (!showtimeFilter) return true;

    const showtime = new Date(movie.showtime);
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const tomorrow = new Date(now.setHours(0, 0, 0, 0));
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (showtimeFilter) {
      case 'oneHour':
        return showtime >= now && showtime <= oneHourFromNow;
      case 'tomorrow':
        return showtime >= tomorrow;
      default:
        return true;
    }
  }, [showtimeFilter]);

  const filteredData = useMemo(() => {
    return movies?.filter((movie) => {
      return (
        filterByTitle(movie) &&
        filterByRating(movie) &&
        filterByAvailableSeats(movie) &&
        filterByShowtime(movie)
      );
    });
  }, [movies, filterByRating, filterByTitle, filterByAvailableSeats, filterByShowtime]);

  return {
    filters: {
      titleFilter,
      ratingFilter,
      hasAvailableSeatsFilter,
      showtimeFilter,
      sorting,
    },
    setters: {
      setTitleFilter,
      setRatingFilter,
      setHasAvailableSeatsFilter,
      setShowtimeFilter,
      setSorting,
    },
    filteredData,
  };
};