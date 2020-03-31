const { Command } = require('commander');
const program = new Command();
process.stderr.fd
program.version('0.0.1');

let programStatus = true;

program
  .option('-s, --shift [number]', 'Number of step to encode from 1 to 26.', null)
  .option('-i, --input [type]', 'Path to file. Can be missed.', null)
  .option('-o, --output [value]', 'Path to file. Can be missed.', null)
  .option('-a, --action [value]', 'Action encode/decode', null)
  .parse(process.argv);

function optionError(opt, mess, hint) {
	process.stderr.write('error: ' + opt + ' ' + mess +
		'\n\x1b[36mTry: ' + hint +
		'\n\x1b[37m\n ༼◕‿◕༽ﾉ \n');
	programStatus = false
}

if(program.shift === null) { optionError('-s --shift', 'is necessary', '--shift 10') }
else if(program.action === null) { optionError('-a --action', 'is necessary', '--action encode') }
else if(program.shift > 26) { optionError('-s --shift', 'cannot be more than 26', '--shift 10') }
else if(program.shift < 1) { optionError('-s --shift', 'cannot be less than 0', '--shift 1') }
else if(program.action !== 'decode' && program.action !== 'encode') { optionError('-a --action', 'can be only "encode" or "decode"', '--action encode') }

module.exports.program = program;
module.exports.programStatus = programStatus;
