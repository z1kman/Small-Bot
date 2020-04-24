var Domain = "http://localhost:3000/";
window.onload = function(){
    let ProjectName = get_cookie('Project');
    let InputSrcCss = document.getElementById('InputSrcCss');
    let InputSrcJs = document.getElementById('InputSrcJs');

    InputSrcCss.value = '<link rel=\"stylesheet\" href=\"' + Domain + 'css/ClientProject/ClientProject.css\">';
    InputSrcJs.value = '<script src=\"' + Domain + 'UsersSource/TempFile_' + ProjectName + '.js\"></script>'; 
}
function get_cookie ( cookie_name )//получение кукисов
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}