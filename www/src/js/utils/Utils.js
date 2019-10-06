/* eslint-disable no-unused-vars */

const Utils = {
  convertIntToWords(n) {
    // http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
    if (n === 0) {
      return 'zero';
    }
    const a = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const b = [
      '',
      '',
      'twenty',
      'thirty',
      'fourty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];
    const g = [
      '',
      'thousand',
      'million',
      'billion',
      'trillion',
      'quadrillion',
      'quintillion',
      'sextillion',
      'septillion',
      'octillion',
      'nonillion',
    ];
    const grp = function grp(n) {
      return ('000' + n).substr(-3);
    };
    const rem = function rem(n) {
      return n.substr(0, n.length - 3);
    };
    const fmt = function fmt(_ref) {
      const h = _ref[0];
      const t = _ref[1];
      const o = _ref[2];

      return [
        Number(h) === 0 ? '' : a[h] + ' hundred ',
        Number(o) === 0 ? b[t] : (b[t] && b[t] + '-') || '',
        a[t + o] || a[o],
      ].join('');
    };
    const cons = function cons(xs) {
      return function(x) {
        return function(g) {
          return x ? [x, (g && ' ' + g) || '', ' ', xs].join('') : xs;
        };
      };
    };
    const iter = function iter(str) {
      return function(i) {
        return function(x) {
          return function(r) {
            if (x === '000' && r.length === 0) {
              return str;
            }
            return iter(cons(str)(fmt(x))(g[i]))(i + 1)(grp(r))(rem(r));
          };
        };
      };
    };
    return iter('')(0)(grp(String(n)))(rem(String(n)));
  },
};
export default Utils;
