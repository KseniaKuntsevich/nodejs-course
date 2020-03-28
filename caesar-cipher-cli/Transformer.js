const caesarCoder = require('./caesarCoder').caesarCoder;
const { Transform } = require('stream');

class Transformer extends Transform {
  constructor(step){
  	super()
  	this.step = step
  }
  
  _transform(chunk, encoding, callback) {
    try {
      const resultString = caesarCoder(chunk.toString('utf8'), this.step);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports.Transformer = Transformer;