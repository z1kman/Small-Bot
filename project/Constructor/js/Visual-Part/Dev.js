var click = 1;
var mouse = { Xold:0, Yold:0, x:0,y:0};
var flag = false;
var IdOfParentJump = "";//Родительский элемент джампера
//---------------Тесты----------------
//------------------------------------
//------------------------------------
function OnClickJumpIndicator(id){
    flag = true;
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    IdOfParentJump = "JumpIndicator " + N + " " + SN + " " + TN;
}
function Jump(id){
    if(flag == true){
        let IdOfChildrenJump = "";
        let JumpContainer = document.getElementById("JumpContainer");//блок со всеми стрелками
        let Scroll = document.getElementById("Scroll");
        let Constructor = document.getElementById("Constructor");
        let Panels = document.getElementsByClassName("Panel");

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
                        IdOfChildrenJump = Panels[i].getAttribute("id");
                        break;
                }else if(i + 1 == Panels.length){//если не найдена ни одна панель
                        click = 1;
                        flag = false;
                        return 0;
                }
            }
            let JumpIndicator = document.getElementById(IdOfParentJump);
            let Panel = document.getElementById(IdOfChildrenJump);//дочерний элемент джампера
            canvas.className = "canvas";
            canvas.setAttribute("id","canvas");
            if(mouse.x > mouse.Xold + 48 && mouse.y > mouse.Yold){ //создание канвы и ее позиционирование
                canvas.setAttribute("width",Panel.offsetLeft - JumpIndicator.offsetLeft);
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + JumpIndicator.offsetTop + ";left:" + JumpIndicator.offsetLeft + ";");
            }else if(mouse.x < mouse.Xold && mouse.y > mouse.Yold){
                canvas.setAttribute("width",JumpIndicator.offsetLeft - Number(Panel.offsetLeft));
                canvas.setAttribute("height",Panel.offsetTop + 30 - JumpIndicator.offsetTop);

                canvas.setAttribute("style","top:" + JumpIndicator.offsetTop + ";left:" + (Number(Panel.offsetLeft) - Number(20)) + ";");
            }else if(mouse.x > mouse.Xold + 48 && mouse.y < mouse.Yold){
                canvas.setAttribute("width",Panel.offsetLeft - JumpIndicator.offsetLeft);
                canvas.setAttribute("height",JumpIndicator.offsetTop - Panel.offsetTop - 15);

                canvas.setAttribute("style","top:" + Number(Panel.offsetTop + 30) + ";left:" + JumpIndicator.offsetLeft + ";");
            }else if(mouse.x < mouse.Xold && mouse.y < mouse.Yold){
                canvas.setAttribute("width",Number(JumpIndicator.offsetLeft + 20) - Number(Panel.offsetLeft));
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

            var ctxArrow = canvas.getContext('2d');//стрелка
            ctxArrow.fillStyle = "rgb(143, 143, 143)";
            ctxArrow.beginPath();
            ctx.beginPath();
            if(mouse.x > mouse.Xold && mouse.y > mouse.Yold){//рисование самого отрезка
                ctx.moveTo(0,0);
                ctx.lineTo(canvas.offsetWidth - 20,canvas.offsetHeight - 10);
                ctx.stroke();

                ctxArrow.moveTo(canvas.offsetWidth,canvas.offsetHeight - 10);
                ctxArrow.lineTo(canvas.offsetWidth - 20,canvas.offsetHeight -20);
                ctxArrow.lineTo(canvas.offsetWidth - 20,canvas.offsetHeight);
                ctxArrow.fill();
            }else if(mouse.x < mouse.Xold && mouse.y > mouse.Yold){
                ctx.moveTo(canvas.offsetWidth,0);
                ctx.lineTo(0,canvas.offsetHeight - 10);
                ctx.stroke();

                ctxArrow.moveTo(20,canvas.offsetHeight - 10);
                ctxArrow.lineTo(0,canvas.offsetHeight -20);
                ctxArrow.lineTo(0,canvas.offsetHeight);
                ctxArrow.fill();
            }else if(mouse.x > mouse.Xold && mouse.y < mouse.Yold){
                ctx.moveTo(canvas.offsetWidth - 20,10);
                ctx.lineTo(0,canvas.offsetHeight);
                ctx.stroke();

                ctxArrow.moveTo(canvas.offsetWidth,10);
                ctxArrow.lineTo(canvas.offsetWidth - 20 , 0);
                ctxArrow.lineTo(canvas.offsetWidth - 20, 20);
                ctxArrow.fill();
            }else if(mouse.x < mouse.Xold && mouse.y < mouse.Yold){
                ctx.moveTo(canvas.offsetWidth,canvas.offsetHeight);
                ctx.lineTo(0,10);
                ctx.stroke();

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
function OnClickConstructor(){
    //alert(event.clientX+':'+event.clientY)
}