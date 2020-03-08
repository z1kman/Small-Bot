
var click = 1;//Стрелки. кол-во нажатий в области конструктора
var mouse = { Xold:0, Yold:0, x:0,y:0};//Стрелки. для запоминания координат нажатия мыши 
var flagA = false;//Стрелки. Для проверки режима рисования стрелок
var IdOfParentJump = "";//Стрелки. Родительский элемент джампера

function OnClickEditPanelName(id){//редактирование имени панели(скрытие имени панели, появление инпута)
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let EditNamePanel = document.getElementById("EditNamePanel " + N + " " + SN );
    let NamePanel = document.getElementById("NamePanel "  + N + " " + SN);
    let Edit = document.getElementById("Edit "  + N + " " + SN);
    let InputEdit = document.getElementById("InputEdit "  + N + " " + SN);
    let TrashImg = document.getElementById("TrashImg "  + N + " " + SN);
    let ImgPencil = document.getElementById("ImgPencil "  + N + " " + SN);
    if (!InputEdit.classList.contains('visible')){
        InputEdit.classList.add('visible');
        TrashImg.setAttribute("hidden","hidden");
        EditNamePanel.setAttribute("hidden","hidden");
        InputEdit.removeAttribute("hidden");
        NamePanel.setAttribute("hidden","hidden");
        ImgPencil.setAttribute("hidden","hidden");
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
    let ImgPencil = document.getElementById("ImgPencil "  + N + " " + SN);

    if(InputEdit.classList.contains('visible') && InputEdit.classList.contains('click') && Edit.value!=""){
        InputEdit.classList.remove('click');
        InputEdit.classList.remove('visible');
        EditNamePanel.removeAttribute("hidden");
        ImgPencil.removeAttribute("hidden");
        InputEdit.setAttribute("hidden", "hidden")
        NamePanel.removeAttribute("hidden");
        NamePanel.innerHTML = Edit.value; //имя панели = имя отредактированного имени
        EditNamePanel.style.width = NamePanel.width + 30; //ширина панели
        TrashImg.removeAttribute("hidden");
        oldNumberOfElement = N;
    }
    else if(Edit.value == "") //если не указано никакое имя
    {
           alert("Необходимо заполнить поле названия панели");
    }
    if(InputEdit.classList.contains('visible') && !InputEdit.classList.contains('click')){
        InputEdit.classList.add('click');
    }
}
function OnMouseOverEditPanelName(id){ //отображение иконки редактирования имени панели
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let ImgPencil= document.getElementById("ImgPencil " + N + " " + SN);
    ImgPencil.setAttribute("style","opacity:100;");
}
function OnMouseOutEditPanelName(id){//скрытие иконки редактирования имени панели
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let ImgPencil= document.getElementById("ImgPencil " + N + " " + SN);
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
    let flagB = false;
    let Panel = document.getElementById("Panel " + N + " " + SN);
    let Null = false;//Проверка на наличие бывших подключений
    let Connect = true;//наличие подключения
    let Canvases = document.getElementsByClassName("canvas");
    let CanvasesNumber = Canvases.length;
    let arrCanvas = [];
    for(let i=0; i<CanvasesNumber;i++){//запись всех элементов в массив
        arrCanvas[i] = Canvases[i];
    }
    //удаление кнопки "Добавить панель"
    formAddInstrumentBtn = document.getElementById("formAddInstrumentBtn " + N + " " + SN);
    formAddInstrumentBtn.parentNode.removeChild(formAddInstrumentBtn);//Удаление кнопки добавления новой панели 
    for (let i = 0; i<CanvasesNumber; i++){
            if(SecondNumberOfElement(arrCanvas[i].getAttribute('id')) == SecondNumberOfElement(id))
            {
                let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(arrCanvas[i].getAttribute('id')) + " " + SecondNumberOfElement(arrCanvas[i].getAttribute('id')) + " " + ThirdNumberOfElement(arrCanvas[i].getAttribute('id')));
                OnClickRemoveConnect(RemoveConnect.getAttribute('id'));
            }
    }

    while(Connect == true){//Поиск подключений
        if(Panel.hasAttribute('data-connect-0') == true){//проверка на подключение к другой панели или элементу
            let IdConnect = Panel.getAttribute('data-connect-0');
            let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(IdConnect) + " " + SecondNumberOfElement(IdConnect) + " " + ThirdNumberOfElement(IdConnect));
            OnClickRemoveConnect(RemoveConnect.getAttribute('id'));
            Connect == true;
            Null == true;  

        }else{//если подключения есть, то удаляются
            document.getElementById("Panel " + N + " " + SN).parentNode.removeChild(document.getElementById("Panel " + N + " " + SN )); //удаление панели      
            Connect = false;
            RefreshArrows();   
        }
    }

    if(Null == true){//если были хоть какие то подключения, то панель удаляется
        document.getElementById("Panel " + N + " " + SN).parentNode.removeChild(document.getElementById("Panel " + N + " " + SN )); //удаление панели
    }
    for(let i = 0; i <= NumberOfPanels; i++){//поиск панелей в секции
        if(document.getElementById("Panel " + N + " " + i ) != null){
            flagB = true;
            RefreshArrows();  
            break;
        }
    }
    if(flagB == false){//если в секции нет панелей
        ParentNewPanelBtn.classList.remove('active');//удалить флаг
        document.getElementById("Section " + N).remove(); //удалить секцию
        RefreshArrows();  
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
    divInputEdit.setAttribute("hidden","hidden");
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
function OnMouseOverUserPanel(id){ //Панель. Мышь над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN );
    TrashImg.setAttribute("style","opacity: 100;");
    ImgPencil.setAttribute("style","opacity: 100;");
}
function OnMouseOutUserPanel(id){ //Панель. Мышь не над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivJumpIndicator = document.getElementById("DivJumpIndicator " + N + " " + SN + " " + TN);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN )
    TrashImg.setAttribute("style","opacity: 0;");
    ImgPencil.setAttribute("style","opacity: 0;");
}
function OnClickJumpIndicator(id){//нажатие на JumpIndicator
    
    let JumpIndicator = document.getElementById(id);
    IdOfParentJump = id;
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
        if(!JumpIndicator.classList.contains('Active')){
            RemoveConnect.removeAttribute("hidden");
            JumpIndicator.classList.add('Active');
        }else{
            RemoveConnect.setAttribute('hidden','hidden');
            JumpIndicator.classList.remove('Active');
        }
        flagA = false;
    }else{
        flagA = true;
    }
}
function OnMouseOverDivJump(id){//Панель. Мышь в области джампера
    let JumpIndicator = document.getElementById("JumpIndicator " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
        if(!JumpIndicator.classList.contains('Active')){
            RemoveConnect.removeAttribute("hidden");
            JumpIndicator.classList.add('Active');
        }
    }
}
function OnMouseOutDivJump(id){//Панель. Мышь вне области джампера
    let JumpIndicator = document.getElementById("JumpIndicator " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
        if(JumpIndicator.classList.contains('Active')){
            RemoveConnect.setAttribute('hidden','hidden');
            JumpIndicator.classList.remove('Active');
        }
    }
}
function Jump(id){//Стрелки.Создание стрелок между элементом и панелями
    if(flagA == true){
        let IdOfChildrenJump = "";
        let JumpContainer = document.getElementById("JumpContainer");//блок со всеми стрелками
        let Scroll = document.getElementById("Scroll");
        let Panels = document.getElementsByClassName("Panel");
        let N = NumberOfElement(IdOfParentJump);
        let SN = SecondNumberOfElement(IdOfParentJump);
        let TN = ThirdNumberOfElement(IdOfParentJump);
        let Connect = true;//проверка на подключение
        if(click == 1){//если нажали первый раз
            mouse.Xold = event.pageX + Scroll.scrollLeft;
            mouse.Yold = event.pageY  - 70  + Scroll.scrollTop;//70 - высота навбара
            click++;
        }else if(click == 2){//если нажали второй раз
            let canvas = document.createElement('canvas');
            mouse.x = event.pageX  + Scroll.scrollLeft; 
            mouse.y = event.pageY  - 70 + Scroll.scrollTop;//70 - высота навбара
            for(let i = 0; i < Panels.length;i++){//поиск панелей с такими же координатами что и были заданы
                if((Panels[i].offsetLeft <= mouse.x && (Panels[i].offsetLeft + Panels[i].offsetWidth >= mouse.x)) && 
                   (Panels[i].offsetTop <= mouse.y && (Panels[i].offsetTop + Panels[i].offsetHeight >= mouse.y))){
                       if(SecondNumberOfElement(Panels[i].getAttribute("id")) != SN){//чтобы не конектилась сама к себе
                            IdOfChildrenJump = Panels[i].getAttribute("id");
                            break;
                       }else{
                           return 0;
                       }
                }else if(i + 1 == Panels.length){//если не найдена ни одна панель
                        click = 1;
                        flagA = false;
                        return 0;
                }
            }
            let JumpIndicator = document.getElementById(IdOfParentJump);
            let Panel = document.getElementById(IdOfChildrenJump);//дочерний элемент джампера
            canvas.className = "canvas";
            canvas.setAttribute("id","Canvas " + N + " " + SN + " " + TN);
            canvas.setAttribute("data-connect",IdOfChildrenJump);
            if(Panel.offsetLeft > JumpIndicator.offsetLeft  && Panel.offsetTop > JumpIndicator.offsetTop){ //создание канвы и ее позиционирование
                canvas.setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop  + 10) + ";left:" + Number(JumpIndicator.offsetLeft + 60 ) + ";");
            }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop > JumpIndicator.offsetTop){
                canvas.setAttribute("width",JumpIndicator.offsetLeft - Number(Panel.offsetLeft - 110));
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop + 10) + ";left:" + Number(Panel.offsetLeft - 20)+ ";");
            }else if(Panel.offsetLeft > JumpIndicator.offsetLeft + 60 && Panel.offsetTop < JumpIndicator.offsetTop){
                canvas.setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
                canvas.setAttribute("height",JumpIndicator.offsetTop - Panel.offsetTop - 15);

                canvas.setAttribute("style","top:" + Number(Panel.offsetTop + 30) + ";left:" + Number(JumpIndicator.offsetLeft + 60) + ";");
            }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop < JumpIndicator.offsetTop){
                canvas.setAttribute("width",Number(JumpIndicator.offsetLeft + 80) - Number(Panel.offsetLeft - 60));
                canvas.setAttribute("height",JumpIndicator.offsetTop - Panel.offsetTop - 10);

                canvas.setAttribute("style","top:" + Number(Panel.offsetTop + 30) + ";left:" + Number(Panel.offsetLeft - 20) + ";");
            }
            else{
                click = 1;
                flagA = false;
                return 0;
            }
            let ctx = canvas.getContext("2d");//линия
            let Input = document.createElement('input');

            Input.setAttribute('type','button');
            Input.setAttribute('value','Удалить связь');
            Input.setAttribute('title','Удалить связь');
            Input.setAttribute('class','RemoveConnect');
            Input.setAttribute('id',"RemoveConnect " + N + " " + SN + " " + TN);
            Input.setAttribute('onclick','OnClickRemoveConnect(id)');
            Input.setAttribute('hidden','hidden');

            JumpIndicator.before(Input);
            JumpIndicator.classList.add("ActiveJumpIndicator");
            JumpContainer.append(canvas);

            ctx.strokeStyle = "rgb(143, 143, 143)";
            ctx.beginPath();
            if(Panel.offsetLeft > JumpIndicator.offsetLeft  && Panel.offsetTop > JumpIndicator.offsetTop){//рисование самого отрезка
                ctx.moveTo(0,0);
                ctx.bezierCurveTo(canvas.offsetWidth, 0, 0,canvas.offsetHeight,canvas.offsetWidth - 20,canvas.offsetHeight - 10)
                //ctx.lineTo(canvas.offsetWidth - 20,canvas.offsetHeight - 10);
                ctx.stroke();

                var ctxArrow = canvas.getContext('2d');//стрелка
                ctxArrow.fillStyle = "rgb(143, 143, 143)";
                ctxArrow.beginPath();
                ctxArrow.moveTo(canvas.offsetWidth,canvas.offsetHeight - 10);
                ctxArrow.lineTo(canvas.offsetWidth - 20,canvas.offsetHeight -20);
                ctxArrow.lineTo(canvas.offsetWidth - 20,canvas.offsetHeight);
                ctxArrow.fill();
            }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop > JumpIndicator.offsetTop){
                ctx.moveTo(canvas.offsetWidth - 30,0);
                ctx.bezierCurveTo(canvas.offsetWidth + 110,canvas.offsetHeight, 0,0,5,canvas.offsetHeight - 10);
                //ctx.lineTo(0,canvas.offsetHeight - 10);
                ctx.stroke();

                var ctxArrow = canvas.getContext('2d');//стрелка
                ctxArrow.fillStyle = "rgb(143, 143, 143)";
                ctxArrow.beginPath();
                ctxArrow.moveTo(20,canvas.offsetHeight - 10);
                ctxArrow.lineTo(0,canvas.offsetHeight -20);
                ctxArrow.lineTo(0,canvas.offsetHeight);
                ctxArrow.fill();
            }else if(Panel.offsetLeft > JumpIndicator.offsetLeft + 60 && Panel.offsetTop < JumpIndicator.offsetTop){
                ctx.moveTo(canvas.offsetWidth - 20,10);
                ctx.bezierCurveTo(0, 0, canvas.offsetWidth ,canvas.offsetHeight,0,canvas.offsetHeight - 10)
                //ctx.lineTo(0,canvas.offsetHeight);
                ctx.stroke();
                

                var ctxArrow = canvas.getContext('2d');//стрелка
                ctxArrow.fillStyle = "rgb(143, 143, 143)";
                ctxArrow.beginPath();
                ctxArrow.moveTo(canvas.offsetWidth,10);
                ctxArrow.lineTo(canvas.offsetWidth - 20 , 0);
                ctxArrow.lineTo(canvas.offsetWidth - 20, 20);
                ctxArrow.fill();
            }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop < JumpIndicator.offsetTop){
                ctx.moveTo(canvas.offsetWidth - 60,canvas.offsetHeight);
                ctx.bezierCurveTo(canvas.offsetWidth + 110, canvas.offsetHeight, 0 ,canvas.offsetHeight/4,5,10)
                //ctx.lineTo(0,10);
                ctx.stroke();

                var ctxArrow = canvas.getContext('2d');//стрелка
                ctxArrow.fillStyle = "rgb(143, 143, 143)";
                ctxArrow.beginPath();
                ctxArrow.moveTo(20,10);
                ctxArrow.lineTo(0,0);
                ctxArrow.lineTo(0,20);
                ctxArrow.fill();
            }




            for(let i = 0; Connect == true; i++){//запись подключения в панель
                if(Panel.hasAttribute("data-connect-" + i) == true)
                {
                    Connect = true;
                }else{
                    Panel.setAttribute("data-connect-" + i ,canvas.getAttribute('id'));
                    Connect = false;
                }
            }
            click = 1;
            flagA = false;
        }
    }
}
function RefreshArrows(){//Стрелки.Перерисовка стрелок
    let Arrows = document.getElementsByClassName("canvas");
    for(let i = 0; i < Arrows.length; i++){
        let A = {top:Arrows[i].offsetTop, left:Arrows[i].offsetLeft, width:Arrows[i].offsetWidth, height:Arrows[i].offsetHeight};
        let id = Arrows[i].getAttribute("id");
        let idChildren = Arrows[i].getAttribute("data-connect");
        let JumpIndicator = document.getElementById("JumpIndicator " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
        let Panel = document.getElementById("Panel " + NumberOfElement(idChildren) + " " + SecondNumberOfElement(idChildren));
        //проверка панелей и элементов на сдвиг относительно текущей канвы
        if(A.left ==  Number(JumpIndicator.offsetLeft + 60) && A.top == Number(JumpIndicator.offsetTop  + 10) && //в 4ой четверти
            (A.width + A.left) == (Panel.offsetLeft) && (A.top + A.height) == (Panel.offsetTop + 40)) 
        {
                continue;
        }else if(A.left ==  Number(Panel.offsetLeft - 20) && A.top == Number(JumpIndicator.offsetTop  + 10) && //в 3ей четверти
            (A.left + A.width - 30) == (Panel.offsetLeft + Panel.offsetWidth) && (A.top + A.height) == (Panel.offsetTop + 40)){
                continue;
        }else if(A.left ==  Number(JumpIndicator.offsetLeft + 60) && A.top == Number(Panel.offsetTop + 30) &&  //во 2ой четверти
                (A.left + A.width) == Panel.offsetLeft && (A.top + A.height) == (JumpIndicator.offsetTop + 15)){
                    continue;
        }else if(A.left ==  Number(Panel.offsetLeft - 20) && A.top == Number(Panel.offsetTop + 30) && //в 1ой четверти
            (A.left + A.width) == (JumpIndicator.offsetLeft + 120) && (A.top + A.height) == (JumpIndicator.offsetTop + 15)){
            continue;
        }else{//если сдвиг панелей произошел
                
                let ctx = Arrows[i].getContext("2d");
                ctx.clearRect(0,0,Arrows[i].offsetWidth,Arrows[i].offsetHeight);//очистка канвы
                //редактирование канвы и ее позиционирования
                if(Panel.offsetLeft > JumpIndicator.offsetLeft  && Panel.offsetTop > JumpIndicator.offsetTop){ 
                    Arrows[i].setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
                    Arrows[i].setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);
                    Arrows[i].setAttribute("style","top:" + Number(JumpIndicator.offsetTop  + 10) + ";left:" + Number(JumpIndicator.offsetLeft + 60 ) + ";");
                }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop > JumpIndicator.offsetTop){
                    Arrows[i].setAttribute("width",JumpIndicator.offsetLeft - Number(Panel.offsetLeft - 110));
                    Arrows[i].setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);
                
                    Arrows[i].setAttribute("style","top:" + Number(JumpIndicator.offsetTop + 10) + ";left:" + Number(Panel.offsetLeft - 20)+ ";");
                }else if(Panel.offsetLeft > JumpIndicator.offsetLeft + 60 && Panel.offsetTop < JumpIndicator.offsetTop){
                    Arrows[i].setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
                    Arrows[i].setAttribute("height",JumpIndicator.offsetTop - Panel.offsetTop - 15);
                
                    Arrows[i].setAttribute("style","top:" + Number(Panel.offsetTop + 30) + ";left:" + Number(JumpIndicator.offsetLeft + 60) + ";");
                }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop < JumpIndicator.offsetTop){
                    Arrows[i].setAttribute("width",Number(JumpIndicator.offsetLeft + 80) - Number(Panel.offsetLeft - 60));
                    Arrows[i].setAttribute("height",JumpIndicator.offsetTop - Panel.offsetTop - 15);

                    Arrows[i].setAttribute("style","top:" + Number(Panel.offsetTop + 30) + ";left:" + Number(Panel.offsetLeft - 20) + ";");
                }

                //Рисование стрелки

                ctx.strokeStyle = "rgb(143, 143, 143)";
                ctx.beginPath();
                if(Panel.offsetLeft > JumpIndicator.offsetLeft  && Panel.offsetTop > JumpIndicator.offsetTop){//рисование самого отрезка
                    ctx.moveTo(0,0);
                    ctx.bezierCurveTo(Arrows[i].offsetWidth, 0, 0,Arrows[i].offsetHeight,Arrows[i].offsetWidth - 20,Arrows[i].offsetHeight - 10)
                    //ctx.lineTo(canvas.offsetWidth - 20,canvas.offsetHeight - 10);
                    ctx.stroke();

                    var ctxArrow = Arrows[i].getContext('2d');//стрелка
                    ctxArrow.fillStyle = "rgb(143, 143, 143)";
                    ctxArrow.beginPath();
                    ctxArrow.moveTo(Arrows[i].offsetWidth,Arrows[i].offsetHeight - 10);
                    ctxArrow.lineTo(Arrows[i].offsetWidth - 20,Arrows[i].offsetHeight -20);
                    ctxArrow.lineTo(Arrows[i].offsetWidth - 20,Arrows[i].offsetHeight);
                    ctxArrow.fill();
                }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop > JumpIndicator.offsetTop){
                    ctx.moveTo(Arrows[i].offsetWidth - 30,0);
                    ctx.bezierCurveTo(Arrows[i].offsetWidth + 110,Arrows[i].offsetHeight, 0,0,5,Arrows[i].offsetHeight - 10);
                    //ctx.lineTo(0,canvas.offsetHeight - 10);
                    ctx.stroke();

                    var ctxArrow = Arrows[i].getContext('2d');//стрелка
                    ctxArrow.fillStyle = "rgb(143, 143, 143)";
                    ctxArrow.beginPath();
                    ctxArrow.moveTo(20,Arrows[i].offsetHeight - 10);
                    ctxArrow.lineTo(0,Arrows[i].offsetHeight -20);
                    ctxArrow.lineTo(0,Arrows[i].offsetHeight);
                    ctxArrow.fill();
                }else if(Panel.offsetLeft > JumpIndicator.offsetLeft + 60 && Panel.offsetTop < JumpIndicator.offsetTop){
                    ctx.moveTo(Arrows[i].offsetWidth - 20,10);
                    ctx.bezierCurveTo(0, 0, Arrows[i].offsetWidth ,Arrows[i].offsetHeight,0,Arrows[i].offsetHeight - 10)
                    //ctx.lineTo(0,canvas.offsetHeight);
                    ctx.stroke();
                    

                    var ctxArrow = Arrows[i].getContext('2d');//стрелка
                    ctxArrow.fillStyle = "rgb(143, 143, 143)";
                    ctxArrow.beginPath();
                    ctxArrow.moveTo(Arrows[i].offsetWidth,10);
                    ctxArrow.lineTo(Arrows[i].offsetWidth - 20 , 0);
                    ctxArrow.lineTo(Arrows[i].offsetWidth - 20, 20);
                    ctxArrow.fill();
                }else if(Panel.offsetLeft < JumpIndicator.offsetLeft && Panel.offsetTop < JumpIndicator.offsetTop){
                    ctx.moveTo(Arrows[i].offsetWidth - 60,Arrows[i].offsetHeight);
                    ctx.bezierCurveTo(Arrows[i].offsetWidth + 110, Arrows[i].offsetHeight, 0 ,Arrows[i].offsetHeight/4,5,10)
                    //ctx.lineTo(0,10);
                    ctx.stroke();

                    var ctxArrow = Arrows[i].getContext('2d');//стрелка
                    ctxArrow.fillStyle = "rgb(143, 143, 143)";
                    ctxArrow.beginPath();
                    ctxArrow.moveTo(20,10);
                    ctxArrow.lineTo(0,0);
                    ctxArrow.lineTo(0,20);
                    ctxArrow.fill();
                }

        }
    }
}
function OnClickRemoveConnect(id){//Стрелки.удаление связи и стрелок
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);

    let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
    let JumpIndicator = document.getElementById("JumpIndicator " + N + " " + SN + " " + TN);
    let RemoveConnect = document.getElementById(id);
    ReplaceAttribute(id)//замена имени у атрибутов зависимых панелей
    //удаление флагов на джампере
    if(JumpIndicator.classList.contains('ActiveJumpIndicator'))
    {
        JumpIndicator.classList.remove('ActiveJumpIndicator')
    }
    if(JumpIndicator.classList.contains('Active')){
        JumpIndicator.classList.remove('Active')
    }
    Canvas.remove();
    RemoveConnect.remove();
}
function ReplaceAttribute(id){//Стрелки.замена имени у атрибутов зависимых панелей
    let Connect = true;
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
    let ConnectCanvasId = Canvas.getAttribute('data-connect');
    let Panel = document.getElementById(ConnectCanvasId);
    //удаление атрибутов у зависимой панели
    for(let i = 0; Connect == true; i++){//проход по всем атрибутам data-connect на панели
        if(Panel.hasAttribute("data-connect-" + i) == true){
            if(Panel.getAttribute("data-connect-" + i) == Canvas.getAttribute("id")){//сравнение только тех, которые имеют только те же иднексы что и канва
                let OldConnect = true;
                Connect = false;
                Panel.removeAttribute('data-connect-' + i);//удалить атрибут
                for(let j = i + 1; OldConnect == true; j++){//поиск последующих атрибутов
                    if(Panel.hasAttribute("data-connect-" + j) == true){//если последующие атрибуты есть
                        Panel.setAttribute("data-connect-" + Number(j-1),Panel.getAttribute('data-connect-' + j));//заменить индекс атрибута на удаленный
                        Panel.removeAttribute("data-connect-" + j);//удалить последний последний атрибут
                        OldConnect = true;
                    }else{
                        OldConnect = false;
                    }
                }
            }else{
                Connect == true;
            }
            
        }
    }
}

