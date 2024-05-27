function clicarMenu() {
    const menu = document.getElementById('menuLateral');
    menu.classList.toggle('escondido');

    if (!menu.classList.contains('escondido')) {
        menu.style.width = '5%';
        menuEscondido.style.display = 'block';
        containerMenuLateral.style.display = 'none';
    }
    else {
        menu.style.width = '22%';
        menuEscondido.style.display = 'none'
        containerMenuLateral.style.display = 'flex'
    }
}


function buscarInfoAlerta() {
    // document.getElementById('span_minProblemaDisco').value = sessionStorage.MAXIMO_CUIDADO;
    // var idFuncionario = sessionStorage.ID_FUNCIONARIO;
    // console.log('id =>', idFuncionario)

    fetch(`/usuarios/buscarInfoAlerta/`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          if (resposta.length > 0) {
            console.log('resposta ==>', resposta)
            document.getElementById('ipt_minDisco').value = resposta[0].minCuidadoDisco;
            document.getElementById('ipt_maxDisco').value = resposta[0].maxCuidadoDisco;
            document.getElementById('ipt_minCpu').value = resposta[0].minCUidadoCpu;
            document.getElementById('ipt_maxCpu').value = resposta[0].maxCUidadoCpu;
            document.getElementById('ipt_minRam').value = resposta[0].minCUidadoRam;
            document.getElementById('ipt_maxRam').value = resposta[0].maxCUidadoRam;
            document.getElementById('ipt_minProblemaDisco').value = resposta[0].maxCuidadoDisco + 1;
            document.getElementById('ipt_minProblemaCpu').value = resposta[0].maxCUidadoCpu + 1;
            document.getElementById('ipt_minProblemaRam').value = resposta[0].maxCUidadoRam + 1;
            /* document.getElementById('ipt_minProblema').value = resposta[0].minProblTemp;
              document.getElementById('ipt_minCuidado').value = resposta[0].minProblTemp + 1;
              document.getElementById('ipt_maxCuidado').value = resposta[0].minIdealTemp - 1;
              document.getElementById('ipt_minIdeal').value = resposta[0].minIdealTemp; 
              document.getElementById('ipt_maxIdeal').value = resposta[0].maxCuidadoTemp - 1; 
              document.getElementById('ipt_minCuidado2').value = resposta[0].maxCuidadoTemp;
              document.getElementById('ipt_maxCuidado2').value = resposta[0].maxProblTemp - 1;
              document.getElementById('ipt_minProblema2').value = resposta[0].maxProblTemp; */
            

          } else {
            console.error('Nenhuma informação encontrada');
          }
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção do idEmpresa: ${error.message}`);
    });
}

function alterarMetricas() {
  const inputs = document.querySelectorAll('input');
  const botaoAlterar = document.getElementById('botao_alterarMetrica');
  const botaoSalvar = document.getElementById('botao_salvarMetrica');

  // Itera sobre cada input
  inputs.forEach(input => {
      // Verifica se o id do input NÃO contém a palavra "Problema"
      if (!input.id.includes('Problema')) {
        
          // Se não contém, desabilita o input
          input.removeAttribute('disabled', true);

          botaoAlterar.style.display = 'none';
          botaoSalvar.style.display = 'flex';
          botaoSalvar.style.alignItems = 'center';
          botaoSalvar.style.justifyContent = 'center';
      } 
  });
}


function salvarMetricas() {
  var minimoDisco = ipt_minDisco.value;
  var maximoDisco = ipt_maxDisco.value;
  
  var minimoCpu = ipt_minCpu.value;
  var maximoCpu = ipt_maxCpu.value;

  var minimoRam = ipt_minRam.value;
  var maximoRam = ipt_maxRam.value;

  // TEMPERATURA

  // var minimoProblema = ipt_minProblema.value;
  // var minimoIdeal = ipt_minIdeal.value;
  // var maximoCuidado = ipt_minCuidado2.value;
  // var maximoProblema = ipt_minProblema2.value;


  
  if((minimoDisco < maximoDisco) && (minimoCpu < maximoCpu) && (minimoRam < maximoRam)){

  if (minimoDisco != '' && maximoDisco != '' && minimoCpu != '' && maximoCpu != '' && minimoRam != '' && maximoRam != '') {
  
  fetch(`/usuarios/alterarInfoAlerta/`,{
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        minimoDisco: minimoDisco,
        maximoDisco: maximoDisco,
        minimoCpu: minimoCpu,
        maximoCpu: maximoCpu,
        minimoRam: minimoRam,
        maximoRam: maximoRam
        // minimoProblema: minimoProblema,
        // minimoIdeal: minimoIdeal,
        // maximoCuidado: maximoCuidado,
        // maximoProblema: maximoProblema
    })
  }).then(function (resposta) {
      if (resposta.ok) {
          buscarInfoAlerta();
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

      } else {
            swal('error', "Não foi possível trocar a senha!");
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    }
  } else{
      swal("Valores incorretos!", "O valor mínimo não pode ser maior ou igual ao valor máximo. 🥺", "error");
    
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
