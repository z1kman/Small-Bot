let timerId = "";//для очищения таймера
function SaveProject(){
    let form = document.createElement('form');
    if(document.getElementById("DivErrorProject") != undefined){//если панель с ошибкой присутствует на форме, тогда удалить ее
        document.getElementById("DivErrorProject").remove();
    }
    form.method = 'POST';
    form.action = '/constructor';
    form.setAttribute('hidden','hidden');
    form.innerHTML = "<input type=\"hidden\" name=\"VariableId\" value=\"" + VariableId + "\">" + 
    "<input type=\"hidden\" name=\"NumberOfPanels\" value=\"" + NumberOfPanels + "\">" + 
    "<input type=\"hidden\" name=\"ElementKol\" value=\"" + ElementKol + "\">" + 
    "<input type=\"hidden\" name=\"NumberOfSection\" value=\"" + NumberOfSection + "\">"+
    "<textarea name=\"Content\" value=\"" + document.head.innerHTML + "</head><body onload=\"RefreshArrows()\">" + document.body.innerHTML;
    document.body.append(form);
    form.submit();//отправка кода на сервер
    form.innerHTML = "";
}
function TestProject(){
    
    let Code = "";
    if(document.getElementById("DivErrorProject") != undefined){//если панель с ошибкой присутствует на форме, тогда удалить ее
        document.getElementById("DivErrorProject").remove();
    }
    clearTimeout(timerId);
    Code = GenerateCode();
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
function GenerateCode(){
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


    for(let i = 0; i < Panels.length; i++){//Цикл по всем панелям
        for (let j = 0; j < Panels[i].childNodes.length; j++) {//Цикл по всем дочерним элементам панелей
            if(document.getElementById(Panels[i].childNodes[j].id).className == 'Bot'){//если обнаружен блок действий бота;
               for(let k = 0; k < Panels[i].childNodes[j].childNodes.length; k++){//Цикл по всем элементам блока действий чат бота
                    if(Panels[i].childNodes[j].childNodes[k] != undefined)//проверка на не пустой элемент
                    {
                        if(Panels[i].childNodes[j].childNodes[k].className == "TextBot")//если найден текстовый элемент
                        {
                            ElementId = Panels[i].childNodes[j].childNodes[k].id;//получение id элемента
                            N = NumberOfElement(ElementId);//получение первого числа id элемента
                            SN = SecondNumberOfElement(ElementId);//получение второго числа id элемента
                            TN = ThirdNumberOfElement(ElementId);//получение третьего числа id элемента
                            ElementId = "textareaTextBot " + N + " " + SN + " " + TN;//сохранение id элемента который содержит в себе текст бота
                            let Text = document.getElementById(ElementId).value;
                            let User = document.getElementById("User " + N + " " + SN);//блок действий пользователя на этой же панеле
                            let Variable = "";//запоминание переменных в массив
                            if(NumberOfElement(StartPanelId) == N && SecondNumberOfElement(StartPanelId) == SN && StartExist == false ) //если это начальная панель
                            {
                                StartExist = true;//установления флага в значение - функция старта существует
                                Code +="\nwindow.onload = function(){\n\t Start(); \n}" +
                                        "\nfunction Start(){"; 
                            }
                            else{
                                Code +="\nfunction Act_" + N + "_" + SN  + "_" + TN + "(){";//Создание функции с уникальным номером
                            }
    
                            //Поиск переменных в тексте и проверка переменных на существование
                            Text = CheckVariable(Panels[i].id,Text,Variables);
                            if(Text.split(' ')[0] == "error"){//если переменная не была найдена тогда вернуть ошибку
                                return Text;
                            }
                            
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
                                        "\n\t LowerDown();" ; //опустить скролл в самый низ(для удобства)
                            if(Panels[i].childNodes[j].childNodes[k + 1].className == "TextBot"){//если существует еще одно действие вывода текста у бота на текущей панели
                                let NextStepId = "";//переменная для обращения к следующей функции вывода сообщения(при условии что у бота есть более чем одно дейстие вывода текста)
                                NextStepId = Panels[i].childNodes[j].childNodes[k + 1].id;
                                Code += "\n\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();";

                            }else if(k + 2 ==  Panels[i].childNodes[j].childNodes.length){//если текущая итерация последнияя в цикле по элементам бота
                                for(let f = 0; f < User.childNodes.length; f++){//цикл по всем элементам пользователя в данной панели для нахождения кнопок
                                    if(User.childNodes[f] != undefined){//проверка на не пустой элемент
                                        if(User.childNodes[f].className == "DivUserButton"){//если найдена кнопка
                                            let NextStepId = User.childNodes[f].id;;//переменная для обращения к следующей функции
                                            Code += "\n\t Act_" + NumberOfElement(NextStepId) + "_" + SecondNumberOfElement(NextStepId) + "_" + ThirdNumberOfElement(NextStepId) + "();"; 
                                            //Вызов следующей функции которая создает кнопку(и) 
                                            break;
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
                        if(Panels[i].childNodes[j].childNodes[k].className == "DivUserButton"){
                            ElementId = Panels[i].childNodes[j].childNodes[k].id;//получение id элемента
                            N = NumberOfElement(ElementId);//получение первого числа id элемента
                            SN = SecondNumberOfElement(ElementId);//получение второго числа id элемента
                            TN = ThirdNumberOfElement(ElementId);//получение третьего числа id элемента
                            ElementId = "ButtonUser " + N + " " + SN + " " + TN;//сохранение id элемента который содержит в себе текст бота
                            let ButtonUser = document.getElementById(ElementId);//кнопка действия пользователя на форме конструктора(для получения надписи на кнопке)
                            let JumpIndicator  = document.getElementById("JumpIndicator " + N + " " + SN + " " + TN);//джампер на кнопке 
                            if(NumberOfElement(StartPanelId) == N && SecondNumberOfElement(StartPanelId) == SN && StartExist == false ) //если это начальная панель
                            {
                                StartExist = true;//установления флага в значение - функция старта существует
                                Code +="\nwindow.onload = function(){\n\t Start(); \n}" +
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
                                        "\n\t ButtonBlock.append(ButtonOnChat)" +
                                        "\n\t LowerDown();" ; //опустить скролл в самый низ(для удобства)
                            if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//проверка на соединение кнопки с другой панелью
                                //получение панели к которой подключена кнопка
                                let PanelConnect = document.getElementById((document.getElementById("Canvas " + N + " " + SN + " " + TN).getAttribute('data-connect')));
                                let Bot = document.getElementById("Bot " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
                                let User = document.getElementById("User " + NumberOfElement(PanelConnect.id) + " " + SecondNumberOfElement(PanelConnect.id));
                                let BotContainsContent = true;//флаг для проверки наличия элементов у бота
                                for(let f = 0; f < Bot.childNodes.length; f++){//поиск элементов бота у присоединеной панели
                                    if(Bot.childNodes[f] != undefined){//проверка на не пустой элемент
                                        if(Bot.childNodes[f].className == "TextBot"){//если обнаружен текстовый элемент
                                            let TextBotId = NumberOfElement(Bot.childNodes[f].id) + "_" + SecondNumberOfElement(Bot.childNodes[f].id) + "_" + ThirdNumberOfElement(Bot.childNodes[f].id);
                                            //запись в код вызов функции. при нажатии по кнопке вызовется действие бота
                                            Code += "\n\t ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_"+ TextBotId +"()')";
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
                                                Code += "\n\t ButtonOnChat.setAttribute('onclick','SendUserClickOnButton(this.value);Act_"+ ButtonId +"()')";
                                                break;
                                            }
                                        }
                                    }
                                }

                            }
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
                        else if(Panels[i].childNodes[j].childNodes[k].className == "DivUserElement"){//если найден другой элемент(текст/число/email)
                            ElementId = Panels[i].childNodes[j].childNodes[k].id;
                            N = NumberOfElement(ElementId);
                            SN = SecondNumberOfElement(ElementId);
                            TN = ThirdNumberOfElement(ElementId);
                            ElementId = N + " " + SN + " " + TN;
                            if(Panels[i].childNodes[j].childNodes[k].getAttribute('elementtype') == "Text"){//если текущий элемент - текстовый 
                                if(FirstUserElement == false){
                                    FirstUserElement = true;
                                    Code += "\ndocument.addEventListener(\"DOMContentLoaded\", () => {" +
                                            "\n\tdocument.getElementById('SendMessage').setAttribute('onclick','Act_" + N + "_" + SN + "_" + TN + "()');\n});";     
                                }
                                Code += "\n function Act_" + N + "_" + SN + "_" + TN + "(){"
                                if(document.getElementById("UserTextIdicated " + ElementId) != undefined){//если текущий элемент с указанным текстом
                                    let Text = document.getElementById("UserTextIdicated " + ElementId).value;//Указанный текст
                                    let Variable = "";//для запоминания имени переменной
                                    let JumpIndicator = document.getElementById("JumpIndicator " + ElementId);
                                    Code += "\n\t let InputMessage = document.getElementById('InputMessage')" + //Переменная отвечающая за поле ввода пользователя
                                            "\n\t if(InputMessage.value.toLowerCase() == \"" + Text.toLowerCase() + "\"){";
                                   if(document.getElementById("UserTextVariable " + ElementId) != undefined){//если у блока существует блок с переменной 
                                        Variable = document.getElementById("UserTextVariable " + ElementId).value;//запомнить переменную
                                        Code += "\n\t\t" + Variable + " = InputMessage.value;";//сохранить введеный пользователем текст в переменную
                                   } 
                                   Code += "\n\t }"
                                   if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//проверка на соединение текстового элемента с другой панелью
                                    alert(JumpIndicator.id)
                                   }
                                   Code += "\n}"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
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
