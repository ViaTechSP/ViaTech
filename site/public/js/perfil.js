function alterar() {
    const inputs = document.querySelectorAll('input');
    const botaoAlterar = document.getElementById('botao_alterar');
    const botaoSalvar = document.getElementById('botao_salvar');

    inputs.forEach(input => {
        if(input.id != 'ipt_empresa') input.toggleAttribute('disabled');
    })

    botaoAlterar.style.display = 'none';
    botaoSalvar.style.display = 'flex';
}

function salvar() {
    var nome = ipt_nome.value;
    var cpf = ipt_cpf.value;
    var cargo = ipt_cargo.value;
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    const inputs = document.querySelectorAll('input');
    const botaoAlterar = document.getElementById('botao_alterar');
    const botaoSalvar = document.getElementById('botao_salvar');

    inputs.forEach(input => {
        if(input.id != 'ipt_empresa') input.toggleAttribute('disabled');
    })

    botaoAlterar.style.display = 'flex';
    botaoSalvar.style.display = 'none';
}