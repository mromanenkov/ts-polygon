import { createStore, Store } from 'redux';
import { rootReducer } from './reducers/reducers';

export interface IColorState {
  base: string;
  collision: string;
}

export interface IState {
  color: IColorState;
  polygons: string[];
  canvas: string;
}

export const initialState: IState = {
  color: {
    base: '#fff',
    collision: '#f00',
  },
  polygons: [
    'polyA', 'polyB', 'polyC', 'polyD',
  ],
  canvas: 'canvasId',
};

export const store: Store<IState> = createStore(rootReducer, initialState);
