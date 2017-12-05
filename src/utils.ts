import Vector from './vector';
import Polygon from './polygon';

export default class Utils {

  public isPointInPoly(vertex: Vector, polyVertices: Vector[]): boolean {

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
  
  public getIntersection(segmentA: Vector[], segmentB: Vector[]) {

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

  public checkSideIntersection(polyA: Polygon, polyB: Polygon): boolean {
    
    const verticesA = [...polyA.vertices, polyA.vertices[0]];
    const verticesB = [...polyB.vertices, polyB.vertices[0]];
    
    let isIntersect: boolean = false;
    for (let i = 0; i < verticesA.length - 1; i++) {
      const sideA: Vector[] = [verticesA[i], verticesA[i + 1]];

      for (let j = 0; j < verticesB.length - 1; j++) {

        const sideB: Vector[] = [verticesB[j], verticesB[j + 1]];
        const sideAVec = [new Vector(sideA[0].x, sideA[0].y), new Vector(sideA[1].x, sideA[1].y)];
        const sideBVec = [new Vector(sideB[0].x, sideB[0].y), new Vector(sideB[1].x, sideB[1].y)];

        isIntersect = this.getIntersection(sideAVec, sideBVec);
        if (isIntersect) {
          return true;
        }
      }
    }
    return isIntersect;
  }

  public checkVertexInPoly(polyA: Polygon, polyB: Polygon): boolean {
    let isInPoly: boolean = false;

    isInPoly = polyA.vertices.some((vertex) => {
      return this.isPointInPoly(vertex, polyB.vertices);
    });
    isInPoly = polyB.vertices.some((vertex) => {
      return this.isPointInPoly(vertex, polyA.vertices);
    });
  
    return isInPoly;
  }
  
  public updateOverlappedObject(polygons: Polygon[]): void {
    const overlapingObjects = new Set();
    for (let i = 0; i < polygons.length; i++) {
      const polyA: Polygon = polygons[i];

      for (let j = 0; j < polygons.length; j++) {
        const polyB: Polygon = polygons[j];

        if (i !== j && this.checkVertexInPoly(polyA, polyB)) {
          overlapingObjects.add(polyA).add(polyB);
        }

        if (i > j && this.checkSideIntersection(polyA, polyB)) { 
          overlapingObjects.add(polyA).add(polyB);
        }
      }
    }

    polygons.forEach((poly) => {
      poly.isOverlap = overlapingObjects.has(poly);
    });
  }
}
