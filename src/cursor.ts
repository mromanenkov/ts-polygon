import * as utils from './utils';
import Vector from './vector';

export default class Cursor {
  private static instance: Cursor;

  public cursorDownPos = new Vector(0, 0);
  public cursorUpPos = new Vector(0, 0);

  public static get Instance() {
    return this.instance || (this.instance = new Cursor());
  }

  public getOffset(): Vector {
    return this.cursorUpPos.substract(this.cursorDownPos);
  }
}
