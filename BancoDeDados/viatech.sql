DROP DATABASE viatech;
CREATE DATABASE viatech;
USE viatech;

-- CRIANDO USUÁRIO COM A SENHA PADRÃO	
-- CREATE USER 'usuario_viatech'@'localhost' IDENTIFIED BY 'viatech';
-- GRANT ALL PRIVILEGES ON `viatech`.* TO 'usuario_viatech'@'localhost';
-- FLUSH PRiVILEGES;


CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
razaoSocial VARCHAR(245) NOT NULL,
nomeFantasia VARCHAR(245),
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
dominio VARCHAR(50) NOT NULL UNIQUE,
ip VARCHAR(50) NOT NULL,
sistemaOperacional VARCHAR(45) NOT NULL,
fkEstacao INT NOT NULL,
CONSTRAINT fkEstacao FOREIGN KEY (fkEstacao) REFERENCES estacao (idEstacao)
);

CREATE TABLE especificacaoMaquina(
idEspecificacaoMaquina INT PRIMARY KEY AUTO_INCREMENT,
nomeCpu  VARCHAR(255),
frequenciaCpu VARCHAR(50),
capacidadeTotalArmazenamento DOUBLE,
ramTotal DOUBLE,
fkMaquina INT,
CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES maquina (idMaquina)
);

CREATE TABLE registro (
  idRegistro INT PRIMARY KEY AUTO_INCREMENT,
  dtHora DATETIME NOT NULL,
  cpuPorcentagemUso DOUBLE,
  cpuTemperatura DOUBLE,
  discoUtilizado DOUBLE,
  ramUtilizada DOUBLE,
  qtdDispositivos INT,
  fkEspecificacaoMaquina INT,
  CONSTRAINT FOREIGN KEY (fkEspecificacaoMaquina) REFERENCES especificacaoMaquina (idEspecificacaoMaquina)
);


SELECT * FROM EMPRESA;