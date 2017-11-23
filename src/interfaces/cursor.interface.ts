export default interface ICursor {
  cursorDownPos: number[];
  cursorUpPos: number[];

  getOffset(): number[];
}
