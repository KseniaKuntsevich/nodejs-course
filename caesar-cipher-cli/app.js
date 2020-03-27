const { Transform, Readable } = require('stream');
const fs = require('fs');
const process = require('process');
const caesarCoder = require('./caesarCoder').caesarCoder;
const program = require('./commander').program;

const { shift, input, output, action } = program;
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

function startStdin(){
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', onReadble);

}

function onReadble() {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    const str = caesarCoder(chunk.toString('utf8'), step);
    if (!output) {
      process.stdout.write(str);
    } else {
      const writer = fs.createWriteStream(`./${output}`, { flags: 'a' })
      const transform = new CounterTransform();
      const reader = Readable.from(str);
      reader.pipe(transform).pipe(writer);
      console.log('\x1b[32m successfully added to '+ output +' \x1b[37m')
      startStdin()
    }
  }
}


const p = new Promise((resolve, reject) => {
  if (!input) {
    console.log('\n \x1b[36m Enter string \x1b[37m \n');
    startStdin()
  } else {
    console.log('\n \x1b[32m Successfully '+ action +'d! \x1b[37m \n');
    const writer = output
      ? fs.createWriteStream(`./${output}`, { flags: 'a' })
      : process.stdout;
    const transform = new CounterTransform();
    const reader = fs.createReadStream(`./${input}`, 'utf8');
    reader.pipe(transform).pipe(writer);
  }
});
