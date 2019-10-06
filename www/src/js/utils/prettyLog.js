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

function _formatLog(ary, maxLength, seperator) {
  return ary.reduce((acc, val) => {
    const key = _leftPad(val.key, maxLength.keyMax);
    const value = _rightPad(val.value, maxLength.valueMax);
    acc += `${seperator}${key}${seperator}${value}`;
    return acc;
  }, '');
}

function _css(ary) {
  return ary.reduce((acc) => {
    return [...acc, ...TEMPLATE];
  }, []);
}
function _isIE() {
  const ua = navigator.userAgent;
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
}
/*--------------------------------------------------------------------------*/
/**
 * console formatting via css
 *
 * @private
 */
function _log({ key, value, limits }) {
  const seperator = _isIE() ? '|' : '%c';
  const maxLength = limits || _calculateMaxLengths(value);
  const labelPadded = _rightPad(key, limits.labelMax);
  const formatted = `${seperator}${labelPadded}` + _formatLog(value, maxLength, seperator);
  _isIE() ? console.log(formatted) : console.info(formatted, LABEL, ..._css(value));
}
/*--------------------------------------------------------------------------*/
/**
 * Creates a new prettyLog object.
 * @returns {Object} A prettyLog object.
 */

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
  return prettyLog;
};

export default prettyLog;
