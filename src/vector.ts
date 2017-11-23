import IVector from './interfaces/vector.interface';

export default class Vector implements IVector {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
    
  constructor(pointA: number[], pointB:number[]) {
    this.x1 = pointA[0];
    this.y1 = pointA[1];
  
    this.x2 = pointB[0];
    this.y2 = pointB[1];
  }
}
  
