//Используется  NameOfElement(id) из Service.js
//Используется  NumberOfElement(id) из Service.js
//Используется  SecondNumberOfElement(id) из Service.js
//Используется  ThirdNumberOfElement(id) из Service.js
//Используется  CreateWindowPanel() из Service.js
//Используется  DisabledNavbarBtn() из Service.js
//Используется  переменная ElementKol из Service.js


function OnClickAddConditionBtn(id){//Создание всплывающего окна создания условий
    CreateWindowPanel();
    DisabledNavbarBtn();
    
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let AddNewPanel = document.getElementById("AddNewPanel");
    let Label = document.createElement('div');
    let DivInputCondition = document.createElement('div');
    let formConditionBtn = document.createElement('form');

    //----------Надпись----------
    Label.className="Label";
    AddNewPanel.append(Label);
    Label.innerHTML="Введите JavaScript выражение";
    //----------Инпут для ввода выражения----------
    DivInputCondition.className="DivInputCondition";
    DivInputCondition.setAttribute("id","DivInputCondition " + N + " " + SN);
    AddNewPanel.append(DivInputCondition);
    if(NameOfElement(id) == "ImgPencil"){//если режим редактирования
        let TN = ThirdNumberOfElement(id);
        let InputConditionPanel = document.getElementById("InputConditionPanel " + N + " " + SN + " " + TN);
        DivInputCondition.innerHTML = "<input type=\"text\" value=\"" + InputConditionPanel.value + "\" class=\"InputCondition\" id=\"NewInputCondition " + N + " " + SN + "\">";
    }else{
        DivInputCondition.innerHTML = "<input type=\"text\" class=\"InputCondition\" id=\"NewInputCondition " + N + " " + SN + "\">";
    }
    //----------Форма с кнопками----------
    formConditionBtn.setAttribute("id","formConditionBtn " + N + " " + SN);
    AddNewPanel.append(formConditionBtn);
    if(NameOfElement(id) == "ImgPencil"){//если режим редактирования
        let TN = ThirdNumberOfElement(id);
        formConditionBtn.innerHTML = "<input type=\"button\" class=\"AddBtn\" id=\"AddNewCondition " + N + " " + SN +  " " + TN  + "\" value=\"Сохранить\" onclick=\"OnClickEditCondition(id)\">" + 
            "<input type=\"button\" class=\"AddBtn\" id=\"CancelCondition " + N + " " + SN + " " + TN + "\" value=\"Отмена\" onclick=\"OnClickImgExit()\">";
    }else{
        formConditionBtn.innerHTML = "<input type=\"button\" class=\"AddBtn\" id=\"AddNewCondition " + N + " " + SN + "\" value=\"Сохранить\" onclick=\"OnClickAddNewCondition(id)\">" + 
        "<input type=\"button\" class=\"AddBtn\" id=\"CancelCondition " + N + " " + SN + "\" value=\"Отмена\" onclick=\"OnClickImgExit()\">";
    }
}

function OnMouseOverConditionPanel(id){ //Панель. Мышь над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN );
    TrashImg.setAttribute("style","opacity: 100;");
    ImgPencil.setAttribute("style","opacity: 100;");
}
function OnMouseOutConditionPanel(id){ //Панель. Мышь не над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN )
    TrashImg.setAttribute("style","opacity: 0;");
    ImgPencil.setAttribute("style","opacity: 0;");
}
function OnClickAddNewCondition(id){//Всплывающее окно. Создание условия. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let NewInputCondition = document.getElementById("NewInputCondition " + N + " " + SN);
    let formAddCondition = document.getElementById("formAddCondition " + N + " " + SN);
    let DivConditionElement = document.createElement('div');
    let LabelElementCondition = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivInputConditionPanel = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');

    ElementKol++;

     //----------Создание блока в котором размещается весь элемент------
     DivConditionElement.className = "DivConditionElement";
     DivConditionElement.setAttribute("id","DivConditionElement " + N + " " + SN + " " + ElementKol);
     DivConditionElement.setAttribute("onmouseover","OnMouseOverConditionPanel(id)");
     DivConditionElement.setAttribute("onmouseout","OnMouseOutConditionPanel(id)");
     formAddCondition.before(DivConditionElement);
     //----------Создание блока надписи названия элемента------
     LabelElementCondition.className = "LabelElementCondition";
     DivConditionElement.append(LabelElementCondition);
     LabelElementCondition.innerHTML = "Условие";
     //----------Создание блока мусорки(удаления элемента) и самой мусорки------
     TrashImg.className = "TrashImg";
     TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
     TrashImg.setAttribute("style","opacity: 0");
     TrashImg.setAttribute("title","удалить этот элемент");
     TrashImg.setAttribute("onclick","OnClickRemoveCondition(id)");
     DivConditionElement.append(TrashImg);
     TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
     //----------Создание блока карандаша(редактирования элемента)------
     ImgPencilInstrument.className = "ImgPencilInstrument";
     ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
     ImgPencilInstrument.setAttribute("style","opacity: 0");
     ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
     ImgPencilInstrument.setAttribute("onclick","OnClickAddConditionBtn(id)");
     DivConditionElement.append(ImgPencilInstrument);
     ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
     //----------Создание блока c инпутом------
     DivInputConditionPanel.className = "DivInputConditionPanel";
     DivInputConditionPanel.setAttribute("id","DivInputConditionPanel " + N + " " + SN + " " + ElementKol);
     DivConditionElement.append(DivInputConditionPanel);
     DivInputConditionPanel.innerHTML = "<input type=\"text\" class=\"InputConditionPanel\" readonly=\"readonly\" id=\"InputConditionPanel " + N + " " + SN + " " + ElementKol + "\" value = \"" +  NewInputCondition.value + "\">";
     //----------Создание джампера------
     DivJumpIndicator.className = "DivJumpIndicator";
     DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
     DivJumpIndicator.setAttribute("onmouseover","OnMouseOverDivJump(id)");
     DivJumpIndicator.setAttribute("onmouseout","OnMouseOutDivJump(id)");
     DivConditionElement.append(DivJumpIndicator);
     DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" onclick =\"OnClickJumpIndicator(id)\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
     OnClickImgExit();
     RefreshArrows();//Обновление стрелок
}
function OnClickEditCondition(id){//Всплывающее окно. Редактирование условия. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let NewInputCondition = document.getElementById("NewInputCondition " + N + " " + SN);
    let InputConditionPanel = document.getElementById("InputConditionPanel " + N + " " + SN + " " + TN);

    InputConditionPanel.setAttribute("value",NewInputCondition.value);
    OnClickImgExit();
    RefreshArrows();//Обновление стрелок

}
function OnClickRemoveCondition(id){//Панель. Удаление элемента условия
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivConditionElement = document.getElementById("DivConditionElement " + N + " " + SN + " " + TN);

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

    DivConditionElement.remove();
    RefreshArrows();//Обновление стрелок
}