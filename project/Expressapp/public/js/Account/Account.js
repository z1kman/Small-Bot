function AddNewProject(){
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.removeAttribute('style');
    /*
    let NewInstrumentPanel = document.createElement('div');
    let AddNewPanel = document.createElement('div');
    let ImgExit = document.createElement('div');
    let LabelOther = document.createElement('div');
    let form = document.createElement('form');

    //-------Создание окна на весь экран-----
    NewInstrumentPanel.className = "NewInstrumentPanel";
    NewInstrumentPanel.setAttribute("id","NewInstrumentPanel");
    document.body.prepend(NewInstrumentPanel);
    //-------Создания окна со всем-----
    AddNewPanel.className = "AddNewPanel";
    AddNewPanel.setAttribute("id","AddNewPanel");
    NewInstrumentPanel.append(AddNewPanel);
    //------Кнопка закрытия окна------- 
    ImgExit.className = "ImgExit";
    ImgExit.setAttribute("onclick","OnClickImgExit()");
    AddNewPanel.append(ImgExit);
    ImgExit.innerHTML=" <img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">";
    //-------Надпись в окне-------
    LabelOther.className = "LabelOther";
    AddNewPanel.append(LabelOther);
    LabelOther.innerHTML = "Введите название проекта";
    //-------создание формы и блока с ошибкой-------
    AddNewPanel.append(form);
    form.innerHTML = "<input type=\"input\" class=\"Input\" name=\"NameProject\">" + 
        "<br />" +
        "<div class=\"Error\" id=\"Error\">" +
        "</div>" + 
        "<input type=\"submit\" value=\"Создать\" class=\"AddBtn\">";
        */
}
function OnClickImgExit(){
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.setAttribute('style','visibility:hidden;');
}