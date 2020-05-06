
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
const multer  = require("multer");




var db;//Db Users
app.set("view engine", "hbs");//установление hbs в качестве движка представлений
hbs.registerPartials(__dirname + "/views/partials");//установка путей partials(ов)
const urlencodedParser = bodyParser.urlencoded({extended: false});//создание парсера
app.use(express.static(path.join(__dirname, 'public')));//подключение css/js и source файлов
app.use(bodyParser.json({limit: '50mb'}));//лимит на объем принимаемых данных
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//лимит на объем принимаемых данных
app.use(multer({dest: "public/uploads"}).single("filedata"));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.send();
    });
});
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
                            response.render(__dirname + "/views/account.hbs");
                        });
                    });
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
                    fs.writeFile(__dirname  + objHtmlLink,"<html>\n<head>\n <script src=\"" + objJsLink  + "?" + Date.now() + "\"></script>" + fileHtml , function(error){//создание html файла
                        if(error) 
                        {
                            console.log("Ошибка при записи файла:" + error);
                            return;
                        }
                    });
                    fs.writeFile(__dirname  + "/public/" + objJsLink,"var VariableId= 3;\n var NumberOfPanels= 0;\n var ElementKol = 0;\n var NumberOfSection= 1;", function(error){//создание js файла
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
                    fs.access(__dirname + "/views/UsersSource/html/TempFile_" + request.body.DeleteProject + ".html", fs.F_OK, (err) => {//проверка - существуют ли временные (тестовые) файлы
                        if (err) {
                          return;
                        }else{
                            fs.unlinkSync(__dirname + "/public/UsersSource/TempFile_" + request.body.DeleteProject + ".js");
                            fs.unlinkSync(__dirname + "/views/UsersSource/html/TempFile_" + request.body.DeleteProject + ".html");
                        }
                    });
                    response.redirect('/account');
                }else if(request.body.message == "LoadProjects"){//если пост запрос с подгрузки новых проектов            
                    let Token = request.cookies['token'];//токен из куков
                    let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
                    db.collection('Users').find({"login" : Login, "token" : Token }).toArray(function (err,docs){//поиск записей в бд с таким же логином и токеном
                        if(err){
                            console.log(err);
                            return;
                        }
                        if(docs.length > 0){//если акаунт найден
                            let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
                            db.collection('Users').find({login: Login},function(err,cursor){//поиск записей пользователей в бд
                                cursor.forEach(function(obj){
                                    db.collection('Projects').find({"id_User": obj._id}).toArray(function(err,projects){
                                        response.send(projects);
                                    });
                                });
                            });

                        }
                    });



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
        response.redirect('/login');
    }else{
        let Token = request.cookies['token'];//токен из куков
        let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
        let Project = request.cookies['Project'];// рандомное имя проекта из куков
        let objHtmlLink = "/views/UsersSource/html/" + 'TempFile_' + Project + ".html";//создание ссылки на html файл
        let objJsLink = "UsersSource/TempFile_" + Project + ".js";
        let fileHtml = fs.readFileSync(__dirname + "/views/testing.hbs", "utf8");
        if(request.body.Content != undefined){//если пост запрос с кнопки сохранения проекта
            fs.writeFile(__dirname  + "/views/UsersSource/html/" + Project + ".html","<html>\n<head>\n" + request.body.Content , function(error){//запись html файла
                if(error) 
                {
                    console.log("Ошибка при записи файла:" + error);
                    response.send({status : 500});
                    return;
                }
            });
            fs.writeFile(__dirname  + "/public/UsersSource/" + Project + ".js","var VariableId=" +  request.body.variableId + ";\n var NumberOfPanels=" +
                request.body.numberOfPanels + ";\n var ElementKol =" + request.body.elementKol + "; \n var NumberOfSection=" + request.body.numberOfSection + ";", function(error){//запись js файла
                if(error) 
                {
                    console.log("Ошибка при записи файла:" + error);
                    response.send({status : 500});
                    return;
                }
            });
            response.send({status : 200});
        }else if(request.body.CodeTest != undefined){//если пост запрос с нажатия кнопки тестирования проекта
            fs.writeFile(__dirname  + "/public/" +  objJsLink ,request.body.CodeTest, function(error){//запись js файла
                if(error) 
                {
                    console.log("Ошибка при записи файла:" + error);
                    return;
                }
            });
            fs.writeFile(__dirname  + objHtmlLink,"<html>\n<head>\n<script src=\"" +  objJsLink  + "\"></script> \n" + fileHtml , function(error){//создание html файла
                if(error) 
                {
                    console.log("Ошибка при записи файла:" + error);
                    return;
                }
            });
            response.redirect('/test');
        }else if(request.body.Code != undefined){//если пост запрос с нажатия кнопки публикации проекта
            fs.writeFile(__dirname  + "/public/" +  objJsLink ,request.body.Code, function(error){//запись js файла
                if(error) 
                {
                    console.log("Ошибка при записи файла:" + error);
                    return;
                }
            });
            response.redirect('/publish');
        }else if(request.file != undefined){//если пост запрос с загрузки файла изображения
            let filedata = request.file;
            response.cookie('FileName',filedata.filename,{maxAge: 90000000});//устанавка куков
            response.sendStatus(200);
        }
    }
});
app.get("/contacts", function(request, response){
    response.render(__dirname +  "/views/contacts.hbs");
});

app.get("/test", function(request, response){
    if(request.cookies['token'] == undefined)//если куков с токеном нет
    {
        response.redirect('/login');
    }else if(request.cookies['Project'] == undefined){//если куков с проектом нет
        response.redirect('/login');
    }else{
        let Token = request.cookies['token'];//токен из куков
        let Login = jwt.verify(Token,secret)['userLogin'];//логин из куков
        let Project = request.cookies['Project'];// рандомное имя проекта из куков
        let objHtmlLink = "/views/UsersSource/html/" + 'TempFile_' + Project + ".html";//создание ссылки на html файл
        response.sendFile(__dirname + objHtmlLink);
    }
});
app.get("/publish", function(request, response){
    if(request.cookies['token'] == undefined)//если куков с токеном нет
    {
        response.redirect('/login');
    }else if(request.cookies['Project'] == undefined){//если куков с проектом нет
        response.redirect('/login');
    }else{
         response.sendFile(__dirname +  "/views/publish.html");
    }
});

app.post("/publish",urlencodedParser,function(request,response){   
    if(request.body.project != undefined){//если вызов произошел с чат бота
        db.collection('Projects').find({randName: request.body.project}).toArray(function (err,docs){//проверка - существует ли проект указанный в теле сообщения
            //console.log(request.body)
            //console.log(request.body.message)
            let i = 0;
            if(docs.length > 0){//если проект существует
                db.collection('Dialogs').find({pr_randName: request.body.project, number_Dialogue : request.body.dialog}).toArray(function (err,dialogs){//проверка - существует ли диалог указанный в теле сообщения
                    if(dialogs.length == 0){//если диалог не существует
                        let Dialog = + Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;//генерация рандомного имени
                        db.collection('Dialogs').insertOne({"pr_randName": request.body.project.toString(), "number_Dialogue" :Number(Dialog), "Date" : request.body.date},function(){//добавление диалога в бд
                            response.send({dialog : Dialog});//отправить сообщение с номером диалога
                        });//запись нового диалога в бд*/
                    }else{
                        db.collection('Dialogs').updateOne({number_Dialogue : request.body.dialog}, {$set: {Date : request.body.date}});//обновление даты последнего сообщения в бд
                        db.collection('Messages').insertOne({pr_randName: request.body.project.toString(), number_Dialogue :Number(request.body.dialog),Message : (request.body.message).toString(), Variables : request.body.variables, Source : request.body.source, Date : request.body.date, Time : request.body.time})//добавление сообщения в бд
                        response.send({dialog :request.body.dialog });//отправить сообщение с номером диалога
                    }
                });    
            }else{//если проект не существует
                response.send({dialog:500});//отправить сообщение об ошибке
            }

        });
    }



});
app.get("/control", function(request, response){
    response.render(__dirname +  "/views/control.hbs");
});

app.post("/control",urlencodedParser,function(request,response){  
    if(request.body.project != undefined && request.body.message == "GetDialogs"){//загрузка диалогов
        db.collection('Dialogs').find({pr_randName: request.body.project}).toArray(function (err,dialogs){//поиск диалогов
            if(dialogs.length == 0){//если диалог не существует
                response.send({dialogs : "NoDialogue"});//отправить сообщение
            }else{
                if(dialogs.length > 21){//если записей больше чем 20
                    let dialogsLimited = new Array();
                    for(let i = 0; i < 20; i++){
                        dialogsLimited.push(dialogs[i]); 
                    }
                    response.send({objects : dialogsLimited, count : dialogsLimited.length});
                }else{//если записей меньше 20
                    response.send(dialogs);//отправить сообщение со всеми диалогами
                }
            }           
        });  
    }else if(request.body.project != undefined && request.body.message == "RemoveDialog" &&  request.body.dialog != undefined){//удаление диалога
            db.collection('Dialogs').findOneAndDelete({"pr_randName": request.body.project.toString(), "number_Dialogue" : Number(request.body.dialog)}, function(err,result){
                if(err){
                    response.send({dialog : 'error'});
                    return;
                }
                db.collection('Messages').deleteMany({"pr_randName": request.body.project.toString(), "number_Dialogue" : Number(request.body.dialog)}, function(err,result){
                    response.send({dialog : "ok"});
                });
                
            });

    }else if(request.body.project != undefined && request.body.message == "LoadOneDialog" && request.body.count != undefined){//подгрузка одного сообщения
        db.collection('Dialogs').find({pr_randName: request.body.project}).toArray(function (err,dialogs){//поиск диалогов
            if(dialogs.length == 0){//если диалог не существует
                response.send({count : 0});//отправить сообщение что больше нет сообщений
            }else if(Number(request.body.count) + 1 < dialogs.length){//если диалог еще есть
                    response.send({objects : dialogs[request.body.count + 1], count : 1});//отправить диалог
            }else{
                response.send({count : 0});//отправить сообщение что больше нет сообщений
            }          
        });  
    }else if(request.body.project != undefined && request.body.message == "LoadMoreDialogs" &&request.body.count != undefined){//подгрузка множества диалогов
        db.collection('Dialogs').find({pr_randName: request.body.project}).toArray(function (err,dialogs){//поиск диалогов
            if(dialogs.length == 0){//если диалог не существует
                response.send({count : 0});//отправить сообщение что больше нет сообщений
            }else if(Number(request.body.count) + 15 < dialogs.length){//если еще есть 15 диалогов
                let MoreDialogs = new Array();
                for(let i = Number(request.body.count) + 1; i < Number(request.body.count) + 15; i++){
                    MoreDialogs.push(dialogs[i]);
                    if(i + 1 == Number(request.body.count) + 15){//если текущая итерация последняя
                        response.send({objects : MoreDialogs, count : i, length : dialogs.length});//отправить диалог
                    }
                }
            }else if(Number(request.body.count) + 1 < dialogs.length){//если есть еще хотя бы 1 диалог
                let MoreDialogs = new Array();
                for(let i = Number(request.body.count) + 1; i < dialogs.length; i++){
                    MoreDialogs.push(dialogs[i]);
                    if(i + 1 == dialogs.length ){//если текущая итерация последняя
                        response.send({objects : MoreDialogs, count : i, length : dialogs.length});//отправить диалог
                    }
                }
            }     
        });  
    }else if(request.body.dialog != undefined && request.body.message == "LoadMessage"){//загрузка диалогов
        db.collection('Messages').find({"number_Dialogue" : Number(request.body.dialog)}).toArray(function (err,dialogs){//поиск диалогов
            if(dialogs.length == 0){//если диалог не существует
                response.send({count : 0});//отправить сообщение что больше нет сообщений
            }else{//если есть записи
                response.send(dialogs);
            }    
        });  
    }



});
app.post("")
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
