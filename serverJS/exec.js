const exec = require('child_process').exec;

// var process = exec('dir');
var process = exec('cmd /c chcp 65001>nul && dir');

process.stdout.on('data' , function (data) {
    console.log(data.toString('utf8'))
});

//error
process.stderr.on('data' , function (data) {
    console.log(data.toString('utf8'))
});