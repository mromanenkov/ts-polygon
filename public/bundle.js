/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polygon__ = __webpack_require__(1);

var polygonPointsA = [[100, 100], [200, 100], [200, 200], [100, 200]];
var strokeColor = '#000';
var fillColor = '#f00';
var poly1 = new __WEBPACK_IMPORTED_MODULE_0__polygon__["a" /* default */](polygonPointsA, strokeColor, fillColor);
console.log(poly1);
/*
import Canvas from './canvas';
import cursor from './cursor';
import Polygon from './polygon';

const polygonPointsA = [[100, 100], [200, 100], [200, 200], [100, 200]];
const polygonPointsB = [[300, 400], [450, 300], [470, 370]];
const polygonPointsC = [[0, 20], [20, 0], [40, 10], [40, 30], [30, 40]];

const strokeColor = '#000';
const fillColor = '#f00';
const poly1 = new Polygon(polygonPointsA, strokeColor, fillColor);
const poly2 = new Polygon(polygonPointsB, strokeColor, fillColor);
const poly3 = new Polygon(polygonPointsC, strokeColor, fillColor);

const setting = {
  width: window.innerWidth - window.innerWidth * 0.02,
  height: window.innerHeight - window.innerWidth * 0.02,
  padding: 30,
  polygonMargin: 20,
};

const canvas = new Canvas('example', setting);

window.addEventListener('load', canvas.init());

const polygons = [poly1, poly2, poly3];
canvas.addArr(polygons);

canvas.element.addEventListener('mousedown', (e) => {
  cursor.cursorDownPos = [e.offsetX, e.offsetY];
  canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);
});

canvas.element.addEventListener('mouseup', (e) => {
  cursor.cursorUpPos = [e.offsetX, e.offsetY];
  const offset = cursor.getOffset();

  if (canvas.selectedObject) {
    canvas.selectedObject.shift(offset);
    canvas.update();
  }
  canvas.selectedObject = null;
});

*/ 


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Polygon = /** @class */ (function () {
    function Polygon(points, strokeColor, fillColor) {
        this.points = points;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.isOverlap = false;
    }
    Polygon.prototype.shift = function (offset) {
        this.points.forEach(function (point) {
            point[0] += offset[0];
            point[1] += offset[1];
        });
    };
    Polygon.prototype.setBoundingBox = function () {
        var minX = this.points.reduce(function (min, item) {
            return (item[0] < min ? item[0] : min);
        }, this.points[0][0]);
        var maxX = this.points.reduce(function (min, item) {
            return (item[0] > min ? item[0] : min);
        }, this.points[0][0]);
        var minY = this.points.reduce(function (min, item) {
            return (item[1] < min ? item[1] : min);
        }, this.points[0][1]);
        var maxY = this.points.reduce(function (min, item) {
            return (item[1] > min ? item[1] : min);
        }, this.points[0][1]);
        this.boundingBox = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
    };
    return Polygon;
}());
/* harmony default export */ __webpack_exports__["a"] = (Polygon);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map