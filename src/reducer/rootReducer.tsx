import loginReducer, { LoginAction, LoginState, initialState as loginInitialState } from "./loginReducer";
import movieReducer, { MovieAction, MovieState, initialState as movieInitialState } from "./movieReducer";
import ticketReducer, { TicketAction, TicketState, initialState as ticketInitialState } from "./ticketReducer";

export interface RootState {
    login: LoginState;
    movies: MovieState;
    tickets: TicketState;
}

export const initialState: RootState = {
    login: loginInitialState,
    movies: movieInitialState,
    tickets: ticketInitialState
};

const rootReducer = (state: RootState, action: LoginAction | MovieAction | TicketAction): RootState => ({
    login: loginReducer(state.login, action as LoginAction),
    movies: movieReducer(state.movies, action as MovieAction),
    tickets: ticketReducer(state.tickets, action as TicketAction),
});

export default rootReducer;