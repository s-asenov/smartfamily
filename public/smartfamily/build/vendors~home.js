(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~home"],{

/***/ "./node_modules/@fortawesome/free-regular-svg-icons/faTimesCircle.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@fortawesome/free-regular-svg-icons/faTimesCircle.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
var prefix = 'far';
var iconName = 'times-circle';
var width = 512;
var height = 512;
var ligatures = [];
var unicode = 'f057';
var svgPathData = 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z';

exports.definition = {
  prefix: prefix,
  iconName: iconName,
  icon: [
    width,
    height,
    ligatures,
    unicode,
    svgPathData
  ]};

exports.faTimesCircle = exports.definition;
exports.prefix = prefix;
exports.iconName = iconName;
exports.width = width;
exports.height = height;
exports.ligatures = ligatures;
exports.unicode = unicode;
exports.svgPathData = svgPathData;

/***/ }),

/***/ "./node_modules/core-js/internals/array-method-has-species-support.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $findIndex = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").findIndex;
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.map.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $map = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").map;
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.slice.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.slice.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.splice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.splice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/react-paginate/dist/BreakView.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-paginate/dist/BreakView.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreakView = function BreakView(props) {
  var breakLabel = props.breakLabel,
      breakClassName = props.breakClassName,
      breakLinkClassName = props.breakLinkClassName,
      onClick = props.onClick;

  var className = breakClassName || 'break';

  return _react2.default.createElement(
    'li',
    { className: className },
    _react2.default.createElement(
      'a',
      {
        className: breakLinkClassName,
        onClick: onClick,
        role: 'button',
        tabIndex: '0',
        onKeyPress: onClick
      },
      breakLabel
    )
  );
};

BreakView.propTypes = {
  breakLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  breakClassName: _propTypes2.default.string,
  breakLinkClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = BreakView;
//# sourceMappingURL=BreakView.js.map

/***/ }),

/***/ "./node_modules/react-paginate/dist/PageView.js":
/*!******************************************************!*\
  !*** ./node_modules/react-paginate/dist/PageView.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageView = function PageView(props) {
  var pageClassName = props.pageClassName;
  var pageLinkClassName = props.pageLinkClassName;

  var onClick = props.onClick;
  var href = props.href;
  var ariaLabel = props.ariaLabel || 'Page ' + props.page + (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  var ariaCurrent = null;

  if (props.selected) {
    ariaCurrent = 'page';

    ariaLabel = props.ariaLabel || 'Page ' + props.page + ' is your current page';

    if (typeof pageClassName !== 'undefined') {
      pageClassName = pageClassName + ' ' + props.activeClassName;
    } else {
      pageClassName = props.activeClassName;
    }

    if (typeof pageLinkClassName !== 'undefined') {
      if (typeof props.activeLinkClassName !== 'undefined') {
        pageLinkClassName = pageLinkClassName + ' ' + props.activeLinkClassName;
      }
    } else {
      pageLinkClassName = props.activeLinkClassName;
    }
  }

  return _react2.default.createElement(
    'li',
    { className: pageClassName },
    _react2.default.createElement(
      'a',
      {
        onClick: onClick,
        role: 'button',
        className: pageLinkClassName,
        href: href,
        tabIndex: '0',
        'aria-label': ariaLabel,
        'aria-current': ariaCurrent,
        onKeyPress: onClick
      },
      props.page
    )
  );
};

PageView.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  selected: _propTypes2.default.bool.isRequired,
  pageClassName: _propTypes2.default.string,
  pageLinkClassName: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  activeLinkClassName: _propTypes2.default.string,
  extraAriaContext: _propTypes2.default.string,
  href: _propTypes2.default.string,
  ariaLabel: _propTypes2.default.string,
  page: _propTypes2.default.number.isRequired
};

exports.default = PageView;
//# sourceMappingURL=PageView.js.map

/***/ }),

/***/ "./node_modules/react-paginate/dist/PaginationBoxView.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-paginate/dist/PaginationBoxView.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PageView = __webpack_require__(/*! ./PageView */ "./node_modules/react-paginate/dist/PageView.js");

var _PageView2 = _interopRequireDefault(_PageView);

var _BreakView = __webpack_require__(/*! ./BreakView */ "./node_modules/react-paginate/dist/BreakView.js");

var _BreakView2 = _interopRequireDefault(_BreakView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationBoxView = function (_Component) {
  _inherits(PaginationBoxView, _Component);

  function PaginationBoxView(props) {
    _classCallCheck(this, PaginationBoxView);

    var _this = _possibleConstructorReturn(this, (PaginationBoxView.__proto__ || Object.getPrototypeOf(PaginationBoxView)).call(this, props));

    _this.handlePreviousPage = function (evt) {
      var selected = _this.state.selected;

      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      if (selected > 0) {
        _this.handlePageSelected(selected - 1, evt);
      }
    };

    _this.handleNextPage = function (evt) {
      var selected = _this.state.selected;
      var pageCount = _this.props.pageCount;


      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      if (selected < pageCount - 1) {
        _this.handlePageSelected(selected + 1, evt);
      }
    };

    _this.handlePageSelected = function (selected, evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      if (_this.state.selected === selected) return;

      _this.setState({ selected: selected });

      // Call the callback with the new selected item:
      _this.callCallback(selected);
    };

    _this.handleBreakClick = function (index, evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      var selected = _this.state.selected;


      _this.handlePageSelected(selected < index ? _this.getForwardJump() : _this.getBackwardJump(), evt);
    };

    _this.callCallback = function (selectedItem) {
      if (typeof _this.props.onPageChange !== 'undefined' && typeof _this.props.onPageChange === 'function') {
        _this.props.onPageChange({ selected: selectedItem });
      }
    };

    _this.pagination = function () {
      var items = [];
      var _this$props = _this.props,
          pageRangeDisplayed = _this$props.pageRangeDisplayed,
          pageCount = _this$props.pageCount,
          marginPagesDisplayed = _this$props.marginPagesDisplayed,
          breakLabel = _this$props.breakLabel,
          breakClassName = _this$props.breakClassName,
          breakLinkClassName = _this$props.breakLinkClassName;
      var selected = _this.state.selected;


      if (pageCount <= pageRangeDisplayed) {
        for (var index = 0; index < pageCount; index++) {
          items.push(_this.getPageElement(index));
        }
      } else {
        var leftSide = pageRangeDisplayed / 2;
        var rightSide = pageRangeDisplayed - leftSide;

        // If the selected page index is on the default right side of the pagination,
        // we consider that the new right side is made up of it (= only one break element).
        // If the selected page index is on the default left side of the pagination,
        // we consider that the new left side is made up of it (= only one break element).
        if (selected > pageCount - pageRangeDisplayed / 2) {
          rightSide = pageCount - selected;
          leftSide = pageRangeDisplayed - rightSide;
        } else if (selected < pageRangeDisplayed / 2) {
          leftSide = selected;
          rightSide = pageRangeDisplayed - leftSide;
        }

        var _index = void 0;
        var page = void 0;
        var breakView = void 0;
        var createPageView = function createPageView(index) {
          return _this.getPageElement(index);
        };

        for (_index = 0; _index < pageCount; _index++) {
          page = _index + 1;

          // If the page index is lower than the margin defined,
          // the page has to be displayed on the left side of
          // the pagination.
          if (page <= marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          }

          // If the page index is greater than the page count
          // minus the margin defined, the page has to be
          // displayed on the right side of the pagination.
          if (page > pageCount - marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          }

          // If the page index is near the selected page index
          // and inside the defined range (pageRangeDisplayed)
          // we have to display it (it will create the center
          // part of the pagination).
          if (_index >= selected - leftSide && _index <= selected + rightSide) {
            items.push(createPageView(_index));
            continue;
          }

          // If the page index doesn't meet any of the conditions above,
          // we check if the last item of the current "items" array
          // is a break element. If not, we add a break element, else,
          // we do nothing (because we don't want to display the page).
          if (breakLabel && items[items.length - 1] !== breakView) {
            breakView = _react2.default.createElement(_BreakView2.default, {
              key: _index,
              breakLabel: breakLabel,
              breakClassName: breakClassName,
              breakLinkClassName: breakLinkClassName,
              onClick: _this.handleBreakClick.bind(null, _index)
            });
            items.push(breakView);
          }
        }
      }

      return items;
    };

    var initialSelected = void 0;
    if (props.initialPage) {
      initialSelected = props.initialPage;
    } else if (props.forcePage) {
      initialSelected = props.forcePage;
    } else {
      initialSelected = 0;
    }

    _this.state = {
      selected: initialSelected
    };
    return _this;
  }

  _createClass(PaginationBoxView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialPage = _props.initialPage,
          disableInitialCallback = _props.disableInitialCallback,
          extraAriaContext = _props.extraAriaContext;
      // Call the callback with the initialPage item:

      if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
        this.callCallback(initialPage);
      }

      if (extraAriaContext) {
        console.warn('DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.');
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (typeof this.props.forcePage !== 'undefined' && this.props.forcePage !== prevProps.forcePage) {
        this.setState({ selected: this.props.forcePage });
      }
    }
  }, {
    key: 'getForwardJump',
    value: function getForwardJump() {
      var selected = this.state.selected;
      var _props2 = this.props,
          pageCount = _props2.pageCount,
          pageRangeDisplayed = _props2.pageRangeDisplayed;


      var forwardJump = selected + pageRangeDisplayed;
      return forwardJump >= pageCount ? pageCount - 1 : forwardJump;
    }
  }, {
    key: 'getBackwardJump',
    value: function getBackwardJump() {
      var selected = this.state.selected;
      var pageRangeDisplayed = this.props.pageRangeDisplayed;


      var backwardJump = selected - pageRangeDisplayed;
      return backwardJump < 0 ? 0 : backwardJump;
    }
  }, {
    key: 'hrefBuilder',
    value: function hrefBuilder(pageIndex) {
      var _props3 = this.props,
          hrefBuilder = _props3.hrefBuilder,
          pageCount = _props3.pageCount;

      if (hrefBuilder && pageIndex !== this.state.selected && pageIndex >= 0 && pageIndex < pageCount) {
        return hrefBuilder(pageIndex + 1);
      }
    }
  }, {
    key: 'ariaLabelBuilder',
    value: function ariaLabelBuilder(pageIndex) {
      var selected = pageIndex === this.state.selected;
      if (this.props.ariaLabelBuilder && pageIndex >= 0 && pageIndex < this.props.pageCount) {
        var label = this.props.ariaLabelBuilder(pageIndex + 1, selected);
        // DEPRECATED: The extraAriaContext prop was used to add additional context
        // to the aria-label. Users should now use the ariaLabelBuilder instead.
        if (this.props.extraAriaContext && !selected) {
          label = label + ' ' + this.props.extraAriaContext;
        }
        return label;
      }
    }
  }, {
    key: 'getPageElement',
    value: function getPageElement(index) {
      var selected = this.state.selected;
      var _props4 = this.props,
          pageClassName = _props4.pageClassName,
          pageLinkClassName = _props4.pageLinkClassName,
          activeClassName = _props4.activeClassName,
          activeLinkClassName = _props4.activeLinkClassName,
          extraAriaContext = _props4.extraAriaContext;


      return _react2.default.createElement(_PageView2.default, {
        key: index,
        onClick: this.handlePageSelected.bind(null, index),
        selected: selected === index,
        pageClassName: pageClassName,
        pageLinkClassName: pageLinkClassName,
        activeClassName: activeClassName,
        activeLinkClassName: activeLinkClassName,
        extraAriaContext: extraAriaContext,
        href: this.hrefBuilder(index),
        ariaLabel: this.ariaLabelBuilder(index),
        page: index + 1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          disabledClassName = _props5.disabledClassName,
          previousClassName = _props5.previousClassName,
          nextClassName = _props5.nextClassName,
          pageCount = _props5.pageCount,
          containerClassName = _props5.containerClassName,
          previousLinkClassName = _props5.previousLinkClassName,
          previousLabel = _props5.previousLabel,
          nextLinkClassName = _props5.nextLinkClassName,
          nextLabel = _props5.nextLabel;
      var selected = this.state.selected;


      var previousClasses = previousClassName + (selected === 0 ? ' ' + disabledClassName : '');
      var nextClasses = nextClassName + (selected === pageCount - 1 ? ' ' + disabledClassName : '');

      var previousAriaDisabled = selected === 0 ? 'true' : 'false';
      var nextAriaDisabled = selected === pageCount - 1 ? 'true' : 'false';

      return _react2.default.createElement(
        'ul',
        { className: containerClassName },
        _react2.default.createElement(
          'li',
          { className: previousClasses },
          _react2.default.createElement(
            'a',
            {
              onClick: this.handlePreviousPage,
              className: previousLinkClassName,
              href: this.hrefBuilder(selected - 1),
              tabIndex: '0',
              role: 'button',
              onKeyPress: this.handlePreviousPage,
              'aria-disabled': previousAriaDisabled
            },
            previousLabel
          )
        ),
        this.pagination(),
        _react2.default.createElement(
          'li',
          { className: nextClasses },
          _react2.default.createElement(
            'a',
            {
              onClick: this.handleNextPage,
              className: nextLinkClassName,
              href: this.hrefBuilder(selected + 1),
              tabIndex: '0',
              role: 'button',
              onKeyPress: this.handleNextPage,
              'aria-disabled': nextAriaDisabled
            },
            nextLabel
          )
        )
      );
    }
  }]);

  return PaginationBoxView;
}(_react.Component);

PaginationBoxView.propTypes = {
  pageCount: _propTypes2.default.number.isRequired,
  pageRangeDisplayed: _propTypes2.default.number.isRequired,
  marginPagesDisplayed: _propTypes2.default.number.isRequired,
  previousLabel: _propTypes2.default.node,
  nextLabel: _propTypes2.default.node,
  breakLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  hrefBuilder: _propTypes2.default.func,
  onPageChange: _propTypes2.default.func,
  initialPage: _propTypes2.default.number,
  forcePage: _propTypes2.default.number,
  disableInitialCallback: _propTypes2.default.bool,
  containerClassName: _propTypes2.default.string,
  pageClassName: _propTypes2.default.string,
  pageLinkClassName: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  activeLinkClassName: _propTypes2.default.string,
  previousClassName: _propTypes2.default.string,
  nextClassName: _propTypes2.default.string,
  previousLinkClassName: _propTypes2.default.string,
  nextLinkClassName: _propTypes2.default.string,
  disabledClassName: _propTypes2.default.string,
  breakClassName: _propTypes2.default.string,
  breakLinkClassName: _propTypes2.default.string,
  extraAriaContext: _propTypes2.default.string,
  ariaLabelBuilder: _propTypes2.default.func
};
PaginationBoxView.defaultProps = {
  pageCount: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: 'selected',
  previousClassName: 'previous',
  nextClassName: 'next',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  breakLabel: '...',
  disabledClassName: 'disabled',
  disableInitialCallback: false
};
exports.default = PaginationBoxView;
//# sourceMappingURL=PaginationBoxView.js.map

/***/ }),

/***/ "./node_modules/react-paginate/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-paginate/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PaginationBoxView = __webpack_require__(/*! ./PaginationBoxView */ "./node_modules/react-paginate/dist/PaginationBoxView.js");

var _PaginationBoxView2 = _interopRequireDefault(_PaginationBoxView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PaginationBoxView2.default;
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMvZmFUaW1lc0NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZpbmQtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zbGljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNwbGljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcGFnaW5hdGUvZGlzdC9CcmVha1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBhZ2luYXRlL2Rpc3QvUGFnZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBhZ2luYXRlL2Rpc3QvUGFnaW5hdGlvbkJveFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXBhZ2luYXRlL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUyxnQ0FBZ0M7QUFDekM7QUFDQTtBQUNBLFdBQVcsNkJBQTZCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcseUJBQXlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkM7Ozs7Ozs7Ozs7OztBQ3pZYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCx5QkFBeUIsbUJBQU8sQ0FBQyxvRkFBcUI7O0FBRXREOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBLGlDIiwiZmlsZSI6InZlbmRvcnN+aG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcHJlZml4ID0gJ2Zhcic7XG52YXIgaWNvbk5hbWUgPSAndGltZXMtY2lyY2xlJztcbnZhciB3aWR0aCA9IDUxMjtcbnZhciBoZWlnaHQgPSA1MTI7XG52YXIgbGlnYXR1cmVzID0gW107XG52YXIgdW5pY29kZSA9ICdmMDU3JztcbnZhciBzdmdQYXRoRGF0YSA9ICdNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMCA0NDhjLTExMC41IDAtMjAwLTg5LjUtMjAwLTIwMFMxNDUuNSA1NiAyNTYgNTZzMjAwIDg5LjUgMjAwIDIwMC04OS41IDIwMC0yMDAgMjAwem0xMDEuOC0yNjIuMkwyOTUuNiAyNTZsNjIuMiA2Mi4yYzQuNyA0LjcgNC43IDEyLjMgMCAxN2wtMjIuNiAyMi42Yy00LjcgNC43LTEyLjMgNC43LTE3IDBMMjU2IDI5NS42bC02Mi4yIDYyLjJjLTQuNyA0LjctMTIuMyA0LjctMTcgMGwtMjIuNi0yMi42Yy00LjctNC43LTQuNy0xMi4zIDAtMTdsNjIuMi02Mi4yLTYyLjItNjIuMmMtNC43LTQuNy00LjctMTIuMyAwLTE3bDIyLjYtMjIuNmM0LjctNC43IDEyLjMtNC43IDE3IDBsNjIuMiA2Mi4yIDYyLjItNjIuMmM0LjctNC43IDEyLjMtNC43IDE3IDBsMjIuNiAyMi42YzQuNyA0LjcgNC43IDEyLjMgMCAxN3onO1xuXG5leHBvcnRzLmRlZmluaXRpb24gPSB7XG4gIHByZWZpeDogcHJlZml4LFxuICBpY29uTmFtZTogaWNvbk5hbWUsXG4gIGljb246IFtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgbGlnYXR1cmVzLFxuICAgIHVuaWNvZGUsXG4gICAgc3ZnUGF0aERhdGFcbiAgXX07XG5cbmV4cG9ydHMuZmFUaW1lc0NpcmNsZSA9IGV4cG9ydHMuZGVmaW5pdGlvbjtcbmV4cG9ydHMucHJlZml4ID0gcHJlZml4O1xuZXhwb3J0cy5pY29uTmFtZSA9IGljb25OYW1lO1xuZXhwb3J0cy53aWR0aCA9IHdpZHRoO1xuZXhwb3J0cy5oZWlnaHQgPSBoZWlnaHQ7XG5leHBvcnRzLmxpZ2F0dXJlcyA9IGxpZ2F0dXJlcztcbmV4cG9ydHMudW5pY29kZSA9IHVuaWNvZGU7XG5leHBvcnRzLnN2Z1BhdGhEYXRhID0gc3ZnUGF0aERhdGE7IiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbmRJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maW5kSW5kZXg7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEZJTkRfSU5ERVggPSAnZmluZEluZGV4JztcbnZhciBTS0lQU19IT0xFUyA9IHRydWU7XG5cbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKEZJTkRfSU5ERVgpO1xuXG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYgKEZJTkRfSU5ERVggaW4gW10pIEFycmF5KDEpW0ZJTkRfSU5ERVhdKGZ1bmN0aW9uICgpIHsgU0tJUFNfSE9MRVMgPSBmYWxzZTsgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kaW5kZXhcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFNLSVBTX0hPTEVTIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgcmV0dXJuICRmaW5kSW5kZXgodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoRklORF9JTkRFWCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkbWFwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLm1hcDtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnbWFwJyk7XG4vLyBGRjQ5LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdzbGljZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NsaWNlJywgeyBBQ0NFU1NPUlM6IHRydWUsIDA6IDAsIDE6IDIgfSk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgbmF0aXZlU2xpY2UgPSBbXS5zbGljZTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc2xpY2Vcbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgayA9IHRvQWJzb2x1dGVJbmRleChzdGFydCwgbGVuZ3RoKTtcbiAgICB2YXIgZmluID0gdG9BYnNvbHV0ZUluZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogZW5kLCBsZW5ndGgpO1xuICAgIC8vIGlubGluZSBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBmb3IgdXNhZ2UgbmF0aXZlIGBBcnJheSNzbGljZWAgd2hlcmUgaXQncyBwb3NzaWJsZVxuICAgIHZhciBDb25zdHJ1Y3RvciwgcmVzdWx0LCBuO1xuICAgIGlmIChpc0FycmF5KE8pKSB7XG4gICAgICBDb25zdHJ1Y3RvciA9IE8uY29uc3RydWN0b3I7XG4gICAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgICAgaWYgKHR5cGVvZiBDb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgaXNBcnJheShDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoQ29uc3RydWN0b3IpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gQ29uc3RydWN0b3JbU1BFQ0lFU107XG4gICAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gbnVsbCkgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNsaWNlLmNhbGwoTywgaywgZmluKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0gbmV3IChDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDb25zdHJ1Y3RvcikobWF4KGZpbiAtIGssIDApKTtcbiAgICBmb3IgKG4gPSAwOyBrIDwgZmluOyBrKyssIG4rKykgaWYgKGsgaW4gTykgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBuLCBPW2tdKTtcbiAgICByZXN1bHQubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NwbGljZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NwbGljZScsIHsgQUNDRVNTT1JTOiB0cnVlLCAwOiAwLCAxOiAyIH0pO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgbGVuZ3RoIGV4Y2VlZGVkJztcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zcGxpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNwbGljZVxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIHNwbGljZTogZnVuY3Rpb24gc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCAvKiAsIC4uLml0ZW1zICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBhY3R1YWxTdGFydCA9IHRvQWJzb2x1dGVJbmRleChzdGFydCwgbGVuKTtcbiAgICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaW5zZXJ0Q291bnQsIGFjdHVhbERlbGV0ZUNvdW50LCBBLCBrLCBmcm9tLCB0bztcbiAgICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgICBpbnNlcnRDb3VudCA9IGFjdHVhbERlbGV0ZUNvdW50ID0gMDtcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50c0xlbmd0aCA9PT0gMSkge1xuICAgICAgaW5zZXJ0Q291bnQgPSAwO1xuICAgICAgYWN0dWFsRGVsZXRlQ291bnQgPSBsZW4gLSBhY3R1YWxTdGFydDtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zZXJ0Q291bnQgPSBhcmd1bWVudHNMZW5ndGggLSAyO1xuICAgICAgYWN0dWFsRGVsZXRlQ291bnQgPSBtaW4obWF4KHRvSW50ZWdlcihkZWxldGVDb3VudCksIDApLCBsZW4gLSBhY3R1YWxTdGFydCk7XG4gICAgfVxuICAgIGlmIChsZW4gKyBpbnNlcnRDb3VudCAtIGFjdHVhbERlbGV0ZUNvdW50ID4gTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9MRU5HVEhfRVhDRUVERUQpO1xuICAgIH1cbiAgICBBID0gYXJyYXlTcGVjaWVzQ3JlYXRlKE8sIGFjdHVhbERlbGV0ZUNvdW50KTtcbiAgICBmb3IgKGsgPSAwOyBrIDwgYWN0dWFsRGVsZXRlQ291bnQ7IGsrKykge1xuICAgICAgZnJvbSA9IGFjdHVhbFN0YXJ0ICsgaztcbiAgICAgIGlmIChmcm9tIGluIE8pIGNyZWF0ZVByb3BlcnR5KEEsIGssIE9bZnJvbV0pO1xuICAgIH1cbiAgICBBLmxlbmd0aCA9IGFjdHVhbERlbGV0ZUNvdW50O1xuICAgIGlmIChpbnNlcnRDb3VudCA8IGFjdHVhbERlbGV0ZUNvdW50KSB7XG4gICAgICBmb3IgKGsgPSBhY3R1YWxTdGFydDsgayA8IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50OyBrKyspIHtcbiAgICAgICAgZnJvbSA9IGsgKyBhY3R1YWxEZWxldGVDb3VudDtcbiAgICAgICAgdG8gPSBrICsgaW5zZXJ0Q291bnQ7XG4gICAgICAgIGlmIChmcm9tIGluIE8pIE9bdG9dID0gT1tmcm9tXTtcbiAgICAgICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgICB9XG4gICAgICBmb3IgKGsgPSBsZW47IGsgPiBsZW4gLSBhY3R1YWxEZWxldGVDb3VudCArIGluc2VydENvdW50OyBrLS0pIGRlbGV0ZSBPW2sgLSAxXTtcbiAgICB9IGVsc2UgaWYgKGluc2VydENvdW50ID4gYWN0dWFsRGVsZXRlQ291bnQpIHtcbiAgICAgIGZvciAoayA9IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50OyBrID4gYWN0dWFsU3RhcnQ7IGstLSkge1xuICAgICAgICBmcm9tID0gayArIGFjdHVhbERlbGV0ZUNvdW50IC0gMTtcbiAgICAgICAgdG8gPSBrICsgaW5zZXJ0Q291bnQgLSAxO1xuICAgICAgICBpZiAoZnJvbSBpbiBPKSBPW3RvXSA9IE9bZnJvbV07XG4gICAgICAgIGVsc2UgZGVsZXRlIE9bdG9dO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGsgPSAwOyBrIDwgaW5zZXJ0Q291bnQ7IGsrKykge1xuICAgICAgT1trICsgYWN0dWFsU3RhcnRdID0gYXJndW1lbnRzW2sgKyAyXTtcbiAgICB9XG4gICAgTy5sZW5ndGggPSBsZW4gLSBhY3R1YWxEZWxldGVDb3VudCArIGluc2VydENvdW50O1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEJyZWFrVmlldyA9IGZ1bmN0aW9uIEJyZWFrVmlldyhwcm9wcykge1xuICB2YXIgYnJlYWtMYWJlbCA9IHByb3BzLmJyZWFrTGFiZWwsXG4gICAgICBicmVha0NsYXNzTmFtZSA9IHByb3BzLmJyZWFrQ2xhc3NOYW1lLFxuICAgICAgYnJlYWtMaW5rQ2xhc3NOYW1lID0gcHJvcHMuYnJlYWtMaW5rQ2xhc3NOYW1lLFxuICAgICAgb25DbGljayA9IHByb3BzLm9uQ2xpY2s7XG5cbiAgdmFyIGNsYXNzTmFtZSA9IGJyZWFrQ2xhc3NOYW1lIHx8ICdicmVhayc7XG5cbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdsaScsXG4gICAgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSB9LFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2EnLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6IGJyZWFrTGlua0NsYXNzTmFtZSxcbiAgICAgICAgb25DbGljazogb25DbGljayxcbiAgICAgICAgcm9sZTogJ2J1dHRvbicsXG4gICAgICAgIHRhYkluZGV4OiAnMCcsXG4gICAgICAgIG9uS2V5UHJlc3M6IG9uQ2xpY2tcbiAgICAgIH0sXG4gICAgICBicmVha0xhYmVsXG4gICAgKVxuICApO1xufTtcblxuQnJlYWtWaWV3LnByb3BUeXBlcyA9IHtcbiAgYnJlYWtMYWJlbDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm5vZGVdKSxcbiAgYnJlYWtDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBicmVha0xpbmtDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBvbkNsaWNrOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQnJlYWtWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QnJlYWtWaWV3LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFBhZ2VWaWV3ID0gZnVuY3Rpb24gUGFnZVZpZXcocHJvcHMpIHtcbiAgdmFyIHBhZ2VDbGFzc05hbWUgPSBwcm9wcy5wYWdlQ2xhc3NOYW1lO1xuICB2YXIgcGFnZUxpbmtDbGFzc05hbWUgPSBwcm9wcy5wYWdlTGlua0NsYXNzTmFtZTtcblxuICB2YXIgb25DbGljayA9IHByb3BzLm9uQ2xpY2s7XG4gIHZhciBocmVmID0gcHJvcHMuaHJlZjtcbiAgdmFyIGFyaWFMYWJlbCA9IHByb3BzLmFyaWFMYWJlbCB8fCAnUGFnZSAnICsgcHJvcHMucGFnZSArIChwcm9wcy5leHRyYUFyaWFDb250ZXh0ID8gJyAnICsgcHJvcHMuZXh0cmFBcmlhQ29udGV4dCA6ICcnKTtcbiAgdmFyIGFyaWFDdXJyZW50ID0gbnVsbDtcblxuICBpZiAocHJvcHMuc2VsZWN0ZWQpIHtcbiAgICBhcmlhQ3VycmVudCA9ICdwYWdlJztcblxuICAgIGFyaWFMYWJlbCA9IHByb3BzLmFyaWFMYWJlbCB8fCAnUGFnZSAnICsgcHJvcHMucGFnZSArICcgaXMgeW91ciBjdXJyZW50IHBhZ2UnO1xuXG4gICAgaWYgKHR5cGVvZiBwYWdlQ2xhc3NOYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGFnZUNsYXNzTmFtZSA9IHBhZ2VDbGFzc05hbWUgKyAnICcgKyBwcm9wcy5hY3RpdmVDbGFzc05hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2VDbGFzc05hbWUgPSBwcm9wcy5hY3RpdmVDbGFzc05hbWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwYWdlTGlua0NsYXNzTmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuYWN0aXZlTGlua0NsYXNzTmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFnZUxpbmtDbGFzc05hbWUgPSBwYWdlTGlua0NsYXNzTmFtZSArICcgJyArIHByb3BzLmFjdGl2ZUxpbmtDbGFzc05hbWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2VMaW5rQ2xhc3NOYW1lID0gcHJvcHMuYWN0aXZlTGlua0NsYXNzTmFtZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2xpJyxcbiAgICB7IGNsYXNzTmFtZTogcGFnZUNsYXNzTmFtZSB9LFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2EnLFxuICAgICAge1xuICAgICAgICBvbkNsaWNrOiBvbkNsaWNrLFxuICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgY2xhc3NOYW1lOiBwYWdlTGlua0NsYXNzTmFtZSxcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgdGFiSW5kZXg6ICcwJyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBhcmlhTGFiZWwsXG4gICAgICAgICdhcmlhLWN1cnJlbnQnOiBhcmlhQ3VycmVudCxcbiAgICAgICAgb25LZXlQcmVzczogb25DbGlja1xuICAgICAgfSxcbiAgICAgIHByb3BzLnBhZ2VcbiAgICApXG4gICk7XG59O1xuXG5QYWdlVmlldy5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYy5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLmlzUmVxdWlyZWQsXG4gIHBhZ2VDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBwYWdlTGlua0NsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGFjdGl2ZUNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGFjdGl2ZUxpbmtDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBleHRyYUFyaWFDb250ZXh0OiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgaHJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGFyaWFMYWJlbDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIHBhZ2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFBhZ2VWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGFnZVZpZXcuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgX3Byb3BUeXBlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wVHlwZXMpO1xuXG52YXIgX1BhZ2VWaWV3ID0gcmVxdWlyZSgnLi9QYWdlVmlldycpO1xuXG52YXIgX1BhZ2VWaWV3MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1BhZ2VWaWV3KTtcblxudmFyIF9CcmVha1ZpZXcgPSByZXF1aXJlKCcuL0JyZWFrVmlldycpO1xuXG52YXIgX0JyZWFrVmlldzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CcmVha1ZpZXcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQYWdpbmF0aW9uQm94VmlldyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhQYWdpbmF0aW9uQm94VmlldywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUGFnaW5hdGlvbkJveFZpZXcocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFnaW5hdGlvbkJveFZpZXcpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFBhZ2luYXRpb25Cb3hWaWV3Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGFnaW5hdGlvbkJveFZpZXcpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5oYW5kbGVQcmV2aW91c1BhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSBfdGhpcy5zdGF0ZS5zZWxlY3RlZDtcblxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0ID8gZXZ0LnByZXZlbnREZWZhdWx0KCkgOiBldnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIGlmIChzZWxlY3RlZCA+IDApIHtcbiAgICAgICAgX3RoaXMuaGFuZGxlUGFnZVNlbGVjdGVkKHNlbGVjdGVkIC0gMSwgZXZ0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlTmV4dFBhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSBfdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAgIHZhciBwYWdlQ291bnQgPSBfdGhpcy5wcm9wcy5wYWdlQ291bnQ7XG5cblxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0ID8gZXZ0LnByZXZlbnREZWZhdWx0KCkgOiBldnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIGlmIChzZWxlY3RlZCA8IHBhZ2VDb3VudCAtIDEpIHtcbiAgICAgICAgX3RoaXMuaGFuZGxlUGFnZVNlbGVjdGVkKHNlbGVjdGVkICsgMSwgZXZ0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlUGFnZVNlbGVjdGVkID0gZnVuY3Rpb24gKHNlbGVjdGVkLCBldnQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCA/IGV2dC5wcmV2ZW50RGVmYXVsdCgpIDogZXZ0LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgIGlmIChfdGhpcy5zdGF0ZS5zZWxlY3RlZCA9PT0gc2VsZWN0ZWQpIHJldHVybjtcblxuICAgICAgX3RoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogc2VsZWN0ZWQgfSk7XG5cbiAgICAgIC8vIENhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIG5ldyBzZWxlY3RlZCBpdGVtOlxuICAgICAgX3RoaXMuY2FsbENhbGxiYWNrKHNlbGVjdGVkKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlQnJlYWtDbGljayA9IGZ1bmN0aW9uIChpbmRleCwgZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQgPyBldnQucHJldmVudERlZmF1bHQoKSA6IGV2dC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICB2YXIgc2VsZWN0ZWQgPSBfdGhpcy5zdGF0ZS5zZWxlY3RlZDtcblxuXG4gICAgICBfdGhpcy5oYW5kbGVQYWdlU2VsZWN0ZWQoc2VsZWN0ZWQgPCBpbmRleCA/IF90aGlzLmdldEZvcndhcmRKdW1wKCkgOiBfdGhpcy5nZXRCYWNrd2FyZEp1bXAoKSwgZXZ0KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuY2FsbENhbGxiYWNrID0gZnVuY3Rpb24gKHNlbGVjdGVkSXRlbSkge1xuICAgICAgaWYgKHR5cGVvZiBfdGhpcy5wcm9wcy5vblBhZ2VDaGFuZ2UgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBfdGhpcy5wcm9wcy5vblBhZ2VDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgX3RoaXMucHJvcHMub25QYWdlQ2hhbmdlKHsgc2VsZWN0ZWQ6IHNlbGVjdGVkSXRlbSB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMucGFnaW5hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgcGFnZVJhbmdlRGlzcGxheWVkID0gX3RoaXMkcHJvcHMucGFnZVJhbmdlRGlzcGxheWVkLFxuICAgICAgICAgIHBhZ2VDb3VudCA9IF90aGlzJHByb3BzLnBhZ2VDb3VudCxcbiAgICAgICAgICBtYXJnaW5QYWdlc0Rpc3BsYXllZCA9IF90aGlzJHByb3BzLm1hcmdpblBhZ2VzRGlzcGxheWVkLFxuICAgICAgICAgIGJyZWFrTGFiZWwgPSBfdGhpcyRwcm9wcy5icmVha0xhYmVsLFxuICAgICAgICAgIGJyZWFrQ2xhc3NOYW1lID0gX3RoaXMkcHJvcHMuYnJlYWtDbGFzc05hbWUsXG4gICAgICAgICAgYnJlYWtMaW5rQ2xhc3NOYW1lID0gX3RoaXMkcHJvcHMuYnJlYWtMaW5rQ2xhc3NOYW1lO1xuICAgICAgdmFyIHNlbGVjdGVkID0gX3RoaXMuc3RhdGUuc2VsZWN0ZWQ7XG5cblxuICAgICAgaWYgKHBhZ2VDb3VudCA8PSBwYWdlUmFuZ2VEaXNwbGF5ZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHBhZ2VDb3VudDsgaW5kZXgrKykge1xuICAgICAgICAgIGl0ZW1zLnB1c2goX3RoaXMuZ2V0UGFnZUVsZW1lbnQoaW5kZXgpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxlZnRTaWRlID0gcGFnZVJhbmdlRGlzcGxheWVkIC8gMjtcbiAgICAgICAgdmFyIHJpZ2h0U2lkZSA9IHBhZ2VSYW5nZURpc3BsYXllZCAtIGxlZnRTaWRlO1xuXG4gICAgICAgIC8vIElmIHRoZSBzZWxlY3RlZCBwYWdlIGluZGV4IGlzIG9uIHRoZSBkZWZhdWx0IHJpZ2h0IHNpZGUgb2YgdGhlIHBhZ2luYXRpb24sXG4gICAgICAgIC8vIHdlIGNvbnNpZGVyIHRoYXQgdGhlIG5ldyByaWdodCBzaWRlIGlzIG1hZGUgdXAgb2YgaXQgKD0gb25seSBvbmUgYnJlYWsgZWxlbWVudCkuXG4gICAgICAgIC8vIElmIHRoZSBzZWxlY3RlZCBwYWdlIGluZGV4IGlzIG9uIHRoZSBkZWZhdWx0IGxlZnQgc2lkZSBvZiB0aGUgcGFnaW5hdGlvbixcbiAgICAgICAgLy8gd2UgY29uc2lkZXIgdGhhdCB0aGUgbmV3IGxlZnQgc2lkZSBpcyBtYWRlIHVwIG9mIGl0ICg9IG9ubHkgb25lIGJyZWFrIGVsZW1lbnQpLlxuICAgICAgICBpZiAoc2VsZWN0ZWQgPiBwYWdlQ291bnQgLSBwYWdlUmFuZ2VEaXNwbGF5ZWQgLyAyKSB7XG4gICAgICAgICAgcmlnaHRTaWRlID0gcGFnZUNvdW50IC0gc2VsZWN0ZWQ7XG4gICAgICAgICAgbGVmdFNpZGUgPSBwYWdlUmFuZ2VEaXNwbGF5ZWQgLSByaWdodFNpZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgPCBwYWdlUmFuZ2VEaXNwbGF5ZWQgLyAyKSB7XG4gICAgICAgICAgbGVmdFNpZGUgPSBzZWxlY3RlZDtcbiAgICAgICAgICByaWdodFNpZGUgPSBwYWdlUmFuZ2VEaXNwbGF5ZWQgLSBsZWZ0U2lkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfaW5kZXggPSB2b2lkIDA7XG4gICAgICAgIHZhciBwYWdlID0gdm9pZCAwO1xuICAgICAgICB2YXIgYnJlYWtWaWV3ID0gdm9pZCAwO1xuICAgICAgICB2YXIgY3JlYXRlUGFnZVZpZXcgPSBmdW5jdGlvbiBjcmVhdGVQYWdlVmlldyhpbmRleCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRQYWdlRWxlbWVudChpbmRleCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChfaW5kZXggPSAwOyBfaW5kZXggPCBwYWdlQ291bnQ7IF9pbmRleCsrKSB7XG4gICAgICAgICAgcGFnZSA9IF9pbmRleCArIDE7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgcGFnZSBpbmRleCBpcyBsb3dlciB0aGFuIHRoZSBtYXJnaW4gZGVmaW5lZCxcbiAgICAgICAgICAvLyB0aGUgcGFnZSBoYXMgdG8gYmUgZGlzcGxheWVkIG9uIHRoZSBsZWZ0IHNpZGUgb2ZcbiAgICAgICAgICAvLyB0aGUgcGFnaW5hdGlvbi5cbiAgICAgICAgICBpZiAocGFnZSA8PSBtYXJnaW5QYWdlc0Rpc3BsYXllZCkge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVQYWdlVmlldyhfaW5kZXgpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHRoZSBwYWdlIGluZGV4IGlzIGdyZWF0ZXIgdGhhbiB0aGUgcGFnZSBjb3VudFxuICAgICAgICAgIC8vIG1pbnVzIHRoZSBtYXJnaW4gZGVmaW5lZCwgdGhlIHBhZ2UgaGFzIHRvIGJlXG4gICAgICAgICAgLy8gZGlzcGxheWVkIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBwYWdpbmF0aW9uLlxuICAgICAgICAgIGlmIChwYWdlID4gcGFnZUNvdW50IC0gbWFyZ2luUGFnZXNEaXNwbGF5ZWQpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goY3JlYXRlUGFnZVZpZXcoX2luZGV4KSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiB0aGUgcGFnZSBpbmRleCBpcyBuZWFyIHRoZSBzZWxlY3RlZCBwYWdlIGluZGV4XG4gICAgICAgICAgLy8gYW5kIGluc2lkZSB0aGUgZGVmaW5lZCByYW5nZSAocGFnZVJhbmdlRGlzcGxheWVkKVxuICAgICAgICAgIC8vIHdlIGhhdmUgdG8gZGlzcGxheSBpdCAoaXQgd2lsbCBjcmVhdGUgdGhlIGNlbnRlclxuICAgICAgICAgIC8vIHBhcnQgb2YgdGhlIHBhZ2luYXRpb24pLlxuICAgICAgICAgIGlmIChfaW5kZXggPj0gc2VsZWN0ZWQgLSBsZWZ0U2lkZSAmJiBfaW5kZXggPD0gc2VsZWN0ZWQgKyByaWdodFNpZGUpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goY3JlYXRlUGFnZVZpZXcoX2luZGV4KSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiB0aGUgcGFnZSBpbmRleCBkb2Vzbid0IG1lZXQgYW55IG9mIHRoZSBjb25kaXRpb25zIGFib3ZlLFxuICAgICAgICAgIC8vIHdlIGNoZWNrIGlmIHRoZSBsYXN0IGl0ZW0gb2YgdGhlIGN1cnJlbnQgXCJpdGVtc1wiIGFycmF5XG4gICAgICAgICAgLy8gaXMgYSBicmVhayBlbGVtZW50LiBJZiBub3QsIHdlIGFkZCBhIGJyZWFrIGVsZW1lbnQsIGVsc2UsXG4gICAgICAgICAgLy8gd2UgZG8gbm90aGluZyAoYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGRpc3BsYXkgdGhlIHBhZ2UpLlxuICAgICAgICAgIGlmIChicmVha0xhYmVsICYmIGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdICE9PSBicmVha1ZpZXcpIHtcbiAgICAgICAgICAgIGJyZWFrVmlldyA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9CcmVha1ZpZXcyLmRlZmF1bHQsIHtcbiAgICAgICAgICAgICAga2V5OiBfaW5kZXgsXG4gICAgICAgICAgICAgIGJyZWFrTGFiZWw6IGJyZWFrTGFiZWwsXG4gICAgICAgICAgICAgIGJyZWFrQ2xhc3NOYW1lOiBicmVha0NsYXNzTmFtZSxcbiAgICAgICAgICAgICAgYnJlYWtMaW5rQ2xhc3NOYW1lOiBicmVha0xpbmtDbGFzc05hbWUsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IF90aGlzLmhhbmRsZUJyZWFrQ2xpY2suYmluZChudWxsLCBfaW5kZXgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goYnJlYWtWaWV3KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH07XG5cbiAgICB2YXIgaW5pdGlhbFNlbGVjdGVkID0gdm9pZCAwO1xuICAgIGlmIChwcm9wcy5pbml0aWFsUGFnZSkge1xuICAgICAgaW5pdGlhbFNlbGVjdGVkID0gcHJvcHMuaW5pdGlhbFBhZ2U7XG4gICAgfSBlbHNlIGlmIChwcm9wcy5mb3JjZVBhZ2UpIHtcbiAgICAgIGluaXRpYWxTZWxlY3RlZCA9IHByb3BzLmZvcmNlUGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdGlhbFNlbGVjdGVkID0gMDtcbiAgICB9XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiBpbml0aWFsU2VsZWN0ZWRcbiAgICB9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQYWdpbmF0aW9uQm94VmlldywgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgaW5pdGlhbFBhZ2UgPSBfcHJvcHMuaW5pdGlhbFBhZ2UsXG4gICAgICAgICAgZGlzYWJsZUluaXRpYWxDYWxsYmFjayA9IF9wcm9wcy5kaXNhYmxlSW5pdGlhbENhbGxiYWNrLFxuICAgICAgICAgIGV4dHJhQXJpYUNvbnRleHQgPSBfcHJvcHMuZXh0cmFBcmlhQ29udGV4dDtcbiAgICAgIC8vIENhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGluaXRpYWxQYWdlIGl0ZW06XG5cbiAgICAgIGlmICh0eXBlb2YgaW5pdGlhbFBhZ2UgIT09ICd1bmRlZmluZWQnICYmICFkaXNhYmxlSW5pdGlhbENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbENhbGxiYWNrKGluaXRpYWxQYWdlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV4dHJhQXJpYUNvbnRleHQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdERVBSRUNBVEVEIChyZWFjdC1wYWdpbmF0ZSk6IFRoZSBleHRyYUFyaWFDb250ZXh0IHByb3AgaXMgZGVwcmVjYXRlZC4gWW91IHNob3VsZCBub3cgdXNlIHRoZSBhcmlhTGFiZWxCdWlsZGVyIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmZvcmNlUGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5wcm9wcy5mb3JjZVBhZ2UgIT09IHByZXZQcm9wcy5mb3JjZVBhZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiB0aGlzLnByb3BzLmZvcmNlUGFnZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRGb3J3YXJkSnVtcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZvcndhcmRKdW1wKCkge1xuICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBwYWdlQ291bnQgPSBfcHJvcHMyLnBhZ2VDb3VudCxcbiAgICAgICAgICBwYWdlUmFuZ2VEaXNwbGF5ZWQgPSBfcHJvcHMyLnBhZ2VSYW5nZURpc3BsYXllZDtcblxuXG4gICAgICB2YXIgZm9yd2FyZEp1bXAgPSBzZWxlY3RlZCArIHBhZ2VSYW5nZURpc3BsYXllZDtcbiAgICAgIHJldHVybiBmb3J3YXJkSnVtcCA+PSBwYWdlQ291bnQgPyBwYWdlQ291bnQgLSAxIDogZm9yd2FyZEp1bXA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0QmFja3dhcmRKdW1wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QmFja3dhcmRKdW1wKCkge1xuICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAgIHZhciBwYWdlUmFuZ2VEaXNwbGF5ZWQgPSB0aGlzLnByb3BzLnBhZ2VSYW5nZURpc3BsYXllZDtcblxuXG4gICAgICB2YXIgYmFja3dhcmRKdW1wID0gc2VsZWN0ZWQgLSBwYWdlUmFuZ2VEaXNwbGF5ZWQ7XG4gICAgICByZXR1cm4gYmFja3dhcmRKdW1wIDwgMCA/IDAgOiBiYWNrd2FyZEp1bXA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaHJlZkJ1aWxkZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBocmVmQnVpbGRlcihwYWdlSW5kZXgpIHtcbiAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBocmVmQnVpbGRlciA9IF9wcm9wczMuaHJlZkJ1aWxkZXIsXG4gICAgICAgICAgcGFnZUNvdW50ID0gX3Byb3BzMy5wYWdlQ291bnQ7XG5cbiAgICAgIGlmIChocmVmQnVpbGRlciAmJiBwYWdlSW5kZXggIT09IHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgcGFnZUluZGV4ID49IDAgJiYgcGFnZUluZGV4IDwgcGFnZUNvdW50KSB7XG4gICAgICAgIHJldHVybiBocmVmQnVpbGRlcihwYWdlSW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhcmlhTGFiZWxCdWlsZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXJpYUxhYmVsQnVpbGRlcihwYWdlSW5kZXgpIHtcbiAgICAgIHZhciBzZWxlY3RlZCA9IHBhZ2VJbmRleCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAgIGlmICh0aGlzLnByb3BzLmFyaWFMYWJlbEJ1aWxkZXIgJiYgcGFnZUluZGV4ID49IDAgJiYgcGFnZUluZGV4IDwgdGhpcy5wcm9wcy5wYWdlQ291bnQpIHtcbiAgICAgICAgdmFyIGxhYmVsID0gdGhpcy5wcm9wcy5hcmlhTGFiZWxCdWlsZGVyKHBhZ2VJbmRleCArIDEsIHNlbGVjdGVkKTtcbiAgICAgICAgLy8gREVQUkVDQVRFRDogVGhlIGV4dHJhQXJpYUNvbnRleHQgcHJvcCB3YXMgdXNlZCB0byBhZGQgYWRkaXRpb25hbCBjb250ZXh0XG4gICAgICAgIC8vIHRvIHRoZSBhcmlhLWxhYmVsLiBVc2VycyBzaG91bGQgbm93IHVzZSB0aGUgYXJpYUxhYmVsQnVpbGRlciBpbnN0ZWFkLlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5leHRyYUFyaWFDb250ZXh0ICYmICFzZWxlY3RlZCkge1xuICAgICAgICAgIGxhYmVsID0gbGFiZWwgKyAnICcgKyB0aGlzLnByb3BzLmV4dHJhQXJpYUNvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFBhZ2VFbGVtZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UGFnZUVsZW1lbnQoaW5kZXgpIHtcbiAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQ7XG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgcGFnZUNsYXNzTmFtZSA9IF9wcm9wczQucGFnZUNsYXNzTmFtZSxcbiAgICAgICAgICBwYWdlTGlua0NsYXNzTmFtZSA9IF9wcm9wczQucGFnZUxpbmtDbGFzc05hbWUsXG4gICAgICAgICAgYWN0aXZlQ2xhc3NOYW1lID0gX3Byb3BzNC5hY3RpdmVDbGFzc05hbWUsXG4gICAgICAgICAgYWN0aXZlTGlua0NsYXNzTmFtZSA9IF9wcm9wczQuYWN0aXZlTGlua0NsYXNzTmFtZSxcbiAgICAgICAgICBleHRyYUFyaWFDb250ZXh0ID0gX3Byb3BzNC5leHRyYUFyaWFDb250ZXh0O1xuXG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfUGFnZVZpZXcyLmRlZmF1bHQsIHtcbiAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVQYWdlU2VsZWN0ZWQuYmluZChudWxsLCBpbmRleCksXG4gICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCA9PT0gaW5kZXgsXG4gICAgICAgIHBhZ2VDbGFzc05hbWU6IHBhZ2VDbGFzc05hbWUsXG4gICAgICAgIHBhZ2VMaW5rQ2xhc3NOYW1lOiBwYWdlTGlua0NsYXNzTmFtZSxcbiAgICAgICAgYWN0aXZlQ2xhc3NOYW1lOiBhY3RpdmVDbGFzc05hbWUsXG4gICAgICAgIGFjdGl2ZUxpbmtDbGFzc05hbWU6IGFjdGl2ZUxpbmtDbGFzc05hbWUsXG4gICAgICAgIGV4dHJhQXJpYUNvbnRleHQ6IGV4dHJhQXJpYUNvbnRleHQsXG4gICAgICAgIGhyZWY6IHRoaXMuaHJlZkJ1aWxkZXIoaW5kZXgpLFxuICAgICAgICBhcmlhTGFiZWw6IHRoaXMuYXJpYUxhYmVsQnVpbGRlcihpbmRleCksXG4gICAgICAgIHBhZ2U6IGluZGV4ICsgMVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wczUgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGRpc2FibGVkQ2xhc3NOYW1lID0gX3Byb3BzNS5kaXNhYmxlZENsYXNzTmFtZSxcbiAgICAgICAgICBwcmV2aW91c0NsYXNzTmFtZSA9IF9wcm9wczUucHJldmlvdXNDbGFzc05hbWUsXG4gICAgICAgICAgbmV4dENsYXNzTmFtZSA9IF9wcm9wczUubmV4dENsYXNzTmFtZSxcbiAgICAgICAgICBwYWdlQ291bnQgPSBfcHJvcHM1LnBhZ2VDb3VudCxcbiAgICAgICAgICBjb250YWluZXJDbGFzc05hbWUgPSBfcHJvcHM1LmNvbnRhaW5lckNsYXNzTmFtZSxcbiAgICAgICAgICBwcmV2aW91c0xpbmtDbGFzc05hbWUgPSBfcHJvcHM1LnByZXZpb3VzTGlua0NsYXNzTmFtZSxcbiAgICAgICAgICBwcmV2aW91c0xhYmVsID0gX3Byb3BzNS5wcmV2aW91c0xhYmVsLFxuICAgICAgICAgIG5leHRMaW5rQ2xhc3NOYW1lID0gX3Byb3BzNS5uZXh0TGlua0NsYXNzTmFtZSxcbiAgICAgICAgICBuZXh0TGFiZWwgPSBfcHJvcHM1Lm5leHRMYWJlbDtcbiAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQ7XG5cblxuICAgICAgdmFyIHByZXZpb3VzQ2xhc3NlcyA9IHByZXZpb3VzQ2xhc3NOYW1lICsgKHNlbGVjdGVkID09PSAwID8gJyAnICsgZGlzYWJsZWRDbGFzc05hbWUgOiAnJyk7XG4gICAgICB2YXIgbmV4dENsYXNzZXMgPSBuZXh0Q2xhc3NOYW1lICsgKHNlbGVjdGVkID09PSBwYWdlQ291bnQgLSAxID8gJyAnICsgZGlzYWJsZWRDbGFzc05hbWUgOiAnJyk7XG5cbiAgICAgIHZhciBwcmV2aW91c0FyaWFEaXNhYmxlZCA9IHNlbGVjdGVkID09PSAwID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICAgIHZhciBuZXh0QXJpYURpc2FibGVkID0gc2VsZWN0ZWQgPT09IHBhZ2VDb3VudCAtIDEgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICd1bCcsXG4gICAgICAgIHsgY2xhc3NOYW1lOiBjb250YWluZXJDbGFzc05hbWUgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2xpJyxcbiAgICAgICAgICB7IGNsYXNzTmFtZTogcHJldmlvdXNDbGFzc2VzIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnYScsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlUHJldmlvdXNQYWdlLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IHByZXZpb3VzTGlua0NsYXNzTmFtZSxcbiAgICAgICAgICAgICAgaHJlZjogdGhpcy5ocmVmQnVpbGRlcihzZWxlY3RlZCAtIDEpLFxuICAgICAgICAgICAgICB0YWJJbmRleDogJzAnLFxuICAgICAgICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgb25LZXlQcmVzczogdGhpcy5oYW5kbGVQcmV2aW91c1BhZ2UsXG4gICAgICAgICAgICAgICdhcmlhLWRpc2FibGVkJzogcHJldmlvdXNBcmlhRGlzYWJsZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2aW91c0xhYmVsXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICB0aGlzLnBhZ2luYXRpb24oKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2xpJyxcbiAgICAgICAgICB7IGNsYXNzTmFtZTogbmV4dENsYXNzZXMgfSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdhJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVOZXh0UGFnZSxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBuZXh0TGlua0NsYXNzTmFtZSxcbiAgICAgICAgICAgICAgaHJlZjogdGhpcy5ocmVmQnVpbGRlcihzZWxlY3RlZCArIDEpLFxuICAgICAgICAgICAgICB0YWJJbmRleDogJzAnLFxuICAgICAgICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgb25LZXlQcmVzczogdGhpcy5oYW5kbGVOZXh0UGFnZSxcbiAgICAgICAgICAgICAgJ2FyaWEtZGlzYWJsZWQnOiBuZXh0QXJpYURpc2FibGVkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dExhYmVsXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQYWdpbmF0aW9uQm94Vmlldztcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblBhZ2luYXRpb25Cb3hWaWV3LnByb3BUeXBlcyA9IHtcbiAgcGFnZUNvdW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlci5pc1JlcXVpcmVkLFxuICBwYWdlUmFuZ2VEaXNwbGF5ZWQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLmlzUmVxdWlyZWQsXG4gIG1hcmdpblBhZ2VzRGlzcGxheWVkOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlci5pc1JlcXVpcmVkLFxuICBwcmV2aW91c0xhYmVsOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm5vZGUsXG4gIG5leHRMYWJlbDogX3Byb3BUeXBlczIuZGVmYXVsdC5ub2RlLFxuICBicmVha0xhYmVsOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQubm9kZV0pLFxuICBocmVmQnVpbGRlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBvblBhZ2VDaGFuZ2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgaW5pdGlhbFBhZ2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLFxuICBmb3JjZVBhZ2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLFxuICBkaXNhYmxlSW5pdGlhbENhbGxiYWNrOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIGNvbnRhaW5lckNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIHBhZ2VDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBwYWdlTGlua0NsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGFjdGl2ZUNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGFjdGl2ZUxpbmtDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBwcmV2aW91c0NsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIG5leHRDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBwcmV2aW91c0xpbmtDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBuZXh0TGlua0NsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGRpc2FibGVkQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYnJlYWtDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBicmVha0xpbmtDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBleHRyYUFyaWFDb250ZXh0OiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYXJpYUxhYmVsQnVpbGRlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jXG59O1xuUGFnaW5hdGlvbkJveFZpZXcuZGVmYXVsdFByb3BzID0ge1xuICBwYWdlQ291bnQ6IDEwLFxuICBwYWdlUmFuZ2VEaXNwbGF5ZWQ6IDIsXG4gIG1hcmdpblBhZ2VzRGlzcGxheWVkOiAzLFxuICBhY3RpdmVDbGFzc05hbWU6ICdzZWxlY3RlZCcsXG4gIHByZXZpb3VzQ2xhc3NOYW1lOiAncHJldmlvdXMnLFxuICBuZXh0Q2xhc3NOYW1lOiAnbmV4dCcsXG4gIHByZXZpb3VzTGFiZWw6ICdQcmV2aW91cycsXG4gIG5leHRMYWJlbDogJ05leHQnLFxuICBicmVha0xhYmVsOiAnLi4uJyxcbiAgZGlzYWJsZWRDbGFzc05hbWU6ICdkaXNhYmxlZCcsXG4gIGRpc2FibGVJbml0aWFsQ2FsbGJhY2s6IGZhbHNlXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gUGFnaW5hdGlvbkJveFZpZXc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QYWdpbmF0aW9uQm94Vmlldy5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfUGFnaW5hdGlvbkJveFZpZXcgPSByZXF1aXJlKCcuL1BhZ2luYXRpb25Cb3hWaWV3Jyk7XG5cbnZhciBfUGFnaW5hdGlvbkJveFZpZXcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUGFnaW5hdGlvbkJveFZpZXcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfUGFnaW5hdGlvbkJveFZpZXcyLmRlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9