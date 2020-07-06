

var TagKol = 0;//кол-во тегов

function GetNameOfElement(id) { //получение имени эллемента
    return (id.split(' ')[0]);
}
function GetNumberOfElement(id) { //получение номера элемента
    return (id.split(' ')[1]);
}
function GetSecondNumberOfElement(id) { //получение второго номера эллемента(необходимо для кнопки добавления новой панели)
    return (id.split(' ')[2]);
}
function GetThirdNumberOfElement(id) {//получение третьего номера эллемента(под элементы панели(кнопки/текст и т.д))
    return (id.split(' ')[3]);
}


window.onload = function () {
    RefreshArrows();
}
function DisabledNavbarBtn() {//отключение кнопок находящихся в шапке сайта
    let NewVariableBtn = document.getElementById("NewVariableBtn");//кнопка добавления новой переменной(переменная необходима для блокирования доступа к кнопке)
    let TestBtn = document.getElementById("TestBtn");//кнопка тестирования(переменная необходима для блокирования доступа к кнопке)
    let SaveBtn = document.getElementById("SaveBtn");//кнопка сохранения(переменная необходима для блокирования доступа к кнопке)
    let PublishBtn = document.getElementById("PublishBtn");//кнопка публицкации(переменная необходима для блокирования доступа к кнопке)
    //----------Отключение кнопок в Navbar-----------
    NewVariableBtn.setAttribute("disabled", "disabled");
    TestBtn.setAttribute("disabled", "disabled");
    SaveBtn.setAttribute("disabled", "disabled");
    PublishBtn.setAttribute("disabled", "disabled");
}
function EnabledNavbarBtn() {//включение кнопок находящихся в шапке сайта
    let NewVariableBtn = document.getElementById("NewVariableBtn");//кнопка добавления новой переменной(переменная необходима для блокирования доступа к кнопке)
    let TestBtn = document.getElementById("TestBtn");//кнопка тестирования(переменная необходима для блокирования доступа к кнопке)
    let SaveBtn = document.getElementById("SaveBtn");//кнопка сохранения(переменная необходима для блокирования доступа к кнопке)
    let PublishBtn = document.getElementById("PublishBtn");//кнопка публицкации(переменная необходима для блокирования доступа к кнопке)
    //----------Включение кнопок в Navbar-----------
    NewVariableBtn.removeAttribute("disabled");
    TestBtn.removeAttribute("disabled");
    SaveBtn.removeAttribute("disabled");
    PublishBtn.removeAttribute("disabled");
}
function CreateWindowPanel() { //Создание Всплывающего окна(основа)
    let body = document.body
    let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран
    let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий  
    //----------Создание фиксированной панели-----------
    divNewInstrumentPanel.className = "NewInstrumentPanel";
    divNewInstrumentPanel.setAttribute("id", "NewInstrumentPanel");
    body.prepend(divNewInstrumentPanel);
    //----------Создание панели выбора действий-----------
    divAddNewInstrumentPanel.className = "AddNewPanel";
    divAddNewInstrumentPanel.setAttribute("id", "AddNewPanel");
    divNewInstrumentPanel.prepend(divAddNewInstrumentPanel);
    //----------Создание кнопки закрытия панели выбора действий-----------
    divImgExit.className = "ImgExit";
    divImgExit.setAttribute("onclick", "OnClickImgExit()");
    divImgExit.setAttribute("id", "ImgExit");
    divAddNewInstrumentPanel.prepend(divImgExit);
    divImgExit.innerHTML = "<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">"
}
function OnClickImgExit() {//закрытие всплывающего окна 
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel);
    EnabledNavbarBtn();
    TagKol = 0;
}
function RemoveArrowFromElement(id) {
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);

    let JumpIndicator = document.getElementById("JumpIndicator " + N + " " + SN + " " + TN);
    if (JumpIndicator.classList.contains('ActiveJumpIndicator')) {
        let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
        let Panel = document.getElementById(Canvas.getAttribute('data-connect'));
        let RemoveConnect = document.getElementById("RemoveConnect " + N + " " + SN + " " + TN);
        if (JumpIndicator.classList.contains('Active')) {
            JumpIndicator.classList.remove('Active')
        }
        ReplaceAttribute(id);
        Panel.removeAttribute('data-connect');
        RemoveConnect.remove();
        Canvas.remove();
        JumpIndicator.classList.remove('ActiveJumpIndicator');
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
