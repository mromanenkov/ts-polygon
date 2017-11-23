import Vector from './vector';

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
    const vectorA = new Vector(segmentA[0], segmentA[1]);
    const vectorB = new Vector(segmentB[0], segmentB[1]);

    const x = ((vectorA.x1 * vectorA.y2 - vectorA.y1 * vectorA.x2) *
              (vectorB.x1 - vectorB.x2) - (vectorA.x1 - vectorA.x2) *
              (vectorB.x1 * vectorB.y2 - vectorB.y1 * vectorB.x2)) /
              ((vectorA.x1 - vectorA.x2) * (vectorB.y1 - vectorB.y2) -
              (vectorA.y1 - vectorA.y2) * (vectorB.x1 - vectorB.x2));
    const y = ((vectorA.x1 * vectorA.y2 - vectorA.y1 * vectorA.x2) *
              (vectorB.y1 - vectorB.y2) - (vectorA.y1 - vectorA.y2) *
              (vectorB.x1 * vectorB.y2 - vectorB.y1 * vectorB.x2)) /
              ((vectorA.x1 - vectorA.x2) * (vectorB.y1 - vectorB.y2) -
              (vectorA.y1 - vectorA.y2) * (vectorB.x1 - vectorB.x2));

    const isInside = this.isPointInPoly([x, y], [[vectorA.x1, vectorA.y1],
      [vectorB.x1, vectorB.y1], [vectorA.x2, vectorA.y2], [vectorB.x2, vectorB.y2]]);

    return isInside;
  }
}
