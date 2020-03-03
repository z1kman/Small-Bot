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
        let N = NumberOfElement(id);
        let SN = SecondNumberOfElement(id);
        let TN = ThirdNumberOfElement(id);
        let canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
        alert(canvas.getAttribute("data-connect"));
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
        }
    }
}

function DrawArrow(PanelOffsetLeft,PanelOffsetTop,JumpIndicatorOffsetLeft,JumpIndicatorOffsetTop){
    let canvas = document.createElement('canvas');
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