// module.exports = { THIS IS AT THE BOTTOM SO NO ERROREROS WHILE TESTING
// 	versions
// }
const request = require('request');
const os = require('os');

// let matches = [];

async function validateVersion(v) {
	let availVer = await versions;
	return availVer.includes(v);
}

async function getDownloadLink(v) {

	let extArr = [];

	switch (os.platform())
	{
		case 'darwin':
			// extArr = ['.exe','.msi']
			break;
		case 'linux':
			break;
		case 'win32':
			extArr = ['.exe','.msi']
			break;
		default:
			break;
	}

	let available_download_links = await new Promise(resolve => {
		request({
			uri: "https://www.python.org/ftp/python/" + v.toString() + "/",
		}, function (error, response, body) {
			// const re = /"\n"/g;
			tempArr = body.split(/\r?\n/);
			let availLinks = [];
			tempArr.forEach(function (item) {
				if (item.includes('<a href="py')) {
					let substr_start = item.indexOf('">', 0) + 2;
					let substr_end = item.indexOf('</a>', substr_start);
					let substr = item.substring(substr_start, substr_end);
					availLinks.push(substr);
				}
			})
			// console.log(availLinks);
			resolve(availLinks);
		})
	});

	let py_executable_link = await new Promise(resolve => {
		extArr.forEach(function (item) {
			let filename = "python-" + v.toString() + item.toString();
			if (available_download_links.includes(filename)) {
				resolve(filename);
			}
		})
	})

	return "https://www.python.org/ftp/python/" + v.toString() + "/" + py_executable_link.toString();
}

let versions = new Promise(resolve => {
		request({
			uri: "https://www.python.org/ftp/python/",
		}, function (error, response, body) {
			const re = /"[0-9]{1,}\.[0-9]{1,}(\.[0-9]{1,})*\/"/g;
			matches = body.match(re)
			matches = matches.map((value) => {
				return value.slice(1, -2);
			});

			resolve(matches);
		});
})

let current = new Promise(resolve => {
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
			
			let current_download_start = body.indexOf("Download Python ",body.indexOf(current_os)) + 16;
			let current_download_end = body.indexOf('</a>', current_download_start);
			let current_download = body.substring(current_download_start, current_download_end);

			let ver = current_download;

			resolve(ver);
		});
	});

// current.then(value => {
// 	console.log(value);
// })


// versions.then(value => {

// 	let i = 0;
// 	for (i = 0; i < value.length; i++){
// 		console.log(value[i]);
// 	}
// })


module.exports = {
	versions,
	current,
	validateVersion,
	getDownloadLink
}