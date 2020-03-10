var VariableId = 3;
//используется NumberOfElement
//используется OnClickImgExit()
//используется CreateWindowPanel()
//используется DisabledNavbarBtn()
//используется SecondNumberOfElement
//используется ThirdNumberOfElement

function OnClickAddNewVariable(id){//Всплывающее окно создания новой переменной 
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewVariable = document.createElement('div');//надпись
    let divNewVariable = document.createElement('div');//блок с полем ввода имени новой переменной и надписью к ней
    let divError = document.createElement('div');//Окно с ошибкой
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели -----------
    divLabelAddNewVariable.className = "Label";
    divLabelAddNewVariable.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewVariable);
    divLabelAddNewVariable.innerHTML="Создание новой переменной";
    //----------Создание блока ввода имени новой переменной -----------
    divNewVariable.className = "NewName";
    divAddNewInstrumentPanel.append(divNewVariable);
    divNewVariable.innerHTML = "<div style=\"display:inline-block\">Имя переменной:</div>" + 
        "<input type=\"text\" id=\"NewVariableName\" class=\"Input\" onfocus=\"OnFocusNameVariable()\" onblur=\"OnBlurNameVariable()\">";
    //----------Создание формы с кнопками -----------
    formBtn.setAttribute("id","formBtnNewVariable")
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" onclick=\"OnClickNewVariableSaveBtn(id)\">" +
    "<input type=\"button\" value=\"Отменить\" class=\"AddBtn\" onclick=\"OnClickImgExit();\">";
    //----------Создание блока с ошибкой-----------
    divError.className="Label";
    divError.setAttribute("id","ErrorNewVariable");
    formBtnNewVariable.before(divError);

}
function OnClickNewVariableSaveBtn(id){ //Всплывающее окно. Кнопка сохранения
    let NewVariableName = document.getElementById("NewVariableName");
    
    if(!NewVariableName.classList.contains('error')){//остальная логика
        let ContainetVariablesPanel = document.getElementById("ContainetVariablesPanel");//окно переменных. список переменных
        let NewVariableName = document.getElementById("NewVariableName");//Всплывающее окно. Ввод имени переменных
        let VariableElement = document.createElement('div');
        let NameVariable = document.createElement('div');
        let BtnRemove = document.createElement('div');
        VariableId++;
        //---------Создания блока переменной-------
        VariableElement.className = "VariableElement";
        VariableElement.setAttribute("id","VariableElement " + VariableId);
        ContainetVariablesPanel.append(VariableElement);
        //---------Создания блока c именем переменной-------
        NameVariable.className = "NameVariable";
        NameVariable.setAttribute("id","NameVariable " + VariableId);
        VariableElement.append(NameVariable);
        NameVariable.innerHTML = NewVariableName.value;
        //---------Создания кнопки удаления переменной-------
        BtnRemove.className = "BtnRemove";
        BtnRemove.setAttribute("id","BtnRemove " + VariableId);
        BtnRemove.setAttribute("onclick","OnClickRemoveVariable(id)");
        VariableElement.append(BtnRemove);
        BtnRemove.innerHTML = "Удалить";
        OnClickImgExit();
    }
}
function OnFocusNameVariable(){//Всплывающее окно. Инпут имени переменной в фокусе
    let divError = document.getElementById("ErrorNewVariable");//блок с ошибками
    let NewVariableName = document.getElementById("NewVariableName");

    if(NewVariableName.classList.contains('error')){
        NewVariableName.classList.remove('error');
    }
    divError.innerHTML = "";//очистка блока с ошибками
}
function OnBlurNameVariable(){//Всплывающее окно. Инпут имени переменной не в фокусе
    let divError = document.getElementById("ErrorNewVariable");//блок с ошибками
    let NewVariableName = document.getElementById("NewVariableName");
    let StrNewVariableName = NewVariableName.value;
    let Num = false;
    let Letter= false;
    if(NewVariableName.value.length > 15){
        if(!NewVariableName.classList.contains('error')){
            NewVariableName.classList.add('error');
        }
        divError.innerHTML="Ошибка!Название переменной не должно превышать 15 символов";
        return 0;  
    }
    if(NewVariableName.value.replace(/\s+/g, '') == ""){//если только пробелы в названии переменной
        if(!NewVariableName.classList.contains('error')){
            NewVariableName.classList.add('error');
        }
        divError.innerHTML="Ошибка!Введите название переменной";
        return 0;
    }
    
    for(let i = 0; i < StrNewVariableName.length; i++){//проверка на наличие букв и цифр
        if((StrNewVariableName[i] >= 'a' && StrNewVariableName[i] <= 'z'))//проверка на наличие букв
        {
            Letter = true;
        }else if(StrNewVariableName[i] >= '0' && StrNewVariableName[i] <= '9'){//проверка на наличие цифр
            Num = true;
        }
        else//если какие то иные символы
        {
            divError.innerHTML="Ошибка!Имя переменной должно содержать латинские буквы или латинские буквы и цифры";
            if(!NewVariableName.classList.contains('error')){
                NewVariableName.classList.add('error');
            }
            return 0;
        }
    }
    if(Letter == false && Num == true){//если имя переменной состоит только из цифр
        divError.innerHTML="Ошибка!Имя переменной не может состоять только из чисел.Имя переменной должно содержать латинские буквы или латинские буквы и цифры ";
        if(!NewVariableName.classList.contains('error')){
            NewVariableName.classList.add('error');
        }
    }
}
function OnClickCloseVariablePanel(){//Окно переменных. кнопка закрыть
    let VariablesPanel = document.getElementById("VariablesPanel");
    let NewVariableBtn = document.getElementById("NewVariableBtn");
    VariablesPanel.setAttribute("hidden","hidden");
    NewVariableBtn.classList.remove('Active')
}
function OnClickOpenPanelVariables(){//Открытие окна переменных
    let NewVariableBtn = document.getElementById("NewVariableBtn");
    let VariablesPanel = document.getElementById("VariablesPanel");
    if(!NewVariableBtn.classList.contains('Active')){
        VariablesPanel.removeAttribute("hidden");
        NewVariableBtn.classList.add('Active')
    }else{
        VariablesPanel.setAttribute("hidden","hidden");
        NewVariableBtn.classList.remove('Active')
    }
}
function OnClickRemoveVariable(id){//Окно переменных. Кнопка удаления переменных. Создание всплывающего окно подтверждения
    CreateWindowPanel();
    DisabledNavbarBtn()

    let N = NumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели -----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="При удалении переменной произойдет ее удаление из всех связанных элементов. Вы уверены что хотите удалить переменную?";
    divAddNewInstrumentPanel.append(formBtn);
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Да\" class=\"AddBtn\" id=\"RemoveVariable " + N + "\"onclick=\"OnClickAcceptRemoveVariable(id)\">" +
    "<input type=\"button\" value=\"Отменить\" class=\"AddBtn\" id=\"CancelRemoveVariable\" onclick=\"OnClickImgExit()\">";
}   
function OnClickAcceptRemoveVariable(id){
    let NVariableId = NumberOfElement(id);
    let Variables = document.getElementsByClassName("InputVariable");
    let arr = [];
    for(let i = 0; i< Variables.length; i++){//поиск связанных элементов с переменными
        arr[i] = Variables[i];
    }
    NameVariable = document.getElementById("NameVariable " + NVariableId);
    OnClickImgExit();
    for(let i = 0; i< arr.length; i++){//удаление всех связанных переменных из элементов
        if(arr[i].value == NameVariable.innerHTML.replace(/\s/g, '')){
            let DivFormUser = document.getElementById("DivFormUser " + NumberOfElement(arr[i].getAttribute('id')) + " " +
                SecondNumberOfElement(arr[i].getAttribute('id')) + " " + ThirdNumberOfElement(arr[i].getAttribute('id')));//переменная на панели
            DivFormUser.remove();
        }
    }
    let VariableElement = document.getElementById("VariableElement " + NVariableId);//переменная в окне переменных
    VariableElement.remove();
}