const express = require("../Expressapp/node_modules/express");
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});//создание парсера
var db;

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
    response.sendFile(__dirname + "/views/LoginForm.html");
});
app.post(("/login"), urlencodedParser, function(request, response){//получение ответа с данными от формы входа
    if(!request.body){
        return response.sendStatus(400);
    }else if(request.email == "" || request.password == ""){
        response.send();
    }
    console.log(request.body);//данные введеные на странице логина
    response.sendFile(__dirname + "/views/LoginForm.html");
});
app.get("/registration", function(request, response){
    response.sendFile(__dirname + "/views/Registration.html");
});
app.post(("/registration"), urlencodedParser, function(request, response){//получение ответа с данными от формы входа
    if(!request.body){
        return response.sendStatus(400);
    }
    console.log(request.body);//данные введеные на странице логина
    response.sendFile(__dirname + "/views/Registration.html");
});

MongoClient.connect('mongodb://localhost:27017/Users',{useUnifiedTopology: true} ,function(err, database){ //подключение к бд, запуск сервера
if(err){
        return console.log(err);
    }
    console.log("База данных запущена");
    db = database; 
    app.listen(3000,function(){
        console.log("Сервер запущен");
    });
})