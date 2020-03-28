const { Readable } = require('stream');
const { output } = require('./commander').program;
const { Transformer } = require('./Transformer')
const { caesarCoder } = require('./caesarCoder');
const process = require('process');
const fs = require('fs');


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
      const writer = fs.createWriteStream(`./${output}`, { flags: 'a' })
      const transform = new Transformer(step);
      const reader = Readable.from(str);
      reader.pipe(transform).pipe(writer);
      console.log('\x1b[32m successfully added to '+ output +' \x1b[37m')
      startStdin()
    }
  }
}

module.exports.startStdin = startStdin;