function SaveProject(){
    let head= document.head.innerHTML;
    let Content = document.body.innerHTML;
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = '/constructor';
    form.setAttribute('hidden','hidden');
    form.innerHTML = "<textarea name=\"Content\" value=\"" + head + "</head><body>" + Content + "</body></html></textarea>";//загрузка кода страницы в блок
    document.body.append(form);
    form.submit();//отправка кода на сервер
}