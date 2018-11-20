// pip install --target=lib numpy six pypng pyplatec
let {execSync} = require('child_process');

let pythonDownloader = require('../util/downloadpython.js')


pythonDownloader.download();
// execSync('"Python/Scripts/pip.exe" install --target=worldengine/lib numpy six pypng pyplatec', {
// 	stdio: 'inherit'
// });

// execSync('"Python/Scripts/pip.exe" install --target=worldengine/lib numpy six pypng pyplatec', {
// 	stdio: 'inherit'
// });