import * as Actions from '../actions/actions';
import { IState, IColorState, initialState } from '../store'; 
import { combineReducers, Reducer } from 'redux';

export const rootReducer = (
  state: IState, action: Actions.ActionTypes): IState => {

  return {
    color: colorReducer(state.color, action),
    polygons: polygonReducer(state.polygons, action),
    canvas: canvasReducer(state.canvas, action),
  };
};

export const polygonReducer = (state: string[] = [], action: Actions.ActionTypes): string[] => {
  switch (action.type) {
    case Actions.TypeKeys.ADD_POLYGON:
      return [...state, action.polygon];
    case Actions.TypeKeys.REMOVE_POLYGON:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

export const canvasReducer = (state: string = '', action: Actions.ActionTypes): string => {
  switch (action.type) {
    case Actions.TypeKeys.SET_CANVAS: 
      return action.canvasId;
    default:
      return state;
  }
};

export const colorReducer = (
  state: IColorState = initialState.color, action: Actions.ActionTypes): IColorState => {

  switch (action.type) {
    case Actions.TypeKeys.SET_COLOR:
      return Object.assign({}, state, {
        base: action.color.baseColor,
        collision: action.color.collisionColor,
      });
    default:
      return state;
  }
};
/*
export const rootReducer = combineReducers<IState>({
  color: colorReducer,
  polygons: polygonReducer,
  canvas: canvasReducer,
});
*/
