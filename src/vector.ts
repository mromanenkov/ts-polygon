export default class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public substract(deduction: Vector): Vector {
    return new Vector(this.x - deduction.x, this.y - deduction.y);
  }
}
