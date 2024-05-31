function listarMaquinas(idEmpresa) {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var select = document.getElementById("select_estacao");

  fetch(`/dashboard/listarMaquinas/${idEmpresa}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          resposta.forEach(function (resposta) {
            var option = document.createElement("option");
            option.value = resposta.idEstacao;
            option.text = resposta.nome;
            select.appendChild(option);
          });
        });
      } else console.error(`Nenhum dado encontrado para o id ${idEmpresa} ou erro na API`);
    })
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
          span_ram.innerHTML = resposta[0].ramTotal + ' GB'
          span_disco.innerHTML = resposta[0].armazenamentoTotal + ' GB'
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
               <canvas id="ramChart${fkEstacao}" class="grafico-cpu"></canvas>`

              graficos_segunda.innerHTML = 
              `<canvas id="discoChart${fkEstacao}" class="grafico-cpu"></canvas>
              ` 
              // resposta.reverse();
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
          ram_ideal.innerHTML = (resposta[0].cuidadoRam)
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
  // var cpuChart = document.getElementById('cpuChart');

  // if(cpuChart) document.getElementById('cpuChart').destroy();
  
  let labels = [];
  let cpuData = [];
  let discoData = [];
  let ramData = [];
  let usbData = [];
  console.log('resposta length = ', resposta.length);
  for (let i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    console.log('registro = >', registro, i);
    labels.push(formatDateTime(registro.dtHora));
    cpuData.push(registro.cpuUtilizada);
    discoData.push(registro.discoDisponivel);
    ramData.push(registro.ramUtilizada);
    usbs_conectados.innerHTML = registro.qtdDispositivosUsb;
  }

  const createChart = (ctx, label, data, borderColor, backgroundColor) => {
      return new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: label,
                  data: data,
                  fill: true,
                  borderColor: borderColor,
                  backgroundColor: backgroundColor,
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
              }
          }
      });
  };

  createChart(document.getElementById(`cpuChart${fkEstacao}`), 'CPU %', cpuData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
  createChart(document.getElementById(`discoChart${fkEstacao}`), 'Disco GB', discoData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
  createChart(document.getElementById(`ramChart${fkEstacao}`), 'RAM %', ramData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
}

function formatDateTime(dtHora) {
  const date = new Date(dtHora);

  const formattedDate = date.toLocaleDateString('pt-BR', {
      month: '2-digit',
      day: '2-digit'
  });

  const formattedTime = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  });

  return `${formattedDate} ${formattedTime}`;
}

function onLoadFuncoes() {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var fkEstacao = sessionStorage.getItem("estacaoId");
  
  listarMaquinas(idEmpresa);
  obterHistoricoAlerta(idEmpresa);
  obterDadosGrafico(fkEstacao);
  obterInfoHeader(fkEstacao);
  atualizarKPIs(fkEstacao);
  obterMetricasEstacao(fkEstacao);
}

function onChangeSelect() {
  var fkEstacao = select_estacao.value;

  obterDadosGrafico(fkEstacao);
  obterInfoHeader(fkEstacao);
  atualizarKPIs(fkEstacao);
  obterMetricasEstacao(fkEstacao);
}