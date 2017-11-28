import Vector from './vector';

export default class Utils {

  public static isPointInPoly(vertex: Vector, polyVertices: Vector[]): boolean {

    let inside: boolean = false;
    for (let i = 0, j = polyVertices.length - 1; i < polyVertices.length; j = i++) {

      const vi = polyVertices[i];
      const vj = polyVertices[j];

      const intersect: boolean = ((vi.y > vertex.y) !== (vj.y > vertex.y))
        && (vertex.x < (vj.x - vi.x) * (vertex.y - vi.y) / (vj.y - vi.y) + vi.x);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }
  
  public static getIntersection(segmentA: Vector[], segmentB: Vector[]) {

    const v1 = segmentA[0];
    const v2 = segmentA[1];
    const v3 = segmentB[0];
    const v4 = segmentB[1];

    const x: number = ((v1.x * v2.y - v1.y * v2.x) * 
                      (v3.x - v4.x) - (v1.x - v2.x) * (v3.x * v4.y - v3.y * v4.x)) /
                      ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));
    const y: number = ((v1.x * v2.y - v1.y * v2.x) *
                      (v3.y - v4.y) - (v1.y - v2.y) * (v3.x * v4.y - v3.y * v4.x)) /
                      ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));

    const vector: Vector = new Vector(x, y);
    const isInside: boolean = this.isPointInPoly(vector, [v1, v3, v2, v4]);
    return isInside;
  }
}
