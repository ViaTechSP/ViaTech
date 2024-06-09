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
    atualizarSelect();
}

function obterHistoricoAlerta(fkEmpresa) {
  var fkEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/dashboard/obterHistoricoAlerta/${fkEmpresa}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          container_alertas.innerHTML = ''
          resposta.forEach(function (resposta) {

            if (resposta.componente == 'USB') {
              if (resposta.tipo == 'Problema') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado"> <div class="vermelho">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
                ${resposta.componente}s: ${resposta.valorRegistrado}</div>`
              } else if (resposta.tipo == 'Cuidado') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado">  <div class="amarelo">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
                ${resposta.componente}s: ${resposta.valorRegistrado}</div>`
              } 
            } else if (resposta.componente == 'Disco'){
              if (resposta.tipo == 'Problema') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado"> <div class="vermelho">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
                ${resposta.componente}: ${resposta.valorRegistrado} GB</div>`
              } else if (resposta.tipo == 'Cuidado') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado">  <div class="amarelo">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
                ${resposta.componente}: ${resposta.valorRegistrado} GB</div>`
              } 
            } else {
              if (resposta.tipo == 'Problema') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado"> <div class="vermelho">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
                ${resposta.componente}: ${resposta.valorRegistrado}%</div>`
              } else if (resposta.tipo == 'Cuidado') {
                container_alertas.innerHTML += ` <div class="alertas-quadrado">  <div class="amarelo">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
                ${resposta.componente}: ${resposta.valorRegistrado}%</div>`
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
}

function atualizarSelect() {
  var select = document.getElementById("select_estacao");
  select.selectedIndex = 2;
  console.log('teste =>', select.selectedIndex);
}

function onChangeSelect() {
  var fkEstacao = select_estacao.value;
  
  obterDadosGrafico(fkEstacao);
  obterInfoHeader(fkEstacao);
  atualizarKPIs(fkEstacao);
  obterMetricasEstacao(fkEstacao);
}



// function formatDateTime(dtHora) {
//   const date = new Date(dtHora);

//   const formattedDate = date.toLocaleDateString('pt-BR', {
//       month: '2-digit',
//       day: '2-digit'
//   });

//   const formattedTime = date.toLocaleTimeString('pt-BR', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: false
//   });

//   return `${formattedDate} ${formattedTime}`;
// }