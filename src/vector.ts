export default class Vector {
  public x: number;
  public y: number;

  constructor(point: number[]) {
    this.x = point[0];
    this.y = point[1];
  }
}
