/*!
 * vuex-proxy v1.0.6
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

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

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
    if (!rootStore) { throw new Error("please call 'createVuexHero' first"); }

    var _form = /*#__PURE__*/new WeakMap();

    var _module = /*#__PURE__*/new WeakMap();

    var _path = /*#__PURE__*/new WeakMap();

    var _unwatches = /*#__PURE__*/new WeakMap();

    var _observers = /*#__PURE__*/new WeakMap();

    var _subModules = /*#__PURE__*/new WeakMap();

    var _initModule = /*#__PURE__*/new WeakSet();

    var _beginObserve = /*#__PURE__*/new WeakSet();

    var Module = /*#__PURE__*/function () {
      function Module(path, _module2) {
        _classCallCheck(this, Module);

        _beginObserve.add(this);

        _initModule.add(this);

        _form.set(this, {
          writable: true,
          value: {}
        });

        _module.set(this, {
          writable: true,
          value: {}
        });

        _path.set(this, {
          writable: true,
          value: ''
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

        _classPrivateFieldSet(this, _path, Array.isArray(path) ? path : path.split('.'));

        this.state = {};

        _classPrivateMethodGet(this, _initModule, _initModule2).call(this, _module2);
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
        key: "unregisterModule",
        value: function unregisterModule() {
          if (this.store.hasModule(_classPrivateFieldGet(this, _path))) {
            _classPrivateFieldGet(this, _subModules).forEach(function (subM) {
              return subM.unregisterModule();
            });

            _classPrivateFieldGet(this, _unwatches).forEach(function (unwatch) {
              unwatch();
            });

            this.store.unregisterModule(_classPrivateFieldGet(this, _path));
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
          })["catch"](function () {
            validateCB && validateCB(false);
          });
        }
      }]);

      return Module;
    }();

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
             * watch
             * */
            // 解决unwatch可能为undefined问题


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

  var h = /*#__PURE__*/function () {
    function h(initValue) {
      _classCallCheck(this, h);

      assert__default['default'](initValue !== undefined, 'initValue can\'t be undefined');
      this._initValue = initValue;
    }

    _createClass(h, [{
      key: "load",
      value: function load(callBack) {
        checkFn(callBack);
        pushOperation(this, {
          callBack: callBack,
          options: {
            isLoad: true
          }
        });
        return this;
      }
    }, {
      key: "getter",
      value: function getter(_getter) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          immediate: true,
          deep: false
        };
        checkGetter(_getter);
        pushOperation(this, {
          getter: _getter,
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
      }
    }, {
      key: "watch",
      value: function watch(expOrFn, callBack) {
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
      }
    }, {
      key: "watchSelf",
      value: function watchSelf(callBack) {
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
      }
    }, {
      key: "validate",
      value: function validate(expOrFn, ruleOrCallBack, formName) {
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
      }
    }], [{
      key: "init",
      value: function init(initValue) {
        assert__default['default'](initValue !== undefined, 'initValue can\'t be undefined');
        return new h(initValue);
      }
    }, {
      key: "strLoad",
      value: function strLoad(callBack) {
        checkFn(callBack);
        return new h('').load(callBack);
      }
    }, {
      key: "arrLoad",
      value: function arrLoad(callBack) {
        checkFn(callBack);
        return new h([]).load(callBack);
      }
    }, {
      key: "strGetter",
      value: function strGetter(getter) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          immediate: true,
          deep: false
        };
        checkGetter(getter);
        return new h('').getter(getter, options);
      }
    }, {
      key: "arrGetter",
      value: function arrGetter(getter) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          immediate: true,
          deep: false
        };
        checkGetter(getter);
        return new h([]).getter(getter, options);
      }
    }, {
      key: "strWatch",
      value: function strWatch(expOrFn, callBack) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          immediate: true,
          deep: false
        };
        checkExpOrFn(expOrFn);
        checkFn(callBack);
        return new h('').watch(expOrFn, callBack, options);
      }
    }, {
      key: "arrWatch",
      value: function arrWatch(expOrFn, callBack) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          immediate: true,
          deep: false
        };
        checkExpOrFn(expOrFn);
        checkFn(callBack);
        return new h([]).watch(expOrFn, callBack, options);
      }
    }, {
      key: "strWatchSelf",
      value: function strWatchSelf(callBack) {
        checkFn(callBack);
        return new h('').watchSelf(callBack);
      }
    }, {
      key: "arrWatchSelf",
      value: function arrWatchSelf(callBack) {
        checkFn(callBack);
        return new h([]).watchSelf(callBack);
      }
    }, {
      key: "strValidate",
      value: function strValidate(expOrFn, ruleOrCallBack, formName) {
        checkExpOrFn(expOrFn);
        checkRuleOrCB(ruleOrCallBack);
        return new h('').validate(expOrFn, ruleOrCallBack, formName);
      }
    }]);

    return h;
  }();

  exports.createModule = createModule;
  exports.createVuexHero = createVuexHero;
  exports.default = h;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
