var NumberOfPanels = 1;//Кол-во панелей
var ElementKol = 2;//кол-во элементов(для индексации - неотражает реальное кол-во элементов)
var NumberOfSection = 1;//кол-во боковых секций
var TagKol = 0;//кол-во тегов

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
function OnClickImgExit(){//закрытие всплывающего окна 
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel);
    EnabledNavbarBtn();
    TagKol = 0;
}
