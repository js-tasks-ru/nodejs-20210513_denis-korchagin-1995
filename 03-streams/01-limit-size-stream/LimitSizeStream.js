const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {

  #limit = null;
  #bytes = 0;

  constructor(options) {
    super(options);
    this.#limit = options.limit || null;
  }

  _transform(chunk, encoding, callback) {
    if (this.#limit === null) {
      return callback(null, chunk);
    }
    this.#bytes += chunk.length;
    if (this.#bytes > this.#limit) {
      return callback(new LimitExceededError());
    }
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
