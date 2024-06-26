var ambiente_processo = 'producao';
// var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });


// Define explicitamente a variável de ambiente para ser usada no restante do código
process.env.AMBIENTE_PROCESSO = ambiente_processo;

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT || 80;
var HOST_APP = process.env.APP_HOST || '34.197.44.86';


var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var linhaRouter = require("./src/routes/linha");
var empresaRouter = require("./src/routes/empresa");
var dashboardRouter = require("./src/routes/dashboard");
var dashGeralRouter = require("./src/routes/dashGeral");
var estacaoRouter = require("./src/routes/estacao");
var metricaRouter = require("./src/routes/metrica");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresa", empresaRouter);
app.use("/linha", linhaRouter);
app.use("/dashboard", dashboardRouter);
app.use("/dashGeral", dashGeralRouter);
app.use("/estacao", estacaoRouter);
app.use("/metrica", metricaRouter);

app.listen(PORTA_APP, function () {
    console.log(`                                                                                   
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP}/html/index.html . \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n`);
});