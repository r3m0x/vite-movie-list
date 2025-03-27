import { useReducer, useMemo } from "react";
import { rootContext } from "../contexts/contextProvider";
import rootReducer, { initialState } from "../reducer/rootReducer";

export const RootContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <rootContext.Provider value={value}>
            {children}
        </rootContext.Provider>
    );
};