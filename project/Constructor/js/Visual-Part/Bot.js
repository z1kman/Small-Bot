function OnClickAddInstrumentBtnBot(id){ //Всплывающее окно. Создание новых эллементов бота
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Выберите желаемое действие для чат бота";
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Вывести текст\" class=\"AddBtn\" id=\"AddTextBtnBot " + N + " " + SN + "\" onclick=\"OnClickAddTextBot(id)\"> " +
    "<input type=\"button\" value=\"Вывести изображение\" class=\"AddBtn\" id=\"AddImgBtnBot " + N + " " + SN + "\" onclick=\"OnClickAddImgBot(id)\">";
}
function OnClickAddTextBot(id){//Всплывающее окно. Добавление текста у бота
    OnClickImgExit();//закрытие предыдущего окна
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let NewTextTextarea = document.createElement('textarea');//поле ввода текста
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели -----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Введите желаемый текст";
    //----------Создание поля ввода текста -----------
    NewTextTextarea.className="NewTextTextarea";
    NewTextTextarea.setAttribute("id","NewTextTextarea");
    divAddNewInstrumentPanel.append(NewTextTextarea);
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"NewTextSaveBtn " + N + " " + SN + "\"onclick=\"OnClickNewTextSaveBotBtn(id)\">" +
    "<input type=\"button\" value=\"Отменить\" class=\"AddBtn\" id=\"CancelBot "  + N + " " + SN + "\" onclick=\"OnClickCancelBot(id)\">";
}
function OnClickCancelBot(id){//отмена действия создания нового элемента у бота(Всплывающее окно)
    OnClickImgExit();//закрытие текущей панели
    OnClickAddInstrumentBtnBot(id);//генерирование предыдущей панели
}
function OnClickNewTextSaveBotBtn(id){//Всплывающее окно и панель. Добавление текста у бота. Кнопка сохранения
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let formAddInstrumentBtnBot = document.getElementById("formAddInstrumentBtnBot " + N + " " + SN);
    let TextTextarea = document.getElementById("NewTextTextarea");//textarea в окне редактирования
    let divTextBot = document.createElement('div');//div внутри которого label,textarea и т.д
    let divLabelTextBot = document.createElement('div');//надпись ("Вывод текста")
    let spanTrashImg = document.createElement('span');//иконка мусорки(удаление элемента)
    let divImgPencilInstrument = document.createElement('div');//иконка карандаша(редактирование элемента)
    let TextBotTextarea = document.createElement('textarea');//textarea для текста
    
    ElementKol++;//увеличение числа текстовых элементов
    //----------Создание div(а) внутри которого label,textarea и т.д-----------
    divTextBot.className = "TextBot";
    divTextBot.setAttribute("id", "TextBot " + N + " " + SN + " " + ElementKol );
    divTextBot.setAttribute("onmouseover","OnMouseOverTextBot(id)");
    divTextBot.setAttribute("onmouseout","OnMouseOutTextBot(id)");
    formAddInstrumentBtnBot.before(divTextBot);
    //----------Создание надписи ("Вывод текста")----------
    divLabelTextBot.className="LabelTextBot";
    divTextBot.append(divLabelTextBot);
    divLabelTextBot.innerHTML = "Вывод текста";
    //----------Создание иконки мусорки(удаление элемента)----------
    spanTrashImg.className = "TrashImg";
    spanTrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    spanTrashImg.setAttribute("style","opacity:0;");
    spanTrashImg.setAttribute("title","удалить этот элемент");
    spanTrashImg.setAttribute("onclick","OnClickRemoveTextBot(id)");
    divTextBot.append(spanTrashImg);
    spanTrashImg.innerHTML="<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание иконки карандаша(редактирование элемента)-----------
    divImgPencilInstrument.className="ImgPencilInstrument";
    divImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    divImgPencilInstrument.setAttribute("style","opacity: 0;");
    divImgPencilInstrument.setAttribute("onclick","OnClickEditTextBot(id)");
    divTextBot.append(divImgPencilInstrument);
    divImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание textarea для текста  и вставка самого текста----------
    TextBotTextarea.className = "textareaTextBot";
    TextBotTextarea.setAttribute("id","textareaTextBot " + N + " " + SN + " " + ElementKol);
    divTextBot.append(TextBotTextarea);
    TextBotTextarea.value = TextTextarea.value;//записать значения из окна создания элемента в сам элемент
    OnClickImgExit();//закрыть окно создания элемента
    EnabledNavbarBtn();//включение кнопок находящихся в шапке сайта
}
function OnClickRemoveTextBot(id){//удаление элемента-текст у бота
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var TN = ThirdNumberOfElement(id);
    TextBot = document.getElementById("TextBot " + N + " " + SN + " " + TN);
    TextBot.parentNode.removeChild(TextBot);
}
function OnClickEditTextBot(id){//Всплывающее окно. Редактирование текста у бота
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let NewTextTextarea = document.createElement('textarea');//поле ввода текста
    let formBtn = document.createElement('form');//форма с кнопками
    
    //----------Создание надписи панели -----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Введите желаемый текст";
    //----------Создание поля ввода текста -----------
    NewTextTextarea.className="NewTextTextarea";
    NewTextTextarea.setAttribute("id","NewTextTextarea");
    divAddNewInstrumentPanel.append(NewTextTextarea);
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"NewTextSaveBtn " + N + " " + SN + " " + TN + "\"onclick=\"OnClickEditTextSaveBotBtn(id)\">" +
    "<input type=\"button\" value=\"Отменить\" class=\"AddBtn\" id=\"CancelBot "  + N + " " + SN + "\" onclick=\"OnClickImgExit();\">";  

    //----------Вставка текста из панели в панель для редактирования-----------
    var TextTextarea = document.getElementById("NewTextTextarea");//textarea в окне редактирования
    var TextBotTextarea = document.getElementById("textareaTextBot " + N + " " + SN + " " + TN);//textarea на панели у чат бота
    TextTextarea.value = TextBotTextarea.value;
}
function OnClickEditTextSaveBotBtn(id){ //Всплывающее окно. Редактирование текста у бота. Кнока сохранения
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var TN = ThirdNumberOfElement(id);
    var TextTextarea = document.getElementById("NewTextTextarea");//textarea в окне редактирования
    var TextBotTextarea = document.getElementById("textareaTextBot " + N + " " + SN + " " + TN);//textarea на панели у чат бота
    TextBotTextarea.value = TextTextarea.value;
    alert(N + " " + SN + " " + TN)
    OnClickImgExit();
    EnabledNavbarBtn();//включение кнопок находящихся в шапке сайта
}