import Vector from './vector';

export default class Polygon {
  public vertices: Vector[];
  public isOverlap: boolean;
  public boundingBox: Vector[];

  constructor(vertices: Vector[]) {
    this.vertices = vertices;
    this.isOverlap = false;
    this.setBoundingBox();
  }

  public shift(offset: Vector): void {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = this.vertices[i].add(offset);
    }
    this.setBoundingBox();
  }
  
  public setBoundingBox(): void {
    let minX = this.vertices[0].x;
    let maxX = this.vertices[0].x;
    let minY = this.vertices[0].y;
    let maxY = this.vertices[0].y;

    this.vertices.forEach((vertex) => {
      if (vertex.x < minX) {
        minX = vertex.x;
      }
      if (vertex.x > maxX) {
        maxX = vertex.x;
      }
      if (vertex.y < minY) {
        minY = vertex.y;
      }
      if (vertex.y > maxY) {
        maxY = vertex.y;
      }
    });
    this.boundingBox = [new Vector(minX, minY), new Vector(maxX, minY),
      new Vector(maxX, maxY), new Vector(minX, maxY)];
  }
}
