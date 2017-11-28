import utils from './utils';
import Vector from './vector';

export default class Cursor {
  private static instance: Cursor;

  public cursorDownPos = new Vector(0, 0);
  public cursorUpPos = new Vector(0, 0);

  public static get Instance() {
    return this.instance || (this.instance = new Cursor());
  }

  public getOffset(): Vector {
    const offset = new Vector(this.cursorUpPos.x - this.cursorDownPos.x,
                              this.cursorUpPos.y - this.cursorDownPos.y);
    return offset;
  }
}
