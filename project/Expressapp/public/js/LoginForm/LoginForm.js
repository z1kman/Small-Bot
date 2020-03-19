function FocusInput(id){
    let error = document.getElementById("Error");
    error.innerHTML = "";
}
function BlurInput(id){
    let EmailInput = document.getElementById("EmailInput");
    let PasswordInput = document.getElementById("PasswordInput");
    let error = document.getElementById("Error");
    let SignInButton = document.getElementById("SignInButton");
    if(EmailInput.value.replace(/\s+/g, '') == "" || PasswordInput.value.replace(/\s+/g, '') == ""){
        error.innerHTML = "Заполните все поля"
        if(!SignInButton.hasAttribute("disabled")){
            SignInButton.setAttribute("disabled","disabled");
        }
    }else{
        error.innerHTML = "";
        if(SignInButton.hasAttribute("disabled")){
            SignInButton.removeAttribute("disabled");
        }
    }
}