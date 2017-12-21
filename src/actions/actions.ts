import { Action } from 'redux';

export enum TypeKeys {
  SET_COLOR = 'SET_COLOR',
  ADD_POLYGON = 'ADD_POLYGON',
  REMOVE_POLYGON = 'REMOVE_POLYGON',
  SET_CANVAS = 'SET_CANVAS',
}

interface ISetColorAction extends Action {
  type: TypeKeys.SET_COLOR;
  color: {baseColor: string, collisionColor: string};
}

interface IAddPolugonAction extends Action {
  type: TypeKeys.ADD_POLYGON;
  polygon: string;
}

interface IRemovePolygonAction extends Action {
  type: TypeKeys.REMOVE_POLYGON;
  index: number;
}

interface ISetCanvasAction extends Action {
  type: TypeKeys.SET_CANVAS;
  canvasId: string;
}

export type ActionTypes =
  | ISetColorAction
  | IAddPolugonAction
  | IRemovePolygonAction
  | ISetCanvasAction;

export const setColors = (baseColor: string, collisionColor: string): ActionTypes => {
  return {
    type: TypeKeys.SET_COLOR,
    color: { baseColor, collisionColor },
  };
};

export const removePolygon = (): ActionTypes  => {
  return { type: TypeKeys.REMOVE_POLYGON, index: 0 };
};
