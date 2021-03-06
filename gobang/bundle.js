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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

window.game = new _game.GAME('#canvas', '#status', '.result');
game.init(20, 20, 1000, 1000);
document.querySelector('#result button').addEventListener('click', function () {
	game.init(20, 20, 1000, 1000);
	document.querySelector('#result').style.display = 'none';
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * el ????????????
 * ctx ??????context
 * statusEl ????????????
 * resultEl ????????????????????????
 * player ???????????????true?????????false??????
 * firstInit ??????????????????
 * waiting ???????????????????????????????????????
 * process ????????????
 * lastImg ??????????????????????????????s????????????????????????
 * rowNum ???????????????
 * colNum ???????????????
 * row ?????????
 * col ?????????
 * chessGrid ????????????
 * chessmanSize ????????????
 */
var GAME = function () {
    function GAME(canvasSelector, statusSelector, resultSelector) {
        _classCallCheck(this, GAME);

        this.el = document.querySelector(canvasSelector);
        this.ctx = this.el.getContext('2d');
        this.statusEl = document.querySelector(statusSelector);
        this.resultEl = document.querySelector(resultSelector);
        this.player = false;
        this.firstInit = true; // ????????????????????????
        this.waiting = false;
        this.process = [];
        this.lastImg = null;
    }
    /**
     * ???????????????
     * @param  {Number} rowNum ???????????????
     * @param  {Number} colNum ???????????????
     * @param  {Number} row ?????????
     * @param  {Number} col ?????????
     */


    _createClass(GAME, [{
        key: 'init',
        value: function init(rowNum, colNum, row, col) {
            if (row / rowNum != col / colNum) {
                alert('????????????????????????????????????.');
                return false;
            }
            this.rowNum = rowNum;
            this.colNum = colNum;
            this.row = row;
            this.col = col;
            // ??????????????????
            this.chessGrid = row / rowNum;
            // ??????????????????
            this.chessmanSize = row / rowNum / 2 - 2;

            // ???????????????????????????
            this.status = [];
            for (var _i = 0; _i < rowNum - 1; _i++) {
                this.status[_i] = [];
                for (var j = 0; j < colNum - 1; j++) {
                    this.status[_i][j] = null;
                }
            }

            // ?????????
            // ?????????
            this.ctx.fillStyle = "#FFF";
            this.ctx.fillRect(0, 0, row, col);
            // ?????????
            this.ctx.strokeStyle = "#000";
            this.ctx.beginPath();
            var i = 1;
            while (i < rowNum) {
                this.ctx.moveTo(0, i * row / rowNum);
                this.ctx.lineTo(row, i * row / rowNum);
                i++;
            }
            i = 1;
            while (i < colNum) {
                this.ctx.moveTo(i * col / colNum, 0);
                this.ctx.lineTo(i * col / colNum, col);
                i++;
            }
            this.ctx.stroke();
            if (this.firstInit) {
                this.firstInit = false;
                this.bindEvent();
            }
            this.statusEl.innerText = '';
            this.waiting = false;
            this.player = false;
            this.process = [];
        }
        /**
         * ????????????
         * @param  {Boolean} type ??????type=false,??????type=true
         * @param  {Array} station [?????????, ?????????]
         */

    }, {
        key: 'createChessman',
        value: function createChessman(type, station) {
            this.ctx.fillStyle = type ? '#fff' : '#000';
            this.ctx.beginPath();
            this.ctx.arc(station[0], station[1], this.chessmanSize, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.strokeStyle = '#000';
            this.ctx.beginPath();
            this.ctx.arc(station[0], station[1], this.chessmanSize, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        /**
         * ????????????????????????????????????????????????
         * @param  {Array} station [?????????, ?????????]
         * @param  {Boolean} isClear ?????????????????????
         */

    }, {
        key: 'createCurrentTip',
        value: function createCurrentTip(station, isClear) {
            var length = this.chessmanSize / 2;
            this.ctx.strokeStyle = isClear ? '#fff' : '#f75000';
            this.ctx.lineJoin = 'miter';
            this.ctx.beginPath();
            // ?????????
            this.ctx.moveTo(station[0] - this.chessmanSize + length, station[1] - this.chessmanSize);
            this.ctx.lineTo(station[0] - this.chessmanSize, station[1] - this.chessmanSize);
            this.ctx.lineTo(station[0] - this.chessmanSize, station[1] - this.chessmanSize + length);
            // ?????????
            this.ctx.moveTo(station[0] - this.chessmanSize, station[1] + this.chessmanSize - length);
            this.ctx.lineTo(station[0] - this.chessmanSize, station[1] + this.chessmanSize);
            this.ctx.lineTo(station[0] - this.chessmanSize + length, station[1] + this.chessmanSize);
            // ?????????
            this.ctx.moveTo(station[0] + this.chessmanSize - length, station[1] + this.chessmanSize);
            this.ctx.lineTo(station[0] + this.chessmanSize, station[1] + this.chessmanSize);
            this.ctx.lineTo(station[0] + this.chessmanSize, station[1] + this.chessmanSize - length);
            // ?????????
            this.ctx.moveTo(station[0] + this.chessmanSize, station[1] - this.chessmanSize + length);
            this.ctx.lineTo(station[0] + this.chessmanSize, station[1] - this.chessmanSize);
            this.ctx.lineTo(station[0] + this.chessmanSize - length, station[1] - this.chessmanSize);
            this.ctx.stroke();
        }

        /**
         * ????????????????????????????????????
         * @param  {Boolean} type ??????type=false,??????type=true
         * @param  {Number} x X??????
         * @param  {Number} y Y??????
         * @return {Boolean}   true?????????false?????????null??????undefined????????????
         */

    }, {
        key: 'checkIfChess',
        value: function checkIfChess(x, y) {
            // ??????????????????????????????????????????trc-catch????????????
            try {
                var status = this.status[x][y];
                return status;
            } catch (e) {
                return undefined;
            }
        }

        /**
         * ????????????????????????
         * @param  {Number} x X??????
         * @param  {Number} y Y??????
         * @param  {Number} way 1??????2??????3??????-?????????4??????-??????
         * @param  {Boolean} direc ?????????1??????2???
         * @param  {Number} count ??????
         * @return {Boolean} [description]
         */

    }, {
        key: 'judgeGameOver',
        value: function judgeGameOver(x, y, way) {
            var count = 1;
            var flagL = false,
                flagR = false;
            switch (way) {
                case 1:
                    for (var i = 1; i <= 4; i++) {
                        var res = this.checkIfChess(x - i, y);
                        if (res === this.player) {
                            count++;
                        } else if (res === null) {
                            flagL = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    for (var _i2 = 1; _i2 <= 4; _i2++) {
                        var _res = this.checkIfChess(x + _i2, y);
                        if (_res === this.player) {
                            count++;
                        } else if (_res === null) {
                            flagR = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    break;
                case 2:
                    for (var _i3 = 1; _i3 <= 4; _i3++) {
                        var _res2 = this.checkIfChess(x, y - _i3);
                        if (_res2 === this.player) {
                            count++;
                        } else if (_res2 === null) {
                            flagL = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    for (var _i4 = 1; _i4 <= 4; _i4++) {
                        var _res3 = this.checkIfChess(x, y + _i4);
                        if (_res3 === this.player) {
                            count++;
                        } else if (_res3 === null) {
                            flagR = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    break;
                case 3:
                    for (var _i5 = 1; _i5 <= 4; _i5++) {
                        var _res4 = this.checkIfChess(x - _i5, y - _i5);
                        if (_res4 === this.player) {
                            count++;
                        } else if (_res4 === null) {
                            flagL = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    for (var _i6 = 1; _i6 <= 4; _i6++) {
                        var _res5 = this.checkIfChess(x + _i6, y + _i6);
                        if (_res5 === this.player) {
                            count++;
                        } else if (_res5 === null) {
                            flagR = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    break;
                case 4:
                    for (var _i7 = 1; _i7 <= 4; _i7++) {
                        var _res6 = this.checkIfChess(x + _i7, y - _i7);
                        if (_res6 === this.player) {
                            count++;
                        } else if (_res6 === null) {
                            flagL = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    for (var _i8 = 1; _i8 <= 4; _i8++) {
                        var _res7 = this.checkIfChess(x - _i8, y + _i8);
                        if (_res7 === this.player) {
                            count++;
                        } else if (_res7 === null) {
                            flagR = true;
                            break;
                        } else {
                            break;
                        }
                    }
                    break;
            }
            //  || (flagL && flagR && count == 4)
            if (count == 5) {
                return true;
            }
            /*// ?????????
            if (this.checkIfChess(x - 1, y) || this.checkIfChess(x + 1, y)) {
                console.log('???')
            }
            // ?????????
            if (this.checkIfChess(x, y - 1) || this.checkIfChess(x, y + 1)) {
                console.log('???')
            }
            // ??????????????????-?????????
            if (this.checkIfChess(x - 1, y - 1) || this.checkIfChess(x + 1, y + 1)) {
                console.log('??????-??????')
            }
            // ??????????????????-?????????
            if (this.checkIfChess(x - 1, y + 1) || this.checkIfChess(x + 1, y - 1)) {
                console.log('??????-??????')
            }*/
        }

        /**
         * ???????????????????????????
         * @return {[type]} [description]
         */

    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var _this = this;

            this.el.addEventListener('click', function (e) {
                if (_this.waiting) {
                    return false;
                }
                var x = void 0,
                    y = void 0;
                if (e.layerX || e.layerX == 0) {
                    x = e.layerX;
                    y = e.layerY;
                } else if (e.offsetX || e.offsetX == 0) {
                    // Opera  
                    x = e.offsetX;
                    y = e.offsetY;
                }
                var xCount = Math.floor((x - _this.chessGrid / 2) / _this.chessGrid) + 1,
                    yCount = Math.floor((y - _this.chessGrid / 2) / _this.chessGrid) + 1;
                // ????????????????????????????????????????????????????????????
                if (xCount && yCount && xCount < _this.rowNum && yCount < _this.colNum && _this.status[xCount - 1][yCount - 1] === null) {
                    if (_this.process.length) {
                        _this.ctx.putImageData(_this.lastImg, 0, 0);
                    }
                    _this.createChessman(_this.player, [_this.chessGrid * xCount, _this.chessGrid * yCount]);
                    _this.lastImg = _this.ctx.getImageData(0, 0, _this.el.width, _this.el.height);
                    _this.createCurrentTip([_this.chessGrid * xCount, _this.chessGrid * yCount]);
                    _this.status[xCount - 1][yCount - 1] = _this.player;
                    _this.statusEl.innerHTML += (_this.player ? '??????' : '??????') + '??????(' + xCount + ',' + yCount + ')<br/>';
                    _this.process.push([xCount, yCount]);
                    // ????????????????????????
                    if (_this.judgeGameOver(xCount - 1, yCount - 1, 1) || _this.judgeGameOver(xCount - 1, yCount - 1, 2) || _this.judgeGameOver(xCount - 1, yCount - 1, 3) || _this.judgeGameOver(xCount - 1, yCount - 1, 4)) {
                        _this.statusEl.innerHTML += (_this.player ? '??????' : '??????') + '??????';
                        document.querySelector('#result').style.display = 'block';
                        _this.resultEl.innerText = (_this.player ? '??????' : '??????') + '??????';
                        _this.waiting = true;
                        // setTimeout(() => {
                        // this.init(this.rowNum, this.colNum, this.row, this.col);
                        // }, 3000)
                    } else {
                        _this.player = !_this.player;
                    }
                }
            });
        }
    }]);

    return GAME;
}();

exports.GAME = GAME;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map