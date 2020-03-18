const express = require("../Expressapp/node_modules/express");
const app = express();
let path = require('path');

app.use(express.static(path.join(__dirname, 'public')));//подключение css/js и source файлов
app.get("/main", function(request, response){
    response.sendFile(__dirname + "/views/index.html");
});
app.get("/constructor", function(request, response){
    response.sendFile(__dirname + "/views/constructor.html");
});
app.get("/contacts", function(request, response){
    response.sendFile(__dirname +  "/views/contacts.html");
});
app.get("/login", function(request, response){
    //let Path = __dirname.substr(0, __dirname.length - 6);
    response.sendFile(__dirname + "/views/LoginForm.html");
});

app.listen(3000);
