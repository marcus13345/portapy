const path = require('path');
const fs = require('fs');

let installerFilename = fs.readFileSync('.installerLocation').toString();

let pythonPath = path.resolve(__dirname, 'Python-Installer', installerFilename);

require('child_process').execSync(`${pythonPath} /passive /uninstall`, {
	stdio: 'inherit'
});