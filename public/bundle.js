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
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
/* harmony default export */ __webpack_exports__["a"] = (Vector);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polygon__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cursor__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vector__ = __webpack_require__(0);




var polygonPointsA = [new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](100, 100), new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](200, 100),
    new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](200, 200), new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](100, 200)];
var polygonPointsB = [new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](300, 400), new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](450, 300), new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](470, 370)];
var polygonPointsC = [new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](0, 20), new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](20, 0),
    new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](40, 10), new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](40, 30), new __WEBPACK_IMPORTED_MODULE_3__vector__["a" /* default */](30, 40)];
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
    cursor.cursorDownPos.x = e.offsetX;
    cursor.cursorDownPos.y = e.offsetY;
    canvas.selectedObject = canvas.getSelectedObject(cursor.cursorDownPos);
});
canvas.element.addEventListener('mouseup', function (e) {
    cursor.cursorUpPos.x = e.offsetX;
    cursor.cursorUpPos.y = e.offsetY;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);

var Polygon = /** @class */ (function () {
    function Polygon(vertices, strokeColor, fillColor) {
        this.vertices = vertices;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.isOverlap = false;
    }
    Polygon.prototype.shift = function (offset) {
        this.vertices.forEach(function (vertex) {
            vertex.x += offset.x;
            vertex.y += offset.y;
        });
    };
    Polygon.prototype.setBoundingBox = function () {
        var minX = this.vertices.reduce(function (min, vertex) {
            return (vertex.x < min ? vertex.x : min);
        }, this.vertices[0].x);
        var maxX = this.vertices.reduce(function (min, vertex) {
            return (vertex.x > min ? vertex.x : min);
        }, this.vertices[0].x);
        var minY = this.vertices.reduce(function (min, vertex) {
            return (vertex.y < min ? vertex.y : min);
        }, this.vertices[0].y);
        var maxY = this.vertices.reduce(function (min, vertex) {
            return (vertex.y > min ? vertex.y : min);
        }, this.vertices[0].y);
        this.boundingBox = [new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](minX, minY), new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](maxX, minY),
            new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](maxX, maxY), new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](minX, maxY)];
    };
    Polygon.prototype.clone = function () {
        var vertCopy = this.vertices.slice();
        var newPoly = new Polygon(vertCopy, this.strokeColor, this.fillColor);
        return newPoly;
    };
    return Polygon;
}());
/* harmony default export */ __webpack_exports__["a"] = (Polygon);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(0);


var Canvas = /** @class */ (function () {
    function Canvas(id, setting, objects) {
        this.id = id;
        this.setting = setting;
        this.objects = objects || [];
        this.selectedObject = null;
        this.element = document.getElementById(id);
        this.ctx = this.element.getContext('2d');
        this.nextObjListPos = new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](this.setting.padding, this.setting.padding);
    }
    Canvas.prototype.init = function () {
        this.element.width = this.setting.width;
        this.element.height = this.setting.height;
    };
    Canvas.prototype.add = function (object) {
        this.objects.push(object);
        object.setBoundingBox();
        var offset = new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](this.nextObjListPos.x - object.boundingBox[0].x, this.nextObjListPos.y - object.boundingBox[0].y);
        object.shift(offset);
        object.setBoundingBox();
        this.nextObjListPos.y = object.boundingBox[object.boundingBox.length - 1].y +
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
        this.ctx.moveTo(object.vertices[0].x, object.vertices[0].y);
        object.vertices.forEach(function (vertex) {
            _this.ctx.lineTo(vertex.x, vertex.y);
        });
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
        if (isFill) {
            this.ctx.fill();
        }
    };
    Canvas.prototype.update = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.setting.width, this.setting.height);
        this.updateIntersectingObjects();
        this.checkVertexInPolyAll();
        this.objects.forEach(function (object) {
            object.isOverlap ? _this.draw(object, true) : _this.draw(object);
        });
    };
    Canvas.prototype.getSelectedObject = function (cursorPos) {
        var selectedObject;
        this.objects.forEach(function (object) {
            var isInside = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(cursorPos, object.vertices);
            if (isInside)
                selectedObject = object;
        });
        return selectedObject;
    };
    Canvas.prototype.checkVertexInPoly = function (polyA, polyB) {
        var isInPoly = false;
        polyA.vertices.forEach(function (vertex) {
            isInPoly = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(vertex, polyB.vertices);
            if (isInPoly) {
                isInPoly = true;
                return false;
            }
        });
        polyB.vertices.forEach(function (vertex) {
            isInPoly = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isPointInPoly(vertex, polyA.vertices);
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
        var polyAcopy = polyA.clone();
        var polyBcopy = polyB.clone();
        polyAcopy.vertices.push(polyAcopy.vertices[0]);
        polyBcopy.vertices.push(polyBcopy.vertices[0]);
        var isIntersect = false;
        for (var i = 0; i < polyAcopy.vertices.length - 1; i++) {
            var sideA = [polyAcopy.vertices[i], polyAcopy.vertices[i + 1]];
            for (var j = 0; j < polyBcopy.vertices.length - 1; j++) {
                var sideB = [polyBcopy.vertices[j], polyBcopy.vertices[j + 1]];
                var sideAVec = [new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](sideA[0].x, sideA[0].y), new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](sideA[1].x, sideA[1].y)];
                var sideBVec = [new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](sideB[0].x, sideB[0].y), new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](sideB[1].x, sideB[1].y)];
                isIntersect = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getIntersection(sideAVec, sideBVec);
                if (isIntersect)
                    return true;
            }
        }
        return isIntersect;
    };
    Canvas.prototype.findOverlappedObject = function (polyA, polyB) {
        return this.checkSideIntersection(polyA, polyB) || this.checkVertexInPoly(polyA, polyB);
    };
    Canvas.prototype.updateIntersectingObjects = function () {
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);

var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isPointInPoly = function (vertex, polyVertices) {
        var inside = false;
        for (var i = 0, j = polyVertices.length - 1; i < polyVertices.length; j = i++) {
            var vi = polyVertices[i];
            var vj = polyVertices[j];
            var intersect = ((vi.y > vertex.y) !== (vj.y > vertex.y))
                && (vertex.x < (vj.x - vi.x) * (vertex.y - vi.y) / (vj.y - vi.y) + vi.x);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    Utils.getIntersection = function (segmentA, segmentB) {
        var v1 = segmentA[0];
        var v2 = segmentA[1];
        var v3 = segmentB[0];
        var v4 = segmentB[1];
        var x = ((v1.x * v2.y - v1.y * v2.x) *
            (v3.x - v4.x) - (v1.x - v2.x) * (v3.x * v4.y - v3.y * v4.x)) /
            ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));
        var y = ((v1.x * v2.y - v1.y * v2.x) *
            (v3.y - v4.y) - (v1.y - v2.y) * (v3.x * v4.y - v3.y * v4.x)) /
            ((v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x));
        var vector = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](x, y);
        var isInside = this.isPointInPoly(vector, [v1, v3, v2, v4]);
        return isInside;
    };
    return Utils;
}());
/* harmony default export */ __webpack_exports__["a"] = (Utils);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);

var Cursor = /** @class */ (function () {
    function Cursor() {
        this.cursorDownPos = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 0);
        this.cursorUpPos = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 0);
    }
    Object.defineProperty(Cursor, "Instance", {
        get: function () {
            return this.instance || (this.instance = new Cursor());
        },
        enumerable: true,
        configurable: true
    });
    Cursor.prototype.getOffset = function () {
        var offset = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.cursorUpPos.x - this.cursorDownPos.x, this.cursorUpPos.y - this.cursorDownPos.y);
        return offset;
    };
    return Cursor;
}());
/* harmony default export */ __webpack_exports__["a"] = (Cursor);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map