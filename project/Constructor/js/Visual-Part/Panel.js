
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
    let Panel = document.getElementById("Panel " + N + " " + SN)
        
    if(Panel.hasAttribute('data-connect') == true){//проверка на подключение к другой панели или элементу
        alert();
        let IdConnect = Panel.getAttribute('data-connect');
        let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(IdConnect) + " " + SecondNumberOfElement(IdConnect) + " " + ThirdNumberOfElement(IdConnect));
        OnClickRemoveConnect(RemoveConnect.getAttribute('id'));
        document.getElementById("Panel " + N + " " + SN).parentNode.removeChild(document.getElementById("Panel " + N + " " + SN )); //удаление панели
    }else{
        document.getElementById("Panel " + N + " " + SN).parentNode.removeChild(document.getElementById("Panel " + N + " " + SN )); //удаление панели
        RefreshArrows();
    }
    formAddInstrumentBtn = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
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
    RefreshArrows();
}
