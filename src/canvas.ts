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
  private id: string;
  private setting: ISetting;
  private objects: Polygon[];
  private nextObjListPos: Vector;
  private strokeColor: string;
  private fillColor: string;
  public selectedObject: Polygon | null;
  public element: HTMLCanvasElement;

  constructor(id: string, setting: ISetting, objects?: Polygon[]) {
    this.id = id;
    this.setting = setting;
    this.objects = objects || [];
    this.nextObjListPos = new Vector(this.setting.padding, this.setting.padding);
    this.strokeColor = '#000';
    this.fillColor = '#f00';
    this.selectedObject = null;
    this.element = document.getElementById(id) as HTMLCanvasElement;
    
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
    const ctx = this.element.getContext('2d')!;
    ctx.save();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    ctx.moveTo(object.vertices[0].x, object.vertices[0].y);
    object.vertices.forEach((vertex) => {
      ctx.lineTo(vertex.x, vertex.y);
    });
    ctx.closePath();
    ctx.stroke();

    if (object.isOverlap) {
      ctx.fill();
    }

    ctx.restore();
  }

  public update(): void {
    const ctx = this.element.getContext('2d')!;
    ctx.clearRect(0, 0, this.setting.width, this.setting.height);

    this.updateIntersectingObjects();
    this.checkVertexInPolyAll();

    this.objects.forEach((object) => {
      this.draw(object);
    });
  }

  public getSelectedObject(cursorPos: Vector): Polygon | null {
    let selectedObject: Polygon | null | undefined = null;

    selectedObject = this.objects.find((object) => {
      return utils.isPointInPoly(cursorPos, object.vertices);
    });
    return selectedObject ? selectedObject : null;
  }

  private checkVertexInPoly(polyA: Polygon, polyB: Polygon): boolean {
    let isInPoly: boolean = false;

    isInPoly = polyA.vertices.some((vertex) => {
      return utils.isPointInPoly(vertex, polyB.vertices);
    });
    isInPoly = polyB.vertices.some((vertex) => {
      return utils.isPointInPoly(vertex, polyA.vertices);
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

    const verticesA = [...polyA.vertices, polyA.vertices[0]];
    const verticesB = [...polyB.vertices, polyB.vertices[0]];
    
    let isIntersect: boolean = false;
    for (let i = 0; i < verticesA.length - 1; i++) {
      const sideA: Vector[] = [verticesA[i], verticesA[i + 1]];

      for (let j = 0; j < verticesB.length - 1; j++) {

        const sideB: Vector[] = [verticesB[j], verticesB[j + 1]];
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
