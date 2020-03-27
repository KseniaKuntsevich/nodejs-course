const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

program
  .option('-s, --shift <number>', 'nubmber of step to encode')
  .option('-i, --input [type]', 'path to file', null)
  .option('-o, --output [value]', 'path to file', null)
  .option('-a, --action <value>', 'action encode/decode');
program.parse(process.argv);

module.exports.program = program;
