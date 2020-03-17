const http = require("http");
const fs = require("fs");
  
http.createServer(function(request, response){
      
    console.log(`Запрошенный адрес: ${request.url.substr(1)}`);//вывод адреса в консоль
    const filePath = '../' + request.url.substr(1);//Запоминаем полный путь
    fs.access(filePath, fs.constants.R_OK, err => {//проверка доступности для чтения (путь к файлу, опция относительно которой проверяется(в данном случае проверка прав на чтение из файла), объект ошибки)
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);//создание потока для чтения
        }
      });
}).listen(3000, function(){
    console.log("Server started at 3000");
});