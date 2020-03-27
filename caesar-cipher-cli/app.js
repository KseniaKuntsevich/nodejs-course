const { Transform, Readable } = require('stream');
const fs = require('fs');
const process = require('process');
const caesarCoder = require('./caesarCoder').caesarCoder;
const program = require('./commander').program;

const shift = program.shift;
const input = program.input;
const output = program.output;
const action = program.action;
const step = action === 'decode' ? +shift * -1 : +shift;

class CounterTransform extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const resultString = caesarCoder(chunk.toString('utf8'), step);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

let reader;
const writer = fs.createWriteStream(`./${output}`);
const transform = new CounterTransform();

if (input && output) {
  reader = fs.createReadStream(`./${input}`, 'utf8');
  reader.pipe(transform).pipe(writer);
} else if (!input) {
  console.log('enter string to encode');
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    let chunk;

    while ((chunk = process.stdin.read()) !== null) {
      const str = caesarCoder(chunk.toString('utf8'), step);
      if (!output) {
        process.stdout.write(str);
      } else {
        reader = Readable.from(str);
        reader.pipe(transform).pipe(writer);
        return;
      }
    }
  });

  process.stdin.on('end', () => {
    process.stdout.write('end');
  });
}
