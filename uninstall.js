const path = require('path');
let pythonPath = path.resolve(__dirname, 'Python', 'python.exe');

require('child_process').exec(`${pythonPath} /passive /uninstall`);

