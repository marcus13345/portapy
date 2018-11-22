#!/usr/bin/env node

const path = require('path');
let pythonPath = path.resolve(__dirname, '..', 'Python', 'python.exe');
// const versions = require('./')

let args = process.argv.slice(2);

require('child_process').spawn(pythonPath, args, {stdio: 'inherit'});

