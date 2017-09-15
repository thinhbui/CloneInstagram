import { types } from '../actions/types';

const initialState = {
    rows: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ],
};

export const reducer = (state = initialState, action) => {
    const { rows } = state;
    const { type, payload } = action;
    switch (type) {
        case types.ADD: {
            return {
                ...state,
                rows: [payload, ...rows],
            };
        }
        case types.DELETE: {
            return {
                ...state,
                rows: rows.filter((item) => item !== payload),
            };
        }
    }
    return state;
};
