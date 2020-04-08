
function SaveProject(){
    let form = document.createElement('form');
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
    //GenerateCode();

    let form = document.createElement('form');
    form.method = 'POST';
    form.setAttribute('hidden','hidden');
    document.body.append(form);
    form.innerHTML = "<textarea name=\"CodeTest\">" + GenerateCode() + "</textarea>";
    form.submit();//отправка кода на сервер
    form.innerHTML = "";

}
function GenerateCode(){
    let Canvas = document.getElementsByClassName("canvas");//все стрелки на форме
    let Panels = document.getElementsByClassName("Panel");//все панели на форме
    let StartPanelId = "";//переменная для хранения id стартовой панели
    let ElementId = ""//переменная для хранения id элемента
    let Code = "";//переменная для сохранения сгенерированного кода
    let N = 0;//для разбиения id элемента(первое число)
    let SN = 0;//для разбиения id элемента(второе число)
    let TN = 0;//для разбиения id элемента(третье число)
    let StartExist = false; //флаг для отмечания наличия созданной функции запуска чат-бота

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
        return("error");
    }

    //Обнуление переменных для дальнейшего использования 
    N = 0;
    SN = 0;
    TN = 0;
    for(let i = 0; i < Panels.length; i++){//Цикл по всем панелям
        for (let j = 0; j < Panels[i].childNodes.length; j++) {//Цикл по всем дочерним элементам панелей
            if(document.getElementById(Panels[i].childNodes[j].id).className == 'Bot'){//если обнаружен блок действий бота;
               for(let k = 0; k < Panels[i].childNodes.length; k++){//Цикл по всем элементам блока действий чат бота
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
                            }
                            Code += "\n}";//завершение функции
                        }
                    }
               }
            }
        }
    }
    return(Code);
}