let url = 'http://localhost:3000/control';
window.onload = function(){
    LoadDialogue();
}
function DialogsOpen(Button){//нажатие на кнопку "Диалоги"
    let DialogsDiv = document.getElementById('DialogsDiv');
    let LabelSectionValue = document.getElementById('LabelSectionValue');//надпись секции
    let LoadMore = document.getElementById('LoadMore');//кнопка "Загрузить еще"

    if(!Button.classList.contains('ActiveSectionDialogs')){//если на эту кнопку еще не нажимали
        let LabelOnDialogsPanel = document.getElementById("LabelOnDialogsPanel");
        let Dialog = document.getElementsByClassName('Dialog');
        LabelSectionValue.innerHTML = "Диалоги"
        LabelOnDialogsPanel.remove();
        if(LoadMore != null){
            LoadMore.remove();
        }
        for(i = Dialog.length; i > 0; i--){//удаление всех ранее загруженных диалогов
            Dialog[0].remove();
        }
        Button.classList.add('ActiveSectionDialogs');//добавить индикатор нажатия
        LoadDialogue();//загрузка диалогов
    }else{//если на эту кнопку уже нажимали
        let LabelOnDialogsPanel = document.createElement('div');//создание сообщения
        LabelSectionValue.innerHTML = "";
        LabelOnDialogsPanel.className = "LabelOnDialogsPanel";
        LabelOnDialogsPanel.id = "LabelOnDialogsPanel";
        LabelOnDialogsPanel.innerHTML = "Выберите раздел";//вывод сообщения
        LabelSectionValue.after(LabelOnDialogsPanel);
        DialogsDiv.setAttribute('hidden','hidden');//скрытие окна с диалогами
        Button.classList.remove('ActiveSectionDialogs');//удалить индикатор нажатия
    }
    
}
function RemoveDialogStep(Dialog){//удаление диалога
    let Dialogs = document.getElementsByClassName("Dialog");
    let LoadMore = document.getElementById("LoadMore");
    let Message = {//сообщение для отправки на сервер
        project : get_cookie('Project'),
        message : "RemoveDialog",
        dialog : String(Dialog.getAttribute('dialog')),
    }
    fetch(url, { 
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Message)//отправка сообщения на сервер
    }).then(response => response.json()).then(result => {//чтение сообщений с сервера
            if (result.dialogs != "error") { 
                if(Dialogs.length == 1){//если текущее сообщение последнее
                    let DialogsDiv = document.getElementById('DialogsDiv');
                    let LabelSectionValue = document.getElementById('LabelSectionValue');//надпись секции
                    let LabelOnDialogsPanel = document.createElement('div');//создание сообщения 
                    DialogsDiv.setAttribute('hidden','hidden');
                    LabelOnDialogsPanel.className = "LabelOnDialogsPanel";
                    LabelOnDialogsPanel.id = "LabelOnDialogsPanel";
                    LabelOnDialogsPanel.innerHTML = "У вас пока нет диалогов";
                    LabelSectionValue.after(LabelOnDialogsPanel);
                }
                Dialog.parentNode.parentNode.remove();
                if(LoadMore != null){//если записей было больше чем 20
                    LoadMore.setAttribute('countdialogs', (Number(LoadMore.getAttribute('countdialogs')) - 1));//уменьшить значение на единицу
                    Message = {//сообщение для отправки на сервер
                        project : get_cookie('Project'),
                        message : "LoadOneDialog",
                        count : Number(LoadMore.getAttribute('countdialogs'))
                    }
                    fetch(url, { 
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(Message)//отправка сообщения на сервер
                    }).then(response => response.json()).then(result => {//чтение сообщений с сервера
                        if(result.count == 0){//если на сервере пусто
                            LoadMore.remove();
                        }else if(result.count == 1){//если с сервера был отправлен объект
                            LoadMore.setAttribute('countdialogs', (Number(LoadMore.getAttribute('countdialogs')) + 1));//увеличить значение на единицу
                            let DialogNew = document.createElement('div');
                            DialogNew.className = "Dialog";
                            DialogNew.innerHTML = "\n<div class=\"ClickDialog\" dialog=\"" + result.objects.number_Dialogue + "\" dataDialog=\"" + result.objects.Date +"\" onclick=\"OpenDialog()\">" +
                                "\n\t<div class=\"UserId\">Диалог: " +  result.objects.number_Dialogue + "</div>" + 
                                "\n\t\t  <div class=\"Data\">" + result.objects.Date + "</div>" +
                                "\n\t</div>" + 
                                "\n\t<div class=\"RemoveDialog\">" + 
                                "\n\t\t<div class=\"Remove\"  dialog=\"" + result.objects.number_Dialogue + "\" dataDialog=\"" + result.objects.Date +"\" onclick=\"RemoveDialogStep(this)\" >Удалить</div>" +
                                "\n\t</div>";
                            LoadMore.before(DialogNew);
                        }
                    });
                }
            } 
    })
}
function LoadDialogue(){//загрузка диалогов из базы
    let DialogsDiv = document.getElementById('DialogsDiv');
    let LabelOnDialogsPanel = document.createElement('div');//создание сообщения о загрузке
    let LabelSectionValue = document.getElementById('LabelSectionValue');//надпись секции
    let LoadMore = document.getElementById("LoadMore");//кнопка загрузить еще

    LabelOnDialogsPanel.id = "LabelOnDialogsPanel";
    LabelOnDialogsPanel.className = "LabelOnDialogsPanel";
    LabelOnDialogsPanel.innerHTML = "Загрузка диалогов. Это может занять некоторое время";//вывод сообщения о загрузке
    LabelSectionValue.after(LabelOnDialogsPanel);
    DialogsDiv.setAttribute('hidden','hidden');//скрытие поля с диалогами
    
    let Message = {//сообщение для отправки на сервер
        project : get_cookie('Project'),
        message : "GetDialogs"
    }
    fetch(url, { 
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Message)//отправка сообщения на сервер
    }).then(response => response.json()).then(result => {//чтение сообщений с сервера
            if (result.dialogs != 500) { 
                if(result.dialogs == "NoDialogue"){//если диалоги не были найдены
                    LabelOnDialogsPanel.innerHTML = "У вас пока нет диалогов";//вывод сообщения 
                }else{
                    LabelOnDialogsPanel.remove();
                    if(result.count != undefined){//если записей больше чем 20
                        for(let i = 0; i < result.objects.length; i++){//вывод диалогов
                            let DialogNew = document.createElement('div');
                            DialogNew.className = "Dialog";
                            DialogNew.innerHTML = "\n<div class=\"ClickDialog\" dialog=\"" + result.objects[i].number_Dialogue + "\" dataDialog=\"" + result.objects[i].Date +"\" onclick=\"OpenDialog()\">" +
                                "\n\t<div class=\"UserId\">Диалог: " +  result.objects[i].number_Dialogue + "</div>" + 
                                "\n\t\t  <div class=\"Data\">" + result.objects[i].Date + "</div>" +
                                "\n\t</div>" + 
                                "\n\t<div class=\"RemoveDialog\">" + 
                                "\n\t\t<div class=\"Remove\"  dialog=\"" + result.objects[i].number_Dialogue + "\" dataDialog=\"" + result.objects[i].Date +"\" onclick=\"RemoveDialogStep(this)\" >Удалить</div>" +
                                "\n\t</div>";
                            DialogsDiv.append(DialogNew);
                            if(i + 1 == result.objects.length){//если текущая итерация последняя и записей больше чем 20
                                let LoadMore = document.createElement('div');
                                LoadMore.className = "LoadMore";
                                LoadMore.id = "LoadMore";
                                LoadMore.setAttribute('onclick','LoadMoreDialogs(this)');
                                LoadMore.setAttribute('CountDialogs',result.count);
                                LoadMore.innerHTML = "Загрузить еще";   
                                DialogNew.after(LoadMore); 
                            }
                        }
                    }else{
                        for(let i = 0; i < result.length; i++){//вывод диалогов
                            let DialogNew = document.createElement('div');
                            DialogNew.className = "Dialog";
                            DialogNew.innerHTML = "\n<div class=\"ClickDialog\" dialog=\"" + result[i].number_Dialogue + "\" dataDialog=\"" + result[i].Date +"\" onclick=\"OpenDialog()\">" +
                                "\n\t<div class=\"UserId\">Диалог: " +  result[i].number_Dialogue + "</div>" + 
                                "\n\t\t  <div class=\"Data\">" + result[i].Date + "</div>" +
                                "\n\t</div>" + 
                                "\n\t<div class=\"RemoveDialog\">" + 
                                "\n\t\t<div class=\"Remove\"  dialog=\"" + result[i].number_Dialogue + "\" dataDialog=\"" + result[i].Date +"\" onclick=\"RemoveDialogStep(this)\" >Удалить</div>" +
                                "\n\t</div>";
                            DialogsDiv.append(DialogNew);
                        }
                        if(LoadMore != null){
                            LoadMore.remove();
                        }
                    }
                    if(DialogsDiv.hasAttribute('hidden')){
                        DialogsDiv.removeAttribute('hidden')
                    }
                }
            } 
    })
}
function LoadMoreDialogs(LoadMore){//загрузить еще диалоги
    let Message = {//сообщение для отправки на сервер
        project : get_cookie('Project'),
        message : "LoadMoreDialogs",
        count : Number(LoadMore.getAttribute('countdialogs'))
    }
    fetch(url, { 
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Message)//отправка сообщения на сервер
    }).then(response => response.json()).then(result => {//чтение сообщений с сервера
        if(Number(result.count)!= 0){
            for(let i = 0 ; Number(LoadMore.getAttribute('countdialogs')) + i < result.count; i++){//вывод подгруженных диалогов
                let DialogNew = document.createElement('div');
                DialogNew.className = "Dialog";
                DialogNew.innerHTML = "\n<div class=\"ClickDialog\" dialog=\"" + result.objects[i].number_Dialogue + "\" dataDialog=\"" + result.objects[i].Date +"\" onclick=\"OpenDialog()\">" +
                    "\n\t<div class=\"UserId\">Диалог: " +  result.objects[i].number_Dialogue + "</div>" + 
                    "\n\t\t  <div class=\"Data\">" + result.objects[i].Date + "</div>" +
                    "\n\t</div>" + 
                    "\n\t<div class=\"RemoveDialog\">" + 
                    "\n\t\t<div class=\"Remove\"  dialog=\"" + result.objects[i].number_Dialogue + "\" dataDialog=\"" + result.objects[i].Date +"\" onclick=\"RemoveDialogStep(this)\" >Удалить</div>" +
                    "\n\t</div>";
                LoadMore.before(DialogNew); 
            }
            LoadMore.setAttribute('countdialogs', result.count);//обновить кол-во диалогов
            if(Number(LoadMore.getAttribute('countdialogs')) + 1 == result.length){//если все диалоги были загружены
                LoadMore.remove();//удалить кнопку
            }
        }
    });
}
function get_cookie ( cookie_name )//получение кукисов
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}