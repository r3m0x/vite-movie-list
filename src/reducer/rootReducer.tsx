import movieReducer, { MovieAction, MovieState, initialState as movieInitialState } from "./movieReducer";
import ticketReducer, { TicketAction, TicketState, initialState as ticketInitialState } from "./ticketReducer";

export interface RootState {
    movies: MovieState;
    tickets: TicketState;
}

export const initialState: RootState = {
    movies: movieInitialState,
    tickets: ticketInitialState
};



const rootReducer = (state: RootState, action: MovieAction | TicketAction): RootState => ({
    movies: movieReducer(state.movies, action as MovieAction),
    tickets: ticketReducer(state.tickets, action as TicketAction),
});

export default rootReducer;