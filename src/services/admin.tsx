import { getReq, postReq, putReq, deleteReq } from "../common/util";
import { Movie } from "../types/movie";
import { CommonResp } from "../types/resp";

export const getAdminMoviesList = async (): Promise<Movie[]> => {
    try {
        const response = await getReq<Movie[]>("admin/getMoviesList");
        return response;
    } catch (error) {
        console.error("Error fetching list of movies:", error);
        throw error;
    }
};

export const addAdminMovie = async (
    addAdminMovie: Movie
): Promise<CommonResp> => {
    try {
        const response = await postReq<CommonResp>(
            "admin/addMovie",
            addAdminMovie
        );
        return response;
    } catch (error) {
        console.error("Error creating movie:", error);
        throw error;
    }
};


export const updateAdminMovie = async (
    updateMovie: Partial<Movie>
): Promise<CommonResp> => {
    try {
        const response = await putReq<CommonResp>(
            "admin/updateMovie",
            updateMovie
        );
        return response;
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
};

export const deleteAdminMovie = async (
    movieId: string
): Promise<CommonResp> => {
    try {
        const response = await deleteReq<CommonResp>(
            "admin/deleteMovie",
            movieId
        );
        return response;
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};
