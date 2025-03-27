export interface LoginState {
    isLoggedIn: boolean
}

export const initialState: LoginState = {
    isLoggedIn: false
};

// Action type definitions
export type LoginAction =
    | { type: 'LOGIN'; }
    | { type: 'LOGOUT'; }


const loginReducer = (
    state: LoginState,
    action: LoginAction
): LoginState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, isLoggedIn: true,
            };

        case 'LOGOUT': {
            return {
                ...state, isLoggedIn: false,
            };
        }

        default:
            return state;
    }
};

export default loginReducer;