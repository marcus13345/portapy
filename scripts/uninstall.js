const path = require('path');
const fs = require('fs');

let installerFilename = fs.readFileSync('.installerLocation').toString();

let pythonInstallerPath = path.resolve(__dirname, 'Python-Installer', installerFilename);

// let pythonPath = path.resolve(__dirname, 'Python');

// fs.rmdirSync(pythonPath);


// require('child_process').execSync(`${pythonInstallerPath} /passive /uninstall`, {
// 	stdio: 'inherit'
// });