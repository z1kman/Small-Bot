var NumberOfPanels = 1;//Кол-во панелей
var ElementKol = 1;//кол-во элементов(для индексации - неотражает реальное кол-во элементов)
var NumberOfSection = 1;//кол-во боковых секций
var TagKol = 0;//кол-во тегов
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
            ("Необходимо заполнить поле названия панели");
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
    let N = NumberOfElement(id);

    let ParentNewPanelBtn = document.getElementById("ParentNewPanelBtn " + N + " 0");
    let SN = SecondNumberOfElement(id);
    let flag = false;
    formAddInstrumentBtn = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
    document.getElementById("Panel " + N + " " + SN).parentNode.removeChild(document.getElementById("Panel " + N + " " + SN )); //удаление панели
    formAddInstrumentBtn.parentNode.removeChild(formAddInstrumentBtn);//Удаление кнопки добавления новой панели
    for(let i = 0; i <= NumberOfPanels; i++){
        if(document.getElementById("Panel " + N + " " + i ) != null){
            flag = true;
            break;
        }
    }

    if(flag == false){//если в секции нет панелей
        ParentNewPanelBtn.classList.remove('active');//удалить флаг
        document.getElementById("Section " + N).remove(); //удалить секцию
    }

}
function OnClickNewPanelBtn(id){ //создание новой панели
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let ParentFormAddNewPanel = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
    let Constructor = document.getElementById("Constructor");
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
    let ParentNewPanelBtn = document.getElementById(id);


    if(NameOfElement(id) == "ParentNewPanelBtn" && !ParentNewPanelBtn.classList.contains("active")){ //добавление новой секции
        let Section = document.createElement('div');
        let formAddInstrumentBtn = document.createElement('form');
        ParentNewPanelBtn.classList.add("active");

        //----------Создание новой секции-----------
        NumberOfSection++;//увеличение кол-ва секций
        Section.className = "Section";
        Section.setAttribute("id","Section " + NumberOfSection);
        Constructor.append(Section);
        //----------Создание новой формы с кнопкой добавления новых панелей-----------
        formAddInstrumentBtn.setAttribute("id","formAddInstrumentBtn " + NumberOfSection + " " + "0" );
        formAddInstrumentBtn.className = "FormAddInstrumentBtn";
        Section.append(formAddInstrumentBtn);
        formAddInstrumentBtn.innerHTML =  "<input type=\"button\" value=\"Добавить панель\" class=\"NewPanelBtn\" id=\"ParentNewPanelBtn " + NumberOfSection + " " + "0\" onclick=\"OnClickNewPanelBtn(id)\">";

    }

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
    TagKol = 0;
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
    "<input type=\"button\" value=\"Ввод email\" class=\"AddBtn\" id=\"AddEmailBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddEmailUser(id)\">";
}
function CancelUser(id){//Всплывающее окно. Отмена создания какого либо элемента у пользователя
    
    if( NameOfElement(id) == "CancelUserNewText" || NameOfElement(id) == "CancelUserNewNumber"){
        let AddNewPanel = document.getElementById("AddNewPanel");
        AddNewPanel.removeAttribute("hidden");
        let AddNewPanel1 = document.getElementById("AddNewPanel1");
        AddNewPanel1.remove();
    }
    else{
    OnClickImgExit();
    OnClickAddInstrumentBtnUser(id);
    }
}
function OnClickAddButtonUser(id){ //Всплывающее окно. Окно создания новой кнопки
    let Name = NameOfElement(id);
    if(Name == "AddButtonBtnUser"){
        OnClickImgExit();
    }
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let divLabelBlack = document.createElement('div');//блок с полем для ввода текста
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками
    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Введите текст отображаемый на кнопке";
    //----------Создание блока с полем для ввода текста-----------
    divLabelBlack.className = "LabelBlack";
    divAddNewInstrumentPanel.append(divLabelBlack);
    divLabelBlack.innerHTML = "<label>Текст:<input type=\"text\" id=\"NewButtonText\" class=\"InputOther1\" onfocus=\"OnFocusNewButtonText()\" onblur=\"OnBlurNewButtonText()\" style=\"margin-top:20px;\"></label>"
    //----------Создание формы для кнопок и сами кнопки-----------
    formBtn.setAttribute("id","formNewButton");
    divAddNewInstrumentPanel.append(formBtn);
    if(Name == "AddButtonBtnUser"){
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"AddNewButtonBtnUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewButtonUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }
    else if(Name == "ImgPencil"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveEditButtonBtnUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickSaveEditButtonUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"OnClickImgExit()\">";
    }
    //----------Окно для ошибки-----------
    LabelError.className = "LabelError";
    LabelError.setAttribute("id","ErrorNewButton");
    formBtn.prepend(LabelError);
}
function OnBlurNewButtonText(){ //Всплывающее окно. Ввод текста кнопки. Расфокус на поле ввода
    NewButtonText = document.getElementById("NewButtonText");
    ErrorNewButton = document.getElementById("ErrorNewButton");
    if (NewButtonText.value.length > 15) {
        NewButtonText.classList.add('invalid');
        ErrorNewButton.innerHTML = "Максимальная длина текста не должна превышать 15 символов";
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

function OnClickAddNumberUser(id){ //Всплывающее окно. Окно создания ввода числа
    OnClickImgExit();
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let Name = NameOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let FormRadio = document.createElement('form');
    let DivNumber = document.createElement('div');
    let FormCheckbox = document.createElement('form');
    let DivIndicatedNumber = document.createElement('div');
    let DivRangeNumber = document.createElement('div');
    let LabelBlack1 = document.createElement('div');
    let DivMaskNumber = document.createElement('div');
    let LabelBlack2 = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками
    
    //----------------Добавление блока с надписью----------------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Выберите необходимое действие";
    //----------------Создание формы с комбобоксами---------------
    FormRadio.className="FormRadio";
    divAddNewInstrumentPanel.append(FormRadio);
    FormRadio.innerHTML="<input type=\"radio\" checked=\"checked\" class=\"RadioButton\" id=\"InputNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
    "<label for=\"InputNumber\">Ввод числа</label>" +
    "<input type=\"radio\" class=\"RadioButton\" id=\"RangeNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
    "<label for=\"RangeNumber\">Ввод числа в диапазоне</label>" +
    "<input type=\"radio\" class=\"RadioButton\" id=\"MaskNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" + 
    "<label for=\"MaskNumber\">Ввод числа по маске</label>";
    //----------------Создание блока в котором чекбокс и поле ввода определенного числа---------------
    DivNumber.setAttribute("id","DivNumber");
    divAddNewInstrumentPanel.append(DivNumber);
    //----------------Создание чекбокса для ввода определенного числа---------------
    FormCheckbox.className = "FormCheckbox";
    DivNumber.append(FormCheckbox);
    FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"NumberCheckbox\" onchange=\"OnChangeCheckboxNumber(id)\">" +
    "<label for=\"NumberCheckbox\">Указать необходимое число</label>";
    //----------------Создание поля для ввода определенного числа---------------
    DivIndicatedNumber.setAttribute("id","DivIndicatedNumber");
    DivIndicatedNumber.setAttribute("hidden","hidden");
    DivNumber.append(DivIndicatedNumber);
    DivIndicatedNumber.innerHTML = "<label>Число:<input type=\"number\" class=\"InputNumber\" id=\"IndicatedNumber\" onfocus=\"OnFocusNumberError(id)\" ></label>";
    //----------------Создание блока для ввода определенного диапазона---------------
    DivRangeNumber.setAttribute("id","DivRangeNumber");
    DivRangeNumber.setAttribute("hidden","hidden");
    divAddNewInstrumentPanel.append(DivRangeNumber);
    //----------------Создание блока подписи для ввода определенного диапазона---------------
    LabelBlack1.className = "LabelBlack";
    DivRangeNumber.append(LabelBlack1);
    LabelBlack1.innerHTML = "Укажите диапазон" + 
    "<br/>" + 
    "<label>от<input type=\"number\" class=\"InputNumber\" id=\"InputNumber 1\" onfocus=\"OnFocusNumberError(id)\"></label>" + 
    "<label>до<input type=\"number\" class=\"InputNumber\" id=\"InputNumber 2\" onfocus=\"OnFocusNumberError(id)\"></label>";
     //----------------Создание блока для ввода маски---------------
     DivMaskNumber.setAttribute("id","DivMaskNumber");
     DivMaskNumber.setAttribute("hidden","hidden");
     divAddNewInstrumentPanel.append(DivMaskNumber);
     //----------------Создание подписи блока для ввода маски---------------
     LabelBlack2.className = "LabelBlack";
     DivMaskNumber.append(LabelBlack2);
     LabelBlack2.innerHTML = "<label>Введите маску:<input type=\"input\" class=\"InputOther1\" id=\"MaskInputNumber\" onfocus=\"OnFocusNumberError(id)\"></label>" +
     "<div><input type=\"button\" class=\"helpBtn\" id=\"helpBtnMask\" value=\"справка\" onclick=\"OnClickHelpBtnMask()\"></div>";
     //----------------Создание подписи блока вывода ошибки---------------     
     LabelError.className = "LabelError";
     LabelError.setAttribute("id","ErrorNewNumber");
     divAddNewInstrumentPanel.append(LabelError);
     //----------------Создание формы с кнопками---------------    
     formBtn.setAttribute("id","formNewNumber")
     divAddNewInstrumentPanel.append(formBtn);
     if(Name == "AddTextBtnUser" || Name == "CancelUserNewNumber"){//если открыто из окна создания нового элемента
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextNewNumberUser " + N + " " + SN + "\" onclick=\"OnClickNextNewNumberUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
     }else if(Name == "ImgPencil"){//если открыто через кнопку редактирования
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextEditNumberUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickNextNewNumberUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN +  " " + TN + "\" onclick=\"CancelUser(id)\">";
     }
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
function OnClickNextNewNumberUser(id){//Всплывающее окно. Действие добавление числа. Кнопка далее
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
        let Name = NameOfElement(id);
        DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
        let N = NumberOfElement(id);
        let SN = SecondNumberOfElement(id);
        let divLabelAddNewInstrument = document.createElement('div');//надпись
        let DivRecInVariableNumber = document.createElement('div');
        let FormCheckbox = document.createElement('form');
        let DivIndicatedVariableNumber = document.createElement('div');
        let LabelError = document.createElement('div');
        let formBtn = document.createElement('form');//форма с кнопками\
        
        let AddNewPanel = document.getElementById("AddNewPanel");
        let divNewInstrumentPanel = document.getElementById("NewInstrumentPanel");        
        let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
        let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий 
        
        AddNewPanel.setAttribute("hidden","hidden");
         //----------Создание панели выбора действий-----------
         divAddNewInstrumentPanel.className="AddNewPanel";
         divAddNewInstrumentPanel.setAttribute("id","AddNewPanel1");
         divNewInstrumentPanel.prepend(divAddNewInstrumentPanel);
         //----------Создание кнопки закрытия панели выбора действий-----------
         divImgExit.className="ImgExit";
         divImgExit.setAttribute("onclick","OnClickImgExit()");
         divAddNewInstrumentPanel.prepend(divImgExit);
         divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">" 

         //----------------Добавление блока с надписью----------------
        divLabelAddNewInstrument.className = "Label";
        divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
        divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
        divLabelAddNewInstrument.innerHTML = "Записать введеное пользователем число в переменную?";
         //----------------Создание блока в котором чекбокс и поле выбора переменной---------------
         DivRecInVariableNumber.setAttribute("id","DivRecInVariableNumber");
         divAddNewInstrumentPanel.append(DivRecInVariableNumber);
        //----------------Создание чекбокса для выбора переменной---------------
        FormCheckbox.className = "FormCheckbox";
        DivRecInVariableNumber.append(FormCheckbox);
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"RecInVariableNumber\" onchange=\"OnChangeCheckboxRecInVariableNumber(id)\">" +
        "<label for=\"RecInVariableNumber\">Да, записать</label>";
        //----------------Создание поля для ввода определенного числа---------------
        DivIndicatedVariableNumber.setAttribute("id","DivIndicatedVariableNumber");
        DivIndicatedVariableNumber.setAttribute("hidden","hidden");
        DivRecInVariableNumber.append(DivIndicatedVariableNumber);
        DivIndicatedVariableNumber.innerHTML = "<label>Выберите переменную:" +
        "<select class=\"Select\">" + 
        "<option>Number</option>" +
        "</select>"+
        "</label>";
        //----------------Создание подписи блока вывода ошибки---------------     
        LabelError.className = "LabelError";
        LabelError.setAttribute("id","ErrorNewNumber");
        divAddNewInstrumentPanel.append(LabelError);
        //----------------Создание формы с кнопками---------------    
        formBtn.setAttribute("id","formNewNumber")
        divAddNewInstrumentPanel.append(formBtn);
        if(Name == "NextNewNumberUser"){
            formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveNewNumberUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewNumberUser(id)\">" + 
            "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewNumber " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
        }else if(Name == "NextEditNumberUser"){
            let TN = ThirdNumberOfElement(id);
            formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveNewNumberUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickSaveNewNumberUser(id)\">" + 
            "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewNumber " + N + " " + SN + " " + TN + "\" onclick=\"CancelUser(id)\">";
        }
    }
    
}
function OnChangeCheckboxRecInVariableNumber(id){
    RecInVariableNumber = document.getElementById("RecInVariableNumber");
    DivIndicatedVariableNumber = document.getElementById("DivIndicatedVariableNumber");
    
    if(RecInVariableNumber.checked == true){
        DivIndicatedVariableNumber.removeAttribute("hidden");
    }else{
        DivIndicatedVariableNumber.setAttribute("hidden","hidden");
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
function OnClickAddEmailUser(id){//Всплывающее меню. Создание Email
    let Name = NameOfElement(id);
    if(Name == "AddEmailBtnUser"){
        OnClickImgExit();
    }
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let LabelBlack = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Выберите переменную в которую необходимо записать введеный email";
    //----------Создание блока для выбора переменной-----------
    LabelBlack.className = "LabelBlack";
    divAddNewInstrumentPanel.append(LabelBlack);
    LabelBlack.innerHTML = "<label>Выберите переменную:" +
        "<select class=\"Select\" id=\"Select\">" + 
        "<option>Email</option>" +
        "<option>Email2 </option>" +
        "</select>" + 
        "</label>";
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    if(Name == "AddEmailBtnUser"){
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"AddNewEmailUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewEmailUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }else if(Name == "ImgPencil"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"AddNewEmailUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickSaveEditEmailUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"OnClickImgExit()\">";
    }
    //----------Окно для ошибки-----------
    LabelError.className = "LabelError";
    LabelError.setAttribute("id","ErrorNewEmail");
    formBtn.prepend(LabelError);
}
function OnClickAddTextUser(id){ //Всплывающее меню. Функция создания меню создания текста
    let Name = NameOfElement(id);
    let Element = "";
    if(Name == "AddNumberBtnUser"){
        OnClickImgExit();
    }

    CreateWindowPanel();
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let FormRadio = document.createElement('form');
    let DivText = document.createElement('div');
    let FormCheckbox = document.createElement('form');
    let DivIndicatedText = document.createElement('div');
    let DivTagText = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    if(Name == "ImgPencil") //определение какого типа элемент
    {
        let TN = ThirdNumberOfElement(id);
        let DivUserText  = document.getElementById("DivUserText " + N + " " + SN + " " + TN);
        for(let i = 0; i < DivUserText.childNodes.length; i++ ){
            if(DivUserText.childNodes[i] != "[object Text]"){
                if(DivUserText.childNodes[i].hasAttribute('class')){
                    if(DivUserText.childNodes[i].getAttribute('class') == "TagTextUser"){
                        Element = "TagTextUser";
                        break;
                    }
                    else if(DivUserText.childNodes[i].getAttribute('class') == "IndicatedTextUser"){
                        Element = "IndicatedTextUser";
                        break;
                    }
                    else{
                        Element = "Text";
                    }
                }
            }
        }
    }

    //----------------Добавление блока с надписью----------------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Выберите необходимое действие";
    //----------------Создание формы с комбобоксами---------------
    FormRadio.className="FormRadio";
    divAddNewInstrumentPanel.append(FormRadio);
    if(Name == "AddNumberBtnUser"){
        FormRadio.innerHTML="<input type=\"radio\" checked=\"checked\" class=\"RadioButton active\" id=\"InputText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">"+
        "<label for=\"InputText\">Ввод текста</label>" +
        "<input type=\"radio\" class=\"RadioButton\" id=\"TagText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">" +
        "<label for=\"TagText\">Ввод текста(чтение по тегам)</label>";
    }
    else if(Name == "ImgPencil"){
        if(Element == "Text" || Element == "IndicatedTextUser"){
            FormRadio.innerHTML="<input type=\"radio\" class=\"RadioButton active\" checked=\"checked\" id=\"InputText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">"+
            "<label for=\"InputText\">Ввод текста</label>" +
            "<input type=\"radio\" class=\"RadioButton\" id=\"TagText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">" +
            "<label for=\"TagText\">Ввод текста(чтение по тегам)</label>";
        }
        else if(Element == "TagTextUser"){
            FormRadio.innerHTML="<input type=\"radio\" class=\"RadioButton\" id=\"InputText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">"+
            "<label for=\"InputText\">Ввод текста</label>" +
            "<input type=\"radio\" class=\"RadioButton active\" checked=\"checked\" id=\"TagText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">" +
            "<label for=\"TagText\">Ввод текста(чтение по тегам)</label>";
        }
    }
    //----------------Создание блока в котором чекбокс и поле ввода определенного текста--------------
    DivText.setAttribute("id","DivText");
    if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "TagTextUser"){
            DivText.setAttribute("hidden","hidden");
        }
    }
    divAddNewInstrumentPanel.append(DivText);
    //----------------Создание чекбокса для ввода определенного слова---------------
    FormCheckbox.className = "FormCheckbox";
    DivText.append(FormCheckbox);
    if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "Text")
        {
            FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
            "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>";
        }
        else if(Element == "IndicatedTextUser"){
            FormCheckbox.innerHTML = "<input type=\"checkbox\" checked=\"checked\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
            "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>";
        }
        else{
            FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
            "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>"; 
        }
    }else{
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
        "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>";
    }
    //----------------Создание поля для ввода определенного текста---------------
    DivIndicatedText.setAttribute("id","DivIndicatedText");
    DivText.append(DivIndicatedText);
    if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "IndicatedTextUser"){
            let TN = ThirdNumberOfElement(id);
            let UserTextIdicated = document.getElementById("UserTextIdicated " + N + " " + SN + " " + TN);
            DivIndicatedText.innerHTML = "<label>Введите слово или текст:<input type=\"input\" class=\"InputOther1\" id=\"IndicatedText\" value = \"" + UserTextIdicated.value + "\" onfocus=\"OnFocusTextError(id)\"></label>";
        }else{
            DivIndicatedText.setAttribute("hidden","hidden");
            DivIndicatedText.innerHTML = "<label>Введите слово или текст:<input type=\"input\" class=\"InputOther1\" id=\"IndicatedText\" onfocus=\"OnFocusTextError(id)\"></label>";
        }
    }else{
        DivIndicatedText.setAttribute("hidden","hidden");
        DivIndicatedText.innerHTML = "<label>Введите слово или текст:<input type=\"input\" class=\"InputOther1\" id=\"IndicatedText\" onfocus=\"OnFocusTextError(id)\"></label>";
    }
   
     //----------------Создание блока для ввода тегов---------------
     DivTagText.setAttribute("id","DivTagText");
     divAddNewInstrumentPanel.append(DivTagText);
     DivTagText.innerHTML = "<label>Введите тег:<input type=\"input\" class=\"InputOther1\" id=\"InputTagText\" onfocus=\"OnFocusTextError(id)\">"+
     "<input type=\"button\" class=\"BtnOther\" id=\"AddNewTag 1\" value=\"Ок\" onclick=\"OnClickAddNewTag(id)\"></label>" +
     "<div class=\"LabelBlack\" id=\"TagBlock\" hidden=\"hidden\"> Ваши теги:<br /></div>";
     if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "TagTextUser"){//Если редактируется текст с тегами
            let TN = ThirdNumberOfElement(id);
            let TagLabel = document.getElementById("TagLabel " + N + " " + SN + " " + TN);
            let TagBlock = document.getElementById("TagBlock");
            let AddNewTag1 = document.getElementById("AddNewTag 1");
            TagBlock.removeAttribute('hidden');
            AddNewTag1.classList.add('notfirst');  
            for(let i = 0; i < TagLabel.childNodes.length; i++){
                if(TagLabel.childNodes[i] != "[object Text]"){
                    if(TagLabel.childNodes[i].getAttribute('class') == "TagOnPanel"){
                        let TagDiv = document.createElement('div');
                        let Tag = document.createElement('div');
                        TagDiv.className = "TagDiv";
                        TagDiv.setAttribute("id","TagDiv " + i);
                        TagBlock.append(TagDiv);

                        Tag.className = "Tag";
                        Tag.setAttribute("id","Tag " + i);
                        Tag.setAttribute("onclick","OnClickTag(id)");
                        TagDiv.append(Tag);
                        Tag.innerHTML = TagLabel.childNodes[i].innerHTML;
                        TagKol++;
                    }
                }
            }
        }
        else
        {
            DivTagText.setAttribute("hidden","hidden");
        }
     }else{
        DivTagText.setAttribute("hidden","hidden");
     }
     //----------------Создание подписи блока вывода ошибки---------------     
     LabelError.className = "LabelError";
     LabelError.setAttribute("id","ErrorNewNumber");
     divAddNewInstrumentPanel.append(LabelError);
     //----------------Создание формы с кнопками---------------    
     formBtn.setAttribute("id","formNewNumber")
     divAddNewInstrumentPanel.append(formBtn);
     if(Name == "AddNumberBtnUser"){
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextNewTextUser " + N + " " + SN + "\" onclick=\"OnClickNextNewTextUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }else if(Name == "ImgPencil"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextEditTextUser " + N + " " + SN + " " + TN  + "\" onclick=\"OnClickNextNewTextUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"OnClickImgExit()\">";
    }
}
function OnFocusTextError(id){ // Всплывающее меню. Создание текста. Ошибка. Фокус на поле ввода
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    ErrorNewNumber.innerHTML="";
}
function OnChangeCheckboxText(id){// Всплывающее меню. Создание текста. Чекбокс: "указать необходимое слово/текст"
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let DivIndicatedText = document.getElementById("DivIndicatedText");

    ErrorNewNumber.innerHTML="";
    if(TextCheckbox.checked == true){
        DivIndicatedText.removeAttribute("hidden");
    }else
        DivIndicatedText.setAttribute("hidden","hidden");
}
function OnClickNextNewTextUser(id){//Всплывающее меню. Создание текста. Кнопка далее
    let Name = NameOfElement(id);
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    let InputText = document.getElementById("InputText");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let IndicatedText = document.getElementById("IndicatedText");
    let TagText = document.getElementById("TagText");
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    let AddNewPanel = document.getElementById("AddNewPanel");
    if(IndicatedText.value.replace(/\s+/g, '') == "" && TextCheckbox.checked == true && InputText.classList.contains('active')){
        ErrorNewNumber.innerHTML = "Ошибка! Введите необходимое слово или текст";
        return 0;
    }else if(TextCheckbox.checked == true && IndicatedText.value.length > 30 && InputText.classList.contains('active') ){
        ErrorNewNumber.innerHTML = "Ошибка! Слово или текст не должно превышать 30 символов"
        return 0;
    }
    else if(((document.getElementsByClassName('TagDiv')).length) == 0 && TagText.checked == true){
        ErrorNewNumber.innerHTML = "Ошибка! Укажите необходимые теги"
        return 0;
    }
    AddNewPanel.setAttribute("hidden","hidden");

    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let DivRecInVariableNumber = document.createElement('div');
    let FormCheckbox = document.createElement('form');
    let DivIndicatedVariableNumber = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий  
     //----------Создание панели выбора действий-----------
     divAddNewInstrumentPanel.className="AddNewPanel";
     divAddNewInstrumentPanel.setAttribute("id","AddNewPanel1");
     NewInstrumentPanel.prepend(divAddNewInstrumentPanel);
     //----------Создание кнопки закрытия панели выбора действий-----------
     divImgExit.className="ImgExit";
     divImgExit.setAttribute("onclick","OnClickImgExit()");
     divAddNewInstrumentPanel.prepend(divImgExit);
     divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">" 

     //----------------Добавление блока с надписью----------------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Записать введеное пользователем слово или текст в переменную?";
     //----------------Создание блока в котором чекбокс и поле выбора переменной---------------
     DivRecInVariableNumber.setAttribute("id","DivRecInVariableNumber");
     divAddNewInstrumentPanel.append(DivRecInVariableNumber);
    //----------------Создание чекбокса для выбора переменной---------------
    FormCheckbox.className = "FormCheckbox";
    DivRecInVariableNumber.append(FormCheckbox);
    if(InputText.checked && !TextCheckbox.checked){
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" disabled=\"disabled\" checked=\"checked\" id=\"RecInVariableNumber\" onchange=\"OnChangeCheckboxRecInVariableNumber(id)\">" +
        "<label for=\"RecInVariableNumber\">Да, записать</label>"; 
    }
    else{
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"RecInVariableNumber\" onchange=\"OnChangeCheckboxRecInVariableNumber(id)\">" +
        "<label for=\"RecInVariableNumber\">Да, записать</label>";
    }
    //----------------Создание поля для выбора переменной---------------
    DivIndicatedVariableNumber.setAttribute("id","DivIndicatedVariableNumber");
    if(InputText.checked && !TextCheckbox.checked){
        
    }else{
        DivIndicatedVariableNumber.setAttribute("hidden","hidden");
    }
    DivRecInVariableNumber.append(DivIndicatedVariableNumber);
    DivIndicatedVariableNumber.innerHTML = "<label>Выберите переменную:" +
    "<select class=\"Select\" id=\"Select\">" + 
    "<option>Text</option>" +
    "<option>Text2</option>" +
    "</select>"+
    "</label>";
    //----------------Создание подписи блока вывода ошибки---------------     
    LabelError.className = "LabelError";
    LabelError.setAttribute("id","ErrorNewNumber");
    divAddNewInstrumentPanel.append(LabelError);
    //----------------Создание формы с кнопками---------------    
    formBtn.setAttribute("id","formNewNumber")
    divAddNewInstrumentPanel.append(formBtn);
    if(Name == "NextEditTextUser"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveEditTextUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickSaveEditTextUser(id)\">" + 
        "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewText " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }
    else{
        formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveNewTextUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewTextUser(id)\">" + 
        "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewText " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }
}
function OnChangeCheckRadioText(id){//Всплывающее меню. Создание текста. Изменение радио 
    let InputText = document.getElementById("InputText");
    let DivText = document.getElementById("DivText");
    let TagText = document.getElementById("TagText");
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    let DivTagText = document.getElementById("DivTagText");

    ErrorNewNumber.innerHTML="";
    if(id == "InputText"){
        DivText.removeAttribute("hidden");  
        InputText.classList.add('active');
        TagText.classList.remove('active')
        DivTagText.setAttribute("hidden","hidden");
    }else if(id == "TagText"){
        DivText.setAttribute("hidden","hidden");
        DivTagText.removeAttribute("hidden");
        InputText.classList.remove('active');  
        TagText.classList.add('active');
    }
}
function OnClickAddNewTag(id){//Всплывающее меню. Создание текста. Создание тега 
    let Name = document.getElementById(id);
    let TagBlock = document.getElementById("TagBlock");
    let InputTagText = document.getElementById("InputTagText");
    let ErrorNewNumber = document.getElementById("ErrorNewNumber");
    if(InputTagText.value.length > 30){
        ErrorNewNumber.innerHTML = "Ошибка!Длина текста не должна превышать 30 символов";
        return 0;
    }
    if(InputTagText.value.replace(/\s+/g, '') != ""){//если нет пробелов
        ErrorNewNumber.innerHTML = "";
        let TagDiv = document.createElement('div');
        let Tag = document.createElement('div');
        if(!Name.classList.contains('notfirst')){
            Name.classList.add('notfirst');        
            TagBlock.removeAttribute('hidden');

            TagDiv.className = "TagDiv";
            TagDiv.setAttribute("id","TagDiv 1");
            TagBlock.append(TagDiv);

            Tag.className = "Tag";
            Tag.setAttribute("id","Tag 1");
            Tag.setAttribute("onclick","OnClickTag(id)")
            TagDiv.append(Tag);
            Tag.innerHTML=InputTagText.value;
            TagKol++;
            Name.setAttribute("id","AddNewTag 1");
        }else if(TagKol < 10){
            let N = Number(NumberOfElement(id));
            N++;    
            TagDiv.className = "TagDiv";
            TagDiv.setAttribute("id","TagDiv " + N);
            TagBlock.append(TagDiv);

            Tag.className = "Tag";
            Tag.setAttribute("id","Tag " + N);
            Tag.setAttribute("onclick","OnClickTag(id)")
            TagDiv.append(Tag);
            Tag.innerHTML=InputTagText.value;
            TagKol++;
            Name.setAttribute("id","AddNewTag " + N);
        }else if(TagKol >= 10){
            ErrorNewNumber.innerHTML = "Ошибка!Кол-во тегов на один элемент не может превышать 10"
        }
        InputTagText.value = "";
    }else{//вывод ошибки если есть пробелы в поле ввода тегов
        ErrorNewNumber.innerHTML = "Ошибка! Пожалуйста, введите необходимое слово или текст";
    }
}
function OnClickTag(id){//Всплывающее меню. Создание текста. клик по тегу
    let Name = document.getElementById(id);
    let N = NumberOfElement(id);
    let TagDiv = document.getElementById("TagDiv " + N);

    if(!Name.classList.contains('active')){
        let DeleteTag = document.createElement('div');
        DeleteTag.setAttribute("id","DeleteTag " + N);
        DeleteTag.className = "DeleteTag";
        DeleteTag.setAttribute("onclick","OnClickDeleteTag(id)");
        TagDiv.append(DeleteTag);
        DeleteTag.innerHTML = "Удалить";
        Name.classList.add('active');
    }else{
        let DeleteTag = document.getElementById("DeleteTag " + N);
        DeleteTag.remove();
        Name.classList.remove('active');
    }
}
function OnClickDeleteTag(id){//Всплывающее меню. Создание текста. удаление тега
    let flag = false;
    let N = NumberOfElement(id);
    let TagDiv = document.getElementById("TagDiv " + N);
    let AddNewTag = document.getElementsByClassName('BtnOther');
    TagDiv.remove();
    if(((document.getElementsByClassName('TagDiv')).length) != 0){
        flag = true;
    }
    TagKol--;
    alert(TagKol);
    if(flag == false){
        let TagBlock = document.getElementById("TagBlock");
        TagBlock.setAttribute("hidden","hidden");
        AddNewTag[0].classList.remove('notfirst');
    }
}
function OnMouseOverUserPanel(id){ //Панель. Мышь над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN );
    TrashImg.setAttribute("style","opacity: 100;");
    ImgPencil.setAttribute("style","opacity: 100;");
}
function OnMouseOutUserPanel(id){ //Панель. Мышь не над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivJumpIndicator = document.getElementById("DivJumpIndicator " + N + " " + SN + " " + TN);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN )
    TrashImg.setAttribute("style","opacity: 0;");
    ImgPencil.setAttribute("style","opacity: 0;");
}
function OnClickSaveNewButtonUser(id){//Всплывающая панель.Создание кнопки.Кнопка сохранения
    let NewButtonText1 = document.getElementById("NewButtonText");
    if(NewButtonText1.classList.contains('invalid')){//если есть ошибка
        return 0;
    }
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let NewButtonText = document.getElementById("NewButtonText").value;
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserButton = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivFormUser = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    OnClickImgExit();

    ElementKol++;

    /// остальная логика
    //----------Создание блока в котором размещается кнопка и весь элемент кнопки------
    DivUserButton.className = "DivUserButton";
    DivUserButton.setAttribute("id","DivUserButton " + N + " " + SN + " " + ElementKol);
    DivUserButton.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserButton.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserButton);
     //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserButton.append(LabelElementUser);
    LabelElementUser.innerHTML = "Нажатие на кнопку";
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveButtonUser(id)");
    DivUserButton.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickEditButtonUser(id)");
    DivUserButton.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока самой кнопки------
    DivFormUser.className = "DivFormUser";
    DivUserButton.append(DivFormUser);
    DivFormUser.innerHTML = "<form class=\"FormButton\">" +
    "<input type=\"button\" name=\"button\" class=\"ButtonUser\" id=\"ButtonUser " + N + " " + SN + " " + ElementKol  + "\" value=\"" + NewButtonText + "\">" +
    "</form>";
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
    DivUserButton.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
}
function OnClickRemoveButtonUser(id){//Панель. Удаление кнопки
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivUserButton = document.getElementById("DivUserButton " + N + " " + SN + " " + TN);
    DivUserButton.remove();
}
function OnClickEditButtonUser(id){//Панель. Редактирование кнопки
    OnClickAddButtonUser(id);//Создание всплывающей панели редактирования
}
function OnClickSaveEditButtonUser(id){//Всплывающая панель. Редактирование кнопки
    let NewButtonText = document.getElementById("NewButtonText");
    if(NewButtonText.classList.contains('invalid')){//если есть ошибка
        return 0;
    }
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let ButtonUser = document.getElementById("ButtonUser " + N + " " + SN + " " + TN);
    ButtonUser.setAttribute("value","" + NewButtonText.value);
    OnClickImgExit();
}
function OnClickRemoveEmailUser(id){//Панель. Удаление Email
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivUserEmail = document.getElementById("DivUserEmail " + N + " " + SN + " " + TN);
    DivUserEmail.remove();
}
function OnClickSaveEditEmailUser(id){//Всплывающая панель. Редактирование Email. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let Select = document.getElementById("Select");
    let UserEmailVariable = document.getElementById("UserEmailVariable " + N + " " + SN + " " + TN);
    UserEmailVariable.value = Select.options[Select.selectedIndex].value;
    OnClickImgExit();
}
function OnClickSaveNewEmailUser(id){//Всплывающая панель. Создание Email. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserEmailVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');

    ElementKol++;

    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserEmail " + N + " " + SN + " " + ElementKol);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    LabelElementUser.innerHTML = "Ввод email";
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveEmailUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddEmailUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока с переменной------
    let Select = document.getElementById("Select");
    DivUserEmailVariable.className = "DivFormUser";
    DivUserElement.append(DivUserEmailVariable);
    DivUserEmailVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputOther1\" id=\"UserEmailVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    OnClickImgExit();
}
function OnClickSaveNewTextUser(id){//Всплывающая панель.Создание текста. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserEmailVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    
    let InputText = document.getElementById("InputText");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let IndicatedText = document.getElementById("IndicatedText");
    let RecInVariableNumber = document.getElementById("RecInVariableNumber");
    let TagText = document.getElementById("TagText");

    ElementKol++;

    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserText " + N + " " + SN + " " + ElementKol);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    if(InputText.checked && TextCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод указанного текста";
    }
    else if(InputText.checked){
        LabelElementUser.innerHTML = "Ввод текста";
    }
    else if(TagText.checked){
        LabelElementUser.innerHTML = "Ввод текста (Чтение по тегам)";
    }
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveTextUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddTextUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока с указанным словом------
    if(InputText.checked && TextCheckbox.checked){
        let IndicatedTextUser = document.createElement('div');
        IndicatedTextUser.className = "IndicatedTextUser";
        IndicatedTextUser.setAttribute("id","IndicatedTextUser " + N + " " + SN + " " + ElementKol);
        DivUserElement.append(IndicatedTextUser);
        IndicatedTextUser.innerHTML = "<div class=\"LabelBlack\">" +
         "Текст:<input type=\"input\" class=\"InputOther1\" id=\"UserTextIdicated " + N + " " + SN + " " + ElementKol + "\" value=\"" + IndicatedText.value + "\" readonly=\"readonly\"></div>";
    }
    //----------Создание блока с тегами------
    if(TagText.checked){
        let TagTextUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        //сам блок
        TagTextUser.className="TagTextUser";
        TagTextUser.setAttribute("id","TagTextUser " + N + " " + SN + " " + ElementKol);
        DivUserElement.append(TagTextUser);
        //надпись
        LabelBlack.className = "LabelBlack";
        LabelBlack.setAttribute("id","TagLabel " + N + " " + SN + " " + ElementKol);
        TagTextUser.append(LabelBlack);
        LabelBlack.innerHTML = "Теги: ";
        //теги
        let Tag = document.getElementsByClassName("Tag");
        for(let i = 0; i < Tag.length;i++){
            let TagOnPanel = document.createElement('div');
            TagOnPanel.className = "TagOnPanel";
            TagOnPanel.setAttribute("id","TagOnPanel " + N + " " + SN + " " + ElementKol + " " + i);
            LabelBlack.append(TagOnPanel);
            TagOnPanel.innerHTML = Tag[i].innerHTML;
        }
    }
    //----------Создание блока с переменной------
    if(RecInVariableNumber.checked){
        let Select = document.getElementById("Select");
        DivUserEmailVariable.className = "DivFormUser";
        DivUserElement.append(DivUserEmailVariable);
        DivUserEmailVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputOther1\" id=\"UserTextVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    }
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    OnClickImgExit();
}
function OnClickSaveEditTextUser(id){//Всплывающая панель. Редактирование текста. Кнопка сохранить
    TagKol = 0;
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserEmailVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    let DivUserText = document.getElementById("DivUserText " + N + " " + SN + " " + TN);
    DivUserText.remove();

    let InputText = document.getElementById("InputText");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let IndicatedText = document.getElementById("IndicatedText");
    let RecInVariableNumber = document.getElementById("RecInVariableNumber");
    let TagText = document.getElementById("TagText");

    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserText " + N + " " + SN + " " + TN);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    if(InputText.checked && TextCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод указанного текста";
    }
    else if(InputText.checked){
        LabelElementUser.innerHTML = "Ввод текста";
    }
    else if(TagText.checked){
        LabelElementUser.innerHTML = "Ввод текста (Чтение по тегам)";
    }
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveTextUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + TN);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddTextUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока с указанным словом------
    if(InputText.checked && TextCheckbox.checked){
        let IndicatedTextUser = document.createElement('div');
        IndicatedTextUser.className = "IndicatedTextUser";
        IndicatedTextUser.setAttribute("id","IndicatedTextUser " + N + " " + SN + " " + TN);
        DivUserElement.append(IndicatedTextUser);
        IndicatedTextUser.innerHTML = "<div class=\"LabelBlack\">" +
         "Текст:<input type=\"input\" class=\"InputOther1\" id=\"UserTextIdicated " + N + " " + SN + " " + TN + "\" value=\"" + IndicatedText.value + "\" readonly=\"readonly\"></div>";
    }
    //----------Создание блока с тегами------
    if(TagText.checked){
        let TagTextUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        //сам блок
        TagTextUser.className="TagTextUser";
        TagTextUser.setAttribute("id","TagTextUser " + N + " " + SN + " " + TN);
        DivUserElement.append(TagTextUser);
        //надпись
        LabelBlack.className = "LabelBlack";
        LabelBlack.setAttribute("id","TagLabel " + N + " " + SN + " " + TN);
        TagTextUser.append(LabelBlack);
        LabelBlack.innerHTML = "Теги: ";
        //теги
        let Tag = document.getElementsByClassName("Tag");
        for(let i = 0; i < Tag.length;i++){
            let TagOnPanel = document.createElement('div');
            TagOnPanel.className = "TagOnPanel";
            TagOnPanel.setAttribute("id","TagOnPanel " + N + " " + SN + " " + TN + " " + i);
            LabelBlack.append(TagOnPanel);
            TagOnPanel.innerHTML = Tag[i].innerHTML;
        }
    }
    //----------Создание блока с переменной------
    if(RecInVariableNumber.checked){
        let Select = document.getElementById("Select");
        DivUserEmailVariable.className = "DivFormUser";
        DivUserElement.append(DivUserEmailVariable);
        DivUserEmailVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputOther1\" id=\"UserTextVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    }
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + TN);
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" id =\"JumpIndicator " + N + " " + SN + " " + TN + "\"></div>";
    OnClickImgExit();
}
function OnClickRemoveTextUser(id){//Панель. Пользователь. Удаление элемента текста
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivUserText = document.getElementById("DivUserText " + N + " " + SN  + " " + TN);
    DivUserText.remove();
}
function OnClickJump(id){
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let Panel = document.getElementById("Panel " + N + " " + SN);
    let Panel3 = document.getElementById("Panel 2 3");

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let Constructor = document.getElementById("Constructor");
    alert(Panel.offsetLeft + " " + Panel.offsetTop);
   // alert(Panel.offsetWidth + " " + Panel.offsetHeight);
    //alert(Panel3.offsetLeft + " " + Panel3.offsetTop);
    //alert(Panel3.offsetWidth + " " + Panel3.offsetHeight);
    ctx.beginPath();
    ctx.moveTo(140,20);
    ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
    //ctx.moveTo(event.clientX,event.clientY);
    //ctx.bezierCurveTo(event.clientX,event.clientY, Panel3.offsetLeft, Panel3.offsetHeight,Panel3.offsetLeft, Panel3.offsetHeight);
    ctx.stroke();
}
function OnClickConstructor(){
    //alert(event.clientX+':'+event.clientY)
}