CREATE DATABASE viatech;
USE viatech;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
razaoSocial VARCHAR(245) NOT NULL,
nomeFantasia VARCHAR(245),
apelido VARCHAR (245),
CNPJ CHAR(14) NOT NULL
);

CREATE TABLE funcionario(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
urlFoto VARCHAR(300) NULL,
nome VARCHAR(100) NOT NULL,
cpf CHAR(11) NOT NULL,
email VARCHAR(100) NOT NULL,
senha VARCHAR(100) NOT NULL,
cargo VARCHAR(100) NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE linha(
idLinha INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
numero INT NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE estacao(
idEstacao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
fkLinha INT NOT NULL,
CONSTRAINT fkLinha FOREIGN KEY (fkLinha) REFERENCES linha (idLinha)
);

CREATE TABLE maquina (
idMaquina INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
dominio VARCHAR(50) NOT NULL,
ip VARCHAR(50) NOT NULL,
sistemaOperacional VARCHAR(45) NOT NULL,
fkEstacao INT NOT NULL,
CONSTRAINT fkEstacao FOREIGN KEY (fkEstacao) REFERENCES estacao (idEstacao)
);


CREATE TABLE especificacaoMaquina(
idEspecificacaoMaquina INT PRIMARY KEY AUTO_INCREMENT,
nomeCpu  VARCHAR(255),
frequenciaCpu VARCHAR(50),
qtdCpuFisica VARCHAR(45),
qtdCpuLogica VARCHAR(45),
capacidadeTotalArmazenamento DOUBLE,
ramTotal DOUBLE,
fkMaquina INT,
CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES maquina (idMaquina)
);

CREATE TABLE registro (
  idRegistro INT PRIMARY KEY AUTO_INCREMENT,
  dtHora DATETIME NOT NULL,
  discoGigabyteLeitura DOUBLE NOT NULL,
  discoGigabyteEscrita DOUBLE NOT NULL,
  cpuPorcentagemUso DOUBLE,
  cpuTemperatura DOUBLE,
  nomeDispositivo VARCHAR(100),
  ramUtilizada DOUBLE,
  usbNomeDispositivos VARCHAR(245)  ,
  fkEspecificacaoMaquina INT,
  CONSTRAINT FOREIGN KEY (fkEspecificacaoMaquina) REFERENCES especificacaoMaquina (idEspecificacaoMaquina)
);

INSERT INTO empresa VALUES
	(null, "ViaMobilidade LTDA", "Viaiznha", "12345678911234");
    
INSERT INTO funcionario  VALUES
	(null, null, "Teste", "12345678901", "teste@teste.com", "123#Ee", "gerencia", 1);
    