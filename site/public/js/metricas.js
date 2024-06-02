function buscarInfoMetricas() {
    // document.getElementById('span_minProblemaDisco').value = sessionStorage.MAXIMO_CUIDADO;
    // var idFuncionario = sessionStorage.ID_FUNCIONARIO;
    // console.log('id =>', idFuncionario)

    var idLinha = select_linha.value;
    // console.log('Tamahno da linhaaa', idLinha.length)

        
    fetch(`/metrica/buscarInfoMetrica/${idLinha}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
           
          if (resposta.length > 0) {

            document.getElementById('ipt_minDisco').value = resposta[0].cuidadoDisco;
            document.getElementById('ipt_minProblemaDisco').value = resposta[0].problemaDisco;
            document.getElementById('ipt_minCpu').value = resposta[0].cuidadoCpu;
            document.getElementById('ipt_minProblemaCpu').value = resposta[0].problemaCpu;
            document.getElementById('ipt_minRam').value = resposta[0].cuidadoRam;
            document.getElementById('ipt_minProblemaRam').value = resposta[0].problemaRam;
            document.getElementById('ipt_qtd_usb').value = resposta[0].maxUsb;           

          } else {
            document.getElementById('ipt_minDisco').value = '';
            document.getElementById('ipt_minCpu').value = '';
            document.getElementById('ipt_minRam').value = '';
            document.getElementById('ipt_minProblemaDisco').value = '';
            document.getElementById('ipt_minProblemaCpu').value = '';
            document.getElementById('ipt_minProblemaRam').value = '';
            document.getElementById('ipt_qtd_usb').value = '';

            console.error('Nenhuma informação encontrada');   
          }
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    }).catch(function (error) {
      console.error(`Erro na obtenção do idEmpresa: ${error.message}`);
    });
    

  
}

function alterarMetricas() {

  if(option.value !== 0){
  const inputs = document.querySelectorAll('input');
  const botaoAlterar = document.getElementById('botao_alterarMetrica');
  const botaoSalvar = document.getElementById('botao_salvarMetrica');

  // Itera sobre cada input
  inputs.forEach(input => {
      // Verifica se o id do input NÃO contém a palavra "Problema"
        
          // Se não contém, desabilita o input
          input.removeAttribute('disabled', true);

          input.classList.remove('setting');
          input.classList.add('setting2');
          botaoAlterar.style.display = 'none';
          botaoSalvar.style.display = 'flex';
          botaoSalvar.style.alignItems = 'center';
          botaoSalvar.style.justifyContent = 'center';
      
  });
  } else{
    swal('Ei!', 'Selecione uma linha primeiro!', 'warning')
  }
}

function resetarMetrica(){
    
  var minimoDisco = 128;
  var maximoDisco = 50;
  
  var minimoCpu = 75;
  var maximoCpu = 85;

  var minimoRam = 70;
  var maximoRam = 90;

  var qtdUsb = 3;

  
  var idLinha = select_linha.value;

  if(idLinha != 0){

    if(idLinha > 0){
      swal({
        title: "Tem certeza?",
        text: "Deseja mesmo resetar as metricas dessa linha?",
        icon: "warning",
        buttons: {
            cancel: "Cancelar",
            confirm: "SIM"
        }
    }).then((confirmacao) => {
        if (confirmacao) {
           
          fetch(`/metrica/resetarMetrica/${idLinha}`,{
            method: "PUT", headers: { "Content-Type": "application/json" },
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
              console.log('Update realizado!')
                buscarInfoMetricas();   
            } 
            })
        }
    });

    }
  } else{
    swal('Ei!', 'Selecione a linha que deseja resetar os dados!', 'warning')
  }


}

function salvarMetricas() {
  var minimoDisco = ipt_minDisco.value;
  var maximoDisco = ipt_minProblemaDisco.value;
  
  var minimoCpu = ipt_minCpu.value;
  var maximoCpu = ipt_minProblemaCpu.value;

  var minimoRam = ipt_minRam.value;
  var maximoRam = ipt_minProblemaRam.value;
  var qtdUsb = ipt_qtd_usb.value;

  
  var idLinha = select_linha.value;

  
  if((minimoDisco < maximoDisco) && (minimoCpu < maximoCpu) && (minimoRam < maximoRam) && (qtdUsb >= 0)){

  if (minimoDisco !== '' && maximoDisco !== '' && minimoCpu !== '' && maximoCpu !== '' && minimoRam !== '' && maximoRam !== '' && qtdUsb !== '') {
  
  fetch(`/metrica/alterarInfoMetrica/${idLinha}`,{
      method: "PUT", headers: { "Content-Type": "application/json" },
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
          buscarInfoMetricas();
          const inputs = document.querySelectorAll('input');
          const botaoAlterar = document.getElementById('botao_alterarMetrica');
          const botaoSalvar = document.getElementById('botao_salvarMetrica');

          inputs.forEach(input => {
            // Verifica se o id do input NÃO contém a palavra "Problema"
            if (!input.id.includes('Problema')) {
              
                // Se não contém, desabilita o input
                input.toggleAttribute('disabled', true);
      
                botaoSalvar.style.display = 'none';
                botaoAlterar.style.display = 'flex';
                botaoAlterar.style.alignItems = 'center';
                botaoAlterar.style.justifyContent = 'center';
            } 
        });
        swal('Sucesso', "Suas alterações foram salvas! 😀", "success" );


      } else {
            // swal("Ops!", "Valores incorretos, cuidado não pode ser maior ou igual ao problema, ou negativo. 🥺", "error");
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);

        }
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    } else{
      swal('Eii', "Preencha todos os campos! 😠");

    }
  } else{
      swal("Ops!", "Valores incorretos, cuidado não pode ser maior ou igual ao problema, ou negativo. 🥺", "error");
    
  }

   // ALGUNS LOGS
 if (minimoDisco > maximoDisco) {
  console.log('minimoDisco é maior que maximoDisco');
} else {
  console.log('minimoDisco NÃO é maior que maximoDisco');
}

if (minimoCpu < maximoCpu) {
  console.log('minimoCpu é menor que maximoCpu');
} else {
  console.log('minimoCpu NÃO é menor que maximoCpu');
}

if (minimoRam < maximoRam) {
  console.log('minimoRam é menor que maximoRam');
} else {
  console.log('minimoRam NÃO é menor que maximoRam');
}

if (qtdUsb >= 0) {
  console.log('qtdUsb é maior ou igual a 0');
} else {
  console.log('qtdUsb NÃO é maior ou igual a 0');
}

}



// var alertas = [];

// function obterdados(idAquario) {
//     fetch(`/medidas/tempo-real/${idAquario}`)
//         .then(resposta => {
//             if (resposta.status == 200) {
//                 resposta.json().then(resposta => {

//                     console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

//                     alertar(resposta, idAquario);
//                 });
//             } else {
//                 console.error(`Nenhum dado encontrado para o id ${idAquario} ou erro na API`);
//             }
//         })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
//         });

// }

// function alertar(resposta, idAquario) {
//     var temp = resposta[0].temperatura;

//     var grauDeAviso = '';

//     var limites = {
//         muito_quente: 23,
//         quente: 22,
//         ideal: 20,
//         frio: 10,
//         muito_frio: 5
//     };

//     var classe_temperatura = 'cor-alerta';

//     if (temp >= limites.muito_quente) {
//         classe_temperatura = 'cor-alerta perigo-quente';
//         grauDeAviso = 'perigo quente'
//         grauDeAvisoCor = 'cor-alerta perigo-quente'
//         exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
//     }
//     else if (temp < limites.muito_quente && temp >= limites.quente) {
//         classe_temperatura = 'cor-alerta alerta-quente';
//         grauDeAviso = 'alerta quente'
//         grauDeAvisoCor = 'cor-alerta alerta-quente'
//         exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
//     }
//     else if (temp < limites.quente && temp > limites.frio) {
//         classe_temperatura = 'cor-alerta ideal';
//         removerAlerta(idAquario);
//     }
//     else if (temp <= limites.frio && temp > limites.muito_frio) {
//         classe_temperatura = 'cor-alerta alerta-frio';
//         grauDeAviso = 'alerta frio'
//         grauDeAvisoCor = 'cor-alerta alerta-frio'
//         exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
//     }
//     else if (temp <= limites.muito_frio) {
//         classe_temperatura = 'cor-alerta perigo-frio';
//         grauDeAviso = 'perigo frio'
//         grauDeAvisoCor = 'cor-alerta perigo-frio'
//         exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
//     }

//     var card;

//     if (document.getElementById(`temp_aquario_${idAquario}`) != null) {
//         document.getElementById(`temp_aquario_${idAquario}`).innerHTML = temp + "°C";
//     }

//     if (document.getElementById(`card_${idAquario}`)) {
//         card = document.getElementById(`card_${idAquario}`)
//         card.className = classe_temperatura;
//     }
// }

// function exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor) {
//     var indice = alertas.findIndex(item => item.idAquario == idAquario);

//     if (indice >= 0) {
//         alertas[indice] = { idAquario, temp, grauDeAviso, grauDeAvisoCor }
//     } else {
//         alertas.push({ idAquario, temp, grauDeAviso, grauDeAvisoCor });
//     }

//     exibirCards();
// }

// function removerAlerta(idAquario) {
//     alertas = alertas.filter(item => item.idAquario != idAquario);
//     exibirCards();
// }

// function exibirCards() {
//     alerta.innerHTML = '';

//     for (var i = 0; i < alertas.length; i++) {
//         var mensagem = alertas[i];
//         alerta.innerHTML += transformarEmDiv(mensagem);
//     }
// }

// function transformarEmDiv({ idAquario, temp, grauDeAviso, grauDeAvisoCor }) {

//     var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idAquario).descricao;
//     return `
//     <div class="mensagem-alarme">
//         <div class="informacao">
//             <div class="${grauDeAvisoCor}">&#12644;</div> 
//             <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
//             <small>Temperatura ${temp}.</small>   
//         </div>
//         <div class="alarme-sino"></div>
//     </div>
//     `;
// }

// function atualizacaoPeriodica() {
//     JSON.parse(sessionStorage.AQUARIOS).forEach(item => {
//         obterdados(item.id)
//     });
//     setTimeout(atualizacaoPeriodica, 5000);
// }
