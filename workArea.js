const { trim: defaultFormatter } = require('./formatters');

function createInputWorkArea(format, params = {}) {
  return format.reduce(
    (acc, [key, length]) =>
      acc + String(params[key] || '').padEnd(length).substr(0, length), ''
  ).toUpperCase();
}

function readWorkArea(format, initialOffset = 0, bufferString) {
  let currentOffset = 0;
  return format.reduce(
    (acc, [key, length, formatter = defaultFormatter]) => {
      let nextVal = bufferString.substr(initialOffset + currentOffset, length);
      if (Array.isArray(formatter)) {
        const recordLength = formatter.reduce((acc, cur) => acc + cur[1], 0);
        const values = [];
        for (let i = 0; i < nextVal.length / recordLength; i++) {
          const substr = nextVal.substr(i * recordLength, recordLength);
          if (substr.trim()) {
            values.push(readWorkArea(formatter, 0, substr));
          }
        }
        nextVal = values;
      } else if (typeof formatter === 'function') {
        nextVal = formatter(nextVal);
      }

      currentOffset += length;
      if (typeof nextVal !== 'undefined') Object.assign(acc, { [key]: nextVal });
      return acc;
    }, {}
  );
}

module.exports = {
  createInputWorkArea,
  readWorkArea,
};
