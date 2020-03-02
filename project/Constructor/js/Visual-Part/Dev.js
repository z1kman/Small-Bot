
//---------------Тесты----------------
//------------------------------------
//------------------------------------
function OnClickJump(id){
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let Panel = document.getElementById("Panel " + N + " " + SN);
    let Panel3 = document.getElementById("Panel 2 3");

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let Constructor = document.getElementById("Constructor");
    alert(Panel.offsetLeft + " " + Panel.offsetTop);
   // alert(Panel.offsetWidth + " " + Panel.offsetHeight);
    //alert(Panel3.offsetLeft + " " + Panel3.offsetTop);
    //alert(Panel3.offsetWidth + " " + Panel3.offsetHeight);
    ctx.beginPath();
    ctx.moveTo(140,20);
    ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
    //ctx.moveTo(event.clientX,event.clientY);
    //ctx.bezierCurveTo(event.clientX,event.clientY, Panel3.offsetLeft, Panel3.offsetHeight,Panel3.offsetLeft, Panel3.offsetHeight);
    ctx.stroke();
}
function OnClickConstructor(){
    //alert(event.clientX+':'+event.clientY)
}