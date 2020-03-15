//Используется  NumberOfElement(id) из Service.js
//Используется  SecondNumberOfElement(id) из Service.js
//Используется  CreateWindowPanel() из Service.js
//Используется  DisabledNavbarBtn() из Service.js


function OnClickAddConditionBtn(id){
    CreateWindowPanel();
    DisabledNavbarBtn();
    
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let AddNewPanel = document.getElementById("AddNewPanel");
    
}