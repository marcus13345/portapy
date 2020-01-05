// module.exports = {
// 	download
// };

const request = require('request');
const fs = require('fs');
const os = require('os');
const {execSync} = require('child_process');
const path = require('path');
const copydir = require('copy-dir');
const pyversion = require('./getpythonversions.js');

async function download(ver) {

	let url = "";
	let version = "";

	if (ver === undefined) {
		version = await pyversion.current;
		console.log("Python: " + version.toString() + " Selected");
	} else if (await pyversion.validateVersion(ver)) {
		version = ver;
		console.log("Python: " + version.toString() + " Selected");
	} else {
		console.log("Version of python not available");
	}

	
	if (version !== "") {
		console.log(version);
		pyversion.getDownloadLink(version).then(value => {
			console.log(value);
		});
	}

	// console.log(url);
	
	// let url = await getPythonDownloadLink();
	// let filename = path.parse(url).base;
	// try {
	// 	fs.mkdirSync('Python-Installer');
	// } catch(e) {'';}
	// try {
	// 	fs.mkdirSync('Python');
	// } catch(e) {'';}
	// try {
	// 	fs.mkdirSync('Temp-Python');
	// } catch(e) {'';}
	// try {
	// 	fs.writeFileSync('.installerLocation', filename);
	// } catch(e) {'';}
	// // let installSettings = fs.readFileSync('unattend.xml');

	// let out_file = `Python-Installer/${filename}`

	// await new Promise(resolve => {
	// 	request({
	// 		uri: url,
	// 		encoding: null
	// 	}, function (error, response, body) {
	// 		fs.writeFileSync(out_file, body, {});
	// 		resolve();
	// 	});
	// });

	// console.log('Download Complete!');

	// switch (os.platform())
	// {
	// 	case 'win32': {
	// 		try {
	// 			let installerPath = path.join(__dirname, '..', 'Python-Installer/', filename);
	// 			let tempPath = path.join(__dirname, '..', 'Temp-Python/');
	// 			let targetPath = path.join(__dirname, '..', 'Python/');
	// 			execSync(`${installerPath} /passive DefaultJustForMeTargetDir=${tempPath}`, {
	// 				stdio: "inherit"
	// 			});
				
	// 			console.log("Creating Portable Python Directory");

	// 			copydir.sync(tempPath, targetPath);
	// 			console.log("Portable Directory Created!");

	// 			console.log("Uninstalling Unnecessary Python Files");

	// 			execSync(`${installerPath} /passive /uninstall`, {
	// 				stdio: 'inherit'
	// 			});

	// 			fs.rmdirSync(tempPath);

	// 			console.log("PordaPy Installed!");
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 		break;
	// 	}
	// }
}
download('2.7.14');
