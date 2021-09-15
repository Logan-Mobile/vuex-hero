/*!
 * vuex-proxy v1.1.1
 * (c) 2021 Logan
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('assert')) :
	typeof define === 'function' && define.amd ? define(['exports', 'assert'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VuexHero = {}, global.assert));
}(this, (function (exports, assert) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') { __g = global; } // eslint-disable-line no-undef
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') { throw TypeError(it + ' is not a function!'); }
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) { return fn; }
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var toString$1 = {}.toString;

	var _cof = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) { throw TypeError("Can't call method on  " + it); }
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min$1 = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min$1(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.12' };
	if (typeof __e == 'number') { __e = core; } // eslint-disable-line no-undef
	});

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var SPECIES$3 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) { C = undefined; }
	    if (_isObject(C)) {
	      C = C[SPECIES$3];
	      if (C === null) { C = undefined; }
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) { if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) { result[index] = res; }   // map
	        else if (res) { switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } } else if (IS_EVERY) { return false; } // every
	      }
	    } }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) { throw TypeError(it + ' is not an object!'); }
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$2 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$2) && _isObject(document$2.createElement);
	var _domCreate = function (it) {
	  return is ? document$2.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) { return it; }
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$2 = Object.defineProperty;

	var f$7 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) { try {
	    return dP$2(O, P, Attributes);
	  } catch (e) { /* empty */ } }
	  if ('get' in Attributes || 'set' in Attributes) { throw TypeError('Accessors not supported!'); }
	  if ('value' in Attributes) { O[P] = Attributes.value; }
	  return O;
	};

	var _objectDp = {
		f: f$7
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) { _has(val, 'name') || _hide(val, 'name', key); }
	  if (O[key] === val) { return; }
	  if (isFunction) { _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key))); }
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) { return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it; }
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) { return 'F'; }
	    // not necessary to add metadata
	    if (!create) { return 'E'; }
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) { return true; }
	    // not necessary to add metadata
	    if (!create) { return false; }
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) { setMeta(it); }
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var max = Math.max;
	var min = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) { while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) { return true; }
	    // Array#indexOf ignores holes, Array#includes - not
	    } } else { for (;length > index; index++) { if (IS_INCLUDES || index in O) {
	      if (O[index] === el) { return IS_INCLUDES || index || 0; }
	    } } } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO$2 = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) { if (key != IE_PROTO$2) { _has(O, key) && result.push(key); } }
	  // Don't enum bug & hidden keys
	  while (names.length > i) { if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  } }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$6 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$6
	};

	var f$5 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$5
	};

	// 19.1.2.1 Object.assign(target, source, ...)






	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  var arguments$1 = arguments;
	 // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments$1[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) { T[key] = S[key]; }
	    }
	  } return T;
	} : $assign;

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) { _redefine(target, key, src[key], safe); }
	  return target;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) { _anObject(ret.call(iterator)); }
	    throw e;
	  }
	};

	var _iterators = {};

	// check on default Array iterator

	var ITERATOR$4 = _wks('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$4] === it);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$3 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) { return it[ITERATOR$3]
	    || it['@@iterator']
	    || _iterators[_classof(it)]; }
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') { throw TypeError(iterable + ' is not iterable!'); }
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) { for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) { return result; }
	  } } else { for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) { return result; }
	  } }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) { throw TypeError('Incompatible receiver, ' + TYPE + ' required!'); }
	  return it;
	};

	var getWeak = _meta.getWeak;







	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) { return entry[1]; }
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) { entry[1] = value; }
	    else { this.a.push([key, value]); }
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) { this.a.splice(index, 1); }
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) { _forOf(iterable, IS_MAP, that[ADDER], that); }
	    });
	    _redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!_isObject(key)) { return false; }
	        var data = getWeak(key);
	        if (data === true) { return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key); }
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!_isObject(key)) { return false; }
	        var data = getWeak(key);
	        if (data === true) { return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key); }
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) { uncaughtFrozenStore(that).set(key, value); }
	    else { data[that._i] = value; }
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var PROTOTYPE$2 = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE$2];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE$2] || (exports[PROTOTYPE$2] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) { source = name; }
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) { _redefine(target, key, out, type & $export.U); }
	    // export
	    if (exports[key] != out) { _hide(exports, key, exp); }
	    if (IS_PROTO && expProto[key] != out) { expProto[key] = out; }
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var ITERATOR$2 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$2]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) { return false; }
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$2]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$2] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) { def(it, TAG, { configurable: true, value: tag }); }
	};

	var gOPD$1 = Object.getOwnPropertyDescriptor;

	var f$4 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) { try {
	    return gOPD$1(O, P);
	  } catch (e) { /* empty */ } }
	  if (_has(O, P)) { return _propertyDesc(!_objectPie.f.call(O, P), O[P]); }
	};

	var _objectGopd = {
		f: f$4
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) { throw TypeError(proto + ": can't set as prototype!"); }
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) { O.__proto__ = proto; }
	        else { set(O, proto); }
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) { $instance[ADDER](index, index); }
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) { _forOf(iterable, IS_MAP, that[ADDER], that); }
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) { fixMethod(ADDER); }
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) { delete proto.clear; }
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) { common.setStrong(C, NAME, IS_MAP); }

	  return C;
	};

	createCommonjsModule(function (module) {

	var each = _arrayMethods(0);






	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) { return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key); }
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) { this._f = new InternalMap(); }
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) { return TO_STRING ? '' : undefined; }
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) { _objectDp.f(O, P = keys[i++], Properties[P]); }
	  return O;
	};

	var document$1 = _global.document;
	var _html = document$1 && document$1.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) { delete createDict[PROTOTYPE$1][_enumBugKeys[i]]; }
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else { result = createDict(); }
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO = _sharedKey('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO)) { return O[IE_PROTO]; }
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	var ITERATOR$1 = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) { return proto[kind]; }
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$1] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (typeof IteratorPrototype[ITERATOR$1] != 'function') { _hide(IteratorPrototype, ITERATOR$1, returnThis); }
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((BUGGY || VALUES_BUG || !proto[ITERATOR$1])) {
	    _hide(proto, ITERATOR$1, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) { for (key in methods) {
	      if (!(key in proto)) { _redefine(proto, key, methods[key]); }
	    } } else { _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods); }
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) { return { value: undefined, done: true }; }
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) { _hide(ArrayProto, UNSCOPABLES, {}); }
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') { return _iterStep(0, index); }
	  if (kind == 'values') { return _iterStep(0, O[index]); }
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME$1 = collections[i];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR]) { _hide(proto, ITERATOR, ArrayValues); }
	    if (!proto[TO_STRING_TAG]) { _hide(proto, TO_STRING_TAG, NAME$1); }
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) { for (key in es6_array_iterator) { if (!proto[key]) { _redefine(proto, key, es6_array_iterator[key], true); } } }
	  }
	}

	// 7.2.8 IsRegExp(argument)


	var MATCH$1 = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) { throw TypeError('String#' + NAME + " doesn't accept regex!"); }
	  return String(_defined(that));
	};

	var MATCH = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$2 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
	};

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) { result += 'g'; }
	  if (that.ignoreCase) { result += 'i'; }
	  if (that.multiline) { result += 'm'; }
	  if (that.unicode) { result += 'u'; }
	  if (that.sticky) { result += 'y'; }
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX$1 = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX$1] !== 0 || re2[LAST_INDEX$1] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) { lastIndex = re[LAST_INDEX$1]; }

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX$1] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        var arguments$1 = arguments;

	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments$1[i] === undefined) { match[i] = undefined; }
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES$1 = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails(function () { RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) { return []; }
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) { return $split.call(string, separator, limit); }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) { $push.apply(output, match.slice(1)); }
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) { break; }
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) { separatorCopy[LAST_INDEX]++; } // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) { output.push(''); }
	      } else { output.push(string.slice(lastLastIndex)); }
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) { return res.value; }

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) { return []; }
	      if (S.length === 0) { return _regexpExecAbstract(splitter, S) === null ? [S] : []; }
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) { return A; }
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) { return A; }
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
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
	  } return fn.apply(that, args);
	};

	var process$3 = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var arguments$1 = arguments;

	    var args = [];
	    var i = 1;
	    while (arguments.length > i) { args.push(arguments$1[i++]); }
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process$3) == 'process') {
	    defer = function (id) {
	      process$3.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$2 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode$1 = _cof(process$2) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode$1 && (parent = process$2.domain)) { parent.exit(); }
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) { notify(); }
	        else { last = undefined; }
	        throw e;
	      }
	    } last = undefined;
	    if (parent) { parent.enter(); }
	  };

	  // Node.js
	  if (isNode$1) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) { last.next = task; }
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) { throw TypeError('Bad Promise constructor'); }
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$3 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$3
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator = _global.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) { return x; }
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var SPECIES = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES]) { _objectDp.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  }); }
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$1 = _global.process;
	var versions = process$1 && process$1.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode = _classof(process$1) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) { return; }
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) { onHandleUnhandled(promise); }
	            promise._h = 1;
	          }
	          if (handler === true) { result = value; }
	          else {
	            if (domain) { domain.enter(); }
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else { resolve(result); }
	        } else { reject(value); }
	      } catch (e) {
	        if (domain && !exited) { domain.exit(); }
	        reject(e);
	      }
	    };
	    while (chain.length > i) { run(chain[i++]); } // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) { onUnhandled(promise); }
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode) {
	          process$1.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) { throw result.v; }
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode) {
	      process$1.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) { return; }
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) { promise._a = promise._c.slice(); }
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) { return; }
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) { throw TypeError$1("Promise can't be resolved itself"); }
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process$1.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) { this._a.push(reaction); }
	      if (this._s) { notify(this, false); }
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (!USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) { return; }
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) { reject(result.v); }
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) { reject(result.v); }
	    return capability.promise;
	  }
	});

	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
	  }
	}, _collectionWeak, false, true);

	var f$2 = _wks;

	var _wksExt = {
		f: f$2
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) { defineProperty($Symbol, name, { value: _wksExt.f(name) }); }
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) { if (isEnum.call(it, key = symbols[i++])) { result.push(key); } }
	  } return result;
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$1
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN$1 = _objectGopn.f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN$1(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) { delete ObjectProto[key]; }
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto) { dP$1(ObjectProto, key, protoDesc); }
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) { $defineProperty(OPSymbols, key, D); }
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) { dP$1(it, HIDDEN, _propertyDesc(1, {})); }
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) { it[HIDDEN][key] = false; }
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) { $defineProperty(it, key = keys[i++], P[key]); }
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) { return false; }
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) { return; }
	  var D = gOPD(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) { D.enumerable = true; }
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) { result.push(key); }
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) { result.push(AllSymbols[key]); }
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) { throw TypeError('Symbol is not a constructor!'); }
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) { $set.call(OPSymbols, value); }
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) { this[HIDDEN][tag] = false; }
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) { setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set }); }
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor$1;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;){ _wks(es6Symbols[j++]); }

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) { _wksDefine(wellKnownSymbols[k++]); }

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) { throw TypeError(sym + ' is not a symbol!'); }
	    for (var key in SymbolRegistry) { if (SymbolRegistry[key] === sym) { return key; } }
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var arguments$1 = arguments;

	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) { args.push(arguments$1[i++]); }
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) { return; } // IE8 returns string on undefined
	    if (!_isArray(replacer)) { replacer = function (key, value) {
	      if (typeof $replacer == 'function') { value = $replacer.call(this, key, value); }
	      if (!isSymbol(value)) { return value; }
	    }; }
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(_toIobject(it), key);
	  };
	});

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) { _objectDp.f(object, index, _propertyDesc(0, value)); }
	  else { object[index] = value; }
	};

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) { _createProperty(result, key, desc); }
	    }
	    return result;
	  }
	});

	_export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) { mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); }
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var arraySlice = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	_export(_export.P + _export.F * _fails(function () {
	  if (_html) { arraySlice.call(_html); }
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = _toLength(this.length);
	    var klass = _cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') { return arraySlice.call(this, begin, end); }
	    var start = _toAbsoluteIndex(begin, len);
	    var upTo = _toAbsoluteIndex(end, len);
	    var size = _toLength(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) { cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i]; }
	    return cloned;
	  }
	});

	var dP = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	function _extends() {
	  _extends = Object.assign || function (target) {
	    var arguments$1 = arguments;

	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments$1[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;

	  _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) { return false; }
	  if (Reflect.construct.sham) { return false; }
	  if (typeof Proxy === "function") { return true; }

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (_isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) { _setPrototypeOf(instance, Class.prototype); }
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !_isNativeFunction(Class)) { return Class; }

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) { return _cache.get(Class); }

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	/* eslint no-console:0 */
	var formatRegExp = /%[sdj%]/g;
	var warning = function warning() {}; // don't print warning message when in production env or node runtime

	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
	  warning = function warning(type, errors) {
	    if (typeof console !== 'undefined' && console.warn) {
	      if (errors.every(function (e) {
	        return typeof e === 'string';
	      })) {
	        console.warn(type, errors);
	      }
	    }
	  };
	}

	function convertFieldsError(errors) {
	  if (!errors || !errors.length) { return null; }
	  var fields = {};
	  errors.forEach(function (error) {
	    var field = error.field;
	    fields[field] = fields[field] || [];
	    fields[field].push(error);
	  });
	  return fields;
	}
	function format() {
	  var arguments$1 = arguments;

	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments$1[_key];
	  }

	  var i = 1;
	  var f = args[0];
	  var len = args.length;

	  if (typeof f === 'function') {
	    return f.apply(null, args.slice(1));
	  }

	  if (typeof f === 'string') {
	    var str = String(f).replace(formatRegExp, function (x) {
	      if (x === '%%') {
	        return '%';
	      }

	      if (i >= len) {
	        return x;
	      }

	      switch (x) {
	        case '%s':
	          return String(args[i++]);

	        case '%d':
	          return Number(args[i++]);

	        case '%j':
	          try {
	            return JSON.stringify(args[i++]);
	          } catch (_) {
	            return '[Circular]';
	          }

	          break;

	        default:
	          return x;
	      }
	    });
	    return str;
	  }

	  return f;
	}

	function isNativeStringType(type) {
	  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'date' || type === 'pattern';
	}

	function isEmptyValue(value, type) {
	  if (value === undefined || value === null) {
	    return true;
	  }

	  if (type === 'array' && Array.isArray(value) && !value.length) {
	    return true;
	  }

	  if (isNativeStringType(type) && typeof value === 'string' && !value) {
	    return true;
	  }

	  return false;
	}

	function asyncParallelArray(arr, func, callback) {
	  var results = [];
	  var total = 0;
	  var arrLength = arr.length;

	  function count(errors) {
	    results.push.apply(results, errors);
	    total++;

	    if (total === arrLength) {
	      callback(results);
	    }
	  }

	  arr.forEach(function (a) {
	    func(a, count);
	  });
	}

	function asyncSerialArray(arr, func, callback) {
	  var index = 0;
	  var arrLength = arr.length;

	  function next(errors) {
	    if (errors && errors.length) {
	      callback(errors);
	      return;
	    }

	    var original = index;
	    index = index + 1;

	    if (original < arrLength) {
	      func(arr[original], next);
	    } else {
	      callback([]);
	    }
	  }

	  next([]);
	}

	function flattenObjArr(objArr) {
	  var ret = [];
	  Object.keys(objArr).forEach(function (k) {
	    ret.push.apply(ret, objArr[k]);
	  });
	  return ret;
	}

	var AsyncValidationError = /*#__PURE__*/function (_Error) {
	  _inheritsLoose(AsyncValidationError, _Error);

	  function AsyncValidationError(errors, fields) {
	    var _this;

	    _this = _Error.call(this, 'Async Validation Error') || this;
	    _this.errors = errors;
	    _this.fields = fields;
	    return _this;
	  }

	  return AsyncValidationError;
	}( /*#__PURE__*/_wrapNativeSuper(Error));
	function asyncMap(objArr, option, func, callback) {
	  if (option.first) {
	    var _pending = new Promise(function (resolve, reject) {
	      var next = function next(errors) {
	        callback(errors);
	        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve();
	      };

	      var flattenArr = flattenObjArr(objArr);
	      asyncSerialArray(flattenArr, func, next);
	    });

	    _pending["catch"](function (e) {
	      return e;
	    });

	    return _pending;
	  }

	  var firstFields = option.firstFields || [];

	  if (firstFields === true) {
	    firstFields = Object.keys(objArr);
	  }

	  var objArrKeys = Object.keys(objArr);
	  var objArrLength = objArrKeys.length;
	  var total = 0;
	  var results = [];
	  var pending = new Promise(function (resolve, reject) {
	    var next = function next(errors) {
	      results.push.apply(results, errors);
	      total++;

	      if (total === objArrLength) {
	        callback(results);
	        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve();
	      }
	    };

	    if (!objArrKeys.length) {
	      callback(results);
	      resolve();
	    }

	    objArrKeys.forEach(function (key) {
	      var arr = objArr[key];

	      if (firstFields.indexOf(key) !== -1) {
	        asyncSerialArray(arr, func, next);
	      } else {
	        asyncParallelArray(arr, func, next);
	      }
	    });
	  });
	  pending["catch"](function (e) {
	    return e;
	  });
	  return pending;
	}
	function complementError(rule) {
	  return function (oe) {
	    if (oe && oe.message) {
	      oe.field = oe.field || rule.fullField;
	      return oe;
	    }

	    return {
	      message: typeof oe === 'function' ? oe() : oe,
	      field: oe.field || rule.fullField
	    };
	  };
	}
	function deepMerge(target, source) {
	  if (source) {
	    for (var s in source) {
	      if (source.hasOwnProperty(s)) {
	        var value = source[s];

	        if (typeof value === 'object' && typeof target[s] === 'object') {
	          target[s] = _extends({}, target[s], value);
	        } else {
	          target[s] = value;
	        }
	      }
	    }
	  }

	  return target;
	}

	/**
	 *  Rule for validating required fields.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function required(rule, value, source, errors, options, type) {
	  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
	    errors.push(format(options.messages.required, rule.fullField));
	  }
	}

	/**
	 *  Rule for validating whitespace.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function whitespace(rule, value, source, errors, options) {
	  if (/^\s+$/.test(value) || value === '') {
	    errors.push(format(options.messages.whitespace, rule.fullField));
	  }
	}

	/* eslint max-len:0 */

	var pattern = {
	  // http://emailregex.com/
	  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i'),
	  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
	};
	var types = {
	  integer: function integer(value) {
	    return types.number(value) && parseInt(value, 10) === value;
	  },
	  "float": function float(value) {
	    return types.number(value) && !types.integer(value);
	  },
	  array: function array(value) {
	    return Array.isArray(value);
	  },
	  regexp: function regexp(value) {
	    if (value instanceof RegExp) {
	      return true;
	    }

	    try {
	      return !!new RegExp(value);
	    } catch (e) {
	      return false;
	    }
	  },
	  date: function date(value) {
	    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function' && !isNaN(value.getTime());
	  },
	  number: function number(value) {
	    if (isNaN(value)) {
	      return false;
	    }

	    return typeof value === 'number';
	  },
	  object: function object(value) {
	    return typeof value === 'object' && !types.array(value);
	  },
	  method: function method(value) {
	    return typeof value === 'function';
	  },
	  email: function email(value) {
	    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
	  },
	  url: function url(value) {
	    return typeof value === 'string' && !!value.match(pattern.url);
	  },
	  hex: function hex(value) {
	    return typeof value === 'string' && !!value.match(pattern.hex);
	  }
	};
	/**
	 *  Rule for validating the type of a value.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function type(rule, value, source, errors, options) {
	  if (rule.required && value === undefined) {
	    required(rule, value, source, errors, options);
	    return;
	  }

	  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
	  var ruleType = rule.type;

	  if (custom.indexOf(ruleType) > -1) {
	    if (!types[ruleType](value)) {
	      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
	    } // straight typeof check

	  } else if (ruleType && typeof value !== rule.type) {
	    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
	  }
	}

	/**
	 *  Rule for validating minimum and maximum allowed values.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function range(rule, value, source, errors, options) {
	  var len = typeof rule.len === 'number';
	  var min = typeof rule.min === 'number';
	  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

	  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	  var val = value;
	  var key = null;
	  var num = typeof value === 'number';
	  var str = typeof value === 'string';
	  var arr = Array.isArray(value);

	  if (num) {
	    key = 'number';
	  } else if (str) {
	    key = 'string';
	  } else if (arr) {
	    key = 'array';
	  } // if the value is not of a supported type for range validation
	  // the validation rule rule should use the
	  // type property to also test for a particular type


	  if (!key) {
	    return false;
	  }

	  if (arr) {
	    val = value.length;
	  }

	  if (str) {
	    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
	    val = value.replace(spRegexp, '_').length;
	  }

	  if (len) {
	    if (val !== rule.len) {
	      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
	    }
	  } else if (min && !max && val < rule.min) {
	    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
	  } else if (max && !min && val > rule.max) {
	    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
	  } else if (min && max && (val < rule.min || val > rule.max)) {
	    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
	  }
	}

	var ENUM = 'enum';
	/**
	 *  Rule for validating a value exists in an enumerable list.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function enumerable(rule, value, source, errors, options) {
	  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

	  if (rule[ENUM].indexOf(value) === -1) {
	    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
	  }
	}

	/**
	 *  Rule for validating a regular expression pattern.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function pattern$1(rule, value, source, errors, options) {
	  if (rule.pattern) {
	    if (rule.pattern instanceof RegExp) {
	      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
	      // flag is accidentally set to `true`, which in a validation scenario
	      // is not necessary and the result might be misleading
	      rule.pattern.lastIndex = 0;

	      if (!rule.pattern.test(value)) {
	        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
	      }
	    } else if (typeof rule.pattern === 'string') {
	      var _pattern = new RegExp(rule.pattern);

	      if (!_pattern.test(value)) {
	        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
	      }
	    }
	  }
	}

	var rules = {
	  required: required,
	  whitespace: whitespace,
	  type: type,
	  range: range,
	  "enum": enumerable,
	  pattern: pattern$1
	};

	/**
	 *  Performs validation for string types.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function string(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value, 'string') && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options, 'string');

	    if (!isEmptyValue(value, 'string')) {
	      rules.type(rule, value, source, errors, options);
	      rules.range(rule, value, source, errors, options);
	      rules.pattern(rule, value, source, errors, options);

	      if (rule.whitespace === true) {
	        rules.whitespace(rule, value, source, errors, options);
	      }
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates a function.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function method(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (value !== undefined) {
	      rules.type(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates a number.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function number(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (value === '') {
	      value = undefined;
	    }

	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (value !== undefined) {
	      rules.type(rule, value, source, errors, options);
	      rules.range(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates a boolean.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function _boolean(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (value !== undefined) {
	      rules.type(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates the regular expression type.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function regexp(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (!isEmptyValue(value)) {
	      rules.type(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates a number is an integer.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function integer(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (value !== undefined) {
	      rules.type(rule, value, source, errors, options);
	      rules.range(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates a number is a floating point number.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function floatFn(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (value !== undefined) {
	      rules.type(rule, value, source, errors, options);
	      rules.range(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates an array.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function array(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if ((value === undefined || value === null) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options, 'array');

	    if (value !== undefined && value !== null) {
	      rules.type(rule, value, source, errors, options);
	      rules.range(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates an object.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function object(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (value !== undefined) {
	      rules.type(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	var ENUM$1 = 'enum';
	/**
	 *  Validates an enumerable list.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function enumerable$1(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (value !== undefined) {
	      rules[ENUM$1](rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Validates a regular expression pattern.
	 *
	 *  Performs validation when a rule only contains
	 *  a pattern property but is not declared as a string type.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function pattern$2(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value, 'string') && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (!isEmptyValue(value, 'string')) {
	      rules.pattern(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	function date(rule, value, callback, source, options) {
	  // console.log('integer rule called %j', rule);
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field); // console.log('validate on %s value', value);

	  if (validate) {
	    if (isEmptyValue(value, 'date') && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);

	    if (!isEmptyValue(value, 'date')) {
	      var dateObject;

	      if (value instanceof Date) {
	        dateObject = value;
	      } else {
	        dateObject = new Date(value);
	      }

	      rules.type(rule, dateObject, source, errors, options);

	      if (dateObject) {
	        rules.range(rule, dateObject.getTime(), source, errors, options);
	      }
	    }
	  }

	  callback(errors);
	}

	function required$1(rule, value, callback, source, options) {
	  var errors = [];
	  var type = Array.isArray(value) ? 'array' : typeof value;
	  rules.required(rule, value, source, errors, options, type);
	  callback(errors);
	}

	function type$1(rule, value, callback, source, options) {
	  var ruleType = rule.type;
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value, ruleType) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options, ruleType);

	    if (!isEmptyValue(value, ruleType)) {
	      rules.type(rule, value, source, errors, options);
	    }
	  }

	  callback(errors);
	}

	/**
	 *  Performs validation for any type.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */

	function any(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

	  if (validate) {
	    if (isEmptyValue(value) && !rule.required) {
	      return callback();
	    }

	    rules.required(rule, value, source, errors, options);
	  }

	  callback(errors);
	}

	var validators = {
	  string: string,
	  method: method,
	  number: number,
	  "boolean": _boolean,
	  regexp: regexp,
	  integer: integer,
	  "float": floatFn,
	  array: array,
	  object: object,
	  "enum": enumerable$1,
	  pattern: pattern$2,
	  date: date,
	  url: type$1,
	  hex: type$1,
	  email: type$1,
	  required: required$1,
	  any: any
	};

	function newMessages() {
	  return {
	    "default": 'Validation error on field %s',
	    required: '%s is required',
	    "enum": '%s must be one of %s',
	    whitespace: '%s cannot be empty',
	    date: {
	      format: '%s date %s is invalid for format %s',
	      parse: '%s date could not be parsed, %s is invalid ',
	      invalid: '%s date %s is invalid'
	    },
	    types: {
	      string: '%s is not a %s',
	      method: '%s is not a %s (function)',
	      array: '%s is not an %s',
	      object: '%s is not an %s',
	      number: '%s is not a %s',
	      date: '%s is not a %s',
	      "boolean": '%s is not a %s',
	      integer: '%s is not an %s',
	      "float": '%s is not a %s',
	      regexp: '%s is not a valid %s',
	      email: '%s is not a valid %s',
	      url: '%s is not a valid %s',
	      hex: '%s is not a valid %s'
	    },
	    string: {
	      len: '%s must be exactly %s characters',
	      min: '%s must be at least %s characters',
	      max: '%s cannot be longer than %s characters',
	      range: '%s must be between %s and %s characters'
	    },
	    number: {
	      len: '%s must equal %s',
	      min: '%s cannot be less than %s',
	      max: '%s cannot be greater than %s',
	      range: '%s must be between %s and %s'
	    },
	    array: {
	      len: '%s must be exactly %s in length',
	      min: '%s cannot be less than %s in length',
	      max: '%s cannot be greater than %s in length',
	      range: '%s must be between %s and %s in length'
	    },
	    pattern: {
	      mismatch: '%s value %s does not match pattern %s'
	    },
	    clone: function clone() {
	      var cloned = JSON.parse(JSON.stringify(this));
	      cloned.clone = this.clone;
	      return cloned;
	    }
	  };
	}
	var messages = newMessages();

	/**
	 *  Encapsulates a validation schema.
	 *
	 *  @param descriptor An object declaring validation rules
	 *  for this schema.
	 */

	function Schema(descriptor) {
	  this.rules = null;
	  this._messages = messages;
	  this.define(descriptor);
	}

	Schema.prototype = {
	  messages: function messages(_messages) {
	    if (_messages) {
	      this._messages = deepMerge(newMessages(), _messages);
	    }

	    return this._messages;
	  },
	  define: function define(rules) {
	    if (!rules) {
	      throw new Error('Cannot configure a schema with no rules');
	    }

	    if (typeof rules !== 'object' || Array.isArray(rules)) {
	      throw new Error('Rules must be an object');
	    }

	    this.rules = {};
	    var z;
	    var item;

	    for (z in rules) {
	      if (rules.hasOwnProperty(z)) {
	        item = rules[z];
	        this.rules[z] = Array.isArray(item) ? item : [item];
	      }
	    }
	  },
	  validate: function validate(source_, o, oc) {
	    var _this = this;

	    if (o === void 0) {
	      o = {};
	    }

	    if (oc === void 0) {
	      oc = function oc() {};
	    }

	    var source = source_;
	    var options = o;
	    var callback = oc;

	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }

	    if (!this.rules || Object.keys(this.rules).length === 0) {
	      if (callback) {
	        callback();
	      }

	      return Promise.resolve();
	    }

	    function complete(results) {
	      var i;
	      var errors = [];
	      var fields = {};

	      function add(e) {
	        if (Array.isArray(e)) {
	          var _errors;

	          errors = (_errors = errors).concat.apply(_errors, e);
	        } else {
	          errors.push(e);
	        }
	      }

	      for (i = 0; i < results.length; i++) {
	        add(results[i]);
	      }

	      if (!errors.length) {
	        errors = null;
	        fields = null;
	      } else {
	        fields = convertFieldsError(errors);
	      }

	      callback(errors, fields);
	    }

	    if (options.messages) {
	      var messages$1 = this.messages();

	      if (messages$1 === messages) {
	        messages$1 = newMessages();
	      }

	      deepMerge(messages$1, options.messages);
	      options.messages = messages$1;
	    } else {
	      options.messages = this.messages();
	    }

	    var arr;
	    var value;
	    var series = {};
	    var keys = options.keys || Object.keys(this.rules);
	    keys.forEach(function (z) {
	      arr = _this.rules[z];
	      value = source[z];
	      arr.forEach(function (r) {
	        var rule = r;

	        if (typeof rule.transform === 'function') {
	          if (source === source_) {
	            source = _extends({}, source);
	          }

	          value = source[z] = rule.transform(value);
	        }

	        if (typeof rule === 'function') {
	          rule = {
	            validator: rule
	          };
	        } else {
	          rule = _extends({}, rule);
	        }

	        rule.validator = _this.getValidationMethod(rule);
	        rule.field = z;
	        rule.fullField = rule.fullField || z;
	        rule.type = _this.getType(rule);

	        if (!rule.validator) {
	          return;
	        }

	        series[z] = series[z] || [];
	        series[z].push({
	          rule: rule,
	          value: value,
	          source: source,
	          field: z
	        });
	      });
	    });
	    var errorFields = {};
	    return asyncMap(series, options, function (data, doIt) {
	      var rule = data.rule;
	      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
	      deep = deep && (rule.required || !rule.required && data.value);
	      rule.field = data.field;

	      function addFullfield(key, schema) {
	        return _extends({}, schema, {
	          fullField: rule.fullField + "." + key
	        });
	      }

	      function cb(e) {
	        if (e === void 0) {
	          e = [];
	        }

	        var errors = e;

	        if (!Array.isArray(errors)) {
	          errors = [errors];
	        }

	        if (!options.suppressWarning && errors.length) {
	          Schema.warning('async-validator:', errors);
	        }

	        if (errors.length && rule.message !== undefined) {
	          errors = [].concat(rule.message);
	        }

	        errors = errors.map(complementError(rule));

	        if (options.first && errors.length) {
	          errorFields[rule.field] = 1;
	          return doIt(errors);
	        }

	        if (!deep) {
	          doIt(errors);
	        } else {
	          // if rule is required but the target object
	          // does not exist fail at the rule level and don't
	          // go deeper
	          if (rule.required && !data.value) {
	            if (rule.message !== undefined) {
	              errors = [].concat(rule.message).map(complementError(rule));
	            } else if (options.error) {
	              errors = [options.error(rule, format(options.messages.required, rule.field))];
	            }

	            return doIt(errors);
	          }

	          var fieldsSchema = {};

	          if (rule.defaultField) {
	            for (var k in data.value) {
	              if (data.value.hasOwnProperty(k)) {
	                fieldsSchema[k] = rule.defaultField;
	              }
	            }
	          }

	          fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);

	          for (var f in fieldsSchema) {
	            if (fieldsSchema.hasOwnProperty(f)) {
	              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
	              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
	            }
	          }

	          var schema = new Schema(fieldsSchema);
	          schema.messages(options.messages);

	          if (data.rule.options) {
	            data.rule.options.messages = options.messages;
	            data.rule.options.error = options.error;
	          }

	          schema.validate(data.value, data.rule.options || options, function (errs) {
	            var finalErrors = [];

	            if (errors && errors.length) {
	              finalErrors.push.apply(finalErrors, errors);
	            }

	            if (errs && errs.length) {
	              finalErrors.push.apply(finalErrors, errs);
	            }

	            doIt(finalErrors.length ? finalErrors : null);
	          });
	        }
	      }

	      var res;

	      if (rule.asyncValidator) {
	        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
	      } else if (rule.validator) {
	        res = rule.validator(rule, data.value, cb, data.source, options);

	        if (res === true) {
	          cb();
	        } else if (res === false) {
	          cb(rule.message || rule.field + " fails");
	        } else if (res instanceof Array) {
	          cb(res);
	        } else if (res instanceof Error) {
	          cb(res.message);
	        }
	      }

	      if (res && res.then) {
	        res.then(function () {
	          return cb();
	        }, function (e) {
	          return cb(e);
	        });
	      }
	    }, function (results) {
	      complete(results);
	    });
	  },
	  getType: function getType(rule) {
	    if (rule.type === undefined && rule.pattern instanceof RegExp) {
	      rule.type = 'pattern';
	    }

	    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
	      throw new Error(format('Unknown rule type %s', rule.type));
	    }

	    return rule.type || 'string';
	  },
	  getValidationMethod: function getValidationMethod(rule) {
	    if (typeof rule.validator === 'function') {
	      return rule.validator;
	    }

	    var keys = Object.keys(rule);
	    var messageIndex = keys.indexOf('message');

	    if (messageIndex !== -1) {
	      keys.splice(messageIndex, 1);
	    }

	    if (keys.length === 1 && keys[0] === 'required') {
	      return validators.required;
	    }

	    return validators[this.getType(rule)] || false;
	  }
	};

	Schema.register = function register(type, validator) {
	  if (typeof validator !== 'function') {
	    throw new Error('Cannot register a validator by type, validator is not a function');
	  }

	  validators[type] = validator;
	};

	Schema.warning = warning;
	Schema.messages = messages;
	Schema.validators = validators;

	function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

	function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

	function _unsupportedIterableToArray(o, minLen) { if (!o) { return; } if (typeof o === "string") { return _arrayLikeToArray(o, minLen); } var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) { n = o.constructor.name; } if (n === "Map" || n === "Set") { return Array.from(o); } if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) { return _arrayLikeToArray(o, minLen); } }

	function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) { return Array.from(iter); } }

	function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { return _arrayLikeToArray(arr); } }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) { len = arr.length; } for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) {
	var arguments$1 = arguments;
	 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i] != null ? arguments$1[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

	function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

	function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

	function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

	function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

	function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
	var rootStore = null;

	var _operations = new WeakMap();

	function pushOperation(key, operation) {
	  var arr = getOperations(key);
	  arr.push(operation);

	  _operations.set(key, arr);
	}

	function getOperations(key) {
	  return _operations.has(key) ? _operations.get(key) : [];
	}

	function expOrFn2Getter(expOrFn) {
	  if (typeof expOrFn === 'string') {
	    if (expOrFn.includes('.')) {
	      return function (state, rootState) {
	        return expOrFn.split('.').reduce(function (root, key) {
	          return root[key];
	        }, rootState);
	      };
	    } else {
	      return function (state) {
	        return state[expOrFn];
	      };
	    }
	  } else if (Array.isArray(expOrFn)) {
	    var callBacks = expOrFn.map(function (exp) {
	      return expOrFn2Getter(exp);
	    });
	    return function (state, rooState) {
	      return callBacks.map(function (getter) {
	        return getter(state, rooState);
	      });
	    };
	  } else {
	    return expOrFn;
	  }
	}

	function ruleOrCB2CallBack(ruleOrCB) {
	  if (typeof ruleOrCB === 'function') { return ruleOrCB; }
	  var rule = ruleOrCB;
	  return function (_ref) {
	    var value = _ref.value,
	        setState = _ref.setState;
	    new Schema({
	      value: rule
	    }).validate({
	      value: value
	    }, {
	      suppressWarning: true
	    }, function (errors, fields) {
	      var errorMessage = '';

	      if (errors) {
	        errorMessage = errors[0].message;
	      }

	      setState(errorMessage);
	    });
	  };
	}

	function createVuexHero(store) {
	  rootStore = store;
	}

	function checkFn(fn) {
	  assert__default['default'](typeof fn === 'function', 'callback must be a function');
	}

	function checkGetter(getter) {
	  assert__default['default'](typeof getter === 'function', 'getter must be a function');
	}

	function checkExpOrFn(expOrFn, isDeep) {
	  if (!isDeep && Array.isArray(expOrFn)) {
	    expOrFn.forEach(function (item) {
	      checkExpOrFn(item, true);
	    });
	  } else {
	    var type = _typeof(expOrFn);

	    assert__default['default'](type === 'function' || type === 'string', 'expOrFn must be a string or function or array');
	  }
	}

	function checkRuleOrCB(ruleOrCallBack) {
	  var type = _typeof(ruleOrCallBack);

	  assert__default['default'](type === 'function' || type === 'object', 'expOrFn must be a object or function');
	}

	function createModule(path, module) {
	  var _path = /*#__PURE__*/new WeakMap();

	  var _form = /*#__PURE__*/new WeakMap();

	  var _module = /*#__PURE__*/new WeakMap();

	  var _unwatches = /*#__PURE__*/new WeakMap();

	  var _observers = /*#__PURE__*/new WeakMap();

	  var _subModules = /*#__PURE__*/new WeakMap();

	  var _init = /*#__PURE__*/new WeakSet();

	  var _initModule = /*#__PURE__*/new WeakSet();

	  var _beginObserve = /*#__PURE__*/new WeakSet();

	  var Module = /*#__PURE__*/function () {
	    function Module(_path2, _module2) {
	      _classCallCheck(this, Module);

	      _beginObserve.add(this);

	      _initModule.add(this);

	      _init.add(this);

	      _path.set(this, {
	        writable: true,
	        value: ''
	      });

	      _form.set(this, {
	        writable: true,
	        value: {}
	      });

	      _module.set(this, {
	        writable: true,
	        value: {}
	      });

	      _unwatches.set(this, {
	        writable: true,
	        value: []
	      });

	      _observers.set(this, {
	        writable: true,
	        value: {}
	      });

	      _subModules.set(this, {
	        writable: true,
	        value: []
	      });

	      _defineProperty(this, "state", {});

	      _classPrivateMethodGet(this, _init, _init2).call(this, _path2, _module2);

	      this.unregisterModule = function () {
	        if (this.store.hasModule(_classPrivateFieldGet(this, _path))) {
	          _classPrivateFieldGet(this, _subModules).forEach(function (subM) {
	            return subM.unregisterModule();
	          });

	          _classPrivateFieldGet(this, _unwatches).forEach(function (unwatch) {
	            unwatch();
	          });

	          this.store.unregisterModule(_classPrivateFieldGet(this, _path));
	        }

	        _classPrivateMethodGet(this, _init, _init2).call(this, _path2, _module2);

	        return this;
	      };
	    }

	    _createClass(Module, [{
	      key: "store",
	      get: function get() {
	        return rootStore;
	      }
	    }, {
	      key: "registerModule",
	      value: function registerModule(replace) {
	        var _this = this;

	        if (!rootStore) { throw new Error("must call Vue.use(h) and new Vue(options) before registerModule"); }

	        var register = function register() {
	          _this.store.registerModule(_classPrivateFieldGet(_this, _path), _classPrivateFieldGet(_this, _module));

	          _classPrivateMethodGet(_this, _beginObserve, _beginObserve2).call(_this);

	          _classPrivateFieldGet(_this, _subModules).forEach(function (subM) {
	            return subM.registerModule(replace);
	          });
	        };

	        if (replace) {
	          this.unregisterModule();
	          register();
	        } else {
	          if (!this.store.hasModule(_classPrivateFieldGet(this, _path))) {
	            register();
	          }
	        }

	        return this;
	      }
	    }, {
	      key: "validate",
	      value: function validate(formName, validateCB) {
	        var _this2 = this;

	        if (typeof formName === 'function') {
	          validateCB = formName;
	          formName = null;
	        }

	        var promiseArr = [];
	        Object.keys(_classPrivateFieldGet(this, _form)).forEach(function (currentFormName) {
	          if (formName && currentFormName !== formName) { return; }

	          var formTeam = _classPrivateFieldGet(_this2, _form)[currentFormName];

	          Object.keys(formTeam).forEach(function (key) {
	            var _formTeam$key = formTeam[key],
	                getter = _formTeam$key.getter,
	                callBack = _formTeam$key.callBack;
	            promiseArr.push(new Promise(function (resolve, reject) {
	              callBack({
	                value: getter(_this2.state, _this2.store.state),
	                setState: function setState(result) {
	                  _this2.state[key] = result;

	                  if (result) {
	                    reject();
	                  } else {
	                    resolve();
	                  }
	                },
	                state: _this2.state,
	                rootState: _this2.store.state
	              });
	            }));
	          });
	        });
	        Promise.all(promiseArr).then(function () {
	          validateCB && validateCB(true);
	        }).catch(function () {
	          validateCB && validateCB(false);
	        });
	      }
	    }]);

	    return Module;
	  }();

	  function _init2(path, module) {
	    _classPrivateFieldSet(this, _path, '');

	    _classPrivateFieldSet(this, _form, {});

	    _classPrivateFieldSet(this, _module, {});

	    _classPrivateFieldSet(this, _unwatches, []);

	    _classPrivateFieldSet(this, _observers, {});

	    _classPrivateFieldSet(this, _subModules, []);

	    this.state = {};

	    _classPrivateFieldSet(this, _path, Array.isArray(path) ? path : path.split('.'));

	    _classPrivateMethodGet(this, _initModule, _initModule2).call(this, module);
	  }

	  function _initModule2(module) {
	    var _this3 = this;

	    var virState = module.state;
	    Object.keys(virState).forEach(function (key) {
	      if (virState[key] instanceof h) {
	        _this3.state[key] = virState[key]._initValue;
	        _classPrivateFieldGet(_this3, _observers)[key] = getOperations(virState[key]);
	      } else {
	        _this3.state[key] = virState[key];
	      }
	    });

	    _classPrivateFieldSet(this, _module, _objectSpread(_objectSpread({}, module), {}, {
	      state: this.state,
	      modules: undefined
	    }));

	    var subModules = module.modules || {};
	    Object.keys(subModules).forEach(function (key) {
	      var subM = new Module([].concat(_toConsumableArray(_classPrivateFieldGet(_this3, _path)), [key]), subModules[key]);

	      _classPrivateFieldGet(_this3, _subModules).push(subM);

	      _this3[key] = subM;
	      subModules[key].state = subM.state;
	    });
	  }

	  function _beginObserve2() {
	    var _this4 = this;

	    setTimeout(function () {
	      Object.keys(_classPrivateFieldGet(_this4, _observers)).forEach(function (key) {
	        var setState = function setState(value) {
	          _this4.state[key] = value;
	        };

	        var rootState = _this4.store.state;

	        _classPrivateFieldGet(_this4, _observers)[key].forEach(function (watch) {
	          var _watch$getter = watch.getter,
	              getter = _watch$getter === void 0 ? function (s) {
	            return s[key];
	          } : _watch$getter,
	              callBack = watch.callBack,
	              options = watch.options;
	          /**
	           * load
	           * */

	          if (options.isLoad) {
	            callBack({
	              state: _this4.state,
	              rootState: rootState,
	              setState: setState
	            });
	            return;
	          }
	          /**
	           * validation
	           * */


	          if (options.isValidation) {
	            if (!_classPrivateFieldGet(_this4, _form)[options.formName]) { _classPrivateFieldGet(_this4, _form)[options.formName] = {}; }
	            _classPrivateFieldGet(_this4, _form)[options.formName][key] = {
	              getter: getter,
	              callBack: callBack
	            };
	          }
	          /**
	           * watch 解决unwatch可能为undefined问题
	           * */


	          var stopCall = false;

	          var preUnwatch = function preUnwatch() {
	            stopCall = true;

	            if (unwatch) {
	              unwatch();
	            } else {
	              setTimeout(function () {
	                preUnwatch();
	              }, 0);
	            }
	          };

	          var unwatch = _this4.store.watch(function () {
	            return getter(_this4.state, rootState);
	          }, function (newVal, oldVal) {
	            if (stopCall) { return; }
	            callBack({
	              value: newVal,
	              oldVal: oldVal,
	              setState: setState,
	              state: _this4.state,
	              rootState: rootState,
	              unwatch: preUnwatch
	            });
	          }, options);

	          _classPrivateFieldGet(_this4, _unwatches).push(unwatch);
	        });
	      });
	    }, 0);
	  }

	  return new Module(path, module);
	}

	function h(initValue) {
	  if (this instanceof h) {
	    assert__default['default'](initValue !== undefined, 'initValue can\'t be undefined');
	    this._initValue = initValue;
	    return this;
	  } // 神奇的鸭子类型判断


	  if (typeof initValue === 'function' && typeof initValue.prototype._init === 'function') {
	    var Vue = initValue;
	    var originInit = Vue.prototype._init;

	    Vue.prototype._init = function (options) {
	      if (options !== null && options !== void 0 && options.store && !rootStore) {
	        createVuexHero(options.store);
	      }

	      return originInit.call(this, options);
	    };
	  }
	}

	h.prototype.load = function (callBack) {
	  checkFn(callBack);
	  pushOperation(this, {
	    callBack: callBack,
	    options: {
	      isLoad: true
	    }
	  });
	  return this;
	};

	h.prototype.getter = function (getter) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    immediate: true,
	    deep: false
	  };
	  checkGetter(getter);
	  pushOperation(this, {
	    getter: getter,
	    callBack: function callBack(_ref2) {
	      var value = _ref2.value,
	          setState = _ref2.setState;
	      setState(value);
	    },
	    options: _objectSpread(_objectSpread({}, options), {}, {
	      isGetter: true
	    })
	  });
	  return this;
	};

	h.prototype.watch = function (expOrFn, callBack) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
	    immediate: true,
	    deep: false
	  };
	  checkExpOrFn(expOrFn);
	  checkFn(callBack);
	  pushOperation(this, {
	    getter: expOrFn2Getter(expOrFn),
	    callBack: callBack,
	    options: options
	  });
	  return this;
	};

	h.prototype.watchSelf = function (callBack) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    immediate: true,
	    deep: false
	  };
	  checkFn(callBack);
	  pushOperation(this, {
	    callBack: callBack,
	    options: options
	  });
	  return this;
	};

	h.prototype.validate = function (expOrFn, ruleOrCallBack, formName) {
	  checkExpOrFn(expOrFn);
	  checkRuleOrCB(ruleOrCallBack);
	  pushOperation(this, {
	    getter: expOrFn2Getter(expOrFn),
	    callBack: ruleOrCB2CallBack(ruleOrCallBack),
	    options: {
	      immediate: false,
	      deep: false,
	      isValidation: true,
	      formName: formName || 'noFormName'
	    }
	  });
	  return this;
	};

	h.init = function (initValue) {
	  assert__default['default'](initValue !== undefined, 'initValue can\'t be undefined');
	  return new h(initValue);
	};

	h.strLoad = function (callBack) {
	  checkFn(callBack);
	  return new h('').load(callBack);
	};

	h.arrLoad = function (callBack) {
	  checkFn(callBack);
	  return new h([]).load(callBack);
	};

	h.strGetter = function (getter) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    immediate: true,
	    deep: false
	  };
	  checkGetter(getter);
	  return new h('').getter(getter, options);
	};

	h.arrGetter = function (getter) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    immediate: true,
	    deep: false
	  };
	  checkGetter(getter);
	  return new h([]).getter(getter, options);
	};

	h.strWatch = function (expOrFn, callBack) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
	    immediate: true,
	    deep: false
	  };
	  checkExpOrFn(expOrFn);
	  checkFn(callBack);
	  return new h('').watch(expOrFn, callBack, options);
	};

	h.arrWatch = function (expOrFn, callBack) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
	    immediate: true,
	    deep: false
	  };
	  checkExpOrFn(expOrFn);
	  checkFn(callBack);
	  return new h([]).watch(expOrFn, callBack, options);
	};

	h.strWatchSelf = function (callBack) {
	  checkFn(callBack);
	  return new h('').watchSelf(callBack);
	};

	h.createModule = createModule;

	exports.createModule = createModule;
	exports.createVuexHero = createVuexHero;
	exports.default = h;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
