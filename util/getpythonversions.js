module.exports = {
	versions
}
const request = require('request');

function versions()
{
	return new Promise(resolve => {
		request({
			uri: "https://www.python.org/ftp/python/",
		}, function (error, response, body) {
			const re = /"[0-9]{1,}\.[0-9]{1,}(\.[0-9]{1,})*\/"/g;
			let matches = body.match(re)
			matches = matches.map((value) => {
				return value.slice(1,-2)
			});
				resolve(matches);
		});
	})
}