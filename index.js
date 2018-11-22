#!/usr/bin/env node

const minimist = require('minimist');
console.log(minimist(process.args));

let args = process.argv.slice(2);

if (args[0] == 'help' || args[0] == '?' || args[0] == 'h'){
	console.log("heres some help");
} else if(args[0] == "version" || args[0] == "v") {
	console.log("version number placeholder");
} else if (args[0] == "py" || args[0] == "pyversion") {
	if (args[1]){
		console.log(args[1]);
	} else {
		console.log("version of python");
	}
}