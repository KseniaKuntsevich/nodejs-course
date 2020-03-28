const process = require('process');
const { program } = require('./commander');
const { Transformer } = require('./Transformer')
const { startStdin } = require('./startStdin')
const { writer } = require('./writer')
const { reader } = require('./reader')


const { shift, input, output, action } = program;
const step = action === 'decode' ? +shift * -1 : +shift;

const p = new Promise((resolve, reject) => {
  if (!input) {
    console.log('\n \x1b[36m Enter string \x1b[37m \n');
    startStdin(step)
  } else {
    const myWriter = output
      ? writer(output, '\nSuccessfully '+ action+ 'd!\n')
      : process.stdout;
    const transform = new Transformer(step);
    const myReader = reader(input);
    myReader.pipe(transform).pipe(myWriter);
  }
});
