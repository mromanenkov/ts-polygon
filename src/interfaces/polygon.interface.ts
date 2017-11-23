export default interface IPolygon {
  points: number[][];
  strokeColor?: string;
  fillColor?: string;
  isOverlap?: boolean;
  boundingBox?: number[][];

  shift(offset: number[]): void;
  setBoundingBox(): void;
}
