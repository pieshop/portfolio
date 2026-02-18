'use strict';

interface DateFormatFn {
  (date?: Date | string | number, mask?: string, utc?: boolean): string;
  masks: Record<string, string>;
  i18n: { dayNames: string[]; monthNames: string[] };
}

const dateFormat = (function () {
  const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|'[^']*'|'[^']*'/g;
  const timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
  const timezoneClip = /[^-+\dA-Z]/g;
  const pad = (val: string | number, len = 2): string => {
    let v = String(val);
    while (v.length < len) v = '0' + v;
    return v;
  };

  return function (date?: Date | string | number, mask?: string, utc?: boolean): string {
    const dF = dateFormat as DateFormatFn;

    if (
      arguments.length === 1 &&
      Object.prototype.toString.call(date) === '[object String]' &&
      !/\d/.test(date as string)
    ) {
      mask = date as string;
      date = undefined;
    }

    const d = date ? new Date(date as string | number | Date) : new Date();
    if (isNaN(d.getTime())) throw new SyntaxError('invalid date');

    let resolvedMask = String(dF.masks[mask as string] || mask || dF.masks['default']);
    let resolvedUtc = utc;
    if (resolvedMask.slice(0, 4) === 'UTC:') {
      resolvedMask = resolvedMask.slice(4);
      resolvedUtc = true;
    }

    const day = resolvedUtc ? d.getUTCDate() : d.getDate();
    const D = resolvedUtc ? d.getUTCDay() : d.getDay();
    const mo = resolvedUtc ? d.getUTCMonth() : d.getMonth();
    const y = resolvedUtc ? d.getUTCFullYear() : d.getFullYear();
    const H = resolvedUtc ? d.getUTCHours() : d.getHours();
    const M = resolvedUtc ? d.getUTCMinutes() : d.getMinutes();
    const s = resolvedUtc ? d.getUTCSeconds() : d.getSeconds();
    const L = resolvedUtc ? d.getUTCMilliseconds() : d.getMilliseconds();
    const o = resolvedUtc ? 0 : d.getTimezoneOffset();

    const flags: Record<string, string | number> = {
      d: day,
      dd: pad(day),
      ddd: dF.i18n.dayNames[D],
      dddd: dF.i18n.dayNames[D + 7],
      m: mo + 1,
      mm: pad(mo + 1),
      mmm: dF.i18n.monthNames[mo],
      mmmm: dF.i18n.monthNames[mo + 12],
      yy: String(y).slice(2),
      yyyy: y,
      h: H % 12 || 12,
      hh: pad(H % 12 || 12),
      H: H,
      HH: pad(H),
      M: M,
      MM: pad(M),
      s: s,
      ss: pad(s),
      l: pad(L, 3),
      L: pad(L > 99 ? Math.round(L / 10) : L),
      t: H < 12 ? 'a' : 'p',
      tt: H < 12 ? 'am' : 'pm',
      T: H < 12 ? 'A' : 'P',
      TT: H < 12 ? 'AM' : 'PM',
      Z: resolvedUtc ? 'UTC' : (String(d).match(timezone) || ['']).pop()!.replace(timezoneClip, ''),
      o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
      S: ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : ((day % 100 - day % 10) !== 10 ? day : 0) % 10],
    };

    return resolvedMask.replace(token, ($0: string) =>
      $0 in flags ? String(flags[$0]) : $0.slice(1, $0.length - 1)
    );
  };
})() as DateFormatFn;

dateFormat.masks = {
  default: 'HH:MMtt - mmm dS yyyy',
  shortDate: 'm/d/yy',
  mediumDate: 'mmm d, yyyy',
  longDate: 'mmmm d, yyyy',
  fullDate: 'dddd, mmmm d, yyyy',
  shortTime: 'h:MM TT',
  mediumTime: 'h:MM:ss TT',
  longTime: 'h:MM:ss TT Z',
  isoDate: 'yyyy-mm-dd',
  isoTime: 'HH:MM:ss',
};

dateFormat.i18n = {
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export default dateFormat;
