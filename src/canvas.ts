import utils from './utils';
import Polygon from './polygon';

import ISetting from './interfaces/canvas-setting.interface';

export default class Canvas {
  id: string;
  setting: ISetting;
  objects: Polygon[];
  selectedObject: Polygon;
  element: any;
  ctx: CanvasRenderingContext2D;
  nextObjListPos: number[];

  constructor(id: string, setting: ISetting, objects?: Polygon[]) {
    this.id = id;
    this.setting = setting;
    this.objects = objects || [];
    this.selectedObject = null;
    this.element = document.getElementById(id);
    this.ctx = this.element.getContext('2d');
    this.nextObjListPos = [this.setting.padding, this.setting.padding];
  }

  public init(): any {
    this.element.width = this.setting.width;
    this.element.height = this.setting.height;
  }

  public add(object: Polygon): void {
    this.objects.push(object);
    object.setBoundingBox();

    const offset = [this.nextObjListPos[0] - object.boundingBox[0][0],
      this.nextObjListPos[1] - object.boundingBox[0][1]];

    object.shift(offset);
    object.setBoundingBox();
    this.nextObjListPos[1] = object.boundingBox[object.boundingBox.length - 1][1] +
      this.setting.polygonMargin;
    this.update();
  }

  public addArr(objectArr: Polygon[]): void {
    objectArr.forEach((object) => {
      this.add(object);
    });
  }

  public draw(object: Polygon, isFill?: boolean): void {
    this.ctx.fillStyle = object.fillColor;
    this.ctx.strokeStyle = object.strokeColor;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(object.points[0][0], object.points[0][1]);
    object.points.forEach((point) => {
      this.ctx.lineTo(point[0], point[1]);
    });
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();

    if (isFill) this.ctx.fill();
  }

  public update(): void {
    this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

    this.findAllIntersectObjects();
    this.checkVertexInPolyAll();

    this.objects.forEach((object) => {
      object.isOverlap ? this.draw(object, true) : this.draw(object);
    });
  }

  public getSelectedObject(cursorPos: number[]): Polygon {
    let selectedObject: Polygon;
    this.objects.forEach((object) => {
      const isInside = utils.isPointInPoly(cursorPos, object.points);
      if (isInside) selectedObject = object;
    });
    return selectedObject;
  }


  private checkVertexInPoly(polyA: Polygon, polyB: Polygon): boolean {
    let isInPoly = false;

    polyA.points.forEach((point) => {
      isInPoly = utils.isPointInPoly(point, polyB.points);
      if (isInPoly) {
        isInPoly = true;
        return false;
      }
    });
    polyB.points.forEach((point) => {
      isInPoly = utils.isPointInPoly(point, polyA.points);
      if (isInPoly) {
        isInPoly = true;
        return false;
      }
    });

    return isInPoly;
  }

  private checkVertexInPolyAll(): void {
    for (let i = 0; i < this.objects.length; i++) {
      const objectA: Polygon = this.objects[i];

      for (let j = 0; j < this.objects.length; j++) {
        if (i === j) continue;
        const objectB: Polygon = this.objects[j];
        const isInPoly: boolean = this.checkVertexInPoly(objectA, objectB);

        if (isInPoly) {
          objectA.isOverlap = true;
          objectB.isOverlap = true;
        }
      }
    }
  }

  private checkSideIntersection(polyA: Polygon, polyB: Polygon): boolean {
    const pointsAcopy: number[][] = JSON.parse(JSON.stringify(polyA.points));
    const pointsBcopy: number[][] = JSON.parse(JSON.stringify(polyB.points));

    const polyAcopy: Polygon = new Polygon(pointsAcopy);
    const polyBcopy: Polygon = new Polygon(pointsBcopy);

    polyAcopy.points.push(polyAcopy.points[0]);
    polyBcopy.points.push(polyBcopy.points[0]);

    let isIntersect: boolean = false;
    for (let i = 0; i < polyAcopy.points.length - 1; i++) {
      const sideA: number[][] = [polyAcopy.points[i], polyAcopy.points[i + 1]];

      for (let j = 0; j < polyBcopy.points.length - 1; j++) {
        const sideB: number[][] = [polyBcopy.points[j], polyBcopy.points[j + 1]];

        isIntersect = utils.getIntersection(sideA, sideB);
        if (isIntersect) return true;
      }
    }
    return isIntersect;
  }

  private findOverlappedObject(polyA: Polygon, polyB: Polygon): boolean {
    let isOverlap: boolean = false;
    if (this.checkSideIntersection(polyA, polyB) || this.checkVertexInPoly(polyA, polyB)) {
      isOverlap = true;
    }
    return isOverlap;
  }


  private findAllIntersectObjects(): void {
    const overlapObjectIndeces: number[] = [];
    for (let i = 0; i < this.objects.length; i++) {
      const objectA: Polygon = this.objects[i];

      for (let j = i + 1; j < this.objects.length; j++) {
        const objectB: Polygon = this.objects[j];

        if (this.checkSideIntersection(objectA, objectB)) {
          overlapObjectIndeces.push(i);
          overlapObjectIndeces.push(j);
        }
      }
    }
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].isOverlap = overlapObjectIndeces.indexOf(i) >= 0;
    }
  }
}
