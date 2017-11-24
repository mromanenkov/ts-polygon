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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polygon__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cursor__ = __webpack_require__(5);



var polygonPointsA = [[100, 100], [200, 100], [200, 200], [100, 200]];
var polygonPointsB = [[300, 400], [450, 300], [470, 370]];
var polygonPointsC = [[0, 20], [20, 0], [40, 10], [40, 30], [30, 40]];
var strokeColor = '#000';
var fillColor = '#f00';
var poly1 = new __WEBPACK_IMPORTED_MODULE_0__polygon__["a" /* default */](polygonPointsA, strokeColor, fillColor);
var poly2 = new __WEBPACK_IMPORTED_MODULE_0__polygon__["a" /* default */](polygonPointsB, strokeColor, fillColor);
var poly3 = new __WEBPACK_IMPORTED_MODULE_0__polygon__["a" /* default */](polygonPointsC, strokeColor, fillColor);
var setting = {
    width: window.innerWidth - window.innerWidth * 0.02,
    height: window.innerHeight - window.innerWidth * 0.02,
    padding: 30,
    polygonMargin: 20,
};
var cursor = new __WEBPACK_IMPORTED_MODULE_2__cursor__["a" /* default */]();
var canvas = new __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */]('example', setting);
window.addEventListener('load', canvas.init());
var polygons = [poly1, poly2, poly3];
canvas.addArr(polygons);
canvas.element.addEventListener('mousedown', function (e) {
    cursor.cursorDownPos = [e.offsetX, e.offsetY];
    canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);
});
canvas.element.addEventListener('mouseup', function (e) {
    cursor.cursorUpPos = [e.offsetX, e.offsetY];
    var offset = cursor.getOffset();
    if (canvas.selectedObject) {
        canvas.selectedObject.shift(offset);
        canvas.update();
    }
    canvas.selectedObject = null;
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polygon__ = __webpack_require__(0);


var Canvas = /** @class */ (function () {
    function Canvas(id, setting, objects) {
        this.id = id;
        this.setting = setting;
        this.objects = objects || [];
        this.selectedObject = null;
        this.element = document.getElementById(id);
        this.ctx = this.element.getContext('2d');
        this.nextObjListPos = [this.setting.padding, this.setting.padding];
    }
    Canvas.prototype.init = function () {
        this.element.width = this.setting.width;
        this.element.height = this.setting.height;
    };
    Canvas.prototype.add = function (object) {
        this.objects.push(object);
        object.setBoundingBox();
        var offset = [this.nextObjListPos[0] - object.boundingBox[0][0],
            this.nextObjListPos[1] - object.boundingBox[0][1]];
        object.shift(offset);
        object.setBoundingBox();
        this.nextObjListPos[1] = object.boundingBox[object.boundingBox.length - 1][1] +
            this.setting.polygonMargin;
        this.update();
    };
    Canvas.prototype.addArr = function (objectArr) {
        var _this = this;
        objectArr.forEach(function (object) {
            _this.add(object);
        });
    };
    Canvas.prototype.draw = function (object, isFill) {
        var _this = this;
        this.ctx.fillStyle = object.fillColor;
        this.ctx.strokeStyle = object.strokeColor;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(object.points[0][0], object.points[0][1]);
        object.points.forEach(function (point) {
            _this.ctx.lineTo(point[0], point[1]);
        });
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
        if (isFill)
            this.ctx.fill();
    };
    Canvas.prototype.update = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
        this.findAllIntersectObjects();
        this.checkVertexInPolyAll();
        this.objects.forEach(function (object) {
            object.isOverlap ? _this.draw(object, true) : _this.draw(object);
        });
    };
    Canvas.prototype.getSelectedObject = function (cursorPos) {
        var selectedObject;
        this.objects.forEach(function (object) {
            var isInside = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(cursorPos, object.points);
            if (isInside)
                selectedObject = object;
        });
        return selectedObject;
    };
    Canvas.prototype.checkVertexInPoly = function (polyA, polyB) {
        var isInPoly = false;
        polyA.points.forEach(function (point) {
            isInPoly = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(point, polyB.points);
            if (isInPoly) {
                isInPoly = true;
                return false;
            }
        });
        polyB.points.forEach(function (point) {
            isInPoly = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(point, polyA.points);
            if (isInPoly) {
                isInPoly = true;
                return false;
            }
        });
        return isInPoly;
    };
    Canvas.prototype.checkVertexInPolyAll = function () {
        for (var i = 0; i < this.objects.length; i++) {
            var objectA = this.objects[i];
            for (var j = 0; j < this.objects.length; j++) {
                if (i === j)
                    continue;
                var objectB = this.objects[j];
                var isInPoly = this.checkVertexInPoly(objectA, objectB);
                if (isInPoly) {
                    objectA.isOverlap = true;
                    objectB.isOverlap = true;
                }
            }
        }
    };
    Canvas.prototype.checkSideIntersection = function (polyA, polyB) {
        var pointsAcopy = JSON.parse(JSON.stringify(polyA.points));
        var pointsBcopy = JSON.parse(JSON.stringify(polyB.points));
        var polyAcopy = new __WEBPACK_IMPORTED_MODULE_1__polygon__["a" /* default */](pointsAcopy);
        var polyBcopy = new __WEBPACK_IMPORTED_MODULE_1__polygon__["a" /* default */](pointsBcopy);
        polyAcopy.points.push(polyAcopy.points[0]);
        polyBcopy.points.push(polyBcopy.points[0]);
        var isIntersect = false;
        for (var i = 0; i < polyAcopy.points.length - 1; i++) {
            var sideA = [polyAcopy.points[i], polyAcopy.points[i + 1]];
            for (var j = 0; j < polyBcopy.points.length - 1; j++) {
                var sideB = [polyBcopy.points[j], polyBcopy.points[j + 1]];
                isIntersect = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getIntersection(sideA, sideB);
                if (isIntersect)
                    return true;
            }
        }
        return isIntersect;
    };
    Canvas.prototype.findOverlappedObject = function (polyA, polyB) {
        var isOverlap = false;
        if (this.checkSideIntersection(polyA, polyB) || this.checkVertexInPoly(polyA, polyB)) {
            isOverlap = true;
        }
        return isOverlap;
    };
    Canvas.prototype.findAllIntersectObjects = function () {
        var overlapObjectIndeces = [];
        for (var i = 0; i < this.objects.length; i++) {
            var objectA = this.objects[i];
            for (var j = i + 1; j < this.objects.length; j++) {
                var objectB = this.objects[j];
                if (this.checkSideIntersection(objectA, objectB)) {
                    overlapObjectIndeces.push(i);
                    overlapObjectIndeces.push(j);
                }
            }
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].isOverlap = overlapObjectIndeces.indexOf(i) >= 0;
        }
    };
    return Canvas;
}());
/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(4);

var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isPointInPoly = function (point, polyPoints) {
        var x = point[0];
        var y = point[1];
        var inside = false;
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i][0];
            var yi = polyPoints[i][1];
            var xj = polyPoints[j][0];
            var yj = polyPoints[j][1];
            var intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    Utils.getIntersection = function (segmentA, segmentB) {
        var v1 = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](segmentA[0]);
        var v2 = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](segmentA[1]);
        var v3 = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](segmentB[0]);
        var v4 = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](segmentB[1]);
        var x = ((v1.x * v2.y - v1.y * v2.x) *
            (v3.x - v4.x) - (v1.x - v2.x) * (v3.x * v4.y - v3.y * v4.x)) /
            ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));
        var y = ((v1.x * v2.y - v1.y * v2.x) *
            (v3.y - v4.y) - (v1.y - v2.y) * (v3.x * v4.y - v3.y * v4.x)) /
            ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));
        var isInside = this.isPointInPoly([x, y], [[v1.x, v1.y],
            [v3.x, v3.y], [v2.x, v2.y], [v4.x, v4.y]]);
        return isInside;
    };
    return Utils;
}());
/* harmony default export */ __webpack_exports__["a"] = (Utils);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Vector = /** @class */ (function () {
    function Vector(point) {
        this.x = point[0];
        this.y = point[1];
    }
    return Vector;
}());
/* harmony default export */ __webpack_exports__["a"] = (Vector);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Cursor = /** @class */ (function () {
    function Cursor() {
        this.cursorDownPos = [0, 0];
        this.cursorUpPos = [0, 0];
    }
    Object.defineProperty(Cursor, "Instance", {
        get: function () {
            return this.instance || (this.instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Cursor.prototype.getOffset = function () {
        return [this.cursorUpPos[0] - this.cursorDownPos[0],
            this.cursorUpPos[1] - this.cursorDownPos[1]];
    };
    Cursor.prototype.isCursorInPoly = function (point, polyPoints) {
        var x = point[0];
        var y = point[1];
        var inside = false;
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i][0];
            var yi = polyPoints[i][1];
            var xj = polyPoints[j][0];
            var yj = polyPoints[j][1];
            var intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    return Cursor;
}());
/* harmony default export */ __webpack_exports__["a"] = (Cursor);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map