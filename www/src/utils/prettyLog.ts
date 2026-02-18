interface LogEntry {
  key: string;
  value: string | boolean | number;
}

interface LogGroup {
  key: string;
  value: LogEntry[];
  limits?: { keyMax: number; valueMax: number; labelMax: number };
}

let _output: LogGroup[] = [];

const FONT = 'font-family: monospace; src: local("Menlo");';
const LABEL = FONT + 'background-color:red; font-weight: bold; padding:3px 10px; color:white';
const tpl1 = FONT + 'background-color:gainsboro; padding:3px 6px 3px 12px; color:black';
const tpl2 = FONT + 'background-color:palegreen; font-weight: bold; padding:3px 6px; color:black';
const TEMPLATE = [tpl1, tpl2];

function _calculateMaxLabelLengths(ary: string[]): number {
  return ary.reduce((acc, val) => Math.max(acc, val.toString().length), 0);
}

function _calculateMaxLengths(ary: LogEntry[]): { keyMax: number; valueMax: number; labelMax: number } {
  return ary.reduce(
    (acc, val) => {
      acc.keyMax = Math.max(acc.keyMax, val.key.toString().length);
      acc.valueMax = Math.max(acc.valueMax, val.value.toString().length);
      return acc;
    },
    { keyMax: 0, valueMax: 0, labelMax: 0 }
  );
}

function _leftPad(str: string | number | boolean, length = 10): string {
  return `${' '.repeat(Math.max(length - str.toString().length, 0))}${str}`;
}

function _rightPad(str: string | number | boolean, length = 10): string {
  return `${str}${' '.repeat(Math.max(length - str.toString().length, 0))}`;
}

function _formatLog(ary: LogEntry[], maxLength: { keyMax: number; valueMax: number }, seperator: string): string {
  return ary.reduce((acc, val) => {
    const key = _leftPad(val.key, maxLength.keyMax);
    const value = _rightPad(val.value, maxLength.valueMax);
    acc += `${seperator}${key}${seperator}${value}`;
    return acc;
  }, '');
}

function _css(ary: LogEntry[]): string[] {
  return ary.reduce((acc: string[]) => [...acc, ...TEMPLATE], []);
}

function _log({ key, value, limits }: LogGroup): void {
  const seperator = '%c';
  const maxLength = limits || _calculateMaxLengths(value);
  const labelPadded = _rightPad(key, limits?.labelMax);
  const formatted = `${seperator}${labelPadded}` + _formatLog(value, maxLength, seperator);
  console.info(formatted, LABEL, ..._css(value));
}

interface PrettyLog {
  add(messages: LogGroup[]): void;
  print(messages?: LogGroup[]): PrettyLog;
}

const prettyLog: PrettyLog = {
  add(messages: LogGroup[]): void {
    _output = [..._output, ...messages];
  },
  print(messages: LogGroup[] = _output): PrettyLog {
    const allLabels = messages.map((val) => val.key);
    const allOutput = messages.reduce((acc: LogEntry[], val) => [...acc, ...val.value], []);
    const limits = _calculateMaxLengths(allOutput);
    limits.labelMax = _calculateMaxLabelLengths(allLabels);
    for (const msg of messages) {
      msg.limits = limits;
      _log(msg);
    }
    return prettyLog;
  },
};

export default prettyLog;
