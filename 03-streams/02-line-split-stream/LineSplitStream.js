const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  #remain = '';

  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    let string = chunk.toString(this.encoding);
    let strings = (this.#remain + string).split(os.EOL);
    this.#remain = strings.pop();
    if (this.#remain == null) {
      this.#remain = '';
    }

    for(let i = 0, len = strings.length; i < len; ++i) {
      this.push(strings[i]);
    }

    callback();
  }

  _flush(callback) {
    if (this.#remain.length > 0) {
      this.push(this.#remain);
      this.#remain = '';
    }
    callback();
  }
}

module.exports = LineSplitStream;
