webpackJsonp([0],[
/* 0 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_export.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , core      = __webpack_require__(/*! ./_core */ 27)
  , hide      = __webpack_require__(/*! ./_hide */ 14)
  , redefine  = __webpack_require__(/*! ./_redefine */ 15)
  , ctx       = __webpack_require__(/*! ./_ctx */ 28)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_an-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_global.js ***!
  \**************************************/
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_fails.js ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-object.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_wks.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(/*! ./_shared */ 63)('wks')
  , uid        = __webpack_require__(/*! ./_uid */ 43)
  , Symbol     = __webpack_require__(/*! ./_global */ 2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_descriptors.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_object-dp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 102)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 25)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-length.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 21);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 10 */,
/* 11 */
/* exports provided: logDebugInfo */
/* exports used: logDebugInfo */
/*!***********************!*\
  !*** ./src/Logger.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = logDebugInfo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(/*! ./config */ 53);
/**
 * Created by kfang on 9/19/17.
 */


function logDebugInfo(info) {
    if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].debug) {
        console.log(info);
    }
}

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_has.js ***!
  \***********************************/
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_a-function.js ***!
  \******************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_hide.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(/*! ./_object-dp */ 7)
  , createDesc = __webpack_require__(/*! ./_property-desc */ 32);
module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_redefine.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , hide      = __webpack_require__(/*! ./_hide */ 14)
  , has       = __webpack_require__(/*! ./_has */ 12)
  , SRC       = __webpack_require__(/*! ./_uid */ 43)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 27).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-html.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , defined = __webpack_require__(/*! ./_defined */ 21)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-iobject.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 50)
  , defined = __webpack_require__(/*! ./_defined */ 21);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopd.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(/*! ./_object-pie */ 51)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 32)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 17)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 25)
  , has            = __webpack_require__(/*! ./_has */ 12)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 102)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-gpo.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(/*! ./_has */ 12)
  , toObject    = __webpack_require__(/*! ./_to-object */ 9)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 80)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_cof.js ***!
  \***********************************/
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_defined.js ***!
  \***************************************/
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 22 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_strict-method.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_array-methods.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(/*! ./_ctx */ 28)
  , IObject  = __webpack_require__(/*! ./_iobject */ 50)
  , toObject = __webpack_require__(/*! ./_to-object */ 9)
  , toLength = __webpack_require__(/*! ./_to-length */ 8)
  , asc      = __webpack_require__(/*! ./_array-species-create */ 143);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-sap.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0)
  , core    = __webpack_require__(/*! ./_core */ 27)
  , fails   = __webpack_require__(/*! ./_fails */ 3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_to-primitive.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 26 */
/* exports provided: setScaleAndAnchorForObject, hideBlock, showBlock, createLoadingText, loadStart, fileComplete, repositionBlock, repositionText, getInstruction, setReadableCode, sendHttpRequest, printHttpResponse, rescaleObject, rescaleXOffset, rescaleYOffset */
/* exports used: rescaleObject, rescaleXOffset, rescaleYOffset, hideBlock, createLoadingText, loadStart, fileComplete, getInstruction, setReadableCode, repositionBlock, repositionText, showBlock, sendHttpRequest, printHttpResponse */
/*!***********************!*\
  !*** ./src/UIUtil.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setScaleAndAnchorForObject */
/* harmony export (immutable) */ __webpack_exports__["d"] = hideBlock;
/* harmony export (immutable) */ __webpack_exports__["l"] = showBlock;
/* harmony export (immutable) */ __webpack_exports__["e"] = createLoadingText;
/* harmony export (immutable) */ __webpack_exports__["f"] = loadStart;
/* harmony export (immutable) */ __webpack_exports__["g"] = fileComplete;
/* harmony export (immutable) */ __webpack_exports__["j"] = repositionBlock;
/* harmony export (immutable) */ __webpack_exports__["k"] = repositionText;
/* harmony export (immutable) */ __webpack_exports__["h"] = getInstruction;
/* harmony export (immutable) */ __webpack_exports__["i"] = setReadableCode;
/* harmony export (immutable) */ __webpack_exports__["m"] = sendHttpRequest;
/* harmony export (immutable) */ __webpack_exports__["n"] = printHttpResponse;
/* harmony export (immutable) */ __webpack_exports__["a"] = rescaleObject;
/* harmony export (immutable) */ __webpack_exports__["b"] = rescaleXOffset;
/* harmony export (immutable) */ __webpack_exports__["c"] = rescaleYOffset;
function setScaleAndAnchorForObject(obj, sX, sY, aX, aY) {
    obj.scale.setTo(sX, sY);
    obj.anchor.setTo(aX, aY);
}

function hideBlock() {
    document.getElementById('block').style.display = 'none';
    document.getElementById('textarea').style.display = 'none';
}

function showBlock() {
    document.getElementById('block').style.display = 'block';
    document.getElementById('textarea').style.display = 'block';
}

function createLoadingText(game) {
    let loadingText = game.add.text(game.world.centerX, game.world.centerY, '努力加载中...', { font: "65px Arial", fill: "#F3FF33", align: "center" });
    loadingText.anchor.set(0.5);
    rescaleObject(loadingText, game, 1, 1);
    return loadingText;
}

function loadStart() {
    this.loadingText.setText("努力加载中 ...");
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText("已完成: " + progress + '%');
}

function repositionBlock(grid_bottom_left_x, grid_bottom_left_y, background_height) {
    let block_container = document.getElementById('block');
    block_container.style.top = (grid_bottom_left_y + 50).toString() + 'px';
    block_container.style.left = grid_bottom_left_x.toString() + 'px';
    let height = Math.round(background_height - grid_bottom_left_y).toString() + 'px';
    console.log(background_height);
    console.log(grid_bottom_left_y);
    console.log(height);
    block_container.style.height = height;
}

function repositionText(y, height, width) {
    let text_container_style = document.getElementById('textarea').style;
    text_container_style.top = Math.round(y + 50).toString() + 'px';
    text_container_style.height = Math.round(height).toString() + 'px';
    text_container_style.width = Math.round(width).toString() + 'px';
}

function getInstruction(workspace) {
    let startBlock = workspace.getTopBlocks()[0];
    return Blockly.JavaScript[startBlock.type](startBlock);
}

function setReadableCode(code) {
    let rawCode = JSON.parse(code);
    let readableCode = '';
    let currentIndent = 0;
    for (let i = 0; i < rawCode.length; i++) {
        let statement = rawCode[i];
        if (statement.name === 'RepeatEnd') {
            currentIndent -= 1;
            continue;
        }
        readableCode += '  '.repeat(currentIndent);
        if (statement.name === 'RepeatStart') {
            readableCode += 'for i in range(' + statement.count + '):\n';
            currentIndent += 1;
            continue;
        }
        readableCode += statement.name + '(';
        for (let k in statement) {
            if (k === 'name') {
                continue;
            }
            readableCode += k + '=' + statement[k] + ',';
        }
        if (readableCode[readableCode.length - 1] === ',') {
            readableCode = readableCode.substring(0, readableCode.length - 1);
        }
        readableCode += ')\n';
    }
    document.getElementById('instructions').innerHTML = readableCode;
}

function sendHttpRequest(callback, operation, url, params) {
    console.log('Send http request to ' + url + ' with operation ' + operation + ' and params: ' + params);
    let http = new XMLHttpRequest();
    http.open(operation, url, true);
    http.setRequestHeader("Content-type", "application/json; charset=utf-8");
    http.onreadystatechange = callback;
    http.send(params);
}

function printHttpResponse() {
    if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
    }
}

function rescaleObject(obj, game, sX, sY) {
    obj.scale.setTo(sX * game.global.hScale, sY * game.global.vScale);
}

function rescaleXOffset(offset, game) {
    return Math.round(offset * game.global.hScale);
}

function rescaleYOffset(offset, game) {
    return Math.round(offset * game.global.vScale);
}

/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_core.js ***!
  \************************************/
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 28 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_ctx.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 13);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_metadata.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(/*! ./es6.map */ 118)
  , $export = __webpack_require__(/*! ./_export */ 0)
  , shared  = __webpack_require__(/*! ./_shared */ 63)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 121)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_typed-array.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(/*! ./_descriptors */ 6)){
  var LIBRARY             = __webpack_require__(/*! ./_library */ 36)
    , global              = __webpack_require__(/*! ./_global */ 2)
    , fails               = __webpack_require__(/*! ./_fails */ 3)
    , $export             = __webpack_require__(/*! ./_export */ 0)
    , $typed              = __webpack_require__(/*! ./_typed */ 64)
    , $buffer             = __webpack_require__(/*! ./_typed-buffer */ 87)
    , ctx                 = __webpack_require__(/*! ./_ctx */ 28)
    , anInstance          = __webpack_require__(/*! ./_an-instance */ 35)
    , propertyDesc        = __webpack_require__(/*! ./_property-desc */ 32)
    , hide                = __webpack_require__(/*! ./_hide */ 14)
    , redefineAll         = __webpack_require__(/*! ./_redefine-all */ 40)
    , toInteger           = __webpack_require__(/*! ./_to-integer */ 33)
    , toLength            = __webpack_require__(/*! ./_to-length */ 8)
    , toIndex             = __webpack_require__(/*! ./_to-index */ 42)
    , toPrimitive         = __webpack_require__(/*! ./_to-primitive */ 25)
    , has                 = __webpack_require__(/*! ./_has */ 12)
    , same                = __webpack_require__(/*! ./_same-value */ 115)
    , classof             = __webpack_require__(/*! ./_classof */ 49)
    , isObject            = __webpack_require__(/*! ./_is-object */ 4)
    , toObject            = __webpack_require__(/*! ./_to-object */ 9)
    , isArrayIter         = __webpack_require__(/*! ./_is-array-iter */ 72)
    , create              = __webpack_require__(/*! ./_object-create */ 37)
    , getPrototypeOf      = __webpack_require__(/*! ./_object-gpo */ 19)
    , gOPN                = __webpack_require__(/*! ./_object-gopn */ 38).f
    , getIterFn           = __webpack_require__(/*! ./core.get-iterator-method */ 89)
    , uid                 = __webpack_require__(/*! ./_uid */ 43)
    , wks                 = __webpack_require__(/*! ./_wks */ 5)
    , createArrayMethod   = __webpack_require__(/*! ./_array-methods */ 23)
    , createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 54)
    , speciesConstructor  = __webpack_require__(/*! ./_species-constructor */ 81)
    , ArrayIterators      = __webpack_require__(/*! ./es6.array.iterator */ 90)
    , Iterators           = __webpack_require__(/*! ./_iterators */ 46)
    , $iterDetect         = __webpack_require__(/*! ./_iter-detect */ 60)
    , setSpecies          = __webpack_require__(/*! ./_set-species */ 41)
    , arrayFill           = __webpack_require__(/*! ./_array-fill */ 65)
    , arrayCopyWithin     = __webpack_require__(/*! ./_array-copy-within */ 95)
    , $DP                 = __webpack_require__(/*! ./_object-dp */ 7)
    , $GOPD               = __webpack_require__(/*! ./_object-gopd */ 18)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 31 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_meta.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(/*! ./_uid */ 43)('meta')
  , isObject = __webpack_require__(/*! ./_is-object */ 4)
  , has      = __webpack_require__(/*! ./_has */ 12)
  , setDesc  = __webpack_require__(/*! ./_object-dp */ 7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 32 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_property-desc.js ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 33 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-integer.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 34 */
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./src/util/TooltipBuilder.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addTooltip;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Phasetips__ = __webpack_require__(/*! ./Phasetips */ 140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Phasetips___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Phasetips__);
/**
 * Created by kfang on 7/2/17.
 */


function addTooltip(gameInstance, targetObject, msg, position) {
    new __WEBPACK_IMPORTED_MODULE_0__Phasetips___default.a(gameInstance, {
        targetObject: targetObject,
        context: msg,
        position: position,
        backgroundColor: 0x33BBFF
    });
}

/***/ }),
/* 35 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_an-instance.js ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 36 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_library.js ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 37 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-create.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , dPs         = __webpack_require__(/*! ./_object-dps */ 108)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 68)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 80)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 67)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 38 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopn.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 110)
  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 68).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 39 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-keys.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 110)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 68);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 40 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_redefine-all.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 15);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 41 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_set-species.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(/*! ./_global */ 2)
  , dP          = __webpack_require__(/*! ./_object-dp */ 7)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6)
  , SPECIES     = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 42 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_to-index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 43 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_uid.js ***!
  \***********************************/
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 44 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_add-to-unscopables.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(/*! ./_hide */ 14)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 45 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_for-of.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(/*! ./_ctx */ 28)
  , call        = __webpack_require__(/*! ./_iter-call */ 104)
  , isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 72)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toLength    = __webpack_require__(/*! ./_to-length */ 8)
  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 89)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 46 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iterators.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 47 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_set-to-string-tag.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 7).f
  , has = __webpack_require__(/*! ./_has */ 12)
  , TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 48 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-trim.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , defined = __webpack_require__(/*! ./_defined */ 21)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , spaces  = __webpack_require__(/*! ./_string-ws */ 85)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 49 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_classof.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 20)
  , TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 50 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_iobject.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 20);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 51 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-pie.js ***!
  \******************************************/
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 52 */,
/* 53 */
/* exports provided: default */
/* exports used: default */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    designWidth: 1440,
    designHeight: 900,
    animationDuration: 500,
    rootConf: 'assets/conf/root_config.json',
    localStorageName: 'phaseres6webpack',
    url: 'mindlinker.herokuapp.com',
    updateTaskStatus: 'updateTaskStatusByUserIdByGameIdByTaskId',
    debug: true
});

/***/ }),
/* 54 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_array-includes.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8)
  , toIndex   = __webpack_require__(/*! ./_to-index */ 42);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 55 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_collection.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(/*! ./_global */ 2)
  , $export           = __webpack_require__(/*! ./_export */ 0)
  , redefine          = __webpack_require__(/*! ./_redefine */ 15)
  , redefineAll       = __webpack_require__(/*! ./_redefine-all */ 40)
  , meta              = __webpack_require__(/*! ./_meta */ 31)
  , forOf             = __webpack_require__(/*! ./_for-of */ 45)
  , anInstance        = __webpack_require__(/*! ./_an-instance */ 35)
  , isObject          = __webpack_require__(/*! ./_is-object */ 4)
  , fails             = __webpack_require__(/*! ./_fails */ 3)
  , $iterDetect       = __webpack_require__(/*! ./_iter-detect */ 60)
  , setToStringTag    = __webpack_require__(/*! ./_set-to-string-tag */ 47)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 71);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 56 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_fix-re-wks.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(/*! ./_hide */ 14)
  , redefine = __webpack_require__(/*! ./_redefine */ 15)
  , fails    = __webpack_require__(/*! ./_fails */ 3)
  , defined  = __webpack_require__(/*! ./_defined */ 21)
  , wks      = __webpack_require__(/*! ./_wks */ 5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 57 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_flags.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 58 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_invoke.js ***!
  \**************************************/
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 59 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-regexp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , cof      = __webpack_require__(/*! ./_cof */ 20)
  , MATCH    = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 60 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-detect.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 61 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_object-forced-pam.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 36)|| !__webpack_require__(/*! ./_fails */ 3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(/*! ./_global */ 2)[K];
});

/***/ }),
/* 62 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gops.js ***!
  \*******************************************/
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 63 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_shared.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 64 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_typed.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2)
  , hide   = __webpack_require__(/*! ./_hide */ 14)
  , uid    = __webpack_require__(/*! ./_uid */ 43)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 65 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_array-fill.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9)
  , toIndex  = __webpack_require__(/*! ./_to-index */ 42)
  , toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 66 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_create-property.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7)
  , createDesc      = __webpack_require__(/*! ./_property-desc */ 32);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 67 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_dom-create.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , document = __webpack_require__(/*! ./_global */ 2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 68 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_enum-bug-keys.js ***!
  \*********************************************/
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 69 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_fails-is-regexp.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 70 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_html.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_global */ 2).document && document.documentElement;

/***/ }),
/* 71 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_inherit-if-required.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 79).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 72 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_is-array-iter.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(/*! ./_iterators */ 46)
  , ITERATOR   = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 73 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_is-array.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 20);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 74 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-create.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(/*! ./_object-create */ 37)
  , descriptor     = __webpack_require__(/*! ./_property-desc */ 32)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 14)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 75 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-define.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(/*! ./_library */ 36)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , redefine       = __webpack_require__(/*! ./_redefine */ 15)
  , hide           = __webpack_require__(/*! ./_hide */ 14)
  , has            = __webpack_require__(/*! ./_has */ 12)
  , Iterators      = __webpack_require__(/*! ./_iterators */ 46)
  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 74)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19)
  , ITERATOR       = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 76 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-expm1.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 77 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_math-sign.js ***!
  \*****************************************/
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 78 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_microtask.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , macrotask = __webpack_require__(/*! ./_task */ 86).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(/*! ./_cof */ 20)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 79 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_set-proto.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(/*! ./_ctx */ 28)(Function.call, __webpack_require__(/*! ./_object-gopd */ 18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 80 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_shared-key.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 63)('keys')
  , uid    = __webpack_require__(/*! ./_uid */ 43);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 81 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_species-constructor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(/*! ./_an-object */ 1)
  , aFunction = __webpack_require__(/*! ./_a-function */ 13)
  , SPECIES   = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 82 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-at.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
  , defined   = __webpack_require__(/*! ./_defined */ 21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 83 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_string-context.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 59)
  , defined  = __webpack_require__(/*! ./_defined */ 21);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 84 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_string-repeat.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 33)
  , defined   = __webpack_require__(/*! ./_defined */ 21);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 85 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-ws.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 86 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_task.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(/*! ./_ctx */ 28)
  , invoke             = __webpack_require__(/*! ./_invoke */ 58)
  , html               = __webpack_require__(/*! ./_html */ 70)
  , cel                = __webpack_require__(/*! ./_dom-create */ 67)
  , global             = __webpack_require__(/*! ./_global */ 2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(/*! ./_cof */ 20)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 87 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_typed-buffer.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(/*! ./_global */ 2)
  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 6)
  , LIBRARY        = __webpack_require__(/*! ./_library */ 36)
  , $typed         = __webpack_require__(/*! ./_typed */ 64)
  , hide           = __webpack_require__(/*! ./_hide */ 14)
  , redefineAll    = __webpack_require__(/*! ./_redefine-all */ 40)
  , fails          = __webpack_require__(/*! ./_fails */ 3)
  , anInstance     = __webpack_require__(/*! ./_an-instance */ 35)
  , toInteger      = __webpack_require__(/*! ./_to-integer */ 33)
  , toLength       = __webpack_require__(/*! ./_to-length */ 8)
  , gOPN           = __webpack_require__(/*! ./_object-gopn */ 38).f
  , dP             = __webpack_require__(/*! ./_object-dp */ 7).f
  , arrayFill      = __webpack_require__(/*! ./_array-fill */ 65)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 88 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_wks-define.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(/*! ./_global */ 2)
  , core           = __webpack_require__(/*! ./_core */ 27)
  , LIBRARY        = __webpack_require__(/*! ./_library */ 36)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 117)
  , defineProperty = __webpack_require__(/*! ./_object-dp */ 7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 89 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/core.get-iterator-method.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(/*! ./_classof */ 49)
  , ITERATOR  = __webpack_require__(/*! ./_wks */ 5)('iterator')
  , Iterators = __webpack_require__(/*! ./_iterators */ 46);
module.exports = __webpack_require__(/*! ./_core */ 27).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 90 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.iterator.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 44)
  , step             = __webpack_require__(/*! ./_iter-step */ 105)
  , Iterators        = __webpack_require__(/*! ./_iterators */ 46)
  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 75)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./src/animation/SupportedBlocks.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by kfang on 6/16/17.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    WalkLeft: 'WalkLeft',
    WalkRight: 'WalkRight',
    WalkUp: 'WalkUp',
    WalkDown: 'WalkDown',
    RunLeft: 'RunLeft',
    RunRight: 'RunRight',
    RunUp: 'RunUp',
    RunDown: 'RunDown',
    IfStart: 'IfStart',
    Else: 'Else',
    IfEnd: 'IfEnd',
    RepeatStart: 'RepeatStart',
    RepeatEnd: 'RepeatEnd',
    Jump: 'Jump',
    JumpRight: 'JumpRight',
    JumpLeft: 'JumpLeft',
    Turn: 'Turn',
    Attack: 'Attack',
    Standby: 'Standby',
    Defense: 'Defense',
    Walk: 'Walk'
});

/***/ }),
/* 94 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_a-number-value.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 20);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 95 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_array-copy-within.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9)
  , toIndex  = __webpack_require__(/*! ./_to-index */ 42)
  , toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 96 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_array-from-iterable.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 45);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 97 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_array-reduce.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 13)
  , toObject  = __webpack_require__(/*! ./_to-object */ 9)
  , IObject   = __webpack_require__(/*! ./_iobject */ 50)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 98 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_bind.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(/*! ./_a-function */ 13)
  , isObject   = __webpack_require__(/*! ./_is-object */ 4)
  , invoke     = __webpack_require__(/*! ./_invoke */ 58)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 99 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_collection-strong.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(/*! ./_object-dp */ 7).f
  , create      = __webpack_require__(/*! ./_object-create */ 37)
  , redefineAll = __webpack_require__(/*! ./_redefine-all */ 40)
  , ctx         = __webpack_require__(/*! ./_ctx */ 28)
  , anInstance  = __webpack_require__(/*! ./_an-instance */ 35)
  , defined     = __webpack_require__(/*! ./_defined */ 21)
  , forOf       = __webpack_require__(/*! ./_for-of */ 45)
  , $iterDefine = __webpack_require__(/*! ./_iter-define */ 75)
  , step        = __webpack_require__(/*! ./_iter-step */ 105)
  , setSpecies  = __webpack_require__(/*! ./_set-species */ 41)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6)
  , fastKey     = __webpack_require__(/*! ./_meta */ 31).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 100 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_collection-to-json.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 49)
  , from    = __webpack_require__(/*! ./_array-from-iterable */ 96);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 101 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_collection-weak.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(/*! ./_redefine-all */ 40)
  , getWeak           = __webpack_require__(/*! ./_meta */ 31).getWeak
  , anObject          = __webpack_require__(/*! ./_an-object */ 1)
  , isObject          = __webpack_require__(/*! ./_is-object */ 4)
  , anInstance        = __webpack_require__(/*! ./_an-instance */ 35)
  , forOf             = __webpack_require__(/*! ./_for-of */ 45)
  , createArrayMethod = __webpack_require__(/*! ./_array-methods */ 23)
  , $has              = __webpack_require__(/*! ./_has */ 12)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 102 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_ie8-dom-define.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 6) && !__webpack_require__(/*! ./_fails */ 3)(function(){
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 67)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 103 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_is-integer.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 104 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-call.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 105 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-step.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 106 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-log1p.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 107 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-assign.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(/*! ./_object-keys */ 39)
  , gOPS     = __webpack_require__(/*! ./_object-gops */ 62)
  , pIE      = __webpack_require__(/*! ./_object-pie */ 51)
  , toObject = __webpack_require__(/*! ./_to-object */ 9)
  , IObject  = __webpack_require__(/*! ./_iobject */ 50)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 108 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-dps.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(/*! ./_object-dp */ 7)
  , anObject = __webpack_require__(/*! ./_an-object */ 1)
  , getKeys  = __webpack_require__(/*! ./_object-keys */ 39);

module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 109 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-gopn-ext.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17)
  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 38).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 110 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_object-keys-internal.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(/*! ./_has */ 12)
  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 17)
  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 54)(false)
  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 80)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 111 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-to-array.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(/*! ./_object-keys */ 39)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 17)
  , isEnum    = __webpack_require__(/*! ./_object-pie */ 51).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 112 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_own-keys.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(/*! ./_object-gopn */ 38)
  , gOPS     = __webpack_require__(/*! ./_object-gops */ 62)
  , anObject = __webpack_require__(/*! ./_an-object */ 1)
  , Reflect  = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 113 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_parse-float.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat
  , $trim       = __webpack_require__(/*! ./_string-trim */ 48).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 85) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 114 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_parse-int.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt
  , $trim     = __webpack_require__(/*! ./_string-trim */ 48).trim
  , ws        = __webpack_require__(/*! ./_string-ws */ 85)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 115 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_same-value.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 116 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_string-pad.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 8)
  , repeat   = __webpack_require__(/*! ./_string-repeat */ 84)
  , defined  = __webpack_require__(/*! ./_defined */ 21);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 117 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_wks-ext.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);

/***/ }),
/* 118 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.map.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 99);

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 55)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 119 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.flags.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(/*! ./_descriptors */ 6) && /./g.flags != 'g')__webpack_require__(/*! ./_object-dp */ 7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 57)
});

/***/ }),
/* 120 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.set.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 99);

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 55)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 121 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-map.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(/*! ./_array-methods */ 23)(0)
  , redefine     = __webpack_require__(/*! ./_redefine */ 15)
  , meta         = __webpack_require__(/*! ./_meta */ 31)
  , assign       = __webpack_require__(/*! ./_object-assign */ 107)
  , weak         = __webpack_require__(/*! ./_collection-weak */ 101)
  , isObject     = __webpack_require__(/*! ./_is-object */ 4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 55)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 122 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi__ = __webpack_require__(/*! pixi */ 91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pixi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2__ = __webpack_require__(/*! p2 */ 92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_p2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__states_RootBoot__ = __webpack_require__(/*! ./states/RootBoot */ 131);





class Game extends __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.Game {
    constructor() {
        super(Math.max(window.screen.availWidth, window.screen.availHeight), Math.min(window.screen.availWidth, window.screen.availHeight) - 50, __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.CANVAS, 'content', null);

        this.state.add('RootBoot', __WEBPACK_IMPORTED_MODULE_3__states_RootBoot__["a" /* default */], false);
        this.state.start('RootBoot');
    }
}

window.game = new Game();

/***/ }),
/* 123 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/babel-polyfill/lib/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 321);

__webpack_require__(/*! regenerator-runtime/runtime */ 326);

__webpack_require__(/*! core-js/fn/regexp/escape */ 141);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 52)))

/***/ }),
/* 124 */,
/* 125 */
/* exports provided: default */
/* exports used: default */
/*!************************************************!*\
  !*** ./src/animation/KnightAnimationPlayer.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = play;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__ = __webpack_require__(/*! ./SupportedBlocks */ 93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Logger__ = __webpack_require__(/*! ../Logger */ 11);
/**
 * Created by kfang on 6/16/17.
 */



function play(animationContext) {
    let stepCount = 0;
    let sprite = animationContext.sprite;
    const forwardSpriteKey = animationContext.forwardSpriteKey;
    const backwardSpriteKey = animationContext.backwardSpriteKey;
    const gridWidth = animationContext.gridWidth;
    const gridHeight = animationContext.gridHeight;
    const xDistPerStep = animationContext.step_width_in_pixel;
    const yDistPerStep = animationContext.step_height_in_pixel;
    const maxSteps = animationContext.maxSteps;
    const passCondition = animationContext.passCondition;
    let items = animationContext.items;
    let interactiveItems = animationContext.interactiveItems;
    let interactiveItemSprites = animationContext.interactiveItemSprites;
    let currentGridX = animationContext.startGridX;
    let currentGridY = animationContext.startGridY;
    let faceRight = true;
    let failed = false;
    let path = [];

    let isBlocked = function (xOffset, yOffset) {
        let xP = currentGridX + xOffset;
        let yP = currentGridY + yOffset;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Check valid step: ' + xP + ' , ' + yP + ' , ' + gridWidth + ' , ' + gridHeight);
        if (xP >= gridWidth || yP >= gridHeight) {
            return true;
        }
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.blocker === true) {
                for (let j = 0; j < item.coordinates.length; j++) {
                    let bP = item.coordinates[j];
                    if (bP.x === xP && bP.y === yP) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    let addNewActionToMainSpriteActionQueue = function (name, xOffset, yOffset, spriteKey, audio, spriteToActivate) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Add action to main sprite action queue: ' + name + ' xOffset: ' + xOffset + ' yOffset: ' + yOffset);
        sprite.actionQueue.push({
            name: name,
            xOffset: xOffset,
            yOffset: yOffset,
            spriteKey: spriteKey,
            audio: audio,
            spriteToActivate: spriteToActivate
        });
    };

    let Pause = function () {
        addNewActionToMainSpriteActionQueue(faceRight ? 'Pause' : 'PauseBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, null, null);
    };

    let MakeATurn = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Turn');
        if (faceRight) {
            addNewActionToMainSpriteActionQueue('TurnToLeft', 0, 0, forwardSpriteKey, 'turn', null);
        } else {
            addNewActionToMainSpriteActionQueue('TurnToRight', 0, 0, forwardSpriteKey, 'turn', null);
        }
        faceRight = !faceRight;
        Pause();
    };

    let WalkRight = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Right');
        if (isBlocked(1, 0)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null);
            Pause();
        }
    };

    let WalkLeft = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Left');
        if (isBlocked(-1, 0)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', -step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null);
            Pause();
        }
    };

    let WalkUp = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Up');
        if (isBlocked(0, -1)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', 0, -step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null);
            Pause();
        }
    };

    let WalkDown = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Down');
        if (isBlocked(0, 1)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Walk' : 'WalkBack', 0, step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'walk', null);
            Pause();
        }
    };

    let RunRight = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Right' + ' step: ' + step);
        if (isBlocked(1, 0)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null);
            Pause();
        }
    };

    let RunLeft = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Left');
        if (isBlocked(-1, 0)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', -step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null);
            Pause();
        }
    };

    let RunUp = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Up');
        if (isBlocked(0, -1)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', 0, -step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null);
            Pause();
        }
    };

    let RunDown = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Move Down');
        if (isBlocked(0, 1)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Run' : 'RunBack', 0, step, faceRight ? forwardSpriteKey : backwardSpriteKey, 'run', null);
            Pause();
        }
    };

    let findItemSpriteDefinitionByPositionOffset = function (xOffset, yOffset) {
        let xP = currentGridX + xOffset;
        let yP = currentGridY + yOffset;
        for (let i = 0; i < interactiveItems.length; i++) {
            let itemDef = interactiveItems[i];
            if (itemDef.coordinate.x + '_' + itemDef.coordinate.y === xP + '_' + yP) {
                return itemDef;
            }
        }
        return null;
    };

    let attack = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Attack');
        let interactiveSpriteDef = findItemSpriteDefinitionByPositionOffset(faceRight ? 1 : -1, 0);
        let spriteToActivate = null;
        if (interactiveSpriteDef !== null) {
            let interactiveSprite = findItemSpriteBySpriteName(interactiveSpriteDef.spriteKey);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Add action to sprite: ' + interactiveSprite.name);
            interactiveSprite.actionQueue.push({
                name: interactiveSpriteDef.animationKey,
                xOffset: 0,
                yOffset: 0,
                spriteKey: interactiveSpriteDef.spriteSheetKey,
                audio: null
            });
            interactiveSprite.status = interactiveSpriteDef.statusPostAnimation;
            spriteToActivate = interactiveSprite;
        }
        addNewActionToMainSpriteActionQueue(faceRight ? 'Attack' : 'AttackBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'attack', spriteToActivate);
        Pause();
    };

    let victory = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Victory');
        sprite.taskCompleted = true;
        addNewActionToMainSpriteActionQueue(faceRight ? 'Victory' : 'VictoryBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'victory', null);
    };

    let playFailure = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Fail');
        failed = true;
        sprite.taskCompleted = false;
        addNewActionToMainSpriteActionQueue(faceRight ? 'Fail' : 'FailBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'fail', null);
    };

    let Jump = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Jump');
        addNewActionToMainSpriteActionQueue(faceRight ? 'Jump' : 'JumpBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'jump', null);
        Pause();
    };

    let JumpRight = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Jump Right');
        if (isBlocked(2, 0)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Jump' : 'JumpBack', step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'jump', null);
            Pause();
        }
    };

    let JumpLeft = function (step) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Jump Left');
        if (isBlocked(-2, 0)) {
            playFailure();
        } else {
            addNewActionToMainSpriteActionQueue(faceRight ? 'Jump' : 'JumpBack', -step, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'jump', null);
            Pause();
        }
    };

    let Standby = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Standby');
        addNewActionToMainSpriteActionQueue(faceRight ? 'Standby' : 'StandbyBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, null, null);
    };

    let Defense = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: Defense');
        addNewActionToMainSpriteActionQueue(faceRight ? 'Defense' : 'DefenseBack', 0, 0, faceRight ? forwardSpriteKey : backwardSpriteKey, 'defense', null);
        Pause();
    };
    /**
     * Execute the animation given an action JSON object.
     */
    let playAnimation = function (name) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Play animation for ' + name);
        switch (name) {
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkLeft:
                WalkLeft(xDistPerStep);
                currentGridX--;
                path.push('-1_0');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkDown:
                WalkDown(yDistPerStep);
                currentGridY++;
                path.push('0_1');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkUp:
                WalkUp(yDistPerStep);
                currentGridY--;
                path.push('0_-1');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkRight:
                WalkRight(xDistPerStep);
                currentGridX++;
                path.push('1_0');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunLeft:
                RunLeft(xDistPerStep);
                currentGridX--;
                path.push('-1_0');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunDown:
                RunDown(yDistPerStep);
                currentGridY++;
                path.push('0_1');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunUp:
                RunUp(yDistPerStep);
                currentGridY--;
                path.push('0_-1');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunRight:
                RunRight(xDistPerStep);
                currentGridX++;
                path.push('1_0');
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Attack:
                attack();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Turn:
                MakeATurn();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Jump:
                Jump();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].JumpRight:
                JumpRight(Math.round(xDistPerStep * 2));
                path.push('2_0');
                currentGridX += 2;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].JumpLeft:
                JumpLeft(Math.round(xDistPerStep * 2));
                path.push('-2_0');
                currentGridX -= 2;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Defense:
                Defense();
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Standby:
                Standby();
                break;
        }
    };
    /**
     * Execute if block and return the next index to handle.
     **/
    let executeIfBlock = function (inStream, index) {
        /**
         * Evaluate the condition in a if block.
         */
        let evaluateConditionForIfBlock = function (block) {
            return block.condition;
        };
        let block = inStream[index];
        if (evaluateConditionForIfBlock(block)) {
            return executeInStream(inStream, index + 1);
        } else {
            let count = 1;
            let i = index + 1;
            while (count > 0 && i < inStream.length) {
                let cur = inStream[i];
                switch (cur.name) {
                    case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Else:
                    case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfEnd:
                        count--;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfStart:
                        count++;
                        break;
                }
                i++;
                if (count === 0 && cur.name === __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Else) {
                    return executeInStream(inStream, i);
                }
            }
            return i;
        }
    };
    /**
     * Execute looping block and return the next index to handle.
     */
    let executeLoopingBlock = function (inStream, index) {
        let block = inStream[index];
        let count = block.count;
        let nextIndex = index;
        for (let i = 0; i < count; i++) {
            nextIndex = executeInStream(inStream, index + 1);
        }
        return nextIndex;
    };

    /**
     * Execute the animation given an array of instructions and a starting index.
     */
    let executeInStream = function (stream, index) {
        let i = index;
        let len = stream.length;
        while (i < len) {
            if (failed) {
                return;
            }
            let block = stream[i];
            switch (block.name) {
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkLeft:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkDown:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkUp:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].WalkRight:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunLeft:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunDown:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunUp:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RunRight:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Jump:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Turn:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Attack:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Defense:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Standby:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].JumpRight:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].JumpLeft:
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Play Block: ' + block.name);
                    playAnimation(block.name);
                    i++;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Else:
                    i++;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfEnd:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RepeatEnd:
                    return i + 1;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfStart:
                    i = executeIfBlock(inStream, i);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RepeatStart:
                    i = executeLoopingBlock(inStream, i);
                    break;
                default:
                    alert('Unsupported Block Type: ' + block.name);
                    break;
            }
        }
    };

    let findItemSpriteBySpriteName = function (name) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Locating interactive sprite ' + name);
        for (let i = 0; i < interactiveItemSprites.length; i++) {
            let itemSprite = interactiveItemSprites[i];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Checking interactive sprite ' + itemSprite.name);
            if (itemSprite.name === name) {
                return itemSprite;
            }
        }
        return null;
    };

    let passConditionMatched = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Check final condition at position x = ' + currentGridX + ' y = ' + currentGridY + ' victory x = ' + passCondition.destinationXGrid + ' y = ' + passCondition.destinationYGrid);
        let stepCheck = stepCount < maxSteps;
        let positionCheck = currentGridX + '_' + currentGridY === passCondition.destinationXGrid + '_' + passCondition.destinationYGrid;
        if (passCondition.pathMatched) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])(path.toString());
            let targetPath = passCondition.path;
            for (let i = 0; i < targetPath.length; i++) {
                let offset = targetPath[i];
                if (i >= path.length || offset !== path[i]) {
                    return false;
                }
            }
        }
        if (passCondition.interactions.length > 0) {
            for (let i = 0; i < passCondition.interactions.length; i++) {
                let interaction = passCondition.interactions[i];
                let sprite = findItemSpriteBySpriteName(interaction.sprite);
                if (sprite !== null && sprite.status !== interaction.status) {
                    return false;
                }
            }
        }
        return stepCheck && positionCheck;
    };

    let checkPassOrFail = function () {
        if (Object.keys(passCondition).length === 0 && passCondition.constructor === Object) {
            return;
        }
        if (passConditionMatched()) {
            victory();
        } else {
            playFailure();
        }
    };
    // Main logic for runProgram
    let inStream = JSON.parse(animationContext.instruction);
    if (inStream.length > 0) {
        if (Object.keys(passCondition).length === 0 && passCondition.constructor === Object) {
            sprite.freeMode = true;
        }
        executeInStream(inStream, 0);
        if (!failed) {
            checkPassOrFail();
        }
    }
}

/***/ }),
/* 126 */
/* exports provided: default */
/* exports used: default */
/*!**************************************************!*\
  !*** ./src/animation/PrincessAnimationPlayer.js ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = play;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__ = __webpack_require__(/*! ./SupportedBlocks */ 93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Logger__ = __webpack_require__(/*! ../Logger */ 11);
/**
 * Created by kfang on 7/23/17.
 */



function play(animationContext) {
    let stepCount = 0;
    let sprite = animationContext.sprite;
    const maxSteps = animationContext.maxSteps;
    let passPath = animationContext.passPath;
    let failed = false;
    let path = [];
    let anglesNumber = [Math.PI / 2, Math.PI / 3, Math.PI / 6, 0, Math.PI * 11 / 6, Math.PI * 5 / 3, Math.PI * 3 / 2, Math.PI * 4 / 3, Math.PI * 7 / 6, Math.PI, Math.PI * 5 / 6, Math.PI * 2 / 3];
    let angles = [90, 60, 30, 0, 330, 300, 270, 240, 210, 180, 150, 120];
    let currentClockPosition = animationContext.startClockPosition;

    let addNewActionToMainSpriteActionQueue = function (name, xOffset, yOffset, audio) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Add action to main sprite action queue: ' + name + ' xOffset: ' + xOffset + ' yOffset: ' + yOffset);
        sprite.actionQueue.push({
            name: name,
            xOffset: xOffset,
            yOffset: yOffset,
            audio: audio
        });
    };

    let Turn = function (turnKey) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: ' + turnKey);
        addNewActionToMainSpriteActionQueue(turnKey, 0, 0, 'turn');
    };

    let Walk = function (walkKey, xOffset, yOffset) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Animation Played: ' + walkKey);
        addNewActionToMainSpriteActionQueue(walkKey, xOffset, yOffset, 'walk');
    };

    let getWalkKey = function () {
        return 'Walk' + currentClockPosition;
    };

    let getTurnKey = function (from, to, turnRight) {
        if (turnRight) {
            return 'TurnRight' + from + '_' + to;
        } else {
            return 'TurnLeft' + from + '_' + to;
        }
    };

    let getOffsets = function (dist) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Calculate Offset for position ' + currentClockPosition + ' and distance ' + dist);
        return {
            x: Math.round(Math.cos(anglesNumber[currentClockPosition]) * dist),
            y: Math.round(-1 * Math.sin(anglesNumber[currentClockPosition]) * dist)
        };
    };

    let getClosestClockPositionForAngle = function (angle) {
        let result = 0;
        let delta = Math.abs(angle - angles[0]);
        for (let i = 1; i < 12; i++) {
            if (angles[i] === angle) {
                return i;
            } else if (Math.abs(angle - angles[i]) < delta) {
                result = i;
                delta = Math.abs(angle - angles[i]);
            }
        }
        return result;
    };

    /**
     * Execute the animation given an action JSON object.
     */
    let playAnimation = function (block) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Play animation for ' + block.name);
        switch (block.name) {
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Walk:
                let distance = block.distance;
                let offsets = getOffsets(distance);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('The offset is x = ' + offsets.x + ' and y = ' + offsets.y);
                Walk(getWalkKey(), offsets.x, offsets.y);
                path.push({
                    position: currentClockPosition,
                    dist: distance
                });
                break;
            case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Turn:
                let turnRight = block.turnRight;
                let degree = block.degree;
                let nextAngle = turnRight ? angles[currentClockPosition] - degree : angles[currentClockPosition] + degree;
                if (nextAngle < 0) nextAngle += 360;
                if (nextAngle >= 360) nextAngle -= 360;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Next angle is: ' + nextAngle);
                let nextClockPosition = getClosestClockPositionForAngle(nextAngle);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Next clock position is: ' + nextClockPosition);
                let turnKey = getTurnKey(currentClockPosition, nextClockPosition, turnRight);
                Turn(turnKey);
                currentClockPosition = nextClockPosition;
                break;
        }
        stepCount++;
    };
    /**
     * Execute if block and return the next index to handle.
     **/
    let executeIfBlock = function (inStream, index) {
        /**
         * Evaluate the condition in a if block.
         */
        let evaluateConditionForIfBlock = function (block) {
            return block.condition;
        };
        let block = inStream[index];
        if (evaluateConditionForIfBlock(block)) {
            return executeInStream(inStream, index + 1);
        } else {
            let count = 1;
            let i = index + 1;
            while (count > 0 && i < inStream.length) {
                let cur = inStream[i];
                switch (cur.name) {
                    case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Else:
                    case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfEnd:
                        count--;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfStart:
                        count++;
                        break;
                }
                i++;
                if (count === 0 && cur.name === __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Else) {
                    return executeInStream(inStream, i);
                }
            }
            return i;
        }
    };
    /**
     * Execute looping block and return the next index to handle.
     */
    let executeLoopingBlock = function (inStream, index) {
        let block = inStream[index];
        let count = block.count;
        let nextIndex = index;
        for (let i = 0; i < count; i++) {
            nextIndex = executeInStream(inStream, index + 1);
        }
        return nextIndex;
    };

    /**
     * Execute the animation given an array of instructions and a starting index.
     */
    let executeInStream = function (stream, index) {
        let i = index;
        let len = stream.length;
        while (i < len) {
            if (failed) {
                return;
            }
            let block = stream[i];
            switch (block.name) {
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Walk:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Turn:
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Play Block: ' + block.name);
                    playAnimation(block);
                    i++;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].Else:
                    i++;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfEnd:
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RepeatEnd:
                    return i + 1;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].IfStart:
                    i = executeIfBlock(inStream, i);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__SupportedBlocks__["a" /* default */].RepeatStart:
                    i = executeLoopingBlock(inStream, i);
                    break;
                default:
                    alert('Unsupported Block Type: ' + block.name);
                    break;
            }
        }
    };

    let passConditionMatched = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Check final condition.');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Actual Path: ');
        for (let i = 0; i < path.length; i++) {
            let p = path[i];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Position: ' + p.position + ' Distance: ' + p.dist);
        }

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Target Path: ');
        for (let i = 0; i < passPath.length; i++) {
            let p = passPath[i];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Position: ' + p.position + ' Distance: ' + p.dist);
        }

        let stepCheck = stepCount < maxSteps;
        let pathCheck = false;
        if (path.length === passPath.length) {
            for (let i = 0; i < path.length; i++) {
                let currentPath = path[i];
                let targetPath = passPath[i];
                if (currentPath.position !== targetPath.position || currentPath.dist != targetPath.dist) {
                    break;
                }
            }
            pathCheck = true;
        } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Action sizes are not the same.');
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Step check: ' + stepCheck + ' path check: ' + pathCheck);
        return stepCheck && pathCheck;
    };

    let checkPassOrFail = function () {
        if (passConditionMatched()) {
            sprite.taskCompleted = true;
        } else {
            sprite.taskCompleted = false;
        }
    };
    // Main logic for runProgram
    let inStream = JSON.parse(animationContext.instruction);
    if (inStream.length > 0) {
        if (passPath.length === 0) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Free mode: Yes.');
            sprite.freeMode = true;
        }
        executeInStream(inStream, 0);
        checkPassOrFail();
    }
}

/***/ }),
/* 127 */
/* exports provided: default */
/* exports used: default */
/*!****************************************!*\
  !*** ./src/sprites/InteractiveItem.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Logger__ = __webpack_require__(/*! ../Logger */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UIUtil__ = __webpack_require__(/*! ../UIUtil */ 26);
/**
 * Created by kfang on 7/1/17.
 */




/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Sprite {
    constructor({ game, name, x, y, asset, frame }) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Create interactive item sprite ' + name + ' at x = ' + x + ' y = ' + y);
        super(game, x, y, asset, frame);
        this.name = name;
        this.anchor.setTo(0.5, 0.5);
        this.actionQueue = [];
        this.playingAnimation = null;
        this.status = null;
        this.activated = false;
    }

    update() {
        if (this.actionQueue.length > 0 && this.activated && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
            this.playNextAction();
        }
    }

    playNextAction() {
        let nextAction = this.actionQueue.shift();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset + ' with sprite key: ' + nextAction.spriteKey);
        let newX = this.x + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__UIUtil__["b" /* rescaleXOffset */])(nextAction.xOffset, this.game);
        let newY = this.y + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__UIUtil__["c" /* rescaleYOffset */])(nextAction.yOffset, this.game);
        if (nextAction.spriteKey !== this.key) {
            this.loadTexture(nextAction.spriteKey, 0);
        }
        this.playingAnimation = this.animations.play(nextAction.name);
        if (nextAction.audio !== null) {
            this.game.sound.play(nextAction.audio);
        }
        this.game.add.tween(this).to({ x: newX, y: newY }, 1000, null, true);
    }
});

/***/ }),
/* 128 */
/* exports provided: default */
/* exports used: default */
/*!*******************************!*\
  !*** ./src/sprites/Knight.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_TooltipBuilder__ = __webpack_require__(/*! ../util/TooltipBuilder */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(/*! ../config */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UIUtil__ = __webpack_require__(/*! ../UIUtil */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Logger__ = __webpack_require__(/*! ../Logger */ 11);
/**
 * Created by kfang on 6/16/17.
 */






/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Sprite {
    constructor({ game, name, x, y, asset, frame }) {
        super(game, x, y, asset, frame);
        this.name = name;
        this.anchor.setTo(0.5, 0.5);
        this.actionQueue = [];
        this.playingAnimation = null;
        this.taskCompleted = false;
        this.allset = false;
        this.freeMode = false;
    }

    update() {
        if (this.actionQueue.length > 0 && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
            this.playNextAction();
        } else if (this.actionQueue.length === 0 && this.playingAnimation !== null && this.playingAnimation.isFinished && !this.allset) {
            if (this.taskCompleted) {
                let url = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].updateTaskStatus;
                let operation = 'POST';
                let params = JSON.stringify({ userid: 1, gameid: 0, taskid: this.game.global.currentTaskIndex, status: true });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["m" /* sendHttpRequest */])(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["n" /* printHttpResponse */], operation, url, params);
            }
            this.showButtons();
            this.allset = true;
        }
    }

    showButtons() {
        let x = this.game.world.width - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(80, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        let spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(50, this.game);
        if (this.taskCompleted) {
            this.nextButton = this.game.add.button(x, y, 'Buttons', this.nextGame, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["a" /* rescaleObject */])(this.nextButton, this.game, -1, 1);
            this.nextButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_TooltipBuilder__["a" /* default */])(this.game, this.nextButton, '开始下一关', 'bottom'
            //Do plus here since it's scaled to -1
            );x += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(this.nextButton.width, this.game);
            x -= spacer;
        }
        this.restartButton = this.game.add.button(x, y, 'Buttons', this.restart, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["a" /* rescaleObject */])(this.restartButton, this.game, 1, 1);
        this.restartButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_TooltipBuilder__["a" /* default */])(this.game, this.restartButton, '重新开始', 'bottom');
    }

    playNextAction() {
        let nextAction = this.actionQueue.shift();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Logger__["a" /* logDebugInfo */])('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset + ' with sprite key: ' + nextAction.spriteKey);
        let newX = this.x + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(nextAction.xOffset, this.game);
        let newY = this.y + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["c" /* rescaleYOffset */])(nextAction.yOffset, this.game);
        if (nextAction.spriteKey !== this.key) {
            this.loadTexture(nextAction.spriteKey, 0);
        }
        this.playingAnimation = this.animations.play(nextAction.name);
        if (nextAction.audio !== null) {
            this.game.sound.play(nextAction.audio);
        }
        this.game.add.tween(this).to({ x: newX, y: newY }, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].animationDuration, null, true);
        if (nextAction.spriteToActivate !== null) {
            nextAction.spriteToActivate.activated = true;
        }
    }

    destroyAllButtons() {
        this.restartButton.destroy();
        if (this.nextButton) {
            this.nextButton.destroy();
        }
    }

    restart() {
        this.game.sound.play('press');
        this.destroyAllButtons();
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex;
        this.game.state.start('KnightTaskBoot');
    }

    nextGame() {
        this.game.sound.play('press');
        this.destroyAllButtons();
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex;
        this.game.global.currentTaskIndex = this.game.global.currentTaskIndex + 1;
        this.game.state.start('KnightTaskBoot');
    }
});

/***/ }),
/* 129 */
/* exports provided: default */
/* exports used: default */
/*!*********************************!*\
  !*** ./src/sprites/Princess.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_TooltipBuilder__ = __webpack_require__(/*! ../util/TooltipBuilder */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(/*! ../config */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UIUtil__ = __webpack_require__(/*! ../UIUtil */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Logger__ = __webpack_require__(/*! ../Logger */ 11);
/**
 * Created by kfang on 7/23/17.
 */






/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Sprite {
    constructor({ game, name, x, y, yOffset, speed, asset, frame }) {
        super(game, x, y, asset, frame);
        this.name = name;
        this.anchor.setTo(0.5, 0.5);
        this.actionQueue = [];
        this.playingAnimation = null;
        this.taskCompleted = false;
        this.lineQueue = [];
        this.speedUpdatedSet = [];
        this.start = false;
        this.yOffset = yOffset;
        this.speed = speed;
        this.walking = false;
        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.lineStyle(10, 0x33FFF6, 1);
        this.allset = false;
        this.freeMode = false;
    }

    update() {
        if (this.actionQueue.length > 0 && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
            this.playNextAction();
            if (!this.walking) {
                this.drawLine();
            }
        } else if (this.start && this.actionQueue.length === 0 && this.playingAnimation !== null && this.playingAnimation.isFinished && !this.allset) {
            if (this.taskCompleted) {
                let url = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].updateTaskStatus;
                let operation = 'POST';
                let params = JSON.stringify({ userid: 1, gameid: 1, taskid: this.game.global.currentTaskIndex, status: true });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["m" /* sendHttpRequest */])(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["n" /* printHttpResponse */], operation, url, params);
            }
            this.drawLine();
            if (!this.freeMode) {
                this.playFinalSound();
            }
            this.showButtons();
            this.allset = true;
        }
    }

    playFinalSound() {
        if (this.taskCompleted) {
            this.game.sound.play('victory');
        } else {
            this.game.sound.play('fail');
        }
    }

    showButtons() {
        this.start = false;

        let x = this.game.world.width - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(80, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        let spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(50, this.game);
        if (this.taskCompleted) {
            this.nextButton = this.game.add.button(x, y, 'Buttons', this.nextGame, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["a" /* rescaleObject */])(this.nextButton, this.game, -1, 1);
            this.nextButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_TooltipBuilder__["a" /* default */])(this.game, this.nextButton, '开始下一关', 'bottom'
            //Do plus here since it's scaled to -1
            );x += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(this.nextButton.width, this.game);
            x -= spacer;
        }
        this.restartButton = this.game.add.button(x, y, 'Buttons', this.restart, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["a" /* rescaleObject */])(this.restartButton, this.game, 1, 1);
        this.restartButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_TooltipBuilder__["a" /* default */])(this.game, this.restartButton, '重新开始', 'bottom');
    }

    playNextAction() {
        let nextAction = this.actionQueue.shift();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Logger__["a" /* logDebugInfo */])('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset);
        let newX = this.x + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["b" /* rescaleXOffset */])(nextAction.xOffset, this.game);
        let newY = this.y + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__UIUtil__["c" /* rescaleYOffset */])(nextAction.yOffset, this.game);
        if (nextAction.name.indexOf('Walk') >= 0) {
            this.walking = true;
        } else {
            this.walking = false;
        }
        this.playingAnimation = this.animations.play(nextAction.name);
        if (this.speedUpdatedSet.indexOf(nextAction.name) === -1) {
            this.playingAnimation.speed *= 1 / this.speed;
            this.speedUpdatedSet.push(nextAction.name);
        }
        if (nextAction.audio !== null) {
            this.game.sound.play(nextAction.audio);
        }
        let duration = Math.round(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].animationDuration * this.speed);
        this.game.add.tween(this).to({ x: newX, y: newY }, duration, null, true);
        this.lineQueue.push({ x1: this.x, y1: this.y, x2: newX, y2: newY });
    }

    destroyAllButtons() {
        this.restartButton.destroy();
        if (this.nextButton) {
            this.nextButton.destroy();
        }
    }

    restart() {
        this.game.sound.play('press');
        this.destroyAllButtons();
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex;
        this.game.state.start('PrincessTaskBoot');
    }

    nextGame() {
        this.game.sound.play('press');
        this.destroyAllButtons();
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex;
        this.game.global.currentTaskIndex = this.game.global.currentTaskIndex + 1;
        this.game.state.start('PrincessTaskBoot');
    }

    drawLine() {
        while (this.lineQueue.length > 0) {
            let line = this.lineQueue.shift();
            this.graphics.beginFill();
            this.graphics.moveTo(line.x1, line.y1 + this.yOffset);
            this.graphics.lineTo(line.x2, line.y2 + this.yOffset);
            this.graphics.endFill();
        }
    }
});

/***/ }),
/* 130 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./src/states/MainMenu.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__knight_KnightBoot__ = __webpack_require__(/*! ./knight/KnightBoot */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__princess_PrincessBoot__ = __webpack_require__(/*! ./princess/PrincessBoot */ 137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__ = __webpack_require__(/*! ../util/TooltipBuilder */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UIUtil__ = __webpack_require__(/*! ../UIUtil */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Logger__ = __webpack_require__(/*! ../Logger */ 11);
/**
 * Created by kfang on 7/11/17.
 */







/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Main Menu Init.');
        this.endIndex = 1;
        this.storyKey = 'Stories';
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Main Menu Preload.');
        this.rootContext = JSON.parse(this.game.cache.getText('rootContext'));
    }

    loadAssets() {
        let spriteSheets = this.rootContext.spritesheets;
        this.game.load.image('mainBackground', this.rootContext.main_background_image);
        for (let i = 0; i < spriteSheets.length; i++) {
            let spriteSheet = spriteSheets[i];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile);
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile);
        }
        this.game.load.start();
    }

    renderBackground() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'mainBackground');
        background.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(background, this.game, 1, 1);
    }

    renderMenu() {
        let logoXOffset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(200, this.game);
        let logoYOffset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(240, this.game);
        let rightPadding = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(350, this.game);
        let logo = this.game.add.sprite(logoXOffset, logoYOffset, 'logo');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(logo, this.game, 0.3, 0.3);
        logo.anchor.setTo(0.5, 0.5);
        let stories = this.rootContext.stories;
        let x = this.game.width - rightPadding;
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(500, this.game);
        let spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(400, this.game
        /**let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一页', 'bottom')**/
        );for (let i = 0; i < 2; i++) {
            let story = stories[this.endIndex - i];
            let storyButton = this.game.add.button(x, y, this.storyKey, this.onClickStory, { game: this.game, story: story, index: this.endIndex - i }, story.storyHoverImageKey, story.storyNormalImageKey, story.storyClickImageKey, story.storyDisabledImageKey);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(storyButton, this.game, 1, 1);
            storyButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, storyButton, story.storyName, 'bottom');
            x -= spacer;
        }
        /**let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一页', 'bottom')**/

        /**
         hide block in main menu
         **/
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["d" /* hideBlock */])();
    }

    create() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Main Menu Create.');
        if (!this.created) {
            this.loadingText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["e" /* createLoadingText */])(this.game);
            this.game.load.onLoadStart.addOnce(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["f" /* loadStart */], this);
            this.game.load.onFileComplete.add(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["g" /* fileComplete */], this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets();
        } else {
            this.renderState();
        }
    }

    /**
    onClickPrevious() {
        this.endIndex -= 2
        if (this.endIndex < 1) {
            this.endIndex = 1
        }
        this.renderMenu()
    }
     onClickNext() {
        this.endIndex += 2
        if (this.endIndex >= this.storyCount) {
            this.endIndex = this.storyCount - 1
        }
        this.renderMenu()
    }**/

    onClickStory() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('On Click Story.');
        this.game.global.currentStoryConfig = this.story.storyConf;
        if (this.index === 0) {
            this.game.state.add('KnightBoot', __WEBPACK_IMPORTED_MODULE_1__knight_KnightBoot__["a" /* default */], false);
        } else {
            this.game.state.add('PrincessBoot', __WEBPACK_IMPORTED_MODULE_2__princess_PrincessBoot__["a" /* default */], false);
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('About to start the story: ' + this.story.storyState);
        this.game.state.start(this.story.storyState);
    }

    loadComplete() {
        this.renderState();
        this.loadingText.destroy();
        this.created = true;
    }

    renderState() {
        this.renderBackground();
        this.renderMenu();
    }
});

/***/ }),
/* 131 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./src/states/RootBoot.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(/*! ../config */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MainMenu__ = __webpack_require__(/*! ./MainMenu */ 130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Logger__ = __webpack_require__(/*! ../Logger */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UIUtil__ = __webpack_require__(/*! ../UIUtil */ 26);
/**
 * Created by kfang on 6/19/17.
 */






/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Logger__["a" /* logDebugInfo */])('Root Boot Init.');
        this.game.global = {};
        this.game.global.currentTaskIndex = 0;
        this.scale.scaleMode = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.ScaleManager.SHOW_ALL;
        this.game.global.hScale = this.game.width / __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].designWidth;
        this.game.global.vScale = this.game.height / __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].designHeight;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Logger__["a" /* logDebugInfo */])('Horizontal Scale: ' + this.game.global.hScale + ' Vertical scale: ' + this.game.global.vScale);
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Logger__["a" /* logDebugInfo */])('Root Boot Preload.');
        this.game.load.text('rootContext', __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].rootConf);
        this.state.add('MainMenu', __WEBPACK_IMPORTED_MODULE_2__MainMenu__["a" /* default */], false);
        this.game.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Logger__["a" /* logDebugInfo */])('Root Boot Create.');
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.logo, this.game, 0.6, 0.6);
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.alpha = 0.2;
        this.logoTween = this.game.add.tween(this.logo).to({ alpha: 1 }, 2000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Linear.None, true, 0, 0, true);
    }

    render() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Logger__["a" /* logDebugInfo */])('Root Boot Render.');
        if (!this.logoTween.isRunning) {
            this.logo.destroy();
            this.state.start('MainMenu');
        }
    }
});

/***/ }),
/* 132 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./src/states/knight/KnightAnimationBoard.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites_Knight__ = __webpack_require__(/*! ../../sprites/Knight */ 128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprites_InteractiveItem__ = __webpack_require__(/*! ../../sprites/InteractiveItem */ 127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animation_KnightAnimationPlayer__ = __webpack_require__(/*! ../../animation/KnightAnimationPlayer */ 125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_TooltipBuilder__ = __webpack_require__(/*! ../../util/TooltipBuilder */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__UIUtil__ = __webpack_require__(/*! ../../UIUtil */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Logger__ = __webpack_require__(/*! ../../Logger */ 11);
/**
 * Created by kfang on 6/15/17.
 */








/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    calculateAndSetGridPositionAndStepSizesResponsively() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Game width: ' + this.game.width + ' height: ' + this.game.height);
        this.step_width_in_pixel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(this.gameContext.grid_image_width, this.game);
        this.step_height_in_pixel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(this.gameContext.grid_image_height, this.game);

        this.gridStartX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(this.gameContext.grid_board_top_left_x, this.game) + Math.round(this.step_width_in_pixel / 2);
        this.gridStartY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(this.gameContext.grid_board_top_left_y, this.game) + Math.round(this.step_height_in_pixel / 2);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('step_width_in_pixel: ' + this.step_width_in_pixel + ' step_height_in_pixel: ' + this.step_height_in_pixel);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('gridStartX: ' + this.gridStartX + ' this.gridStartY: ' + this.gridStartY);
    }

    getCurrentAnimationContext() {
        let instruction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["h" /* getInstruction */])(this.game.workspace);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Blockly Instruction: ' + instruction);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["i" /* setReadableCode */])(instruction);
        return {
            sprite: this.knight,
            startGridX: this.taskContext.character_starting_grid_x,
            startGridY: this.taskContext.character_starting_grid_y,
            forwardSpriteKey: this.gameContext.spritesheets[0].key,
            backwardSpriteKey: this.gameContext.spritesheets[1].key,
            gridWidth: this.gameContext.grid_x_size,
            gridHeight: this.gameContext.grid_y_size,
            step_width_in_pixel: this.gameContext.grid_image_width,
            step_height_in_pixel: this.gameContext.grid_image_height,
            maxSteps: this.taskContext.maxSteps,
            passCondition: this.taskContext.passCondition,
            items: this.taskContext.items,
            interactiveItems: this.taskContext.interactionItems,
            interactiveItemSprites: this.interactiveItemSprites,
            instruction: instruction
        };
    }

    play() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('play blocks');
        this.game.sound.play('press');
        let animationContext = this.getCurrentAnimationContext(this.gameContext);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__animation_KnightAnimationPlayer__["a" /* default */])(animationContext);
        this.startButton.visible = false;
    }

    drawBackground() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(background, this.game, 1, 1.2);
        background.anchor.setTo(0.5, 0.5);
    }

    drawForeGround() {
        let foreground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'foreground');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(foreground, this.game, 1, 1.2);
        foreground.anchor.setTo(0.5, 0.5);
    }

    drawBoardButtons() {
        let x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(80, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        let spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(20, this.game);
        this.backToTasksButton = this.game.add.button(x, y, 'Buttons', this.onBackToTasks, this, 'buttons/star/hover', 'buttons/star/normal', 'buttons/star/click', 'buttons/star/disabled');
        x += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(this.backToTasksButton.width, this.game);
        x += spacer;
        this.hintButton = this.game.add.button(x, y, 'Buttons', this.showInformationBoard, this, 'buttons/info/hover', 'buttons/info/normal', 'buttons/info/click', 'buttons/info/disabled');
        x += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(this.hintButton.width, this.game);
        x += spacer;
        this.startButton = this.game.add.button(x, y, 'Buttons', this.play, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(this.backToTasksButton, this.game, 1, 1);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(this.hintButton, this.game, 1, 1);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(this.startButton, this.game, 1, 1);
        this.backToTasksButton.anchor.setTo(0.5, 0.5);
        this.hintButton.anchor.setTo(0.5, 0.5);
        this.startButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_TooltipBuilder__["a" /* default */])(this.game, this.startButton, '开始', 'bottom');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_TooltipBuilder__["a" /* default */])(this.game, this.hintButton, '关卡信息', 'bottom');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_TooltipBuilder__["a" /* default */])(this.game, this.backToTasksButton, '返回关卡选择页面', 'bottom');
    }

    drawMainCharacterAtStartingPosition() {
        const cHeight = this.gameContext.character_height_in_pixel;
        const characterStartGridX = this.taskContext.character_starting_grid_x;
        const characterStartGridY = this.taskContext.character_starting_grid_y;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Calculating character starting position: grid starting x: ' + this.gridStartX + ' grid starting y: ' + this.gridStartY);
        const targetGridXMid = this.gridStartX + Math.round(characterStartGridX * this.step_width_in_pixel);
        const targetGridYMid = this.gridStartY + Math.round(characterStartGridY * this.step_height_in_pixel) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(Math.round(cHeight * 0.4), this.game);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Draw main character at location: x = ' + targetGridXMid + ' and y = ' + targetGridYMid);
        let sprite = new __WEBPACK_IMPORTED_MODULE_1__sprites_Knight__["a" /* default */]({
            game: this.game,
            name: 'knight',
            x: targetGridXMid,
            y: targetGridYMid,
            asset: this.gameContext.spritesheets[0].key,
            frame: 0
        });
        this.knight = this.game.add.existing(sprite);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(this.knight, this.game, 1, 1);
    }

    drawInteractionItems() {
        this.interactiveItemSprites = [];
        let interactionItems = this.taskContext.interactionItems;
        if (interactionItems.length > 0) {
            let gridWidth = this.step_width_in_pixel;
            let gridHeight = this.step_height_in_pixel;
            for (let i = 0; i < interactionItems.length; i++) {
                let item = interactionItems[i];
                let position = item.coordinate;
                let ix = this.gridStartX + Math.round(position.x * gridWidth) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(Math.round(position.xOffset * item.width), this.game);
                let iy = this.gridStartY + Math.round(position.y * gridHeight) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(Math.round(position.yOffset * item.height), this.game);
                let sprite = new __WEBPACK_IMPORTED_MODULE_2__sprites_InteractiveItem__["a" /* default */]({
                    game: this.game,
                    name: item.spriteKey,
                    x: ix,
                    y: iy,
                    asset: item.spriteSheetKey,
                    frame: 0
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(sprite, this.game, 1, 1);
                this.interactiveItemSprites.push(sprite);
                this.game.add.existing(sprite);
                this.addAnimationsForSprite(sprite, item.spritesheets);
                this.itemTrack.push(position.x + '_' + position.y);
            }
        }
    }

    drawItems() {
        let items = this.taskContext.items;
        let dGridX = this.taskContext.passCondition.destinationXGrid;
        let dGridY = this.taskContext.passCondition.destinationYGrid;
        if (dGridX === undefined) dGridX = 0;
        if (dGridY === undefined) dGridY = 0;
        let gridWidth = this.step_width_in_pixel;
        let gridHeight = this.step_height_in_pixel;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + this.gridStartX + ' GridStartY = ' + this.gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight);
        if (items.length > 0) {
            let checkValid = function (coordinates, xGridSize, yGridSize, dGridX, dGridY) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Check valid for map with Size : (' + xGridSize + ' , ' + yGridSize + ') and dX = ' + dGridX + ' dY = ' + dGridY);
                let xq = [];
                let yq = [];
                let xOffset = [1, -1, 0, 0];
                let yOffset = [0, 0, 1, -1];
                let visited = [];
                xq.push(0);
                yq.push(0);
                visited.push('0_0');
                while (xq.length > 0) {
                    let curX = xq.shift();
                    let curY = yq.shift();
                    if (curX === dGridX && curY === dGridY) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Map is valid: ' + ' x = ' + curX + ' y = ' + curY + ' dX = ' + dGridX + ' dY = ' + dGridY);
                        return true;
                    } else {
                        for (let k = 0; k < 4; k++) {
                            let nX = curX + xOffset[k];
                            let nY = curY + yOffset[k];
                            if (nX >= 0 && nY >= 0 && nX < xGridSize && nY < yGridSize && visited.indexOf(nX + '_' + nY) === -1 && coordinates.indexOf(nX + '_' + nY) === -1) {
                                xq.push(nX);
                                yq.push(nY);
                                visited.push(nX + '_' + nY);
                            }
                        }
                    }
                }
                return false;
            };

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if (item.random === true) {
                    let iCount = item.count;
                    let solvable = false;
                    let xSize = this.gameContext.grid_x_size;
                    let ySize = this.gameContext.grid_y_size;
                    let sGridX = this.taskContext.character_starting_grid_x;
                    let sGridY = this.taskContext.character_starting_grid_y;
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('grid x size = ' + xSize + ' grid y size = ' + ySize + ' destination x = ' + dGridX + ' destination y = ' + dGridY);
                    while (!solvable) {
                        item.coordinates = [];
                        let currentCount = 0;
                        let rx = 0;
                        let ry = 0;
                        let key = '';
                        let rTrack = [];
                        while (currentCount < iCount) {
                            rx = Math.floor(Math.random() * xSize);
                            ry = Math.floor(Math.random() * ySize);
                            key = rx + '_' + ry;
                            if (key !== dGridX + '_' + dGridY && key !== sGridX + '_' + sGridY && rTrack.indexOf(key) === -1 && this.itemTrack.indexOf(key) === -1) {
                                item.coordinates.push({ x: rx, y: ry, xOffset: 0, yOffset: 0 });
                                rTrack.push(rx + '_' + ry);
                                currentCount++;
                            }
                        }
                        if (checkValid(rTrack, xSize, ySize, dGridX, dGridY)) {
                            solvable = true;
                        }
                    }
                }
                for (let j = 0; j < item.coordinates.length; j++) {
                    let position = item.coordinates[j];
                    let ix = this.gridStartX + Math.round(position.x * gridWidth) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(Math.round(position.xOffset * item.width), this.game);
                    let iy = this.gridStartY + Math.round(position.y * gridHeight) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(Math.round(position.yOffset * item.height), this.game);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Draw item ' + i + ' at gx = ' + position.x + ' gy = ' + position.y + ' x = ' + ix + ' y = ' + iy);
                    let itemImage = this.game.add.sprite(ix, iy, item.key);
                    itemImage.anchor.setTo(0.5, 0.5);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(itemImage, this.game, 1, 1);
                    this.itemTrack.push(position.x + '_' + position.y);
                }
            }
        }
    }

    drawGridBoard() {
        let gridWidth = this.step_width_in_pixel;
        let gridHeight = this.step_height_in_pixel;
        let gridXSize = this.gameContext.grid_x_size;
        let gridYSize = this.gameContext.grid_y_size;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Background width = ' + this.game.width + ' Background height = ' + this.game.height + ' GridStartX: ' + this.gridStartX + ' GridStartY = ' + this.gridStartY + ' GridWidth = ' + gridWidth + ' GridHeight = ' + gridHeight);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Draw grid images.');
        for (let r = 0; r < gridYSize; r++) {
            for (let c = r % 2; c < gridXSize; c += 2) {
                let ix = Math.round(this.gridStartX + c * gridWidth);
                let iy = Math.round(this.gridStartY + r * gridHeight);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Draw grid images at r = ' + r + ' c = ' + c + ' x = ' + ix + ' y = ' + iy);
                let gridImage = this.game.add.sprite(ix, iy, 'grid');
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(gridImage, this.game, 1, 1);
                gridImage.anchor.setTo(0.5, 0.5);
            }
        }
    }

    preloadImages() {
        for (let i = 0; i < this.taskContext.items.length; i++) {
            let item = this.taskContext.items[i];
            this.game.load.image(item.key, item.image);
        }
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'));
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'));
    }

    addAnimationsForSprite(sprite, spritesheets) {
        for (let i = spritesheets.length - 1; i >= 0; i--) {
            let spritesheet = spritesheets[i];
            sprite.loadTexture(spritesheet.key);
            for (let j = 0; j < spritesheet.animations.length; j++) {
                let animation = spritesheet.animations[j];
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Add animation: ' + animation.name + ' for sprite: ' + sprite.name);
                sprite.animations.add(animation.name, animation.frames, animation.rate, animation.loop, false);
            }
        }
    }

    addAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i];
            this.game.sound.add(audio.key);
        }
    }

    addWorkspace() {
        let scaleFactor = this.scale.scaleFactor;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('scale factor x: ' + scaleFactor.x + ' scale factor y: ' + scaleFactor.y
        /* Reposition block div first */
        );let grid_bottom_left_x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(this.gameContext.grid_board_top_left_x, this.game);
        let grid_bottom_left_y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(this.gameContext.grid_board_top_left_y + Math.round(this.gameContext.grid_y_size * this.gameContext.grid_image_height), this.game);
        let grid_height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(Math.round(this.gameContext.grid_y_size * this.gameContext.grid_image_height), this.game);

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["j" /* repositionBlock */])(grid_bottom_left_x / scaleFactor.x, grid_bottom_left_y / scaleFactor.y, this.game.height / scaleFactor.y);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["k" /* repositionText */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(this.gameContext.grid_board_top_left_y, this.game) / scaleFactor.y, grid_height / scaleFactor.y, grid_bottom_left_x / scaleFactor.x);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('Block div x: ' + grid_bottom_left_x + ' yt: ' + grid_bottom_left_y + ' h: ' + this.game.height);
        let options = {
            comments: false,
            disable: false,
            collapse: false,
            media: 'assets/blocks/media/',
            readOnly: false,
            rtl: false,
            scrollbars: true,
            toolbox: Blockly.Blocks.defaultToolboxKnight,
            trashcan: true,
            horizontalLayout: true,
            toolboxPosition: true,
            sounds: true,
            grid: { spacing: 16,
                length: 1,
                colour: '#2C344A',
                snap: false
            },
            colours: {
                workspace: '#334771',
                flyout: '#334771',
                scrollbar: '#24324D',
                scrollbarHover: '#0C111A',
                insertionMarker: '#FFFFFF',
                insertionMarkerOpacity: 0.3,
                fieldShadow: 'rgba(255, 255, 255, 0.3)',
                dragShadowOpacity: 0.6
            }
        };
        this.game.workspace = Blockly.inject('block', options);
    }

    loadToolbox() {
        let tree = Blockly.Xml.textToDom(this.taskContext.toolbox);
        this.game.workspace.updateToolbox(tree);
        document.getElementById('instructions').innerHTML = '';
    }

    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('KnightAnimationBoard Init.');
        if (this.game.global.preTaskIndex !== this.game.global.currentTaskIndex) {
            this.created = false;
        }
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('KnightAnimationBoard Preload.');
        this.setCurrentGameContexts();
        this.setCurrentTaskContext();
    }

    loadAssets() {
        this.preloadImages();
        this.game.load.start();
    }

    create() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__Logger__["a" /* logDebugInfo */])('KnightAnimationBoard Create.');
        if (!this.created) {
            this.loadingText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["e" /* createLoadingText */])(this.game);
            this.game.load.onLoadStart.addOnce(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["f" /* loadStart */], this);
            this.game.load.onFileComplete.add(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["g" /* fileComplete */], this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets();
        } else {
            this.renderState();
        }
    }

    showInformationBoard() {
        if (!this.infoBoard) {
            this.infoBoard = this.game.add.image(Math.round(this.game.width / 2), Math.round(this.game.height / 2) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(100, this.game), 'info');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(this.infoBoard, this.game, 0.7, 0.7);
            this.infoBoard.anchor.setTo(0.5, 0.5);
            this.infoBoard.alpha = 0.8;
            this.info = this.game.add.text(Math.round(this.game.width / 2), Math.round(this.game.height / 2) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(100, this.game), this.taskContext.info + '\nHints:\n' + this.taskContext.hint, { font: 'bold 20px Arial', fill: '#FFFFFF', align: 'left' });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(this.info, this.game, 0.7, 0.7);
            this.info.anchor.setTo(0.5, 0.5);
            this.closeButton = this.game.add.button(Math.round(this.game.width / 2) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["b" /* rescaleXOffset */])(270, this.game), Math.round(this.game.height / 2) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(285, this.game), 'Buttons', this.hideInformationBoard, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(this.closeButton, this.game, 0.5, 0.5);
            this.closeButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_TooltipBuilder__["a" /* default */])(this.game, this.closeButton, '返回', 'bottom');
        } else {
            this.infoBoard.visible = true;
            this.info.visible = true;
            this.closeButton.visible = true;
        }
    }

    hideInformationBoard() {
        this.infoBoard.visible = false;
        this.info.visible = false;
        this.closeButton.visible = false;
    }

    onBackToTasks() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["d" /* hideBlock */])();
        this.game.state.start('KnightStoryBoard');
    }

    loadComplete() {
        this.renderState();
        this.loadingText.destroy();
        this.created = true;
    }

    drawTitle() {
        let titleboard = this.game.add.sprite(this.game.world.centerX, 0, 'titleboard');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(titleboard, this.game, 1, 1);
        titleboard.anchor.setTo(0.5, 0);
        titleboard.alpha = 0.8;
        let title = this.game.add.text(this.game.world.centerX, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["c" /* rescaleYOffset */])(20, this.game), this.taskContext.title, { font: 'bold 30px Arial', fill: '#3399FF', align: 'center' });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["a" /* rescaleObject */])(title, this.game, 1, 1);
        title.anchor.setTo(0.5, 0);
    }

    renderState() {
        this.calculateAndSetGridPositionAndStepSizesResponsively();
        this.drawBackground();
        this.drawBoardButtons();
        this.drawGridBoard();
        this.itemTrack = [];
        this.drawInteractionItems();
        this.drawItems();
        this.drawMainCharacterAtStartingPosition();
        this.drawForeGround();
        this.drawTitle();
        this.addAnimationsForSprite(this.knight, this.gameContext.spritesheets);
        this.addAudios();
        if (typeof this.game.workspace === "undefined") {
            // Only create blocks once
            this.addWorkspace();
        }
        this.game.workspace.clear();
        this.loadToolbox();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__UIUtil__["l" /* showBlock */])();
    }
});

/***/ }),
/* 133 */
/* exports provided: default */
/* exports used: default */
/*!*****************************************!*\
  !*** ./src/states/knight/KnightBoot.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__KnightStoryBoard__ = __webpack_require__(/*! ./KnightStoryBoard */ 134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Logger__ = __webpack_require__(/*! ../../Logger */ 11);




/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Logger__["a" /* logDebugInfo */])('Knight Boot Init.');
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Logger__["a" /* logDebugInfo */])('Knight Boot Preload.');
        this.loadGameContextAndAddStoryState();
    }

    loadGameContextAndAddStoryState() {
        this.game.load.text('gameContext', this.game.global.currentStoryConfig);
        this.game.state.add('KnightStoryBoard', __WEBPACK_IMPORTED_MODULE_1__KnightStoryBoard__["a" /* default */], false);
    }

    render() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Logger__["a" /* logDebugInfo */])('Knight Boot Render.');
        this.navigateToStoryState();
    }

    navigateToStoryState() {
        this.state.start('KnightStoryBoard');
    }
});

/***/ }),
/* 134 */
/* exports provided: default */
/* exports used: default */
/*!***********************************************!*\
  !*** ./src/states/knight/KnightStoryBoard.js ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__KnightAnimationBoard__ = __webpack_require__(/*! ./KnightAnimationBoard */ 132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__KnightTaskBoot__ = __webpack_require__(/*! ./KnightTaskBoot */ 135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__ = __webpack_require__(/*! ../../util/TooltipBuilder */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UIUtil__ = __webpack_require__(/*! ../../UIUtil */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Logger__ = __webpack_require__(/*! ../../Logger */ 11);
/**
 * Created by kfang on 6/25/17.
 */







/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('KnightStoryBoard Init.');
        this.endIndex = 2;
    }

    loadStoryImages() {
        for (let i = 0; i < this.gameContext.spritesheets.length; i++) {
            let spriteSheet = this.gameContext.spritesheets[i];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile);
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile);
        }

        this.game.load.image('background', this.gameContext.background_image);
        this.game.load.image('foreground', this.gameContext.foreground_image);
        this.game.load.image('grid', this.gameContext.grid_image);
        this.game.load.image('shadow', this.gameContext.shadow_image);
        this.game.load.image('info', this.gameContext.info_image);
        this.game.load.image('titleboard', this.gameContext.title_image);
    }

    loadStoryAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i];
            this.game.load.audio(audio.key, audio.file);
        }
    }

    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext')
        //minors 1 for free game mode
        );this.taskCount = this.gameContext.task_configs.tasks.length - 1;
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('KnightStoryBoard Preload.');
        this.setCurrentGameContext();
    }

    loadAssets() {
        this.loadStoryImages();
        this.loadStoryAudios();
        this.game.load.start();
    }

    renderTaskList() {
        let rightPadding = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(250, this.game);
        let tasks = this.gameContext.task_configs.tasks;
        let x = this.game.width - rightPadding;
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(450, this.game);
        let spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(20, this.game);
        let nextButton = undefined;
        let prevButton = undefined;
        if (this.endIndex < 9 && nextButton === undefined) {
            nextButton = this.game.add.button(x, y, 'Buttons', this.onClickNext, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(nextButton, this.game, -1, 1);
            nextButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, nextButton, '下一页', 'bottom');
        }
        x -= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(200, this.game);

        for (let i = 0; i < 3; i++) {
            let task = tasks[this.endIndex - i];
            let taskButton = this.game.add.button(x, y, 'Buttons', this.onClickTask, { game: this.game, task: task, index: this.endIndex - i }, task.taskHoverImageKey, task.taskNormalImageKey, task.taskClickImageKey, task.taskDisabledImageKey);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(taskButton, this.game, 2, 2);
            taskButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, taskButton, task.taskName, 'bottom');
            x -= spacer;
            if (i < 2) {
                x -= taskButton.width;
            } else {
                x -= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(200, this.game);
            }
        }
        if (this.endIndex > 2 && prevButton === undefined) {
            prevButton = this.game.add.button(x, y, 'Buttons', this.onClickPrevious, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(prevButton, this.game, 1, 1);
            prevButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, prevButton, '上一页', 'bottom');
        }
    }

    renderFreeTask() {
        let x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(250, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        let task = this.gameContext.task_configs.tasks[10];
        let taskButton = this.game.add.button(x, y, 'Buttons', this.onClickTask, { game: this.game, task: task, index: 10 }, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(taskButton, this.game, 1, 1);
        taskButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, taskButton, task.taskName, 'bottom');
    }

    renderHomeButton() {
        let x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(80, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        this.backToTasksButton = this.game.add.button(x, y, 'Buttons', this.onBackHome, this, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.backToTasksButton, this.game, 1, 1);
        this.backToTasksButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, this.backToTasksButton, '返回主界面', 'bottom');
    }

    create() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Knight Story Board Create.');
        if (!this.created) {
            this.loadingText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["e" /* createLoadingText */])(this.game);
            this.game.load.onLoadStart.addOnce(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["f" /* loadStart */], this);
            this.game.load.onFileComplete.add(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["g" /* fileComplete */], this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets();
        } else {
            this.renderState();
        }
    }

    onClickPrevious() {
        this.endIndex -= 3;
        if (this.endIndex < 2) {
            this.endIndex = 2;
        }
        this.renderTaskList();
    }

    onClickNext() {
        this.endIndex += 3;
        if (this.endIndex >= this.taskCount) {
            this.endIndex = this.taskCount - 1;
        }
        this.renderTaskList();
    }

    onClickTask() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('On Click A Task: ' + this.task.taskName);
        this.game.state.add('KnightAnimationBoard', __WEBPACK_IMPORTED_MODULE_1__KnightAnimationBoard__["a" /* default */], false);
        this.game.state.add('KnightTaskBoot', __WEBPACK_IMPORTED_MODULE_2__KnightTaskBoot__["a" /* default */], false);
        this.game.global.currentTaskIndex = this.index;
        this.game.state.start('KnightTaskBoot');
    }

    onBackHome() {
        this.game.state.start('MainMenu');
    }

    loadComplete() {
        this.renderState();
        this.loadingText.destroy();
        this.created = true;
    }

    renderState() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(background, this.game, 1, 1.2);
        background.anchor.setTo(0.5, 0.5);
        this.renderHomeButton();
        this.renderTaskList();
        this.renderFreeTask();
    }
});

/***/ }),
/* 135 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./src/states/knight/KnightTaskBoot.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Logger__ = __webpack_require__(/*! ../../Logger */ 11);
/**
 * Created by kfang on 6/27/17.
 */



/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'));
    }

    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('KnightTaskBoot Init.');
        this.setCurrentGameContext();
    }

    loadCurrentTaskConfig() {
        let taskIndex = this.game.global.currentTaskIndex;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Current task conf: ' + this.gameContext.task_configs.tasks[taskIndex].taskConf);
        this.game.load.text('taskContext', this.gameContext.task_configs.tasks[taskIndex].taskConf);
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('KnightTaskBoot Preload.');
        this.loadCurrentTaskConfig();
    }

    render() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('KnightTaskBoot Render.');
        this.state.start('KnightAnimationBoard');
    }
});

/***/ }),
/* 136 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************************!*\
  !*** ./src/states/princess/PrincessAnimationBoard.js ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites_Princess__ = __webpack_require__(/*! ../../sprites/Princess */ 129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_PrincessAnimationPlayer__ = __webpack_require__(/*! ../../animation/PrincessAnimationPlayer */ 126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__ = __webpack_require__(/*! ../../util/TooltipBuilder */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UIUtil__ = __webpack_require__(/*! ../../UIUtil */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Logger__ = __webpack_require__(/*! ../../Logger */ 11);
/**
 * Created by kfang on 7/23/17.
 */







/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    calculateCharacterStartingPositionResponsively() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Game width: ' + this.game.width + ' height: ' + this.game.height);
        this.characterStartX = this.game.world.centerX;
        this.characterStartY = this.game.world.centerY;
    }

    getCurrentAnimationContext() {
        let instruction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["h" /* getInstruction */])(this.game.workspace);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Blockly Instruction: ' + instruction);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["i" /* setReadableCode */])(instruction);
        return {
            sprite: this.princess,
            startClockPosition: this.taskContext.character_starting_clock_position,
            maxSteps: this.taskContext.maxSteps,
            passPath: this.taskContext.passPath,
            instruction: instruction
        };
    }

    play() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('play blocks');
        this.game.sound.play('press');
        let animationContext = this.getCurrentAnimationContext(this.gameContext);
        this.princess.start = true;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__animation_PrincessAnimationPlayer__["a" /* default */])(animationContext);
        this.startButton.visible = false;
    }

    drawBackground() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(background, this.game, 1, 1.2);
        background.anchor.setTo(0.5, 0.5);
    }

    drawForeGround() {
        let foreground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'foreground');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(foreground, this.game, 1, 1.2);
        foreground.anchor.setTo(0.5, 0.5);
    }

    drawBoardButtons() {
        let x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(80, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        let spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(20, this.game);
        this.backToTasksButton = this.game.add.button(x, y, 'Buttons', this.onBackToTasks, this, 'buttons/star/hover', 'buttons/star/normal', 'buttons/star/click', 'buttons/star/disabled');
        x += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(this.backToTasksButton.width, this.game);
        x += spacer;
        this.hintButton = this.game.add.button(x, y, 'Buttons', this.showInformationBoard, this, 'buttons/info/hover', 'buttons/info/normal', 'buttons/info/click', 'buttons/info/disabled');
        x += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(this.hintButton.width, this.game);
        x += spacer;
        this.startButton = this.game.add.button(x, y, 'Buttons', this.play, this, 'buttons/start/hover', 'buttons/start/normal', 'buttons/start/click', 'buttons/start/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.backToTasksButton, this.game, 1, 1);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.hintButton, this.game, 1, 1);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.startButton, this.game, 1, 1);
        this.backToTasksButton.anchor.setTo(0.5, 0.5);
        this.hintButton.anchor.setTo(0.5, 0.5);
        this.startButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, this.startButton, '开始', 'bottom');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, this.hintButton, '关卡信息', 'bottom');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, this.backToTasksButton, '返回关卡选择页面', 'bottom');
    }

    drawMainCharacterAtStartingPosition() {
        let startX = this.characterStartX + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(this.taskContext.character_x_offset, this.game);
        let startY = this.characterStartY + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(this.taskContext.character_y_offset - Math.round(this.taskContext.character_height_in_pixel * 0.405), this.game);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Draw main character at location: x = ' + startX + ' and y = ' + startY);
        let sprite = new __WEBPACK_IMPORTED_MODULE_1__sprites_Princess__["a" /* default */]({
            game: this.game,
            name: 'princess',
            x: startX,
            y: startY,
            yOffset: Math.round(this.taskContext.character_height_in_pixel / 3),
            speed: this.taskContext.speed,
            asset: this.gameContext.spritesheets[0].key,
            frame: 0
        });
        this.princess = this.game.add.existing(sprite);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.princess, this.game, 1, 1);
        this.initPrincessPosition();
    }

    initPrincessPosition() {
        this.princess.actionQueue.push({
            name: 'TurnRight0_' + this.taskContext.character_starting_clock_position,
            xOffset: 0,
            yOffset: 0,
            audio: null
        });
    }

    drawPath() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Draw task path.');
        if (this.taskContext.pathImage.length > 0) {
            let path = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'taskPath');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(path, this.game, 1, 1);
            path.anchor.setTo(0.5, 0.5);
        }
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'));
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'));
    }

    loadPath() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Load path image: ' + this.taskContext.pathImage);
        if (this.taskContext.pathImage.length > 0) {
            this.game.load.image('taskPath', this.taskContext.pathImage);
        }
    }

    addAnimationsForSprite(sprite, spritesheets) {
        for (let i = spritesheets.length - 1; i >= 0; i--) {
            let spritesheet = spritesheets[i];
            sprite.loadTexture(spritesheet.key);
            for (let j = 0; j < spritesheet.animations.length; j++) {
                let animation = spritesheet.animations[j];
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Add animation: ' + animation.name + ' for sprite: ' + sprite.name);
                sprite.animations.add(animation.name, animation.frames, animation.rate, animation.loop, false);
            }
        }
    }

    addAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i];
            this.game.sound.add(audio.key);
        }
    }

    addWorkspace() {
        let scaleFactor = this.scale.scaleFactor;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('scale factor x: ' + scaleFactor.x + ' scale factor y: ' + scaleFactor.y
        /* Reposition block div first */
        );__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["j" /* repositionBlock */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(250, this.game) / scaleFactor.x, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(600, this.game) / scaleFactor.y, this.game.height / scaleFactor.y);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["k" /* repositionText */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(300, this.game) / scaleFactor.y, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(300, this.game) / scaleFactor.y, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(250, this.game) / scaleFactor.x);
        let options = {
            comments: false,
            disable: false,
            collapse: false,
            media: 'assets/blocks/media/',
            readOnly: false,
            rtl: false,
            scrollbars: false,
            toolbox: Blockly.Blocks.defaultToolboxPrincess,
            trashcan: true,
            horizontalLayout: true,
            toolboxPosition: true,
            sounds: true,
            colours: {
                workspace: '#334771',
                flyout: '#334771',
                scrollbar: '#24324D',
                scrollbarHover: '#0C111A',
                insertionMarker: '#FFFFFF',
                insertionMarkerOpacity: 0.3,
                fieldShadow: 'rgba(255, 255, 255, 0.3)',
                dragShadowOpacity: 0.6
            }
        };
        this.game.workspace = Blockly.inject('block', options);
    }

    loadToolbox() {
        let tree = Blockly.Xml.textToDom(this.taskContext.toolbox);
        this.game.workspace.updateToolbox(tree);
        document.getElementById('instructions').innerHTML = '';
    }

    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('PrincessAnimationBoard Init.');
        if (this.game.global.preTaskIndex !== this.game.global.currentTaskIndex) {
            this.created = false;
        }
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('PrincessAnimationBoard Preload.');
        this.setCurrentGameContexts();
        this.setCurrentTaskContext();
    }

    loadAssets() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Load assets.');
        this.loadPath();
        this.game.load.start();
    }

    create() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('PrincessAnimationBoard Create.');
        if (!this.created) {
            this.loadingText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["e" /* createLoadingText */])(this.game);
            this.game.load.onLoadStart.addOnce(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["f" /* loadStart */], this);
            this.game.load.onFileComplete.add(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["g" /* fileComplete */], this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets();
        } else {
            this.renderState();
        }
    }

    onBackToTasks() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["d" /* hideBlock */])();
        this.game.state.start('PrincessStoryBoard');
    }

    drawTitle() {
        let titleboard = this.game.add.sprite(this.game.world.centerX, 0, 'titleboard');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(titleboard, this.game, 1, 1);
        titleboard.anchor.setTo(0.5, 0);
        titleboard.alpha = 0.8;
        let title = this.game.add.text(this.game.world.centerX, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(20, this.game), this.taskContext.title, { font: 'bold 30px Arial', fill: '#3399FF', align: 'center' });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(title, this.game, 1, 1);
        title.anchor.setTo(0.5, 0);
    }

    renderState() {
        this.calculateCharacterStartingPositionResponsively();
        this.drawBackground();
        this.drawForeGround();
        this.drawPath();
        this.drawBoardButtons();
        this.drawMainCharacterAtStartingPosition();
        this.drawTitle();
        this.addAnimationsForSprite(this.princess, this.gameContext.spritesheets);
        this.addAudios();
        if (typeof this.game.workspace === "undefined") {
            // Only create blocks once
            this.addWorkspace();
        }
        this.game.workspace.clear();
        this.loadToolbox();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["l" /* showBlock */])();
    }

    loadComplete() {
        this.renderState();
        this.loadingText.destroy();
        this.created = true;
    }

    showInformationBoard() {
        if (!this.infoBoard) {
            this.infoBoard = this.game.add.image(Math.round(this.game.width / 2), Math.round(this.game.height / 2) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(100, this.game), 'info');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.infoBoard, this.game, 0.7, 0.7);
            this.infoBoard.anchor.setTo(0.5, 0.5);
            this.infoBoard.alpha = 0.8;
            this.info = this.game.add.text(Math.round(this.game.width / 2), Math.round(this.game.height / 2) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(100, this.game), this.taskContext.info + '\nHints:\n' + this.taskContext.hint, { font: 'bold 20px Arial', fill: '#FFFFFF', align: 'left' });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.info, this.game, 0.7, 0.7);
            this.info.anchor.setTo(0.5, 0.5);
            this.closeButton = this.game.add.button(Math.round(this.game.width / 2) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(270, this.game), Math.round(this.game.height / 2) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(285, this.game), 'Buttons', this.hideInformationBoard, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.closeButton, this.game, 0.5, 0.5);
            this.closeButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, this.closeButton, '返回', 'bottom');
        } else {
            this.infoBoard.visible = true;
            this.info.visible = true;
            this.closeButton.visible = true;
        }
    }

    hideInformationBoard() {
        this.infoBoard.visible = false;
        this.info.visible = false;
        this.closeButton.visible = false;
    }
});

/***/ }),
/* 137 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./src/states/princess/PrincessBoot.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PrincessStoryBoard__ = __webpack_require__(/*! ./PrincessStoryBoard */ 138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Logger__ = __webpack_require__(/*! ../../Logger */ 11);
/**
 * Created by kfang on 7/23/17.
 */




/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Logger__["a" /* logDebugInfo */])('Princess Boot Init.');
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Logger__["a" /* logDebugInfo */])('Princess Boot Preload.');
        this.loadGameContextAndAddStoryState();
    }

    loadGameContextAndAddStoryState() {
        this.game.load.text('gameContext', this.game.global.currentStoryConfig);
        this.game.state.add('PrincessStoryBoard', __WEBPACK_IMPORTED_MODULE_1__PrincessStoryBoard__["a" /* default */], false);
    }

    render() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Logger__["a" /* logDebugInfo */])('Princess Boot Render.');
        this.navigateToStoryState();
    }

    navigateToStoryState() {
        this.state.start('PrincessStoryBoard');
    }
});

/***/ }),
/* 138 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./src/states/princess/PrincessStoryBoard.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PrincessAnimationBoard__ = __webpack_require__(/*! ./PrincessAnimationBoard */ 136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PrincessTaskBoot__ = __webpack_require__(/*! ./PrincessTaskBoot */ 139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__ = __webpack_require__(/*! ../../util/TooltipBuilder */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UIUtil__ = __webpack_require__(/*! ../../UIUtil */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Logger__ = __webpack_require__(/*! ../../Logger */ 11);
/**
 * Created by kfang on 7/23/17.
 */







/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('PrincessStoryBoard Init.');
        this.endIndex = 2;
    }

    loadStoryImages() {
        for (let i = 0; i < this.gameContext.spritesheets.length; i++) {
            let spriteSheet = this.gameContext.spritesheets[i];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile);
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile);
        }

        this.game.load.image('background', this.gameContext.background_image);
        this.game.load.image('foreground', this.gameContext.foreground_image);
        this.game.load.image('info', this.gameContext.info_image);
        this.game.load.image('titleboard', this.gameContext.title_image);
    }

    loadStoryAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i];
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Load sound ' + audio.key + ' from ' + audio.file);
            this.game.load.audio(audio.key, audio.file);
        }
    }

    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext')
        //minors 1 for free game mode
        );this.taskCount = this.gameContext.task_configs.tasks.length - 1;
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('PrincessStoryBoard Preload.');
        this.setCurrentGameContext();
    }

    loadAssets() {
        this.loadStoryImages();
        this.loadStoryAudios();
        this.game.load.start();
    }

    renderTaskList() {
        let rightPadding = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(250, this.game);
        let tasks = this.gameContext.task_configs.tasks;
        let x = this.game.width - rightPadding;
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(450, this.game);
        let spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(20, this.game);
        let nextButton = undefined;
        let prevButton = undefined;
        if (this.endIndex < 9 && nextButton === undefined) {
            nextButton = this.game.add.button(x, y, 'Buttons', this.onClickNext, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(nextButton, this.game, -1, 1);
            nextButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, nextButton, '下一页', 'bottom');
        }
        x -= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(200, this.game);

        for (let i = 0; i < 3; i++) {
            let task = tasks[this.endIndex - i];
            let taskButton = this.game.add.button(x, y, 'Buttons', this.onClickTask, { game: this.game, task: task, index: this.endIndex - i }, task.taskHoverImageKey, task.taskNormalImageKey, task.taskClickImageKey, task.taskDisabledImageKey);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(taskButton, this.game, 2, 2);
            taskButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, taskButton, task.taskName, 'bottom');
            x -= spacer;
            if (i < 2) {
                x -= taskButton.width;
            } else {
                x -= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(200, this.game);
            }
        }
        if (this.endIndex > 2 && prevButton === undefined) {
            prevButton = this.game.add.button(x, y, 'Buttons', this.onClickPrevious, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(prevButton, this.game, 1, 1);
            prevButton.anchor.setTo(0.5, 0.5);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, prevButton, '上一页', 'bottom');
        }
    }

    renderFreeTask() {
        let x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(250, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        let task = this.gameContext.task_configs.tasks[10];
        let taskButton = this.game.add.button(x, y, 'Buttons', this.onClickTask, { game: this.game, task: task, index: 10 }, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(taskButton, this.game, 1, 1);
        taskButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, taskButton, task.taskName, 'bottom');
    }

    renderHomeButton() {
        let x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["b" /* rescaleXOffset */])(80, this.game);
        let y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["c" /* rescaleYOffset */])(80, this.game);
        this.backToTasksButton = this.game.add.button(x, y, 'Buttons', this.onBackHome, this, 'buttons/home/hover', 'buttons/home/normal', 'buttons/home/click', 'buttons/home/disabled');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(this.backToTasksButton, this.game, 1, 1);
        this.backToTasksButton.anchor.setTo(0.5, 0.5);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_TooltipBuilder__["a" /* default */])(this.game, this.backToTasksButton, '返回主界面', 'bottom');
    }

    create() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('Princess Story Board Create.');
        if (!this.created) {
            this.loadingText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["e" /* createLoadingText */])(this.game);
            this.game.load.onLoadStart.addOnce(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["f" /* loadStart */], this);
            this.game.load.onFileComplete.add(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["g" /* fileComplete */], this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets();
        } else {
            this.renderState();
        }
    }

    onClickPrevious() {
        this.endIndex -= 3;
        if (this.endIndex < 2) {
            this.endIndex = 2;
        }
        this.renderTaskList();
    }

    onClickNext() {
        this.endIndex += 3;
        if (this.endIndex >= this.taskCount) {
            this.endIndex = this.taskCount - 1;
        }
        this.renderTaskList();
    }

    onClickTask() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Logger__["a" /* logDebugInfo */])('On Click A Task: ' + this.task.taskName);
        this.game.state.add('PrincessAnimationBoard', __WEBPACK_IMPORTED_MODULE_1__PrincessAnimationBoard__["a" /* default */], false);
        this.game.state.add('PrincessTaskBoot', __WEBPACK_IMPORTED_MODULE_2__PrincessTaskBoot__["a" /* default */], false);
        this.game.global.currentTaskIndex = this.index;
        this.game.state.start('PrincessTaskBoot');
    }

    onBackHome() {
        this.game.state.start('MainMenu');
    }

    loadComplete() {
        this.renderState();
        this.loadingText.destroy();
        this.created = true;
    }

    renderState() {
        let background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__UIUtil__["a" /* rescaleObject */])(background, this.game, 1, 1.2);
        background.anchor.setTo(0.5, 0.5);
        this.renderHomeButton();
        this.renderTaskList();
        this.renderFreeTask();
    }
});

/***/ }),
/* 139 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./src/states/princess/PrincessTaskBoot.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Logger__ = __webpack_require__(/*! ../../Logger */ 11);
/**
 * Created by kfang on 7/23/17.
 */
/**
 * Created by kfang on 6/27/17.
 */



/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'));
    }

    init() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('PrincessTaskBoot Init.');
        this.setCurrentGameContext();
    }

    loadCurrentTaskConfig() {
        let taskIndex = this.game.global.currentTaskIndex;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('Current task conf: ' + this.gameContext.task_configs.tasks[taskIndex].taskConf);
        this.game.load.text('taskContext', this.gameContext.task_configs.tasks[taskIndex].taskConf);
    }

    preload() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('PrincessTaskBoot Preload.');
        this.loadCurrentTaskConfig();
    }

    render() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Logger__["a" /* logDebugInfo */])('PrincessTaskBoot Render.');
        this.state.start('PrincessAnimationBoard');
    }
});

/***/ }),
/* 140 */
/* no static exports found */
/* exports used: default */
/*!*******************************!*\
  !*** ./src/util/Phasetips.js ***!
  \*******************************/
/***/ (function(module, exports) {

/**
 * PHASETIPS is a tooltip plugin for Phaser.io HTML5 game framework
 *
 * COPYRIGHT-2015
 * AUTHOR: MICHAEL DOBEKIDIS (NETGFX.COM)
 *
 **/

var Phasetips = function (localGame, options) {

    var _this = this;
    var _options = options || {};
    var game = localGame || game; // it looks for a game object or falls back to the global one

    this.printOptions = function () {
        window.console.log(_options);
    };

    this.onHoverOver = function () {
        if (_this.tweenObj) {
            _this.tweenObj.stop();
        }
        if (_options.animation === "fade") {
            _this.tweenObj = game.add.tween(_this.mainGroup).to({
                alpha: 1
            }, _options.animationSpeedShow, Phaser.Easing.Linear.None, true, _options.animationDelay, 0, false);
        } else if (_options.animation === "slide") {} else if (_options.animation === "grow") {

            _this.mainGroup.pivot.setTo(_this.mainGroup.width / 2, _this.mainGroup.height);
            _this.mainGroup.pivot.setTo(_this.mainGroup.width / 2, _this.mainGroup.height);
            _this.mainGroup.x = _this.mainGroup.initialX + _this.mainGroup.width / 2;
            _this.mainGroup.y = _this.mainGroup.initialY + _this.mainGroup.height;
            _this.mainGroup.scale.setTo(0, 0);
            _this.mainGroup.alpha = 1;
            _this.tweenObj = game.add.tween(_this.mainGroup.scale).to({
                x: 1,
                y: 1
            }, _options.animationSpeedShow, Phaser.Easing.Linear.None, true, _options.animationDelay, 0, false);
        } else {
            _this.mainGroup.visible = true;
            _this.mainGroup.alpha = 1;
        }

        if (_options.onHoverCallback) {
            _options.onHoverCallback(_this);
        }
    };

    this.onHoverOut = function () {
        if (_this.tweenObj) {
            _this.tweenObj.stop();
        }

        if (_options.animation === "fade") {
            _this.tweenObj = game.add.tween(_this.mainGroup).to({
                alpha: 0
            }, _options.animationSpeedHide, Phaser.Easing.Linear.None, true, 0, 0, false);
        } else {
            _this.mainGroup.alpha = 0;
        }

        if (_options.onOutCallback) {
            _options.onOutCallback(_this);
        }
    };

    this.createTooltips = function () {

        // layout
        var _width = _options.width || "auto";
        var _height = _options.height || "auto";
        var _x = _options.x === undefined ? "auto" : _options.x;
        var _y = _options.y === undefined ? "auto" : _options.y;
        var _padding = _options.padding === undefined ? 20 : _options.padding;
        var _positionOffset = _options.positionOffset === undefined ? 20 : _options.positionOffset;
        var _bgColor = _options.backgroundColor || 0x000000;
        var _strokeColor = _options.strokeColor || 0xffffff;
        var _strokeWeight = _options.strokeWeight || 2;
        var _customArrow = _options.customArrow || false;
        var _enableCursor = _options.enableCursor || false;
        var _customBackground = _options.customBackground || false;
        var _fixedToCamera = _options.fixedToCamera || false;
        // Option for rounded corners
        var _roundedCornersRadius = _options.roundedCornersRadius || 1;
        // Option for font style
        var _font = _options.font || '';
        var _fontSize = _options.fontSize || 12;
        var _fontFill = _options.fontFill || "#ffffff";
        var _fontStroke = _options.fontStroke || "#1e1e1e";
        var _fontStrokeThickness = _options.fontStrokeThickness || 1;
        var _fontWordWrap = _options.fontWordWrap || true;
        var _fontWordWrapWidth = _options.fontWordWrapWidth || 200;
        // Text style properties
        var _textStyle = _options.textStyle || {
            font: _font,
            fontSize: _fontSize,
            fill: _fontFill,
            stroke: _fontStroke,
            strokeThickness: _fontStrokeThickness,
            wordWrap: _fontWordWrap,
            wordWrapWidth: _fontWordWrapWidth
        };

        //
        var _position = _options.position || "top"; // top, bottom, left, right, auto(?)
        var _animation = _options.animation || "fade"; // fade, slide, grow, none to manually show it
        var _animationDelay = _options.animationDelay || 0;
        var _content = _options.context || "Hello World"; // string, bitmapText, text, sprite, image, group
        var _object = _options.targetObject || game; // any object
        var _animationSpeedShow = _options.animationSpeedShow || 300;
        var _animationSpeedHide = _options.animationSpeedHide || 200;
        var _onHoverCallback = _options.onHoverCallback || function () {};
        var _onOutCallback = _options.onOutCallback || function () {};
        // If alwaysOn option is set to true, the tooltip will not fade in or out upon hover.
        var _initialOn = _options.initialOn || false;

        // If disableInputEvents option is set to true, PHASETIPS will not add input events.
        // Use simulateOnHoverOver, simulateOnHoverOut, hideTooltip or showTooltip methods to manually control the visibility.
        var _disableInputEvents = _options.disableInputEvents || false;

        _options.animation = _animation;
        _options.animationDelay = _animationDelay;
        _options.animationSpeedShow = _animationSpeedShow;
        _options.animationSpeedHide = _animationSpeedHide;
        _options.onHoverCallback = _onHoverCallback;
        _options.onOutCallback = _onOutCallback;

        ////////////////////////////////////////////////////////////////////////////////////
        var tooltipBG;
        var tooltipContent;
        var tooltipArrow;

        _this.mainGroup = game.add.group();
        var mainGroup = _this.mainGroup;

        // add content first to calculate width & height in case of auto
        var type = typeof _content;

        if (type === "string" || type === "number") {
            tooltipContent = new Phaser.Text(game, _padding / 2, _padding / 2, String(_content), _textStyle);
            tooltipContent.lineSpacing = _textStyle.lineSpacing || 0;
            tooltipContent.updateText();
            tooltipContent.update();
            tooltipContent.x = _padding / 2;
            tooltipContent.y = _padding / 2;
            var bounds = tooltipContent.getBounds();
            /* window.console.log(bounds);
             var debug = game.add.graphics(bounds.width, bounds.height);
             debug.x = _padding/2;
             debug.y = _padding/2;
             debug.beginFill(0xff0000, 0.6);
             debug.drawRect(0, 0, bounds.width, bounds.height, 1);
             window.console.log(debug.x)*/
        } else if (type === "object") {
            tooltipContent = _content;
        }

        if (_width !== "auto" && _height !== "auto") {
            mainGroup.width = _width;
            mainGroup.height = _height;
        } else {
            if (_customBackground === false) {
                mainGroup.width = tooltipContent.width + _padding;
                mainGroup.height = tooltipContent.height + _padding;
            } else {

                if (_customBackground.width > tooltipContent.width) {
                    mainGroup.width = _customBackground.width;
                    mainGroup.height = _customBackground.height;
                } else {
                    mainGroup.width = tooltipContent.width;
                    mainGroup.height = tooltipContent.height;
                }
            }
        }

        // Making it invisible
        if (_initialOn !== true) {
            mainGroup.alpha = 0;
        }
        //////////////////////
        function updatePosition() {
            var _origPosition = _position;
            if (_x !== "auto" && _y !== "auto") {
                var worldPos = _options.targetObject ? _options.targetObject.world : game.world;
                mainGroup.x = _x;
                mainGroup.y = _y;
                if (_fixedToCamera == true) {
                    mainGroup.fixedToCamera = true;
                    mainGroup.cameraOffset.setTo(mainGroup.x, mainGroup.y);
                }
            } else {
                var worldPos = _options.targetObject ? _options.targetObject.world : game.world;
                objectX = worldPos.x || _options.targetObject.x;
                objectY = worldPos.y || _options.targetObject.y;

                // sanity check
                if (_position === "bottom") {
                    if (Math.round(objectY + _object.height + _positionOffset) + mainGroup._height > game.height) {
                        _position = "top";
                    }
                } else if (_position === "top") {
                    if (Math.round(objectY - (_positionOffset + mainGroup._height)) < 0) {
                        _position = "bottom";
                    }
                }

                if (_position === "top") {
                    mainGroup.x = Math.round(objectX + (_object.width / 2 - mainGroup._width / 2));
                    mainGroup.y = Math.round(objectY - (_positionOffset + mainGroup._height));
                } else if (_position === "bottom") {
                    mainGroup.x = Math.round(objectX + (_object.width / 2 - mainGroup._width / 2));
                    mainGroup.y = Math.round(objectY + _object.height + _positionOffset);
                } else if (_position === "left") {
                    mainGroup.x = Math.round(objectX - (_positionOffset + mainGroup._width));
                    mainGroup.y = Math.round(objectY + _object.height / 2 - mainGroup._height / 2);
                    // mainGroup.scale.x = -1;
                } else if (_position === "right") {
                    mainGroup.x = Math.round(objectX + _object.width + _positionOffset);
                    mainGroup.y = Math.round(objectY + _object.height / 2 - mainGroup._height / 2);
                }

                if (_fixedToCamera == true) {
                    mainGroup.fixedToCamera = true;
                    mainGroup.cameraOffset.setTo(mainGroup.x, mainGroup.y);
                }
            }

            // clone world position
            mainGroup.initialWorldX = worldPos.x;
            mainGroup.initialWorldY = worldPos.y;

            mainGroup.initialX = mainGroup.x;
            mainGroup.initialY = mainGroup.y;

            // if the world position changes, there might be space for the tooltip
            // to be in the original position.
            _position = _origPosition;
        }

        updatePosition();

        ///////////////////////////////////////////////////////////////////////////////////


        if (_customBackground === false) {
            /// create bg
            tooltipBG = game.add.graphics(tooltipContent.width, tooltipContent.height);
            tooltipBG.beginFill(_bgColor, 1);
            tooltipBG.x = 0;
            tooltipBG.y = 0;
            tooltipBG.lineStyle(_strokeWeight, _strokeColor, 1);

            // if roundedCornersRadius option is set to 1, drawRect will be used.
            if (_roundedCornersRadius == 1) {
                tooltipBG.drawRect(0, 0, tooltipContent.width + _padding, tooltipContent.height + _padding, 1);
            } else {
                tooltipBG.drawRoundedRect(0, 0, tooltipContent.width + _padding, tooltipContent.height + _padding, _roundedCornersRadius);
            }
        } else {
            tooltipBG = _customBackground;
        }

        // add all to group
        mainGroup.add(tooltipBG);
        mainGroup.add(tooltipContent);
        //if(debug)
        //mainGroup.add(debug);

        // add event listener
        // if "disableInputEvents" option is set to true, the followings are ignored.
        if (_disableInputEvents !== true) {
            _object.inputEnabled = true;
            if (_enableCursor) {
                _object.input.useHandCursor = true;
            }
            _object.events.onInputOver.add(_this.onHoverOver, this);
            _object.events.onInputDown.add(_this.onHoverOver, this);
            _object.events.onInputOut.add(_this.onHoverOut, this);
            _object.events.onInputUp.add(_this.onHoverOut, this);
        }

        mainGroup.update = function () {
            var worldPos = _options.targetObject ? _options.targetObject.world : game.world;
            if (worldPos.x !== mainGroup.initialWorldX) {
                updatePosition();
            }
        };
    };

    this.createTooltips();

    return {
        printOptions: function () {
            _this.printOptions();
        },
        updatePosition: function (x, y) {
            _this.mainGroup.x = x;
            _this.mainGroup.y = y;
        },
        destroy: function () {
            _this.mainGroup.removeChildren();
            _this.mainGroup.destroy();
        },
        hideTooltip: function () {
            _this.mainGroup.visible = false;
            _this.mainGroup.alpha = 0;
        },
        showTooltip: function () {
            _this.mainGroup.visible = true;
            _this.mainGroup.alpha = 1;
        },
        simulateOnHoverOver: function () {
            _this.onHoverOver();
        },
        simulateOnHoverOut: function () {
            _this.onHoverOut();
        }
    };
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Phasetips;
}

/***/ }),
/* 141 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/fn/regexp/escape.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 150);
module.exports = __webpack_require__(/*! ../../modules/_core */ 27).RegExp.escape;

/***/ }),
/* 142 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/_array-species-constructor.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , isArray  = __webpack_require__(/*! ./_is-array */ 73)
  , SPECIES  = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 143 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_array-species-create.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 142);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 144 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_date-to-primitive.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 25)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 145 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_enum-keys.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 39)
  , gOPS    = __webpack_require__(/*! ./_object-gops */ 62)
  , pIE     = __webpack_require__(/*! ./_object-pie */ 51);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 146 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_keyof.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(/*! ./_object-keys */ 39)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 147 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_partial.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(/*! ./_path */ 148)
  , invoke    = __webpack_require__(/*! ./_invoke */ 58)
  , aFunction = __webpack_require__(/*! ./_a-function */ 13);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 148 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_path.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_global */ 2);

/***/ }),
/* 149 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_replacer.js ***!
  \****************************************/
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 150 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/core.regexp.escape.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0)
  , $re     = __webpack_require__(/*! ./_replacer */ 149)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 151 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.array.copy-within.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(/*! ./_array-copy-within */ 95)});

__webpack_require__(/*! ./_add-to-unscopables */ 44)('copyWithin');

/***/ }),
/* 152 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.every.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $every  = __webpack_require__(/*! ./_array-methods */ 23)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 153 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.fill.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', {fill: __webpack_require__(/*! ./_array-fill */ 65)});

__webpack_require__(/*! ./_add-to-unscopables */ 44)('fill');

/***/ }),
/* 154 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.filter.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $filter = __webpack_require__(/*! ./_array-methods */ 23)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 155 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.array.find-index.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $find   = __webpack_require__(/*! ./_array-methods */ 23)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 44)(KEY);

/***/ }),
/* 156 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.find.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $find   = __webpack_require__(/*! ./_array-methods */ 23)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 44)(KEY);

/***/ }),
/* 157 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.for-each.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(/*! ./_export */ 0)
  , $forEach = __webpack_require__(/*! ./_array-methods */ 23)(0)
  , STRICT   = __webpack_require__(/*! ./_strict-method */ 22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 158 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.from.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(/*! ./_ctx */ 28)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , toObject       = __webpack_require__(/*! ./_to-object */ 9)
  , call           = __webpack_require__(/*! ./_iter-call */ 104)
  , isArrayIter    = __webpack_require__(/*! ./_is-array-iter */ 72)
  , toLength       = __webpack_require__(/*! ./_to-length */ 8)
  , createProperty = __webpack_require__(/*! ./_create-property */ 66)
  , getIterFn      = __webpack_require__(/*! ./core.get-iterator-method */ 89);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 60)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 159 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.index-of.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(/*! ./_export */ 0)
  , $indexOf      = __webpack_require__(/*! ./_array-includes */ 54)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 160 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.is-array.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', {isArray: __webpack_require__(/*! ./_is-array */ 73)});

/***/ }),
/* 161 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.join.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 17)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 50) != Object || !__webpack_require__(/*! ./_strict-method */ 22)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 162 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.array.last-index-of.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(/*! ./_export */ 0)
  , toIObject     = __webpack_require__(/*! ./_to-iobject */ 17)
  , toInteger     = __webpack_require__(/*! ./_to-integer */ 33)
  , toLength      = __webpack_require__(/*! ./_to-length */ 8)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 163 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.array.map.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $map    = __webpack_require__(/*! ./_array-methods */ 23)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 164 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.array.of.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(/*! ./_export */ 0)
  , createProperty = __webpack_require__(/*! ./_create-property */ 66);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 165 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce-right.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $reduce = __webpack_require__(/*! ./_array-reduce */ 97);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 166 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $reduce = __webpack_require__(/*! ./_array-reduce */ 97);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 167 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.slice.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(/*! ./_export */ 0)
  , html       = __webpack_require__(/*! ./_html */ 70)
  , cof        = __webpack_require__(/*! ./_cof */ 20)
  , toIndex    = __webpack_require__(/*! ./_to-index */ 42)
  , toLength   = __webpack_require__(/*! ./_to-length */ 8)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 168 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.some.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $some   = __webpack_require__(/*! ./_array-methods */ 23)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 169 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.sort.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(/*! ./_export */ 0)
  , aFunction = __webpack_require__(/*! ./_a-function */ 13)
  , toObject  = __webpack_require__(/*! ./_to-object */ 9)
  , fails     = __webpack_require__(/*! ./_fails */ 3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 170 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.array.species.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 41)('Array');

/***/ }),
/* 171 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.date.now.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 172 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-iso-string.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 173 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.date.to-json.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(/*! ./_export */ 0)
  , toObject    = __webpack_require__(/*! ./_to-object */ 9)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 25);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 174 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-primitive.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(/*! ./_hide */ 14)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 144));

/***/ }),
/* 175 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-string.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(/*! ./_redefine */ 15)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 176 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.bind.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', {bind: __webpack_require__(/*! ./_bind */ 98)});

/***/ }),
/* 177 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.function.has-instance.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19)
  , HAS_INSTANCE   = __webpack_require__(/*! ./_wks */ 5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(/*! ./_object-dp */ 7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 178 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.name.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(/*! ./_object-dp */ 7).f
  , createDesc = __webpack_require__(/*! ./_property-desc */ 32)
  , has        = __webpack_require__(/*! ./_has */ 12)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 179 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.acosh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , log1p   = __webpack_require__(/*! ./_math-log1p */ 106)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 180 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.asinh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 181 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.atanh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 182 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cbrt.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , sign    = __webpack_require__(/*! ./_math-sign */ 77);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 183 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.clz32.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 184 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cosh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 185 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.expm1.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $expm1  = __webpack_require__(/*! ./_math-expm1 */ 76);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 186 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.math.fround.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , sign      = __webpack_require__(/*! ./_math-sign */ 77)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 187 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.hypot.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 188 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.imul.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 189 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log10.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 190 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log1p.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {log1p: __webpack_require__(/*! ./_math-log1p */ 106)});

/***/ }),
/* 191 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.log2.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 192 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sign.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {sign: __webpack_require__(/*! ./_math-sign */ 77)});

/***/ }),
/* 193 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sinh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 76)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 194 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.tanh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 76)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 195 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.trunc.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 196 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(/*! ./_global */ 2)
  , has               = __webpack_require__(/*! ./_has */ 12)
  , cof               = __webpack_require__(/*! ./_cof */ 20)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 71)
  , toPrimitive       = __webpack_require__(/*! ./_to-primitive */ 25)
  , fails             = __webpack_require__(/*! ./_fails */ 3)
  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 38).f
  , gOPD              = __webpack_require__(/*! ./_object-gopd */ 18).f
  , dP                = __webpack_require__(/*! ./_object-dp */ 7).f
  , $trim             = __webpack_require__(/*! ./_string-trim */ 48).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(/*! ./_object-create */ 37)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(/*! ./_descriptors */ 6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 15)(global, NUMBER, $Number);
}

/***/ }),
/* 197 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.number.epsilon.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 198 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-finite.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 199 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-integer.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {isInteger: __webpack_require__(/*! ./_is-integer */ 103)});

/***/ }),
/* 200 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-nan.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 201 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-safe-integer.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , isInteger = __webpack_require__(/*! ./_is-integer */ 103)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 202 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.max-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 203 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.min-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 204 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-float.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(/*! ./_export */ 0)
  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 113);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 205 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-int.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , $parseInt = __webpack_require__(/*! ./_parse-int */ 114);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 206 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-fixed.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , toInteger    = __webpack_require__(/*! ./_to-integer */ 33)
  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 94)
  , repeat       = __webpack_require__(/*! ./_string-repeat */ 84)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 207 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-precision.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , $fails       = __webpack_require__(/*! ./_fails */ 3)
  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 94)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 208 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.assign.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./_object-assign */ 107)});

/***/ }),
/* 209 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.create.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 37)});

/***/ }),
/* 210 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-properties.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', {defineProperties: __webpack_require__(/*! ./_object-dps */ 108)});

/***/ }),
/* 211 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-property.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', {defineProperty: __webpack_require__(/*! ./_object-dp */ 7).f});

/***/ }),
/* 212 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.freeze.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 31).onFreeze;

__webpack_require__(/*! ./_object-sap */ 24)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 213 */
/* no static exports found */
/* all exports used */
/*!*********************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(/*! ./_to-iobject */ 17)
  , $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

__webpack_require__(/*! ./_object-sap */ 24)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 214 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-names.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 24)('getOwnPropertyNames', function(){
  return __webpack_require__(/*! ./_object-gopn-ext */ 109).f;
});

/***/ }),
/* 215 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(/*! ./_to-object */ 9)
  , $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);

__webpack_require__(/*! ./_object-sap */ 24)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 216 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-extensible.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 24)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 217 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-frozen.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 24)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 218 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-sealed.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 24)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 219 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.object.is.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', {is: __webpack_require__(/*! ./_same-value */ 115)});

/***/ }),
/* 220 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.keys.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9)
  , $keys    = __webpack_require__(/*! ./_object-keys */ 39);

__webpack_require__(/*! ./_object-sap */ 24)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 221 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.object.prevent-extensions.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 31).onFreeze;

__webpack_require__(/*! ./_object-sap */ 24)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 222 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.seal.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 31).onFreeze;

__webpack_require__(/*! ./_object-sap */ 24)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 223 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.set-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 79).set});

/***/ }),
/* 224 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 49)
  , test    = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(/*! ./_redefine */ 15)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 225 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.parse-float.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(/*! ./_export */ 0)
  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 113);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 226 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.parse-int.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , $parseInt = __webpack_require__(/*! ./_parse-int */ 114);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 227 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/es6.promise.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(/*! ./_library */ 36)
  , global             = __webpack_require__(/*! ./_global */ 2)
  , ctx                = __webpack_require__(/*! ./_ctx */ 28)
  , classof            = __webpack_require__(/*! ./_classof */ 49)
  , $export            = __webpack_require__(/*! ./_export */ 0)
  , isObject           = __webpack_require__(/*! ./_is-object */ 4)
  , aFunction          = __webpack_require__(/*! ./_a-function */ 13)
  , anInstance         = __webpack_require__(/*! ./_an-instance */ 35)
  , forOf              = __webpack_require__(/*! ./_for-of */ 45)
  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 81)
  , task               = __webpack_require__(/*! ./_task */ 86).set
  , microtask          = __webpack_require__(/*! ./_microtask */ 78)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 40)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(/*! ./_set-to-string-tag */ 47)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 41)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 27)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 60)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 228 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.apply.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , aFunction = __webpack_require__(/*! ./_a-function */ 13)
  , anObject  = __webpack_require__(/*! ./_an-object */ 1)
  , rApply    = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 229 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.construct.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(/*! ./_export */ 0)
  , create     = __webpack_require__(/*! ./_object-create */ 37)
  , aFunction  = __webpack_require__(/*! ./_a-function */ 13)
  , anObject   = __webpack_require__(/*! ./_an-object */ 1)
  , isObject   = __webpack_require__(/*! ./_is-object */ 4)
  , fails      = __webpack_require__(/*! ./_fails */ 3)
  , bind       = __webpack_require__(/*! ./_bind */ 98)
  , rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 230 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.define-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(/*! ./_object-dp */ 7)
  , $export     = __webpack_require__(/*! ./_export */ 0)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 25);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 231 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.delete-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , gOPD     = __webpack_require__(/*! ./_object-gopd */ 18).f
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 232 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.enumerate.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 74)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 233 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(/*! ./_object-gopd */ 18)
  , $export  = __webpack_require__(/*! ./_export */ 0)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 234 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , getProto = __webpack_require__(/*! ./_object-gpo */ 19)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 235 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(/*! ./_object-gopd */ 18)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19)
  , has            = __webpack_require__(/*! ./_has */ 12)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 236 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.has.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 237 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.is-extensible.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(/*! ./_export */ 0)
  , anObject      = __webpack_require__(/*! ./_an-object */ 1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 238 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.own-keys.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(/*! ./_own-keys */ 112)});

/***/ }),
/* 239 */
/* no static exports found */
/* all exports used */
/*!*************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(/*! ./_export */ 0)
  , anObject           = __webpack_require__(/*! ./_an-object */ 1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 240 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , setProto = __webpack_require__(/*! ./_set-proto */ 79);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 241 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(/*! ./_object-dp */ 7)
  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 18)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19)
  , has            = __webpack_require__(/*! ./_has */ 12)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 32)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , isObject       = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 242 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(/*! ./_global */ 2)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 71)
  , dP                = __webpack_require__(/*! ./_object-dp */ 7).f
  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 38).f
  , isRegExp          = __webpack_require__(/*! ./_is-regexp */ 59)
  , $flags            = __webpack_require__(/*! ./_flags */ 57)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(/*! ./_descriptors */ 6) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function(){
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 15)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 41)('RegExp');

/***/ }),
/* 243 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.match.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 244 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.replace.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 245 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.search.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 246 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.split.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(/*! ./_is-regexp */ 59)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 247 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 119);
var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , $flags      = __webpack_require__(/*! ./_flags */ 57)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(/*! ./_redefine */ 15)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(/*! ./_fails */ 3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 248 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.anchor.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 16)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 249 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.big.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 16)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 250 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.blink.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 16)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 251 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.bold.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 16)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 252 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.string.code-point-at.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $at     = __webpack_require__(/*! ./_string-at */ 82)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 253 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.ends-with.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(/*! ./_export */ 0)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8)
  , context   = __webpack_require__(/*! ./_string-context */ 83)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 69)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 254 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.fixed.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 16)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 255 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontcolor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 16)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 256 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontsize.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 16)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 257 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.string.from-code-point.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(/*! ./_export */ 0)
  , toIndex        = __webpack_require__(/*! ./_to-index */ 42)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 258 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.includes.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(/*! ./_export */ 0)
  , context  = __webpack_require__(/*! ./_string-context */ 83)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 69)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 259 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.string.italics.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 16)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 260 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.iterator.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(/*! ./_string-at */ 82)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 75)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 261 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.link.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 16)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 262 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.raw.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 17)
  , toLength  = __webpack_require__(/*! ./_to-length */ 8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 263 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.repeat.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 84)
});

/***/ }),
/* 264 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.small.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 16)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 265 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.string.starts-with.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(/*! ./_export */ 0)
  , toLength    = __webpack_require__(/*! ./_to-length */ 8)
  , context     = __webpack_require__(/*! ./_string-context */ 83)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 69)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 266 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.strike.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 16)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 267 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sub.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 16)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 268 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sup.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 16)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 269 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.trim.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 48)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 270 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/es6.symbol.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(/*! ./_global */ 2)
  , has            = __webpack_require__(/*! ./_has */ 12)
  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 6)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , redefine       = __webpack_require__(/*! ./_redefine */ 15)
  , META           = __webpack_require__(/*! ./_meta */ 31).KEY
  , $fails         = __webpack_require__(/*! ./_fails */ 3)
  , shared         = __webpack_require__(/*! ./_shared */ 63)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47)
  , uid            = __webpack_require__(/*! ./_uid */ 43)
  , wks            = __webpack_require__(/*! ./_wks */ 5)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 117)
  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 88)
  , keyOf          = __webpack_require__(/*! ./_keyof */ 146)
  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 145)
  , isArray        = __webpack_require__(/*! ./_is-array */ 73)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 17)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 25)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 32)
  , _create        = __webpack_require__(/*! ./_object-create */ 37)
  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 109)
  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 18)
  , $DP            = __webpack_require__(/*! ./_object-dp */ 7)
  , $keys          = __webpack_require__(/*! ./_object-keys */ 39)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 51).f  = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 62).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 36)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 271 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.array-buffer.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , $typed       = __webpack_require__(/*! ./_typed */ 64)
  , buffer       = __webpack_require__(/*! ./_typed-buffer */ 87)
  , anObject     = __webpack_require__(/*! ./_an-object */ 1)
  , toIndex      = __webpack_require__(/*! ./_to-index */ 42)
  , toLength     = __webpack_require__(/*! ./_to-length */ 8)
  , isObject     = __webpack_require__(/*! ./_is-object */ 4)
  , ArrayBuffer  = __webpack_require__(/*! ./_global */ 2).ArrayBuffer
  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 81)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 41)(ARRAY_BUFFER);

/***/ }),
/* 272 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.typed.data-view.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 64).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 87).DataView
});

/***/ }),
/* 273 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float32-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 274 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float64-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 275 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int16-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 276 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int32-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 277 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int8-array.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 278 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint16-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 279 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint32-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 280 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 281 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 30)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 282 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-set.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 101);

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 55)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 283 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.array.includes.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(/*! ./_export */ 0)
  , $includes = __webpack_require__(/*! ./_array-includes */ 54)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 44)('includes');

/***/ }),
/* 284 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/es7.asap.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(/*! ./_export */ 0)
  , microtask = __webpack_require__(/*! ./_microtask */ 78)()
  , process   = __webpack_require__(/*! ./_global */ 2).process
  , isNode    = __webpack_require__(/*! ./_cof */ 20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 285 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.error.is-error.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0)
  , cof     = __webpack_require__(/*! ./_cof */ 20);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 286 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.map.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 100)('Map')});

/***/ }),
/* 287 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.iaddh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 288 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.imulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 289 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.isubh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 290 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.umulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 291 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(/*! ./_export */ 0)
  , toObject        = __webpack_require__(/*! ./_to-object */ 9)
  , aFunction       = __webpack_require__(/*! ./_a-function */ 13)
  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 292 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(/*! ./_export */ 0)
  , toObject        = __webpack_require__(/*! ./_to-object */ 9)
  , aFunction       = __webpack_require__(/*! ./_a-function */ 13)
  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 293 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.object.entries.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(/*! ./_export */ 0)
  , $entries = __webpack_require__(/*! ./_object-to-array */ 111)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 294 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(/*! ./_export */ 0)
  , ownKeys        = __webpack_require__(/*! ./_own-keys */ 112)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 17)
  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 18)
  , createProperty = __webpack_require__(/*! ./_create-property */ 66);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 295 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(/*! ./_export */ 0)
  , toObject                 = __webpack_require__(/*! ./_to-object */ 9)
  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 25)
  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 19)
  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 296 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(/*! ./_export */ 0)
  , toObject                 = __webpack_require__(/*! ./_to-object */ 9)
  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 25)
  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 19)
  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 297 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.object.values.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0)
  , $values = __webpack_require__(/*! ./_object-to-array */ 111)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 298 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.observable.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(/*! ./_export */ 0)
  , global      = __webpack_require__(/*! ./_global */ 2)
  , core        = __webpack_require__(/*! ./_core */ 27)
  , microtask   = __webpack_require__(/*! ./_microtask */ 78)()
  , OBSERVABLE  = __webpack_require__(/*! ./_wks */ 5)('observable')
  , aFunction   = __webpack_require__(/*! ./_a-function */ 13)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , anInstance  = __webpack_require__(/*! ./_an-instance */ 35)
  , redefineAll = __webpack_require__(/*! ./_redefine-all */ 40)
  , hide        = __webpack_require__(/*! ./_hide */ 14)
  , forOf       = __webpack_require__(/*! ./_for-of */ 45)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(/*! ./_set-species */ 41)('Observable');

/***/ }),
/* 299 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.define-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(/*! ./_metadata */ 29)
  , anObject                  = __webpack_require__(/*! ./_an-object */ 1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 300 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.delete-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 29)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 301 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(/*! ./es6.set */ 120)
  , from                    = __webpack_require__(/*! ./_array-from-iterable */ 96)
  , metadata                = __webpack_require__(/*! ./_metadata */ 29)
  , anObject                = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf          = __webpack_require__(/*! ./_object-gpo */ 19)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 302 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 29)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 19)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 303 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(/*! ./_metadata */ 29)
  , anObject                = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 304 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 29)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 305 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 29)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 19)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 306 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 29)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 307 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.metadata.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(/*! ./_metadata */ 29)
  , anObject                  = __webpack_require__(/*! ./_an-object */ 1)
  , aFunction                 = __webpack_require__(/*! ./_a-function */ 13)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 308 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.set.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 100)('Set')});

/***/ }),
/* 309 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es7.string.at.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0)
  , $at     = __webpack_require__(/*! ./_string-at */ 82)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 310 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.match-all.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(/*! ./_export */ 0)
  , defined     = __webpack_require__(/*! ./_defined */ 21)
  , toLength    = __webpack_require__(/*! ./_to-length */ 8)
  , isRegExp    = __webpack_require__(/*! ./_is-regexp */ 59)
  , getFlags    = __webpack_require__(/*! ./_flags */ 57)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 74)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 311 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-end.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0)
  , $pad    = __webpack_require__(/*! ./_string-pad */ 116);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 312 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-start.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0)
  , $pad    = __webpack_require__(/*! ./_string-pad */ 116);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 313 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-left.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 48)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 314 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-right.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 48)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 315 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.async-iterator.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 88)('asyncIterator');

/***/ }),
/* 316 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.observable.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 88)('observable');

/***/ }),
/* 317 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.system.global.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', {global: __webpack_require__(/*! ./_global */ 2)});

/***/ }),
/* 318 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/web.dom.iterable.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(/*! ./es6.array.iterator */ 90)
  , redefine      = __webpack_require__(/*! ./_redefine */ 15)
  , global        = __webpack_require__(/*! ./_global */ 2)
  , hide          = __webpack_require__(/*! ./_hide */ 14)
  , Iterators     = __webpack_require__(/*! ./_iterators */ 46)
  , wks           = __webpack_require__(/*! ./_wks */ 5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 319 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/web.immediate.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , $task   = __webpack_require__(/*! ./_task */ 86);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 320 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/web.timers.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(/*! ./_global */ 2)
  , $export    = __webpack_require__(/*! ./_export */ 0)
  , invoke     = __webpack_require__(/*! ./_invoke */ 58)
  , partial    = __webpack_require__(/*! ./_partial */ 147)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 321 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** ./~/core-js/shim.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 270);
__webpack_require__(/*! ./modules/es6.object.create */ 209);
__webpack_require__(/*! ./modules/es6.object.define-property */ 211);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 210);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 213);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 215);
__webpack_require__(/*! ./modules/es6.object.keys */ 220);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 214);
__webpack_require__(/*! ./modules/es6.object.freeze */ 212);
__webpack_require__(/*! ./modules/es6.object.seal */ 222);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 221);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 217);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 218);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 216);
__webpack_require__(/*! ./modules/es6.object.assign */ 208);
__webpack_require__(/*! ./modules/es6.object.is */ 219);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 223);
__webpack_require__(/*! ./modules/es6.object.to-string */ 224);
__webpack_require__(/*! ./modules/es6.function.bind */ 176);
__webpack_require__(/*! ./modules/es6.function.name */ 178);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 177);
__webpack_require__(/*! ./modules/es6.parse-int */ 226);
__webpack_require__(/*! ./modules/es6.parse-float */ 225);
__webpack_require__(/*! ./modules/es6.number.constructor */ 196);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 206);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 207);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 197);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 198);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 199);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 200);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 201);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 202);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 203);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 204);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 205);
__webpack_require__(/*! ./modules/es6.math.acosh */ 179);
__webpack_require__(/*! ./modules/es6.math.asinh */ 180);
__webpack_require__(/*! ./modules/es6.math.atanh */ 181);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 182);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 183);
__webpack_require__(/*! ./modules/es6.math.cosh */ 184);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 185);
__webpack_require__(/*! ./modules/es6.math.fround */ 186);
__webpack_require__(/*! ./modules/es6.math.hypot */ 187);
__webpack_require__(/*! ./modules/es6.math.imul */ 188);
__webpack_require__(/*! ./modules/es6.math.log10 */ 189);
__webpack_require__(/*! ./modules/es6.math.log1p */ 190);
__webpack_require__(/*! ./modules/es6.math.log2 */ 191);
__webpack_require__(/*! ./modules/es6.math.sign */ 192);
__webpack_require__(/*! ./modules/es6.math.sinh */ 193);
__webpack_require__(/*! ./modules/es6.math.tanh */ 194);
__webpack_require__(/*! ./modules/es6.math.trunc */ 195);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 257);
__webpack_require__(/*! ./modules/es6.string.raw */ 262);
__webpack_require__(/*! ./modules/es6.string.trim */ 269);
__webpack_require__(/*! ./modules/es6.string.iterator */ 260);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 252);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 253);
__webpack_require__(/*! ./modules/es6.string.includes */ 258);
__webpack_require__(/*! ./modules/es6.string.repeat */ 263);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 265);
__webpack_require__(/*! ./modules/es6.string.anchor */ 248);
__webpack_require__(/*! ./modules/es6.string.big */ 249);
__webpack_require__(/*! ./modules/es6.string.blink */ 250);
__webpack_require__(/*! ./modules/es6.string.bold */ 251);
__webpack_require__(/*! ./modules/es6.string.fixed */ 254);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 255);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 256);
__webpack_require__(/*! ./modules/es6.string.italics */ 259);
__webpack_require__(/*! ./modules/es6.string.link */ 261);
__webpack_require__(/*! ./modules/es6.string.small */ 264);
__webpack_require__(/*! ./modules/es6.string.strike */ 266);
__webpack_require__(/*! ./modules/es6.string.sub */ 267);
__webpack_require__(/*! ./modules/es6.string.sup */ 268);
__webpack_require__(/*! ./modules/es6.date.now */ 171);
__webpack_require__(/*! ./modules/es6.date.to-json */ 173);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 172);
__webpack_require__(/*! ./modules/es6.date.to-string */ 175);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 174);
__webpack_require__(/*! ./modules/es6.array.is-array */ 160);
__webpack_require__(/*! ./modules/es6.array.from */ 158);
__webpack_require__(/*! ./modules/es6.array.of */ 164);
__webpack_require__(/*! ./modules/es6.array.join */ 161);
__webpack_require__(/*! ./modules/es6.array.slice */ 167);
__webpack_require__(/*! ./modules/es6.array.sort */ 169);
__webpack_require__(/*! ./modules/es6.array.for-each */ 157);
__webpack_require__(/*! ./modules/es6.array.map */ 163);
__webpack_require__(/*! ./modules/es6.array.filter */ 154);
__webpack_require__(/*! ./modules/es6.array.some */ 168);
__webpack_require__(/*! ./modules/es6.array.every */ 152);
__webpack_require__(/*! ./modules/es6.array.reduce */ 166);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 165);
__webpack_require__(/*! ./modules/es6.array.index-of */ 159);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 162);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 151);
__webpack_require__(/*! ./modules/es6.array.fill */ 153);
__webpack_require__(/*! ./modules/es6.array.find */ 156);
__webpack_require__(/*! ./modules/es6.array.find-index */ 155);
__webpack_require__(/*! ./modules/es6.array.species */ 170);
__webpack_require__(/*! ./modules/es6.array.iterator */ 90);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 242);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 247);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 119);
__webpack_require__(/*! ./modules/es6.regexp.match */ 243);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 244);
__webpack_require__(/*! ./modules/es6.regexp.search */ 245);
__webpack_require__(/*! ./modules/es6.regexp.split */ 246);
__webpack_require__(/*! ./modules/es6.promise */ 227);
__webpack_require__(/*! ./modules/es6.map */ 118);
__webpack_require__(/*! ./modules/es6.set */ 120);
__webpack_require__(/*! ./modules/es6.weak-map */ 121);
__webpack_require__(/*! ./modules/es6.weak-set */ 282);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 271);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 272);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 277);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 280);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 281);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 275);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 278);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 276);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 279);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 273);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 274);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 228);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 229);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 230);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 231);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 232);
__webpack_require__(/*! ./modules/es6.reflect.get */ 235);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 233);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 234);
__webpack_require__(/*! ./modules/es6.reflect.has */ 236);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 237);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 238);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 239);
__webpack_require__(/*! ./modules/es6.reflect.set */ 241);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 240);
__webpack_require__(/*! ./modules/es7.array.includes */ 283);
__webpack_require__(/*! ./modules/es7.string.at */ 309);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 312);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 311);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 313);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 314);
__webpack_require__(/*! ./modules/es7.string.match-all */ 310);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 315);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 316);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 294);
__webpack_require__(/*! ./modules/es7.object.values */ 297);
__webpack_require__(/*! ./modules/es7.object.entries */ 293);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 291);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 292);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 295);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 296);
__webpack_require__(/*! ./modules/es7.map.to-json */ 286);
__webpack_require__(/*! ./modules/es7.set.to-json */ 308);
__webpack_require__(/*! ./modules/es7.system.global */ 317);
__webpack_require__(/*! ./modules/es7.error.is-error */ 285);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 287);
__webpack_require__(/*! ./modules/es7.math.isubh */ 289);
__webpack_require__(/*! ./modules/es7.math.imulh */ 288);
__webpack_require__(/*! ./modules/es7.math.umulh */ 290);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 299);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 300);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 302);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 301);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 304);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 303);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 305);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 306);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 307);
__webpack_require__(/*! ./modules/es7.asap */ 284);
__webpack_require__(/*! ./modules/es7.observable */ 298);
__webpack_require__(/*! ./modules/web.timers */ 320);
__webpack_require__(/*! ./modules/web.immediate */ 319);
__webpack_require__(/*! ./modules/web.dom.iterable */ 318);
module.exports = __webpack_require__(/*! ./modules/_core */ 27);

/***/ }),
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/regenerator-runtime/runtime.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 52)))

/***/ }),
/* 327 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */123);
module.exports = __webpack_require__(/*! /Users/kfang/Desktop/mindlinker/src/main.js */122);


/***/ })
],[327]);
//# sourceMappingURL=bundle-9a2d47.js.map