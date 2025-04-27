import { useCallback, useMemo, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { Ticket } from '../types/ticket';

export interface MovieFilterOptions {
  titleFilter: string;
  showtimeFilter: string;
}

export const useTicketFilters = (tickets: Ticket[]) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [showtimeFilter, setShowtimeFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const filterByTitle = useCallback((ticket: Ticket) => {
    return !titleFilter || ticket.movie_title.toLowerCase().includes(titleFilter.toLowerCase());
  }, [titleFilter]);

  const filterByShowtime = useCallback((ticket: Ticket) => {
    if (!showtimeFilter) return true;

    const showtime = new Date(ticket.movie_showtime);
    const now = new Date();

    if (showtimeFilter === 'upcoming') {
      return showtime >= now;
    }
    return true;
  }, [showtimeFilter]);

  const filteredData = useMemo(() => {
    return tickets?.filter((ticket) => {
      return (
        filterByTitle(ticket) &&
        filterByShowtime(ticket)
      );
    });
  }, [tickets, filterByTitle, filterByShowtime]);

  return {
    filters: {
      titleFilter,
      showtimeFilter,
      sorting,
    },
    setters: {
      setTitleFilter,
      setShowtimeFilter,
      setSorting,
    },
    filteredData,
  };
};