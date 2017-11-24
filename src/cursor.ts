import utils from './utils';

export default class Cursor {

  private static instance: Cursor;

  public cursorDownPos: number[] = [0, 0];
  public cursorUpPos: number[] = [0, 0];

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  public getOffset(): number[] {
    return [this.cursorUpPos[0] - this.cursorDownPos[0],
      this.cursorUpPos[1] - this.cursorDownPos[1]];
  }

  public isCursorInPoly(point: number[], polyPoints: number[][]): boolean {
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
}
