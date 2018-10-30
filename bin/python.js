#!/usr/bin/env node

const path = require('path');
let pythonPath = path.resolve(__dirname, '..', 'Python', 'python.exe');

console.log(process.argv);

require('child_process').spawn(pythonPath, process.argv.slice(1), {stdio: 'inherit'});
