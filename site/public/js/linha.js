function exibirLinha(idLinha){
    document.getElementById('divAdd').style.display = 'none';
    document.getElementById('ver').style.color = '#F27A5E';
    document.getElementById('add').style.color = 'black';
    document.getElementById('container-linha').style.display = 'block';
    document.getElementById('container-linha').style.display = 'flex';


    var idEmpresa = sessionStorage.ID_EMPRESA;
    var container = document.getElementById('container-linha');  
    var lista_linha = [];

    container.innerHTML ="";

     fetch(`/linha/exibirLinha/${idEmpresa}`, { 
        method: "GET", 
      }).then(function (resposta) {
        // var teste = resposta[0].idLinha;
        // console.log(teste)
     
        if (!resposta.ok) { 
          swal("Ops", 'Parce que você ainda não possuí linhas cadastradas!');
          throw new Error('Erro na requisição');
         }
        return resposta.json();
       })
       
       .then((resposta) => { 
       lista_linha = resposta;

       if (lista_linha.length === 0) {
        swal({
            title: "Ops",
            text: "Parece que você ainda não possui linhas cadastradas!",
            icon: "warning",
            // buttons: {
            //     cancel: "Cancelar",
            //     confirm: "OK"
            // }
        }).then((confirmacao) => {
            if (confirmacao) {
                // Se o usuário confirmar, chama a função exibirDivAddLinha
                exibirDivAddLinha();
            }
        });
    }
          
     var tamanhoLinha = lista_linha.length;
     var auxiliar = 0;

     for (var i = 0; i < tamanhoLinha; i++) {
       var id_linha = lista_linha[i].idLinha;
       var nome_atual = lista_linha[i].nome;
       var numero_atual = lista_linha[i].numero;
      
       auxiliar++;

       container.innerHTML += `<div class="quadrado-linha">
       <span class="material-symbols-outlined cancelar selecionar" onclick="exibirLinha(${id_linha})" id="cancelar_${id_linha}" style="display: none;">cancel</span>

       <div class="nomeNumero">
         <p> Nome: <input id="input_nome_${id_linha}" type="text" disabled value="${nome_atual}" class="input-container"></p> <span class="material-symbols-outlined selecionar" onclick="deletarLinha(${id_linha})">delete</span>
       </div>
      
       <div class="nomeNumero">
         <p> Número: <input id="input_numero_${id_linha}" type="text" disabled value="${numero_atual}" class="input-container"></p> <span onclick="editarLinha(${id_linha})" class="material-symbols-outlined selecionar">edit</span>
         </div> 
         <button id="botao_salvar_${id_linha}" onclick="salvarLinha(${id_linha})" class="botao-cadastrar" style="display: none;">SALVAR</button>`;       

     }
   });
}

function deletarLinha(idLinha) {
  swal({
    title: "Cuidado!",
    text: "Todas as estações dessa linha serão excluidas. Você tem certeza que deseja continuar?",
    icon: "warning",
    buttons: {
       cancel: "Cancelar",
       confirm: "SIM!"
    }
}).then((confirmacao) => {
    if (confirmacao) {

        console.log('id linha=>', idLinha);
        fetch(`/linha/deletarLinha/${idLinha}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
          },
        }).then(function (resposta) {
          if (resposta.ok) {
            swal({
              title: "Sucesso!",
              text: "A linha foi excluída!",
              icon: "success",
          }).then((confirmacao) => {
            if(confirmacao){
              exibirLinha();
            }
          })
      
          } else {
            resposta.text().then(function (texto) {
            });
          }
        }).catch(function (error) {
        });
    }
});
}


function exibirDivAddLinha(){


  document.getElementById('divAdd').style.display = 'block';
  document.getElementById('divAdd').style.display = 'flex';
  document.getElementById('container-linha').style.display = 'none';
  document.getElementById('ver').style.color = 'black';
  document.getElementById('add').style.color = '#F27A5E';
  
  // var container = document.getElementById('container-linha');  
  // container.display = 'none';

}

function cadastrarLinha(){
    var nome = ipt_nome.value;
    var numero = ipt_numero.value;
    var idEmpresa = sessionStorage.ID_EMPRESA


    if(numero !== '' && nome !== '' && numero >= 0){
        fetch("/linha/cadastrarLinha", {
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
                ultimaLinhaInserida();
            }
          )}
    else{
        swal('Ei!', 'Preencha todos os campos e não deixe o número negativo!', 'error');
    }

}

function ultimaLinhaInserida(){
  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/linha/ultimaLinhaInserida/${idEmpresa}`, { 
    method: "GET", 
  }).then(function (resposta) {
    if (!resposta.ok) { 
      console.log('A resposta não está ok!');
      throw new Error('Erro na requisição');
    }
    return resposta.json();
  }).then((resposta) => { 
    if (resposta.length > 0) {
      var idLinha = resposta[0].idLinha;
      primeiraMetrica(idLinha);
    } else {
      console.log('Nenhuma linha encontrada.');
    }
  }).catch(function (erro) {
    console.error('Erro na requisição:', erro);
  });
}

function primeiraMetrica(idLinha) {
  var minimoDisco = 128;
  var maximoDisco = 50;
  
  var minimoCpu = 75;
  var maximoCpu = 85;

  var minimoRam = 70;
  var maximoRam = 90;

  var qtdUsb = 2;
   
  if (minimoDisco !== '' && maximoDisco !== '' && minimoCpu !== '' && maximoCpu !== '' && minimoRam !== '' && maximoRam !== '' && qtdUsb !== '') {
    fetch(`/metrica/primeiraMetrica/${idLinha}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        minimoDisco: minimoDisco,
        maximoDisco: maximoDisco,
        minimoCpu: minimoCpu,
        maximoCpu: maximoCpu,
        minimoRam: minimoRam,
        maximoRam: maximoRam,
        qtdUsb: qtdUsb
      })
    }).then(function (resposta) {
      if (resposta.ok) {
        console.log('A resposta está ok na primeiraMetrica()!');
      } else {
        console.error('Erro na resposta da primeiraMetrica:', resposta.statusText);
      }
    }).catch(function (erro) {
      console.error('Erro ao chamar primeiraMetrica:', erro);
    });
  } else {
    console.log('Há algum valor vazio nas métricas');
  }
}


function editarLinha(idLinha){
  console.log('numero do id -> ', idLinha)

   var mudarClasseNome = document.getElementById(`input_nome_${idLinha}`);
   var mudarClasseNumero = document.getElementById(`input_numero_${idLinha}`);

    
    mudarClasseNome.classList.remove('input-container'); 
    mudarClasseNumero.classList.remove('input-container'); 
    mudarClasseNome.classList.add('input-container-editar');
    mudarClasseNumero.classList.add('input-container-editar');

    mudarClasseNome.disabled = false; 
    mudarClasseNumero.disabled = false; 
    
    document.getElementById(`cancelar_${idLinha}`).style.display = 'block';

    var botaoSalvar = document.getElementById(`botao_salvar_${idLinha}`);
    if (botaoSalvar) {
        botaoSalvar.style.display = 'block';
    } else {
        console.error(`Elemento com ID "botao_salvar_${idLinha}" não encontrado.`);
    }
    // if (botaoSalvar) {
    //     botaoSalvar.style.display = 'block';
    // }

  // document.querySelector('button').style.display = 'block';
}

function salvarLinha(idLinha){

  var nome = document.getElementById(`input_nome_${idLinha}`).value;
  var numero = document.getElementById(`input_numero_${idLinha}`).value;
  console.log('id da linha ==>',idLinha);

  // alert(idLinha, nome)



  if(nome !== '' && numero !== '' && idLinha !== ''){
    fetch(`/linha/salvarLinha/${idLinha}`,{
       method: "PUT", headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         nome: nome,
         numero: numero
        //  idLinha: idLinha
      })
    }).then(function (resposta) {
        if (resposta.ok) {

          swal('Sucesso!', "Informações alteradas!", 'success');

           exibirLinha();          
          
           var mudarClasseNome = document.getElementById("input_nome");
           var mudarClasseNumero = document.getElementById("input_numero");

           mudarClasseNome.classList.remove('input-container-editar'); 
           mudarClasseNumero.classList.remove('input-container-editar'); 
           mudarClasseNome.classList.add('input-container');
           mudarClasseNumero.classList.add('input-container');

           mudarClasseNome.disabled = true; 
           mudarClasseNumero.disabled = true; 
           
           document.querySelector('button').style.display = 'none';
        } else {
         swal('Erro!', 'Não foi possível alterar os dados da linha', 'error')
        }
      }).catch(function (resposta) {
       console.log(`#ERRO: ${resposta}`);
      });
  } else{
   swal("Ei!", "Preencha todos os campos!");
  }
}

