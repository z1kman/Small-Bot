function CancelUser(id){//Всплывающее окно. Отмена создания какого либо элемента у пользователя
    
    if( NameOfElement(id) == "CancelUserNewText" || NameOfElement(id) == "CancelUserNewNumber"){
        let AddNewPanel = document.getElementById("AddNewPanel");
        AddNewPanel.removeAttribute("hidden");
        let AddNewPanel1 = document.getElementById("AddNewPanel1");
        AddNewPanel1.remove();
    }
    else{
    OnClickImgExit();
    OnClickAddInstrumentBtnUser(id);
    }
}
function OnClickAddInstrumentBtnUser(id){ //Всплывающее окно. Окно создания новых элементов у пользователя
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Выберите действе осуществляемое пользователем";
    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    formBtn.innerHTML="<input type=\"button\" value=\"Нажатие на кнопку\" class=\"AddBtn\" id=\"AddButtonBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddButtonUser(id)\"> " +
    "<input type=\"button\" value=\"Ввод текста\" class=\"AddBtn\" id=\"AddNumberBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddTextUser(id)\">" +
    "<input type=\"button\" value=\"Ввод числа\" class=\"AddBtn\" id=\"AddTextBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddNumberUser(id)\">" +
    "<input type=\"button\" value=\"Ввод email\" class=\"AddBtn\" id=\"AddEmailBtnUser " + N + " " + SN + "\" onclick=\"OnClickAddEmailUser(id)\">";
}
function OnClickAddButtonUser(id){ //Всплывающее окно. Окно создания новой кнопки
    let Name = NameOfElement(id);
    if(Name == "AddButtonBtnUser"){
        OnClickImgExit();
    }
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let divLabelBlack = document.createElement('div');//блок с полем для ввода текста
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками
    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Введите текст отображаемый на кнопке";
    //----------Создание блока с полем для ввода текста-----------
    divLabelBlack.className = "LabelBlack";
    divAddNewInstrumentPanel.append(divLabelBlack);
    divLabelBlack.innerHTML = "<label>Текст:<input type=\"text\" id=\"NewButtonText\" class=\"InputOther1\" onfocus=\"OnFocusNewButtonText()\" onblur=\"OnBlurNewButtonText()\" style=\"margin-top:20px;\"></label>"
    //----------Создание формы для кнопок и сами кнопки-----------
    formBtn.setAttribute("id","formNewButton");
    divAddNewInstrumentPanel.append(formBtn);
    if(Name == "AddButtonBtnUser"){
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"AddNewButtonBtnUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewButtonUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }
    else if(Name == "ImgPencil"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveEditButtonBtnUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickSaveEditButtonUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"OnClickImgExit()\">";
    }
    //----------Окно для ошибки-----------
    LabelError.className = "LabelError";
    LabelError.setAttribute("id","ErrorNewButton");
    formBtn.prepend(LabelError);
}
function OnBlurNewButtonText(){ //Всплывающее окно. Ввод текста кнопки. Расфокус на поле ввода
    NewButtonText = document.getElementById("NewButtonText");
    ErrorNewButton = document.getElementById("ErrorNewButton");
    if (NewButtonText.value.length > 15) {
        NewButtonText.classList.add('invalid');
        ErrorNewButton.innerHTML = "Максимальная длина текста не должна превышать 15 символов";
      }
}
function OnFocusNewButtonText(){//Всплывающее окно. Ввод текста кнопки. Фокус на поле ввода
    NewButtonText = document.getElementById("NewButtonText");
    ErrorNewButton = document.getElementById("ErrorNewButton");
    if (NewButtonText.classList.contains('invalid')) {
        NewButtonText.classList.remove('invalid');
        ErrorNewButton.innerHTML = "";
      }
}
function OnClickAddNumberUser(id){ //Всплывающее окно. Окно создания ввода числа
    let Name = NameOfElement(id);
    let Element = "";
    if(Name == "AddTextBtnUser"){
        OnClickImgExit();
    }

    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let FormRadio = document.createElement('form');
    let DivNumber = document.createElement('div');
    let FormCheckbox = document.createElement('form');
    let DivIndicatedNumber = document.createElement('div');
    let DivRangeNumber = document.createElement('div');
    let LabelBlack1 = document.createElement('div');
    let DivMaskNumber = document.createElement('div');
    let LabelBlack2 = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    
    if(Name == "ImgPencil") //определение какого типа элемент
    {
        let TN = ThirdNumberOfElement(id);
        let DivUserNumber  = document.getElementById("DivUserNumber " + N + " " + SN + " " + TN);
        for(let i = 0; i < DivUserNumber.childNodes.length; i++ ){
            if(DivUserNumber.childNodes[i] != "[object Text]"){
                if(DivUserNumber.childNodes[i].hasAttribute('class')){
                    if(DivUserNumber.childNodes[i].getAttribute('class') == "IndicatedNumberUser"){
                        Element = "IndicatedNumberUser";
                        break;
                    }
                    else if(DivUserNumber.childNodes[i].getAttribute('class') == "RangeNumberUser"){
                        Element = "RangeNumberUser";
                        break;
                    }else if(DivUserNumber.childNodes[i].getAttribute('class') == "MaskNumberUser"){
                        Element = "MaskNumberUser";
                        break;
                    }
                    else{
                        Element = "Number";
                    }
                }
            }
        }
    }

    
    //----------------Добавление блока с надписью----------------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Выберите необходимое действие";
    //----------------Создание формы с комбобоксами---------------
    FormRadio.className="FormRadio";
    divAddNewInstrumentPanel.append(FormRadio);
    if(Name == "ImgPencil"){
        if(Element == "Number" || Element == "IndicatedNumberUser"){
            FormRadio.innerHTML="<input type=\"radio\" checked=\"checked\" class=\"RadioButton\" id=\"InputNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
            "<label for=\"InputNumber\">Ввод числа</label>" +
            "<input type=\"radio\" class=\"RadioButton\" id=\"RangeNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
            "<label for=\"RangeNumber\">Ввод числа в диапазоне</label>" +
            "<input type=\"radio\" class=\"RadioButton\" id=\"MaskNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" + 
            "<label for=\"MaskNumber\">Ввод числа по маске</label>";
        }else if(Element == "RangeNumberUser"){
            FormRadio.innerHTML="<input type=\"radio\" class=\"RadioButton\" id=\"InputNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
            "<label for=\"InputNumber\">Ввод числа</label>" +
            "<input type=\"radio\" class=\"RadioButton\" checked=\"checked\" id=\"RangeNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
            "<label for=\"RangeNumber\">Ввод числа в диапазоне</label>" +
            "<input type=\"radio\" class=\"RadioButton\" id=\"MaskNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" + 
            "<label for=\"MaskNumber\">Ввод числа по маске</label>";
        }else if(Element == "MaskNumberUser"){
            FormRadio.innerHTML="<input type=\"radio\" class=\"RadioButton\" id=\"InputNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
            "<label for=\"InputNumber\">Ввод числа</label>" +
            "<input type=\"radio\" class=\"RadioButton\" id=\"RangeNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
            "<label for=\"RangeNumber\">Ввод числа в диапазоне</label>" +
            "<input type=\"radio\" class=\"RadioButton\" id=\"MaskNumber\" checked=\"checked\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" + 
            "<label for=\"MaskNumber\">Ввод числа по маске</label>";
        }
    }else{
        FormRadio.innerHTML="<input type=\"radio\" checked=\"checked\" class=\"RadioButton\" id=\"InputNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
        "<label for=\"InputNumber\">Ввод числа</label>" +
        "<input type=\"radio\" class=\"RadioButton\" id=\"RangeNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" +
        "<label for=\"RangeNumber\">Ввод числа в диапазоне</label>" +
        "<input type=\"radio\" class=\"RadioButton\" id=\"MaskNumber\" name=\"Num\" onchange=\"OnChangeCheckRadioNumber(id)\">" + 
        "<label for=\"MaskNumber\">Ввод числа по маске</label>";
    }
    //----------------Создание блока в котором чекбокс и поле ввода определенного числа---------------
    DivNumber.setAttribute("id","DivNumber");
    divAddNewInstrumentPanel.append(DivNumber);
    //----------------Создание чекбокса для ввода определенного числа---------------
    FormCheckbox.className = "FormCheckbox";
    DivNumber.append(FormCheckbox);
    if(Name == "ImgPencil"){
        if(Element == "IndicatedNumberUser"){
            FormCheckbox.innerHTML = "<input type=\"checkbox\" checked=\"checked\" class=\"Checkbox\" id=\"NumberCheckbox\" onchange=\"OnChangeCheckboxNumber(id)\">" +
        "<label for=\"NumberCheckbox\">Указать необходимое число</label>";
        }else if(Element == "Number"){
            FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"NumberCheckbox\" onchange=\"OnChangeCheckboxNumber(id)\">" +
        "<label for=\"NumberCheckbox\">Указать необходимое число</label>";
        }else{
            FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"NumberCheckbox\" onchange=\"OnChangeCheckboxNumber(id)\">" +
        "<label for=\"NumberCheckbox\">Указать необходимое число</label>";
            DivNumber.setAttribute("hidden","hidden");
        }
    }else{
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"NumberCheckbox\" onchange=\"OnChangeCheckboxNumber(id)\">" +
        "<label for=\"NumberCheckbox\">Указать необходимое число</label>";
    }
    //----------------Создание поля для ввода определенного числа---------------
    DivIndicatedNumber.setAttribute("id","DivIndicatedNumber");
    DivNumber.append(DivIndicatedNumber);
    if(Name == "ImgPencil"){
        if(Element == "IndicatedNumberUser"){
            let TN = ThirdNumberOfElement(id);
            let UserNumberIdicated = document.getElementById("UserNumberIdicated " + N + " " + SN + " " + TN);
            DivIndicatedNumber.innerHTML = "<label>Число:<input type=\"number\" class=\"InputNumber\" id=\"IndicatedNumber\" value=\"" + UserNumberIdicated.value + "\"onfocus=\"OnFocusNumberError(id)\" ></label>";  
        }
        else{
            DivIndicatedNumber.setAttribute("hidden","hidden");
            DivIndicatedNumber.innerHTML = "<label>Число:<input type=\"number\" class=\"InputNumber\" id=\"IndicatedNumber\" onfocus=\"OnFocusNumberError(id)\" ></label>";
        }
    }else{
        DivIndicatedNumber.setAttribute("hidden","hidden");
        DivIndicatedNumber.innerHTML = "<label>Число:<input type=\"number\" class=\"InputNumber\" id=\"IndicatedNumber\" onfocus=\"OnFocusNumberError(id)\" ></label>";
    }
    //----------------Создание блока для ввода определенного диапазона---------------
    DivRangeNumber.setAttribute("id","DivRangeNumber");
    if(Name == "ImgPencil"){
        if(Element == "RangeNumberUser"){
        }
        else{
            DivRangeNumber.setAttribute("hidden","hidden");
        }
    }else{
        DivRangeNumber.setAttribute("hidden","hidden");
    }
    divAddNewInstrumentPanel.append(DivRangeNumber);
    //----------------Создание блока подписи для ввода определенного диапазона---------------
    LabelBlack1.className = "LabelBlack";
    DivRangeNumber.append(LabelBlack1);
    if(Name == "ImgPencil"){
        if(Element == "RangeNumberUser"){
            let TN = ThirdNumberOfElement(id);
            let InputNumberUserOne = document.getElementById("InputNumberUserOne " + N + " " + SN + " " + TN);
            let InputNumberUserTwo = document.getElementById("InputNumberUserTwo " + N + " " + SN + " " + TN);
            LabelBlack1.innerHTML = "Укажите диапазон" + 
            "<br/>" + 
            "<label>от<input type=\"number\"  value=\"" + InputNumberUserOne.value + "\"class=\"InputNumber\" id=\"InputNumber 1\" onfocus=\"OnFocusNumberError(id)\"></label>" + 
            "<label>до<input type=\"number\" value=\"" + InputNumberUserTwo.value + "\" class=\"InputNumber\" id=\"InputNumber 2\" onfocus=\"OnFocusNumberError(id)\"></label>";
        }
        else{
            LabelBlack1.innerHTML = "Укажите диапазон" + 
            "<br/>" + 
            "<label>от<input type=\"number\" class=\"InputNumber\" id=\"InputNumber 1\" onfocus=\"OnFocusNumberError(id)\"></label>" + 
            "<label>до<input type=\"number\" class=\"InputNumber\" id=\"InputNumber 2\" onfocus=\"OnFocusNumberError(id)\"></label>";
        }
    }else{
        LabelBlack1.innerHTML = "Укажите диапазон" + 
        "<br/>" + 
        "<label>от<input type=\"number\" class=\"InputNumber\" id=\"InputNumber 1\" onfocus=\"OnFocusNumberError(id)\"></label>" + 
        "<label>до<input type=\"number\" class=\"InputNumber\" id=\"InputNumber 2\" onfocus=\"OnFocusNumberError(id)\"></label>";
    }
     //----------------Создание блока для ввода маски---------------
     if(Name == "ImgPencil"){
        if(Element == "MaskNumberUser"){
        }
        else{
            DivMaskNumber.setAttribute("hidden","hidden");  
        }
     }else{
        DivMaskNumber.setAttribute("hidden","hidden");  
     }
     DivMaskNumber.setAttribute("id","DivMaskNumber");
     divAddNewInstrumentPanel.append(DivMaskNumber);
     //----------------Создание подписи блока для ввода маски---------------
     LabelBlack2.className = "LabelBlack";
     DivMaskNumber.append(LabelBlack2);
     if(Name == "ImgPencil"){
        if(Element == "MaskNumberUser"){
            let TN = ThirdNumberOfElement(id);
            let MaskInputNumberUser = document.getElementById("MaskInputNumberUser " + N + " " + SN + " " + TN);
            LabelBlack2.innerHTML = "<label>Введите маску:<input type=\"input\" value=\"" + MaskInputNumberUser.value + "\" class=\"InputOther1\" id=\"MaskInputNumber\" onfocus=\"OnFocusNumberError(id)\"></label>" +
        "<div><input type=\"button\" class=\"helpBtn\" id=\"helpBtnMask\" value=\"справка\" onclick=\"OnClickHelpBtnMask()\"></div>";
        }else{
            LabelBlack2.innerHTML = "<label>Введите маску:<input type=\"input\" class=\"InputOther1\" id=\"MaskInputNumber\" onfocus=\"OnFocusNumberError(id)\"></label>" +
            "<div><input type=\"button\" class=\"helpBtn\" id=\"helpBtnMask\" value=\"справка\" onclick=\"OnClickHelpBtnMask()\"></div>";  
        }
     }
     else{
        LabelBlack2.innerHTML = "<label>Введите маску:<input type=\"input\" class=\"InputOther1\" id=\"MaskInputNumber\" onfocus=\"OnFocusNumberError(id)\"></label>" +
        "<div><input type=\"button\" class=\"helpBtn\" id=\"helpBtnMask\" value=\"справка\" onclick=\"OnClickHelpBtnMask()\"></div>";
     }
     //----------------Создание подписи блока вывода ошибки---------------     
     LabelError.className = "LabelError";
     LabelError.setAttribute("id","ErrorNewNumber");
     divAddNewInstrumentPanel.append(LabelError);
     //----------------Создание формы с кнопками---------------    
     formBtn.setAttribute("id","formNewNumber")
     divAddNewInstrumentPanel.append(formBtn);
     if(Name == "AddTextBtnUser" || Name == "CancelUserNewNumber"){//если открыто из окна создания нового элемента
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextNewNumberUser " + N + " " + SN + "\" onclick=\"OnClickNextNewNumberUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
     }else if(Name == "ImgPencil"){//если открыто через кнопку редактирования
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextEditNumberUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickNextNewNumberUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN +  " " + TN + "\" onclick=\"OnClickImgExit()\">";
     }
}
function OnChangeCheckRadioNumber(id){//Всплывающее окно. Окно создания ввода числа. Событие изменения RadioButton
    DivRangeNumber = document.getElementById("DivRangeNumber");
    DivMaskNumber = document.getElementById("DivMaskNumber");
    DivNumber = document.getElementById("DivNumber");
    ErrorNewNumber = document.getElementById("ErrorNewNumber");
    if(id === "InputNumber"){
        DivNumber.removeAttribute("hidden");
        DivRangeNumber.setAttribute("hidden","hidden");
        DivMaskNumber.setAttribute("hidden","hidden");
        ErrorNewNumber.innerHTML = "";
    }
    else if(id === "RangeNumber"){
        DivRangeNumber.removeAttribute("hidden");
        DivMaskNumber.setAttribute("hidden","hidden");
        DivNumber.setAttribute("hidden","hidden");
        ErrorNewNumber.innerHTML = "";
    }
    else if(id === "MaskNumber"){
        DivMaskNumber.removeAttribute("hidden");
        DivRangeNumber.setAttribute("hidden","hidden");
        DivNumber.setAttribute("hidden","hidden");
        ErrorNewNumber.innerHTML = "";
    }
}
function OnChangeCheckboxNumber(id){//Всплывающее окно. Окно создания ввода числа. Событие изменения CheckBox
    DivIndicatedNumber = document.getElementById("DivIndicatedNumber");
    NumberCheckbox = document.getElementById("NumberCheckbox");
    if(id === "NumberCheckbox" && NumberCheckbox.checked){
        DivIndicatedNumber.removeAttribute("hidden");
    }
    else if(!NumberCheckbox.checked){
        DivIndicatedNumber.setAttribute("hidden","hidden");
    }
}
function OnClickNextNewNumberUser(id){//Всплывающее окно. Действие добавление числа. Кнопка далее
    //обработка исключительных ситуаций
    let InputNumber = document.getElementById("InputNumber");//комбобокс ввод числа(возможно ввод определенного числа);
    let RangeNumber = document.getElementById("RangeNumber");//комбобокс ввод диапазона чисел
    let MaskNumber = document.getElementById("MaskNumber");//комбобокс ввод числа по маске
    let NumberCheckbox = document.getElementById("NumberCheckbox");//чекбокс ввод определенного числа
    let ErrorNewNumber = document.getElementById("ErrorNewNumber");//блок для вывода ошибок

    let InputNumber1 = document.getElementById("InputNumber 1");//поле ввода первого диапазона
    let InputNumber2 = document.getElementById("InputNumber 2");//поле ввода второго диапазона
    MaskInputNumber = document.getElementById("MaskInputNumber");//поле ввода маски
    if(InputNumber.checked == true && NumberCheckbox.checked == true &&  IndicatedNumber.value == ""){
        ErrorNewNumber.innerHTML = "Ошибка! Укажите необходимое число";
        IndicatedNumber.classList.add('invalid');
    }else if(RangeNumber.checked == true && (InputNumber1.value == "" || InputNumber2.value == ""))
    {
        ErrorNewNumber.innerHTML = "Ошибка! Укажите необходимый диапазон";
        InputNumber1.classList.add('invalid');
        InputNumber2.classList.add('invalid');
    }
    else if(MaskNumber.checked == true && MaskInputNumber.value == ""){
        ErrorNewNumber.innerHTML = "Ошибка! Задайте маску";
        MaskInputNumber.classList.add('invalid');
    }
    else{
        let Name = NameOfElement(id);
        DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
        let N = NumberOfElement(id);
        let SN = SecondNumberOfElement(id);
        let divLabelAddNewInstrument = document.createElement('div');//надпись
        let DivRecInVariableNumber = document.createElement('div');
        let FormCheckbox = document.createElement('form');
        let DivIndicatedVariableNumber = document.createElement('div');
        let LabelError = document.createElement('div');
        let formBtn = document.createElement('form');//форма с кнопками\

        let AddNewPanel = document.getElementById("AddNewPanel");
        let divNewInstrumentPanel = document.getElementById("NewInstrumentPanel");        
        let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
        let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий 
        
        AddNewPanel.setAttribute("hidden","hidden");
         //----------Создание панели выбора действий-----------
         divAddNewInstrumentPanel.className="AddNewPanel";
         divAddNewInstrumentPanel.setAttribute("id","AddNewPanel1");
         divNewInstrumentPanel.prepend(divAddNewInstrumentPanel);
         //----------Создание кнопки закрытия панели выбора действий-----------
         divImgExit.className="ImgExit";
         divImgExit.setAttribute("onclick","OnClickImgExit()");
         divAddNewInstrumentPanel.prepend(divImgExit);
         divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">" 

         //----------------Добавление блока с надписью----------------
        divLabelAddNewInstrument.className = "Label";
        divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
        divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
        divLabelAddNewInstrument.innerHTML = "Записать введеное пользователем число в переменную?";
         //----------------Создание блока в котором чекбокс и поле выбора переменной---------------
         DivRecInVariableNumber.setAttribute("id","DivRecInVariableNumber");
         divAddNewInstrumentPanel.append(DivRecInVariableNumber);
        //----------------Создание чекбокса для выбора переменной---------------
        FormCheckbox.className = "FormCheckbox";
        DivRecInVariableNumber.append(FormCheckbox);
        if(InputNumber.checked && !NumberCheckbox.checked){
            FormCheckbox.innerHTML = "<input type=\"checkbox\" checked=\"checked\" disabled=\"disabled\" class=\"Checkbox\" id=\"RecInVariableNumber\" onchange=\"OnChangeCheckboxRecInVariableNumber(id)\">" +
            "<label for=\"RecInVariableNumber\">Да, записать</label>";
        }
        else{
            FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"RecInVariableNumber\" onchange=\"OnChangeCheckboxRecInVariableNumber(id)\">" +
            "<label for=\"RecInVariableNumber\">Да, записать</label>";
        }
        //----------------Создание поля для ввода определенного числа---------------
        DivIndicatedVariableNumber.setAttribute("id","DivIndicatedVariableNumber");
        if(InputNumber.checked && !NumberCheckbox.checked){
        }else{
            DivIndicatedVariableNumber.setAttribute("hidden","hidden"); 
        }
        DivRecInVariableNumber.append(DivIndicatedVariableNumber);
        let NameVariable = document.getElementsByClassName("NameVariable");
        let Label = document.createElement('label');
        let Select = document.createElement('select');
        DivIndicatedVariableNumber.append(Label);
        Label.innerHTML = "Выберите переменную:";
        Select.className = "Select";
        Select.setAttribute("id","Select");
        Label.append(Select);
        for(let i = 0; i<NameVariable.length; i++){
            let Option = document.createElement('option');
            Select.append(Option);
            Option.innerHTML = NameVariable[i].innerHTML.replace(/\s/g, '');
        }
        //----------------Создание подписи блока вывода ошибки---------------     
        LabelError.className = "LabelError";
        LabelError.setAttribute("id","ErrorNewNumber");
        divAddNewInstrumentPanel.append(LabelError);
        //----------------Создание формы с кнопками---------------    
        formBtn.setAttribute("id","formNewNumber")
        divAddNewInstrumentPanel.append(formBtn);
        if(Name == "NextNewNumberUser"){
            formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveNewNumberUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewNumberUser(id)\">" + 
            "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewNumber " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
        }else if(Name == "NextEditNumberUser"){
            let TN = ThirdNumberOfElement(id);
            formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveNewNumberUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickNextEditNumberUser(id)\">" + 
            "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewNumber " + N + " " + SN + " " + TN + "\" onclick=\"CancelUser(id)\">";
        }
    }
    
}
function OnChangeCheckboxRecInVariableNumber(id){//Всплывающее окно. Проверка чек бокса на запись значения элемента в переменную
    RecInVariableNumber = document.getElementById("RecInVariableNumber");
    DivIndicatedVariableNumber = document.getElementById("DivIndicatedVariableNumber");
    
    if(RecInVariableNumber.checked == true){
        DivIndicatedVariableNumber.removeAttribute("hidden");
    }else{
        DivIndicatedVariableNumber.setAttribute("hidden","hidden");
    }
}
function OnFocusNumberError(id){//Всплывающее окно. Ввод числа у пользователя. Фокус на поле ввода
    NumberId = document.getElementById(id);
    ErrorNewNumber = document.getElementById("ErrorNewNumber");
    if (NumberId.classList.contains('invalid')) {
        NumberId.classList.remove('invalid');
        ErrorNewNumber.innerHTML = "";
      }
}
function OnClickAddEmailUser(id){//Всплывающее меню. Создание Email
    let Name = NameOfElement(id);
    if(Name == "AddEmailBtnUser"){
        OnClickImgExit();
    }
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    CreateWindowPanel()//создание основы всплывающего меню
    var N = NumberOfElement(id);
    var SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let LabelBlack = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    //----------Создание надписи панели выбора действий-----------
    divLabelAddNewInstrument.className="Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML="Выберите переменную в которую необходимо записать введеный email";
    //----------Создание блока для выбора переменной-----------
    LabelBlack.className = "LabelBlack";
    LabelBlack.setAttribute("id","LabelBlack");
    divAddNewInstrumentPanel.append(LabelBlack);
    let NameVariable = document.getElementsByClassName("NameVariable");
    let Label = document.createElement('label');
    let Select = document.createElement('select');
    LabelBlack.append(Label);
    Label.innerHTML = "Выберите переменную:";
    Select.className = "Select";
    Select.setAttribute("id","Select");
    Label.append(Select);
    for(let i = 0; i<NameVariable.length; i++){
        let Option = document.createElement('option');
        Select.append(Option);
        Option.innerHTML = NameVariable[i].innerHTML.replace(/\s/g, '');
    }

    //----------Создание формы для кнопок и сами кнопки-----------
    divAddNewInstrumentPanel.append(formBtn);
    if(Name == "AddEmailBtnUser"){
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"AddNewEmailUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewEmailUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }else if(Name == "ImgPencil"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML="<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"AddNewEmailUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickSaveEditEmailUser(id)\">" + 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"OnClickImgExit()\">";
    }
    //----------Окно для ошибки-----------
    LabelError.className = "LabelError";
    LabelError.setAttribute("id","ErrorNewEmail");
    formBtn.prepend(LabelError);
}
function OnClickAddTextUser(id){ //Всплывающее меню. Функция создания меню создания текста
    let Name = NameOfElement(id);
    let Element = "";
    if(Name == "AddNumberBtnUser"){
        OnClickImgExit();
    }

    CreateWindowPanel();
    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divAddNewInstrumentPanel = document.getElementById("AddNewPanel");
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let FormRadio = document.createElement('form');
    let DivText = document.createElement('div');
    let FormCheckbox = document.createElement('form');
    let DivIndicatedText = document.createElement('div');
    let DivTagText = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    if(Name == "ImgPencil") //определение какого типа элемент
    {
        let TN = ThirdNumberOfElement(id);
        let DivUserText  = document.getElementById("DivUserText " + N + " " + SN + " " + TN);
        for(let i = 0; i < DivUserText.childNodes.length; i++ ){
            if(DivUserText.childNodes[i] != "[object Text]"){
                if(DivUserText.childNodes[i].hasAttribute('class')){
                    if(DivUserText.childNodes[i].getAttribute('class') == "TagTextUser"){
                        Element = "TagTextUser";
                        break;
                    }
                    else if(DivUserText.childNodes[i].getAttribute('class') == "IndicatedTextUser"){
                        Element = "IndicatedTextUser";
                        break;
                    }
                    else{
                        Element = "Text";
                    }
                }
            }
        }
    }

    //----------------Добавление блока с надписью----------------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Выберите необходимое действие";
    //----------------Создание формы с комбобоксами---------------
    FormRadio.className="FormRadio";
    divAddNewInstrumentPanel.append(FormRadio);
    if(Name == "AddNumberBtnUser"){
        FormRadio.innerHTML="<input type=\"radio\" checked=\"checked\" class=\"RadioButton active\" id=\"InputText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">"+
        "<label for=\"InputText\">Ввод текста</label>" +
        "<input type=\"radio\" class=\"RadioButton\" id=\"TagText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">" +
        "<label for=\"TagText\">Ввод текста(чтение по тегам)</label>";
    }
    else if(Name == "ImgPencil"){
        if(Element == "Text" || Element == "IndicatedTextUser"){
            FormRadio.innerHTML="<input type=\"radio\" class=\"RadioButton active\" checked=\"checked\" id=\"InputText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">"+
            "<label for=\"InputText\">Ввод текста</label>" +
            "<input type=\"radio\" class=\"RadioButton\" id=\"TagText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">" +
            "<label for=\"TagText\">Ввод текста(чтение по тегам)</label>";
        }
        else if(Element == "TagTextUser"){
            FormRadio.innerHTML="<input type=\"radio\" class=\"RadioButton\" id=\"InputText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">"+
            "<label for=\"InputText\">Ввод текста</label>" +
            "<input type=\"radio\" class=\"RadioButton active\" checked=\"checked\" id=\"TagText\" name=\"Text\" onchange=\"OnChangeCheckRadioText(id)\">" +
            "<label for=\"TagText\">Ввод текста(чтение по тегам)</label>";
        }
    }
    //----------------Создание блока в котором чекбокс и поле ввода определенного текста--------------
    DivText.setAttribute("id","DivText");
    if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "TagTextUser"){
            DivText.setAttribute("hidden","hidden");
        }
    }
    divAddNewInstrumentPanel.append(DivText);
    //----------------Создание чекбокса для ввода определенного слова---------------
    FormCheckbox.className = "FormCheckbox";
    DivText.append(FormCheckbox);
    if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "Text")
        {
            FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
            "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>";
        }
        else if(Element == "IndicatedTextUser"){
            FormCheckbox.innerHTML = "<input type=\"checkbox\" checked=\"checked\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
            "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>";
        }
        else{
            FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
            "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>"; 
        }
    }else{
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"TextCheckbox\" onchange=\"OnChangeCheckboxText(id)\">"+
        "<label for=\"TextCheckbox\">Указать необходимое слово/текст</label>";
    }
    //----------------Создание поля для ввода определенного текста---------------
    DivIndicatedText.setAttribute("id","DivIndicatedText");
    DivText.append(DivIndicatedText);
    if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "IndicatedTextUser"){
            let TN = ThirdNumberOfElement(id);
            let UserTextIdicated = document.getElementById("UserTextIdicated " + N + " " + SN + " " + TN);
            DivIndicatedText.innerHTML = "<label>Введите слово или текст:<input type=\"input\" class=\"InputOther1\" id=\"IndicatedText\" value = \"" + UserTextIdicated.value + "\" onfocus=\"OnFocusTextError(id)\"></label>";
        }else{
            DivIndicatedText.setAttribute("hidden","hidden");
            DivIndicatedText.innerHTML = "<label>Введите слово или текст:<input type=\"input\" class=\"InputOther1\" id=\"IndicatedText\" onfocus=\"OnFocusTextError(id)\"></label>";
        }
    }else{
        DivIndicatedText.setAttribute("hidden","hidden");
        DivIndicatedText.innerHTML = "<label>Введите слово или текст:<input type=\"input\" class=\"InputOther1\" id=\"IndicatedText\" onfocus=\"OnFocusTextError(id)\"></label>";
    }
   
     //----------------Создание блока для ввода тегов---------------
     DivTagText.setAttribute("id","DivTagText");
     divAddNewInstrumentPanel.append(DivTagText);
     DivTagText.innerHTML = "<label>Введите тег:<input type=\"input\" class=\"InputOther1\" id=\"InputTagText\" onfocus=\"OnFocusTextError(id)\">"+
     "<input type=\"button\" class=\"BtnOther\" id=\"AddNewTag 1\" value=\"Ок\" onclick=\"OnClickAddNewTag(id)\"></label>" +
     "<div class=\"LabelBlack\" id=\"TagBlock\" hidden=\"hidden\"> Ваши теги:<br /></div>";
     if(Name == "ImgPencil"){//Если открыт режим редактирования
        if(Element == "TagTextUser"){//Если редактируется текст с тегами
            let TN = ThirdNumberOfElement(id);
            let TagLabel = document.getElementById("TagLabel " + N + " " + SN + " " + TN);
            let TagBlock = document.getElementById("TagBlock");
            let AddNewTag1 = document.getElementById("AddNewTag 1");
            TagBlock.removeAttribute('hidden');
            AddNewTag1.classList.add('notfirst');  
            for(let i = 0; i < TagLabel.childNodes.length; i++){
                if(TagLabel.childNodes[i] != "[object Text]"){
                    if(TagLabel.childNodes[i].getAttribute('class') == "TagOnPanel"){
                        let TagDiv = document.createElement('div');
                        let Tag = document.createElement('div');
                        TagDiv.className = "TagDiv";
                        TagDiv.setAttribute("id","TagDiv " + i);
                        TagBlock.append(TagDiv);

                        Tag.className = "Tag";
                        Tag.setAttribute("id","Tag " + i);
                        Tag.setAttribute("onclick","OnClickTag(id)");
                        TagDiv.append(Tag);
                        Tag.innerHTML = TagLabel.childNodes[i].innerHTML;
                        TagKol++;
                    }
                }
            }
        }
        else
        {
            DivTagText.setAttribute("hidden","hidden");
        }
     }else{
        DivTagText.setAttribute("hidden","hidden");
     }
     //----------------Создание подписи блока вывода ошибки---------------     
     LabelError.className = "LabelError";
     LabelError.setAttribute("id","ErrorNewNumber");
     divAddNewInstrumentPanel.append(LabelError);
     //----------------Создание формы с кнопками---------------    
     formBtn.setAttribute("id","formNewNumber")
     divAddNewInstrumentPanel.append(formBtn);
     if(Name == "AddNumberBtnUser"){
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextNewTextUser " + N + " " + SN + "\" onclick=\"OnClickNextNewTextUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }else if(Name == "ImgPencil"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML = "<input type=\"button\" value=\"Далее\" class=\"AddBtn\" id=\"NextEditTextUser " + N + " " + SN + " " + TN  + "\" onclick=\"OnClickNextNewTextUser(id)\">"+ 
        "<input type=\"button\" value=\"Отмена\" class=\"AddBtn\" id=\"CancelUser " + N + " " + SN + "\" onclick=\"OnClickImgExit()\">";
    }
}
function OnFocusTextError(id){ // Всплывающее меню. Создание текста. Ошибка. Фокус на поле ввода
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    ErrorNewNumber.innerHTML="";
}
function OnChangeCheckboxText(id){// Всплывающее меню. Создание текста. Чекбокс: "указать необходимое слово/текст"
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let DivIndicatedText = document.getElementById("DivIndicatedText");

    ErrorNewNumber.innerHTML="";
    if(TextCheckbox.checked == true){
        DivIndicatedText.removeAttribute("hidden");
    }else
        DivIndicatedText.setAttribute("hidden","hidden");
}
function OnClickNextNewTextUser(id){//Всплывающее меню. Создание текста. Кнопка далее
    let Name = NameOfElement(id);
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    let InputText = document.getElementById("InputText");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let IndicatedText = document.getElementById("IndicatedText");
    let TagText = document.getElementById("TagText");
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    let AddNewPanel = document.getElementById("AddNewPanel");
    if(IndicatedText.value.replace(/\s+/g, '') == "" && TextCheckbox.checked == true && InputText.classList.contains('active')){
        ErrorNewNumber.innerHTML = "Ошибка! Введите необходимое слово или текст";
        return 0;
    }else if(TextCheckbox.checked == true && IndicatedText.value.length > 30 && InputText.classList.contains('active') ){
        ErrorNewNumber.innerHTML = "Ошибка! Слово или текст не должно превышать 30 символов"
        return 0;
    }
    else if(((document.getElementsByClassName('TagDiv')).length) == 0 && TagText.checked == true){
        ErrorNewNumber.innerHTML = "Ошибка! Укажите необходимые теги"
        return 0;
    }
    AddNewPanel.setAttribute("hidden","hidden");

    DisabledNavbarBtn();//отключение кнопок находящихся в шапке сайта
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let divLabelAddNewInstrument = document.createElement('div');//надпись
    let DivRecInVariableNumber = document.createElement('div');
    let FormCheckbox = document.createElement('form');
    let DivIndicatedVariableNumber = document.createElement('div');
    let LabelError = document.createElement('div');
    let formBtn = document.createElement('form');//форма с кнопками

    let divAddNewInstrumentPanel = document.createElement('div');//панель по середине фиксированной панели с кнопками выбора действий
    let divImgExit = document.createElement('div');//кнопка закрытия панели выбора действий  
     //----------Создание панели выбора действий-----------
     divAddNewInstrumentPanel.className="AddNewPanel";
     divAddNewInstrumentPanel.setAttribute("id","AddNewPanel1");
     NewInstrumentPanel.prepend(divAddNewInstrumentPanel);
     //----------Создание кнопки закрытия панели выбора действий-----------
     divImgExit.className="ImgExit";
     divImgExit.setAttribute("onclick","OnClickImgExit()");
     divAddNewInstrumentPanel.prepend(divImgExit);
     divImgExit.innerHTML="<img src=\"source/constructor/exit.png\" title=\"Закрыть панель\" width=\"16px\">" 

     //----------------Добавление блока с надписью----------------
    divLabelAddNewInstrument.className = "Label";
    divLabelAddNewInstrument.setAttribute("id","LabelAddNewInstrument");
    divAddNewInstrumentPanel.append(divLabelAddNewInstrument);
    divLabelAddNewInstrument.innerHTML = "Записать введеное пользователем слово или текст в переменную?";
     //----------------Создание блока в котором чекбокс и поле выбора переменной---------------
     DivRecInVariableNumber.setAttribute("id","DivRecInVariableNumber");
     divAddNewInstrumentPanel.append(DivRecInVariableNumber);
    //----------------Создание чекбокса для выбора переменной---------------
    FormCheckbox.className = "FormCheckbox";
    DivRecInVariableNumber.append(FormCheckbox);
    if(InputText.checked && !TextCheckbox.checked){
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" disabled=\"disabled\" checked=\"checked\" id=\"RecInVariableNumber\" onchange=\"OnChangeCheckboxRecInVariableNumber(id)\">" +
        "<label for=\"RecInVariableNumber\">Да, записать</label>"; 
    }
    else{
        FormCheckbox.innerHTML = "<input type=\"checkbox\" class=\"Checkbox\" id=\"RecInVariableNumber\" onchange=\"OnChangeCheckboxRecInVariableNumber(id)\">" +
        "<label for=\"RecInVariableNumber\">Да, записать</label>";
    }
    //----------------Создание поля для выбора переменной---------------
    DivIndicatedVariableNumber.setAttribute("id","DivIndicatedVariableNumber");
    if(InputText.checked && !TextCheckbox.checked){
        
    }else{
        DivIndicatedVariableNumber.setAttribute("hidden","hidden");
    }
    DivRecInVariableNumber.append(DivIndicatedVariableNumber);
    let NameVariable = document.getElementsByClassName("NameVariable");
    let Label = document.createElement('label');
    let Select = document.createElement('select');
    DivIndicatedVariableNumber.append(Label);
    Label.innerHTML = "Выберите переменную:";
    Select.className = "Select";
    Select.setAttribute("id","Select");
    Label.append(Select);
    for(let i = 0; i<NameVariable.length; i++){
        let Option = document.createElement('option');
        Select.append(Option);
        Option.innerHTML = NameVariable[i].innerHTML.replace(/\s/g, '');
    }



    //----------------Создание подписи блока вывода ошибки---------------     
    LabelError.className = "LabelError";
    LabelError.setAttribute("id","ErrorNewNumber");
    divAddNewInstrumentPanel.append(LabelError);
    //----------------Создание формы с кнопками---------------    
    formBtn.setAttribute("id","formNewNumber")
    divAddNewInstrumentPanel.append(formBtn);
    if(Name == "NextEditTextUser"){
        let TN = ThirdNumberOfElement(id);
        formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveEditTextUser " + N + " " + SN + " " + TN + "\" onclick=\"OnClickSaveEditTextUser(id)\">" + 
        "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewText " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }
    else{
        formBtn.innerHTML = "<input type=\"button\" value=\"Сохранить\" class=\"AddBtn\" id=\"SaveNewTextUser " + N + " " + SN + "\" onclick=\"OnClickSaveNewTextUser(id)\">" + 
        "<input type=\"button\" value=\"Назад\" class=\"AddBtn\" id=\"CancelUserNewText " + N + " " + SN + "\" onclick=\"CancelUser(id)\">";
    }
}
function OnChangeCheckRadioText(id){//Всплывающее меню. Создание текста. Изменение радио 
    let InputText = document.getElementById("InputText");
    let DivText = document.getElementById("DivText");
    let TagText = document.getElementById("TagText");
    let ErrorNewNumber= document.getElementById("ErrorNewNumber");
    let DivTagText = document.getElementById("DivTagText");

    ErrorNewNumber.innerHTML="";
    if(id == "InputText"){
        DivText.removeAttribute("hidden");  
        InputText.classList.add('active');
        TagText.classList.remove('active')
        DivTagText.setAttribute("hidden","hidden");
    }else if(id == "TagText"){
        DivText.setAttribute("hidden","hidden");
        DivTagText.removeAttribute("hidden");
        InputText.classList.remove('active');  
        TagText.classList.add('active');
    }
}
function OnClickAddNewTag(id){//Всплывающее меню. Создание текста. Создание тега 
    let Name = document.getElementById(id);
    let TagBlock = document.getElementById("TagBlock");
    let InputTagText = document.getElementById("InputTagText");
    let ErrorNewNumber = document.getElementById("ErrorNewNumber");
    if(InputTagText.value.length > 30){
        ErrorNewNumber.innerHTML = "Ошибка!Длина текста не должна превышать 30 символов";
        return 0;
    }
    if(InputTagText.value.replace(/\s+/g, '') != ""){//если нет пробелов
        ErrorNewNumber.innerHTML = "";
        let TagDiv = document.createElement('div');
        let Tag = document.createElement('div');
        if(!Name.classList.contains('notfirst')){
            Name.classList.add('notfirst');        
            TagBlock.removeAttribute('hidden');

            TagDiv.className = "TagDiv";
            TagDiv.setAttribute("id","TagDiv 1");
            TagBlock.append(TagDiv);

            Tag.className = "Tag";
            Tag.setAttribute("id","Tag 1");
            Tag.setAttribute("onclick","OnClickTag(id)")
            TagDiv.append(Tag);
            Tag.innerHTML=InputTagText.value;
            TagKol++;
            Name.setAttribute("id","AddNewTag 1");
        }else if(TagKol < 10){
            let N = Number(NumberOfElement(id));
            N++;    
            TagDiv.className = "TagDiv";
            TagDiv.setAttribute("id","TagDiv " + N);
            TagBlock.append(TagDiv);

            Tag.className = "Tag";
            Tag.setAttribute("id","Tag " + N);
            Tag.setAttribute("onclick","OnClickTag(id)")
            TagDiv.append(Tag);
            Tag.innerHTML=InputTagText.value;
            TagKol++;
            Name.setAttribute("id","AddNewTag " + N);
        }else if(TagKol >= 10){
            ErrorNewNumber.innerHTML = "Ошибка!Кол-во тегов на один элемент не может превышать 10"
        }
        InputTagText.value = "";
    }else{//вывод ошибки если есть пробелы в поле ввода тегов
        ErrorNewNumber.innerHTML = "Ошибка! Пожалуйста, введите необходимое слово или текст";
    }
}
function OnClickTag(id){//Всплывающее меню. Создание текста. клик по тегу
    let Name = document.getElementById(id);
    let N = NumberOfElement(id);
    let TagDiv = document.getElementById("TagDiv " + N);

    if(!Name.classList.contains('active')){
        let DeleteTag = document.createElement('div');
        DeleteTag.setAttribute("id","DeleteTag " + N);
        DeleteTag.className = "DeleteTag";
        DeleteTag.setAttribute("onclick","OnClickDeleteTag(id)");
        TagDiv.append(DeleteTag);
        DeleteTag.innerHTML = "Удалить";
        Name.classList.add('active');
    }else{
        let DeleteTag = document.getElementById("DeleteTag " + N);
        DeleteTag.remove();
        Name.classList.remove('active');
    }
}
function OnClickDeleteTag(id){//Всплывающее меню. Создание текста. удаление тега
    let flag = false;
    let N = NumberOfElement(id);
    let TagDiv = document.getElementById("TagDiv " + N);
    let AddNewTag = document.getElementsByClassName('BtnOther');
    TagDiv.remove();
    if(((document.getElementsByClassName('TagDiv')).length) != 0){
        flag = true;
    }
    TagKol--;
    if(flag == false){
        let TagBlock = document.getElementById("TagBlock");
        TagBlock.setAttribute("hidden","hidden");
        AddNewTag[0].classList.remove('notfirst');
    }
}

function OnClickSaveNewButtonUser(id){//Всплывающая панель.Создание кнопки.Кнопка сохранения
    let NewButtonText1 = document.getElementById("NewButtonText");
    if(NewButtonText1.classList.contains('invalid')){//если есть ошибка
        return 0;
    }
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let NewButtonText = document.getElementById("NewButtonText").value;
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserButton = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivFormUser = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    OnClickImgExit();
    ElementKol++;

    /// остальная логика
    //----------Создание блока в котором размещается кнопка и весь элемент кнопки------
    DivUserButton.className = "DivUserButton";
    DivUserButton.setAttribute("id","DivUserButton " + N + " " + SN + " " + ElementKol);
    DivUserButton.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserButton.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserButton);
     //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserButton.append(LabelElementUser);
    LabelElementUser.innerHTML = "Нажатие на кнопку";
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveButtonUser(id)");
    DivUserButton.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickEditButtonUser(id)");
    DivUserButton.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока самой кнопки------
    DivFormUser.className = "DivFormUser";
    DivFormUser.setAttribute("id","DivFormUser " + N + " " + SN + " " + ElementKol);
    DivUserButton.append(DivFormUser);
    DivFormUser.innerHTML = "<form class=\"FormButton\">" +
    "<input type=\"button\" name=\"button\" class=\"ButtonUser\" id=\"ButtonUser " + N + " " + SN + " " + ElementKol  + "\" value=\"" + NewButtonText + "\">" +
    "</form>";
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
    DivJumpIndicator.setAttribute("onmouseover","OnMouseOverDivJump(id)");
    DivJumpIndicator.setAttribute("onmouseout","OnMouseOutDivJump(id)");
    DivUserButton.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" onclick =\"OnClickJumpIndicator(id)\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    RefreshArrows();//Обновление стрелок
}
function OnClickRemoveButtonUser(id){//Панель. Удаление кнопки
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivUserButton = document.getElementById("DivUserButton " + N + " " + SN + " " + TN);
    let JumpIndicator = document.getElementById("JumpIndicator " + N + " " + SN + " " + TN);

        
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
        let Panel = document.getElementById(Canvas.getAttribute('data-connect'));
        let RemoveConnect = document.getElementById("RemoveConnect " + N + " " + SN + " " + TN);
        if(JumpIndicator.classList.contains('Active')){
            JumpIndicator.classList.remove('Active')
        }
        ReplaceAttribute(id);
        Panel.removeAttribute('data-connect');
        RemoveConnect.remove();
        Canvas.remove();
        JumpIndicator.classList.remove('ActiveJumpIndicator');
    }
    DivUserButton.remove();
    RefreshArrows(); 
    
}
function OnClickEditButtonUser(id){//Панель. Редактирование кнопки
    OnClickAddButtonUser(id);//Создание всплывающей панели редактирования
}
function OnClickSaveEditButtonUser(id){//Всплывающая панель. Редактирование кнопки
    let NewButtonText = document.getElementById("NewButtonText");
    if(NewButtonText.classList.contains('invalid')){//если есть ошибка
        return 0;
    }
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let ButtonUser = document.getElementById("ButtonUser " + N + " " + SN + " " + TN);
    ButtonUser.setAttribute("value","" + NewButtonText.value);
    OnClickImgExit();
    RefreshArrows();//Обновление стрелок
}
function OnClickRemoveEmailUser(id){//Панель. Удаление Email
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivUserEmail = document.getElementById("DivUserEmail " + N + " " + SN + " " + TN);

    let JumpIndicator = document.getElementById("JumpIndicator " + N + " " + SN  + " " + TN); 
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){
        let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
        let Panel = document.getElementById(Canvas.getAttribute('data-connect'));
        let RemoveConnect = document.getElementById("RemoveConnect " + N + " " + SN + " " + TN);
        if(JumpIndicator.classList.contains('Active')){
            JumpIndicator.classList.remove('Active')
        }
        ReplaceAttribute(id);
        Panel.removeAttribute('data-connect');
        RemoveConnect.remove();
        Canvas.remove();
        JumpIndicator.classList.remove('ActiveJumpIndicator');
    }

    DivUserEmail.remove();
    RefreshArrows();//Обновление стрелок
}
function OnClickSaveEditEmailUser(id){//Всплывающая панель. Редактирование Email. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let Select = document.getElementById("Select");
    let SelectA = document.getElementById("Select");
    if(SelectA.value == ''){
        if(document.getElementById("ErrorNewNumber") != null){
            document.getElementById("ErrorNewNumber").remove();
        }
        let LabelBlack = document.getElementById("LabelBlack")
        let LabelError = document.createElement('div');
        LabelBlack.after(LabelError);
        LabelError.className = "LabelError";
        LabelError.setAttribute("id","ErrorNewNumber");
        LabelError.innerHTML = "Ошибка! Не выбрана ни одна переменная";
        return 0;
    }
    
    if(document.getElementById("UserEmailVariable " + N + " " + SN + " " + TN) != null){
        let UserEmailVariable = document.getElementById("UserEmailVariable " + N + " " + SN + " " + TN);
        UserEmailVariable.value = Select.options[Select.selectedIndex].value;
    }else{
        let DivUserEmailVariable = document.createElement('div');
        let DivJumpIndicator = document.getElementById("DivJumpIndicator " + N + " " + SN + " " + TN);
        DivUserEmailVariable.className = "DivFormUser";
        DivUserEmailVariable.setAttribute("id","DivFormUser " + N + " " + SN + " " + TN);
        DivJumpIndicator.before(DivUserEmailVariable);
        DivUserEmailVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputVariable\" id=\"UserEmailVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + SelectA.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    }
    OnClickImgExit();
    RefreshArrows();//Обновление стрелок
}
function OnClickSaveNewEmailUser(id){//Всплывающая панель. Создание Email. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserEmailVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    
    let SelectA = document.getElementById("Select");
    if(SelectA.value == ''){
        if(document.getElementById("ErrorNewNumber") != null){
            document.getElementById("ErrorNewNumber").remove();
        }
        let LabelBlack = document.getElementById("LabelBlack")
        let LabelError = document.createElement('div');
        LabelBlack.after(LabelError);
        LabelError.className = "LabelError";
        LabelError.setAttribute("id","ErrorNewNumber");
        LabelError.innerHTML = "Ошибка! Не выбрана ни одна переменная";
        return 0;
    }
   
    
    ElementKol++;

    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserEmail " + N + " " + SN + " " + ElementKol);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    LabelElementUser.innerHTML = "Ввод email";
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveEmailUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddEmailUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока с переменной------
    let Select = document.getElementById("Select");
    DivUserEmailVariable.className = "DivFormUser";
    DivUserEmailVariable.setAttribute("id","DivFormUser " + N + " " + SN + " " + ElementKol);
    DivUserElement.append(DivUserEmailVariable);
    DivUserEmailVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputVariable\" id=\"UserEmailVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
    DivJumpIndicator.setAttribute("onmouseover","OnMouseOverDivJump(id)");
    DivJumpIndicator.setAttribute("onmouseout","OnMouseOutDivJump(id)");
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" onclick =\"OnClickJumpIndicator(id)\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    OnClickImgExit();
    RefreshArrows();//Обновление стрелок
}
function OnClickSaveNewTextUser(id){//Всплывающая панель.Создание текста. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserEmailVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    
    let InputText = document.getElementById("InputText");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let IndicatedText = document.getElementById("IndicatedText");
    let RecInVariableNumber = document.getElementById("RecInVariableNumber");
    let TagText = document.getElementById("TagText");
    
    if(RecInVariableNumber.checked){
        let Select = document.getElementById("Select");
        if(Select.value == ''){
            if(document.getElementById("ErrorNewNumber") != null){
                document.getElementById("ErrorNewNumber").remove();
            }
            let DivRecInVariableNumber = document.getElementById("DivRecInVariableNumber")
            let LabelError = document.createElement('div');
            DivRecInVariableNumber.after(LabelError);
            LabelError.className = "LabelError";
            LabelError.setAttribute("id","ErrorNewNumber");
            LabelError.innerHTML = "Ошибка! Не выбрана ни одна переменная";
            return 0;
        }
    }
    ElementKol++;

    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserText " + N + " " + SN + " " + ElementKol);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    if(InputText.checked && TextCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод указанного текста";
    }
    else if(InputText.checked){
        LabelElementUser.innerHTML = "Ввод текста";
    }
    else if(TagText.checked){
        LabelElementUser.innerHTML = "Ввод текста (Чтение по тегам)";
    }
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveTextUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddTextUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока с указанным словом------
    if(InputText.checked && TextCheckbox.checked){
        let IndicatedTextUser = document.createElement('div');
        IndicatedTextUser.className = "IndicatedTextUser";
        IndicatedTextUser.setAttribute("id","IndicatedTextUser " + N + " " + SN + " " + ElementKol);
        DivUserElement.append(IndicatedTextUser);
        IndicatedTextUser.innerHTML = "<div class=\"LabelBlack\">" +
         "Текст:<input type=\"input\" class=\"InputOther1\" id=\"UserTextIdicated " + N + " " + SN + " " + ElementKol + "\" value=\"" + IndicatedText.value + "\" readonly=\"readonly\"></div>";
    }
    //----------Создание блока с тегами------
    if(TagText.checked){
        let TagTextUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        //сам блок
        TagTextUser.className="TagTextUser";
        TagTextUser.setAttribute("id","TagTextUser " + N + " " + SN + " " + ElementKol);
        DivUserElement.append(TagTextUser);
        //надпись
        LabelBlack.className = "LabelBlack";
        LabelBlack.setAttribute("id","TagLabel " + N + " " + SN + " " + ElementKol);
        TagTextUser.append(LabelBlack);
        LabelBlack.innerHTML = "Теги: ";
        //теги
        let Tag = document.getElementsByClassName("Tag");
        for(let i = 0; i < Tag.length;i++){
            let TagOnPanel = document.createElement('div');
            TagOnPanel.className = "TagOnPanel";
            TagOnPanel.setAttribute("id","TagOnPanel " + N + " " + SN + " " + ElementKol + " " + i);
            LabelBlack.append(TagOnPanel);
            TagOnPanel.innerHTML = Tag[i].innerHTML;
        }
    }
    //----------Создание блока с переменной------
    if(RecInVariableNumber.checked){
        let Select = document.getElementById("Select");
        DivUserEmailVariable.className = "DivFormUser";
        DivUserEmailVariable.setAttribute("id","DivFormUser " + N + " " + SN + " " + ElementKol);
        DivUserElement.append(DivUserEmailVariable);
        DivUserEmailVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputVariable\" id=\"UserTextVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    }
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
    DivJumpIndicator.setAttribute("onmouseover","OnMouseOverDivJump(id)");
    DivJumpIndicator.setAttribute("onmouseout","OnMouseOutDivJump(id)");
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" onclick =\"OnClickJumpIndicator(id)\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    OnClickImgExit();
    RefreshArrows();//Обновление стрелок
}
function OnClickSaveEditTextUser(id){//Всплывающая панель. Редактирование текста. Кнопка сохранить
    TagKol = 0;
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserEmailVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    let DivUserText = document.getElementById("DivUserText " + N + " " + SN + " " + TN);
    

    let InputText = document.getElementById("InputText");
    let TextCheckbox = document.getElementById("TextCheckbox");
    let IndicatedText = document.getElementById("IndicatedText");
    let RecInVariableNumber = document.getElementById("RecInVariableNumber");
    let TagText = document.getElementById("TagText");


    if(RecInVariableNumber.checked){
        let SelectA = document.getElementById("Select");
        if(SelectA.value == ''){
            if(document.getElementById("ErrorNewNumber") != null){
                document.getElementById("ErrorNewNumber").remove();
            }
            let DivRecInVariableNumber = document.getElementById("DivRecInVariableNumber")
            let LabelError = document.createElement('div');
            DivRecInVariableNumber.after(LabelError);
            LabelError.className = "LabelError";
            LabelError.setAttribute("id","ErrorNewNumber");
            LabelError.innerHTML = "Ошибка! Не выбрана ни одна переменная";
            return 0;
        }
    }
    DivUserText.remove();
    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserText " + N + " " + SN + " " + TN);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    if(InputText.checked && TextCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод указанного текста";
    }
    else if(InputText.checked){
        LabelElementUser.innerHTML = "Ввод текста";
    }
    else if(TagText.checked){
        LabelElementUser.innerHTML = "Ввод текста (Чтение по тегам)";
    }
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveTextUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + TN);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddTextUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока с указанным словом------
    if(InputText.checked && TextCheckbox.checked){
        let IndicatedTextUser = document.createElement('div');
        IndicatedTextUser.className = "IndicatedTextUser";
        IndicatedTextUser.setAttribute("id","IndicatedTextUser " + N + " " + SN + " " + TN);
        DivUserElement.append(IndicatedTextUser);
        IndicatedTextUser.innerHTML = "<div class=\"LabelBlack\">" +
         "Текст:<input type=\"input\" class=\"InputOther1\" id=\"UserTextIdicated " + N + " " + SN + " " + TN + "\" value=\"" + IndicatedText.value + "\" readonly=\"readonly\"></div>";
    }
    //----------Создание блока с тегами------
    if(TagText.checked){
        let TagTextUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        //сам блок
        TagTextUser.className="TagTextUser";
        TagTextUser.setAttribute("id","TagTextUser " + N + " " + SN + " " + TN);
        DivUserElement.append(TagTextUser);
        //надпись
        LabelBlack.className = "LabelBlack";
        LabelBlack.setAttribute("id","TagLabel " + N + " " + SN + " " + TN);
        TagTextUser.append(LabelBlack);
        LabelBlack.innerHTML = "Теги: ";
        //теги
        let Tag = document.getElementsByClassName("Tag");
        for(let i = 0; i < Tag.length;i++){
            let TagOnPanel = document.createElement('div');
            TagOnPanel.className = "TagOnPanel";
            TagOnPanel.setAttribute("id","TagOnPanel " + N + " " + SN + " " + TN + " " + i);
            LabelBlack.append(TagOnPanel);
            TagOnPanel.innerHTML = Tag[i].innerHTML;
        }
    }
    //----------Создание блока с переменной------
    if(RecInVariableNumber.checked){
        let Select = document.getElementById("Select");
        DivUserEmailVariable.className = "DivFormUser";
        DivUserEmailVariable.setAttribute("id","DivFormUser " + N + " " + SN + " " + TN);
        DivUserElement.append(DivUserEmailVariable);
        DivUserEmailVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputVariable\" id=\"UserTextVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    }
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + TN);
    DivJumpIndicator.setAttribute("onmouseover","OnMouseOverDivJump(id)");
    DivJumpIndicator.setAttribute("onmouseout","OnMouseOutDivJump(id)");
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" onclick =\"OnClickJumpIndicator(id)\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    OnClickImgExit();
    RefreshArrows();//Обновление стрелок
}
function OnClickRemoveTextUser(id){//Панель. Пользователь. Удаление элемента текста
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivUserText = document.getElementById("DivUserText " + N + " " + SN  + " " + TN);

    let JumpIndicator = document.getElementById("JumpIndicator " + N + " " + SN  + " " + TN); 
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//удаление связи
        let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
        let Panel = document.getElementById(Canvas.getAttribute('data-connect'));
        let RemoveConnect = document.getElementById("RemoveConnect " + N + " " + SN + " " + TN);
        if(JumpIndicator.classList.contains('Active')){
            JumpIndicator.classList.remove('Active')
        }
        ReplaceAttribute(id);
        Panel.removeAttribute('data-connect');
        RemoveConnect.remove();
        Canvas.remove();
        JumpIndicator.classList.remove('ActiveJumpIndicator');
    }

    DivUserText.remove();
    RefreshArrows();//Обновление стрелок
}
function OnClickSaveNewNumberUser(id){//Всплывающее окно. Создание элемента числа. Кнопка сохранить
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let Name = NameOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserNumberVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    
    let InputNumber = document.getElementById("InputNumber");//радио ввода числа и указанного числа
    let NumberCheckbox = document.getElementById("NumberCheckbox");//чек-бокс указанного числа
    let RangeNumber = document.getElementById("RangeNumber");//радио ввода диапазона
    let MaskNumber = document.getElementById("MaskNumber");//радио ввода числа по маске
    let RecInVariableNumber = document.getElementById("RecInVariableNumber");//чекбокс сохранения числа в переменную


    if(RecInVariableNumber.checked){
        let SelectA = document.getElementById("Select");
        if(SelectA.value == ''){
            if(document.getElementById("ErrorNewNumber") != null){
                document.getElementById("ErrorNewNumber").remove();
            }
            let DivRecInVariableNumber = document.getElementById("DivRecInVariableNumber")
            let LabelError = document.createElement('div');
            DivRecInVariableNumber.after(LabelError);
            LabelError.className = "LabelError";
            LabelError.setAttribute("id","ErrorNewNumber");
            LabelError.innerHTML = "Ошибка! Не выбрана ни одна переменная";
            return 0;
        }
    }

    ElementKol++;

    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserNumber " + N + " " + SN + " " + ElementKol);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    if(InputNumber.checked && !NumberCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод числа";
    }
    else if(InputNumber.checked && NumberCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод указанного числа";
    }
    else if(RangeNumber.checked){
        LabelElementUser.innerHTML = "Ввод числа в диапазоне";
    }
    else if(MaskNumber.checked){
        LabelElementUser.innerHTML = "Ввод числа по маске";
    }
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + ElementKol);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveNumberUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + ElementKol);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddNumberUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока элемента ввода определенного числа------
    if(InputNumber.checked && NumberCheckbox.checked){
        let IndicatedNumberUser = document.createElement('div');
        let IndicatedNumber = document.getElementById("IndicatedNumber");//поле ввода определенного числа в окне
        IndicatedNumberUser.className = "IndicatedNumberUser";
        IndicatedNumberUser.setAttribute("id","IndicatedNumberUser " + N + " " + SN + " " + ElementKol);
        DivUserElement.append(IndicatedNumberUser);
        IndicatedNumberUser.innerHTML = "<div class=\"LabelBlack\">" +
         "Число:<input type=\"input\" class=\"InputOther1\" id=\"UserNumberIdicated " + N + " " + SN + " " + ElementKol + "\" value=\"" + IndicatedNumber.value + "\" readonly=\"readonly\"></div>";
    }else if(RangeNumber.checked){//----------Создание блока элемента ввода числа в диапазоне------
        let RangeNumberUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        let InputNumber1 = document.getElementById("InputNumber 1");//Поле ввода первого диапазона
        let InputNumber2 = document.getElementById("InputNumber 2");//Поле ввода второго диапазона
        RangeNumberUser.className = "RangeNumberUser";
        RangeNumberUser.setAttribute("id","RangeNumberUser " + N + " " + SN + " " + ElementKol)
        DivUserElement.append(RangeNumberUser);
        LabelBlack.className = "LabelBlack";
        RangeNumberUser.append(LabelBlack);
        LabelBlack.innerHTML = "Диапазон: <label>от<input type=\"number\" class=\"InputNumber\" id=\"InputNumberUserOne " + N + " " + SN + " " + ElementKol + "\" readonly=\"readonly\" value=\"" + InputNumber1.value + "\"></label>" +
         "<label>до<input type=\"number\" class=\"InputNumber\" id=\"InputNumberUserTwo " + N + " " + SN + " " + ElementKol + "\" readonly=\"readonly\" value=\"" + InputNumber2.value + "\"></label>";
    }else if(MaskNumber.checked){//----------Создание блока элемента ввода числа по маске------
        let MaskNumberUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        let MaskInputNumber = document.getElementById("MaskInputNumber");//Поле ввода маски
        MaskNumberUser.className = "MaskNumberUser";
        MaskNumberUser.setAttribute("id","MaskNumberUser " + N + " " + SN + " " + ElementKol)
        DivUserElement.append(MaskNumberUser);
        LabelBlack.className = "LabelBlack";
        MaskNumberUser.append(LabelBlack);
        LabelBlack.innerHTML = "Маска:<input type=\"input\" class=\"InputOther1\" id=\"MaskInputNumberUser " + N + " " + SN + " " + ElementKol + "\" readonly=\"readonly\" value=\"" + MaskInputNumber.value + "\">";
    }
    //----------Создание блока с переменной------
    if(RecInVariableNumber.checked){
        let Select = document.getElementById("Select");
        DivUserNumberVariable.className = "DivFormUser";
        DivUserNumberVariable.setAttribute("id","DivFormUser " + N + " " + SN + " " + ElementKol);
        DivUserElement.append(DivUserNumberVariable);
        DivUserNumberVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputVariable\" id=\"UserNumberVariable " + N + " " + SN + " " + ElementKol + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    }
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + ElementKol);
    DivJumpIndicator.setAttribute("onmouseover","OnMouseOverDivJump(id)");
    DivJumpIndicator.setAttribute("onmouseout","OnMouseOutDivJump(id)");
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" onclick =\"OnClickJumpIndicator(id)\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    OnClickImgExit();
    RefreshArrows();//Обновление стрелок
}
function OnClickNextEditNumberUser(id){//Всплывающее окно. Редактирование элемента числа. Кнопка сохранить

    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let formAddInstrumentBtnUser = document.getElementById("formAddInstrumentBtnUser " + N + " " + SN);
    let DivUserElement = document.createElement('div');
    let LabelElementUser = document.createElement('div');
    let TrashImg = document.createElement('span');
    let ImgPencilInstrument = document.createElement('div');
    let DivUserNumberVariable = document.createElement('div');
    let DivJumpIndicator = document.createElement('div');
    
    let InputNumber = document.getElementById("InputNumber");//радио ввода числа и указанного числа
    let NumberCheckbox = document.getElementById("NumberCheckbox");//чек-бокс указанного числа
    let RangeNumber = document.getElementById("RangeNumber");//радио ввода диапазона
    let MaskNumber = document.getElementById("MaskNumber");//радио ввода числа по маске
    let RecInVariableNumber = document.getElementById("RecInVariableNumber");//чекбокс сохранения числа в переменную

    if(RecInVariableNumber.checked){
        let SelectA = document.getElementById("Select");
        if(SelectA.value == ''){
            if(document.getElementById("ErrorNewNumber") != null){
                document.getElementById("ErrorNewNumber").remove();
            }
            let DivRecInVariableNumber = document.getElementById("DivRecInVariableNumber")
            let LabelError = document.createElement('div');
            DivRecInVariableNumber.after(LabelError);
            LabelError.className = "LabelError";
            LabelError.setAttribute("id","ErrorNewNumber");
            LabelError.innerHTML = "Ошибка! Не выбрана ни одна переменная";
            return 0;
        }
    }
    OnClickRemoveNumberUser(id);


    //----------Создание блока в котором размещается кнопка и весь элемент------
    DivUserElement.className = "DivUserElement";
    DivUserElement.setAttribute("id","DivUserNumber " + N + " " + SN + " " + TN);
    DivUserElement.setAttribute("onmouseover","OnMouseOverUserPanel(id)");
    DivUserElement.setAttribute("onmouseout","OnMouseOutUserPanel(id)");
    formAddInstrumentBtnUser.before(DivUserElement);
    //----------Создание блока надписи названия элемента------
    LabelElementUser.className = "LabelElementUser";
    DivUserElement.append(LabelElementUser);
    if(InputNumber.checked && !NumberCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод числа";
    }
    else if(InputNumber.checked && NumberCheckbox.checked){
        LabelElementUser.innerHTML = "Ввод указанного числа";
    }
    else if(RangeNumber.checked){
        LabelElementUser.innerHTML = "Ввод числа в диапазоне";
    }
    else if(MaskNumber.checked){
        LabelElementUser.innerHTML = "Ввод числа по маске";
    }
    //----------Создание блока мусорки(удаления элемента) и самой мусорки------
    TrashImg.className = "TrashImg";
    TrashImg.setAttribute("id","TrashImg " + N + " " + SN + " " + TN);
    TrashImg.setAttribute("style","opacity: 0");
    TrashImg.setAttribute("title","удалить этот элемент");
    TrashImg.setAttribute("onclick","OnClickRemoveNumberUser(id)");
    DivUserElement.append(TrashImg);
    TrashImg.innerHTML = "<img src=\"source/constructor/trash.png\" alt=\"удалить\" width=\"16px\">";
    //----------Создание блока карандаша(редактирования элемента)------
    ImgPencilInstrument.className = "ImgPencilInstrument";
    ImgPencilInstrument.setAttribute("id","ImgPencil " + N + " " + SN + " " + TN);
    ImgPencilInstrument.setAttribute("style","opacity: 0");
    ImgPencilInstrument.setAttribute("title","Редактировать этот элемент");
    ImgPencilInstrument.setAttribute("onclick","OnClickAddNumberUser(id)");
    DivUserElement.append(ImgPencilInstrument);
    ImgPencilInstrument.innerHTML = "<img src=\"source/constructor/pencil.png\" alt=\"Редактировать\" width=\"16px\">";
    //----------Создание блока элемента ввода определенного числа------
    if(InputNumber.checked && NumberCheckbox.checked){
        let IndicatedNumberUser = document.createElement('div');
        let IndicatedNumber = document.getElementById("IndicatedNumber");//поле ввода определенного числа в окне
        IndicatedNumberUser.className = "IndicatedNumberUser";
        IndicatedNumberUser.setAttribute("id","IndicatedNumberUser " + N + " " + SN + " " + TN);
        DivUserElement.append(IndicatedNumberUser);
        IndicatedNumberUser.innerHTML = "<div class=\"LabelBlack\">" +
         "Число:<input type=\"input\" class=\"InputOther1\" id=\"UserNumberIdicated " + N + " " + SN + " " + TN + "\" value=\"" + IndicatedNumber.value + "\" readonly=\"readonly\"></div>";
    }else if(RangeNumber.checked){//----------Создание блока элемента ввода числа в диапазоне------
        let RangeNumberUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        let InputNumber1 = document.getElementById("InputNumber 1");//Поле ввода первого диапазона
        let InputNumber2 = document.getElementById("InputNumber 2");//Поле ввода второго диапазона
        RangeNumberUser.className = "RangeNumberUser";
        RangeNumberUser.setAttribute("id","RangeNumberUser " + N + " " + SN + " " + TN)
        DivUserElement.append(RangeNumberUser);
        LabelBlack.className = "LabelBlack";
        RangeNumberUser.append(LabelBlack);
        LabelBlack.innerHTML = "Диапазон: <label>от<input type=\"number\" class=\"InputNumber\" id=\"InputNumberUserOne " + N + " " + SN + " " + TN + "\" readonly=\"readonly\" value=\"" + InputNumber1.value + "\"></label>" +
         "<label>до<input type=\"number\" class=\"InputNumber\" id=\"InputNumberUserTwo " + N + " " + SN + " " + TN + "\" readonly=\"readonly\" value=\"" + InputNumber2.value + "\"></label>";
    }else if(MaskNumber.checked){//----------Создание блока элемента ввода числа по маске------
        let MaskNumberUser = document.createElement('div');
        let LabelBlack = document.createElement('div');
        let MaskInputNumber = document.getElementById("MaskInputNumber");//Поле ввода маски
        MaskNumberUser.className = "MaskNumberUser";
        MaskNumberUser.setAttribute("id","MaskNumberUser " + N + " " + SN + " " + TN)
        DivUserElement.append(MaskNumberUser);
        LabelBlack.className = "LabelBlack";
        MaskNumberUser.append(LabelBlack);
        LabelBlack.innerHTML = "Маска:<input type=\"input\" class=\"InputOther1\" id=\"MaskInputNumberUser " + N + " " + SN + " " + TN + "\" readonly=\"readonly\" value=\"" + MaskInputNumber.value + "\">";
    }
    //----------Создание блока с переменной------
    if(RecInVariableNumber.checked){
        let Select = document.getElementById("Select");
        DivUserNumberVariable.className = "DivFormUser";
        DivUserNumberVariable.setAttribute("id","DivFormUser " + N + " " + SN + " " + TN);
        DivUserElement.append(DivUserNumberVariable);
        DivUserNumberVariable.innerHTML = "<div class=\"LabelBlack\">Запомнить в:<input type=\"input\" class=\"InputVariable\" id=\"UserNumberVariable " + N + " " + SN + " " + TN + "\" value=\"" + Select.options[Select.selectedIndex].value + "\" readonly=\"readonly\"></div>"
    }
    //----------Создание розетки(джампера)------
    DivJumpIndicator.className = "DivJumpIndicator";
    DivJumpIndicator.setAttribute("id","DivJumpIndicator " + N + " " + SN + " " + TN);
    DivJumpIndicator.setAttribute("onmouseover","OnMouseOverDivJump(id)");
    DivJumpIndicator.setAttribute("onmouseout","OnMouseOutDivJump(id)");
    DivUserElement.append(DivJumpIndicator);
    DivJumpIndicator.innerHTML = "<div class=\"JumpIndicator\" onclick =\"OnClickJumpIndicator(id)\" id =\"JumpIndicator " + N + " " + SN + " " + ElementKol + "\"></div>";
    OnClickImgExit();   
    RefreshArrows();//Обновление стрелок
}
function OnClickRemoveNumberUser(id){//Панель. Удаление числового элемента
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivUserNumber = document.getElementById("DivUserNumber " + N + " " + SN + " " + TN);
    let JumpIndicator = document.getElementById("JumpIndicator " + N + " " + SN  + " " + TN); 
    if(JumpIndicator.classList.contains('ActiveJumpIndicator')){//удаление связи
        let Canvas = document.getElementById("Canvas " + N + " " + SN + " " + TN);
        let Panel = document.getElementById(Canvas.getAttribute('data-connect'));
        let RemoveConnect = document.getElementById("RemoveConnect " + N + " " + SN + " " + TN);
        if(JumpIndicator.classList.contains('Active')){
            JumpIndicator.classList.remove('Active')
        }
        ReplaceAttribute(id);
        Panel.removeAttribute('data-connect');
        RemoveConnect.remove();
        Canvas.remove();
        JumpIndicator.classList.remove('ActiveJumpIndicator');
    }
    DivUserNumber.remove();
    RefreshArrows();//Обновление стрелок
}
function OnMouseOverUserPanel(id){ //Панель. Мышь над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN );
    TrashImg.setAttribute("style","opacity: 100;");
    ImgPencil.setAttribute("style","opacity: 100;");
}
function OnMouseOutUserPanel(id){ //Панель. Мышь не над элементом
    let N = NumberOfElement(id);
    let SN = SecondNumberOfElement(id);
    let TN = ThirdNumberOfElement(id);
    let DivJumpIndicator = document.getElementById("DivJumpIndicator " + N + " " + SN + " " + TN);
    let TrashImg = document.getElementById("TrashImg " + N + " " + SN + " " + TN);
    let ImgPencil = document.getElementById("ImgPencil " + N + " " + SN + " " + TN )
    TrashImg.setAttribute("style","opacity: 0;");
    ImgPencil.setAttribute("style","opacity: 0;");
}