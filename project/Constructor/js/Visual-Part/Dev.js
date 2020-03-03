var click = 1;
var mouse = { Xold:0, Yold:0, x:0,y:0};
var flag = false;
var IdOfParentJump = "";//Родительский элемент джампера
//---------------Тесты----------------
//------------------------------------
//------------------------------------
function OnClickJumpIndicator(id){//нажатие на JumpIndicator
    let JumpIndicator = document.getElementById(id);
    IdOfParentJump = id;
    if(JumpIndicator.classList.contains("ActiveJumpIndicator")){
        flag = false;
    }else{
        flag = true;
    }
}
function Jump(id){//Создание стрелок между элементом и панелями
    if(flag == true){
        let IdOfChildrenJump = "";
        let JumpContainer = document.getElementById("JumpContainer");//блок со всеми стрелками
        let Scroll = document.getElementById("Scroll");
        let Panels = document.getElementsByClassName("Panel");
        let N = NumberOfElement(IdOfParentJump);
        let SN = SecondNumberOfElement(IdOfParentJump);
        let TN = ThirdNumberOfElement(IdOfParentJump);
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
                        flag = false;
                        return 0;
                }
            }
            let JumpIndicator = document.getElementById(IdOfParentJump);
            let Panel = document.getElementById(IdOfChildrenJump);//дочерний элемент джампера
            JumpIndicator.classList.add("ActiveJumpIndicator");
            canvas.className = "canvas";
            canvas.setAttribute("id","Canvas " + N + " " + SN + " " + TN);
            canvas.setAttribute("data-connect",IdOfChildrenJump);
            if(mouse.x > mouse.Xold + 48 && mouse.y > mouse.Yold){ //создание канвы и ее позиционирование
                canvas.setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop  + 10) + ";left:" + Number(JumpIndicator.offsetLeft + 60 ) + ";");
            }else if(mouse.x < mouse.Xold && mouse.y > mouse.Yold){
                canvas.setAttribute("width",JumpIndicator.offsetLeft - Number(Panel.offsetLeft - 110));
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop + 10) + ";left:" + Number(Panel.offsetLeft - 20)+ ";");
            }else if(mouse.x > mouse.Xold + 48 && mouse.y < mouse.Yold){
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
                flag = false;
                return 0;
            }

            JumpContainer.append(canvas);

            let ctx = canvas.getContext("2d");//линия
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
                ctx.bezierCurveTo(canvas.offsetWidth + 110, canvas.offsetWidth, 0 ,canvas.offsetHeight/4,5,10)
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

            click = 1;
            flag = false;
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
                }else if(Panel.offsetLeft > JumpIndicator.offsetLeft + 48 && Panel.offsetTop < JumpIndicator.offsetTop){
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
                }else if(Panel.offsetLeft > JumpIndicator.offsetLeft + 48 && Panel.offsetTop < JumpIndicator.offsetTop){
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
                    ctx.bezierCurveTo(Arrows[i].offsetWidth + 110, Arrows[i].offsetWidth, 0 ,Arrows[i].offsetHeight/4,5,10)
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

/*
if(mouse.x > mouse.Xold + 48 && mouse.y > mouse.Yold){ //создание канвы и ее позиционирование
    canvas.setAttribute("width",Panel.offsetLeft - 60 - JumpIndicator.offsetLeft);
    canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

    canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop  + 10) + ";left:" + Number(JumpIndicator.offsetLeft + 60 ) + ";");
}else if(mouse.x < mouse.Xold && mouse.y > mouse.Yold){
    canvas.setAttribute("width",JumpIndicator.offsetLeft - Number(Panel.offsetLeft - 110));
    canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

    canvas.setAttribute("style","top:" + Number(JumpIndicator.offsetTop + 10) + ";left:" + Number(Panel.offsetLeft - 20)+ ";");
}else if(mouse.x > mouse.Xold + 48 && mouse.y < mouse.Yold){
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
    flag = false;
    return 0;
}

*/




    }
}