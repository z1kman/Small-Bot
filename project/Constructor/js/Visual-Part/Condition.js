//Используется  NumberOfElement(id) из Service.js
//Используется  SecondNumberOfElement(id) из Service.js
//Используется  CreateWindowPanel() из Service.js
//Используется  DisabledNavbarBtn() из Service.js


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
    DivInputCondition.innerHTML = "<input type=\"text\" class=\"InputCondition\" id=\"NewInputCondition " + N + " " + SN + "\">";
    //----------Форма с кнопками----------
    formConditionBtn.setAttribute("id","formConditionBtn " + N + " " + SN);
    AddNewPanel.append(formConditionBtn);
    formConditionBtn.innerHTML = "<input type=\"button\" class=\"AddBtn\" id=\"AddNewCondition " + N + " " + SN + "\" value=\"Сохранить\" onclick=\"OnClickAddNewCondition(id)\">" + 
        "<input type=\"button\" class=\"AddBtn\" id=\"CancelCondition " + N + " " + SN + "\" value=\"Отмена\" onclick=\"OnClickImgExit()\">";
}
function OnClickAddNewCondition(id){
    
}