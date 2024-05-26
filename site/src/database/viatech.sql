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


CREATE TABLE metrica(
idMetrica INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
minCuidadoDisco INT,
maxCuidadoDisco INT,
minCUidadoCpu INT,
maxCUidadoCpu INT,
minCUidadoRam INT,
maxCUidadoRam INT,
minIdealTemp INT,
maxIdealTemp INT 
);

INSERT INTO metrica VALUES (null, 70, 85, 70, 85, 60, 80, 20, 58);

CREATE TABLE maquina (
idMaquina INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
dominio VARCHAR(50) NOT NULL UNIQUE,
ip VARCHAR(50) NOT NULL,
sistemaOperacional VARCHAR(45) NOT NULL,
fkEstacao INT NOT NULL,
FkMetrica INT NOT NULL,
CONSTRAINT fkEstacao FOREIGN KEY (fkEstacao) REFERENCES estacao (idEstacao),
CONSTRAINT fkMetrica FOREIGN KEY (fkMetrica) REFERENCES metrica (idMetrica)
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
  dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
  cpuPorcentagemUso DOUBLE,
  cpuTemperatura DOUBLE,
  discoUtilizado DOUBLE,
  ramUtilizada DOUBLE,
  qtdDispositivos INT,
  fkEspecificacaoMaquina INT,
  CONSTRAINT FOREIGN KEY (fkEspecificacaoMaquina) REFERENCES especificacaoMaquina (idEspecificacaoMaquina)
);

CREATE TABLE historicoAlerta(
idHistoricoAlerta INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo VARCHAR(100),
fkRegistro INT,
	FOREIGN KEY (fkRegistro) REFERENCES registro (idRegistro),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO registro (cpuPorcentagemUso, cpuTemperatura, discoUtilizado, ramUtilizada, qtdDispositivos, fkEspecificacaoMaquina) VALUES
(60.0, 62.0, 180.0, 10.0, 6, 1),
(75.0, 68.0, 220.0, 18.0, 12, 1),
(85.0, 70.0, 230.0, 28.0, 14, 1),
(50.0, 58.0, 160.0, 7.0, 4, 1),
(65.0, 63.0, 190.0, 12.0, 8, 1);

-- Inserção de dados na tabela historicoAlerta
INSERT INTO historicoAlerta (tipo, fkRegistro)
VALUES
('Cuidado', 1),
('Problema', 2),
('Cuidado', 3),
('Problema', 4),
('Cuidado', 5),
('Problema', 6),
('Cuidado', 7),
('Problema', 8),
('Cuidado', 9),
('Problema', 10),
('Cuidado', 11);

SELECT * FROM empresa;
SELECT * FROM metrica;
