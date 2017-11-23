import ISetting from './canvas-setting.interface';
import IPolygon from './polygon.interface';

export default interface ICanvas {
  id: string;
  setting: ISetting;
  objects: IPolygon[];
  selectedObject: IPolygon;
  element: any;
  ctx: CanvasRenderingContext2D;
  nextObjListPos?: number[];

  init(): any;
  add(object: IPolygon): void;
  addArr(objectArr: IPolygon[]): void;
  draw(object: IPolygon, isFill?: boolean): void;
  update(): void;
  getSelectedObject(cursorPos: number[]): IPolygon;
}
