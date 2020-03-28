const fs = require('fs');

function reader(input) {
	const r = fs.createReadStream(input, 'utf8');
	r.on('error', (err) => {
	  console.error('\x1b[31m Oops! Itput file "'+input+'" isn\'t reachable')
	  console.log('\x1b[37m\n \\ ◔̯◔ /')
	  console.error('\x1b[37m'+ err)
	  console.log('\x1b[36m You can try path "input.txt" fom folder you are working')
	  console.log('\x1b[37m\n ༼◕‿◕༽ﾉ')
	})
	return r
}

module.exports.reader = reader;