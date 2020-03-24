function SaveProject(){
    let Content = document.body.innerHTML;
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = '/constructor';
    form.setAttribute('hidden','hidden');
    form.innerHTML = "<textarea name=\"Content\" value=\"" + Content + "\"></textarea>";
    document.body.append(form);
    form.submit();
}