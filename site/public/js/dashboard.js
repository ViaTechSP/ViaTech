function colorirPalavra() {
    var div = document.getElementsByClassName("alertas-quadrado");
    var texto = div.innerHTML;
    var textoColorido = texto.replace(new RegExp(palavra, 'g'), '<span style="color:' + cor + ';">' + palavra + '</span>');
    div.innerHTML = textoColorido;
}

// FUNÇÃO DO SELECT DE ESTAÇÃO
function listarMaquinas(idEmpresa) {
  var idEmpresa = sessionStorage.ID_EMPRESA;

fetch(`/dashboard/listarMaquinas/${idEmpresa}`)
    .then(resposta => {
        if (resposta.status == 200) {
            resposta.json().then(resposta => {
                
                var select = document.getElementById("select_estacao");
                resposta.forEach(function(resposta) {
                    var option = document.createElement("option");
                    option.value = resposta.idEstacao;
                    option.text = resposta.nome;
                    select.appendChild(option);
                });
            });
        } else {
            console.error(`Nenhum dado encontrado para o id ${idEmpresa} ou erro na API`);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados de estação ${error.message}`);
    });

}

// FUNÇÃO PARA CARREGAR AS INFORMAÇÕES DA HEADER
    function obterInfoHardware() {
      var fkEstacao = select_estacao.value;

      fetch(`/dashboard/obterInfoHardware/${fkEstacao}`, { cache: 'no-store' })
      .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                    console.log(resposta)
                    span_so.innerHTML = resposta[0].sistemaOperacional
                    span_cpu.innerHTML = resposta[0].nomeCpu
                    span_ram.innerHTML = resposta[0].ramTotal
                    span_disco.innerHTML = resposta[0].discoTotal
                });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção do idEmpresa: ${error.message}`);
      });
}

function obterHistoricoAlerta() {
    var fkEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/dashboard/obterHistoricoAlerta/${fkEmpresa}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
            resposta.forEach(function(resposta) {
                var option = document.createElement("option");
                option.value = resposta.idLinha;
                option.text = resposta.nome;
                select.appendChild(option);
            });
              });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção do idEmpresa: ${error.message}`);
    });
}
  /*------------------\
  |                   |
  |    FUNÇÕES DE     |
  |  GRÁFICOS ABAIXO  |
  |                   |
  \-------------------/


// FUNÇÃO PARA INICIALIZAR TODOS OS GRÁFICOS 
  /*
  ainda precisa criar uma função para dar select no banco de dados
  e depois inicializar os charts com os dados atuais de cada máquina
  */
  function init() {
      google.charts.load('current', {
          packages: ['corechart']
      });
      google.charts.setOnLoadCallback(function() {
          drawCPU();
          drawRAM();
          drawDisco();
          drawTemperatura();
      });
  }

function drawCPU() {
 var data = new google.visualization.DataTable();
 data.addColumn("string", "Data/Hora");
 data.addColumn("number", "% de uso");
 data.addRow(['19:30', 10]);
 data.addRow(['19:32', 20]);
 data.addRow(['19:34', 30]);
 data.addRow(['19:36', 40]);
 data.addRow(['19:38', 90]);

 var options = {
    title: 'Uso de CPU %',
    legend: 'none',
    chartArea: { 'width': '84%' },
    backgroundColor: '#efefef',
    colors: ['#9747FF']
 };

 var chart = new google.visualization.AreaChart(document.getElementById("grafico_cpu"));
 chart.draw(data, options);
}

function drawRAM(dados) {
 var data = new google.visualization.DataTable();
 data.addColumn("string", "Data/Hora");
 data.addColumn("number", "% de uso");
 data.addRow(['19:30', 10]);
 data.addRow(['19:32', 20]);
 data.addRow(['19:34', 30]);
 data.addRow(['19:36', 40]);
 data.addRow(['19:38', 90]);

 var options = {
    title: 'Uso de RAM %',
    legend: 'none',
    chartArea: { 'width': '84%' },
    backgroundColor: '#efefef',
    colors: ['green']
 };

 var chart = new google.visualization.AreaChart(document.getElementById("grafico_ram"));
 chart.draw(data, options);
}

function drawDisco(dados) {
 var data = new google.visualization.DataTable();
 data.addColumn("string", "Data/Hora");
 data.addColumn("number", "% de uso");
 data.addRow(['19:30', 10]);
 data.addRow(['19:32', 20]);
 data.addRow(['19:34', 30]);
 data.addRow(['19:36', 40]);
 data.addRow(['19:38', 90]);

 var options = {
    title: "Uso de Disco %",
    legend: 'none',
    chartArea: { 'width': '84%' },
    backgroundColor: '#efefef',
    colors: ['blue']
 };

 var chart = new google.visualization.AreaChart(document.getElementById("grafico_disco"));
 chart.draw(data, options);
}

function drawTemperatura(dados) {
 var data = new google.visualization.DataTable();
 data.addColumn("string", "Data/Hora");
 data.addColumn("number", "% de uso");
 data.addRow(['19:30', 10]);
 data.addRow(['19:32', 20]);
 data.addRow(['19:34', 30]);
 data.addRow(['19:36', 40]);
 data.addRow(['19:38', 90]);


 var options = {
    title: "Temperatura ºC",
    legend: 'none',
    chartArea: { 'width': '84%' },
    backgroundColor: '#efefef',
    colors: ['red']
 };


 var chart = new google.visualization.AreaChart(document.getElementById("grafico_temperatura"));
 chart.draw(data, options);
}

