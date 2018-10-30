let request = require('request');
let fs = require('fs');
let os = require('os');
let {execSync} = require('child_process');
let path = require('path');

request({
	uri: "https://www.python.org/downloads/",
}, function (error, response, body) {
	
	let file_name = getPythonDownloadLink();

	fs.mkdirSync('Python-Installer');

	let out_file = fs.createWriteStream(`Python-Installer/${file_name}`);

	
	request({
		uri: current_download,
	}, function (error, response, body) {
		fs.writeFileSync(out_file, body);
	});
	
	console.log('Download Complete!');

	switch (os.platform())
	{
		case 'win32':
			try {
				execSync(`${path.join(__dirname, 'Python-Installer/', file_name)} DefaultJustForMeTargetDir=${path.join(__dirname, '/../', 'Python/')}`, {
					stdio: "inherit"
				});

				console.log("Python Installed!");
			} catch (err) {
				console.log(err);
			}
			break;
	}
	
});


function getPythonDownloadLink() {
	
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
	return file_name = current_download.substring(current_download.indexOf('/', current_download.indexOf('/python/') + 8) + 1);
}