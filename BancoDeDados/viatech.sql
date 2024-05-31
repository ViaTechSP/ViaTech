DROP DATABASE viatech;
CREATE DATABASE viatech;
USE viatech;

select * from funcionario;

-- CRIANDO USUÁRIO COM A SENHA PADRÃO     
-- CREATE USER 'usuario_viatech'@'localhost' IDENTIFIED BY 'viatech';
-- GRANT ALL PRIVILEGES ON `viatech`.* TO 'usuario_viatech'@'localhost';
-- FLUSH PRiVILEGES;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
razaoSocial VARCHAR(245) NOT NULL,
nomeFantasia VARCHAR(245) NOT NULL,
CNPJ CHAR(14) NOT NULL UNIQUE
);


CREATE TABLE funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
urlFoto VARCHAR(800) NULL,
nome VARCHAR(100) NOT NULL,
cpf CHAR(11) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL,
senha VARCHAR(100) NOT NULL,
cargo VARCHAR(100) NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT fkempresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE linha(
idLinha INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
numero INT NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT empresaFk FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE estacao(
idEstacao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
fkLinha INT NOT NULL,
CONSTRAINT fkLinha FOREIGN KEY (fkLinha) REFERENCES linha (idLinha) ON DELETE CASCADE
);

CREATE TABLE maquina (
idMaquina INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
dominio VARCHAR(50) NOT NULL UNIQUE,
ip VARCHAR(50) NOT NULL,
sistemaOperacional VARCHAR(45) NOT NULL,
fkEstacao INT NOT NULL,
CONSTRAINT fkEstacao FOREIGN KEY (fkEstacao) REFERENCES estacao (idEstacao) ON DELETE CASCADE
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

CREATE TABLE metrica(
idMetrica INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
cuidadoDisco DOUBLE,
problemaDisco DOUBLE,
cuidadoCpu DOUBLE,
problemaCpu DOUBLE,
cuidadoRam DOUBLE,
problemaRam DOUBLE,
maxUsb INT,
fkLinha INT,
FOREIGN KEY (fkLinha) REFERENCES linha (idLinha) ON DELETE CASCADE
);

-------------------------------------------------------------------- INSERTS --------------------------------------------------------------

INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ) VALUES
('Via Tecnológica de São Paulo', 'ViaTechSP', '45904145652564'),
("ViaMobilidade LTDA", "ViaMobilidade", "12345678901234");

INSERT INTO Funcionario (nome, cpf, email, senha, cargo, fkEmpresa) VALUES
('Matheus Rabello', '62545164147', 'matheus@viatech.com', 'Senha!', 'Gerente', 1),
("Everton Fanado", "12345678901", "teste@teste.com", "123#Ee", "Gerente", 2);

INSERT INTO Linha (nome, numero, fkEmpresa) VALUES
('Amarela', 4, 1),
("Lilás", 5, 2);

INSERT INTO Estacao (nome, fkLinha) VALUES
('Paulista', 1),
('República', 1),
("Capão Redondo", 2),
("Campo Limpo", 2),
("Santo Amaro", 2);

INSERT INTO maquina (dominio, ip, sistemaOperacional, fkEstacao) VALUES
('paulista.com', '192.168.1.1', 'Windows', 1),
('republica.com', '192.168.1.2', 'Linux', 2);

INSERT INTO especificacaoMaquina (nomeCpu, armazenamentoTotal, ramTotal, fkMaquina) VALUES
('Intel Core i5', 500, 8, 1),
('AMD Ryzen 7', 1000, 16, 2);

INSERT INTO metrica (cuidadoDisco, problemaDisco, cuidadoCpu, problemaCpu, cuidadoRam, problemaRam, maxUsb, fkLinha) VALUES 
(70.5, 90.0, 80.0, 95.0, 75.0, 90.0, 5, 1),
(60.0, 85.0, 70.0, 90.0, 65.0, 85.0, 4, 2);
-- (75.0, 95.0, 85.0, 98.0, 80.0, 95.0, 6, 3),
-- (-65.0, 88.0, 78.0, 92.0, 70.0, 88.0, 5, 4);

INSERT INTO registro (cpuUtilizada, discoDisponivel, ramUtilizada, qtdDispositivosUsb, fkEspecificacaoMaquina) VALUES 
(50.5, 200.0, 60.0, 3, 1),
(70.2, 150.5, 75.0, 4, 2),

(45.2, 120.5, 75.6, 3, 1),
(30.1, 110.0, 60.3, 2, 1),
(55.3, 115.7, 80.1, 4, 1),
(48.8, 125.2, 77.8, 3, 1),
(52.6, 130.4, 72.9, 5, 1),
(49.7, 122.0, 70.4, 4, 1),

(40.2, 115.0, 65.2, 3, 2),
(35.7, 112.5, 60.0, 2, 2),
(50.5, 118.3, 78.4, 4, 2),
(47.9, 121.7, 74.1, 3, 2),
(53.4, 117.2, 80.3, 5, 2),
(45.6, 119.5, 68.9, 4, 2);

       
INSERT INTO historicoAlerta (tipo, componente, valorRegistrado, fkRegistro) VALUES 
('Problema', 'CPU', 90.0, 1),
('Cuidado', 'Disco', 50.0, 1),
('Problema', 'RAM', 80.0, 2),
('Cuidado', 'USB', 5, 2);

-------------------------------------------------------------------- SELECTS --------------------------------------------------------------
SELECT m.* FROM Metrica m 
	JOIN Linha l ON m.fkLinha = l.idLinha
    JOIN Estacao e ON e.fkLinha = l.idLinha
    WHERE idEstacao = 1;