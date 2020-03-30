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