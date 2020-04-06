
const bodyParser = require('body-parser');
const express = require("../Expressapp/node_modules/express");
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const hbs = require("hbs");
const jwt = require('jsonwebtoken')
const app = express();
const secret = 'z1kman';
const cookieParser = require('cookie-parser');



var db;//Db Users
app.set("view engine", "hbs");//установление hbs в качестве движка представлений
hbs.registerPartials(__dirname + "/views/partials");//установка путей partials(ов)
const urlencodedParser = bodyParser.urlencoded({extended: false});//создание парсера
app.use(express.static(path.join(__dirname, 'public')));//подключение css/js и source файлов
app.use(bodyParser.json({limit: '50mb'}));//лимит на объем принимаемых данных
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//лимит на объем принимаемых данных
app.use(cookieParser());

function createToken(email){
    let Rand = Math.floor(Math.random() * (999- 100) + 100);//генерация рандомного числа
    var token = jwt.sign({userLogin: email, rand: Rand}, secret);//генерация токена
    return token;
}
function createRandomName(){
    let Rand = Math.floor(Math.random() * (9999999999- 1000000000) + 1000000000);//генерация рандомного числа
    return(Rand);
}

app.get("/account", function(request, response){
    if(request.cookies['token'] == undefined)//если куков нет
    {
        response.redirect('/login');
    }
    else{//если кукие есть
        let Token = request.cookies['token'];//токен из куков
        let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
        db.collection('Users').find({"login" : Login, "token" : Token }).toArray(function (err,docs){//поиск записей в бд с таким же логином и токеном
            if(err){
                console.log(err);
                return;
            }
            if(docs.length > 0){//если акаунт найден
                let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
                db.collection('Users').find({login: Login},function(err,cursor){
                    cursor.forEach(function(obj){
                        let ProjectString = "";
                        db.collection('Projects').find({"id_User": obj._id},function(err,projects){
                            projects.forEach(function(objPr){//массив всех проектов пользователя
                                ProjectString += "<form class=\"FormProject\"><div class=\"DivProject\">" + objPr.name + "</div><div class=\"BtnProject\"><input type=\"button\" class=\"OpenProject\" value=\"Открыть\" name=\""+ objPr.randName + "\" onclick=\"OpenProject(name)\">" +
                                "<input type=\"button\" class=\"DeleteProject\" value=\"Удалить\" name=\""+ objPr.randName + "\" onclick=\"DeleteProject(name)\"></div></form>";
                            });
                            response.render(__dirname + "/views/account.hbs");
                            hbs.registerHelper("Project", function(){
                                return new hbs.SafeString(ProjectString);
                            });
                        });//поиск проектов пользователя
                    });//получение id пользователя который открывает проект
                });
            }else{//если ни один аккаунт не найден
                response.render(__dirname + "/views/LoginForm.hbs",{//рендерит страницу с логином и сообщает о ошибке
                    Error: "Необходимо войти в аккаунт"
                });
            }
        });
    }
});
app.post("/account",urlencodedParser,function(request,response){
    if(request.cookies['token'] == undefined)//если куков нет
    {
        response.redirect('/login');
    }else{
        let Token = request.cookies['token'];//токен из куков
        let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
        let RandName = createRandomName();//рандомное имя
        db.collection('Users').find({"login" : Login, "token" : Token }).toArray(function (err,docs){//поиск записей в бд с таким же логином и токеном
            if(err){
                console.log(err);
                return;
            }
            if(docs.length > 0){//если акаунт найден
                if(request.body.NameProject != undefined){//если пост запрос от создания нового аккаунта
                    let objHtmlLink = "/views/UsersSource/html/" + RandName + ".html";//создание ссылки на html файл
                    let objJsLink = "UsersSource/" + RandName + ".js";//создание ссылки на js файл
                    let fileHtml = fs.readFileSync(__dirname + "/views/constructor.html", "utf8");
                    let cursor= db.collection('Users').find({login: Login});//получение id пользователя который создает новый проект
                    cursor.forEach(function(obj){
                        db.collection('Projects').insertOne({"id_User": obj._id, "name" : request.body.NameProject, "Obj_html" : objHtmlLink, "Obj_js": objJsLink, 'randName': RandName.toString()});//запись нового проекта в бд
                    })
                    fs.writeFile(__dirname  + objHtmlLink,"<html>\n<head>\n<meta charset = \"utf-8\"> \n <script src=\"" + objJsLink + "\"></script>" + fileHtml , function(error){//создание html файла
                        if(error) 
                        {
                            console.log("Ошибка при записи файла:" + error);
                            return;
                        }
                    });
                    fs.writeFile(__dirname  + "/public/" + objJsLink,"var VariableId= 3;\n var NumberOfPanels= 1;\n var ElementKol = 1;\n var NumberOfSection= 1;", function(error){//создание js файла
                        if(error) 
                        {
                            console.log("Ошибка при записи файла:" + error);
                            return;
                        }
                    });
                    response.cookie('Project',RandName,{maxAge: 90000000});//устанавка куков
                    response.redirect('/constructor');
                }else if(request.body.DeleteProject != undefined)//если пост запрос от удаления проекта
                {
                    db.collection('Projects').deleteOne({'randName' : request.body.DeleteProject});
                    fs.unlinkSync(__dirname + "/public/UsersSource/" + request.body.DeleteProject + ".js");
                    fs.unlinkSync(__dirname + "/views/UsersSource/html/" + request.body.DeleteProject + ".html");
                    response.redirect('/account');
                }
            }else{//если ни один аккаунт не найден
                response.render(__dirname + "/views/LoginForm.hbs",{//рендерит страницу с логином и сообщает о ошибке
                    Error: "Необходимо войти в аккаунт"
                });
            }
        });
    }
    let data = fs.readFileSync("views/constructor.html","utf-8");
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
            let Token = createToken(request.body.email);
            response.cookie('token',Token,{maxAge: 90000000});//устанавливаются куки
            db.collection('Users').updateOne({login : request.body.email}, {$set: {token : Token}});
            response.redirect("/account");
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
            let Token = createToken(request.body.email);//генерация токена
            response.cookie('token',Token,{maxAge: 90000000});//устанавка куков
            db.collection('Users').insertOne({"name": request.body.NameUser, "login" : request.body.email, "password" : request.body.password, "token": Token});//запись нового пользователя в бд
            response.redirect('/account');//переадрессация на страницу аккаунта
        }else{//если аккаунт уже существует
            response.render(__dirname + "/views/Registration.hbs",{
                Error: "Аккаунт с таким email уже существует"
            });
        }
    })
});
app.get("/main", function(request, response){
    response.render(__dirname + "/views/index.hbs");
});


app.get("/constructor", function(request, response){
    if(request.cookies['token'] == undefined)//если куков с токеном нет
    {
        response.redirect('/login');
    }else if(request.cookies['Project'] == undefined){//если куков с проектом нет
        response.redirect('/account');
    }else{//если все куки присутствуют
        let Token = request.cookies['token'];//токен из куков
        let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
        let Project = request.cookies['Project'];// рандомное имя проекта из куков
        db.collection('Users').find({"login" : Login, "token" : Token }).toArray(function (err,docs){//проверка на сессию аккаунта
            if(err){
                console.log(err);
                return;
            }
            if(docs.length > 0){//если сессия существует
                let cursor= db.collection('Users').find({login: Login});//получение id пользователя который открывает проект
                cursor.forEach(function(obj){
                    db.collection('Projects').find({"id_User": obj._id, "randName": Project}).toArray(function (err,projects){//проверка прав пользователя на открытие проекта
                        if(err){
                            console.log(err);
                            return;
                        }
                        if(projects.length > 0){//если права есть
                            response.sendFile(__dirname  + "/views/UsersSource/html/" + request.cookies['Project'] + ".html");//открыть проект
                        }else{
                            response.redirect("/account");//перенаправить на страницу личного кабинета
                        }
                    });
                })
            }else{//если ни один аккаунт не найден
                response.render(__dirname + "/views/LoginForm.hbs",{//рендерит страницу с логином и сообщает о ошибке
                    Error: "Необходимо войти в аккаунт"
                });
            }
        });
    }
});
app.post("/constructor", urlencodedParser, function(request, response){
    if(request.cookies['token'] == undefined)//если куков с токеном нет
    {
        response.redirect('/login');
    }else if(request.cookies['Project'] == undefined){//если куков с проектом нет
        response.redirect('/account');
    }else{
        let Token = request.cookies['token'];//токен из куков
        let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
        let Project = request.cookies['Project'];// рандомное имя проекта из куков
        fs.writeFile(__dirname  + "/views/UsersSource/html/" + Project + ".html","<html>\n<head>\n<meta charset = \"utf-8\">\n" + request.body.Content , function(error){//запись html файла
            if(error) 
            {
                console.log("Ошибка при записи файла:" + error);
                return;
            }
        });
        fs.writeFile(__dirname  + "/public/UsersSource/" + Project + ".js","var VariableId=" +  request.body.VariableId + ";\n var NumberOfPanels=" +
            request.body.NumberOfPanels + ";\n var ElementKol =" + request.body.ElementKol + "; \n var NumberOfSection=" + request.body.NumberOfSection + ";", function(error){//запись js файла
            if(error) 
            {
                console.log("Ошибка при записи файла:" + error);
                return;
            }
        });
        response.redirect('/constructor');
    }
});
app.get("/contacts", function(request, response){
    response.render(__dirname +  "/views/contacts.hbs");
});
app.get("/test", function(request, response){
    response.render(__dirname +  "/views/testing.hbs");
});
app.post("/test",urlencodedParser,function(request,response){
    console.log(request.body.message);//получение сообщения
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