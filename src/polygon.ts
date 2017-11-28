import Vector from './vector';

export default class Polygon {
  public vertices: Vector[];
  public strokeColor: string;
  public fillColor: string;
  public isOverlap: boolean;
  public boundingBox: Vector[];

  constructor(vertices: Vector[], strokeColor?: string, fillColor?: string) {
    this.vertices = vertices;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.isOverlap = false;
  }
  
  public shift(offset: Vector): void {
    this.vertices.forEach((vertex) => {
      vertex.x += offset.x;
      vertex.y += offset.y;
    });
  }
  
  public setBoundingBox(): void {
    const minX: number = this.vertices.reduce((min, vertex) =>
        (vertex.x < min ? vertex.x : min),    this.vertices[0].x);
    const maxX: number = this.vertices.reduce((min, vertex) =>
        (vertex.x > min ? vertex.x : min),    this.vertices[0].x);
    const minY: number = this.vertices.reduce((min, vertex) =>
        (vertex.y < min ? vertex.y : min),    this.vertices[0].y);
    const maxY: number = this.vertices.reduce((min, vertex) =>
        (vertex.y > min ? vertex.y : min),    this.vertices[0].y);
        
    this.boundingBox = [new Vector(minX, minY), new Vector(maxX, minY),
      new Vector(maxX, maxY), new Vector(minX, maxY)];
  }

  public clone(): Polygon {
    const vertCopy: Vector[] = this.vertices.slice();
    const newPoly = new Polygon(vertCopy, this.strokeColor, this.fillColor);
    return newPoly;
  }
}
