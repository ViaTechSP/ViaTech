// const e = require("cors");

function listarMaquinas(idEmpresa) {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var select = document.getElementById("select_estacao");

  fetch(`/dashboard/listarMaquinas/${idEmpresa}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          resposta.map(item => {
            console.log('item =>', item);
            select.innerHTML += `<option value=${item.idEstacao}>${item.nome}</option>`
          })
        });
      } else console.error(`Nenhum dado encontrado para o id ${idEmpresa} ou erro na API`);
    })
}

function obterHistoricoAlerta(fkEmpresa) {
  var fkEmpresa = sessionStorage.ID_EMPRESA;

  console.log('ENTROU NA FUNÇÃO HISTÓRICO ALERTA');
  
  fetch(`/dashboard/obterHistoricoAlerta/${fkEmpresa}`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        container_alertas.innerHTML = ''
        resposta.forEach(function (item) {
          if (item.componente == 'usb') {
            if (item.tipo == 'problema') {
              container_alertas.innerHTML += ` <div class="alertas-quadrado"> <div class="vermelho">${item.tipo} <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon> </div> - Estação ${item.nome} <br>
              ${item.componente}s: ${(item.valorRegistrado).toFixed(2)}</div>`
            } else if (item.tipo == 'cuidado') {
              container_alertas.innerHTML += ` <div class="alertas-quadrado">  <div class="amarelo">${item.tipo} <sl-icon class="icone-cuidado" name="exclamation-triangle"></sl-icon> </div> - Estação ${item.nome} <br>
              ${item.componente}s: ${(item.valorRegistrado).toFixed(2)}</div>`
            } 
          } else if (item.componente == 'disco'){
              console.log('3');
              if (item.tipo == 'problema') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado"> <div class="vermelho">${item.tipo} <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon></div> - Estação ${item.nome} <br>
                ${item.componente}: ${(item.valorRegistrado).toFixed(2)} GB</div>`
              } else if (item.tipo == 'cuidado') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado">  <div class="amarelo">${item.tipo} <sl-icon class="icone-cuidado" name="exclamation-triangle"></sl-icon> </div> - Estação ${item.nome} <br>
                ${item.componente}: ${(item.valorRegistrado).toFixed(2)} GB</div>`
              } 
            } else {
              if (item.tipo == 'problema') {
                console.log('VALOR REGISTRADO => ' + item.valorRegistrado);

                container_alertas.innerHTML += ` <div class="alertas-quadrado"> <div class="vermelho">${item.tipo} <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon></div> - Estação ${item.nome} <br>
                ${item.componente}: ${Math.round(item.valorRegistrado)}%</div>`
              } else if (item.tipo == 'cuidado') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado">  <div class="amarelo">${item.tipo} <sl-icon class="icone-cuidado" name="exclamation-triangle"></sl-icon> </div> - Estação ${item.nome} <br>
                ${item.componente}: ${Math.round(item.valorRegistrado)}%</div>`
              } 
            }
          });
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
}
  
function obterInfoHeader(fkEstacao) {
  fetch(`/dashboard/obterInfoHeader/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          resposta.reverse();
          span_so.innerHTML = resposta[0].sistemaOperacional
          span_cpu.innerHTML = resposta[0].nomeCpu
          span_ram.innerHTML = (resposta[0].ramTotal).toFixed(2) + ' GB total'
          span_disco.innerHTML = (resposta[0].armazenamentoTotal).toFixed(2) + ' GB total'
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
}
  
function atualizarKPIs(fkEstacao) {
  fetch(`/dashboard/obterInfoKPIAlertas/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {

        span_kpi_cuidado.innerHTML = 0;
        span_kpi_problema.innerHTML = 0;

        response.json().then(function (resposta) {
          resposta.forEach(function (resposta) {
            
            if (resposta.tipo == 'Cuidado') {
              span_kpi_cuidado.innerHTML = resposta.total;
            }
            else if (resposta.tipo == 'Problema') {
              span_kpi_problema.innerHTML = resposta.total;
            }

          });
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
    
    fetch(`/dashboard/obterInfoKPIComponente/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
            span_kpi_componente.innerHTML = resposta[0].componente + ', com '+ resposta[0].total + ' alertas'
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
}

function obterDadosGrafico(fkEstacao) {  
  fetch(`/dashboard/obterDadosGrafico/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              graficos_primeira.innerHTML = 
              `<canvas id='cpuChart${fkEstacao}' class="grafico-cpu"></canvas>
               <canvas id='ramChart${fkEstacao}' class="grafico-cpu"></canvas>`

              graficos_segunda.innerHTML = 
              `<canvas id="discoChart${fkEstacao}" class="grafico-cpu"></canvas>` 

              plotarGrafico(resposta, fkEstacao);
          });
      } else  console.error('Nenhum dado encontrado ou erro na API' + response);
  })
}

function obterMetricasEstacao(fkEstacao) {
  fetch(`/metrica/obterMetricasEstacao/${fkEstacao}`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
          disco_ideal.innerHTML = resposta[0].cuidadoDisco
          disco_cuidado.innerHTML = resposta[0].cuidadoDisco
          disco_problema.innerHTML = resposta[0].problemaDisco
          ram_ideal.innerHTML = resposta[0].cuidadoRam
          ram_cuidado.innerHTML = resposta[0].cuidadoRam
          ram_problema.innerHTML = resposta[0].problemaRam
          cpu_ideal.innerHTML = resposta[0].cuidadoCpu
          cpu_cuidado.innerHTML = resposta[0].cuidadoCpu
          cpu_problema.innerHTML = resposta[0].problemaCpu
          usb_ideal.innerHTML = resposta[0].maxUsb
        });
    } else  console.error('Nenhum dado encontrado ou erro na API');
})
}

function plotarGrafico(resposta, fkEstacao) {
  let labels = [];
  let cpuData = [];
  let discoData = [];
  let ramData = [];

  for (let i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    labels.push(registro.dataHora);
    cpuData.push(registro.cpuUtilizada);
    discoData.push(registro.discoDisponivel);
    ramData.push(registro.ramUtilizada);
    usbs_conectados.innerHTML = registro.qtdDispositivosUsb;
  }

  const createChart = (ctx, label, data, borderColor, backgroundColor, height, width) => {
      return new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: label,
                  data: data,
                  fill: true,
                  borderColor: '#a15ff7',
                  backgroundColor: '#c79cff',
                  tension: 0.4,
                  pointBackgroundColor: 'white',
                  pointBorderColor: borderColor,
                  pointHoverBackgroundColor: borderColor,
                  pointHoverBorderColor: 'white'
              }]
          },
          options: {
              plugins: {
                  title: {
                      display: true,
                      text: label,
                      font: {
                          size: 20
                      }
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true,
                      ticks: {
                          callback: function(value) {
                              return value + '%';
                          }
                      }
                  }
              },
              elements: {
                  line: {
                      borderWidth: 2
                  },
                  point: {
                      radius: 5,
                      hoverRadius: 7
                  }
              },
              layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                },
                responsive: false, // Impedindo o redimensionamento responsivo
                maintainAspectRatio: false, // Desativando a manutenção da proporção
                width: width,
                height: height
            }
          }
      });
  };

  const cpuChart = createChart(document.getElementById(`cpuChart${fkEstacao}`), 'CPU %', cpuData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
  const discoChart = createChart(document.getElementById(`discoChart${fkEstacao}`), 'Disco GB', discoData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
  const ramChart = createChart(document.getElementById(`ramChart${fkEstacao}`), 'RAM %', ramData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');

  atualizarGrafico(fkEstacao, cpuChart, discoChart, ramChart);
}

function atualizarGrafico(fkEstacao, cpuChart, discoChart, ramChart) {
  fetch(`/dashboard/obterDadosTempoReal/${fkEstacao}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {
        // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        
        let novoHorario = novoRegistro[0].dataHora;
        console.log('novo horario => ', novoHorario);

        if (cpuChart.data.labels[cpuChart.data.labels.length - 1] === novoHorario) {
          // console.log("---------------------------------------------------------------");
          // console.log("Como não há dados novos para captura, os gráficos não atualizarão.");
          // console.log("Horário do novo dado capturado:");
          // console.log(novoHorario);
          // console.log("Horário do último dado capturado:");
          // console.log(cpuChart.data.labels[cpuChart.data.labels.length - 1]);
          // console.log("---------------------------------------------------------------");
        } else {

          const cpuLabels = [...cpuChart.data.labels];
          cpuLabels.shift();
          cpuLabels.push(novoHorario);
          cpuChart.data.labels = cpuLabels;
          const cpuData = [...cpuChart.data.datasets[0].data];
          cpuData.shift();
          cpuData.push(novoRegistro[0].cpuUtilizada);
          cpuChart.data.datasets[0].data = cpuData;
          cpuChart.update();
          
          const discoLabels = [...discoChart.data.labels];
          discoLabels.shift();
          discoLabels.push(novoHorario);
          discoChart.data.labels = discoLabels;
          const discoData = [...discoChart.data.datasets[0].data];
          discoData.shift();
          discoData.push(novoRegistro[0].discoDisponivel);
          discoChart.data.datasets[0].data = discoData;
          discoChart.update();
          
          const ramLabels = [...ramChart.data.labels];
          ramLabels.shift();
          ramLabels.push(novoHorario);
          ramChart.data.labels = ramLabels;
          const ramData = [...ramChart.data.datasets[0].data];
          ramData.shift();
          ramData.push(novoRegistro[0].ramUtilizada);
          ramChart.data.datasets[0].data = ramData;
          ramChart.update();
          
          usbs_conectados.innerHTML = novoRegistro[0].qtdDispositivosUsb;
          console.log('qtdUsbs =>', novoRegistro[0].qtdDispositivosUsb);
        }

        setTimeout(() => atualizarGrafico(fkEstacao, cpuChart, discoChart, ramChart), 5000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      setTimeout(() => atualizarGrafico(fkEstacao, cpuChart, discoChart, ramChart), 5000);
    }
  })
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
  });
}

function onLoadFuncoes() {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  
  var fkEstacao = localStorage.getItem("estacaoId");
  
  
  listarMaquinas(idEmpresa);
  obterHistoricoAlerta(idEmpresa);
  obterDadosGrafico(fkEstacao);
  obterInfoHeader(fkEstacao);
  atualizarKPIs(fkEstacao);
  obterMetricasEstacao(fkEstacao);

  setTimeout(recarregar, 5000);
}

function onChangeSelect(){
  var fkEstacao = select_estacao.value;
  
  obterDadosGrafico(fkEstacao);
  obterInfoHeader(fkEstacao);
  atualizarKPIs(fkEstacao);
  obterMetricasEstacao(fkEstacao);
  exibirComentario();

  setTimeout(recarregar, 5000);
}

function recarregar() {
  var fkEstacao = select_estacao.value;

  atualizarKPIs(fkEstacao);

  setTimeout(recarregar, 5000);
}

function exibirPopUp(){
  document.getElementById("caixaComentar").style.display = 'none';

  document.getElementById("divComentario").style.display = 'block';
  document.getElementById("divComentario").style.display = 'flex';

  exibirComentario();
}

function esconderPopUp(){
  document.getElementById("divComentario").style.display = 'none';
 
}

function listarCategoria() {
  var select = document.getElementById("select_categoria");


  fetch(`/dashboard/listarCategoria/`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        resposta.forEach(function (resposta) {


          console.log('id',resposta.idCategoria)
          console.log('nome',resposta.nome)

          var option = document.createElement("option");
          option.value = resposta.idCategoria;
          option.text = resposta.nome;
          select.appendChild(option);
        
        });
      });
    } else console.error('Nenhum dado encontrado ou erro na API');
  });
}

function exibirAdd(){
  document.getElementById("caixaExibir").style.display = 'none';
  document.getElementById("caixaComentar").style.display = 'block';
  document.getElementById("caixaComentar").style.display = 'flex';

  var email = document.getElementById("ipt_funcionario");

  if (sessionStorage.EMAIL_USUARIO) {
    email.value = sessionStorage.EMAIL_USUARIO;
  }
}

function addComentario(){
  var idFun = sessionStorage.ID_FUNCIONARIO;
  var comentario = ipt_descricao.value;
  var idCategoria = select_categoria.value;
  var idEstacao = select_estacao.value;


  console.log(idFun)
  console.log(comentario)
  console.log(idEstacao)
  // console.log(idCategoria)

  
  if(idCategoria != 0 && idEstacao != 0){

    if(comentario !== '' ){
     fetch("/dashboard/addComentario", {
       method: "POST", 
         headers: {
         "Content-Type": "application/json",
        },
         body: JSON.stringify({
         idFun: idFun,
         comentario: comentario,
         idCategoria: select_categoria.value,
         idEstacao: select_estacao.value
        }),
        }).then(function (resposta) {
         swal('Eba!', 'Comentário postado!', 'success');
        }
        )}else{
        swal('Ei!', 'Preencha o campo!', 'error');
    }
  } else{
    swal('Ei!', 'Selecione uma categoria e uma estaçao!', 'error');

  }

    exibirComentario();
  
}

function exibirComentario(){

  var container = document.getElementById('caixaExibir');  
  document.getElementById("caixaComentar").style.display = 'none';
  container.style.display = 'block';
  container.style.display = 'flex';

  var idEstacao = select_estacao.value;
  var idCategoria = select_categoria.value;

  if(idEstacao == 0){
    swal('Ei!', 'Selecione uma estação primeiro!', 'error')
    document.getElementById("divComentario").style.display = 'none';


  }
  var lista_comentario = [];

  container.innerHTML ="";

  

   fetch(`/dashboard/exibirComentario/${idEstacao}/${idCategoria}`
   ).then(function (resposta) {
      console.log(resposta)

      return resposta.json();
     })
     
     .then((resposta) => { 
     lista_comentario = resposta;
     console.log('ee', resposta)

     if (lista_comentario.length === 0) {
      swal({
          title: "Ops",
          text: "Não existem comentarios nessa categoria ainda, seja o primeiro!",
          icon: "warning",
      }).then((confirmacao) => {
          if (confirmacao) {
              exibirAdd();
          }
      });
  }
        
   var tamanhoComentario = lista_comentario.length;
   var auxiliar = 0;

   for (var i = 0; i < tamanhoComentario; i++) {
     var id_comentario = lista_comentario[i].id_comentario;
     var descricao_atual = lista_comentario[i].descricao;
     var dtHora_atual = formatDateTime(lista_comentario[i].dtHora);
     var email_atual = lista_comentario[i].email
     var categoria_atual = lista_comentario[i].categoria
    //  formatDateTime(dtHora_atual);
    
     auxiliar++;

     container.innerHTML += `
     <div class="caixaComentario">
     
     
     <div class="data">${dtHora_atual}ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ#${categoria_atual}</div>
     <div class="email">${email_atual}</div>
     
     <div class="comentario">
     ${descricao_atual}
     </div>
     </div>
     `;
     
     console.log(container)
   }
 });

}


function formatDateTime(dtHora) {
  const date = new Date(dtHora);

  const formattedDate = date.toLocaleDateString('pt-BR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
  });

  const formattedTime = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  });

  return `${formattedDate} - ${formattedTime}`;
}