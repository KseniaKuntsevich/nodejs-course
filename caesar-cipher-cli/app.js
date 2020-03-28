const { Readable } = require('stream');
const fs = require('fs');
const process = require('process');
const { caesarCoder } = require('./caesarCoder');
const { program } = require('./commander');
const { Transformer } = require('./Transformer')
const { startStdin } = require('./startStdin')


const { shift, input, output, action } = program;
const step = action === 'decode' ? +shift * -1 : +shift;


const p = new Promise((resolve, reject) => {
  if (!input) {
    console.log('\n \x1b[36m Enter string \x1b[37m \n');
    startStdin(step)
  } else {
    console.log('\n \x1b[32m Successfully '+ action +'d! \x1b[37m \n');
    const writer = output
      ? fs.createWriteStream(`./${output}`, { flags: 'a' })
      : process.stdout;
    const transform = new Transformer(step);
    const reader = fs.createReadStream(`./${input}`, 'utf8');
    reader.pipe(transform).pipe(writer);
  }
});
