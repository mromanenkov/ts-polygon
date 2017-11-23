import Polygon from './polygon';
import Canvas from './canvas';
import Cursor from './cursor';

import IPolygon from './interfaces/polygon.interface';
import ICanvas from './interfaces/canvas.interface';
import ISetting from './interfaces/canvas-setting.interface';
import ICursor from './interfaces/cursor.interface';

const polygonPointsA: number[][] = [[100, 100], [200, 100], [200, 200], [100, 200]];
const polygonPointsB: number[][] = [[300, 400], [450, 300], [470, 370]];
const polygonPointsC: number[][] = [[0, 20], [20, 0], [40, 10], [40, 30], [30, 40]];

const strokeColor: string = '#000';
const fillColor: string = '#f00';
const poly1: IPolygon = new Polygon(polygonPointsA, strokeColor, fillColor);
const poly2: IPolygon = new Polygon(polygonPointsB, strokeColor, fillColor);
const poly3: IPolygon = new Polygon(polygonPointsC, strokeColor, fillColor);

const setting: ISetting = {
  width: window.innerWidth - window.innerWidth * 0.02,
  height: window.innerHeight - window.innerWidth * 0.02,
  padding: 30,
  polygonMargin: 20,
};

const cursor: ICursor = new Cursor();
const canvas: ICanvas = new Canvas('example', setting);

window.addEventListener('load', canvas.init());

const polygons = [poly1, poly2, poly3];
canvas.addArr(polygons);

canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
  cursor.cursorDownPos = [e.offsetX, e.offsetY];
  canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);
});

canvas.element.addEventListener('mouseup', (e: MouseEvent) => {
  cursor.cursorUpPos = [e.offsetX, e.offsetY];
  const offset = cursor.getOffset();

  if (canvas.selectedObject) {
    canvas.selectedObject.shift(offset);
    canvas.update();
  }
  canvas.selectedObject = null;
});

