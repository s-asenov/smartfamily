(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~forms~home"],{

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useMounted.js":
/*!*******************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useMounted.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useMounted; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */

function useMounted() {
  var mounted = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(true);
  var isMounted = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(function () {
    return mounted.current;
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    return function () {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useTimeout.js":
/*!*******************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useTimeout.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useTimeout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useMounted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useMounted */ "./node_modules/@restart/hooks/esm/useMounted.js");
/* harmony import */ var _useWillUnmount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useWillUnmount */ "./node_modules/@restart/hooks/esm/useWillUnmount.js");



/*
 * Browsers including Internet Explorer, Chrome, Safari, and Firefox store the
 * delay as a 32-bit signed integer internally. This causes an integer overflow
 * when using delays larger than 2,147,483,647 ms (about 24.8 days),
 * resulting in the timeout being executed immediately.
 *
 * via: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */

var MAX_DELAY_MS = Math.pow(2, 31) - 1;

function setChainedTimeout(handleRef, fn, timeoutAtMs) {
  var delayMs = timeoutAtMs - Date.now();
  handleRef.current = delayMs <= MAX_DELAY_MS ? setTimeout(fn, delayMs) : setTimeout(function () {
    return setChainedTimeout(handleRef, fn, timeoutAtMs);
  }, MAX_DELAY_MS);
}
/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */


function useTimeout() {
  var isMounted = Object(_useMounted__WEBPACK_IMPORTED_MODULE_1__["default"])(); // types are confused between node and web here IDK

  var handleRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  Object(_useWillUnmount__WEBPACK_IMPORTED_MODULE_2__["default"])(function () {
    return clearTimeout(handleRef.current);
  });
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var clear = function clear() {
      return clearTimeout(handleRef.current);
    };

    function set(fn, delayMs) {
      if (delayMs === void 0) {
        delayMs = 0;
      }

      if (!isMounted()) return;
      clear();

      if (delayMs <= MAX_DELAY_MS) {
        // For simplicity, if the timeout is short, just set a normal timeout.
        handleRef.current = setTimeout(fn, delayMs);
      } else {
        setChainedTimeout(handleRef, fn, Date.now() + delayMs);
      }
    }

    return {
      set: set,
      clear: clear
    };
  }, []);
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useUpdatedRef.js":
/*!**********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useUpdatedRef.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useUpdatedRef; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */

function useUpdatedRef(value) {
  var valueRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(value);
  valueRef.current = value;
  return valueRef;
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useWillUnmount.js":
/*!***********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useWillUnmount.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useWillUnmount; });
/* harmony import */ var _useUpdatedRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useUpdatedRef */ "./node_modules/@restart/hooks/esm/useUpdatedRef.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */

function useWillUnmount(fn) {
  var onUnmount = Object(_useUpdatedRef__WEBPACK_IMPORTED_MODULE_0__["default"])(fn);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return function () {
      return onUnmount.current();
    };
  }, []);
}

/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.some.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.some.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $some = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").some;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/dom-helpers/esm/activeElement.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/activeElement.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return activeElement; });
/* harmony import */ var _ownerDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");

/**
 * Return the actively focused element safely.
 *
 * @param doc the document to checl
 */

function activeElement(doc) {
  if (doc === void 0) {
    doc = Object(_ownerDocument__WEBPACK_IMPORTED_MODULE_0__["default"])();
  }

  // Support: IE 9 only
  // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
  try {
    var active = doc.activeElement; // IE11 returns a seemingly empty object in some cases when accessing
    // document.activeElement from an <iframe>

    if (!active || !active.nodeName) return null;
    return active;
  } catch (e) {
    /* ie throws if no active element */
    return doc.body;
  }
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/addClass.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/addClass.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addClass; });
/* harmony import */ var _hasClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasClass */ "./node_modules/dom-helpers/esm/hasClass.js");

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!Object(_hasClass__WEBPACK_IMPORTED_MODULE_0__["default"])(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/hasClass.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/hasClass.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return hasClass; });
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/isDocument.js":
/*!****************************************************!*\
  !*** ./node_modules/dom-helpers/esm/isDocument.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isDocument; });
function isDocument(element) {
  return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/isWindow.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/isWindow.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isWindow; });
/* harmony import */ var _isDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isDocument */ "./node_modules/dom-helpers/esm/isDocument.js");

function isWindow(node) {
  if ('window' in node && node.window === node) return node;
  if (Object(_isDocument__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) return node.defaultView || false;
  return false;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/removeClass.js":
/*!*****************************************************!*\
  !*** ./node_modules/dom-helpers/esm/removeClass.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return removeClass; });
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    ;
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/scrollbarSize.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/scrollbarSize.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return scrollbarSize; });
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");

var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (_canUseDOM__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
}

/***/ }),

/***/ "./node_modules/gud/index.js":
/*!***********************************!*\
  !*** ./node_modules/gud/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {// @flow


var key = '__global_unique_id__';

module.exports = function() {
  return global[key] = (global[key] || 0) + 1;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/history/esm/history.js":
/*!*********************************************!*\
  !*** ./node_modules/history/esm/history.js ***!
  \*********************************************/
/*! exports provided: createBrowserHistory, createHashHistory, createMemoryHistory, createLocation, locationsAreEqual, parsePath, createPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBrowserHistory", function() { return createBrowserHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHashHistory", function() { return createHashHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMemoryHistory", function() { return createMemoryHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLocation", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationsAreEqual", function() { return locationsAreEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return parsePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return createPath; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var resolve_pathname__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resolve-pathname */ "./node_modules/resolve-pathname/esm/resolve-pathname.js");
/* harmony import */ var value_equal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! value-equal */ "./node_modules/value-equal/esm/value-equal.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/tiny-invariant.esm.js");






function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = Object(resolve_pathname__WEBPACK_IMPORTED_MODULE_1__["default"])(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && Object(value_equal__WEBPACK_IMPORTED_MODULE_2__["default"])(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(prompt == null, 'A history supports only one prompt at a time') : undefined;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : undefined;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_4__["default"])(false, 'Browser history needs a DOM') : undefined : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : undefined;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : undefined;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : undefined;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_4__["default"])(false, 'Hash history needs a DOM') : undefined : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : undefined;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Hash history cannot push state; it is ignored') : undefined;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : undefined;
        setState();
      }
    });
  }

  function replace(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Hash history cannot replace state; it is ignored') : undefined;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}




/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/mini-create-react-context/dist/esm/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/mini-create-react-context/dist/esm/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gud__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gud */ "./node_modules/gud/index.js");
/* harmony import */ var gud__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gud__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");






var MAX_SIGNED_31_BIT_INT = 1073741823;

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;

  var contextProp = '__create-react-context-' + gud__WEBPACK_IMPORTED_MODULE_3___default()() + '__';

  var Provider =
  /*#__PURE__*/
  function (_Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(Provider, _Component);

    function Provider() {
      var _this;

      _this = _Component.apply(this, arguments) || this;
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }

    var _proto = Provider.prototype;

    _proto.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0;
        } else {
          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

          if (true) {
            Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: ' + changedBits);
          }

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    _proto.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired, _Provider$childContex);

  var Consumer =
  /*#__PURE__*/
  function (_Component2) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(Consumer, _Component2);

    function Consumer() {
      var _this2;

      _this2 = _Component2.apply(this, arguments) || this;
      _this2.state = {
        value: _this2.getValue()
      };

      _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;

        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };

      return _this2;
    }

    var _proto2 = Consumer.prototype;

    _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }

      var observedBits = this.props.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    _proto2.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    _proto2.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, _Consumer$contextType);
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

var index = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext || createReactContext;

/* harmony default export */ __webpack_exports__["default"] = (index);


/***/ }),

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(/*! isarray */ "./node_modules/path-to-regexp/node_modules/isarray/index.js")

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options))
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),

/***/ "./node_modules/path-to-regexp/node_modules/isarray/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/path-to-regexp/node_modules/isarray/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Accordion.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Accordion.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AccordionToggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AccordionToggle */ "./node_modules/react-bootstrap/esm/AccordionToggle.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/esm/SelectableContext.js");
/* harmony import */ var _AccordionCollapse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AccordionCollapse */ "./node_modules/react-bootstrap/esm/AccordionCollapse.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/esm/AccordionContext.js");










var Accordion = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
  var _useUncontrolled = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_4__["useUncontrolled"])(props, {
    activeKey: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      activeKey = _useUncontrolled.activeKey,
      bsPrefix = _useUncontrolled.bsPrefix,
      children = _useUncontrolled.children,
      className = _useUncontrolled.className,
      onSelect = _useUncontrolled.onSelect,
      controlledProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["as", "activeKey", "bsPrefix", "children", "className", "onSelect"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'accordion');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_AccordionContext__WEBPACK_IMPORTED_MODULE_9__["default"].Provider, {
    value: activeKey
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
    value: onSelect
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, controlledProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children)));
});
Accordion.Toggle = _AccordionToggle__WEBPACK_IMPORTED_MODULE_6__["default"];
Accordion.Collapse = _AccordionCollapse__WEBPACK_IMPORTED_MODULE_8__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Accordion);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionCollapse.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionCollapse.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Collapse */ "./node_modules/react-bootstrap/esm/Collapse.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/esm/AccordionContext.js");





var AccordionCollapse = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      eventKey = _ref.eventKey,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["children", "eventKey"]);

  var contextEventKey = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_AccordionContext__WEBPACK_IMPORTED_MODULE_4__["default"]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Collapse__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    in: contextEventKey === eventKey
  }, props), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.only(children)));
});
AccordionCollapse.displayName = 'AccordionCollapse';
/* harmony default export */ __webpack_exports__["default"] = (AccordionCollapse);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionContext.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionContext.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/AccordionToggle.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/AccordionToggle.js ***!
  \*************************************************************/
/*! exports provided: useAccordionToggle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAccordionToggle", function() { return useAccordionToggle; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/esm/SelectableContext.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/esm/AccordionContext.js");





function useAccordionToggle(eventKey, onClick) {
  var contextEventKey = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_AccordionContext__WEBPACK_IMPORTED_MODULE_4__["default"]);
  var onSelect = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return function (e) {
    /* 
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    var eventKeyPassed = eventKey === contextEventKey ? null : eventKey;
    onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}
var AccordionToggle = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'button' : _ref$as,
      children = _ref.children,
      eventKey = _ref.eventKey,
      onClick = _ref.onClick,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["as", "children", "eventKey", "onClick"]);

  var accordionOnClick = useAccordionToggle(eventKey, onClick);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    onClick: accordionOnClick
  }, props), children);
});
/* harmony default export */ __webpack_exports__["default"] = (AccordionToggle);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Alert.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Alert.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/esm/SafeAnchor.js");












var defaultProps = {
  show: true,
  transition: _Fade__WEBPACK_IMPORTED_MODULE_9__["default"],
  closeLabel: 'Close alert'
};
var controllables = {
  show: 'onClose'
};
var Alert = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (uncontrolledProps, ref) {
  var _useUncontrolled = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_4__["useUncontrolled"])(uncontrolledProps, controllables),
      bsPrefix = _useUncontrolled.bsPrefix,
      show = _useUncontrolled.show,
      closeLabel = _useUncontrolled.closeLabel,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      variant = _useUncontrolled.variant,
      onClose = _useUncontrolled.onClose,
      dismissible = _useUncontrolled.dismissible,
      Transition = _useUncontrolled.transition,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["bsPrefix", "show", "closeLabel", "className", "children", "variant", "onClose", "dismissible", "transition"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__["useBootstrapPrefix"])(bsPrefix, 'alert');
  var handleClose = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_5__["default"])(function (e) {
    onClose(false, e);
  });
  var alert = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: "alert"
  }, Transition ? props : undefined, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, variant && prefix + "-" + variant, dismissible && prefix + "-dismissible")
  }), dismissible && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CloseButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    onClick: handleClose,
    label: closeLabel
  }), children);
  if (!Transition) return show ? alert : null;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Transition, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    unmountOnExit: true
  }, props, {
    in: show
  }), alert);
});
var DivStyledAsH4 = Object(_divWithClassName__WEBPACK_IMPORTED_MODULE_7__["default"])('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
Alert.displayName = 'Alert';
Alert.defaultProps = defaultProps;
Alert.Link = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__["default"])('alert-link', {
  Component: _SafeAnchor__WEBPACK_IMPORTED_MODULE_11__["default"]
});
Alert.Heading = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__["default"])('alert-heading', {
  Component: DivStyledAsH4
});
/* harmony default export */ __webpack_exports__["default"] = (Alert);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Badge.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Badge.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var defaultProps = {
  pill: false
};
var Badge = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      pill = _ref.pill,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'span' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "variant", "pill", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'badge');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, pill && prefix + "-pill", variant && prefix + "-" + variant)
  }));
});
Badge.displayName = 'Badge';
Badge.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Badge);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/BootstrapModalManager.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/BootstrapModalManager.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BootstrapModalManager; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/css */ "./node_modules/dom-helpers/esm/css.js");
/* harmony import */ var dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/querySelectorAll */ "./node_modules/dom-helpers/esm/querySelectorAll.js");
/* harmony import */ var dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/scrollbarSize */ "./node_modules/dom-helpers/esm/scrollbarSize.js");
/* harmony import */ var react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-overlays/ModalManager */ "./node_modules/react-overlays/esm/ModalManager.js");





var Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
};

var BootstrapModalManager =
/*#__PURE__*/
function (_ModalManager) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BootstrapModalManager, _ModalManager);

  function BootstrapModalManager() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ModalManager.call.apply(_ModalManager, [this].concat(args)) || this;

    _this.adjustAndStore = function (prop, element, adjust) {
      var _css;

      var actual = element.style[prop];
      element.dataset[prop] = actual;
      Object(dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__["default"])(element, (_css = {}, _css[prop] = parseFloat(Object(dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__["default"])(element, prop)) + adjust + "px", _css));
    };

    _this.restore = function (prop, element) {
      var value = element.dataset[prop];

      if (value !== undefined) {
        var _css2;

        delete element.dataset[prop];
        Object(dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__["default"])(element, (_css2 = {}, _css2[prop] = value, _css2));
      }
    };

    return _this;
  }

  var _proto = BootstrapModalManager.prototype;

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var _this2 = this;

    _ModalManager.prototype.setContainerStyle.call(this, containerState, container);

    if (!containerState.overflowing) return;
    var size = Object(dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this2.adjustAndStore('paddingRight', el, size);
    });
    Object(dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this2.adjustAndStore('margingRight', el, -size);
    });
    Object(dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this2.adjustAndStore('margingRight', el, size);
    });
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    var _this3 = this;

    _ModalManager.prototype.removeContainerStyle.call(this, containerState, container);

    Object(dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this3.restore('paddingRight', el);
    });
    Object(dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this3.restore('margingRight', el);
    });
    Object(dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this3.restore('margingRight', el);
    });
  };

  return BootstrapModalManager;
}(react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4__["default"]);



/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Breadcrumb.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Breadcrumb.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BreadcrumbItem */ "./node_modules/react-bootstrap/esm/BreadcrumbItem.js");






var defaultProps = {
  label: 'breadcrumb',
  listProps: {}
};
var Breadcrumb = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      listProps = _ref.listProps,
      children = _ref.children,
      label = _ref.label,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'nav' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "listProps", "children", "label", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'breadcrumb');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-label": label,
    className: className,
    ref: ref
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ol", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, listProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(prefix, listProps.className)
  }), children));
});
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.defaultProps = defaultProps;
Breadcrumb.Item = _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_5__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Breadcrumb);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/BreadcrumbItem.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/BreadcrumbItem.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/esm/SafeAnchor.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");






var defaultProps = {
  active: false
};
var BreadcrumbItem = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      active = _ref.active,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'li' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "active", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'breadcrumb-item');

  var href = props.href,
      title = props.title,
      target = props.target,
      elementProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["href", "title", "target"]);

  var linkProps = {
    href: href,
    title: title,
    target: target
  };
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(prefix, className, {
      active: active
    }),
    "aria-current": active ? 'page' : undefined
  }, active ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, elementProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      active: active
    })
  })) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, elementProps, linkProps)));
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (BreadcrumbItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ButtonGroup.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ButtonGroup.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var defaultProps = {
  vertical: false,
  toggle: false,
  role: 'group'
};
var ButtonGroup = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
  var bsPrefix = props.bsPrefix,
      size = props.size,
      toggle = props.toggle,
      vertical = props.vertical,
      className = props.className,
      _props$as = props.as,
      Component = _props$as === void 0 ? 'div' : _props$as,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["bsPrefix", "size", "toggle", "vertical", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'btn-group');
  var baseClass = prefix;
  if (vertical) baseClass = prefix + "-vertical";
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, baseClass, size && prefix + "-" + size, toggle && prefix + "-toggle")
  }));
});
ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ButtonGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ButtonToolbar.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ButtonToolbar.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var defaultProps = {
  role: 'toolbar'
};
var ButtonToolbar = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'btn-toolbar');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix)
  }));
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ButtonToolbar);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Card.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Card.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");
/* harmony import */ var _CardContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CardContext */ "./node_modules/react-bootstrap/esm/CardContext.js");
/* harmony import */ var _CardImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CardImg */ "./node_modules/react-bootstrap/esm/CardImg.js");









var DivStyledAsH5 = Object(_divWithClassName__WEBPACK_IMPORTED_MODULE_6__["default"])('h5');
var DivStyledAsH6 = Object(_divWithClassName__WEBPACK_IMPORTED_MODULE_6__["default"])('h6');
var CardBody = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-body');
var defaultProps = {
  body: false
};
var Card = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      bg = _ref.bg,
      text = _ref.text,
      border = _ref.border,
      body = _ref.body,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "bg", "text", "border", "body", "children", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'card');
  var cardContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      cardHeaderBsPrefix: prefix + "-header"
    };
  }, [prefix]);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CardContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
    value: cardContext
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, bg && "bg-" + bg, text && "text-" + text, border && "border-" + border)
  }), body ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(CardBody, null, children) : children));
});
Card.displayName = 'Card';
Card.defaultProps = defaultProps;
Card.Img = _CardImg__WEBPACK_IMPORTED_MODULE_8__["default"];
Card.Title = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-title', {
  Component: DivStyledAsH5
});
Card.Subtitle = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-subtitle', {
  Component: DivStyledAsH6
});
Card.Body = CardBody;
Card.Link = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-link', {
  Component: 'a'
});
Card.Text = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-text', {
  Component: 'p'
});
Card.Header = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-header');
Card.Footer = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-footer');
Card.ImgOverlay = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-img-overlay');
/* harmony default export */ __webpack_exports__["default"] = (Card);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardColumns.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardColumns.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('card-columns'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardDeck.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardDeck.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('card-deck'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardGroup.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardGroup.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('card-group'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CardImg.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CardImg.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var defaultProps = {
  variant: null
};
var CardImg = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      variant = _ref.variant,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'img' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "variant", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'card-img');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(variant ? prefix + "-" + variant : prefix, className)
  }, props));
});
CardImg.displayName = 'CardImg';
CardImg.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (CardImg);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Carousel.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Carousel.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dom_helpers_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/css */ "./node_modules/dom-helpers/esm/css.js");
/* harmony import */ var dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/transitionEnd */ "./node_modules/dom-helpers/esm/transitionEnd.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _CarouselCaption__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CarouselCaption */ "./node_modules/react-bootstrap/esm/CarouselCaption.js");
/* harmony import */ var _CarouselItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CarouselItem */ "./node_modules/react-bootstrap/esm/CarouselItem.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/esm/SafeAnchor.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./triggerBrowserReflow */ "./node_modules/react-bootstrap/esm/triggerBrowserReflow.js");















var countChildren = function countChildren(c) {
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.Children.toArray(c).filter(react__WEBPACK_IMPORTED_MODULE_6___default.a.isValidElement).length;
};

var SWIPE_THRESHOLD = 40; // TODO: `slide` should be `animate`.

var defaultProps = {
  slide: true,
  fade: false,
  interval: 5000,
  keyboard: true,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  activeIndex: 0,
  prevIcon: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-prev-icon"
  }),
  prevLabel: 'Previous',
  nextIcon: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-next-icon"
  }),
  nextLabel: 'Next',
  touch: true
};

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Carousel, _React$Component);

  function Carousel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      prevClasses: '',
      currentClasses: 'active',
      touchStartX: 0
    };
    _this.isUnmounted = false;
    _this.carousel = react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef();

    _this.handleTouchStart = function (e) {
      _this.setState({
        touchStartX: e.changedTouches[0].screenX
      });
    };

    _this.handleTouchEnd = function (e) {
      // If the swipe is under the threshold, don't do anything.
      if (Math.abs(e.changedTouches[0].screenX - _this.state.touchStartX) < SWIPE_THRESHOLD) return;

      if (e.changedTouches[0].screenX < _this.state.touchStartX) {
        // Swiping left to navigate to next item.
        _this.handleNext(e);
      } else {
        // Swiping right to navigate to previous item.
        _this.handlePrev(e);
      }
    };

    _this.handleSlideEnd = function () {
      var pendingIndex = _this._pendingIndex;
      _this._isSliding = false;
      _this._pendingIndex = null;
      if (pendingIndex != null) _this.to(pendingIndex);else _this.cycle();
    };

    _this.handleMouseOut = function () {
      _this.cycle();
    };

    _this.handleMouseOver = function () {
      if (_this.props.pauseOnHover) _this.pause();
    };

    _this.handleKeyDown = function (event) {
      if (/input|textarea/i.test(event.target.tagName)) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();

          _this.handlePrev(event);

          break;

        case 'ArrowRight':
          event.preventDefault();

          _this.handleNext(event);

          break;

        default:
          break;
      }
    };

    _this.handleNextWhenVisible = function () {
      if (!_this.isUnmounted && !document.hidden && Object(dom_helpers_css__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.carousel.current, 'visibility') !== 'hidden') {
        _this.handleNext();
      }
    };

    _this.handleNext = function (e) {
      if (_this._isSliding) return;
      var _this$props = _this.props,
          wrap = _this$props.wrap,
          activeIndex = _this$props.activeIndex;
      var index = activeIndex + 1;
      var count = countChildren(_this.props.children);

      if (index > count - 1) {
        if (!wrap) return;
        index = 0;
      }

      _this.select(index, e, 'next');
    };

    _this.handlePrev = function (e) {
      if (_this._isSliding) return;
      var _this$props2 = _this.props,
          wrap = _this$props2.wrap,
          activeIndex = _this$props2.activeIndex;
      var index = activeIndex - 1;

      if (index < 0) {
        if (!wrap) return;
        index = countChildren(_this.props.children) - 1;
      }

      _this.select(index, e, 'prev');
    };

    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.cycle();
  };

  Carousel.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var previousActiveIndex = _ref.activeIndex;

    if (nextProps.activeIndex !== previousActiveIndex) {
      var lastPossibleIndex = countChildren(nextProps.children) - 1;
      var nextIndex = Math.max(0, Math.min(nextProps.activeIndex, lastPossibleIndex));
      var direction;

      if (nextIndex === 0 && previousActiveIndex >= lastPossibleIndex || previousActiveIndex <= nextIndex) {
        direction = 'next';
      } else {
        direction = 'prev';
      }

      return {
        direction: direction,
        previousActiveIndex: previousActiveIndex,
        activeIndex: nextIndex
      };
    }

    return null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_, prevState) {
    var _this2 = this;

    var _this$props3 = this.props,
        bsPrefix = _this$props3.bsPrefix,
        slide = _this$props3.slide,
        onSlideEnd = _this$props3.onSlideEnd;
    if (!slide || this.state.activeIndex === prevState.activeIndex || this._isSliding) return;
    var _this$state = this.state,
        activeIndex = _this$state.activeIndex,
        direction = _this$state.direction;
    var orderClassName, directionalClassName;

    if (direction === 'next') {
      orderClassName = bsPrefix + "-item-next";
      directionalClassName = bsPrefix + "-item-left";
    } else if (direction === 'prev') {
      orderClassName = bsPrefix + "-item-prev";
      directionalClassName = bsPrefix + "-item-right";
    }

    this._isSliding = true;
    this.pause(); // eslint-disable-next-line react/no-did-update-set-state

    this.safeSetState({
      prevClasses: 'active',
      currentClasses: orderClassName
    }, function () {
      var items = _this2.carousel.current.children;
      var nextElement = items[activeIndex];
      Object(_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_13__["default"])(nextElement);

      _this2.safeSetState({
        prevClasses: classnames__WEBPACK_IMPORTED_MODULE_3___default()('active', directionalClassName),
        currentClasses: classnames__WEBPACK_IMPORTED_MODULE_3___default()(orderClassName, directionalClassName)
      }, function () {
        return Object(dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_5__["default"])(nextElement, function () {
          _this2.safeSetState({
            prevClasses: '',
            currentClasses: 'active'
          }, _this2.handleSlideEnd);

          if (onSlideEnd) {
            onSlideEnd();
          }
        });
      });
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  };

  _proto.safeSetState = function safeSetState(state, cb) {
    var _this3 = this;

    if (this.isUnmounted) return;
    this.setState(state, function () {
      return !_this3.isUnmounted && cb();
    });
  } // This might be a public API.
  ;

  _proto.pause = function pause() {
    this._isPaused = true;
    clearInterval(this._interval);
    this._interval = null;
  };

  _proto.cycle = function cycle() {
    this._isPaused = false;
    clearInterval(this._interval);
    this._interval = null;

    if (this.props.interval && !this._isPaused) {
      this._interval = setInterval(document.visibilityState ? this.handleNextWhenVisible : this.handleNext, this.props.interval);
    }
  };

  _proto.to = function to(index, event) {
    var children = this.props.children;

    if (index < 0 || index > countChildren(children) - 1) {
      return;
    }

    if (this._isSliding) {
      this._pendingIndex = index;
      return;
    }

    this.select(index, event);
  };

  _proto.select = function select(index, event, direction) {
    var _this4 = this;

    clearTimeout(this.selectThrottle);
    if (event && event.persist) event.persist(); // The timeout throttles fast clicks, in order to give any pending state
    // a chance to update and propagate back through props

    this.selectThrottle = setTimeout(function () {
      clearTimeout(_this4.timeout);
      var _this4$props = _this4.props,
          activeIndex = _this4$props.activeIndex,
          onSelect = _this4$props.onSelect;
      if (index === activeIndex || _this4._isSliding || _this4.isUnmounted) return;
      onSelect(index, direction || (index < activeIndex ? 'prev' : 'next'), event);
    }, 50);
  };

  _proto.renderControls = function renderControls(properties) {
    var bsPrefix = this.props.bsPrefix;
    var wrap = properties.wrap,
        children = properties.children,
        activeIndex = properties.activeIndex,
        prevIcon = properties.prevIcon,
        nextIcon = properties.nextIcon,
        prevLabel = properties.prevLabel,
        nextLabel = properties.nextLabel;
    var count = countChildren(children);
    return [(wrap || activeIndex !== 0) && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_11__["default"], {
      key: "prev",
      className: bsPrefix + "-control-prev",
      onClick: this.handlePrev
    }, prevIcon, prevLabel && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
      className: "sr-only"
    }, prevLabel)), (wrap || activeIndex !== count - 1) && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_11__["default"], {
      key: "next",
      className: bsPrefix + "-control-next",
      onClick: this.handleNext
    }, nextIcon, nextLabel && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
      className: "sr-only"
    }, nextLabel))];
  };

  _proto.renderIndicators = function renderIndicators(children, activeIndex) {
    var _this5 = this;

    var bsPrefix = this.props.bsPrefix;
    var indicators = [];
    Object(_ElementChildren__WEBPACK_IMPORTED_MODULE_10__["forEach"])(children, function (child, index) {
      indicators.push(react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
        key: index,
        className: index === activeIndex ? 'active' : null,
        onClick: function onClick(e) {
          return _this5.to(index, e);
        }
      }), // Force whitespace between indicator elements. Bootstrap requires
      // this for correct spacing of elements.
      ' ');
    });
    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ol", {
      className: bsPrefix + "-indicators"
    }, indicators);
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        _this$props4$as = _this$props4.as,
        Component = _this$props4$as === void 0 ? 'div' : _this$props4$as,
        bsPrefix = _this$props4.bsPrefix,
        slide = _this$props4.slide,
        fade = _this$props4.fade,
        indicators = _this$props4.indicators,
        controls = _this$props4.controls,
        wrap = _this$props4.wrap,
        touch = _this$props4.touch,
        prevIcon = _this$props4.prevIcon,
        prevLabel = _this$props4.prevLabel,
        nextIcon = _this$props4.nextIcon,
        nextLabel = _this$props4.nextLabel,
        className = _this$props4.className,
        children = _this$props4.children,
        keyboard = _this$props4.keyboard,
        _5 = _this$props4.activeIndex,
        _4 = _this$props4.pauseOnHover,
        _3 = _this$props4.interval,
        _2 = _this$props4.onSelect,
        _1 = _this$props4.onSlideEnd,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props4, ["as", "bsPrefix", "slide", "fade", "indicators", "controls", "wrap", "touch", "prevIcon", "prevLabel", "nextIcon", "nextLabel", "className", "children", "keyboard", "activeIndex", "pauseOnHover", "interval", "onSelect", "onSlideEnd"]);

    var _this$state2 = this.state,
        activeIndex = _this$state2.activeIndex,
        previousActiveIndex = _this$state2.previousActiveIndex,
        prevClasses = _this$state2.prevClasses,
        currentClasses = _this$state2.currentClasses;
    return (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
      react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        onTouchStart: touch ? this.handleTouchStart : undefined,
        onTouchEnd: touch ? this.handleTouchEnd : undefined
      }, props, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, slide && 'slide', fade && bsPrefix + "-fade"),
        onKeyDown: keyboard ? this.handleKeyDown : undefined,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut
      }), indicators && this.renderIndicators(children, activeIndex), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: bsPrefix + "-inner",
        ref: this.carousel
      }, Object(_ElementChildren__WEBPACK_IMPORTED_MODULE_10__["map"])(children, function (child, index) {
        var current = index === activeIndex;
        var previous = index === previousActiveIndex;
        return Object(react__WEBPACK_IMPORTED_MODULE_6__["cloneElement"])(child, {
          className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(child.props.className, current && currentClasses, previous && prevClasses)
        });
      })), controls && this.renderControls({
        wrap: wrap,
        children: children,
        activeIndex: activeIndex,
        prevIcon: prevIcon,
        prevLabel: prevLabel,
        nextIcon: nextIcon,
        nextLabel: nextLabel
      }))
    );
  };

  return Carousel;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

Carousel.defaultProps = defaultProps;
var DecoratedCarousel = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_12__["createBootstrapComponent"])(Object(uncontrollable__WEBPACK_IMPORTED_MODULE_7__["uncontrollable"])(Carousel, {
  activeIndex: 'onSelect'
}), 'carousel');
DecoratedCarousel.Caption = _CarouselCaption__WEBPACK_IMPORTED_MODULE_8__["default"];
DecoratedCarousel.Item = _CarouselItem__WEBPACK_IMPORTED_MODULE_9__["default"];
/* harmony default export */ __webpack_exports__["default"] = (DecoratedCarousel);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CarouselCaption.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CarouselCaption.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('carousel-caption', {
  Component: 'div'
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CarouselItem.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CarouselItem.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('carousel-item'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CloseButton.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CloseButton.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);





var propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};
var defaultProps = {
  label: 'Close'
};
var CloseButton = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["label", "onClick", "className"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    type: "button",
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('close', className),
    onClick: onClick
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "sr-only"
  }, label));
});
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (CloseButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/DropdownButton.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/DropdownButton.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");





var propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any,

  /** An `href` passed to the Toggle component */
  href: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** An `onClick` handler passed to the Toggle component */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** The content of the non-toggle Button.  */
  title: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node.isRequired,

  /** Disables both Buttons  */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  bsPrefix: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
};
/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`.
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu related props are passed to the `Dropdown.Menu`
 */

var DropdownButton = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var title = _ref.title,
      children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      rootCloseEvent = _ref.rootCloseEvent,
      variant = _ref.variant,
      size = _ref.size,
      menuRole = _ref.menuRole,
      disabled = _ref.disabled,
      href = _ref.href,
      id = _ref.id,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["title", "children", "bsPrefix", "rootCloseEvent", "variant", "size", "menuRole", "disabled", "href", "id"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Toggle, {
    id: id,
    href: href,
    size: size,
    variant: variant,
    disabled: disabled,
    childBsPrefix: bsPrefix
  }, title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Menu, {
    role: menuRole,
    rootCloseEvent: rootCloseEvent
  }, children));
});
DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (DropdownButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ElementChildren.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ElementChildren.js ***!
  \*************************************************************/
/*! exports provided: map, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */

function map(children, func) {
  var index = 0;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, function (child) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(child) ? func(child, index++) : child;
  });
}
/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */


function forEach(children, func) {
  var index = 0;
  react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.forEach(children, function (child) {
    if (react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(child)) func(child, index++);
  });
}



/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Fade.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Fade.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/transitionEnd */ "./node_modules/dom-helpers/esm/transitionEnd.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var _triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./triggerBrowserReflow */ "./node_modules/react-bootstrap/esm/triggerBrowserReflow.js");



var _fadeStyles;






var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__["ENTERING"]] = 'show', _fadeStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__["ENTERED"]] = 'show', _fadeStyles);
var Fade = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["className", "children"]);

  var handleEnter = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (node) {
    Object(_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_6__["default"])(node);
    if (props.onEnter) props.onEnter(node);
  }, [props]);
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    addEndListener: dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, props, {
    onEnter: handleEnter
  }), function (status, innerProps) {
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.cloneElement(children, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innerProps, {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('fade', className, children.props.className, fadeStyles[status])
    }));
  });
});
Fade.defaultProps = defaultProps;
Fade.displayName = 'Fade';
/* harmony default export */ __webpack_exports__["default"] = (Fade);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Figure.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Figure.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");
/* harmony import */ var _FigureImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FigureImage */ "./node_modules/react-bootstrap/esm/FigureImage.js");
/* harmony import */ var _FigureCaption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FigureCaption */ "./node_modules/react-bootstrap/esm/FigureCaption.js");



var Figure = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('figure', {
  Component: 'figure'
});
Figure.Image = _FigureImage__WEBPACK_IMPORTED_MODULE_1__["default"];
Figure.Caption = _FigureCaption__WEBPACK_IMPORTED_MODULE_2__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Figure);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/FigureCaption.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/FigureCaption.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

var FigureCaption = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('figure-caption', {
  Component: 'figcaption'
});
/* harmony default export */ __webpack_exports__["default"] = (FigureCaption);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/FigureImage.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/FigureImage.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Image */ "./node_modules/react-bootstrap/esm/Image.js");






var propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * Sets image as fluid image.
   */
  fluid: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Sets image shape as rounded.
   */
  rounded: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Sets image shape as circle.
   */
  roundedCircle: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
var defaultProps = {
  fluid: true
};
var FigureImage = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["className"]);

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Image__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'figure-img')
  }));
});
FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = propTypes;
FigureImage.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (FigureImage);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/InputGroup.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/InputGroup.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");







/**
 *
 * @property {InputGroupAppend} Append
 * @property {InputGroupPrepend} Prepend
 * @property {InputGroupText} Text
 * @property {InputGroupRadio} Radio
 * @property {InputGroupCheckbox} Checkbox
 */
var InputGroup = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      size = _ref.size,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "size", "className", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'input-group');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, size && bsPrefix + "-" + size)
  }));
});
var InputGroupAppend = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__["default"])('input-group-append');
var InputGroupPrepend = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__["default"])('input-group-prepend');
var InputGroupText = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__["default"])('input-group-text', {
  Component: 'span'
});

var InputGroupCheckbox = function InputGroupCheckbox(props) {
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(InputGroupText, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    type: "checkbox"
  }, props)));
};

var InputGroupRadio = function InputGroupRadio(props) {
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(InputGroupText, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    type: "radio"
  }, props)));
};

InputGroup.displayName = 'InputGroup';
InputGroup.Text = InputGroupText;
InputGroup.Radio = InputGroupRadio;
InputGroup.Checkbox = InputGroupCheckbox;
InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;
/* harmony default export */ __webpack_exports__["default"] = (InputGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Jumbotron.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Jumbotron.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var defaultProps = {
  fluid: false
};
var Jumbotron = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var _classes;

  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      fluid = _ref.fluid,
      bsPrefix = _ref.bsPrefix,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["as", "className", "fluid", "bsPrefix"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'jumbotron');
  var classes = (_classes = {}, _classes[bsPrefix] = true, _classes[bsPrefix + "-fluid"] = fluid, _classes);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, classes)
  }));
});
Jumbotron.defaultProps = defaultProps;
Jumbotron.displayName = 'Jumbotron';
/* harmony default export */ __webpack_exports__["default"] = (Jumbotron);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ListGroup.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ListGroup.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _AbstractNav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AbstractNav */ "./node_modules/react-bootstrap/esm/AbstractNav.js");
/* harmony import */ var _ListGroupItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ListGroupItem */ "./node_modules/react-bootstrap/esm/ListGroupItem.js");









var defaultProps = {
  variant: null,
  horizontal: null
};
var ListGroup = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
  var _useUncontrolled = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_5__["useUncontrolled"])(props, {
    activeKey: 'onSelect'
  }),
      className = _useUncontrolled.className,
      bsPrefix = _useUncontrolled.bsPrefix,
      variant = _useUncontrolled.variant,
      horizontal = _useUncontrolled.horizontal,
      _useUncontrolled$as = _useUncontrolled.as,
      as = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      controlledProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["className", "bsPrefix", "variant", "horizontal", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["useBootstrapPrefix"])(bsPrefix, 'list-group');
  var horizontalVariant;

  if (horizontal) {
    horizontalVariant = horizontal === true ? 'horizontal' : "horizontal-" + horizontal;
  } else {
    horizontalVariant = null;
  }

   true ? warning__WEBPACK_IMPORTED_MODULE_4___default()(!(horizontal && variant === 'flush'), '`variant="flush"` and `horizontal` should not be used together.') : undefined;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_AbstractNav__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, controlledProps, {
    as: as,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, variant && bsPrefix + "-" + variant, horizontalVariant && bsPrefix + "-" + horizontalVariant)
  }));
});
ListGroup.defaultProps = defaultProps;
ListGroup.displayName = 'ListGroup';
ListGroup.Item = _ListGroupItem__WEBPACK_IMPORTED_MODULE_8__["default"];
/* harmony default export */ __webpack_exports__["default"] = (ListGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ListGroupItem.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ListGroupItem.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AbstractNavItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AbstractNavItem */ "./node_modules/react-bootstrap/esm/AbstractNavItem.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/esm/SelectableContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");







var defaultProps = {
  variant: null,
  active: false,
  disabled: false
};
var ListGroupItem = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      variant = _ref.variant,
      action = _ref.action,
      as = _ref.as,
      eventKey = _ref.eventKey,
      onClick = _ref.onClick,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "active", "disabled", "className", "variant", "action", "as", "eventKey", "onClick"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["useBootstrapPrefix"])(bsPrefix, 'list-group-item');
  var handleClick = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (onClick) onClick(event);
  }, [disabled, onClick]);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_AbstractNavItem__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    eventKey: Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_5__["makeEventKey"])(eventKey, props.href) // eslint-disable-next-line
    ,
    as: as || (action ? props.href ? 'a' : 'button' : 'div'),
    onClick: handleClick,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, active && 'active', disabled && 'disabled', variant && bsPrefix + "-" + variant, action && bsPrefix + "-action")
  }));
});
ListGroupItem.defaultProps = defaultProps;
ListGroupItem.displayName = 'ListGroupItem';
/* harmony default export */ __webpack_exports__["default"] = (ListGroupItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Media.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Media.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");






var Media = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'media');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix)
  }));
});
Media.displayName = 'Media';
Media.Body = Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__["default"])('media-body');
/* harmony default export */ __webpack_exports__["default"] = (Media);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Modal.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Modal.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/addEventListener */ "./node_modules/dom-helpers/esm/addEventListener.js");
/* harmony import */ var dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");
/* harmony import */ var dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dom-helpers/removeEventListener */ "./node_modules/dom-helpers/esm/removeEventListener.js");
/* harmony import */ var dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dom-helpers/scrollbarSize */ "./node_modules/dom-helpers/esm/scrollbarSize.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_overlays_Modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-overlays/Modal */ "./node_modules/react-overlays/esm/Modal.js");
/* harmony import */ var _BootstrapModalManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./BootstrapModalManager */ "./node_modules/react-bootstrap/esm/BootstrapModalManager.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _ModalBody__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ModalBody */ "./node_modules/react-bootstrap/esm/ModalBody.js");
/* harmony import */ var _ModalContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ModalContext */ "./node_modules/react-bootstrap/esm/ModalContext.js");
/* harmony import */ var _ModalDialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ModalDialog */ "./node_modules/react-bootstrap/esm/ModalDialog.js");
/* harmony import */ var _ModalFooter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ModalFooter */ "./node_modules/react-bootstrap/esm/ModalFooter.js");
/* harmony import */ var _ModalHeader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ModalHeader */ "./node_modules/react-bootstrap/esm/ModalHeader.js");
/* harmony import */ var _ModalTitle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ModalTitle */ "./node_modules/react-bootstrap/esm/ModalTitle.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");




















var manager;
var defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: _ModalDialog__WEBPACK_IMPORTED_MODULE_15__["default"]
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Fade__WEBPACK_IMPORTED_MODULE_12__["default"], props);
}

function BackdropTransition(props) {
  return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Fade__WEBPACK_IMPORTED_MODULE_12__["default"], props);
}
/* eslint-enable no-use-before-define */


var Modal =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Modal, _React$Component);

  function Modal() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.state = {
      style: {}
    };
    _this.modalContext = {
      onHide: function onHide() {
        return _this.props.onHide();
      }
    };

    _this.setModalRef = function (ref) {
      _this._modal = ref;
    };

    _this.handleDialogMouseDown = function () {
      _this._waitingForMouseUp = true;
    };

    _this.handleMouseUp = function (e) {
      if (_this._waitingForMouseUp && e.target === _this._modal.dialog) {
        _this._ignoreBackdropClick = true;
      }

      _this._waitingForMouseUp = false;
    };

    _this.handleClick = function (e) {
      if (_this._ignoreBackdropClick || e.target !== e.currentTarget) {
        _this._ignoreBackdropClick = false;
        return;
      }

      _this.props.onHide();
    };

    _this.handleEnter = function (node) {
      var _this$props;

      if (node) {
        node.style.display = 'block';

        _this.updateDialogStyle(node);
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (_this.props.onEnter) (_this$props = _this.props).onEnter.apply(_this$props, [node].concat(args));
    };

    _this.handleEntering = function (node) {
      var _this$props2;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      if (_this.props.onEntering) (_this$props2 = _this.props).onEntering.apply(_this$props2, [node].concat(args)); // FIXME: This should work even when animation is disabled.

      Object(dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_4__["default"])(window, 'resize', _this.handleWindowResize);
    };

    _this.handleExited = function (node) {
      var _this$props3;

      if (node) node.style.display = ''; // RHL removes it sometimes

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      if (_this.props.onExited) (_this$props3 = _this.props).onExited.apply(_this$props3, args); // FIXME: This should work even when animation is disabled.

      Object(dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_7__["default"])(window, 'resize', _this.handleWindowResize);
    };

    _this.handleWindowResize = function () {
      _this.updateDialogStyle(_this._modal.dialog);
    };

    _this.getModalManager = function () {
      if (_this.props.manager) {
        return _this.props.manager;
      }

      if (!manager) {
        manager = new _BootstrapModalManager__WEBPACK_IMPORTED_MODULE_11__["default"]();
      }

      return manager;
    };

    _this.renderBackdrop = function (props) {
      var _this$props4 = _this.props,
          bsPrefix = _this$props4.bsPrefix,
          backdropClassName = _this$props4.backdropClassName,
          animation = _this$props4.animation;
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(bsPrefix + "-backdrop", backdropClassName, !animation && 'show')
      }));
    };

    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Clean up the listener if we need to.
    Object(dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_7__["default"])(window, 'resize', this.handleWindowResize);
  };

  _proto.updateDialogStyle = function updateDialogStyle(node) {
    if (!dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_5__["default"]) return;
    var containerIsOverflowing = this.getModalManager().isContainerOverflowing(this._modal);
    var modalIsOverflowing = node.scrollHeight > Object(dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_6__["default"])(node).documentElement.clientHeight;
    this.setState({
      style: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? Object(dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_8__["default"])() : undefined,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? Object(dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_8__["default"])() : undefined
      }
    });
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        bsPrefix = _this$props5.bsPrefix,
        className = _this$props5.className,
        style = _this$props5.style,
        dialogClassName = _this$props5.dialogClassName,
        children = _this$props5.children,
        Dialog = _this$props5.dialogAs,
        show = _this$props5.show,
        animation = _this$props5.animation,
        backdrop = _this$props5.backdrop,
        keyboard = _this$props5.keyboard,
        onEscapeKeyDown = _this$props5.onEscapeKeyDown,
        onShow = _this$props5.onShow,
        onHide = _this$props5.onHide,
        container = _this$props5.container,
        autoFocus = _this$props5.autoFocus,
        enforceFocus = _this$props5.enforceFocus,
        restoreFocus = _this$props5.restoreFocus,
        restoreFocusOptions = _this$props5.restoreFocusOptions,
        onEntered = _this$props5.onEntered,
        onExit = _this$props5.onExit,
        onExiting = _this$props5.onExiting,
        _ = _this$props5.onExited,
        _1 = _this$props5.onEntering,
        _6 = _this$props5.onEnter,
        _4 = _this$props5.onEntering,
        _2 = _this$props5.backdropClassName,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props5, ["bsPrefix", "className", "style", "dialogClassName", "children", "dialogAs", "show", "animation", "backdrop", "keyboard", "onEscapeKeyDown", "onShow", "onHide", "container", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "onEntered", "onExit", "onExiting", "onExited", "onEntering", "onEnter", "onEntering", "backdropClassName"]);

    var clickHandler = backdrop === true ? this.handleClick : null;

    var baseModalStyle = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, style, {}, this.state.style); // Sets `display` always block when `animation` is false


    if (!animation) baseModalStyle.display = 'block';
    return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_ModalContext__WEBPACK_IMPORTED_MODULE_14__["default"].Provider, {
      value: this.modalContext
    }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_overlays_Modal__WEBPACK_IMPORTED_MODULE_10__["default"], {
      show: show,
      backdrop: backdrop,
      container: container,
      keyboard: keyboard,
      autoFocus: autoFocus,
      enforceFocus: enforceFocus,
      restoreFocus: restoreFocus,
      restoreFocusOptions: restoreFocusOptions,
      onEscapeKeyDown: onEscapeKeyDown,
      onShow: onShow,
      onHide: onHide,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      manager: this.getModalManager(),
      ref: this.setModalRef,
      style: baseModalStyle,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix),
      containerClassName: bsPrefix + "-open",
      transition: animation ? DialogTransition : undefined,
      backdropTransition: animation ? BackdropTransition : undefined,
      renderBackdrop: this.renderBackdrop,
      onClick: clickHandler,
      onMouseUp: this.handleMouseUp,
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onExited: this.handleExited
    }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Dialog, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
      onMouseDown: this.handleDialogMouseDown,
      className: dialogClassName
    }), children)));
  };

  return Modal;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);

Modal.defaultProps = defaultProps;
var DecoratedModal = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_19__["createBootstrapComponent"])(Modal, 'modal');
DecoratedModal.Body = _ModalBody__WEBPACK_IMPORTED_MODULE_13__["default"];
DecoratedModal.Header = _ModalHeader__WEBPACK_IMPORTED_MODULE_17__["default"];
DecoratedModal.Title = _ModalTitle__WEBPACK_IMPORTED_MODULE_18__["default"];
DecoratedModal.Footer = _ModalFooter__WEBPACK_IMPORTED_MODULE_16__["default"];
DecoratedModal.Dialog = _ModalDialog__WEBPACK_IMPORTED_MODULE_15__["default"];
DecoratedModal.TRANSITION_DURATION = 300;
DecoratedModal.BACKDROP_TRANSITION_DURATION = 150;
/* harmony default export */ __webpack_exports__["default"] = (DecoratedModal);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalBody.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalBody.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-body'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalContext.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalContext.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ModalContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  onHide: function onHide() {}
});
/* harmony default export */ __webpack_exports__["default"] = (ModalContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalDialog.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalDialog.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var ModalDialog = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      centered = _ref.centered,
      size = _ref.size,
      children = _ref.children,
      scrollable = _ref.scrollable,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "centered", "size", "children", "scrollable"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'modal');
  var dialogClass = bsPrefix + "-dialog";
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(dialogClass, className, size && bsPrefix + "-" + size, centered && dialogClass + "-centered", scrollable && dialogClass + "-scrollable")
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: bsPrefix + "-content"
  }, children));
});
ModalDialog.displayName = 'ModalDialog';
/* harmony default export */ __webpack_exports__["default"] = (ModalDialog);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalFooter.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalFooter.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-footer'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalHeader.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalHeader.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony import */ var _ModalContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ModalContext */ "./node_modules/react-bootstrap/esm/ModalContext.js");








var defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};
var ModalHeader = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      onHide = _ref.onHide,
      className = _ref.className,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "closeLabel", "closeButton", "onHide", "className", "children"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'modal-header');
  var context = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_ModalContext__WEBPACK_IMPORTED_MODULE_7__["default"]);
  var handleClick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function () {
    if (context) context.onHide();
    if (onHide) onHide();
  });
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children, closeButton && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CloseButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: closeLabel,
    onClick: handleClick
  }));
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ModalHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalTitle.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalTitle.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");


var DivStyledAsH4 = Object(_divWithClassName__WEBPACK_IMPORTED_MODULE_1__["default"])('h4');
/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-title', {
  Component: DivStyledAsH4
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Overlay.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Overlay.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_overlays_Overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-overlays/Overlay */ "./node_modules/react-overlays/esm/Overlay.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");







var defaultProps = {
  transition: _Fade__WEBPACK_IMPORTED_MODULE_6__["default"],
  rootClose: false,
  show: false,
  placement: 'top'
};

function wrapRefs(props, arrowProps) {
  var ref = props.ref;
  var aRef = arrowProps.ref;

  props.ref = ref.__wrapped || (ref.__wrapped = function (r) {
    return ref(Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["findDOMNode"])(r));
  });

  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = function (r) {
    return aRef(Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["findDOMNode"])(r));
  });
}

function Overlay(_ref) {
  var overlay = _ref.children,
      transition = _ref.transition,
      outerProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["children", "transition"]);

  transition = transition === true ? _Fade__WEBPACK_IMPORTED_MODULE_6__["default"] : transition || null;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_overlays_Overlay__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, outerProps, {
    transition: transition
  }), function (_ref2) {
    var overlayProps = _ref2.props,
        arrowProps = _ref2.arrowProps,
        show = _ref2.show,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, ["props", "arrowProps", "show"]);

    wrapRefs(overlayProps, arrowProps);
    if (typeof overlay === 'function') return overlay(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {}, overlayProps, {
      show: show,
      arrowProps: arrowProps
    }));
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(overlay, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {}, overlayProps, {
      arrowProps: arrowProps,
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(overlay.props.className, !transition && show && 'show'),
      style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, overlay.props.style, {}, overlayProps.style)
    }));
  });
}

Overlay.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Overlay);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/OverlayTrigger.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/OverlayTrigger.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var dom_helpers_contains__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/contains */ "./node_modules/dom-helpers/esm/contains.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/hooks/useTimeout */ "./node_modules/@restart/hooks/esm/useTimeout.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Overlay */ "./node_modules/react-bootstrap/esm/Overlay.js");










var RefHolder =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(RefHolder, _React$Component);

  function RefHolder() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RefHolder.prototype;

  _proto.render = function render() {
    return this.props.children;
  };

  return RefHolder;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

function normalizeDelay(delay) {
  return delay && typeof delay === 'object' ? delay : {
    show: delay,
    hide: delay
  };
} // Simple implementation of mouseEnter and mouseLeave.
// React's built version is broken: https://github.com/facebook/react/issues/4251
// for cases when the trigger is disabled and mouseOut/Over can cause flicker
// moving from one child element to another.


function handleMouseOverOut(handler, e, relatedNative) {
  var target = e.currentTarget;
  var related = e.relatedTarget || e.nativeEvent[relatedNative];

  if ((!related || related !== target) && !Object(dom_helpers_contains__WEBPACK_IMPORTED_MODULE_3__["default"])(target, related)) {
    handler(e);
  }
}

var defaultProps = {
  defaultShow: false,
  trigger: ['hover', 'focus']
};

function OverlayTrigger(_ref) {
  var trigger = _ref.trigger,
      overlay = _ref.overlay,
      children = _ref.children,
      _ref$popperConfig = _ref.popperConfig,
      popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig,
      defaultShow = _ref.defaultShow,
      propsDelay = _ref.delay,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["trigger", "overlay", "children", "popperConfig", "defaultShow", "delay"]);

  var triggerNodeRef = Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])(null);
  var timeout = Object(_restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_5__["default"])();
  var hoverStateRef = Object(react__WEBPACK_IMPORTED_MODULE_4__["useRef"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(!!defaultShow),
      show = _useState[0],
      setShow = _useState[1];

  var delay = normalizeDelay(propsDelay);
  var child = react__WEBPACK_IMPORTED_MODULE_4___default.a.Children.only(children);
  var _child$props = child.props,
      onFocus = _child$props.onFocus,
      onBlur = _child$props.onBlur,
      onClick = _child$props.onClick;
  var getTarget = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function () {
    return react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.findDOMNode(triggerNodeRef.current);
  }, []);
  var handleShow = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function () {
    timeout.clear();
    hoverStateRef.current = 'show';

    if (!delay.show) {
      setShow(true);
      return;
    }

    timeout.set(function () {
      if (hoverStateRef.current === 'show') setShow(true);
    }, delay.show);
  }, [delay.show, timeout]);
  var handleHide = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function () {
    timeout.clear();
    hoverStateRef.current = 'hide';

    if (!delay.hide) {
      setShow(false);
      return;
    }

    timeout.set(function () {
      if (hoverStateRef.current === 'hide') setShow(false);
    }, delay.hide);
  }, [delay.hide, timeout]);
  var handleFocus = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (e) {
    handleShow(e);
    if (onFocus) onFocus(e);
  }, [handleShow, onFocus]);
  var handleBlur = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (e) {
    handleHide(e);
    if (onBlur) onBlur(e);
  }, [handleHide, onBlur]);
  var handleClick = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (e) {
    setShow(function (prevShow) {
      return !prevShow;
    });
    if (onClick) onClick(e);
  }, [onClick]);
  var handleMouseOver = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (e) {
    handleMouseOverOut(handleShow, e, 'fromElement');
  }, [handleShow]);
  var handleMouseOut = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (e) {
    handleMouseOverOut(handleHide, e, 'toElement');
  }, [handleHide]); // We add aria-describedby in the case where the overlay is a role="tooltip"
  // for other cases describedby isn't appropriate (e.g. a popover with inputs) so we don't add it.

  var ariaModifier = {
    enabled: true,
    order: 900,
    fn: function fn(data) {
      var popper = data.instance.popper;
      var target = getTarget();
      if (!show || !target) return data;
      var role = popper.getAttribute('role') || '';

      if (popper.id && role.toLowerCase() === 'tooltip') {
        target.setAttribute('aria-describedby', popper.id);
      }

      return data;
    }
  };
  var triggers = trigger == null ? [] : [].concat(trigger);
  var triggerProps = {};

  if (triggers.indexOf('click') !== -1) {
    triggerProps.onClick = handleClick;
  }

  if (triggers.indexOf('focus') !== -1) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }

  if (triggers.indexOf('hover') !== -1) {
     true ? warning__WEBPACK_IMPORTED_MODULE_7___default()(triggers.length > 1, '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibility of the overlay to just mouse users. Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.') : undefined;
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
  }

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(RefHolder, {
    ref: triggerNodeRef
  }, Object(react__WEBPACK_IMPORTED_MODULE_4__["cloneElement"])(child, triggerProps)), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_8__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    popperConfig: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, popperConfig, {
      modifiers: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, popperConfig.modifiers, {
        ariaModifier: ariaModifier
      })
    }),
    show: show,
    onHide: handleHide,
    target: getTarget
  }), overlay));
}

OverlayTrigger.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (OverlayTrigger);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/PageItem.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/PageItem.js ***!
  \******************************************************/
/*! exports provided: default, First, Prev, Ellipsis, Next, Last */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "First", function() { return First; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prev", function() { return Prev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ellipsis", function() { return Ellipsis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Next", function() { return Next; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Last", function() { return Last; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/esm/SafeAnchor.js");




/* eslint-disable react/no-multi-comp */



var defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};
var PageItem = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (_ref, ref) {
  var active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style,
      activeLabel = _ref.activeLabel,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, ["active", "disabled", "className", "style", "activeLabel", "children"]);

  var Component = active || disabled ? 'span' : _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__["default"];
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    ref: ref,
    style: style,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, 'page-item', {
      active: active,
      disabled: disabled
    })
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    className: "page-link",
    disabled: disabled
  }, props), children, active && activeLabel && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
    className: "sr-only"
  }, activeLabel)));
});
PageItem.defaultProps = defaultProps;
PageItem.displayName = 'PageItem';
/* harmony default export */ __webpack_exports__["default"] = (PageItem);

function createButton(name, defaultValue, label) {
  var _class, _temp;

  if (label === void 0) {
    label = name;
  }

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_class, _React$Component);

    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(_this$props, ["children"]);

      delete props.active;
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(PageItem, props, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        "aria-hidden": "true"
      }, children || defaultValue), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "sr-only"
      }, label));
    };

    return _class;
  }(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component), _class.displayName = name, _temp;
}

var First = createButton('First', '«');
var Prev = createButton('Prev', '‹', 'Previous');
var Ellipsis = createButton('Ellipsis', '…', 'More');
var Next = createButton('Next', '›');
var Last = createButton('Last', '»');

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Pagination.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Pagination.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _PageItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PageItem */ "./node_modules/react-bootstrap/esm/PageItem.js");







/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */
var Pagination = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      size = _ref.size,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "size"]);

  var decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'pagination');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, decoratedBsPrefix, size && decoratedBsPrefix + "-" + size)
  }), children);
});
Pagination.First = _PageItem__WEBPACK_IMPORTED_MODULE_5__["First"];
Pagination.Prev = _PageItem__WEBPACK_IMPORTED_MODULE_5__["Prev"];
Pagination.Ellipsis = _PageItem__WEBPACK_IMPORTED_MODULE_5__["Ellipsis"];
Pagination.Item = _PageItem__WEBPACK_IMPORTED_MODULE_5__["default"];
Pagination.Next = _PageItem__WEBPACK_IMPORTED_MODULE_5__["Next"];
Pagination.Last = _PageItem__WEBPACK_IMPORTED_MODULE_5__["Last"];
/* harmony default export */ __webpack_exports__["default"] = (Pagination);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Popover.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Popover.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js");
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _PopoverTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PopoverTitle */ "./node_modules/react-bootstrap/esm/PopoverTitle.js");
/* harmony import */ var _PopoverContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PopoverContent */ "./node_modules/react-bootstrap/esm/PopoverContent.js");








var defaultProps = {
  placement: 'right'
};
var Popover = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      content = _ref.content,
      arrowProps = _ref.arrowProps,
      _ = _ref.scheduleUpdate,
      _1 = _ref.outOfBoundaries,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "placement", "className", "style", "children", "content", "arrowProps", "scheduleUpdate", "outOfBoundaries"]);

  var decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'popover');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    role: "tooltip",
    style: style,
    "x-placement": placement,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, decoratedBsPrefix, "bs-popover-" + placement)
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "arrow"
  }, arrowProps)), content ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_PopoverContent__WEBPACK_IMPORTED_MODULE_7__["default"], null, children) : children);
});
Popover.defaultProps = defaultProps;
Popover.Title = _PopoverTitle__WEBPACK_IMPORTED_MODULE_6__["default"];
Popover.Content = _PopoverContent__WEBPACK_IMPORTED_MODULE_7__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Popover);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/PopoverContent.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/PopoverContent.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var PopoverContent = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["as", "bsPrefix", "className", "children"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'popover-body');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children);
});
/* harmony default export */ __webpack_exports__["default"] = (PopoverContent);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/PopoverTitle.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/PopoverTitle.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var PopoverTitle = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["as", "bsPrefix", "className", "children"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'popover-header');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(bsPrefix, className)
  }), children);
});
/* harmony default export */ __webpack_exports__["default"] = (PopoverTitle);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ProgressBar.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ProgressBar.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");






var ROUND_PRECISION = 1000;
/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */

function onlyProgressBar(props, propName, componentName) {
  var children = props[propName];

  if (!children) {
    return null;
  }

  var error = null;
  react__WEBPACK_IMPORTED_MODULE_3___default.a.Children.forEach(children, function (child) {
    if (error) {
      return;
    }
    /**
     * Compare types in a way that works with libraries that patch and proxy
     * components like react-hot-loader.
     *
     * see https://github.com/gaearon/react-hot-loader#checking-element-types
     */


    var element = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ProgressBar, null);
    if (child.type === element.type) return;
    var childIdentifier = react__WEBPACK_IMPORTED_MODULE_3___default.a.isValidElement(child) ? child.type.displayName || child.type.name || child.type : child;
    error = new Error("Children of " + componentName + " can contain only ProgressBar " + ("components. Found " + childIdentifier + "."));
  });
  return error;
}

var defaultProps = {
  min: 0,
  max: 100,
  animated: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  var percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

function renderProgressBar(_ref, ref) {
  var _classNames;

  var min = _ref.min,
      now = _ref.now,
      max = _ref.max,
      label = _ref.label,
      srOnly = _ref.srOnly,
      striped = _ref.striped,
      animated = _ref.animated,
      className = _ref.className,
      style = _ref.style,
      variant = _ref.variant,
      bsPrefix = _ref.bsPrefix,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["min", "now", "max", "label", "srOnly", "striped", "animated", "className", "style", "variant", "bsPrefix"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    role: "progressbar",
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix + "-bar", (_classNames = {}, _classNames["bg-" + variant] = variant, _classNames[bsPrefix + "-bar-animated"] = animated, _classNames[bsPrefix + "-bar-striped"] = animated || striped, _classNames)),
    style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      width: getPercentage(now, min, max) + "%"
    }, style),
    "aria-valuenow": now,
    "aria-valuemin": min,
    "aria-valuemax": max
  }), srOnly ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "sr-only"
  }, label) : label);
}

var ProgressBar = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref2, ref) {
  var isChild = _ref2.isChild,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, ["isChild"]);

  props.bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(props.bsPrefix, 'progress');

  if (isChild) {
    return renderProgressBar(props, ref);
  }

  var min = props.min,
      now = props.now,
      max = props.max,
      label = props.label,
      srOnly = props.srOnly,
      striped = props.striped,
      animated = props.animated,
      bsPrefix = props.bsPrefix,
      variant = props.variant,
      className = props.className,
      children = props.children,
      wrapperProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["min", "now", "max", "label", "srOnly", "striped", "animated", "bsPrefix", "variant", "className", "children"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, wrapperProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children ? Object(_ElementChildren__WEBPACK_IMPORTED_MODULE_5__["map"])(children, function (child) {
    return Object(react__WEBPACK_IMPORTED_MODULE_3__["cloneElement"])(child, {
      isChild: true
    });
  }) : renderProgressBar({
    min: min,
    now: now,
    max: max,
    label: label,
    srOnly: srOnly,
    striped: striped,
    animated: animated,
    bsPrefix: bsPrefix,
    variant: variant
  }, ref));
});
ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ResponsiveEmbed.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ResponsiveEmbed.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var defaultProps = {
  aspectRatio: '1by1'
};
var ResponsiveEmbed = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      aspectRatio = _ref.aspectRatio,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "aspectRatio"]);

  var decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'embed-responsive');
  var child = react__WEBPACK_IMPORTED_MODULE_3___default.a.Children.only(children);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(decoratedBsPrefix, className, aspectRatio && decoratedBsPrefix + "-" + aspectRatio)
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.cloneElement(child, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(child.props.className, decoratedBsPrefix + "-item")
  }));
});
ResponsiveEmbed.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ResponsiveEmbed);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Spinner.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Spinner.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var Spinner = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      animation = _ref.animation,
      size = _ref.size,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "variant", "animation", "size", "children", "as", "className"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'spinner');
  var bsSpinnerPrefix = bsPrefix + "-" + animation;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsSpinnerPrefix, size && bsSpinnerPrefix + "-" + size, variant && "text-" + variant)
  }), children);
});
Spinner.displayName = 'Spinner';
/* harmony default export */ __webpack_exports__["default"] = (Spinner);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/SplitButton.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/SplitButton.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/esm/ButtonGroup.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");







var propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any,

  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** An `href` passed to the non-toggle Button */
  href: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** An anchor `target` passed to the non-toggle Button */
  target: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** An `onClick` handler passed to the non-toggle Button */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** The content of the non-toggle Button.  */
  title: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node.isRequired,

  /** A `type` passed to the non-toggle Button */
  type: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** Disables both Buttons  */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  bsPrefix: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
};
var defaultProps = {
  toggleLabel: 'Toggle dropdown',
  type: 'button'
};
var SplitButton = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      size = _ref.size,
      variant = _ref.variant,
      title = _ref.title,
      type = _ref.type,
      toggleLabel = _ref.toggleLabel,
      children = _ref.children,
      onClick = _ref.onClick,
      href = _ref.href,
      target = _ref.target,
      menuRole = _ref.menuRole,
      rootCloseEvent = _ref.rootCloseEvent,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["id", "bsPrefix", "size", "variant", "title", "type", "toggleLabel", "children", "onClick", "href", "target", "menuRole", "rootCloseEvent"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    as: _ButtonGroup__WEBPACK_IMPORTED_MODULE_5__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: size,
    variant: variant,
    disabled: props.disabled,
    bsPrefix: bsPrefix,
    href: href,
    target: target,
    onClick: onClick,
    type: type
  }, title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_6__["default"].Toggle, {
    split: true,
    id: id,
    size: size,
    variant: variant,
    disabled: props.disabled,
    childBsPrefix: bsPrefix
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "sr-only"
  }, toggleLabel)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_6__["default"].Menu, {
    role: menuRole,
    rootCloseEvent: rootCloseEvent
  }, children));
});
SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;
SplitButton.displayName = 'SplitButton';
/* harmony default export */ __webpack_exports__["default"] = (SplitButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Tab.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Tab.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/esm/TabContainer.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/esm/TabContent.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/esm/TabPane.js");





/* eslint-disable react/require-render-return, react/no-unused-prop-types */

var Tab =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Tab, _React$Component);

  function Tab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.render = function render() {
    throw new Error('ReactBootstrap: The `Tab` component is not meant to be rendered! ' + "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " + 'For custom tabs components use TabPane and TabsContainer directly');
  };

  return Tab;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

Tab.Container = _TabContainer__WEBPACK_IMPORTED_MODULE_2__["default"];
Tab.Content = _TabContent__WEBPACK_IMPORTED_MODULE_3__["default"];
Tab.Pane = _TabPane__WEBPACK_IMPORTED_MODULE_4__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Tab);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/TabContainer.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/TabContainer.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabContext */ "./node_modules/react-bootstrap/esm/TabContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/esm/SelectableContext.js");




/* eslint-disable react/no-unused-prop-types */

var TabContainer = function TabContainer(props) {
  var _useUncontrolled = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_1__["useUncontrolled"])(props, {
    activeKey: 'onSelect'
  }),
      id = _useUncontrolled.id,
      generateCustomChildId = _useUncontrolled.generateChildId,
      onSelect = _useUncontrolled.onSelect,
      activeKey = _useUncontrolled.activeKey,
      transition = _useUncontrolled.transition,
      mountOnEnter = _useUncontrolled.mountOnEnter,
      unmountOnExit = _useUncontrolled.unmountOnExit,
      children = _useUncontrolled.children;

  var generateChildId = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return generateCustomChildId || function (key, type) {
      return id ? id + "-" + type + "-" + key : null;
    };
  }, [id, generateCustomChildId]);
  var tabContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return {
      onSelect: onSelect,
      activeKey: activeKey,
      transition: transition,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit,
      getControlledId: function getControlledId(key) {
        return generateChildId(key, 'tabpane');
      },
      getControllerId: function getControllerId(key) {
        return generateChildId(key, 'tab');
      }
    };
  }, [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TabContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: tabContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__["default"].Provider, {
    value: onSelect
  }, children));
};

/* harmony default export */ __webpack_exports__["default"] = (TabContainer);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/TabContent.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/TabContent.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var TabContent = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "as", "className"]);

  var decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'tab-content');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, decoratedBsPrefix)
  }));
});
/* harmony default export */ __webpack_exports__["default"] = (TabContent);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/TabPane.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/TabPane.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TabContext */ "./node_modules/react-bootstrap/esm/TabContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/esm/SelectableContext.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");









function useTabContext(props) {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_TabContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  if (!context) return props;

  var activeKey = context.activeKey,
      getControlledId = context.getControlledId,
      getControllerId = context.getControllerId,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(context, ["activeKey", "getControlledId", "getControllerId"]);

  var shouldTransition = props.transition !== false && rest.transition !== false;
  var key = Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(props.eventKey);
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    active: props.active == null && key != null ? Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(activeKey) === key : props.active,
    id: getControlledId(props.eventKey),
    'aria-labelledby': getControllerId(props.eventKey),
    transition: shouldTransition && (props.transition || rest.transition || _Fade__WEBPACK_IMPORTED_MODULE_7__["default"]),
    mountOnEnter: props.mountOnEnter != null ? props.mountOnEnter : rest.mountOnEnter,
    unmountOnExit: props.unmountOnExit != null ? props.unmountOnExit : rest.unmountOnExit
  });
}

var TabPane = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
  var _useTabContext = useTabContext(props),
      bsPrefix = _useTabContext.bsPrefix,
      className = _useTabContext.className,
      active = _useTabContext.active,
      onEnter = _useTabContext.onEnter,
      onEntering = _useTabContext.onEntering,
      onEntered = _useTabContext.onEntered,
      onExit = _useTabContext.onExit,
      onExiting = _useTabContext.onExiting,
      onExited = _useTabContext.onExited,
      mountOnEnter = _useTabContext.mountOnEnter,
      unmountOnExit = _useTabContext.unmountOnExit,
      Transition = _useTabContext.transition,
      _useTabContext$as = _useTabContext.as,
      Component = _useTabContext$as === void 0 ? 'div' : _useTabContext$as,
      _ = _useTabContext.eventKey,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useTabContext, ["bsPrefix", "className", "active", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit", "transition", "as", "eventKey"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'tab-pane');
  if (!active && unmountOnExit) return null;
  var pane = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    ref: ref,
    role: "tabpanel",
    "aria-hidden": !active,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, {
      active: active
    })
  }));
  if (Transition) pane = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Transition, {
    in: active,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit
  }, pane); // We provide an empty the TabContext so `<Nav>`s in `<TabPane>`s don't
  // conflict with the top level one.

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_TabContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
    value: null
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: null
  }, pane));
});
TabPane.displayName = 'TabPane';
/* harmony default export */ __webpack_exports__["default"] = (TabPane);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Table.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Table.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");





var Table = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      striped = _ref.striped,
      bordered = _ref.bordered,
      borderless = _ref.borderless,
      hover = _ref.hover,
      size = _ref.size,
      variant = _ref.variant,
      responsive = _ref.responsive,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "striped", "bordered", "borderless", "hover", "size", "variant", "responsive"]);

  var decoratedBsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'table');
  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, decoratedBsPrefix, variant && decoratedBsPrefix + "-" + variant, size && decoratedBsPrefix + "-" + size, striped && decoratedBsPrefix + "-striped", bordered && decoratedBsPrefix + "-bordered", borderless && decoratedBsPrefix + "-borderless", hover && decoratedBsPrefix + "-hover");
  var table = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("table", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    className: classes,
    ref: ref
  }));

  if (responsive) {
    var responsiveClass = decoratedBsPrefix + "-responsive";

    if (typeof responsive === 'string') {
      responsiveClass = responsiveClass + "-" + responsive;
    }

    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: responsiveClass
    }, table);
  }

  return table;
});
/* harmony default export */ __webpack_exports__["default"] = (Table);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Tabs.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Tabs.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js");
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Nav */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/esm/NavLink.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/esm/NavItem.js");
/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/esm/TabContainer.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/esm/TabContent.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/esm/TabPane.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");












var defaultProps = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  var defaultActiveKey;
  Object(_ElementChildren__WEBPACK_IMPORTED_MODULE_11__["forEach"])(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

function renderTab(child) {
  var _child$props = child.props,
      title = _child$props.title,
      eventKey = _child$props.eventKey,
      disabled = _child$props.disabled,
      tabClassName = _child$props.tabClassName;

  if (title == null) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_NavItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
    as: _NavLink__WEBPACK_IMPORTED_MODULE_6__["default"],
    eventKey: eventKey,
    disabled: disabled,
    className: tabClassName
  }, title);
}

var Tabs = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (props, ref) {
  var _useUncontrolled = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_4__["useUncontrolled"])(props, {
    activeKey: 'onSelect'
  }),
      id = _useUncontrolled.id,
      onSelect = _useUncontrolled.onSelect,
      transition = _useUncontrolled.transition,
      mountOnEnter = _useUncontrolled.mountOnEnter,
      unmountOnExit = _useUncontrolled.unmountOnExit,
      children = _useUncontrolled.children,
      _useUncontrolled$acti = _useUncontrolled.activeKey,
      activeKey = _useUncontrolled$acti === void 0 ? getDefaultActiveKey(children) : _useUncontrolled$acti,
      controlledProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["id", "onSelect", "transition", "mountOnEnter", "unmountOnExit", "children", "activeKey"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TabContainer__WEBPACK_IMPORTED_MODULE_8__["default"], {
    ref: ref,
    id: id,
    activeKey: activeKey,
    onSelect: onSelect,
    transition: transition,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Nav__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, controlledProps, {
    role: "tablist",
    as: "nav"
  }), Object(_ElementChildren__WEBPACK_IMPORTED_MODULE_11__["map"])(children, renderTab)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TabContent__WEBPACK_IMPORTED_MODULE_9__["default"], null, Object(_ElementChildren__WEBPACK_IMPORTED_MODULE_11__["map"])(children, function (child) {
    var childProps = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, child.props);

    delete childProps.title;
    delete childProps.disabled;
    delete childProps.tabClassName;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TabPane__WEBPACK_IMPORTED_MODULE_10__["default"], childProps);
  })));
});
Tabs.defaultProps = defaultProps;
Tabs.displayName = 'Tabs';
/* harmony default export */ __webpack_exports__["default"] = (Tabs);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Toast.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Toast.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useTimeout */ "./node_modules/@restart/hooks/esm/useTimeout.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _ToastHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ToastHeader */ "./node_modules/react-bootstrap/esm/ToastHeader.js");
/* harmony import */ var _ToastBody__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToastBody */ "./node_modules/react-bootstrap/esm/ToastBody.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _ToastContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ToastContext */ "./node_modules/react-bootstrap/esm/ToastContext.js");










var defaultProps = {
  animation: true,
  autohide: false,
  delay: 3000,
  show: true,
  transition: _Fade__WEBPACK_IMPORTED_MODULE_5__["default"]
};
var Toast = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      Transition = _ref.transition,
      show = _ref.show,
      animation = _ref.animation,
      delay = _ref.delay,
      autohide = _ref.autohide,
      onClose = _ref.onClose,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "transition", "show", "animation", "delay", "autohide", "onClose"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__["useBootstrapPrefix"])('toast');
  var delayRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(delay);
  var onCloseRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(onClose);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    // We use refs for these, because we don't want to restart the autohide
    // timer in case these values change.
    delayRef.current = delay;
    onCloseRef.current = onClose;
  }, [delay, onClose]);
  var autohideTimeout = Object(_restart_hooks_useTimeout__WEBPACK_IMPORTED_MODULE_4__["default"])();
  var autohideFunc = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    if (!(autohide && show)) {
      return;
    }

    onCloseRef.current();
  }, [autohide, show]);
  autohideTimeout.set(autohideFunc, delayRef.current);
  var useAnimation = Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function () {
    return Transition && animation;
  }, [Transition, animation]);
  var toast = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(bsPrefix, className, !useAnimation && show && 'show'),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }), children);
  var toastContext = {
    onClose: onClose
  };
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ToastContext__WEBPACK_IMPORTED_MODULE_9__["default"].Provider, {
    value: toastContext
  }, useAnimation ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Transition, {
    in: show
  }, toast) : toast);
});
Toast.defaultProps = defaultProps;
Toast.displayName = 'Toast';
Toast.Body = _ToastBody__WEBPACK_IMPORTED_MODULE_7__["default"];
Toast.Header = _ToastHeader__WEBPACK_IMPORTED_MODULE_6__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Toast);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastBody.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastBody.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('toast-body'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastContext.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastContext.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ToastContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  onClose: function onClose() {}
});
/* harmony default export */ __webpack_exports__["default"] = (ToastContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToastHeader.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToastHeader.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony import */ var _ToastContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToastContext */ "./node_modules/react-bootstrap/esm/ToastContext.js");








var defaultProps = {
  closeLabel: 'Close',
  closeButton: true
};
var ToastHeader = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      className = _ref.className,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "closeLabel", "closeButton", "className", "children"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'toast-header');
  var context = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_ToastContext__WEBPACK_IMPORTED_MODULE_7__["default"]);
  var handleClick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function () {
    if (context) {
      context.onClose();
    }
  });
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(bsPrefix, className)
  }), children, closeButton && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CloseButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: closeLabel,
    onClick: handleClick,
    className: "ml-2 mb-1",
    "data-dismiss": "toast"
  }));
});
ToastHeader.displayName = 'ToastHeader';
ToastHeader.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ToastHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToggleButton.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToggleButton.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");






var noop = function noop() {};

var ToggleButton = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      name = _ref.name,
      className = _ref.className,
      checked = _ref.checked,
      type = _ref.type,
      onChange = _ref.onChange,
      value = _ref.value,
      disabled = _ref.disabled,
      inputRef = _ref.inputRef,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["children", "name", "className", "checked", "type", "onChange", "value", "disabled", "inputRef"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      focused = _useState[0],
      setFocused = _useState[1];

  var handleFocus = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (e) {
    if (e.target.tagName === 'INPUT') setFocused(true);
  }, []);
  var handleBlur = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (e) {
    if (e.target.tagName === 'INPUT') setFocused(false);
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, focused && 'focus', disabled && 'disabled'),
    type: null,
    active: !!checked,
    as: "label"
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    name: name,
    type: type,
    value: value,
    ref: inputRef,
    autoComplete: "off",
    checked: !!checked,
    disabled: !!disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: onChange || noop
  }), children);
});
ToggleButton.displayName = 'ToggleButton';
/* harmony default export */ __webpack_exports__["default"] = (ToggleButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ToggleButtonGroup.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ToggleButtonGroup.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _createChainedFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createChainedFunction */ "./node_modules/react-bootstrap/esm/createChainedFunction.js");
/* harmony import */ var _ElementChildren__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ElementChildren */ "./node_modules/react-bootstrap/esm/ElementChildren.js");
/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/esm/ButtonGroup.js");
/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/react-bootstrap/esm/ToggleButton.js");









var defaultProps = {
  type: 'radio'
};
var ToggleButtonGroup = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (props, ref) {
  var _useUncontrolled = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_4__["useUncontrolled"])(props, {
    value: 'onChange'
  }),
      children = _useUncontrolled.children,
      type = _useUncontrolled.type,
      name = _useUncontrolled.name,
      value = _useUncontrolled.value,
      onChange = _useUncontrolled.onChange,
      controlledProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["children", "type", "name", "value", "onChange"]);

  var getValues = function getValues() {
    return value == null ? [] : [].concat(value);
  };

  var handleToggle = function handleToggle(inputVal, event) {
    var values = getValues();
    var isActive = values.indexOf(inputVal) !== -1;

    if (type === 'radio') {
      if (!isActive) onChange(inputVal, event);
      return;
    }

    if (isActive) {
      onChange(values.filter(function (n) {
        return n !== inputVal;
      }), event);
    } else {
      onChange([].concat(values, [inputVal]), event);
    }
  };

  !(type !== 'radio' || !!name) ?  true ? invariant__WEBPACK_IMPORTED_MODULE_3___default()(false, 'A `name` is required to group the toggle buttons when the `type` ' + 'is set to "radio"') : undefined : void 0;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ButtonGroup__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, controlledProps, {
    ref: ref,
    toggle: true
  }), Object(_ElementChildren__WEBPACK_IMPORTED_MODULE_6__["map"])(children, function (child) {
    var values = getValues();
    var _child$props = child.props,
        childVal = _child$props.value,
        childOnChange = _child$props.onChange;

    var handler = function handler(e) {
      return handleToggle(childVal, e);
    };

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(child, {
      type: type,
      name: child.name || name,
      checked: values.indexOf(childVal) !== -1,
      onChange: Object(_createChainedFunction__WEBPACK_IMPORTED_MODULE_5__["default"])(childOnChange, handler)
    });
  }));
});
ToggleButtonGroup.defaultProps = defaultProps;
ToggleButtonGroup.Button = _ToggleButton__WEBPACK_IMPORTED_MODULE_8__["default"];
/* harmony default export */ __webpack_exports__["default"] = (ToggleButtonGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Tooltip.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Tooltip.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js");
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");






var defaultProps = {
  placement: 'right'
};
var Tooltip = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      arrowProps = _ref.arrowProps,
      _ = _ref.scheduleUpdate,
      _1 = _ref.outOfBoundaries,
      _2 = _ref.show,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "placement", "className", "style", "children", "arrowProps", "scheduleUpdate", "outOfBoundaries", "show"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'tooltip');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    style: style,
    role: "tooltip",
    "x-placement": placement,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, "bs-tooltip-" + placement)
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "arrow"
  }, arrowProps)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: bsPrefix + "-inner"
  }, children));
});
Tooltip.defaultProps = defaultProps;
Tooltip.displayName = 'Tooltip';
/* harmony default export */ __webpack_exports__["default"] = (Tooltip);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/divWithClassName.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/divWithClassName.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function (className) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(function (p, ref) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, p, {
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(p.className, className)
    }));
  });
});

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/index.js ***!
  \***************************************************/
/*! exports provided: Accordion, AccordionToggle, useAccordionToggle, AccordionCollapse, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardColumns, CardDeck, CardImg, CardGroup, Carousel, CarouselItem, CloseButton, Col, Collapse, Dropdown, DropdownButton, DropdownItem, Fade, Form, FormControl, FormCheck, Switch, FormGroup, FormLabel, FormText, Container, Image, Figure, InputGroup, Jumbotron, ListGroup, ListGroupItem, Media, Modal, ModalBody, ModalDialog, ModalFooter, ModalTitle, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, NavLink, Overlay, OverlayTrigger, PageItem, Pagination, Popover, PopoverContent, PopoverTitle, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, Spinner, SplitButton, Tab, TabContainer, TabContent, Table, TabPane, Tabs, ThemeProvider, ToggleButton, ToggleButtonGroup, Tooltip, Toast, ToastBody, ToastHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Accordion */ "./node_modules/react-bootstrap/esm/Accordion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Accordion", function() { return _Accordion__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _AccordionToggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccordionToggle */ "./node_modules/react-bootstrap/esm/AccordionToggle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccordionToggle", function() { return _AccordionToggle__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAccordionToggle", function() { return _AccordionToggle__WEBPACK_IMPORTED_MODULE_1__["useAccordionToggle"]; });

/* harmony import */ var _AccordionCollapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AccordionCollapse */ "./node_modules/react-bootstrap/esm/AccordionCollapse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccordionCollapse", function() { return _AccordionCollapse__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Alert */ "./node_modules/react-bootstrap/esm/Alert.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return _Alert__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Badge */ "./node_modules/react-bootstrap/esm/Badge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Badge", function() { return _Badge__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Breadcrumb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Breadcrumb */ "./node_modules/react-bootstrap/esm/Breadcrumb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Breadcrumb", function() { return _Breadcrumb__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BreadcrumbItem */ "./node_modules/react-bootstrap/esm/BreadcrumbItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbItem", function() { return _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _Button__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/esm/ButtonGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonGroup", function() { return _ButtonGroup__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _ButtonToolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ButtonToolbar */ "./node_modules/react-bootstrap/esm/ButtonToolbar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonToolbar", function() { return _ButtonToolbar__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Card */ "./node_modules/react-bootstrap/esm/Card.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return _Card__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _CardColumns__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CardColumns */ "./node_modules/react-bootstrap/esm/CardColumns.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardColumns", function() { return _CardColumns__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _CardDeck__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CardDeck */ "./node_modules/react-bootstrap/esm/CardDeck.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardDeck", function() { return _CardDeck__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _CardImg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CardImg */ "./node_modules/react-bootstrap/esm/CardImg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardImg", function() { return _CardImg__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _CardGroup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./CardGroup */ "./node_modules/react-bootstrap/esm/CardGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardGroup", function() { return _CardGroup__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Carousel */ "./node_modules/react-bootstrap/esm/Carousel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return _Carousel__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _CarouselItem__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./CarouselItem */ "./node_modules/react-bootstrap/esm/CarouselItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CarouselItem", function() { return _CarouselItem__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CloseButton", function() { return _CloseButton__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _Col__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Col */ "./node_modules/react-bootstrap/esm/Col.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Col", function() { return _Col__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Collapse */ "./node_modules/react-bootstrap/esm/Collapse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collapse", function() { return _Collapse__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return _Dropdown__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _DropdownButton__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./DropdownButton */ "./node_modules/react-bootstrap/esm/DropdownButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownButton", function() { return _DropdownButton__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./DropdownItem */ "./node_modules/react-bootstrap/esm/DropdownItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownItem", function() { return _DropdownItem__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fade", function() { return _Fade__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Form */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return _Form__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _FormControl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./FormControl */ "./node_modules/react-bootstrap/esm/FormControl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormControl", function() { return _FormControl__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _FormCheck__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./FormCheck */ "./node_modules/react-bootstrap/esm/FormCheck.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormCheck", function() { return _FormCheck__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _Switch__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Switch */ "./node_modules/react-bootstrap/esm/Switch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return _Switch__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _FormGroup__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./FormGroup */ "./node_modules/react-bootstrap/esm/FormGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormGroup", function() { return _FormGroup__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _FormLabel__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./FormLabel */ "./node_modules/react-bootstrap/esm/FormLabel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormLabel", function() { return _FormLabel__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _FormText__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./FormText */ "./node_modules/react-bootstrap/esm/FormText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormText", function() { return _FormText__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Container */ "./node_modules/react-bootstrap/esm/Container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return _Container__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Image */ "./node_modules/react-bootstrap/esm/Image.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _Image__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _Figure__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./Figure */ "./node_modules/react-bootstrap/esm/Figure.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Figure", function() { return _Figure__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _InputGroup__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./InputGroup */ "./node_modules/react-bootstrap/esm/InputGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputGroup", function() { return _InputGroup__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony import */ var _Jumbotron__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Jumbotron */ "./node_modules/react-bootstrap/esm/Jumbotron.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Jumbotron", function() { return _Jumbotron__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _ListGroup__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./ListGroup */ "./node_modules/react-bootstrap/esm/ListGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListGroup", function() { return _ListGroup__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony import */ var _ListGroupItem__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./ListGroupItem */ "./node_modules/react-bootstrap/esm/ListGroupItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListGroupItem", function() { return _ListGroupItem__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _Media__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Media */ "./node_modules/react-bootstrap/esm/Media.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Media", function() { return _Media__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Modal */ "./node_modules/react-bootstrap/esm/Modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _Modal__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony import */ var _ModalBody__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./ModalBody */ "./node_modules/react-bootstrap/esm/ModalBody.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBody", function() { return _ModalBody__WEBPACK_IMPORTED_MODULE_40__["default"]; });

/* harmony import */ var _ModalDialog__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./ModalDialog */ "./node_modules/react-bootstrap/esm/ModalDialog.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalDialog", function() { return _ModalDialog__WEBPACK_IMPORTED_MODULE_41__["default"]; });

/* harmony import */ var _ModalFooter__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./ModalFooter */ "./node_modules/react-bootstrap/esm/ModalFooter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalFooter", function() { return _ModalFooter__WEBPACK_IMPORTED_MODULE_42__["default"]; });

/* harmony import */ var _ModalTitle__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./ModalTitle */ "./node_modules/react-bootstrap/esm/ModalTitle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalTitle", function() { return _ModalTitle__WEBPACK_IMPORTED_MODULE_43__["default"]; });

/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./Nav */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Nav", function() { return _Nav__WEBPACK_IMPORTED_MODULE_44__["default"]; });

/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./Navbar */ "./node_modules/react-bootstrap/esm/Navbar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navbar", function() { return _Navbar__WEBPACK_IMPORTED_MODULE_45__["default"]; });

/* harmony import */ var _NavbarBrand__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./NavbarBrand */ "./node_modules/react-bootstrap/esm/NavbarBrand.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarBrand", function() { return _NavbarBrand__WEBPACK_IMPORTED_MODULE_46__["default"]; });

/* harmony import */ var _NavDropdown__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./NavDropdown */ "./node_modules/react-bootstrap/esm/NavDropdown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavDropdown", function() { return _NavDropdown__WEBPACK_IMPORTED_MODULE_47__["default"]; });

/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/esm/NavItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavItem", function() { return _NavItem__WEBPACK_IMPORTED_MODULE_48__["default"]; });

/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/esm/NavLink.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return _NavLink__WEBPACK_IMPORTED_MODULE_49__["default"]; });

/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./Overlay */ "./node_modules/react-bootstrap/esm/Overlay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Overlay", function() { return _Overlay__WEBPACK_IMPORTED_MODULE_50__["default"]; });

/* harmony import */ var _OverlayTrigger__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./OverlayTrigger */ "./node_modules/react-bootstrap/esm/OverlayTrigger.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OverlayTrigger", function() { return _OverlayTrigger__WEBPACK_IMPORTED_MODULE_51__["default"]; });

/* harmony import */ var _PageItem__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./PageItem */ "./node_modules/react-bootstrap/esm/PageItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageItem", function() { return _PageItem__WEBPACK_IMPORTED_MODULE_52__["default"]; });

/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./Pagination */ "./node_modules/react-bootstrap/esm/Pagination.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pagination", function() { return _Pagination__WEBPACK_IMPORTED_MODULE_53__["default"]; });

/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./Popover */ "./node_modules/react-bootstrap/esm/Popover.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popover", function() { return _Popover__WEBPACK_IMPORTED_MODULE_54__["default"]; });

/* harmony import */ var _PopoverContent__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./PopoverContent */ "./node_modules/react-bootstrap/esm/PopoverContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverContent", function() { return _PopoverContent__WEBPACK_IMPORTED_MODULE_55__["default"]; });

/* harmony import */ var _PopoverTitle__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./PopoverTitle */ "./node_modules/react-bootstrap/esm/PopoverTitle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverTitle", function() { return _PopoverTitle__WEBPACK_IMPORTED_MODULE_56__["default"]; });

/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./ProgressBar */ "./node_modules/react-bootstrap/esm/ProgressBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return _ProgressBar__WEBPACK_IMPORTED_MODULE_57__["default"]; });

/* harmony import */ var _ResponsiveEmbed__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./ResponsiveEmbed */ "./node_modules/react-bootstrap/esm/ResponsiveEmbed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveEmbed", function() { return _ResponsiveEmbed__WEBPACK_IMPORTED_MODULE_58__["default"]; });

/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./Row */ "./node_modules/react-bootstrap/esm/Row.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return _Row__WEBPACK_IMPORTED_MODULE_59__["default"]; });

/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/esm/SafeAnchor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SafeAnchor", function() { return _SafeAnchor__WEBPACK_IMPORTED_MODULE_60__["default"]; });

/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./Spinner */ "./node_modules/react-bootstrap/esm/Spinner.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return _Spinner__WEBPACK_IMPORTED_MODULE_61__["default"]; });

/* harmony import */ var _SplitButton__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./SplitButton */ "./node_modules/react-bootstrap/esm/SplitButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SplitButton", function() { return _SplitButton__WEBPACK_IMPORTED_MODULE_62__["default"]; });

/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./Tab */ "./node_modules/react-bootstrap/esm/Tab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return _Tab__WEBPACK_IMPORTED_MODULE_63__["default"]; });

/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/esm/TabContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabContainer", function() { return _TabContainer__WEBPACK_IMPORTED_MODULE_64__["default"]; });

/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/esm/TabContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabContent", function() { return _TabContent__WEBPACK_IMPORTED_MODULE_65__["default"]; });

/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./Table */ "./node_modules/react-bootstrap/esm/Table.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _Table__WEBPACK_IMPORTED_MODULE_66__["default"]; });

/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/esm/TabPane.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabPane", function() { return _TabPane__WEBPACK_IMPORTED_MODULE_67__["default"]; });

/* harmony import */ var _Tabs__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./Tabs */ "./node_modules/react-bootstrap/esm/Tabs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return _Tabs__WEBPACK_IMPORTED_MODULE_68__["default"]; });

/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return _ThemeProvider__WEBPACK_IMPORTED_MODULE_69__["default"]; });

/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/react-bootstrap/esm/ToggleButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return _ToggleButton__WEBPACK_IMPORTED_MODULE_70__["default"]; });

/* harmony import */ var _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./ToggleButtonGroup */ "./node_modules/react-bootstrap/esm/ToggleButtonGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButtonGroup", function() { return _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_71__["default"]; });

/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _Tooltip__WEBPACK_IMPORTED_MODULE_72__["default"]; });

/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./Toast */ "./node_modules/react-bootstrap/esm/Toast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toast", function() { return _Toast__WEBPACK_IMPORTED_MODULE_73__["default"]; });

/* harmony import */ var _ToastBody__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./ToastBody */ "./node_modules/react-bootstrap/esm/ToastBody.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToastBody", function() { return _ToastBody__WEBPACK_IMPORTED_MODULE_74__["default"]; });

/* harmony import */ var _ToastHeader__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./ToastHeader */ "./node_modules/react-bootstrap/esm/ToastHeader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToastHeader", function() { return _ToastHeader__WEBPACK_IMPORTED_MODULE_75__["default"]; });



























































































































































/***/ }),

/***/ "./node_modules/react-overlays/esm/Modal.js":
/*!**************************************************!*\
  !*** ./node_modules/react-overlays/esm/Modal.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/activeElement */ "./node_modules/dom-helpers/esm/activeElement.js");
/* harmony import */ var dom_helpers_contains__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/contains */ "./node_modules/dom-helpers/esm/contains.js");
/* harmony import */ var dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dom-helpers/canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");
/* harmony import */ var dom_helpers_listen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dom-helpers/listen */ "./node_modules/dom-helpers/esm/listen.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ModalManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ModalManager */ "./node_modules/react-overlays/esm/ModalManager.js");
/* harmony import */ var _utils_ownerDocument__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/ownerDocument */ "./node_modules/react-overlays/esm/utils/ownerDocument.js");
/* harmony import */ var _utils_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/useWaitForDOMRef */ "./node_modules/react-overlays/esm/utils/useWaitForDOMRef.js");





/* eslint-disable react/prop-types */











function omitProps(props, propTypes) {
  var keys = Object.keys(props);
  var newProps = {};
  keys.forEach(function (prop) {
    if (!Object.prototype.hasOwnProperty.call(propTypes, prop)) {
      newProps[prop] = props[prop];
    }
  });
  return newProps;
}

var manager;
/**
 * Love them or hate them, `<Modal />` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
 * The Modal component renders its `children` node in front of a backdrop component.
 *
 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
 *
 * - Manages dialog stacking when one-at-a-time just isn't enough.
 * - Creates a backdrop, for disabling interaction below the modal.
 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
 * - It disables scrolling of the page content while open.
 * - Adds the appropriate ARIA roles are automatically.
 * - Easily pluggable animations via a `<Transition/>` component.
 *
 * Note that, in the same way the backdrop element prevents users from clicking or interacting
 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
 * interact with page content while the Modal is open. To do this, we use a common technique of applying
 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
 * React hierarchy (such as the default: document.body).
 */

var Modal =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__["default"])(Modal, _React$Component);

  function Modal() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.state = {
      exited: !_this.props.show
    };

    _this.onShow = function () {
      var _this$props = _this.props,
          container = _this$props.container,
          containerClassName = _this$props.containerClassName,
          onShow = _this$props.onShow;

      _this.getModalManager().add(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), container, containerClassName);

      _this.removeKeydownListener = Object(dom_helpers_listen__WEBPACK_IMPORTED_MODULE_7__["default"])(document, 'keydown', _this.handleDocumentKeyDown);
      _this.removeFocusListener = Object(dom_helpers_listen__WEBPACK_IMPORTED_MODULE_7__["default"])(document, 'focus', // the timeout is necessary b/c this will run before the new modal is mounted
      // and so steals focus from it
      function () {
        return setTimeout(_this.enforceFocus);
      }, true);

      if (onShow) {
        onShow();
      } // autofocus after onShow, to not trigger a focus event for previous
      // modals before this one is shown.


      _this.autoFocus();
    };

    _this.onHide = function () {
      _this.getModalManager().remove(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this));

      _this.removeKeydownListener();

      _this.removeFocusListener();

      if (_this.props.restoreFocus) {
        _this.restoreLastFocus();
      }
    };

    _this.setDialogRef = function (ref) {
      _this.dialog = ref;
    };

    _this.setBackdropRef = function (ref) {
      _this.backdrop = ref && react_dom__WEBPACK_IMPORTED_MODULE_10___default.a.findDOMNode(ref);
    };

    _this.handleHidden = function () {
      _this.setState({
        exited: true
      });

      _this.onHide();

      if (_this.props.onExited) {
        var _this$props2;

        (_this$props2 = _this.props).onExited.apply(_this$props2, arguments);
      }
    };

    _this.handleBackdropClick = function (e) {
      if (e.target !== e.currentTarget) {
        return;
      }

      if (_this.props.onBackdropClick) {
        _this.props.onBackdropClick(e);
      }

      if (_this.props.backdrop === true) {
        _this.props.onHide();
      }
    };

    _this.handleDocumentKeyDown = function (e) {
      if (_this.props.keyboard && e.keyCode === 27 && _this.isTopModal()) {
        if (_this.props.onEscapeKeyDown) {
          _this.props.onEscapeKeyDown(e);
        }

        _this.props.onHide();
      }
    };

    _this.enforceFocus = function () {
      if (!_this.props.enforceFocus || !_this._isMounted || !_this.isTopModal()) {
        return;
      }

      var currentActiveElement = Object(dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_utils_ownerDocument__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this)));

      if (_this.dialog && !Object(dom_helpers_contains__WEBPACK_IMPORTED_MODULE_5__["default"])(_this.dialog, currentActiveElement)) {
        _this.dialog.focus();
      }
    };

    _this.renderBackdrop = function () {
      var _this$props3 = _this.props,
          renderBackdrop = _this$props3.renderBackdrop,
          Transition = _this$props3.backdropTransition;
      var backdrop = renderBackdrop({
        ref: _this.setBackdropRef,
        onClick: _this.handleBackdropClick
      });

      if (Transition) {
        backdrop = react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Transition, {
          appear: true,
          "in": _this.props.show
        }, backdrop);
      }

      return backdrop;
    };

    return _this;
  }

  Modal.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if (nextProps.show) {
      return {
        exited: false
      };
    }

    if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      return {
        exited: true
      };
    }

    return null;
  };

  var _proto = Modal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this.props.show) {
      this.onShow();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var transition = this.props.transition;

    if (prevProps.show && !this.props.show && !transition) {
      // Otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this$props4 = this.props,
        show = _this$props4.show,
        transition = _this$props4.transition;
    this._isMounted = false;

    if (show || transition && !this.state.exited) {
      this.onHide();
    }
  };

  _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate(prevProps) {
    if (dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_6__["default"] && !prevProps.show && this.props.show) {
      this.lastFocus = Object(dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_4__["default"])();
    }

    return null;
  };

  _proto.getModalManager = function getModalManager() {
    if (this.props.manager) {
      return this.props.manager;
    }

    if (!manager) {
      manager = new _ModalManager__WEBPACK_IMPORTED_MODULE_11__["default"]();
    }

    return manager;
  };

  _proto.restoreLastFocus = function restoreLastFocus() {
    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus(this.props.restoreFocusOptions);
      this.lastFocus = null;
    }
  };

  _proto.autoFocus = function autoFocus() {
    if (!this.props.autoFocus) return;
    var currentActiveElement = Object(dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_utils_ownerDocument__WEBPACK_IMPORTED_MODULE_12__["default"])(this));

    if (this.dialog && !Object(dom_helpers_contains__WEBPACK_IMPORTED_MODULE_5__["default"])(this.dialog, currentActiveElement)) {
      this.lastFocus = currentActiveElement;
      this.dialog.focus();
    }
  };

  _proto.isTopModal = function isTopModal() {
    return this.getModalManager().isTopModal(this);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        show = _this$props5.show,
        container = _this$props5.container,
        children = _this$props5.children,
        renderDialog = _this$props5.renderDialog,
        _this$props5$role = _this$props5.role,
        role = _this$props5$role === void 0 ? 'dialog' : _this$props5$role,
        Transition = _this$props5.transition,
        backdrop = _this$props5.backdrop,
        className = _this$props5.className,
        style = _this$props5.style,
        onExit = _this$props5.onExit,
        onExiting = _this$props5.onExiting,
        onEnter = _this$props5.onEnter,
        onEntering = _this$props5.onEntering,
        onEntered = _this$props5.onEntered,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props5, ["show", "container", "children", "renderDialog", "role", "transition", "backdrop", "className", "style", "onExit", "onExiting", "onEnter", "onEntering", "onEntered"]);

    if (!(show || Transition && !this.state.exited)) {
      return null;
    }

    var dialogProps = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      role: role,
      ref: this.setDialogRef,
      // apparently only works on the dialog role element
      'aria-modal': role === 'dialog' ? true : undefined
    }, omitProps(props, Modal.propTypes), {
      style: style,
      className: className,
      tabIndex: '-1'
    });

    var dialog = renderDialog ? renderDialog(dialogProps) : react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", dialogProps, react__WEBPACK_IMPORTED_MODULE_9___default.a.cloneElement(children, {
      role: 'document'
    }));

    if (Transition) {
      dialog = react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Transition, {
        appear: true,
        unmountOnExit: true,
        "in": show,
        onExit: onExit,
        onExiting: onExiting,
        onExited: this.handleHidden,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered
      }, dialog);
    }

    return react_dom__WEBPACK_IMPORTED_MODULE_10___default.a.createPortal(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_9___default.a.Fragment, null, backdrop && this.renderBackdrop(), dialog), container);
  };

  return Modal;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component); // dumb HOC for the sake react-docgen


Modal.propTypes = {
  /**
   * Set the visibility of the Modal
   */
  show: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,

  /**
   * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
   *
   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
   * page content can be placed behind a virtual backdrop as well as a visual one.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.any,

  /**
   * A callback fired when the Modal is opening.
   */
  onShow: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   */
  onHide: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * Include a backdrop component.
   */
  backdrop: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.oneOf(['static'])]),

  /**
   * A function that returns the dialog component. Useful for custom
   * rendering. **Note:** the component should make sure to apply the provided ref.
   *
   * ```js
   *  renderDialog={props => <MyDialog {...props} />}
   * ```
   */
  renderDialog: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * A function that returns a backdrop component. Useful for custom
   * backdrop rendering.
   *
   * ```js
   *  renderBackdrop={props => <MyBackdrop {...props} />}
   * ```
   */
  renderBackdrop: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   */
  onEscapeKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * A callback fired when the backdrop, if specified, is clicked.
   */
  onBackdropClick: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * A css class or set of classes applied to the modal container when the modal is open,
   * and removed when it is closed.
   */
  containerClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the dialog component.
   */
  transition: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.elementType,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the backdrop components.
   */
  backdropTransition: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.elementType,

  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  enforceFocus: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,

  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape({
    preventScroll: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool
  }),

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,

  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object
};
Modal.defaultProps = {
  show: false,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  onHide: function onHide() {},
  renderBackdrop: function renderBackdrop(props) {
    return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", props);
  }
};

function forwardRef(Component) {
  // eslint-disable-next-line react/display-name
  var ModalWithContainer = react__WEBPACK_IMPORTED_MODULE_9___default.a.forwardRef(function (props, ref) {
    var resolved = Object(_utils_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_13__["default"])(props.container);
    return resolved ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      ref: ref,
      container: resolved
    })) : null;
  });
  ModalWithContainer.Manager = _ModalManager__WEBPACK_IMPORTED_MODULE_11__["default"];
  ModalWithContainer._Inner = Component;
  return ModalWithContainer;
}

var ModalWithContainer = forwardRef(Modal);
ModalWithContainer.Manager = _ModalManager__WEBPACK_IMPORTED_MODULE_11__["default"];
/* harmony default export */ __webpack_exports__["default"] = (ModalWithContainer);

/***/ }),

/***/ "./node_modules/react-overlays/esm/ModalManager.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-overlays/esm/ModalManager.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dom_helpers_addClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/addClass */ "./node_modules/dom-helpers/esm/addClass.js");
/* harmony import */ var dom_helpers_removeClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/removeClass */ "./node_modules/dom-helpers/esm/removeClass.js");
/* harmony import */ var dom_helpers_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/css */ "./node_modules/dom-helpers/esm/css.js");
/* harmony import */ var dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/scrollbarSize */ "./node_modules/dom-helpers/esm/scrollbarSize.js");
/* harmony import */ var _utils_isOverflowing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/isOverflowing */ "./node_modules/react-overlays/esm/utils/isOverflowing.js");
/* harmony import */ var _utils_manageAriaHidden__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/manageAriaHidden */ "./node_modules/react-overlays/esm/utils/manageAriaHidden.js");







function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }

    return false;
  });
  return idx;
}
/**
 * Proper state management for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */


var ModalManager =
/*#__PURE__*/
function () {
  function ModalManager(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$hideSiblingNodes = _ref.hideSiblingNodes,
        hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes,
        _ref$handleContainerO = _ref.handleContainerOverflow,
        handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;

    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;
    this.modals = [];
    this.containers = [];
    this.data = [];
    this.scrollbarSize = Object(dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }

  var _proto = ModalManager.prototype;

  _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
    var data = this.data[this.containerIndexFromModal(modal)];
    return data && data.overflowing;
  };

  _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
    return findIndexOf(this.data, function (d) {
      return d.modals.indexOf(modal) !== -1;
    });
  };

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var style = {
      overflow: 'hidden'
    }; // we are only interested in the actual `style` here
    // because we will override it

    containerState.style = {
      overflow: container.style.overflow,
      paddingRight: container.style.paddingRight
    };

    if (containerState.overflowing) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style.paddingRight = parseInt(Object(dom_helpers_css__WEBPACK_IMPORTED_MODULE_2__["default"])(container, 'paddingRight') || 0, 10) + this.scrollbarSize + "px";
    }

    Object(dom_helpers_css__WEBPACK_IMPORTED_MODULE_2__["default"])(container, style);
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    var style = containerState.style;
    Object.keys(style).forEach(function (key) {
      container.style[key] = style[key];
    });
  };

  _proto.add = function add(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (this.hideSiblingNodes) {
      Object(_utils_manageAriaHidden__WEBPACK_IMPORTED_MODULE_5__["hideSiblings"])(container, modal);
    }

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      // right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],
      overflowing: Object(_utils_isOverflowing__WEBPACK_IMPORTED_MODULE_4__["default"])(container)
    };

    if (this.handleContainerOverflow) {
      this.setContainerStyle(data, container);
    }

    data.classes.forEach(dom_helpers_addClass__WEBPACK_IMPORTED_MODULE_0__["default"].bind(null, container));
    this.containers.push(container);
    this.data.push(data);
    return modalIdx;
  };

  _proto.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    var containerIdx = this.containerIndexFromModal(modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];
    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1); // if that was the last modal in a container,
    // clean up the container

    if (data.modals.length === 0) {
      data.classes.forEach(dom_helpers_removeClass__WEBPACK_IMPORTED_MODULE_1__["default"].bind(null, container));

      if (this.handleContainerOverflow) {
        this.removeContainerStyle(data, container);
      }

      if (this.hideSiblingNodes) {
        Object(_utils_manageAriaHidden__WEBPACK_IMPORTED_MODULE_5__["showSiblings"])(container, modal);
      }

      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      // otherwise make sure the next top modal is visible to a SR
      var _data$modals = data.modals[data.modals.length - 1],
          backdrop = _data$modals.backdrop,
          dialog = _data$modals.dialog;
      Object(_utils_manageAriaHidden__WEBPACK_IMPORTED_MODULE_5__["ariaHidden"])(false, dialog);
      Object(_utils_manageAriaHidden__WEBPACK_IMPORTED_MODULE_5__["ariaHidden"])(false, backdrop);
    }
  };

  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };

  return ModalManager;
}();

/* harmony default export */ __webpack_exports__["default"] = (ModalManager);

/***/ }),

/***/ "./node_modules/react-overlays/esm/Overlay.js":
/*!****************************************************!*\
  !*** ./node_modules/react-overlays/esm/Overlay.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/hooks/useCallbackRef */ "./node_modules/@restart/hooks/esm/useCallbackRef.js");
/* harmony import */ var _restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @restart/hooks/useMergedRefs */ "./node_modules/@restart/hooks/esm/useMergedRefs.js");
/* harmony import */ var _usePopper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./usePopper */ "./node_modules/react-overlays/esm/usePopper.js");
/* harmony import */ var _useRootClose__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useRootClose */ "./node_modules/react-overlays/esm/useRootClose.js");
/* harmony import */ var _utils_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/useWaitForDOMRef */ "./node_modules/react-overlays/esm/utils/useWaitForDOMRef.js");











/**
 * Built on top of `Popper.js`, the overlay component is
 * great for custom tooltip overlays.
 */

var Overlay = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (props, outerRef) {
  var flip = props.flip,
      placement = props.placement,
      containerPadding = props.containerPadding,
      _props$popperConfig = props.popperConfig,
      popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig,
      Transition = props.transition;

  var _useCallbackRef = Object(_restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_6__["default"])(),
      rootElement = _useCallbackRef[0],
      attachRef = _useCallbackRef[1];

  var _useCallbackRef2 = Object(_restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_6__["default"])(),
      arrowElement = _useCallbackRef2[0],
      attachArrowRef = _useCallbackRef2[1];

  var mergedRef = Object(_restart_hooks_useMergedRefs__WEBPACK_IMPORTED_MODULE_7__["default"])(attachRef, outerRef);
  var container = Object(_utils_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_10__["default"])(props.container);
  var target = Object(_utils_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_10__["default"])(props.target);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(!props.show),
      exited = _useState[0],
      setExited = _useState[1];

  var _popperConfig$modifie = popperConfig.modifiers,
      modifiers = _popperConfig$modifie === void 0 ? {} : _popperConfig$modifie;

  var _usePopper = Object(_usePopper__WEBPACK_IMPORTED_MODULE_8__["default"])(target, rootElement, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, popperConfig, {
    placement: placement || 'bottom',
    enableEvents: props.show,
    modifiers: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, modifiers, {
      preventOverflow: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        padding: containerPadding || 5
      }, modifiers.preventOverflow),
      arrow: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, modifiers.arrow, {
        enabled: !!arrowElement,
        element: arrowElement
      }),
      flip: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        enabled: !!flip
      }, modifiers.preventOverflow)
    })
  })),
      styles = _usePopper.styles,
      arrowStyles = _usePopper.arrowStyles,
      popper = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_usePopper, ["styles", "arrowStyles"]);

  if (props.show) {
    if (exited) setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }

  var handleHidden = function handleHidden() {
    setExited(true);

    if (props.onExited) {
      props.onExited.apply(props, arguments);
    }
  }; // Don't un-render the overlay while it's transitioning out.


  var mountOverlay = props.show || Transition && !exited;
  Object(_useRootClose__WEBPACK_IMPORTED_MODULE_9__["default"])(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });

  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }

  var child = props.children(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, popper, {
    show: props.show,
    props: {
      style: styles,
      ref: mergedRef
    },
    arrowProps: {
      style: arrowStyles,
      ref: attachArrowRef
    }
  }));

  if (Transition) {
    var onExit = props.onExit,
        onExiting = props.onExiting,
        onEnter = props.onEnter,
        onEntering = props.onEntering,
        onEntered = props.onEntered;
    child = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Transition, {
      "in": props.show,
      appear: true,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, child);
  }

  return container ? react_dom__WEBPACK_IMPORTED_MODULE_5___default.a.createPortal(child, container) : null;
});
Overlay.displayName = 'Overlay';
Overlay.propTypes = {
  /**
   * Set the visibility of the Overlay
   */
  show: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Specify where the overlay element is positioned in relation to the target element */
  placement: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(popper_js__WEBPACK_IMPORTED_MODULE_2__["default"].placements),

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any,

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
   *
   * @type {Function ({
   *   show: boolean,
   *   placement: Placement,
   *   outOfBoundaries: ?boolean,
   *   scheduleUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,

  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['click', 'mousedown']),

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    var propType = prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func;

    if (props.rootClose) {
      propType = propType.isRequired;
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return propType.apply(void 0, [props].concat(args));
  },

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  transition: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.elementType,

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func
};
Overlay.defaultProps = {
  containerPadding: 5
};
/* harmony default export */ __webpack_exports__["default"] = (Overlay);

/***/ }),

/***/ "./node_modules/react-overlays/esm/utils/isOverflowing.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-overlays/esm/utils/isOverflowing.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isOverflowing; });
/* harmony import */ var dom_helpers_isWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/isWindow */ "./node_modules/dom-helpers/esm/isWindow.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");



function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = Object(dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_1__["default"])(node);
  var win = Object(dom_helpers_isWindow__WEBPACK_IMPORTED_MODULE_0__["default"])(doc);
  return doc.body.clientWidth < win.innerWidth;
}

function isOverflowing(container) {
  var win = Object(dom_helpers_isWindow__WEBPACK_IMPORTED_MODULE_0__["default"])(container);
  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}

/***/ }),

/***/ "./node_modules/react-overlays/esm/utils/manageAriaHidden.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-overlays/esm/utils/manageAriaHidden.js ***!
  \*******************************************************************/
/*! exports provided: ariaHidden, hideSiblings, showSiblings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ariaHidden", function() { return ariaHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideSiblings", function() { return hideSiblings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSiblings", function() { return showSiblings; });
var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType,
      tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, exclude, cb) {
  exclude = [].concat(exclude);
  [].forEach.call(container.children, function (node) {
    if (exclude.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

function ariaHidden(show, node) {
  if (!node) return;

  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}
function hideSiblings(container, _ref2) {
  var dialog = _ref2.dialog,
      backdrop = _ref2.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(true, node);
  });
}
function showSiblings(container, _ref3) {
  var dialog = _ref3.dialog,
      backdrop = _ref3.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(false, node);
  });
}

/***/ }),

/***/ "./node_modules/react-overlays/esm/utils/useWaitForDOMRef.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-overlays/esm/utils/useWaitForDOMRef.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useWaitForDOMRef; });
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



var resolveRef = function resolveRef(ref) {
  if (typeof document === 'undefined') return undefined;
  if (ref == null) return Object(dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_0__["default"])().body;
  if (typeof ref === 'function') ref = ref();
  if (ref && ref.current) ref = ref.current;
  if (ref && ref.nodeType) return ref;
  return null;
};

function useWaitForDOMRef(ref, onResolved) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(function () {
    return resolveRef(ref);
  }),
      resolvedRef = _useState[0],
      setRef = _useState[1];

  if (!resolvedRef) {
    var earlyRef = resolveRef(ref);
    if (earlyRef) setRef(earlyRef);
  }

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var nextRef = resolveRef(ref);

    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}

/***/ }),

/***/ "./node_modules/react-router-dom/esm/react-router-dom.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-router-dom/esm/react-router-dom.js ***!
  \***************************************************************/
/*! exports provided: MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, __RouterContext, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter, BrowserRouter, HashRouter, Link, NavLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return BrowserRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return HashRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return NavLink; });
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["MemoryRouter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Prompt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Redirect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Route"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Router"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["StaticRouter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Switch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__RouterContext", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["__RouterContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generatePath", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["generatePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["matchPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useHistory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useParams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRouteMatch", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useRouteMatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["withRouter"]; });

/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/tiny-invariant.esm.js");











/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createBrowserHistory"])(_this.props);
    return _this;
  }

  var _proto = BrowserRouter.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["Router"], {
      history: this.history,
      children: this.props.children
    });
  };

  return BrowserRouter;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

if (true) {
  BrowserRouter.propTypes = {
    basename: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,
    forceRefresh: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    keyLength: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number
  };

  BrowserRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_5__["default"])(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.") : undefined;
  };
}

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(HashRouter, _React$Component);

  function HashRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createHashHistory"])(_this.props);
    return _this;
  }

  var _proto = HashRouter.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["Router"], {
      history: this.history,
      children: this.props.children
    });
  };

  return HashRouter;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

if (true) {
  HashRouter.propTypes = {
    basename: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,
    getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    hashType: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(["hashbang", "noslash", "slash"])
  };

  HashRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_5__["default"])(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.") : undefined;
  };
}

var resolveToLocation = function resolveToLocation(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};
var normalizeToLocation = function normalizeToLocation(to, currentLocation) {
  return typeof to === "string" ? Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(to, null, null, currentLocation) : to;
};

var forwardRefShim = function forwardRefShim(C) {
  return C;
};

var forwardRef = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var LinkAnchor = forwardRef(function (_ref, forwardedRef) {
  var innerRef = _ref.innerRef,
      navigate = _ref.navigate,
      _onClick = _ref.onClick,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref, ["innerRef", "navigate", "onClick"]);

  var target = rest.target;

  var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, rest, {
    onClick: function onClick(event) {
      try {
        if (_onClick) _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && ( // ignore everything but left clicks
      !target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          navigate();
        }
    }
  }); // React 15 compat


  if (forwardRefShim !== forwardRef) {
    props.ref = forwardedRef || innerRef;
  } else {
    props.ref = innerRef;
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", props);
});

if (true) {
  LinkAnchor.displayName = "LinkAnchor";
}
/**
 * The public API for rendering a history-aware <a>.
 */


var Link = forwardRef(function (_ref2, forwardedRef) {
  var _ref2$component = _ref2.component,
      component = _ref2$component === void 0 ? LinkAnchor : _ref2$component,
      replace = _ref2.replace,
      to = _ref2.to,
      innerRef = _ref2.innerRef,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref2, ["component", "replace", "to", "innerRef"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["__RouterContext"].Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_8__["default"])(false, "You should not use <Link> outside a <Router>") : undefined : void 0;
    var history = context.history;
    var location = normalizeToLocation(resolveToLocation(to, context.location), context.location);
    var href = location ? history.createHref(location) : "";

    var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, rest, {
      href: href,
      navigate: function navigate() {
        var location = resolveToLocation(to, context.location);
        var method = replace ? history.replace : history.push;
        method(location);
      }
    }); // React 15 compat


    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(component, props);
  });
});

if (true) {
  var toType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func]);
  var refType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any
  })]);
  Link.displayName = "Link";
  Link.propTypes = {
    innerRef: refType,
    onClick: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    replace: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    target: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    to: toType.isRequired
  };
}

var forwardRefShim$1 = function forwardRefShim(C) {
  return C;
};

var forwardRef$1 = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef;

if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}

function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }

  return classnames.filter(function (i) {
    return i;
  }).join(" ");
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


var NavLink = forwardRef$1(function (_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"],
      ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
      activeStyle = _ref.activeStyle,
      classNameProp = _ref.className,
      exact = _ref.exact,
      isActiveProp = _ref.isActive,
      locationProp = _ref.location,
      strict = _ref.strict,
      styleProp = _ref.style,
      to = _ref.to,
      innerRef = _ref.innerRef,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "strict", "style", "to", "innerRef"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["__RouterContext"].Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_8__["default"])(false, "You should not use <NavLink> outside a <Router>") : undefined : void 0;
    var currentLocation = locationProp || context.location;
    var toLocation = normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? Object(react_router__WEBPACK_IMPORTED_MODULE_0__["matchPath"])(currentLocation.pathname, {
      path: escapedPath,
      exact: exact,
      strict: strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
    var style = isActive ? Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, styleProp, {}, activeStyle) : styleProp;

    var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({
      "aria-current": isActive && ariaCurrent || null,
      className: className,
      style: style,
      to: toLocation
    }, rest); // React 15 compat


    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Link, props);
  });
});

if (true) {
  NavLink.displayName = "NavLink";
  var ariaCurrentType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(["page", "step", "location", "date", "time", "true"]);
  NavLink.propTypes = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, Link.propTypes, {
    "aria-current": ariaCurrentType,
    activeClassName: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    activeStyle: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
    className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    exact: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    isActive: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    location: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
    strict: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    style: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object
  });
}


//# sourceMappingURL=react-router-dom.js.map


/***/ }),

/***/ "./node_modules/react-router/esm/react-router.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-router/esm/react-router.js ***!
  \*******************************************************/
/*! exports provided: MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, __RouterContext, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return MemoryRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return Prompt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return Redirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return StaticRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return Switch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__RouterContext", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePath", function() { return generatePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return matchPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return useHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return useLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return useParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRouteMatch", function() { return useRouteMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return withRouter; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var mini_create_react_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mini-create-react-context */ "./node_modules/mini-create-react-context/dist/esm/index.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/tiny-invariant.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! path-to-regexp */ "./node_modules/path-to-regexp/index.js");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11__);













// TODO: Replace with React.createContext once we can assume React 16+

var createNamedContext = function createNamedContext(name) {
  var context = Object(mini_create_react_context__WEBPACK_IMPORTED_MODULE_5__["default"])();
  context.displayName = name;
  return context;
};

var context =
/*#__PURE__*/
createNamedContext("Router");

/**
 * The public API for putting history on context.
 */

var Router =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Router, _React$Component);

  Router.computeRootMatch = function computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  function Router(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      location: props.history.location
    }; // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.

    _this._isMounted = false;
    _this._pendingLocation = null;

    if (!props.staticContext) {
      _this.unlisten = props.history.listen(function (location) {
        if (_this._isMounted) {
          _this.setState({
            location: location
          });
        } else {
          _this._pendingLocation = location;
        }
      });
    }

    return _this;
  }

  var _proto = Router.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  };

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(context.Provider, {
      children: this.props.children || null,
      value: {
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }
    });
  };

  return Router;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

if (true) {
  Router.propTypes = {
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,
    history: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,
    staticContext: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
  };

  Router.prototype.componentDidUpdate = function (prevProps) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(prevProps.history === this.props.history, "You cannot change <Router history>") : undefined;
  };
}

/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createMemoryHistory"])(_this.props);
    return _this;
  }

  var _proto = MemoryRouter.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return MemoryRouter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

if (true) {
  MemoryRouter.propTypes = {
    initialEntries: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    initialIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    keyLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node
  };

  MemoryRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.") : undefined;
  };
}

var Lifecycle =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Lifecycle, _React$Component);

  function Lifecycle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Lifecycle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  };

  _proto.render = function render() {
    return null;
  };

  return Lifecycle;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/**
 * The public API for prompting the user before navigating away from a screen.
 */

function Prompt(_ref) {
  var message = _ref.message,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(context.Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Prompt> outside a <Router>") : undefined : void 0;
    if (!when || context.staticContext) return null;
    var method = context.history.block;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Lifecycle, {
      onMount: function onMount(self) {
        self.release = method(message);
      },
      onUpdate: function onUpdate(self, prevProps) {
        if (prevProps.message !== message) {
          self.release();
          self.release = method(message);
        }
      },
      onUnmount: function onUnmount(self) {
        self.release();
      },
      message: message
    });
  });
}

if (true) {
  var messageType = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string]);
  Prompt.propTypes = {
    when: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    message: messageType.isRequired
  };
}

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = path_to_regexp__WEBPACK_IMPORTED_MODULE_8___default.a.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}
/**
 * Public API for generating a URL pathname from a path and parameters.
 */


function generatePath(path, params) {
  if (path === void 0) {
    path = "/";
  }

  if (params === void 0) {
    params = {};
  }

  return path === "/" ? path : compilePath(path)(params, {
    pretty: true
  });
}

/**
 * The public API for navigating programmatically with a component.
 */

function Redirect(_ref) {
  var computedMatch = _ref.computedMatch,
      to = _ref.to,
      _ref$push = _ref.push,
      push = _ref$push === void 0 ? false : _ref$push;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(context.Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Redirect> outside a <Router>") : undefined : void 0;
    var history = context.history,
        staticContext = context.staticContext;
    var method = push ? history.push : history.replace;
    var location = Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, to, {
      pathname: generatePath(to.pathname, computedMatch.params)
    }) : to); // When rendering in a static context,
    // set the new location immediately.

    if (staticContext) {
      method(location);
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Lifecycle, {
      onMount: function onMount() {
        method(location);
      },
      onUpdate: function onUpdate(self, prevProps) {
        var prevLocation = Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(prevProps.to);

        if (!Object(history__WEBPACK_IMPORTED_MODULE_3__["locationsAreEqual"])(prevLocation, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, location, {
          key: prevLocation.key
        }))) {
          method(location);
        }
      },
      to: to
    });
  });
}

if (true) {
  Redirect.propTypes = {
    push: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    from: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    to: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object]).isRequired
  };
}

var cache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;

function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = path_to_regexp__WEBPACK_IMPORTED_MODULE_8___default()(path, keys, options);
  var result = {
    regexp: regexp,
    keys: keys
  };

  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }

  return result;
}
/**
 * Public API for matching a URL pathname to a path.
 */


function matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }

  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function (matched, path) {
    if (!path && path !== "") return null;
    if (matched) return matched;

    var _compilePath = compilePath$1(path, {
      end: exact,
      strict: strict,
      sensitive: sensitive
    }),
        regexp = _compilePath.regexp,
        keys = _compilePath.keys;

    var match = regexp.exec(pathname);
    if (!match) return null;
    var url = match[0],
        values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path: path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact: isExact,
      // whether or not we matched exactly
      params: keys.reduce(function (memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

function isEmptyChildren(children) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
  var value = children(props);
   true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(value !== undefined, "You returned `undefined` from the `children` function of " + ("<Route" + (path ? " path=\"" + path + "\"" : "") + ">, but you ") + "should have returned a React element or `null`") : undefined;
  return value || null;
}
/**
 * The public API for matching a single path and rendering.
 */


var Route =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Route, _React$Component);

  function Route() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Route.prototype;

  _proto.render = function render() {
    var _this = this;

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(context.Consumer, null, function (context$1) {
      !context$1 ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Route> outside a <Router>") : undefined : void 0;
      var location = _this.props.location || context$1.location;
      var match = _this.props.computedMatch ? _this.props.computedMatch // <Switch> already computed the match for us
      : _this.props.path ? matchPath(location.pathname, _this.props) : context$1.match;

      var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, context$1, {
        location: location,
        match: match
      });

      var _this$props = _this.props,
          children = _this$props.children,
          component = _this$props.component,
          render = _this$props.render; // Preact uses an empty array as children by
      // default, so use null if that's the case.

      if (Array.isArray(children) && children.length === 0) {
        children = null;
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(context.Provider, {
        value: props
      }, props.match ? children ? typeof children === "function" ?  true ? evalChildrenDev(children, props, _this.props.path) : undefined : children : component ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(component, props) : render ? render(props) : null : typeof children === "function" ?  true ? evalChildrenDev(children, props, _this.props.path) : undefined : null);
    });
  };

  return Route;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

if (true) {
  Route.propTypes = {
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),
    component: function component(props, propName) {
      if (props[propName] && !Object(react_is__WEBPACK_IMPORTED_MODULE_9__["isValidElementType"])(props[propName])) {
        return new Error("Invalid prop 'component' supplied to 'Route': the prop is not a valid React component");
      }
    },
    exact: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    location: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    path: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string)]),
    render: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    sensitive: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    strict: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  };

  Route.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.children && !isEmptyChildren(this.props.children) && this.props.component), "You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored") : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.children && !isEmptyChildren(this.props.children) && this.props.render), "You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored") : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored") : undefined;
  };

  Route.prototype.componentDidUpdate = function (prevProps) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.location && !prevProps.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.') : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(!this.props.location && prevProps.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') : undefined;
  };
}

function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, location, {
    pathname: addLeadingSlash(basename) + location.pathname
  });
}

function stripBasename(basename, location) {
  if (!basename) return location;
  var base = addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}

function createURL(location) {
  return typeof location === "string" ? location : Object(history__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
}

function staticHandler(methodName) {
  return function () {
      true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You cannot %s with <StaticRouter>", methodName) : undefined ;
  };
}

function noop() {}
/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */


var StaticRouter =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(StaticRouter, _React$Component);

  function StaticRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handlePush = function (location) {
      return _this.navigateTo(location, "PUSH");
    };

    _this.handleReplace = function (location) {
      return _this.navigateTo(location, "REPLACE");
    };

    _this.handleListen = function () {
      return noop;
    };

    _this.handleBlock = function () {
      return noop;
    };

    return _this;
  }

  var _proto = StaticRouter.prototype;

  _proto.navigateTo = function navigateTo(location, action) {
    var _this$props = this.props,
        _this$props$basename = _this$props.basename,
        basename = _this$props$basename === void 0 ? "" : _this$props$basename,
        _this$props$context = _this$props.context,
        context = _this$props$context === void 0 ? {} : _this$props$context;
    context.action = action;
    context.location = addBasename(basename, Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(location));
    context.url = createURL(context.location);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$basename = _this$props2.basename,
        basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
        _this$props2$context = _this$props2.context,
        context = _this$props2$context === void 0 ? {} : _this$props2$context,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? "/" : _this$props2$location,
        rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__["default"])(_this$props2, ["basename", "context", "location"]);

    var history = {
      createHref: function createHref(path) {
        return addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: stripBasename(basename, Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Router, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, rest, {
      history: history,
      staticContext: context
    }));
  };

  return StaticRouter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

if (true) {
  StaticRouter.propTypes = {
    basename: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    context: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    location: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object])
  };

  StaticRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { StaticRouter as Router }`.") : undefined;
  };
}

/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Switch, _React$Component);

  function Switch() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Switch.prototype;

  _proto.render = function render() {
    var _this = this;

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(context.Consumer, null, function (context) {
      !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Switch> outside a <Router>") : undefined : void 0;
      var location = _this.props.location || context.location;
      var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
      // here because toArray adds keys to all child elements and we do not want
      // to trigger an unmount/remount for two <Route>s that render the same
      // component at different URLs.

      react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.forEach(_this.props.children, function (child) {
        if (match == null && react__WEBPACK_IMPORTED_MODULE_1___default.a.isValidElement(child)) {
          element = child;
          var path = child.props.path || child.props.from;
          match = path ? matchPath(location.pathname, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, child.props, {
            path: path
          })) : context.match;
        }
      });
      return match ? react__WEBPACK_IMPORTED_MODULE_1___default.a.cloneElement(element, {
        location: location,
        computedMatch: match
      }) : null;
    });
  };

  return Switch;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

if (true) {
  Switch.propTypes = {
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,
    location: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
  };

  Switch.prototype.componentDidUpdate = function (prevProps) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.location && !prevProps.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.') : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(!this.props.location && prevProps.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') : undefined;
  };
}

/**
 * A public higher-order component to access the imperative API
 */

function withRouter(Component) {
  var displayName = "withRouter(" + (Component.displayName || Component.name) + ")";

  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__["default"])(props, ["wrappedComponentRef"]);

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(context.Consumer, null, function (context) {
      !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <" + displayName + " /> outside a <Router>") : undefined : void 0;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, remainingProps, context, {
        ref: wrappedComponentRef
      }));
    });
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  if (true) {
    C.propTypes = {
      wrappedComponentRef: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object])
    };
  }

  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11___default()(C, Component);
}

var useContext = react__WEBPACK_IMPORTED_MODULE_1___default.a.useContext;
function useHistory() {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useHistory()") : undefined : void 0;
  }

  return useContext(context).history;
}
function useLocation() {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useLocation()") : undefined : void 0;
  }

  return useContext(context).location;
}
function useParams() {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useParams()") : undefined : void 0;
  }

  var match = useContext(context).match;
  return match ? match.params : {};
}
function useRouteMatch(path) {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useRouteMatch()") : undefined : void 0;
  }

  return path ? matchPath(useLocation().pathname, path) : useContext(context).match;
}

if (true) {
  if (typeof window !== "undefined") {
    var global = window;
    var key = "__react_router_build__";
    var buildNames = {
      cjs: "CommonJS",
      esm: "ES modules",
      umd: "UMD"
    };

    if (global[key] && global[key] !== "esm") {
      var initialBuildName = buildNames[global[key]];
      var secondaryBuildName = buildNames["esm"]; // TODO: Add link to article that explains in detail how to avoid
      // loading 2 different builds.

      throw new Error("You are loading the " + secondaryBuildName + " build of React Router " + ("on a page that is already running the " + initialBuildName + " ") + "build, so things won't work right.");
    }

    global[key] = "esm";
  }
}


//# sourceMappingURL=react-router.js.map


/***/ }),

/***/ "./node_modules/resolve-pathname/esm/resolve-pathname.js":
/*!***************************************************************!*\
  !*** ./node_modules/resolve-pathname/esm/resolve-pathname.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);


/***/ }),

/***/ "./node_modules/tiny-invariant/dist/tiny-invariant.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    throw new Error(prefix + ": " + (message || ''));
}

/* harmony default export */ __webpack_exports__["default"] = (invariant);


/***/ }),

/***/ "./node_modules/tiny-warning/dist/tiny-warning.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-warning/dist/tiny-warning.esm.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var isProduction = "development" === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

/* harmony default export */ __webpack_exports__["default"] = (warning);


/***/ }),

/***/ "./node_modules/value-equal/esm/value-equal.js":
/*!*****************************************************!*\
  !*** ./node_modules/value-equal/esm/value-equal.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true;

  // Otherwise, if either of them == null they are not equal.
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every(function(item, index) {
        return valueEqual(item, b[index]);
      })
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = valueOf(a);
    var bValue = valueOf(b);

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VNb3VudGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcmVzdGFydC9ob29rcy9lc20vdXNlVGltZW91dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZVVwZGF0ZWRSZWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VXaWxsVW5tb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9hY3RpdmVFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vYWRkQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9oYXNDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2lzRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9pc1dpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL3JlbW92ZUNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vc2Nyb2xsYmFyU2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3VkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2VzbS9oaXN0b3J5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9kaXN0L2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzLmNqcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWluaS1jcmVhdGUtcmVhY3QtY29udGV4dC9kaXN0L2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGF0aC10by1yZWdleHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtdG8tcmVnZXhwL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BY2NvcmRpb25Db2xsYXBzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BY2NvcmRpb25Db250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0FjY29yZGlvblRvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9BbGVydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9CYWRnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Cb290c3RyYXBNb2RhbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQnJlYWRjcnVtYi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9CcmVhZGNydW1iSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9CdXR0b25Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9CdXR0b25Ub29sYmFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0NhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2FyZENvbHVtbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2FyZERlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2FyZEdyb3VwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0NhcmRJbWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vQ2Fyb3VzZWxDYXB0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0Nhcm91c2VsSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9DbG9zZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ecm9wZG93bkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9FbGVtZW50Q2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vRmFkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9GaWd1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vRmlndXJlQ2FwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9GaWd1cmVJbWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9JbnB1dEdyb3VwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL0p1bWJvdHJvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9MaXN0R3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vTGlzdEdyb3VwSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9NZWRpYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Nb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Nb2RhbEJvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vTW9kYWxDb250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsRGlhbG9nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsRm9vdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsSGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL01vZGFsVGl0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vT3ZlcmxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9PdmVybGF5VHJpZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9QYWdlSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9QYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1BvcG92ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vUG9wb3ZlckNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vUG9wb3ZlclRpdGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1Jlc3BvbnNpdmVFbWJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9TcGlubmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1NwbGl0QnV0dG9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1RhYi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9UYWJDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVGFiQ29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9UYWJQYW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1RhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9hc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9hc3RCb2R5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL1RvYXN0Q29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ub2FzdEhlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9Ub2dnbGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9nZ2xlQnV0dG9uR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWJvb3RzdHJhcC9lc20vVG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwL2VzbS9kaXZXaXRoQ2xhc3NOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9lc20vTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL2VzbS9Nb2RhbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL2VzbS9PdmVybGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9lc20vdXRpbHMvaXNPdmVyZmxvd2luZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvZXNtL3V0aWxzL21hbmFnZUFyaWFIaWRkZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL2VzbS91dGlscy91c2VXYWl0Rm9yRE9NUmVmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2VzbS9yZWFjdC1yb3V0ZXItZG9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvZXNtL3JlYWN0LXJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1wYXRobmFtZS9lc20vcmVzb2x2ZS1wYXRobmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktd2FybmluZy9kaXN0L3Rpbnktd2FybmluZy5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbHVlLWVxdWFsL2VzbS92YWx1ZS1lcXVhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDOzs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUNGO0FBQ2M7QUFDRjtBQUNRO0FBQ0Y7QUFDRjtBQUN0QjtBQUNGO0FBQ0U7QUFDRjtBQUNZO0FBQ0Y7QUFDVTtBQUNGO0FBQ2Q7QUFDRjtBQUNZO0FBQ0Y7QUFDTTtBQUNGO0FBQ2hCO0FBQ0Y7QUFDZ0I7QUFDRjtBQUNKO0FBQ0Y7QUFDQTtBQUNGO0FBQ007QUFDRjtBQUNBO0FBQ0Y7QUFDVTtBQUNGO0FBQ0E7QUFDRjtBQUNkO0FBQ0Y7QUFDWTtBQUNGO0FBQ0U7QUFDRjtBQUNjO0FBQ0Y7QUFDRjtBQUNGO0FBQ2Q7QUFDRjtBQUNFO0FBQ0Y7QUFDZ0I7QUFDRjtBQUNGO0FBQ0Y7QUFDSjtBQUNGO0FBQ1E7QUFDRjtBQUNFO0FBQ0Y7QUFDQTtBQUNGO0FBQ0k7QUFDRjtBQUNOO0FBQ0Y7QUFDSTtBQUNGO0FBQ1U7QUFDRjtBQUNBO0FBQ0Y7QUFDRTtBQUNGO0FBQ1U7QUFDRjtBQUNkO0FBQ0Y7QUFDRTtBQUNGO0FBQ1U7QUFDRjtBQUNNO0FBQ0Y7QUFDRTtBQUNGO0FBQ0E7QUFDRjtBQUNaO0FBQ0Y7QUFDUTtBQUNGO0FBQ1k7QUFDRjtBQUNFO0FBQ0Y7QUFDTjtBQUNGO0FBQ0U7QUFDRjtBQUNFO0FBQ0Y7QUFDZ0I7QUFDRjtBQUNWO0FBQ0Y7QUFDTTtBQUNGO0FBQ0o7QUFDRjtBQUNnQjtBQUNGO0FBQ0Y7QUFDRjtBQUNBO0FBQ0Y7QUFDVTtBQUNGO0FBQ3RCO0FBQ0Y7QUFDZ0I7QUFDRjtBQUNKO0FBQ0Y7QUFDVTtBQUNGO0FBQ2Q7QUFDRjtBQUNvQjtBQUNGO0FBQ0Y7QUFDRjtB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O0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFZSxzRUFBTyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDbkJ2QjtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsdUNBQXVDO0FBQ3ZDO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRWUseUVBQVUsRUFBQyIsImZpbGUiOiJ2ZW5kb3JzfmZvcm1zfmhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHNMb29zZTsiLCJpbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogVHJhY2sgd2hldGhlciBhIGNvbXBvbmVudCBpcyBjdXJyZW50IG1vdW50ZWQuIEdlbmVyYWxseSBsZXNzIHByZWZlcmFibGUgdGhhblxuICogcHJvcGVybGx5IGNhbmNlbGluZyBlZmZlY3RzIHNvIHRoZXkgZG9uJ3QgcnVuIGFmdGVyIGEgY29tcG9uZW50IGlzIHVubW91bnRlZCxcbiAqIGJ1dCBoZWxwZnVsIGluIGNhc2VzIHdoZXJlIHRoYXQgaXNuJ3QgZmVhc2libGUsIHN1Y2ggYXMgYSBgUHJvbWlzZWAgcmVzb2x1dGlvbi5cbiAqXG4gKiBAcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBpc01vdW50ZWQgc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKVxuICogY29uc3QgaXNNb3VudGVkID0gdXNlTW91bnRlZCgpXG4gKlxuICogdXNlRWZmZWN0KCgpID0+IHtcbiAqICAgZmV0Y2hkYXRhKCkudGhlbigobmV3RGF0YSkgPT4ge1xuICogICAgICBpZiAoaXNNb3VudGVkKCkpIHtcbiAqICAgICAgICBzZXREYXRhKG5ld0RhdGEpO1xuICogICAgICB9XG4gKiAgIH0pXG4gKiB9KVxuICogYGBgXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlTW91bnRlZCgpIHtcbiAgdmFyIG1vdW50ZWQgPSB1c2VSZWYodHJ1ZSk7XG4gIHZhciBpc01vdW50ZWQgPSB1c2VSZWYoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtb3VudGVkLmN1cnJlbnQ7XG4gIH0pO1xuICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBtb3VudGVkLmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHJldHVybiBpc01vdW50ZWQuY3VycmVudDtcbn0iLCJpbXBvcnQgeyB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlTW91bnRlZCBmcm9tICcuL3VzZU1vdW50ZWQnO1xuaW1wb3J0IHVzZVdpbGxVbm1vdW50IGZyb20gJy4vdXNlV2lsbFVubW91bnQnO1xuLypcbiAqIEJyb3dzZXJzIGluY2x1ZGluZyBJbnRlcm5ldCBFeHBsb3JlciwgQ2hyb21lLCBTYWZhcmksIGFuZCBGaXJlZm94IHN0b3JlIHRoZVxuICogZGVsYXkgYXMgYSAzMi1iaXQgc2lnbmVkIGludGVnZXIgaW50ZXJuYWxseS4gVGhpcyBjYXVzZXMgYW4gaW50ZWdlciBvdmVyZmxvd1xuICogd2hlbiB1c2luZyBkZWxheXMgbGFyZ2VyIHRoYW4gMiwxNDcsNDgzLDY0NyBtcyAoYWJvdXQgMjQuOCBkYXlzKSxcbiAqIHJlc3VsdGluZyBpbiB0aGUgdGltZW91dCBiZWluZyBleGVjdXRlZCBpbW1lZGlhdGVseS5cbiAqXG4gKiB2aWE6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dPcldvcmtlckdsb2JhbFNjb3BlL3NldFRpbWVvdXRcbiAqL1xuXG52YXIgTUFYX0RFTEFZX01TID0gTWF0aC5wb3coMiwgMzEpIC0gMTtcblxuZnVuY3Rpb24gc2V0Q2hhaW5lZFRpbWVvdXQoaGFuZGxlUmVmLCBmbiwgdGltZW91dEF0TXMpIHtcbiAgdmFyIGRlbGF5TXMgPSB0aW1lb3V0QXRNcyAtIERhdGUubm93KCk7XG4gIGhhbmRsZVJlZi5jdXJyZW50ID0gZGVsYXlNcyA8PSBNQVhfREVMQVlfTVMgPyBzZXRUaW1lb3V0KGZuLCBkZWxheU1zKSA6IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZXRDaGFpbmVkVGltZW91dChoYW5kbGVSZWYsIGZuLCB0aW1lb3V0QXRNcyk7XG4gIH0sIE1BWF9ERUxBWV9NUyk7XG59XG4vKipcbiAqIFJldHVybnMgYSBjb250cm9sbGVyIG9iamVjdCBmb3Igc2V0dGluZyBhIHRpbWVvdXQgdGhhdCBpcyBwcm9wZXJseSBjbGVhbmVkIHVwXG4gKiBvbmNlIHRoZSBjb21wb25lbnQgdW5tb3VudHMuIE5ldyB0aW1lb3V0cyBjYW5jZWwgYW5kIHJlcGxhY2UgZXhpc3Rpbmcgb25lcy5cbiAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRpbWVvdXQoKSB7XG4gIHZhciBpc01vdW50ZWQgPSB1c2VNb3VudGVkKCk7IC8vIHR5cGVzIGFyZSBjb25mdXNlZCBiZXR3ZWVuIG5vZGUgYW5kIHdlYiBoZXJlIElES1xuXG4gIHZhciBoYW5kbGVSZWYgPSB1c2VSZWYoKTtcbiAgdXNlV2lsbFVubW91bnQoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQoaGFuZGxlUmVmLmN1cnJlbnQpO1xuICB9KTtcbiAgcmV0dXJuIHVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHZhciBjbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChoYW5kbGVSZWYuY3VycmVudCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldChmbiwgZGVsYXlNcykge1xuICAgICAgaWYgKGRlbGF5TXMgPT09IHZvaWQgMCkge1xuICAgICAgICBkZWxheU1zID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc01vdW50ZWQoKSkgcmV0dXJuO1xuICAgICAgY2xlYXIoKTtcblxuICAgICAgaWYgKGRlbGF5TXMgPD0gTUFYX0RFTEFZX01TKSB7XG4gICAgICAgIC8vIEZvciBzaW1wbGljaXR5LCBpZiB0aGUgdGltZW91dCBpcyBzaG9ydCwganVzdCBzZXQgYSBub3JtYWwgdGltZW91dC5cbiAgICAgICAgaGFuZGxlUmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KGZuLCBkZWxheU1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldENoYWluZWRUaW1lb3V0KGhhbmRsZVJlZiwgZm4sIERhdGUubm93KCkgKyBkZWxheU1zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2V0OiBzZXQsXG4gICAgICBjbGVhcjogY2xlYXJcbiAgICB9O1xuICB9LCBbXSk7XG59IiwiaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBSZXR1cm5zIGEgcmVmIHRoYXQgaXMgaW1tZWRpYXRlbHkgdXBkYXRlZCB3aXRoIHRoZSBuZXcgdmFsdWVcbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIFJlZiB2YWx1ZVxuICogQGNhdGVnb3J5IHJlZnNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VVcGRhdGVkUmVmKHZhbHVlKSB7XG4gIHZhciB2YWx1ZVJlZiA9IHVzZVJlZih2YWx1ZSk7XG4gIHZhbHVlUmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlUmVmO1xufSIsImltcG9ydCB1c2VVcGRhdGVkUmVmIGZyb20gJy4vdXNlVXBkYXRlZFJlZic7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEF0dGFjaCBhIGNhbGxiYWNrIHRoYXQgZmlyZXMgd2hlbiBhIGNvbXBvbmVudCB1bm1vdW50c1xuICpcbiAqIEBwYXJhbSBmbiBIYW5kbGVyIHRvIHJ1biB3aGVuIHRoZSBjb21wb25lbnQgdW5tb3VudHNcbiAqIEBjYXRlZ29yeSBlZmZlY3RzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlV2lsbFVubW91bnQoZm4pIHtcbiAgdmFyIG9uVW5tb3VudCA9IHVzZVVwZGF0ZWRSZWYoZm4pO1xuICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb25Vbm1vdW50LmN1cnJlbnQoKTtcbiAgICB9O1xuICB9LCBbXSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwsbm8tdGhyb3ctbGl0ZXJhbFxuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRzb21lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLnNvbWU7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnc29tZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NvbWUnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb21lXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBzb21lOiBmdW5jdGlvbiBzb21lKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRzb21lKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgb3duZXJEb2N1bWVudCBmcm9tICcuL293bmVyRG9jdW1lbnQnO1xuLyoqXG4gKiBSZXR1cm4gdGhlIGFjdGl2ZWx5IGZvY3VzZWQgZWxlbWVudCBzYWZlbHkuXG4gKlxuICogQHBhcmFtIGRvYyB0aGUgZG9jdW1lbnQgdG8gY2hlY2xcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhY3RpdmVFbGVtZW50KGRvYykge1xuICBpZiAoZG9jID09PSB2b2lkIDApIHtcbiAgICBkb2MgPSBvd25lckRvY3VtZW50KCk7XG4gIH1cblxuICAvLyBTdXBwb3J0OiBJRSA5IG9ubHlcbiAgLy8gSUU5IHRocm93cyBhbiBcIlVuc3BlY2lmaWVkIGVycm9yXCIgYWNjZXNzaW5nIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgZnJvbSBhbiA8aWZyYW1lPlxuICB0cnkge1xuICAgIHZhciBhY3RpdmUgPSBkb2MuYWN0aXZlRWxlbWVudDsgLy8gSUUxMSByZXR1cm5zIGEgc2VlbWluZ2x5IGVtcHR5IG9iamVjdCBpbiBzb21lIGNhc2VzIHdoZW4gYWNjZXNzaW5nXG4gICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBmcm9tIGFuIDxpZnJhbWU+XG5cbiAgICBpZiAoIWFjdGl2ZSB8fCAhYWN0aXZlLm5vZGVOYW1lKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYWN0aXZlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogaWUgdGhyb3dzIGlmIG5vIGFjdGl2ZSBlbGVtZW50ICovXG4gICAgcmV0dXJuIGRvYy5ib2R5O1xuICB9XG59IiwiaW1wb3J0IGhhc0NsYXNzIGZyb20gJy4vaGFzQ2xhc3MnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7ZWxzZSBpZiAoIWhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIGlmICh0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7ZWxzZSBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlbWVudC5jbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc05hbWUuYmFzZVZhbCB8fCAnJykgKyBcIiBcIiArIGNsYXNzTmFtZSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkgcmV0dXJuICEhY2xhc3NOYW1lICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIHJldHVybiAoXCIgXCIgKyAoZWxlbWVudC5jbGFzc05hbWUuYmFzZVZhbCB8fCBlbGVtZW50LmNsYXNzTmFtZSkgKyBcIiBcIikuaW5kZXhPZihcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiKSAhPT0gLTE7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNEb2N1bWVudChlbGVtZW50KSB7XG4gIHJldHVybiAnbm9kZVR5cGUnIGluIGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gZG9jdW1lbnQuRE9DVU1FTlRfTk9ERTtcbn0iLCJpbXBvcnQgaXNEb2N1bWVudCBmcm9tICcuL2lzRG9jdW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNXaW5kb3cobm9kZSkge1xuICBpZiAoJ3dpbmRvdycgaW4gbm9kZSAmJiBub2RlLndpbmRvdyA9PT0gbm9kZSkgcmV0dXJuIG5vZGU7XG4gIGlmIChpc0RvY3VtZW50KG5vZGUpKSByZXR1cm4gbm9kZS5kZWZhdWx0VmlldyB8fCBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufSIsImZ1bmN0aW9uIHJlcGxhY2VDbGFzc05hbWUob3JpZ0NsYXNzLCBjbGFzc1RvUmVtb3ZlKSB7XG4gIHJldHVybiBvcmlnQ2xhc3MucmVwbGFjZShuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIgKyBjbGFzc1RvUmVtb3ZlICsgXCIoPzpcXFxcc3wkKVwiLCAnZycpLCAnJDEnKS5yZXBsYWNlKC9cXHMrL2csICcgJykucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgIDtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IHJlcGxhY2VDbGFzc05hbWUoZWxlbWVudC5jbGFzc05hbWUsIGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgcmVwbGFjZUNsYXNzTmFtZShlbGVtZW50LmNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsIHx8ICcnLCBjbGFzc05hbWUpKTtcbiAgfVxufSIsImltcG9ydCBjYW5Vc2VET00gZnJvbSAnLi9jYW5Vc2VET00nO1xudmFyIHNpemU7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzY3JvbGxiYXJTaXplKHJlY2FsYykge1xuICBpZiAoIXNpemUgJiYgc2l6ZSAhPT0gMCB8fCByZWNhbGMpIHtcbiAgICBpZiAoY2FuVXNlRE9NKSB7XG4gICAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnRvcCA9ICctOTk5OXB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS53aWR0aCA9ICc1MHB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgIHNpemUgPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNpemU7XG59IiwiLy8gQGZsb3dcbid1c2Ugc3RyaWN0JztcblxudmFyIGtleSA9ICdfX2dsb2JhbF91bmlxdWVfaWRfXyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnbG9iYWxba2V5XSA9IChnbG9iYWxba2V5XSB8fCAwKSArIDE7XG59O1xuIiwiaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHJlc29sdmVQYXRobmFtZSBmcm9tICdyZXNvbHZlLXBhdGhuYW1lJztcbmltcG9ydCB2YWx1ZUVxdWFsIGZyb20gJ3ZhbHVlLWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoIDogJy8nICsgcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpIHtcbiAgcmV0dXJuIHBhdGgudG9Mb3dlckNhc2UoKS5pbmRleE9mKHByZWZpeC50b0xvd2VyQ2FzZSgpKSA9PT0gMCAmJiAnLz8jJy5pbmRleE9mKHBhdGguY2hhckF0KHByZWZpeC5sZW5ndGgpKSAhPT0gLTE7XG59XG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKHBhdGgsIHByZWZpeCkge1xuICByZXR1cm4gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSA/IHBhdGguc3Vic3RyKHByZWZpeC5sZW5ndGgpIDogcGF0aDtcbn1cbmZ1bmN0aW9uIHN0cmlwVHJhaWxpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdChwYXRoLmxlbmd0aCAtIDEpID09PSAnLycgPyBwYXRoLnNsaWNlKDAsIC0xKSA6IHBhdGg7XG59XG5mdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICB2YXIgcGF0aG5hbWUgPSBwYXRoIHx8ICcvJztcbiAgdmFyIHNlYXJjaCA9ICcnO1xuICB2YXIgaGFzaCA9ICcnO1xuICB2YXIgaGFzaEluZGV4ID0gcGF0aG5hbWUuaW5kZXhPZignIycpO1xuXG4gIGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG4gICAgaGFzaCA9IHBhdGhuYW1lLnN1YnN0cihoYXNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIGhhc2hJbmRleCk7XG4gIH1cblxuICB2YXIgc2VhcmNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCc/Jyk7XG5cbiAgaWYgKHNlYXJjaEluZGV4ICE9PSAtMSkge1xuICAgIHNlYXJjaCA9IHBhdGhuYW1lLnN1YnN0cihzZWFyY2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHIoMCwgc2VhcmNoSW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2ggPT09ICc/JyA/ICcnIDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2ggPT09ICcjJyA/ICcnIDogaGFzaFxuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuICB2YXIgcGF0aCA9IHBhdGhuYW1lIHx8ICcvJztcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2ggIT09ICc/JykgcGF0aCArPSBzZWFyY2guY2hhckF0KDApID09PSAnPycgPyBzZWFyY2ggOiBcIj9cIiArIHNlYXJjaDtcbiAgaWYgKGhhc2ggJiYgaGFzaCAhPT0gJyMnKSBwYXRoICs9IGhhc2guY2hhckF0KDApID09PSAnIycgPyBoYXNoIDogXCIjXCIgKyBoYXNoO1xuICByZXR1cm4gcGF0aDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGtleSwgY3VycmVudExvY2F0aW9uKSB7XG4gIHZhciBsb2NhdGlvbjtcblxuICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVHdvLWFyZyBmb3JtOiBwdXNoKHBhdGgsIHN0YXRlKVxuICAgIGxvY2F0aW9uID0gcGFyc2VQYXRoKHBhdGgpO1xuICAgIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH0gZWxzZSB7XG4gICAgLy8gT25lLWFyZyBmb3JtOiBwdXNoKGxvY2F0aW9uKVxuICAgIGxvY2F0aW9uID0gX2V4dGVuZHMoe30sIHBhdGgpO1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZSA9PT0gdW5kZWZpbmVkKSBsb2NhdGlvbi5wYXRobmFtZSA9ICcnO1xuXG4gICAgaWYgKGxvY2F0aW9uLnNlYXJjaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLnNlYXJjaC5jaGFyQXQoMCkgIT09ICc/JykgbG9jYXRpb24uc2VhcmNoID0gJz8nICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5zZWFyY2ggPSAnJztcbiAgICB9XG5cbiAgICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLmhhc2guY2hhckF0KDApICE9PSAnIycpIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBsb2NhdGlvbi5oYXNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQgJiYgbG9jYXRpb24uc3RhdGUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24uc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbG9jYXRpb24ucGF0aG5hbWUgPSBkZWNvZGVVUkkobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBVUklFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFVSSUVycm9yKCdQYXRobmFtZSBcIicgKyBsb2NhdGlvbi5wYXRobmFtZSArICdcIiBjb3VsZCBub3QgYmUgZGVjb2RlZC4gJyArICdUaGlzIGlzIGxpa2VseSBjYXVzZWQgYnkgYW4gaW52YWxpZCBwZXJjZW50LWVuY29kaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXkpIGxvY2F0aW9uLmtleSA9IGtleTtcblxuICBpZiAoY3VycmVudExvY2F0aW9uKSB7XG4gICAgLy8gUmVzb2x2ZSBpbmNvbXBsZXRlL3JlbGF0aXZlIHBhdGhuYW1lIHJlbGF0aXZlIHRvIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgaWYgKCFsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSByZXNvbHZlUGF0aG5hbWUobG9jYXRpb24ucGF0aG5hbWUsIGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFdoZW4gdGhlcmUgaXMgbm8gcHJpb3IgbG9jYXRpb24gYW5kIHBhdGhuYW1lIGlzIGVtcHR5LCBzZXQgaXQgdG8gL1xuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gJy8nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsb2NhdGlvbjtcbn1cbmZ1bmN0aW9uIGxvY2F0aW9uc0FyZUVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmIGEuaGFzaCA9PT0gYi5oYXNoICYmIGEua2V5ID09PSBiLmtleSAmJiB2YWx1ZUVxdWFsKGEuc3RhdGUsIGIuc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpIHtcbiAgdmFyIHByb21wdCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0UHJvbXB0KG5leHRQcm9tcHQpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHByb21wdCA9PSBudWxsLCAnQSBoaXN0b3J5IHN1cHBvcnRzIG9ubHkgb25lIHByb21wdCBhdCBhIHRpbWUnKSA6IHZvaWQgMDtcbiAgICBwcm9tcHQgPSBuZXh0UHJvbXB0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvbXB0ID09PSBuZXh0UHJvbXB0KSBwcm9tcHQgPSBudWxsO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgLy8gVE9ETzogSWYgYW5vdGhlciB0cmFuc2l0aW9uIHN0YXJ0cyB3aGlsZSB3ZSdyZSBzdGlsbCBjb25maXJtaW5nXG4gICAgLy8gdGhlIHByZXZpb3VzIG9uZSwgd2UgbWF5IGVuZCB1cCBpbiBhIHdlaXJkIHN0YXRlLiBGaWd1cmUgb3V0IHRoZVxuICAgIC8vIGJlc3Qgd2F5IHRvIGhhbmRsZSB0aGlzLlxuICAgIGlmIChwcm9tcHQgIT0gbnVsbCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHR5cGVvZiBwcm9tcHQgPT09ICdmdW5jdGlvbicgPyBwcm9tcHQobG9jYXRpb24sIGFjdGlvbikgOiBwcm9tcHQ7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGdldFVzZXJDb25maXJtYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBnZXRVc2VyQ29uZmlybWF0aW9uKHJlc3VsdCwgY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoZmFsc2UsICdBIGhpc3RvcnkgbmVlZHMgYSBnZXRVc2VyQ29uZmlybWF0aW9uIGZ1bmN0aW9uIGluIG9yZGVyIHRvIHVzZSBhIHByb21wdCBtZXNzYWdlJykgOiB2b2lkIDA7XG4gICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybiBmYWxzZSBmcm9tIGEgdHJhbnNpdGlvbiBob29rIHRvIGNhbmNlbCB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAgY2FsbGJhY2socmVzdWx0ICE9PSBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICBmdW5jdGlvbiBhcHBlbmRMaXN0ZW5lcihmbikge1xuICAgIHZhciBpc0FjdGl2ZSA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmIChpc0FjdGl2ZSkgZm4uYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGxpc3RlbmVyO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vdGlmeUxpc3RlbmVycygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIuYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0UHJvbXB0OiBzZXRQcm9tcHQsXG4gICAgY29uZmlybVRyYW5zaXRpb25UbzogY29uZmlybVRyYW5zaXRpb25UbyxcbiAgICBhcHBlbmRMaXN0ZW5lcjogYXBwZW5kTGlzdGVuZXIsXG4gICAgbm90aWZ5TGlzdGVuZXJzOiBub3RpZnlMaXN0ZW5lcnNcbiAgfTtcbn1cblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5mdW5jdGlvbiBnZXRDb25maXJtYXRpb24obWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sod2luZG93LmNvbmZpcm0obWVzc2FnZSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgaXMgc3VwcG9ydGVkLiBUYWtlbiBmcm9tIE1vZGVybml6ci5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvaGlzdG9yeS5qc1xuICogY2hhbmdlZCB0byBhdm9pZCBmYWxzZSBuZWdhdGl2ZXMgZm9yIFdpbmRvd3MgUGhvbmVzOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yb3V0ZXIvaXNzdWVzLzU4NlxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzSGlzdG9yeSgpIHtcbiAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGlmICgodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkgJiYgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJiB1YS5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEgJiYgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gd2luZG93Lmhpc3RvcnkgJiYgJ3B1c2hTdGF0ZScgaW4gd2luZG93Lmhpc3Rvcnk7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBicm93c2VyIGZpcmVzIHBvcHN0YXRlIG9uIGhhc2ggY2hhbmdlLlxuICogSUUxMCBhbmQgSUUxMSBkbyBub3QuXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1RyaWRlbnQnKSA9PT0gLTE7XG59XG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIGdpdmVuIHBvcHN0YXRlIGV2ZW50IGlzIGFuIGV4dHJhbmVvdXMgV2ViS2l0IGV2ZW50LlxuICogQWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgQ2hyb21lIG9uIGlPUyBmaXJlcyByZWFsIHBvcHN0YXRlIGV2ZW50c1xuICogY29udGFpbmluZyB1bmRlZmluZWQgc3RhdGUgd2hlbiBwcmVzc2luZyB0aGUgYmFjayBidXR0b24uXG4gKi9cblxuZnVuY3Rpb24gaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPT09IC0xO1xufVxuXG52YXIgUG9wU3RhdGVFdmVudCA9ICdwb3BzdGF0ZSc7XG52YXIgSGFzaENoYW5nZUV2ZW50ID0gJ2hhc2hjaGFuZ2UnO1xuXG5mdW5jdGlvbiBnZXRIaXN0b3J5U3RhdGUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSUUgMTEgc29tZXRpbWVzIHRocm93cyB3aGVuIGFjY2Vzc2luZyB3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9oaXN0b3J5L3B1bGwvMjg5XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHVzZXMgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGluY2x1ZGluZ1xuICogcHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeShwcm9wcykge1xuICBpZiAocHJvcHMgPT09IHZvaWQgMCkge1xuICAgIHByb3BzID0ge307XG4gIH1cblxuICAhY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAnQnJvd3NlciBoaXN0b3J5IG5lZWRzIGEgRE9NJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuVXNlSGlzdG9yeSA9IHN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgbmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIgPSAhc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZm9yY2VSZWZyZXNoID0gX3Byb3BzLmZvcmNlUmVmcmVzaCxcbiAgICAgIGZvcmNlUmVmcmVzaCA9IF9wcm9wcyRmb3JjZVJlZnJlc2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZvcmNlUmVmcmVzaCxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9PT0gdm9pZCAwID8gZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IF9wcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB2b2lkIDAgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcbiAgdmFyIGJhc2VuYW1lID0gcHJvcHMuYmFzZW5hbWUgPyBzdHJpcFRyYWlsaW5nU2xhc2goYWRkTGVhZGluZ1NsYXNoKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcblxuICBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbihoaXN0b3J5U3RhdGUpIHtcbiAgICB2YXIgX3JlZiA9IGhpc3RvcnlTdGF0ZSB8fCB7fSxcbiAgICAgICAga2V5ID0gX3JlZi5rZXksXG4gICAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICAgIHZhciBfd2luZG93JGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgICBwYXRobmFtZSA9IF93aW5kb3ckbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaCA9IF93aW5kb3ckbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoID0gX3dpbmRvdyRsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXRoID0gcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJykgOiB2b2lkIDA7XG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gc3RyaXBCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV4dHJhbmVvdXMgcG9wc3RhdGUgZXZlbnRzIGluIFdlYktpdC5cbiAgICBpZiAoaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkpIHJldHVybjtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKSk7XG4gIH1cblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldmVydFBvcChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247IC8vIFRPRE86IFdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBtb3JlIHJlbGlhYmxlIGJ5XG4gICAgLy8ga2VlcGluZyBhIGxpc3Qgb2Yga2V5cyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBrZXlzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbEtleXMuaW5kZXhPZih0b0xvY2F0aW9uLmtleSk7XG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGZyb21Mb2NhdGlvbi5rZXkpO1xuICAgIGlmIChmcm9tSW5kZXggPT09IC0xKSBmcm9tSW5kZXggPSAwO1xuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKGdldEhpc3RvcnlTdGF0ZSgpKTtcbiAgdmFyIGFsbEtleXMgPSBbaW5pdGlhbExvY2F0aW9uLmtleV07IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5wdXNoU3RhdGUoe1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIHZhciBuZXh0S2V5cyA9IGFsbEtleXMuc2xpY2UoMCwgcHJldkluZGV4ICsgMSk7XG4gICAgICAgICAgbmV4dEtleXMucHVzaChsb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIGFsbEtleXMgPSBuZXh0S2V5cztcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5JykgOiB2b2lkIDA7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG4gICAgICBpZiAoY2FuVXNlSGlzdG9yeSkge1xuICAgICAgICBnbG9iYWxIaXN0b3J5LnJlcGxhY2VTdGF0ZSh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgIH0sIG51bGwsIGhyZWYpO1xuXG4gICAgICAgIGlmIChmb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsS2V5c1twcmV2SW5kZXhdID0gbG9jYXRpb24ua2V5O1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKSA6IHZvaWQgMDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tET01MaXN0ZW5lcnMoZGVsdGEpIHtcbiAgICBsaXN0ZW5lckNvdW50ICs9IGRlbHRhO1xuXG4gICAgaWYgKGxpc3RlbmVyQ291bnQgPT09IDEgJiYgZGVsdGEgPT09IDEpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYmxvY2socHJvbXB0KSB7XG4gICAgaWYgKHByb21wdCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm9tcHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbnZhciBIYXNoQ2hhbmdlRXZlbnQkMSA9ICdoYXNoY2hhbmdlJztcbnZhciBIYXNoUGF0aENvZGVycyA9IHtcbiAgaGFzaGJhbmc6IHtcbiAgICBlbmNvZGVQYXRoOiBmdW5jdGlvbiBlbmNvZGVQYXRoKHBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJyEnID8gcGF0aCA6ICchLycgKyBzdHJpcExlYWRpbmdTbGFzaChwYXRoKTtcbiAgICB9LFxuICAgIGRlY29kZVBhdGg6IGZ1bmN0aW9uIGRlY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG4gICAgfVxuICB9LFxuICBub3NsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogc3RyaXBMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH0sXG4gIHNsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IGFkZExlYWRpbmdTbGFzaFxuICB9XG59O1xuXG5mdW5jdGlvbiBzdHJpcEhhc2godXJsKSB7XG4gIHZhciBoYXNoSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICByZXR1cm4gaGFzaEluZGV4ID09PSAtMSA/IHVybCA6IHVybC5zbGljZSgwLCBoYXNoSW5kZXgpO1xufVxuXG5mdW5jdGlvbiBnZXRIYXNoUGF0aCgpIHtcbiAgLy8gV2UgY2FuJ3QgdXNlIHdpbmRvdy5sb2NhdGlvbi5oYXNoIGhlcmUgYmVjYXVzZSBpdCdzIG5vdFxuICAvLyBjb25zaXN0ZW50IGFjcm9zcyBicm93c2VycyAtIEZpcmVmb3ggd2lsbCBwcmUtZGVjb2RlIGl0IVxuICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICB2YXIgaGFzaEluZGV4ID0gaHJlZi5pbmRleE9mKCcjJyk7XG4gIHJldHVybiBoYXNoSW5kZXggPT09IC0xID8gJycgOiBocmVmLnN1YnN0cmluZyhoYXNoSW5kZXggKyAxKTtcbn1cblxuZnVuY3Rpb24gcHVzaEhhc2hQYXRoKHBhdGgpIHtcbiAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShzdHJpcEhhc2god2luZG93LmxvY2F0aW9uLmhyZWYpICsgJyMnICsgcGF0aCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc2hIaXN0b3J5KHByb3BzKSB7XG4gIGlmIChwcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgcHJvcHMgPSB7fTtcbiAgfVxuXG4gICFjYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsICdIYXNoIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHZhciBnbG9iYWxIaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gIHZhciBjYW5Hb1dpdGhvdXRSZWxvYWQgPSBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpO1xuICB2YXIgX3Byb3BzID0gcHJvcHMsXG4gICAgICBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPSBfcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPT09IHZvaWQgMCA/IGdldENvbmZpcm1hdGlvbiA6IF9wcm9wcyRnZXRVc2VyQ29uZmlybSxcbiAgICAgIF9wcm9wcyRoYXNoVHlwZSA9IF9wcm9wcy5oYXNoVHlwZSxcbiAgICAgIGhhc2hUeXBlID0gX3Byb3BzJGhhc2hUeXBlID09PSB2b2lkIDAgPyAnc2xhc2gnIDogX3Byb3BzJGhhc2hUeXBlO1xuICB2YXIgYmFzZW5hbWUgPSBwcm9wcy5iYXNlbmFtZSA/IHN0cmlwVHJhaWxpbmdTbGFzaChhZGRMZWFkaW5nU2xhc2gocHJvcHMuYmFzZW5hbWUpKSA6ICcnO1xuICB2YXIgX0hhc2hQYXRoQ29kZXJzJGhhc2hUID0gSGFzaFBhdGhDb2RlcnNbaGFzaFR5cGVdLFxuICAgICAgZW5jb2RlUGF0aCA9IF9IYXNoUGF0aENvZGVycyRoYXNoVC5lbmNvZGVQYXRoLFxuICAgICAgZGVjb2RlUGF0aCA9IF9IYXNoUGF0aENvZGVycyRoYXNoVC5kZWNvZGVQYXRoO1xuXG4gIGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKCkge1xuICAgIHZhciBwYXRoID0gZGVjb2RlUGF0aChnZXRIYXNoUGF0aCgpKTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCFiYXNlbmFtZSB8fCBoYXNCYXNlbmFtZShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpIDogdm9pZCAwO1xuICAgIGlmIChiYXNlbmFtZSkgcGF0aCA9IHN0cmlwQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpO1xuICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbihwYXRoKTtcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfVxuXG4gIHZhciBmb3JjZU5leHRQb3AgPSBmYWxzZTtcbiAgdmFyIGlnbm9yZVBhdGggPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGxvY2F0aW9uc0FyZUVxdWFsJCQxKGEsIGIpIHtcbiAgICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiYgYS5oYXNoID09PSBiLmhhc2g7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcbiAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuXG4gICAgaWYgKHBhdGggIT09IGVuY29kZWRQYXRoKSB7XG4gICAgICAvLyBFbnN1cmUgd2UgYWx3YXlzIGhhdmUgYSBwcm9wZXJseS1lbmNvZGVkIGhhc2guXG4gICAgICByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICAgICAgdmFyIHByZXZMb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247XG4gICAgICBpZiAoIWZvcmNlTmV4dFBvcCAmJiBsb2NhdGlvbnNBcmVFcXVhbCQkMShwcmV2TG9jYXRpb24sIGxvY2F0aW9uKSkgcmV0dXJuOyAvLyBBIGhhc2hjaGFuZ2UgZG9lc24ndCBhbHdheXMgPT0gbG9jYXRpb24gY2hhbmdlLlxuXG4gICAgICBpZiAoaWdub3JlUGF0aCA9PT0gY3JlYXRlUGF0aChsb2NhdGlvbikpIHJldHVybjsgLy8gSWdub3JlIHRoaXMgY2hhbmdlOyB3ZSBhbHJlYWR5IHNldFN0YXRlIGluIHB1c2gvcmVwbGFjZS5cblxuICAgICAgaWdub3JlUGF0aCA9IG51bGw7XG4gICAgICBoYW5kbGVQb3AobG9jYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uOyAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIHBhdGhzIHdlJ3ZlIHNlZW4gaW4gc2Vzc2lvblN0b3JhZ2UuXG4gICAgLy8gSW5zdGVhZCwgd2UganVzdCBkZWZhdWx0IHRvIDAgZm9yIHBhdGhzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgodG9Mb2NhdGlvbikpO1xuICAgIGlmICh0b0luZGV4ID09PSAtMSkgdG9JbmRleCA9IDA7XG4gICAgdmFyIGZyb21JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoZnJvbUxvY2F0aW9uKSk7XG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG4gICAgdmFyIGRlbHRhID0gdG9JbmRleCAtIGZyb21JbmRleDtcblxuICAgIGlmIChkZWx0YSkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gdHJ1ZTtcbiAgICAgIGdvKGRlbHRhKTtcbiAgICB9XG4gIH0gLy8gRW5zdXJlIHRoZSBoYXNoIGlzIGVuY29kZWQgcHJvcGVybHkgYmVmb3JlIGRvaW5nIGFueXRoaW5nIGVsc2UuXG5cblxuICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG4gIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgocGF0aCk7XG4gIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKCk7XG4gIHZhciBhbGxQYXRocyA9IFtjcmVhdGVQYXRoKGluaXRpYWxMb2NhdGlvbildOyAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHZhciBiYXNlVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpO1xuICAgIHZhciBocmVmID0gJyc7XG5cbiAgICBpZiAoYmFzZVRhZyAmJiBiYXNlVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpKSB7XG4gICAgICBocmVmID0gc3RyaXBIYXNoKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaHJlZiArICcjJyArIGVuY29kZVBhdGgoYmFzZW5hbWUgKyBjcmVhdGVQYXRoKGxvY2F0aW9uKSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBwdXNoIHN0YXRlOyBpdCBpcyBpZ25vcmVkJykgOiB2b2lkIDA7XG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUFVTSCwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcHVzaEhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgICB2YXIgbmV4dFBhdGhzID0gYWxsUGF0aHMuc2xpY2UoMCwgcHJldkluZGV4ICsgMSk7XG4gICAgICAgIG5leHRQYXRocy5wdXNoKHBhdGgpO1xuICAgICAgICBhbGxQYXRocyA9IG5leHRQYXRocztcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoZmFsc2UsICdIYXNoIGhpc3RvcnkgY2Fubm90IFBVU0ggdGhlIHNhbWUgcGF0aDsgYSBuZXcgZW50cnkgd2lsbCBub3QgYmUgYWRkZWQgdG8gdGhlIGhpc3Rvcnkgc3RhY2snKSA6IHZvaWQgMDtcbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdIYXNoIGhpc3RvcnkgY2Fubm90IHJlcGxhY2Ugc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgdmFyIHBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgoYmFzZW5hbWUgKyBwYXRoKTtcbiAgICAgIHZhciBoYXNoQ2hhbmdlZCA9IGdldEhhc2hQYXRoKCkgIT09IGVuY29kZWRQYXRoO1xuXG4gICAgICBpZiAoaGFzaENoYW5nZWQpIHtcbiAgICAgICAgLy8gV2UgY2Fubm90IHRlbGwgaWYgYSBoYXNoY2hhbmdlIHdhcyBjYXVzZWQgYnkgYSBSRVBMQUNFLCBzbyB3ZSdkXG4gICAgICAgIC8vIHJhdGhlciBzZXRTdGF0ZSBoZXJlIGFuZCBpZ25vcmUgdGhlIGhhc2hjaGFuZ2UuIFRoZSBjYXZlYXQgaGVyZVxuICAgICAgICAvLyBpcyB0aGF0IG90aGVyIGhhc2ggaGlzdG9yaWVzIGluIHRoZSBwYWdlIHdpbGwgY29uc2lkZXIgaXQgYSBQT1AuXG4gICAgICAgIGlnbm9yZVBhdGggPSBwYXRoO1xuICAgICAgICByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMuaW5kZXhPZihjcmVhdGVQYXRoKGhpc3RvcnkubG9jYXRpb24pKTtcbiAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxQYXRoc1twcmV2SW5kZXhdID0gcGF0aDtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhjYW5Hb1dpdGhvdXRSZWxvYWQsICdIYXNoIGhpc3RvcnkgZ28obikgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZCBpbiB0aGlzIGJyb3dzZXInKSA6IHZvaWQgMDtcbiAgICBnbG9iYWxIaXN0b3J5LmdvKG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSAmJiBkZWx0YSA9PT0gMSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50JDEsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoSGFzaENoYW5nZUV2ZW50JDEsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZnVuY3Rpb24gY2xhbXAobiwgbG93ZXJCb3VuZCwgdXBwZXJCb3VuZCkge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobiwgbG93ZXJCb3VuZCksIHVwcGVyQm91bmQpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCBzdG9yZXMgbG9jYXRpb25zIGluIG1lbW9yeS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZU1lbW9yeUhpc3RvcnkocHJvcHMpIHtcbiAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICBwcm9wcyA9IHt9O1xuICB9XG5cbiAgdmFyIF9wcm9wcyA9IHByb3BzLFxuICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IF9wcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgX3Byb3BzJGluaXRpYWxFbnRyaWVzID0gX3Byb3BzLmluaXRpYWxFbnRyaWVzLFxuICAgICAgaW5pdGlhbEVudHJpZXMgPSBfcHJvcHMkaW5pdGlhbEVudHJpZXMgPT09IHZvaWQgMCA/IFsnLyddIDogX3Byb3BzJGluaXRpYWxFbnRyaWVzLFxuICAgICAgX3Byb3BzJGluaXRpYWxJbmRleCA9IF9wcm9wcy5pbml0aWFsSW5kZXgsXG4gICAgICBpbml0aWFsSW5kZXggPSBfcHJvcHMkaW5pdGlhbEluZGV4ID09PSB2b2lkIDAgPyAwIDogX3Byb3BzJGluaXRpYWxJbmRleCxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBfcHJvcHMua2V5TGVuZ3RoLFxuICAgICAga2V5TGVuZ3RoID0gX3Byb3BzJGtleUxlbmd0aCA9PT0gdm9pZCAwID8gNiA6IF9wcm9wcyRrZXlMZW5ndGg7XG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwga2V5TGVuZ3RoKTtcbiAgfVxuXG4gIHZhciBpbmRleCA9IGNsYW1wKGluaXRpYWxJbmRleCwgMCwgaW5pdGlhbEVudHJpZXMubGVuZ3RoIC0gMSk7XG4gIHZhciBlbnRyaWVzID0gaW5pdGlhbEVudHJpZXMubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgIHJldHVybiB0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnID8gY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgY3JlYXRlS2V5KCkpIDogY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgZW50cnkua2V5IHx8IGNyZWF0ZUtleSgpKTtcbiAgfSk7IC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICB2YXIgY3JlYXRlSHJlZiA9IGNyZWF0ZVBhdGg7XG5cbiAgZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcHVzaCB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKSA6IHZvaWQgMDtcbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcbiAgICAgIHZhciBwcmV2SW5kZXggPSBoaXN0b3J5LmluZGV4O1xuICAgICAgdmFyIG5leHRJbmRleCA9IHByZXZJbmRleCArIDE7XG4gICAgICB2YXIgbmV4dEVudHJpZXMgPSBoaXN0b3J5LmVudHJpZXMuc2xpY2UoMCk7XG5cbiAgICAgIGlmIChuZXh0RW50cmllcy5sZW5ndGggPiBuZXh0SW5kZXgpIHtcbiAgICAgICAgbmV4dEVudHJpZXMuc3BsaWNlKG5leHRJbmRleCwgbmV4dEVudHJpZXMubGVuZ3RoIC0gbmV4dEluZGV4LCBsb2NhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0RW50cmllcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgICBlbnRyaWVzOiBuZXh0RW50cmllc1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byByZXBsYWNlIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpIDogdm9pZCAwO1xuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuICAgICAgaGlzdG9yeS5lbnRyaWVzW2hpc3RvcnkuaW5kZXhdID0gbG9jYXRpb247XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBjbGFtcChoaXN0b3J5LmluZGV4ICsgbiwgMCwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aCAtIDEpO1xuICAgIHZhciBhY3Rpb24gPSAnUE9QJztcbiAgICB2YXIgbG9jYXRpb24gPSBoaXN0b3J5LmVudHJpZXNbbmV4dEluZGV4XTtcbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgICAgaW5kZXg6IG5leHRJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE1pbWljIHRoZSBiZWhhdmlvciBvZiBET00gaGlzdG9yaWVzIGJ5XG4gICAgICAgIC8vIGNhdXNpbmcgYSByZW5kZXIgYWZ0ZXIgYSBjYW5jZWxsZWQgUE9QLlxuICAgICAgICBzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbkdvKG4pIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gaGlzdG9yeS5pbmRleCArIG47XG4gICAgcmV0dXJuIG5leHRJbmRleCA+PSAwICYmIG5leHRJbmRleCA8IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBibG9jayhwcm9tcHQpIHtcbiAgICBpZiAocHJvbXB0ID09PSB2b2lkIDApIHtcbiAgICAgIHByb21wdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGVudHJpZXMubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGVudHJpZXNbaW5kZXhdLFxuICAgIGluZGV4OiBpbmRleCxcbiAgICBlbnRyaWVzOiBlbnRyaWVzLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBjYW5HbzogY2FuR28sXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG5leHBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSwgY3JlYXRlSGFzaEhpc3RvcnksIGNyZWF0ZU1lbW9yeUhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCwgcGFyc2VQYXRoLCBjcmVhdGVQYXRoIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSwgWWFob28hIEluYy5cbiAqIENvcHlyaWdodHMgbGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgTGljZW5zZS4gU2VlIHRoZSBhY2NvbXBhbnlpbmcgTElDRU5TRSBmaWxlIGZvciB0ZXJtcy5cbiAqL1xudmFyIFJFQUNUX1NUQVRJQ1MgPSB7XG4gIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICBjb250ZXh0VHlwZTogdHJ1ZSxcbiAgY29udGV4dFR5cGVzOiB0cnVlLFxuICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gIGRpc3BsYXlOYW1lOiB0cnVlLFxuICBnZXREZWZhdWx0UHJvcHM6IHRydWUsXG4gIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcjogdHJ1ZSxcbiAgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiB0cnVlLFxuICBtaXhpbnM6IHRydWUsXG4gIHByb3BUeXBlczogdHJ1ZSxcbiAgdHlwZTogdHJ1ZVxufTtcbnZhciBLTk9XTl9TVEFUSUNTID0ge1xuICBuYW1lOiB0cnVlLFxuICBsZW5ndGg6IHRydWUsXG4gIHByb3RvdHlwZTogdHJ1ZSxcbiAgY2FsbGVyOiB0cnVlLFxuICBjYWxsZWU6IHRydWUsXG4gIGFyZ3VtZW50czogdHJ1ZSxcbiAgYXJpdHk6IHRydWVcbn07XG52YXIgRk9SV0FSRF9SRUZfU1RBVElDUyA9IHtcbiAgJyQkdHlwZW9mJzogdHJ1ZSxcbiAgcmVuZGVyOiB0cnVlLFxuICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gIGRpc3BsYXlOYW1lOiB0cnVlLFxuICBwcm9wVHlwZXM6IHRydWVcbn07XG52YXIgTUVNT19TVEFUSUNTID0ge1xuICAnJCR0eXBlb2YnOiB0cnVlLFxuICBjb21wYXJlOiB0cnVlLFxuICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gIGRpc3BsYXlOYW1lOiB0cnVlLFxuICBwcm9wVHlwZXM6IHRydWUsXG4gIHR5cGU6IHRydWVcbn07XG52YXIgVFlQRV9TVEFUSUNTID0ge307XG5UWVBFX1NUQVRJQ1NbcmVhY3RJcy5Gb3J3YXJkUmVmXSA9IEZPUldBUkRfUkVGX1NUQVRJQ1M7XG5UWVBFX1NUQVRJQ1NbcmVhY3RJcy5NZW1vXSA9IE1FTU9fU1RBVElDUztcblxuZnVuY3Rpb24gZ2V0U3RhdGljcyhjb21wb25lbnQpIHtcbiAgLy8gUmVhY3QgdjE2LjExIGFuZCBiZWxvd1xuICBpZiAocmVhY3RJcy5pc01lbW8oY29tcG9uZW50KSkge1xuICAgIHJldHVybiBNRU1PX1NUQVRJQ1M7XG4gIH0gLy8gUmVhY3QgdjE2LjEyIGFuZCBhYm92ZVxuXG5cbiAgcmV0dXJuIFRZUEVfU1RBVElDU1tjb21wb25lbnRbJyQkdHlwZW9mJ11dIHx8IFJFQUNUX1NUQVRJQ1M7XG59XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5mdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgYmxhY2tsaXN0KSB7XG4gIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgIC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG4gICAgaWYgKG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgdmFyIGluaGVyaXRlZENvbXBvbmVudCA9IGdldFByb3RvdHlwZU9mKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgIGlmIChpbmhlcml0ZWRDb21wb25lbnQgJiYgaW5oZXJpdGVkQ29tcG9uZW50ICE9PSBvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBpbmhlcml0ZWRDb21wb25lbnQsIGJsYWNrbGlzdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICBpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICBrZXlzID0ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRTdGF0aWNzID0gZ2V0U3RhdGljcyh0YXJnZXRDb21wb25lbnQpO1xuICAgIHZhciBzb3VyY2VTdGF0aWNzID0gZ2V0U3RhdGljcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgaWYgKCFLTk9XTl9TVEFUSUNTW2tleV0gJiYgIShibGFja2xpc3QgJiYgYmxhY2tsaXN0W2tleV0pICYmICEoc291cmNlU3RhdGljcyAmJiBzb3VyY2VTdGF0aWNzW2tleV0pICYmICEodGFyZ2V0U3RhdGljcyAmJiB0YXJnZXRTdGF0aWNzW2tleV0pKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZUNvbXBvbmVudCwga2V5KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIEF2b2lkIGZhaWx1cmVzIGZyb20gcmVhZC1vbmx5IHByb3BlcnRpZXNcbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXRDb21wb25lbnQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBob2lzdE5vblJlYWN0U3RhdGljcztcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgZ3VkIGZyb20gJ2d1ZCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd0aW55LXdhcm5pbmcnO1xuXG52YXIgTUFYX1NJR05FRF8zMV9CSVRfSU5UID0gMTA3Mzc0MTgyMztcblxuZnVuY3Rpb24gb2JqZWN0SXMoeCwgeSkge1xuICBpZiAoeCA9PT0geSkge1xuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RW1pdHRlcih2YWx1ZSkge1xuICB2YXIgaGFuZGxlcnMgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBvbjogZnVuY3Rpb24gb24oaGFuZGxlcikge1xuICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gb2ZmKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXJzID0gaGFuZGxlcnMuZmlsdGVyKGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiBoICE9PSBoYW5kbGVyO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIodmFsdWUsIGNoYW5nZWRCaXRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuWzBdIDogY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0Q29udGV4dChkZWZhdWx0VmFsdWUsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXgsIF9Db25zdW1lciRjb250ZXh0VHlwZTtcblxuICB2YXIgY29udGV4dFByb3AgPSAnX19jcmVhdGUtcmVhY3QtY29udGV4dC0nICsgZ3VkKCkgKyAnX18nO1xuXG4gIHZhciBQcm92aWRlciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShQcm92aWRlciwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBQcm92aWRlcigpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIF90aGlzLmVtaXR0ZXIgPSBjcmVhdGVFdmVudEVtaXR0ZXIoX3RoaXMucHJvcHMudmFsdWUpO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8gPSBQcm92aWRlci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8uZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbY29udGV4dFByb3BdID0gdGhpcy5lbWl0dGVyLCBfcmVmO1xuICAgIH07XG5cbiAgICBfcHJvdG8uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSAhPT0gbmV4dFByb3BzLnZhbHVlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMucHJvcHMudmFsdWU7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcbiAgICAgICAgdmFyIGNoYW5nZWRCaXRzO1xuXG4gICAgICAgIGlmIChvYmplY3RJcyhvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgY2hhbmdlZEJpdHMgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYW5nZWRCaXRzID0gdHlwZW9mIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSAnZnVuY3Rpb24nID8gY2FsY3VsYXRlQ2hhbmdlZEJpdHMob2xkVmFsdWUsIG5ld1ZhbHVlKSA6IE1BWF9TSUdORURfMzFfQklUX0lOVDtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICB3YXJuaW5nKChjaGFuZ2VkQml0cyAmIE1BWF9TSUdORURfMzFfQklUX0lOVCkgPT09IGNoYW5nZWRCaXRzLCAnY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IEV4cGVjdGVkIHRoZSByZXR1cm4gdmFsdWUgdG8gYmUgYSAnICsgJzMxLWJpdCBpbnRlZ2VyLiBJbnN0ZWFkIHJlY2VpdmVkOiAnICsgY2hhbmdlZEJpdHMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoYW5nZWRCaXRzIHw9IDA7XG5cbiAgICAgICAgICBpZiAoY2hhbmdlZEJpdHMgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zZXQobmV4dFByb3BzLnZhbHVlLCBjaGFuZ2VkQml0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3ZpZGVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtjb250ZXh0UHJvcF0gPSBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgdmFyIENvbnN1bWVyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NvbXBvbmVudDIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShDb25zdW1lciwgX0NvbXBvbmVudDIpO1xuXG4gICAgZnVuY3Rpb24gQ29uc3VtZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyO1xuXG4gICAgICBfdGhpczIgPSBfQ29tcG9uZW50Mi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICBfdGhpczIuc3RhdGUgPSB7XG4gICAgICAgIHZhbHVlOiBfdGhpczIuZ2V0VmFsdWUoKVxuICAgICAgfTtcblxuICAgICAgX3RoaXMyLm9uVXBkYXRlID0gZnVuY3Rpb24gKG5ld1ZhbHVlLCBjaGFuZ2VkQml0cykge1xuICAgICAgICB2YXIgb2JzZXJ2ZWRCaXRzID0gX3RoaXMyLm9ic2VydmVkQml0cyB8IDA7XG5cbiAgICAgICAgaWYgKChvYnNlcnZlZEJpdHMgJiBjaGFuZ2VkQml0cykgIT09IDApIHtcbiAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdmFsdWU6IF90aGlzMi5nZXRWYWx1ZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBfdGhpczI7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzIgPSBDb25zdW1lci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IG5leHRQcm9wcy5vYnNlcnZlZEJpdHM7XG4gICAgICB0aGlzLm9ic2VydmVkQml0cyA9IG9ic2VydmVkQml0cyA9PT0gdW5kZWZpbmVkIHx8IG9ic2VydmVkQml0cyA9PT0gbnVsbCA/IE1BWF9TSUdORURfMzFfQklUX0lOVCA6IG9ic2VydmVkQml0cztcbiAgICB9O1xuXG4gICAgX3Byb3RvMi5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5vbih0aGlzLm9uVXBkYXRlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9ic2VydmVkQml0cyA9IHRoaXMucHJvcHMub2JzZXJ2ZWRCaXRzO1xuICAgICAgdGhpcy5vYnNlcnZlZEJpdHMgPSBvYnNlcnZlZEJpdHMgPT09IHVuZGVmaW5lZCB8fCBvYnNlcnZlZEJpdHMgPT09IG51bGwgPyBNQVhfU0lHTkVEXzMxX0JJVF9JTlQgOiBvYnNlcnZlZEJpdHM7XG4gICAgfTtcblxuICAgIF9wcm90bzIuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRleHRbY29udGV4dFByb3BdKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFtjb250ZXh0UHJvcF0ub2ZmKHRoaXMub25VcGRhdGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0W2NvbnRleHRQcm9wXS5nZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzIucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG9ubHlDaGlsZCh0aGlzLnByb3BzLmNoaWxkcmVuKSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbnN1bWVyO1xuICB9KENvbXBvbmVudCk7XG5cbiAgQ29uc3VtZXIuY29udGV4dFR5cGVzID0gKF9Db25zdW1lciRjb250ZXh0VHlwZSA9IHt9LCBfQ29uc3VtZXIkY29udGV4dFR5cGVbY29udGV4dFByb3BdID0gUHJvcFR5cGVzLm9iamVjdCwgX0NvbnN1bWVyJGNvbnRleHRUeXBlKTtcbiAgcmV0dXJuIHtcbiAgICBQcm92aWRlcjogUHJvdmlkZXIsXG4gICAgQ29uc3VtZXI6IENvbnN1bWVyXG4gIH07XG59XG5cbnZhciBpbmRleCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQgfHwgY3JlYXRlUmVhY3RDb250ZXh0O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsInZhciBpc2FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbi8qKlxuICogRXhwb3NlIGBwYXRoVG9SZWdleHBgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGhUb1JlZ2V4cFxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZVxubW9kdWxlLmV4cG9ydHMuY29tcGlsZSA9IGNvbXBpbGVcbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvRnVuY3Rpb24gPSB0b2tlbnNUb0Z1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb1JlZ0V4cCA9IHRva2Vuc1RvUmVnRXhwXG5cbi8qKlxuICogVGhlIG1haW4gcGF0aCBtYXRjaGluZyByZWdleHAgdXRpbGl0eS5cbiAqXG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG52YXIgUEFUSF9SRUdFWFAgPSBuZXcgUmVnRXhwKFtcbiAgLy8gTWF0Y2ggZXNjYXBlZCBjaGFyYWN0ZXJzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGFwcGVhciBpbiBmdXR1cmUgbWF0Y2hlcy5cbiAgLy8gVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB0aGF0IHdvbid0IHRyYW5zZm9ybS5cbiAgJyhcXFxcXFxcXC4pJyxcbiAgLy8gTWF0Y2ggRXhwcmVzcy1zdHlsZSBwYXJhbWV0ZXJzIGFuZCB1bi1uYW1lZCBwYXJhbWV0ZXJzIHdpdGggYSBwcmVmaXhcbiAgLy8gYW5kIG9wdGlvbmFsIHN1ZmZpeGVzLiBNYXRjaGVzIGFwcGVhciBhczpcbiAgLy9cbiAgLy8gXCIvOnRlc3QoXFxcXGQrKT9cIiA9PiBbXCIvXCIsIFwidGVzdFwiLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCBcIj9cIiwgdW5kZWZpbmVkXVxuICAvLyBcIi9yb3V0ZShcXFxcZCspXCIgID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gIC8vIFwiLypcIiAgICAgICAgICAgID0+IFtcIi9cIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIipcIl1cbiAgJyhbXFxcXC8uXSk/KD86KD86XFxcXDooXFxcXHcrKSg/OlxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpP3xcXFxcKCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpXSkrKVxcXFwpKShbKyo/XSk/fChcXFxcKikpJ1xuXS5qb2luKCd8JyksICdnJylcblxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBmb3IgdGhlIHJhdyB0b2tlbnMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshQXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlIChzdHIsIG9wdGlvbnMpIHtcbiAgdmFyIHRva2VucyA9IFtdXG4gIHZhciBrZXkgPSAwXG4gIHZhciBpbmRleCA9IDBcbiAgdmFyIHBhdGggPSAnJ1xuICB2YXIgZGVmYXVsdERlbGltaXRlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWxpbWl0ZXIgfHwgJy8nXG4gIHZhciByZXNcblxuICB3aGlsZSAoKHJlcyA9IFBBVEhfUkVHRVhQLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xuICAgIHZhciBtID0gcmVzWzBdXG4gICAgdmFyIGVzY2FwZWQgPSByZXNbMV1cbiAgICB2YXIgb2Zmc2V0ID0gcmVzLmluZGV4XG4gICAgcGF0aCArPSBzdHIuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICBpbmRleCA9IG9mZnNldCArIG0ubGVuZ3RoXG5cbiAgICAvLyBJZ25vcmUgYWxyZWFkeSBlc2NhcGVkIHNlcXVlbmNlcy5cbiAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgcGF0aCArPSBlc2NhcGVkWzFdXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBuZXh0ID0gc3RyW2luZGV4XVxuICAgIHZhciBwcmVmaXggPSByZXNbMl1cbiAgICB2YXIgbmFtZSA9IHJlc1szXVxuICAgIHZhciBjYXB0dXJlID0gcmVzWzRdXG4gICAgdmFyIGdyb3VwID0gcmVzWzVdXG4gICAgdmFyIG1vZGlmaWVyID0gcmVzWzZdXG4gICAgdmFyIGFzdGVyaXNrID0gcmVzWzddXG5cbiAgICAvLyBQdXNoIHRoZSBjdXJyZW50IHBhdGggb250byB0aGUgdG9rZW5zLlxuICAgIGlmIChwYXRoKSB7XG4gICAgICB0b2tlbnMucHVzaChwYXRoKVxuICAgICAgcGF0aCA9ICcnXG4gICAgfVxuXG4gICAgdmFyIHBhcnRpYWwgPSBwcmVmaXggIT0gbnVsbCAmJiBuZXh0ICE9IG51bGwgJiYgbmV4dCAhPT0gcHJlZml4XG4gICAgdmFyIHJlcGVhdCA9IG1vZGlmaWVyID09PSAnKycgfHwgbW9kaWZpZXIgPT09ICcqJ1xuICAgIHZhciBvcHRpb25hbCA9IG1vZGlmaWVyID09PSAnPycgfHwgbW9kaWZpZXIgPT09ICcqJ1xuICAgIHZhciBkZWxpbWl0ZXIgPSByZXNbMl0gfHwgZGVmYXVsdERlbGltaXRlclxuICAgIHZhciBwYXR0ZXJuID0gY2FwdHVyZSB8fCBncm91cFxuXG4gICAgdG9rZW5zLnB1c2goe1xuICAgICAgbmFtZTogbmFtZSB8fCBrZXkrKyxcbiAgICAgIHByZWZpeDogcHJlZml4IHx8ICcnLFxuICAgICAgZGVsaW1pdGVyOiBkZWxpbWl0ZXIsXG4gICAgICBvcHRpb25hbDogb3B0aW9uYWwsXG4gICAgICByZXBlYXQ6IHJlcGVhdCxcbiAgICAgIHBhcnRpYWw6IHBhcnRpYWwsXG4gICAgICBhc3RlcmlzazogISFhc3RlcmlzayxcbiAgICAgIHBhdHRlcm46IHBhdHRlcm4gPyBlc2NhcGVHcm91cChwYXR0ZXJuKSA6IChhc3RlcmlzayA/ICcuKicgOiAnW14nICsgZXNjYXBlU3RyaW5nKGRlbGltaXRlcikgKyAnXSs/JylcbiAgICB9KVxuICB9XG5cbiAgLy8gTWF0Y2ggYW55IGNoYXJhY3RlcnMgc3RpbGwgcmVtYWluaW5nLlxuICBpZiAoaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgcGF0aCArPSBzdHIuc3Vic3RyKGluZGV4KVxuICB9XG5cbiAgLy8gSWYgdGhlIHBhdGggZXhpc3RzLCBwdXNoIGl0IG9udG8gdGhlIGVuZC5cbiAgaWYgKHBhdGgpIHtcbiAgICB0b2tlbnMucHVzaChwYXRoKVxuICB9XG5cbiAgcmV0dXJuIHRva2Vuc1xufVxuXG4vKipcbiAqIENvbXBpbGUgYSBzdHJpbmcgdG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbiBmb3IgdGhlIHBhdGguXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICBzdHJcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IWZ1bmN0aW9uKE9iamVjdD0sIE9iamVjdD0pfVxuICovXG5mdW5jdGlvbiBjb21waWxlIChzdHIsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRva2Vuc1RvRnVuY3Rpb24ocGFyc2Uoc3RyLCBvcHRpb25zKSwgb3B0aW9ucylcbn1cblxuLyoqXG4gKiBQcmV0dGllciBlbmNvZGluZyBvZiBVUkkgcGF0aCBzZWdtZW50cy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudFByZXR0eSAoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUkkoc3RyKS5yZXBsYWNlKC9bXFwvPyNdL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEVuY29kZSB0aGUgYXN0ZXJpc2sgcGFyYW1ldGVyLiBTaW1pbGFyIHRvIGBwcmV0dHlgLCBidXQgYWxsb3dzIHNsYXNoZXMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbmNvZGVBc3RlcmlzayAoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUkkoc3RyKS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEV4cG9zZSBhIG1ldGhvZCBmb3IgdHJhbnNmb3JtaW5nIHRva2VucyBpbnRvIHRoZSBwYXRoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB0b2tlbnNUb0Z1bmN0aW9uICh0b2tlbnMsIG9wdGlvbnMpIHtcbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHRva2VucyBpbnRvIHJlZ2V4cHMuXG4gIHZhciBtYXRjaGVzID0gbmV3IEFycmF5KHRva2Vucy5sZW5ndGgpXG5cbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHBhdHRlcm5zIGJlZm9yZSBjb21waWxhdGlvbi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIHRva2Vuc1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1hdGNoZXNbaV0gPSBuZXcgUmVnRXhwKCdeKD86JyArIHRva2Vuc1tpXS5wYXR0ZXJuICsgJykkJywgZmxhZ3Mob3B0aW9ucykpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICB2YXIgcGF0aCA9ICcnXG4gICAgdmFyIGRhdGEgPSBvYmogfHwge31cbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgfHwge31cbiAgICB2YXIgZW5jb2RlID0gb3B0aW9ucy5wcmV0dHkgPyBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgOiBlbmNvZGVVUklDb21wb25lbnRcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF0aCArPSB0b2tlblxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IGRhdGFbdG9rZW4ubmFtZV1cbiAgICAgIHZhciBzZWdtZW50XG5cbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICAgIC8vIFByZXBlbmQgcGFydGlhbCBzZWdtZW50IHByZWZpeGVzLlxuICAgICAgICAgIGlmICh0b2tlbi5wYXJ0aWFsKSB7XG4gICAgICAgICAgICBwYXRoICs9IHRva2VuLnByZWZpeFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBiZSBkZWZpbmVkJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNhcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCByZXBlYXQsIGJ1dCByZWNlaXZlZCBgJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICdgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IGJlIGVtcHR5JylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSlcblxuICAgICAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeShzZWdtZW50KSArICdgJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXRoICs9IChqID09PSAwID8gdG9rZW4ucHJlZml4IDogdG9rZW4uZGVsaW1pdGVyKSArIHNlZ21lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHNlZ21lbnQgPSB0b2tlbi5hc3RlcmlzayA/IGVuY29kZUFzdGVyaXNrKHZhbHVlKSA6IGVuY29kZSh2YWx1ZSlcblxuICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgXCInICsgc2VnbWVudCArICdcIicpXG4gICAgICB9XG5cbiAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudFxuICAgIH1cblxuICAgIHJldHVybiBwYXRoXG4gIH1cbn1cblxuLyoqXG4gKiBFc2NhcGUgYSByZWd1bGFyIGV4cHJlc3Npb24gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFsuKyo/PV4hOiR7fSgpW1xcXXxcXC9cXFxcXSkvZywgJ1xcXFwkMScpXG59XG5cbi8qKlxuICogRXNjYXBlIHRoZSBjYXB0dXJpbmcgZ3JvdXAgYnkgZXNjYXBpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCBtZWFuaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gZ3JvdXBcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZXNjYXBlR3JvdXAgKGdyb3VwKSB7XG4gIHJldHVybiBncm91cC5yZXBsYWNlKC8oWz0hOiRcXC8oKV0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEF0dGFjaCB0aGUga2V5cyBhcyBhIHByb3BlcnR5IG9mIHRoZSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcmVcbiAqIEBwYXJhbSAge0FycmF5fSAgIGtleXNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGF0dGFjaEtleXMgKHJlLCBrZXlzKSB7XG4gIHJlLmtleXMgPSBrZXlzXG4gIHJldHVybiByZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZmxhZ3MgZm9yIGEgcmVnZXhwIGZyb20gdGhlIG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZsYWdzIChvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuc2Vuc2l0aXZlID8gJycgOiAnaSdcbn1cblxuLyoqXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAgKHBhdGgsIGtleXMpIHtcbiAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpXG5cbiAgaWYgKGdyb3Vwcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXlzLnB1c2goe1xuICAgICAgICBuYW1lOiBpLFxuICAgICAgICBwcmVmaXg6IG51bGwsXG4gICAgICAgIGRlbGltaXRlcjogbnVsbCxcbiAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgICBwYXJ0aWFsOiBmYWxzZSxcbiAgICAgICAgYXN0ZXJpc2s6IGZhbHNlLFxuICAgICAgICBwYXR0ZXJuOiBudWxsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHBhdGgsIGtleXMpXG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGFuIGFycmF5IGludG8gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IUFycmF5fSAgcGF0aFxuICogQHBhcmFtICB7QXJyYXl9ICAga2V5c1xuICogQHBhcmFtICB7IU9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICB2YXIgcGFydHMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgIHBhcnRzLnB1c2gocGF0aFRvUmVnZXhwKHBhdGhbaV0sIGtleXMsIG9wdGlvbnMpLnNvdXJjZSlcbiAgfVxuXG4gIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKCcoPzonICsgcGFydHMuam9pbignfCcpICsgJyknLCBmbGFncyhvcHRpb25zKSlcblxuICByZXR1cm4gYXR0YWNoS2V5cyhyZWdleHAsIGtleXMpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcGF0aCByZWdleHAgZnJvbSBzdHJpbmcgaW5wdXQuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHBhcmFtICB7IU9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRva2Vuc1RvUmVnRXhwKHBhcnNlKHBhdGgsIG9wdGlvbnMpLCBrZXlzLCBvcHRpb25zKVxufVxuXG4vKipcbiAqIEV4cG9zZSBhIGZ1bmN0aW9uIGZvciB0YWtpbmcgdG9rZW5zIGFuZCByZXR1cm5pbmcgYSBSZWdFeHAuXG4gKlxuICogQHBhcmFtICB7IUFycmF5fSAgICAgICAgICB0b2tlbnNcbiAqIEBwYXJhbSAgeyhBcnJheXxPYmplY3QpPX0ga2V5c1xuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiB0b2tlbnNUb1JlZ0V4cCAodG9rZW5zLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpXG4gICAga2V5cyA9IFtdXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBzdHJpY3QgPSBvcHRpb25zLnN0cmljdFxuICB2YXIgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlXG4gIHZhciByb3V0ZSA9ICcnXG5cbiAgLy8gSXRlcmF0ZSBvdmVyIHRoZSB0b2tlbnMgYW5kIGNyZWF0ZSBvdXIgcmVnZXhwIHN0cmluZy5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICByb3V0ZSArPSBlc2NhcGVTdHJpbmcodG9rZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwcmVmaXggPSBlc2NhcGVTdHJpbmcodG9rZW4ucHJlZml4KVxuICAgICAgdmFyIGNhcHR1cmUgPSAnKD86JyArIHRva2VuLnBhdHRlcm4gKyAnKSdcblxuICAgICAga2V5cy5wdXNoKHRva2VuKVxuXG4gICAgICBpZiAodG9rZW4ucmVwZWF0KSB7XG4gICAgICAgIGNhcHR1cmUgKz0gJyg/OicgKyBwcmVmaXggKyBjYXB0dXJlICsgJykqJ1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5wYXJ0aWFsKSB7XG4gICAgICAgICAgY2FwdHVyZSA9ICcoPzonICsgcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpKT8nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKT8nXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcHR1cmUgPSBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJyknXG4gICAgICB9XG5cbiAgICAgIHJvdXRlICs9IGNhcHR1cmVcbiAgICB9XG4gIH1cblxuICB2YXIgZGVsaW1pdGVyID0gZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJylcbiAgdmFyIGVuZHNXaXRoRGVsaW1pdGVyID0gcm91dGUuc2xpY2UoLWRlbGltaXRlci5sZW5ndGgpID09PSBkZWxpbWl0ZXJcblxuICAvLyBJbiBub24tc3RyaWN0IG1vZGUgd2UgYWxsb3cgYSBzbGFzaCBhdCB0aGUgZW5kIG9mIG1hdGNoLiBJZiB0aGUgcGF0aCB0b1xuICAvLyBtYXRjaCBhbHJlYWR5IGVuZHMgd2l0aCBhIHNsYXNoLCB3ZSByZW1vdmUgaXQgZm9yIGNvbnNpc3RlbmN5LiBUaGUgc2xhc2hcbiAgLy8gaXMgdmFsaWQgYXQgdGhlIGVuZCBvZiBhIHBhdGggbWF0Y2gsIG5vdCBpbiB0aGUgbWlkZGxlLiBUaGlzIGlzIGltcG9ydGFudFxuICAvLyBpbiBub24tZW5kaW5nIG1vZGUsIHdoZXJlIFwiL3Rlc3QvXCIgc2hvdWxkbid0IG1hdGNoIFwiL3Rlc3QvL3JvdXRlXCIuXG4gIGlmICghc3RyaWN0KSB7XG4gICAgcm91dGUgPSAoZW5kc1dpdGhEZWxpbWl0ZXIgPyByb3V0ZS5zbGljZSgwLCAtZGVsaW1pdGVyLmxlbmd0aCkgOiByb3V0ZSkgKyAnKD86JyArIGRlbGltaXRlciArICcoPz0kKSk/J1xuICB9XG5cbiAgaWYgKGVuZCkge1xuICAgIHJvdXRlICs9ICckJ1xuICB9IGVsc2Uge1xuICAgIC8vIEluIG5vbi1lbmRpbmcgbW9kZSwgd2UgbmVlZCB0aGUgY2FwdHVyaW5nIGdyb3VwcyB0byBtYXRjaCBhcyBtdWNoIGFzXG4gICAgLy8gcG9zc2libGUgYnkgdXNpbmcgYSBwb3NpdGl2ZSBsb29rYWhlYWQgdG8gdGhlIGVuZCBvciBuZXh0IHBhdGggc2VnbWVudC5cbiAgICByb3V0ZSArPSBzdHJpY3QgJiYgZW5kc1dpdGhEZWxpbWl0ZXIgPyAnJyA6ICcoPz0nICsgZGVsaW1pdGVyICsgJ3wkKSdcbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKG5ldyBSZWdFeHAoJ14nICsgcm91dGUsIGZsYWdzKG9wdGlvbnMpKSwga2V5cylcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHBhdGggc3RyaW5nLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQW4gZW1wdHkgYXJyYXkgY2FuIGJlIHBhc3NlZCBpbiBmb3IgdGhlIGtleXMsIHdoaWNoIHdpbGwgaG9sZCB0aGVcbiAqIHBsYWNlaG9sZGVyIGtleSBkZXNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCB1c2luZyBgL3VzZXIvOmlkYCwgYGtleXNgIHdpbGxcbiAqIGNvbnRhaW4gYFt7IG5hbWU6ICdpZCcsIGRlbGltaXRlcjogJy8nLCBvcHRpb25hbDogZmFsc2UsIHJlcGVhdDogZmFsc2UgfV1gLlxuICpcbiAqIEBwYXJhbSAgeyhzdHJpbmd8UmVnRXhwfEFycmF5KX0gcGF0aFxuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSAgICAgICBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHBhdGhUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICBpZiAoIWlzYXJyYXkoa2V5cykpIHtcbiAgICBvcHRpb25zID0gLyoqIEB0eXBlIHshT2JqZWN0fSAqLyAoa2V5cyB8fCBvcHRpb25zKVxuICAgIGtleXMgPSBbXVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICBpZiAocGF0aCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiByZWdleHBUb1JlZ2V4cChwYXRoLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpKVxuICB9XG5cbiAgaWYgKGlzYXJyYXkocGF0aCkpIHtcbiAgICByZXR1cm4gYXJyYXlUb1JlZ2V4cCgvKiogQHR5cGUgeyFBcnJheX0gKi8gKHBhdGgpLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpLCBvcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZ1RvUmVnZXhwKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlVW5jb250cm9sbGVkIH0gZnJvbSAndW5jb250cm9sbGFibGUnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBBY2NvcmRpb25Ub2dnbGUgZnJvbSAnLi9BY2NvcmRpb25Ub2dnbGUnO1xuaW1wb3J0IFNlbGVjdGFibGVDb250ZXh0IGZyb20gJy4vU2VsZWN0YWJsZUNvbnRleHQnO1xuaW1wb3J0IEFjY29yZGlvbkNvbGxhcHNlIGZyb20gJy4vQWNjb3JkaW9uQ29sbGFwc2UnO1xuaW1wb3J0IEFjY29yZGlvbkNvbnRleHQgZnJvbSAnLi9BY2NvcmRpb25Db250ZXh0JztcbnZhciBBY2NvcmRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gIHZhciBfdXNlVW5jb250cm9sbGVkID0gdXNlVW5jb250cm9sbGVkKHByb3BzLCB7XG4gICAgYWN0aXZlS2V5OiAnb25TZWxlY3QnXG4gIH0pLFxuICAgICAgX3VzZVVuY29udHJvbGxlZCRhcyA9IF91c2VVbmNvbnRyb2xsZWQuYXMsXG4gICAgICBDb21wb25lbnQgPSBfdXNlVW5jb250cm9sbGVkJGFzID09PSB2b2lkIDAgPyAnZGl2JyA6IF91c2VVbmNvbnRyb2xsZWQkYXMsXG4gICAgICBhY3RpdmVLZXkgPSBfdXNlVW5jb250cm9sbGVkLmFjdGl2ZUtleSxcbiAgICAgIGJzUHJlZml4ID0gX3VzZVVuY29udHJvbGxlZC5ic1ByZWZpeCxcbiAgICAgIGNoaWxkcmVuID0gX3VzZVVuY29udHJvbGxlZC5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IF91c2VVbmNvbnRyb2xsZWQuY2xhc3NOYW1lLFxuICAgICAgb25TZWxlY3QgPSBfdXNlVW5jb250cm9sbGVkLm9uU2VsZWN0LFxuICAgICAgY29udHJvbGxlZFByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3VzZVVuY29udHJvbGxlZCwgW1wiYXNcIiwgXCJhY3RpdmVLZXlcIiwgXCJic1ByZWZpeFwiLCBcImNoaWxkcmVuXCIsIFwiY2xhc3NOYW1lXCIsIFwib25TZWxlY3RcIl0pO1xuXG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYWNjb3JkaW9uJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEFjY29yZGlvbkNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogYWN0aXZlS2V5XG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0YWJsZUNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogb25TZWxlY3RcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBjb250cm9sbGVkUHJvcHMsIHtcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeClcbiAgfSksIGNoaWxkcmVuKSkpO1xufSk7XG5BY2NvcmRpb24uVG9nZ2xlID0gQWNjb3JkaW9uVG9nZ2xlO1xuQWNjb3JkaW9uLkNvbGxhcHNlID0gQWNjb3JkaW9uQ29sbGFwc2U7XG5leHBvcnQgZGVmYXVsdCBBY2NvcmRpb247IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4vQ29sbGFwc2UnO1xuaW1wb3J0IEFjY29yZGlvbkNvbnRleHQgZnJvbSAnLi9BY2NvcmRpb25Db250ZXh0JztcbnZhciBBY2NvcmRpb25Db2xsYXBzZSA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgZXZlbnRLZXkgPSBfcmVmLmV2ZW50S2V5LFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJjaGlsZHJlblwiLCBcImV2ZW50S2V5XCJdKTtcblxuICB2YXIgY29udGV4dEV2ZW50S2V5ID0gdXNlQ29udGV4dChBY2NvcmRpb25Db250ZXh0KTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sbGFwc2UsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBpbjogY29udGV4dEV2ZW50S2V5ID09PSBldmVudEtleVxuICB9LCBwcm9wcyksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbikpKTtcbn0pO1xuQWNjb3JkaW9uQ29sbGFwc2UuZGlzcGxheU5hbWUgPSAnQWNjb3JkaW9uQ29sbGFwc2UnO1xuZXhwb3J0IGRlZmF1bHQgQWNjb3JkaW9uQ29sbGFwc2U7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNvbnRleHQobnVsbCk7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdGFibGVDb250ZXh0IGZyb20gJy4vU2VsZWN0YWJsZUNvbnRleHQnO1xuaW1wb3J0IEFjY29yZGlvbkNvbnRleHQgZnJvbSAnLi9BY2NvcmRpb25Db250ZXh0JztcbmV4cG9ydCBmdW5jdGlvbiB1c2VBY2NvcmRpb25Ub2dnbGUoZXZlbnRLZXksIG9uQ2xpY2spIHtcbiAgdmFyIGNvbnRleHRFdmVudEtleSA9IHVzZUNvbnRleHQoQWNjb3JkaW9uQ29udGV4dCk7XG4gIHZhciBvblNlbGVjdCA9IHVzZUNvbnRleHQoU2VsZWN0YWJsZUNvbnRleHQpO1xuICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICAvKiBcbiAgICAgIENvbXBhcmUgdGhlIGV2ZW50IGtleSBpbiBjb250ZXh0IHdpdGggdGhlIGdpdmVuIGV2ZW50IGtleS5cbiAgICAgIElmIHRoZXkgYXJlIHRoZSBzYW1lLCB0aGVuIGNvbGxhcHNlIHRoZSBjb21wb25lbnQuXG4gICAgKi9cbiAgICB2YXIgZXZlbnRLZXlQYXNzZWQgPSBldmVudEtleSA9PT0gY29udGV4dEV2ZW50S2V5ID8gbnVsbCA6IGV2ZW50S2V5O1xuICAgIG9uU2VsZWN0KGV2ZW50S2V5UGFzc2VkLCBlKTtcbiAgICBpZiAob25DbGljaykgb25DbGljayhlKTtcbiAgfTtcbn1cbnZhciBBY2NvcmRpb25Ub2dnbGUgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIF9yZWYkYXMgPSBfcmVmLmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3JlZiRhcyA9PT0gdm9pZCAwID8gJ2J1dHRvbicgOiBfcmVmJGFzLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgZXZlbnRLZXkgPSBfcmVmLmV2ZW50S2V5LFxuICAgICAgb25DbGljayA9IF9yZWYub25DbGljayxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYXNcIiwgXCJjaGlsZHJlblwiLCBcImV2ZW50S2V5XCIsIFwib25DbGlja1wiXSk7XG5cbiAgdmFyIGFjY29yZGlvbk9uQ2xpY2sgPSB1c2VBY2NvcmRpb25Ub2dnbGUoZXZlbnRLZXksIG9uQ2xpY2spO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBvbkNsaWNrOiBhY2NvcmRpb25PbkNsaWNrXG4gIH0sIHByb3BzKSwgY2hpbGRyZW4pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBBY2NvcmRpb25Ub2dnbGU7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCB1c2VFdmVudENhbGxiYWNrIGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZUV2ZW50Q2FsbGJhY2snO1xuaW1wb3J0IGNyZWF0ZVdpdGhCc1ByZWZpeCBmcm9tICcuL2NyZWF0ZVdpdGhCc1ByZWZpeCc7XG5pbXBvcnQgZGl2V2l0aENsYXNzTmFtZSBmcm9tICcuL2RpdldpdGhDbGFzc05hbWUnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBGYWRlIGZyb20gJy4vRmFkZSc7XG5pbXBvcnQgQ2xvc2VCdXR0b24gZnJvbSAnLi9DbG9zZUJ1dHRvbic7XG5pbXBvcnQgU2FmZUFuY2hvciBmcm9tICcuL1NhZmVBbmNob3InO1xudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgc2hvdzogdHJ1ZSxcbiAgdHJhbnNpdGlvbjogRmFkZSxcbiAgY2xvc2VMYWJlbDogJ0Nsb3NlIGFsZXJ0J1xufTtcbnZhciBjb250cm9sbGFibGVzID0ge1xuICBzaG93OiAnb25DbG9zZSdcbn07XG52YXIgQWxlcnQgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uICh1bmNvbnRyb2xsZWRQcm9wcywgcmVmKSB7XG4gIHZhciBfdXNlVW5jb250cm9sbGVkID0gdXNlVW5jb250cm9sbGVkKHVuY29udHJvbGxlZFByb3BzLCBjb250cm9sbGFibGVzKSxcbiAgICAgIGJzUHJlZml4ID0gX3VzZVVuY29udHJvbGxlZC5ic1ByZWZpeCxcbiAgICAgIHNob3cgPSBfdXNlVW5jb250cm9sbGVkLnNob3csXG4gICAgICBjbG9zZUxhYmVsID0gX3VzZVVuY29udHJvbGxlZC5jbG9zZUxhYmVsLFxuICAgICAgY2xhc3NOYW1lID0gX3VzZVVuY29udHJvbGxlZC5jbGFzc05hbWUsXG4gICAgICBjaGlsZHJlbiA9IF91c2VVbmNvbnRyb2xsZWQuY2hpbGRyZW4sXG4gICAgICB2YXJpYW50ID0gX3VzZVVuY29udHJvbGxlZC52YXJpYW50LFxuICAgICAgb25DbG9zZSA9IF91c2VVbmNvbnRyb2xsZWQub25DbG9zZSxcbiAgICAgIGRpc21pc3NpYmxlID0gX3VzZVVuY29udHJvbGxlZC5kaXNtaXNzaWJsZSxcbiAgICAgIFRyYW5zaXRpb24gPSBfdXNlVW5jb250cm9sbGVkLnRyYW5zaXRpb24sXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF91c2VVbmNvbnRyb2xsZWQsIFtcImJzUHJlZml4XCIsIFwic2hvd1wiLCBcImNsb3NlTGFiZWxcIiwgXCJjbGFzc05hbWVcIiwgXCJjaGlsZHJlblwiLCBcInZhcmlhbnRcIiwgXCJvbkNsb3NlXCIsIFwiZGlzbWlzc2libGVcIiwgXCJ0cmFuc2l0aW9uXCJdKTtcblxuICB2YXIgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYWxlcnQnKTtcbiAgdmFyIGhhbmRsZUNsb3NlID0gdXNlRXZlbnRDYWxsYmFjayhmdW5jdGlvbiAoZSkge1xuICAgIG9uQ2xvc2UoZmFsc2UsIGUpO1xuICB9KTtcbiAgdmFyIGFsZXJ0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7XG4gICAgcm9sZTogXCJhbGVydFwiXG4gIH0sIFRyYW5zaXRpb24gPyBwcm9wcyA6IHVuZGVmaW5lZCwge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeCwgdmFyaWFudCAmJiBwcmVmaXggKyBcIi1cIiArIHZhcmlhbnQsIGRpc21pc3NpYmxlICYmIHByZWZpeCArIFwiLWRpc21pc3NpYmxlXCIpXG4gIH0pLCBkaXNtaXNzaWJsZSAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KENsb3NlQnV0dG9uLCB7XG4gICAgb25DbGljazogaGFuZGxlQ2xvc2UsXG4gICAgbGFiZWw6IGNsb3NlTGFiZWxcbiAgfSksIGNoaWxkcmVuKTtcbiAgaWYgKCFUcmFuc2l0aW9uKSByZXR1cm4gc2hvdyA/IGFsZXJ0IDogbnVsbDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNpdGlvbiwgX2V4dGVuZHMoe1xuICAgIHVubW91bnRPbkV4aXQ6IHRydWVcbiAgfSwgcHJvcHMsIHtcbiAgICBpbjogc2hvd1xuICB9KSwgYWxlcnQpO1xufSk7XG52YXIgRGl2U3R5bGVkQXNINCA9IGRpdldpdGhDbGFzc05hbWUoJ2g0Jyk7XG5EaXZTdHlsZWRBc0g0LmRpc3BsYXlOYW1lID0gJ0RpdlN0eWxlZEFzSDQnO1xuQWxlcnQuZGlzcGxheU5hbWUgPSAnQWxlcnQnO1xuQWxlcnQuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuQWxlcnQuTGluayA9IGNyZWF0ZVdpdGhCc1ByZWZpeCgnYWxlcnQtbGluaycsIHtcbiAgQ29tcG9uZW50OiBTYWZlQW5jaG9yXG59KTtcbkFsZXJ0LkhlYWRpbmcgPSBjcmVhdGVXaXRoQnNQcmVmaXgoJ2FsZXJ0LWhlYWRpbmcnLCB7XG4gIENvbXBvbmVudDogRGl2U3R5bGVkQXNINFxufSk7XG5leHBvcnQgZGVmYXVsdCBBbGVydDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIHBpbGw6IGZhbHNlXG59O1xudmFyIEJhZGdlID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAoX3JlZiwgcmVmKSB7XG4gIHZhciBic1ByZWZpeCA9IF9yZWYuYnNQcmVmaXgsXG4gICAgICB2YXJpYW50ID0gX3JlZi52YXJpYW50LFxuICAgICAgcGlsbCA9IF9yZWYucGlsbCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgX3JlZiRhcyA9IF9yZWYuYXMsXG4gICAgICBDb21wb25lbnQgPSBfcmVmJGFzID09PSB2b2lkIDAgPyAnc3BhbicgOiBfcmVmJGFzLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJic1ByZWZpeFwiLCBcInZhcmlhbnRcIiwgXCJwaWxsXCIsIFwiY2xhc3NOYW1lXCIsIFwiYXNcIl0pO1xuXG4gIHZhciBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdiYWRnZScpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeCwgcGlsbCAmJiBwcmVmaXggKyBcIi1waWxsXCIsIHZhcmlhbnQgJiYgcHJlZml4ICsgXCItXCIgKyB2YXJpYW50KVxuICB9KSk7XG59KTtcbkJhZGdlLmRpc3BsYXlOYW1lID0gJ0JhZGdlJztcbkJhZGdlLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbmV4cG9ydCBkZWZhdWx0IEJhZGdlOyIsImltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZVwiO1xuaW1wb3J0IGNzcyBmcm9tICdkb20taGVscGVycy9jc3MnO1xuaW1wb3J0IHFzYSBmcm9tICdkb20taGVscGVycy9xdWVyeVNlbGVjdG9yQWxsJztcbmltcG9ydCBnZXRTY3JvbGxiYXJTaXplIGZyb20gJ2RvbS1oZWxwZXJzL3Njcm9sbGJhclNpemUnO1xuaW1wb3J0IE1vZGFsTWFuYWdlciBmcm9tICdyZWFjdC1vdmVybGF5cy9Nb2RhbE1hbmFnZXInO1xudmFyIFNlbGVjdG9yID0ge1xuICBGSVhFRF9DT05URU5UOiAnLmZpeGVkLXRvcCwgLmZpeGVkLWJvdHRvbSwgLmlzLWZpeGVkLCAuc3RpY2t5LXRvcCcsXG4gIFNUSUNLWV9DT05URU5UOiAnLnN0aWNreS10b3AnLFxuICBOQVZCQVJfVE9HR0xFUjogJy5uYXZiYXItdG9nZ2xlcidcbn07XG5cbnZhciBCb290c3RyYXBNb2RhbE1hbmFnZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9Nb2RhbE1hbmFnZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoQm9vdHN0cmFwTW9kYWxNYW5hZ2VyLCBfTW9kYWxNYW5hZ2VyKTtcblxuICBmdW5jdGlvbiBCb290c3RyYXBNb2RhbE1hbmFnZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX01vZGFsTWFuYWdlci5jYWxsLmFwcGx5KF9Nb2RhbE1hbmFnZXIsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG5cbiAgICBfdGhpcy5hZGp1c3RBbmRTdG9yZSA9IGZ1bmN0aW9uIChwcm9wLCBlbGVtZW50LCBhZGp1c3QpIHtcbiAgICAgIHZhciBfY3NzO1xuXG4gICAgICB2YXIgYWN0dWFsID0gZWxlbWVudC5zdHlsZVtwcm9wXTtcbiAgICAgIGVsZW1lbnQuZGF0YXNldFtwcm9wXSA9IGFjdHVhbDtcbiAgICAgIGNzcyhlbGVtZW50LCAoX2NzcyA9IHt9LCBfY3NzW3Byb3BdID0gcGFyc2VGbG9hdChjc3MoZWxlbWVudCwgcHJvcCkpICsgYWRqdXN0ICsgXCJweFwiLCBfY3NzKSk7XG4gICAgfTtcblxuICAgIF90aGlzLnJlc3RvcmUgPSBmdW5jdGlvbiAocHJvcCwgZWxlbWVudCkge1xuICAgICAgdmFyIHZhbHVlID0gZWxlbWVudC5kYXRhc2V0W3Byb3BdO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgX2NzczI7XG5cbiAgICAgICAgZGVsZXRlIGVsZW1lbnQuZGF0YXNldFtwcm9wXTtcbiAgICAgICAgY3NzKGVsZW1lbnQsIChfY3NzMiA9IHt9LCBfY3NzMltwcm9wXSA9IHZhbHVlLCBfY3NzMikpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQm9vdHN0cmFwTW9kYWxNYW5hZ2VyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uc2V0Q29udGFpbmVyU3R5bGUgPSBmdW5jdGlvbiBzZXRDb250YWluZXJTdHlsZShjb250YWluZXJTdGF0ZSwgY29udGFpbmVyKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBfTW9kYWxNYW5hZ2VyLnByb3RvdHlwZS5zZXRDb250YWluZXJTdHlsZS5jYWxsKHRoaXMsIGNvbnRhaW5lclN0YXRlLCBjb250YWluZXIpO1xuXG4gICAgaWYgKCFjb250YWluZXJTdGF0ZS5vdmVyZmxvd2luZykgcmV0dXJuO1xuICAgIHZhciBzaXplID0gZ2V0U2Nyb2xsYmFyU2l6ZSgpO1xuICAgIHFzYShjb250YWluZXIsIFNlbGVjdG9yLkZJWEVEX0NPTlRFTlQpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLmFkanVzdEFuZFN0b3JlKCdwYWRkaW5nUmlnaHQnLCBlbCwgc2l6ZSk7XG4gICAgfSk7XG4gICAgcXNhKGNvbnRhaW5lciwgU2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlQpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLmFkanVzdEFuZFN0b3JlKCdtYXJnaW5nUmlnaHQnLCBlbCwgLXNpemUpO1xuICAgIH0pO1xuICAgIHFzYShjb250YWluZXIsIFNlbGVjdG9yLk5BVkJBUl9UT0dHTEVSKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIF90aGlzMi5hZGp1c3RBbmRTdG9yZSgnbWFyZ2luZ1JpZ2h0JywgZWwsIHNpemUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVDb250YWluZXJTdHlsZSA9IGZ1bmN0aW9uIHJlbW92ZUNvbnRhaW5lclN0eWxlKGNvbnRhaW5lclN0YXRlLCBjb250YWluZXIpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIF9Nb2RhbE1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUNvbnRhaW5lclN0eWxlLmNhbGwodGhpcywgY29udGFpbmVyU3RhdGUsIGNvbnRhaW5lcik7XG5cbiAgICBxc2EoY29udGFpbmVyLCBTZWxlY3Rvci5GSVhFRF9DT05URU5UKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIF90aGlzMy5yZXN0b3JlKCdwYWRkaW5nUmlnaHQnLCBlbCk7XG4gICAgfSk7XG4gICAgcXNhKGNvbnRhaW5lciwgU2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlQpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gX3RoaXMzLnJlc3RvcmUoJ21hcmdpbmdSaWdodCcsIGVsKTtcbiAgICB9KTtcbiAgICBxc2EoY29udGFpbmVyLCBTZWxlY3Rvci5OQVZCQVJfVE9HR0xFUikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBfdGhpczMucmVzdG9yZSgnbWFyZ2luZ1JpZ2h0JywgZWwpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBCb290c3RyYXBNb2RhbE1hbmFnZXI7XG59KE1vZGFsTWFuYWdlcik7XG5cbmV4cG9ydCB7IEJvb3RzdHJhcE1vZGFsTWFuYWdlciBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQnJlYWRjcnVtYkl0ZW0gZnJvbSAnLi9CcmVhZGNydW1iSXRlbSc7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBsYWJlbDogJ2JyZWFkY3J1bWInLFxuICBsaXN0UHJvcHM6IHt9XG59O1xudmFyIEJyZWFkY3J1bWIgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgbGlzdFByb3BzID0gX3JlZi5saXN0UHJvcHMsXG4gICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICBsYWJlbCA9IF9yZWYubGFiZWwsXG4gICAgICBfcmVmJGFzID0gX3JlZi5hcyxcbiAgICAgIENvbXBvbmVudCA9IF9yZWYkYXMgPT09IHZvaWQgMCA/ICduYXYnIDogX3JlZiRhcyxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYnNQcmVmaXhcIiwgXCJjbGFzc05hbWVcIiwgXCJsaXN0UHJvcHNcIiwgXCJjaGlsZHJlblwiLCBcImxhYmVsXCIsIFwiYXNcIl0pO1xuXG4gIHZhciBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdicmVhZGNydW1iJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgIFwiYXJpYS1sYWJlbFwiOiBsYWJlbCxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcyksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvbFwiLCBfZXh0ZW5kcyh7fSwgbGlzdFByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKHByZWZpeCwgbGlzdFByb3BzLmNsYXNzTmFtZSlcbiAgfSksIGNoaWxkcmVuKSk7XG59KTtcbkJyZWFkY3J1bWIuZGlzcGxheU5hbWUgPSAnQnJlYWRjcnVtYic7XG5CcmVhZGNydW1iLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbkJyZWFkY3J1bWIuSXRlbSA9IEJyZWFkY3J1bWJJdGVtO1xuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYjsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNhZmVBbmNob3IgZnJvbSAnLi9TYWZlQW5jaG9yJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBhY3RpdmU6IGZhbHNlXG59O1xudmFyIEJyZWFkY3J1bWJJdGVtID0gUmVhY3QuZm9yd2FyZFJlZiggLy8gTmVlZCB0byBkZWZpbmUgdGhlIGRlZmF1bHQgXCJhc1wiIGR1cmluZyBwcm9wIGRlc3RydWN0dXJpbmcgdG8gYmUgY29tcGF0aWJsZSB3aXRoIHN0eWxlZC1jb21wb25lbnRzIGdpdGh1Yi5jb20vcmVhY3QtYm9vdHN0cmFwL3JlYWN0LWJvb3RzdHJhcC9pc3N1ZXMvMzU5NVxuZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgYWN0aXZlID0gX3JlZi5hY3RpdmUsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIF9yZWYkYXMgPSBfcmVmLmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3JlZiRhcyA9PT0gdm9pZCAwID8gJ2xpJyA6IF9yZWYkYXMsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiYWN0aXZlXCIsIFwiY2xhc3NOYW1lXCIsIFwiYXNcIl0pO1xuXG4gIHZhciBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdicmVhZGNydW1iLWl0ZW0nKTtcblxuICB2YXIgaHJlZiA9IHByb3BzLmhyZWYsXG4gICAgICB0aXRsZSA9IHByb3BzLnRpdGxlLFxuICAgICAgdGFyZ2V0ID0gcHJvcHMudGFyZ2V0LFxuICAgICAgZWxlbWVudFByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UocHJvcHMsIFtcImhyZWZcIiwgXCJ0aXRsZVwiLCBcInRhcmdldFwiXSk7XG5cbiAgdmFyIGxpbmtQcm9wcyA9IHtcbiAgICBocmVmOiBocmVmLFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICB0YXJnZXQ6IHRhcmdldFxuICB9O1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMocHJlZml4LCBjbGFzc05hbWUsIHtcbiAgICAgIGFjdGl2ZTogYWN0aXZlXG4gICAgfSksXG4gICAgXCJhcmlhLWN1cnJlbnRcIjogYWN0aXZlID8gJ3BhZ2UnIDogdW5kZWZpbmVkXG4gIH0sIGFjdGl2ZSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIF9leHRlbmRzKHt9LCBlbGVtZW50UHJvcHMsIHtcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoe1xuICAgICAgYWN0aXZlOiBhY3RpdmVcbiAgICB9KVxuICB9KSkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFNhZmVBbmNob3IsIF9leHRlbmRzKHt9LCBlbGVtZW50UHJvcHMsIGxpbmtQcm9wcykpKTtcbn0pO1xuQnJlYWRjcnVtYkl0ZW0uZGlzcGxheU5hbWUgPSAnQnJlYWRjcnVtYkl0ZW0nO1xuQnJlYWRjcnVtYkl0ZW0uZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYkl0ZW07IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICB2ZXJ0aWNhbDogZmFsc2UsXG4gIHRvZ2dsZTogZmFsc2UsXG4gIHJvbGU6ICdncm91cCdcbn07XG52YXIgQnV0dG9uR3JvdXAgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gIHZhciBic1ByZWZpeCA9IHByb3BzLmJzUHJlZml4LFxuICAgICAgc2l6ZSA9IHByb3BzLnNpemUsXG4gICAgICB0b2dnbGUgPSBwcm9wcy50b2dnbGUsXG4gICAgICB2ZXJ0aWNhbCA9IHByb3BzLnZlcnRpY2FsLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgX3Byb3BzJGFzID0gcHJvcHMuYXMsXG4gICAgICBDb21wb25lbnQgPSBfcHJvcHMkYXMgPT09IHZvaWQgMCA/ICdkaXYnIDogX3Byb3BzJGFzLFxuICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHByb3BzLCBbXCJic1ByZWZpeFwiLCBcInNpemVcIiwgXCJ0b2dnbGVcIiwgXCJ2ZXJ0aWNhbFwiLCBcImNsYXNzTmFtZVwiLCBcImFzXCJdKTtcblxuICB2YXIgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnYnRuLWdyb3VwJyk7XG4gIHZhciBiYXNlQ2xhc3MgPSBwcmVmaXg7XG4gIGlmICh2ZXJ0aWNhbCkgYmFzZUNsYXNzID0gcHJlZml4ICsgXCItdmVydGljYWxcIjtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJhc2VDbGFzcywgc2l6ZSAmJiBwcmVmaXggKyBcIi1cIiArIHNpemUsIHRvZ2dsZSAmJiBwcmVmaXggKyBcIi10b2dnbGVcIilcbiAgfSkpO1xufSk7XG5CdXR0b25Hcm91cC5kaXNwbGF5TmFtZSA9ICdCdXR0b25Hcm91cCc7XG5CdXR0b25Hcm91cC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5leHBvcnQgZGVmYXVsdCBCdXR0b25Hcm91cDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIHJvbGU6ICd0b29sYmFyJ1xufTtcbnZhciBCdXR0b25Ub29sYmFyID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAoX3JlZiwgcmVmKSB7XG4gIHZhciBic1ByZWZpeCA9IF9yZWYuYnNQcmVmaXgsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYnNQcmVmaXhcIiwgXCJjbGFzc05hbWVcIl0pO1xuXG4gIHZhciBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdidG4tdG9vbGJhcicpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBwcmVmaXgpXG4gIH0pKTtcbn0pO1xuQnV0dG9uVG9vbGJhci5kaXNwbGF5TmFtZSA9ICdCdXR0b25Ub29sYmFyJztcbkJ1dHRvblRvb2xiYXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuZXhwb3J0IGRlZmF1bHQgQnV0dG9uVG9vbGJhcjsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgY3JlYXRlV2l0aEJzUHJlZml4IGZyb20gJy4vY3JlYXRlV2l0aEJzUHJlZml4JztcbmltcG9ydCBkaXZXaXRoQ2xhc3NOYW1lIGZyb20gJy4vZGl2V2l0aENsYXNzTmFtZSc7XG5pbXBvcnQgQ2FyZENvbnRleHQgZnJvbSAnLi9DYXJkQ29udGV4dCc7XG5pbXBvcnQgQ2FyZEltZyBmcm9tICcuL0NhcmRJbWcnO1xudmFyIERpdlN0eWxlZEFzSDUgPSBkaXZXaXRoQ2xhc3NOYW1lKCdoNScpO1xudmFyIERpdlN0eWxlZEFzSDYgPSBkaXZXaXRoQ2xhc3NOYW1lKCdoNicpO1xudmFyIENhcmRCb2R5ID0gY3JlYXRlV2l0aEJzUHJlZml4KCdjYXJkLWJvZHknKTtcbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIGJvZHk6IGZhbHNlXG59O1xudmFyIENhcmQgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgYmcgPSBfcmVmLmJnLFxuICAgICAgdGV4dCA9IF9yZWYudGV4dCxcbiAgICAgIGJvcmRlciA9IF9yZWYuYm9yZGVyLFxuICAgICAgYm9keSA9IF9yZWYuYm9keSxcbiAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgIF9yZWYkYXMgPSBfcmVmLmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3JlZiRhcyA9PT0gdm9pZCAwID8gJ2RpdicgOiBfcmVmJGFzLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJic1ByZWZpeFwiLCBcImNsYXNzTmFtZVwiLCBcImJnXCIsIFwidGV4dFwiLCBcImJvcmRlclwiLCBcImJvZHlcIiwgXCJjaGlsZHJlblwiLCBcImFzXCJdKTtcblxuICB2YXIgcHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnY2FyZCcpO1xuICB2YXIgY2FyZENvbnRleHQgPSB1c2VNZW1vKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FyZEhlYWRlckJzUHJlZml4OiBwcmVmaXggKyBcIi1oZWFkZXJcIlxuICAgIH07XG4gIH0sIFtwcmVmaXhdKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2FyZENvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZTogY2FyZENvbnRleHRcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeCwgYmcgJiYgXCJiZy1cIiArIGJnLCB0ZXh0ICYmIFwidGV4dC1cIiArIHRleHQsIGJvcmRlciAmJiBcImJvcmRlci1cIiArIGJvcmRlcilcbiAgfSksIGJvZHkgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmRCb2R5LCBudWxsLCBjaGlsZHJlbikgOiBjaGlsZHJlbikpO1xufSk7XG5DYXJkLmRpc3BsYXlOYW1lID0gJ0NhcmQnO1xuQ2FyZC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5DYXJkLkltZyA9IENhcmRJbWc7XG5DYXJkLlRpdGxlID0gY3JlYXRlV2l0aEJzUHJlZml4KCdjYXJkLXRpdGxlJywge1xuICBDb21wb25lbnQ6IERpdlN0eWxlZEFzSDVcbn0pO1xuQ2FyZC5TdWJ0aXRsZSA9IGNyZWF0ZVdpdGhCc1ByZWZpeCgnY2FyZC1zdWJ0aXRsZScsIHtcbiAgQ29tcG9uZW50OiBEaXZTdHlsZWRBc0g2XG59KTtcbkNhcmQuQm9keSA9IENhcmRCb2R5O1xuQ2FyZC5MaW5rID0gY3JlYXRlV2l0aEJzUHJlZml4KCdjYXJkLWxpbmsnLCB7XG4gIENvbXBvbmVudDogJ2EnXG59KTtcbkNhcmQuVGV4dCA9IGNyZWF0ZVdpdGhCc1ByZWZpeCgnY2FyZC10ZXh0Jywge1xuICBDb21wb25lbnQ6ICdwJ1xufSk7XG5DYXJkLkhlYWRlciA9IGNyZWF0ZVdpdGhCc1ByZWZpeCgnY2FyZC1oZWFkZXInKTtcbkNhcmQuRm9vdGVyID0gY3JlYXRlV2l0aEJzUHJlZml4KCdjYXJkLWZvb3RlcicpO1xuQ2FyZC5JbWdPdmVybGF5ID0gY3JlYXRlV2l0aEJzUHJlZml4KCdjYXJkLWltZy1vdmVybGF5Jyk7XG5leHBvcnQgZGVmYXVsdCBDYXJkOyIsImltcG9ydCBjcmVhdGVXaXRoQnNQcmVmaXggZnJvbSAnLi9jcmVhdGVXaXRoQnNQcmVmaXgnO1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlV2l0aEJzUHJlZml4KCdjYXJkLWNvbHVtbnMnKTsiLCJpbXBvcnQgY3JlYXRlV2l0aEJzUHJlZml4IGZyb20gJy4vY3JlYXRlV2l0aEJzUHJlZml4JztcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVdpdGhCc1ByZWZpeCgnY2FyZC1kZWNrJyk7IiwiaW1wb3J0IGNyZWF0ZVdpdGhCc1ByZWZpeCBmcm9tICcuL2NyZWF0ZVdpdGhCc1ByZWZpeCc7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVXaXRoQnNQcmVmaXgoJ2NhcmQtZ3JvdXAnKTsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIHZhcmlhbnQ6IG51bGxcbn07XG52YXIgQ2FyZEltZyA9IFJlYWN0LmZvcndhcmRSZWYoIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbmZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgdmFyaWFudCA9IF9yZWYudmFyaWFudCxcbiAgICAgIF9yZWYkYXMgPSBfcmVmLmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3JlZiRhcyA9PT0gdm9pZCAwID8gJ2ltZycgOiBfcmVmJGFzLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJic1ByZWZpeFwiLCBcImNsYXNzTmFtZVwiLCBcInZhcmlhbnRcIiwgXCJhc1wiXSk7XG5cbiAgdmFyIHByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ2NhcmQtaW1nJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyh2YXJpYW50ID8gcHJlZml4ICsgXCItXCIgKyB2YXJpYW50IDogcHJlZml4LCBjbGFzc05hbWUpXG4gIH0sIHByb3BzKSk7XG59KTtcbkNhcmRJbWcuZGlzcGxheU5hbWUgPSAnQ2FyZEltZyc7XG5DYXJkSW1nLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbmV4cG9ydCBkZWZhdWx0IENhcmRJbWc7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJ2RvbS1oZWxwZXJzL2Nzcyc7XG5pbXBvcnQgdHJhbnNpdGlvbkVuZCBmcm9tICdkb20taGVscGVycy90cmFuc2l0aW9uRW5kJztcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1bmNvbnRyb2xsYWJsZSB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCBDYXJvdXNlbENhcHRpb24gZnJvbSAnLi9DYXJvdXNlbENhcHRpb24nO1xuaW1wb3J0IENhcm91c2VsSXRlbSBmcm9tICcuL0Nhcm91c2VsSXRlbSc7XG5pbXBvcnQgeyBmb3JFYWNoLCBtYXAgfSBmcm9tICcuL0VsZW1lbnRDaGlsZHJlbic7XG5pbXBvcnQgU2FmZUFuY2hvciBmcm9tICcuL1NhZmVBbmNob3InO1xuaW1wb3J0IHsgY3JlYXRlQm9vdHN0cmFwQ29tcG9uZW50IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB0cmlnZ2VyQnJvd3NlclJlZmxvdyBmcm9tICcuL3RyaWdnZXJCcm93c2VyUmVmbG93JztcblxudmFyIGNvdW50Q2hpbGRyZW4gPSBmdW5jdGlvbiBjb3VudENoaWxkcmVuKGMpIHtcbiAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoYykuZmlsdGVyKFJlYWN0LmlzVmFsaWRFbGVtZW50KS5sZW5ndGg7XG59O1xuXG52YXIgU1dJUEVfVEhSRVNIT0xEID0gNDA7IC8vIFRPRE86IGBzbGlkZWAgc2hvdWxkIGJlIGBhbmltYXRlYC5cblxudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgc2xpZGU6IHRydWUsXG4gIGZhZGU6IGZhbHNlLFxuICBpbnRlcnZhbDogNTAwMCxcbiAga2V5Ym9hcmQ6IHRydWUsXG4gIHBhdXNlT25Ib3ZlcjogdHJ1ZSxcbiAgd3JhcDogdHJ1ZSxcbiAgaW5kaWNhdG9yczogdHJ1ZSxcbiAgY29udHJvbHM6IHRydWUsXG4gIGFjdGl2ZUluZGV4OiAwLFxuICBwcmV2SWNvbjogUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgY2xhc3NOYW1lOiBcImNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29uXCJcbiAgfSksXG4gIHByZXZMYWJlbDogJ1ByZXZpb3VzJyxcbiAgbmV4dEljb246IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIGNsYXNzTmFtZTogXCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiXG4gIH0pLFxuICBuZXh0TGFiZWw6ICdOZXh0JyxcbiAgdG91Y2g6IHRydWVcbn07XG5cbnZhciBDYXJvdXNlbCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShDYXJvdXNlbCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ2Fyb3VzZWwoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBwcmV2Q2xhc3NlczogJycsXG4gICAgICBjdXJyZW50Q2xhc3NlczogJ2FjdGl2ZScsXG4gICAgICB0b3VjaFN0YXJ0WDogMFxuICAgIH07XG4gICAgX3RoaXMuaXNVbm1vdW50ZWQgPSBmYWxzZTtcbiAgICBfdGhpcy5jYXJvdXNlbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gICAgX3RoaXMuaGFuZGxlVG91Y2hTdGFydCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvdWNoU3RhcnRYOiBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblhcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVUb3VjaEVuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBJZiB0aGUgc3dpcGUgaXMgdW5kZXIgdGhlIHRocmVzaG9sZCwgZG9uJ3QgZG8gYW55dGhpbmcuXG4gICAgICBpZiAoTWF0aC5hYnMoZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YIC0gX3RoaXMuc3RhdGUudG91Y2hTdGFydFgpIDwgU1dJUEVfVEhSRVNIT0xEKSByZXR1cm47XG5cbiAgICAgIGlmIChlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblggPCBfdGhpcy5zdGF0ZS50b3VjaFN0YXJ0WCkge1xuICAgICAgICAvLyBTd2lwaW5nIGxlZnQgdG8gbmF2aWdhdGUgdG8gbmV4dCBpdGVtLlxuICAgICAgICBfdGhpcy5oYW5kbGVOZXh0KGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU3dpcGluZyByaWdodCB0byBuYXZpZ2F0ZSB0byBwcmV2aW91cyBpdGVtLlxuICAgICAgICBfdGhpcy5oYW5kbGVQcmV2KGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVTbGlkZUVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwZW5kaW5nSW5kZXggPSBfdGhpcy5fcGVuZGluZ0luZGV4O1xuICAgICAgX3RoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuX3BlbmRpbmdJbmRleCA9IG51bGw7XG4gICAgICBpZiAocGVuZGluZ0luZGV4ICE9IG51bGwpIF90aGlzLnRvKHBlbmRpbmdJbmRleCk7ZWxzZSBfdGhpcy5jeWNsZSgpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVNb3VzZU91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmN5Y2xlKCk7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZU1vdXNlT3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfdGhpcy5wcm9wcy5wYXVzZU9uSG92ZXIpIF90aGlzLnBhdXNlKCk7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUtleURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSkgcmV0dXJuO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBfdGhpcy5oYW5kbGVQcmV2KGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBfdGhpcy5oYW5kbGVOZXh0KGV2ZW50KTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZU5leHRXaGVuVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghX3RoaXMuaXNVbm1vdW50ZWQgJiYgIWRvY3VtZW50LmhpZGRlbiAmJiBzdHlsZXMoX3RoaXMuY2Fyb3VzZWwuY3VycmVudCwgJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgX3RoaXMuaGFuZGxlTmV4dCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVOZXh0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChfdGhpcy5faXNTbGlkaW5nKSByZXR1cm47XG4gICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICB3cmFwID0gX3RoaXMkcHJvcHMud3JhcCxcbiAgICAgICAgICBhY3RpdmVJbmRleCA9IF90aGlzJHByb3BzLmFjdGl2ZUluZGV4O1xuICAgICAgdmFyIGluZGV4ID0gYWN0aXZlSW5kZXggKyAxO1xuICAgICAgdmFyIGNvdW50ID0gY291bnRDaGlsZHJlbihfdGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cbiAgICAgIGlmIChpbmRleCA+IGNvdW50IC0gMSkge1xuICAgICAgICBpZiAoIXdyYXApIHJldHVybjtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5zZWxlY3QoaW5kZXgsIGUsICduZXh0Jyk7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZVByZXYgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKF90aGlzLl9pc1NsaWRpbmcpIHJldHVybjtcbiAgICAgIHZhciBfdGhpcyRwcm9wczIgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICB3cmFwID0gX3RoaXMkcHJvcHMyLndyYXAsXG4gICAgICAgICAgYWN0aXZlSW5kZXggPSBfdGhpcyRwcm9wczIuYWN0aXZlSW5kZXg7XG4gICAgICB2YXIgaW5kZXggPSBhY3RpdmVJbmRleCAtIDE7XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgaWYgKCF3cmFwKSByZXR1cm47XG4gICAgICAgIGluZGV4ID0gY291bnRDaGlsZHJlbihfdGhpcy5wcm9wcy5jaGlsZHJlbikgLSAxO1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5zZWxlY3QoaW5kZXgsIGUsICdwcmV2Jyk7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBDYXJvdXNlbC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5jeWNsZSgpO1xuICB9O1xuXG4gIENhcm91c2VsLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9IGZ1bmN0aW9uIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIF9yZWYpIHtcbiAgICB2YXIgcHJldmlvdXNBY3RpdmVJbmRleCA9IF9yZWYuYWN0aXZlSW5kZXg7XG5cbiAgICBpZiAobmV4dFByb3BzLmFjdGl2ZUluZGV4ICE9PSBwcmV2aW91c0FjdGl2ZUluZGV4KSB7XG4gICAgICB2YXIgbGFzdFBvc3NpYmxlSW5kZXggPSBjb3VudENoaWxkcmVuKG5leHRQcm9wcy5jaGlsZHJlbikgLSAxO1xuICAgICAgdmFyIG5leHRJbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG5leHRQcm9wcy5hY3RpdmVJbmRleCwgbGFzdFBvc3NpYmxlSW5kZXgpKTtcbiAgICAgIHZhciBkaXJlY3Rpb247XG5cbiAgICAgIGlmIChuZXh0SW5kZXggPT09IDAgJiYgcHJldmlvdXNBY3RpdmVJbmRleCA+PSBsYXN0UG9zc2libGVJbmRleCB8fCBwcmV2aW91c0FjdGl2ZUluZGV4IDw9IG5leHRJbmRleCkge1xuICAgICAgICBkaXJlY3Rpb24gPSAnbmV4dCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXJlY3Rpb24gPSAncHJldic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICBwcmV2aW91c0FjdGl2ZUluZGV4OiBwcmV2aW91c0FjdGl2ZUluZGV4LFxuICAgICAgICBhY3RpdmVJbmRleDogbmV4dEluZGV4XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoXywgcHJldlN0YXRlKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgX3RoaXMkcHJvcHMzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgYnNQcmVmaXggPSBfdGhpcyRwcm9wczMuYnNQcmVmaXgsXG4gICAgICAgIHNsaWRlID0gX3RoaXMkcHJvcHMzLnNsaWRlLFxuICAgICAgICBvblNsaWRlRW5kID0gX3RoaXMkcHJvcHMzLm9uU2xpZGVFbmQ7XG4gICAgaWYgKCFzbGlkZSB8fCB0aGlzLnN0YXRlLmFjdGl2ZUluZGV4ID09PSBwcmV2U3RhdGUuYWN0aXZlSW5kZXggfHwgdGhpcy5faXNTbGlkaW5nKSByZXR1cm47XG4gICAgdmFyIF90aGlzJHN0YXRlID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgYWN0aXZlSW5kZXggPSBfdGhpcyRzdGF0ZS5hY3RpdmVJbmRleCxcbiAgICAgICAgZGlyZWN0aW9uID0gX3RoaXMkc3RhdGUuZGlyZWN0aW9uO1xuICAgIHZhciBvcmRlckNsYXNzTmFtZSwgZGlyZWN0aW9uYWxDbGFzc05hbWU7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgIG9yZGVyQ2xhc3NOYW1lID0gYnNQcmVmaXggKyBcIi1pdGVtLW5leHRcIjtcbiAgICAgIGRpcmVjdGlvbmFsQ2xhc3NOYW1lID0gYnNQcmVmaXggKyBcIi1pdGVtLWxlZnRcIjtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICBvcmRlckNsYXNzTmFtZSA9IGJzUHJlZml4ICsgXCItaXRlbS1wcmV2XCI7XG4gICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IGJzUHJlZml4ICsgXCItaXRlbS1yaWdodFwiO1xuICAgIH1cblxuICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWU7XG4gICAgdGhpcy5wYXVzZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcblxuICAgIHRoaXMuc2FmZVNldFN0YXRlKHtcbiAgICAgIHByZXZDbGFzc2VzOiAnYWN0aXZlJyxcbiAgICAgIGN1cnJlbnRDbGFzc2VzOiBvcmRlckNsYXNzTmFtZVxuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpdGVtcyA9IF90aGlzMi5jYXJvdXNlbC5jdXJyZW50LmNoaWxkcmVuO1xuICAgICAgdmFyIG5leHRFbGVtZW50ID0gaXRlbXNbYWN0aXZlSW5kZXhdO1xuICAgICAgdHJpZ2dlckJyb3dzZXJSZWZsb3cobmV4dEVsZW1lbnQpO1xuXG4gICAgICBfdGhpczIuc2FmZVNldFN0YXRlKHtcbiAgICAgICAgcHJldkNsYXNzZXM6IGNsYXNzTmFtZXMoJ2FjdGl2ZScsIGRpcmVjdGlvbmFsQ2xhc3NOYW1lKSxcbiAgICAgICAgY3VycmVudENsYXNzZXM6IGNsYXNzTmFtZXMob3JkZXJDbGFzc05hbWUsIGRpcmVjdGlvbmFsQ2xhc3NOYW1lKVxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJhbnNpdGlvbkVuZChuZXh0RWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzMi5zYWZlU2V0U3RhdGUoe1xuICAgICAgICAgICAgcHJldkNsYXNzZXM6ICcnLFxuICAgICAgICAgICAgY3VycmVudENsYXNzZXM6ICdhY3RpdmUnXG4gICAgICAgICAgfSwgX3RoaXMyLmhhbmRsZVNsaWRlRW5kKTtcblxuICAgICAgICAgIGlmIChvblNsaWRlRW5kKSB7XG4gICAgICAgICAgICBvblNsaWRlRW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMuaXNVbm1vdW50ZWQgPSB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5zYWZlU2V0U3RhdGUgPSBmdW5jdGlvbiBzYWZlU2V0U3RhdGUoc3RhdGUsIGNiKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5pc1VubW91bnRlZCkgcmV0dXJuO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAhX3RoaXMzLmlzVW5tb3VudGVkICYmIGNiKCk7XG4gICAgfSk7XG4gIH0gLy8gVGhpcyBtaWdodCBiZSBhIHB1YmxpYyBBUEkuXG4gIDtcblxuICBfcHJvdG8ucGF1c2UgPSBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICB0aGlzLl9pc1BhdXNlZCA9IHRydWU7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuICB9O1xuXG4gIF9wcm90by5jeWNsZSA9IGZ1bmN0aW9uIGN5Y2xlKCkge1xuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaW50ZXJ2YWwgJiYgIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA/IHRoaXMuaGFuZGxlTmV4dFdoZW5WaXNpYmxlIDogdGhpcy5oYW5kbGVOZXh0LCB0aGlzLnByb3BzLmludGVydmFsKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnRvID0gZnVuY3Rpb24gdG8oaW5kZXgsIGV2ZW50KSB7XG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBjb3VudENoaWxkcmVuKGNoaWxkcmVuKSAtIDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICB0aGlzLl9wZW5kaW5nSW5kZXggPSBpbmRleDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdChpbmRleCwgZXZlbnQpO1xuICB9O1xuXG4gIF9wcm90by5zZWxlY3QgPSBmdW5jdGlvbiBzZWxlY3QoaW5kZXgsIGV2ZW50LCBkaXJlY3Rpb24pIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnNlbGVjdFRocm90dGxlKTtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQucGVyc2lzdCkgZXZlbnQucGVyc2lzdCgpOyAvLyBUaGUgdGltZW91dCB0aHJvdHRsZXMgZmFzdCBjbGlja3MsIGluIG9yZGVyIHRvIGdpdmUgYW55IHBlbmRpbmcgc3RhdGVcbiAgICAvLyBhIGNoYW5jZSB0byB1cGRhdGUgYW5kIHByb3BhZ2F0ZSBiYWNrIHRocm91Z2ggcHJvcHNcblxuICAgIHRoaXMuc2VsZWN0VGhyb3R0bGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNsZWFyVGltZW91dChfdGhpczQudGltZW91dCk7XG4gICAgICB2YXIgX3RoaXM0JHByb3BzID0gX3RoaXM0LnByb3BzLFxuICAgICAgICAgIGFjdGl2ZUluZGV4ID0gX3RoaXM0JHByb3BzLmFjdGl2ZUluZGV4LFxuICAgICAgICAgIG9uU2VsZWN0ID0gX3RoaXM0JHByb3BzLm9uU2VsZWN0O1xuICAgICAgaWYgKGluZGV4ID09PSBhY3RpdmVJbmRleCB8fCBfdGhpczQuX2lzU2xpZGluZyB8fCBfdGhpczQuaXNVbm1vdW50ZWQpIHJldHVybjtcbiAgICAgIG9uU2VsZWN0KGluZGV4LCBkaXJlY3Rpb24gfHwgKGluZGV4IDwgYWN0aXZlSW5kZXggPyAncHJldicgOiAnbmV4dCcpLCBldmVudCk7XG4gICAgfSwgNTApO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXJDb250cm9scyA9IGZ1bmN0aW9uIHJlbmRlckNvbnRyb2xzKHByb3BlcnRpZXMpIHtcbiAgICB2YXIgYnNQcmVmaXggPSB0aGlzLnByb3BzLmJzUHJlZml4O1xuICAgIHZhciB3cmFwID0gcHJvcGVydGllcy53cmFwLFxuICAgICAgICBjaGlsZHJlbiA9IHByb3BlcnRpZXMuY2hpbGRyZW4sXG4gICAgICAgIGFjdGl2ZUluZGV4ID0gcHJvcGVydGllcy5hY3RpdmVJbmRleCxcbiAgICAgICAgcHJldkljb24gPSBwcm9wZXJ0aWVzLnByZXZJY29uLFxuICAgICAgICBuZXh0SWNvbiA9IHByb3BlcnRpZXMubmV4dEljb24sXG4gICAgICAgIHByZXZMYWJlbCA9IHByb3BlcnRpZXMucHJldkxhYmVsLFxuICAgICAgICBuZXh0TGFiZWwgPSBwcm9wZXJ0aWVzLm5leHRMYWJlbDtcbiAgICB2YXIgY291bnQgPSBjb3VudENoaWxkcmVuKGNoaWxkcmVuKTtcbiAgICByZXR1cm4gWyh3cmFwIHx8IGFjdGl2ZUluZGV4ICE9PSAwKSAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFNhZmVBbmNob3IsIHtcbiAgICAgIGtleTogXCJwcmV2XCIsXG4gICAgICBjbGFzc05hbWU6IGJzUHJlZml4ICsgXCItY29udHJvbC1wcmV2XCIsXG4gICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVByZXZcbiAgICB9LCBwcmV2SWNvbiwgcHJldkxhYmVsICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJzci1vbmx5XCJcbiAgICB9LCBwcmV2TGFiZWwpKSwgKHdyYXAgfHwgYWN0aXZlSW5kZXggIT09IGNvdW50IC0gMSkgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChTYWZlQW5jaG9yLCB7XG4gICAgICBrZXk6IFwibmV4dFwiLFxuICAgICAgY2xhc3NOYW1lOiBic1ByZWZpeCArIFwiLWNvbnRyb2wtbmV4dFwiLFxuICAgICAgb25DbGljazogdGhpcy5oYW5kbGVOZXh0XG4gICAgfSwgbmV4dEljb24sIG5leHRMYWJlbCAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwic3Itb25seVwiXG4gICAgfSwgbmV4dExhYmVsKSldO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXJJbmRpY2F0b3JzID0gZnVuY3Rpb24gcmVuZGVySW5kaWNhdG9ycyhjaGlsZHJlbiwgYWN0aXZlSW5kZXgpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHZhciBic1ByZWZpeCA9IHRoaXMucHJvcHMuYnNQcmVmaXg7XG4gICAgdmFyIGluZGljYXRvcnMgPSBbXTtcbiAgICBmb3JFYWNoKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XG4gICAgICBpbmRpY2F0b3JzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtcbiAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgY2xhc3NOYW1lOiBpbmRleCA9PT0gYWN0aXZlSW5kZXggPyAnYWN0aXZlJyA6IG51bGwsXG4gICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgICAgIHJldHVybiBfdGhpczUudG8oaW5kZXgsIGUpO1xuICAgICAgICB9XG4gICAgICB9KSwgLy8gRm9yY2Ugd2hpdGVzcGFjZSBiZXR3ZWVuIGluZGljYXRvciBlbGVtZW50cy4gQm9vdHN0cmFwIHJlcXVpcmVzXG4gICAgICAvLyB0aGlzIGZvciBjb3JyZWN0IHNwYWNpbmcgb2YgZWxlbWVudHMuXG4gICAgICAnICcpO1xuICAgIH0pO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwib2xcIiwge1xuICAgICAgY2xhc3NOYW1lOiBic1ByZWZpeCArIFwiLWluZGljYXRvcnNcIlxuICAgIH0sIGluZGljYXRvcnMpO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzJHByb3BzNCA9IHRoaXMucHJvcHMsXG4gICAgICAgIF90aGlzJHByb3BzNCRhcyA9IF90aGlzJHByb3BzNC5hcyxcbiAgICAgICAgQ29tcG9uZW50ID0gX3RoaXMkcHJvcHM0JGFzID09PSB2b2lkIDAgPyAnZGl2JyA6IF90aGlzJHByb3BzNCRhcyxcbiAgICAgICAgYnNQcmVmaXggPSBfdGhpcyRwcm9wczQuYnNQcmVmaXgsXG4gICAgICAgIHNsaWRlID0gX3RoaXMkcHJvcHM0LnNsaWRlLFxuICAgICAgICBmYWRlID0gX3RoaXMkcHJvcHM0LmZhZGUsXG4gICAgICAgIGluZGljYXRvcnMgPSBfdGhpcyRwcm9wczQuaW5kaWNhdG9ycyxcbiAgICAgICAgY29udHJvbHMgPSBfdGhpcyRwcm9wczQuY29udHJvbHMsXG4gICAgICAgIHdyYXAgPSBfdGhpcyRwcm9wczQud3JhcCxcbiAgICAgICAgdG91Y2ggPSBfdGhpcyRwcm9wczQudG91Y2gsXG4gICAgICAgIHByZXZJY29uID0gX3RoaXMkcHJvcHM0LnByZXZJY29uLFxuICAgICAgICBwcmV2TGFiZWwgPSBfdGhpcyRwcm9wczQucHJldkxhYmVsLFxuICAgICAgICBuZXh0SWNvbiA9IF90aGlzJHByb3BzNC5uZXh0SWNvbixcbiAgICAgICAgbmV4dExhYmVsID0gX3RoaXMkcHJvcHM0Lm5leHRMYWJlbCxcbiAgICAgICAgY2xhc3NOYW1lID0gX3RoaXMkcHJvcHM0LmNsYXNzTmFtZSxcbiAgICAgICAgY2hpbGRyZW4gPSBfdGhpcyRwcm9wczQuY2hpbGRyZW4sXG4gICAgICAgIGtleWJvYXJkID0gX3RoaXMkcHJvcHM0LmtleWJvYXJkLFxuICAgICAgICBfNSA9IF90aGlzJHByb3BzNC5hY3RpdmVJbmRleCxcbiAgICAgICAgXzQgPSBfdGhpcyRwcm9wczQucGF1c2VPbkhvdmVyLFxuICAgICAgICBfMyA9IF90aGlzJHByb3BzNC5pbnRlcnZhbCxcbiAgICAgICAgXzIgPSBfdGhpcyRwcm9wczQub25TZWxlY3QsXG4gICAgICAgIF8xID0gX3RoaXMkcHJvcHM0Lm9uU2xpZGVFbmQsXG4gICAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3RoaXMkcHJvcHM0LCBbXCJhc1wiLCBcImJzUHJlZml4XCIsIFwic2xpZGVcIiwgXCJmYWRlXCIsIFwiaW5kaWNhdG9yc1wiLCBcImNvbnRyb2xzXCIsIFwid3JhcFwiLCBcInRvdWNoXCIsIFwicHJldkljb25cIiwgXCJwcmV2TGFiZWxcIiwgXCJuZXh0SWNvblwiLCBcIm5leHRMYWJlbFwiLCBcImNsYXNzTmFtZVwiLCBcImNoaWxkcmVuXCIsIFwia2V5Ym9hcmRcIiwgXCJhY3RpdmVJbmRleFwiLCBcInBhdXNlT25Ib3ZlclwiLCBcImludGVydmFsXCIsIFwib25TZWxlY3RcIiwgXCJvblNsaWRlRW5kXCJdKTtcblxuICAgIHZhciBfdGhpcyRzdGF0ZTIgPSB0aGlzLnN0YXRlLFxuICAgICAgICBhY3RpdmVJbmRleCA9IF90aGlzJHN0YXRlMi5hY3RpdmVJbmRleCxcbiAgICAgICAgcHJldmlvdXNBY3RpdmVJbmRleCA9IF90aGlzJHN0YXRlMi5wcmV2aW91c0FjdGl2ZUluZGV4LFxuICAgICAgICBwcmV2Q2xhc3NlcyA9IF90aGlzJHN0YXRlMi5wcmV2Q2xhc3NlcyxcbiAgICAgICAgY3VycmVudENsYXNzZXMgPSBfdGhpcyRzdGF0ZTIuY3VycmVudENsYXNzZXM7XG4gICAgcmV0dXJuICgvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgICAgICBvblRvdWNoU3RhcnQ6IHRvdWNoID8gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0IDogdW5kZWZpbmVkLFxuICAgICAgICBvblRvdWNoRW5kOiB0b3VjaCA/IHRoaXMuaGFuZGxlVG91Y2hFbmQgOiB1bmRlZmluZWRcbiAgICAgIH0sIHByb3BzLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4LCBzbGlkZSAmJiAnc2xpZGUnLCBmYWRlICYmIGJzUHJlZml4ICsgXCItZmFkZVwiKSxcbiAgICAgICAgb25LZXlEb3duOiBrZXlib2FyZCA/IHRoaXMuaGFuZGxlS2V5RG93biA6IHVuZGVmaW5lZCxcbiAgICAgICAgb25Nb3VzZU92ZXI6IHRoaXMuaGFuZGxlTW91c2VPdmVyLFxuICAgICAgICBvbk1vdXNlT3V0OiB0aGlzLmhhbmRsZU1vdXNlT3V0XG4gICAgICB9KSwgaW5kaWNhdG9ycyAmJiB0aGlzLnJlbmRlckluZGljYXRvcnMoY2hpbGRyZW4sIGFjdGl2ZUluZGV4KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogYnNQcmVmaXggKyBcIi1pbm5lclwiLFxuICAgICAgICByZWY6IHRoaXMuY2Fyb3VzZWxcbiAgICAgIH0sIG1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IGluZGV4ID09PSBhY3RpdmVJbmRleDtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gaW5kZXggPT09IHByZXZpb3VzQWN0aXZlSW5kZXg7XG4gICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2hpbGQucHJvcHMuY2xhc3NOYW1lLCBjdXJyZW50ICYmIGN1cnJlbnRDbGFzc2VzLCBwcmV2aW91cyAmJiBwcmV2Q2xhc3NlcylcbiAgICAgICAgfSk7XG4gICAgICB9KSksIGNvbnRyb2xzICYmIHRoaXMucmVuZGVyQ29udHJvbHMoe1xuICAgICAgICB3cmFwOiB3cmFwLFxuICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleCxcbiAgICAgICAgcHJldkljb246IHByZXZJY29uLFxuICAgICAgICBwcmV2TGFiZWw6IHByZXZMYWJlbCxcbiAgICAgICAgbmV4dEljb246IG5leHRJY29uLFxuICAgICAgICBuZXh0TGFiZWw6IG5leHRMYWJlbFxuICAgICAgfSkpXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gQ2Fyb3VzZWw7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbkNhcm91c2VsLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbnZhciBEZWNvcmF0ZWRDYXJvdXNlbCA9IGNyZWF0ZUJvb3RzdHJhcENvbXBvbmVudCh1bmNvbnRyb2xsYWJsZShDYXJvdXNlbCwge1xuICBhY3RpdmVJbmRleDogJ29uU2VsZWN0J1xufSksICdjYXJvdXNlbCcpO1xuRGVjb3JhdGVkQ2Fyb3VzZWwuQ2FwdGlvbiA9IENhcm91c2VsQ2FwdGlvbjtcbkRlY29yYXRlZENhcm91c2VsLkl0ZW0gPSBDYXJvdXNlbEl0ZW07XG5leHBvcnQgZGVmYXVsdCBEZWNvcmF0ZWRDYXJvdXNlbDsiLCJpbXBvcnQgY3JlYXRlV2l0aEJzUHJlZml4IGZyb20gJy4vY3JlYXRlV2l0aEJzUHJlZml4JztcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVdpdGhCc1ByZWZpeCgnY2Fyb3VzZWwtY2FwdGlvbicsIHtcbiAgQ29tcG9uZW50OiAnZGl2J1xufSk7IiwiaW1wb3J0IGNyZWF0ZVdpdGhCc1ByZWZpeCBmcm9tICcuL2NyZWF0ZVdpdGhCc1ByZWZpeCc7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVXaXRoQnNQcmVmaXgoJ2Nhcm91c2VsLWl0ZW0nKTsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbnZhciBwcm9wVHlwZXMgPSB7XG4gIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jXG59O1xudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgbGFiZWw6ICdDbG9zZSdcbn07XG52YXIgQ2xvc2VCdXR0b24gPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGxhYmVsID0gX3JlZi5sYWJlbCxcbiAgICAgIG9uQ2xpY2sgPSBfcmVmLm9uQ2xpY2ssXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wibGFiZWxcIiwgXCJvbkNsaWNrXCIsIFwiY2xhc3NOYW1lXCJdKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgdHlwZTogXCJidXR0b25cIixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoJ2Nsb3NlJywgY2xhc3NOYW1lKSxcbiAgICBvbkNsaWNrOiBvbkNsaWNrXG4gIH0sIHByb3BzKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCJcbiAgfSwgXCJcXHhEN1wiKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgIGNsYXNzTmFtZTogXCJzci1vbmx5XCJcbiAgfSwgbGFiZWwpKTtcbn0pO1xuQ2xvc2VCdXR0b24uZGlzcGxheU5hbWUgPSAnQ2xvc2VCdXR0b24nO1xuQ2xvc2VCdXR0b24ucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuQ2xvc2VCdXR0b24uZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuZXhwb3J0IGRlZmF1bHQgQ2xvc2VCdXR0b247IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IERyb3Bkb3duIGZyb20gJy4vRHJvcGRvd24nO1xudmFyIHByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEFuIGh0bWwgaWQgYXR0cmlidXRlIGZvciB0aGUgVG9nZ2xlIGJ1dHRvbiwgbmVjZXNzYXJ5IGZvciBhc3Npc3RpdmUgdGVjaG5vbG9naWVzLCBzdWNoIGFzIHNjcmVlbiByZWFkZXJzLlxuICAgKiBAdHlwZSB7c3RyaW5nfG51bWJlcn1cbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICBpZDogUHJvcFR5cGVzLmFueSxcblxuICAvKiogQW4gYGhyZWZgIHBhc3NlZCB0byB0aGUgVG9nZ2xlIGNvbXBvbmVudCAqL1xuICBocmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBBbiBgb25DbGlja2AgaGFuZGxlciBwYXNzZWQgdG8gdGhlIFRvZ2dsZSBjb21wb25lbnQgKi9cbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqIFRoZSBjb250ZW50IG9mIHRoZSBub24tdG9nZ2xlIEJ1dHRvbi4gICovXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBEaXNhYmxlcyBib3RoIEJ1dHRvbnMgICovXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKiogQW4gQVJJQSBhY2Nlc3NpYmxlIHJvbGUgYXBwbGllZCB0byB0aGUgTWVudSBjb21wb25lbnQuIFdoZW4gc2V0IHRvICdtZW51JywgVGhlIGRyb3Bkb3duICovXG4gIG1lbnVSb2xlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiAgV2hpY2ggZXZlbnQgd2hlbiBmaXJlZCBvdXRzaWRlIHRoZSBjb21wb25lbnQgd2lsbCBjYXVzZSBpdCB0byBiZSBjbG9zZWQuXG4gICAqXG4gICAqIF9zZWUgW0Ryb3Bkb3duTWVudV0oI21lbnUtcHJvcHMpIGZvciBtb3JlIGRldGFpbHNfXG4gICAqL1xuICByb290Q2xvc2VFdmVudDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogQGlnbm9yZSAqL1xuICBic1ByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogQGlnbm9yZSAqL1xuICB2YXJpYW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBAaWdub3JlICovXG4gIHNpemU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG4vKipcbiAqIEEgY29udmVuaWVuY2UgY29tcG9uZW50IGZvciBzaW1wbGUgb3IgZ2VuZXJhbCB1c2UgZHJvcGRvd25zLiBSZW5kZXJzIGEgYEJ1dHRvbmAgdG9nZ2xlIGFuZCBhbGwgYGNoaWxkcmVuYFxuICogYXJlIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgZGVmYXVsdCBgRHJvcGRvd24uTWVudWAuXG4gKlxuICogX0FsbCB1bmtub3duIHByb3BzIGFyZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgYERyb3Bkb3duYCBjb21wb25lbnQuXyBPbmx5XG4gKiB0aGUgQnV0dG9uIGB2YXJpYW50YCwgYHNpemVgIGFuZCBgYnNQcmVmaXhgIHByb3BzIGFyZSBwYXNzZWQgdG8gdGhlIHRvZ2dsZSxcbiAqIGFsb25nIHdpdGggbWVudSByZWxhdGVkIHByb3BzIGFyZSBwYXNzZWQgdG8gdGhlIGBEcm9wZG93bi5NZW51YFxuICovXG5cbnZhciBEcm9wZG93bkJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgdGl0bGUgPSBfcmVmLnRpdGxlLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgcm9vdENsb3NlRXZlbnQgPSBfcmVmLnJvb3RDbG9zZUV2ZW50LFxuICAgICAgdmFyaWFudCA9IF9yZWYudmFyaWFudCxcbiAgICAgIHNpemUgPSBfcmVmLnNpemUsXG4gICAgICBtZW51Um9sZSA9IF9yZWYubWVudVJvbGUsXG4gICAgICBkaXNhYmxlZCA9IF9yZWYuZGlzYWJsZWQsXG4gICAgICBocmVmID0gX3JlZi5ocmVmLFxuICAgICAgaWQgPSBfcmVmLmlkLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJ0aXRsZVwiLCBcImNoaWxkcmVuXCIsIFwiYnNQcmVmaXhcIiwgXCJyb290Q2xvc2VFdmVudFwiLCBcInZhcmlhbnRcIiwgXCJzaXplXCIsIFwibWVudVJvbGVcIiwgXCJkaXNhYmxlZFwiLCBcImhyZWZcIiwgXCJpZFwiXSk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd24sIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcyksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd24uVG9nZ2xlLCB7XG4gICAgaWQ6IGlkLFxuICAgIGhyZWY6IGhyZWYsXG4gICAgc2l6ZTogc2l6ZSxcbiAgICB2YXJpYW50OiB2YXJpYW50LFxuICAgIGRpc2FibGVkOiBkaXNhYmxlZCxcbiAgICBjaGlsZEJzUHJlZml4OiBic1ByZWZpeFxuICB9LCB0aXRsZSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd24uTWVudSwge1xuICAgIHJvbGU6IG1lbnVSb2xlLFxuICAgIHJvb3RDbG9zZUV2ZW50OiByb290Q2xvc2VFdmVudFxuICB9LCBjaGlsZHJlbikpO1xufSk7XG5Ecm9wZG93bkJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdEcm9wZG93bkJ1dHRvbic7XG5Ecm9wZG93bkJ1dHRvbi5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkJ1dHRvbjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCxcbiAqIGJ1dCBvbmx5IG1hcHMgb3ZlciBjaGlsZHJlbiB0aGF0IGFyZSBcInZhbGlkIGVsZW1lbnRzXCIuXG4gKlxuICogVGhlIG1hcEZ1bmN0aW9uIHByb3ZpZGVkIGluZGV4IHdpbGwgYmUgbm9ybWFsaXNlZCB0byB0aGUgY29tcG9uZW50cyBtYXBwZWQsXG4gKiBzbyBhbiBpbnZhbGlkIGNvbXBvbmVudCB3b3VsZCBub3QgaW5jcmVhc2UgdGhlIGluZGV4LlxuICpcbiAqL1xuXG5mdW5jdGlvbiBtYXAoY2hpbGRyZW4sIGZ1bmMpIHtcbiAgdmFyIGluZGV4ID0gMDtcbiAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSA/IGZ1bmMoY2hpbGQsIGluZGV4KyspIDogY2hpbGQ7XG4gIH0pO1xufVxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIFwidmFsaWQgZWxlbWVudHNcIi5cbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZCB3aXRoIHRoZSBpbmRleCByZWZsZWN0aW5nIHRoZSBwb3NpdGlvbiByZWxhdGl2ZSB0byBcInZhbGlkIGNvbXBvbmVudHNcIi5cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvckVhY2goY2hpbGRyZW4sIGZ1bmMpIHtcbiAgdmFyIGluZGV4ID0gMDtcbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkgZnVuYyhjaGlsZCwgaW5kZXgrKyk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBtYXAsIGZvckVhY2ggfTsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuXG52YXIgX2ZhZGVTdHlsZXM7XG5cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHRyYW5zaXRpb25FbmQgZnJvbSAnZG9tLWhlbHBlcnMvdHJhbnNpdGlvbkVuZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVHJhbnNpdGlvbiwgeyBFTlRFUkVELCBFTlRFUklORyB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAvVHJhbnNpdGlvbic7XG5pbXBvcnQgdHJpZ2dlckJyb3dzZXJSZWZsb3cgZnJvbSAnLi90cmlnZ2VyQnJvd3NlclJlZmxvdyc7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBpbjogZmFsc2UsXG4gIHRpbWVvdXQ6IDMwMCxcbiAgbW91bnRPbkVudGVyOiBmYWxzZSxcbiAgdW5tb3VudE9uRXhpdDogZmFsc2UsXG4gIGFwcGVhcjogZmFsc2Vcbn07XG52YXIgZmFkZVN0eWxlcyA9IChfZmFkZVN0eWxlcyA9IHt9LCBfZmFkZVN0eWxlc1tFTlRFUklOR10gPSAnc2hvdycsIF9mYWRlU3R5bGVzW0VOVEVSRURdID0gJ3Nob3cnLCBfZmFkZVN0eWxlcyk7XG52YXIgRmFkZSA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImNsYXNzTmFtZVwiLCBcImNoaWxkcmVuXCJdKTtcblxuICB2YXIgaGFuZGxlRW50ZXIgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAobm9kZSkge1xuICAgIHRyaWdnZXJCcm93c2VyUmVmbG93KG5vZGUpO1xuICAgIGlmIChwcm9wcy5vbkVudGVyKSBwcm9wcy5vbkVudGVyKG5vZGUpO1xuICB9LCBbcHJvcHNdKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNpdGlvbiwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIGFkZEVuZExpc3RlbmVyOiB0cmFuc2l0aW9uRW5kXG4gIH0sIHByb3BzLCB7XG4gICAgb25FbnRlcjogaGFuZGxlRW50ZXJcbiAgfSksIGZ1bmN0aW9uIChzdGF0dXMsIGlubmVyUHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCBfZXh0ZW5kcyh7fSwgaW5uZXJQcm9wcywge1xuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKCdmYWRlJywgY2xhc3NOYW1lLCBjaGlsZHJlbi5wcm9wcy5jbGFzc05hbWUsIGZhZGVTdHlsZXNbc3RhdHVzXSlcbiAgICB9KSk7XG4gIH0pO1xufSk7XG5GYWRlLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbkZhZGUuZGlzcGxheU5hbWUgPSAnRmFkZSc7XG5leHBvcnQgZGVmYXVsdCBGYWRlOyIsImltcG9ydCBjcmVhdGVXaXRoQnNQcmVmaXggZnJvbSAnLi9jcmVhdGVXaXRoQnNQcmVmaXgnO1xuaW1wb3J0IEZpZ3VyZUltYWdlIGZyb20gJy4vRmlndXJlSW1hZ2UnO1xuaW1wb3J0IEZpZ3VyZUNhcHRpb24gZnJvbSAnLi9GaWd1cmVDYXB0aW9uJztcbnZhciBGaWd1cmUgPSBjcmVhdGVXaXRoQnNQcmVmaXgoJ2ZpZ3VyZScsIHtcbiAgQ29tcG9uZW50OiAnZmlndXJlJ1xufSk7XG5GaWd1cmUuSW1hZ2UgPSBGaWd1cmVJbWFnZTtcbkZpZ3VyZS5DYXB0aW9uID0gRmlndXJlQ2FwdGlvbjtcbmV4cG9ydCBkZWZhdWx0IEZpZ3VyZTsiLCJpbXBvcnQgY3JlYXRlV2l0aEJzUHJlZml4IGZyb20gJy4vY3JlYXRlV2l0aEJzUHJlZml4JztcbnZhciBGaWd1cmVDYXB0aW9uID0gY3JlYXRlV2l0aEJzUHJlZml4KCdmaWd1cmUtY2FwdGlvbicsIHtcbiAgQ29tcG9uZW50OiAnZmlnY2FwdGlvbidcbn0pO1xuZXhwb3J0IGRlZmF1bHQgRmlndXJlQ2FwdGlvbjsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJbWFnZSBmcm9tICcuL0ltYWdlJztcbnZhciBwcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBAZGVmYXVsdCAnaW1nJ1xuICAgKi9cbiAgYnNQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFNldHMgaW1hZ2UgYXMgZmx1aWQgaW1hZ2UuXG4gICAqL1xuICBmbHVpZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFNldHMgaW1hZ2Ugc2hhcGUgYXMgcm91bmRlZC5cbiAgICovXG4gIHJvdW5kZWQ6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBTZXRzIGltYWdlIHNoYXBlIGFzIGNpcmNsZS5cbiAgICovXG4gIHJvdW5kZWRDaXJjbGU6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBTZXRzIGltYWdlIHNoYXBlIGFzIHRodW1ibmFpbC5cbiAgICovXG4gIHRodW1ibmFpbDogUHJvcFR5cGVzLmJvb2xcbn07XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBmbHVpZDogdHJ1ZVxufTtcbnZhciBGaWd1cmVJbWFnZSA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImNsYXNzTmFtZVwiXSk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW1hZ2UsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsICdmaWd1cmUtaW1nJylcbiAgfSkpO1xufSk7XG5GaWd1cmVJbWFnZS5kaXNwbGF5TmFtZSA9ICdGaWd1cmVJbWFnZSc7XG5GaWd1cmVJbWFnZS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5GaWd1cmVJbWFnZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5leHBvcnQgZGVmYXVsdCBGaWd1cmVJbWFnZTsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZVdpdGhCc1ByZWZpeCBmcm9tICcuL2NyZWF0ZVdpdGhCc1ByZWZpeCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuXG4vKipcbiAqXG4gKiBAcHJvcGVydHkge0lucHV0R3JvdXBBcHBlbmR9IEFwcGVuZFxuICogQHByb3BlcnR5IHtJbnB1dEdyb3VwUHJlcGVuZH0gUHJlcGVuZFxuICogQHByb3BlcnR5IHtJbnB1dEdyb3VwVGV4dH0gVGV4dFxuICogQHByb3BlcnR5IHtJbnB1dEdyb3VwUmFkaW99IFJhZGlvXG4gKiBAcHJvcGVydHkge0lucHV0R3JvdXBDaGVja2JveH0gQ2hlY2tib3hcbiAqL1xudmFyIElucHV0R3JvdXAgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIHNpemUgPSBfcmVmLnNpemUsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIF9yZWYkYXMgPSBfcmVmLmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3JlZiRhcyA9PT0gdm9pZCAwID8gJ2RpdicgOiBfcmVmJGFzLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJic1ByZWZpeFwiLCBcInNpemVcIiwgXCJjbGFzc05hbWVcIiwgXCJhc1wiXSk7XG5cbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdpbnB1dC1ncm91cCcpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4LCBzaXplICYmIGJzUHJlZml4ICsgXCItXCIgKyBzaXplKVxuICB9KSk7XG59KTtcbnZhciBJbnB1dEdyb3VwQXBwZW5kID0gY3JlYXRlV2l0aEJzUHJlZml4KCdpbnB1dC1ncm91cC1hcHBlbmQnKTtcbnZhciBJbnB1dEdyb3VwUHJlcGVuZCA9IGNyZWF0ZVdpdGhCc1ByZWZpeCgnaW5wdXQtZ3JvdXAtcHJlcGVuZCcpO1xudmFyIElucHV0R3JvdXBUZXh0ID0gY3JlYXRlV2l0aEJzUHJlZml4KCdpbnB1dC1ncm91cC10ZXh0Jywge1xuICBDb21wb25lbnQ6ICdzcGFuJ1xufSk7XG5cbnZhciBJbnB1dEdyb3VwQ2hlY2tib3ggPSBmdW5jdGlvbiBJbnB1dEdyb3VwQ2hlY2tib3gocHJvcHMpIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRHcm91cFRleHQsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBfZXh0ZW5kcyh7XG4gICAgdHlwZTogXCJjaGVja2JveFwiXG4gIH0sIHByb3BzKSkpO1xufTtcblxudmFyIElucHV0R3JvdXBSYWRpbyA9IGZ1bmN0aW9uIElucHV0R3JvdXBSYWRpbyhwcm9wcykge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dEdyb3VwVGV4dCwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIF9leHRlbmRzKHtcbiAgICB0eXBlOiBcInJhZGlvXCJcbiAgfSwgcHJvcHMpKSk7XG59O1xuXG5JbnB1dEdyb3VwLmRpc3BsYXlOYW1lID0gJ0lucHV0R3JvdXAnO1xuSW5wdXRHcm91cC5UZXh0ID0gSW5wdXRHcm91cFRleHQ7XG5JbnB1dEdyb3VwLlJhZGlvID0gSW5wdXRHcm91cFJhZGlvO1xuSW5wdXRHcm91cC5DaGVja2JveCA9IElucHV0R3JvdXBDaGVja2JveDtcbklucHV0R3JvdXAuQXBwZW5kID0gSW5wdXRHcm91cEFwcGVuZDtcbklucHV0R3JvdXAuUHJlcGVuZCA9IElucHV0R3JvdXBQcmVwZW5kO1xuZXhwb3J0IGRlZmF1bHQgSW5wdXRHcm91cDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIGZsdWlkOiBmYWxzZVxufTtcbnZhciBKdW1ib3Ryb24gPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIF9jbGFzc2VzO1xuXG4gIHZhciBfcmVmJGFzID0gX3JlZi5hcyxcbiAgICAgIENvbXBvbmVudCA9IF9yZWYkYXMgPT09IHZvaWQgMCA/ICdkaXYnIDogX3JlZiRhcyxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgZmx1aWQgPSBfcmVmLmZsdWlkLFxuICAgICAgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJhc1wiLCBcImNsYXNzTmFtZVwiLCBcImZsdWlkXCIsIFwiYnNQcmVmaXhcIl0pO1xuXG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnanVtYm90cm9uJyk7XG4gIHZhciBjbGFzc2VzID0gKF9jbGFzc2VzID0ge30sIF9jbGFzc2VzW2JzUHJlZml4XSA9IHRydWUsIF9jbGFzc2VzW2JzUHJlZml4ICsgXCItZmx1aWRcIl0gPSBmbHVpZCwgX2NsYXNzZXMpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGNsYXNzZXMpXG4gIH0pKTtcbn0pO1xuSnVtYm90cm9uLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbkp1bWJvdHJvbi5kaXNwbGF5TmFtZSA9ICdKdW1ib3Ryb24nO1xuZXhwb3J0IGRlZmF1bHQgSnVtYm90cm9uOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQWJzdHJhY3ROYXYgZnJvbSAnLi9BYnN0cmFjdE5hdic7XG5pbXBvcnQgTGlzdEdyb3VwSXRlbSBmcm9tICcuL0xpc3RHcm91cEl0ZW0nO1xudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgdmFyaWFudDogbnVsbCxcbiAgaG9yaXpvbnRhbDogbnVsbFxufTtcbnZhciBMaXN0R3JvdXAgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gIHZhciBfdXNlVW5jb250cm9sbGVkID0gdXNlVW5jb250cm9sbGVkKHByb3BzLCB7XG4gICAgYWN0aXZlS2V5OiAnb25TZWxlY3QnXG4gIH0pLFxuICAgICAgY2xhc3NOYW1lID0gX3VzZVVuY29udHJvbGxlZC5jbGFzc05hbWUsXG4gICAgICBic1ByZWZpeCA9IF91c2VVbmNvbnRyb2xsZWQuYnNQcmVmaXgsXG4gICAgICB2YXJpYW50ID0gX3VzZVVuY29udHJvbGxlZC52YXJpYW50LFxuICAgICAgaG9yaXpvbnRhbCA9IF91c2VVbmNvbnRyb2xsZWQuaG9yaXpvbnRhbCxcbiAgICAgIF91c2VVbmNvbnRyb2xsZWQkYXMgPSBfdXNlVW5jb250cm9sbGVkLmFzLFxuICAgICAgYXMgPSBfdXNlVW5jb250cm9sbGVkJGFzID09PSB2b2lkIDAgPyAnZGl2JyA6IF91c2VVbmNvbnRyb2xsZWQkYXMsXG4gICAgICBjb250cm9sbGVkUHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdXNlVW5jb250cm9sbGVkLCBbXCJjbGFzc05hbWVcIiwgXCJic1ByZWZpeFwiLCBcInZhcmlhbnRcIiwgXCJob3Jpem9udGFsXCIsIFwiYXNcIl0pO1xuXG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbGlzdC1ncm91cCcpO1xuICB2YXIgaG9yaXpvbnRhbFZhcmlhbnQ7XG5cbiAgaWYgKGhvcml6b250YWwpIHtcbiAgICBob3Jpem9udGFsVmFyaWFudCA9IGhvcml6b250YWwgPT09IHRydWUgPyAnaG9yaXpvbnRhbCcgOiBcImhvcml6b250YWwtXCIgKyBob3Jpem9udGFsO1xuICB9IGVsc2Uge1xuICAgIGhvcml6b250YWxWYXJpYW50ID0gbnVsbDtcbiAgfVxuXG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIShob3Jpem9udGFsICYmIHZhcmlhbnQgPT09ICdmbHVzaCcpLCAnYHZhcmlhbnQ9XCJmbHVzaFwiYCBhbmQgYGhvcml6b250YWxgIHNob3VsZCBub3QgYmUgdXNlZCB0b2dldGhlci4nKSA6IHZvaWQgMDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWJzdHJhY3ROYXYsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBjb250cm9sbGVkUHJvcHMsIHtcbiAgICBhczogYXMsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgsIHZhcmlhbnQgJiYgYnNQcmVmaXggKyBcIi1cIiArIHZhcmlhbnQsIGhvcml6b250YWxWYXJpYW50ICYmIGJzUHJlZml4ICsgXCItXCIgKyBob3Jpem9udGFsVmFyaWFudClcbiAgfSkpO1xufSk7XG5MaXN0R3JvdXAuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuTGlzdEdyb3VwLmRpc3BsYXlOYW1lID0gJ0xpc3RHcm91cCc7XG5MaXN0R3JvdXAuSXRlbSA9IExpc3RHcm91cEl0ZW07XG5leHBvcnQgZGVmYXVsdCBMaXN0R3JvdXA7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFic3RyYWN0TmF2SXRlbSBmcm9tICcuL0Fic3RyYWN0TmF2SXRlbSc7XG5pbXBvcnQgeyBtYWtlRXZlbnRLZXkgfSBmcm9tICcuL1NlbGVjdGFibGVDb250ZXh0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICB2YXJpYW50OiBudWxsLFxuICBhY3RpdmU6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2Vcbn07XG52YXIgTGlzdEdyb3VwSXRlbSA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgYWN0aXZlID0gX3JlZi5hY3RpdmUsXG4gICAgICBkaXNhYmxlZCA9IF9yZWYuZGlzYWJsZWQsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIHZhcmlhbnQgPSBfcmVmLnZhcmlhbnQsXG4gICAgICBhY3Rpb24gPSBfcmVmLmFjdGlvbixcbiAgICAgIGFzID0gX3JlZi5hcyxcbiAgICAgIGV2ZW50S2V5ID0gX3JlZi5ldmVudEtleSxcbiAgICAgIG9uQ2xpY2sgPSBfcmVmLm9uQ2xpY2ssXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiYWN0aXZlXCIsIFwiZGlzYWJsZWRcIiwgXCJjbGFzc05hbWVcIiwgXCJ2YXJpYW50XCIsIFwiYWN0aW9uXCIsIFwiYXNcIiwgXCJldmVudEtleVwiLCBcIm9uQ2xpY2tcIl0pO1xuXG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbGlzdC1ncm91cC1pdGVtJyk7XG4gIHZhciBoYW5kbGVDbGljayA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvbkNsaWNrKSBvbkNsaWNrKGV2ZW50KTtcbiAgfSwgW2Rpc2FibGVkLCBvbkNsaWNrXSk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEFic3RyYWN0TmF2SXRlbSwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgZXZlbnRLZXk6IG1ha2VFdmVudEtleShldmVudEtleSwgcHJvcHMuaHJlZikgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgLFxuICAgIGFzOiBhcyB8fCAoYWN0aW9uID8gcHJvcHMuaHJlZiA/ICdhJyA6ICdidXR0b24nIDogJ2RpdicpLFxuICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4LCBhY3RpdmUgJiYgJ2FjdGl2ZScsIGRpc2FibGVkICYmICdkaXNhYmxlZCcsIHZhcmlhbnQgJiYgYnNQcmVmaXggKyBcIi1cIiArIHZhcmlhbnQsIGFjdGlvbiAmJiBic1ByZWZpeCArIFwiLWFjdGlvblwiKVxuICB9KSk7XG59KTtcbkxpc3RHcm91cEl0ZW0uZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuTGlzdEdyb3VwSXRlbS5kaXNwbGF5TmFtZSA9ICdMaXN0R3JvdXBJdGVtJztcbmV4cG9ydCBkZWZhdWx0IExpc3RHcm91cEl0ZW07IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVXaXRoQnNQcmVmaXggZnJvbSAnLi9jcmVhdGVXaXRoQnNQcmVmaXgnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbnZhciBNZWRpYSA9IFJlYWN0LmZvcndhcmRSZWYoIC8vIE5lZWQgdG8gZGVmaW5lIHRoZSBkZWZhdWx0IFwiYXNcIiBkdXJpbmcgcHJvcCBkZXN0cnVjdHVyaW5nIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBzdHlsZWQtY29tcG9uZW50cyBnaXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1ib290c3RyYXAvaXNzdWVzLzM1OTVcbmZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgX3JlZiRhcyA9IF9yZWYuYXMsXG4gICAgICBDb21wb25lbnQgPSBfcmVmJGFzID09PSB2b2lkIDAgPyAnZGl2JyA6IF9yZWYkYXMsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiY2xhc3NOYW1lXCIsIFwiYXNcIl0pO1xuXG4gIHZhciBwcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdtZWRpYScpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICAgIHJlZjogcmVmLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIHByZWZpeClcbiAgfSkpO1xufSk7XG5NZWRpYS5kaXNwbGF5TmFtZSA9ICdNZWRpYSc7XG5NZWRpYS5Cb2R5ID0gY3JlYXRlV2l0aEJzUHJlZml4KCdtZWRpYS1ib2R5Jyk7XG5leHBvcnQgZGVmYXVsdCBNZWRpYTsiLCJpbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBhZGRFdmVudExpc3RlbmVyIGZyb20gJ2RvbS1oZWxwZXJzL2FkZEV2ZW50TGlzdGVuZXInO1xuaW1wb3J0IGNhblVzZURPTSBmcm9tICdkb20taGVscGVycy9jYW5Vc2VET00nO1xuaW1wb3J0IG93bmVyRG9jdW1lbnQgZnJvbSAnZG9tLWhlbHBlcnMvb3duZXJEb2N1bWVudCc7XG5pbXBvcnQgcmVtb3ZlRXZlbnRMaXN0ZW5lciBmcm9tICdkb20taGVscGVycy9yZW1vdmVFdmVudExpc3RlbmVyJztcbmltcG9ydCBnZXRTY3JvbGxiYXJTaXplIGZyb20gJ2RvbS1oZWxwZXJzL3Njcm9sbGJhclNpemUnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCYXNlTW9kYWwgZnJvbSAncmVhY3Qtb3ZlcmxheXMvTW9kYWwnO1xuaW1wb3J0IEJvb3RzdHJhcE1vZGFsTWFuYWdlciBmcm9tICcuL0Jvb3RzdHJhcE1vZGFsTWFuYWdlcic7XG5pbXBvcnQgRmFkZSBmcm9tICcuL0ZhZGUnO1xuaW1wb3J0IEJvZHkgZnJvbSAnLi9Nb2RhbEJvZHknO1xuaW1wb3J0IE1vZGFsQ29udGV4dCBmcm9tICcuL01vZGFsQ29udGV4dCc7XG5pbXBvcnQgTW9kYWxEaWFsb2cgZnJvbSAnLi9Nb2RhbERpYWxvZyc7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vTW9kYWxGb290ZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL01vZGFsSGVhZGVyJztcbmltcG9ydCBUaXRsZSBmcm9tICcuL01vZGFsVGl0bGUnO1xuaW1wb3J0IHsgY3JlYXRlQm9vdHN0cmFwQ29tcG9uZW50IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbnZhciBtYW5hZ2VyO1xudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgc2hvdzogZmFsc2UsXG4gIGJhY2tkcm9wOiB0cnVlLFxuICBrZXlib2FyZDogdHJ1ZSxcbiAgYXV0b0ZvY3VzOiB0cnVlLFxuICBlbmZvcmNlRm9jdXM6IHRydWUsXG4gIHJlc3RvcmVGb2N1czogdHJ1ZSxcbiAgYW5pbWF0aW9uOiB0cnVlLFxuICBkaWFsb2dBczogTW9kYWxEaWFsb2dcbn07XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xuXG5mdW5jdGlvbiBEaWFsb2dUcmFuc2l0aW9uKHByb3BzKSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEZhZGUsIHByb3BzKTtcbn1cblxuZnVuY3Rpb24gQmFja2Ryb3BUcmFuc2l0aW9uKHByb3BzKSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEZhZGUsIHByb3BzKTtcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cblxuXG52YXIgTW9kYWwgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTW9kYWwsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE1vZGFsKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBfYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIF9hcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoX2FyZ3MpKSB8fCB0aGlzO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgc3R5bGU6IHt9XG4gICAgfTtcbiAgICBfdGhpcy5tb2RhbENvbnRleHQgPSB7XG4gICAgICBvbkhpZGU6IGZ1bmN0aW9uIG9uSGlkZSgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnByb3BzLm9uSGlkZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5zZXRNb2RhbFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIF90aGlzLl9tb2RhbCA9IHJlZjtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlRGlhbG9nTW91c2VEb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuX3dhaXRpbmdGb3JNb3VzZVVwID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlTW91c2VVcCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoX3RoaXMuX3dhaXRpbmdGb3JNb3VzZVVwICYmIGUudGFyZ2V0ID09PSBfdGhpcy5fbW9kYWwuZGlhbG9nKSB7XG4gICAgICAgIF90aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuX3dhaXRpbmdGb3JNb3VzZVVwID0gZmFsc2U7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChfdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayB8fCBlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIF90aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgX3RoaXMucHJvcHMub25IaWRlKCk7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUVudGVyID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wcztcblxuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICBfdGhpcy51cGRhdGVEaWFsb2dTdHlsZShub2RlKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLnByb3BzLm9uRW50ZXIpIChfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzKS5vbkVudGVyLmFwcGx5KF90aGlzJHByb3BzLCBbbm9kZV0uY29uY2F0KGFyZ3MpKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlRW50ZXJpbmcgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIF90aGlzJHByb3BzMjtcblxuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLnByb3BzLm9uRW50ZXJpbmcpIChfdGhpcyRwcm9wczIgPSBfdGhpcy5wcm9wcykub25FbnRlcmluZy5hcHBseShfdGhpcyRwcm9wczIsIFtub2RlXS5jb25jYXQoYXJncykpOyAvLyBGSVhNRTogVGhpcyBzaG91bGQgd29yayBldmVuIHdoZW4gYW5pbWF0aW9uIGlzIGRpc2FibGVkLlxuXG4gICAgICBhZGRFdmVudExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIF90aGlzLmhhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUV4aXRlZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMzO1xuXG4gICAgICBpZiAobm9kZSkgbm9kZS5zdHlsZS5kaXNwbGF5ID0gJyc7IC8vIFJITCByZW1vdmVzIGl0IHNvbWV0aW1lc1xuXG4gICAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjQgPiAxID8gX2xlbjQgLSAxIDogMCksIF9rZXk0ID0gMTsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0IC0gMV0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMucHJvcHMub25FeGl0ZWQpIChfdGhpcyRwcm9wczMgPSBfdGhpcy5wcm9wcykub25FeGl0ZWQuYXBwbHkoX3RoaXMkcHJvcHMzLCBhcmdzKTsgLy8gRklYTUU6IFRoaXMgc2hvdWxkIHdvcmsgZXZlbiB3aGVuIGFuaW1hdGlvbiBpcyBkaXNhYmxlZC5cblxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih3aW5kb3csICdyZXNpemUnLCBfdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVXaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy51cGRhdGVEaWFsb2dTdHlsZShfdGhpcy5fbW9kYWwuZGlhbG9nKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuZ2V0TW9kYWxNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF90aGlzLnByb3BzLm1hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnByb3BzLm1hbmFnZXI7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFuYWdlcikge1xuICAgICAgICBtYW5hZ2VyID0gbmV3IEJvb3RzdHJhcE1vZGFsTWFuYWdlcigpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFuYWdlcjtcbiAgICB9O1xuXG4gICAgX3RoaXMucmVuZGVyQmFja2Ryb3AgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczQgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICBic1ByZWZpeCA9IF90aGlzJHByb3BzNC5ic1ByZWZpeCxcbiAgICAgICAgICBiYWNrZHJvcENsYXNzTmFtZSA9IF90aGlzJHByb3BzNC5iYWNrZHJvcENsYXNzTmFtZSxcbiAgICAgICAgICBhbmltYXRpb24gPSBfdGhpcyRwcm9wczQuYW5pbWF0aW9uO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhic1ByZWZpeCArIFwiLWJhY2tkcm9wXCIsIGJhY2tkcm9wQ2xhc3NOYW1lLCAhYW5pbWF0aW9uICYmICdzaG93JylcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1vZGFsLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAvLyBDbGVhbiB1cCB0aGUgbGlzdGVuZXIgaWYgd2UgbmVlZCB0by5cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcbiAgfTtcblxuICBfcHJvdG8udXBkYXRlRGlhbG9nU3R5bGUgPSBmdW5jdGlvbiB1cGRhdGVEaWFsb2dTdHlsZShub2RlKSB7XG4gICAgaWYgKCFjYW5Vc2VET00pIHJldHVybjtcbiAgICB2YXIgY29udGFpbmVySXNPdmVyZmxvd2luZyA9IHRoaXMuZ2V0TW9kYWxNYW5hZ2VyKCkuaXNDb250YWluZXJPdmVyZmxvd2luZyh0aGlzLl9tb2RhbCk7XG4gICAgdmFyIG1vZGFsSXNPdmVyZmxvd2luZyA9IG5vZGUuc2Nyb2xsSGVpZ2h0ID4gb3duZXJEb2N1bWVudChub2RlKS5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiBjb250YWluZXJJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyBnZXRTY3JvbGxiYXJTaXplKCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAhY29udGFpbmVySXNPdmVyZmxvd2luZyAmJiBtb2RhbElzT3ZlcmZsb3dpbmcgPyBnZXRTY3JvbGxiYXJTaXplKCkgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyRwcm9wczUgPSB0aGlzLnByb3BzLFxuICAgICAgICBic1ByZWZpeCA9IF90aGlzJHByb3BzNS5ic1ByZWZpeCxcbiAgICAgICAgY2xhc3NOYW1lID0gX3RoaXMkcHJvcHM1LmNsYXNzTmFtZSxcbiAgICAgICAgc3R5bGUgPSBfdGhpcyRwcm9wczUuc3R5bGUsXG4gICAgICAgIGRpYWxvZ0NsYXNzTmFtZSA9IF90aGlzJHByb3BzNS5kaWFsb2dDbGFzc05hbWUsXG4gICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHM1LmNoaWxkcmVuLFxuICAgICAgICBEaWFsb2cgPSBfdGhpcyRwcm9wczUuZGlhbG9nQXMsXG4gICAgICAgIHNob3cgPSBfdGhpcyRwcm9wczUuc2hvdyxcbiAgICAgICAgYW5pbWF0aW9uID0gX3RoaXMkcHJvcHM1LmFuaW1hdGlvbixcbiAgICAgICAgYmFja2Ryb3AgPSBfdGhpcyRwcm9wczUuYmFja2Ryb3AsXG4gICAgICAgIGtleWJvYXJkID0gX3RoaXMkcHJvcHM1LmtleWJvYXJkLFxuICAgICAgICBvbkVzY2FwZUtleURvd24gPSBfdGhpcyRwcm9wczUub25Fc2NhcGVLZXlEb3duLFxuICAgICAgICBvblNob3cgPSBfdGhpcyRwcm9wczUub25TaG93LFxuICAgICAgICBvbkhpZGUgPSBfdGhpcyRwcm9wczUub25IaWRlLFxuICAgICAgICBjb250YWluZXIgPSBfdGhpcyRwcm9wczUuY29udGFpbmVyLFxuICAgICAgICBhdXRvRm9jdXMgPSBfdGhpcyRwcm9wczUuYXV0b0ZvY3VzLFxuICAgICAgICBlbmZvcmNlRm9jdXMgPSBfdGhpcyRwcm9wczUuZW5mb3JjZUZvY3VzLFxuICAgICAgICByZXN0b3JlRm9jdXMgPSBfdGhpcyRwcm9wczUucmVzdG9yZUZvY3VzLFxuICAgICAgICByZXN0b3JlRm9jdXNPcHRpb25zID0gX3RoaXMkcHJvcHM1LnJlc3RvcmVGb2N1c09wdGlvbnMsXG4gICAgICAgIG9uRW50ZXJlZCA9IF90aGlzJHByb3BzNS5vbkVudGVyZWQsXG4gICAgICAgIG9uRXhpdCA9IF90aGlzJHByb3BzNS5vbkV4aXQsXG4gICAgICAgIG9uRXhpdGluZyA9IF90aGlzJHByb3BzNS5vbkV4aXRpbmcsXG4gICAgICAgIF8gPSBfdGhpcyRwcm9wczUub25FeGl0ZWQsXG4gICAgICAgIF8xID0gX3RoaXMkcHJvcHM1Lm9uRW50ZXJpbmcsXG4gICAgICAgIF82ID0gX3RoaXMkcHJvcHM1Lm9uRW50ZXIsXG4gICAgICAgIF80ID0gX3RoaXMkcHJvcHM1Lm9uRW50ZXJpbmcsXG4gICAgICAgIF8yID0gX3RoaXMkcHJvcHM1LmJhY2tkcm9wQ2xhc3NOYW1lLFxuICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF90aGlzJHByb3BzNSwgW1wiYnNQcmVmaXhcIiwgXCJjbGFzc05hbWVcIiwgXCJzdHlsZVwiLCBcImRpYWxvZ0NsYXNzTmFtZVwiLCBcImNoaWxkcmVuXCIsIFwiZGlhbG9nQXNcIiwgXCJzaG93XCIsIFwiYW5pbWF0aW9uXCIsIFwiYmFja2Ryb3BcIiwgXCJrZXlib2FyZFwiLCBcIm9uRXNjYXBlS2V5RG93blwiLCBcIm9uU2hvd1wiLCBcIm9uSGlkZVwiLCBcImNvbnRhaW5lclwiLCBcImF1dG9Gb2N1c1wiLCBcImVuZm9yY2VGb2N1c1wiLCBcInJlc3RvcmVGb2N1c1wiLCBcInJlc3RvcmVGb2N1c09wdGlvbnNcIiwgXCJvbkVudGVyZWRcIiwgXCJvbkV4aXRcIiwgXCJvbkV4aXRpbmdcIiwgXCJvbkV4aXRlZFwiLCBcIm9uRW50ZXJpbmdcIiwgXCJvbkVudGVyXCIsIFwib25FbnRlcmluZ1wiLCBcImJhY2tkcm9wQ2xhc3NOYW1lXCJdKTtcblxuICAgIHZhciBjbGlja0hhbmRsZXIgPSBiYWNrZHJvcCA9PT0gdHJ1ZSA/IHRoaXMuaGFuZGxlQ2xpY2sgOiBudWxsO1xuXG4gICAgdmFyIGJhc2VNb2RhbFN0eWxlID0gX2V4dGVuZHMoe30sIHN0eWxlLCB7fSwgdGhpcy5zdGF0ZS5zdHlsZSk7IC8vIFNldHMgYGRpc3BsYXlgIGFsd2F5cyBibG9jayB3aGVuIGBhbmltYXRpb25gIGlzIGZhbHNlXG5cblxuICAgIGlmICghYW5pbWF0aW9uKSBiYXNlTW9kYWxTdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbENvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIHZhbHVlOiB0aGlzLm1vZGFsQ29udGV4dFxuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmFzZU1vZGFsLCB7XG4gICAgICBzaG93OiBzaG93LFxuICAgICAgYmFja2Ryb3A6IGJhY2tkcm9wLFxuICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICBrZXlib2FyZDoga2V5Ym9hcmQsXG4gICAgICBhdXRvRm9jdXM6IGF1dG9Gb2N1cyxcbiAgICAgIGVuZm9yY2VGb2N1czogZW5mb3JjZUZvY3VzLFxuICAgICAgcmVzdG9yZUZvY3VzOiByZXN0b3JlRm9jdXMsXG4gICAgICByZXN0b3JlRm9jdXNPcHRpb25zOiByZXN0b3JlRm9jdXNPcHRpb25zLFxuICAgICAgb25Fc2NhcGVLZXlEb3duOiBvbkVzY2FwZUtleURvd24sXG4gICAgICBvblNob3c6IG9uU2hvdyxcbiAgICAgIG9uSGlkZTogb25IaWRlLFxuICAgICAgb25FbnRlcmVkOiBvbkVudGVyZWQsXG4gICAgICBvbkV4aXQ6IG9uRXhpdCxcbiAgICAgIG9uRXhpdGluZzogb25FeGl0aW5nLFxuICAgICAgbWFuYWdlcjogdGhpcy5nZXRNb2RhbE1hbmFnZXIoKSxcbiAgICAgIHJlZjogdGhpcy5zZXRNb2RhbFJlZixcbiAgICAgIHN0eWxlOiBiYXNlTW9kYWxTdHlsZSxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjbGFzc05hbWUsIGJzUHJlZml4KSxcbiAgICAgIGNvbnRhaW5lckNsYXNzTmFtZTogYnNQcmVmaXggKyBcIi1vcGVuXCIsXG4gICAgICB0cmFuc2l0aW9uOiBhbmltYXRpb24gPyBEaWFsb2dUcmFuc2l0aW9uIDogdW5kZWZpbmVkLFxuICAgICAgYmFja2Ryb3BUcmFuc2l0aW9uOiBhbmltYXRpb24gPyBCYWNrZHJvcFRyYW5zaXRpb24gOiB1bmRlZmluZWQsXG4gICAgICByZW5kZXJCYWNrZHJvcDogdGhpcy5yZW5kZXJCYWNrZHJvcCxcbiAgICAgIG9uQ2xpY2s6IGNsaWNrSGFuZGxlcixcbiAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVNb3VzZVVwLFxuICAgICAgb25FbnRlcjogdGhpcy5oYW5kbGVFbnRlcixcbiAgICAgIG9uRW50ZXJpbmc6IHRoaXMuaGFuZGxlRW50ZXJpbmcsXG4gICAgICBvbkV4aXRlZDogdGhpcy5oYW5kbGVFeGl0ZWRcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KERpYWxvZywgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVEaWFsb2dNb3VzZURvd24sXG4gICAgICBjbGFzc05hbWU6IGRpYWxvZ0NsYXNzTmFtZVxuICAgIH0pLCBjaGlsZHJlbikpKTtcbiAgfTtcblxuICByZXR1cm4gTW9kYWw7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbk1vZGFsLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbnZhciBEZWNvcmF0ZWRNb2RhbCA9IGNyZWF0ZUJvb3RzdHJhcENvbXBvbmVudChNb2RhbCwgJ21vZGFsJyk7XG5EZWNvcmF0ZWRNb2RhbC5Cb2R5ID0gQm9keTtcbkRlY29yYXRlZE1vZGFsLkhlYWRlciA9IEhlYWRlcjtcbkRlY29yYXRlZE1vZGFsLlRpdGxlID0gVGl0bGU7XG5EZWNvcmF0ZWRNb2RhbC5Gb290ZXIgPSBGb290ZXI7XG5EZWNvcmF0ZWRNb2RhbC5EaWFsb2cgPSBNb2RhbERpYWxvZztcbkRlY29yYXRlZE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDA7XG5EZWNvcmF0ZWRNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwO1xuZXhwb3J0IGRlZmF1bHQgRGVjb3JhdGVkTW9kYWw7IiwiaW1wb3J0IGNyZWF0ZVdpdGhCc1ByZWZpeCBmcm9tICcuL2NyZWF0ZVdpdGhCc1ByZWZpeCc7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVXaXRoQnNQcmVmaXgoJ21vZGFsLWJvZHknKTsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIE1vZGFsQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICBvbkhpZGU6IGZ1bmN0aW9uIG9uSGlkZSgpIHt9XG59KTtcbmV4cG9ydCBkZWZhdWx0IE1vZGFsQ29udGV4dDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbnZhciBNb2RhbERpYWxvZyA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBjZW50ZXJlZCA9IF9yZWYuY2VudGVyZWQsXG4gICAgICBzaXplID0gX3JlZi5zaXplLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgc2Nyb2xsYWJsZSA9IF9yZWYuc2Nyb2xsYWJsZSxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYnNQcmVmaXhcIiwgXCJjbGFzc05hbWVcIiwgXCJjZW50ZXJlZFwiLCBcInNpemVcIiwgXCJjaGlsZHJlblwiLCBcInNjcm9sbGFibGVcIl0pO1xuXG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnbW9kYWwnKTtcbiAgdmFyIGRpYWxvZ0NsYXNzID0gYnNQcmVmaXggKyBcIi1kaWFsb2dcIjtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgcmVmOiByZWYsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGRpYWxvZ0NsYXNzLCBjbGFzc05hbWUsIHNpemUgJiYgYnNQcmVmaXggKyBcIi1cIiArIHNpemUsIGNlbnRlcmVkICYmIGRpYWxvZ0NsYXNzICsgXCItY2VudGVyZWRcIiwgc2Nyb2xsYWJsZSAmJiBkaWFsb2dDbGFzcyArIFwiLXNjcm9sbGFibGVcIilcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogYnNQcmVmaXggKyBcIi1jb250ZW50XCJcbiAgfSwgY2hpbGRyZW4pKTtcbn0pO1xuTW9kYWxEaWFsb2cuZGlzcGxheU5hbWUgPSAnTW9kYWxEaWFsb2cnO1xuZXhwb3J0IGRlZmF1bHQgTW9kYWxEaWFsb2c7IiwiaW1wb3J0IGNyZWF0ZVdpdGhCc1ByZWZpeCBmcm9tICcuL2NyZWF0ZVdpdGhCc1ByZWZpeCc7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVXaXRoQnNQcmVmaXgoJ21vZGFsLWZvb3RlcicpOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IENsb3NlQnV0dG9uIGZyb20gJy4vQ2xvc2VCdXR0b24nO1xuaW1wb3J0IE1vZGFsQ29udGV4dCBmcm9tICcuL01vZGFsQ29udGV4dCc7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBjbG9zZUxhYmVsOiAnQ2xvc2UnLFxuICBjbG9zZUJ1dHRvbjogZmFsc2Vcbn07XG52YXIgTW9kYWxIZWFkZXIgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsb3NlTGFiZWwgPSBfcmVmLmNsb3NlTGFiZWwsXG4gICAgICBjbG9zZUJ1dHRvbiA9IF9yZWYuY2xvc2VCdXR0b24sXG4gICAgICBvbkhpZGUgPSBfcmVmLm9uSGlkZSxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJic1ByZWZpeFwiLCBcImNsb3NlTGFiZWxcIiwgXCJjbG9zZUJ1dHRvblwiLCBcIm9uSGlkZVwiLCBcImNsYXNzTmFtZVwiLCBcImNoaWxkcmVuXCJdKTtcblxuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ21vZGFsLWhlYWRlcicpO1xuICB2YXIgY29udGV4dCA9IHVzZUNvbnRleHQoTW9kYWxDb250ZXh0KTtcbiAgdmFyIGhhbmRsZUNsaWNrID0gdXNlRXZlbnRDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNvbnRleHQpIGNvbnRleHQub25IaWRlKCk7XG4gICAgaWYgKG9uSGlkZSkgb25IaWRlKCk7XG4gIH0pO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWZcbiAgfSwgcHJvcHMsIHtcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeClcbiAgfSksIGNoaWxkcmVuLCBjbG9zZUJ1dHRvbiAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KENsb3NlQnV0dG9uLCB7XG4gICAgbGFiZWw6IGNsb3NlTGFiZWwsXG4gICAgb25DbGljazogaGFuZGxlQ2xpY2tcbiAgfSkpO1xufSk7XG5Nb2RhbEhlYWRlci5kaXNwbGF5TmFtZSA9ICdNb2RhbEhlYWRlcic7XG5Nb2RhbEhlYWRlci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5leHBvcnQgZGVmYXVsdCBNb2RhbEhlYWRlcjsiLCJpbXBvcnQgY3JlYXRlV2l0aEJzUHJlZml4IGZyb20gJy4vY3JlYXRlV2l0aEJzUHJlZml4JztcbmltcG9ydCBkaXZXaXRoQ2xhc3NOYW1lIGZyb20gJy4vZGl2V2l0aENsYXNzTmFtZSc7XG52YXIgRGl2U3R5bGVkQXNINCA9IGRpdldpdGhDbGFzc05hbWUoJ2g0Jyk7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVXaXRoQnNQcmVmaXgoJ21vZGFsLXRpdGxlJywge1xuICBDb21wb25lbnQ6IERpdlN0eWxlZEFzSDRcbn0pOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgQmFzZU92ZXJsYXkgZnJvbSAncmVhY3Qtb3ZlcmxheXMvT3ZlcmxheSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL0ZhZGUnO1xudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgdHJhbnNpdGlvbjogRmFkZSxcbiAgcm9vdENsb3NlOiBmYWxzZSxcbiAgc2hvdzogZmFsc2UsXG4gIHBsYWNlbWVudDogJ3RvcCdcbn07XG5cbmZ1bmN0aW9uIHdyYXBSZWZzKHByb3BzLCBhcnJvd1Byb3BzKSB7XG4gIHZhciByZWYgPSBwcm9wcy5yZWY7XG4gIHZhciBhUmVmID0gYXJyb3dQcm9wcy5yZWY7XG5cbiAgcHJvcHMucmVmID0gcmVmLl9fd3JhcHBlZCB8fCAocmVmLl9fd3JhcHBlZCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIHJlZihmaW5kRE9NTm9kZShyKSk7XG4gIH0pO1xuXG4gIGFycm93UHJvcHMucmVmID0gYVJlZi5fX3dyYXBwZWQgfHwgKGFSZWYuX193cmFwcGVkID0gZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gYVJlZihmaW5kRE9NTm9kZShyKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBPdmVybGF5KF9yZWYpIHtcbiAgdmFyIG92ZXJsYXkgPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgdHJhbnNpdGlvbiA9IF9yZWYudHJhbnNpdGlvbixcbiAgICAgIG91dGVyUHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJjaGlsZHJlblwiLCBcInRyYW5zaXRpb25cIl0pO1xuXG4gIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uID09PSB0cnVlID8gRmFkZSA6IHRyYW5zaXRpb24gfHwgbnVsbDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmFzZU92ZXJsYXksIF9leHRlbmRzKHt9LCBvdXRlclByb3BzLCB7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvblxuICB9KSwgZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIG92ZXJsYXlQcm9wcyA9IF9yZWYyLnByb3BzLFxuICAgICAgICBhcnJvd1Byb3BzID0gX3JlZjIuYXJyb3dQcm9wcyxcbiAgICAgICAgc2hvdyA9IF9yZWYyLnNob3csXG4gICAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjIsIFtcInByb3BzXCIsIFwiYXJyb3dQcm9wc1wiLCBcInNob3dcIl0pO1xuXG4gICAgd3JhcFJlZnMob3ZlcmxheVByb3BzLCBhcnJvd1Byb3BzKTtcbiAgICBpZiAodHlwZW9mIG92ZXJsYXkgPT09ICdmdW5jdGlvbicpIHJldHVybiBvdmVybGF5KF9leHRlbmRzKHt9LCBwcm9wcywge30sIG92ZXJsYXlQcm9wcywge1xuICAgICAgc2hvdzogc2hvdyxcbiAgICAgIGFycm93UHJvcHM6IGFycm93UHJvcHNcbiAgICB9KSk7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChvdmVybGF5LCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHt9LCBvdmVybGF5UHJvcHMsIHtcbiAgICAgIGFycm93UHJvcHM6IGFycm93UHJvcHMsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMob3ZlcmxheS5wcm9wcy5jbGFzc05hbWUsICF0cmFuc2l0aW9uICYmIHNob3cgJiYgJ3Nob3cnKSxcbiAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgb3ZlcmxheS5wcm9wcy5zdHlsZSwge30sIG92ZXJsYXlQcm9wcy5zdHlsZSlcbiAgICB9KSk7XG4gIH0pO1xufVxuXG5PdmVybGF5LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbmV4cG9ydCBkZWZhdWx0IE92ZXJsYXk7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZVwiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gJ2RvbS1oZWxwZXJzL2NvbnRhaW5zJztcbmltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlVGltZW91dCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IE92ZXJsYXkgZnJvbSAnLi9PdmVybGF5JztcblxudmFyIFJlZkhvbGRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSZWZIb2xkZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJlZkhvbGRlcigpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUmVmSG9sZGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9O1xuXG4gIHJldHVybiBSZWZIb2xkZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURlbGF5KGRlbGF5KSB7XG4gIHJldHVybiBkZWxheSAmJiB0eXBlb2YgZGVsYXkgPT09ICdvYmplY3QnID8gZGVsYXkgOiB7XG4gICAgc2hvdzogZGVsYXksXG4gICAgaGlkZTogZGVsYXlcbiAgfTtcbn0gLy8gU2ltcGxlIGltcGxlbWVudGF0aW9uIG9mIG1vdXNlRW50ZXIgYW5kIG1vdXNlTGVhdmUuXG4vLyBSZWFjdCdzIGJ1aWx0IHZlcnNpb24gaXMgYnJva2VuOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzQyNTFcbi8vIGZvciBjYXNlcyB3aGVuIHRoZSB0cmlnZ2VyIGlzIGRpc2FibGVkIGFuZCBtb3VzZU91dC9PdmVyIGNhbiBjYXVzZSBmbGlja2VyXG4vLyBtb3ZpbmcgZnJvbSBvbmUgY2hpbGQgZWxlbWVudCB0byBhbm90aGVyLlxuXG5cbmZ1bmN0aW9uIGhhbmRsZU1vdXNlT3Zlck91dChoYW5kbGVyLCBlLCByZWxhdGVkTmF0aXZlKSB7XG4gIHZhciB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gIHZhciByZWxhdGVkID0gZS5yZWxhdGVkVGFyZ2V0IHx8IGUubmF0aXZlRXZlbnRbcmVsYXRlZE5hdGl2ZV07XG5cbiAgaWYgKCghcmVsYXRlZCB8fCByZWxhdGVkICE9PSB0YXJnZXQpICYmICFjb250YWlucyh0YXJnZXQsIHJlbGF0ZWQpKSB7XG4gICAgaGFuZGxlcihlKTtcbiAgfVxufVxuXG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBkZWZhdWx0U2hvdzogZmFsc2UsXG4gIHRyaWdnZXI6IFsnaG92ZXInLCAnZm9jdXMnXVxufTtcblxuZnVuY3Rpb24gT3ZlcmxheVRyaWdnZXIoX3JlZikge1xuICB2YXIgdHJpZ2dlciA9IF9yZWYudHJpZ2dlcixcbiAgICAgIG92ZXJsYXkgPSBfcmVmLm92ZXJsYXksXG4gICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICBfcmVmJHBvcHBlckNvbmZpZyA9IF9yZWYucG9wcGVyQ29uZmlnLFxuICAgICAgcG9wcGVyQ29uZmlnID0gX3JlZiRwb3BwZXJDb25maWcgPT09IHZvaWQgMCA/IHt9IDogX3JlZiRwb3BwZXJDb25maWcsXG4gICAgICBkZWZhdWx0U2hvdyA9IF9yZWYuZGVmYXVsdFNob3csXG4gICAgICBwcm9wc0RlbGF5ID0gX3JlZi5kZWxheSxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1widHJpZ2dlclwiLCBcIm92ZXJsYXlcIiwgXCJjaGlsZHJlblwiLCBcInBvcHBlckNvbmZpZ1wiLCBcImRlZmF1bHRTaG93XCIsIFwiZGVsYXlcIl0pO1xuXG4gIHZhciB0cmlnZ2VyTm9kZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgdmFyIHRpbWVvdXQgPSB1c2VUaW1lb3V0KCk7XG4gIHZhciBob3ZlclN0YXRlUmVmID0gdXNlUmVmKCk7XG5cbiAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKCEhZGVmYXVsdFNob3cpLFxuICAgICAgc2hvdyA9IF91c2VTdGF0ZVswXSxcbiAgICAgIHNldFNob3cgPSBfdXNlU3RhdGVbMV07XG5cbiAgdmFyIGRlbGF5ID0gbm9ybWFsaXplRGVsYXkocHJvcHNEZWxheSk7XG4gIHZhciBjaGlsZCA9IFJlYWN0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICB2YXIgX2NoaWxkJHByb3BzID0gY2hpbGQucHJvcHMsXG4gICAgICBvbkZvY3VzID0gX2NoaWxkJHByb3BzLm9uRm9jdXMsXG4gICAgICBvbkJsdXIgPSBfY2hpbGQkcHJvcHMub25CbHVyLFxuICAgICAgb25DbGljayA9IF9jaGlsZCRwcm9wcy5vbkNsaWNrO1xuICB2YXIgZ2V0VGFyZ2V0ID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZSh0cmlnZ2VyTm9kZVJlZi5jdXJyZW50KTtcbiAgfSwgW10pO1xuICB2YXIgaGFuZGxlU2hvdyA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICB0aW1lb3V0LmNsZWFyKCk7XG4gICAgaG92ZXJTdGF0ZVJlZi5jdXJyZW50ID0gJ3Nob3cnO1xuXG4gICAgaWYgKCFkZWxheS5zaG93KSB7XG4gICAgICBzZXRTaG93KHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRpbWVvdXQuc2V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChob3ZlclN0YXRlUmVmLmN1cnJlbnQgPT09ICdzaG93Jykgc2V0U2hvdyh0cnVlKTtcbiAgICB9LCBkZWxheS5zaG93KTtcbiAgfSwgW2RlbGF5LnNob3csIHRpbWVvdXRdKTtcbiAgdmFyIGhhbmRsZUhpZGUgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgdGltZW91dC5jbGVhcigpO1xuICAgIGhvdmVyU3RhdGVSZWYuY3VycmVudCA9ICdoaWRlJztcblxuICAgIGlmICghZGVsYXkuaGlkZSkge1xuICAgICAgc2V0U2hvdyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGltZW91dC5zZXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGhvdmVyU3RhdGVSZWYuY3VycmVudCA9PT0gJ2hpZGUnKSBzZXRTaG93KGZhbHNlKTtcbiAgICB9LCBkZWxheS5oaWRlKTtcbiAgfSwgW2RlbGF5LmhpZGUsIHRpbWVvdXRdKTtcbiAgdmFyIGhhbmRsZUZvY3VzID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKGUpIHtcbiAgICBoYW5kbGVTaG93KGUpO1xuICAgIGlmIChvbkZvY3VzKSBvbkZvY3VzKGUpO1xuICB9LCBbaGFuZGxlU2hvdywgb25Gb2N1c10pO1xuICB2YXIgaGFuZGxlQmx1ciA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgaGFuZGxlSGlkZShlKTtcbiAgICBpZiAob25CbHVyKSBvbkJsdXIoZSk7XG4gIH0sIFtoYW5kbGVIaWRlLCBvbkJsdXJdKTtcbiAgdmFyIGhhbmRsZUNsaWNrID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKGUpIHtcbiAgICBzZXRTaG93KGZ1bmN0aW9uIChwcmV2U2hvdykge1xuICAgICAgcmV0dXJuICFwcmV2U2hvdztcbiAgICB9KTtcbiAgICBpZiAob25DbGljaykgb25DbGljayhlKTtcbiAgfSwgW29uQ2xpY2tdKTtcbiAgdmFyIGhhbmRsZU1vdXNlT3ZlciA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgaGFuZGxlTW91c2VPdmVyT3V0KGhhbmRsZVNob3csIGUsICdmcm9tRWxlbWVudCcpO1xuICB9LCBbaGFuZGxlU2hvd10pO1xuICB2YXIgaGFuZGxlTW91c2VPdXQgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAoZSkge1xuICAgIGhhbmRsZU1vdXNlT3Zlck91dChoYW5kbGVIaWRlLCBlLCAndG9FbGVtZW50Jyk7XG4gIH0sIFtoYW5kbGVIaWRlXSk7IC8vIFdlIGFkZCBhcmlhLWRlc2NyaWJlZGJ5IGluIHRoZSBjYXNlIHdoZXJlIHRoZSBvdmVybGF5IGlzIGEgcm9sZT1cInRvb2x0aXBcIlxuICAvLyBmb3Igb3RoZXIgY2FzZXMgZGVzY3JpYmVkYnkgaXNuJ3QgYXBwcm9wcmlhdGUgKGUuZy4gYSBwb3BvdmVyIHdpdGggaW5wdXRzKSBzbyB3ZSBkb24ndCBhZGQgaXQuXG5cbiAgdmFyIGFyaWFNb2RpZmllciA9IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIG9yZGVyOiA5MDAsXG4gICAgZm46IGZ1bmN0aW9uIGZuKGRhdGEpIHtcbiAgICAgIHZhciBwb3BwZXIgPSBkYXRhLmluc3RhbmNlLnBvcHBlcjtcbiAgICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoKTtcbiAgICAgIGlmICghc2hvdyB8fCAhdGFyZ2V0KSByZXR1cm4gZGF0YTtcbiAgICAgIHZhciByb2xlID0gcG9wcGVyLmdldEF0dHJpYnV0ZSgncm9sZScpIHx8ICcnO1xuXG4gICAgICBpZiAocG9wcGVyLmlkICYmIHJvbGUudG9Mb3dlckNhc2UoKSA9PT0gJ3Rvb2x0aXAnKSB7XG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCBwb3BwZXIuaWQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH07XG4gIHZhciB0cmlnZ2VycyA9IHRyaWdnZXIgPT0gbnVsbCA/IFtdIDogW10uY29uY2F0KHRyaWdnZXIpO1xuICB2YXIgdHJpZ2dlclByb3BzID0ge307XG5cbiAgaWYgKHRyaWdnZXJzLmluZGV4T2YoJ2NsaWNrJykgIT09IC0xKSB7XG4gICAgdHJpZ2dlclByb3BzLm9uQ2xpY2sgPSBoYW5kbGVDbGljaztcbiAgfVxuXG4gIGlmICh0cmlnZ2Vycy5pbmRleE9mKCdmb2N1cycpICE9PSAtMSkge1xuICAgIHRyaWdnZXJQcm9wcy5vbkZvY3VzID0gaGFuZGxlRm9jdXM7XG4gICAgdHJpZ2dlclByb3BzLm9uQmx1ciA9IGhhbmRsZUJsdXI7XG4gIH1cblxuICBpZiAodHJpZ2dlcnMuaW5kZXhPZignaG92ZXInKSAhPT0gLTEpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKHRyaWdnZXJzLmxlbmd0aCA+IDEsICdbcmVhY3QtYm9vdHN0cmFwXSBTcGVjaWZ5aW5nIG9ubHkgdGhlIGBcImhvdmVyXCJgIHRyaWdnZXIgbGltaXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBvdmVybGF5IHRvIGp1c3QgbW91c2UgdXNlcnMuIENvbnNpZGVyIGFsc28gaW5jbHVkaW5nIHRoZSBgXCJmb2N1c1wiYCB0cmlnZ2VyIHNvIHRoYXQgdG91Y2ggYW5kIGtleWJvYXJkIG9ubHkgdXNlcnMgY2FuIHNlZSB0aGUgb3ZlcmxheSBhcyB3ZWxsLicpIDogdm9pZCAwO1xuICAgIHRyaWdnZXJQcm9wcy5vbk1vdXNlT3ZlciA9IGhhbmRsZU1vdXNlT3ZlcjtcbiAgICB0cmlnZ2VyUHJvcHMub25Nb3VzZU91dCA9IGhhbmRsZU1vdXNlT3V0O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVmSG9sZGVyLCB7XG4gICAgcmVmOiB0cmlnZ2VyTm9kZVJlZlxuICB9LCBjbG9uZUVsZW1lbnQoY2hpbGQsIHRyaWdnZXJQcm9wcykpLCBSZWFjdC5jcmVhdGVFbGVtZW50KE92ZXJsYXksIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICAgIHBvcHBlckNvbmZpZzogX2V4dGVuZHMoe30sIHBvcHBlckNvbmZpZywge1xuICAgICAgbW9kaWZpZXJzOiBfZXh0ZW5kcyh7fSwgcG9wcGVyQ29uZmlnLm1vZGlmaWVycywge1xuICAgICAgICBhcmlhTW9kaWZpZXI6IGFyaWFNb2RpZmllclxuICAgICAgfSlcbiAgICB9KSxcbiAgICBzaG93OiBzaG93LFxuICAgIG9uSGlkZTogaGFuZGxlSGlkZSxcbiAgICB0YXJnZXQ6IGdldFRhcmdldFxuICB9KSwgb3ZlcmxheSkpO1xufVxuXG5PdmVybGF5VHJpZ2dlci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5leHBvcnQgZGVmYXVsdCBPdmVybGF5VHJpZ2dlcjsiLCJpbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2VcIjtcbmltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTYWZlQW5jaG9yIGZyb20gJy4vU2FmZUFuY2hvcic7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBhY3RpdmU6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIGFjdGl2ZUxhYmVsOiAnKGN1cnJlbnQpJ1xufTtcbnZhciBQYWdlSXRlbSA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYWN0aXZlID0gX3JlZi5hY3RpdmUsXG4gICAgICBkaXNhYmxlZCA9IF9yZWYuZGlzYWJsZWQsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIHN0eWxlID0gX3JlZi5zdHlsZSxcbiAgICAgIGFjdGl2ZUxhYmVsID0gX3JlZi5hY3RpdmVMYWJlbCxcbiAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYWN0aXZlXCIsIFwiZGlzYWJsZWRcIiwgXCJjbGFzc05hbWVcIiwgXCJzdHlsZVwiLCBcImFjdGl2ZUxhYmVsXCIsIFwiY2hpbGRyZW5cIl0pO1xuXG4gIHZhciBDb21wb25lbnQgPSBhY3RpdmUgfHwgZGlzYWJsZWQgPyAnc3BhbicgOiBTYWZlQW5jaG9yO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtcbiAgICByZWY6IHJlZixcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgJ3BhZ2UtaXRlbScsIHtcbiAgICAgIGFjdGl2ZTogYWN0aXZlLFxuICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gICAgfSlcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IFwicGFnZS1saW5rXCIsXG4gICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gIH0sIHByb3BzKSwgY2hpbGRyZW4sIGFjdGl2ZSAmJiBhY3RpdmVMYWJlbCAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInNyLW9ubHlcIlxuICB9LCBhY3RpdmVMYWJlbCkpKTtcbn0pO1xuUGFnZUl0ZW0uZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuUGFnZUl0ZW0uZGlzcGxheU5hbWUgPSAnUGFnZUl0ZW0nO1xuZXhwb3J0IGRlZmF1bHQgUGFnZUl0ZW07XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbihuYW1lLCBkZWZhdWx0VmFsdWUsIGxhYmVsKSB7XG4gIHZhciBfY2xhc3MsIF90ZW1wO1xuXG4gIGlmIChsYWJlbCA9PT0gdm9pZCAwKSB7XG4gICAgbGFiZWwgPSBuYW1lO1xuICB9XG5cbiAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgIF9pbmhlcml0c0xvb3NlKF9jbGFzcywgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90byA9IF9jbGFzcy5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF90aGlzJHByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3RoaXMkcHJvcHMsIFtcImNoaWxkcmVuXCJdKTtcblxuICAgICAgZGVsZXRlIHByb3BzLmFjdGl2ZTtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFBhZ2VJdGVtLCBwcm9wcywgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiXG4gICAgICB9LCBjaGlsZHJlbiB8fCBkZWZhdWx0VmFsdWUpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJzci1vbmx5XCJcbiAgICAgIH0sIGxhYmVsKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBfY2xhc3M7XG4gIH0oUmVhY3QuQ29tcG9uZW50KSwgX2NsYXNzLmRpc3BsYXlOYW1lID0gbmFtZSwgX3RlbXA7XG59XG5cbmV4cG9ydCB2YXIgRmlyc3QgPSBjcmVhdGVCdXR0b24oJ0ZpcnN0JywgJ8KrJyk7XG5leHBvcnQgdmFyIFByZXYgPSBjcmVhdGVCdXR0b24oJ1ByZXYnLCAn4oC5JywgJ1ByZXZpb3VzJyk7XG5leHBvcnQgdmFyIEVsbGlwc2lzID0gY3JlYXRlQnV0dG9uKCdFbGxpcHNpcycsICfigKYnLCAnTW9yZScpO1xuZXhwb3J0IHZhciBOZXh0ID0gY3JlYXRlQnV0dG9uKCdOZXh0JywgJ+KAuicpO1xuZXhwb3J0IHZhciBMYXN0ID0gY3JlYXRlQnV0dG9uKCdMYXN0JywgJ8K7Jyk7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgUGFnZUl0ZW0sIHsgRmlyc3QsIFByZXYsIEVsbGlwc2lzLCBOZXh0LCBMYXN0IH0gZnJvbSAnLi9QYWdlSXRlbSc7XG5cbi8qKlxuICogQHByb3BlcnR5IHtQYWdlSXRlbX0gSXRlbVxuICogQHByb3BlcnR5IHtQYWdlSXRlbX0gRmlyc3RcbiAqIEBwcm9wZXJ0eSB7UGFnZUl0ZW19IFByZXZcbiAqIEBwcm9wZXJ0eSB7UGFnZUl0ZW19IEVsbGlwc2lzXG4gKiBAcHJvcGVydHkge1BhZ2VJdGVtfSBOZXh0XG4gKiBAcHJvcGVydHkge1BhZ2VJdGVtfSBMYXN0XG4gKi9cbnZhciBQYWdpbmF0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAoX3JlZiwgcmVmKSB7XG4gIHZhciBic1ByZWZpeCA9IF9yZWYuYnNQcmVmaXgsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgIHNpemUgPSBfcmVmLnNpemUsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiY2xhc3NOYW1lXCIsIFwiY2hpbGRyZW5cIiwgXCJzaXplXCJdKTtcblxuICB2YXIgZGVjb3JhdGVkQnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICdwYWdpbmF0aW9uJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgZGVjb3JhdGVkQnNQcmVmaXgsIHNpemUgJiYgZGVjb3JhdGVkQnNQcmVmaXggKyBcIi1cIiArIHNpemUpXG4gIH0pLCBjaGlsZHJlbik7XG59KTtcblBhZ2luYXRpb24uRmlyc3QgPSBGaXJzdDtcblBhZ2luYXRpb24uUHJldiA9IFByZXY7XG5QYWdpbmF0aW9uLkVsbGlwc2lzID0gRWxsaXBzaXM7XG5QYWdpbmF0aW9uLkl0ZW0gPSBQYWdlSXRlbTtcblBhZ2luYXRpb24uTmV4dCA9IE5leHQ7XG5QYWdpbmF0aW9uLkxhc3QgPSBMYXN0O1xuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvbjsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGlzUmVxdWlyZWRGb3JBMTF5IGZyb20gJ3Byb3AtdHlwZXMtZXh0cmEvbGliL2lzUmVxdWlyZWRGb3JBMTF5JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgUG9wb3ZlclRpdGxlIGZyb20gJy4vUG9wb3ZlclRpdGxlJztcbmltcG9ydCBQb3BvdmVyQ29udGVudCBmcm9tICcuL1BvcG92ZXJDb250ZW50JztcbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIHBsYWNlbWVudDogJ3JpZ2h0J1xufTtcbnZhciBQb3BvdmVyID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAoX3JlZiwgcmVmKSB7XG4gIHZhciBic1ByZWZpeCA9IF9yZWYuYnNQcmVmaXgsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmLnBsYWNlbWVudCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgc3R5bGUgPSBfcmVmLnN0eWxlLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgY29udGVudCA9IF9yZWYuY29udGVudCxcbiAgICAgIGFycm93UHJvcHMgPSBfcmVmLmFycm93UHJvcHMsXG4gICAgICBfID0gX3JlZi5zY2hlZHVsZVVwZGF0ZSxcbiAgICAgIF8xID0gX3JlZi5vdXRPZkJvdW5kYXJpZXMsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwicGxhY2VtZW50XCIsIFwiY2xhc3NOYW1lXCIsIFwic3R5bGVcIiwgXCJjaGlsZHJlblwiLCBcImNvbnRlbnRcIiwgXCJhcnJvd1Byb3BzXCIsIFwic2NoZWR1bGVVcGRhdGVcIiwgXCJvdXRPZkJvdW5kYXJpZXNcIl0pO1xuXG4gIHZhciBkZWNvcmF0ZWRCc1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3BvcG92ZXInKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIHJvbGU6IFwidG9vbHRpcFwiLFxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBcIngtcGxhY2VtZW50XCI6IHBsYWNlbWVudCxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBkZWNvcmF0ZWRCc1ByZWZpeCwgXCJicy1wb3BvdmVyLVwiICsgcGxhY2VtZW50KVxuICB9LCBwcm9wcyksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe1xuICAgIGNsYXNzTmFtZTogXCJhcnJvd1wiXG4gIH0sIGFycm93UHJvcHMpKSwgY29udGVudCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUG9wb3ZlckNvbnRlbnQsIG51bGwsIGNoaWxkcmVuKSA6IGNoaWxkcmVuKTtcbn0pO1xuUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5Qb3BvdmVyLlRpdGxlID0gUG9wb3ZlclRpdGxlO1xuUG9wb3Zlci5Db250ZW50ID0gUG9wb3ZlckNvbnRlbnQ7XG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xudmFyIFBvcG92ZXJDb250ZW50ID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAoX3JlZiwgcmVmKSB7XG4gIHZhciBfcmVmJGFzID0gX3JlZi5hcyxcbiAgICAgIENvbXBvbmVudCA9IF9yZWYkYXMgPT09IHZvaWQgMCA/ICdkaXYnIDogX3JlZiRhcyxcbiAgICAgIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJhc1wiLCBcImJzUHJlZml4XCIsIFwiY2xhc3NOYW1lXCIsIFwiY2hpbGRyZW5cIl0pO1xuXG4gIGJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAncG9wb3Zlci1ib2R5Jyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgpXG4gIH0pLCBjaGlsZHJlbik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IFBvcG92ZXJDb250ZW50OyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xudmFyIFBvcG92ZXJUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgX3JlZiRhcyA9IF9yZWYuYXMsXG4gICAgICBDb21wb25lbnQgPSBfcmVmJGFzID09PSB2b2lkIDAgPyAnZGl2JyA6IF9yZWYkYXMsXG4gICAgICBic1ByZWZpeCA9IF9yZWYuYnNQcmVmaXgsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYXNcIiwgXCJic1ByZWZpeFwiLCBcImNsYXNzTmFtZVwiLCBcImNoaWxkcmVuXCJdKTtcblxuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3BvcG92ZXItaGVhZGVyJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGJzUHJlZml4LCBjbGFzc05hbWUpXG4gIH0pLCBjaGlsZHJlbik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IFBvcG92ZXJUaXRsZTsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QsIHsgY2xvbmVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQm9vdHN0cmFwUHJlZml4IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4vRWxlbWVudENoaWxkcmVuJztcbnZhciBST1VORF9QUkVDSVNJT04gPSAxMDAwO1xuLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IGNoaWxkcmVuLCBpZiBhbnksIGFyZSBpbnN0YW5jZXMgb2YgYDxQcm9ncmVzc0Jhcj5gLlxuICovXG5cbmZ1bmN0aW9uIG9ubHlQcm9ncmVzc0Jhcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgdmFyIGNoaWxkcmVuID0gcHJvcHNbcHJvcE5hbWVdO1xuXG4gIGlmICghY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBlcnJvciA9IG51bGw7XG4gIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR5cGVzIGluIGEgd2F5IHRoYXQgd29ya3Mgd2l0aCBsaWJyYXJpZXMgdGhhdCBwYXRjaCBhbmQgcHJveHlcbiAgICAgKiBjb21wb25lbnRzIGxpa2UgcmVhY3QtaG90LWxvYWRlci5cbiAgICAgKlxuICAgICAqIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ2FlYXJvbi9yZWFjdC1ob3QtbG9hZGVyI2NoZWNraW5nLWVsZW1lbnQtdHlwZXNcbiAgICAgKi9cblxuXG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFByb2dyZXNzQmFyLCBudWxsKTtcbiAgICBpZiAoY2hpbGQudHlwZSA9PT0gZWxlbWVudC50eXBlKSByZXR1cm47XG4gICAgdmFyIGNoaWxkSWRlbnRpZmllciA9IFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSA/IGNoaWxkLnR5cGUuZGlzcGxheU5hbWUgfHwgY2hpbGQudHlwZS5uYW1lIHx8IGNoaWxkLnR5cGUgOiBjaGlsZDtcbiAgICBlcnJvciA9IG5ldyBFcnJvcihcIkNoaWxkcmVuIG9mIFwiICsgY29tcG9uZW50TmFtZSArIFwiIGNhbiBjb250YWluIG9ubHkgUHJvZ3Jlc3NCYXIgXCIgKyAoXCJjb21wb25lbnRzLiBGb3VuZCBcIiArIGNoaWxkSWRlbnRpZmllciArIFwiLlwiKSk7XG4gIH0pO1xuICByZXR1cm4gZXJyb3I7XG59XG5cbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIG1pbjogMCxcbiAgbWF4OiAxMDAsXG4gIGFuaW1hdGVkOiBmYWxzZSxcbiAgaXNDaGlsZDogZmFsc2UsXG4gIHNyT25seTogZmFsc2UsXG4gIHN0cmlwZWQ6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBnZXRQZXJjZW50YWdlKG5vdywgbWluLCBtYXgpIHtcbiAgdmFyIHBlcmNlbnRhZ2UgPSAobm93IC0gbWluKSAvIChtYXggLSBtaW4pICogMTAwO1xuICByZXR1cm4gTWF0aC5yb3VuZChwZXJjZW50YWdlICogUk9VTkRfUFJFQ0lTSU9OKSAvIFJPVU5EX1BSRUNJU0lPTjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUHJvZ3Jlc3NCYXIoX3JlZiwgcmVmKSB7XG4gIHZhciBfY2xhc3NOYW1lcztcblxuICB2YXIgbWluID0gX3JlZi5taW4sXG4gICAgICBub3cgPSBfcmVmLm5vdyxcbiAgICAgIG1heCA9IF9yZWYubWF4LFxuICAgICAgbGFiZWwgPSBfcmVmLmxhYmVsLFxuICAgICAgc3JPbmx5ID0gX3JlZi5zck9ubHksXG4gICAgICBzdHJpcGVkID0gX3JlZi5zdHJpcGVkLFxuICAgICAgYW5pbWF0ZWQgPSBfcmVmLmFuaW1hdGVkLFxuICAgICAgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBzdHlsZSA9IF9yZWYuc3R5bGUsXG4gICAgICB2YXJpYW50ID0gX3JlZi52YXJpYW50LFxuICAgICAgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJtaW5cIiwgXCJub3dcIiwgXCJtYXhcIiwgXCJsYWJlbFwiLCBcInNyT25seVwiLCBcInN0cmlwZWRcIiwgXCJhbmltYXRlZFwiLCBcImNsYXNzTmFtZVwiLCBcInN0eWxlXCIsIFwidmFyaWFudFwiLCBcImJzUHJlZml4XCJdKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWZcbiAgfSwgcHJvcHMsIHtcbiAgICByb2xlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXggKyBcIi1iYXJcIiwgKF9jbGFzc05hbWVzID0ge30sIF9jbGFzc05hbWVzW1wiYmctXCIgKyB2YXJpYW50XSA9IHZhcmlhbnQsIF9jbGFzc05hbWVzW2JzUHJlZml4ICsgXCItYmFyLWFuaW1hdGVkXCJdID0gYW5pbWF0ZWQsIF9jbGFzc05hbWVzW2JzUHJlZml4ICsgXCItYmFyLXN0cmlwZWRcIl0gPSBhbmltYXRlZCB8fCBzdHJpcGVkLCBfY2xhc3NOYW1lcykpLFxuICAgIHN0eWxlOiBfZXh0ZW5kcyh7XG4gICAgICB3aWR0aDogZ2V0UGVyY2VudGFnZShub3csIG1pbiwgbWF4KSArIFwiJVwiXG4gICAgfSwgc3R5bGUpLFxuICAgIFwiYXJpYS12YWx1ZW5vd1wiOiBub3csXG4gICAgXCJhcmlhLXZhbHVlbWluXCI6IG1pbixcbiAgICBcImFyaWEtdmFsdWVtYXhcIjogbWF4XG4gIH0pLCBzck9ubHkgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInNyLW9ubHlcIlxuICB9LCBsYWJlbCkgOiBsYWJlbCk7XG59XG5cbnZhciBQcm9ncmVzc0JhciA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYyLCByZWYpIHtcbiAgdmFyIGlzQ2hpbGQgPSBfcmVmMi5pc0NoaWxkLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmMiwgW1wiaXNDaGlsZFwiXSk7XG5cbiAgcHJvcHMuYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgocHJvcHMuYnNQcmVmaXgsICdwcm9ncmVzcycpO1xuXG4gIGlmIChpc0NoaWxkKSB7XG4gICAgcmV0dXJuIHJlbmRlclByb2dyZXNzQmFyKHByb3BzLCByZWYpO1xuICB9XG5cbiAgdmFyIG1pbiA9IHByb3BzLm1pbixcbiAgICAgIG5vdyA9IHByb3BzLm5vdyxcbiAgICAgIG1heCA9IHByb3BzLm1heCxcbiAgICAgIGxhYmVsID0gcHJvcHMubGFiZWwsXG4gICAgICBzck9ubHkgPSBwcm9wcy5zck9ubHksXG4gICAgICBzdHJpcGVkID0gcHJvcHMuc3RyaXBlZCxcbiAgICAgIGFuaW1hdGVkID0gcHJvcHMuYW5pbWF0ZWQsXG4gICAgICBic1ByZWZpeCA9IHByb3BzLmJzUHJlZml4LFxuICAgICAgdmFyaWFudCA9IHByb3BzLnZhcmlhbnQsXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgd3JhcHBlclByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UocHJvcHMsIFtcIm1pblwiLCBcIm5vd1wiLCBcIm1heFwiLCBcImxhYmVsXCIsIFwic3JPbmx5XCIsIFwic3RyaXBlZFwiLCBcImFuaW1hdGVkXCIsIFwiYnNQcmVmaXhcIiwgXCJ2YXJpYW50XCIsIFwiY2xhc3NOYW1lXCIsIFwiY2hpbGRyZW5cIl0pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCB3cmFwcGVyUHJvcHMsIHtcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBic1ByZWZpeClcbiAgfSksIGNoaWxkcmVuID8gbWFwKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICBpc0NoaWxkOiB0cnVlXG4gICAgfSk7XG4gIH0pIDogcmVuZGVyUHJvZ3Jlc3NCYXIoe1xuICAgIG1pbjogbWluLFxuICAgIG5vdzogbm93LFxuICAgIG1heDogbWF4LFxuICAgIGxhYmVsOiBsYWJlbCxcbiAgICBzck9ubHk6IHNyT25seSxcbiAgICBzdHJpcGVkOiBzdHJpcGVkLFxuICAgIGFuaW1hdGVkOiBhbmltYXRlZCxcbiAgICBic1ByZWZpeDogYnNQcmVmaXgsXG4gICAgdmFyaWFudDogdmFyaWFudFxuICB9LCByZWYpKTtcbn0pO1xuUHJvZ3Jlc3NCYXIuZGlzcGxheU5hbWUgPSAnUHJvZ3Jlc3NCYXInO1xuUHJvZ3Jlc3NCYXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBhc3BlY3RSYXRpbzogJzFieTEnXG59O1xudmFyIFJlc3BvbnNpdmVFbWJlZCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICBhc3BlY3RSYXRpbyA9IF9yZWYuYXNwZWN0UmF0aW8sXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiY2xhc3NOYW1lXCIsIFwiY2hpbGRyZW5cIiwgXCJhc3BlY3RSYXRpb1wiXSk7XG5cbiAgdmFyIGRlY29yYXRlZEJzUHJlZml4ID0gdXNlQm9vdHN0cmFwUHJlZml4KGJzUHJlZml4LCAnZW1iZWQtcmVzcG9uc2l2ZScpO1xuICB2YXIgY2hpbGQgPSBSZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGRlY29yYXRlZEJzUHJlZml4LCBjbGFzc05hbWUsIGFzcGVjdFJhdGlvICYmIGRlY29yYXRlZEJzUHJlZml4ICsgXCItXCIgKyBhc3BlY3RSYXRpbylcbiAgfSksIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhjaGlsZC5wcm9wcy5jbGFzc05hbWUsIGRlY29yYXRlZEJzUHJlZml4ICsgXCItaXRlbVwiKVxuICB9KSk7XG59KTtcblJlc3BvbnNpdmVFbWJlZC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5leHBvcnQgZGVmYXVsdCBSZXNwb25zaXZlRW1iZWQ7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG52YXIgU3Bpbm5lciA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgdmFyaWFudCA9IF9yZWYudmFyaWFudCxcbiAgICAgIGFuaW1hdGlvbiA9IF9yZWYuYW5pbWF0aW9uLFxuICAgICAgc2l6ZSA9IF9yZWYuc2l6ZSxcbiAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgIF9yZWYkYXMgPSBfcmVmLmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3JlZiRhcyA9PT0gdm9pZCAwID8gJ2RpdicgOiBfcmVmJGFzLFxuICAgICAgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwidmFyaWFudFwiLCBcImFuaW1hdGlvblwiLCBcInNpemVcIiwgXCJjaGlsZHJlblwiLCBcImFzXCIsIFwiY2xhc3NOYW1lXCJdKTtcblxuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3NwaW5uZXInKTtcbiAgdmFyIGJzU3Bpbm5lclByZWZpeCA9IGJzUHJlZml4ICsgXCItXCIgKyBhbmltYXRpb247XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNTcGlubmVyUHJlZml4LCBzaXplICYmIGJzU3Bpbm5lclByZWZpeCArIFwiLVwiICsgc2l6ZSwgdmFyaWFudCAmJiBcInRleHQtXCIgKyB2YXJpYW50KVxuICB9KSwgY2hpbGRyZW4pO1xufSk7XG5TcGlubmVyLmRpc3BsYXlOYW1lID0gJ1NwaW5uZXInO1xuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCBCdXR0b25Hcm91cCBmcm9tICcuL0J1dHRvbkdyb3VwJztcbmltcG9ydCBEcm9wZG93biBmcm9tICcuL0Ryb3Bkb3duJztcbnZhciBwcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBBbiBodG1sIGlkIGF0dHJpYnV0ZSBmb3IgdGhlIFRvZ2dsZSBidXR0b24sIG5lY2Vzc2FyeSBmb3IgYXNzaXN0aXZlIHRlY2hub2xvZ2llcywgc3VjaCBhcyBzY3JlZW4gcmVhZGVycy5cbiAgICogQHR5cGUge3N0cmluZ3xudW1iZXJ9XG4gICAqIEByZXF1aXJlZFxuICAgKi9cbiAgaWQ6IFByb3BUeXBlcy5hbnksXG5cbiAgLyoqXG4gICAqIEFjY2Vzc2libGUgbGFiZWwgZm9yIHRoZSB0b2dnbGU7IHRoZSB2YWx1ZSBvZiBgdGl0bGVgIGlmIG5vdCBzcGVjaWZpZWQuXG4gICAqL1xuICB0b2dnbGVMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogQW4gYGhyZWZgIHBhc3NlZCB0byB0aGUgbm9uLXRvZ2dsZSBCdXR0b24gKi9cbiAgaHJlZjogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogQW4gYW5jaG9yIGB0YXJnZXRgIHBhc3NlZCB0byB0aGUgbm9uLXRvZ2dsZSBCdXR0b24gKi9cbiAgdGFyZ2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBBbiBgb25DbGlja2AgaGFuZGxlciBwYXNzZWQgdG8gdGhlIG5vbi10b2dnbGUgQnV0dG9uICovXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKiBUaGUgY29udGVudCBvZiB0aGUgbm9uLXRvZ2dsZSBCdXR0b24uICAqL1xuICB0aXRsZTogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcblxuICAvKiogQSBgdHlwZWAgcGFzc2VkIHRvIHRoZSBub24tdG9nZ2xlIEJ1dHRvbiAqL1xuICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBEaXNhYmxlcyBib3RoIEJ1dHRvbnMgICovXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKiogQW4gQVJJQSBhY2Nlc3NpYmxlIHJvbGUgYXBwbGllZCB0byB0aGUgTWVudSBjb21wb25lbnQuIFdoZW4gc2V0IHRvICdtZW51JywgVGhlIGRyb3Bkb3duICovXG4gIG1lbnVSb2xlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiAgV2hpY2ggZXZlbnQgd2hlbiBmaXJlZCBvdXRzaWRlIHRoZSBjb21wb25lbnQgd2lsbCBjYXVzZSBpdCB0byBiZSBjbG9zZWQuXG4gICAqXG4gICAqIF9zZWUgW0Ryb3Bkb3duTWVudV0oI21lbnUtcHJvcHMpIGZvciBtb3JlIGRldGFpbHNfXG4gICAqL1xuICByb290Q2xvc2VFdmVudDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogQGlnbm9yZSAqL1xuICBic1ByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogQGlnbm9yZSAqL1xuICB2YXJpYW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBAaWdub3JlICovXG4gIHNpemU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICB0b2dnbGVMYWJlbDogJ1RvZ2dsZSBkcm9wZG93bicsXG4gIHR5cGU6ICdidXR0b24nXG59O1xudmFyIFNwbGl0QnV0dG9uID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAoX3JlZiwgcmVmKSB7XG4gIHZhciBpZCA9IF9yZWYuaWQsXG4gICAgICBic1ByZWZpeCA9IF9yZWYuYnNQcmVmaXgsXG4gICAgICBzaXplID0gX3JlZi5zaXplLFxuICAgICAgdmFyaWFudCA9IF9yZWYudmFyaWFudCxcbiAgICAgIHRpdGxlID0gX3JlZi50aXRsZSxcbiAgICAgIHR5cGUgPSBfcmVmLnR5cGUsXG4gICAgICB0b2dnbGVMYWJlbCA9IF9yZWYudG9nZ2xlTGFiZWwsXG4gICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICBvbkNsaWNrID0gX3JlZi5vbkNsaWNrLFxuICAgICAgaHJlZiA9IF9yZWYuaHJlZixcbiAgICAgIHRhcmdldCA9IF9yZWYudGFyZ2V0LFxuICAgICAgbWVudVJvbGUgPSBfcmVmLm1lbnVSb2xlLFxuICAgICAgcm9vdENsb3NlRXZlbnQgPSBfcmVmLnJvb3RDbG9zZUV2ZW50LFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJpZFwiLCBcImJzUHJlZml4XCIsIFwic2l6ZVwiLCBcInZhcmlhbnRcIiwgXCJ0aXRsZVwiLCBcInR5cGVcIiwgXCJ0b2dnbGVMYWJlbFwiLCBcImNoaWxkcmVuXCIsIFwib25DbGlja1wiLCBcImhyZWZcIiwgXCJ0YXJnZXRcIiwgXCJtZW51Um9sZVwiLCBcInJvb3RDbG9zZUV2ZW50XCJdKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wZG93biwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgYXM6IEJ1dHRvbkdyb3VwXG4gIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xuICAgIHNpemU6IHNpemUsXG4gICAgdmFyaWFudDogdmFyaWFudCxcbiAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXG4gICAgYnNQcmVmaXg6IGJzUHJlZml4LFxuICAgIGhyZWY6IGhyZWYsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgb25DbGljazogb25DbGljayxcbiAgICB0eXBlOiB0eXBlXG4gIH0sIHRpdGxlKSwgUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wZG93bi5Ub2dnbGUsIHtcbiAgICBzcGxpdDogdHJ1ZSxcbiAgICBpZDogaWQsXG4gICAgc2l6ZTogc2l6ZSxcbiAgICB2YXJpYW50OiB2YXJpYW50LFxuICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcbiAgICBjaGlsZEJzUHJlZml4OiBic1ByZWZpeFxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgY2xhc3NOYW1lOiBcInNyLW9ubHlcIlxuICB9LCB0b2dnbGVMYWJlbCkpLCBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bkb3duLk1lbnUsIHtcbiAgICByb2xlOiBtZW51Um9sZSxcbiAgICByb290Q2xvc2VFdmVudDogcm9vdENsb3NlRXZlbnRcbiAgfSwgY2hpbGRyZW4pKTtcbn0pO1xuU3BsaXRCdXR0b24ucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuU3BsaXRCdXR0b24uZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuU3BsaXRCdXR0b24uZGlzcGxheU5hbWUgPSAnU3BsaXRCdXR0b24nO1xuZXhwb3J0IGRlZmF1bHQgU3BsaXRCdXR0b247IiwiaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRhYkNvbnRhaW5lciBmcm9tICcuL1RhYkNvbnRhaW5lcic7XG5pbXBvcnQgVGFiQ29udGVudCBmcm9tICcuL1RhYkNvbnRlbnQnO1xuaW1wb3J0IFRhYlBhbmUgZnJvbSAnLi9UYWJQYW5lJztcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlcXVpcmUtcmVuZGVyLXJldHVybiwgcmVhY3Qvbm8tdW51c2VkLXByb3AtdHlwZXMgKi9cblxudmFyIFRhYiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShUYWIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFRhYigpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gVGFiLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RCb290c3RyYXA6IFRoZSBgVGFiYCBjb21wb25lbnQgaXMgbm90IG1lYW50IHRvIGJlIHJlbmRlcmVkISAnICsgXCJJdCdzIGFuIGFic3RyYWN0IGNvbXBvbmVudCB0aGF0IGlzIG9ubHkgdmFsaWQgYXMgYSBkaXJlY3QgQ2hpbGQgb2YgdGhlIGBUYWJzYCBDb21wb25lbnQuIFwiICsgJ0ZvciBjdXN0b20gdGFicyBjb21wb25lbnRzIHVzZSBUYWJQYW5lIGFuZCBUYWJzQ29udGFpbmVyIGRpcmVjdGx5Jyk7XG4gIH07XG5cbiAgcmV0dXJuIFRhYjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuVGFiLkNvbnRhaW5lciA9IFRhYkNvbnRhaW5lcjtcblRhYi5Db250ZW50ID0gVGFiQ29udGVudDtcblRhYi5QYW5lID0gVGFiUGFuZTtcbmV4cG9ydCBkZWZhdWx0IFRhYjsiLCJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCBUYWJDb250ZXh0IGZyb20gJy4vVGFiQ29udGV4dCc7XG5pbXBvcnQgU2VsZWN0YWJsZUNvbnRleHQgZnJvbSAnLi9TZWxlY3RhYmxlQ29udGV4dCc7XG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlcyAqL1xuXG52YXIgVGFiQ29udGFpbmVyID0gZnVuY3Rpb24gVGFiQ29udGFpbmVyKHByb3BzKSB7XG4gIHZhciBfdXNlVW5jb250cm9sbGVkID0gdXNlVW5jb250cm9sbGVkKHByb3BzLCB7XG4gICAgYWN0aXZlS2V5OiAnb25TZWxlY3QnXG4gIH0pLFxuICAgICAgaWQgPSBfdXNlVW5jb250cm9sbGVkLmlkLFxuICAgICAgZ2VuZXJhdGVDdXN0b21DaGlsZElkID0gX3VzZVVuY29udHJvbGxlZC5nZW5lcmF0ZUNoaWxkSWQsXG4gICAgICBvblNlbGVjdCA9IF91c2VVbmNvbnRyb2xsZWQub25TZWxlY3QsXG4gICAgICBhY3RpdmVLZXkgPSBfdXNlVW5jb250cm9sbGVkLmFjdGl2ZUtleSxcbiAgICAgIHRyYW5zaXRpb24gPSBfdXNlVW5jb250cm9sbGVkLnRyYW5zaXRpb24sXG4gICAgICBtb3VudE9uRW50ZXIgPSBfdXNlVW5jb250cm9sbGVkLm1vdW50T25FbnRlcixcbiAgICAgIHVubW91bnRPbkV4aXQgPSBfdXNlVW5jb250cm9sbGVkLnVubW91bnRPbkV4aXQsXG4gICAgICBjaGlsZHJlbiA9IF91c2VVbmNvbnRyb2xsZWQuY2hpbGRyZW47XG5cbiAgdmFyIGdlbmVyYXRlQ2hpbGRJZCA9IHVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZUN1c3RvbUNoaWxkSWQgfHwgZnVuY3Rpb24gKGtleSwgdHlwZSkge1xuICAgICAgcmV0dXJuIGlkID8gaWQgKyBcIi1cIiArIHR5cGUgKyBcIi1cIiArIGtleSA6IG51bGw7XG4gICAgfTtcbiAgfSwgW2lkLCBnZW5lcmF0ZUN1c3RvbUNoaWxkSWRdKTtcbiAgdmFyIHRhYkNvbnRleHQgPSB1c2VNZW1vKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb25TZWxlY3Q6IG9uU2VsZWN0LFxuICAgICAgYWN0aXZlS2V5OiBhY3RpdmVLZXksXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxuICAgICAgbW91bnRPbkVudGVyOiBtb3VudE9uRW50ZXIsXG4gICAgICB1bm1vdW50T25FeGl0OiB1bm1vdW50T25FeGl0LFxuICAgICAgZ2V0Q29udHJvbGxlZElkOiBmdW5jdGlvbiBnZXRDb250cm9sbGVkSWQoa2V5KSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUNoaWxkSWQoa2V5LCAndGFicGFuZScpO1xuICAgICAgfSxcbiAgICAgIGdldENvbnRyb2xsZXJJZDogZnVuY3Rpb24gZ2V0Q29udHJvbGxlcklkKGtleSkge1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDaGlsZElkKGtleSwgJ3RhYicpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtvblNlbGVjdCwgYWN0aXZlS2V5LCB0cmFuc2l0aW9uLCBtb3VudE9uRW50ZXIsIHVubW91bnRPbkV4aXQsIGdlbmVyYXRlQ2hpbGRJZF0pO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUYWJDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IHRhYkNvbnRleHRcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3RhYmxlQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiBvblNlbGVjdFxuICB9LCBjaGlsZHJlbikpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFiQ29udGFpbmVyOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xudmFyIFRhYkNvbnRlbnQgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIF9yZWYkYXMgPSBfcmVmLmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3JlZiRhcyA9PT0gdm9pZCAwID8gJ2RpdicgOiBfcmVmJGFzLFxuICAgICAgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiYXNcIiwgXCJjbGFzc05hbWVcIl0pO1xuXG4gIHZhciBkZWNvcmF0ZWRCc1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3RhYi1jb250ZW50Jyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgZGVjb3JhdGVkQnNQcmVmaXgpXG4gIH0pKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgVGFiQ29udGVudDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgVGFiQ29udGV4dCBmcm9tICcuL1RhYkNvbnRleHQnO1xuaW1wb3J0IFNlbGVjdGFibGVDb250ZXh0LCB7IG1ha2VFdmVudEtleSB9IGZyb20gJy4vU2VsZWN0YWJsZUNvbnRleHQnO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9GYWRlJztcblxuZnVuY3Rpb24gdXNlVGFiQ29udGV4dChwcm9wcykge1xuICB2YXIgY29udGV4dCA9IHVzZUNvbnRleHQoVGFiQ29udGV4dCk7XG4gIGlmICghY29udGV4dCkgcmV0dXJuIHByb3BzO1xuXG4gIHZhciBhY3RpdmVLZXkgPSBjb250ZXh0LmFjdGl2ZUtleSxcbiAgICAgIGdldENvbnRyb2xsZWRJZCA9IGNvbnRleHQuZ2V0Q29udHJvbGxlZElkLFxuICAgICAgZ2V0Q29udHJvbGxlcklkID0gY29udGV4dC5nZXRDb250cm9sbGVySWQsXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoY29udGV4dCwgW1wiYWN0aXZlS2V5XCIsIFwiZ2V0Q29udHJvbGxlZElkXCIsIFwiZ2V0Q29udHJvbGxlcklkXCJdKTtcblxuICB2YXIgc2hvdWxkVHJhbnNpdGlvbiA9IHByb3BzLnRyYW5zaXRpb24gIT09IGZhbHNlICYmIHJlc3QudHJhbnNpdGlvbiAhPT0gZmFsc2U7XG4gIHZhciBrZXkgPSBtYWtlRXZlbnRLZXkocHJvcHMuZXZlbnRLZXkpO1xuICByZXR1cm4gX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgYWN0aXZlOiBwcm9wcy5hY3RpdmUgPT0gbnVsbCAmJiBrZXkgIT0gbnVsbCA/IG1ha2VFdmVudEtleShhY3RpdmVLZXkpID09PSBrZXkgOiBwcm9wcy5hY3RpdmUsXG4gICAgaWQ6IGdldENvbnRyb2xsZWRJZChwcm9wcy5ldmVudEtleSksXG4gICAgJ2FyaWEtbGFiZWxsZWRieSc6IGdldENvbnRyb2xsZXJJZChwcm9wcy5ldmVudEtleSksXG4gICAgdHJhbnNpdGlvbjogc2hvdWxkVHJhbnNpdGlvbiAmJiAocHJvcHMudHJhbnNpdGlvbiB8fCByZXN0LnRyYW5zaXRpb24gfHwgRmFkZSksXG4gICAgbW91bnRPbkVudGVyOiBwcm9wcy5tb3VudE9uRW50ZXIgIT0gbnVsbCA/IHByb3BzLm1vdW50T25FbnRlciA6IHJlc3QubW91bnRPbkVudGVyLFxuICAgIHVubW91bnRPbkV4aXQ6IHByb3BzLnVubW91bnRPbkV4aXQgIT0gbnVsbCA/IHByb3BzLnVubW91bnRPbkV4aXQgOiByZXN0LnVubW91bnRPbkV4aXRcbiAgfSk7XG59XG5cbnZhciBUYWJQYW5lID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikge1xuICB2YXIgX3VzZVRhYkNvbnRleHQgPSB1c2VUYWJDb250ZXh0KHByb3BzKSxcbiAgICAgIGJzUHJlZml4ID0gX3VzZVRhYkNvbnRleHQuYnNQcmVmaXgsXG4gICAgICBjbGFzc05hbWUgPSBfdXNlVGFiQ29udGV4dC5jbGFzc05hbWUsXG4gICAgICBhY3RpdmUgPSBfdXNlVGFiQ29udGV4dC5hY3RpdmUsXG4gICAgICBvbkVudGVyID0gX3VzZVRhYkNvbnRleHQub25FbnRlcixcbiAgICAgIG9uRW50ZXJpbmcgPSBfdXNlVGFiQ29udGV4dC5vbkVudGVyaW5nLFxuICAgICAgb25FbnRlcmVkID0gX3VzZVRhYkNvbnRleHQub25FbnRlcmVkLFxuICAgICAgb25FeGl0ID0gX3VzZVRhYkNvbnRleHQub25FeGl0LFxuICAgICAgb25FeGl0aW5nID0gX3VzZVRhYkNvbnRleHQub25FeGl0aW5nLFxuICAgICAgb25FeGl0ZWQgPSBfdXNlVGFiQ29udGV4dC5vbkV4aXRlZCxcbiAgICAgIG1vdW50T25FbnRlciA9IF91c2VUYWJDb250ZXh0Lm1vdW50T25FbnRlcixcbiAgICAgIHVubW91bnRPbkV4aXQgPSBfdXNlVGFiQ29udGV4dC51bm1vdW50T25FeGl0LFxuICAgICAgVHJhbnNpdGlvbiA9IF91c2VUYWJDb250ZXh0LnRyYW5zaXRpb24sXG4gICAgICBfdXNlVGFiQ29udGV4dCRhcyA9IF91c2VUYWJDb250ZXh0LmFzLFxuICAgICAgQ29tcG9uZW50ID0gX3VzZVRhYkNvbnRleHQkYXMgPT09IHZvaWQgMCA/ICdkaXYnIDogX3VzZVRhYkNvbnRleHQkYXMsXG4gICAgICBfID0gX3VzZVRhYkNvbnRleHQuZXZlbnRLZXksXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3VzZVRhYkNvbnRleHQsIFtcImJzUHJlZml4XCIsIFwiY2xhc3NOYW1lXCIsIFwiYWN0aXZlXCIsIFwib25FbnRlclwiLCBcIm9uRW50ZXJpbmdcIiwgXCJvbkVudGVyZWRcIiwgXCJvbkV4aXRcIiwgXCJvbkV4aXRpbmdcIiwgXCJvbkV4aXRlZFwiLCBcIm1vdW50T25FbnRlclwiLCBcInVubW91bnRPbkV4aXRcIiwgXCJ0cmFuc2l0aW9uXCIsIFwiYXNcIiwgXCJldmVudEtleVwiXSk7XG5cbiAgdmFyIHByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3RhYi1wYW5lJyk7XG4gIGlmICghYWN0aXZlICYmIHVubW91bnRPbkV4aXQpIHJldHVybiBudWxsO1xuICB2YXIgcGFuZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgIHJlZjogcmVmLFxuICAgIHJvbGU6IFwidGFicGFuZWxcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6ICFhY3RpdmUsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgcHJlZml4LCB7XG4gICAgICBhY3RpdmU6IGFjdGl2ZVxuICAgIH0pXG4gIH0pKTtcbiAgaWYgKFRyYW5zaXRpb24pIHBhbmUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFRyYW5zaXRpb24sIHtcbiAgICBpbjogYWN0aXZlLFxuICAgIG9uRW50ZXI6IG9uRW50ZXIsXG4gICAgb25FbnRlcmluZzogb25FbnRlcmluZyxcbiAgICBvbkVudGVyZWQ6IG9uRW50ZXJlZCxcbiAgICBvbkV4aXQ6IG9uRXhpdCxcbiAgICBvbkV4aXRpbmc6IG9uRXhpdGluZyxcbiAgICBvbkV4aXRlZDogb25FeGl0ZWQsXG4gICAgbW91bnRPbkVudGVyOiBtb3VudE9uRW50ZXIsXG4gICAgdW5tb3VudE9uRXhpdDogdW5tb3VudE9uRXhpdFxuICB9LCBwYW5lKTsgLy8gV2UgcHJvdmlkZSBhbiBlbXB0eSB0aGUgVGFiQ29udGV4dCBzbyBgPE5hdj5gcyBpbiBgPFRhYlBhbmU+YHMgZG9uJ3RcbiAgLy8gY29uZmxpY3Qgd2l0aCB0aGUgdG9wIGxldmVsIG9uZS5cblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUYWJDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IG51bGxcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3RhYmxlQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiBudWxsXG4gIH0sIHBhbmUpKTtcbn0pO1xuVGFiUGFuZS5kaXNwbGF5TmFtZSA9ICdUYWJQYW5lJztcbmV4cG9ydCBkZWZhdWx0IFRhYlBhbmU7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG52YXIgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgc3RyaXBlZCA9IF9yZWYuc3RyaXBlZCxcbiAgICAgIGJvcmRlcmVkID0gX3JlZi5ib3JkZXJlZCxcbiAgICAgIGJvcmRlcmxlc3MgPSBfcmVmLmJvcmRlcmxlc3MsXG4gICAgICBob3ZlciA9IF9yZWYuaG92ZXIsXG4gICAgICBzaXplID0gX3JlZi5zaXplLFxuICAgICAgdmFyaWFudCA9IF9yZWYudmFyaWFudCxcbiAgICAgIHJlc3BvbnNpdmUgPSBfcmVmLnJlc3BvbnNpdmUsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiY2xhc3NOYW1lXCIsIFwic3RyaXBlZFwiLCBcImJvcmRlcmVkXCIsIFwiYm9yZGVybGVzc1wiLCBcImhvdmVyXCIsIFwic2l6ZVwiLCBcInZhcmlhbnRcIiwgXCJyZXNwb25zaXZlXCJdKTtcblxuICB2YXIgZGVjb3JhdGVkQnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICd0YWJsZScpO1xuICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBkZWNvcmF0ZWRCc1ByZWZpeCwgdmFyaWFudCAmJiBkZWNvcmF0ZWRCc1ByZWZpeCArIFwiLVwiICsgdmFyaWFudCwgc2l6ZSAmJiBkZWNvcmF0ZWRCc1ByZWZpeCArIFwiLVwiICsgc2l6ZSwgc3RyaXBlZCAmJiBkZWNvcmF0ZWRCc1ByZWZpeCArIFwiLXN0cmlwZWRcIiwgYm9yZGVyZWQgJiYgZGVjb3JhdGVkQnNQcmVmaXggKyBcIi1ib3JkZXJlZFwiLCBib3JkZXJsZXNzICYmIGRlY29yYXRlZEJzUHJlZml4ICsgXCItYm9yZGVybGVzc1wiLCBob3ZlciAmJiBkZWNvcmF0ZWRCc1ByZWZpeCArIFwiLWhvdmVyXCIpO1xuICB2YXIgdGFibGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc2VzLFxuICAgIHJlZjogcmVmXG4gIH0pKTtcblxuICBpZiAocmVzcG9uc2l2ZSkge1xuICAgIHZhciByZXNwb25zaXZlQ2xhc3MgPSBkZWNvcmF0ZWRCc1ByZWZpeCArIFwiLXJlc3BvbnNpdmVcIjtcblxuICAgIGlmICh0eXBlb2YgcmVzcG9uc2l2ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlc3BvbnNpdmVDbGFzcyA9IHJlc3BvbnNpdmVDbGFzcyArIFwiLVwiICsgcmVzcG9uc2l2ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IHJlc3BvbnNpdmVDbGFzc1xuICAgIH0sIHRhYmxlKTtcbiAgfVxuXG4gIHJldHVybiB0YWJsZTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgVGFibGU7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcmVxdWlyZWRGb3JBMTF5IGZyb20gJ3Byb3AtdHlwZXMtZXh0cmEvbGliL2lzUmVxdWlyZWRGb3JBMTF5JztcbmltcG9ydCB7IHVzZVVuY29udHJvbGxlZCB9IGZyb20gJ3VuY29udHJvbGxhYmxlJztcbmltcG9ydCBOYXYgZnJvbSAnLi9OYXYnO1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnLi9OYXZMaW5rJztcbmltcG9ydCBOYXZJdGVtIGZyb20gJy4vTmF2SXRlbSc7XG5pbXBvcnQgVGFiQ29udGFpbmVyIGZyb20gJy4vVGFiQ29udGFpbmVyJztcbmltcG9ydCBUYWJDb250ZW50IGZyb20gJy4vVGFiQ29udGVudCc7XG5pbXBvcnQgVGFiUGFuZSBmcm9tICcuL1RhYlBhbmUnO1xuaW1wb3J0IHsgZm9yRWFjaCwgbWFwIH0gZnJvbSAnLi9FbGVtZW50Q2hpbGRyZW4nO1xudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgdmFyaWFudDogJ3RhYnMnLFxuICBtb3VudE9uRW50ZXI6IGZhbHNlLFxuICB1bm1vdW50T25FeGl0OiBmYWxzZVxufTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFjdGl2ZUtleShjaGlsZHJlbikge1xuICB2YXIgZGVmYXVsdEFjdGl2ZUtleTtcbiAgZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgaWYgKGRlZmF1bHRBY3RpdmVLZXkgPT0gbnVsbCkge1xuICAgICAgZGVmYXVsdEFjdGl2ZUtleSA9IGNoaWxkLnByb3BzLmV2ZW50S2V5O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBkZWZhdWx0QWN0aXZlS2V5O1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYWIoY2hpbGQpIHtcbiAgdmFyIF9jaGlsZCRwcm9wcyA9IGNoaWxkLnByb3BzLFxuICAgICAgdGl0bGUgPSBfY2hpbGQkcHJvcHMudGl0bGUsXG4gICAgICBldmVudEtleSA9IF9jaGlsZCRwcm9wcy5ldmVudEtleSxcbiAgICAgIGRpc2FibGVkID0gX2NoaWxkJHByb3BzLmRpc2FibGVkLFxuICAgICAgdGFiQ2xhc3NOYW1lID0gX2NoaWxkJHByb3BzLnRhYkNsYXNzTmFtZTtcblxuICBpZiAodGl0bGUgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTmF2SXRlbSwge1xuICAgIGFzOiBOYXZMaW5rLFxuICAgIGV2ZW50S2V5OiBldmVudEtleSxcbiAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgY2xhc3NOYW1lOiB0YWJDbGFzc05hbWVcbiAgfSwgdGl0bGUpO1xufVxuXG52YXIgVGFicyA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHtcbiAgdmFyIF91c2VVbmNvbnRyb2xsZWQgPSB1c2VVbmNvbnRyb2xsZWQocHJvcHMsIHtcbiAgICBhY3RpdmVLZXk6ICdvblNlbGVjdCdcbiAgfSksXG4gICAgICBpZCA9IF91c2VVbmNvbnRyb2xsZWQuaWQsXG4gICAgICBvblNlbGVjdCA9IF91c2VVbmNvbnRyb2xsZWQub25TZWxlY3QsXG4gICAgICB0cmFuc2l0aW9uID0gX3VzZVVuY29udHJvbGxlZC50cmFuc2l0aW9uLFxuICAgICAgbW91bnRPbkVudGVyID0gX3VzZVVuY29udHJvbGxlZC5tb3VudE9uRW50ZXIsXG4gICAgICB1bm1vdW50T25FeGl0ID0gX3VzZVVuY29udHJvbGxlZC51bm1vdW50T25FeGl0LFxuICAgICAgY2hpbGRyZW4gPSBfdXNlVW5jb250cm9sbGVkLmNoaWxkcmVuLFxuICAgICAgX3VzZVVuY29udHJvbGxlZCRhY3RpID0gX3VzZVVuY29udHJvbGxlZC5hY3RpdmVLZXksXG4gICAgICBhY3RpdmVLZXkgPSBfdXNlVW5jb250cm9sbGVkJGFjdGkgPT09IHZvaWQgMCA/IGdldERlZmF1bHRBY3RpdmVLZXkoY2hpbGRyZW4pIDogX3VzZVVuY29udHJvbGxlZCRhY3RpLFxuICAgICAgY29udHJvbGxlZFByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3VzZVVuY29udHJvbGxlZCwgW1wiaWRcIiwgXCJvblNlbGVjdFwiLCBcInRyYW5zaXRpb25cIiwgXCJtb3VudE9uRW50ZXJcIiwgXCJ1bm1vdW50T25FeGl0XCIsIFwiY2hpbGRyZW5cIiwgXCJhY3RpdmVLZXlcIl0pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYkNvbnRhaW5lciwge1xuICAgIHJlZjogcmVmLFxuICAgIGlkOiBpZCxcbiAgICBhY3RpdmVLZXk6IGFjdGl2ZUtleSxcbiAgICBvblNlbGVjdDogb25TZWxlY3QsXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICBtb3VudE9uRW50ZXI6IG1vdW50T25FbnRlcixcbiAgICB1bm1vdW50T25FeGl0OiB1bm1vdW50T25FeGl0XG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTmF2LCBfZXh0ZW5kcyh7fSwgY29udHJvbGxlZFByb3BzLCB7XG4gICAgcm9sZTogXCJ0YWJsaXN0XCIsXG4gICAgYXM6IFwibmF2XCJcbiAgfSksIG1hcChjaGlsZHJlbiwgcmVuZGVyVGFiKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFiQ29udGVudCwgbnVsbCwgbWFwKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICB2YXIgY2hpbGRQcm9wcyA9IF9leHRlbmRzKHt9LCBjaGlsZC5wcm9wcyk7XG5cbiAgICBkZWxldGUgY2hpbGRQcm9wcy50aXRsZTtcbiAgICBkZWxldGUgY2hpbGRQcm9wcy5kaXNhYmxlZDtcbiAgICBkZWxldGUgY2hpbGRQcm9wcy50YWJDbGFzc05hbWU7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFiUGFuZSwgY2hpbGRQcm9wcyk7XG4gIH0pKSk7XG59KTtcblRhYnMuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuVGFicy5kaXNwbGF5TmFtZSA9ICdUYWJzJztcbmV4cG9ydCBkZWZhdWx0IFRhYnM7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJ0ByZXN0YXJ0L2hvb2tzL3VzZVRpbWVvdXQnO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9GYWRlJztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9Ub2FzdEhlYWRlcic7XG5pbXBvcnQgQm9keSBmcm9tICcuL1RvYXN0Qm9keSc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IFRvYXN0Q29udGV4dCBmcm9tICcuL1RvYXN0Q29udGV4dCc7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBhbmltYXRpb246IHRydWUsXG4gIGF1dG9oaWRlOiBmYWxzZSxcbiAgZGVsYXk6IDMwMDAsXG4gIHNob3c6IHRydWUsXG4gIHRyYW5zaXRpb246IEZhZGVcbn07XG52YXIgVG9hc3QgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChfcmVmLCByZWYpIHtcbiAgdmFyIGJzUHJlZml4ID0gX3JlZi5ic1ByZWZpeCxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgVHJhbnNpdGlvbiA9IF9yZWYudHJhbnNpdGlvbixcbiAgICAgIHNob3cgPSBfcmVmLnNob3csXG4gICAgICBhbmltYXRpb24gPSBfcmVmLmFuaW1hdGlvbixcbiAgICAgIGRlbGF5ID0gX3JlZi5kZWxheSxcbiAgICAgIGF1dG9oaWRlID0gX3JlZi5hdXRvaGlkZSxcbiAgICAgIG9uQ2xvc2UgPSBfcmVmLm9uQ2xvc2UsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImJzUHJlZml4XCIsIFwiY2xhc3NOYW1lXCIsIFwiY2hpbGRyZW5cIiwgXCJ0cmFuc2l0aW9uXCIsIFwic2hvd1wiLCBcImFuaW1hdGlvblwiLCBcImRlbGF5XCIsIFwiYXV0b2hpZGVcIiwgXCJvbkNsb3NlXCJdKTtcblxuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeCgndG9hc3QnKTtcbiAgdmFyIGRlbGF5UmVmID0gdXNlUmVmKGRlbGF5KTtcbiAgdmFyIG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XG4gIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgLy8gV2UgdXNlIHJlZnMgZm9yIHRoZXNlLCBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gcmVzdGFydCB0aGUgYXV0b2hpZGVcbiAgICAvLyB0aW1lciBpbiBjYXNlIHRoZXNlIHZhbHVlcyBjaGFuZ2UuXG4gICAgZGVsYXlSZWYuY3VycmVudCA9IGRlbGF5O1xuICAgIG9uQ2xvc2VSZWYuY3VycmVudCA9IG9uQ2xvc2U7XG4gIH0sIFtkZWxheSwgb25DbG9zZV0pO1xuICB2YXIgYXV0b2hpZGVUaW1lb3V0ID0gdXNlVGltZW91dCgpO1xuICB2YXIgYXV0b2hpZGVGdW5jID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgIGlmICghKGF1dG9oaWRlICYmIHNob3cpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XG4gIH0sIFthdXRvaGlkZSwgc2hvd10pO1xuICBhdXRvaGlkZVRpbWVvdXQuc2V0KGF1dG9oaWRlRnVuYywgZGVsYXlSZWYuY3VycmVudCk7XG4gIHZhciB1c2VBbmltYXRpb24gPSB1c2VNZW1vKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVHJhbnNpdGlvbiAmJiBhbmltYXRpb247XG4gIH0sIFtUcmFuc2l0aW9uLCBhbmltYXRpb25dKTtcbiAgdmFyIHRvYXN0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoYnNQcmVmaXgsIGNsYXNzTmFtZSwgIXVzZUFuaW1hdGlvbiAmJiBzaG93ICYmICdzaG93JyksXG4gICAgcm9sZTogXCJhbGVydFwiLFxuICAgIFwiYXJpYS1saXZlXCI6IFwiYXNzZXJ0aXZlXCIsXG4gICAgXCJhcmlhLWF0b21pY1wiOiBcInRydWVcIlxuICB9KSwgY2hpbGRyZW4pO1xuICB2YXIgdG9hc3RDb250ZXh0ID0ge1xuICAgIG9uQ2xvc2U6IG9uQ2xvc2VcbiAgfTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9hc3RDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IHRvYXN0Q29udGV4dFxuICB9LCB1c2VBbmltYXRpb24gPyBSZWFjdC5jcmVhdGVFbGVtZW50KFRyYW5zaXRpb24sIHtcbiAgICBpbjogc2hvd1xuICB9LCB0b2FzdCkgOiB0b2FzdCk7XG59KTtcblRvYXN0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblRvYXN0LmRpc3BsYXlOYW1lID0gJ1RvYXN0JztcblRvYXN0LkJvZHkgPSBCb2R5O1xuVG9hc3QuSGVhZGVyID0gSGVhZGVyO1xuZXhwb3J0IGRlZmF1bHQgVG9hc3Q7IiwiaW1wb3J0IGNyZWF0ZVdpdGhCc1ByZWZpeCBmcm9tICcuL2NyZWF0ZVdpdGhCc1ByZWZpeCc7XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVXaXRoQnNQcmVmaXgoJ3RvYXN0LWJvZHknKTsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIFRvYXN0Q29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICBvbkNsb3NlOiBmdW5jdGlvbiBvbkNsb3NlKCkge31cbn0pO1xuZXhwb3J0IGRlZmF1bHQgVG9hc3RDb250ZXh0OyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgeyB1c2VCb290c3RyYXBQcmVmaXggfSBmcm9tICcuL1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IENsb3NlQnV0dG9uIGZyb20gJy4vQ2xvc2VCdXR0b24nO1xuaW1wb3J0IFRvYXN0Q29udGV4dCBmcm9tICcuL1RvYXN0Q29udGV4dCc7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBjbG9zZUxhYmVsOiAnQ2xvc2UnLFxuICBjbG9zZUJ1dHRvbjogdHJ1ZVxufTtcbnZhciBUb2FzdEhlYWRlciA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgY2xvc2VMYWJlbCA9IF9yZWYuY2xvc2VMYWJlbCxcbiAgICAgIGNsb3NlQnV0dG9uID0gX3JlZi5jbG9zZUJ1dHRvbixcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJic1ByZWZpeFwiLCBcImNsb3NlTGFiZWxcIiwgXCJjbG9zZUJ1dHRvblwiLCBcImNsYXNzTmFtZVwiLCBcImNoaWxkcmVuXCJdKTtcblxuICBic1ByZWZpeCA9IHVzZUJvb3RzdHJhcFByZWZpeChic1ByZWZpeCwgJ3RvYXN0LWhlYWRlcicpO1xuICB2YXIgY29udGV4dCA9IHVzZUNvbnRleHQoVG9hc3RDb250ZXh0KTtcbiAgdmFyIGhhbmRsZUNsaWNrID0gdXNlRXZlbnRDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQub25DbG9zZSgpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhic1ByZWZpeCwgY2xhc3NOYW1lKVxuICB9KSwgY2hpbGRyZW4sIGNsb3NlQnV0dG9uICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2xvc2VCdXR0b24sIHtcbiAgICBsYWJlbDogY2xvc2VMYWJlbCxcbiAgICBvbkNsaWNrOiBoYW5kbGVDbGljayxcbiAgICBjbGFzc05hbWU6IFwibWwtMiBtYi0xXCIsXG4gICAgXCJkYXRhLWRpc21pc3NcIjogXCJ0b2FzdFwiXG4gIH0pKTtcbn0pO1xuVG9hc3RIZWFkZXIuZGlzcGxheU5hbWUgPSAnVG9hc3RIZWFkZXInO1xuVG9hc3RIZWFkZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuZXhwb3J0IGRlZmF1bHQgVG9hc3RIZWFkZXI7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9CdXR0b24nO1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcblxudmFyIFRvZ2dsZUJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgY2hlY2tlZCA9IF9yZWYuY2hlY2tlZCxcbiAgICAgIHR5cGUgPSBfcmVmLnR5cGUsXG4gICAgICBvbkNoYW5nZSA9IF9yZWYub25DaGFuZ2UsXG4gICAgICB2YWx1ZSA9IF9yZWYudmFsdWUsXG4gICAgICBkaXNhYmxlZCA9IF9yZWYuZGlzYWJsZWQsXG4gICAgICBpbnB1dFJlZiA9IF9yZWYuaW5wdXRSZWYsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF9yZWYsIFtcImNoaWxkcmVuXCIsIFwibmFtZVwiLCBcImNsYXNzTmFtZVwiLCBcImNoZWNrZWRcIiwgXCJ0eXBlXCIsIFwib25DaGFuZ2VcIiwgXCJ2YWx1ZVwiLCBcImRpc2FibGVkXCIsIFwiaW5wdXRSZWZcIl0pO1xuXG4gIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShmYWxzZSksXG4gICAgICBmb2N1c2VkID0gX3VzZVN0YXRlWzBdLFxuICAgICAgc2V0Rm9jdXNlZCA9IF91c2VTdGF0ZVsxXTtcblxuICB2YXIgaGFuZGxlRm9jdXMgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSBzZXRGb2N1c2VkKHRydWUpO1xuICB9LCBbXSk7XG4gIHZhciBoYW5kbGVCbHVyID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykgc2V0Rm9jdXNlZChmYWxzZSk7XG4gIH0sIFtdKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICByZWY6IHJlZixcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBmb2N1c2VkICYmICdmb2N1cycsIGRpc2FibGVkICYmICdkaXNhYmxlZCcpLFxuICAgIHR5cGU6IG51bGwsXG4gICAgYWN0aXZlOiAhIWNoZWNrZWQsXG4gICAgYXM6IFwibGFiZWxcIlxuICB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIHJlZjogaW5wdXRSZWYsXG4gICAgYXV0b0NvbXBsZXRlOiBcIm9mZlwiLFxuICAgIGNoZWNrZWQ6ICEhY2hlY2tlZCxcbiAgICBkaXNhYmxlZDogISFkaXNhYmxlZCxcbiAgICBvbkZvY3VzOiBoYW5kbGVGb2N1cyxcbiAgICBvbkJsdXI6IGhhbmRsZUJsdXIsXG4gICAgb25DaGFuZ2U6IG9uQ2hhbmdlIHx8IG5vb3BcbiAgfSksIGNoaWxkcmVuKTtcbn0pO1xuVG9nZ2xlQnV0dG9uLmRpc3BsYXlOYW1lID0gJ1RvZ2dsZUJ1dHRvbic7XG5leHBvcnQgZGVmYXVsdCBUb2dnbGVCdXR0b247IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgeyB1c2VVbmNvbnRyb2xsZWQgfSBmcm9tICd1bmNvbnRyb2xsYWJsZSc7XG5pbXBvcnQgY2hhaW5GdW5jdGlvbiBmcm9tICcuL2NyZWF0ZUNoYWluZWRGdW5jdGlvbic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuL0VsZW1lbnRDaGlsZHJlbic7XG5pbXBvcnQgQnV0dG9uR3JvdXAgZnJvbSAnLi9CdXR0b25Hcm91cCc7XG5pbXBvcnQgVG9nZ2xlQnV0dG9uIGZyb20gJy4vVG9nZ2xlQnV0dG9uJztcbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIHR5cGU6ICdyYWRpbydcbn07XG52YXIgVG9nZ2xlQnV0dG9uR3JvdXAgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gIHZhciBfdXNlVW5jb250cm9sbGVkID0gdXNlVW5jb250cm9sbGVkKHByb3BzLCB7XG4gICAgdmFsdWU6ICdvbkNoYW5nZSdcbiAgfSksXG4gICAgICBjaGlsZHJlbiA9IF91c2VVbmNvbnRyb2xsZWQuY2hpbGRyZW4sXG4gICAgICB0eXBlID0gX3VzZVVuY29udHJvbGxlZC50eXBlLFxuICAgICAgbmFtZSA9IF91c2VVbmNvbnRyb2xsZWQubmFtZSxcbiAgICAgIHZhbHVlID0gX3VzZVVuY29udHJvbGxlZC52YWx1ZSxcbiAgICAgIG9uQ2hhbmdlID0gX3VzZVVuY29udHJvbGxlZC5vbkNoYW5nZSxcbiAgICAgIGNvbnRyb2xsZWRQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF91c2VVbmNvbnRyb2xsZWQsIFtcImNoaWxkcmVuXCIsIFwidHlwZVwiLCBcIm5hbWVcIiwgXCJ2YWx1ZVwiLCBcIm9uQ2hhbmdlXCJdKTtcblxuICB2YXIgZ2V0VmFsdWVzID0gZnVuY3Rpb24gZ2V0VmFsdWVzKCkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gW10gOiBbXS5jb25jYXQodmFsdWUpO1xuICB9O1xuXG4gIHZhciBoYW5kbGVUb2dnbGUgPSBmdW5jdGlvbiBoYW5kbGVUb2dnbGUoaW5wdXRWYWwsIGV2ZW50KSB7XG4gICAgdmFyIHZhbHVlcyA9IGdldFZhbHVlcygpO1xuICAgIHZhciBpc0FjdGl2ZSA9IHZhbHVlcy5pbmRleE9mKGlucHV0VmFsKSAhPT0gLTE7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgaWYgKCFpc0FjdGl2ZSkgb25DaGFuZ2UoaW5wdXRWYWwsIGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIG9uQ2hhbmdlKHZhbHVlcy5maWx0ZXIoZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG4gIT09IGlucHV0VmFsO1xuICAgICAgfSksIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25DaGFuZ2UoW10uY29uY2F0KHZhbHVlcywgW2lucHV0VmFsXSksIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgISh0eXBlICE9PSAncmFkaW8nIHx8ICEhbmFtZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsICdBIGBuYW1lYCBpcyByZXF1aXJlZCB0byBncm91cCB0aGUgdG9nZ2xlIGJ1dHRvbnMgd2hlbiB0aGUgYHR5cGVgICcgKyAnaXMgc2V0IHRvIFwicmFkaW9cIicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uR3JvdXAsIF9leHRlbmRzKHt9LCBjb250cm9sbGVkUHJvcHMsIHtcbiAgICByZWY6IHJlZixcbiAgICB0b2dnbGU6IHRydWVcbiAgfSksIG1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgdmFyIHZhbHVlcyA9IGdldFZhbHVlcygpO1xuICAgIHZhciBfY2hpbGQkcHJvcHMgPSBjaGlsZC5wcm9wcyxcbiAgICAgICAgY2hpbGRWYWwgPSBfY2hpbGQkcHJvcHMudmFsdWUsXG4gICAgICAgIGNoaWxkT25DaGFuZ2UgPSBfY2hpbGQkcHJvcHMub25DaGFuZ2U7XG5cbiAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgcmV0dXJuIGhhbmRsZVRvZ2dsZShjaGlsZFZhbCwgZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBuYW1lOiBjaGlsZC5uYW1lIHx8IG5hbWUsXG4gICAgICBjaGVja2VkOiB2YWx1ZXMuaW5kZXhPZihjaGlsZFZhbCkgIT09IC0xLFxuICAgICAgb25DaGFuZ2U6IGNoYWluRnVuY3Rpb24oY2hpbGRPbkNoYW5nZSwgaGFuZGxlcilcbiAgICB9KTtcbiAgfSkpO1xufSk7XG5Ub2dnbGVCdXR0b25Hcm91cC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5Ub2dnbGVCdXR0b25Hcm91cC5CdXR0b24gPSBUb2dnbGVCdXR0b247XG5leHBvcnQgZGVmYXVsdCBUb2dnbGVCdXR0b25Hcm91cDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGlzUmVxdWlyZWRGb3JBMTF5IGZyb20gJ3Byb3AtdHlwZXMtZXh0cmEvbGliL2lzUmVxdWlyZWRGb3JBMTF5JztcbmltcG9ydCB7IHVzZUJvb3RzdHJhcFByZWZpeCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBwbGFjZW1lbnQ6ICdyaWdodCdcbn07XG52YXIgVG9vbHRpcCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIHJlZikge1xuICB2YXIgYnNQcmVmaXggPSBfcmVmLmJzUHJlZml4LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIHN0eWxlID0gX3JlZi5zdHlsZSxcbiAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgIGFycm93UHJvcHMgPSBfcmVmLmFycm93UHJvcHMsXG4gICAgICBfID0gX3JlZi5zY2hlZHVsZVVwZGF0ZSxcbiAgICAgIF8xID0gX3JlZi5vdXRPZkJvdW5kYXJpZXMsXG4gICAgICBfMiA9IF9yZWYuc2hvdyxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiYnNQcmVmaXhcIiwgXCJwbGFjZW1lbnRcIiwgXCJjbGFzc05hbWVcIiwgXCJzdHlsZVwiLCBcImNoaWxkcmVuXCIsIFwiYXJyb3dQcm9wc1wiLCBcInNjaGVkdWxlVXBkYXRlXCIsIFwib3V0T2ZCb3VuZGFyaWVzXCIsIFwic2hvd1wiXSk7XG5cbiAgYnNQcmVmaXggPSB1c2VCb290c3RyYXBQcmVmaXgoYnNQcmVmaXgsICd0b29sdGlwJyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgcm9sZTogXCJ0b29sdGlwXCIsXG4gICAgXCJ4LXBsYWNlbWVudFwiOiBwbGFjZW1lbnQsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNsYXNzTmFtZSwgYnNQcmVmaXgsIFwiYnMtdG9vbHRpcC1cIiArIHBsYWNlbWVudClcbiAgfSwgcHJvcHMpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IFwiYXJyb3dcIlxuICB9LCBhcnJvd1Byb3BzKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogYnNQcmVmaXggKyBcIi1pbm5lclwiXG4gIH0sIGNoaWxkcmVuKSk7XG59KTtcblRvb2x0aXAuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuVG9vbHRpcC5kaXNwbGF5TmFtZSA9ICdUb29sdGlwJztcbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICByZXR1cm4gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocCwgcmVmKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe30sIHAsIHtcbiAgICAgIHJlZjogcmVmLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKHAuY2xhc3NOYW1lLCBjbGFzc05hbWUpXG4gICAgfSkpO1xuICB9KTtcbn0pOyIsImltcG9ydCBfQWNjb3JkaW9uIGZyb20gJy4vQWNjb3JkaW9uJztcbmV4cG9ydCB7IF9BY2NvcmRpb24gYXMgQWNjb3JkaW9uIH07XG5pbXBvcnQgX0FjY29yZGlvblRvZ2dsZSBmcm9tICcuL0FjY29yZGlvblRvZ2dsZSc7XG5leHBvcnQgeyBfQWNjb3JkaW9uVG9nZ2xlIGFzIEFjY29yZGlvblRvZ2dsZSB9O1xuZXhwb3J0IHsgdXNlQWNjb3JkaW9uVG9nZ2xlIH0gZnJvbSAnLi9BY2NvcmRpb25Ub2dnbGUnO1xuaW1wb3J0IF9BY2NvcmRpb25Db2xsYXBzZSBmcm9tICcuL0FjY29yZGlvbkNvbGxhcHNlJztcbmV4cG9ydCB7IF9BY2NvcmRpb25Db2xsYXBzZSBhcyBBY2NvcmRpb25Db2xsYXBzZSB9O1xuaW1wb3J0IF9BbGVydCBmcm9tICcuL0FsZXJ0JztcbmV4cG9ydCB7IF9BbGVydCBhcyBBbGVydCB9O1xuaW1wb3J0IF9CYWRnZSBmcm9tICcuL0JhZGdlJztcbmV4cG9ydCB7IF9CYWRnZSBhcyBCYWRnZSB9O1xuaW1wb3J0IF9CcmVhZGNydW1iIGZyb20gJy4vQnJlYWRjcnVtYic7XG5leHBvcnQgeyBfQnJlYWRjcnVtYiBhcyBCcmVhZGNydW1iIH07XG5pbXBvcnQgX0JyZWFkY3J1bWJJdGVtIGZyb20gJy4vQnJlYWRjcnVtYkl0ZW0nO1xuZXhwb3J0IHsgX0JyZWFkY3J1bWJJdGVtIGFzIEJyZWFkY3J1bWJJdGVtIH07XG5pbXBvcnQgX0J1dHRvbiBmcm9tICcuL0J1dHRvbic7XG5leHBvcnQgeyBfQnV0dG9uIGFzIEJ1dHRvbiB9O1xuaW1wb3J0IF9CdXR0b25Hcm91cCBmcm9tICcuL0J1dHRvbkdyb3VwJztcbmV4cG9ydCB7IF9CdXR0b25Hcm91cCBhcyBCdXR0b25Hcm91cCB9O1xuaW1wb3J0IF9CdXR0b25Ub29sYmFyIGZyb20gJy4vQnV0dG9uVG9vbGJhcic7XG5leHBvcnQgeyBfQnV0dG9uVG9vbGJhciBhcyBCdXR0b25Ub29sYmFyIH07XG5pbXBvcnQgX0NhcmQgZnJvbSAnLi9DYXJkJztcbmV4cG9ydCB7IF9DYXJkIGFzIENhcmQgfTtcbmltcG9ydCBfQ2FyZENvbHVtbnMgZnJvbSAnLi9DYXJkQ29sdW1ucyc7XG5leHBvcnQgeyBfQ2FyZENvbHVtbnMgYXMgQ2FyZENvbHVtbnMgfTtcbmltcG9ydCBfQ2FyZERlY2sgZnJvbSAnLi9DYXJkRGVjayc7XG5leHBvcnQgeyBfQ2FyZERlY2sgYXMgQ2FyZERlY2sgfTtcbmltcG9ydCBfQ2FyZEltZyBmcm9tICcuL0NhcmRJbWcnO1xuZXhwb3J0IHsgX0NhcmRJbWcgYXMgQ2FyZEltZyB9O1xuaW1wb3J0IF9DYXJkR3JvdXAgZnJvbSAnLi9DYXJkR3JvdXAnO1xuZXhwb3J0IHsgX0NhcmRHcm91cCBhcyBDYXJkR3JvdXAgfTtcbmltcG9ydCBfQ2Fyb3VzZWwgZnJvbSAnLi9DYXJvdXNlbCc7XG5leHBvcnQgeyBfQ2Fyb3VzZWwgYXMgQ2Fyb3VzZWwgfTtcbmltcG9ydCBfQ2Fyb3VzZWxJdGVtIGZyb20gJy4vQ2Fyb3VzZWxJdGVtJztcbmV4cG9ydCB7IF9DYXJvdXNlbEl0ZW0gYXMgQ2Fyb3VzZWxJdGVtIH07XG5pbXBvcnQgX0Nsb3NlQnV0dG9uIGZyb20gJy4vQ2xvc2VCdXR0b24nO1xuZXhwb3J0IHsgX0Nsb3NlQnV0dG9uIGFzIENsb3NlQnV0dG9uIH07XG5pbXBvcnQgX0NvbCBmcm9tICcuL0NvbCc7XG5leHBvcnQgeyBfQ29sIGFzIENvbCB9O1xuaW1wb3J0IF9Db2xsYXBzZSBmcm9tICcuL0NvbGxhcHNlJztcbmV4cG9ydCB7IF9Db2xsYXBzZSBhcyBDb2xsYXBzZSB9O1xuaW1wb3J0IF9Ecm9wZG93biBmcm9tICcuL0Ryb3Bkb3duJztcbmV4cG9ydCB7IF9Ecm9wZG93biBhcyBEcm9wZG93biB9O1xuaW1wb3J0IF9Ecm9wZG93bkJ1dHRvbiBmcm9tICcuL0Ryb3Bkb3duQnV0dG9uJztcbmV4cG9ydCB7IF9Ecm9wZG93bkJ1dHRvbiBhcyBEcm9wZG93bkJ1dHRvbiB9O1xuaW1wb3J0IF9Ecm9wZG93bkl0ZW0gZnJvbSAnLi9Ecm9wZG93bkl0ZW0nO1xuZXhwb3J0IHsgX0Ryb3Bkb3duSXRlbSBhcyBEcm9wZG93bkl0ZW0gfTtcbmltcG9ydCBfRmFkZSBmcm9tICcuL0ZhZGUnO1xuZXhwb3J0IHsgX0ZhZGUgYXMgRmFkZSB9O1xuaW1wb3J0IF9Gb3JtIGZyb20gJy4vRm9ybSc7XG5leHBvcnQgeyBfRm9ybSBhcyBGb3JtIH07XG5pbXBvcnQgX0Zvcm1Db250cm9sIGZyb20gJy4vRm9ybUNvbnRyb2wnO1xuZXhwb3J0IHsgX0Zvcm1Db250cm9sIGFzIEZvcm1Db250cm9sIH07XG5pbXBvcnQgX0Zvcm1DaGVjayBmcm9tICcuL0Zvcm1DaGVjayc7XG5leHBvcnQgeyBfRm9ybUNoZWNrIGFzIEZvcm1DaGVjayB9O1xuaW1wb3J0IF9Td2l0Y2ggZnJvbSAnLi9Td2l0Y2gnO1xuZXhwb3J0IHsgX1N3aXRjaCBhcyBTd2l0Y2ggfTtcbmltcG9ydCBfRm9ybUdyb3VwIGZyb20gJy4vRm9ybUdyb3VwJztcbmV4cG9ydCB7IF9Gb3JtR3JvdXAgYXMgRm9ybUdyb3VwIH07XG5pbXBvcnQgX0Zvcm1MYWJlbCBmcm9tICcuL0Zvcm1MYWJlbCc7XG5leHBvcnQgeyBfRm9ybUxhYmVsIGFzIEZvcm1MYWJlbCB9O1xuaW1wb3J0IF9Gb3JtVGV4dCBmcm9tICcuL0Zvcm1UZXh0JztcbmV4cG9ydCB7IF9Gb3JtVGV4dCBhcyBGb3JtVGV4dCB9O1xuaW1wb3J0IF9Db250YWluZXIgZnJvbSAnLi9Db250YWluZXInO1xuZXhwb3J0IHsgX0NvbnRhaW5lciBhcyBDb250YWluZXIgfTtcbmltcG9ydCBfSW1hZ2UgZnJvbSAnLi9JbWFnZSc7XG5leHBvcnQgeyBfSW1hZ2UgYXMgSW1hZ2UgfTtcbmltcG9ydCBfRmlndXJlIGZyb20gJy4vRmlndXJlJztcbmV4cG9ydCB7IF9GaWd1cmUgYXMgRmlndXJlIH07XG5pbXBvcnQgX0lucHV0R3JvdXAgZnJvbSAnLi9JbnB1dEdyb3VwJztcbmV4cG9ydCB7IF9JbnB1dEdyb3VwIGFzIElucHV0R3JvdXAgfTtcbmltcG9ydCBfSnVtYm90cm9uIGZyb20gJy4vSnVtYm90cm9uJztcbmV4cG9ydCB7IF9KdW1ib3Ryb24gYXMgSnVtYm90cm9uIH07XG5pbXBvcnQgX0xpc3RHcm91cCBmcm9tICcuL0xpc3RHcm91cCc7XG5leHBvcnQgeyBfTGlzdEdyb3VwIGFzIExpc3RHcm91cCB9O1xuaW1wb3J0IF9MaXN0R3JvdXBJdGVtIGZyb20gJy4vTGlzdEdyb3VwSXRlbSc7XG5leHBvcnQgeyBfTGlzdEdyb3VwSXRlbSBhcyBMaXN0R3JvdXBJdGVtIH07XG5pbXBvcnQgX01lZGlhIGZyb20gJy4vTWVkaWEnO1xuZXhwb3J0IHsgX01lZGlhIGFzIE1lZGlhIH07XG5pbXBvcnQgX01vZGFsIGZyb20gJy4vTW9kYWwnO1xuZXhwb3J0IHsgX01vZGFsIGFzIE1vZGFsIH07XG5pbXBvcnQgX01vZGFsQm9keSBmcm9tICcuL01vZGFsQm9keSc7XG5leHBvcnQgeyBfTW9kYWxCb2R5IGFzIE1vZGFsQm9keSB9O1xuaW1wb3J0IF9Nb2RhbERpYWxvZyBmcm9tICcuL01vZGFsRGlhbG9nJztcbmV4cG9ydCB7IF9Nb2RhbERpYWxvZyBhcyBNb2RhbERpYWxvZyB9O1xuaW1wb3J0IF9Nb2RhbEZvb3RlciBmcm9tICcuL01vZGFsRm9vdGVyJztcbmV4cG9ydCB7IF9Nb2RhbEZvb3RlciBhcyBNb2RhbEZvb3RlciB9O1xuaW1wb3J0IF9Nb2RhbFRpdGxlIGZyb20gJy4vTW9kYWxUaXRsZSc7XG5leHBvcnQgeyBfTW9kYWxUaXRsZSBhcyBNb2RhbFRpdGxlIH07XG5pbXBvcnQgX05hdiBmcm9tICcuL05hdic7XG5leHBvcnQgeyBfTmF2IGFzIE5hdiB9O1xuaW1wb3J0IF9OYXZiYXIgZnJvbSAnLi9OYXZiYXInO1xuZXhwb3J0IHsgX05hdmJhciBhcyBOYXZiYXIgfTtcbmltcG9ydCBfTmF2YmFyQnJhbmQgZnJvbSAnLi9OYXZiYXJCcmFuZCc7XG5leHBvcnQgeyBfTmF2YmFyQnJhbmQgYXMgTmF2YmFyQnJhbmQgfTtcbmltcG9ydCBfTmF2RHJvcGRvd24gZnJvbSAnLi9OYXZEcm9wZG93bic7XG5leHBvcnQgeyBfTmF2RHJvcGRvd24gYXMgTmF2RHJvcGRvd24gfTtcbmltcG9ydCBfTmF2SXRlbSBmcm9tICcuL05hdkl0ZW0nO1xuZXhwb3J0IHsgX05hdkl0ZW0gYXMgTmF2SXRlbSB9O1xuaW1wb3J0IF9OYXZMaW5rIGZyb20gJy4vTmF2TGluayc7XG5leHBvcnQgeyBfTmF2TGluayBhcyBOYXZMaW5rIH07XG5pbXBvcnQgX092ZXJsYXkgZnJvbSAnLi9PdmVybGF5JztcbmV4cG9ydCB7IF9PdmVybGF5IGFzIE92ZXJsYXkgfTtcbmltcG9ydCBfT3ZlcmxheVRyaWdnZXIgZnJvbSAnLi9PdmVybGF5VHJpZ2dlcic7XG5leHBvcnQgeyBfT3ZlcmxheVRyaWdnZXIgYXMgT3ZlcmxheVRyaWdnZXIgfTtcbmltcG9ydCBfUGFnZUl0ZW0gZnJvbSAnLi9QYWdlSXRlbSc7XG5leHBvcnQgeyBfUGFnZUl0ZW0gYXMgUGFnZUl0ZW0gfTtcbmltcG9ydCBfUGFnaW5hdGlvbiBmcm9tICcuL1BhZ2luYXRpb24nO1xuZXhwb3J0IHsgX1BhZ2luYXRpb24gYXMgUGFnaW5hdGlvbiB9O1xuaW1wb3J0IF9Qb3BvdmVyIGZyb20gJy4vUG9wb3Zlcic7XG5leHBvcnQgeyBfUG9wb3ZlciBhcyBQb3BvdmVyIH07XG5pbXBvcnQgX1BvcG92ZXJDb250ZW50IGZyb20gJy4vUG9wb3ZlckNvbnRlbnQnO1xuZXhwb3J0IHsgX1BvcG92ZXJDb250ZW50IGFzIFBvcG92ZXJDb250ZW50IH07XG5pbXBvcnQgX1BvcG92ZXJUaXRsZSBmcm9tICcuL1BvcG92ZXJUaXRsZSc7XG5leHBvcnQgeyBfUG9wb3ZlclRpdGxlIGFzIFBvcG92ZXJUaXRsZSB9O1xuaW1wb3J0IF9Qcm9ncmVzc0JhciBmcm9tICcuL1Byb2dyZXNzQmFyJztcbmV4cG9ydCB7IF9Qcm9ncmVzc0JhciBhcyBQcm9ncmVzc0JhciB9O1xuaW1wb3J0IF9SZXNwb25zaXZlRW1iZWQgZnJvbSAnLi9SZXNwb25zaXZlRW1iZWQnO1xuZXhwb3J0IHsgX1Jlc3BvbnNpdmVFbWJlZCBhcyBSZXNwb25zaXZlRW1iZWQgfTtcbmltcG9ydCBfUm93IGZyb20gJy4vUm93JztcbmV4cG9ydCB7IF9Sb3cgYXMgUm93IH07XG5pbXBvcnQgX1NhZmVBbmNob3IgZnJvbSAnLi9TYWZlQW5jaG9yJztcbmV4cG9ydCB7IF9TYWZlQW5jaG9yIGFzIFNhZmVBbmNob3IgfTtcbmltcG9ydCBfU3Bpbm5lciBmcm9tICcuL1NwaW5uZXInO1xuZXhwb3J0IHsgX1NwaW5uZXIgYXMgU3Bpbm5lciB9O1xuaW1wb3J0IF9TcGxpdEJ1dHRvbiBmcm9tICcuL1NwbGl0QnV0dG9uJztcbmV4cG9ydCB7IF9TcGxpdEJ1dHRvbiBhcyBTcGxpdEJ1dHRvbiB9O1xuaW1wb3J0IF9UYWIgZnJvbSAnLi9UYWInO1xuZXhwb3J0IHsgX1RhYiBhcyBUYWIgfTtcbmltcG9ydCBfVGFiQ29udGFpbmVyIGZyb20gJy4vVGFiQ29udGFpbmVyJztcbmV4cG9ydCB7IF9UYWJDb250YWluZXIgYXMgVGFiQ29udGFpbmVyIH07XG5pbXBvcnQgX1RhYkNvbnRlbnQgZnJvbSAnLi9UYWJDb250ZW50JztcbmV4cG9ydCB7IF9UYWJDb250ZW50IGFzIFRhYkNvbnRlbnQgfTtcbmltcG9ydCBfVGFibGUgZnJvbSAnLi9UYWJsZSc7XG5leHBvcnQgeyBfVGFibGUgYXMgVGFibGUgfTtcbmltcG9ydCBfVGFiUGFuZSBmcm9tICcuL1RhYlBhbmUnO1xuZXhwb3J0IHsgX1RhYlBhbmUgYXMgVGFiUGFuZSB9O1xuaW1wb3J0IF9UYWJzIGZyb20gJy4vVGFicyc7XG5leHBvcnQgeyBfVGFicyBhcyBUYWJzIH07XG5pbXBvcnQgX1RoZW1lUHJvdmlkZXIgZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcbmV4cG9ydCB7IF9UaGVtZVByb3ZpZGVyIGFzIFRoZW1lUHJvdmlkZXIgfTtcbmltcG9ydCBfVG9nZ2xlQnV0dG9uIGZyb20gJy4vVG9nZ2xlQnV0dG9uJztcbmV4cG9ydCB7IF9Ub2dnbGVCdXR0b24gYXMgVG9nZ2xlQnV0dG9uIH07XG5pbXBvcnQgX1RvZ2dsZUJ1dHRvbkdyb3VwIGZyb20gJy4vVG9nZ2xlQnV0dG9uR3JvdXAnO1xuZXhwb3J0IHsgX1RvZ2dsZUJ1dHRvbkdyb3VwIGFzIFRvZ2dsZUJ1dHRvbkdyb3VwIH07XG5pbXBvcnQgX1Rvb2x0aXAgZnJvbSAnLi9Ub29sdGlwJztcbmV4cG9ydCB7IF9Ub29sdGlwIGFzIFRvb2x0aXAgfTtcbmltcG9ydCBfVG9hc3QgZnJvbSAnLi9Ub2FzdCc7XG5leHBvcnQgeyBfVG9hc3QgYXMgVG9hc3QgfTtcbmltcG9ydCBfVG9hc3RCb2R5IGZyb20gJy4vVG9hc3RCb2R5JztcbmV4cG9ydCB7IF9Ub2FzdEJvZHkgYXMgVG9hc3RCb2R5IH07XG5pbXBvcnQgX1RvYXN0SGVhZGVyIGZyb20gJy4vVG9hc3RIZWFkZXInO1xuZXhwb3J0IHsgX1RvYXN0SGVhZGVyIGFzIFRvYXN0SGVhZGVyIH07IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIjtcbmltcG9ydCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIjtcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZVwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQgYWN0aXZlRWxlbWVudCBmcm9tICdkb20taGVscGVycy9hY3RpdmVFbGVtZW50JztcbmltcG9ydCBjb250YWlucyBmcm9tICdkb20taGVscGVycy9jb250YWlucyc7XG5pbXBvcnQgY2FuVXNlRE9NIGZyb20gJ2RvbS1oZWxwZXJzL2NhblVzZURPTSc7XG5pbXBvcnQgbGlzdGVuIGZyb20gJ2RvbS1oZWxwZXJzL2xpc3Rlbic7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IE1vZGFsTWFuYWdlciBmcm9tICcuL01vZGFsTWFuYWdlcic7XG5pbXBvcnQgb3duZXJEb2N1bWVudCBmcm9tICcuL3V0aWxzL293bmVyRG9jdW1lbnQnO1xuaW1wb3J0IHVzZVdhaXRGb3JET01SZWYgZnJvbSAnLi91dGlscy91c2VXYWl0Rm9yRE9NUmVmJztcblxuZnVuY3Rpb24gb21pdFByb3BzKHByb3BzLCBwcm9wVHlwZXMpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wcyk7XG4gIHZhciBuZXdQcm9wcyA9IHt9O1xuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm9wVHlwZXMsIHByb3ApKSB7XG4gICAgICBuZXdQcm9wc1twcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBuZXdQcm9wcztcbn1cblxudmFyIG1hbmFnZXI7XG4vKipcbiAqIExvdmUgdGhlbSBvciBoYXRlIHRoZW0sIGA8TW9kYWwgLz5gIHByb3ZpZGVzIGEgc29saWQgZm91bmRhdGlvbiBmb3IgY3JlYXRpbmcgZGlhbG9ncywgbGlnaHRib3hlcywgb3Igd2hhdGV2ZXIgZWxzZS5cbiAqIFRoZSBNb2RhbCBjb21wb25lbnQgcmVuZGVycyBpdHMgYGNoaWxkcmVuYCBub2RlIGluIGZyb250IG9mIGEgYmFja2Ryb3AgY29tcG9uZW50LlxuICpcbiAqIFRoZSBNb2RhbCBvZmZlcnMgYSBmZXcgaGVscGZ1bCBmZWF0dXJlcyBvdmVyIHVzaW5nIGp1c3QgYSBgPFBvcnRhbC8+YCBjb21wb25lbnQgYW5kIHNvbWUgc3R5bGVzOlxuICpcbiAqIC0gTWFuYWdlcyBkaWFsb2cgc3RhY2tpbmcgd2hlbiBvbmUtYXQtYS10aW1lIGp1c3QgaXNuJ3QgZW5vdWdoLlxuICogLSBDcmVhdGVzIGEgYmFja2Ryb3AsIGZvciBkaXNhYmxpbmcgaW50ZXJhY3Rpb24gYmVsb3cgdGhlIG1vZGFsLlxuICogLSBJdCBwcm9wZXJseSBtYW5hZ2VzIGZvY3VzOyBtb3ZpbmcgdG8gdGhlIG1vZGFsIGNvbnRlbnQsIGFuZCBrZWVwaW5nIGl0IHRoZXJlIHVudGlsIHRoZSBtb2RhbCBpcyBjbG9zZWQuXG4gKiAtIEl0IGRpc2FibGVzIHNjcm9sbGluZyBvZiB0aGUgcGFnZSBjb250ZW50IHdoaWxlIG9wZW4uXG4gKiAtIEFkZHMgdGhlIGFwcHJvcHJpYXRlIEFSSUEgcm9sZXMgYXJlIGF1dG9tYXRpY2FsbHkuXG4gKiAtIEVhc2lseSBwbHVnZ2FibGUgYW5pbWF0aW9ucyB2aWEgYSBgPFRyYW5zaXRpb24vPmAgY29tcG9uZW50LlxuICpcbiAqIE5vdGUgdGhhdCwgaW4gdGhlIHNhbWUgd2F5IHRoZSBiYWNrZHJvcCBlbGVtZW50IHByZXZlbnRzIHVzZXJzIGZyb20gY2xpY2tpbmcgb3IgaW50ZXJhY3RpbmdcbiAqIHdpdGggdGhlIHBhZ2UgY29udGVudCB1bmRlcm5lYXRoIHRoZSBNb2RhbCwgU2NyZWVuIHJlYWRlcnMgYWxzbyBuZWVkIHRvIGJlIHNpZ25hbGVkIHRvIG5vdCB0b1xuICogaW50ZXJhY3Qgd2l0aCBwYWdlIGNvbnRlbnQgd2hpbGUgdGhlIE1vZGFsIGlzIG9wZW4uIFRvIGRvIHRoaXMsIHdlIHVzZSBhIGNvbW1vbiB0ZWNobmlxdWUgb2YgYXBwbHlpbmdcbiAqIHRoZSBgYXJpYS1oaWRkZW49J3RydWUnYCBhdHRyaWJ1dGUgdG8gdGhlIG5vbi1Nb2RhbCBlbGVtZW50cyBpbiB0aGUgTW9kYWwgYGNvbnRhaW5lcmAuIFRoaXMgbWVhbnMgdGhhdCBmb3JcbiAqIGEgTW9kYWwgdG8gYmUgdHJ1bHkgbW9kYWwsIGl0IHNob3VsZCBoYXZlIGEgYGNvbnRhaW5lcmAgdGhhdCBpcyBfb3V0c2lkZV8geW91ciBhcHAnc1xuICogUmVhY3QgaGllcmFyY2h5IChzdWNoIGFzIHRoZSBkZWZhdWx0OiBkb2N1bWVudC5ib2R5KS5cbiAqL1xuXG52YXIgTW9kYWwgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTW9kYWwsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE1vZGFsKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBfYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIF9hcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoX2FyZ3MpKSB8fCB0aGlzO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgZXhpdGVkOiAhX3RoaXMucHJvcHMuc2hvd1xuICAgIH07XG5cbiAgICBfdGhpcy5vblNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICBjb250YWluZXIgPSBfdGhpcyRwcm9wcy5jb250YWluZXIsXG4gICAgICAgICAgY29udGFpbmVyQ2xhc3NOYW1lID0gX3RoaXMkcHJvcHMuY29udGFpbmVyQ2xhc3NOYW1lLFxuICAgICAgICAgIG9uU2hvdyA9IF90aGlzJHByb3BzLm9uU2hvdztcblxuICAgICAgX3RoaXMuZ2V0TW9kYWxNYW5hZ2VyKCkuYWRkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBjb250YWluZXIsIGNvbnRhaW5lckNsYXNzTmFtZSk7XG5cbiAgICAgIF90aGlzLnJlbW92ZUtleWRvd25MaXN0ZW5lciA9IGxpc3Rlbihkb2N1bWVudCwgJ2tleWRvd24nLCBfdGhpcy5oYW5kbGVEb2N1bWVudEtleURvd24pO1xuICAgICAgX3RoaXMucmVtb3ZlRm9jdXNMaXN0ZW5lciA9IGxpc3Rlbihkb2N1bWVudCwgJ2ZvY3VzJywgLy8gdGhlIHRpbWVvdXQgaXMgbmVjZXNzYXJ5IGIvYyB0aGlzIHdpbGwgcnVuIGJlZm9yZSB0aGUgbmV3IG1vZGFsIGlzIG1vdW50ZWRcbiAgICAgIC8vIGFuZCBzbyBzdGVhbHMgZm9jdXMgZnJvbSBpdFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChfdGhpcy5lbmZvcmNlRm9jdXMpO1xuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIGlmIChvblNob3cpIHtcbiAgICAgICAgb25TaG93KCk7XG4gICAgICB9IC8vIGF1dG9mb2N1cyBhZnRlciBvblNob3csIHRvIG5vdCB0cmlnZ2VyIGEgZm9jdXMgZXZlbnQgZm9yIHByZXZpb3VzXG4gICAgICAvLyBtb2RhbHMgYmVmb3JlIHRoaXMgb25lIGlzIHNob3duLlxuXG5cbiAgICAgIF90aGlzLmF1dG9Gb2N1cygpO1xuICAgIH07XG5cbiAgICBfdGhpcy5vbkhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5nZXRNb2RhbE1hbmFnZXIoKS5yZW1vdmUoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuXG4gICAgICBfdGhpcy5yZW1vdmVLZXlkb3duTGlzdGVuZXIoKTtcblxuICAgICAgX3RoaXMucmVtb3ZlRm9jdXNMaXN0ZW5lcigpO1xuXG4gICAgICBpZiAoX3RoaXMucHJvcHMucmVzdG9yZUZvY3VzKSB7XG4gICAgICAgIF90aGlzLnJlc3RvcmVMYXN0Rm9jdXMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMuc2V0RGlhbG9nUmVmID0gZnVuY3Rpb24gKHJlZikge1xuICAgICAgX3RoaXMuZGlhbG9nID0gcmVmO1xuICAgIH07XG5cbiAgICBfdGhpcy5zZXRCYWNrZHJvcFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIF90aGlzLmJhY2tkcm9wID0gcmVmICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHJlZik7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUhpZGRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZXhpdGVkOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgX3RoaXMub25IaWRlKCk7XG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5vbkV4aXRlZCkge1xuICAgICAgICB2YXIgX3RoaXMkcHJvcHMyO1xuXG4gICAgICAgIChfdGhpcyRwcm9wczIgPSBfdGhpcy5wcm9wcykub25FeGl0ZWQuYXBwbHkoX3RoaXMkcHJvcHMyLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLnByb3BzLm9uQmFja2Ryb3BDbGljaykge1xuICAgICAgICBfdGhpcy5wcm9wcy5vbkJhY2tkcm9wQ2xpY2soZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5iYWNrZHJvcCA9PT0gdHJ1ZSkge1xuICAgICAgICBfdGhpcy5wcm9wcy5vbkhpZGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlRG9jdW1lbnRLZXlEb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChfdGhpcy5wcm9wcy5rZXlib2FyZCAmJiBlLmtleUNvZGUgPT09IDI3ICYmIF90aGlzLmlzVG9wTW9kYWwoKSkge1xuICAgICAgICBpZiAoX3RoaXMucHJvcHMub25Fc2NhcGVLZXlEb3duKSB7XG4gICAgICAgICAgX3RoaXMucHJvcHMub25Fc2NhcGVLZXlEb3duKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMucHJvcHMub25IaWRlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmVuZm9yY2VGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghX3RoaXMucHJvcHMuZW5mb3JjZUZvY3VzIHx8ICFfdGhpcy5faXNNb3VudGVkIHx8ICFfdGhpcy5pc1RvcE1vZGFsKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudEFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50KG93bmVyRG9jdW1lbnQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpKTtcblxuICAgICAgaWYgKF90aGlzLmRpYWxvZyAmJiAhY29udGFpbnMoX3RoaXMuZGlhbG9nLCBjdXJyZW50QWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgX3RoaXMuZGlhbG9nLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLnJlbmRlckJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzMyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgIHJlbmRlckJhY2tkcm9wID0gX3RoaXMkcHJvcHMzLnJlbmRlckJhY2tkcm9wLFxuICAgICAgICAgIFRyYW5zaXRpb24gPSBfdGhpcyRwcm9wczMuYmFja2Ryb3BUcmFuc2l0aW9uO1xuICAgICAgdmFyIGJhY2tkcm9wID0gcmVuZGVyQmFja2Ryb3Aoe1xuICAgICAgICByZWY6IF90aGlzLnNldEJhY2tkcm9wUmVmLFxuICAgICAgICBvbkNsaWNrOiBfdGhpcy5oYW5kbGVCYWNrZHJvcENsaWNrXG4gICAgICB9KTtcblxuICAgICAgaWYgKFRyYW5zaXRpb24pIHtcbiAgICAgICAgYmFja2Ryb3AgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBhcHBlYXI6IHRydWUsXG4gICAgICAgICAgXCJpblwiOiBfdGhpcy5wcm9wcy5zaG93XG4gICAgICAgIH0sIGJhY2tkcm9wKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJhY2tkcm9wO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBNb2RhbC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPSBmdW5jdGlvbiBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5zaG93KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBleGl0ZWQ6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghbmV4dFByb3BzLnRyYW5zaXRpb24pIHtcbiAgICAgIC8vIE90aGVyd2lzZSBsZXQgaGFuZGxlSGlkZGVuIHRha2UgY2FyZSBvZiBtYXJraW5nIGV4aXRlZC5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGV4aXRlZDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICB2YXIgX3Byb3RvID0gTW9kYWwucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2lzTW91bnRlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93KSB7XG4gICAgICB0aGlzLm9uU2hvdygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHZhciB0cmFuc2l0aW9uID0gdGhpcy5wcm9wcy50cmFuc2l0aW9uO1xuXG4gICAgaWYgKHByZXZQcm9wcy5zaG93ICYmICF0aGlzLnByb3BzLnNob3cgJiYgIXRyYW5zaXRpb24pIHtcbiAgICAgIC8vIE90aGVyd2lzZSBoYW5kbGVIaWRkZW4gd2lsbCBjYWxsIHRoaXMuXG4gICAgICB0aGlzLm9uSGlkZSgpO1xuICAgIH0gZWxzZSBpZiAoIXByZXZQcm9wcy5zaG93ICYmIHRoaXMucHJvcHMuc2hvdykge1xuICAgICAgdGhpcy5vblNob3coKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdmFyIF90aGlzJHByb3BzNCA9IHRoaXMucHJvcHMsXG4gICAgICAgIHNob3cgPSBfdGhpcyRwcm9wczQuc2hvdyxcbiAgICAgICAgdHJhbnNpdGlvbiA9IF90aGlzJHByb3BzNC50cmFuc2l0aW9uO1xuICAgIHRoaXMuX2lzTW91bnRlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHNob3cgfHwgdHJhbnNpdGlvbiAmJiAhdGhpcy5zdGF0ZS5leGl0ZWQpIHtcbiAgICAgIHRoaXMub25IaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSA9IGZ1bmN0aW9uIGdldFNuYXBzaG90QmVmb3JlVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChjYW5Vc2VET00gJiYgIXByZXZQcm9wcy5zaG93ICYmIHRoaXMucHJvcHMuc2hvdykge1xuICAgICAgdGhpcy5sYXN0Rm9jdXMgPSBhY3RpdmVFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgX3Byb3RvLmdldE1vZGFsTWFuYWdlciA9IGZ1bmN0aW9uIGdldE1vZGFsTWFuYWdlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5tYW5hZ2VyO1xuICAgIH1cblxuICAgIGlmICghbWFuYWdlcikge1xuICAgICAgbWFuYWdlciA9IG5ldyBNb2RhbE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfTtcblxuICBfcHJvdG8ucmVzdG9yZUxhc3RGb2N1cyA9IGZ1bmN0aW9uIHJlc3RvcmVMYXN0Rm9jdXMoKSB7XG4gICAgLy8gU3VwcG9ydDogPD1JRTExIGRvZXNuJ3Qgc3VwcG9ydCBgZm9jdXMoKWAgb24gc3ZnIGVsZW1lbnRzIChSQjogIzkxNylcbiAgICBpZiAodGhpcy5sYXN0Rm9jdXMgJiYgdGhpcy5sYXN0Rm9jdXMuZm9jdXMpIHtcbiAgICAgIHRoaXMubGFzdEZvY3VzLmZvY3VzKHRoaXMucHJvcHMucmVzdG9yZUZvY3VzT3B0aW9ucyk7XG4gICAgICB0aGlzLmxhc3RGb2N1cyA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5hdXRvRm9jdXMgPSBmdW5jdGlvbiBhdXRvRm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmF1dG9Gb2N1cykgcmV0dXJuO1xuICAgIHZhciBjdXJyZW50QWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQob3duZXJEb2N1bWVudCh0aGlzKSk7XG5cbiAgICBpZiAodGhpcy5kaWFsb2cgJiYgIWNvbnRhaW5zKHRoaXMuZGlhbG9nLCBjdXJyZW50QWN0aXZlRWxlbWVudCkpIHtcbiAgICAgIHRoaXMubGFzdEZvY3VzID0gY3VycmVudEFjdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLmRpYWxvZy5mb2N1cygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaXNUb3BNb2RhbCA9IGZ1bmN0aW9uIGlzVG9wTW9kYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TW9kYWxNYW5hZ2VyKCkuaXNUb3BNb2RhbCh0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyRwcm9wczUgPSB0aGlzLnByb3BzLFxuICAgICAgICBzaG93ID0gX3RoaXMkcHJvcHM1LnNob3csXG4gICAgICAgIGNvbnRhaW5lciA9IF90aGlzJHByb3BzNS5jb250YWluZXIsXG4gICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHM1LmNoaWxkcmVuLFxuICAgICAgICByZW5kZXJEaWFsb2cgPSBfdGhpcyRwcm9wczUucmVuZGVyRGlhbG9nLFxuICAgICAgICBfdGhpcyRwcm9wczUkcm9sZSA9IF90aGlzJHByb3BzNS5yb2xlLFxuICAgICAgICByb2xlID0gX3RoaXMkcHJvcHM1JHJvbGUgPT09IHZvaWQgMCA/ICdkaWFsb2cnIDogX3RoaXMkcHJvcHM1JHJvbGUsXG4gICAgICAgIFRyYW5zaXRpb24gPSBfdGhpcyRwcm9wczUudHJhbnNpdGlvbixcbiAgICAgICAgYmFja2Ryb3AgPSBfdGhpcyRwcm9wczUuYmFja2Ryb3AsXG4gICAgICAgIGNsYXNzTmFtZSA9IF90aGlzJHByb3BzNS5jbGFzc05hbWUsXG4gICAgICAgIHN0eWxlID0gX3RoaXMkcHJvcHM1LnN0eWxlLFxuICAgICAgICBvbkV4aXQgPSBfdGhpcyRwcm9wczUub25FeGl0LFxuICAgICAgICBvbkV4aXRpbmcgPSBfdGhpcyRwcm9wczUub25FeGl0aW5nLFxuICAgICAgICBvbkVudGVyID0gX3RoaXMkcHJvcHM1Lm9uRW50ZXIsXG4gICAgICAgIG9uRW50ZXJpbmcgPSBfdGhpcyRwcm9wczUub25FbnRlcmluZyxcbiAgICAgICAgb25FbnRlcmVkID0gX3RoaXMkcHJvcHM1Lm9uRW50ZXJlZCxcbiAgICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wczUsIFtcInNob3dcIiwgXCJjb250YWluZXJcIiwgXCJjaGlsZHJlblwiLCBcInJlbmRlckRpYWxvZ1wiLCBcInJvbGVcIiwgXCJ0cmFuc2l0aW9uXCIsIFwiYmFja2Ryb3BcIiwgXCJjbGFzc05hbWVcIiwgXCJzdHlsZVwiLCBcIm9uRXhpdFwiLCBcIm9uRXhpdGluZ1wiLCBcIm9uRW50ZXJcIiwgXCJvbkVudGVyaW5nXCIsIFwib25FbnRlcmVkXCJdKTtcblxuICAgIGlmICghKHNob3cgfHwgVHJhbnNpdGlvbiAmJiAhdGhpcy5zdGF0ZS5leGl0ZWQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZGlhbG9nUHJvcHMgPSBfZXh0ZW5kcyh7XG4gICAgICByb2xlOiByb2xlLFxuICAgICAgcmVmOiB0aGlzLnNldERpYWxvZ1JlZixcbiAgICAgIC8vIGFwcGFyZW50bHkgb25seSB3b3JrcyBvbiB0aGUgZGlhbG9nIHJvbGUgZWxlbWVudFxuICAgICAgJ2FyaWEtbW9kYWwnOiByb2xlID09PSAnZGlhbG9nJyA/IHRydWUgOiB1bmRlZmluZWRcbiAgICB9LCBvbWl0UHJvcHMocHJvcHMsIE1vZGFsLnByb3BUeXBlcyksIHtcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgdGFiSW5kZXg6ICctMSdcbiAgICB9KTtcblxuICAgIHZhciBkaWFsb2cgPSByZW5kZXJEaWFsb2cgPyByZW5kZXJEaWFsb2coZGlhbG9nUHJvcHMpIDogUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBkaWFsb2dQcm9wcywgUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCB7XG4gICAgICByb2xlOiAnZG9jdW1lbnQnXG4gICAgfSkpO1xuXG4gICAgaWYgKFRyYW5zaXRpb24pIHtcbiAgICAgIGRpYWxvZyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNpdGlvbiwge1xuICAgICAgICBhcHBlYXI6IHRydWUsXG4gICAgICAgIHVubW91bnRPbkV4aXQ6IHRydWUsXG4gICAgICAgIFwiaW5cIjogc2hvdyxcbiAgICAgICAgb25FeGl0OiBvbkV4aXQsXG4gICAgICAgIG9uRXhpdGluZzogb25FeGl0aW5nLFxuICAgICAgICBvbkV4aXRlZDogdGhpcy5oYW5kbGVIaWRkZW4sXG4gICAgICAgIG9uRW50ZXI6IG9uRW50ZXIsXG4gICAgICAgIG9uRW50ZXJpbmc6IG9uRW50ZXJpbmcsXG4gICAgICAgIG9uRW50ZXJlZDogb25FbnRlcmVkXG4gICAgICB9LCBkaWFsb2cpO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgYmFja2Ryb3AgJiYgdGhpcy5yZW5kZXJCYWNrZHJvcCgpLCBkaWFsb2cpLCBjb250YWluZXIpO1xuICB9O1xuXG4gIHJldHVybiBNb2RhbDtcbn0oUmVhY3QuQ29tcG9uZW50KTsgLy8gZHVtYiBIT0MgZm9yIHRoZSBzYWtlIHJlYWN0LWRvY2dlblxuXG5cbk1vZGFsLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIFNldCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgTW9kYWxcbiAgICovXG4gIHNob3c6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBBIERPTSBlbGVtZW50LCBhIGByZWZgIHRvIGFuIGVsZW1lbnQsIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBlaXRoZXIuIFRoZSBNb2RhbCBpcyBhcHBlbmRlZCB0byBpdCdzIGBjb250YWluZXJgIGVsZW1lbnQuXG4gICAqXG4gICAqIEZvciB0aGUgc2FrZSBvZiBhc3Npc3RpdmUgdGVjaG5vbG9naWVzLCB0aGUgY29udGFpbmVyIHNob3VsZCB1c3VhbGx5IGJlIHRoZSBkb2N1bWVudCBib2R5LCBzbyB0aGF0IHRoZSByZXN0IG9mIHRoZVxuICAgKiBwYWdlIGNvbnRlbnQgY2FuIGJlIHBsYWNlZCBiZWhpbmQgYSB2aXJ0dWFsIGJhY2tkcm9wIGFzIHdlbGwgYXMgYSB2aXN1YWwgb25lLlxuICAgKi9cbiAgY29udGFpbmVyOiBQcm9wVHlwZXMuYW55LFxuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZpcmVkIHdoZW4gdGhlIE1vZGFsIGlzIG9wZW5pbmcuXG4gICAqL1xuICBvblNob3c6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZpcmVkIHdoZW4gZWl0aGVyIHRoZSBiYWNrZHJvcCBpcyBjbGlja2VkLCBvciB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLlxuICAgKlxuICAgKiBUaGUgYG9uSGlkZWAgY2FsbGJhY2sgb25seSBzaWduYWxzIGludGVudCBmcm9tIHRoZSBNb2RhbCxcbiAgICogeW91IG11c3QgYWN0dWFsbHkgc2V0IHRoZSBgc2hvd2AgcHJvcCB0byBgZmFsc2VgIGZvciB0aGUgTW9kYWwgdG8gY2xvc2UuXG4gICAqL1xuICBvbkhpZGU6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBJbmNsdWRlIGEgYmFja2Ryb3AgY29tcG9uZW50LlxuICAgKi9cbiAgYmFja2Ryb3A6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMub25lT2YoWydzdGF0aWMnXSldKSxcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGRpYWxvZyBjb21wb25lbnQuIFVzZWZ1bCBmb3IgY3VzdG9tXG4gICAqIHJlbmRlcmluZy4gKipOb3RlOioqIHRoZSBjb21wb25lbnQgc2hvdWxkIG1ha2Ugc3VyZSB0byBhcHBseSB0aGUgcHJvdmlkZWQgcmVmLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiAgcmVuZGVyRGlhbG9nPXtwcm9wcyA9PiA8TXlEaWFsb2cgey4uLnByb3BzfSAvPn1cbiAgICogYGBgXG4gICAqL1xuICByZW5kZXJEaWFsb2c6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGJhY2tkcm9wIGNvbXBvbmVudC4gVXNlZnVsIGZvciBjdXN0b21cbiAgICogYmFja2Ryb3AgcmVuZGVyaW5nLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiAgcmVuZGVyQmFja2Ryb3A9e3Byb3BzID0+IDxNeUJhY2tkcm9wIHsuLi5wcm9wc30gLz59XG4gICAqIGBgYFxuICAgKi9cbiAgcmVuZGVyQmFja2Ryb3A6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZpcmVkIHdoZW4gdGhlIGVzY2FwZSBrZXksIGlmIHNwZWNpZmllZCBpbiBga2V5Ym9hcmRgLCBpcyBwcmVzc2VkLlxuICAgKi9cbiAgb25Fc2NhcGVLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQSBjYWxsYmFjayBmaXJlZCB3aGVuIHRoZSBiYWNrZHJvcCwgaWYgc3BlY2lmaWVkLCBpcyBjbGlja2VkLlxuICAgKi9cbiAgb25CYWNrZHJvcENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQSBjc3MgY2xhc3Mgb3Igc2V0IG9mIGNsYXNzZXMgYXBwbGllZCB0byB0aGUgbW9kYWwgY29udGFpbmVyIHdoZW4gdGhlIG1vZGFsIGlzIG9wZW4sXG4gICAqIGFuZCByZW1vdmVkIHdoZW4gaXQgaXMgY2xvc2VkLlxuICAgKi9cbiAgY29udGFpbmVyQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGUgbW9kYWwgd2hlbiBlc2NhcGUga2V5IGlzIHByZXNzZWRcbiAgICovXG4gIGtleWJvYXJkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogQSBgcmVhY3QtdHJhbnNpdGlvbi1ncm91cEAyLjAuMGAgYDxUcmFuc2l0aW9uLz5gIGNvbXBvbmVudCB1c2VkXG4gICAqIHRvIGNvbnRyb2wgYW5pbWF0aW9ucyBmb3IgdGhlIGRpYWxvZyBjb21wb25lbnQuXG4gICAqL1xuICB0cmFuc2l0aW9uOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG5cbiAgLyoqXG4gICAqIEEgYHJlYWN0LXRyYW5zaXRpb24tZ3JvdXBAMi4wLjBgIGA8VHJhbnNpdGlvbi8+YCBjb21wb25lbnQgdXNlZFxuICAgKiB0byBjb250cm9sIGFuaW1hdGlvbnMgZm9yIHRoZSBiYWNrZHJvcCBjb21wb25lbnRzLlxuICAgKi9cbiAgYmFja2Ryb3BUcmFuc2l0aW9uOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG5cbiAgLyoqXG4gICAqIFdoZW4gYHRydWVgIFRoZSBtb2RhbCB3aWxsIGF1dG9tYXRpY2FsbHkgc2hpZnQgZm9jdXMgdG8gaXRzZWxmIHdoZW4gaXQgb3BlbnMsIGFuZFxuICAgKiByZXBsYWNlIGl0IHRvIHRoZSBsYXN0IGZvY3VzZWQgZWxlbWVudCB3aGVuIGl0IGNsb3Nlcy4gVGhpcyBhbHNvXG4gICAqIHdvcmtzIGNvcnJlY3RseSB3aXRoIGFueSBNb2RhbCBjaGlsZHJlbiB0aGF0IGhhdmUgdGhlIGBhdXRvRm9jdXNgIHByb3AuXG4gICAqXG4gICAqIEdlbmVyYWxseSB0aGlzIHNob3VsZCBuZXZlciBiZSBzZXQgdG8gYGZhbHNlYCBhcyBpdCBtYWtlcyB0aGUgTW9kYWwgbGVzc1xuICAgKiBhY2Nlc3NpYmxlIHRvIGFzc2lzdGl2ZSB0ZWNobm9sb2dpZXMsIGxpa2Ugc2NyZWVuIHJlYWRlcnMuXG4gICAqL1xuICBhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBXaGVuIGB0cnVlYCBUaGUgbW9kYWwgd2lsbCBwcmV2ZW50IGZvY3VzIGZyb20gbGVhdmluZyB0aGUgTW9kYWwgd2hpbGUgb3Blbi5cbiAgICpcbiAgICogR2VuZXJhbGx5IHRoaXMgc2hvdWxkIG5ldmVyIGJlIHNldCB0byBgZmFsc2VgIGFzIGl0IG1ha2VzIHRoZSBNb2RhbCBsZXNzXG4gICAqIGFjY2Vzc2libGUgdG8gYXNzaXN0aXZlIHRlY2hub2xvZ2llcywgbGlrZSBzY3JlZW4gcmVhZGVycy5cbiAgICovXG4gIGVuZm9yY2VGb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFdoZW4gYHRydWVgIFRoZSBtb2RhbCB3aWxsIHJlc3RvcmUgZm9jdXMgdG8gcHJldmlvdXNseSBmb2N1c2VkIGVsZW1lbnQgb25jZVxuICAgKiBtb2RhbCBpcyBoaWRkZW5cbiAgICovXG4gIHJlc3RvcmVGb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgcGFzc2VkIHRvIGZvY3VzIGZ1bmN0aW9uIHdoZW4gYHJlc3RvcmVGb2N1c2AgaXMgc2V0IHRvIGB0cnVlYFxuICAgKlxuICAgKiBAbGluayAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50L2ZvY3VzI1BhcmFtZXRlcnNcbiAgICovXG4gIHJlc3RvcmVGb2N1c09wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcHJldmVudFNjcm9sbDogUHJvcFR5cGVzLmJvb2xcbiAgfSksXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGJlZm9yZSB0aGUgTW9kYWwgdHJhbnNpdGlvbnMgaW5cbiAgICovXG4gIG9uRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCBhcyB0aGUgTW9kYWwgYmVnaW5zIHRvIHRyYW5zaXRpb24gaW5cbiAgICovXG4gIG9uRW50ZXJpbmc6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCBhZnRlciB0aGUgTW9kYWwgZmluaXNoZXMgdHJhbnNpdGlvbmluZyBpblxuICAgKi9cbiAgb25FbnRlcmVkOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSBNb2RhbCB0cmFuc2l0aW9ucyBvdXRcbiAgICovXG4gIG9uRXhpdDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGFzIHRoZSBNb2RhbCBiZWdpbnMgdG8gdHJhbnNpdGlvbiBvdXRcbiAgICovXG4gIG9uRXhpdGluZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGFmdGVyIHRoZSBNb2RhbCBmaW5pc2hlcyB0cmFuc2l0aW9uaW5nIG91dFxuICAgKi9cbiAgb25FeGl0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIE1vZGFsTWFuYWdlciBpbnN0YW5jZSB1c2VkIHRvIHRyYWNrIGFuZCBtYW5hZ2UgdGhlIHN0YXRlIG9mIG9wZW5cbiAgICogTW9kYWxzLiBVc2VmdWwgd2hlbiBjdXN0b21pemluZyBob3cgbW9kYWxzIGludGVyYWN0IHdpdGhpbiBhIGNvbnRhaW5lclxuICAgKi9cbiAgbWFuYWdlcjogUHJvcFR5cGVzLm9iamVjdFxufTtcbk1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2hvdzogZmFsc2UsXG4gIHJvbGU6ICdkaWFsb2cnLFxuICBiYWNrZHJvcDogdHJ1ZSxcbiAga2V5Ym9hcmQ6IHRydWUsXG4gIGF1dG9Gb2N1czogdHJ1ZSxcbiAgZW5mb3JjZUZvY3VzOiB0cnVlLFxuICByZXN0b3JlRm9jdXM6IHRydWUsXG4gIG9uSGlkZTogZnVuY3Rpb24gb25IaWRlKCkge30sXG4gIHJlbmRlckJhY2tkcm9wOiBmdW5jdGlvbiByZW5kZXJCYWNrZHJvcChwcm9wcykge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHByb3BzKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZm9yd2FyZFJlZihDb21wb25lbnQpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2Rpc3BsYXktbmFtZVxuICB2YXIgTW9kYWxXaXRoQ29udGFpbmVyID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikge1xuICAgIHZhciByZXNvbHZlZCA9IHVzZVdhaXRGb3JET01SZWYocHJvcHMuY29udGFpbmVyKTtcbiAgICByZXR1cm4gcmVzb2x2ZWQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICByZWY6IHJlZixcbiAgICAgIGNvbnRhaW5lcjogcmVzb2x2ZWRcbiAgICB9KSkgOiBudWxsO1xuICB9KTtcbiAgTW9kYWxXaXRoQ29udGFpbmVyLk1hbmFnZXIgPSBNb2RhbE1hbmFnZXI7XG4gIE1vZGFsV2l0aENvbnRhaW5lci5fSW5uZXIgPSBDb21wb25lbnQ7XG4gIHJldHVybiBNb2RhbFdpdGhDb250YWluZXI7XG59XG5cbnZhciBNb2RhbFdpdGhDb250YWluZXIgPSBmb3J3YXJkUmVmKE1vZGFsKTtcbk1vZGFsV2l0aENvbnRhaW5lci5NYW5hZ2VyID0gTW9kYWxNYW5hZ2VyO1xuZXhwb3J0IGRlZmF1bHQgTW9kYWxXaXRoQ29udGFpbmVyOyIsImltcG9ydCBhZGRDbGFzcyBmcm9tICdkb20taGVscGVycy9hZGRDbGFzcyc7XG5pbXBvcnQgcmVtb3ZlQ2xhc3MgZnJvbSAnZG9tLWhlbHBlcnMvcmVtb3ZlQ2xhc3MnO1xuaW1wb3J0IGNzcyBmcm9tICdkb20taGVscGVycy9jc3MnO1xuaW1wb3J0IGdldFNjcm9sbGJhclNpemUgZnJvbSAnZG9tLWhlbHBlcnMvc2Nyb2xsYmFyU2l6ZSc7XG5pbXBvcnQgaXNPdmVyZmxvd2luZyBmcm9tICcuL3V0aWxzL2lzT3ZlcmZsb3dpbmcnO1xuaW1wb3J0IHsgYXJpYUhpZGRlbiwgaGlkZVNpYmxpbmdzLCBzaG93U2libGluZ3MgfSBmcm9tICcuL3V0aWxzL21hbmFnZUFyaWFIaWRkZW4nO1xuXG5mdW5jdGlvbiBmaW5kSW5kZXhPZihhcnIsIGNiKSB7XG4gIHZhciBpZHggPSAtMTtcbiAgYXJyLnNvbWUoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICBpZiAoY2IoZCwgaSkpIHtcbiAgICAgIGlkeCA9IGk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICByZXR1cm4gaWR4O1xufVxuLyoqXG4gKiBQcm9wZXIgc3RhdGUgbWFuYWdlbWVudCBmb3IgY29udGFpbmVycyBhbmQgdGhlIG1vZGFscyBpbiB0aG9zZSBjb250YWluZXJzLlxuICpcbiAqIEBpbnRlcm5hbCBVc2VkIGJ5IHRoZSBNb2RhbCB0byBlbnN1cmUgcHJvcGVyIHN0eWxpbmcgb2YgY29udGFpbmVycy5cbiAqL1xuXG5cbnZhciBNb2RhbE1hbmFnZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNb2RhbE1hbmFnZXIoX3RlbXApIHtcbiAgICB2YXIgX3JlZiA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wLFxuICAgICAgICBfcmVmJGhpZGVTaWJsaW5nTm9kZXMgPSBfcmVmLmhpZGVTaWJsaW5nTm9kZXMsXG4gICAgICAgIGhpZGVTaWJsaW5nTm9kZXMgPSBfcmVmJGhpZGVTaWJsaW5nTm9kZXMgPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmJGhpZGVTaWJsaW5nTm9kZXMsXG4gICAgICAgIF9yZWYkaGFuZGxlQ29udGFpbmVyTyA9IF9yZWYuaGFuZGxlQ29udGFpbmVyT3ZlcmZsb3csXG4gICAgICAgIGhhbmRsZUNvbnRhaW5lck92ZXJmbG93ID0gX3JlZiRoYW5kbGVDb250YWluZXJPID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZiRoYW5kbGVDb250YWluZXJPO1xuXG4gICAgdGhpcy5oaWRlU2libGluZ05vZGVzID0gaGlkZVNpYmxpbmdOb2RlcztcbiAgICB0aGlzLmhhbmRsZUNvbnRhaW5lck92ZXJmbG93ID0gaGFuZGxlQ29udGFpbmVyT3ZlcmZsb3c7XG4gICAgdGhpcy5tb2RhbHMgPSBbXTtcbiAgICB0aGlzLmNvbnRhaW5lcnMgPSBbXTtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLnNjcm9sbGJhclNpemUgPSBnZXRTY3JvbGxiYXJTaXplKCk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTW9kYWxNYW5hZ2VyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaXNDb250YWluZXJPdmVyZmxvd2luZyA9IGZ1bmN0aW9uIGlzQ29udGFpbmVyT3ZlcmZsb3dpbmcobW9kYWwpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YVt0aGlzLmNvbnRhaW5lckluZGV4RnJvbU1vZGFsKG1vZGFsKV07XG4gICAgcmV0dXJuIGRhdGEgJiYgZGF0YS5vdmVyZmxvd2luZztcbiAgfTtcblxuICBfcHJvdG8uY29udGFpbmVySW5kZXhGcm9tTW9kYWwgPSBmdW5jdGlvbiBjb250YWluZXJJbmRleEZyb21Nb2RhbChtb2RhbCkge1xuICAgIHJldHVybiBmaW5kSW5kZXhPZih0aGlzLmRhdGEsIGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZC5tb2RhbHMuaW5kZXhPZihtb2RhbCkgIT09IC0xO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5zZXRDb250YWluZXJTdHlsZSA9IGZ1bmN0aW9uIHNldENvbnRhaW5lclN0eWxlKGNvbnRhaW5lclN0YXRlLCBjb250YWluZXIpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICB9OyAvLyB3ZSBhcmUgb25seSBpbnRlcmVzdGVkIGluIHRoZSBhY3R1YWwgYHN0eWxlYCBoZXJlXG4gICAgLy8gYmVjYXVzZSB3ZSB3aWxsIG92ZXJyaWRlIGl0XG5cbiAgICBjb250YWluZXJTdGF0ZS5zdHlsZSA9IHtcbiAgICAgIG92ZXJmbG93OiBjb250YWluZXIuc3R5bGUub3ZlcmZsb3csXG4gICAgICBwYWRkaW5nUmlnaHQ6IGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nUmlnaHRcbiAgICB9O1xuXG4gICAgaWYgKGNvbnRhaW5lclN0YXRlLm92ZXJmbG93aW5nKSB7XG4gICAgICAvLyB1c2UgY29tcHV0ZWQgc3R5bGUsIGhlcmUgdG8gZ2V0IHRoZSByZWFsIHBhZGRpbmdcbiAgICAgIC8vIHRvIGFkZCBvdXIgc2Nyb2xsYmFyIHdpZHRoXG4gICAgICBzdHlsZS5wYWRkaW5nUmlnaHQgPSBwYXJzZUludChjc3MoY29udGFpbmVyLCAncGFkZGluZ1JpZ2h0JykgfHwgMCwgMTApICsgdGhpcy5zY3JvbGxiYXJTaXplICsgXCJweFwiO1xuICAgIH1cblxuICAgIGNzcyhjb250YWluZXIsIHN0eWxlKTtcbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlQ29udGFpbmVyU3R5bGUgPSBmdW5jdGlvbiByZW1vdmVDb250YWluZXJTdHlsZShjb250YWluZXJTdGF0ZSwgY29udGFpbmVyKSB7XG4gICAgdmFyIHN0eWxlID0gY29udGFpbmVyU3RhdGUuc3R5bGU7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgY29udGFpbmVyLnN0eWxlW2tleV0gPSBzdHlsZVtrZXldO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5hZGQgPSBmdW5jdGlvbiBhZGQobW9kYWwsIGNvbnRhaW5lciwgY2xhc3NOYW1lKSB7XG4gICAgdmFyIG1vZGFsSWR4ID0gdGhpcy5tb2RhbHMuaW5kZXhPZihtb2RhbCk7XG4gICAgdmFyIGNvbnRhaW5lcklkeCA9IHRoaXMuY29udGFpbmVycy5pbmRleE9mKGNvbnRhaW5lcik7XG5cbiAgICBpZiAobW9kYWxJZHggIT09IC0xKSB7XG4gICAgICByZXR1cm4gbW9kYWxJZHg7XG4gICAgfVxuXG4gICAgbW9kYWxJZHggPSB0aGlzLm1vZGFscy5sZW5ndGg7XG4gICAgdGhpcy5tb2RhbHMucHVzaChtb2RhbCk7XG5cbiAgICBpZiAodGhpcy5oaWRlU2libGluZ05vZGVzKSB7XG4gICAgICBoaWRlU2libGluZ3MoY29udGFpbmVyLCBtb2RhbCk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5lcklkeCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZGF0YVtjb250YWluZXJJZHhdLm1vZGFscy5wdXNoKG1vZGFsKTtcbiAgICAgIHJldHVybiBtb2RhbElkeDtcbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIG1vZGFsczogW21vZGFsXSxcbiAgICAgIC8vIHJpZ2h0IG5vdyBvbmx5IHRoZSBmaXJzdCBtb2RhbCBvZiBhIGNvbnRhaW5lciB3aWxsIGhhdmUgaXRzIGNsYXNzZXMgYXBwbGllZFxuICAgICAgY2xhc3NlczogY2xhc3NOYW1lID8gY2xhc3NOYW1lLnNwbGl0KC9cXHMrLykgOiBbXSxcbiAgICAgIG92ZXJmbG93aW5nOiBpc092ZXJmbG93aW5nKGNvbnRhaW5lcilcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaGFuZGxlQ29udGFpbmVyT3ZlcmZsb3cpIHtcbiAgICAgIHRoaXMuc2V0Q29udGFpbmVyU3R5bGUoZGF0YSwgY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBkYXRhLmNsYXNzZXMuZm9yRWFjaChhZGRDbGFzcy5iaW5kKG51bGwsIGNvbnRhaW5lcikpO1xuICAgIHRoaXMuY29udGFpbmVycy5wdXNoKGNvbnRhaW5lcik7XG4gICAgdGhpcy5kYXRhLnB1c2goZGF0YSk7XG4gICAgcmV0dXJuIG1vZGFsSWR4O1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUobW9kYWwpIHtcbiAgICB2YXIgbW9kYWxJZHggPSB0aGlzLm1vZGFscy5pbmRleE9mKG1vZGFsKTtcblxuICAgIGlmIChtb2RhbElkeCA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY29udGFpbmVySWR4ID0gdGhpcy5jb250YWluZXJJbmRleEZyb21Nb2RhbChtb2RhbCk7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGFbY29udGFpbmVySWR4XTtcbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJzW2NvbnRhaW5lcklkeF07XG4gICAgZGF0YS5tb2RhbHMuc3BsaWNlKGRhdGEubW9kYWxzLmluZGV4T2YobW9kYWwpLCAxKTtcbiAgICB0aGlzLm1vZGFscy5zcGxpY2UobW9kYWxJZHgsIDEpOyAvLyBpZiB0aGF0IHdhcyB0aGUgbGFzdCBtb2RhbCBpbiBhIGNvbnRhaW5lcixcbiAgICAvLyBjbGVhbiB1cCB0aGUgY29udGFpbmVyXG5cbiAgICBpZiAoZGF0YS5tb2RhbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBkYXRhLmNsYXNzZXMuZm9yRWFjaChyZW1vdmVDbGFzcy5iaW5kKG51bGwsIGNvbnRhaW5lcikpO1xuXG4gICAgICBpZiAodGhpcy5oYW5kbGVDb250YWluZXJPdmVyZmxvdykge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbnRhaW5lclN0eWxlKGRhdGEsIGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmhpZGVTaWJsaW5nTm9kZXMpIHtcbiAgICAgICAgc2hvd1NpYmxpbmdzKGNvbnRhaW5lciwgbW9kYWwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lcnMuc3BsaWNlKGNvbnRhaW5lcklkeCwgMSk7XG4gICAgICB0aGlzLmRhdGEuc3BsaWNlKGNvbnRhaW5lcklkeCwgMSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhpZGVTaWJsaW5nTm9kZXMpIHtcbiAgICAgIC8vIG90aGVyd2lzZSBtYWtlIHN1cmUgdGhlIG5leHQgdG9wIG1vZGFsIGlzIHZpc2libGUgdG8gYSBTUlxuICAgICAgdmFyIF9kYXRhJG1vZGFscyA9IGRhdGEubW9kYWxzW2RhdGEubW9kYWxzLmxlbmd0aCAtIDFdLFxuICAgICAgICAgIGJhY2tkcm9wID0gX2RhdGEkbW9kYWxzLmJhY2tkcm9wLFxuICAgICAgICAgIGRpYWxvZyA9IF9kYXRhJG1vZGFscy5kaWFsb2c7XG4gICAgICBhcmlhSGlkZGVuKGZhbHNlLCBkaWFsb2cpO1xuICAgICAgYXJpYUhpZGRlbihmYWxzZSwgYmFja2Ryb3ApO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaXNUb3BNb2RhbCA9IGZ1bmN0aW9uIGlzVG9wTW9kYWwobW9kYWwpIHtcbiAgICByZXR1cm4gISF0aGlzLm1vZGFscy5sZW5ndGggJiYgdGhpcy5tb2RhbHNbdGhpcy5tb2RhbHMubGVuZ3RoIC0gMV0gPT09IG1vZGFsO1xuICB9O1xuXG4gIHJldHVybiBNb2RhbE1hbmFnZXI7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsTWFuYWdlcjsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiO1xuaW1wb3J0IFBvcHBlckpTIGZyb20gJ3BvcHBlci5qcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgdXNlQ2FsbGJhY2tSZWYgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlQ2FsbGJhY2tSZWYnO1xuaW1wb3J0IHVzZU1lcmdlZFJlZnMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlTWVyZ2VkUmVmcyc7XG5pbXBvcnQgdXNlUG9wcGVyIGZyb20gJy4vdXNlUG9wcGVyJztcbmltcG9ydCB1c2VSb290Q2xvc2UgZnJvbSAnLi91c2VSb290Q2xvc2UnO1xuaW1wb3J0IHVzZVdhaXRGb3JET01SZWYgZnJvbSAnLi91dGlscy91c2VXYWl0Rm9yRE9NUmVmJztcbi8qKlxuICogQnVpbHQgb24gdG9wIG9mIGBQb3BwZXIuanNgLCB0aGUgb3ZlcmxheSBjb21wb25lbnQgaXNcbiAqIGdyZWF0IGZvciBjdXN0b20gdG9vbHRpcCBvdmVybGF5cy5cbiAqL1xuXG52YXIgT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCBvdXRlclJlZikge1xuICB2YXIgZmxpcCA9IHByb3BzLmZsaXAsXG4gICAgICBwbGFjZW1lbnQgPSBwcm9wcy5wbGFjZW1lbnQsXG4gICAgICBjb250YWluZXJQYWRkaW5nID0gcHJvcHMuY29udGFpbmVyUGFkZGluZyxcbiAgICAgIF9wcm9wcyRwb3BwZXJDb25maWcgPSBwcm9wcy5wb3BwZXJDb25maWcsXG4gICAgICBwb3BwZXJDb25maWcgPSBfcHJvcHMkcG9wcGVyQ29uZmlnID09PSB2b2lkIDAgPyB7fSA6IF9wcm9wcyRwb3BwZXJDb25maWcsXG4gICAgICBUcmFuc2l0aW9uID0gcHJvcHMudHJhbnNpdGlvbjtcblxuICB2YXIgX3VzZUNhbGxiYWNrUmVmID0gdXNlQ2FsbGJhY2tSZWYoKSxcbiAgICAgIHJvb3RFbGVtZW50ID0gX3VzZUNhbGxiYWNrUmVmWzBdLFxuICAgICAgYXR0YWNoUmVmID0gX3VzZUNhbGxiYWNrUmVmWzFdO1xuXG4gIHZhciBfdXNlQ2FsbGJhY2tSZWYyID0gdXNlQ2FsbGJhY2tSZWYoKSxcbiAgICAgIGFycm93RWxlbWVudCA9IF91c2VDYWxsYmFja1JlZjJbMF0sXG4gICAgICBhdHRhY2hBcnJvd1JlZiA9IF91c2VDYWxsYmFja1JlZjJbMV07XG5cbiAgdmFyIG1lcmdlZFJlZiA9IHVzZU1lcmdlZFJlZnMoYXR0YWNoUmVmLCBvdXRlclJlZik7XG4gIHZhciBjb250YWluZXIgPSB1c2VXYWl0Rm9yRE9NUmVmKHByb3BzLmNvbnRhaW5lcik7XG4gIHZhciB0YXJnZXQgPSB1c2VXYWl0Rm9yRE9NUmVmKHByb3BzLnRhcmdldCk7XG5cbiAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKCFwcm9wcy5zaG93KSxcbiAgICAgIGV4aXRlZCA9IF91c2VTdGF0ZVswXSxcbiAgICAgIHNldEV4aXRlZCA9IF91c2VTdGF0ZVsxXTtcblxuICB2YXIgX3BvcHBlckNvbmZpZyRtb2RpZmllID0gcG9wcGVyQ29uZmlnLm1vZGlmaWVycyxcbiAgICAgIG1vZGlmaWVycyA9IF9wb3BwZXJDb25maWckbW9kaWZpZSA9PT0gdm9pZCAwID8ge30gOiBfcG9wcGVyQ29uZmlnJG1vZGlmaWU7XG5cbiAgdmFyIF91c2VQb3BwZXIgPSB1c2VQb3BwZXIodGFyZ2V0LCByb290RWxlbWVudCwgX2V4dGVuZHMoe30sIHBvcHBlckNvbmZpZywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50IHx8ICdib3R0b20nLFxuICAgIGVuYWJsZUV2ZW50czogcHJvcHMuc2hvdyxcbiAgICBtb2RpZmllcnM6IF9leHRlbmRzKHt9LCBtb2RpZmllcnMsIHtcbiAgICAgIHByZXZlbnRPdmVyZmxvdzogX2V4dGVuZHMoe1xuICAgICAgICBwYWRkaW5nOiBjb250YWluZXJQYWRkaW5nIHx8IDVcbiAgICAgIH0sIG1vZGlmaWVycy5wcmV2ZW50T3ZlcmZsb3cpLFxuICAgICAgYXJyb3c6IF9leHRlbmRzKHt9LCBtb2RpZmllcnMuYXJyb3csIHtcbiAgICAgICAgZW5hYmxlZDogISFhcnJvd0VsZW1lbnQsXG4gICAgICAgIGVsZW1lbnQ6IGFycm93RWxlbWVudFxuICAgICAgfSksXG4gICAgICBmbGlwOiBfZXh0ZW5kcyh7XG4gICAgICAgIGVuYWJsZWQ6ICEhZmxpcFxuICAgICAgfSwgbW9kaWZpZXJzLnByZXZlbnRPdmVyZmxvdylcbiAgICB9KVxuICB9KSksXG4gICAgICBzdHlsZXMgPSBfdXNlUG9wcGVyLnN0eWxlcyxcbiAgICAgIGFycm93U3R5bGVzID0gX3VzZVBvcHBlci5hcnJvd1N0eWxlcyxcbiAgICAgIHBvcHBlciA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF91c2VQb3BwZXIsIFtcInN0eWxlc1wiLCBcImFycm93U3R5bGVzXCJdKTtcblxuICBpZiAocHJvcHMuc2hvdykge1xuICAgIGlmIChleGl0ZWQpIHNldEV4aXRlZChmYWxzZSk7XG4gIH0gZWxzZSBpZiAoIXByb3BzLnRyYW5zaXRpb24gJiYgIWV4aXRlZCkge1xuICAgIHNldEV4aXRlZCh0cnVlKTtcbiAgfVxuXG4gIHZhciBoYW5kbGVIaWRkZW4gPSBmdW5jdGlvbiBoYW5kbGVIaWRkZW4oKSB7XG4gICAgc2V0RXhpdGVkKHRydWUpO1xuXG4gICAgaWYgKHByb3BzLm9uRXhpdGVkKSB7XG4gICAgICBwcm9wcy5vbkV4aXRlZC5hcHBseShwcm9wcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07IC8vIERvbid0IHVuLXJlbmRlciB0aGUgb3ZlcmxheSB3aGlsZSBpdCdzIHRyYW5zaXRpb25pbmcgb3V0LlxuXG5cbiAgdmFyIG1vdW50T3ZlcmxheSA9IHByb3BzLnNob3cgfHwgVHJhbnNpdGlvbiAmJiAhZXhpdGVkO1xuICB1c2VSb290Q2xvc2Uocm9vdEVsZW1lbnQsIHByb3BzLm9uSGlkZSwge1xuICAgIGRpc2FibGVkOiAhcHJvcHMucm9vdENsb3NlIHx8IHByb3BzLnJvb3RDbG9zZURpc2FibGVkLFxuICAgIGNsaWNrVHJpZ2dlcjogcHJvcHMucm9vdENsb3NlRXZlbnRcbiAgfSk7XG5cbiAgaWYgKCFtb3VudE92ZXJsYXkpIHtcbiAgICAvLyBEb24ndCBib3RoZXIgc2hvd2luZyBhbnl0aGluZyBpZiB3ZSBkb24ndCBoYXZlIHRvLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIGNoaWxkID0gcHJvcHMuY2hpbGRyZW4oX2V4dGVuZHMoe30sIHBvcHBlciwge1xuICAgIHNob3c6IHByb3BzLnNob3csXG4gICAgcHJvcHM6IHtcbiAgICAgIHN0eWxlOiBzdHlsZXMsXG4gICAgICByZWY6IG1lcmdlZFJlZlxuICAgIH0sXG4gICAgYXJyb3dQcm9wczoge1xuICAgICAgc3R5bGU6IGFycm93U3R5bGVzLFxuICAgICAgcmVmOiBhdHRhY2hBcnJvd1JlZlxuICAgIH1cbiAgfSkpO1xuXG4gIGlmIChUcmFuc2l0aW9uKSB7XG4gICAgdmFyIG9uRXhpdCA9IHByb3BzLm9uRXhpdCxcbiAgICAgICAgb25FeGl0aW5nID0gcHJvcHMub25FeGl0aW5nLFxuICAgICAgICBvbkVudGVyID0gcHJvcHMub25FbnRlcixcbiAgICAgICAgb25FbnRlcmluZyA9IHByb3BzLm9uRW50ZXJpbmcsXG4gICAgICAgIG9uRW50ZXJlZCA9IHByb3BzLm9uRW50ZXJlZDtcbiAgICBjaGlsZCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhbnNpdGlvbiwge1xuICAgICAgXCJpblwiOiBwcm9wcy5zaG93LFxuICAgICAgYXBwZWFyOiB0cnVlLFxuICAgICAgb25FeGl0OiBvbkV4aXQsXG4gICAgICBvbkV4aXRpbmc6IG9uRXhpdGluZyxcbiAgICAgIG9uRXhpdGVkOiBoYW5kbGVIaWRkZW4sXG4gICAgICBvbkVudGVyOiBvbkVudGVyLFxuICAgICAgb25FbnRlcmluZzogb25FbnRlcmluZyxcbiAgICAgIG9uRW50ZXJlZDogb25FbnRlcmVkXG4gICAgfSwgY2hpbGQpO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRhaW5lciA/IFJlYWN0RE9NLmNyZWF0ZVBvcnRhbChjaGlsZCwgY29udGFpbmVyKSA6IG51bGw7XG59KTtcbk92ZXJsYXkuZGlzcGxheU5hbWUgPSAnT3ZlcmxheSc7XG5PdmVybGF5LnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIFNldCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgT3ZlcmxheVxuICAgKi9cbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqIFNwZWNpZnkgd2hlcmUgdGhlIG92ZXJsYXkgZWxlbWVudCBpcyBwb3NpdGlvbmVkIGluIHJlbGF0aW9uIHRvIHRoZSB0YXJnZXQgZWxlbWVudCAqL1xuICBwbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZihQb3BwZXJKUy5wbGFjZW1lbnRzKSxcblxuICAvKipcbiAgICogQSBET00gRWxlbWVudCwgUmVmIHRvIGFuIGVsZW1lbnQsIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBlaXRoZXIuIFRoZSBgdGFyZ2V0YCBlbGVtZW50IGlzIHdoZXJlXG4gICAqIHRoZSBvdmVybGF5IGlzIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8uXG4gICAqL1xuICB0YXJnZXQ6IFByb3BUeXBlcy5hbnksXG5cbiAgLyoqXG4gICAqIEEgRE9NIEVsZW1lbnQsIFJlZiB0byBhbiBlbGVtZW50LCBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgZWl0aGVyLiBUaGUgYGNvbnRhaW5lcmAgd2lsbCBoYXZlIHRoZSBQb3J0YWwgY2hpbGRyZW5cbiAgICogYXBwZW5kZWQgdG8gaXQuXG4gICAqL1xuICBjb250YWluZXI6IFByb3BUeXBlcy5hbnksXG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgdGhlIFBvcHBlci5qcyBgZmxpcGAgbW9kaWZpZXIsIGFsbG93aW5nIHRoZSBPdmVybGF5IHRvXG4gICAqIGF1dG9tYXRpY2FsbHkgYWRqdXN0IGl0J3MgcGxhY2VtZW50IGluIGNhc2Ugb2Ygb3ZlcmxhcCB3aXRoIHRoZSB2aWV3cG9ydCBvciB0b2dnbGUuXG4gICAqIFJlZmVyIHRvIHRoZSBbZmxpcCBkb2NzXShodHRwczovL3BvcHBlci5qcy5vcmcvcG9wcGVyLWRvY3VtZW50YXRpb24uaHRtbCNtb2RpZmllcnMuLmZsaXAuZW5hYmxlZCkgZm9yIG1vcmUgaW5mb1xuICAgKi9cbiAgZmxpcDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIEEgcmVuZGVyIHByb3AgdGhhdCByZXR1cm5zIGFuIGVsZW1lbnQgdG8gb3ZlcmxheSBhbmQgcG9zaXRpb24uIFNlZVxuICAgKiB0aGUgW3JlYWN0LXBvcHBlciBkb2N1bWVudGF0aW9uXShodHRwczovL2dpdGh1Yi5jb20vRmV6VnJhc3RhL3JlYWN0LXBvcHBlciNjaGlsZHJlbikgZm9yIG1vcmUgaW5mby5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9uICh7XG4gICAqICAgc2hvdzogYm9vbGVhbixcbiAgICogICBwbGFjZW1lbnQ6IFBsYWNlbWVudCxcbiAgICogICBvdXRPZkJvdW5kYXJpZXM6ID9ib29sZWFuLFxuICAgKiAgIHNjaGVkdWxlVXBkYXRlOiAoKSA9PiB2b2lkLFxuICAgKiAgIHByb3BzOiB7XG4gICAqICAgICByZWY6ICg/SFRNTEVsZW1lbnQpID0+IHZvaWQsXG4gICAqICAgICBzdHlsZTogeyBbc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0sXG4gICAqICAgICBhcmlhLWxhYmVsbGVkYnk6ID9zdHJpbmdcbiAgICogICB9LFxuICAgKiAgIGFycm93UHJvcHM6IHtcbiAgICogICAgIHJlZjogKD9IVE1MRWxlbWVudCkgPT4gdm9pZCxcbiAgICogICAgIHN0eWxlOiB7IFtzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfSxcbiAgICogICB9LFxuICAgKiB9KSA9PiBSZWFjdC5FbGVtZW50fVxuICAgKi9cbiAgY2hpbGRyZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENvbnRyb2wgaG93IG11Y2ggc3BhY2UgdGhlcmUgaXMgYmV0d2VlbiB0aGUgZWRnZSBvZiB0aGUgYm91bmRhcnkgZWxlbWVudCBhbmQgb3ZlcmxheS5cbiAgICogQSBjb252ZW5pZW5jZSBzaG9ydGN1dCB0byBzZXR0aW5nIGBwb3BwZXJDb25maWcubW9kZmllcnMucHJldmVudE92ZXJmbG93LnBhZGRpbmdgXG4gICAqL1xuICBjb250YWluZXJQYWRkaW5nOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBwb3BwZXIgb3B0aW9ucyBhbmQgcHJvcHMgcGFzc2VkIGRpcmVjdGx5IHRvIHJlYWN0LXBvcHBlcidzIFBvcHBlciBjb21wb25lbnQuXG4gICAqL1xuICBwb3BwZXJDb25maWc6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgd2hldGhlciB0aGUgb3ZlcmxheSBzaG91bGQgdHJpZ2dlciBgb25IaWRlYCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIHRoZSBvdmVybGF5XG4gICAqL1xuICByb290Q2xvc2U6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGV2ZW50IGZvciB0b2dnbGluZyBvdmVybGF5XG4gICAqL1xuICByb290Q2xvc2VFdmVudDogUHJvcFR5cGVzLm9uZU9mKFsnY2xpY2snLCAnbW91c2Vkb3duJ10pLFxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGRpc2FibGVkIGZvciBkaXNhYmxlIFJvb3RDbG9zZVdyYXBwZXJcbiAgICovXG4gIHJvb3RDbG9zZURpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogQSBDYWxsYmFjayBmaXJlZCBieSB0aGUgT3ZlcmxheSB3aGVuIGl0IHdpc2hlcyB0byBiZSBoaWRkZW4uXG4gICAqXG4gICAqIF9fcmVxdWlyZWRfXyB3aGVuIGByb290Q2xvc2VgIGlzIGB0cnVlYC5cbiAgICpcbiAgICogQHR5cGUgZnVuY1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiBvbkhpZGUocHJvcHMpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSBQcm9wVHlwZXMuZnVuYztcblxuICAgIGlmIChwcm9wcy5yb290Q2xvc2UpIHtcbiAgICAgIHByb3BUeXBlID0gcHJvcFR5cGUuaXNSZXF1aXJlZDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcFR5cGUuYXBwbHkodm9pZCAwLCBbcHJvcHNdLmNvbmNhdChhcmdzKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEEgYHJlYWN0LXRyYW5zaXRpb24tZ3JvdXBAMi4wLjBgIGA8VHJhbnNpdGlvbi8+YCBjb21wb25lbnRcbiAgICogdXNlZCB0byBhbmltYXRlIHRoZSBvdmVybGF5IGFzIGl0IGNoYW5nZXMgdmlzaWJpbGl0eS5cbiAgICovXG4gIHRyYW5zaXRpb246IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgZmlyZWQgYmVmb3JlIHRoZSBPdmVybGF5IHRyYW5zaXRpb25zIGluXG4gICAqL1xuICBvbkVudGVyOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgZmlyZWQgYXMgdGhlIE92ZXJsYXkgYmVnaW5zIHRvIHRyYW5zaXRpb24gaW5cbiAgICovXG4gIG9uRW50ZXJpbmc6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCBhZnRlciB0aGUgT3ZlcmxheSBmaW5pc2hlcyB0cmFuc2l0aW9uaW5nIGluXG4gICAqL1xuICBvbkVudGVyZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCByaWdodCBiZWZvcmUgdGhlIE92ZXJsYXkgdHJhbnNpdGlvbnMgb3V0XG4gICAqL1xuICBvbkV4aXQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCBhcyB0aGUgT3ZlcmxheSBiZWdpbnMgdG8gdHJhbnNpdGlvbiBvdXRcbiAgICovXG4gIG9uRXhpdGluZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGFmdGVyIHRoZSBPdmVybGF5IGZpbmlzaGVzIHRyYW5zaXRpb25pbmcgb3V0XG4gICAqL1xuICBvbkV4aXRlZDogUHJvcFR5cGVzLmZ1bmNcbn07XG5PdmVybGF5LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29udGFpbmVyUGFkZGluZzogNVxufTtcbmV4cG9ydCBkZWZhdWx0IE92ZXJsYXk7IiwiaW1wb3J0IGlzV2luZG93IGZyb20gJ2RvbS1oZWxwZXJzL2lzV2luZG93JztcbmltcG9ydCBvd25lckRvY3VtZW50IGZyb20gJ2RvbS1oZWxwZXJzL293bmVyRG9jdW1lbnQnO1xuXG5mdW5jdGlvbiBpc0JvZHkobm9kZSkge1xuICByZXR1cm4gbm9kZSAmJiBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2JvZHknO1xufVxuXG5mdW5jdGlvbiBib2R5SXNPdmVyZmxvd2luZyhub2RlKSB7XG4gIHZhciBkb2MgPSBvd25lckRvY3VtZW50KG5vZGUpO1xuICB2YXIgd2luID0gaXNXaW5kb3coZG9jKTtcbiAgcmV0dXJuIGRvYy5ib2R5LmNsaWVudFdpZHRoIDwgd2luLmlubmVyV2lkdGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzT3ZlcmZsb3dpbmcoY29udGFpbmVyKSB7XG4gIHZhciB3aW4gPSBpc1dpbmRvdyhjb250YWluZXIpO1xuICByZXR1cm4gd2luIHx8IGlzQm9keShjb250YWluZXIpID8gYm9keUlzT3ZlcmZsb3dpbmcoY29udGFpbmVyKSA6IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgPiBjb250YWluZXIuY2xpZW50SGVpZ2h0O1xufSIsInZhciBCTEFDS0xJU1QgPSBbJ3RlbXBsYXRlJywgJ3NjcmlwdCcsICdzdHlsZSddO1xuXG52YXIgaXNIaWRhYmxlID0gZnVuY3Rpb24gaXNIaWRhYmxlKF9yZWYpIHtcbiAgdmFyIG5vZGVUeXBlID0gX3JlZi5ub2RlVHlwZSxcbiAgICAgIHRhZ05hbWUgPSBfcmVmLnRhZ05hbWU7XG4gIHJldHVybiBub2RlVHlwZSA9PT0gMSAmJiBCTEFDS0xJU1QuaW5kZXhPZih0YWdOYW1lLnRvTG93ZXJDYXNlKCkpID09PSAtMTtcbn07XG5cbnZhciBzaWJsaW5ncyA9IGZ1bmN0aW9uIHNpYmxpbmdzKGNvbnRhaW5lciwgZXhjbHVkZSwgY2IpIHtcbiAgZXhjbHVkZSA9IFtdLmNvbmNhdChleGNsdWRlKTtcbiAgW10uZm9yRWFjaC5jYWxsKGNvbnRhaW5lci5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAoZXhjbHVkZS5pbmRleE9mKG5vZGUpID09PSAtMSAmJiBpc0hpZGFibGUobm9kZSkpIHtcbiAgICAgIGNiKG5vZGUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYXJpYUhpZGRlbihzaG93LCBub2RlKSB7XG4gIGlmICghbm9kZSkgcmV0dXJuO1xuXG4gIGlmIChzaG93KSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgfSBlbHNlIHtcbiAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVTaWJsaW5ncyhjb250YWluZXIsIF9yZWYyKSB7XG4gIHZhciBkaWFsb2cgPSBfcmVmMi5kaWFsb2csXG4gICAgICBiYWNrZHJvcCA9IF9yZWYyLmJhY2tkcm9wO1xuICBzaWJsaW5ncyhjb250YWluZXIsIFtkaWFsb2csIGJhY2tkcm9wXSwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gYXJpYUhpZGRlbih0cnVlLCBub2RlKTtcbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd1NpYmxpbmdzKGNvbnRhaW5lciwgX3JlZjMpIHtcbiAgdmFyIGRpYWxvZyA9IF9yZWYzLmRpYWxvZyxcbiAgICAgIGJhY2tkcm9wID0gX3JlZjMuYmFja2Ryb3A7XG4gIHNpYmxpbmdzKGNvbnRhaW5lciwgW2RpYWxvZywgYmFja2Ryb3BdLCBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBhcmlhSGlkZGVuKGZhbHNlLCBub2RlKTtcbiAgfSk7XG59IiwiaW1wb3J0IG93bmVyRG9jdW1lbnQgZnJvbSAnZG9tLWhlbHBlcnMvb3duZXJEb2N1bWVudCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG52YXIgcmVzb2x2ZVJlZiA9IGZ1bmN0aW9uIHJlc29sdmVSZWYocmVmKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdW5kZWZpbmVkO1xuICBpZiAocmVmID09IG51bGwpIHJldHVybiBvd25lckRvY3VtZW50KCkuYm9keTtcbiAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHJlZiA9IHJlZigpO1xuICBpZiAocmVmICYmIHJlZi5jdXJyZW50KSByZWYgPSByZWYuY3VycmVudDtcbiAgaWYgKHJlZiAmJiByZWYubm9kZVR5cGUpIHJldHVybiByZWY7XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlV2FpdEZvckRPTVJlZihyZWYsIG9uUmVzb2x2ZWQpIHtcbiAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmVzb2x2ZVJlZihyZWYpO1xuICB9KSxcbiAgICAgIHJlc29sdmVkUmVmID0gX3VzZVN0YXRlWzBdLFxuICAgICAgc2V0UmVmID0gX3VzZVN0YXRlWzFdO1xuXG4gIGlmICghcmVzb2x2ZWRSZWYpIHtcbiAgICB2YXIgZWFybHlSZWYgPSByZXNvbHZlUmVmKHJlZik7XG4gICAgaWYgKGVhcmx5UmVmKSBzZXRSZWYoZWFybHlSZWYpO1xuICB9XG5cbiAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAob25SZXNvbHZlZCAmJiByZXNvbHZlZFJlZikge1xuICAgICAgb25SZXNvbHZlZChyZXNvbHZlZFJlZik7XG4gICAgfVxuICB9LCBbb25SZXNvbHZlZCwgcmVzb2x2ZWRSZWZdKTtcbiAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV4dFJlZiA9IHJlc29sdmVSZWYocmVmKTtcblxuICAgIGlmIChuZXh0UmVmICE9PSByZXNvbHZlZFJlZikge1xuICAgICAgc2V0UmVmKG5leHRSZWYpO1xuICAgIH1cbiAgfSwgW3JlZiwgcmVzb2x2ZWRSZWZdKTtcbiAgcmV0dXJuIHJlc29sdmVkUmVmO1xufSIsImltcG9ydCB7IFJvdXRlciwgX19Sb3V0ZXJDb250ZXh0LCBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuZXhwb3J0ICogZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSwgY3JlYXRlSGFzaEhpc3RvcnksIGNyZWF0ZUxvY2F0aW9uIH0gZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAndGlueS13YXJuaW5nJztcbmltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyBIVE1MNSBoaXN0b3J5LlxuICovXG5cbnZhciBCcm93c2VyUm91dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKEJyb3dzZXJSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEJyb3dzZXJSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KF90aGlzLnByb3BzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQnJvd3NlclJvdXRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEJyb3dzZXJSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgQnJvd3NlclJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGZvcmNlUmVmcmVzaDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAga2V5TGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyXG4gIH07XG5cbiAgQnJvd3NlclJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxCcm93c2VyUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyB3aW5kb3cubG9jYXRpb24uaGFzaC5cbiAqL1xuXG52YXIgSGFzaFJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShIYXNoUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBIYXNoUm91dGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSB8fCB0aGlzO1xuICAgIF90aGlzLmhpc3RvcnkgPSBjcmVhdGVIYXNoSGlzdG9yeShfdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEhhc2hSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBIYXNoUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEhhc2hSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoYXNoVHlwZTogUHJvcFR5cGVzLm9uZU9mKFtcImhhc2hiYW5nXCIsIFwibm9zbGFzaFwiLCBcInNsYXNoXCJdKVxuICB9O1xuXG4gIEhhc2hSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoIXRoaXMucHJvcHMuaGlzdG9yeSwgXCI8SGFzaFJvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IEhhc2hSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxudmFyIHJlc29sdmVUb0xvY2F0aW9uID0gZnVuY3Rpb24gcmVzb2x2ZVRvTG9jYXRpb24odG8sIGN1cnJlbnRMb2NhdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHRvID09PSBcImZ1bmN0aW9uXCIgPyB0byhjdXJyZW50TG9jYXRpb24pIDogdG87XG59O1xudmFyIG5vcm1hbGl6ZVRvTG9jYXRpb24gPSBmdW5jdGlvbiBub3JtYWxpemVUb0xvY2F0aW9uKHRvLCBjdXJyZW50TG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IGNyZWF0ZUxvY2F0aW9uKHRvLCBudWxsLCBudWxsLCBjdXJyZW50TG9jYXRpb24pIDogdG87XG59O1xuXG52YXIgZm9yd2FyZFJlZlNoaW0gPSBmdW5jdGlvbiBmb3J3YXJkUmVmU2hpbShDKSB7XG4gIHJldHVybiBDO1xufTtcblxudmFyIGZvcndhcmRSZWYgPSBSZWFjdC5mb3J3YXJkUmVmO1xuXG5pZiAodHlwZW9mIGZvcndhcmRSZWYgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgZm9yd2FyZFJlZiA9IGZvcndhcmRSZWZTaGltO1xufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICEhKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpO1xufVxuXG52YXIgTGlua0FuY2hvciA9IGZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYsIGZvcndhcmRlZFJlZikge1xuICB2YXIgaW5uZXJSZWYgPSBfcmVmLmlubmVyUmVmLFxuICAgICAgbmF2aWdhdGUgPSBfcmVmLm5hdmlnYXRlLFxuICAgICAgX29uQ2xpY2sgPSBfcmVmLm9uQ2xpY2ssXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wiaW5uZXJSZWZcIiwgXCJuYXZpZ2F0ZVwiLCBcIm9uQ2xpY2tcIl0pO1xuXG4gIHZhciB0YXJnZXQgPSByZXN0LnRhcmdldDtcblxuICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChfb25DbGljaykgX29uQ2xpY2soZXZlbnQpO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhyb3cgZXg7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCAmJiAvLyBvbkNsaWNrIHByZXZlbnRlZCBkZWZhdWx0XG4gICAgICBldmVudC5idXR0b24gPT09IDAgJiYgKCAvLyBpZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3NcbiAgICAgICF0YXJnZXQgfHwgdGFyZ2V0ID09PSBcIl9zZWxmXCIpICYmIC8vIGxldCBicm93c2VyIGhhbmRsZSBcInRhcmdldD1fYmxhbmtcIiBldGMuXG4gICAgICAhaXNNb2RpZmllZEV2ZW50KGV2ZW50KSAvLyBpZ25vcmUgY2xpY2tzIHdpdGggbW9kaWZpZXIga2V5c1xuICAgICAgKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBuYXZpZ2F0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICB9KTsgLy8gUmVhY3QgMTUgY29tcGF0XG5cblxuICBpZiAoZm9yd2FyZFJlZlNoaW0gIT09IGZvcndhcmRSZWYpIHtcbiAgICBwcm9wcy5yZWYgPSBmb3J3YXJkZWRSZWYgfHwgaW5uZXJSZWY7XG4gIH0gZWxzZSB7XG4gICAgcHJvcHMucmVmID0gaW5uZXJSZWY7XG4gIH1cblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgcHJvcHMpO1xufSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgTGlua0FuY2hvci5kaXNwbGF5TmFtZSA9IFwiTGlua0FuY2hvclwiO1xufVxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIGEgaGlzdG9yeS1hd2FyZSA8YT4uXG4gKi9cblxuXG52YXIgTGluayA9IGZvcndhcmRSZWYoZnVuY3Rpb24gKF9yZWYyLCBmb3J3YXJkZWRSZWYpIHtcbiAgdmFyIF9yZWYyJGNvbXBvbmVudCA9IF9yZWYyLmNvbXBvbmVudCxcbiAgICAgIGNvbXBvbmVudCA9IF9yZWYyJGNvbXBvbmVudCA9PT0gdm9pZCAwID8gTGlua0FuY2hvciA6IF9yZWYyJGNvbXBvbmVudCxcbiAgICAgIHJlcGxhY2UgPSBfcmVmMi5yZXBsYWNlLFxuICAgICAgdG8gPSBfcmVmMi50byxcbiAgICAgIGlubmVyUmVmID0gX3JlZjIuaW5uZXJSZWYsXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjIsIFtcImNvbXBvbmVudFwiLCBcInJlcGxhY2VcIiwgXCJ0b1wiLCBcImlubmVyUmVmXCJdKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChfX1JvdXRlckNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgIWNvbnRleHQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxMaW5rPiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciBoaXN0b3J5ID0gY29udGV4dC5oaXN0b3J5O1xuICAgIHZhciBsb2NhdGlvbiA9IG5vcm1hbGl6ZVRvTG9jYXRpb24ocmVzb2x2ZVRvTG9jYXRpb24odG8sIGNvbnRleHQubG9jYXRpb24pLCBjb250ZXh0LmxvY2F0aW9uKTtcbiAgICB2YXIgaHJlZiA9IGxvY2F0aW9uID8gaGlzdG9yeS5jcmVhdGVIcmVmKGxvY2F0aW9uKSA6IFwiXCI7XG5cbiAgICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgaHJlZjogaHJlZixcbiAgICAgIG5hdmlnYXRlOiBmdW5jdGlvbiBuYXZpZ2F0ZSgpIHtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gcmVzb2x2ZVRvTG9jYXRpb24odG8sIGNvbnRleHQubG9jYXRpb24pO1xuICAgICAgICB2YXIgbWV0aG9kID0gcmVwbGFjZSA/IGhpc3RvcnkucmVwbGFjZSA6IGhpc3RvcnkucHVzaDtcbiAgICAgICAgbWV0aG9kKGxvY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gUmVhY3QgMTUgY29tcGF0XG5cblxuICAgIGlmIChmb3J3YXJkUmVmU2hpbSAhPT0gZm9yd2FyZFJlZikge1xuICAgICAgcHJvcHMucmVmID0gZm9yd2FyZGVkUmVmIHx8IGlubmVyUmVmO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcy5pbm5lclJlZiA9IGlubmVyUmVmO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpO1xuICB9KTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciB0b1R5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0LCBQcm9wVHlwZXMuZnVuY10pO1xuICB2YXIgcmVmVHlwZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGN1cnJlbnQ6IFByb3BUeXBlcy5hbnlcbiAgfSldKTtcbiAgTGluay5kaXNwbGF5TmFtZSA9IFwiTGlua1wiO1xuICBMaW5rLnByb3BUeXBlcyA9IHtcbiAgICBpbm5lclJlZjogcmVmVHlwZSxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICByZXBsYWNlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG86IHRvVHlwZS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBmb3J3YXJkUmVmU2hpbSQxID0gZnVuY3Rpb24gZm9yd2FyZFJlZlNoaW0oQykge1xuICByZXR1cm4gQztcbn07XG5cbnZhciBmb3J3YXJkUmVmJDEgPSBSZWFjdC5mb3J3YXJkUmVmO1xuXG5pZiAodHlwZW9mIGZvcndhcmRSZWYkMSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICBmb3J3YXJkUmVmJDEgPSBmb3J3YXJkUmVmU2hpbSQxO1xufVxuXG5mdW5jdGlvbiBqb2luQ2xhc3NuYW1lcygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNsYXNzbmFtZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY2xhc3NuYW1lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBjbGFzc25hbWVzLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpO1xuICB9KS5qb2luKFwiIFwiKTtcbn1cbi8qKlxuICogQSA8TGluaz4gd3JhcHBlciB0aGF0IGtub3dzIGlmIGl0J3MgXCJhY3RpdmVcIiBvciBub3QuXG4gKi9cblxuXG52YXIgTmF2TGluayA9IGZvcndhcmRSZWYkMShmdW5jdGlvbiAoX3JlZiwgZm9yd2FyZGVkUmVmKSB7XG4gIHZhciBfcmVmJGFyaWFDdXJyZW50ID0gX3JlZltcImFyaWEtY3VycmVudFwiXSxcbiAgICAgIGFyaWFDdXJyZW50ID0gX3JlZiRhcmlhQ3VycmVudCA9PT0gdm9pZCAwID8gXCJwYWdlXCIgOiBfcmVmJGFyaWFDdXJyZW50LFxuICAgICAgX3JlZiRhY3RpdmVDbGFzc05hbWUgPSBfcmVmLmFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgIGFjdGl2ZUNsYXNzTmFtZSA9IF9yZWYkYWN0aXZlQ2xhc3NOYW1lID09PSB2b2lkIDAgPyBcImFjdGl2ZVwiIDogX3JlZiRhY3RpdmVDbGFzc05hbWUsXG4gICAgICBhY3RpdmVTdHlsZSA9IF9yZWYuYWN0aXZlU3R5bGUsXG4gICAgICBjbGFzc05hbWVQcm9wID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBleGFjdCA9IF9yZWYuZXhhY3QsXG4gICAgICBpc0FjdGl2ZVByb3AgPSBfcmVmLmlzQWN0aXZlLFxuICAgICAgbG9jYXRpb25Qcm9wID0gX3JlZi5sb2NhdGlvbixcbiAgICAgIHN0cmljdCA9IF9yZWYuc3RyaWN0LFxuICAgICAgc3R5bGVQcm9wID0gX3JlZi5zdHlsZSxcbiAgICAgIHRvID0gX3JlZi50byxcbiAgICAgIGlubmVyUmVmID0gX3JlZi5pbm5lclJlZixcbiAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBbXCJhcmlhLWN1cnJlbnRcIiwgXCJhY3RpdmVDbGFzc05hbWVcIiwgXCJhY3RpdmVTdHlsZVwiLCBcImNsYXNzTmFtZVwiLCBcImV4YWN0XCIsIFwiaXNBY3RpdmVcIiwgXCJsb2NhdGlvblwiLCBcInN0cmljdFwiLCBcInN0eWxlXCIsIFwidG9cIiwgXCJpbm5lclJlZlwiXSk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX19Sb3V0ZXJDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8TmF2TGluaz4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgY3VycmVudExvY2F0aW9uID0gbG9jYXRpb25Qcm9wIHx8IGNvbnRleHQubG9jYXRpb247XG4gICAgdmFyIHRvTG9jYXRpb24gPSBub3JtYWxpemVUb0xvY2F0aW9uKHJlc29sdmVUb0xvY2F0aW9uKHRvLCBjdXJyZW50TG9jYXRpb24pLCBjdXJyZW50TG9jYXRpb24pO1xuICAgIHZhciBwYXRoID0gdG9Mb2NhdGlvbi5wYXRobmFtZTsgLy8gUmVnZXggdGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL3BpbGxhcmpzL3BhdGgtdG8tcmVnZXhwL2Jsb2IvbWFzdGVyL2luZGV4LmpzI0wyMDJcblxuICAgIHZhciBlc2NhcGVkUGF0aCA9IHBhdGggJiYgcGF0aC5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG4gICAgdmFyIG1hdGNoID0gZXNjYXBlZFBhdGggPyBtYXRjaFBhdGgoY3VycmVudExvY2F0aW9uLnBhdGhuYW1lLCB7XG4gICAgICBwYXRoOiBlc2NhcGVkUGF0aCxcbiAgICAgIGV4YWN0OiBleGFjdCxcbiAgICAgIHN0cmljdDogc3RyaWN0XG4gICAgfSkgOiBudWxsO1xuICAgIHZhciBpc0FjdGl2ZSA9ICEhKGlzQWN0aXZlUHJvcCA/IGlzQWN0aXZlUHJvcChtYXRjaCwgY3VycmVudExvY2F0aW9uKSA6IG1hdGNoKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gaXNBY3RpdmUgPyBqb2luQ2xhc3NuYW1lcyhjbGFzc05hbWVQcm9wLCBhY3RpdmVDbGFzc05hbWUpIDogY2xhc3NOYW1lUHJvcDtcbiAgICB2YXIgc3R5bGUgPSBpc0FjdGl2ZSA/IF9leHRlbmRzKHt9LCBzdHlsZVByb3AsIHt9LCBhY3RpdmVTdHlsZSkgOiBzdHlsZVByb3A7XG5cbiAgICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7XG4gICAgICBcImFyaWEtY3VycmVudFwiOiBpc0FjdGl2ZSAmJiBhcmlhQ3VycmVudCB8fCBudWxsLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICBzdHlsZTogc3R5bGUsXG4gICAgICB0bzogdG9Mb2NhdGlvblxuICAgIH0sIHJlc3QpOyAvLyBSZWFjdCAxNSBjb21wYXRcblxuXG4gICAgaWYgKGZvcndhcmRSZWZTaGltJDEgIT09IGZvcndhcmRSZWYkMSkge1xuICAgICAgcHJvcHMucmVmID0gZm9yd2FyZGVkUmVmIHx8IGlubmVyUmVmO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcy5pbm5lclJlZiA9IGlubmVyUmVmO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmssIHByb3BzKTtcbiAgfSk7XG59KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBOYXZMaW5rLmRpc3BsYXlOYW1lID0gXCJOYXZMaW5rXCI7XG4gIHZhciBhcmlhQ3VycmVudFR5cGUgPSBQcm9wVHlwZXMub25lT2YoW1wicGFnZVwiLCBcInN0ZXBcIiwgXCJsb2NhdGlvblwiLCBcImRhdGVcIiwgXCJ0aW1lXCIsIFwidHJ1ZVwiXSk7XG4gIE5hdkxpbmsucHJvcFR5cGVzID0gX2V4dGVuZHMoe30sIExpbmsucHJvcFR5cGVzLCB7XG4gICAgXCJhcmlhLWN1cnJlbnRcIjogYXJpYUN1cnJlbnRUeXBlLFxuICAgIGFjdGl2ZUNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZXhhY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzQWN0aXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzdHJpY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gIH0pO1xufVxuXG5leHBvcnQgeyBCcm93c2VyUm91dGVyLCBIYXNoUm91dGVyLCBMaW5rLCBOYXZMaW5rIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdC1yb3V0ZXItZG9tLmpzLm1hcFxuIiwiaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5LCBjcmVhdGVMb2NhdGlvbiwgbG9jYXRpb25zQXJlRXF1YWwsIGNyZWF0ZVBhdGggfSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3Rpbnktd2FybmluZyc7XG5pbXBvcnQgY3JlYXRlQ29udGV4dCBmcm9tICdtaW5pLWNyZWF0ZS1yZWFjdC1jb250ZXh0JztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAndGlueS1pbnZhcmlhbnQnO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMnO1xuaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tICdwYXRoLXRvLXJlZ2V4cCc7XG5pbXBvcnQgeyBpc1ZhbGlkRWxlbWVudFR5cGUgfSBmcm9tICdyZWFjdC1pcyc7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSc7XG5pbXBvcnQgaG9pc3RTdGF0aWNzIGZyb20gJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcblxuLy8gVE9ETzogUmVwbGFjZSB3aXRoIFJlYWN0LmNyZWF0ZUNvbnRleHQgb25jZSB3ZSBjYW4gYXNzdW1lIFJlYWN0IDE2K1xuXG52YXIgY3JlYXRlTmFtZWRDb250ZXh0ID0gZnVuY3Rpb24gY3JlYXRlTmFtZWRDb250ZXh0KG5hbWUpIHtcbiAgdmFyIGNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG4gIGNvbnRleHQuZGlzcGxheU5hbWUgPSBuYW1lO1xuICByZXR1cm4gY29udGV4dDtcbn07XG5cbnZhciBjb250ZXh0ID1cbi8qI19fUFVSRV9fKi9cbmNyZWF0ZU5hbWVkQ29udGV4dChcIlJvdXRlclwiKTtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHV0dGluZyBoaXN0b3J5IG9uIGNvbnRleHQuXG4gKi9cblxudmFyIFJvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIFJvdXRlci5jb21wdXRlUm9vdE1hdGNoID0gZnVuY3Rpb24gY29tcHV0ZVJvb3RNYXRjaChwYXRobmFtZSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBcIi9cIixcbiAgICAgIHVybDogXCIvXCIsXG4gICAgICBwYXJhbXM6IHt9LFxuICAgICAgaXNFeGFjdDogcGF0aG5hbWUgPT09IFwiL1wiXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBSb3V0ZXIocHJvcHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9SZWFjdCRDb21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxvY2F0aW9uOiBwcm9wcy5oaXN0b3J5LmxvY2F0aW9uXG4gICAgfTsgLy8gVGhpcyBpcyBhIGJpdCBvZiBhIGhhY2suIFdlIGhhdmUgdG8gc3RhcnQgbGlzdGVuaW5nIGZvciBsb2NhdGlvblxuICAgIC8vIGNoYW5nZXMgaGVyZSBpbiB0aGUgY29uc3RydWN0b3IgaW4gY2FzZSB0aGVyZSBhcmUgYW55IDxSZWRpcmVjdD5zXG4gICAgLy8gb24gdGhlIGluaXRpYWwgcmVuZGVyLiBJZiB0aGVyZSBhcmUsIHRoZXkgd2lsbCByZXBsYWNlL3B1c2ggd2hlblxuICAgIC8vIHRoZXkgbW91bnQgYW5kIHNpbmNlIGNETSBmaXJlcyBpbiBjaGlsZHJlbiBiZWZvcmUgcGFyZW50cywgd2UgbWF5XG4gICAgLy8gZ2V0IGEgbmV3IGxvY2F0aW9uIGJlZm9yZSB0aGUgPFJvdXRlcj4gaXMgbW91bnRlZC5cblxuICAgIF90aGlzLl9pc01vdW50ZWQgPSBmYWxzZTtcbiAgICBfdGhpcy5fcGVuZGluZ0xvY2F0aW9uID0gbnVsbDtcblxuICAgIGlmICghcHJvcHMuc3RhdGljQ29udGV4dCkge1xuICAgICAgX3RoaXMudW5saXN0ZW4gPSBwcm9wcy5oaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgaWYgKF90aGlzLl9pc01vdW50ZWQpIHtcbiAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5fcGVuZGluZ0xvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2lzTW91bnRlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fcGVuZGluZ0xvY2F0aW9uKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbG9jYXRpb246IHRoaXMuX3BlbmRpbmdMb2NhdGlvblxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnVubGlzdGVuKSB0aGlzLnVubGlzdGVuKCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiB8fCBudWxsLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgaGlzdG9yeTogdGhpcy5wcm9wcy5oaXN0b3J5LFxuICAgICAgICBsb2NhdGlvbjogdGhpcy5zdGF0ZS5sb2NhdGlvbixcbiAgICAgICAgbWF0Y2g6IFJvdXRlci5jb21wdXRlUm9vdE1hdGNoKHRoaXMuc3RhdGUubG9jYXRpb24ucGF0aG5hbWUpLFxuICAgICAgICBzdGF0aWNDb250ZXh0OiB0aGlzLnByb3BzLnN0YXRpY0NvbnRleHRcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGhpc3Rvcnk6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBzdGF0aWNDb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwcmV2UHJvcHMuaGlzdG9yeSA9PT0gdGhpcy5wcm9wcy5oaXN0b3J5LCBcIllvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgaGlzdG9yeT5cIikgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIGEgPFJvdXRlcj4gdGhhdCBzdG9yZXMgbG9jYXRpb24gaW4gbWVtb3J5LlxuICovXG5cbnZhciBNZW1vcnlSb3V0ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzTG9vc2UoTWVtb3J5Um91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNZW1vcnlSb3V0ZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIF90aGlzID0gX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpIHx8IHRoaXM7XG4gICAgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZU1lbW9yeUhpc3RvcnkoX3RoaXMucHJvcHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNZW1vcnlSb3V0ZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNZW1vcnlSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgTWVtb3J5Um91dGVyLnByb3BUeXBlcyA9IHtcbiAgICBpbml0aWFsRW50cmllczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGluaXRpYWxJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXG4gIH07XG5cbiAgTWVtb3J5Um91dGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPE1lbW9yeVJvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IE1lbW9yeVJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpIDogdm9pZCAwO1xuICB9O1xufVxuXG52YXIgTGlmZWN5Y2xlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKExpZmVjeWNsZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTGlmZWN5Y2xlKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMaWZlY3ljbGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uTW91bnQpIHRoaXMucHJvcHMub25Nb3VudC5jYWxsKHRoaXMsIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25VcGRhdGUpIHRoaXMucHJvcHMub25VcGRhdGUuY2FsbCh0aGlzLCB0aGlzLCBwcmV2UHJvcHMpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uVW5tb3VudCkgdGhpcy5wcm9wcy5vblVubW91bnQuY2FsbCh0aGlzLCB0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBMaWZlY3ljbGU7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIHByb21wdGluZyB0aGUgdXNlciBiZWZvcmUgbmF2aWdhdGluZyBhd2F5IGZyb20gYSBzY3JlZW4uXG4gKi9cblxuZnVuY3Rpb24gUHJvbXB0KF9yZWYpIHtcbiAgdmFyIG1lc3NhZ2UgPSBfcmVmLm1lc3NhZ2UsXG4gICAgICBfcmVmJHdoZW4gPSBfcmVmLndoZW4sXG4gICAgICB3aGVuID0gX3JlZiR3aGVuID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZiR3aGVuO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8UHJvbXB0PiBvdXRzaWRlIGEgPFJvdXRlcj5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIGlmICghd2hlbiB8fCBjb250ZXh0LnN0YXRpY0NvbnRleHQpIHJldHVybiBudWxsO1xuICAgIHZhciBtZXRob2QgPSBjb250ZXh0Lmhpc3RvcnkuYmxvY2s7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlmZWN5Y2xlLCB7XG4gICAgICBvbk1vdW50OiBmdW5jdGlvbiBvbk1vdW50KHNlbGYpIHtcbiAgICAgICAgc2VsZi5yZWxlYXNlID0gbWV0aG9kKG1lc3NhZ2UpO1xuICAgICAgfSxcbiAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShzZWxmLCBwcmV2UHJvcHMpIHtcbiAgICAgICAgaWYgKHByZXZQcm9wcy5tZXNzYWdlICE9PSBtZXNzYWdlKSB7XG4gICAgICAgICAgc2VsZi5yZWxlYXNlKCk7XG4gICAgICAgICAgc2VsZi5yZWxlYXNlID0gbWV0aG9kKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25Vbm1vdW50OiBmdW5jdGlvbiBvblVubW91bnQoc2VsZikge1xuICAgICAgICBzZWxmLnJlbGVhc2UoKTtcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIHZhciBtZXNzYWdlVHlwZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuc3RyaW5nXSk7XG4gIFByb21wdC5wcm9wVHlwZXMgPSB7XG4gICAgd2hlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbWVzc2FnZTogbWVzc2FnZVR5cGUuaXNSZXF1aXJlZFxuICB9O1xufVxuXG52YXIgY2FjaGUgPSB7fTtcbnZhciBjYWNoZUxpbWl0ID0gMTAwMDA7XG52YXIgY2FjaGVDb3VudCA9IDA7XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXRoKHBhdGgpIHtcbiAgaWYgKGNhY2hlW3BhdGhdKSByZXR1cm4gY2FjaGVbcGF0aF07XG4gIHZhciBnZW5lcmF0b3IgPSBwYXRoVG9SZWdleHAuY29tcGlsZShwYXRoKTtcblxuICBpZiAoY2FjaGVDb3VudCA8IGNhY2hlTGltaXQpIHtcbiAgICBjYWNoZVtwYXRoXSA9IGdlbmVyYXRvcjtcbiAgICBjYWNoZUNvdW50Kys7XG4gIH1cblxuICByZXR1cm4gZ2VuZXJhdG9yO1xufVxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBnZW5lcmF0aW5nIGEgVVJMIHBhdGhuYW1lIGZyb20gYSBwYXRoIGFuZCBwYXJhbWV0ZXJzLlxuICovXG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVQYXRoKHBhdGgsIHBhcmFtcykge1xuICBpZiAocGF0aCA9PT0gdm9pZCAwKSB7XG4gICAgcGF0aCA9IFwiL1wiO1xuICB9XG5cbiAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7XG4gICAgcGFyYW1zID0ge307XG4gIH1cblxuICByZXR1cm4gcGF0aCA9PT0gXCIvXCIgPyBwYXRoIDogY29tcGlsZVBhdGgocGF0aCkocGFyYW1zLCB7XG4gICAgcHJldHR5OiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBuYXZpZ2F0aW5nIHByb2dyYW1tYXRpY2FsbHkgd2l0aCBhIGNvbXBvbmVudC5cbiAqL1xuXG5mdW5jdGlvbiBSZWRpcmVjdChfcmVmKSB7XG4gIHZhciBjb21wdXRlZE1hdGNoID0gX3JlZi5jb21wdXRlZE1hdGNoLFxuICAgICAgdG8gPSBfcmVmLnRvLFxuICAgICAgX3JlZiRwdXNoID0gX3JlZi5wdXNoLFxuICAgICAgcHVzaCA9IF9yZWYkcHVzaCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJHB1c2g7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgIWNvbnRleHQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IHNob3VsZCBub3QgdXNlIDxSZWRpcmVjdD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgaGlzdG9yeSA9IGNvbnRleHQuaGlzdG9yeSxcbiAgICAgICAgc3RhdGljQ29udGV4dCA9IGNvbnRleHQuc3RhdGljQ29udGV4dDtcbiAgICB2YXIgbWV0aG9kID0gcHVzaCA/IGhpc3RvcnkucHVzaCA6IGhpc3RvcnkucmVwbGFjZTtcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihjb21wdXRlZE1hdGNoID8gdHlwZW9mIHRvID09PSBcInN0cmluZ1wiID8gZ2VuZXJhdGVQYXRoKHRvLCBjb21wdXRlZE1hdGNoLnBhcmFtcykgOiBfZXh0ZW5kcyh7fSwgdG8sIHtcbiAgICAgIHBhdGhuYW1lOiBnZW5lcmF0ZVBhdGgodG8ucGF0aG5hbWUsIGNvbXB1dGVkTWF0Y2gucGFyYW1zKVxuICAgIH0pIDogdG8pOyAvLyBXaGVuIHJlbmRlcmluZyBpbiBhIHN0YXRpYyBjb250ZXh0LFxuICAgIC8vIHNldCB0aGUgbmV3IGxvY2F0aW9uIGltbWVkaWF0ZWx5LlxuXG4gICAgaWYgKHN0YXRpY0NvbnRleHQpIHtcbiAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaWZlY3ljbGUsIHtcbiAgICAgIG9uTW91bnQ6IGZ1bmN0aW9uIG9uTW91bnQoKSB7XG4gICAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICB9LFxuICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKHNlbGYsIHByZXZQcm9wcykge1xuICAgICAgICB2YXIgcHJldkxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocHJldlByb3BzLnRvKTtcblxuICAgICAgICBpZiAoIWxvY2F0aW9uc0FyZUVxdWFsKHByZXZMb2NhdGlvbiwgX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgICAgICAga2V5OiBwcmV2TG9jYXRpb24ua2V5XG4gICAgICAgIH0pKSkge1xuICAgICAgICAgIG1ldGhvZChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0bzogdG9cbiAgICB9KTtcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUmVkaXJlY3QucHJvcFR5cGVzID0ge1xuICAgIHB1c2g6IFByb3BUeXBlcy5ib29sLFxuICAgIGZyb206IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG86IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKS5pc1JlcXVpcmVkXG4gIH07XG59XG5cbnZhciBjYWNoZSQxID0ge307XG52YXIgY2FjaGVMaW1pdCQxID0gMTAwMDA7XG52YXIgY2FjaGVDb3VudCQxID0gMDtcblxuZnVuY3Rpb24gY29tcGlsZVBhdGgkMShwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZUtleSA9IFwiXCIgKyBvcHRpb25zLmVuZCArIG9wdGlvbnMuc3RyaWN0ICsgb3B0aW9ucy5zZW5zaXRpdmU7XG4gIHZhciBwYXRoQ2FjaGUgPSBjYWNoZSQxW2NhY2hlS2V5XSB8fCAoY2FjaGUkMVtjYWNoZUtleV0gPSB7fSk7XG4gIGlmIChwYXRoQ2FjaGVbcGF0aF0pIHJldHVybiBwYXRoQ2FjaGVbcGF0aF07XG4gIHZhciBrZXlzID0gW107XG4gIHZhciByZWdleHAgPSBwYXRoVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucyk7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgcmVnZXhwOiByZWdleHAsXG4gICAga2V5czoga2V5c1xuICB9O1xuXG4gIGlmIChjYWNoZUNvdW50JDEgPCBjYWNoZUxpbWl0JDEpIHtcbiAgICBwYXRoQ2FjaGVbcGF0aF0gPSByZXN1bHQ7XG4gICAgY2FjaGVDb3VudCQxKys7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBtYXRjaGluZyBhIFVSTCBwYXRobmFtZSB0byBhIHBhdGguXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaFBhdGgocGF0aG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHBhdGg6IG9wdGlvbnNcbiAgICB9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBhdGggPSBfb3B0aW9ucy5wYXRoLFxuICAgICAgX29wdGlvbnMkZXhhY3QgPSBfb3B0aW9ucy5leGFjdCxcbiAgICAgIGV4YWN0ID0gX29wdGlvbnMkZXhhY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkZXhhY3QsXG4gICAgICBfb3B0aW9ucyRzdHJpY3QgPSBfb3B0aW9ucy5zdHJpY3QsXG4gICAgICBzdHJpY3QgPSBfb3B0aW9ucyRzdHJpY3QgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkc3RyaWN0LFxuICAgICAgX29wdGlvbnMkc2Vuc2l0aXZlID0gX29wdGlvbnMuc2Vuc2l0aXZlLFxuICAgICAgc2Vuc2l0aXZlID0gX29wdGlvbnMkc2Vuc2l0aXZlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJHNlbnNpdGl2ZTtcbiAgdmFyIHBhdGhzID0gW10uY29uY2F0KHBhdGgpO1xuICByZXR1cm4gcGF0aHMucmVkdWNlKGZ1bmN0aW9uIChtYXRjaGVkLCBwYXRoKSB7XG4gICAgaWYgKCFwYXRoICYmIHBhdGggIT09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIGlmIChtYXRjaGVkKSByZXR1cm4gbWF0Y2hlZDtcblxuICAgIHZhciBfY29tcGlsZVBhdGggPSBjb21waWxlUGF0aCQxKHBhdGgsIHtcbiAgICAgIGVuZDogZXhhY3QsXG4gICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgIHNlbnNpdGl2ZTogc2Vuc2l0aXZlXG4gICAgfSksXG4gICAgICAgIHJlZ2V4cCA9IF9jb21waWxlUGF0aC5yZWdleHAsXG4gICAgICAgIGtleXMgPSBfY29tcGlsZVBhdGgua2V5cztcblxuICAgIHZhciBtYXRjaCA9IHJlZ2V4cC5leGVjKHBhdGhuYW1lKTtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgdXJsID0gbWF0Y2hbMF0sXG4gICAgICAgIHZhbHVlcyA9IG1hdGNoLnNsaWNlKDEpO1xuICAgIHZhciBpc0V4YWN0ID0gcGF0aG5hbWUgPT09IHVybDtcbiAgICBpZiAoZXhhY3QgJiYgIWlzRXhhY3QpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgLy8gdGhlIHBhdGggdXNlZCB0byBtYXRjaFxuICAgICAgdXJsOiBwYXRoID09PSBcIi9cIiAmJiB1cmwgPT09IFwiXCIgPyBcIi9cIiA6IHVybCxcbiAgICAgIC8vIHRoZSBtYXRjaGVkIHBvcnRpb24gb2YgdGhlIFVSTFxuICAgICAgaXNFeGFjdDogaXNFeGFjdCxcbiAgICAgIC8vIHdoZXRoZXIgb3Igbm90IHdlIG1hdGNoZWQgZXhhY3RseVxuICAgICAgcGFyYW1zOiBrZXlzLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5LCBpbmRleCkge1xuICAgICAgICBtZW1vW2tleS5uYW1lXSA9IHZhbHVlc1tpbmRleF07XG4gICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgfSwge30pXG4gICAgfTtcbiAgfSwgbnVsbCk7XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHlDaGlsZHJlbihjaGlsZHJlbikge1xuICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID09PSAwO1xufVxuXG5mdW5jdGlvbiBldmFsQ2hpbGRyZW5EZXYoY2hpbGRyZW4sIHByb3BzLCBwYXRoKSB7XG4gIHZhciB2YWx1ZSA9IGNoaWxkcmVuKHByb3BzKTtcbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyh2YWx1ZSAhPT0gdW5kZWZpbmVkLCBcIllvdSByZXR1cm5lZCBgdW5kZWZpbmVkYCBmcm9tIHRoZSBgY2hpbGRyZW5gIGZ1bmN0aW9uIG9mIFwiICsgKFwiPFJvdXRlXCIgKyAocGF0aCA/IFwiIHBhdGg9XFxcIlwiICsgcGF0aCArIFwiXFxcIlwiIDogXCJcIikgKyBcIj4sIGJ1dCB5b3UgXCIpICsgXCJzaG91bGQgaGF2ZSByZXR1cm5lZCBhIFJlYWN0IGVsZW1lbnQgb3IgYG51bGxgXCIpIDogdm9pZCAwO1xuICByZXR1cm4gdmFsdWUgfHwgbnVsbDtcbn1cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgc2luZ2xlIHBhdGggYW5kIHJlbmRlcmluZy5cbiAqL1xuXG5cbnZhciBSb3V0ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShSb3V0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUm91dGUoKSB7XG4gICAgcmV0dXJuIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJvdXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCQxKSB7XG4gICAgICAhY29udGV4dCQxID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGU+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB2YXIgbG9jYXRpb24gPSBfdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCBjb250ZXh0JDEubG9jYXRpb247XG4gICAgICB2YXIgbWF0Y2ggPSBfdGhpcy5wcm9wcy5jb21wdXRlZE1hdGNoID8gX3RoaXMucHJvcHMuY29tcHV0ZWRNYXRjaCAvLyA8U3dpdGNoPiBhbHJlYWR5IGNvbXB1dGVkIHRoZSBtYXRjaCBmb3IgdXNcbiAgICAgIDogX3RoaXMucHJvcHMucGF0aCA/IG1hdGNoUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgX3RoaXMucHJvcHMpIDogY29udGV4dCQxLm1hdGNoO1xuXG4gICAgICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgY29udGV4dCQxLCB7XG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgbWF0Y2g6IG1hdGNoXG4gICAgICB9KTtcblxuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfdGhpcyRwcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICBjb21wb25lbnQgPSBfdGhpcyRwcm9wcy5jb21wb25lbnQsXG4gICAgICAgICAgcmVuZGVyID0gX3RoaXMkcHJvcHMucmVuZGVyOyAvLyBQcmVhY3QgdXNlcyBhbiBlbXB0eSBhcnJheSBhcyBjaGlsZHJlbiBieVxuICAgICAgLy8gZGVmYXVsdCwgc28gdXNlIG51bGwgaWYgdGhhdCdzIHRoZSBjYXNlLlxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Qcm92aWRlciwge1xuICAgICAgICB2YWx1ZTogcHJvcHNcbiAgICAgIH0sIHByb3BzLm1hdGNoID8gY2hpbGRyZW4gPyB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGV2YWxDaGlsZHJlbkRldihjaGlsZHJlbiwgcHJvcHMsIF90aGlzLnByb3BzLnBhdGgpIDogY2hpbGRyZW4ocHJvcHMpIDogY2hpbGRyZW4gOiBjb21wb25lbnQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpIDogcmVuZGVyID8gcmVuZGVyKHByb3BzKSA6IG51bGwgOiB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGV2YWxDaGlsZHJlbkRldihjaGlsZHJlbiwgcHJvcHMsIF90aGlzLnByb3BzLnBhdGgpIDogY2hpbGRyZW4ocHJvcHMpIDogbnVsbCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJvdXRlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5ub2RlXSksXG4gICAgY29tcG9uZW50OiBmdW5jdGlvbiBjb21wb25lbnQocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdICYmICFpc1ZhbGlkRWxlbWVudFR5cGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCBwcm9wICdjb21wb25lbnQnIHN1cHBsaWVkIHRvICdSb3V0ZSc6IHRoZSBwcm9wIGlzIG5vdCBhIHZhbGlkIFJlYWN0IGNvbXBvbmVudFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBwYXRoOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKV0pLFxuICAgIHJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2Vuc2l0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdHJpY3Q6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5jb21wb25lbnQpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIGNvbXBvbmVudD4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikgJiYgdGhpcy5wcm9wcy5yZW5kZXIpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgcmVuZGVyPiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHdhcm5pbmcoISh0aGlzLnByb3BzLmNvbXBvbmVudCAmJiB0aGlzLnByb3BzLnJlbmRlciksIFwiWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSBjb21wb25lbnQ+IGFuZCA8Um91dGUgcmVuZGVyPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIHJlbmRlcj4gd2lsbCBiZSBpZ25vcmVkXCIpIDogdm9pZCAwO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAocHJldlByb3BzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKHRoaXMucHJvcHMubG9jYXRpb24gJiYgIXByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgcHJvdmlkZWQgYSBcImxvY2F0aW9uXCIgcHJvcCBpbml0aWFsbHkgYnV0IG9taXR0ZWQgaXQgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSBcIi9cIiA/IHBhdGggOiBcIi9cIiArIHBhdGg7XG59XG5cbmZ1bmN0aW9uIGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICBwYXRobmFtZTogYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKSArIGxvY2F0aW9uLnBhdGhuYW1lXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG4gIHZhciBiYXNlID0gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKTtcbiAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZSkgIT09IDApIHJldHVybiBsb2NhdGlvbjtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHIoYmFzZS5sZW5ndGgpXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVUkwobG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGxvY2F0aW9uIDogY3JlYXRlUGF0aChsb2NhdGlvbik7XG59XG5cbmZ1bmN0aW9uIHN0YXRpY0hhbmRsZXIobWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IGNhbm5vdCAlcyB3aXRoIDxTdGF0aWNSb3V0ZXI+XCIsIG1ldGhvZE5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuLyoqXG4gKiBUaGUgcHVibGljIHRvcC1sZXZlbCBBUEkgZm9yIGEgXCJzdGF0aWNcIiA8Um91dGVyPiwgc28tY2FsbGVkIGJlY2F1c2UgaXRcbiAqIGNhbid0IGFjdHVhbGx5IGNoYW5nZSB0aGUgY3VycmVudCBsb2NhdGlvbi4gSW5zdGVhZCwgaXQganVzdCByZWNvcmRzXG4gKiBsb2NhdGlvbiBjaGFuZ2VzIGluIGEgY29udGV4dCBvYmplY3QuIFVzZWZ1bCBtYWlubHkgaW4gdGVzdGluZyBhbmRcbiAqIHNlcnZlci1yZW5kZXJpbmcgc2NlbmFyaW9zLlxuICovXG5cblxudmFyIFN0YXRpY1JvdXRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShTdGF0aWNSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN0YXRpY1JvdXRlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkgfHwgdGhpcztcblxuICAgIF90aGlzLmhhbmRsZVB1c2ggPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBfdGhpcy5uYXZpZ2F0ZVRvKGxvY2F0aW9uLCBcIlBVU0hcIik7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZVJlcGxhY2UgPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBfdGhpcy5uYXZpZ2F0ZVRvKGxvY2F0aW9uLCBcIlJFUExBQ0VcIik7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3RhdGljUm91dGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ubmF2aWdhdGVUbyA9IGZ1bmN0aW9uIG5hdmlnYXRlVG8obG9jYXRpb24sIGFjdGlvbikge1xuICAgIHZhciBfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIF90aGlzJHByb3BzJGJhc2VuYW1lID0gX3RoaXMkcHJvcHMuYmFzZW5hbWUsXG4gICAgICAgIGJhc2VuYW1lID0gX3RoaXMkcHJvcHMkYmFzZW5hbWUgPT09IHZvaWQgMCA/IFwiXCIgOiBfdGhpcyRwcm9wcyRiYXNlbmFtZSxcbiAgICAgICAgX3RoaXMkcHJvcHMkY29udGV4dCA9IF90aGlzJHByb3BzLmNvbnRleHQsXG4gICAgICAgIGNvbnRleHQgPSBfdGhpcyRwcm9wcyRjb250ZXh0ID09PSB2b2lkIDAgPyB7fSA6IF90aGlzJHByb3BzJGNvbnRleHQ7XG4gICAgY29udGV4dC5hY3Rpb24gPSBhY3Rpb247XG4gICAgY29udGV4dC5sb2NhdGlvbiA9IGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpO1xuICAgIGNvbnRleHQudXJsID0gY3JlYXRlVVJMKGNvbnRleHQubG9jYXRpb24pO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzJHByb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgIF90aGlzJHByb3BzMiRiYXNlbmFtZSA9IF90aGlzJHByb3BzMi5iYXNlbmFtZSxcbiAgICAgICAgYmFzZW5hbWUgPSBfdGhpcyRwcm9wczIkYmFzZW5hbWUgPT09IHZvaWQgMCA/IFwiXCIgOiBfdGhpcyRwcm9wczIkYmFzZW5hbWUsXG4gICAgICAgIF90aGlzJHByb3BzMiRjb250ZXh0ID0gX3RoaXMkcHJvcHMyLmNvbnRleHQsXG4gICAgICAgIGNvbnRleHQgPSBfdGhpcyRwcm9wczIkY29udGV4dCA9PT0gdm9pZCAwID8ge30gOiBfdGhpcyRwcm9wczIkY29udGV4dCxcbiAgICAgICAgX3RoaXMkcHJvcHMyJGxvY2F0aW9uID0gX3RoaXMkcHJvcHMyLmxvY2F0aW9uLFxuICAgICAgICBsb2NhdGlvbiA9IF90aGlzJHByb3BzMiRsb2NhdGlvbiA9PT0gdm9pZCAwID8gXCIvXCIgOiBfdGhpcyRwcm9wczIkbG9jYXRpb24sXG4gICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wczIsIFtcImJhc2VuYW1lXCIsIFwiY29udGV4dFwiLCBcImxvY2F0aW9uXCJdKTtcblxuICAgIHZhciBoaXN0b3J5ID0ge1xuICAgICAgY3JlYXRlSHJlZjogZnVuY3Rpb24gY3JlYXRlSHJlZihwYXRoKSB7XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nU2xhc2goYmFzZW5hbWUgKyBjcmVhdGVVUkwocGF0aCkpO1xuICAgICAgfSxcbiAgICAgIGFjdGlvbjogXCJQT1BcIixcbiAgICAgIGxvY2F0aW9uOiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpLFxuICAgICAgcHVzaDogdGhpcy5oYW5kbGVQdXNoLFxuICAgICAgcmVwbGFjZTogdGhpcy5oYW5kbGVSZXBsYWNlLFxuICAgICAgZ286IHN0YXRpY0hhbmRsZXIoXCJnb1wiKSxcbiAgICAgIGdvQmFjazogc3RhdGljSGFuZGxlcihcImdvQmFja1wiKSxcbiAgICAgIGdvRm9yd2FyZDogc3RhdGljSGFuZGxlcihcImdvRm9yd2FyZFwiKSxcbiAgICAgIGxpc3RlbjogdGhpcy5oYW5kbGVMaXN0ZW4sXG4gICAgICBibG9jazogdGhpcy5oYW5kbGVCbG9ja1xuICAgIH07XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgaGlzdG9yeTogaGlzdG9yeSxcbiAgICAgIHN0YXRpY0NvbnRleHQ6IGNvbnRleHRcbiAgICB9KSk7XG4gIH07XG5cbiAgcmV0dXJuIFN0YXRpY1JvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBTdGF0aWNSb3V0ZXIucHJvcFR5cGVzID0ge1xuICAgIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKVxuICB9O1xuXG4gIFN0YXRpY1JvdXRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxTdGF0aWNSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBTdGF0aWNSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIHRoZSBmaXJzdCA8Um91dGU+IHRoYXQgbWF0Y2hlcy5cbiAqL1xuXG52YXIgU3dpdGNoID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0c0xvb3NlKFN3aXRjaCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU3dpdGNoKCkge1xuICAgIHJldHVybiBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTd2l0Y2gucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAhY29udGV4dCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFN3aXRjaD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHZhciBsb2NhdGlvbiA9IF90aGlzLnByb3BzLmxvY2F0aW9uIHx8IGNvbnRleHQubG9jYXRpb247XG4gICAgICB2YXIgZWxlbWVudCwgbWF0Y2g7IC8vIFdlIHVzZSBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoIGluc3RlYWQgb2YgUmVhY3QuQ2hpbGRyZW4udG9BcnJheSgpLmZpbmQoKVxuICAgICAgLy8gaGVyZSBiZWNhdXNlIHRvQXJyYXkgYWRkcyBrZXlzIHRvIGFsbCBjaGlsZCBlbGVtZW50cyBhbmQgd2UgZG8gbm90IHdhbnRcbiAgICAgIC8vIHRvIHRyaWdnZXIgYW4gdW5tb3VudC9yZW1vdW50IGZvciB0d28gPFJvdXRlPnMgdGhhdCByZW5kZXIgdGhlIHNhbWVcbiAgICAgIC8vIGNvbXBvbmVudCBhdCBkaWZmZXJlbnQgVVJMcy5cblxuICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChfdGhpcy5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsICYmIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIGVsZW1lbnQgPSBjaGlsZDtcbiAgICAgICAgICB2YXIgcGF0aCA9IGNoaWxkLnByb3BzLnBhdGggfHwgY2hpbGQucHJvcHMuZnJvbTtcbiAgICAgICAgICBtYXRjaCA9IHBhdGggPyBtYXRjaFBhdGgobG9jYXRpb24ucGF0aG5hbWUsIF9leHRlbmRzKHt9LCBjaGlsZC5wcm9wcywge1xuICAgICAgICAgICAgcGF0aDogcGF0aFxuICAgICAgICAgIH0pKSA6IGNvbnRleHQubWF0Y2g7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoID8gUmVhY3QuY2xvbmVFbGVtZW50KGVsZW1lbnQsIHtcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBjb21wdXRlZE1hdGNoOiBtYXRjaFxuICAgICAgfSkgOiBudWxsO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTd2l0Y2g7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgU3dpdGNoLnByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBTd2l0Y2gucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIChwcmV2UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKCEodGhpcy5wcm9wcy5sb2NhdGlvbiAmJiAhcHJldlByb3BzLmxvY2F0aW9uKSwgJzxTd2l0Y2g+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghKCF0aGlzLnByb3BzLmxvY2F0aW9uICYmIHByZXZQcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IHByb3ZpZGVkIGEgXCJsb2NhdGlvblwiIHByb3AgaW5pdGlhbGx5IGJ1dCBvbWl0dGVkIGl0IG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJykgOiB2b2lkIDA7XG4gIH07XG59XG5cbi8qKlxuICogQSBwdWJsaWMgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0byBhY2Nlc3MgdGhlIGltcGVyYXRpdmUgQVBJXG4gKi9cblxuZnVuY3Rpb24gd2l0aFJvdXRlcihDb21wb25lbnQpIHtcbiAgdmFyIGRpc3BsYXlOYW1lID0gXCJ3aXRoUm91dGVyKFwiICsgKENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSkgKyBcIilcIjtcblxuICB2YXIgQyA9IGZ1bmN0aW9uIEMocHJvcHMpIHtcbiAgICB2YXIgd3JhcHBlZENvbXBvbmVudFJlZiA9IHByb3BzLndyYXBwZWRDb21wb25lbnRSZWYsXG4gICAgICAgIHJlbWFpbmluZ1Byb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UocHJvcHMsIFtcIndyYXBwZWRDb21wb25lbnRSZWZcIl0pO1xuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICFjb250ZXh0ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBzaG91bGQgbm90IHVzZSA8XCIgKyBkaXNwbGF5TmFtZSArIFwiIC8+IG91dHNpZGUgYSA8Um91dGVyPlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHt9LCByZW1haW5pbmdQcm9wcywgY29udGV4dCwge1xuICAgICAgICByZWY6IHdyYXBwZWRDb21wb25lbnRSZWZcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBDLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gIEMuV3JhcHBlZENvbXBvbmVudCA9IENvbXBvbmVudDtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgQy5wcm9wVHlwZXMgPSB7XG4gICAgICB3cmFwcGVkQ29tcG9uZW50UmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm9iamVjdF0pXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBob2lzdFN0YXRpY3MoQywgQ29tcG9uZW50KTtcbn1cblxudmFyIHVzZUNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0O1xuZnVuY3Rpb24gdXNlSGlzdG9yeSgpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICEodHlwZW9mIHVzZUNvbnRleHQgPT09IFwiZnVuY3Rpb25cIikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IG11c3QgdXNlIFJlYWN0ID49IDE2LjggaW4gb3JkZXIgdG8gdXNlIHVzZUhpc3RvcnkoKVwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cblxuICByZXR1cm4gdXNlQ29udGV4dChjb250ZXh0KS5oaXN0b3J5O1xufVxuZnVuY3Rpb24gdXNlTG9jYXRpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAhKHR5cGVvZiB1c2VDb250ZXh0ID09PSBcImZ1bmN0aW9uXCIpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIllvdSBtdXN0IHVzZSBSZWFjdCA+PSAxNi44IGluIG9yZGVyIHRvIHVzZSB1c2VMb2NhdGlvbigpXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG4gIHJldHVybiB1c2VDb250ZXh0KGNvbnRleHQpLmxvY2F0aW9uO1xufVxuZnVuY3Rpb24gdXNlUGFyYW1zKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgISh0eXBlb2YgdXNlQ29udGV4dCA9PT0gXCJmdW5jdGlvblwiKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJZb3UgbXVzdCB1c2UgUmVhY3QgPj0gMTYuOCBpbiBvcmRlciB0byB1c2UgdXNlUGFyYW1zKClcIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG5cbiAgdmFyIG1hdGNoID0gdXNlQ29udGV4dChjb250ZXh0KS5tYXRjaDtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2gucGFyYW1zIDoge307XG59XG5mdW5jdGlvbiB1c2VSb3V0ZU1hdGNoKHBhdGgpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICEodHlwZW9mIHVzZUNvbnRleHQgPT09IFwiZnVuY3Rpb25cIikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IG11c3QgdXNlIFJlYWN0ID49IDE2LjggaW4gb3JkZXIgdG8gdXNlIHVzZVJvdXRlTWF0Y2goKVwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cblxuICByZXR1cm4gcGF0aCA/IG1hdGNoUGF0aCh1c2VMb2NhdGlvbigpLnBhdGhuYW1lLCBwYXRoKSA6IHVzZUNvbnRleHQoY29udGV4dCkubWF0Y2g7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgZ2xvYmFsID0gd2luZG93O1xuICAgIHZhciBrZXkgPSBcIl9fcmVhY3Rfcm91dGVyX2J1aWxkX19cIjtcbiAgICB2YXIgYnVpbGROYW1lcyA9IHtcbiAgICAgIGNqczogXCJDb21tb25KU1wiLFxuICAgICAgZXNtOiBcIkVTIG1vZHVsZXNcIixcbiAgICAgIHVtZDogXCJVTURcIlxuICAgIH07XG5cbiAgICBpZiAoZ2xvYmFsW2tleV0gJiYgZ2xvYmFsW2tleV0gIT09IFwiZXNtXCIpIHtcbiAgICAgIHZhciBpbml0aWFsQnVpbGROYW1lID0gYnVpbGROYW1lc1tnbG9iYWxba2V5XV07XG4gICAgICB2YXIgc2Vjb25kYXJ5QnVpbGROYW1lID0gYnVpbGROYW1lc1tcImVzbVwiXTsgLy8gVE9ETzogQWRkIGxpbmsgdG8gYXJ0aWNsZSB0aGF0IGV4cGxhaW5zIGluIGRldGFpbCBob3cgdG8gYXZvaWRcbiAgICAgIC8vIGxvYWRpbmcgMiBkaWZmZXJlbnQgYnVpbGRzLlxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgYXJlIGxvYWRpbmcgdGhlIFwiICsgc2Vjb25kYXJ5QnVpbGROYW1lICsgXCIgYnVpbGQgb2YgUmVhY3QgUm91dGVyIFwiICsgKFwib24gYSBwYWdlIHRoYXQgaXMgYWxyZWFkeSBydW5uaW5nIHRoZSBcIiArIGluaXRpYWxCdWlsZE5hbWUgKyBcIiBcIikgKyBcImJ1aWxkLCBzbyB0aGluZ3Mgd29uJ3Qgd29yayByaWdodC5cIik7XG4gICAgfVxuXG4gICAgZ2xvYmFsW2tleV0gPSBcImVzbVwiO1xuICB9XG59XG5cbmV4cG9ydCB7IE1lbW9yeVJvdXRlciwgUHJvbXB0LCBSZWRpcmVjdCwgUm91dGUsIFJvdXRlciwgU3RhdGljUm91dGVyLCBTd2l0Y2gsIGNvbnRleHQgYXMgX19Sb3V0ZXJDb250ZXh0LCBnZW5lcmF0ZVBhdGgsIG1hdGNoUGF0aCwgdXNlSGlzdG9yeSwgdXNlTG9jYXRpb24sIHVzZVBhcmFtcywgdXNlUm91dGVNYXRjaCwgd2l0aFJvdXRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3Qtcm91dGVyLmpzLm1hcFxuIiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bywgZnJvbSkge1xuICBpZiAoZnJvbSA9PT0gdW5kZWZpbmVkKSBmcm9tID0gJyc7XG5cbiAgdmFyIHRvUGFydHMgPSAodG8gJiYgdG8uc3BsaXQoJy8nKSkgfHwgW107XG4gIHZhciBmcm9tUGFydHMgPSAoZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykpIHx8IFtdO1xuXG4gIHZhciBpc1RvQWJzID0gdG8gJiYgaXNBYnNvbHV0ZSh0byk7XG4gIHZhciBpc0Zyb21BYnMgPSBmcm9tICYmIGlzQWJzb2x1dGUoZnJvbSk7XG4gIHZhciBtdXN0RW5kQWJzID0gaXNUb0FicyB8fCBpc0Zyb21BYnM7XG5cbiAgaWYgKHRvICYmIGlzQWJzb2x1dGUodG8pKSB7XG4gICAgLy8gdG8gaXMgYWJzb2x1dGVcbiAgICBmcm9tUGFydHMgPSB0b1BhcnRzO1xuICB9IGVsc2UgaWYgKHRvUGFydHMubGVuZ3RoKSB7XG4gICAgLy8gdG8gaXMgcmVsYXRpdmUsIGRyb3AgdGhlIGZpbGVuYW1lXG4gICAgZnJvbVBhcnRzLnBvcCgpO1xuICAgIGZyb21QYXJ0cyA9IGZyb21QYXJ0cy5jb25jYXQodG9QYXJ0cyk7XG4gIH1cblxuICBpZiAoIWZyb21QYXJ0cy5sZW5ndGgpIHJldHVybiAnLyc7XG5cbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2g7XG4gIGlmIChmcm9tUGFydHMubGVuZ3RoKSB7XG4gICAgdmFyIGxhc3QgPSBmcm9tUGFydHNbZnJvbVBhcnRzLmxlbmd0aCAtIDFdO1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJyB8fCBsYXN0ID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICBoYXNUcmFpbGluZ1NsYXNoID0gZmFsc2U7XG4gIH1cblxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gZnJvbVBhcnRzLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcGFydCA9IGZyb21QYXJ0c1tpXTtcblxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW11c3RFbmRBYnMpIGZvciAoOyB1cC0tOyB1cCkgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG5cbiAgaWYgKFxuICAgIG11c3RFbmRBYnMgJiZcbiAgICBmcm9tUGFydHNbMF0gIT09ICcnICYmXG4gICAgKCFmcm9tUGFydHNbMF0gfHwgIWlzQWJzb2x1dGUoZnJvbVBhcnRzWzBdKSlcbiAgKVxuICAgIGZyb21QYXJ0cy51bnNoaWZ0KCcnKTtcblxuICB2YXIgcmVzdWx0ID0gZnJvbVBhcnRzLmpvaW4oJy8nKTtcblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiByZXN1bHQuc3Vic3RyKC0xKSAhPT0gJy8nKSByZXN1bHQgKz0gJy8nO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVQYXRobmFtZTtcbiIsInZhciBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xudmFyIHByZWZpeCA9ICdJbnZhcmlhbnQgZmFpbGVkJztcbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocHJlZml4KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCArIFwiOiBcIiArIChtZXNzYWdlIHx8ICcnKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludmFyaWFudDtcbiIsInZhciBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFpc1Byb2R1Y3Rpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRleHQgPSBcIldhcm5pbmc6IFwiICsgbWVzc2FnZTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2Fybih0ZXh0KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhyb3cgRXJyb3IodGV4dCk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3YXJuaW5nO1xuIiwiZnVuY3Rpb24gdmFsdWVPZihvYmopIHtcbiAgcmV0dXJuIG9iai52YWx1ZU9mID8gb2JqLnZhbHVlT2YoKSA6IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKG9iaik7XG59XG5cbmZ1bmN0aW9uIHZhbHVlRXF1YWwoYSwgYikge1xuICAvLyBUZXN0IGZvciBzdHJpY3QgZXF1YWxpdHkgZmlyc3QuXG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBPdGhlcndpc2UsIGlmIGVpdGhlciBvZiB0aGVtID09IG51bGwgdGhleSBhcmUgbm90IGVxdWFsLlxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIEFycmF5LmlzQXJyYXkoYikgJiZcbiAgICAgIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJlxuICAgICAgYS5ldmVyeShmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gdmFsdWVFcXVhbChpdGVtLCBiW2luZGV4XSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBhVmFsdWUgPSB2YWx1ZU9mKGEpO1xuICAgIHZhciBiVmFsdWUgPSB2YWx1ZU9mKGIpO1xuXG4gICAgaWYgKGFWYWx1ZSAhPT0gYSB8fCBiVmFsdWUgIT09IGIpIHJldHVybiB2YWx1ZUVxdWFsKGFWYWx1ZSwgYlZhbHVlKTtcblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCBhLCBiKSkuZXZlcnkoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdmFsdWVFcXVhbChhW2tleV0sIGJba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbHVlRXF1YWw7XG4iXSwic291cmNlUm9vdCI6IiJ9