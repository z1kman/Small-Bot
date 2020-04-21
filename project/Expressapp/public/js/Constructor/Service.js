var TagKol = 0;//кол-во тегов
let timerId1;
function NameOfElement(id){ //получение имени эллемента
    return(id.split(' ')[0]);
}
function NumberOfConnect(id){ //получение номера подключения
    return(id.split('-')[2]);
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
function NumberOfFunction(id){ //получение номера функции
    return(id.split('_')[1]);
}
function SecondNumberOfFunction(id){ //получение второго номера функции
    return(id.split('_')[2]);
}
function ThirdNumberOfFunction(id){//получение третьего номера функции
    return(id.split('_')[3]);
}

window.onload = function() {
    RefreshArrows();
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
     divImgExit.setAttribute("id","ImgExit");
     divAddNewInstrumentPanel.prepend(divImgExit);
     divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">" 
}
function OnClickImgExit(){//закрытие всплывающего окна 
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel);
    EnabledNavbarBtn();
    TagKol = 0;
}
function RemoveArrowFromElement(id){
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);

    let JumpIndicator = document.getElementById("JumpIndicator " + N + " " + SN  + " " + TN); 
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
        let Panel = document.getElementById(Canvas.getAttribute('data-connect'));
        let RemoveConnect = document.getElementById("RemoveConnect " + N + " " + SN + " " + TN);
        if(JumpIndicator.classList.contains('Active')){
            JumpIndicator.classList.remove('Active')
        }
        ReplaceAttribute(id);
        Panel.removeAttribute('data-connect');
        RemoveConnect.remove();
        Canvas.remove();
        JumpIndicator.classList.remove('ActiveJumpIndicator');
    }
}

function SubmImg(id){
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let filedata = document.getElementById("filedata " + N + " " + SN);
    let SaveNewImage = document.getElementById("SaveNewImage " + N + " " + SN);
    let LabelError = document.getElementById('LabelError');
    let LabelImg = document.getElementById('LabelImg');
    let formUploadImg = document.getElementById("formUploadImg");
    let SubmitImg = document.getElementById("SubmitImg " + N + " " + SN);
    let ImgExit = document.getElementById("ImgExit");
    let CancelUser  = document.getElementById("CancelUser " + N + " " + SN);
    CancelUser.setAttribute(onclick,CancelUser.getAttribute('onclick') + ' clearTimeout(timerId1);');
    ImgExit.setAttribute(onclick,ImgExit.getAttribute('onclick') + '; clearTimeout(timerId1);');

    let i = 0;
    clearTimeout(timerId1);
    LabelImg.innerHTML = "";
    LabelError.innerHTML = "";
    if(filedata.value == ""){
        SaveNewImage.setAttribute('disabled','disabled');
        LabelImg.innerHTML = ""
        LabelError.innerHTML = "Ошибка! Необходимо выбрать файл!"
        return;
    }

    deleteCookie("FileName");
    formUploadImg.submit();

     timerId1 = setTimeout(function tick() {//запуск ожидания куков
        if(i > 3){//если лимит ожидания в две минуты превышен
            LabelImg.innerHTML = ""
            LabelError.innerHTML = "Ошибка! Файл не загружен. Лимит ожидания превышен";
        }else if(getCookie('FileName') == undefined){//пока куки не найдены
            if(i % 2 == 0){
                LabelImg.innerHTML = "Загрузка файла."
            }else{
                LabelImg.innerHTML = "Загрузка файла.."
            }
            LabelError.innerHTML = ""
            timerId1 = setTimeout(tick, 1000); // запуск цикла еще раз  
            i++;
        }else if(getCookie('FileName') != undefined && filedata.value != "" ){
            LabelError.innerHTML = "";
            SubmitImg.setAttribute('disabled','disabled');
            LabelImg.innerHTML = "Файл успешно загружен!"
            SaveNewImage.removeAttribute('disabled');
        }

    });
}
function FileOpen(id){
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let SaveNewImage = document.getElementById("SaveNewImage " + N + " " + SN);
    let filedata = document.getElementById("filedata " + N + " " + SN);
    let LabelError = document.getElementById('LabelError');
    let LabelImg = document.getElementById('LabelImg');
    let SubmitImg = document.getElementById("SubmitImg " + N + " " + SN);
    LabelImg.innerHTML = ""
    LabelError.innerHTML = ""
    SaveNewImage.setAttribute('disabled','disabled');
    SubmitImg.removeAttribute('disabled');
    deleteCookie("FileName");
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
  