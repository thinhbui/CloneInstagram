
import { types } from './types';

export const actions = {
    add: (item) => {
        return { type: types.ADD, payload: item };
    },
    delete: (item) => {
        return { type: types.DELETE, payload: item };
    },
};
