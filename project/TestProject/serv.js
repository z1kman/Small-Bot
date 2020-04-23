
let path = __dirname.substr(0,__dirname.indexOf('TestProject'));
const express = require(path  + "/Expressapp/node_modules/express");
const app = express();
app.use(express.static(__dirname + "/public"));

app.get("/main", function(request, response){
    console.log("fewfwe");
        response.sendFile(__dirname + "/TestProject.html");

});
app.listen(5000);