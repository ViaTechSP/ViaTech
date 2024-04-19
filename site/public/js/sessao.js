// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_EMPRESA;
    var nome = sessionStorage.NOME_EMPRESA;

    var ola = document.getElementById("ola");

    if (email != null && nome != null) {
        ola.innerHTML = nome;
    }
}

function logout() {
    sessionStorage.clear();
    window.location = "../html/login.html";
}



