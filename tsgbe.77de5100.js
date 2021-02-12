// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__spreadArray = __spreadArray;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};

exports.__createBinding = __createBinding;

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */


function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
/** @deprecated */


function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function __spreadArray(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}
},{}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

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
  exports.wrap = wrap;

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
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
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
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
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
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
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
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
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

  define(Gp, toStringTagSymbol, "Generator");

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

  exports.keys = function(object) {
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
  exports.values = values;

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

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"src/app/peripherals/cartridge.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cartridge = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cartridge = /*#__PURE__*/function () {
  function Cartridge(data) {
    _classCallCheck(this, Cartridge);

    this.load(data);

    if (!this.checksum()) {
      throw new Error('[ERROR] Invalid checksum!');
    }
  }

  _createClass(Cartridge, [{
    key: "load",
    value: function load(data) {
      // Primero carga los primeros 16 Kb (tamanyo minimo) para conocer el tamanyo real del cartucho
      this.rom = data;

      switch (this.rom[0x0148]) {
        case 0:
          this.romChunks = 2;
          break;

        case 1:
          this.romChunks = 4;
          break;

        case 2:
          this.romChunks = 8;
          break;

        case 3:
          this.romChunks = 16;
          break;

        case 4:
          this.romChunks = 32;
          break;

        case 5:
          this.romChunks = 64;
          break;

        case 6:
          this.romChunks = 128;
          break;

        case 0x52:
          this.romChunks = 72;
          break;

        case 0x53:
          this.romChunks = 80;
          break;

        case 0x54:
          this.romChunks = 96;
          break;

        default:
          this.romChunks = 0;
          break;
      }

      switch (this.rom[0x149]) {
        case 0:
          this.ramChunks = 0;
          break;

        case 1:
          this.ramChunks = 1;
          break;

        case 2:
          this.ramChunks = 1;
          break;

        case 3:
          this.ramChunks = 4;
          break;

        case 4:
          this.ramChunks = 16;
          break;

        case 5:
          this.ramChunks = 32;
          break;

        default:
          this.ramChunks = 0;
          break;
      }

      this.ram = new Uint8Array(0x2000 * this.ramChunks); // Lee el nombre interno de la ROM

      this.name = '';

      for (var i = 0x134; i <= 0x142; i++) {
        if (this.rom[i]) {
          this.name += String.fromCharCode(this.rom[i]);
        }
      }
    }
  }, {
    key: "checksum",
    value: function checksum() {
      // El resultado del checksum son 2 bytes
      var checksum = (this.rom[0x14E] << 8) + this.rom[0x14F];
      var total = 0; // Se suman todos los bytes de la rom a excepcion de los del resultado

      for (var i = 0; i < this.rom.length; i++) {
        if (i != 0x14E && i != 0x14F) {
          total = total + this.rom[i] & 0x0000FFFF;
        }
      }

      return checksum == total;
    }
  }]);

  return Cartridge;
}();

exports.Cartridge = Cartridge;
},{}],"src/app/peripherals/mbc0.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MBC0 = void 0;

var _cartridge = require("./cartridge");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MBC0 = /*#__PURE__*/function (_Cartridge) {
  _inherits(MBC0, _Cartridge);

  var _super = _createSuper(MBC0);

  function MBC0(data) {
    _classCallCheck(this, MBC0);

    return _super.call(this, data);
  }

  _createClass(MBC0, [{
    key: "read",
    value: function read(direction) {
      return this.rom[direction];
    }
  }, {
    key: "write",
    value: function write(value, direction) {// Not allowed in MBC0 type cartridges
    }
  }]);

  return MBC0;
}(_cartridge.Cartridge);

exports.MBC0 = MBC0;
},{"./cartridge":"src/app/peripherals/cartridge.ts"}],"src/app/peripherals/mbc1.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MBC1 = void 0;

var _cartridge = require("./cartridge");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MBC1 = /*#__PURE__*/function (_Cartridge) {
  _inherits(MBC1, _Cartridge);

  var _super = _createSuper(MBC1);

  function MBC1(data) {
    var _this;

    _classCallCheck(this, MBC1);

    _this = _super.call(this, data); // Determina si la zona de RAM esta habilitada

    _this.ramEnabled = false; // Banco de ROM que se encuentra actualmente proyectado

    _this.romPage = 1; /// Banco de RAM que se encuentra actualmente proyectado

    _this.ramPage = 0; // Determina si el cartucho tiene habilitado el modo de extension de RAM

    _this.mbcMode = 0;
    return _this;
  }

  _createClass(MBC1, [{
    key: "read",
    value: function read(direction) {
      var valor = 0;

      if (direction >= 0) {
        // Banco 0
        if (direction < 0x4000) valor = this.rom[direction]; // Banco 1-n
        else if (direction < 0x8000) valor = this.rom[direction - 0x4000 + this.romPage * 0x4000]; // Banco 0-n de RAM
          else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) valor = this.ram[direction - 0xA000 + this.ramPage * 0x2000];
      }

      return valor;
    }
  }, {
    key: "write",
    value: function write(value, direction) {
      // 0-0x2000: RAM activada o desactivada
      if (direction < 0x2000) this.ramEnabled = (value & 0x0F) == 0x0A ? true : false; // 0x2000-0x4000: Seleccion de banco de ROM
      else if (direction < 0x4000) {
          this.romPage = value & 0x1F;
          if (this.romPage == 0) this.romPage = 1;
        } else if (direction < 0x6000 && this.mbcMode == 1) this.ramPage = value & 0x03;else if (direction < 0x6000 && this.mbcMode == 0) this.romPage = this.romPage & 0x07 | (value & 0x03) << 3;else if (direction < 0x8000) this.mbcMode = value & 0x01; // RAM
        else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) this.ram[direction - 0xA000 + this.ramPage * 0x2000] = value;
    }
  }]);

  return MBC1;
}(_cartridge.Cartridge);

exports.MBC1 = MBC1;
},{"./cartridge":"src/app/peripherals/cartridge.ts"}],"src/app/peripherals/mbc2.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MBC2 = void 0;

var _cartridge = require("./cartridge");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MBC2 = /*#__PURE__*/function (_Cartridge) {
  _inherits(MBC2, _Cartridge);

  var _super = _createSuper(MBC2);

  function MBC2(data) {
    var _this;

    _classCallCheck(this, MBC2);

    _this = _super.call(this, data); // Determina si la zona de RAM esta habilitada

    _this.ramEnabled = false; // Banco de ROM que se encuentra actualmente proyectado

    _this.romPage = 1;
    return _this;
  }

  _createClass(MBC2, [{
    key: "read",
    value: function read(direction) {
      var value = 0;

      if (direction >= 0) {
        // Banco 0
        if (direction < 0x4000) value = this.rom[direction]; // Banco 1-n
        else if (direction < 0x8000) value = this.rom[direction - 0x4000 + this.romPage * 0x4000]; // Banco 0 de RAM
          else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) value = this.ram[direction - 0xA000];
      }

      return value;
    }
  }, {
    key: "write",
    value: function write(value, direction) {
      // 0-0x2000: RAM activada o desactivada
      if (direction < 0x2000) this.ramEnabled = (value & 0x0F) == 0x0A ? true : false; // 0x2000-0x4000: Seleccion de banco de ROM
      else if (direction < 0x4000) this.romPage = value & 0x0F; // RAM
        else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) this.ram[direction - 0xA000] = value;
    }
  }]);

  return MBC2;
}(_cartridge.Cartridge);

exports.MBC2 = MBC2;
},{"./cartridge":"src/app/peripherals/cartridge.ts"}],"src/app/peripherals/mbc3.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MBC3 = void 0;

var _cartridge = require("./cartridge");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MBC3 = /*#__PURE__*/function (_Cartridge) {
  _inherits(MBC3, _Cartridge);

  var _super = _createSuper(MBC3);

  function MBC3(data) {
    var _this;

    _classCallCheck(this, MBC3);

    _this = _super.call(this, data); /// Determina si la zona de RAM esta habilitada

    _this.ramEnabled = false; /// Banco de ROM que se encuentra actualmente proyectado

    _this.romPage = 1; /// Banco de RAM que se encuentra actualmente proyectado

    _this.ramPage = 0;
    return _this;
  }

  _createClass(MBC3, [{
    key: "read",
    value: function read(direction) {
      var value = 0;

      if (direction >= 0) {
        // Banco 0
        if (direction < 0x4000) value = this.rom[direction]; // Banco 1-n
        else if (direction < 0x8000) value = this.rom[direction - 0x4000 + this.romPage * 0x4000]; // Banco 0-n de RAM
          else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) value = this.ram[direction - 0xA000 + this.ramPage * 0x2000];
      }

      return value;
    }
  }, {
    key: "write",
    value: function write(value, direction) {
      // 0-0x2000: RAM activada o desactivada
      if (direction < 0x2000) this.ramEnabled = (value & 0x0F) == 0x0A ? true : false; // 0x2000-0x4000: Seleccion de banco de ROM
      else if (direction < 0x4000) this.romPage = value & 0x7F; // 0x4000-0x6000: Seleccion de banco de RAM
        else if (direction < 0x6000) this.ramPage = value & 0x03; // RAM
          else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) this.ram[direction - 0xA000 + this.ramPage * 0x2000] = value;
    }
  }]);

  return MBC3;
}(_cartridge.Cartridge);

exports.MBC3 = MBC3;
},{"./cartridge":"src/app/peripherals/cartridge.ts"}],"src/app/peripherals/mbc4.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MBC4 = void 0;

var _cartridge = require("./cartridge");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MBC4 = /*#__PURE__*/function (_Cartridge) {
  _inherits(MBC4, _Cartridge);

  var _super = _createSuper(MBC4);

  function MBC4(data) {
    _classCallCheck(this, MBC4);

    return _super.call(this, data);
  }

  _createClass(MBC4, [{
    key: "read",
    value: function read(direction) {
      return 0;
    }
  }, {
    key: "write",
    value: function write(value, direction) {// TODO
    }
  }]);

  return MBC4;
}(_cartridge.Cartridge);

exports.MBC4 = MBC4;
},{"./cartridge":"src/app/peripherals/cartridge.ts"}],"src/app/peripherals/mbc5.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MBC5 = void 0;

var _cartridge = require("./cartridge");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MBC5 = /*#__PURE__*/function (_Cartridge) {
  _inherits(MBC5, _Cartridge);

  var _super = _createSuper(MBC5);

  function MBC5(data) {
    var _this;

    _classCallCheck(this, MBC5);

    _this = _super.call(this, data); // Determina si la zona de RAM esta habilitada

    _this.ramEnabled = false; // Banco de ROM que se encuentra actualmente proyectado

    _this.romPage = 1; // Banco de RAM que se encuentra actualmente proyectado

    _this.ramPage = 0;
    return _this;
  }

  _createClass(MBC5, [{
    key: "read",
    value: function read(direction) {
      var value = 0;

      if (direction >= 0) {
        // Banco 0
        if (direction < 0x4000) value = this.rom[direction]; // Banco 1-n
        else if (direction < 0x8000) value = this.rom[direction - 0x4000 + this.romPage * 0x4000]; // Banco 0-n de RAM
          else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) value = this.ram[direction - 0xA000 + this.ramPage * 0x2000];
      }

      return value;
    }
  }, {
    key: "write",
    value: function write(value, direction) {
      // 0-0x2000: Activa a desctiva la RAM
      if (direction < 0x2000) this.ramEnabled = (value & 0x0F) == 0x0A ? true : false; // 0x2000-0x3000: Seleccion parte baja del banco de ROM
      else if (direction < 0x3000) this.romPage = this.romPage & 0x100 | value & 0xFF; // 0x3000-0x4000: Seleccion parte alta del banco de ROM
        else if (direction < 0x4000) this.romPage |= (value & 0x01) << 8; // 0x4000-0x6000: Seleccion banco de RAM
          else if (direction < 0x6000) this.ramPage = value & 0x0F; // RAM
            else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) this.ram[direction - 0xA000 + this.ramPage * 0x2000] = value;
    }
  }]);

  return MBC5;
}(_cartridge.Cartridge);

exports.MBC5 = MBC5;
},{"./cartridge":"src/app/peripherals/cartridge.ts"}],"src/app/peripherals/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MBC0", {
  enumerable: true,
  get: function () {
    return _mbc.MBC0;
  }
});
Object.defineProperty(exports, "MBC1", {
  enumerable: true,
  get: function () {
    return _mbc2.MBC1;
  }
});
Object.defineProperty(exports, "MBC2", {
  enumerable: true,
  get: function () {
    return _mbc3.MBC2;
  }
});
Object.defineProperty(exports, "MBC3", {
  enumerable: true,
  get: function () {
    return _mbc4.MBC3;
  }
});
Object.defineProperty(exports, "MBC4", {
  enumerable: true,
  get: function () {
    return _mbc5.MBC4;
  }
});
Object.defineProperty(exports, "MBC5", {
  enumerable: true,
  get: function () {
    return _mbc6.MBC5;
  }
});

var _mbc = require("./mbc0");

var _mbc2 = require("./mbc1");

var _mbc3 = require("./mbc2");

var _mbc4 = require("./mbc3");

var _mbc5 = require("./mbc4");

var _mbc6 = require("./mbc5");
},{"./mbc0":"src/app/peripherals/mbc0.ts","./mbc1":"src/app/peripherals/mbc1.ts","./mbc2":"src/app/peripherals/mbc2.ts","./mbc3":"src/app/peripherals/mbc3.ts","./mbc4":"src/app/peripherals/mbc4.ts","./mbc5":"src/app/peripherals/mbc5.ts"}],"src/app/util/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constants = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

exports.Constants = Constants;
Constants.JOYPAD = 0xFF00;
Constants.SERIAL_DATA = 0xFF01;
Constants.SERIAL_CTRL = 0xFF02;
Constants.DIV_CNTR = 0xFF04;
Constants.TIMER_COUNT = 0xFF05;
Constants.TIMER_RELOAD = 0xFF06;
Constants.TIMER_CRTL = 0xFF07;
Constants.INT_FLAG = 0xFF0F;
Constants.SND_1_ENT = 0xFF10;
Constants.SND_1_WAV_LEN = 0xFF11;
Constants.SND_1_ENV = 0xFF12;
Constants.SND_1_FREQ_KICK_LOWER = 0xFF13;
Constants.SND_1_FREQ_KICK_UPPER = 0xFF14;
Constants.SND_2_WAVE_LEN = 0xFF16;
Constants.SND_2_ENV = 0xFF17;
Constants.SND_2_FREQ_KICK_LOWER = 0xFF18;
Constants.SND_2_FREQ_KICK_UPPER = 0xFF19;
Constants.SND_3_ON_OFF = 0xFF1A;
Constants.SND_3_LEN = 0xFF1B;
Constants.SND_3_VOLUME = 0xFF1C;
Constants.SND_3_FREQ_KICK_LOWER = 0xFF1D;
Constants.SND_3_FREQ_KICK_UPPER = 0xFF1E;
Constants.SND_4_LEN = 0xFF20;
Constants.SND_4_ENV = 0xFF21;
Constants.SND_4_POLY_KICK_LOWER = 0xFF22;
Constants.SND_4_POLY_KICK_UPPER = 0xFF23;
Constants.SND_VOICE_INP = 0xFF24;
Constants.SND_STEREO = 0xFF25;
Constants.SND_STAT = 0xFF26;
Constants.SND_BNK_10 = 0xFF30;
Constants.SND_BNK_11 = 0xFF31;
Constants.SND_BNK_12 = 0xFF32;
Constants.SND_BNK_13 = 0xFF33;
Constants.SND_BNK_14 = 0xFF34;
Constants.SND_BNK_15 = 0xFF35;
Constants.SND_BNK_16 = 0xFF36;
Constants.SND_BNK_17 = 0xFF37;
Constants.SND_BNK_20 = 0xFF38;
Constants.SND_BNK_21 = 0xFF39;
Constants.SND_BNK_22 = 0xFF3A;
Constants.SND_BNK_23 = 0xFF3B;
Constants.SND_BNK_24 = 0xFF3C;
Constants.SND_BNK_25 = 0xFF3D;
Constants.SND_BNK_26 = 0xFF3E;
Constants.SND_BNK_27 = 0xFF3F;
Constants.LCD_CTRL = 0xFF40;
Constants.LCD_STAT = 0xFF41;
Constants.LCD_SCROLL_Y = 0xFF42;
Constants.LCD_SCROLL_X = 0xFF43;
Constants.LCD_Y_LOC = 0xFF44;
Constants.LCD_Y_COMP = 0xFF45;
Constants.LCD_DMA = 0xFF46;
Constants.LCD_BACK_PALETTE = 0xFF47;
Constants.LCD_SPR0_PALETTE = 0xFF48;
Constants.LCD_SPR1_PALETTE = 0xFF49;
Constants.LCD_WIN_Y = 0xFF4A;
Constants.LCD_WIN_X = 0xFF4B;
Constants.CPU_SPEED_REG = 0xFF4D;
Constants.VRAM_BANK = 0xFF4F;
Constants.DMA_SRC_UPPER = 0xFF51;
Constants.DMA_SRC_LOWER = 0xFF52;
Constants.DMA_DST_UPPER = 0xFF53;
Constants.DMA_DST_LOWER = 0xFF54;
Constants.DMA_LEN_TYPE = 0xFF55;
Constants.IR_PORT = 0xFF56;
Constants.BGP_INDEX = 0xFF68;
Constants.BGP_DATA = 0xFF69;
Constants.OBP_INDEX = 0xFF6A;
Constants.OBP_DATA = 0xFF6B;
Constants.RAM_BANK = 0xFF70;
Constants.INT_ENABLE = 0xFFFF;
Constants.INSTR_HBLANK = 60;
Constants.INSTR_VBLANK = 90000;
Constants.INSTR_TIMA = 6000;
Constants.INSTR_DIV = 33; // Tiempos en ciclos

Constants.CYCLES_DIV = 256;
Constants.CYCLES_TIMER_MODE0 = 1024;
Constants.CYCLES_TIMER_MODE1 = 16;
Constants.CYCLES_TIMER_MODE2 = 64;
Constants.CYCLES_TIMER_MODE3 = 256;
Constants.CYCLES_LCD_MODE0 = 375; // 376 / 375

Constants.CYCLES_LCD_MODE1 = 456;
Constants.CYCLES_LCD_MODE2 = 82; // 80 / 82

Constants.CYCLES_LCD_MODE3 = 172;
Constants.INT_VBLANK = 0x01;
Constants.INT_LCDC = 0x02;
Constants.INT_TIMER = 0x04;
Constants.INT_SERIALTX = 0x08;
Constants.INT_KEY = 0x10;
Constants.KEY_DOWN = 0;
Constants.KEY_UP = 1;
Constants.KEY_LEFT = 2;
Constants.KEY_RIGHT = 3;
Constants.KEY_START = 4;
Constants.KEY_SELECT = 5;
Constants.KEY_B = 6;
Constants.KEY_A = 7;
Constants.CPU_SPEED = 4.194304; // MHz

Constants.MEMSIZE = 65536; // Bytes

Constants.DMG_COLORS = [0x9BBC0F, 0x8BAC0F, 0x306230, 0x0F380F];
Constants.DMG_COLORS_BW = [0xE6E6E6, 0xA0A0A0, 0x505050, 0x141414]; // [230, 160, 80, 20];

Constants.SCREEN_WIDTH = 160;
Constants.SCREEN_HEIGHT = 144;
},{}],"src/app/kernel/gpu.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GPU = void 0;

var _constants = require("../util/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GPU = /*#__PURE__*/function () {
  function GPU(memory, screen) {
    _classCallCheck(this, GPU);

    this.memory = memory;
    this.screen = screen;
    this.buffers = [new Uint8Array(_constants.Constants.SCREEN_WIDTH * _constants.Constants.SCREEN_HEIGHT), new Uint8Array(_constants.Constants.SCREEN_WIDTH * _constants.Constants.SCREEN_HEIGHT)];
    this.currentBuffer = 0;
  }

  _createClass(GPU, [{
    key: "hblank",
    value: function hblank() {
      var scanLine = this.memory.read(_constants.Constants.LCD_Y_LOC) & 0xFF;
      this.updateBackground(scanLine);
      this.updateWindow(scanLine);
      this.updateSprites(scanLine);
    } /// <summary>Actualiza el fondo de la pantalla de una linea concreta</summary>
    /// <param name="scanLine">Linea a actualizar</param>

  }, {
    key: "updateBackground",
    value: function updateBackground(scanLine) {
      // Solo dibuja las lineas visibles (0-144)
      if ((this.memory.read(_constants.Constants.LCD_CTRL) & 0x01) != 0 && scanLine < 144) {
        var mapAddress = (this.memory.read(_constants.Constants.LCD_CTRL) & 0x08) != 0 ? 0x9C00 : 0x9800; // BG Tile Map Display Select

        var tileAddress = (this.memory.read(_constants.Constants.LCD_CTRL) & 0x10) != 0 ? 0x8000 : 0x8800; // BG & Window Tile Data Select

        var scrollX = this.memory.read(_constants.Constants.LCD_SCROLL_X);
        var scrollY = this.memory.read(_constants.Constants.LCD_SCROLL_Y); // La linea tiene 160 pixeles de ancho

        for (var x = 0; x < 160; x++) {
          if (scrollY + scanLine > 255) scrollY -= 255;
          if (scrollX + x > 255) scrollX -= 255; // Tile

          var xTile = scrollX + x >> 3;
          var yTile = scrollY + scanLine >> 3; // Pixel dentro del tile

          var bitX = scrollX + x & 0x07;
          var bitY = scrollY + scanLine & 0x07;
          var idTile = this.getIdTile(xTile, yTile, mapAddress, tileAddress);
          var tile = this.getTile(idTile, tileAddress, bitX, bitY);
          this.drawPixel(x, scanLine, this.id2color(tile, _constants.Constants.LCD_BACK_PALETTE));
        }
      }
    } /// <summary>Actualiza la ventana de una linea concreta</summary>
    /// <remarks>La ventana es como otro fondo superpuesto al anterior, pero colocado en una posicion determinada
    /// de la pantalla. Usa los mismos tiles que el fondo</remarks>
    /// <param name="scanLine">Linea a actualizar</param>

  }, {
    key: "updateWindow",
    value: function updateWindow(scanLine) {
      var winY = this.memory.read(_constants.Constants.LCD_WIN_Y);

      if ((this.memory.read(_constants.Constants.LCD_CTRL) & 0x20) != 0 && winY <= scanLine) {
        var winX = this.memory.read(_constants.Constants.LCD_WIN_X) - 7;
        var mapAddress = (this.memory.read(_constants.Constants.LCD_CTRL) & 0x40) != 0 ? 0x9C00 : 0x9800;
        var tileAddress = (this.memory.read(_constants.Constants.LCD_CTRL) & 0x10) != 0 ? 0x8000 : 0x8800;

        for (var wx = 0; wx < 160 - winX; wx++) {
          var xTile = wx >> 3;
          var yTile = scanLine - winY >> 3;
          var bitX = wx & 0x07;
          var bitY = scanLine - winY & 0x07;
          var idTile = this.getIdTile(xTile, yTile, mapAddress, tileAddress);
          var tile = this.getTile(idTile, tileAddress, bitX, bitY);

          if (wx + winX < 160 && wx + winX >= 0) {
            this.drawPixel(wx + winX, scanLine, this.id2color(tile, _constants.Constants.LCD_BACK_PALETTE));
          }
        }
      }
    } /// <summary>Actualiza los sprites que aparecen en una linea de la pantalla</summary>
    /// <param name="scanLine">Linea a actualizar</param>

  }, {
    key: "updateSprites",
    value: function updateSprites(scanLine) {
      if ((this.memory.read(_constants.Constants.LCD_CTRL) & 0x02) != 0) {
        // Los sprites pueden ser de 8x8 o 8x16 pixeles 
        var spriteSize = (this.memory.read(_constants.Constants.LCD_CTRL) & 0x04) != 0 ? 16 : 8; // El sprite 0 es el de menor prioridad

        for (var i = 39; i >= 0; i--) {
          var spriteY = this.memory.read(0xFE00 + i * 4);
          var spriteX = this.memory.read(0xFE01 + i * 4);

          if (spriteY <= scanLine + 16 && spriteY > scanLine + (16 - spriteSize)) {
            var tileNum = this.memory.read(0xFE02 + i * 4);
            var attributes = this.memory.read(0xFE03 + i * 4); // Paleta a utilizar

            var pal = (attributes & 0x10) == 0x10; // Inversion horizontal

            var flipX = (attributes & 0x20) == 0x20; // Inversion vertical

            var flipY = (attributes & 0x40) == 0x40; // Prioridad sobre el fondo/ventana

            var priority = (attributes & 0x80) == 0x80; // Todos los sprites tiene 8 pixeles de ancho

            for (var j = 0; j < 8; j++) {
              var posX = flipX ? spriteX - 1 - j : spriteX + j - 8;
              var posY = flipY ? spriteSize - (scanLine - spriteY + 17) : scanLine - spriteY + 16;
              var tile = this.getTile(tileNum, 0x8000, j, posY);

              if (posX >= 0 && tile != 0 && (!priority || priority && this.getIdColor(posX, scanLine) == 0)) {
                this.drawPixel(posX, scanLine, this.id2color(tile, pal ? _constants.Constants.LCD_SPR1_PALETTE : _constants.Constants.LCD_SPR0_PALETTE));
              }
            }
          }
        }
      }
    }
  }, {
    key: "vblank",
    value: function vblank() {
      this.screen.refresh(this.buffers[this.currentBuffer]);
      this.currentBuffer = ~this.currentBuffer & 1;
    }
  }, {
    key: "drawPixel",
    value: function drawPixel(posx, posy, id_color) {
      this.buffers[this.currentBuffer][posy * _constants.Constants.SCREEN_WIDTH + posx] = id_color;
    } /// <summary>Obtiene el identificador de color del fondo/ventana en una posicion concreta</summary>
    /// <param name="x">Posicion X de la pantalla</param>
    /// <param name="y">Posicion Y de la pantalla</param>
    /// <returns>El identificador de color</returns>

  }, {
    key: "getIdColor",
    value: function getIdColor(x, y) {
      var mapAddress = (this.memory.read(_constants.Constants.LCD_CTRL) & 0x08) != 0 ? 0x9C00 : 0x9800;
      var tileAddress = (this.memory.read(_constants.Constants.LCD_CTRL) & 0x10) != 0 ? 0x8000 : 0x8800;
      var scrollX = this.memory.read(_constants.Constants.LCD_SCROLL_X);
      var scrollY = this.memory.read(_constants.Constants.LCD_SCROLL_Y);
      if (scrollY + y > 255) scrollY -= 255;
      if (scrollX + x > 255) scrollX -= 255;
      var idTile = this.getIdTile(scrollX + x >> 3, scrollY + y >> 3, mapAddress, tileAddress);
      var tile = this.getTile(idTile, tileAddress, scrollX + x & 0x07, scrollY + y & 0x07);
      return tile;
    } /// <summary>Transforma un identificador de color en su color real usando una paleta de colores</summary>
    /// <param name="id">Identificador de color (0-3)</param>
    /// <param name="direccion">Direccion de memoria donde se encuentra la paleta de colores</param>
    /// <returns>El color correspondiente al identificador de color</returns>

  }, {
    key: "id2color",
    value: function id2color(id, direccion) {
      // 11 10 01 00
      var valor = this.memory.read(direccion);
      var color = (valor & 0x03 << id * 2) >> id * 2;
      return color;
    } /// <summary>Obtiene el numero de tile correspondiente a una posicion de la pantalla</summary>
    /// <remarks>La pantalla esta dividida en tiles de 8x8 pixeles. La ubicacion de los sprites es necesaria
    /// porque si estan en la direccion 0x8000 su identificador del mapa tiene signo</remarks>
    /// <param name="xTile">Tile horizontal</param>
    /// <param name="yTile">Tile vertical</param>
    /// <param name="mapAddress">Direccion del mapa de colocacion de tiles</param>
    /// <param name="tileAddress">Direccion de los datos de los sprites</param>
    /// <returns>El identificador de tile</returns>

  }, {
    key: "getIdTile",
    value: function getIdTile(xTile, yTile, mapAddress, tileAddress) {
      var idTile = this.memory.read(mapAddress + (yTile << 5) + xTile);
      if (tileAddress != 0x8000) idTile ^= 0x80;
      return idTile;
    } /// <summary>Obtiene el valor del color de un pixel de un tile en concreto</summary>
    /// <param name="idTile">Identificador de tile</param>
    /// <param name="tileAddress">Direccion de memoria donde se encuentran todos los tiles</param>
    /// <param name="bitX">Posicion X del pixel dentro del tile</param>
    /// <param name="bitY">Posicion Y del pixel dentro del tile</param>

  }, {
    key: "getTile",
    value: function getTile(idTile, tileAddress, bitX, bitY) {
      // El color de un pixel esta compuesto por dos bits (4 colores, blanco, negro y dos niveles de gris)
      var a = (this.memory.read(tileAddress + 1 + (bitY << 1) + (idTile << 4)) >> 7 - bitX & 0x01) << 1;
      var b = this.memory.read(tileAddress + (bitY << 1) + (idTile << 4)) >> 7 - bitX & 0x01;
      return a | b;
    }
  }]);

  return GPU;
}();

exports.GPU = GPU;
},{"../util/constants":"src/app/util/constants.ts"}],"src/app/kernel/registers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Registers = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Registers = /*#__PURE__*/function () {
  function Registers() {
    _classCallCheck(this, Registers);

    this.registers = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      SP: 0,
      PC: 0,
      HL: 0
    };
    this.flags = {
      Z: false,
      H: false,
      N: false,
      C: false
    };
  }

  _createClass(Registers, [{
    key: "A",
    get: function get() {
      return this.registers.A;
    },
    set: function set(value) {
      this.registers.A = value;
    }
  }, {
    key: "B",
    get: function get() {
      return this.registers.B;
    },
    set: function set(value) {
      this.registers.B = value;
    }
  }, {
    key: "C",
    get: function get() {
      return this.registers.C;
    },
    set: function set(value) {
      this.registers.C = value;
    }
  }, {
    key: "D",
    get: function get() {
      return this.registers.D;
    },
    set: function set(value) {
      this.registers.D = value;
    }
  }, {
    key: "E",
    get: function get() {
      return this.registers.E;
    },
    set: function set(value) {
      this.registers.E = value;
    }
  }, {
    key: "flagIME",
    get: function get() {
      return this.IME;
    },
    set: function set(value) {
      this.IME = value;
    }
  }, {
    key: "SP",
    get: function get() {
      return this.registers.SP;
    },
    set: function set(value) {
      this.registers.SP = value;
    }
  }, {
    key: "PC",
    get: function get() {
      return this.registers.PC;
    },
    set: function set(value) {
      this.registers.PC = value;
    }
  }, {
    key: "HL",
    get: function get() {
      return this.registers.HL;
    },
    set: function set(value) {
      this.registers.HL = value;
    }
  }, {
    key: "H",
    get: function get() {
      return (this.registers.HL & 0xFF00) >> 8;
    },
    set: function set(value) {
      this.registers.HL = this.registers.HL & 0x00FF | value << 8;
    }
  }, {
    key: "L",
    get: function get() {
      return this.registers.HL & 0x00FF;
    },
    set: function set(value) {
      this.registers.HL = this.registers.HL & 0xFF00 | value;
    }
  }, {
    key: "BC",
    get: function get() {
      return this.registers.B << 8 | this.registers.C;
    },
    set: function set(value) {
      this.registers.B = (value & 0xFF00) >> 8;
      this.registers.C = value & 0x00FF;
    }
  }, {
    key: "DE",
    get: function get() {
      return this.registers.D << 8 | this.registers.E;
    },
    set: function set(value) {
      this.registers.D = (value & 0xFF00) >> 8;
      this.registers.E = value & 0x00FF;
    }
  }, {
    key: "AF",
    get: function get() {
      return this.registers.A << 8 | this.getFlags();
    },
    set: function set(value) {
      this.registers.A = (value & 0xFF00) >> 8;
      this.setFlags(value & 0x00FF);
    }
  }, {
    key: "F",
    get: function get() {
      return this.getFlags();
    },
    set: function set(value) {
      this.setFlags(value);
    }
  }, {
    key: "flagZ",
    get: function get() {
      return this.flags.Z;
    },
    set: function set(value) {
      this.flags.Z = value;
    }
  }, {
    key: "flagN",
    get: function get() {
      return this.flags.N;
    },
    set: function set(value) {
      this.flags.N = value;
    }
  }, {
    key: "flagH",
    get: function get() {
      return this.flags.H;
    },
    set: function set(value) {
      this.flags.H = value;
    }
  }, {
    key: "flagC",
    get: function get() {
      return this.flags.C;
    },
    set: function set(value) {
      this.flags.C = value;
    } // Obtiene el estado de un flag por su nombre
    // Nombre del flag (Z, N, H, C)

  }, {
    key: "getFlag",
    value: function getFlag(flag) {
      var value = false;

      switch (flag) {
        case "Z":
          value = this.flags.Z;
          break;

        case "N":
          value = this.flags.N;
          break;

        case "H":
          value = this.flags.H;
          break;

        case "C":
          value = this.flags.C;
          break;
      }

      return value;
    } // Asigna un nuevo estado a un flag identificado por su nombre
    // El nombre del flag (Z, N, H, C)

  }, {
    key: "setFlag",
    value: function setFlag(flag, value) {
      switch (flag) {
        case "Z":
          this.flags.Z = value;
          break;

        case "N":
          this.flags.N = value;
          break;

        case "H":
          this.flags.H = value;
          break;

        case "C":
          this.flags.C = value;
          break;
      }
    } // Obtiene el valor del registro con todos los flags

  }, {
    key: "getFlags",
    value: function getFlags() {
      var flags = 0;
      var Z = 0x80; // 1000 0000

      var N = 0x40; // 0100 0000

      var H = 0x20; // 0010 0000

      var C = 0x10; // 0001 0000

      if (this.flags.Z == true) {
        flags |= Z;
      }

      if (this.flags.H == true) {
        flags |= H;
      }

      if (this.flags.N == true) {
        flags |= N;
      }

      if (this.flags.C == true) {
        flags |= C;
      }

      return flags & 0xFF;
    } // Asigna un nuevo estado a todos los flags a partir de su equivalente numerico

  }, {
    key: "setFlags",
    value: function setFlags(flags) {
      var Z = 0x80; // 1000 0000

      var N = 0x40; // 0100 0000

      var H = 0x20; // 0010 0000

      var C = 0x10; // 0001 0000

      this.flags.Z = (flags & Z) != 0;
      this.flags.H = (flags & H) != 0;
      this.flags.N = (flags & N) != 0;
      this.flags.C = (flags & C) != 0;
    } // Obtiene el valor de un registro a partir de su nombre
    // Nombre del registro (A, B, C, D, E, SP, PC, HL, BC, DE, H, L, AF, F)

  }, {
    key: "getReg",
    value: function getReg(reg) {
      var value = -1;

      switch (reg) {
        case "A":
          value = this.A;
          break;

        case "B":
          value = this.B;
          break;

        case "C":
          value = this.C;
          break;

        case "D":
          value = this.D;
          break;

        case "E":
          value = this.E;
          break;

        case "SP":
          value = this.SP;
          break;

        case "PC":
          value = this.PC;
          break;

        case "HL":
          value = this.HL;
          break;

        case "BC":
          value = this.BC;
          break;

        case "DE":
          value = this.DE;
          break;

        case "H":
          value = this.H;
          break;

        case "L":
          value = this.L;
          break;

        case "AF":
          value = this.AF;
          break;

        case "F":
          value = this.F;
          break;
      }

      return value;
    } //Asigna un valor a un registro identificado por su nombre
    // Nombre del registro (A, B, C, D, E, SP, PC, HL, BC, DE, H, L, AF, F)

  }, {
    key: "setReg",
    value: function setReg(reg, value) {
      switch (reg) {
        case "A":
          this.A = value;
          break;

        case "B":
          this.B = value;
          break;

        case "C":
          this.C = value;
          break;

        case "D":
          this.D = value;
          break;

        case "E":
          this.E = value;
          break;

        case "SP":
          this.SP = value;
          break;

        case "PC":
          this.PC = value;
          break;

        case "HL":
          this.HL = value;
          break;

        case "BC":
          this.BC = value;
          break;

        case "DE":
          this.DE = value;
          break;

        case "H":
          this.H = value;
          break;

        case "L":
          this.L = value;
          break;

        case "AF":
          this.AF = value;
          break;

        case "F":
          this.F = value;
          break;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      // Estado inicial de los registros y flags
      this.flagIME = false;
      this.flagZ = true;
      this.flagN = false;
      this.flagH = true;
      this.flagC = true;
      this.A = 0x11;
      this.PC = 0x0100;
      this.SP = 0xFFFE;
      this.BC = 0x0013;
      this.DE = 0x00D8;
      this.HL = 0x014D;
    }
  }]);

  return Registers;
}();

exports.Registers = Registers;
},{}],"src/app/kernel/instructions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OPCODES_CB = exports.OPCODES = void 0;

var _constants = require("../util/constants");

var OPS = {
  NOP: function NOP(registers) {
    registers.PC += 1;
    return 4;
  },
  LD: {
    LD_DD_NN: function LD_DD_NN(registers, memory, reg) {
      registers.setReg(reg, memory.readWord(registers.PC));
      registers.PC += 3;
      return 10;
    },
    LD_R_R: function LD_R_R(registers, destiny, origin) {
      registers.setReg(destiny, registers.getReg(origin));
      registers.PC += 1;
      return 4;
    },
    LD_R_N: function LD_R_N(registers, memory, destiny) {
      registers.setReg(destiny, memory.read(registers.PC + 1));
      registers.PC += 2;
      return 7;
    },
    LD_ADR_R: function LD_ADR_R(registers, memory, origin) {
      memory.write(registers.getReg(origin), memory.readWord(registers.PC));
      registers.PC += 3;
      return 13;
    },
    LD_ADR_RR: function LD_ADR_RR(registers, memory, origin) {
      var value = registers.getReg(origin);
      var direction = memory.readWord(registers.PC);
      memory.write(value & 0xFF, direction);
      memory.write(value >> 8 & 0xFF, direction + 1);
      registers.PC += 3;
      return 13;
    },
    LDD_RADR_R: function LDD_RADR_R(registers, memory, destiny, origin) {
      var direction = registers.getReg(destiny);
      memory.write(registers.getReg(origin), direction);
      direction = direction == 0x00 ? 0xFFFF : direction - 1;
      registers.setReg(destiny, direction);
      registers.PC += 1;
      return 15;
    },
    LDI_RADR_R: function LDI_RADR_R(registers, memory, destiny, origin) {
      var direction = registers.getReg(destiny);
      memory.write(registers.getReg(origin), direction);
      direction = direction == 0x00 ? 0xFFFF : direction + 1;
      registers.setReg(destiny, direction);
      registers.PC += 1;
      return 15;
    },
    LDD_R_RADR: function LDD_R_RADR(registers, memory, destiny, origin) {
      var direction = registers.getReg(origin);
      var value = memory.read(direction);
      registers.setReg(destiny, value);
      direction = direction == 0x00 ? 0xFFFF : direction - 1;
      registers.setReg(origin, direction);
      registers.PC += 1;
      return 15;
    },
    LDI_R_RADR: function LDI_R_RADR(registers, memory, destiny, origin) {
      var direction = registers.getReg(origin);
      var value = memory.read(direction);
      registers.setReg(destiny, value);
      direction = direction == 0x00 ? 0xFFFF : direction + 1;
      registers.setReg(origin, direction);
      registers.PC += 1;
      return 15;
    },
    LD_R_DADR: function LD_R_DADR(registers, memory, destiny) {
      registers.setReg(destiny, memory.read(0xFF00 + memory.read(registers.PC + 1)));
      registers.PC += 2;
      return 15;
    },
    LD_R_DR: function LD_R_DR(registers, memory, destiny, origin) {
      registers.setReg(destiny, memory.read(0xFF00 + registers.getReg(origin)));
      registers.PC += 1;
      return 15;
    },
    LD_DADR_R: function LD_DADR_R(registers, memory, origin) {
      memory.write(registers.getReg(origin), 0xFF00 + memory.read(registers.PC + 1));
      registers.PC += 2;
      return 15;
    },
    LD_DR_R: function LD_DR_R(registers, memory, destiny, origin) {
      memory.write(registers.getReg(origin), 0xFF00 + registers.getReg(destiny));
      registers.PC += 1;
      return 15;
    },
    LD_RADR_R: function LD_RADR_R(registers, memory, destiny, origin) {
      memory.write(registers.getReg(origin), registers.getReg(destiny));
      registers.PC += 1;
      return 7;
    },
    LD_R_ADR: function LD_R_ADR(registers, memory, destiny) {
      registers.setReg(destiny, memory.read(memory.readWord(registers.PC)));
      registers.PC += 3;
      return 13;
    },
    LD_R_RADR: function LD_R_RADR(registers, memory, destiny, origin) {
      registers.setReg(destiny, memory.read(registers.getReg(origin)));
      registers.PC += 1;
      return 7;
    },
    LD_RADR_N: function LD_RADR_N(registers, memory, destiny) {
      memory.write(memory.read(registers.PC + 1), registers.getReg(destiny));
      registers.PC += 2;
      return 10;
    },
    LD_R_SPD: function LD_R_SPD(registers, memory, destiny) {
      var offset = memory.read(registers.PC + 1);
      if (offset > 127) offset -= 256;
      registers.setReg(destiny, registers.SP + offset);
      registers.setFlags(0);
      registers.flagC = registers.getReg(destiny) > 0xFFFF;
      registers.PC += 2;
      return 10;
    }
  },
  INT: {
    DI: function DI(registers) {
      registers.flagIME = false;
      registers.PC += 1;
      return 4;
    },
    EI: function EI(registers) {
      registers.flagIME = true;
      registers.PC += 1;
      return 4;
    },
    HALT: function HALT(registers, memory) {
      if (registers.flagIME && (memory.read(_constants.Constants.INT_FLAG) & memory.read(_constants.Constants.INT_ENABLE)) > 0) {
        registers.PC += 1;
      }

      return 4;
    },
    STOP: function STOP(registers) {
      registers.PC += 2;
      return 4;
    }
  },
  BIT: {
    BIT_R: function BIT_R(registers, mask, reg) {
      registers.flagZ = (mask & registers.getReg(reg)) == 0;
      registers.flagH = true;
      registers.flagN = false;
      registers.PC += 1;
      return 8;
    },
    BIT_RADR: function BIT_RADR(registers, memory, mask, reg) {
      registers.flagZ = (mask & memory.read(registers.getReg(reg))) == 0;
      registers.flagH = true;
      registers.flagN = false;
      registers.PC += 1;
      return 10;
    },
    SET_R: function SET_R(registers, mask, reg) {
      registers.setReg(reg, registers.getReg(reg) | mask);
      registers.PC += 1;
      return 8;
    },
    SET_RADR: function SET_RADR(registers, memory, mask, reg) {
      var direction = registers.getReg(reg);
      memory.write(memory.read(direction) | mask, direction);
      registers.PC += 1;
      return 8;
    },
    RES_R: function RES_R(registers, mask, reg) {
      registers.setReg(reg, registers.getReg(reg) & ~mask);
      registers.PC += 1;
      return 8;
    },
    RES_RADR: function RES_RADR(registers, memory, mask, reg) {
      var direction = registers.getReg(reg);
      memory.write(memory.read(direction) & ~mask, direction);
      registers.PC += 1;
      return 11;
    },
    SWAP_R: function SWAP_R(registers, reg) {
      var value = registers.getReg(reg);
      value = (value & 0x0F) << 4 | (value & 0xF0) >> 4;
      registers.setReg(reg, value);
      registers.setFlags(0);
      registers.flagZ = value == 0;
      registers.PC += 1;
      return 8;
    },
    SWAP_RADR: function SWAP_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      value = (value & 0x0F) << 4 | (value & 0xF0) >> 4;
      memory.write(value, direction);
      registers.setFlags(0);
      registers.flagZ = value == 0;
      registers.PC += 1;
      return 16;
    }
  },
  COMP: {
    CCF: function CCF(registers) {
      registers.flagN = false;
      registers.flagH = false;
      registers.flagC = !registers.flagC;
      registers.PC += 1;
      return 4;
    },
    CPL: function CPL(registers) {
      registers.flagN = true;
      registers.flagH = true;
      registers.A ^= 0xFF;
      registers.A &= 0xFF;
      registers.PC += 1;
      return 4;
    },
    SCF: function SCF(registers) {
      registers.flagH = false;
      registers.flagN = false;
      registers.flagC = true;
      registers.PC += 1;
      return 4;
    }
  },
  LOGIC: {
    XOR_R: function XOR_R(registers, reg) {
      registers.A ^= registers.getReg(reg);
      registers.A &= 0xFF;
      registers.setFlags(0);
      registers.flagZ = registers.A == 0;
      registers.PC += 1;
      return 4;
    },
    XOR_RADR: function XOR_RADR(registers, memory, reg) {
      registers.A ^= memory.read(registers.getReg(reg));
      registers.A &= 0xFF;
      registers.setFlags(0);
      registers.flagZ = registers.A == 0;
      registers.PC += 1;
      return 7;
    },
    XOR_N: function XOR_N(registers, memory) {
      registers.A ^= memory.read(registers.PC + 1);
      registers.A &= 0xFF;
      registers.setFlags(0);
      registers.flagZ = registers.A == 0;
      registers.PC += 2;
      return 7;
    },
    OR_R_R: function OR_R_R(registers, reg) {
      registers.A |= registers.getReg(reg);
      registers.setFlags(0);
      registers.flagZ = registers.A == 0;
      registers.PC += 1;
      return 4;
    },
    AND_R_R: function AND_R_R(registers, reg) {
      registers.A &= registers.getReg(reg);
      registers.flagH = true;
      registers.flagN = false;
      registers.flagC = false;
      registers.flagZ = registers.A == 0;
      registers.PC += 1;
      return 4;
    },
    AND_R_N: function AND_R_N(registers, memory) {
      registers.A &= memory.read(registers.PC + 1);
      registers.flagH = true;
      registers.flagN = false;
      registers.flagC = false;
      registers.flagZ = registers.A == 0;
      registers.PC += 2;
      return 7;
    },
    AND_RADR: function AND_RADR(registers, memory, reg) {
      registers.A &= memory.read(registers.getReg(reg));
      registers.flagH = true;
      registers.flagN = false;
      registers.flagC = false;
      registers.flagZ = registers.A == 0;
      registers.PC += 1;
      return 7;
    },
    OR_R_ADR: function OR_R_ADR(registers, memory, reg) {
      registers.A |= memory.read(registers.getReg(reg));
      registers.setFlags(0);
      registers.flagZ = registers.A == 0;
      registers.PC += 1;
      return 7;
    },
    OR_N: function OR_N(registers, memory) {
      registers.A |= memory.read(registers.PC + 1);
      registers.setFlags(0);
      registers.flagZ = registers.A == 0;
      registers.PC += 2;
      return 7;
    }
  },
  SHIFT: {
    RLC: function RLC(registers, reg, zero) {
      var value = registers.getReg(reg);
      var carry = (value & 0x01 << 7) >> 7;
      registers.flagC = (value & 0x80) != 0;
      if (zero) registers.flagZ = (value & 0xFF) == 0;
      registers.flagN = false;
      registers.flagH = false;
      registers.setReg(reg, (value << 1 | carry) & 0xFF);
      registers.PC += 1;
      return 4;
    },
    RLC_RADR: function RLC_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      var carry = (value & 0x01 << 7) >> 7;
      registers.flagC = (value & 0x80) != 0;
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagN = false;
      registers.flagH = false;
      memory.write((value << 1 | carry) & 0xFF, direction);
      registers.PC += 1;
      return 15;
    },
    SLA: function SLA(registers, reg) {
      var value = registers.getReg(reg) << 1;
      registers.flagC = value > 0xFF;
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagN = false;
      registers.flagH = false;
      registers.setReg(reg, value & 0xFF);
      registers.PC += 1;
      return 8;
    },
    SLA_RADR: function SLA_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction) << 1;
      registers.flagC = value > 0xFF;
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagN = false;
      registers.flagH = false;
      memory.write(value & 0xFF, direction);
      registers.PC += 1;
      return 15;
    },
    SRA: function SRA(registers, reg) {
      var value = registers.getReg(reg);
      var result = (value >> 1 | value & 0x80) & 0xFF;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagZ = result == 0;
      registers.flagN = false;
      registers.flagH = false;
      registers.setReg(reg, result);
      registers.PC += 1;
      return 8;
    },
    SRA_RADR: function SRA_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      var result = (value >> 1 | value & 0x80) & 0xFF;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagZ = result == 0;
      registers.flagN = false;
      registers.flagH = false;
      memory.write(result, direction);
      registers.PC += 1;
      return 15;
    },
    SRL: function SRL(registers, reg) {
      var value = registers.getReg(reg);
      var result = value >> 1 & 0xFF;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagZ = result == 0;
      registers.flagN = false;
      registers.flagH = false;
      registers.setReg(reg, result);
      registers.PC += 1;
      return 8;
    },
    SRL_RADR: function SRL_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      var result = value >> 1 & 0xFF;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagZ = result == 0;
      registers.flagN = false;
      registers.flagH = false;
      memory.write(result, direction);
      registers.PC += 1;
      return 15;
    },
    RL: function RL(registers, reg, zero) {
      var value = registers.getReg(reg) << 1 | (registers.flagC ? 1 : 0);
      if (zero) registers.flagZ = (value & 0xFF) == 0;
      registers.flagC = value > 0xFF;
      registers.flagN = false;
      registers.flagH = false;
      registers.setReg(reg, value & 0xFF);
      registers.PC += 1;
      return 8;
    },
    RL_RADR: function RL_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction) << 1 | (registers.flagC ? 1 : 0);
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagC = value > 0xFF;
      registers.flagN = false;
      registers.flagH = false;
      memory.write(value & 0xFF, direction);
      registers.PC += 1;
      return 15;
    },
    RRC: function RRC(registers, reg, zero) {
      var value = registers.getReg(reg);
      var result = value >> 1 | (value & 0x01) << 7;
      if (zero) registers.flagZ = (result & 0xFF) == 0;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagH = false;
      registers.flagN = false;
      registers.setReg(reg, result & 0xFF);
      registers.PC += 1;
      return 4;
    },
    RRC_RADR: function RRC_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      var result = value >> 1 | (value & 0x01) << 7;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagZ = result == 0;
      registers.flagN = false;
      registers.flagH = false;
      memory.write(result & 0xFF, direction);
      registers.PC += 1;
      return 15;
    },
    RR: function RR(registers, reg, zero) {
      var value = registers.getReg(reg);
      var result = value >> 1 | (registers.flagC ? 1 : 0) << 7;
      if (zero) registers.flagZ = result == 0;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagH = false;
      registers.flagN = false;
      registers.setReg(reg, result & 0xFF);
      registers.PC += 1;
      return 4;
    },
    RR_RADR: function RR_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      var result = value >> 1 | (registers.flagC ? 1 : 0) << 7;
      registers.flagC = (value & 0x01) == 0x01;
      registers.flagZ = result == 0;
      registers.flagN = false;
      registers.flagH = false;
      memory.write(result & 0xFF, direction);
      registers.PC += 1;
      return 15;
    }
  },
  JUMP: {
    JP_ADR: function JP_ADR(registers, memory) {
      registers.PC = memory.readWord(registers.PC);
      return 10;
    },
    JP_RADR: function JP_RADR(registers, reg) {
      registers.PC = registers.getReg(reg);
      return 4;
    },
    JP_CC0_ADR: function JP_CC0_ADR(registers, memory, flag) {
      var direction = memory.readWord(registers.PC);
      registers.PC += 3;
      if (!registers.getFlag(flag)) registers.PC = direction;
      return 10;
    },
    JP_CC1_ADR: function JP_CC1_ADR(registers, memory, flag) {
      var direction = memory.readWord(registers.PC);
      registers.PC += 3;
      if (registers.getFlag(flag)) registers.PC = direction;
      return 10;
    },
    JR_N: function JR_N(registers, memory) {
      var offset = memory.read(registers.PC + 1);
      if (offset > 127) offset -= 256;
      registers.PC += 2;
      registers.PC += offset;
      return 12;
    },
    JR_CC0_N: function JR_CC0_N(registers, memory, flag) {
      var offset = memory.read(registers.PC + 1);
      if (offset > 127) offset -= 256;
      registers.PC += 2;

      if (!registers.getFlag(flag)) {
        registers.PC += offset;
        return 12;
      }

      return 7;
    },
    JR_CC1_N: function JR_CC1_N(registers, memory, flag) {
      var offset = memory.read(registers.PC + 1);
      if (offset > 127) offset -= 256;
      registers.PC += 2;

      if (registers.getFlag(flag)) {
        registers.PC += offset;
        return 12;
      }

      return 7;
    },
    CALL_ADR: function CALL_ADR(registers, memory) {
      var direction = memory.readWord(registers.PC);
      registers.PC += 3;
      registers.SP--;
      memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
      registers.SP--;
      memory.write(registers.PC & 0x00FF, registers.SP);
      registers.PC = direction;
      return 17;
    },
    CALL_CC0_ADR: function CALL_CC0_ADR(registers, memory, flag) {
      var direction = memory.readWord(registers.PC);
      registers.PC += 3;

      if (!registers.getFlag(flag)) {
        registers.SP--;
        memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
        registers.SP--;
        memory.write(registers.PC & 0x00FF, registers.SP);
        registers.PC = direction;
        return 17;
      }

      return 10;
    },
    CALL_CC1_ADR: function CALL_CC1_ADR(registers, memory, flag) {
      var direction = memory.readWord(registers.PC);
      registers.PC += 3;

      if (registers.getFlag(flag)) {
        registers.SP--;
        memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
        registers.SP--;
        memory.write(registers.PC & 0x00FF, registers.SP);
        registers.PC = direction;
        return 17;
      }

      return 10;
    },
    PUSH_RR: function PUSH_RR(registers, memory, reg) {
      var value = registers.getReg(reg);
      registers.SP--;
      memory.write((value & 0xFF00) >> 8, registers.SP);
      registers.SP--;
      memory.write(value & 0x00FF, registers.SP);
      registers.PC += 1;
      return 11;
    },
    POP_RR: function POP_RR(registers, memory, reg) {
      var low = memory.read(registers.SP);
      registers.SP++;
      var high = memory.read(registers.SP);
      registers.SP++;
      registers.setReg(reg, high << 8 | low);
      registers.PC += 1;
      return 11;
    },
    RET_CC0_ADR: function RET_CC0_ADR(registers, memory, flag) {
      registers.PC += 1;

      if (!registers.getFlag(flag)) {
        var low = memory.read(registers.SP);
        registers.SP++;
        var high = memory.read(registers.SP);
        registers.SP++;
        registers.PC = high << 8 | low;
        return 11;
      }

      return 5;
    },
    RET_CC1_ADR: function RET_CC1_ADR(registers, memory, flag) {
      registers.PC += 1;

      if (registers.getFlag(flag)) {
        var low = memory.read(registers.SP);
        registers.SP++;
        var high = memory.read(registers.SP);
        registers.SP++;
        registers.PC = high << 8 | low;
        return 11;
      }

      return 5;
    },
    RET_ADR: function RET_ADR(registers, memory) {
      registers.PC += 1;
      var low = memory.read(registers.SP);
      registers.SP++;
      var high = memory.read(registers.SP);
      registers.SP++;
      registers.PC = high << 8 | low;
      return 10;
    },
    RETI: function RETI(registers, memory) {
      registers.PC += 1;
      var low = memory.read(registers.SP);
      registers.SP++;
      var high = memory.read(registers.SP);
      registers.SP++;
      registers.PC = high << 8 | low;
      registers.flagIME = true;
      return 10;
    },
    RST: function RST(registers, memory, direction) {
      registers.PC += 1;
      registers.SP--;
      memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
      registers.SP--;
      memory.write(registers.PC & 0x00FF, registers.SP);
      registers.PC = direction;
      return 11;
    }
  },
  ADD: {
    DEC_R: function DEC_R(registers, reg) {
      var value = registers.getReg(reg);
      var result = value - 1 & 0xFF;
      registers.flagZ = result === 0;
      registers.flagH = ((value & 0xF) - 1 >> 4 & 1) === 1;
      registers.flagN = true;
      registers.setReg(reg, result);
      registers.PC += 1;
      return 4;
    },
    DEC_RADR: function DEC_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      var result = value - 1 & 0xFF;
      registers.flagZ = result === 0;
      registers.flagH = ((value & 0xF) - 1 >> 4 & 1) === 1;
      registers.flagN = true;
      memory.write(result, direction);
      registers.PC += 1;
      return 11;
    },
    INC_R: function INC_R(registers, reg) {
      var value = registers.getReg(reg);
      var result = value + 1 & 0xFF;
      registers.flagZ = result === 0;
      registers.flagH = (value & 0xF) + 1 >> 4 === 0;
      registers.flagN = false;
      registers.setReg(reg, result);
      registers.PC += 1;
      return 4;
    },
    INC_RADR: function INC_RADR(registers, memory, reg) {
      var direction = registers.getReg(reg);
      var value = memory.read(direction);
      var result = value + 1 & 0xFF;
      registers.flagZ = result === 0;
      registers.flagH = (value & 0xF) + 1 >> 4 === 0;
      registers.flagN = false;
      memory.write(result, direction);
      registers.PC += 1;
      return 11;
    },
    DEC_RR: function DEC_RR(registers, reg) {
      registers.setReg(reg, registers.getReg(reg) - 1 & 0xFFFF);
      registers.PC += 1;
      return 6;
    },
    INC_RR: function INC_RR(registers, reg) {
      registers.setReg(reg, registers.getReg(reg) + 1 & 0xFFFF);
      registers.PC += 1;
      return 6;
    },
    ADD_R_R: function ADD_R_R(registers, destiny, origin) {
      var valueOrigin = registers.getReg(origin);
      var valueDestiny = registers.getReg(destiny);
      var value = valueOrigin + valueDestiny;
      registers.flagZ = (value & 0xFF) === 0;
      registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) > 0x0F;
      registers.flagC = value > 0xFF;
      registers.flagN = false;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 4;
    },
    ADD_R_RADR: function ADD_R_RADR(registers, memory, destiny, origin) {
      var valueOrigin = memory.read(registers.getReg(origin));
      var valueDestiny = registers.getReg(destiny);
      var value = valueOrigin + valueDestiny;
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) > 0x0F;
      registers.flagC = value > 0xFF;
      registers.flagN = false;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 7;
    },
    ADD_RR_RR: function ADD_RR_RR(registers, destiny, origin) {
      var valueOrigin = registers.getReg(origin);
      var valueDestiny = registers.getReg(destiny);
      var value = valueOrigin + valueDestiny;
      registers.flagH = (valueDestiny & 0x0FFF) + (valueOrigin & 0x0FFF) > 0x0FFF;
      registers.flagC = value > 0xFFFF;
      registers.flagN = false;
      registers.setReg(destiny, value & 0xFFFF);
      registers.PC += 1;
      return 11;
    },
    ADD_R_NN: function ADD_R_NN(registers, memory, reg) {
      var value = memory.read(registers.PC + 1);
      if (value > 127) value -= 256;
      var result = registers.getReg(reg) + value;
      registers.setFlags(0);
      registers.flagC = result > 0xFFFF;
      registers.setReg(reg, result & 0xFFFF);
      registers.PC += 2;
      return 7;
    },
    ADD_R_N: function ADD_R_N(registers, memory, reg) {
      var value = memory.read(registers.PC + 1);
      var result = registers.getReg(reg) + value;
      registers.flagZ = (result & 0xFF) == 0;
      registers.flagC = result > 0xFFFF;
      registers.flagH = (result & 0x0F) + (value & 0x0F) > 0x0F;
      registers.flagN = false;
      registers.setReg(reg, result & 0xFF);
      registers.PC += 2;
      return 7;
    },
    CP_R: function CP_R(registers, reg) {
      var value = registers.getReg(reg);
      registers.flagZ = registers.A == value;
      registers.flagC = registers.A < value;
      registers.flagH = (registers.A & 0x0F) < (value & 0x0F);
      registers.flagN = true;
      registers.PC += 1;
      return 4;
    },
    CP_RADR: function CP_RADR(registers, memory, reg) {
      var value = memory.read(registers.getReg(reg));
      registers.flagZ = registers.A == value;
      registers.flagC = registers.A < value;
      registers.flagH = (registers.A & 0x0F) < (value & 0x0F);
      registers.flagN = true;
      registers.PC += 1;
      return 7;
    },
    CP_N: function CP_N(registers, memory) {
      var value = memory.read(registers.PC + 1);
      registers.flagZ = registers.A == value;
      registers.flagC = registers.A < value;
      registers.flagH = (registers.A & 0x0F) < (value & 0x0F);
      registers.flagN = true;
      registers.PC += 2;
      return 7;
    },
    SBC_R_R: function SBC_R_R(registers, destiny, origin) {
      var valueOrigin = registers.getReg(origin);
      var valueDestiny = registers.getReg(destiny);
      var value = valueDestiny - valueOrigin - (registers.flagC ? 1 : 0);
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) < (valueOrigin - (registers.flagC ? 1 : 0) & 0x0F);
      registers.flagC = value < 0;
      registers.flagN = true;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 4;
    },
    SUB_R_R: function SUB_R_R(registers, destiny, origin) {
      var valueOrigin = registers.getReg(origin);
      var valueDestiny = registers.getReg(destiny);
      var value = valueDestiny - valueOrigin;
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) < (valueOrigin & 0x0F);
      registers.flagC = value < 0;
      registers.flagN = true;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 4;
    },
    SUB_R_RADR: function SUB_R_RADR(registers, memory, destiny, origin) {
      var valueOrigin = memory.read(registers.getReg(origin));
      var valueDestiny = registers.getReg(destiny);
      var value = valueDestiny - valueOrigin;
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) < (valueOrigin & 0x0F);
      registers.flagC = value < 0;
      registers.flagN = true;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 4;
    },
    SBC_R_N: function SBC_R_N(registers, memory, reg) {
      var valueOrigin = memory.read(registers.PC + 1);
      var valueDestiny = registers.getReg(reg);
      var value = valueDestiny - valueOrigin - (registers.flagC ? 1 : 0);
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) < (valueOrigin - (registers.flagC ? 1 : 0) & 0x0F);
      registers.flagC = value < 0;
      registers.flagN = true;
      registers.setReg(reg, value & 0xFF);
      registers.PC += 2;
      return 4;
    },
    ADC_R_R: function ADC_R_R(registers, destiny, origin) {
      var valueOrigin = registers.getReg(origin);
      var valueDestiny = registers.getReg(destiny);
      var value = valueDestiny + valueOrigin + (registers.flagC ? 1 : 0);
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) + (registers.flagC ? 1 : 0) > 0x0F;
      registers.flagC = value < 0;
      registers.flagN = false;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 4;
    },
    ADC_R_RADR: function ADC_R_RADR(registers, memory, destiny, origin) {
      var valueOrigin = memory.read(registers.getReg(origin));
      var valueDestiny = registers.getReg(destiny);
      var value = valueDestiny + valueOrigin + (registers.flagC ? 1 : 0);
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) + (registers.flagC ? 1 : 0) > 0x0F;
      registers.flagC = value > 0xFF;
      registers.flagN = false;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 4;
    },
    ADC_R_N: function ADC_R_N(registers, memory, reg) {
      var valueOrigin = memory.read(registers.PC + 1);
      var valueDestiny = registers.getReg(reg);
      var value = valueDestiny + valueOrigin + (registers.flagC ? 1 : 0);
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) + (registers.flagC ? 1 : 0) > 0x0F;
      registers.flagC = value < 0;
      registers.flagN = false;
      registers.setReg(reg, value & 0xFF);
      registers.PC += 2;
      return 4;
    },
    SUB_R_N: function SUB_R_N(registers, memory, reg) {
      var valueOrigin = memory.read(registers.PC + 1);
      var valueDestiny = registers.getReg(reg);
      var value = valueDestiny - valueOrigin;
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) < (valueOrigin & 0x0F);
      registers.flagC = value < 0;
      registers.flagN = true;
      registers.setReg(reg, value & 0xFF);
      registers.PC += 2;
      return 4;
    },
    SBC_R_RADR: function SBC_R_RADR(registers, memory, destiny, origin) {
      var valueOrigin = memory.read(registers.getReg(origin));
      var valueDestiny = registers.getReg(destiny);
      var value = valueDestiny - valueOrigin - (registers.flagC ? 1 : 0);
      registers.flagZ = (value & 0xFF) == 0;
      registers.flagH = (valueDestiny & 0x0F) < (valueOrigin - (registers.flagC ? 1 : 0) & 0x0F);
      registers.flagC = value < 0;
      registers.flagN = true;
      registers.setReg(destiny, value & 0xFF);
      registers.PC += 1;
      return 4;
    },
    DAA: function DAA(registers) {
      var result = registers.A;
      var correction = 0;
      if (registers.flagH) correction |= 0x06;
      if (registers.flagC) correction |= 0x60;

      if (registers.flagN) {
        if ((result & 0x0F) > 0x09) correction |= 0x06;
        if (result > 0x99) correction |= 0x60;
        result += correction;
      } else {
        result -= correction;
      }

      registers.flagZ = (result & 0xFF) == 0;
      registers.flagC = (correction & 0x60) !== 0;
      registers.flagH = false;
      registers.A = result & 0xFF;
      registers.PC += 1;
      return 4;
    }
  }
};
var OPCODES = {
  0x00: function _(registers, memory) {
    return OPS.NOP(registers);
  },
  0x01: function _(registers, memory) {
    return OPS.LD.LD_DD_NN(registers, memory, 'BC');
  },
  0x02: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'BC', 'A');
  },
  0x03: function _(registers, memory) {
    return OPS.ADD.INC_RR(registers, 'BC');
  },
  0x04: function _(registers, memory) {
    return OPS.ADD.INC_R(registers, 'B');
  },
  0x05: function _(registers, memory) {
    return OPS.ADD.DEC_R(registers, 'B');
  },
  0x06: function _(registers, memory) {
    return OPS.LD.LD_R_N(registers, memory, 'B');
  },
  0x07: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'A', false);
  },
  0x08: function _(registers, memory) {
    return OPS.LD.LD_ADR_RR(registers, memory, 'SP');
  },
  0x09: function _(registers, memory) {
    return OPS.ADD.ADD_RR_RR(registers, 'HL', 'BC');
  },
  0x0A: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'A', 'BC');
  },
  0x0B: function _(registers, memory) {
    return OPS.ADD.DEC_RR(registers, 'BC');
  },
  0x0C: function _(registers, memory) {
    return OPS.ADD.INC_R(registers, 'C');
  },
  0x0D: function _(registers, memory) {
    return OPS.ADD.DEC_R(registers, 'C');
  },
  0x0E: function _(registers, memory) {
    return OPS.LD.LD_R_N(registers, memory, 'C');
  },
  0x0F: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'A', false);
  },
  0x10: function _(registers, memory) {
    return OPS.INT.STOP(registers);
  },
  0x11: function _(registers, memory) {
    return OPS.LD.LD_DD_NN(registers, memory, 'DE');
  },
  0x12: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'DE', 'A');
  },
  0x13: function _(registers, memory) {
    return OPS.ADD.INC_RR(registers, 'DE');
  },
  0x14: function _(registers, memory) {
    return OPS.ADD.INC_R(registers, 'D');
  },
  0x15: function _(registers, memory) {
    return OPS.ADD.DEC_R(registers, 'D');
  },
  0x16: function _(registers, memory) {
    return OPS.LD.LD_R_N(registers, memory, 'D');
  },
  0x17: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'A', false);
  },
  0x18: function _(registers, memory) {
    return OPS.JUMP.JR_N(registers, memory);
  },
  0x19: function _(registers, memory) {
    return OPS.ADD.ADD_RR_RR(registers, 'HL', 'DE');
  },
  0x1A: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'A', 'DE');
  },
  0x1B: function _(registers, memory) {
    return OPS.ADD.DEC_RR(registers, 'DE');
  },
  0x1C: function _(registers, memory) {
    return OPS.ADD.INC_R(registers, 'E');
  },
  0x1D: function _(registers, memory) {
    return OPS.ADD.DEC_R(registers, 'E');
  },
  0x1E: function _(registers, memory) {
    return OPS.LD.LD_R_N(registers, memory, 'E');
  },
  0x1F: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'A', false);
  },
  0x20: function _(registers, memory) {
    return OPS.JUMP.JR_CC0_N(registers, memory, 'Z');
  },
  0x21: function _(registers, memory) {
    return OPS.LD.LD_DD_NN(registers, memory, 'HL');
  },
  0x22: function _(registers, memory) {
    return OPS.LD.LDI_RADR_R(registers, memory, 'HL', 'A');
  },
  0x23: function _(registers, memory) {
    return OPS.ADD.INC_RR(registers, 'HL');
  },
  0x24: function _(registers, memory) {
    return OPS.ADD.INC_R(registers, 'H');
  },
  0x25: function _(registers, memory) {
    return OPS.ADD.DEC_R(registers, 'H');
  },
  0x26: function _(registers, memory) {
    return OPS.LD.LD_R_N(registers, memory, 'H');
  },
  0x27: function _(registers, memory) {
    return OPS.ADD.DAA(registers);
  },
  0x28: function _(registers, memory) {
    return OPS.JUMP.JR_CC1_N(registers, memory, 'Z');
  },
  0x29: function _(registers, memory) {
    return OPS.ADD.ADD_RR_RR(registers, 'HL', 'HL');
  },
  0x2A: function _(registers, memory) {
    return OPS.LD.LDI_R_RADR(registers, memory, 'A', 'HL');
  },
  0x2B: function _(registers, memory) {
    return OPS.ADD.DEC_RR(registers, 'HL');
  },
  0x2C: function _(registers, memory) {
    return OPS.ADD.INC_R(registers, 'L');
  },
  0x2D: function _(registers, memory) {
    return OPS.ADD.DEC_R(registers, 'L');
  },
  0x2E: function _(registers, memory) {
    return OPS.LD.LD_R_N(registers, memory, 'L');
  },
  0x2F: function _(registers, memory) {
    return OPS.COMP.CPL(registers);
  },
  0x30: function _(registers, memory) {
    return OPS.JUMP.JR_CC0_N(registers, memory, 'C');
  },
  0x31: function _(registers, memory) {
    return OPS.LD.LD_DD_NN(registers, memory, 'SP');
  },
  0x32: function _(registers, memory) {
    return OPS.LD.LDD_RADR_R(registers, memory, 'HL', 'A');
  },
  0x33: function _(registers, memory) {
    return OPS.ADD.INC_RR(registers, 'SP');
  },
  0x34: function _(registers, memory) {
    return OPS.ADD.INC_RADR(registers, memory, 'HL');
  },
  0x35: function _(registers, memory) {
    return OPS.ADD.DEC_RADR(registers, memory, 'HL');
  },
  0x36: function _(registers, memory) {
    return OPS.LD.LD_RADR_N(registers, memory, 'HL');
  },
  0x37: function _(registers, memory) {
    return OPS.COMP.SCF(registers);
  },
  0x38: function _(registers, memory) {
    return OPS.JUMP.JR_CC1_N(registers, memory, 'C');
  },
  0x39: function _(registers, memory) {
    return OPS.ADD.ADD_RR_RR(registers, 'HL', 'SP');
  },
  0x3A: function _(registers, memory) {
    return OPS.LD.LDD_R_RADR(registers, memory, 'A', 'HL');
  },
  0x3B: function _(registers, memory) {
    return OPS.ADD.DEC_RR(registers, 'SP');
  },
  0x3C: function _(registers, memory) {
    return OPS.ADD.INC_R(registers, 'A');
  },
  0x3D: function _(registers, memory) {
    return OPS.ADD.DEC_R(registers, 'A');
  },
  0x3E: function _(registers, memory) {
    return OPS.LD.LD_R_N(registers, memory, 'A');
  },
  0x3F: function _(registers, memory) {
    return OPS.COMP.CCF(registers);
  },
  0x40: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'B', 'B');
  },
  0x41: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'B', 'C');
  },
  0x42: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'B', 'D');
  },
  0x43: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'B', 'E');
  },
  0x44: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'B', 'H');
  },
  0x45: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'B', 'L');
  },
  0x46: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'B', 'HL');
  },
  0x47: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'B', 'A');
  },
  0x48: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'C', 'B');
  },
  0x49: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'C', 'C');
  },
  0x4A: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'C', 'D');
  },
  0x4B: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'C', 'E');
  },
  0x4C: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'C', 'H');
  },
  0x4D: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'C', 'L');
  },
  0x4E: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'C', 'HL');
  },
  0x4F: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'C', 'A');
  },
  0x50: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'D', 'B');
  },
  0x51: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'D', 'C');
  },
  0x52: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'D', 'D');
  },
  0x53: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'D', 'E');
  },
  0x54: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'D', 'H');
  },
  0x55: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'D', 'L');
  },
  0x56: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'D', 'HL');
  },
  0x57: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'D', 'A');
  },
  0x58: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'E', 'B');
  },
  0x59: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'E', 'C');
  },
  0x5A: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'E', 'D');
  },
  0x5B: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'E', 'E');
  },
  0x5C: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'E', 'H');
  },
  0x5D: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'E', 'L');
  },
  0x5E: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'E', 'HL');
  },
  0x5F: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'E', 'A');
  },
  0x60: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'H', 'B');
  },
  0x61: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'H', 'C');
  },
  0x62: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'H', 'D');
  },
  0x63: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'H', 'E');
  },
  0x64: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'H', 'H');
  },
  0x65: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'H', 'L');
  },
  0x66: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'H', 'HL');
  },
  0x67: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'H', 'A');
  },
  0x68: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'L', 'B');
  },
  0x69: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'L', 'C');
  },
  0x6A: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'L', 'D');
  },
  0x6B: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'L', 'E');
  },
  0x6C: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'L', 'H');
  },
  0x6D: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'L', 'L');
  },
  0x6E: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'L', 'HL');
  },
  0x6F: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'L', 'A');
  },
  0x70: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'HL', 'B');
  },
  0x71: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'HL', 'C');
  },
  0x72: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'HL', 'D');
  },
  0x73: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'HL', 'E');
  },
  0x74: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'HL', 'H');
  },
  0x75: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'HL', 'L');
  },
  0x76: function _(registers, memory) {
    return OPS.INT.HALT(registers, memory);
  },
  0x77: function _(registers, memory) {
    return OPS.LD.LD_RADR_R(registers, memory, 'HL', 'A');
  },
  0x78: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'A', 'B');
  },
  0x79: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'A', 'C');
  },
  0x7A: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'A', 'D');
  },
  0x7B: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'A', 'E');
  },
  0x7C: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'A', 'H');
  },
  0x7D: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'A', 'L');
  },
  0x7E: function _(registers, memory) {
    return OPS.LD.LD_R_RADR(registers, memory, 'A', 'HL');
  },
  0x7F: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'A', 'A');
  },
  0x80: function _(registers, memory) {
    return OPS.ADD.ADD_R_R(registers, 'A', 'B');
  },
  0x81: function _(registers, memory) {
    return OPS.ADD.ADD_R_R(registers, 'A', 'C');
  },
  0x82: function _(registers, memory) {
    return OPS.ADD.ADD_R_R(registers, 'A', 'D');
  },
  0x83: function _(registers, memory) {
    return OPS.ADD.ADD_R_R(registers, 'A', 'E');
  },
  0x84: function _(registers, memory) {
    return OPS.ADD.ADD_R_R(registers, 'A', 'H');
  },
  0x85: function _(registers, memory) {
    return OPS.ADD.ADD_R_R(registers, 'A', 'L');
  },
  0x86: function _(registers, memory) {
    return OPS.ADD.ADD_R_RADR(registers, memory, 'A', 'HL');
  },
  0x87: function _(registers, memory) {
    return OPS.ADD.ADD_R_R(registers, 'A', 'A');
  },
  0x88: function _(registers, memory) {
    return OPS.ADD.ADC_R_R(registers, 'A', 'B');
  },
  0x89: function _(registers, memory) {
    return OPS.ADD.ADC_R_R(registers, 'A', 'C');
  },
  0x8A: function _(registers, memory) {
    return OPS.ADD.ADC_R_R(registers, 'A', 'D');
  },
  0x8B: function _(registers, memory) {
    return OPS.ADD.ADC_R_R(registers, 'A', 'E');
  },
  0x8C: function _(registers, memory) {
    return OPS.ADD.ADC_R_R(registers, 'A', 'H');
  },
  0x8D: function _(registers, memory) {
    return OPS.ADD.ADC_R_R(registers, 'A', 'L');
  },
  0x8E: function _(registers, memory) {
    return OPS.ADD.ADC_R_RADR(registers, memory, 'A', 'HL');
  },
  0x8F: function _(registers, memory) {
    return OPS.ADD.ADC_R_R(registers, 'A', 'A');
  },
  0x90: function _(registers, memory) {
    return OPS.ADD.SUB_R_R(registers, 'A', 'B');
  },
  0x91: function _(registers, memory) {
    return OPS.ADD.SUB_R_R(registers, 'A', 'C');
  },
  0x92: function _(registers, memory) {
    return OPS.ADD.SUB_R_R(registers, 'A', 'D');
  },
  0x93: function _(registers, memory) {
    return OPS.ADD.SUB_R_R(registers, 'A', 'E');
  },
  0x94: function _(registers, memory) {
    return OPS.ADD.SUB_R_R(registers, 'A', 'H');
  },
  0x95: function _(registers, memory) {
    return OPS.ADD.SUB_R_R(registers, 'A', 'L');
  },
  0x96: function _(registers, memory) {
    return OPS.ADD.SUB_R_RADR(registers, memory, 'A', 'HL');
  },
  0x97: function _(registers, memory) {
    return OPS.ADD.SUB_R_R(registers, 'A', 'A');
  },
  0x98: function _(registers, memory) {
    return OPS.ADD.SBC_R_R(registers, 'A', 'B');
  },
  0x99: function _(registers, memory) {
    return OPS.ADD.SBC_R_R(registers, 'A', 'C');
  },
  0x9A: function _(registers, memory) {
    return OPS.ADD.SBC_R_R(registers, 'A', 'D');
  },
  0x9B: function _(registers, memory) {
    return OPS.ADD.SBC_R_R(registers, 'A', 'E');
  },
  0x9C: function _(registers, memory) {
    return OPS.ADD.SBC_R_R(registers, 'A', 'H');
  },
  0x9D: function _(registers, memory) {
    return OPS.ADD.SBC_R_R(registers, 'A', 'L');
  },
  0x9E: function _(registers, memory) {
    return OPS.ADD.SBC_R_RADR(registers, memory, 'A', 'HL');
  },
  0x9F: function _(registers, memory) {
    return OPS.ADD.SBC_R_R(registers, 'A', 'A');
  },
  0xA0: function _(registers, memory) {
    return OPS.LOGIC.AND_R_R(registers, 'B');
  },
  0xA1: function _(registers, memory) {
    return OPS.LOGIC.AND_R_R(registers, 'C');
  },
  0xA2: function _(registers, memory) {
    return OPS.LOGIC.AND_R_R(registers, 'D');
  },
  0xA3: function _(registers, memory) {
    return OPS.LOGIC.AND_R_R(registers, 'E');
  },
  0xA4: function _(registers, memory) {
    return OPS.LOGIC.AND_R_R(registers, 'H');
  },
  0xA5: function _(registers, memory) {
    return OPS.LOGIC.AND_R_R(registers, 'L');
  },
  0xA6: function _(registers, memory) {
    return OPS.LOGIC.AND_RADR(registers, memory, 'HL');
  },
  0xA7: function _(registers, memory) {
    return OPS.LOGIC.AND_R_R(registers, 'A');
  },
  0xA8: function _(registers, memory) {
    return OPS.LOGIC.XOR_R(registers, 'B');
  },
  0xA9: function _(registers, memory) {
    return OPS.LOGIC.XOR_R(registers, 'C');
  },
  0xAA: function _(registers, memory) {
    return OPS.LOGIC.XOR_R(registers, 'D');
  },
  0xAB: function _(registers, memory) {
    return OPS.LOGIC.XOR_R(registers, 'E');
  },
  0xAC: function _(registers, memory) {
    return OPS.LOGIC.XOR_R(registers, 'H');
  },
  0xAD: function _(registers, memory) {
    return OPS.LOGIC.XOR_R(registers, 'L');
  },
  0xAE: function _(registers, memory) {
    return OPS.LOGIC.XOR_RADR(registers, memory, 'HL');
  },
  0xAF: function _(registers, memory) {
    return OPS.LOGIC.XOR_R(registers, 'A');
  },
  0xB0: function _(registers, memory) {
    return OPS.LOGIC.OR_R_R(registers, 'B');
  },
  0xB1: function _(registers, memory) {
    return OPS.LOGIC.OR_R_R(registers, 'C');
  },
  0xB2: function _(registers, memory) {
    return OPS.LOGIC.OR_R_R(registers, 'D');
  },
  0xB3: function _(registers, memory) {
    return OPS.LOGIC.OR_R_R(registers, 'E');
  },
  0xB4: function _(registers, memory) {
    return OPS.LOGIC.OR_R_R(registers, 'H');
  },
  0xB5: function _(registers, memory) {
    return OPS.LOGIC.OR_R_R(registers, 'L');
  },
  0xB6: function _(registers, memory) {
    return OPS.LOGIC.OR_R_ADR(registers, memory, 'HL');
  },
  0xB7: function _(registers, memory) {
    return OPS.LOGIC.OR_R_R(registers, 'A');
  },
  0xB8: function _(registers, memory) {
    return OPS.ADD.CP_R(registers, 'B');
  },
  0xB9: function _(registers, memory) {
    return OPS.ADD.CP_R(registers, 'C');
  },
  0xBA: function _(registers, memory) {
    return OPS.ADD.CP_R(registers, 'D');
  },
  0xBB: function _(registers, memory) {
    return OPS.ADD.CP_R(registers, 'E');
  },
  0xBC: function _(registers, memory) {
    return OPS.ADD.CP_R(registers, 'H');
  },
  0xBD: function _(registers, memory) {
    return OPS.ADD.CP_R(registers, 'L');
  },
  0xBE: function _(registers, memory) {
    return OPS.ADD.CP_RADR(registers, memory, 'HL');
  },
  0xBF: function _(registers, memory) {
    return OPS.ADD.CP_R(registers, 'A');
  },
  0xC0: function _(registers, memory) {
    return OPS.JUMP.RET_CC0_ADR(registers, memory, 'Z');
  },
  0xC1: function _(registers, memory) {
    return OPS.JUMP.POP_RR(registers, memory, 'BC');
  },
  0xC2: function _(registers, memory) {
    return OPS.JUMP.JP_CC0_ADR(registers, memory, 'Z');
  },
  0xC3: function _(registers, memory) {
    return OPS.JUMP.JP_ADR(registers, memory);
  },
  0xC4: function _(registers, memory) {
    return OPS.JUMP.CALL_CC0_ADR(registers, memory, 'Z');
  },
  0xC5: function _(registers, memory) {
    return OPS.JUMP.PUSH_RR(registers, memory, 'BC');
  },
  0xC6: function _(registers, memory) {
    return OPS.ADD.ADD_R_N(registers, memory, 'A');
  },
  0xC7: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x00);
  },
  0xC8: function _(registers, memory) {
    return OPS.JUMP.RET_CC1_ADR(registers, memory, 'Z');
  },
  0xC9: function _(registers, memory) {
    return OPS.JUMP.RET_ADR(registers, memory);
  },
  0xCA: function _(registers, memory) {
    return OPS.JUMP.JP_CC1_ADR(registers, memory, 'Z');
  },
  // 0xCB:
  0xCC: function _(registers, memory) {
    return OPS.JUMP.CALL_CC1_ADR(registers, memory, 'Z');
  },
  0xCD: function _(registers, memory) {
    return OPS.JUMP.CALL_ADR(registers, memory);
  },
  0xCE: function _(registers, memory) {
    return OPS.ADD.ADC_R_N(registers, memory, 'A');
  },
  0xCF: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x08);
  },
  0xD0: function _(registers, memory) {
    return OPS.JUMP.RET_CC0_ADR(registers, memory, 'C');
  },
  0xD1: function _(registers, memory) {
    return OPS.JUMP.POP_RR(registers, memory, 'DE');
  },
  0xD2: function _(registers, memory) {
    return OPS.JUMP.JP_CC0_ADR(registers, memory, 'C');
  },
  // 0xD3: 
  0xD4: function _(registers, memory) {
    return OPS.JUMP.CALL_CC0_ADR(registers, memory, 'C');
  },
  0xD5: function _(registers, memory) {
    return OPS.JUMP.PUSH_RR(registers, memory, 'DE');
  },
  0xD6: function _(registers, memory) {
    return OPS.ADD.SUB_R_N(registers, memory, 'A');
  },
  0xD7: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x10);
  },
  0xD8: function _(registers, memory) {
    return OPS.JUMP.RET_CC1_ADR(registers, memory, 'C');
  },
  0xD9: function _(registers, memory) {
    return OPS.JUMP.RETI(registers, memory);
  },
  0xDA: function _(registers, memory) {
    return OPS.JUMP.JP_CC1_ADR(registers, memory, 'C');
  },
  // 0xDB:
  0xDC: function _(registers, memory) {
    return OPS.JUMP.CALL_CC1_ADR(registers, memory, 'C');
  },
  // 0xDD: 
  0xDE: function _(registers, memory) {
    return OPS.ADD.SBC_R_N(registers, memory, 'A');
  },
  0xDF: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x18);
  },
  0xE0: function _(registers, memory) {
    return OPS.LD.LD_DADR_R(registers, memory, 'A');
  },
  0xE1: function _(registers, memory) {
    return OPS.JUMP.POP_RR(registers, memory, 'HL');
  },
  0xE2: function _(registers, memory) {
    return OPS.LD.LD_DR_R(registers, memory, 'C', 'A');
  },
  // 0xE3: 
  // 0xE4:
  0xE5: function _(registers, memory) {
    return OPS.JUMP.PUSH_RR(registers, memory, 'HL');
  },
  0xE6: function _(registers, memory) {
    return OPS.LOGIC.AND_R_N(registers, memory);
  },
  0xE7: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x20);
  },
  0xE8: function _(registers, memory) {
    return OPS.ADD.ADD_R_NN(registers, memory, 'SP');
  },
  0xE9: function _(registers, memory) {
    return OPS.JUMP.JP_RADR(registers, 'HL');
  },
  0xEA: function _(registers, memory) {
    return OPS.LD.LD_ADR_R(registers, memory, 'A');
  },
  // 0xEB:
  // 0xEC:
  // 0xED: 
  0xEE: function _(registers, memory) {
    return OPS.LOGIC.XOR_N(registers, memory);
  },
  0xEF: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x28);
  },
  0xF0: function _(registers, memory) {
    return OPS.LD.LD_R_DADR(registers, memory, 'A');
  },
  0xF1: function _(registers, memory) {
    return OPS.JUMP.POP_RR(registers, memory, 'AF');
  },
  0xF2: function _(registers, memory) {
    return OPS.LD.LD_R_DR(registers, memory, 'A', 'C');
  },
  0xF3: function _(registers, memory) {
    return OPS.INT.DI(registers);
  },
  // 0xF4: 
  0xF5: function _(registers, memory) {
    return OPS.JUMP.PUSH_RR(registers, memory, 'AF');
  },
  0xF6: function _(registers, memory) {
    return OPS.LOGIC.OR_N(registers, memory);
  },
  0xF7: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x30);
  },
  0xF8: function _(registers, memory) {
    return OPS.LD.LD_R_SPD(registers, memory, 'HL');
  },
  0xF9: function _(registers, memory) {
    return OPS.LD.LD_R_R(registers, 'SP', 'HL');
  },
  0xFA: function _(registers, memory) {
    return OPS.LD.LD_R_ADR(registers, memory, 'A');
  },
  0xFB: function _(registers, memory) {
    return OPS.INT.EI(registers);
  },
  // 0xFC: 
  // 0xFD:
  0xFE: function _(registers, memory) {
    return OPS.ADD.CP_N(registers, memory);
  },
  0xFF: function _(registers, memory) {
    return OPS.JUMP.RST(registers, memory, 0x38);
  }
};
exports.OPCODES = OPCODES;
var OPCODES_CB = {
  0x00: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'B', true);
  },
  0x01: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'C', true);
  },
  0x02: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'D', true);
  },
  0x03: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'E', true);
  },
  0x04: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'H', true);
  },
  0x05: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'L', true);
  },
  0x06: function _(registers, memory) {
    return OPS.SHIFT.RLC_RADR(registers, memory, 'HL');
  },
  0x07: function _(registers, memory) {
    return OPS.SHIFT.RLC(registers, 'A', true);
  },
  0x08: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'B', true);
  },
  0x09: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'C', true);
  },
  0x0A: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'D', true);
  },
  0x0B: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'E', true);
  },
  0x0C: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'H', true);
  },
  0x0D: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'L', true);
  },
  0x0E: function _(registers, memory) {
    return OPS.SHIFT.RRC_RADR(registers, memory, 'HL');
  },
  0x0F: function _(registers, memory) {
    return OPS.SHIFT.RRC(registers, 'A', true);
  },
  0x10: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'B', true);
  },
  0x11: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'C', true);
  },
  0x12: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'D', true);
  },
  0x13: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'E', true);
  },
  0x14: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'H', true);
  },
  0x15: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'L', true);
  },
  0x16: function _(registers, memory) {
    return OPS.SHIFT.RL_RADR(registers, memory, 'HL');
  },
  0x17: function _(registers, memory) {
    return OPS.SHIFT.RL(registers, 'A', true);
  },
  0x18: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'B', true);
  },
  0x19: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'C', true);
  },
  0x1A: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'D', true);
  },
  0x1B: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'E', true);
  },
  0x1C: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'H', true);
  },
  0x1D: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'L', true);
  },
  0x1E: function _(registers, memory) {
    return OPS.SHIFT.RR_RADR(registers, memory, 'HL');
  },
  0x1F: function _(registers, memory) {
    return OPS.SHIFT.RR(registers, 'A', true);
  },
  0x20: function _(registers, memory) {
    return OPS.SHIFT.SLA(registers, 'B');
  },
  0x21: function _(registers, memory) {
    return OPS.SHIFT.SLA(registers, 'C');
  },
  0x22: function _(registers, memory) {
    return OPS.SHIFT.SLA(registers, 'D');
  },
  0x23: function _(registers, memory) {
    return OPS.SHIFT.SLA(registers, 'E');
  },
  0x24: function _(registers, memory) {
    return OPS.SHIFT.SLA(registers, 'H');
  },
  0x25: function _(registers, memory) {
    return OPS.SHIFT.SLA(registers, 'L');
  },
  0x26: function _(registers, memory) {
    return OPS.SHIFT.SLA_RADR(registers, memory, 'HL');
  },
  0x27: function _(registers, memory) {
    return OPS.SHIFT.SLA(registers, 'A');
  },
  0x28: function _(registers, memory) {
    return OPS.SHIFT.SRA(registers, 'B');
  },
  0x29: function _(registers, memory) {
    return OPS.SHIFT.SRA(registers, 'C');
  },
  0x2A: function _(registers, memory) {
    return OPS.SHIFT.SRA(registers, 'D');
  },
  0x2B: function _(registers, memory) {
    return OPS.SHIFT.SRA(registers, 'E');
  },
  0x2C: function _(registers, memory) {
    return OPS.SHIFT.SRA(registers, 'H');
  },
  0x2D: function _(registers, memory) {
    return OPS.SHIFT.SRA(registers, 'L');
  },
  0x2E: function _(registers, memory) {
    return OPS.SHIFT.SRA_RADR(registers, memory, 'HL');
  },
  0x2F: function _(registers, memory) {
    return OPS.SHIFT.SRA(registers, 'A');
  },
  0x30: function _(registers, memory) {
    return OPS.BIT.SWAP_R(registers, 'B');
  },
  0x31: function _(registers, memory) {
    return OPS.BIT.SWAP_R(registers, 'C');
  },
  0x32: function _(registers, memory) {
    return OPS.BIT.SWAP_R(registers, 'D');
  },
  0x33: function _(registers, memory) {
    return OPS.BIT.SWAP_R(registers, 'E');
  },
  0x34: function _(registers, memory) {
    return OPS.BIT.SWAP_R(registers, 'H');
  },
  0x35: function _(registers, memory) {
    return OPS.BIT.SWAP_R(registers, 'L');
  },
  0x36: function _(registers, memory) {
    return OPS.BIT.SWAP_RADR(registers, memory, 'HL');
  },
  0x37: function _(registers, memory) {
    return OPS.BIT.SWAP_R(registers, 'A');
  },
  0x38: function _(registers, memory) {
    return OPS.SHIFT.SRL(registers, 'B');
  },
  0x39: function _(registers, memory) {
    return OPS.SHIFT.SRL(registers, 'C');
  },
  0x3A: function _(registers, memory) {
    return OPS.SHIFT.SRL(registers, 'D');
  },
  0x3B: function _(registers, memory) {
    return OPS.SHIFT.SRL(registers, 'E');
  },
  0x3C: function _(registers, memory) {
    return OPS.SHIFT.SRL(registers, 'H');
  },
  0x3D: function _(registers, memory) {
    return OPS.SHIFT.SRL(registers, 'L');
  },
  0x3E: function _(registers, memory) {
    return OPS.SHIFT.SRL_RADR(registers, memory, 'HL');
  },
  0x3F: function _(registers, memory) {
    return OPS.SHIFT.SRL(registers, 'A');
  },
  0x40: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x01, 'B');
  },
  0x41: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x01, 'C');
  },
  0x42: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x01, 'D');
  },
  0x43: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x01, 'E');
  },
  0x44: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x01, 'H');
  },
  0x45: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x01, 'L');
  },
  0x46: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x01, 'HL');
  },
  0x47: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x01, 'A');
  },
  0x48: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x02, 'B');
  },
  0x49: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x02, 'C');
  },
  0x4A: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x02, 'D');
  },
  0x4B: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x02, 'E');
  },
  0x4C: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x02, 'H');
  },
  0x4D: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x02, 'L');
  },
  0x4E: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x02, 'HL');
  },
  0x4F: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x02, 'A');
  },
  0x50: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x04, 'B');
  },
  0x51: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x04, 'C');
  },
  0x52: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x04, 'D');
  },
  0x53: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x04, 'E');
  },
  0x54: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x04, 'H');
  },
  0x55: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x04, 'L');
  },
  0x56: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x04, 'HL');
  },
  0x57: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x04, 'A');
  },
  0x58: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x08, 'B');
  },
  0x59: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x08, 'C');
  },
  0x5A: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x08, 'D');
  },
  0x5B: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x08, 'E');
  },
  0x5C: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x08, 'H');
  },
  0x5D: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x08, 'L');
  },
  0x5E: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x08, 'HL');
  },
  0x5F: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x08, 'A');
  },
  0x60: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x10, 'B');
  },
  0x61: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x10, 'C');
  },
  0x62: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x10, 'D');
  },
  0x63: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x10, 'E');
  },
  0x64: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x10, 'H');
  },
  0x65: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x10, 'L');
  },
  0x66: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x10, 'HL');
  },
  0x67: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x10, 'A');
  },
  0x68: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x20, 'B');
  },
  0x69: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x20, 'C');
  },
  0x6A: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x20, 'D');
  },
  0x6B: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x20, 'E');
  },
  0x6C: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x20, 'H');
  },
  0x6D: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x20, 'L');
  },
  0x6E: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x20, 'HL');
  },
  0x6F: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x20, 'A');
  },
  0x70: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x40, 'B');
  },
  0x71: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x40, 'C');
  },
  0x72: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x40, 'D');
  },
  0x73: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x40, 'E');
  },
  0x74: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x40, 'H');
  },
  0x75: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x40, 'L');
  },
  0x76: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x40, 'HL');
  },
  0x77: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x40, 'A');
  },
  0x78: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x80, 'B');
  },
  0x79: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x80, 'C');
  },
  0x7A: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x80, 'D');
  },
  0x7B: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x80, 'E');
  },
  0x7C: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x80, 'H');
  },
  0x7D: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x80, 'L');
  },
  0x7E: function _(registers, memory) {
    return OPS.BIT.BIT_RADR(registers, memory, 0x80, 'HL');
  },
  0x7F: function _(registers, memory) {
    return OPS.BIT.BIT_R(registers, 0x80, 'A');
  },
  0x80: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x01, 'B');
  },
  0x81: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x01, 'C');
  },
  0x82: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x01, 'D');
  },
  0x83: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x01, 'E');
  },
  0x84: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x01, 'H');
  },
  0x85: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x01, 'L');
  },
  0x86: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x01, 'HL');
  },
  0x87: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x01, 'A');
  },
  0x88: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x02, 'B');
  },
  0x89: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x02, 'C');
  },
  0x8A: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x02, 'D');
  },
  0x8B: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x02, 'E');
  },
  0x8C: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x02, 'H');
  },
  0x8D: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x02, 'L');
  },
  0x8E: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x02, 'HL');
  },
  0x8F: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x02, 'A');
  },
  0x90: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x04, 'B');
  },
  0x91: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x04, 'C');
  },
  0x92: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x04, 'D');
  },
  0x93: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x04, 'E');
  },
  0x94: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x04, 'H');
  },
  0x95: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x04, 'L');
  },
  0x96: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x04, 'HL');
  },
  0x97: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x04, 'A');
  },
  0x98: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x08, 'B');
  },
  0x99: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x08, 'C');
  },
  0x9A: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x08, 'D');
  },
  0x9B: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x08, 'E');
  },
  0x9C: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x08, 'H');
  },
  0x9D: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x08, 'L');
  },
  0x9E: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x08, 'HL');
  },
  0x9F: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x08, 'A');
  },
  0xA0: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x10, 'B');
  },
  0xA1: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x10, 'C');
  },
  0xA2: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x10, 'D');
  },
  0xA3: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x10, 'E');
  },
  0xA4: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x10, 'H');
  },
  0xA5: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x10, 'L');
  },
  0xA6: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x10, 'HL');
  },
  0xA7: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x10, 'A');
  },
  0xA8: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x20, 'B');
  },
  0xA9: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x20, 'C');
  },
  0xAA: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x20, 'D');
  },
  0xAB: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x20, 'E');
  },
  0xAC: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x20, 'H');
  },
  0xAD: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x20, 'L');
  },
  0xAE: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x20, 'HL');
  },
  0xAF: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x20, 'A');
  },
  0xB0: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x40, 'B');
  },
  0xB1: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x40, 'C');
  },
  0xB2: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x40, 'D');
  },
  0xB3: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x40, 'E');
  },
  0xB4: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x40, 'H');
  },
  0xB5: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x40, 'L');
  },
  0xB6: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x40, 'HL');
  },
  0xB7: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x40, 'A');
  },
  0xB8: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x80, 'B');
  },
  0xB9: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x80, 'C');
  },
  0xBA: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x80, 'D');
  },
  0xBB: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x80, 'E');
  },
  0xBC: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x80, 'H');
  },
  0xBD: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x80, 'L');
  },
  0xBE: function _(registers, memory) {
    return OPS.BIT.RES_RADR(registers, memory, 0x80, 'HL');
  },
  0xBF: function _(registers, memory) {
    return OPS.BIT.RES_R(registers, 0x80, 'A');
  },
  0xC0: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x01, 'B');
  },
  0xC1: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x01, 'C');
  },
  0xC2: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x01, 'D');
  },
  0xC3: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x01, 'E');
  },
  0xC4: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x01, 'H');
  },
  0xC5: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x01, 'L');
  },
  0xC6: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x01, 'HL');
  },
  0xC7: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x01, 'A');
  },
  0xC8: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x02, 'B');
  },
  0xC9: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x02, 'C');
  },
  0xCA: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x02, 'D');
  },
  0xCB: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x02, 'E');
  },
  0xCC: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x02, 'H');
  },
  0xCD: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x02, 'L');
  },
  0xCE: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x02, 'HL');
  },
  0xCF: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x02, 'A');
  },
  0xD0: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x04, 'B');
  },
  0xD1: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x04, 'C');
  },
  0xD2: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x04, 'D');
  },
  0xD3: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x04, 'E');
  },
  0xD4: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x04, 'H');
  },
  0xD5: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x04, 'L');
  },
  0xD6: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x04, 'HL');
  },
  0xD7: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x04, 'A');
  },
  0xD8: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x08, 'B');
  },
  0xD9: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x08, 'C');
  },
  0xDA: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x08, 'D');
  },
  0xDB: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x08, 'E');
  },
  0xDC: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x08, 'H');
  },
  0xDD: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x08, 'L');
  },
  0xDE: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x08, 'HL');
  },
  0xDF: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x08, 'A');
  },
  0xE0: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x10, 'B');
  },
  0xE1: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x10, 'C');
  },
  0xE2: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x10, 'D');
  },
  0xE3: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x10, 'E');
  },
  0xE4: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x10, 'H');
  },
  0xE5: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x10, 'L');
  },
  0xE6: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x10, 'HL');
  },
  0xE7: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x10, 'A');
  },
  0xE8: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x20, 'B');
  },
  0xE9: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x20, 'C');
  },
  0xEA: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x20, 'D');
  },
  0xEB: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x20, 'E');
  },
  0xEC: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x20, 'H');
  },
  0xED: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x20, 'L');
  },
  0xEE: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x20, 'HL');
  },
  0xEF: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x20, 'A');
  },
  0xF0: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x40, 'B');
  },
  0xF1: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x40, 'C');
  },
  0xF2: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x40, 'D');
  },
  0xF3: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x40, 'E');
  },
  0xF4: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x40, 'H');
  },
  0xF5: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x40, 'L');
  },
  0xF6: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x40, 'HL');
  },
  0xF7: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x40, 'A');
  },
  0xF8: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x80, 'B');
  },
  0xF9: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x80, 'C');
  },
  0xFA: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x80, 'D');
  },
  0xFB: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x80, 'E');
  },
  0xFC: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x80, 'H');
  },
  0xFD: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x80, 'L');
  },
  0xFE: function _(registers, memory) {
    return OPS.BIT.SET_RADR(registers, memory, 0x80, 'HL');
  },
  0xFF: function _(registers, memory) {
    return OPS.BIT.SET_R(registers, 0x80, 'A');
  }
};
exports.OPCODES_CB = OPCODES_CB;
},{"../util/constants":"src/app/util/constants.ts"}],"src/app/kernel/cpu.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CPU = void 0;

var _registers = require("./registers");

var _constants = require("../util/constants");

var _instructions = require("./instructions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CPU = /*#__PURE__*/function () {
  function CPU(memory, graphics) {
    _classCallCheck(this, CPU);

    this.memory = memory;
    this.registers = new _registers.Registers();
    this.graphics = graphics;
    this.cycles = new Array(3);
    this.reset();
  } // Asigna un valor por defecto a los registros y a ciertas direcciones de memoria
  // Equivale a un reinicio fisico de la consola


  _createClass(CPU, [{
    key: "reset",
    value: function reset() {
      this.cycles[0] = 0;
      this.cycles[1] = 0;
      this.cycles[2] = 0;
      this.registers.reset();
      this.memory.reset();
    }
  }, {
    key: "run",
    value: function run() {
      // Ciclo principal: procesa instruccion, activa las interrupciones adecuadas simulando
      // el hardware, y finalmente ejecuta las rutinas de tratamiento de interrupciones
      var ticks = this.processInstruction();
      this.checkInterruptions();
      this.fireInterruptions();
      return ticks;
    } // Activa las interrupciones adecuadas y simula su funcionamiento por hardware

  }, {
    key: "fireInterruptions",
    value: function fireInterruptions() {
      // Interrupcion TIMER
      if ((this.memory.read(_constants.Constants.TIMER_CRTL) & 0x04) != 0) {
        var timerMax = 0; // Velocidad del temporizador

        switch (this.memory.read(_constants.Constants.TIMER_CRTL) & 0x03) {
          case 0:
            timerMax = _constants.Constants.CYCLES_TIMER_MODE0;
            break;

          case 1:
            timerMax = _constants.Constants.CYCLES_TIMER_MODE1;
            break;

          case 2:
            timerMax = _constants.Constants.CYCLES_TIMER_MODE2;
            break;

          case 3:
            timerMax = _constants.Constants.CYCLES_TIMER_MODE3;
            break;
        }

        if (this.cycles[1] > timerMax) {
          this.cycles[1] = 0;
          this.memory.write(this.memory.read(_constants.Constants.TIMER_COUNT) + 1, _constants.Constants.TIMER_COUNT); // Si desborda se activa la interrupcion y se reinicia el contador

          if (this.memory.read(_constants.Constants.TIMER_COUNT) == 0xFF) {
            this.memory.write(this.memory.read(_constants.Constants.TIMER_RELOAD), _constants.Constants.TIMER_COUNT);
            this.memory.write(this.memory.read(_constants.Constants.INT_FLAG) | _constants.Constants.INT_TIMER, _constants.Constants.INT_FLAG);
          }
        }
      } // Registro DIV


      if (this.cycles[0] > _constants.Constants.CYCLES_DIV) {
        this.memory.write(this.memory.read(_constants.Constants.DIV_CNTR) + 1, _constants.Constants.DIV_CNTR);
        this.cycles[0] = 0;
      } // Interrupcion LCDC


      if (this.cycles[2] > _constants.Constants.CYCLES_LCD_MODE1) {
        this.cycles[2] = 0; // Aumento de linea de dibujo

        if (this.memory.read(_constants.Constants.LCD_Y_LOC) == 0x99) this.memory.write(0, _constants.Constants.LCD_Y_LOC);else this.memory.write(this.memory.read(_constants.Constants.LCD_Y_LOC) + 1, _constants.Constants.LCD_Y_LOC); // Comparacion de linea

        if (this.memory.read(_constants.Constants.LCD_Y_LOC) == this.memory.read(_constants.Constants.LCD_Y_COMP)) {
          this.memory.write(this.memory.read(_constants.Constants.LCD_STAT) | 0x04, _constants.Constants.LCD_STAT);
          if ((this.memory.read(_constants.Constants.LCD_STAT) & 0x40) > 0) this.memory.write(this.memory.read(_constants.Constants.INT_FLAG) | _constants.Constants.INT_LCDC, _constants.Constants.INT_FLAG);
        } else {
          this.memory.write(this.memory.read(_constants.Constants.LCD_STAT) & 0xFB, _constants.Constants.LCD_STAT);
        }
      }

      if (this.memory.read(_constants.Constants.LCD_Y_LOC) < 144) {
        // Modo 10 (Cuando se esta accediendo entre 0xFE00 y 0xFE9F)
        if (this.cycles[2] < _constants.Constants.CYCLES_LCD_MODE2 && (this.memory.read(_constants.Constants.LCD_STAT) & 0x03) != 0x02) {
          this.memory.write(this.memory.read(_constants.Constants.LCD_STAT) & 0xFC | 0x02, _constants.Constants.LCD_STAT);
          if ((this.memory.read(_constants.Constants.LCD_STAT) & 0x20) > 0) this.memory.write(this.memory.read(_constants.Constants.INT_FLAG) | _constants.Constants.INT_LCDC, _constants.Constants.INT_FLAG); // Modo 11 
        } else if (this.cycles[2] >= _constants.Constants.CYCLES_LCD_MODE2 && this.cycles[2] < _constants.Constants.CYCLES_LCD_MODE3 && (this.memory.read(_constants.Constants.LCD_STAT) & 0x03) != 0x03) {
          // Se dibujan las primeras 144 lineas cuando se ha dejado de escribir en la zona grafica de memoria
          this.graphics.hblank();
          this.memory.write(this.memory.read(_constants.Constants.LCD_STAT) & 0xFC | 0x03, _constants.Constants.LCD_STAT); // Modo 00 (Durante el HBLANK, la CPU puede acceder a la display RAM entre 0x8000 y 0x9FFF)
        } else if (this.cycles[2] >= _constants.Constants.CYCLES_LCD_MODE3 && (this.memory.read(_constants.Constants.LCD_STAT) & 0x03) != 0) {
          this.memory.write(this.memory.read(_constants.Constants.LCD_STAT) & 0xFC, _constants.Constants.LCD_STAT);
          if ((this.memory.read(_constants.Constants.LCD_STAT) & 0x08) > 0) this.memory.write(this.memory.read(_constants.Constants.INT_FLAG) | _constants.Constants.INT_LCDC, _constants.Constants.INT_FLAG);
        } // Modo 01 (Periodo VBLANK, la CPU puede acceder a la display RAM entre 0x8000 y 0x9FFF)

      } else if (this.memory.read(_constants.Constants.LCD_Y_LOC) >= 144 && (this.memory.read(_constants.Constants.LCD_STAT) & 0x03) != 0x01) {
        // Refresco vertical
        this.graphics.vblank();
        this.memory.write(this.memory.read(_constants.Constants.LCD_STAT) & 0xFC | 0x01, _constants.Constants.LCD_STAT);
        if ((this.memory.read(_constants.Constants.LCD_STAT) & 0x10) > 0) this.memory.write(this.memory.read(_constants.Constants.INT_FLAG) | _constants.Constants.INT_LCDC, _constants.Constants.INT_FLAG);
        this.memory.write(this.memory.read(_constants.Constants.INT_FLAG) | _constants.Constants.INT_VBLANK, _constants.Constants.INT_FLAG);
      }
    } // Inicia las rutinas de tratamiento de cada una de las interrupciones que esten activas

  }, {
    key: "checkInterruptions",
    value: function checkInterruptions() {
      if (this.registers.flagIME == true) {
        this.callInterruption(_constants.Constants.INT_VBLANK, 0x40) || this.callInterruption(_constants.Constants.INT_LCDC, 0x48) || this.callInterruption(_constants.Constants.INT_TIMER, 0x50) || this.callInterruption(_constants.Constants.INT_SERIALTX, 0x58) || this.callInterruption(_constants.Constants.INT_KEY, 0x60);
      }
    }
  }, {
    key: "callInterruption",
    value: function callInterruption(interruption, direction) {
      if ((this.memory.read(_constants.Constants.INT_FLAG) & interruption) > 0 && (this.memory.read(_constants.Constants.INT_ENABLE) & interruption) > 0) {
        this.memory.write(this.memory.read(_constants.Constants.INT_FLAG) & ~interruption, _constants.Constants.INT_FLAG);
        this.registers.SP--;
        this.memory.write((this.registers.PC & 0xFF00) >> 8, this.registers.SP);
        this.registers.SP--;
        this.memory.write(this.registers.PC & 0x00FF, this.registers.SP);
        this.registers.PC = direction;
        return true;
      }

      return false;
    } // Ejecuta una instruccion del contador de programa

  }, {
    key: "processInstruction",
    value: function processInstruction() {
      var opCod = this.memory.read(this.registers.PC);
      var instruction;

      if (opCod == 0xCB) {
        this.registers.PC++;
        instruction = _instructions.OPCODES_CB[this.memory.read(this.registers.PC)];
      } else {
        instruction = _instructions.OPCODES[opCod];
      }

      if (!instruction) {
        throw new Error("[ERROR] Invalid opcode 0x".concat(opCod.toString(16).toUpperCase()));
      } // Ejecuta la instruccion y recoge su duracion teorica


      var ticks = instruction(this.registers, this.memory); // Aumenta los contadores de ciclos para las interrupciones

      for (var i = 0; i < this.cycles.length; i++) {
        this.cycles[i] += ticks;
      }

      return ticks;
    }
  }]);

  return CPU;
}();

exports.CPU = CPU;
},{"./registers":"src/app/kernel/registers.ts","../util/constants":"src/app/util/constants.ts","./instructions":"src/app/kernel/instructions.ts"}],"src/app/render.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderScreen = void 0;

var _constants = require("./util/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RenderScreen = /*#__PURE__*/function () {
  function RenderScreen(canvas) {
    _classCallCheck(this, RenderScreen);

    this.canvasContext = canvas.getContext('2d');

    if (this.canvasContext) {
      this.canvasContext.canvas.width = _constants.Constants.SCREEN_WIDTH;
      this.canvasContext.canvas.height = _constants.Constants.SCREEN_HEIGHT;
      this.canvasContext.imageSmoothingEnabled = false;
    }

    this.buffer = new Uint8ClampedArray(4 * _constants.Constants.SCREEN_HEIGHT * _constants.Constants.SCREEN_WIDTH);
    this.image = new ImageData(this.buffer, _constants.Constants.SCREEN_WIDTH, _constants.Constants.SCREEN_HEIGHT);
    this.palette = _constants.Constants.DMG_COLORS;
  }

  _createClass(RenderScreen, [{
    key: "setPalette",
    value: function setPalette(palette) {
      this.palette = palette;
    } /// <summary>Actualiza la pantalla dibujando el frame que tiene actualmente en el buffer</summary>

  }, {
    key: "refresh",
    value: function refresh(buffer) {
      var _this = this;

      for (var line = 0; line < _constants.Constants.SCREEN_HEIGHT; line++) {
        for (var column = 0; column < _constants.Constants.SCREEN_WIDTH; column++) {
          var startIndex = line * _constants.Constants.SCREEN_WIDTH * 4 + column * 4;
          var color = this.palette[buffer[line * _constants.Constants.SCREEN_WIDTH + column]];
          this.buffer[startIndex] = (color & 0xFF0000) >> 16;
          this.buffer[startIndex + 1] = (color & 0x00FF00) >> 8;
          this.buffer[startIndex + 2] = color & 0xFF;
          this.buffer[startIndex + 3] = 255;
        }
      }

      createImageBitmap(this.image).then(function (bitmap) {
        if (_this.canvasContext) {
          _this.canvasContext.drawImage(bitmap, 0, 0, _constants.Constants.SCREEN_WIDTH, _constants.Constants.SCREEN_HEIGHT);
        }
      });
    }
  }]);

  return RenderScreen;
}();

exports.RenderScreen = RenderScreen;
},{"./util/constants":"src/app/util/constants.ts"}],"src/app/kernel/memory.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Memory = void 0;

var _constants = require("../util/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Memory = /*#__PURE__*/function () {
  function Memory(cartridge, keypad) {
    _classCallCheck(this, Memory);

    this.ram = new Uint8Array(_constants.Constants.MEMSIZE);
    this.cartridge = cartridge;
    this.keypad = keypad;
  } // Lee una posicion de memoria


  _createClass(Memory, [{
    key: "read",
    value: function read(direction) {
      var value = 0;
      direction &= 0xFFFF; // 0-0x8000: ROM del cartucho

      if (direction >= 0 && direction < 0x8000) value = this.cartridge.read(direction); // 0xA000-0xC000: RAM del cartucho
      else if (direction >= 0xA000 && direction < 0xC000) value = this.cartridge.read(direction);else value = this.ram[direction];
      return value & 0xFF;
    }
  }, {
    key: "readWord",
    value: function readWord(direction) {
      return (this.read(direction + 2) << 8 | this.read(direction + 1)) & 0xFFFF;
    } // Escribe un valor en una direccion de memoria
    // Esta funcion solo debe ser accedida por las instrucciones, el resto de objetos como
    // perifericos de pantalla o teclado deberan acceder directamente a la memoria sin pasar
    // por estas funciones porque podrian producir un bucle infinito

  }, {
    key: "write",
    value: function write(value, direction) {
      direction &= 0xFFFF;
      value &= 0xFF; // 0-0x8000: ROM del cartucho

      if (direction >= 0 && direction < 0x8000) this.cartridge.write(value, direction); // 0xA000-0xC000: RAM del cartucho
      else if (direction >= 0xA000 && direction < 0xC000) this.cartridge.write(value, direction); // Echo Memory??
        else if (direction >= 0xC000 && direction < 0xE000) this.ram[direction] = value; // 0xFF00-0xFFFF: Registros de IO
          else if (direction >= 0xFF00) this.writeIO(value, direction);else this.ram[direction] = value;
    } // Escribe y realiza un tratamiento especial en las direccion de entrada / salida

  }, {
    key: "writeIO",
    value: function writeIO(value, direction) {
      switch (direction) {
        // Actualiza la pulsacion de las teclas en cuanto recibe la solicitud
        case _constants.Constants.JOYPAD:
          this.ram[_constants.Constants.JOYPAD] = value;
          this.writeKeypad();
          break;
        // Transferencia DMA de 160 bytes a partir de la direccion dada a 0xFE00

        case _constants.Constants.LCD_DMA:
          this.ram[_constants.Constants.LCD_DMA] = value;
          var origin = this.ram[_constants.Constants.LCD_DMA] << 8;
          this.ram.copyWithin(0xFE00, origin, origin + 0xA0);
          break;
        // Reset del control de DIV

        case _constants.Constants.DIV_CNTR:
          this.ram[_constants.Constants.DIV_CNTR] = 0x00;
          break;

        default:
          this.ram[direction] = value;
          break;
      }
    } // Actualiza la direccion de memoria adecuada segun la matriz de teclas solicitada con el estado
    // actual de las teclas

  }, {
    key: "writeKeypad",
    value: function writeKeypad() {
      var joypad = this.ram[_constants.Constants.JOYPAD];
      joypad &= 0xF0; // Segun la peticion, se actualiza la memoria con las teclas apropiadas

      var keys = this.keypad.keys;

      switch (joypad) {
        case 0x30:
          joypad = 0x3F;
          break;

        case 0x20:
          if (!keys[0]) joypad |= 0x08; // Down

          if (!keys[1]) joypad |= 0x04; // Up

          if (!keys[2]) joypad |= 0x02; // Left

          if (!keys[3]) joypad |= 0x01; // Right

          break;

        case 0x10:
          if (!keys[4]) joypad |= 0x08; // Start

          if (!keys[5]) joypad |= 0x04; // Select

          if (!keys[6]) joypad |= 0x02; // B

          if (!keys[7]) joypad |= 0x01; // A

          break;
      } // Accede directamente al array de la memoria para evitar bucles infinitos con las funciones de gestion
      // del acceso a memoria


      this.ram[_constants.Constants.JOYPAD] = joypad;
    }
  }, {
    key: "reset",
    value: function reset() {
      // Valor inicial de algunas direcciones de memoria
      this.write(0xCF, _constants.Constants.JOYPAD);
      this.write(0x00, _constants.Constants.SERIAL_DATA);
      this.write(0x7E, _constants.Constants.SERIAL_CTRL);
      this.write(0xFF, 0xFF03);
      this.write(0xAF, _constants.Constants.DIV_CNTR);
      this.write(0x00, _constants.Constants.TIMER_COUNT);
      this.write(0x00, _constants.Constants.TIMER_RELOAD);
      this.write(0xF8, _constants.Constants.TIMER_CRTL);
      this.write(0x00, _constants.Constants.INT_FLAG);
      this.write(0x80, _constants.Constants.SND_1_ENT);
      this.write(0xBF, _constants.Constants.SND_1_WAV_LEN);
      this.write(0xF3, _constants.Constants.SND_1_ENV);
      this.write(0xFF, _constants.Constants.SND_1_FREQ_KICK_LOWER);
      this.write(0xBF, _constants.Constants.SND_1_FREQ_KICK_UPPER);
      this.write(0xFF, 0xFF15);
      this.write(0x3F, _constants.Constants.SND_2_WAVE_LEN);
      this.write(0x00, _constants.Constants.SND_2_ENV);
      this.write(0xFF, _constants.Constants.SND_2_FREQ_KICK_LOWER);
      this.write(0xBF, _constants.Constants.SND_2_FREQ_KICK_UPPER);
      this.write(0x7F, _constants.Constants.SND_3_ON_OFF);
      this.write(0xFF, _constants.Constants.SND_3_LEN);
      this.write(0x9F, _constants.Constants.SND_3_VOLUME);
      this.write(0xFF, _constants.Constants.SND_3_FREQ_KICK_LOWER);
      this.write(0xBF, _constants.Constants.SND_3_FREQ_KICK_UPPER);
      this.write(0xFF, 0xFF1E);
      this.write(0xFF, 0xFF1F);
      this.write(0xFF, _constants.Constants.SND_4_LEN);
      this.write(0x00, _constants.Constants.SND_4_ENV);
      this.write(0x00, _constants.Constants.SND_4_POLY_KICK_LOWER);
      this.write(0xBF, _constants.Constants.SND_4_POLY_KICK_UPPER);
      this.write(0x77, _constants.Constants.SND_VOICE_INP);
      this.write(0xF3, _constants.Constants.SND_STEREO);
      this.write(0xF1, _constants.Constants.SND_STAT);
      this.write(0x06, _constants.Constants.SND_BNK_10);
      this.write(0xFE, _constants.Constants.SND_BNK_11);
      this.write(0x0E, _constants.Constants.SND_BNK_12);
      this.write(0x7F, _constants.Constants.SND_BNK_13);
      this.write(0x00, _constants.Constants.SND_BNK_14);
      this.write(0xFF, _constants.Constants.SND_BNK_15);
      this.write(0x58, _constants.Constants.SND_BNK_16);
      this.write(0xDF, _constants.Constants.SND_BNK_17);
      this.write(0x00, _constants.Constants.SND_BNK_20);
      this.write(0xEC, _constants.Constants.SND_BNK_21);
      this.write(0x00, _constants.Constants.SND_BNK_22);
      this.write(0xBF, _constants.Constants.SND_BNK_23);
      this.write(0x0C, _constants.Constants.SND_BNK_24);
      this.write(0xED, _constants.Constants.SND_BNK_25);
      this.write(0x03, _constants.Constants.SND_BNK_26);
      this.write(0xF7, _constants.Constants.SND_BNK_27);
      this.write(0x91, _constants.Constants.LCD_CTRL);
      this.write(0x85, _constants.Constants.LCD_STAT);
      this.write(0x00, _constants.Constants.LCD_SCROLL_Y);
      this.write(0x00, _constants.Constants.LCD_SCROLL_X);
      this.write(0x00, _constants.Constants.LCD_Y_LOC);
      this.write(0x00, _constants.Constants.LCD_Y_COMP);
      this.write(0x00, _constants.Constants.LCD_DMA);
      this.write(0xFC, _constants.Constants.LCD_BACK_PALETTE);
      this.write(0xFF, _constants.Constants.LCD_SPR0_PALETTE);
      this.write(0xFF, _constants.Constants.LCD_SPR1_PALETTE);
      this.write(0x00, _constants.Constants.LCD_WIN_Y);
      this.write(0x00, _constants.Constants.LCD_WIN_X);
      this.write(0x7E, _constants.Constants.CPU_SPEED_REG);
      this.write(0xFF, 0xFF4E);
      this.write(0xFE, _constants.Constants.VRAM_BANK);
      this.write(0xFF, 0xFF50);
      this.write(0x00, _constants.Constants.DMA_SRC_UPPER);
      this.write(0x00, _constants.Constants.DMA_SRC_LOWER);
      this.write(0x00, _constants.Constants.DMA_DST_UPPER);
      this.write(0x00, _constants.Constants.DMA_DST_LOWER);
      this.write(0xFF, _constants.Constants.DMA_LEN_TYPE);
      this.write(0x00, _constants.Constants.IR_PORT);
      this.write(0xC0, _constants.Constants.BGP_INDEX);
      this.write(0x00, _constants.Constants.BGP_DATA);
      this.write(0xC1, _constants.Constants.OBP_INDEX);
      this.write(0x00, _constants.Constants.OBP_DATA);
      this.write(0xF8, _constants.Constants.RAM_BANK);
      this.write(0x00, _constants.Constants.INT_ENABLE);
    }
  }]);

  return Memory;
}();

exports.Memory = Memory;
},{"../util/constants":"src/app/util/constants.ts"}],"src/app/peripherals/keypad.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keypad = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keypad = /*#__PURE__*/function () {
  function Keypad() {
    _classCallCheck(this, Keypad);

    // Estado actual de las teclas
    //              Down,  Up,    Left,  Right, Start, Select, B,    A
    this.keys = [false, false, false, false, false, false, false, false];
  } // Invierte el estado de una tecla


  _createClass(Keypad, [{
    key: "toggleKey",
    value: function toggleKey(key) {
      this.keys[key] = !this.keys[key];
    } // Registra la pulsacion de una tecla

  }, {
    key: "keyDown",
    value: function keyDown(key) {
      this.keys[key] = true;
    } // Registra la liberacion de una tecla pulsada previamente

  }, {
    key: "keyUp",
    value: function keyUp(key) {
      this.keys[key] = false;
    }
  }]);

  return Keypad;
}();

exports.Keypad = Keypad;
},{}],"src/app/tsgbe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = void 0;

var _peripherals = require("./peripherals");

var _gpu = require("./kernel/gpu");

var _cpu = require("./kernel/cpu");

var _render = require("./render");

var _memory = require("./kernel/memory");

var _keypad = require("./peripherals/keypad");

var _constants = require("./util/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Main = /*#__PURE__*/function () {
  function Main(canvas) {
    _classCallCheck(this, Main);

    this.keypad = new _keypad.Keypad();
    this.screen = new _render.RenderScreen(canvas);
  }

  _createClass(Main, [{
    key: "palette",
    set: function set(palette) {
      this.screen.setPalette(palette);
    }
  }, {
    key: "keys",
    get: function get() {
      return this.keypad;
    }
  }, {
    key: "loadData",
    value: function loadData(data) {
      this.cartridge = this.loadCartridge(data);
      var memory = new _memory.Memory(this.cartridge, this.keypad);
      var gpu = new _gpu.GPU(memory, this.screen);
      this.cpu = new _cpu.CPU(memory, gpu);
      this.stop();
      this.cpu.reset();
      return this.cartridge.name;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var lastLoopTime = null;

      var gameLoop = function gameLoop(loopTime) {
        var deltaLoopTime = null;

        if (lastLoopTime != null) {
          deltaLoopTime = Math.min(loopTime - lastLoopTime, 1000 / 60);
        }

        if (deltaLoopTime) {
          var ticks = 0;

          while (ticks / (_constants.Constants.CPU_SPEED * 1000) < deltaLoopTime) {
            ticks += _this.cpu.run();
          }
        } // Prepare for new frame


        lastLoopTime = loopTime;
        _this.renderId = requestAnimationFrame(gameLoop);
      }; // Start the game loop


      this.renderId = requestAnimationFrame(gameLoop);
    }
  }, {
    key: "stop",
    value: function stop() {
      cancelAnimationFrame(this.renderId);
    }
  }, {
    key: "loadCartridge",
    value: function loadCartridge(data) {
      var cartridge;

      switch (data[0x0147]) {
        case 0x00:
          cartridge = new _peripherals.MBC0(data);
          break;
        // ROM Only

        case 0x01:
          cartridge = new _peripherals.MBC1(data);
          break;
        // ROM + MBC1

        case 0x02:
          cartridge = new _peripherals.MBC1(data);
          break;
        // ROM + MBC1 + RAM

        case 0x03:
          cartridge = new _peripherals.MBC1(data);
          break;
        // ROM + MBC1 + RAM + BATTERY

        case 0x04:
        case 0x05:
          cartridge = new _peripherals.MBC2(data);
          break;
        // ROM + MBC2

        case 0x06:
          cartridge = new _peripherals.MBC2(data);
          break;
        // ROM + MBC2 + BATTERY

        case 0x07:
        case 0x08:
          cartridge = new _peripherals.MBC0(data);
          break;
        // ROM + RAM

        case 0x09:
          cartridge = new _peripherals.MBC0(data);
          break;
        // ROM + RAM + BATTERY

        case 0x0A:
        case 0x0B:
          cartridge = new _peripherals.MBC0(data);
          break;
        // ROM + MMM01

        case 0x0C:
          cartridge = new _peripherals.MBC0(data);
          break;
        // ROM + MMM01 + SRAM

        case 0x0D:
          cartridge = new _peripherals.MBC0(data);
          break;
        // ROM + MMM01 + SRAM + BATTERY

        case 0x0E:
        case 0x0F:
          cartridge = new _peripherals.MBC3(data);
          break;
        // ROM + MBC3 + TIMER + BATTERY

        case 0x10:
          cartridge = new _peripherals.MBC3(data);
          break;
        // ROM + MBC3 + TIMER + RAM + BATTERY

        case 0x11:
          cartridge = new _peripherals.MBC3(data);
          break;
        // ROM + MBC3

        case 0x12:
          cartridge = new _peripherals.MBC3(data);
          break;
        // ROM + MBC3 + RAM

        case 0x13:
          cartridge = new _peripherals.MBC3(data);
          break;
        // ROM + MBC3 + RAM + BATTERY

        case 0x14:
        case 0x15:
          cartridge = new _peripherals.MBC4(data);
          break;
        // ROM + MBC4

        case 0x16:
          cartridge = new _peripherals.MBC4(data);
          break;
        // ROM + MBC4 + RAM

        case 0x17:
          cartridge = new _peripherals.MBC4(data);
          break;
        // ROM + MBC4 + RAM + BATTERY

        case 0x18:
        case 0x19:
          cartridge = new _peripherals.MBC5(data);
          break;
        // ROM + MBC5

        case 0x1A:
          cartridge = new _peripherals.MBC5(data);
          break;
        // ROM + MBC5 + RAM

        case 0x1B:
          cartridge = new _peripherals.MBC5(data);
          break;
        // ROM + MBC5 + RAM + BATTERY

        case 0x1C:
          cartridge = new _peripherals.MBC5(data);
          break;
        // ROM + MBC5 + RUMBLE

        case 0x1D:
          cartridge = new _peripherals.MBC5(data);
          break;
        // ROM + MBC5 + RUMBLE + SRAM

        case 0x1E:
          cartridge = new _peripherals.MBC5(data);
          break;
        // ROM + MBC5 + RUMBLE + SRAM + BATTERY

        case 0x1F:
          cartridge = new _peripherals.MBC0(data);
          break;
        // POCKET CAMERA

        case 0xFD:
          cartridge = new _peripherals.MBC0(data);
          break;
        // BANDAI TAMA5

        case 0xFE:
          cartridge = new _peripherals.MBC3(data);
          break;
        // HUDSON HuC-3

        case 0xFF:
          cartridge = new _peripherals.MBC1(data);
          break;
        // HUDSON HuC-1

        default:
          throw new Error("[ERROR] Unknown cartridge type " + data[0x0147]);
      }

      if (data[0x143] == 0x80) throw new Error("GameBoy Color not supported");
      if (data[0x146] != 0x00) console.log("SuperGameBoy capabilities not supported");
      return cartridge;
    }
  }]);

  return Main;
}();

exports.Main = Main;
},{"./peripherals":"src/app/peripherals/index.ts","./kernel/gpu":"src/app/kernel/gpu.ts","./kernel/cpu":"src/app/kernel/cpu.ts","./render":"src/app/render.ts","./kernel/memory":"src/app/kernel/memory.ts","./peripherals/keypad":"src/app/peripherals/keypad.ts","./util/constants":"src/app/util/constants.ts"}],"src/app/util/key.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Key = void 0;

var _constants = require("./constants");

var Key;
exports.Key = Key;

(function (Key) {
  Key[Key["Down"] = _constants.Constants.KEY_DOWN] = "Down";
  Key[Key["Up"] = _constants.Constants.KEY_UP] = "Up";
  Key[Key["Left"] = _constants.Constants.KEY_LEFT] = "Left";
  Key[Key["Right"] = _constants.Constants.KEY_RIGHT] = "Right";
  Key[Key["Start"] = _constants.Constants.KEY_START] = "Start";
  Key[Key["Select"] = _constants.Constants.KEY_SELECT] = "Select";
  Key[Key["B"] = _constants.Constants.KEY_B] = "B";
  Key[Key["A"] = _constants.Constants.KEY_A] = "A";
})(Key || (exports.Key = Key = {}));
},{"./constants":"src/app/util/constants.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _tslib = require("tslib");

require("regenerator-runtime/runtime");

var _tsgbe = require("./src/app/tsgbe");

var _key = require("./src/app/util/key");

var tsgbe;
var vibration = 1;
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('power');
  var fileInput = document.querySelector('#file-input');
  btn.addEventListener("click", function (e) {
    return fileInput.click();
  });
  fileInput.addEventListener('change', function (e) {
    return openFile(e);
  });

  function keyUp(key) {
    return function () {
      return tsgbe.keys.keyUp(key);
    };
  }

  function keyDown(key) {
    return function () {
      window.navigator.vibrate(vibration);
      tsgbe.keys.keyDown(key);
    };
  }

  function bindButton(id, key) {
    document.querySelector(id).addEventListener('touchstart', keyDown(key));
    document.querySelector(id).addEventListener('touchend', keyUp(key));
    document.querySelector(id).addEventListener('mousedown', keyDown(key));
    document.querySelector(id).addEventListener('mouseup', keyUp(key));
  }

  bindButton('#up', _key.Key.Up);
  bindButton('#down', _key.Key.Down);
  bindButton('#left', _key.Key.Left);
  bindButton('#right', _key.Key.Right);
  bindButton('#start', _key.Key.Start);
  bindButton('#select', _key.Key.Select);
  bindButton('#btn-a', _key.Key.A);
  bindButton('#btn-b', _key.Key.B);
  tsgbe = new _tsgbe.Main(document.getElementById('canvas'));
});
/*
  13: Enter
  16: Shift
  90: Z
  88: X
  38: Up arrow
  40: Down arrow
  37: Left arrow
  39: Right arrow
*/

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 13:
      tsgbe.keys.keyDown(_key.Key.Start);
      break;

    case 16:
      tsgbe.keys.keyDown(_key.Key.Select);
      break;

    case 90:
      tsgbe.keys.keyDown(_key.Key.A);
      break;

    case 88:
      tsgbe.keys.keyDown(_key.Key.B);
      break;

    case 38:
      tsgbe.keys.keyDown(_key.Key.Up);
      break;

    case 40:
      tsgbe.keys.keyDown(_key.Key.Down);
      break;

    case 37:
      tsgbe.keys.keyDown(_key.Key.Left);
      break;

    case 39:
      tsgbe.keys.keyDown(_key.Key.Right);
      break;
  }
};

document.onkeyup = function (e) {
  switch (e.keyCode) {
    case 13:
      tsgbe.keys.keyUp(_key.Key.Start);
      break;

    case 16:
      tsgbe.keys.keyUp(_key.Key.Select);
      break;

    case 90:
      tsgbe.keys.keyUp(_key.Key.A);
      break;

    case 88:
      tsgbe.keys.keyUp(_key.Key.B);
      break;

    case 38:
      tsgbe.keys.keyUp(_key.Key.Up);
      break;

    case 40:
      tsgbe.keys.keyUp(_key.Key.Down);
      break;

    case 37:
      tsgbe.keys.keyUp(_key.Key.Left);
      break;

    case 39:
      tsgbe.keys.keyUp(_key.Key.Right);
      break;
  }
};

function openFile(fileInputEvent) {
  return (0, _tslib.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var fileContent, name;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(fileInputEvent.target.files.length > 0)) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return fileToByteArray(fileInputEvent.target.files[0]);

          case 3:
            fileContent = _context.sent;
            name = tsgbe.loadData(new Uint8Array(fileContent));
            console.log(name);
            tsgbe.start();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

function fileToByteArray(file) {
  return new Promise(function (resolve, reject) {
    try {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = function () {
        resolve(reader.result);
      };
    } catch (e) {
      reject(e);
    }
  });
}
},{"tslib":"node_modules/tslib/tslib.es6.js","regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","./src/app/tsgbe":"src/app/tsgbe.ts","./src/app/util/key":"src/app/util/key.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38701" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/tsgbe.77de5100.js.map