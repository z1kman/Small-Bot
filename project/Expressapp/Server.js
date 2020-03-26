
const bodyParser = require('body-parser');
const express = require("../Expressapp/node_modules/express");
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const hbs = require("hbs");
const app = express();
var db;

app.set("view engine", "hbs");//установление hbs в качестве движка представлений
hbs.registerPartials(__dirname + "/views/partials");//установка путей partials(ов)
const urlencodedParser = bodyParser.urlencoded({extended: false});//создание парсера
app.use(express.static(path.join(__dirname, 'public')));//подключение css/js и source файлов
app.use(bodyParser.json({limit: '50mb'}));//лимит на объем принимаемых данных
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//лимит на объем принимаемых данных

app.get("/main", function(request, response){
    response.render(__dirname + "/views/index.hbs");
});



app.get("/constructor", function(request, response){
    //response.sendFile(__dirname + "/views/constructor.html");
    response.sendFile(__dirname  + "/views/UsersSource/html/constructor.html");
});
app.post("/constructor", urlencodedParser, function(request, response){
    fs.writeFile(__dirname  + "/views/UsersSource/html/constructor.html","<html>\n<head>\n<meta charset = \"utf-8\">\n" + request.body.Content , function(error){
        
        if(error) 
        {
            console.log("Ошибка при записи файла:" + error);
            return;
        }
    });
    fs.writeFile(__dirname  + "/public/UsersSource/var.js","var VariableId=" +  request.body.VariableId + ";\n var NumberOfPanels=" +
        request.body.NumberOfPanels + ";\n ElementKol =" + request.body.ElementKol + "\n NumberOfSection=" + request.body.NumberOfSection + ";", function(error){
        
        if(error) 
        {
            console.log("Ошибка при записи файла:" + error);
            return;
        }
    });
     response.redirect('/constructor');


});



app.get("/contacts", function(request, response){
    response.render(__dirname +  "/views/contacts.hbs");
});
app.get("/login", function(request, response){
    response.render(__dirname + "/views/LoginForm.hbs");
});
app.post(("/login"), urlencodedParser, function(request, response){//получение ответа с данными от формы входа
    if(!request.body){
        return response.sendStatus(400);
    }
    if(request.body.email.replace(/\s+/g, '')  == "" || request.body.password.replace(/\s+/g, '') == ""){
        response.render(__dirname + "/views/LoginForm.hbs",{
            Error: "Заполните все поля"
        });
    }
    db.collection('Users').find({"login" : request.body.email, "password" : request.body.password}).toArray(function (err,docs){//обращение к бд и поиск записей
        if(docs.length == 0){//если нет ни одного аккаунта
            response.render(__dirname + "/views/LoginForm.hbs",{//рендерит страницу с логином и сообщает о ошибке
                Error: "Аккаунт не найден или не существует"
            });
        }else{//если аккаунт был найден
            response.render(__dirname + "/views/LoginForm.hbs");
        }
    });
});
app.get("/registration", function(request, response){
    response.render(__dirname + "/views/Registration.hbs");
});
app.post(("/registration"), urlencodedParser, function(request, response){//получение ответа с данными от формы регистрации
    if(!request.body){
        response.render(__dirname + "/views/Registration.hbs",{
            Error: "Заполните все поля"
        });
        return;
    }
    if(request.body.NameUser.replace(/\s+/g, '') == "" || request.body.email.replace(/\s+/g, '') == "" || request.body.password.replace(/\s+/g, '') == ""){//проверка на пустые поля
        response.render(__dirname + "/views/Registration.hbs",{
            Error: "Заполните все поля"
        });
        return;
    }
    if(request.body.passwordRepeat != request.body.password ){//проверка на не совпадение паролей
        response.render(__dirname + "/views/Registration.hbs",{
            Error: "Пароли не совпадают"
        });
        return;
    }

    db.collection('Users').find({"login" : request.body.email}).toArray(function (err,docs){//Запись в бд. поиск записей в бд с таким же логином
        if(err){
            console.log(err);
            return;
        }
        if(docs.length == 0){//запись в бд
            db.collection('Users').insertOne({"name": request.body.NameUser, "login" : request.body.email, "password" : request.body.password});
            //------------------------------------------остальная логика
        }else{//если аккаунт уже существует
            response.render(__dirname + "/views/Registration.hbs",{
                Error: "Аккаунт с таким email уже существует"
            });
        }
    })
});
app.get("/account", function(request, response){
    response.render(__dirname + "/views/account.hbs");
});
MongoClient.connect('mongodb://localhost:27017/Users',{useUnifiedTopology: true} ,function(err, database){ //подключение к бд, запуск сервера
if(err){
    console.log("Ошибка.База данных не запущена.");
        return console.log(err);
    }
    console.log("База данных запущена");
    db = database.db('Data'); 
    app.listen(3000,function(){
        console.log("Сервер запущен");
    });
})