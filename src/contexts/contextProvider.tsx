// context/MovieProvider.tsx
import { createContext } from 'react';

import { initialState, RootState } from '../reducer/rootReducer';
import { MovieAction } from '../reducer/movieReducer';
import { TicketAction } from '../reducer/ticketReducer';

export const rootContext = createContext<{
  state: RootState;
  dispatch: React.Dispatch<MovieAction | TicketAction>;
}>({
  state: initialState,
  dispatch: () => null,
});