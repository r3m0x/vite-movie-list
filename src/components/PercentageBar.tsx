import { Movie } from "../types/movie"

interface PercentageBarProp {
    movie: Movie,
    availablePercentage: number
}
const PercentageBar: React.FC<PercentageBarProp> = ({ movie, availablePercentage }) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{movie.availableSeatsCount}/{movie.totalSeatsCount}</span>
                <span className={`text-xs font-medium ${availablePercentage > 50 ? 'text-green-600' :
                    availablePercentage > 20 ? 'text-yellow-600' :
                        'text-red-600'
                    }`}>
                    {Math.round(availablePercentage)}%
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`h-2 rounded-full ${availablePercentage > 50 ? 'bg-green-500' :
                        availablePercentage > 20 ? 'bg-yellow-500' :
                            'bg-red-500'
                        }`}
                    style={{ width: `${availablePercentage}%` }}
                ></div>
            </div>
        </div>
    )
};

export default PercentageBar;
