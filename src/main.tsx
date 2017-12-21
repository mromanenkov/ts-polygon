import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/app'; 
import { Provider } from 'react-redux';

import { store } from './store';

const render = () => {
  ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>, document.getElementById('root'),
  );
};
store.subscribe(render);
render();

/*
import Polygon from './polygon';
import { Canvas, ISetting }  from  './canvas';
import Cursor from './cursor';
import Vector from './vector';

const polygonPointsA: Vector[] = [new Vector(100, 100), new Vector(200, 100),
  new Vector(200, 200), new Vector(100, 200)];
const polygonPointsB: Vector[] = [new Vector(300, 400), new Vector(450, 300), new Vector(470, 370)];
const polygonPointsC: Vector[] = [new Vector(0, 20), new Vector(20, 0),
  new Vector(40, 10), new Vector(40, 30), new Vector(30, 40)];

const poly1: Polygon = new Polygon(polygonPointsA);
const poly2: Polygon = new Polygon(polygonPointsB);
const poly3: Polygon = new Polygon(polygonPointsC);

const setting: ISetting = {
  width: window.innerWidth - window.innerWidth * 0.02,
  height: window.innerHeight - window.innerWidth * 0.02,
  padding: 30,
  polygonMargin: 20,
};

const cursor = new Cursor();
const canvas = new Canvas('example', setting);

window.addEventListener('load', () => {
  canvas.init();
  const polygons = [poly1, poly2, poly3];
  canvas.addArr(polygons);
  
  canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
    cursor.cursorDownPos.x = e.offsetX;
    cursor.cursorDownPos.y = e.offsetY;
    canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);
  });
  
  canvas.element.addEventListener('mouseup', (e: MouseEvent) => {
    cursor.cursorUpPos.x = e.offsetX;
    cursor.cursorUpPos.y = e.offsetY;
    const offset = cursor.getOffset();

    if (canvas.selectedObject) {
      canvas.selectedObject.shift(offset);
    }
    canvas.selectedObject = null;
  });

  function animate() {
    requestAnimationFrame(animate);
    canvas.update();
  }
  animate();
});
*/
