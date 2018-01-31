'use strict';
/* eslint-disable no-unused-vars */

let Utils = {
    convertIntToWords (n) {
        // http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
        if (n === 0) {
            return 'zero';
        }
        let a    = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
            'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        let b    = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        let g    = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];
        let grp  = function grp(n) {
            return ('000' + n).substr(-3);
        };
        let rem  = function rem(n) {
            return n.substr(0, n.length - 3);
        };
        let fmt  = function fmt(_ref) {
            let h = _ref[0];
            let t = _ref[1];
            let o = _ref[2];

            return [Number(h) === 0 ? '' : a[h] + ' hundred ', Number(o) === 0 ? b[t] : b[t] && b[t] + '-' || '', a[t + o] || a[o]].join('');
        };
        let cons = function cons(xs) {
            return function (x) {
                return function (g) {
                    return x ? [x, g && ' ' + g || '', ' ', xs].join('') : xs;
                };
            };
        };
        let iter = function iter(str) {
            return function (i) {
                return function (x) {
                    return function (r) {
                        if (x === '000' && r.length === 0) {
                            return str;
                        }
                        return iter(cons(str)(fmt(x))(g[i]))(i + 1)(grp(r))(rem(r));
                    };
                };
            };
        };
        return iter('')(0)(grp(String(n)))(rem(String(n)));
    }
};
export default Utils;
