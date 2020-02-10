var NumberOfPanels = 1;//Кол-во панелей
var NumberOfText = 0;//кол-во текстовых элементов(Бот)
var NumberOfButton = 0;//кол-во кнопок (Пользователь)
var oldNumberOfElement = 0;//индекс предыдущего элемента(для изменения имени);

//------Служебная часть-----
//--------------------------
//--------------------------
//--------------------------

function NameOfElement(id){ //получение имени эллемента
    return(id.split(' ')[0]);
}
function NumberOfElement(id){ //получение номера элемента
    return(id.split(' ')[1]);
}
function SecondNumberOfElement(id){ //получение второго номера эллемента(необходимо для кнопки добавления новой панели)
    return(id.split(' ')[2]);
}
function ThirdNumberOfElement(id){//получение третьего номера эллемента(под элементы панели(кнопки/текст и т.д))
    return(id.split(' ')[3]);
}
function DisabledNavbarBtn(){//отключение кнопок находящихся в шапке сайта
    let NewVariableBtn = document.getElementById("NewVariableBtn");//кнопка добавления новой переменной(переменная необходима для блокирования доступа к кнопке)
    let TestBtn = document.getElementById("TestBtn");//кнопка тестирования(переменная необходима для блокирования доступа к кнопке)
    let SaveBtn = document.getElementById("SaveBtn");//кнопка сохранения(переменная необходима для блокирования доступа к кнопке)

    //----------Отключение кнопок в Navbar-----------
    NewVariableBtn.setAttribute("disabled","disabled");
    TestBtn.setAttribute("disabled","disabled");
    SaveBtn.setAttribute("disabled","disabled");
}
function EnabledNavbarBtn(){//включение кнопок находящихся в шапке сайта
    let NewVariableBtn = document.getElementById("NewVariableBtn");//кнопка добавления новой переменной(переменная необходима для блокирования доступа к кнопке)
    let TestBtn = document.getElementById("TestBtn");//кнопка тестирования(переменная необходима для блокирования доступа к кнопке)
    let SaveBtn = document.getElementById("SaveBtn");//кнопка сохранения(переменная необходима для блокирования доступа к кнопке)

    //----------Включение кнопок в Navbar-----------
    NewVariableBtn.removeAttribute("disabled");
    TestBtn.removeAttribute("disabled");
    SaveBtn.removeAttribute("disabled");
}
function CreateWindowPanel(){ //Создание Всплывающего окна(основа)
    let body = document.body
    let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран
    let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий  
     //----------Создание фиксированной панели-----------
     divNewInstrumentPanel.className="NewInstrumentPanel";
     divNewInstrumentPanel.setAttribute("id","NewInstrumentPanel");
     body.prepend(divNewInstrumentPanel);
     //----------Создание панели выбора действий-----------
     divAddNewInstrumentPanel.className="AddNewPanel";
     divAddNewInstrumentPanel.setAttribute("id","AddNewPanel");
     divNewInstrumentPanel.prepend(divAddNewInstrumentPanel);
     //----------Создание кнопки закрытия панели выбора действий-----------
     divImgExit.className="ImgExit";
     divImgExit.setAttribute("onclick","OnClickImgExit()");
     divAddNewInstrumentPanel.prepend(divImgExit);
     divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">" 
}

//----Создние переменных----
//--------------------------
//--------------------------
//--------------------------

function OnClickAddNewVariable(id){//Всплывающее окно создания новой переменной 
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewVariable = document.createElement('div');//надпись
    let divNewVariable = document.createElement('div');//блок с полем ввода имени новой переменной и надписью к ней
    let divNewVariableValue = document.createElement('div');//блок с полем ввода значения новой  переменной и надписью к нему
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели -----------
    divLabelAddNewVariable.className = "Label";
    divLabelAddNewVariable.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewVariable);
    divLabelAddNewVariable.innerHTML="Создание новой переменной";
    //----------Создание блока ввода имени новой переменной -----------
    divNewVariable.className = "NewName";
    divAddNewInstrumentPanel.append(divNewVariable);
    divNewVariable.innerHTML = "<div style=\"display:inline-block\">Имя переменной:</div>" + 
        "<input type=\"text\" id=\"NewVariableName\" class=\"Input\">";
    //----------Создание блока ввода значения новой переменной -----------
    divNewVariableValue.className = "NewVariableValue";
    divAddNewInstrumentPanel.append(divNewVariableValue);
    divNewVariableValue.innerHTML = "<div style=\"display:inline-block\">Значение переменной:</div>" +
        "<input type=\"text\" id=\"NewVariableName\" class=\"Input\">";
    //----------Создание формы с кнопками -----------
    formBtn.setAttribute("id","formBtnNewVariable")
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" onclick=\"OnClickNewVariableSaveBtn(id)\">" +
    "<input type=\"button\" value=\"Отменить\" class=\"AddBtn\" onclick=\"OnClickImgExit();\">";

}
function OnClickNewVariableSaveBtn(id){ //Всплывающее окно. Кнопка сохранения
    let StrNewVariableName = document.getElementById("NewVariableName").value;//название переменной
    let formBtnNewVariable = document.getElementById("formBtnNewVariable");//форма с кнопками сохранения и отмены(необходимо для добавления сообщения об ошибки)
    let error = false;//наличие ошибки 
    if(StrNewVariableName.replace(/\s+/g, '') == ""){//если только пробелы в названии переменной
        if(document.getElementById("ErrorNewVariable") != null){//если сообщение уже высвечивалось то удалить его
            document.getElementById("ErrorNewVariable").remove();
        }
        error = true;
        let divError = document.createElement('div');//Окно с ошибкой
        divError.className="Label";
        divError.setAttribute("id","ErrorNewVariable");
        formBtnNewVariable.prepend(divError);
        divError.innerHTML="Введите название переменной";
        return 0;
    }
    for(let i = 0; i < StrNewVariableName.length; i++){
        if((StrNewVariableName[i] >= 'a' && StrNewVariableName[i] <= 'z'))
        {
            error = false;
            continue
        }
        else
        {
            if(document.getElementById("ErrorNewVariable") != null){//если сообщение уже высвечивалось то удалить его
                document.getElementById("ErrorNewVariable").remove();
            }
            let divError = document.createElement('div');//Окно с ошибкой
            divError.className="Label";
            divError.setAttribute("id","ErrorNewVariable");
            formBtnNewVariable.prepend(divError);
            divError.innerHTML="Имя переменной должно содержать только латинские буквы";
            error = true;
            break
        }
    }


    if(error == false)//остальная логика по сохранению переменной
    {

    }
}

//----Работа с панелями-----
//--------------------------
//--------------------------
//--------------------------

function OnClickEditPanelName(id){//редактирование имени панели(скрытие имени панели, появление инпута)
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    var EditNamePanel = document.getElementById(id);
    var NamePanel = document.getElementById("NamePanel "  + N + " " + SN);
    var Edit = document.getElementById("Edit "  + N + " " + SN);
    var InputEdit = document.getElementById("InputEdit "  + N + " " + SN);
    var TrashImg = document.getElementById("TrashImg "  + N + " " + SN);
    if (!InputEdit.classList.contains('visible')){
        InputEdit.classList.add('visible');
        TrashImg.setAttribute("style","display:none;");
        EditNamePanel.setAttribute("style", "display: none;");
        InputEdit.setAttribute("style", "display: block;")
        Edit.value = NamePanel.textContent;
        
    }
    
}
function OnClickInputEdit(id){ //редактирование имени панели(скрытие инпута, появление имени панели)
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let EditNamePanel = document.getElementById("EditNamePanel " + N + " " + SN );
    let NamePanel = document.getElementById("NamePanel "   + N + " " + SN);
    let Edit = document.getElementById("Edit "  + N + " " + SN);
    let InputEdit = document.getElementById("InputEdit "  + N + " " + SN);
    let TrashImg = document.getElementById("TrashImg "  + N + " " + SN);

    if(InputEdit.classList.contains('visible') && InputEdit.classList.contains('click') && Edit.value!=""){
        InputEdit.classList.remove('click');
        InputEdit.classList.remove('visible');
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
    if(InputEdit.classList.contains('visible') && !InputEdit.classList.contains('click')){
        InputEdit.classList.add('click');
    }
}
function OnMouseOverEditPanelName(id){ //отображение иконки редактирования имени панели
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
function OnMouseOverTextBot(id){//отображение иконки редактирования на блоках действиях(показать)
    N = NumberOfElement(id);
    SN = SecondNumberOfElement(id);
    TN = ThirdNumberOfElement(id);
    ImgPencilInstrument = document.getElementById("ImgPencil " + N + " " + SN + " " + TN);
    TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style","opacity: 100")
    ImgPencilInstrument.setAttribute("style","opacity: 100");
}
function OnMouseOutTextBot(id){//отображение иконки редактирования на блоках действиях(скрыть)
    N = NumberOfElement(id);
    SN = SecondNumberOfElement(id);
    TN = ThirdNumberOfElement(id);
    ImgPencilInstrument = document.getElementById("ImgPencil " + N + " " + SN + " " + TN);
    TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style","opacity: 0")
    ImgPencilInstrument.setAttribute("style","opacity: 0");
}
function OnClickRemovePanel(id){//удаление панели
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    formAddInstrumentBtn = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
    document.getElementById("Panel " + N + " " + SN).parentNode.removeChild(document.getElementById("Panel " + N + " " + SN )); //удаление панели
    formAddInstrumentBtn.parentNode.removeChild(formAddInstrumentBtn);//Удаление кнопки добавления новой панели
}
function OnClickNewPanelBtn(id){ //создание новой панели
    let Navbar = document.getElementById("Navbar");
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let ParentFormAddNewPanel = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
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
    formAddInstrumentBtnBot.setAttribute("id","formAddInstrumentBtnBot " + N + " " + NumberOfPanels);
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
    formAddInstrumentBtnUser.setAttribute("id","formAddInstrumentBtnUser " + N + " " + NumberOfPanels);
    divUser.append(formAddInstrumentBtnUser);
    formAddInstrumentBtnUser.innerHTML="<input type=\"button\" value=\"Добавить действие\" class=\"AddInstrumentBtn\" id=\"AddInstrumentBtnUser " + N + " "  + NumberOfPanels  + " \" onclick=\"OnClickAddInstrumentBtnUser(id)\">";
    //----------Создание формы кнопки добавления новой панели(NewPanelBtn)----------
    formNewPanelBtn.setAttribute("id","formAddInstrumentBtn " + N + " " + NumberOfPanels);
    divPanel.after(formNewPanelBtn);
    formNewPanelBtn.innerHTML = "<input type=\"button\" value=\"Добавить панель\" class=\"NewPanelBtn\" id=\"NewPanelBtn " + N + " " + NumberOfPanels + "\" onclick=\"OnClickNewPanelBtn(id)\">";
}
function OnClickImgExit(){//закрытие всплывающего окна 
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel);
    EnabledNavbarBtn();
}

//------Часть чат-бота------
//--------------------------
//--------------------------
//--------------------------


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
    
    NumberOfText++;//увеличение числа текстовых элементов
    //----------Создание div(а) внутри которого label,textarea и т.д-----------
    divTextBot.className = "TextBot";
    divTextBot.setAttribute("id", "TextBot " + N + " " + SN + " " + NumberOfText );
    divTextBot.setAttribute("onmouseover","OnMouseOverTextBot(id)");
    divTextBot.setAttribute("onmouseout","OnMouseOutTextBot(id)");
    formAddInstrumentBtnBot.before(divTextBot);
    //----------Создание надписи ("Вывод текста")----------
    divLabelTextBot.className="LabelTextBot";
    divTextBot.append(divLabelTextBot);
    divLabelTextBot.innerHTML = "Вывод текста";
    //----------Создание иконки мусорки(удаление элемента)----------
    spanTrashImg.className = "TrashImg";
    spanTrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + NumberOfText);
    spanTrashImg.setAttribute("style","opacity:0;");
    spanTrashImg.setAttribute("title","удалить этот элемент");
    spanTrashImg.setAttribute("onclick","OnClickRemoveTextBot(id)");
    divTextBot.append(spanTrashImg);
    spanTrashImg.innerHTML="<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание иконки карандаша(редактирование элемента)-----------
    divImgPencilInstrument.className="ImgPencilInstrument";
    divImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + NumberOfText);
    divImgPencilInstrument.setAttribute("style","opacity: 0;");
    divImgPencilInstrument.setAttribute("onclick","OnClickEditTextBot(id)");
    divTextBot.append(divImgPencilInstrument);
    divImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание textarea для текста  и вставка самого текста----------
    TextBotTextarea.className = "textareaTextBot";
    TextBotTextarea.setAttribute("id","textareaTextBot " + N + " " + SN + " " + NumberOfText);
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
    OnClickImgExit();
    EnabledNavbarBtn();//включение кнопок находящихся в шапке сайта
}

//------Пользовательская часть------
//----------------------------------
//----------------------------------
//----------------------------------


function OnClickAddInstrumentBtnUser(id){ //Всплывающее окно. Окно создания новых элементов у пользователя
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Выберите действе осуществляемое пользователем";
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Нажатие на кнопку\" class=\"AddBtn\" id=\"AddButtonBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddButtonUser(id)\"> " +
    "<input type=\"button\" value=\"Ввод текста\" class=\"AddBtn\" id=\"AddNumberBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddTextUser(id)\">" +
    "<input type=\"button\" value=\"Ввод числа\" class=\"AddBtn\" id=\"AddTextBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddNumberUser(id)\">" +
    "<input type=\"button\" value=\"Ввод номера телефона\" class=\"AddBtn\" id=\"AddPhoneNumberBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddPhoneNumberUser(id)\">" +
    "<input type=\"button\" value=\"Ввод email\" class=\"AddBtn\" id=\"AddEmailBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddEmailUser(id)\">";
}
function CancelUser(id){//Всплывающее окно. Отмена создания какого либо элемента у пользователя
    OnClickImgExit();
    OnClickAddInstrumentBtnUser(id);
}
function OnClickAddButtonUser(id){ //Всплывающее окно. Окно создания новой кнопки
    OnClickImgExit();
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let divLabelBlack = document.createElement('div');//блок с полем для ввода текста
    let formBtn = document.createElement('form');//форма с кнопками
    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Введите текст отображаемый на кнопке";
    //----------Создание блока с полем для ввода текста-----------
    divLabelBlack.className = "LabelBlack";
    divAddNewInstrumentPanel.append(divLabelBlack);
    divLabelBlack.innerHTML = "<input type=\"text\" id=\"NewButtonText\" class=\"Input\" onfocus=\"OnFocusNewButtonText()\" onblur=\"OnBlurNewButtonText()\">"
    //----------Создание формы для кнопок и сами кнопки-----------
    formBtn.setAttribute("id","formNewButton");
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"AddNewButtonBtnUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewButtonUser(id)\">" + 
    "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    //----------Окно для ошибки-----------
    LabelError = document.createElement('div');
    LabelError.className = "LabelError";
    LabelError.setAttribute("id","ErrorNewButton");
    formBtn.prepend(LabelError);
}
function OnBlurNewButtonText(){ //Всплывающее окно. Ввод текста кнопки. Расфокус на поле ввода
    NewButtonText = document.getElementById("NewButtonText");
    ErrorNewButton = document.getElementById("ErrorNewButton");
    if (NewButtonText.value.length > 30) {
        NewButtonText.classList.add('invalid');
        ErrorNewButton.innerHTML = "Максимальная длина текста не должна превышать 30 символов";
      }
}
function OnFocusNewButtonText(){//Всплывающее окно. Ввод текста кнопки. Фокус на поле ввода
    NewButtonText = document.getElementById("NewButtonText");
    ErrorNewButton = document.getElementById("ErrorNewButton");
    if (NewButtonText.classList.contains('invalid')) {
        NewButtonText.classList.remove('invalid');
        ErrorNewButton.innerHTML = "";
      }
}
function OnClickSaveNewButtonUser(id){ //Всплывающее окно. Окно создания новой кнопки. Кнопка сохранить
    InputNewButtonText = document.getElementById("NewButtonText");//Текст из Input
    formBtn = document.getElementById("formNewButton");
    if(InputNewButtonText.classList.contains('invalid')){//если есть ошибка
        return 0;
    }
    /// остальная логика
}
function OnClickAddNumberUser(id){ //Всплывающее окно. Окно создания ввода числа
    OnClickImgExit();
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let divLabelBlack = document.createElement('div');//блок с полем для ввода текста
    let formBtn = document.createElement('form');//форма с кнопками
}
function OnChangeCheckRadioNumber(id){//Всплывающее окно. Окно создания ввода числа. Событие изменения RadioButton
    DivRangeNumber = document.getElementById("DivRangeNumber");
    DivMaskNumber = document.getElementById("DivMaskNumber");
    DivNumber = document.getElementById("DivNumber");
    ErrorNewNumber = document.getElementById("ErrorNewNumber");
    if(id === "InputNumber"){
        DivNumber.removeAttribute("hidden");
        DivRangeNumber.setAttribute("hidden","hidden");
        DivMaskNumber.setAttribute("hidden","hidden");
        ErrorNewNumber.innerHTML = "";
    }
    else if(id === "RangeNumber"){
        DivRangeNumber.removeAttribute("hidden");
        DivMaskNumber.setAttribute("hidden","hidden");
        DivNumber.setAttribute("hidden","hidden");
        ErrorNewNumber.innerHTML = "";
    }
    else if(id === "MaskNumber"){
        DivMaskNumber.removeAttribute("hidden");
        DivRangeNumber.setAttribute("hidden","hidden");
        DivNumber.setAttribute("hidden","hidden");
        ErrorNewNumber.innerHTML = "";
    }
}
function OnChangeCheckboxNumber(id){//Всплывающее окно. Окно создания ввода числа. Событие изменения CheckBox
    DivIndicatedNumber = document.getElementById("DivIndicatedNumber");
    NumberCheckbox = document.getElementById("NumberCheckbox");
    if(id === "NumberCheckbox" && NumberCheckbox.checked){
        DivIndicatedNumber.removeAttribute("hidden");
    }
    else if(!NumberCheckbox.checked){
        DivIndicatedNumber.setAttribute("hidden","hidden");
    }
}
function OnClickNextNewNumberUser(id){
    //обработка исключительных ситуаций
    InputNumber = document.getElementById("InputNumber");//комбобокс ввод числа(возможно ввод определенного числа);
    RangeNumber = document.getElementById("RangeNumber");//комбобокс ввод диапазона чисел
    MaskNumber = document.getElementById("MaskNumber");//комбобокс ввод числа по маске
    NumberCheckbox = document.getElementById("NumberCheckbox");//чекбокс ввод определенного числа
    ErrorNewNumber = document.getElementById("ErrorNewNumber");//блок для вывода ошибок

    IndicatedNumber = document.getElementById("IndicatedNumber");//поле ввода определенного числа
    InputNumber1 = document.getElementById("InputNumber 1");//поле ввода первого диапазона
    InputNumber2 = document.getElementById("InputNumber 2");//поле ввода второго диапазона
    MaskInputNumber = document.getElementById("MaskInputNumber");//поле ввода маски
    if(InputNumber.checked == true && NumberCheckbox.checked == true &&  IndicatedNumber.value == ""){
        ErrorNewNumber.innerHTML = "Ошибка! Укажите необходимое число";
        IndicatedNumber.classList.add('invalid');
    }else if(RangeNumber.checked == true && (InputNumber1.value == "" || InputNumber2.value == ""))
    {
        ErrorNewNumber.innerHTML = "Ошибка! Укажите необходимый диапазон";
        InputNumber1.classList.add('invalid');
        InputNumber2.classList.add('invalid');
    }
    else if(MaskNumber.checked == true && MaskInputNumber.value == ""){
        ErrorNewNumber.innerHTML = "Ошибка! Задайте маску";
        MaskInputNumber.classList.add('invalid');
    }
    else{
        //остальная логика
    }
    
}
function OnFocusNumberError(id){//Всплывающее окно. Ввод числа у пользователя. Фокус на поле ввода
    NumberId = document.getElementById(id);
    ErrorNewNumber = document.getElementById("ErrorNewNumber");
    if (NumberId.classList.contains('invalid')) {
        NumberId.classList.remove('invalid');
        ErrorNewNumber.innerHTML = "";
      }
}