class Polygon {
    points: number[][];
    strokeColor: string;
    fillColor: string;
    isOverlap: boolean;
    boundingBox: number[][];

    constructor(points: number[][], strokeColor: string, fillColor: string) {
      this.points = points;
      this.strokeColor = strokeColor;
      this.fillColor = fillColor;
      this.isOverlap = false;
    }
  
    shift(offset: number[]) {
      this.points.forEach((point) => {
        point[0] += offset[0];
        point[1] += offset[1];
      });
    }
  
    setBoundingBox() {
      const minX: number = this.points.reduce((min, item) =>
        (item[0] < min ? item[0] : min), this.points[0][0]);
      const maxX: number = this.points.reduce((min, item) =>
        (item[0] > min ? item[0] : min), this.points[0][0]);
      const minY: number = this.points.reduce((min, item) =>
        (item[1] < min ? item[1] : min), this.points[0][1]);
      const maxY: number = this.points.reduce((min, item) =>
        (item[1] > min ? item[1] : min), this.points[0][1]);
      this.boundingBox = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
    }
  }
  
  export default Polygon;
  
  