function NumberOfElement(id){ //получение номера эллемента
    return(id.split(' ')[1]);
}
var click = 0;
function OnClickEditPanelName(id){//редактирование имени панели(скрытие имени панели, появление инпута)
    var N =  NumberOfElement(id);
    var EditNamePanel = document.getElementById(id);
    var NamePanel = document.getElementById("NamePanel " + N);
    var Edit = document.getElementById("Edit " + N);
    var InputEdit = document.getElementById("InputEdit " + N);
    click++;
    
    EditNamePanel.setAttribute("style", "display: none;");
    InputEdit.setAttribute("style", "display: block;")
    Edit.value = NamePanel.textContent;
}
function OnClickInputEdit(id){ //редактирование имени панели(скрытие инпута, появление имени панели)
    click++;
    var N =  NumberOfElement(id);
    var EditNamePanel = document.getElementById("EditNamePanel " + N );
    var NamePanel = document.getElementById("NamePanel " + N);
    var Edit = document.getElementById("Edit " + N);
    var Name = document.getElementById("name");
    var InputEdit = document.getElementById("InputEdit " + N);

    if(click > 2 && Edit.value!=""){
        EditNamePanel.setAttribute("style", "display:inline-block;");
        InputEdit.setAttribute("style", "display: none;")
        click = 0;
        NamePanel.innerHTML = Edit.value; //имя панели = имя отредактированного имени
        EditNamePanel.style.width = NamePanel.width + 30; //ширина панели
    }
    else if(Edit.value == "") //если не указано никакое имя
    {
        alert("Необходимо заполнить поле названия панели");
    }
}
function OnMouseOverEditPanelName(id){  //отображение иконки редактирования имени панели
    var ImgPencil= document.getElementById("ImgPencil " + NumberOfElement(id));
    ImgPencil.setAttribute("style","opacity:100;");
}
function OnMouseOutEditPanelName(id){//скрытие иконки редактирования имени панели
    var ImgPencil= document.getElementById("ImgPencil " + NumberOfElement(id));
    ImgPencil.setAttribute("style","opacity:0;");
}