import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Movie } from '../types/movie';
import TablePagination from './TablePagination';
import { useMemo } from 'react';
import Utils from '../common/utils';
import PercentageBar from './PercentageBar';
import { useMovieFilters } from '../hooks/useMovieFilters';

export interface MovieTableButton<T> {
  label: string;
  action: (row: T, seatCount?: number) => void;
  seatCountRequired: boolean;
}

interface MovieTableProps {
  movies: Movie[];
  buttons?: MovieTableButton<Movie>[];
  onSelectMovie?: (movie: Movie) => void;
  selectedMovieId?: string;
}

const MovieTable: React.FC<MovieTableProps> = ({ 
  movies, 
  buttons = [],
  // onSelectMovie,
  // selectedMovieId 
}) => {
  const pageSize = Utils.range(10, 30, 10);
  const ratings = Utils.range(1, 5);
  const showTimeOptions = [
    { label: 'Within the next hour', value: 'oneHour' },
    { label: 'Tomorrow onwards', value: 'tomorrow' },
  ]

  // Use the extracted filter hook
  const { filters, setters, filteredData } = useMovieFilters(movies);
  const {
    titleFilter,
    ratingFilter,
    hasAvailableSeatsFilter,
    showtimeFilter,
    sorting
  } = filters;
  const {
    setTitleFilter,
    setRatingFilter,
    setHasAvailableSeatsFilter,
    setShowtimeFilter,
    setSorting
  } = setters;

  // Define columns
  const columns: ColumnDef<Movie>[] = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: info => info.getValue(),
      footer: props => props.column.id,
      enableSorting: true,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: info => info.getValue() || '-',
      enableSorting: false,
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: info => info.getValue() ? `${info.getValue()}/5` : '-',
      enableSorting: true,
    },
    {
      accessorKey: 'showtime',
      header: 'Showtime',
      cell: info => {
        const date = new Date(info.getValue() as string);
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      },
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = new Date(rowA.getValue(columnId) as string);
        const dateB = new Date(rowB.getValue(columnId) as string);
        return dateA.getTime() - dateB.getTime();
      },
      
    },
    {
      id: 'seats',
      header: 'Seats',
      accessorFn: (row) => `${row.availableSeatsCount}/${row.totalSeatsCount}`,
      cell: (info) => {
        const movie = info.row.original;
        const availablePercentage = (movie.availableSeatsCount / movie.totalSeatsCount) * 100;
        return (
          <PercentageBar movie={movie} availablePercentage={availablePercentage} />
        );
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const percentA = rowA.original.availableSeatsCount / rowA.original.totalSeatsCount;
        const percentB = rowB.original.availableSeatsCount / rowB.original.totalSeatsCount;
        return percentA - percentB;
      },
    },
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-6 p-5 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filters
        </h3>
        <div className="flex flex-wrap gap-6 items-start">
          {/* Title filter */}
          <div className="flex-1 min-w-[200px] group">
            <label htmlFor="title-filter" className="block text-left text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
              Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="title-filter"
                type="text"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                placeholder="Filter by title..."
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Rating filter */}
          <div className="w-40 group">
            <label htmlFor="rating-filter" className="block text-left text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
              Rating
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <select
                id="rating-filter"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none"
              >
                <option value="">All ratings</option>
                {ratings.map(rating => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Showtime filter */}
          <div className="w-48 group">
            <label htmlFor="showtime-filter" className="block text-left text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
              Showtime
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <select
                id="showtime-filter"
                value={showtimeFilter}
                onChange={(e) => setShowtimeFilter(e.target.value)}
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none"
              >
                <option value="">Any time</option>
                {showTimeOptions.map(showTimeOption => (
                  <option key={showTimeOption.value} value={showTimeOption.value}>
                    {showTimeOption.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Available seats filter */}
          <div className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm h-[42px] mt-6 hover:border-indigo-500 transition-colors">
            <input
              id="available-seats-filter"
              type="checkbox"
              checked={hasAvailableSeatsFilter}
              onChange={(e) => setHasAvailableSeatsFilter(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="available-seats-filter" className="ml-2 block text-sm text-gray-700">
              Has available seats
            </label>
          </div>
        </div>
      </div>

      <TablePagination table={table} pageSize={pageSize} />

      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${header.column.getCanSort()
                      ? 'text-indigo-700 hover:text-indigo-900 cursor-pointer'
                      : 'text-gray-700 cursor-default'
                      }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center h-5">
                      <span className="truncate">{header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}</span>
                      {header.column.getCanSort() && (
                        <span className="text-indigo-500 font-bold inline-block w-4 ml-1 flex-shrink-0">
                          {{
                            asc: '↑',
                            desc: '↓',
                            false: '↕'
                          }[header.column.getIsSorted() as string || 'false']}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {buttons.length > 0 && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowCount() === 0 ? (
              <tr>
                <td colSpan={buttons.length > 0 ?
                  table.getHeaderGroups().flatMap(headerGroup => headerGroup.headers).length + 1
                  :
                  table.getHeaderGroups().flatMap(headerGroup => headerGroup.headers).length} className="px-6 py-4 text-sm text-gray-700">
                  No movies found.
                </td>
              </tr>
            ) :
              (table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-left text-sm text-gray-700 overflow-hidden">
                      <div className="truncate">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                  {buttons.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {buttons.map((button, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {button.seatCountRequired && (
                              <div className="flex items-center">
                                <label htmlFor={`seat-count-${row.id}`} className="sr-only">Seat Count</label>
                                <input
                                  id={`seat-count-${row.id}`}
                                  type="number"
                                  min="1"
                                  max={row.original.availableSeatsCount}
                                  defaultValue={1}
                                  className="w-14 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                                  aria-label="Number of seats to book"
                                />
                              </div>
                            )}
                            <button
                              onClick={() => {
                                if (button.seatCountRequired) {
                                  const seatCountInput = document.getElementById(`seat-count-${row.id}`) as HTMLInputElement;
                                  const seatCount = parseInt(seatCountInput.value) || 1;
                                  button.action(row.original, seatCount);
                                } else {
                                  button.action(row.original);
                                }
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                              {button.label}
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              )))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <TablePagination table={table} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default MovieTable;