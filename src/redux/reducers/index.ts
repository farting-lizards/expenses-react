import { combineReducers } from 'redux';
import expenses from './expenses';

export const rootReducer = combineReducers({ expenses });

// export type RootState = ReturnType<typeof rootReducer>;
