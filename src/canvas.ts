import utils from './utils';
import Polygon from './polygon';
import Vector from './vector';

export interface ISetting {
  width: number;
  height: number;
  padding: number;
  polygonMargin: number;
}

export class Canvas {
  id: string;
  setting: ISetting;
  objects: Polygon[];
  selectedObject: Polygon | null;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  nextObjListPos: Vector;

  constructor(id: string, setting: ISetting, objects?: Polygon[]) {
    this.id = id;
    this.setting = setting;
    this.objects = objects || [];
    this.selectedObject = null;
    this.element = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = this.element.getContext('2d')!;
    this.nextObjListPos = new Vector(this.setting.padding, this.setting.padding);
  }

  public init() {
    this.element.width = this.setting.width;
    this.element.height = this.setting.height;
  }

  public add(object: Polygon): void {
    this.objects.push(object);

    const offset = this.nextObjListPos.substract(object.boundingBox[0]);

    object.shift(offset);
    this.nextObjListPos.y = object.boundingBox[object.boundingBox.length - 1].y +
      this.setting.polygonMargin;
    this.update();
  }

  public addArr(objectArr: Polygon[]): void {
    objectArr.forEach((object) => {
      this.add(object);
    });
  }

  public draw(object: Polygon): void {
    this.ctx.save();
    this.ctx.fillStyle = object.fillColor;
    this.ctx.strokeStyle = object.strokeColor;
    this.ctx.beginPath();
    this.ctx.moveTo(object.vertices[0].x, object.vertices[0].y);
    object.vertices.forEach((vertex) => {
      this.ctx.lineTo(vertex.x, vertex.y);
    });
    this.ctx.closePath();
    this.ctx.stroke();

    if (object.isOverlap) {
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  public update(): void {
    this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);

    this.updateIntersectingObjects();
    this.checkVertexInPolyAll();

    this.objects.forEach((object) => {
      this.draw(object);
    });
  }

  public getSelectedObject(cursorPos: Vector): Polygon | null {
    let selectedObject: Polygon | null = null;
    this.objects.forEach((object) => {
      const isInside = utils.isPointInPoly(cursorPos, object.vertices);
      if (isInside) {
        selectedObject = object;
      }
    });
    return selectedObject;
  }

  private checkVertexInPoly(polyA: Polygon, polyB: Polygon): boolean {
    let isInPoly = false;
    polyA.vertices.forEach((vertex) => {
      isInPoly = utils.isPointInPoly(vertex, polyB.vertices);
      if (isInPoly) {
        isInPoly = true;
      }
    });

    polyB.vertices.forEach((vertex) => {
      isInPoly = utils.isPointInPoly(vertex, polyA.vertices);
      if (isInPoly) {
        isInPoly = true;
      }
    });
    return isInPoly;
  }

  private checkVertexInPolyAll(): void {
    for (let i = 0; i < this.objects.length; i++) {
      const objectA: Polygon = this.objects[i];
      for (let j = 0; j < this.objects.length; j++) {
        if (i === j) {
          continue;
        }
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
    const polyAcopy: Polygon = polyA.clone();
    const polyBcopy: Polygon = polyB.clone();
    polyAcopy.vertices.push(polyAcopy.vertices[0]);
    polyBcopy.vertices.push(polyBcopy.vertices[0]);
    
    let isIntersect: boolean = false;
    for (let i = 0; i < polyAcopy.vertices.length - 1; i++) {
      const sideA: Vector[] = [polyAcopy.vertices[i], polyAcopy.vertices[i + 1]];

      for (let j = 0; j < polyBcopy.vertices.length - 1; j++) {

        const sideB: Vector[] = [polyBcopy.vertices[j], polyBcopy.vertices[j + 1]];
        const sideAVec = [new Vector(sideA[0].x, sideA[0].y), new Vector(sideA[1].x, sideA[1].y)];
        const sideBVec = [new Vector(sideB[0].x, sideB[0].y), new Vector(sideB[1].x, sideB[1].y)];

        isIntersect = utils.getIntersection(sideAVec, sideBVec);
        if (isIntersect) {
          return true;
        }
      }
    }
    return isIntersect;
  }

  private findOverlappedObject(polyA: Polygon, polyB: Polygon): boolean {
    return this.checkSideIntersection(polyA, polyB) || this.checkVertexInPoly(polyA, polyB);
  }

  private updateIntersectingObjects(): void {
    const overlapingObjects = new Set();
    for (let i = 0; i < this.objects.length; i++) {
      const objectA: Polygon = this.objects[i];

      for (let j = i + 1; j < this.objects.length; j++) {
        const objectB: Polygon = this.objects[j];

        if (this.checkSideIntersection(objectA, objectB)) {
          overlapingObjects.add(objectA).add(objectB);
        }
      }
    }

    this.objects.forEach((object) => {
      object.isOverlap = overlapingObjects.has(object);
    });
  }
}
