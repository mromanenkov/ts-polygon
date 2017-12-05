import * as utils from './utils';
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
    this.fillColor = '#fff';
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
    ctx.fillStyle = object.isOverlap ? '#f00' : this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    ctx.moveTo(object.vertices[0].x, object.vertices[0].y);
    object.vertices.forEach((vertex) => {
      ctx.lineTo(vertex.x, vertex.y);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  public update(): void {
    const ctx = this.element.getContext('2d')!;
    ctx.clearRect(0, 0, this.setting.width, this.setting.height);

    this.updateOverlappedObject(this.objects);

    this.objects.forEach((object) => {
      this.draw(object);
    });
  }

  public getSelectedObject(cursorPos: Vector): Polygon | null {
    return this.objects.find((object) => {
      return utils.isPointInPoly(cursorPos, object.vertices);
    }) || null ;
  }

  updateOverlappedObject(polygons: Polygon[]): void {
    const overlapingObjects = new Set();
    for (let i = 0; i < polygons.length; i++) {
      const polyA: Polygon = polygons[i];

      for (let j = i + 1; j < polygons.length; j++) {
        const polyB: Polygon = polygons[j];

        if (polyA.isOverlappingBy(polyB)) {
          overlapingObjects.add(polyA).add(polyB);
        } 
      }
    }

    polygons.forEach((poly) => {
      poly.isOverlap = overlapingObjects.has(poly);
    });
  }
}
