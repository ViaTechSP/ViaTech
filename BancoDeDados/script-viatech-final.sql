DROP DATABASE viatech;
CREATE DATABASE viatech;
USE viatech;

CREATE TABLE maquina (
idMaquina INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
dominio VARCHAR(50) NOT NULL UNIQUE,
ip VARCHAR(50) NOT NULL,
sistemaOperacional VARCHAR(45) NOT NULL,
fkEstacao INT NOT NULL UNIQUE
);

CREATE TABLE especificacaoMaquina(
idEspecificacaoMaquina INT PRIMARY KEY AUTO_INCREMENT,
nomeCpu VARCHAR(255),
armazenamentoTotal DOUBLE,
ramTotal DOUBLE,
fkMaquina INT NOT NULL,
FOREIGN KEY (fkMaquina) REFERENCES maquina (idMaquina) ON DELETE CASCADE
);

CREATE TABLE registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
cpuUtilizada DOUBLE,
discoDisponivel DOUBLE,
ramUtilizada DOUBLE,
qtdDispositivosUsb INT,
fkEspecificacaoMaquina INT NOT NULL,
FOREIGN KEY (fkEspecificacaoMaquina) REFERENCES especificacaoMaquina (idEspecificacaoMaquina) ON DELETE CASCADE
);

CREATE TABLE historicoAlerta(
idHistorico INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
tipo VARCHAR(100),
componente VARCHAR(30),
valorRegistrado DOUBLE,
fkRegistro INT NOT NULL,
FOREIGN KEY (fkRegistro) REFERENCES registro (idRegistro) ON DELETE CASCADE
);

select * from historicoAlerta;