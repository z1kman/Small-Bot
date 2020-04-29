let timerId = "";//для очищения таймера
function PublishProject(id){
    let Code = "";
    if(document.getElementById("DivErrorProject") != undefined){//если панель с ошибкой присутствует на форме, тогда удалить ее
        document.getElementById("DivErrorProject").remove();
    }
    clearTimeout(timerId);
    Code = GenerateCode(id);
    if(Code.split(' ')[0] == "error"){//если возникла какая то ошибка
        Code = Code.substr((Code.split(' ')[0]).length + 1, Code.length);
        let DivErrorProject = document.createElement('div');
        let ErrorProject = document.createElement('div');
        DivErrorProject.className = "DivErrorProject";
        DivErrorProject.id = "DivErrorProject";
        ErrorProject.className = "ErrorProject";
        ErrorProject.innerText = Code;
        DivErrorProject.setAttribute('title','нажмите чтобы закрыть');
        DivErrorProject.setAttribute('onclick',"this.remove()");
        document.body.prepend(DivErrorProject);
        DivErrorProject.append(ErrorProject);
        timerId = setTimeout(function(){
            if(document.getElementById("DivErrorProject") != undefined){//если панель с ошибкой присутствует на форме, тогда удалить ее
                document.getElementById("DivErrorProject").remove();
            }
        },10000);
        return 0;
    }
    SaveProject();
    let form = document.createElement('form');
    form.method = 'POST';
    form.setAttribute('hidden','hidden');
    document.body.append(form);
    form.innerHTML = "<textarea name=\"Code\">" + Code + "</textarea>";
    form.submit();//отправка кода на сервер
    form.innerHTML = "";
}
function SaveProject(){
    let form = document.createElement('form');
    let iframe = document.createElement('iframe');
    if(document.getElementById("DivErrorProject") != undefined){//если панель с ошибкой присутствует на форме, тогда удалить ее
        document.getElementById("DivErrorProject").remove();
    }
    if(document.getElementById('myIFR')!= undefined && document.getElementById('formSub') != undefined){
        document.getElementById('myIFR').remove();
        document.getElementById('formSub').remove();
    }
    iframe.name = 'myIFR';
    iframe.id = 'myIFR';
    iframe.style = 'display: none';
    form.id = "formSub"
    form.method = 'POST';
    form.target = "myIFR";
    form.setAttribute('hidden','hidden');
    form.innerHTML = "<input type=\"hidden\" name=\"VariableId\" value=\"" + VariableId + "\">" + 
    "<input type=\"hidden\" name=\"NumberOfPanels\" value=\"" + NumberOfPanels + "\">" + 
    "<input type=\"hidden\" name=\"ElementKol\" value=\"" + ElementKol + "\">" + 
    "<input type=\"hidden\" name=\"NumberOfSection\" value=\"" + NumberOfSection + "\">"+
    "<textarea name=\"Content\" value=\"" + document.head.innerHTML + "</head><body onload=\"RefreshArrows()\">" + document.body.innerHTML;
    document.body.append(iframe);
    document.body.append(form);
    form.submit();//отправка кода на сервер
    form.innerHTML = "";
}
function TestProject(id){ 
    let Code = "";
    if(document.getElementById("DivErrorProject") != undefined){//если панель с ошибкой присутствует на форме, тогда удалить ее
        document.getElementById("DivErrorProject").remove();
    }
    clearTimeout(timerId);
    Code = GenerateCode(id);
    if(Code.split(' ')[0] == "error"){//если возникла какая то ошибка
        Code = Code.substr((Code.split(' ')[0]).length + 1, Code.length);
        let DivErrorProject = document.createElement('div');
        let ErrorProject = document.createElement('div');
        DivErrorProject.className = "DivErrorProject";
        DivErrorProject.id = "DivErrorProject";
        ErrorProject.className = "ErrorProject";
        ErrorProject.innerText = Code;
        DivErrorProject.setAttribute('title','нажмите чтобы закрыть');
        DivErrorProject.setAttribute('onclick',"this.remove()");
        document.body.prepend(DivErrorProject);
        DivErrorProject.append(ErrorProject);
        timerId = setTimeout(function(){
            if(document.getElementById("DivErrorProject") != undefined){//если панель с ошибкой присутствует на форме, тогда удалить ее
                document.getElementById("DivErrorProject").remove();
            }
        },10000);
        return 0;
    }
    SaveProject();
    let form = document.createElement('form');
    form.method = 'POST';
    form.setAttribute('hidden','hidden');
    document.body.append(form);
    form.innerHTML = "<textarea name=\"CodeTest\">" + Code + "</textarea>";
    form.submit();//отправка кода на сервер
    form.innerHTML = "";

}
function GenerateCode(ButtonName){
    let Canvas = document.getElementsByClassName("canvas");//все стрелки на форме
    let Panels = document.getElementsByClassName("Panel");//все панели на форме
    let Variables = document.getElementsByClassName("NameVariable");//объект со всеми переменными проекта
    let StartPanelId = "";//переменная для хранения id стартовой панели
    let ElementId = ""//переменная для хранения id элемента
    let Code = "";//переменная для сохранения сгенерированного кода
    let N = 0;//для разбиения id элемента(первое число)
    let SN = 0;//для разбиения id элемента(второе число)
    let TN = 0;//для разбиения id элемента(третье число)
    let StartExist = false; //флаг для отмечания наличия созданной функции запуска чат-бота
    let FirstUserElement = false;//переменная для отслеживания нахождения первого элемента у пользователя
    let domain = "http://localhost:3000/publish";//имя сайта (для отображения картинок)

    for(let i = 0; i < Canvas.length; i++ ){//поиск начальной панели
        N = NumberOfElement(Canvas[i].id);
        SN = SecondNumberOfElement(Canvas[i].id);
        TN = ThirdNumberOfElement(Canvas[i].id);
        StartPanelId = "Panel " + N + " " + SN;
        if(document.getElementById(StartPanelId).hasAttribute('data-connect-0') == false)//Проверка на наличие связей у панели
        {
            break;
        }else{//иначе переменная id обнуляется
            StartPanelId = "";
        }    
    } 
    if(StartPanelId == ""){//если id стартовой панели не найдено тогда выдается ошибка
        return("error Ошибка! Стартовая панель не найдена.  \n\n Справка:  \n1) От стартовой панели должна отходить хотя бы одна связь." + 
                "\n 2) К стартовой панели не могут быть присоединены другие панели");
    }

    //Обнуление переменных для дальнейшего использования 
    N = 0;
    SN = 0;
    TN = 0;

    for(let i = 0; i < Variables.length; i++){//генерирование переменных и проверка на синтаксическую правильность
        Code += "\n var " + Variables[i].innerHTML.replace(/\s+/g,'') + "= \"\" ;";
        let Variable = Variables[i].innerHTML.replace(/\s+/g,'');
        for(let e = 0; e < Variable.length; e++){
            if((Variable[0] > 'A' && Variable[0] < 'Z') || (Variable[0] > 'a' && Variable[0] < 'z')){
                continue;
            }else if((e > 0) && ((Variable[0] > 'A' && Variable[0] < 'Z') || (Variable[0] > 'a' && Variable[0] < 'z') || (Variable[e] > '0' || Variable[e] < '9'))){
                continue;
            }else{
                return ("error Ошибка! Переменная с именем:\"" + Variable + "\", не удовлетворяет правилам создания переменной.\n\n" +
                        "Справка:\n 1) Переменная может начинаться только с букв латинского алфавита; \n" + 
                        "2) Переменная может содержать только латинские буквы и арабские цифры;");
            }
        }
    }
    Code += "\n var DialogueStarted = 0;" +
            "\n var MessageBeforeDialogue = new Array();" +
            "\nlet Dialog = + Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;";

    for(let i = 0; i < Panels.length; i++){//Цикл по всем панелям
        for (let j = 0; j < Panels[i].childNodes.length; j++) {//Цикл по всем дочерним элементам панелей
            if(document.getElementById(Panels[i].childNodes[j].id).className == 'Bot'){//если обнаружен блок действий бота;
               for(let k = 0; k < Panels[i].childNodes[j].childNodes.length; k++){//Цикл по всем элементам блока действий чат бота
                    if(Panels[i].childNodes[j].childNodes[k] != undefined)//проверка на не пустой элемент
                    {
                        //------------------------------Генерация функций для вывода сообщений бота--------------------------------------------
                        //------------------------------Генерация функций для вывода сообщений бота--------------------------------------------
                        //------------------------------Генерация функций для вывода сообщений бота--------------------------------------------

                        if(Panels[i].childNodes[j].childNodes[k].className == "TextBot" || Panels[i].childNodes[j].childNodes[k].className == "ImgBot" )//если найден текстовый элемент или изображение
                        {
                            ElementId = Panels[i].childNodes[j].childNodes[k].id;//получение id элемента
                            N = NumberOfElement(ElementId);//получение первого числа id элемента
                            SN = SecondNumberOfElement(ElementId);//получение второго числа id элемента
                            TN = ThirdNumberOfElement(ElementId);//получение третьего числа id элемента
                            let Text = "";
                            let Img;
                            let User = document.getElementById("User " + N + " " + SN);//блок действий пользователя на этой же панеле
                            if(Panels[i].childNodes[j].childNodes[k].className == "TextBot"){//если текущий элемент - вывод текста у бота
                                ElementId = "textareaTextBot " + N + " " + SN + " " + TN;//сохранение id элемента который содержит в себе текст бота
                                Text = document.getElementById(ElementId).value;
                            }else if(Panels[i].childNodes[j].childNodes[k].className == "ImgBot"){//если текущий элемент - вывод изображения у бота
                                ElementId = "Image " + N + " " + SN + " " + TN;//сохранение id элемента который содержит в себе изображение бота
                                Img = document.getElementById(ElementId)
                            }
                            if(NumberOfElement(StartPanelId) == N && SecondNumberOfElement(StartPanelId) == SN && StartExist == false ) //если текущая панель - начальная панель
                            {
                                StartExist = true;//установления флага в значение - функция старта существует
                                Code +="\nwindow.onload = function(){"+
                                        "\n\t Start(); \n}" +
                                        "\nfunction Start(){"; 
                            }
                            else{//если текущая панель не начальная
                                Code +="\nfunction Act_" + N + "_" + SN  + "_" + TN + "(){";//Создание функции с уникальным номером
                            }
    
                            if(Panels[i].childNodes[j].childNodes[k].className == "TextBot"){//если текущий элемент - вывод текста у бота
                                //Поиск переменных в тексте и проверка переменных на существование
                                Text = CheckVariable(Panels[i].id,Text,Variables);
                                if(Text.split(' ')[0] == "error"){//если переменная не была найдена тогда вернуть ошибку
                                    return Text;
                                }
                                Text = CheckLink(Text); //проверка на ссылки
                            }
                            
                            if(Panels[i].childNodes[j].childNodes[k].className == "TextBot"){//если текущий элемент - вывод текста у бота
                            //Генерирование кода
                            Code += "\n\t let ChatForm = document.getElementById(\"ChatForm\");" +
                                        "\n\t let MessageBot = document.createElement('div');" + 
                                        "\n\t let IncomingMessage = document.createElement('div');" +
                                        "\n\t MessageBot.className = 'MessageBot';" +
                                        "\n\t ChatForm.append(MessageBot);" +
                                        "\n\t IncomingMessage.className = 'IncomingMessage';" +
                                        "\n\t MessageBot.append(IncomingMessage);" +
                                        "\n\t IncomingMessage.innerHTML = \"" + Text + "\";" +  
                                        "\n\t SendBotMessage(\"" + Text +"\");" +  //отправка сообщения на сервер
                                        "\n\t LowerDown();" + //опустить скролл в самый низ(для удобства)
                                        "\n\t DeleteButton();" ;//удалить кнопки если они есть
                            }else if(Panels[i].childNodes[j].childNodes[k].className == "ImgBot"){//если текущий элемент - вывод изображения у бота
                                Code += "\n\t let ChatForm = document.getElementById(\"ChatForm\");" +
                                        "\n\t let MessageBot = document.createElement('div');" + 
                                        "\n\t let IncomingMessage = document.createElement('div');" +
                                        "\n\t MessageBot.className = 'MessageBot';" +
                                        "\n\t ChatForm.append(MessageBot);" +
                                        "\n\t IncomingMessage.className = 'IncomingMessage';" +
                                        "\n\t MessageBot.append(IncomingMessage);" +
                                        "\n\t IncomingMessage.innerHTML = \"<img src='" + Img.src + "' class='ImageBot' id = '" + ElementId +"' onclick = 'ClickImage(id)' width = '200px'>\"" +  
                                        "\n\t SendBotMessage(\" Вывод изобржаения:" + Img.src + "\");" +  //отправка сообщения на сервер
                                        "\n\t DeleteButton();" +//удалить кнопки если они есть
                                        "\n\t LowerDown();" ; //опустить скролл в самый низ(для удобства)
                            }
                            if(Panels[i].childNodes[j].childNodes[k + 1].className == "TextBot" || Panels[i].childNodes[j].childNodes[k + 1].className == "ImgBot"  ){//если существует еще одно действие вывода текста у бота или изображения на текущей панели
                                let NextStepId = "";//переменная для обращения к следующей функции вывода сообщения(при условии что у бота есть более чем одно дейстие вывода текста)
                                NextStepId = Panels[i].childNodes[j].childNodes[k + 1].id;
                                Code += "\n\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();";
                            }else if(k + 2 ==  Panels[i].childNodes[j].childNodes.length){//если текущая итерация последнияя в цикле по элементам бота
                                let ButtonContains = false;
                                for(let f = 0; f < User.childNodes.length; f++){//цикл по всем элементам пользователя в данной панели для нахождения кнопок
                                    if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                                        if(User.childNodes[f].className == "DivUserButton"){//если найдена кнопка
                                            let NextStepId = User.childNodes[f].id;;//переменная для обращения к следующей функции
                                            Code += "\n\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();"; 
                                            //Вызов следующей функции которая создает кнопку(и) 
                                            ButtonContains = true;
                                            break;
                                        }
                                    }
                                }
                                for(let f = 0; f < User.childNodes.length; f++){//цикл по всем элементам пользователя в данной панели для нахождения других элементов
                                    if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                                        if(User.childNodes[f].className == "DivUserElement"){//если следующий элемент - текст/число/емеил
                                            let NextStepId = User.childNodes[f].id;;//переменная для обращения к следующей функции
                                            Code += "\n\t let SendMessage = document.getElementById('SendMessage')" + 
                                                    "\n\t SendMessage.setAttribute('onclick','Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "(); InputMessage.value = \"\" ; ')";
                                            break; 
                                        }else if(f + 1 >= User.childNodes.length && ButtonContains == false){//если текущий элемент последний и кнопок не было
                                            for(let e = 0; e < Panels[i].childNodes.length; e++){//запуск цикла по всем элементам текущей панели
                                                if(Panels[i].childNodes[e].className == "DivJumpIndicator"){//поиск джампера находящегося на панели
                                                    let JumpIndicator  = document.getElementById("JumpIndicator " + NumberOfElement(Panels[i].childNodes[e].id) + " " + 
                                                        SecondNumberOfElement(Panels[i].childNodes[e].id) + " " + ThirdNumberOfElement(Panels[i].childNodes[e].id));
                                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//если джампер активен
                                                        let NextStepId = JumpIndicator.id;//переменная для обращения к следующей функции
                                                        Code += "\n\tInputMessage.value = \"\" ; \n\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();"; 
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                            Code += "\n}";//завершение функции
                        }
                    }
               }
            }else if(document.getElementById(Panels[i].childNodes[j].id).className == 'User'){
                for(let k = 0; k < Panels[i].childNodes[j].childNodes.length; k++){//Цикл по всем элементам блоков действий пользователя
                    if(Panels[i].childNodes[j].childNodes[k] != undefined){//проверка на не пустой элемент

                        //------------------------------Генерация функций для вывода кнопок--------------------------------------------
                        //------------------------------Генерация функций для вывода кнопок--------------------------------------------
                        //------------------------------Генерация функций для вывода кнопок--------------------------------------------

                        if(Panels[i].childNodes[j].childNodes[k].className == "DivUserButton"){//Если текущий элемент - кнопка
                            ElementId = Panels[i].childNodes[j].childNodes[k].id;//получение id элемента
                            N = NumberOfElement(ElementId);//получение первого числа id элемента
                            SN = SecondNumberOfElement(ElementId);//получение второго числа id элемента
                            TN = ThirdNumberOfElement(ElementId);//получение третьего числа id элемента
                            ElementId = N + " " + SN + " " + TN;//сохранение id элемента который содержит в себе текст бота
                            let ButtonUser = document.getElementById("ButtonUser " + N + " " + SN + " " + TN);//кнопка действия пользователя на форме конструктора(для получения надписи на кнопке)
                            let JumpIndicator  = document.getElementById("JumpIndicator " + N + " " + SN + " " + TN);//джампер на кнопке 
                            if(NumberOfElement(StartPanelId) == N && SecondNumberOfElement(StartPanelId) == SN && StartExist == false ) //если это начальная панель
                            {
                                StartExist = true;//установления флага в значение - функция старта существует
                                Code +="\nwindow.onload = function(){" + 
                                        "\n\t Start(); \n}" +
                                        "\nfunction Start(){"; 
                            }
                            else{
                                Code +="\nfunction Act_" + N + "_" + SN  + "_" + TN + "(){";//Создание функции с уникальным номером
                            }
                            
                            Code += "\n\t let ChatForm = document.getElementById(\"ChatForm\");" +
                                        "\n\t let ButtonBlock = document.createElement('div');" + 
                                        "\n\t let ButtonOnChat = document.createElement('input');" + 
                                        "\n\t ButtonBlock.className = 'ButtonBlock';" +
                                        "\n\t ChatForm.append(ButtonBlock);" +
                                        "\n\t ButtonOnChat.className = 'ButtonOnChat';" +
                                        "\n\t ButtonOnChat.type = 'button';" +
                                        "\n\t ButtonOnChat.value = '"+  ButtonUser.value  + "';" +
                                        "\n\t ButtonBlock.append(ButtonOnChat);" +
                                        "\n\t LowerDown();" ; //опустить скролл в самый низ(для удобства)
                            if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                //получение панели к которой подключена кнопка
                                let PanelConnect = document.getElementById((document.getElementById("Canvas " + ElementId).getAttribute('data-connect')));
                                let Bot = document.getElementById("Bot " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
                                let User = document.getElementById("User " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
                                let Condition = document.getElementById("Condition " +  NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
                                let BotContainsContent = true;//флаг для проверки наличия элементов у бота
                                if(Bot != null && User != null){
                                    for(let f = 0; f < Bot.childNodes.length; f++){//поиск элементов бота у присоединеной панели
                                        if(Bot.childNodes[f] != undefined){//проверка на не пустой элемент
                                            if(Bot.childNodes[f].className == "TextBot"){//если обнаружен текстовый элемент
                                                let TextBotId = NumberOfElement(Bot.childNodes[f].id) + "_" + SecondNumberOfElement(Bot.childNodes[f].id) + "_" + ThirdNumberOfElement(Bot.childNodes[f].id);
                                                //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                                                Code += "\n\t ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_"+ TextBotId +"();')";
                                                BotContainsContent = true;
                                                break;
                                            }else{
                                                BotContainsContent = false;//если не было найдено ни одного действия бота в присоединеной панели
                                            }
                                        }
                                    }

                                    if(BotContainsContent == false){//если не было найдено ни одного действия бота в присоединеной панели
                                        for(let f = 0; f < User.childNodes.length; f++){//поиск кнопок в действиях пользователя в присоединенной панели
                                            if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                                                if(User.childNodes[f].className == "DivUserButton"){//если обнаружена кнопка
                                                    let ButtonId = NumberOfElement(User.childNodes[f].id) + "_" + SecondNumberOfElement(User.childNodes[f].id) + "_" + ThirdNumberOfElement(User.childNodes[f].id);
                                                    //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                                                    Code += "\n\t ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_"+ ButtonId +"();')";
                                                    break;
                                                }
                                            }
                                            }
                                        for(let f = 0; f < User.childNodes.length; f++){//поиск других действий пользователя в присоединеной панели
                                            if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                                                if(User.childNodes[f].className == "DivUserElement"){//если обнаружен какой либо элемент действия пользователя
                                                    let ID = NumberOfElement(User.childNodes[f].id) + "_" + SecondNumberOfElement(User.childNodes[f].id) + "_" + ThirdNumberOfElement(User.childNodes[f].id);
                                                    //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                                                    Code += "\n\t if(ButtonOnChat.hasAttribute('onclick') != null){" + //Если уже есть событие клика
                                                            "\n\t\t let AttributeContains = ButtonOnChat.getAttribute('onclick')" + //запомнить значение события клика
                                                            "\n\t\t ButtonOnChat.setAttribute('onclick', AttributeContains + 'document.getElementById(\"SendMessage\").setAttribute(\"onclick\",\" GenerateOutMessage(this.value); Act_" + ID + "();\");\');" + //дописать новое значение
                                                            "\n\t }else{" + //если же событие клика еще нет 
                                                            "\n\t\t ButtonOnChat.setAttribute('onclick','document.getElementById(\"SendMessage\").setAttribute(\"onclick\",\"GenerateOutMessage(this.value); Act_" + ID + "(); \");'); \n\t }"; //создание события
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }else if(Condition != null){
                                    for(let f = 0; f < Condition.childNodes.length; f++){//поиск элементов условий у присоединеной панели
                                        if(Condition.childNodes[f] != undefined){//проверка на не пустой элемент
                                            if(Condition.childNodes[f].className == "DivConditionElement"){//если обнаружено условие
                                                let ConditionId = NumberOfElement(Condition.childNodes[f].id) + "_" + SecondNumberOfElement(Condition.childNodes[f].id) + "_" + ThirdNumberOfElement(Condition.childNodes[f].id);
                                                Code += "\n\t ButtonOnChat.setAttribute('onclick','GenerateOutMessage(this.value); SendUserClickOnButton(this.value);Act_"+ ConditionId +"();')";
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            //Если есть еще кнопки - тогда отобразить их в поле чата
                            for(let f = k + 1; f < Panels[i].childNodes[j].childNodes.length; f++){//цикл по всем элементам пользователя в данной панели для нахождения кнопок
                                if(Panels[i].childNodes[j].childNodes[f] != undefined){//проверка на не пустой элемент
                                    if(Panels[i].childNodes[j].childNodes[f].className == "DivUserButton"){//если найдена кнопка
                                        let NextStepId = Panels[i].childNodes[j].childNodes[f].id;;//переменная для обращения к следующей функции
                                        Code += "\n\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();"; 
                                        break;
                                    }
                                }
                            }
                            Code += "\n}";//завершение функции
                        }

                        //------------------------------Генерация функций для действий пользователя--------------------------------------------
                        //------------------------------Генерация функций для действий пользователя--------------------------------------------
                        //------------------------------Генерация функций для действий пользователя--------------------------------------------

                        else if(Panels[i].childNodes[j].childNodes[k].className == "DivUserElement"){//если найден другой элемент(текст/число/email)
                            ElementId = Panels[i].childNodes[j].childNodes[k].id;
                            N = NumberOfElement(ElementId);
                            SN = SecondNumberOfElement(ElementId);
                            TN = ThirdNumberOfElement(ElementId);
                            let User = document.getElementById("User " + N + " " + SN);
                            ElementId = N + " " + SN + " " + TN;
                            let JumpIndicator = document.getElementById("JumpIndicator " + ElementId);//Джампер текущего элемента
                            if(FirstUserElement == false){//если ранее не был задействован ни один элемент действия пользователя
                                FirstUserElement = true;
                                 //При загрузке страницы в кнопку отправки сообщения помещается текущая функция
                                Code += "\ndocument.addEventListener(\"DOMContentLoaded\", () => {" +
                                        "\n\tdocument.getElementById('SendMessage').setAttribute('onclick','InputMessage.value = \"\"; Act_" + N + "_" + SN + "_" + TN + "() InputMessage.value = \"\" ; ');\n});";     
                            }
                            Code += "\nfunction Act_" + N + "_" + SN + "_" + TN + "(){" + //Генерирование имени функции
                                    "\n\t let InputMessage = document.getElementById('InputMessage');"//Поле ввода сообщения на форме
                            if(Panels[i].childNodes[j].childNodes[k].getAttribute('elementtype') == "Text"){//если текущий элемент - текстовый 
                                if(document.getElementById("TagTextUser " + ElementId) != undefined){//если текущий элемент с тегами
                                    let Variable = "";//для запоминания имени переменной
                                    let TagLabel  = document.getElementById("TagLabel " + ElementId);
                                    let Tags = new Array;//для хранения тегов
                                    for(let f = 0; f < TagLabel.childNodes.length; f++){//цикл для нхождения тегов и их сохранения
                                        if(TagLabel.childNodes[f].id != undefined){
                                            Tags.push(TagLabel.childNodes[f]);
                                        }
                                    }
                                    if(Tags.length > 0){
                                        Code += "\n\t if(";
                                        for(let f = 0; f < Tags.length; f++){
                                            Code += "InputMessage.value.toLowerCase().indexOf(\"" + Tags[f].innerHTML.toLowerCase() + "\") + 1 > 0 "
                                            if(f + 1 < Tags.length){
                                                Code += "&& ";
                                            }
                                        }
                                        Code += "){";
                                        if(document.getElementById("UserTextVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                            Variable = document.getElementById("UserTextVariable " + ElementId).value;//запомнить переменную
                                            Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введеный пользователем текст в переменную
                                        } 
                                        if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                            Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                        }
                                    }
                                }else if(document.getElementById("UserTextIdicated " + ElementId) != undefined){//если текущий элемент с указанным текстом
                                    let Text = document.getElementById("UserTextIdicated " + ElementId).value;//Получение указанного текста на странице конструктора
                                    let Variable = "";//для запоминания имени переменной
                                    Code += "\n\t if(InputMessage.value.toLowerCase() == \"" + Text.toLowerCase() + "\"){";//если указаный текст такой же как и введеный пользователем
                                    if(document.getElementById("UserTextVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserTextVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введеный пользователем текст в переменную
                                    } 
                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                        Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                    }
                                }else{//если текущий элемент просто ввод текста
                                    let Variable = "";//для запоминания имени переменной
                                    Code += "\n\t if(InputMessage.value != \"\"){";//если поле ввода не пустое
                                    if(document.getElementById("UserTextVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserTextVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введеный пользователем текст в переменную
                                    } 
                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                        Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                    }
                                }
                            }else if(Panels[i].childNodes[j].childNodes[k].getAttribute('elementtype') == "Number"){//если текущий элемент - числовой
                                if(document.getElementById("RangeNumberUser " + ElementId) != undefined){//если текущий элемент с тегами
                                    let Variable = "";//для запоминания имени переменной
                                    let FirstNumber  = document.getElementById("InputNumberUserOne " + ElementId);
                                    let SecondNumber = document.getElementById("InputNumberUserTwo " + ElementId);
                                    Code += "\n\t if(InputMessage.value >=  " + Number(FirstNumber.value)  + " && InputMessage.value  <= " + Number(SecondNumber.value) +"){";
                                    if(document.getElementById("UserNumberVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserNumberVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введенное пользователем число в переменную
                                    } 
                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                        Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                    }
                                }else if(document.getElementById("UserNumberIdicated " + ElementId) != undefined){//если текущий элемент с указанным числом
                                    let Text = document.getElementById("UserNumberIdicated " + ElementId).value;//Получение указанного числа на странице конструктора
                                    let Variable = "";//для запоминания имени переменной
                                    Code += "\n\t if(InputMessage.value == " + Text + "){";//если указаный текст такой же как и введеный пользователем
                                    if(document.getElementById("UserNumberVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserNumberVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введеный пользователем текст в переменную
                                    } 
                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                        Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                    }
                                }else if(document.getElementById("MaskInputNumberUser " + ElementId) != undefined ){//если текущий элемент просто ввод числа
                                    let Variable = "";//для запоминания имени переменной
                                    let Text = document.getElementById("MaskInputNumberUser " + ElementId).value;//Получение указанной маски на странице конструктора
                                    Code += "\n\t if(InputMessage.value != \"\" && !isNaN(InputMessage.value)){";//если поле ввода не пустое и это число
                                    if(document.getElementById("UserNumberVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserNumberVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введеный пользователем текст в переменную
                                    } 
                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                        Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                    }
                                }
                                else{//если текущий элемент просто ввод числа
                                    let Variable = "";//для запоминания имени переменной
                                    Code += "\n\t if(InputMessage.value != \"\" && !isNaN(InputMessage.value)){";//если поле ввода не пустое и это число
                                    if(document.getElementById("UserNumberVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserNumberVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введеный пользователем текст в переменную
                                    } 
                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                        Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                    }
                                }
                            }else if(Panels[i].childNodes[j].childNodes[k].getAttribute('elementtype') == "Email"){//если текущий элемент - емеил
                                if(document.getElementById("DivUserEmail " + ElementId) != undefined){//если текущий элемент с тегами
                                    let Variable = "";//для запоминания имени переменной
                                    Code += "\n\t if(InputMessage.value.indexOf('@') + 1 > 0 && InputMessage.value.indexOf('.') + 1 > 0 && InputMessage.value.indexOf('@') < InputMessage.value.indexOf('.')){";
                                    if(document.getElementById("UserEmailVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserEmailVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введенное пользователем число в переменную
                                    } 
                                    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                                        Code = CreateConnect(ElementId, Code);//генерация кода для связи
                                    }
                                }
                            
                            }
                            Code += "\n\t }else{"
                            for(let f = k + 1; f < User.childNodes.length; f++){//цикл по всем элементам пользователя в данной панели для нахождения других элементов
                                if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                                    if(User.childNodes[f].className == "DivUserElement"){//если найден еще элемент
                                        let NextStepId = User.childNodes[f].id;//переменная для обращения к следующей функции
                                        Code += "\n\t\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();"; 
                                        //Вызов следующей функции которая создает кнопку(и) 
                                        break;
                                    }else if(f + 1 >= User.childNodes.length){//если текущий элемент последний
                                        for(let e = 0; e < Panels[i].childNodes.length; e++){//запуск цикла по всем элементам текущей панели
                                            if(Panels[i].childNodes[e].className == "DivJumpIndicator"){//поиск джампера находящегося на панеле
                                                let JumpIndicator  = document.getElementById("JumpIndicator " + NumberOfElement(Panels[i].childNodes[e].id) + " " + 
                                                    SecondNumberOfElement(Panels[i].childNodes[e].id) + " " + ThirdNumberOfElement(Panels[i].childNodes[e].id));
                                                if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//если джампер активен
                                                    let NextStepId = JumpIndicator.id;//переменная для обращения к следующей функции
                                                    Code += "\n\t\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();";
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            Code += "\n\t }"
                            Code += "\n}"//конец функции
                        }
                    }
                }
            //-------------------------Генерация функций для условий--------------------------------------------
            //-------------------------Генерация функций для условий--------------------------------------------
            //-------------------------Генерация функций для условий--------------------------------------------
            }else if(document.getElementById(Panels[i].childNodes[j].id).className == "Condition"){//если текущий элемент - блок условий
                for(let k = 0; k < Panels[i].childNodes[j].childNodes.length; k++){//проход по всему блоку с условиями
                    ElementId = Panels[i].childNodes[j].childNodes[k].id;//получение id текущего элемента
                    N = NumberOfElement(ElementId);
                    SN = SecondNumberOfElement(ElementId);
                    TN = ThirdNumberOfElement(ElementId);
                    ElementId = N + " " + SN + " " + TN;
                    let CountBkt = 0;//Кол-во скобок
                    let CountBktFig = 0;//Кол-во скобок
                    if(document.getElementById("DivConditionElement " + ElementId) != undefined){//если текущий элемент с условием
                        let InputConditionPanel = document.getElementById("InputConditionPanel " + ElementId);//строка с условием
                        let Text = InputConditionPanel.value;
                        let JumpIndicator = document.getElementById("JumpIndicator " + ElementId);//Джампер текущего элемента
                        let NamePanel = document.getElementById("NamePanel " + N + " " + SN);//имя текущей панели(для отладки)
                        let Condition = document.getElementById("Condition " + N + " " + SN );//панель с условиями
                        //---генерирование имени функции
                        if(FirstUserElement == false){//если ранее не был задействован ни один элемент действия пользователя
                            FirstUserElement = true;
                            //При загрузке страницы в кнопку отправки сообщения помещается текущая функция
                            Code += "\ndocument.addEventListener(\"DOMContentLoaded\", () => {" +
                                    "\n\tdocument.getElementById('SendMessage').setAttribute('onclick','Act_" + N + "_" + SN + "_" + TN + "() InputMessage.value = \"\" ; ');\n});";     
                        }
                        Code += "\nfunction Act_" + N + "_" + SN + "_" + TN + "(){" + //Генерирование имени функции
                        "\n\t let InputMessage = document.getElementById('InputMessage');" + //Поле ввода сообщения на форме4
                        "\n\t try{\n\t\t"
                        //---проверка синтаксиса условия
                        if(InputConditionPanel.value.indexOf("if") + 1 == 0){//проверка, существует ли слово if
                            Code = "error Ошибка! В условии:\n\"" + InputConditionPanel.value + "\"\nзаданом на панели с именем:" + NamePanel.innerHTML + " , отсутствует ключевое слово \"if\"." +
                            "\n\nСправка: условия записываются следующим образом: if(\"ваше условие\");"; 
                            return Code;
                        }
                        for(let f = 0; f < InputConditionPanel.value.length; f++){//проверка выражения на синтаксис
                            if(InputConditionPanel.value[f] == "\""){//если встретилась двойная ковычка
                                Code = "error Ошибка! В условии:\n\"" + InputConditionPanel.value + "\"\nзаданом на панели с именем:" + NamePanel.innerHTML + " , присутствует знак:' \" '." +
                                        "\n\nСправка: вместо двойных ковычек, при записи условий, необходимо использовать одинарные ковычки;" 
                                return Code;
                            }else if(InputConditionPanel.value[f] == '('){//подсчет кол-ва скобок
                                CountBkt++;  
                            }else if(InputConditionPanel.value[f] == ')'){//подсчет кол-ва скобок
                                CountBkt--;
                            }else if(InputConditionPanel.value[f] == '{'){
                                CountBktFig++;
                            }else if(InputConditionPanel.value[f] == '}'){
                                CountBktFig--;
                            }
                            if(f + 1 >= InputConditionPanel.value.length  && (CountBkt != 0 ||  CountBktFig != 0)){//если текущий элемент последний и кол-во скобок не совпадает друг с другом
                                if(CountBkt > 0){
                                    Code = "error Ошибка! В условии:\n\"" + InputConditionPanel.value + "\"\nзаданом на панели с именем:" + NamePanel.innerHTML + " , недостаточно скобок.";
                                    return Code;
                                }else if(CountBkt < 0){
                                    Code = "error Ошибка! В условии:\n\"" + InputConditionPanel.value + "\"\nзаданом на панели с именем:" + NamePanel.innerHTML + ", присутствуют лишние скобки.";
                                    return Code;
                                }
                                if(CountBktFig > 0){
                                    Code = "error Ошибка! В условии:\n\"" + InputConditionPanel.value + "\"\nзаданом на панели с именем:" + NamePanel.innerHTML + " , недостаточно фигурных скобок.";
                                    return Code;
                                }else if(CountBktFig < 0){
                                    Code = "error Ошибка! В условии:\n\"" + InputConditionPanel.value + "\"\nзаданом на панели с именем:" + NamePanel.innerHTML + ", присутствуют лишние фигурные скобки.";
                                    return Code;
                                }
                            }
                        }
                        if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//Если есть соединение с другой панелью
                            for(let f = Text.length; f > 0; f-- ){//цикл по тексту условия
                                if(Text[f] == '}'){//если найдена фигурная скобка
                                    Text = Text.slice(0,f) + Text.slice(f+1,Text.length);//удаление последней скобки;
                                    break
                                }else if(Text[f] == '{'){
                                    break;
                                }else if(f-1 <= 0){//если ни одной фигурной скобки не обраружено
                                    Text += "{";
                                }
                            }
                            Code += "\n\t\t" + Text;
                            Code = CreateConnect(ElementId, Code);//генерация кода для связи
                            Code += "\n\t\t}"; 
                        }else{
                            Code += Text;
                        }

                        for(let f = Text.length; f > 0; f-- ){//цикл по тексту условия
                            if(Text[f] == '}'){//если найдена фигурная скобка
                                Text = Text.slice(0,f) + Text.slice(f+1,Text.length);//удаление последней скобки;
                                break
                            }else if(Text[f] == '{'){
                                break;
                            }else if(f-1 <= 0){//если ни одной фигурной скобки не обраружено
                                Code += "{}";
                            }
                        }
                        
                        Code += "\n\t\t else{ "
                            for(let f = k + 1; f < Condition.childNodes.length; f++){//цикл по всем элементам пользователя в данной панели для нахождения других элементов
                                if(Condition.childNodes[f] != undefined){//проверка на не пустой элемент
                                    if(Condition.childNodes[f].className == "DivConditionElement"){//если найден еще элемент
                                        let NextStepId = Condition.childNodes[f].id;//переменная для обращения к следующей функции
                                        Code += "\n\t\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();"; 
                                        //Вызов следующей функции которая создает кнопку(и) 
                                        break;
                                    }else if(f + 1 >= Condition.childNodes.length){//если текущий элемент последний
                                        for(let e = 0; e < Panels[i].childNodes.length; e++){//запуск цикла по всем элементам текущей панели
                                            if(Panels[i].childNodes[e].className == "DivJumpIndicator"){//поиск джампера находящегося на панеле
                                                let JumpIndicator  = document.getElementById("JumpIndicator " + NumberOfElement(Panels[i].childNodes[e].id) + " " + 
                                                    SecondNumberOfElement(Panels[i].childNodes[e].id) + " " + ThirdNumberOfElement(Panels[i].childNodes[e].id));
                                                if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//если джампер активен
                                                    let NextStepId = JumpIndicator.id;//переменная для обращения к следующей функции
                                                    Code += "\n\t\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();";
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            Code += "\n\t }\n\t}catch (e) { \n\t alert(\"Ошибка в условии:" + Text + "}\");\n\t}";
                        Code += "\n}"//конец функции
                    }
                } 
            }else if(Panels[i].childNodes[j].className == "DivJumpIndicator"){
                let JumpIndicator  = document.getElementById("JumpIndicator " + NumberOfElement(Panels[i].childNodes[j].id) + " " + 
                SecondNumberOfElement(Panels[i].childNodes[j].id) + " " + ThirdNumberOfElement(Panels[i].childNodes[j].id));
                if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//если джампер активен
                    ElementId = NumberOfElement(JumpIndicator.id) + " " + SecondNumberOfElement(JumpIndicator.id) + " " + ThirdNumberOfElement(JumpIndicator.id);
                    Code += "\n function Act_" + NumberOfElement(JumpIndicator.id) + "_" + SecondNumberOfElement(JumpIndicator.id) + "_" + ThirdNumberOfElement(JumpIndicator.id) + "(){"
                    if(document.getElementById("Condition " + NumberOfElement(Panels[i].childNodes[j].id) + " " + SecondNumberOfElement(Panels[i].childNodes[j].id))){//если текущая панель с условием
                        Code =  CreateConnect(ElementId, Code);
                    }else{
                        /*Code += "\n\t let SendMessage = document.getElementById('SendMessage');" + 
                                "\n\t SendMessage.setAttribute('onclick',\'";
                        Code =  CreateConnect2(ElementId, Code) + " SendMessage.removeAttribute(\"onclick\")\');";*/
                        Code =  CreateConnect(ElementId, Code);
                    }
                    Code += "\n }"//конец функции
                }
            }
        }
    }
    //код для удаления кнопок после нажатия
    Code += "\n function DeleteButton(){" +
        "\n\t let Buttons = document.getElementsByClassName(\"ButtonBlock\");" +
        "\n\t let btn = new Array();" +
        "\n\t for(let i = 0; i < Buttons.length; i++){" +
        "\n\t\t btn.push(Buttons[i]);" +
        "\n\t }" +
        "\n\t for(let i = 0; i < btn.length; i++){" +
        "\n\t\t btn[i].remove();" +
        "\n\t}\n}";
    //код для генерации исходящих сообщений
    Code += "\n function GenerateOutMessage(Message){" + 
        "\n\t let MessageUser = document.createElement('div');" + 
        "\n\t let OutgoingMessage = document.createElement('div');//содержимое блока сообщения" + 
        "\n\t let InputMessage = document.getElementById('InputMessage');//Поле ввода сообщения на форме" + 
        "\n\t let ChatForm = document.getElementById('ChatForm'); //блок с чатом" +
        "\n\t let SendMessage = document.getElementById('SendMessage');" +
        "\n\t MessageUser.className = 'MessageUser';" +
        "\n\t OutgoingMessage.className = 'OutgoingMessage';" +
        "\n\t ChatForm.append(MessageUser);" + 
        "\n\t MessageUser.append(OutgoingMessage);" +
        "\n\t OutgoingMessage.innerHTML = Message;" + 
        "\n\t InputMessage.value = \"\";" +
        "\n\t LowerDown(); \n}";
    //код для загрузки сообщений на сервер
    if(ButtonName == "PublishBtn"){ //если запуск генерации кода прозошел по нажатию на кнопку "опубликовать"
        Code += "\n async function  SendMessageOnServer(Message,Source){//отправка сообщений на сервер" +
            "\n\t let url = \'"+ domain + "\';" +
            "\n\t let ProjectName = document.getElementById('FrameChatBot').getAttribute('ProjectName');" +
            "\n\t let err = document.getElementById('LabelErrorChatBot');" +
            "\n\t let DateNow = new Date();" +
            "\n\t let mess = {" +
            "\n\t       message : Message," +
            "\n\t       source : Source," +
            "\n\t       dialog : Dialog," +
            "\n\t       project : ProjectName," +
            "\n\t       date : DateNow.getDate() + \".\" + (DateNow.getMonth() + 1) + \".\" + DateNow.getFullYear()," +
            "\n\t       time : DateNow.getHours() + \":\" + DateNow.getMinutes() + \":\" + DateNow.getSeconds()";
            if(Variables.length > 0){//добавление переменных в сообщение отправки
                Code +=  ",\n\t       variables : [";
                //запись переменных в массив
                for(let f = 0; f < Variables.length; f++){//проход по всем переменным
                    if(f + 1 < Variables.length){//если текущая переменная не последняя
                        Code += "\"" + Variables[f].innerText.replace(/\s/g, '') + "\",";
                    }else if(f + 1 >= Variables.length){//если текущая переменная последняя
                        Code += "\"" + Variables[f].innerText.replace(/\s/g, '') + "\"],";
                    } 
                }
                //запись значения переменных
                for(let f = 0; f < Variables.length; f++){//проход по всем переменным
                    if(f + 1 < Variables.length){//если текущая переменная не последняя
                        Code += "\n\t\t\tV_" + Variables[f].innerText.replace(/\s/g, '') + ": " + Variables[f].innerText.replace(/\s/g, '') + ",";
                    }else if(f + 1 >= Variables.length){//если текущая переменная последняя
                        Code += "\n\t\t\tV_" + Variables[f].innerText.replace(/\s/g, '') + ": " + Variables[f].innerText.replace(/\s/g, '');
                    } 
                }
            }
        Code +="}\n\tif(!err.hasAttribute('hidden')){" +
        "\n\t      err.setAttribute('hidden','hidden');" +
        "\n\t      err.innerHTML = \"\";" +
        "\n\t}; " +
        "\n\tif(DialogueStarted == 0){" +
        "\n\tMessageBeforeDialogue.push(mess);" +
        "\n\t  if(Source == \"User\" || Source == \"Btn\"){" +
        "\n\t       fetch(url, { " +
        "\n\t           method: 'POST'," +
        "\n\t           headers: {" +
        "\n\t               'Content-Type': 'application/json;charset=utf-8'" +
        "\n\t           }," +
        "\n\t           body: JSON.stringify(mess)" +
        "\n\t        }).then(response => response.json()).then(result => {" +
        "\n\t           if (result.dialog != 500) { " +
        "\n\t               for(let i = 0; i< MessageBeforeDialogue.length; i++){" +
        "\n\t                document.getElementById('FrameChatBot').setAttribute('dialog',result.dialog);" +
        "\n\t                 MessageBeforeDialogue[i].dialog = result.dialog;" +
        "\n\t                 Dialog = result.dialog;" +
        "\n\t               }" + 
        "\n\t          } else {" +
        "\n\t          if(err.hasAttribute('hidden')){" +
        "\n\t                   err.removeAttribute('hidden');" +
        "\n\t           }" +
        "\n\t      err.innerHTML = \"Ошибка! сообщение не отправлено на сервер\";" +
        "\n\t       }" +
        "\n\t       DialogueStarted = 1;" +
        "\n\t   })" +
        "\n\t      }" +
        "\n\t}" +
        "\n\tif(DialogueStarted == 1){" +
        "\n\t   MessageBeforeDialogue.push(mess);" +
        "\n\t    for(let i = 0; i <  MessageBeforeDialogue.length; i++){" +
        "\n\t         fetch(url, { " +
        "\n\t                  method: 'POST'," +
        "\n\t                    headers: {" +
        "\n\t                        'Content-Type': 'application/json;charset=utf-8'" +
        "\n\t                    }," +
        "\n\t                    body: JSON.stringify(MessageBeforeDialogue[i])" +
        "\n\t         }).then(response => response.json()).then(result => {" +
        "\n\t            if (result.dialog != 500) { " +
        "\n\t                  //document.getElementById('FrameChatBot').setAttribute('dialog',result.dialog);" +
        "\n\t                 Dialog = result.dialog;" +
        "\n\t           } else {" +
        "\n\t            if(err.hasAttribute('hidden')){" +
        "\n\t                    err.removeAttribute('hidden');" +
        "\n\t            }" +
        "\n\t        err.innerHTML = \"Ошибка! сообщение не отправлено на сервер\";" +
        "\n\t        }})" +
        "\n\t    }" +
        "\n\t    DialogueStarted = 2;" +
        "\n\t}else if(DialogueStarted == 2){" +
        "\n\t    fetch(url, { " +
        "\n\t        method: 'POST'," +
        "\n\t        headers: {" +
        "\n\t                'Content-Type': 'application/json;charset=utf-8'" +
        "\n\t        }," +
        "\n\t        body: JSON.stringify(mess)" +
        "\n\t    }).then(response => response.json()).then(result => {" +
        "\n\t            if (result.dialog != 500) { " +
        "\n\t                  document.getElementById('FrameChatBot').setAttribute('dialog',result.dialog);" +
        "\n\t                  Dialog = result.dialog;" +
        "\n\t        } else {" +
        "\n\t        if(err.hasAttribute('hidden')){" +
        "\n\t               err.removeAttribute('hidden');" +
        "\n\t        }" +
        "\n\t    err.innerHTML = \"Ошибка! сообщение не отправлено на сервер\";" +
        "\n\t    }})" +
        "\n\t}" +
        "\n}";
    //код для открытия чата
    }
    Code += "\n function OpenChatBot(){" +
            "\n\t let FormChatBot = document.getElementById('FormChatBot');" + 
            "\n\t let DivImgCloseBot = document.getElementById('DivImgCloseBot');" + 
            "\n\t if(FormChatBot.hasAttribute('hidden')){" + 
            "\n\t       FormChatBot.removeAttribute('hidden');" + 
            "\n\t       DivImgCloseBot.removeAttribute('hidden')" + 
            "\n\t }" + 
            "\n}";
    //код для закрытия чата
    Code += "\n function CloseChatBot(){" + 
      "\n\t let FormChatBot = document.getElementById('FormChatBot');" + 
      "\n\t let DivImgCloseBot = document.getElementById('DivImgCloseBot');" +
      "\n\t FormChatBot.setAttribute('hidden','hidden');" + 
      "\n\t DivImgCloseBot.setAttribute('hidden','hidden');" +
       "\n}";
    //код для открытия и закрытия изображения
    Code += "\n function ClickImage(id){//увеличение изображения " +
    "\n\t let body = document.body " +
    "\n\t let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран " +
    "\n\t let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий " +
    "\n\t let Cwidth = document.documentElement.clientWidth; " +
    "\n\t let Cheight = document.documentElement.clientHeight; " +
    "\n\t let img = document.getElementById(id); " +
    "\n\t  let ImgOpen = document.createElement('img'); " +
    "\n\t  //----------Создание фиксированной панели----------- " +
    "\n\t divNewInstrumentPanel.className=\"NewInstrumentPanel\"; " +
    "\n\t divNewInstrumentPanel.setAttribute(\"id\",\"NewInstrumentPanel\"); " +
    "\n\t body.prepend(divNewInstrumentPanel); " +
    "\n\t ImgOpen.src = img.src; " +
    "\n\t ImgOpen.className = \"OpenImg\"; " +
    "\n\t ImgOpen.id = img.id; " +
    "\n\t ImgOpen.setAttribute('onclick','OnClickImgExit()'); " +
    "\n\t if(img.naturalWidth > img.naturalHeight){ " +
    "\n\t  if(img.naturalWidth > Cwidth - 400){ " +
        "\n\t\t ImgOpen.width = img.naturalWidth/2;  " +
    "\n\t}else{ " + 
        "\n\t\t ImgOpen.width = img.naturalWidth; " +
    "\n\t } " +
    "\n\t }else if(img.naturalWidth <= img.naturalHeight){ " +
        "\n\t\t if(img.naturalHeight > Cheight - 400){ " +
            "\n\t\t\tImgOpen.height = img.naturalHeight/2;  " +
        "\n\t\t }else{ " +
            "\n\t\t\t ImgOpen.height = img.naturalHeight;  " +
            "\n\t\t} " +
    "\n\t} " +
    "\n\t divNewInstrumentPanel.append(ImgOpen); " +
    "\n} " +
    "\n function OnClickImgExit(){//закрытие всплывающего окна  " +
        "\n\t let NewInstrumentPanel = document.getElementById(\"NewInstrumentPanel\"); " +
        "\n\t NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel); " +
    "\n} ";
    //код для прокрутки чата в самый низ
    Code += "\n function LowerDown(){" + 
      "\n\t document.getElementById('ChatForm').scrollTop = document.getElementById('ChatForm').scrollHeight;" + 
      "\n}";
    
    return(Code);
}

function CheckVariable(PanelID,Text,Variables){//проверка переменной на синтаксичкскую идентичность и на наличие записанной переменной в существующих переменных
    for(let f = 0; f < Text.length; f++){//поиск переменных в тексте
        if(Text[f] == "$"){
            Variable = ((Text.substr(f + 1, Text.length)).split(' ')[0]);//вырезаем имя переменной из строки
            for(let e = 0; e < Variables.length; e++){//цикл по переменныи которые находятся в памяти (на проверку наличия переменных)
                if(Variables[e].innerHTML.replace(/\s/g, '') == Variable){
                    break;
                }else if(e + 1 == Variables.length){//если не найденно ни одной переменной
                    return ("error Ошибка! Переменная:\"" + Variable + "\", указанная на панели с именем:\"" + 
                            document.getElementById("NamePanel " + NumberOfElement(PanelID) + " " +  SecondNumberOfElement(PanelID)).innerHTML + "\", не найдена.");
                }
            }
            for(let e = 0; e < Variable.length; e++){
                if((Variable[0] > 'A' && Variable[0] < 'Z') || (Variable[0] > 'a' && Variable[0] < 'z')){
                    continue;
                }else if((e > 0) && ((Variable[0] > 'A' && Variable[0] < 'Z') || (Variable[0] > 'a' && Variable[0] < 'z') || (Variable[e] > '0' || Variable[e] < '9'))){
                    continue;
                }else{
                    return ("error Ошибка! Переменная с именем:\"" + Variable + "\", не удовлетворяет правилам создания переменной.\n\n" +
                            "Справка:\n 1) Переменная может начинаться только с букв латинского алфавита; \n" + 
                            "2) Переменная может содержать только латинские буквы и арабские цифры;");
                }
            }
            Text = Text.substr(0,f) + "\" + " + Variable + " + \"" + Text.substr(f + Variable.length + 1, Text.length)//обрезка знака доллара и добавление ковычек
        }
    }
    return (Text);
}

function CheckLink(Text){//проверка текста на наличие ссылок
    let index = -1;//индекс начала ссылки
    let link = "";//сама ссылка
    if(Text.indexOf('https') >= 0)
    {
        index = Text.indexOf('https');
    }
    else if(Text.indexOf('http') >= 0)
    {
        index = Text.indexOf('http');
    }else if(Text.indexOf('www') >= 0)
    {
        index = Text.indexOf('www');
    }
    if(index >= 0){
        Text.substr(index, Text.length).indexOf(" ") >= 0 ? link = Text.substr(index,Text.substr(index, Text.length).indexOf(" ")) : link = Text.substr(index,Text.length); //получение ссылки из текста(вырезание)
        Text = Text.substr(0,index) + "<a href=\'" + link +"\' target='_blank'>" + link + "</a>" + Text.substr(index + link.length, Text.length) ;
    }
    return (Text);
}

function CreateConnect(ElementId, Code){
    //получение панели к которой подключена кнопка
    let PanelConnect = document.getElementById((document.getElementById("Canvas " + ElementId).getAttribute('data-connect')));
    let Bot = document.getElementById("Bot " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
    let User = document.getElementById("User " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
    let Condition = document.getElementById("Condition " +  NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
    let BotContainsContent = true;//флаг для проверки наличия элементов у бота
    if(Bot != null && User != null){//если это классическая панель действий
        for(let f = 0; f < Bot.childNodes.length; f++){//поиск элементов бота у присоединеной панели
            if(Bot.childNodes[f] != undefined){//проверка на не пустой элемент
                if(Bot.childNodes[f].className == "TextBot" || Bot.childNodes[f].className == "ImgBot" ){//если обнаружен текстовый или визуальный элемент
                    let TextBotId = NumberOfElement(Bot.childNodes[f].id) + "_" + SecondNumberOfElement(Bot.childNodes[f].id) + "_" + ThirdNumberOfElement(Bot.childNodes[f].id);
                    //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                    Code += "\n\t\t Act_"+ TextBotId +"(); " ;//удалить кнопки если они есть и вызвать функцию
                    BotContainsContent = true;
                    break;
                }else{
                    BotContainsContent = false;//если не было найдено ни одного действия бота в присоединеной панели
                }
            }
        }

        if(BotContainsContent == false){//если не было найдено ни одного действия бота в присоединеной панели
            for(let f = 0; f < User.childNodes.length; f++){//поиск кнопок в действиях пользователя в присоединенной панели
                if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                    if(User.childNodes[f].className == "DivUserButton"){//если обнаружена кнопка
                        let ButtonId = NumberOfElement(User.childNodes[f].id) + "_" + SecondNumberOfElement(User.childNodes[f].id) + "_" + ThirdNumberOfElement(User.childNodes[f].id);
                        //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                        Code += "\n\t\t Act_"+ ButtonId +"();";//вызов функции
                        break;
                    }else if(User.childNodes[f].className == "DivUserElement"){//если обнаружен какой либо элемент действия пользователя
                        let ID = NumberOfElement(User.childNodes[f].id) + "_" + SecondNumberOfElement(User.childNodes[f].id) + "_" + ThirdNumberOfElement(User.childNodes[f].id);
                        //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                        Code += "\n\t\t Act_" + ID + "();"; //вызов функции
                        break;
                    }
                }
            }
        }
    }
    if(Condition != null){
        for(let f = 0; f < Condition.childNodes.length; f++){//поиск элементов бота у присоединеной панели
            if(Condition.childNodes[f] != undefined){//проверка на не пустой элемент
                if(Condition.childNodes[f].className == "DivConditionElement"){//если обнаружено условие
                    let ConditionId = NumberOfElement(Condition.childNodes[f].id) + "_" + SecondNumberOfElement(Condition.childNodes[f].id) + "_" + ThirdNumberOfElement(Condition.childNodes[f].id);
                    Code += "\n\t\t Act_"+ ConditionId +"();";//вызов функции
                    break;
                }
            }
        }
    }
    return Code;
}
function CreateConnect2(ElementId, Code){
    //получение панели к которой подключена кнопка
    let PanelConnect = document.getElementById((document.getElementById("Canvas " + ElementId).getAttribute('data-connect')));
    let Bot = document.getElementById("Bot " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
    let User = document.getElementById("User " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
    let Condition = document.getElementById("Condition " +  NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
    let BotContainsContent = true;//флаг для проверки наличия элементов у бота
    if(Bot != null && User != null){//если это классическая панель действий
        for(let f = 0; f < Bot.childNodes.length; f++){//поиск элементов бота у присоединеной панели
            if(Bot.childNodes[f] != undefined){//проверка на не пустой элемент
                if(Bot.childNodes[f].className == "TextBot" || Bot.childNodes[f].className == "ImgBot" ){//если обнаружен текстовый элемент
                    let TextBotId = NumberOfElement(Bot.childNodes[f].id) + "_" + SecondNumberOfElement(Bot.childNodes[f].id) + "_" + ThirdNumberOfElement(Bot.childNodes[f].id);
                    //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                    Code += "Act_"+ TextBotId +"();";//вызов функции
                    BotContainsContent = true;
                    break;
                }else{
                    BotContainsContent = false;//если не было найдено ни одного действия бота в присоединеной панели
                }
            }
        }
        if(BotContainsContent == false){//если не было найдено ни одного действия бота в присоединеной панели
            for(let f = 0; f < User.childNodes.length; f++){//поиск кнопок в действиях пользователя в присоединенной панели
                if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                    if(User.childNodes[f].className == "DivUserButton"){//если обнаружена кнопка
                        let ButtonId = NumberOfElement(User.childNodes[f].id) + "_" + SecondNumberOfElement(User.childNodes[f].id) + "_" + ThirdNumberOfElement(User.childNodes[f].id);
                        //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                        Code += "Act_"+ ButtonId +"();";//вызов функции
                        break;
                    }else if(User.childNodes[f].className == "DivUserElement"){//если обнаружен какой либо элемент действия пользователя
                        let ID = NumberOfElement(User.childNodes[f].id) + "_" + SecondNumberOfElement(User.childNodes[f].id) + "_" + ThirdNumberOfElement(User.childNodes[f].id);
                        //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                        Code += "Act_" + ID + "();"; //вызов функции
                        break;
                    }
                }
            }
        }
    }
    if(Condition != null){
        for(let f = 0; f < Condition.childNodes.length; f++){//поиск элементов бота у присоединеной панели
            if(Condition.childNodes[f] != undefined){//проверка на не пустой элемент
                if(Condition.childNodes[f].className == "DivConditionElement"){//если обнаружено условие
                    let ConditionId = NumberOfElement(Condition.childNodes[f].id) + "_" + SecondNumberOfElement(Condition.childNodes[f].id) + "_" + ThirdNumberOfElement(Condition.childNodes[f].id);
                    Code += "Act_"+ ConditionId +"();";//вызов функции
                    break;
                }
            }
        }
    }
    return Code;
}

