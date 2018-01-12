const { Readable } = require('stream');

class BufferedInput extends Readable {
  static from(lines) {
    const input = new BufferedInput();
    input.push(lines.join('\n'));
    input.push(null);

    return input;
  }
}

module.exports = BufferedInput;
