function exibirLinha(){
    document.getElementById('ver').style.color = '#F27A5E';
    // document.getElementById('ver').style.backgroundcolor = '#F27A5E';
}

function exibirDivAddLinha(){
    document.getElementById('add').style.color = '#F27A5E';
    document.getElementById('ver').display = 'none';
}

function cadastrarLinha(){
    var nome = ipt_nome.value;
    var numero = ipt_numero.value;
    var idEmpresa = sessionStorage.ID_EMPRESA


    if(numero >= 0 && nome !== ''){
        fetch("/empresa/cadastrarLinha", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: nome,
              numero: numero,
              idEmpresa: idEmpresa
            }),
          }).then(function (resposta) {
                swal('Eba!', 'Linha cadastrada!', 'success');
            }
          )}
    else{
        swal('Ei!', 'Preencha todos os campos e não deixe o número negativo!', 'error');
    }

}