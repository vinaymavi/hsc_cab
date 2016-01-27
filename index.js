/**
 * Created by e01039 on 1/27/2016.
 */
var spawn = require("child_process").spawn;
var fs = require("fs")
var whoami = spawn("whoami");
whoami.stdout.on("data", function (data) {
    console.log(data.toString());
    fs.appendFile("log.txt", data, function (err) {
        console.log(err);
    }, function (msg) {
        console.log(msg);
    });
});
whoami.stderr.on("data", function (data) {
    console.log(data.toString());
});