/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/defs/Matrix.ts":
/*!****************************!*\
  !*** ./src/defs/Matrix.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Matrix {
    get matrix() {
        return this._mat;
    }
    constructor(matrix) {
        let longest = 0;
        for (let i = 0; i < matrix.length; i++) {
            longest = Math.max(longest, matrix[i].length);
        }
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i].length < longest) {
                matrix[i].push(...new Array(longest - matrix[i].length).fill(0));
            }
        }
        this._mat = matrix;
    }
    setMatrixIndex(m, n, value) {
        this._mat[m][n] = value;
        return this;
    }
    // Operations
    plus(m) {
        if (this._mat.length !== m.matrix.length || this._mat[0].length !== m.matrix[0].length) {
            return false;
        }
        let mat = Matrix.zero(this._mat.length);
        for (let i = 0; i < this._mat.length; i++) {
            for (let j = 0; j < this._mat[0].length; j++) {
                mat.setMatrixIndex(i, j, this._mat[i][j] + m.matrix[i][j]);
            }
        }
        return mat;
    }
    minus(m) {
        if (this._mat.length !== m.matrix.length || this._mat[0].length !== m.matrix[0].length) {
            return false;
        }
        let mat = Matrix.zero(this._mat.length);
        for (let i = 0; i < this._mat.length; i++) {
            for (let j = 0; j < this._mat[0].length; j++) {
                mat.setMatrixIndex(i, j, this._mat[i][j] - m.matrix[i][j]);
            }
        }
        return mat;
    }
    times(m) {
        if (this._mat[0].length !== m.matrix.length) {
            return false;
        }
        let mat = Matrix.zero(this._mat.length);
        for (let i = 0; i < this._mat.length; i++) {
            for (let j = 0; j < m.matrix[0].length; j++) {
                for (let k = 0; k < this._mat[0].length; k++) {
                    mat.setMatrixIndex(i, j, mat.matrix[i][j] + this._mat[i][k] * m.matrix[k][j]);
                }
            }
        }
        return mat;
    }
    timesScalar(n) {
        let mat = Matrix.zero(this._mat.length);
        for (let i = 0; i < this._mat.length; i++) {
            for (let j = 0; j < this._mat[0].length; j++) {
                mat.setMatrixIndex(i, j, this._mat[i][j] * n);
            }
        }
        return mat;
    }
    determinant() {
        if (this._mat.length !== this._mat[0].length) {
            return null;
        }
        if (this._mat.length === 1) {
            return this._mat[0][0];
        }
        if (this._mat.length === 2) {
            return this._mat[0][0] * this._mat[1][1] - this._mat[0][1] * this._mat[1][0];
        }
        let det = 0;
        for (let i = 0; i < this._mat.length; i++) {
            det += (-1) ** i * this._mat[0][i] * this.subMatrix(0, i).determinant();
        }
        return det;
    }
    inverse() {
        if (this._mat.length !== this._mat[0].length) {
            return null;
        }
        const det = this.determinant();
        if (det === 0) {
            return null;
        }
        if (this._mat.length === 1) {
            return new Matrix([[1 / this._mat[0][0]]]);
        }
        const cofactorMat = new Matrix(this._mat.map((row, i) => row.map((_, j) => (-1) ** (i + j) * this.subMatrix(i, j).determinant())));
        const adjugateMat = cofactorMat.transpose();
        return adjugateMat.timesScalar(1 / det);
    }
    subMatrix(i, j) {
        return new Matrix(this._mat.filter((_, m) => m !== i).map((row) => row.filter((_, n) => n !== j)));
    }
    transpose() {
        let mat = Matrix.zero(this._mat[0].length);
        for (let i = 0; i < this._mat.length; i++) {
            for (let j = 0; j < this._mat[0].length; j++) {
                mat.setMatrixIndex(j, i, this._mat[i][j]);
            }
        }
        return mat;
    }
    // Types
    static zero(n) {
        let mat = new Array(n).fill(0).map(() => new Array(n).fill(0));
        return new Matrix(mat);
    }
    static identity(n) {
        let mat = new Array(n).fill(0).map(() => new Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            mat[i][i] = 1;
        }
        return new Matrix(mat);
    }
}
exports["default"] = Matrix;


/***/ }),

/***/ "./src/defs/Vector.ts":
/*!****************************!*\
  !*** ./src/defs/Vector.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Vector {
    get arr() {
        if (this._orient === 'row') {
            return this._arr;
        }
        else {
            return this._arr.map((num) => [num]);
        }
    }
    set vector(arr) {
        if (typeof arr[0] === 'number') {
            this._arr = arr;
            this._orient = 'row';
        }
        else {
            this._arr = arr.map((num) => {
                if (typeof num === 'number') {
                    return num;
                }
                else {
                    return num[0];
                }
            });
            this._orient = 'column';
        }
    }
    get orientation() {
        return this._orient;
    }
    get dimension() {
        return this._dim;
    }
    at(index) {
        return this._arr[index];
    }
    constructor(arr) {
        if (typeof arr[0] === 'number') {
            this._arr = arr;
            this._orient = 'row';
        }
        else {
            this._arr = arr.map((num) => {
                if (typeof num === 'number') {
                    return num;
                }
                else {
                    return num[0];
                }
            });
            this._orient = 'column';
        }
        this._dim = this._arr.length;
    }
    plus(v) {
        if (this._dim !== v.dimension) {
            return false;
        }
        if (this.orientation === v.orientation) {
            if (this.orientation === 'row') {
                let newVec = [];
                for (let i = 0; i < this._dim; i++) {
                    newVec[i] = this._arr[i] + v.at(i);
                }
                return new Vector(newVec);
            }
            else {
                let newVec = [];
                for (let i = 0; i < this._dim; i++) {
                    newVec[i] = [this._arr[i] + v.at(i)];
                }
                return new Vector(newVec);
            }
        }
        return false;
    }
    minus(v) {
        if (this._dim !== v.dimension) {
            return false;
        }
        if (this.orientation === v.orientation) {
            if (this.orientation === 'row') {
                let newVec = [];
                for (let i = 0; i < this._dim; i++) {
                    newVec[i] = this._arr[i] - v.at(i);
                }
                return new Vector(newVec);
            }
            else {
                let newVec = [];
                for (let i = 0; i < this._dim; i++) {
                    newVec[i] = [this._arr[i] - v.at(i)];
                }
                return new Vector(newVec);
            }
        }
    }
    scale(n) {
        let newVec = [];
        for (let i = 0; i < this._dim; i++) {
            newVec[i] = typeof this._arr[i] === 'number' ? (this._arr[i] * n) : [this._arr[i] * n];
        }
        return new Vector(newVec);
    }
    times(v) {
        if (this._dim !== v.dimension) {
            return false;
        }
        let newVec = [];
        for (let i = 0; i < this._dim; i++) {
            newVec[i] =
                typeof this._arr[i] === 'number'
                    ? (this._arr[i] * v.at(i))
                    : [this._arr[i] * v.at(i)];
        }
        return new Vector(newVec);
    }
    divide(v) {
        if (this._dim !== v.dimension) {
            return false;
        }
        let newVec = [];
        for (let i = 0; i < this._dim; i++) {
            newVec[i] =
                typeof this._arr[i] === 'number'
                    ? (this._arr[i] / v.at(i))
                    : [this._arr[i] / v.at(i)];
        }
        return new Vector(newVec);
    }
    sum() {
        return this._arr.reduce((n, t) => n + t);
    }
    dot(v) {
        if (this._dim !== v.dimension || this.orientation !== v.orientation) {
            return false;
        }
        let mult = this.times(v);
        return mult.sum();
    }
    mag() {
        let res = this.times(this);
        let sum = res.sum();
        return Math.sqrt(sum);
    }
    project(v) {
        let dot = this.dot(v);
        let res = dot / (v.mag() * v.mag());
        return v.scale(res);
    }
    toArray() {
        return this._arr;
    }
}
exports["default"] = Vector;


/***/ }),

/***/ "./src/defs/Vector3.ts":
/*!*****************************!*\
  !*** ./src/defs/Vector3.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Vector_1 = __importDefault(__webpack_require__(/*! ./Vector */ "./src/defs/Vector.ts"));
class Vector3 extends Vector_1.default {
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
    set x(n) {
        this._x = n;
        this.vector = [this._x, this._y, this._z];
    }
    set y(n) {
        this._y = n;
        this.vector = [this._x, this._y, this._z];
    }
    set z(n) {
        this._z = n;
        this.vector = [this._x, this._y, this._z];
    }
    constructor(x, y, z) {
        let vector = [x, y, z];
        super(vector);
        this._x = x;
        this._y = y;
        this._z = z;
    }
}
exports["default"] = Vector3;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Matrix_1 = __importDefault(__webpack_require__(/*! ./defs/Matrix */ "./src/defs/Matrix.ts"));
const Vector3_1 = __importDefault(__webpack_require__(/*! ./defs/Vector3 */ "./src/defs/Vector3.ts"));
let a = new Vector3_1.default(1, 2, 3);
let b = new Matrix_1.default([
    [1, 2],
    [3, 4],
]);
console.log(b.inverse());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUMzSkY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQ0FBaUMsbUJBQU8sQ0FBQyxzQ0FBVTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNwQ0Y7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQ0FBaUMsbUJBQU8sQ0FBQywyQ0FBZTtBQUN4RCxrQ0FBa0MsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDWkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2xpbmVhci1hbGdlYnJhLy4vc3JjL2RlZnMvTWF0cml4LnRzIiwid2VicGFjazovL2xpbmVhci1hbGdlYnJhLy4vc3JjL2RlZnMvVmVjdG9yLnRzIiwid2VicGFjazovL2xpbmVhci1hbGdlYnJhLy4vc3JjL2RlZnMvVmVjdG9yMy50cyIsIndlYnBhY2s6Ly9saW5lYXItYWxnZWJyYS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9saW5lYXItYWxnZWJyYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saW5lYXItYWxnZWJyYS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2xpbmVhci1hbGdlYnJhL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9saW5lYXItYWxnZWJyYS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNYXRyaXgge1xuICAgIGdldCBtYXRyaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXQ7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG1hdHJpeCkge1xuICAgICAgICBsZXQgbG9uZ2VzdCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsb25nZXN0ID0gTWF0aC5tYXgobG9uZ2VzdCwgbWF0cml4W2ldLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChtYXRyaXhbaV0ubGVuZ3RoIDwgbG9uZ2VzdCkge1xuICAgICAgICAgICAgICAgIG1hdHJpeFtpXS5wdXNoKC4uLm5ldyBBcnJheShsb25nZXN0IC0gbWF0cml4W2ldLmxlbmd0aCkuZmlsbCgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF0ID0gbWF0cml4O1xuICAgIH1cbiAgICBzZXRNYXRyaXhJbmRleChtLCBuLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tYXRbbV1bbl0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIE9wZXJhdGlvbnNcbiAgICBwbHVzKG0pIHtcbiAgICAgICAgaWYgKHRoaXMuX21hdC5sZW5ndGggIT09IG0ubWF0cml4Lmxlbmd0aCB8fCB0aGlzLl9tYXRbMF0ubGVuZ3RoICE9PSBtLm1hdHJpeFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0ID0gTWF0cml4Lnplcm8odGhpcy5fbWF0Lmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWF0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX21hdFswXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIG1hdC5zZXRNYXRyaXhJbmRleChpLCBqLCB0aGlzLl9tYXRbaV1bal0gKyBtLm1hdHJpeFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdDtcbiAgICB9XG4gICAgbWludXMobSkge1xuICAgICAgICBpZiAodGhpcy5fbWF0Lmxlbmd0aCAhPT0gbS5tYXRyaXgubGVuZ3RoIHx8IHRoaXMuX21hdFswXS5sZW5ndGggIT09IG0ubWF0cml4WzBdLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXQgPSBNYXRyaXguemVybyh0aGlzLl9tYXQubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tYXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fbWF0WzBdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbWF0LnNldE1hdHJpeEluZGV4KGksIGosIHRoaXMuX21hdFtpXVtqXSAtIG0ubWF0cml4W2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbiAgICB0aW1lcyhtKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXRbMF0ubGVuZ3RoICE9PSBtLm1hdHJpeC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0ID0gTWF0cml4Lnplcm8odGhpcy5fbWF0Lmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWF0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG0ubWF0cml4WzBdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl9tYXRbMF0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0LnNldE1hdHJpeEluZGV4KGksIGosIG1hdC5tYXRyaXhbaV1bal0gKyB0aGlzLl9tYXRbaV1ba10gKiBtLm1hdHJpeFtrXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXQ7XG4gICAgfVxuICAgIHRpbWVzU2NhbGFyKG4pIHtcbiAgICAgICAgbGV0IG1hdCA9IE1hdHJpeC56ZXJvKHRoaXMuX21hdC5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21hdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9tYXRbMF0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBtYXQuc2V0TWF0cml4SW5kZXgoaSwgaiwgdGhpcy5fbWF0W2ldW2pdICogbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdDtcbiAgICB9XG4gICAgZGV0ZXJtaW5hbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXQubGVuZ3RoICE9PSB0aGlzLl9tYXRbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbWF0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdFswXVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbWF0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hdFswXVswXSAqIHRoaXMuX21hdFsxXVsxXSAtIHRoaXMuX21hdFswXVsxXSAqIHRoaXMuX21hdFsxXVswXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGV0ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tYXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRldCArPSAoLTEpICoqIGkgKiB0aGlzLl9tYXRbMF1baV0gKiB0aGlzLnN1Yk1hdHJpeCgwLCBpKS5kZXRlcm1pbmFudCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXQ7XG4gICAgfVxuICAgIGludmVyc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXQubGVuZ3RoICE9PSB0aGlzLl9tYXRbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXQgPSB0aGlzLmRldGVybWluYW50KCk7XG4gICAgICAgIGlmIChkZXQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tYXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChbWzEgLyB0aGlzLl9tYXRbMF1bMF1dXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29mYWN0b3JNYXQgPSBuZXcgTWF0cml4KHRoaXMuX21hdC5tYXAoKHJvdywgaSkgPT4gcm93Lm1hcCgoXywgaikgPT4gKC0xKSAqKiAoaSArIGopICogdGhpcy5zdWJNYXRyaXgoaSwgaikuZGV0ZXJtaW5hbnQoKSkpKTtcbiAgICAgICAgY29uc3QgYWRqdWdhdGVNYXQgPSBjb2ZhY3Rvck1hdC50cmFuc3Bvc2UoKTtcbiAgICAgICAgcmV0dXJuIGFkanVnYXRlTWF0LnRpbWVzU2NhbGFyKDEgLyBkZXQpO1xuICAgIH1cbiAgICBzdWJNYXRyaXgoaSwgaikge1xuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLl9tYXQuZmlsdGVyKChfLCBtKSA9PiBtICE9PSBpKS5tYXAoKHJvdykgPT4gcm93LmZpbHRlcigoXywgbikgPT4gbiAhPT0gaikpKTtcbiAgICB9XG4gICAgdHJhbnNwb3NlKCkge1xuICAgICAgICBsZXQgbWF0ID0gTWF0cml4Lnplcm8odGhpcy5fbWF0WzBdLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWF0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX21hdFswXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIG1hdC5zZXRNYXRyaXhJbmRleChqLCBpLCB0aGlzLl9tYXRbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXQ7XG4gICAgfVxuICAgIC8vIFR5cGVzXG4gICAgc3RhdGljIHplcm8obikge1xuICAgICAgICBsZXQgbWF0ID0gbmV3IEFycmF5KG4pLmZpbGwoMCkubWFwKCgpID0+IG5ldyBBcnJheShuKS5maWxsKDApKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgobWF0KTtcbiAgICB9XG4gICAgc3RhdGljIGlkZW50aXR5KG4pIHtcbiAgICAgICAgbGV0IG1hdCA9IG5ldyBBcnJheShuKS5maWxsKDApLm1hcCgoKSA9PiBuZXcgQXJyYXkobikuZmlsbCgwKSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBtYXRbaV1baV0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KG1hdCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTWF0cml4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBWZWN0b3Ige1xuICAgIGdldCBhcnIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcmllbnQgPT09ICdyb3cnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Fyci5tYXAoKG51bSkgPT4gW251bV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCB2ZWN0b3IoYXJyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJyWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fYXJyID0gYXJyO1xuICAgICAgICAgICAgdGhpcy5fb3JpZW50ID0gJ3Jvdyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hcnIgPSBhcnIubWFwKChudW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG51bSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudW1bMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9vcmllbnQgPSAnY29sdW1uJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgb3JpZW50YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmllbnQ7XG4gICAgfVxuICAgIGdldCBkaW1lbnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaW07XG4gICAgfVxuICAgIGF0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJbaW5kZXhdO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcnJbMF0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl9hcnIgPSBhcnI7XG4gICAgICAgICAgICB0aGlzLl9vcmllbnQgPSAncm93JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FyciA9IGFyci5tYXAoKG51bSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bVswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX29yaWVudCA9ICdjb2x1bW4nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RpbSA9IHRoaXMuX2Fyci5sZW5ndGg7XG4gICAgfVxuICAgIHBsdXModikge1xuICAgICAgICBpZiAodGhpcy5fZGltICE9PSB2LmRpbWVuc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSB2Lm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3JvdycpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmVjID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kaW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXdWZWNbaV0gPSB0aGlzLl9hcnJbaV0gKyB2LmF0KGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihuZXdWZWMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZlYyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGltOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmVjW2ldID0gW3RoaXMuX2FycltpXSArIHYuYXQoaSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihuZXdWZWMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbWludXModikge1xuICAgICAgICBpZiAodGhpcy5fZGltICE9PSB2LmRpbWVuc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSB2Lm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3JvdycpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmVjID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kaW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXdWZWNbaV0gPSB0aGlzLl9hcnJbaV0gLSB2LmF0KGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihuZXdWZWMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZlYyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGltOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmVjW2ldID0gW3RoaXMuX2FycltpXSAtIHYuYXQoaSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihuZXdWZWMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNjYWxlKG4pIHtcbiAgICAgICAgbGV0IG5ld1ZlYyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RpbTsgaSsrKSB7XG4gICAgICAgICAgICBuZXdWZWNbaV0gPSB0eXBlb2YgdGhpcy5fYXJyW2ldID09PSAnbnVtYmVyJyA/ICh0aGlzLl9hcnJbaV0gKiBuKSA6IFt0aGlzLl9hcnJbaV0gKiBuXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihuZXdWZWMpO1xuICAgIH1cbiAgICB0aW1lcyh2KSB7XG4gICAgICAgIGlmICh0aGlzLl9kaW0gIT09IHYuZGltZW5zaW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld1ZlYyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RpbTsgaSsrKSB7XG4gICAgICAgICAgICBuZXdWZWNbaV0gPVxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9hcnJbaV0gPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gKHRoaXMuX2FycltpXSAqIHYuYXQoaSkpXG4gICAgICAgICAgICAgICAgICAgIDogW3RoaXMuX2FycltpXSAqIHYuYXQoaSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKG5ld1ZlYyk7XG4gICAgfVxuICAgIGRpdmlkZSh2KSB7XG4gICAgICAgIGlmICh0aGlzLl9kaW0gIT09IHYuZGltZW5zaW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld1ZlYyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RpbTsgaSsrKSB7XG4gICAgICAgICAgICBuZXdWZWNbaV0gPVxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9hcnJbaV0gPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gKHRoaXMuX2FycltpXSAvIHYuYXQoaSkpXG4gICAgICAgICAgICAgICAgICAgIDogW3RoaXMuX2FycltpXSAvIHYuYXQoaSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKG5ld1ZlYyk7XG4gICAgfVxuICAgIHN1bSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fyci5yZWR1Y2UoKG4sIHQpID0+IG4gKyB0KTtcbiAgICB9XG4gICAgZG90KHYpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RpbSAhPT0gdi5kaW1lbnNpb24gfHwgdGhpcy5vcmllbnRhdGlvbiAhPT0gdi5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtdWx0ID0gdGhpcy50aW1lcyh2KTtcbiAgICAgICAgcmV0dXJuIG11bHQuc3VtKCk7XG4gICAgfVxuICAgIG1hZygpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMudGltZXModGhpcyk7XG4gICAgICAgIGxldCBzdW0gPSByZXMuc3VtKCk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoc3VtKTtcbiAgICB9XG4gICAgcHJvamVjdCh2KSB7XG4gICAgICAgIGxldCBkb3QgPSB0aGlzLmRvdCh2KTtcbiAgICAgICAgbGV0IHJlcyA9IGRvdCAvICh2Lm1hZygpICogdi5tYWcoKSk7XG4gICAgICAgIHJldHVybiB2LnNjYWxlKHJlcyk7XG4gICAgfVxuICAgIHRvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnI7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVmVjdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBWZWN0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9WZWN0b3JcIikpO1xuY2xhc3MgVmVjdG9yMyBleHRlbmRzIFZlY3Rvcl8xLmRlZmF1bHQge1xuICAgIGdldCB4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cbiAgICBnZXQgeigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3o7XG4gICAgfVxuICAgIHNldCB4KG4pIHtcbiAgICAgICAgdGhpcy5feCA9IG47XG4gICAgICAgIHRoaXMudmVjdG9yID0gW3RoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3pdO1xuICAgIH1cbiAgICBzZXQgeShuKSB7XG4gICAgICAgIHRoaXMuX3kgPSBuO1xuICAgICAgICB0aGlzLnZlY3RvciA9IFt0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96XTtcbiAgICB9XG4gICAgc2V0IHoobikge1xuICAgICAgICB0aGlzLl96ID0gbjtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBbdGhpcy5feCwgdGhpcy5feSwgdGhpcy5fel07XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcbiAgICAgICAgbGV0IHZlY3RvciA9IFt4LCB5LCB6XTtcbiAgICAgICAgc3VwZXIodmVjdG9yKTtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLl96ID0gejtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWZWN0b3IzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNYXRyaXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9kZWZzL01hdHJpeFwiKSk7XG5jb25zdCBWZWN0b3IzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZGVmcy9WZWN0b3IzXCIpKTtcbmxldCBhID0gbmV3IFZlY3RvcjNfMS5kZWZhdWx0KDEsIDIsIDMpO1xubGV0IGIgPSBuZXcgTWF0cml4XzEuZGVmYXVsdChbXG4gICAgWzEsIDJdLFxuICAgIFszLCA0XSxcbl0pO1xuY29uc29sZS5sb2coYi5pbnZlcnNlKCkpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9