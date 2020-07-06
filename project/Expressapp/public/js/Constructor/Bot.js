

function OnClickAddInstrumentBtnBot(id) { //Всплывающее окно. Создание новых эллементов бота
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id", "LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Выберите желаемое действие для чат бота";
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML = "<input type=\"button\" value=\"Вывести текст\" class=\"AddBtn\" id=\"AddTextBtnBot " + N + " " + SN + "\" onclick=\"OnClickAddTextBot(id)\"> " +
        "<input type=\"button\" value=\"Вывести изображение\" class=\"AddBtn\" id=\"AddImgBtnBot " + N + " " + SN + "\" onclick=\"OnClickAddImgBot(id)\">";
}
function OnClickAddTextBot(id) {//Всплывающее окно. Добавление текста у бота
    OnClickImgExit();//закрытие предыдущего окна
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let NewTextTextarea = document.createElement('textarea');//поле ввода текста
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели -----------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id", "LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Введите желаемый текст";
    //----------Создание поля ввода текста -----------
    NewTextTextarea.className = "NewTextTextarea";
    NewTextTextarea.setAttribute("id", "NewTextTextarea");
    divAddNewInstrumentPanel.append(NewTextTextarea);
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"NewTextSaveBtn " + N + " " + SN + "\"onclick=\"OnClickNewTextSaveBotBtn(id)\">" +
        "<input type=\"button\" value=\"Отменить\" class=\"AddBtn\" id=\"CancelBot " + N + " " + SN + "\" onclick=\"OnClickCancelBot(id)\">";
}
function OnClickCancelBot(id) {//отмена действия создания нового элемента у бота(Всплывающее окно)
    OnClickImgExit();//закрытие текущей панели
    OnClickAddInstrumentBtnBot(id);//генерирование предыдущей панели
}
function OnClickNewTextSaveBotBtn(id) {//Всплывающее окно и панель. Добавление текста у бота. Кнопка сохранения
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let formAddInstrumentBtnBot = document.getElementById("formAddInstrumentBtnBot " + N + " " + SN);
    let TextTextarea = document.getElementById("NewTextTextarea");//textarea в окне редактирования
    let divTextBot = document.createElement('div');//div внутри которого label,textarea и т.д
    let divLabelTextBot = document.createElement('div');//надпись ("Вывод текста")
    let spanTrashImg = document.createElement('span');//иконка мусорки(удаление элемента)
    let divImgPencilInstrument = document.createElement('div');//иконка карандаша(редактирование элемента)
    let TextBotTextarea = document.createElement('input');//textarea для текста

    ElementKol++;//увеличение числа текстовых элементов
    //----------Создание div(а) внутри которого label,textarea и т.д-----------
    divTextBot.className = "TextBot";
    divTextBot.setAttribute("id", "TextBot " + N + " " + SN + " " + ElementKol);
    divTextBot.setAttribute("onmouseover", "OnMouseOverTextBot(id)");
    divTextBot.setAttribute("onmouseout", "OnMouseOutTextBot(id)");
    formAddInstrumentBtnBot.before(divTextBot);
    //----------Создание надписи ("Вывод текста")----------
    divLabelTextBot.className = "LabelTextBot";
    divTextBot.append(divLabelTextBot);
    divLabelTextBot.innerHTML = "Вывод текста";
    //----------Создание иконки мусорки(удаление элемента)----------
    spanTrashImg.className = "TrashImg";
    spanTrashImg.setAttribute("id", "TrashImg " + N + " " + SN + " " + ElementKol);
    spanTrashImg.setAttribute("style", "opacity:0;");
    spanTrashImg.setAttribute("title", "удалить этот элемент");
    spanTrashImg.setAttribute("onclick", "OnClickRemoveTextBot(id)");
    divTextBot.append(spanTrashImg);
    spanTrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание иконки карандаша(редактирование элемента)-----------
    divImgPencilInstrument.className = "ImgPencilInstrument";
    divImgPencilInstrument.setAttribute("id", "ImgPencil " + N + " " + SN + " " + ElementKol);
    divImgPencilInstrument.setAttribute("style", "opacity: 0;");
    divImgPencilInstrument.setAttribute("onclick", "OnClickEditTextBot(id)");
    divTextBot.append(divImgPencilInstrument);
    divImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание textarea для текста  и вставка самого текста----------
    TextBotTextarea.className = "textareaTextBot";
    TextBotTextarea.setAttribute("id", "textareaTextBot " + N + " " + SN + " " + ElementKol);
    TextBotTextarea.setAttribute('readonly', 'readonly');
    divTextBot.append(TextBotTextarea);
    TextBotTextarea.setAttribute('value', TextTextarea.value);//записать значения из окна создания элемента в сам элемент
    OnClickImgExit();//закрыть окно создания элемента
    EnabledNavbarBtn();//включение кнопок находящихся в шапке сайта
    RefreshArrows()//перерисовка стрелок
}
function OnClickRemoveTextBot(id) {//удаление элемента-текст у бота
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let TN = GetThirdNumberOfElement(id);
    TextBot = document.getElementById("TextBot " + N + " " + SN + " " + TN);
    TextBot.parentNode.removeChild(TextBot);
    RefreshArrows()//перерисовка стрелок
}
function OnClickRemoveImgBot(id) {
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let TN = GetThirdNumberOfElement(id);
    ImgBot = document.getElementById("ImgBot " + N + " " + SN + " " + TN);
    ImgBot.parentNode.removeChild(ImgBot);
    RefreshArrows()//перерисовка стрелок
}
function OnClickEditTextBot(id) {//Всплывающее окно. Редактирование текста у бота
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let TN = GetThirdNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let NewTextTextarea = document.createElement('textarea');//поле ввода текста
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели -----------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id", "LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Введите желаемый текст";
    //----------Создание поля ввода текста -----------
    NewTextTextarea.className = "NewTextTextarea";
    NewTextTextarea.setAttribute("id", "NewTextTextarea");
    divAddNewInstrumentPanel.append(NewTextTextarea);
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"NewTextSaveBtn " + N + " " + SN + " " + TN + "\"onclick=\"OnClickEditTextSaveBotBtn(id)\">" +
        "<input type=\"button\" value=\"Отменить\" class=\"AddBtn\" id=\"CancelBot " + N + " " + SN + "\" onclick=\"OnClickImgExit();\">";

    //----------Вставка текста из панели в панель для редактирования-----------
    var TextTextarea = document.getElementById("NewTextTextarea");//textarea в окне редактирования
    var TextBotTextarea = document.getElementById("textareaTextBot " + N + " " + SN + " " + TN);//textarea на панели у чат бота
    TextTextarea.value = TextBotTextarea.value;
}
function OnClickEditTextSaveBotBtn(id) { //Всплывающее окно. Редактирование текста у бота. Кнока сохранения
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let TN = GetThirdNumberOfElement(id);
    let TextTextarea = document.getElementById("NewTextTextarea");//textarea в окне редактирования
    let TextBotTextarea = document.getElementById("textareaTextBot " + N + " " + SN + " " + TN);//textarea на панели у чат бота
    TextBotTextarea.setAttribute('value', TextTextarea.value);
    OnClickImgExit();
    EnabledNavbarBtn();//включение кнопок находящихся в шапке сайта
    RefreshArrows()//перерисовка стрелок
}
function OnClickAddImgBot(id) {//Всплывающее окно. Создание объекта изображения
    OnClickImgExit();
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel();//создание основы всплывающего меню
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let formUploadImg = document.createElement('form');
    let iframe = document.createElement('iframe');
    let LabelImg = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели -----------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id", "LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Выберите необходимое изображение";
    //----------Создание формы для загрузки и отправки изображений-----------
    formUploadImg.setAttribute('target', 'myIFR');
    formUploadImg.setAttribute('method', 'post');
    formUploadImg.setAttribute('enctype', 'multipart/form-data');
    formUploadImg.setAttribute('class', 'formUploadImg');
    formUploadImg.setAttribute('id', 'formUploadImg');
    formUploadImg.innerHTML = "<label class=\"OpenFile\"><input type=\"file\" name=\"filedata\"  id=\"filedata " + N + " " + SN + "\" class=\"UploadBtn\" accept=\"image/*,image/jpeg\" onclick=\"FileOpen(id);\" />" +
        "Выбрать файл</label>" +
        "<input type=\"button\" value=\"Загрузить\" class=\"SubmitImg\" id=\"SubmitImg " + N + " " + SN + "\" onclick=\"SubmImg(id)\"/>";
    divAddNewInstrumentPanel.append(formUploadImg);
    //----------Создание ифрейм формы для отправки-----------
    iframe.setAttribute('name', 'myIFR');
    iframe.setAttribute('style', 'display: none');
    divAddNewInstrumentPanel.append(iframe);
    //----------Создание label-----------
    LabelImg.setAttribute('class', 'Label');
    LabelImg.setAttribute('id', 'LabelImg');
    divAddNewInstrumentPanel.append(LabelImg);
    //----------Создание блока с ошибками-----------
    LabelError.setAttribute('class', 'LabelError');
    LabelError.setAttribute('id', 'LabelError');
    divAddNewInstrumentPanel.append(LabelError);
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML = "<input type=\"button\" value=\"Создать\" class=\"AddBtn\" id=\"SaveNewImage " + N + " " + SN + "\" disabled=\"disabled\" onclick=\"OnClickCreateNewImgBot(id)\">" +
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"OnClickImgExit(); OnClickAddInstrumentBtnBot(id);\">";

}

function OnClickCreateNewImgBot(id) {//Всплывающее окно, создание нового изобржания, кнопка сохранить
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let formAddInstrumentBtnBot = document.getElementById("formAddInstrumentBtnBot " + N + " " + SN);
    let ImgBot = document.createElement('div');//div внутри которого label,textarea и т.д
    let LabelImgBot = document.createElement('div');//надпись ("Вывод текста")
    let spanTrashImg = document.createElement('span');//иконка мусорки(удаление элемента)
    let ImgContainerBot = document.createElement('div');
    let filedata = document.getElementById("filedata " + N + " " + SN);
    let Cookie = getCookie('FileName');
    let name = filedata.files[0].name;
    if (name.length > 20) {
        name = name.substr(0, 20);
        name += "...";
    }

    ElementKol++;//увеличение числа текстовых элементов
    //----------Создание div(а) внутри которого label,textarea и т.д-----------
    ImgBot.className = "ImgBot";
    ImgBot.setAttribute("id", "ImgBot " + N + " " + SN + " " + ElementKol);
    ImgBot.setAttribute("onmouseover", "OnMouseOverImgBot(id)");
    ImgBot.setAttribute("onmouseout", "OnMouseOutImgBot(id)");
    formAddInstrumentBtnBot.before(ImgBot);
    //----------Создание надписи ("Вывод текста")----------
    LabelImgBot.className = "LabelImgBot";
    ImgBot.append(LabelImgBot);
    LabelImgBot.innerHTML = "Вывод изображения";
    //----------Создание иконки мусорки(удаление элемента)----------
    spanTrashImg.className = "TrashImg";
    spanTrashImg.setAttribute("id", "TrashImg " + N + " " + SN + " " + ElementKol);
    spanTrashImg.setAttribute("style", "opacity:0;");
    spanTrashImg.setAttribute("title", "удалить этот элемент");
    spanTrashImg.setAttribute("onclick", "OnClickRemoveImgBot(id)");
    ImgBot.append(spanTrashImg);
    spanTrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока с изображением и надписью----------
    ImgContainerBot.setAttribute("id", "ImgContainerBot " + N + " " + SN + " " + ElementKol);
    ImgContainerBot.setAttribute("class", "ImgContainerBot");
    ImgBot.append(ImgContainerBot);
    ImgContainerBot.innerHTML = "<img src=\"uploads/" + Cookie + "\" class=\"ImageBot\" width=\"80px\" id=\"Image " + N + " " + SN + " " + ElementKol + "\" onclick=\"ClickImage(id)\">" +
        "<span class = \"LabelImg\">" + name + "</span>";


    OnClickImgExit();//закрыть окно создания элемента
    EnabledNavbarBtn();//включение кнопок находящихся в шапке сайта
    RefreshArrows()//перерисовка стрелок
}

function OnMouseOverTextBot(id) {//отображение иконки редактирования на блоках действиях(показать)
    N = GetNumberOfElement(id);
    SN = GetSecondNumberOfElement(id);
    TN = GetThirdNumberOfElement(id);
    ImgPencilInstrument = document.getElementById("ImgPencil " + N + " " + SN + " " + TN);
    TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style", "opacity: 100")
    ImgPencilInstrument.setAttribute("style", "opacity: 100");
}
function OnMouseOutTextBot(id) {//отображение иконки редактирования на блоках действиях(скрыть)
    N = GetNumberOfElement(id);
    SN = GetSecondNumberOfElement(id);
    TN = GetThirdNumberOfElement(id);
    ImgPencilInstrument = document.getElementById("ImgPencil " + N + " " + SN + " " + TN);
    TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style", "opacity: 0")
    ImgPencilInstrument.setAttribute("style", "opacity: 0");
}

function OnMouseOverImgBot(id) {//отображение иконки редактирования на блоках действиях(показать)
    N = GetNumberOfElement(id);
    SN = GetSecondNumberOfElement(id);
    TN = GetThirdNumberOfElement(id);
    TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style", "opacity: 100")
}
function OnMouseOutImgBot(id) {//отображение иконки редактирования на блоках действиях(скрыть)
    N = GetNumberOfElement(id);
    SN = GetSecondNumberOfElement(id);
    TN = GetThirdNumberOfElement(id);
    TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style", "opacity: 0")
}
function ClickImage(id) {//увеличение изображения
    DisabledNavbarBtn();
    let body = document.body
    let divNewInstrumentPanel = document.createElement('div');//фиксированная панель во весь экран
    let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let Cwidth = document.documentElement.clientWidth;
    let Cheight = document.documentElement.clientHeight;
    let img = document.getElementById(id);
    let ImgOpen = document.createElement('img');
    //----------Создание фиксированной панели-----------
    divNewInstrumentPanel.className = "NewInstrumentPanel";
    divNewInstrumentPanel.setAttribute("id", "NewInstrumentPanel");
    body.prepend(divNewInstrumentPanel);

    ImgOpen.src = img.src;
    ImgOpen.className = "OpenImg";
    ImgOpen.id = img.id;
    ImgOpen.setAttribute('onclick', 'OnClickImgExit()');
    if (img.naturalWidth > img.naturalHeight) {
        if (img.naturalWidth > Cwidth - 400) {
            ImgOpen.width = img.naturalWidth / 2;
        } else {
            ImgOpen.width = img.naturalWidth;
        }
    } else if (img.naturalWidth <= img.naturalHeight) {
        if (img.naturalHeight > Cheight - 400) {
            ImgOpen.height = img.naturalHeight / 2;
        } else {
            ImgOpen.height = img.naturalHeight;
        }
    }

    divNewInstrumentPanel.append(ImgOpen);
}
function SubmImg(id) {//отправка изображений
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let filedata = document.getElementById("filedata " + N + " " + SN);
    let SaveNewImage = document.getElementById("SaveNewImage " + N + " " + SN);
    let LabelError = document.getElementById('LabelError');
    let LabelImg = document.getElementById('LabelImg');
    let formUploadImg = document.getElementById("formUploadImg");
    let SubmitImg = document.getElementById("SubmitImg " + N + " " + SN);
    let ImgExit = document.getElementById("ImgExit");
    let CancelUser = document.getElementById("CancelUser " + N + " " + SN);
    CancelUser.setAttribute(onclick, CancelUser.getAttribute('onclick') + ' clearTimeout(timerId1);');
    ImgExit.setAttribute(onclick, ImgExit.getAttribute('onclick') + '; clearTimeout(timerId1);');

    let i = 0;
    clearTimeout(timerId1);
    LabelImg.innerHTML = "";
    LabelError.innerHTML = "";
    if (filedata.value == "") {
        SaveNewImage.setAttribute('disabled', 'disabled');
        LabelImg.innerHTML = ""
        LabelError.innerHTML = "Ошибка! Необходимо выбрать файл!"
        return;
    }

    deleteCookie("FileName");
    formUploadImg.submit();

    timerId1 = setTimeout(function tick() {//запуск ожидания куков
        if (i > 3) {//если лимит ожидания в две минуты превышен
            LabelImg.innerHTML = ""
            LabelError.innerHTML = "Ошибка! Файл не загружен. Лимит ожидания превышен";
        } else if (getCookie('FileName') == undefined) {//пока куки не найдены
            if (i % 2 == 0) {
                LabelImg.innerHTML = "Загрузка файла."
            } else {
                LabelImg.innerHTML = "Загрузка файла.."
            }
            LabelError.innerHTML = ""
            timerId1 = setTimeout(tick, 1000); // запуск цикла еще раз  
            i++;
        } else if (getCookie('FileName') != undefined && filedata.value != "") {
            LabelError.innerHTML = "";
            SubmitImg.setAttribute('disabled', 'disabled');
            LabelImg.innerHTML = "Файл успешно загружен!"
            SaveNewImage.removeAttribute('disabled');
        }

    });
}
function FileOpen(id) {//открытие файлового менеджера для выбора изображений
    let N = GetNumberOfElement(id);
    let SN = GetSecondNumberOfElement(id);
    let SaveNewImage = document.getElementById("SaveNewImage " + N + " " + SN);
    let filedata = document.getElementById("filedata " + N + " " + SN);
    let LabelError = document.getElementById('LabelError');
    let LabelImg = document.getElementById('LabelImg');
    let SubmitImg = document.getElementById("SubmitImg " + N + " " + SN);
    LabelImg.innerHTML = ""
    LabelError.innerHTML = ""
    SaveNewImage.setAttribute('disabled', 'disabled');
    SubmitImg.removeAttribute('disabled');
    deleteCookie("FileName");
}