var click = 0;
var NumberOfPanels = 1;
var NumberOfText = 0;
var oldNumberOfElement = 0;//индекс предыдущего элемента(для изменения имени);

function NumberOfElement(id){ //получение номера эллемента
    return(id.split(' ')[1]);
}
function SecondNumberOfElement(id){ //получение второго номера эллемента(необходимо для кнопки добавления новой панели)
    return(id.split(' ')[2]);
}
function ThirdNumberOfElement(id){//получение третьего номера эллемента(под элементы панели(кнопки/текст и т.д))
    return(id.split(' ')[3]);
}
function OnClickEditPanelName(id){//редактирование имени панели(скрытие имени панели, появление инпута)
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var EditNamePanel = document.getElementById(id);
    var NamePanel = document.getElementById("NamePanel "  + N + " " + SN);
    var Edit = document.getElementById("Edit "  + N + " " + SN);
    var InputEdit = document.getElementById("InputEdit "  + N + " " + SN);
    var TrashImg = document.getElementById("TrashImg "  + N + " " + SN);
    click++;
    
    TrashImg.setAttribute("style","display:none;");
    EditNamePanel.setAttribute("style", "display: none;");
    InputEdit.setAttribute("style", "display: block;")
    Edit.value = NamePanel.textContent;
}
function OnClickInputEdit(id){ //редактирование имени панели(скрытие инпута, появление имени панели)
    click++;
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var EditNamePanel = document.getElementById("EditNamePanel " + N + " " + SN );
    var NamePanel = document.getElementById("NamePanel "   + N + " " + SN);
    var Edit = document.getElementById("Edit "  + N + " " + SN);
    var InputEdit = document.getElementById("InputEdit "  + N + " " + SN);
    var TrashImg = document.getElementById("TrashImg "  + N + " " + SN);

    if(click > 2 && Edit.value!=""){
        EditNamePanel.setAttribute("style", "display:inline-block;");
        InputEdit.setAttribute("style", "display: none;")
        click = 0;
        NamePanel.innerHTML = Edit.value; //имя панели = имя отредактированного имени
        EditNamePanel.style.width = NamePanel.width + 30; //ширина панели
        TrashImg.setAttribute("style","display:inline;");
        oldNumberOfElement = N;
    }
    else if(Edit.value == "") //если не указано никакое имя
    {
        alert("Необходимо заполнить поле названия панели");
    }
}
function OnMouseOverEditPanelName(id){  //отображение иконки редактирования имени панели
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var ImgPencil= document.getElementById("ImgPencil " + N + " " + SN);
    ImgPencil.setAttribute("style","opacity:100;");
}
function OnMouseOutEditPanelName(id){//скрытие иконки редактирования имени панели
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var ImgPencil= document.getElementById("ImgPencil " + N + " " + SN);
    ImgPencil.setAttribute("style","opacity:0;");
}
function OnClickRemovePanel(id){//удаление панели
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    formAddInstrumentBtn = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
    document.getElementById("Panel " + N + " " + SN).parentNode.removeChild(document.getElementById("Panel " + N + " " + SN )); //удаление панели
    formAddInstrumentBtn.parentNode.removeChild(formAddInstrumentBtn);//Удаление кнопки добавления новой панели
}
function OnClickNewPanelBtn(id){ //создание новой панели
    var Constructor = document.getElementById("Constructor");
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var ParentFormAddNewPanel = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
    let divPanel = document.createElement('div');//Cоздание панели (Panel)
    let divInputEdit = document.createElement('div');//Cоздание блока поля ввода имени панели (InputEdit)
    let inputEdit = document.createElement('input');//Создание поля ввода имени панели (Edit)
    let divTitlePanel = document.createElement('div');//Создание блока имени панели (TitlePanel)
    let spanNamePanel = document.createElement('span');//Создание подблока имени панели(сама надпись(NamePanel))
    let spanImgPencil = document.createElement('span');//Создание блока изображения карандаша(редактирование имени палени(ImgPencil))
    let spanImgTrash = document.createElement('span')//Создание блока изображения мусорки(удаление панели(TrashImg))
    let divBot = document.createElement('div');//Создание блока действий бота(Bot)
    let divLabelBot = document.createElement('div');//Создание надписи у чат бота("Действие чат бота"(Label))
    let formAddInstrumentBtnBot = document.createElement('form');//Создание формы кнопки добавления инструмента у чат бота("Добавить действие")
    let divUser = document.createElement('div');//Создание блока действий пользователя(Bot)
    let divLabelUser = document.createElement('div');//Создание надписи у пользователя("Действие пользователя"(Label))
    let formAddInstrumentBtnUser = document.createElement('form');//Создание формы кнопки добавления инструмента у пользователя("Добавить действие")
    let formNewPanelBtn = document.createElement('form');//Создание формы кнопки добавления новой панели(NewPanelBtn)
    NumberOfPanels++;//увеличение кол-ва панелей

   //----------Создание панели (Panel)-----------
    divPanel.className="Panel";
    divPanel.setAttribute("id","Panel " + N  + " " + NumberOfPanels)
    ParentFormAddNewPanel.after(divPanel);
    //----------Cоздание блока поля ввода имени панели (InputEdit)-----------
    divInputEdit.className="InputEdit";
    divInputEdit.setAttribute("id","InputEdit " + N  + " " + NumberOfPanels);
    divInputEdit.setAttribute("style","display: none;");
    divInputEdit.setAttribute("onclick","OnClickInputEdit(id)");
    divPanel.prepend(divInputEdit);
    //----------Создание поля ввода имени панели (Edit)-----------
    inputEdit.className="Edit";
    inputEdit.setAttribute("id","Edit " + N  + " " + NumberOfPanels);
    inputEdit.setAttribute("type","text;");
    inputEdit.setAttribute("maxlength","28");
    divInputEdit.prepend(inputEdit);
    //----------Создание блока имени панели (TitlePanel)-----------
    divTitlePanel.className="TitlePanel";
    divTitlePanel.setAttribute("id","EditNamePanel " + N  + " " + NumberOfPanels);
    divTitlePanel.setAttribute("onclick","OnClickEditPanelName(id)");
    divTitlePanel.setAttribute("onmouseover","OnMouseOverEditPanelName(id)");
    divTitlePanel.setAttribute("onmouseout","OnMouseOutEditPanelName(id)");
    divPanel.append(divTitlePanel);
    //----------Создание подблока имени панели(сама надпись(NamePanel))-----------
    spanNamePanel.className="NamePanel";
    spanNamePanel.setAttribute("id","NamePanel " + N  + " " + NumberOfPanels);
    divTitlePanel.append(spanNamePanel);
    spanNamePanel.innerHTML="Панель " + NumberOfPanels; 
    //----------Создание блока изображения карандаша(редактирование имени палени(ImgPencil))-----------  
    spanImgPencil.className = "ImgPencil";
    spanImgPencil.setAttribute("style","opacity: 0;");
    spanImgPencil.setAttribute("id","ImgPencil " + N  + " " + NumberOfPanels);
    divTitlePanel.append(spanImgPencil);
    spanImgPencil.innerHTML="<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока изображения мусорки(удаление панели(TrashImg))-----------  
    spanImgTrash.className="TrashImg";
    spanImgTrash.setAttribute("id","TrashImg " + N  + " " + NumberOfPanels);
    spanImgTrash.setAttribute("title","удалить эту панель");
    spanImgTrash.setAttribute("onclick","OnClickRemovePanel(id)");
    divPanel.append(spanImgTrash);
    spanImgTrash.innerHTML="<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">"
    //----------Создание блока действий бота(Bot)-----------
    divBot.className = "Bot";
    divBot.setAttribute("id","Bot "+  + N  + " " + NumberOfPanels);
    divPanel.append(divBot);
    //----------Создание надписи у чат бота("Действие чат бота"(Label))-----------
    divLabelBot.className = "Label";
    divBot.append(divLabelBot);
    divLabelBot.innerHTML="Действие чат бота";
    //----------Создание формы кнопки добавления инструмента у чат бота("Добавить действие")-----------
    divBot.append(formAddInstrumentBtnBot);
    formAddInstrumentBtnBot.innerHTML="<input type=\"button\" value=\"Добавить действие\" class=\"AddInstrumentBtn\" id=\"AddInstrumentBtnBot " + N + " "  + NumberOfPanels  + "\" onclick=\"OnClickAddInstrumentBtnBot(id)\">";
    //----------Создание блока действий пользователя(User)----------
    divUser.className = "User";
    divUser.setAttribute("id","User " + N  + " " + NumberOfPanels);
    divPanel.append(divUser);
    //----------Создание надписи у чат пользователя("Действие пользователя"(Label))-----------
    divLabelUser.className = "Label";
    divUser.append(divLabelUser);
    divLabelUser.innerHTML="Действие пользователя";
    //----------Создание формы кнопки добавления инструмента у пользователя("Добавить действие")-----------
    divUser.append(formAddInstrumentBtnUser);
    formAddInstrumentBtnUser.innerHTML="<input type=\"button\" value=\"Добавить действие\" class=\"AddInstrumentBtn\" id=\"AddInstrumentBtnUser " + N + " "  + NumberOfPanels  + " \" onclick=\"OnClickAddInstrumentBtnUser(id)\">";
    //----------Создание формы кнопки добавления новой панели(NewPanelBtn)----------
    formNewPanelBtn.setAttribute("id","formAddInstrumentBtn " + N + " " + NumberOfPanels);
    divPanel.after(formNewPanelBtn);
    formNewPanelBtn.innerHTML = "<input type=\"button\" value=\"Добавить панель\" class=\"NewPanelBtn\" id=\"NewPanelBtn " + N + " " + NumberOfPanels + "\" onclick=\"OnClickNewPanelBtn(id)\">";
}
function OnClickImgExit(){//закрытие панели  добавления элемента
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel);
}
function OnClickAddInstrumentBtnBot(id){ //создани панели выбора новых действий у бота
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    let Constructor = document.getElementById("Constructor");
    let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран
    let divAddNewInstrumentPanelBot = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание фиксированной панели-----------
    divNewInstrumentPanel.className="NewInstrumentPanel";
    divNewInstrumentPanel.setAttribute("id","NewInstrumentPanel");
    Constructor.prepend(divNewInstrumentPanel);
    //----------Создание панели выбора действий-----------
    divAddNewInstrumentPanelBot.className="AddNewInstrumentPanelBot";
    divNewInstrumentPanel.prepend(divAddNewInstrumentPanelBot);
    //----------Создание кнопки закрытия панели выбора действий-----------
    divImgExit.className="ImgExit";
    divImgExit.setAttribute("onclick","OnClickImgExit()");
    divAddNewInstrumentPanelBot.prepend(divImgExit);
    divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">"
    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanelBot.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Выберете желаемое действие для чат бота";
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanelBot.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Вывести текст\" class=\"AddBtnBot\" id=\"AddTextBtnBot " + N + " " + SN + "\" onclick=\"OnClickAddTextBot(id)\"> " +
    "<input type=\"button\" value=\"Вывести изображение\" class=\"AddBtnBot\" id=\"AddImgBtnBot " + N + " " + SN + "\" onclick=\"OnClickAddImgBot(id)\">"
}
function OnClickAddTextBot(id){//создание панели добавление текста у бота
    OnClickImgExit();//закрытие старой панели
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    let Constructor = document.getElementById("Constructor");
    let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран
    let divAddNewTextPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let NewTextTextarea = document.createElement('textarea');//поле ввода текста
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание фиксированной панели-----------
    divNewInstrumentPanel.className="NewInstrumentPanel";
    divNewInstrumentPanel.setAttribute("id","NewInstrumentPanel");
    Constructor.prepend(divNewInstrumentPanel);
    //----------Создание панели выбора действий-----------
    divAddNewTextPanel.className="AddNewTextPanel";
    divNewInstrumentPanel.prepend(divAddNewTextPanel);
    //----------Создание кнопки закрытия панели выбора действий-----------
    divImgExit.className="ImgExit";
    divImgExit.setAttribute("onclick","OnClickImgExit()");
    divAddNewTextPanel.prepend(divImgExit);
    divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">"
    //----------Создание надписи панели -----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewTextPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Введите желаемый текст";
    //----------Создание поля ввода текста -----------
    NewTextTextarea.className="NewTextTextarea";
    NewTextTextarea.setAttribute("id","NewTextTextarea");
    divAddNewTextPanel.append(NewTextTextarea);
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewTextPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtnBot\" id=\"NewTextSaveBtn " + N + " " + SN + "\"onclick=\"OnClickNewTextSaveBotBtn(id)\">" +
    "<input type=\"button\" value=\"Отменить\" class=\"AddBtnBot\" id=\"CancelBot "  + N + " " + SN + "\" onclick=\"OnClickCancelBot(id)\">";
}
function OnClickCancelBot(id){//отмена действия создания нового элемента у бота
    OnClickImgExit();//закрытие текущей панели
    OnClickAddInstrumentBtnBot(id);//генерирование предыдущей панели
}