const { Writable } = require('stream');

class BufferedOutput extends Writable {
  constructor (options) {
    super(options);
    this.buffer = new Buffer('');
  }

  _write(chunk, enc, cb) {
    var buffer = (Buffer.isBuffer(chunk)) ? chunk : new Buffer(chunk, enc);
    this.buffer = Buffer.concat([this.buffer, buffer]);

    cb();
  };

  toString() {
    return this.buffer.toString();
  }

  toLines() {
    return this.toString().split('\n').filter(line => line.length > 0);
  }
}

module.exports = BufferedOutput;
