function OnClickAddNewVariable(id){//Всплывающее окно создания новой переменной 
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewVariable = document.createElement('div');//надпись
    let divNewVariable = document.createElement('div');//блок с полем ввода имени новой переменной и надписью к ней
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
        "<input type=\"text\" id=\"NewVariableName\" class=\"Input\">";
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

}
function OnClickNewVariableSaveBtn(id){ //Всплывающее окно. Кнопка сохранения
    let StrNewVariableName = document.getElementById("NewVariableName").value;//название переменной
    let formBtnNewVariable = document.getElementById("formBtnNewVariable");//форма с кнопками сохранения и отмены(необходимо для добавления сообщения об ошибки)
    let error = false;//наличие ошибки 
    if(StrNewVariableName.replace(/\s+/g, '') == ""){//если только пробелы в названии переменной
        if(document.getElementById("ErrorNewVariable") != null){//если сообщение уже высвечивалось то удалить его
            document.getElementById("ErrorNewVariable").remove();
        }
        error = true;
        let divError = document.createElement('div');//Окно с ошибкой
        divError.className="Label";
        divError.setAttribute("id","ErrorNewVariable");
        formBtnNewVariable.prepend(divError);
        divError.innerHTML="Введите название переменной";
        return 0;
    }
    for(let i = 0; i < StrNewVariableName.length; i++){
        if((StrNewVariableName[i] >= 'a' && StrNewVariableName[i] <= 'z'))
        {
            error = false;
            continue
        }
        else
        {
            if(document.getElementById("ErrorNewVariable") != null){//если сообщение уже высвечивалось то удалить его
                document.getElementById("ErrorNewVariable").remove();
            }
            let divError = document.createElement('div');//Окно с ошибкой
            divError.className="Label";
            divError.setAttribute("id","ErrorNewVariable");
            formBtnNewVariable.prepend(divError);
            divError.innerHTML="Имя переменной должно содержать только латинские буквы";
            error = true;
            break
        }
    }


    if(error == false)//остальная логика по сохранению переменной
    {

    }
}
