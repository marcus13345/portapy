let request = require('request');
let https = require('https');
let fs = require('fs');
let os = require('os');
let cmd = require('node-command-line');
let path = require('path');
let waitOn = require('wait-on');

request({
    uri: "https://www.python.org/downloads/",

}, function (error, response, body) {
    
    let os_string = os.platform();
    let current_os = '';
    switch (os_string)
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

    // function downlaod_python()
    // {
    //     return new Promise(function (resolve, reject) {
            let file_name = current_download.substring(current_download.indexOf('/', current_download.indexOf('/python/') + 8) + 1);
            // console.log(file_name);
            let out_file = fs.createWriteStream(`../Python-Installer/${file_name}`);
        
            let file_request = https.get(current_download, function (response) {
                response.pipe(out_file);
            });
            // resolve("Python Downloaded");
    //     })
    // }

    // function install_python()
    // {
        // return new Promise(function (resolve, reject)
        // {
            switch (os_string)
            {
                case 'win32':
                    try {
                        cmd.run(`${path.join(__dirname, '/../', 'Python-Installer/', file_name)} /quiet DefaultJustForMeTargetDir=${path.join(__dirname, '/../', 'Python/')}`);
                        resolve("Python Installed");
                    } catch (err) {
                        console.log(err);
                    }
                    break;
            }
    //     })
    // }
    // async function main()
    // {
    //     await downlaod_python();
    //     await install_python();
    //     console.log("Done");
    // }
});
