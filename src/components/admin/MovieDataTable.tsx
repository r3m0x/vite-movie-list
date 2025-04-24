import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
} from '@tanstack/react-table';
import { Movie } from '../../types/movie'; // Adjust path if necessary
import axios from 'axios';

// Helper function to fetch movies
const fetchMovies = async (): Promise<Movie[]> => {
    const response = await axios.get<Movie[]>('http://localhost:8080/api/getMoviesList');
    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }
    return response.data;
};

// Column Helper for type safety
const columnHelper = createColumnHelper<Movie>();

// Reusable Filter Component
function Filter({
    column,
    table,
}: {
    column: any;
    table: any;
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                onChange={e =>
                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded px-1 text-xs"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ''}
                onChange={e =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded px-1 text-xs"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-full border shadow rounded px-1 text-xs"
        />
    );
}


export const MovieDataTable = () => {
    

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns = useMemo(() => [
        columnHelper.accessor('title', {
            header: 'Title',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('rating', {
            header: 'Rating',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('showtime', {
            header: 'Showtime',
            cell: info => new Date(info.getValue()).toLocaleString(), // Format date
        }),
        columnHelper.accessor('totalSeatsCount', {
            header: 'Total Seats',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('availableSeatsCount', {
            header: 'Available Seats',
            cell: info => info.getValue(),
        }),

        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: props => (
                <button onClick={() => alert(`Editing ${props.row.original.title}`)} className="text-blue-500 hover:underline text-xs">
                    Edit
                </button>
            ),
        }),
    ], []);

    const table = useReactTable({
        data: movies,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true, // Enable debug logs in console
        debugHeaders: true,
        debugColumns: true,
    });

    if (isLoading) return <div className="text-center p-4">Loading movies...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error loading movies: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="px-4 py-2 border-b border-gray-200 text-left font-semibold text-gray-600"
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none flex items-center justify-between'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: <span className="ml-1 text-xs">🔼</span>,
                                                desc: <span className="ml-1 text-xs">🔽</span>,
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    )}
                                    {header.column.getCanFilter() ? (
                                        <div className="mt-1">
                                            <Filter column={header.column} table={table} />
                                        </div>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 py-2 border-b border-gray-200">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="h-4" /> {/* Spacer */}
        </div>
    );
};