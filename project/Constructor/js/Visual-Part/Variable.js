function OnClickAddNewVariable(id){//Всплывающее окно создания новой переменной 
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewVariable = document.createElement('div');//надпись
    let divNewVariable = document.createElement('div');//блок с полем ввода имени новой переменной и надписью к ней
    let divError = document.createElement('div');//Окно с ошибкой
    let divNewVariableValue = document.createElement('div');//блок с полем ввода значения новой  переменной и надписью к нему
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
    //----------Создание блока ввода значения новой переменной -----------
    divNewVariableValue.className = "NewVariableValue";
    divAddNewInstrumentPanel.append(divNewVariableValue);
    divNewVariableValue.innerHTML = "<div style=\"display:inline-block\">Значение переменной:</div>" +
        "<input type=\"text\" id=\"NewVariableName\" class=\"Input\">";
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
