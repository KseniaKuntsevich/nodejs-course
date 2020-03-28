const fs = require('fs');

function writer(output, successMess) {
	const w = fs.createWriteStream(output, { flags: 'a' });
	w.on('error', (err) => {
	  process.stderr.write('\x1b[31m Oops! Output file "'+output+'" isn\'t reachable \x1b[37m' +
	  	'\n \x1b[37m\n \\ ◔̯◔ /' +
	    '\n \x1b[37m'+ err +
	    '\n \x1b[36m You can try path "super.txt". It will appear in the same folder you are working' +
	    '\n \x1b[37m\n ༼◕‿◕༽ﾉ \n');
	})
	w.on('close', () => {console.log('\x1b[32m'+successMess+'\x1b[37m');})
	return w
}

module.exports.writer = writer;