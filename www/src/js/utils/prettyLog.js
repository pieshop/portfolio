/*!
 * PrettyLog.js
 */
(function() {
  'use strict';

  const objectTypes = {
    function: true,
    object: true,
  };

  /** Used as a reference to the global object. */
  let root = (objectTypes[typeof window] && window) || this;
  /** Backup possible global object. */
  const oldRoot = root;
  /** Detect free variable `exports`. */
  const freeExports = objectTypes[typeof exports] && exports;
  /** Detect free variable `module`. */
  const freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  const freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (
    freeGlobal &&
    (freeGlobal.global === freeGlobal ||
      freeGlobal.window === freeGlobal ||
      freeGlobal.self === freeGlobal)
  ) {
    root = freeGlobal;
  }
  /** Used for native method references. */
  const objectProto = Object.prototype;
  /** Used to check for own properties of an object. */
  const hasOwnProperty = objectProto.hasOwnProperty;
  /** Used to resolve the internal `[[Class]]` of values. */
  const toString = objectProto.toString;

  let _output = [];
  /**
   * Formatting
   */
  const FONT = 'font-family: monospace; src: local("Menlo");';
  const LABEL = FONT + 'background-color:red; font-weight: bold; padding:3px 10px; color:white';
  const tpl1 = FONT + 'background-color:gainsboro; padding:3px 6px 3px 12px; color:black';
  const tpl2 = FONT + 'background-color:palegreen; font-weight: bold; padding:3px 6px; color:black';
  const TEMPLATE = [tpl1, tpl2];
  /*--------------------------------------------------------------------------*/
  /**
   * Calculate max label length for all keys and values and rows
   *
   * @private
   * @param {array}
   * @returns {object} object with max lengths
   */
  function _calculateMaxLabelLengths(ary) {
    return ary.reduce((acc, val) => {
      acc = Math.max(acc, val.toString().length);
      return acc;
    }, 0);
  }
  function _calculateMaxLengths(ary) {
    return ary.reduce(
      (acc, val) => {
        acc.keyMax = Math.max(acc.keyMax, val.key.toString().length);
        acc.valueMax = Math.max(acc.valueMax, val.value.toString().length);
        return acc;
      },
      { keyMax: 0, valueMax: 0, labelMax: 0 }
    );
  }
  /*--------------------------------------------------------------------------*/
  /**
   * Calculate max label length for all keys and values and rows
   *
   * @private
   * @param {array}
   * @returns {object} object with max lengths
   */
  function _leftPad(str, length = 10) {
    return `${' '.repeat(Math.max(length - str.toString().length, 0))}${str}`;
  }

  function _rightPad(str, length = 10) {
    return `${str}${' '.repeat(Math.max(length - str.toString().length, 0))}`;
  }

  function _formatLog(ary, maxLength) {
    return ary.reduce((acc, val) => {
      const key = _leftPad(val.key, maxLength.keyMax);
      const value = _rightPad(val.value, maxLength.valueMax);
      acc += `%c${key}%c${value}`;
      return acc;
    }, '');
  }

  function _css(ary) {
    return ary.reduce((acc) => {
      return [...acc, ...TEMPLATE];
    }, []);
  }
  /*--------------------------------------------------------------------------*/
  /**
   * console formatting via css
   *
   * @private
   */
  function _log({ key, value, limits }) {
    const maxLength = limits || _calculateMaxLengths(value);
    const labelPadded = _rightPad(key, limits.labelMax);
    const formatted = `%c${labelPadded}` + _formatLog(value, maxLength);
    console.info(formatted, LABEL, ..._css(value));
  }
  /*--------------------------------------------------------------------------*/
  /**
   * Creates a new prettyLog object.
   * @returns {Object} A prettyLog object.
   */
  function parse() {
    const prettyLog = {};
    prettyLog.add = (messages) => {
      _output = [..._output, ...messages];
    };
    prettyLog.print = (messages = _output) => {
      const allLabels = messages.reduce((acc, val, ind) => {
        acc.push(val.key);
        return acc;
      }, []);

      const allOutput = messages.reduce((acc, val, ind) => {
        return [...acc, ...val.value];
      }, []);

      const limits = _calculateMaxLengths(allOutput);
      limits.labelMax = _calculateMaxLabelLengths(allLabels);

      for (const msg of messages) {
        msg.limits = limits;
        _log(msg);
      }
    };
    return prettyLog;
  }

  /*--------------------------------------------------------------------------*/
  const prettyLog = parse(); // Export prettyLog.

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose prettyLog on the global object to prevent errors when prettyLog is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.prettyLog = prettyLog;

    // Define as an anonymous module so prettyLog can be aliased through path mapping.
    define(function() {
      return prettyLog;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(prettyLog, function(value, key) {
      freeExports[key] = value;
    });
  } else {
    // Export to the global object.
    root.prettyLog = prettyLog;
  }
}.call(this));
