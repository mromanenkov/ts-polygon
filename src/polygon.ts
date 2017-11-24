export default class Polygon {
  public points: number[][];
  public strokeColor: string;
  public fillColor: string;
  public isOverlap: boolean;
  public boundingBox: number[][];

  constructor(points: number[][], strokeColor?: string, fillColor?: string) {
    this.points = points;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.isOverlap = false;
  }
  
  public shift(offset: number[]): void {
    this.points.forEach((point) => {
      point[0] += offset[0];
      point[1] += offset[1];
    });
  }
  
  public setBoundingBox(): void {
    const minX: number = this.points.reduce((min, item) =>
        (item[0] < min ? item[0] : min),    this.points[0][0]);
    const maxX: number = this.points.reduce((min, item) =>
        (item[0] > min ? item[0] : min),    this.points[0][0]);
    const minY: number = this.points.reduce((min, item) =>
        (item[1] < min ? item[1] : min),    this.points[0][1]);
    const maxY: number = this.points.reduce((min, item) =>
        (item[1] > min ? item[1] : min),    this.points[0][1]);
    this.boundingBox = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
  }
}

  
  
