// context/MovieProvider.tsx
import { createContext } from 'react';

import { initialState, RootState } from '../reducer/rootReducer';
import { MovieAction } from '../reducer/movieReducer';
import { TicketAction } from '../reducer/ticketReducer';
import { LoginAction } from '../reducer/loginReducer';

export const rootContext = createContext<{
  state: RootState;
  dispatch: React.Dispatch<LoginAction | MovieAction | TicketAction>;
}>({
  state: initialState,
  dispatch: () => null,
});