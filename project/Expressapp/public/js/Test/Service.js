function ClickImage(id){//увеличение изображения
    let body = document.body
    let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран
    let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let Cwidth = document.documentElement.clientWidth;
    let Cheight = document.documentElement.clientHeight;
    let img = document.getElementById(id);
    let ImgOpen = document.createElement('img');
    //----------Создание фиксированной панели-----------
    divNewInstrumentPanel.className="NewInstrumentPanel";
    divNewInstrumentPanel.setAttribute("id","NewInstrumentPanel");
    body.prepend(divNewInstrumentPanel);

    ImgOpen.src = img.src;
    ImgOpen.className = "OpenImg";
    ImgOpen.id = img.id;
    ImgOpen.setAttribute('onclick','OnClickImgExit()');
    if(img.naturalWidth > img.naturalHeight){
        if(img.naturalWidth > Cwidth - 400){
            ImgOpen.width = img.naturalWidth/2; 
        }else{
            ImgOpen.width = img.naturalWidth;
        }
    }else if(img.naturalWidth <= img.naturalHeight){
        if(img.naturalHeight > Cheight - 400){
            ImgOpen.height = img.naturalHeight/2; 
        }else{
            ImgOpen.height = img.naturalHeight; 
        }
    }
    
    divNewInstrumentPanel.append(ImgOpen);
}
function OnClickImgExit(){//закрытие всплывающего окна 
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.parentNode.removeChild(NewInstrumentPanel);
}