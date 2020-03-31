const process = require('process');
const fs = require('fs');
const { Readable } = require('stream');
const { output } = require('./commander').program;
const { Transformer } = require('./Transformer')
const { caesarCoder } = require('./caesarCoder');
const { writer } = require('./writer')

function startStdin(step){
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => { onReadble(step)} );
}

function onReadble(step) {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    const str = caesarCoder(chunk.toString('utf8'), step);
    if (!output) {
      process.stdout.write(str);
    } else {
      const myWriter = writer(output, 'successfully added to '+ output)
      const transform = new Transformer(step);
      const myReader = Readable.from(str);
      myReader.pipe(transform).pipe(myWriter);
      startStdin()
    }
  }
}

module.exports.startStdin = startStdin;