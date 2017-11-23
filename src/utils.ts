import Vector from './vector';
import IVector from './interfaces/vector.interface';

export default class Utils {
  public static isPointInPoly(point: number[], polyPoints: number[][]): boolean {
    const x: number = point[0];
    const y: number = point[1];

    let inside: boolean = false;
    for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
      const xi: number = polyPoints[i][0];
      const yi: number = polyPoints[i][1];
      const xj: number = polyPoints[j][0];
      const yj: number = polyPoints[j][1];

      const intersect: boolean = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  public static getIntersection(segmentA: number[][], segmentB: number[][]) {

    const v1: IVector = new Vector(segmentA[0]);
    const v2: IVector = new Vector(segmentA[1]);
    const v3: IVector = new Vector(segmentB[0]);
    const v4: IVector = new Vector(segmentB[1]);

    const x: number = ((v1.x * v2.y - v1.y * v2.x) * 
                      (v3.x - v4.x) - (v1.x - v2.x) * (v3.x * v4.y - v3.y * v4.x)) /
                      ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));

    const y: number = ((v1.x * v2.y - v1.y * v2.x) *
                      (v3.y - v4.y) - (v1.y - v2.y) * (v3.x * v4.y - v3.y * v4.x)) /
                      ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));

    const isInside: boolean = this.isPointInPoly([x, y], [[v1.x, v1.y],
      [v3.x, v3.y], [v2.x, v2.y], [v4.x, v4.y]]);

    return isInside;
  }
}
