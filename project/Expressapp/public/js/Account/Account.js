let url = "http://localhost:3000/account";
window.onload = function(){
    LoadProjects()
}

function LoadProjects(){//загрузка проектов
    let FormProjectOnPanel = document.getElementsByClassName("FormProject");//проекты на панели
    
    for(let i = FormProjectOnPanel.length; i > 0; i--){
        FormProjectOnPanel[0].remove();
    }
    let Message = {//сообщение для отправки на сервер
        message : "LoadProjects"
    }
    fetch(url, { 
        method: 'POST',
        headers: {
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Message)//отправка сообщения на сервер
    }).then(response => response.json()).then(result => {//чтение сообщений с сервера
        if(result.length > 0){//если записи были найдены
            for(let i = 0; i < result.length; i++){
                let ProjectList = document.getElementById('ProjectList');
                let FormProject = document.createElement('form');
                FormProject.className = "FormProject";
                FormProject.innerHTML = "<div class=\"DivProject\">" + result[i].name + "</div><div class=\"BtnProject\"><input type=\"button\" class=\"OpenProject\" value=\"Открыть\" name=\""+ result[i].randName + "\" onclick=\"OpenProject(name)\">" +
                "<input type=\"button\" class=\"DeleteProject\" value=\"Удалить\" name=\""+ result[i].randName + "\" onclick=\"DeleteProject(name)\"></div>";
                ProjectList.append(FormProject);
            }
        }
    })
}

function AddNewProject(){
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.removeAttribute('style');
}
function OnClickImgExit(){
    let NewInstrumentPanel = document.getElementById("NewInstrumentPanel");
    NewInstrumentPanel.setAttribute('style','visibility:hidden;');
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function OpenProject(name){
    document.cookie = "Project=" + name;
    let form = document.createElement('form');
    form.action = '/constructor';
    form.setAttribute('hidden','hidden');
    document.body.append(form);
    form.submit();//отправка кода на сервер
}
function DeleteProject(name){
    document.cookie = "Project=none; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    let form = document.createElement('form');
    form.method = "POST";
    form.action = '/account';
    form.setAttribute('hidden','hidden');
    document.body.append(form);
    form.innerHTML = "<input type=\"hidden\" value = \"" + name + "\" name=\"DeleteProject\">";
    form.submit();//отправка кода на сервер
}