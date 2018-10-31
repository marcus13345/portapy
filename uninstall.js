const path = require('path');
let pythonPath = path.resolve(__dirname, 'Python-Installer', 'python-3.7.1.exe');

require('child_process').execSync(`${pythonPath} /passive /uninstall`, {
	stdio: 'inherit'
});