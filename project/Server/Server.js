const express = require("../Expressapp/node_modules/express");
const app = express();
app.get("/", function(request, response){
    let Path = __dirname.substr(0, __dirname.length - 6);
    response.sendFile(Path + "index.html");
});
app.use("/", express.static("../"));

app.get("/main", function(request, response){
    let Path = __dirname.substr(0, __dirname.length - 6);
    response.sendFile(Path + "index.html");
});
app.use("/main", express.static("../"));

app.get("/constructor", function(request, response){
    let Path = __dirname.substr(0, __dirname.length - 6);
    response.sendFile(Path + "Constructor/constructor.html");
});
app.use("/constructor", express.static("../"));

app.get("/contacts", function(request, response){
    let Path = __dirname.substr(0, __dirname.length - 6);
    response.sendFile(Path + "Contacts/contacts.html");
});
app.use("/contacts", express.static("../"));

app.get("/login", function(request, response){
    let Path = __dirname.substr(0, __dirname.length - 6);
    response.sendFile(Path + "LoginForm/LoginForm.html");
});
app.use("/login", express.static("../"));
app.listen(3000);
