function FocusInput(id){
    let error = document.getElementById("Error");
    error.innerHTML = "";
}
function BlurInput(id){
    let NameUserInput = document.getElementById("NameUserInput");
    let EmailInput = document.getElementById("EmailInput");
    let PasswordInput = document.getElementById("PasswordInput");
    let PasswordRepeatInput = document.getElementById("PasswordRepeatInput");
    let error = document.getElementById("Error");
    let RegButton = document.getElementById("RegButton");
    if(NameUserInput.value.replace(/\s+/g, '') == "" || EmailInput.value.replace(/\s+/g, '') == "" || PasswordInput.value.replace(/\s+/g, '') == "" || PasswordRepeatInput.value.replace(/\s+/g, '') == "" ){
        error.innerHTML = "Заполните все поля"
        if(!RegButton.hasAttribute("disabled")){
            RegButton.setAttribute("disabled","disabled");
        }
    }else if(PasswordRepeatInput.value != PasswordInput.value){
        error.innerHTML = "Пароли не совпадают"
        if(!RegButton.hasAttribute("disabled")){
            RegButton.setAttribute("disabled","disabled");
        }
    }else if(PasswordRepeatInput.value.length < 8){
        error.innerHTML = "Длина пароля должна превышать 8 символов"
        if(!RegButton.hasAttribute("disabled")){
            RegButton.setAttribute("disabled","disabled");
        }
    }else{
        error.innerHTML = "";
        if(RegButton.hasAttribute("disabled")){
            RegButton.removeAttribute("disabled");
        }
    }
}