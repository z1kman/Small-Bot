var click = 1;
var mouse = { Xold:0, Yold:0, x:0,y:0};
var flagA = false;
var IdOfParentJump = "";//Родительский элемент джампера
//---------------Тесты----------------
//------------------------------------
//------------------------------------
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
function OnMouseOverDivJump(id){
    let JumpIndicator = document.getElementById("JumpIndicator " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
        if(!JumpIndicator.classList.contains('Active')){
            RemoveConnect.removeAttribute("hidden");
            JumpIndicator.classList.add('Active');
        }
    }
}
function OnMouseOutDivJump(id){
    let JumpIndicator = document.getElementById("JumpIndicator " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let RemoveConnect = document.getElementById("RemoveConnect " + NumberOfElement(id) + " " + SecondNumberOfElement(id) + " " + ThirdNumberOfElement(id));
        if(JumpIndicator.classList.contains('Active')){
            RemoveConnect.setAttribute('hidden','hidden');
            JumpIndicator.classList.remove('Active');
        }
    }
}

function Jump(id){//Создание стрелок между элементом и панелями
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
            if(mouse.x > mouse.Xold + 60 && mouse.y > mouse.Yold){ //создание канвы и ее позиционирование
                canvas.setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop  + 10) + ";left:" + Number(JumpIndicator.offsetLeft + 60 ) + ";");
            }else if(mouse.x < mouse.Xold && mouse.y > mouse.Yold){
                canvas.setAttribute("width",JumpIndicator.offsetLeft - Number(Panel.offsetLeft - 110));
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop + 10) + ";left:" + Number(Panel.offsetLeft - 20)+ ";");
            }else if(mouse.x > mouse.Xold + 60 && mouse.y < mouse.Yold){
                canvas.setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
                canvas.setAttribute("height",JumpIndicator.offsetTop - Panel.offsetTop - 15);

                canvas.setAttribute("style","top:" + Number(Panel.offsetTop + 30) + ";left:" + Number(JumpIndicator.offsetLeft + 60) + ";");
            }else if(mouse.x < mouse.Xold && mouse.y < mouse.Yold){
                canvas.setAttribute("width",Number(JumpIndicator.offsetLeft + 80) - Number(Panel.offsetLeft - 60));
                canvas.setAttribute("height",JumpIndicator.offsetTop - Panel.offsetTop - 15);

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
            if(mouse.x > mouse.Xold && mouse.y > mouse.Yold){//рисование самого отрезка
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
            }else if(mouse.x < mouse.Xold && mouse.y > mouse.Yold){
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
            }else if(mouse.x > mouse.Xold && mouse.y < mouse.Yold){
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
            }else if(mouse.x < mouse.Xold && mouse.y < mouse.Yold){
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

function RefreshArrows(){
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

function OnClickRemoveConnect(id){//удаление связи
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

function ReplaceAttribute(id){//замена имени у атрибутов зависимых панелей
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