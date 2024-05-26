function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var ola = document.getElementById("ola");

    if (email != null && nome != null) {
        ola.innerHTML = nome;
    } else {
        window.location = "../html/login.html";
    }
}

function esconderItens() {
    var tipo = sessionStorage.TIPO_USUARIO;

    console.log('tipo: ', tipo)

    if (tipo == 'funcionario') {
        var elementosParaOcultar = document.querySelectorAll('.esconder-item');
        
        elementosParaOcultar.forEach(function(elemento) {
            elemento.style.display = 'none';
        });

        var info2 = document.querySelector('.info2');
        info2.style.right = 'auto';
    }
}

function logout() {
    sessionStorage.clear();
    window.location = "../html/login.html";
}


function gerarDashboard() {
    // validarSessao();
    // esconderItens();
    // obterInfoHardware();
    // listarEstacoes();
    // init();
}
