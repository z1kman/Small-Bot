function NumberOfElement(id){ //получение номера эллемента
    return(id.split(' ')[1]);
}
var click = 0;
function OnClickEditPanelName(id){//редактирование имени панели(скрытие имени панели, появление инпута)
    var N =  NumberOfElement(id);
    var EditPanel = document.getElementById(id);
    var NamePanel = document.getElementById("NamePanel " + N);
    var Edit = document.getElementById("Edit " + N);
    var InputEdit = document.getElementById("InputEdit " + N);
    click++;

    EditPanel.setAttribute("style", "display: none;");
    InputEdit.setAttribute("style", "display: block;")
}
function OnClickInputEdit(id){ //редактирование имени панели(скрытие инпута, появление имени панели)
    click++;
    var N =  NumberOfElement(id);
    var EditPanel = document.getElementById("EditNamePanel " + N );
    var NamePanel = document.getElementById("NamePanel " + N);
    var Edit = document.getElementById("Edit " + N);
    var InputEdit = document.getElementById("InputEdit " + N);

    if(click > 2){
        EditPanel.setAttribute("style", "display:block;");
        InputEdit.setAttribute("style", "display: none;")
        click = 0;
        NamePanel.innerHTML = Edit.value;
        Edit.value = "";
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