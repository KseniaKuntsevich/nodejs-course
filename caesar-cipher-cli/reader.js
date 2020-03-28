const fs = require('fs');

function reader(input) {
	const r = fs.createReadStream(input, 'utf8');
	r.on('error', (err) => {
	  process.stderr.write('\x1b[31m Oops! Itput file "'+input+'" isn\'t reachable' +
	  	'\n \x1b[37m\n \\ ◔̯◔ /' +
	    '\n \x1b[37m'+ err +
	    '\n \x1b[36m  You can try path "input.txt" fom folder you are working' +
	    '\n \x1b[37m\n ༼◕‿◕༽ﾉ \n');
	})
	return r
}

module.exports.reader = reader;