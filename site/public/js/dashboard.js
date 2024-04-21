window.onload = obterInfoHardware(), clicarMenu();


function obterInfoHardware() {
    var fkComputador = estacao.value;

fetch(`/dashboard/obterInfoHardware`,{
    method: "POST",
    headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify({
    fkComputadorServer: fkComputador
   })
 })
.then(function (response) {
if (response.ok) {
    response.json().then(function (resposta) {
            
        resposta.reverse();

            console.log(resposta)
            span_so.innerHTML = resposta[0].SistemaOperacional
            span_cpu.innerHTML = resposta[0].NomeCpu
            span_ram.innerHTML = resposta[0].Arquitetura
            span_disco.innerHTML = resposta[0].MemoriaEmUso
            span_uso.innerHTML = resposta[0].MemoriaTotal
            // plotarGrafico(resposta);

        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API' + error);
    }
})
.catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
});
}

google.charts.load('current', { packages: ['coreChart'] });
google.charts.setOnLoadCallback(drawCPU);
google.charts.setOnLoadCallback(drawRAM);
google.charts.setOnLoadCallback(drawDisco);
google.charts.setOnLoadCallback(drawTemperatura);

function drawCPU() {
var data = new google.visualization.DataTable();
data.addColumn("string", "Data/Hora");
data.addColumn("number", "% de uso");
data.addRow(['10', 10]);
data.addRow(['20', 20]);
data.addRow(['30', 30]);
data.addRow(['40', 40]);
data.addRow(['90', 90]);

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
data.addRow(['10', 10]);
data.addRow(['20', 20]);
data.addRow(['30', 30]);
data.addRow(['40', 40]);
data.addRow(['90', 90]);


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
data.addRow(['10', 10]);
data.addRow(['20', 20]);
data.addRow(['30', 30]);
data.addRow(['40', 40]);
data.addRow(['90', 90]);


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
data.addRow(['10', 10]);
data.addRow(['20', 20]);
data.addRow(['30', 30]);
data.addRow(['40', 40]);
data.addRow(['90', 90]);


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


