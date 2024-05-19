DROP DATABASE viatech;
CREATE DATABASE viatech;
USE viatech;


CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
razaoSocial VARCHAR(100) NOT NULL,
apelido VARCHAR (100) NULL,
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
fkEmpresaFun INT NOT NULL,
CONSTRAINT fkEmpresaFun FOREIGN KEY (fkEmpresaFun) REFERENCES empresa (idEmpresa)
);

CREATE TABLE linha(
idLinha INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
numero INT NOT NULL,
fkEmpresaLinha INT NOT NULL,
CONSTRAINT fkEmpresaLinha FOREIGN KEY (fkEmpresaLinha) REFERENCES empresa (idEmpresa)
);

CREATE TABLE estacao(
idEstacao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
fkLinha INT NOT NULL,
CONSTRAINT fkLinha FOREIGN KEY (fkLinha) REFERENCES linha (idLinha)
);

CREATE TABLE computador (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
dominio VARCHAR(50) NOT NULL,
ip VARCHAR(50) NOT NULL,
sistemaOperacional VARCHAR(45) NOT NULL,
fkEstacao INT NOT NULL,
CONSTRAINT fkEstacao FOREIGN KEY (fkEstacao) REFERENCES estacao (idEstacao)
);


CREATE TABLE registroCpu (
  idCpu INT PRIMARY KEY AUTO_INCREMENT,
  dtHora DATETIME NOT NULL,
  porcentagemUso VARCHAR(45) NOT NULL,
  temperatura DOUBLE NOT NULL
);

CREATE TABLE registroDisco (
  idDisco INT PRIMARY KEY AUTO_INCREMENT,
  dtHora DATETIME NOT NULL,
  gigabyteLeitura DOUBLE NOT NULL,
  gigabyteEscrita DOUBLE NOT NULL,
  usoArmazenamento DOUBLE
);

CREATE TABLE registroUsb(
idUsb INT PRIMARY KEY AUTO_INCREMENT,
dtHora DATETIME,
nomeDispositivo VARCHAR(100)
);

CREATE TABLE registroRam(
idRam INT PRIMARY KEY AUTO_INCREMENT,
dtHora DATETIME,
memoriaUtilizada VARCHAR(45)
);


CREATE TABLE componentes(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
nomeCpu  VARCHAR(255),
frequenciaCpu VARCHAR(50),
qtdCpuFisica VARCHAR(45),
qtdCpuLogica VARCHAR(45),
capacidadeTotalArmazenamento DOUBLE,
memoriaRamTotal VARCHAR(45),
fkRegistroCpu INT,
fkRegistroDisco INT,
fkRegistroRam INT,
fkRegistroUsb INT,
CONSTRAINT fkRegistroCpu FOREIGN KEY (fkRegistroCpu) REFERENCES registroCpu (idCpu),
CONSTRAINT fkRegistroDisco FOREIGN KEY (fkRegistroDisco) REFERENCES registroDisco (idDisco),
CONSTRAINT fkRegistroRam FOREIGN KEY (fkRegistroRam) REFERENCES registroRam (idRam),
CONSTRAINT fkRegistroUsb FOREIGN KEY (fkRegistroUsb) REFERENCES registroUsb (idUsb)
);


-- NÃO EXECUTEI ESSA TABELA
CREATE TABLE processador (
idCpu INT PRIMARY KEY AUTO_INCREMENT,
fkMaquina INT NOT NULL,
CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES computador (idMaquina),
nomeCPU VARCHAR (255),
frequencia VARCHAR (40),
threads VARCHAR (40),
tempoAtividade VARCHAR (255)
);


SELECT * FROM ram;
