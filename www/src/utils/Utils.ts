const Utils = {
  convertIntToWords(n: number): string {
    if (n === 0) return 'zero';
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
    ];
    const b = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const g = [
      '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
      'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion',
    ];
    const grp = (n: string) => ('000' + n).substr(-3);
    const rem = (n: string) => n.substr(0, n.length - 3);
    const fmt = ([h, t, o]: string) =>
      [
        Number(h) === 0 ? '' : a[Number(h)] + ' hundred ',
        Number(o) === 0 ? b[Number(t)] : (b[Number(t)] && b[Number(t)] + '-') || '',
        a[Number(t + o)] || a[Number(o)],
      ].join('');
    const cons = (xs: string) => (x: string) => (g: string) =>
      x ? [x, (g && ' ' + g) || '', ' ', xs].join('') : xs;
    const iter = (str: string) => (i: number) => (x: string) => (r: string): string => {
      if (x === '000' && r.length === 0) return str;
      return iter(cons(str)(fmt(x))(g[i]))(i + 1)(grp(r))(rem(r));
    };
    return iter('')(0)(grp(String(n)))(rem(String(n)));
  },
};

export default Utils;
