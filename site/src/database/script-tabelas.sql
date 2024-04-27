DROP DATABASE ViaTech;
CREATE DATABASE viatech;
USE viatech;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nomeFantasia VARCHAR(100) NOT NULL,
CNPJ CHAR(14) NOT NULL UNIQUE,
telefone CHAR(11) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(100) NOT NULL
);

CREATE TABLE funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
nome VARCHAR(100) NOT NULL,
cargo VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(100) NOT NULL
);

CREATE TABLE linha (
idLinha INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
numero INT,
fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE estacao (
idEstacao INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255),
fkLinha INT,
	FOREIGN KEY (fkLinha) REFERENCES linha (idLinha)
);

CREATE TABLE Computador (
idComputador INT PRIMARY KEY AUTO_INCREMENT,
fkEstacao INT,
	FOREIGN KEY (fkEstacao) REFERENCES estacao(idEstacao)
);

CREATE TABLE Componente (
idComponente INT PRIMARY KEY AUTO_INCREMENT,
sistemaOperacional VARCHAR(50) NOT NULL,
nomeCpu VARCHAR(255) NOT NULL,
ramTotal VARCHAR(255) NOT NULL,
volumeTotal VARCHAR(255) NOT NULL,
tempoAtividade VARCHAR(255),
fkComputador INT,
	FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador)
);

-- INSERTS --
INSERT INTO empresa VALUES 
(null, 'ortem', '12345678901234', '11987654321', 'rabello@admin.com', 'Admin123!'),
(null, 'quatro', '54321012345678', '12345678911', 'renan@admin.com', 'Admin123!'),
(null, 'mobilidade', '55555123456789', '13245768910', 'felipe@admin.com', 'Admin123!');

INSERT INTO funcionario VALUES
(null, 1, 'Rabello', 'gerente', 'rabello@ortem.com', 'Ortem123!'),
(null, 1, 'Castrillo', 'técnico', 'castrillo@ortem.com', 'Ortem123!'),
(null, 2, 'Renan', 'gerente', 'renan@quatro.com', 'Quatro123!'),
(null, 2, 'samarah', 'técnico', 'felipe@quatro.com', 'Quatro123!');

INSERT INTO linha VALUES 
(null, 'Azul', 1, 1),
(null, 'Verde', 2, 1),
(null, 'Vermelha', 3, 1),
(null, 'Amarela', 4, 2),
(null, 'Lilás', 5, 3),
(null, 'Prata', 15, 1);

-- LINHA 1 AZUL (id = 1)
INSERT INTO estacao (nome, fkLinha) VALUES
('Tucuruvi', 1),
('Parada Inglesa', 1),
('Jardim São Paulo', 1),
('Santana', 1),
('Carandiru', 1),
('Tietê', 1),
('Armênia', 1),
('Tiradentes', 1),
('Luz', 1),
('São Bento', 1),
('Sé', 1),
('Liberdade', 1),
('São Joaquim', 1),
('Vergueiro', 1),
('Paraíso', 1),
('Ana Rosa', 1),
('Vila Mariana', 1),
('Santa Cruz', 1),
('Praça da Árvore', 1),
('Saúde', 1),
('São Judas', 1),
('Conceição', 1),
('Jabaquara', 1),

-- Linha 2 VERDE (id = 2)
('Vila Madalena', 2),
('Sumaré', 2),
('Clínicas', 2),
('Consolação', 2),
('Trianon Masp', 2),
('Brigadeiro', 2),
('Chácara Klabin', 2),
('Santos Imigrantes', 2),
('Alto do Ipiranga', 2),
('Sacomã', 2),
('Tamanduateí', 2),
('Vila Prudente', 2),

-- Linha 3 VERMELHA (id = 3)
('Corinthians-Itaquera', 3),
('Tatuapé', 3),
('Carrão', 3),
('Itaquera', 3),
('Penha', 3),
('Guilhermina Esperança', 3),
('Artur Alvim', 3),
('Barra Funda', 3),
('Belém', 3),
('Bresser Mooca', 3),
('Patriarca', 3),
('Vila Matilde', 3),
('Santa Cecília', 3),
('Mal. Deodoro', 3),
('Anhagabaú', 3),

-- linha 4 AMARELA (id = 4)
('Higienópolis - Mackenzie', 4),
('Paulista', 4),
('Oscar Freire', 4),
('Fradique Coutinho', 4),
('Faria Lima', 4),
('Pinheiros', 4),
('Butantã', 4),
('Morumbi', 4),
('Vila Sônia', 4),

-- linha 5 LILÁS (id = 5)
('Capão Redondo', 5),
('Campo Limpo', 5),
('Vila das Belezas', 5),
('Giovani Gronchi', 5),	
('Santo Amaro', 5),
('Largo Treze', 5),
('Adolfo Pinheiro', 5),
('Alto da Boa Vista', 5),
('Borba Gato', 5),
('Brooklin', 5),
('Campo Belo', 5),
('Eucaliptos', 5),
('Moema', 5),
('AACD-Servidor', 5),
('Hospital São Paulo', 5),

--  linha 15 PRATA (id = 6)
('Oratório', 6),
('São Lucas', 6),
('Camilo Haddad', 6),
('Vila Tolstói', 6),
('Vila União', 6),
('Jd. Planalto', 6),
('Sapopemba', 6),
('Fazenda da Juta', 6),
('São Mateus', 6),
('Jardim Colonial', 6);

INSERT INTO Computador (fkEstacao)
VALUES
    (1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
    (11), (12), (13), (14), (15), (16), (17), (18), (19), (20),
    (21), (22), (23), (24), (25), (26), (27), (28), (29), (30),
    (31), (32), (33), (34), (35), (36), (37), (38), (39), (40),
    (41), (42), (43), (44), (45), (46), (47), (48), (49), (50),
    (51), (52), (53), (54), (55), (56), (57), (58), (59), (60),
    (61), (62), (63), (64), (65), (66), (67), (68), (69), (70),
    (71), (72), (73), (74), (75), (76), (77), (78), (79), (80),
    (81), (82), (83), (84);

INSERT INTO Componente (sistemaOperacional, nomeCpu, ramTotal, volumeTotal, tempoAtividade, fkComputador)
VALUES
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '120 horas', 1),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '100 horas', 2),
    ('Windows 10', 'CPU3', '8GB', '512GB', '90 horas', 3),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '80 horas', 4),
    ('Windows 10', 'CPU5', '8GB', '512GB', '70 horas', 5),
    ('Windows 10', 'CPU6', '16GB', '1TB', '60 horas', 6),
    ('Windows 10', 'CPU7', '8GB', '512GB', '50 horas', 7),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '40 horas', 8),
    ('Windows 10', 'CPU9', '8GB', '512GB', '30 horas', 9),
    ('Windows 10', 'CPU10', '16GB', '1TB', '20 horas', 10),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '120 horas', 11),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '100 horas', 12),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '90 horas', 13),
    ('Windows 10', 'CPU14', '16GB', '1TB', '80 horas', 14),
    ('Windows 10', 'CPU15', '8GB', '512GB', '70 horas', 15),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '60 horas', 16),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '50 horas', 17),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '40 horas', 18),
    ('Windows 10', 'CPU19', '8GB', '512GB', '30 horas', 19),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '20 horas', 20),
    ('Windows 10', 'CPU21', '8GB', '512GB', '120 horas', 21),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '100 horas', 22),
    ('Windows 10', 'CPU23', '8GB', '512GB', '90 horas', 23),
    ('Windows 10', 'CPU24', '16GB', '1TB', '80 horas', 24),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '70 horas', 25),
    ('Windows 10', 'CPU26', '16GB', '1TB', '60 horas', 26),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '50 horas', 27),
    ('Windows 10', 'CPU28', '16GB', '1TB', '40 horas', 28),
    ('Windows 10', 'CPU29', '8GB', '512GB', '30 horas', 29),
    ('Windows 10', 'CPU30', '16GB', '1TB', '20 horas', 30),
    ('Windows 10', 'CPU31', '8GB', '512GB', '120 horas', 31),
    ('Windows 10', 'CPU32', '16GB', '1TB', '100 horas', 32),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '90 horas', 33),
    ('Windows 10', 'CPU34', '16GB', '1TB', '80 horas', 34),
    ('Windows 10', 'CPU35', '8GB', '512GB', '70 horas', 35),
    ('Windows 10', 'CPU36', '16GB', '1TB', '60 horas', 36),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '50 horas', 37),
    ('Windows 10', 'CPU38', '16GB', '1TB', '40 horas', 38),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '30 horas', 39),
    ('Windows 10', 'CPU40', '16GB', '1TB', '20 horas', 40),
    ('Windows 10', 'CPU41', '8GB', '512GB', '120 horas', 41),
    ('Windows 10', 'CPU42', '16GB', '1TB', '100 horas', 42),
    ('Windows 10', 'CPU43', '8GB', '512GB', '90 horas', 43),
    ('Windows 10', 'CPU44', '16GB', '1TB', '80 horas', 44),
    ('Windows 10', 'CPU45', '8GB', '512GB', '70 horas', 45),
    ('Windows 10', 'CPU46', '16GB', '1TB', '60 horas', 46),
    ('Windows 10', 'CPU47', '8GB', '512GB', '50 horas', 47),
    ('Windows 10', 'CPU48', '16GB', '1TB', '40 horas', 48),
    ('Windows 10', 'CPU49', '8GB', '512GB', '30 horas', 49),
    ('Windows 10', 'CPU50', '16GB', '1TB', '20 horas', 50),
    ('Windows 10', 'CPU51', '8GB', '512GB', '120 horas', 51),
    ('Windows 10', 'CPU52', '16GB', '1TB', '100 horas', 52),
    ('Windows 10', 'CPU53', '8GB', '512GB', '90 horas', 53),
    ('Windows 10', 'CPU54', '16GB', '1TB', '80 horas', 54),
    ('Windows 10', 'CPU55', '8GB', '512GB', '70 horas', 55),
    ('Windows 10', 'CPU56', '16GB', '1TB', '60 horas', 56),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '50 horas', 57),
    ('Windows 10', 'CPU58', '16GB', '1TB', '40 horas', 58),
    ('Windows 10', 'CPU59', '8GB', '512GB', '30 horas', 59),
    ('Windows 10', 'CPU60', '16GB', '1TB', '20 horas', 60),
    ('Windows 10', 'CPU61', '8GB', '512GB', '120 horas', 61),
    ('Windows 10', 'CPU62', '16GB', '1TB', '100 horas', 62),
    ('Windows 10', 'CPU63', '8GB', '512GB', '90 horas', 63),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '80 horas', 64),
    ('Windows 10', 'CPU65', '8GB', '512GB', '70 horas', 65),
    ('Windows 10', 'CPU66', '16GB', '1TB', '60 horas', 66),
    ('Windows 10', 'CPU67', '8GB', '512GB', '50 horas', 67),
    ('Windows 10', 'CPU68', '16GB', '1TB', '40 horas', 68),
    ('Windows 10', 'CPU69', '8GB', '512GB', '30 horas', 69),
    ('Windows 10', 'CPU70', '16GB', '1TB', '20 horas', 70),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '120 horas', 71),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '100 horas', 72),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '90 horas', 73),
    ('Windows 10', 'CPU74', '16GB', '1TB', '80 horas', 74),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '70 horas', 75),
    ('Windows 10', 'CPU76', '16GB', '1TB', '60 horas', 76),
    ('Windows 10', 'CPU77', '8GB', '512GB', '50 horas', 77),
    ('Windows 10', 'CPU78', '16GB', '1TB', '40 horas', 78),
    ('Windows 10', 'CPU79', '8GB', '512GB', '30 horas', 79),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '16GB', '1TB', '20 horas', 80),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '120 horas', 81),
    ('Windows 10', 'CPU82', '16GB', '1TB', '100 horas', 82),
    ('Windows 10', '12th Gen Intel(R) Core(TM) i5-1235U', '8GB', '512GB', '90 horas', 83),
    ('Windows 10', 'CPU84', '16GB', '1TB', '80 horas', 84);



-- SELECTS --
SELECT idEstacao, estacao.nome, linha.nome, nomeFantasia
	FROM estacao 
		JOIN linha
			ON fkLinha = idLinha
		JOIN empresa
			ON fkEmpresa = idEmpresa;

select * from funcionario;

select idComputador, estacao.nome from  computador
	JOIN estacao
		ON fkEstacao = idEstacao
	JOIN linha
		ON fkLinha = idLinha
	JOIN empresa
		ON fkEmpresa = idEmpresa
	WHERE idEmpresa = 2;
    
    
    select * from estacao;