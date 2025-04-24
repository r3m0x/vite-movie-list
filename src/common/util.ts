import axios, { AxiosResponse } from "axios";

// Keep the Axios instance configuration
export const reqClient = axios.create({
    baseURL: "http://localhost:8080", // Assuming API is served from here
    headers: {
        common: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    },
    responseType: "json",
    withCredentials: false, // Adjust if your API requires credentials/cookies
});

// Rewritten GET request function using async/await
export const getReq = async <T>(URL: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await reqClient.get<T>(`/${URL}`);
        return response.data;
    } catch (error) {
        // Handle or re-throw the error as needed
        console.error(`GET request to /${URL} failed:`, error);
        throw error; // Re-throwing allows callers to handle it
    }
};

// Rewritten POST request function using async/await
export const postReq = async <T>(URL: string, payload: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await reqClient.post<T>(`/${URL}`, payload);
        return response.data;
    } catch (error) {
        console.error(`POST request to /${URL} failed:`, error);
        throw error;
    }
};

// Rewritten PUT request function using async/await
export const putReq = async <T>(URL: string, payload: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await reqClient.put<T>(`/${URL}`, payload);
        return response.data;
    } catch (error) {
        console.error(`PUT request to /${URL} failed:`, error);
        throw error;
    }
};

// Rewritten DELETE request function using async/await
// Note: Sending data in the query string for DELETE might be unconventional.
// APIs often expect an ID in the path (e.g., /resource/id) or sometimes in the body.
// Adjust the URL construction if your API expects the ID differently.
export const deleteReq = async <T>(URL: string, id: string | number): Promise<T> => {
    try {
        // Example assuming ID is part of the path: await reqClient.delete<T>(`/${URL}/${id}`);
        // Current implementation matches original: ID in query param
        const response: AxiosResponse<T> = await reqClient.delete<T>(`/${URL}?id=${encodeURIComponent(id)}`);
        return response.data;
    } catch (error) {
        console.error(`DELETE request to /${URL} for ID ${id} failed:`, error);
        throw error;
    }
};