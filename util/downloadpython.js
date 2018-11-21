module.exports = {
	download
};

const request = require('request');
const fs = require('fs');
const os = require('os');
const {execSync} = require('child_process');
const path = require('path');
const copydir = require('copy-dir');

async function download() {

		
		let url = await getPythonDownloadLink();
		let filename = path.parse(url).base;
		try {
			fs.mkdirSync('Python-Installer');
		} catch(e) {'';}
		try {
			fs.mkdirSync('Python');
		} catch(e) {'';}
		try {
			fs.mkdirSync('Temp-Python');
		} catch(e) {'';}
		try {
			fs.writeFileSync('.installerLocation', filename);
		} catch(e) {'';}
		// let installSettings = fs.readFileSync('unattend.xml');

		let out_file = `Python-Installer/${filename}`

		await new Promise(resolve => {
			request({
				uri: url,
				encoding: null
			}, function (error, response, body) {
				fs.writeFileSync(out_file, body, {});
				resolve();
			});
		});

		console.log('Download Complete!');

		switch (os.platform())
		{
			case 'win32': {
				try {
					let installerPath = path.join(__dirname, '..', 'Python-Installer/', filename);
					let tempPath = path.join(__dirname, '..', 'Temp-Python/');
					let targetPath = path.join(__dirname, '..', 'Python/');
					execSync(`${installerPath} /passive DefaultJustForMeTargetDir=${tempPath}`, {
						stdio: "inherit"
					});
					
					console.log("Creating Portable Python Directory");

					copydir.sync(tempPath, targetPath);
					console.log("Portable Directory Created!");

					console.log("Uninstalling Unnecessary Python Files");

					execSync(`${installerPath} /passive /uninstall`, {
						stdio: 'inherit'
					});

					fs.rmdirSync(tempPath);

					console.log("PordaPy Installed!");
				} catch (err) {
					console.log(err);
				}
				break;
			}[]
		}
}

function getPythonDownloadLink() {
	return new Promise(resolve => {
		request({
			uri: "https://www.python.org/downloads/",
		}, function (error, response, body) {
			let current_os = '';
			switch (os.platform())
			{
				case 'darwin':
					current_os = "download-os-mac-osx";
					break;
				case 'linux':
					current_os = "download-os-source";
					break;
				case 'win32':
					current_os = "download-os-windows";
					break;
				default:
					current_os = "download-os-source";
					break;
			}
			
			let current_download_start = body.indexOf("href=",body.indexOf(current_os)) + 6;
			let current_download_end = body.indexOf('">', current_download_start);
			let current_download = body.substring(current_download_start, current_download_end);

			let url = current_download;

			resolve(url);
		});
	});
	

}