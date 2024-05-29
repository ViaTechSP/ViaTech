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
nomeFantasia VARCHAR(245),
CNPJ CHAR(14) NOT NULL UNIQUE
);

CREATE TABLE funcionario(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
urlFoto VARCHAR(300) NULL,
nome VARCHAR(100) NOT NULL,
cpf CHAR(14) NOT NULL,
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
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
tipo VARCHAR(100),
componente VARCHAR(30),
valor DOUBLE,
fkRegistro INT,
	FOREIGN KEY (fkRegistro) REFERENCES registro (idRegistro)
);


-- INSERTS -- 
select * FROM Estacao;

INSERT INTO EMPRESA (razaoSocial, nomeFantasia, CNPJ) VALUES 
('Via Tecnológica de São Paulo', 'ViaTechSP', '45904145652564');

INSERT INTO Funcionario (nome, cpf, email, senha, cargo, fkEmpresa) VALUES
('Matheus Rabello', '625.451.641-47', 'matheus@viatech.com', 'Senha!', 'Gerente', 1);

INSERT INTO Linha (nome, numero, fkEmpresa) VALUES
('Amarela', 4, 1);

INSERT INTO Estacao (nome, fkLinha) VALUES
('Paulista', 1),
('República', 1);

INSERT INTO metrica (minCuidadoDisco, maxCuidadoDisco, minCUidadoCpu, maxCUidadoCpu, minCUidadoRam, maxCUidadoRam, minIdealTemp, maxIdealTemp) VALUES
(50, 90, 20, 80, 30, 70, 40, 80),
(60, 95, 25, 85, 35, 75, 45, 85),
(70, 85, 70, 85, 60, 80, 20, 58);

INSERT INTO maquina (dominio, ip, sistemaOperacional, fkEstacao, FkMetrica) VALUES
('paulista.com', '192.168.1.1', 'Windows', 1, 1),
('republica.com', '192.168.1.2', 'Linux', 2, 2);

INSERT INTO especificacaoMaquina (nomeCpu, frequenciaCpu, capacidadeTotalArmazenamento, ramTotal, fkMaquina) VALUES
('Intel Core i5', '3.6 GHz', 500, 8, 1),
('AMD Ryzen 7', '4.0 GHz', 1000, 16, 2);

INSERT INTO registro (cpuPorcentagemUso, cpuTemperatura, discoUtilizado, ramUtilizada, qtdDispositivos, fkEspecificacaoMaquina) VALUES
(60.0, 184.0, 180.0, 410.0, 6, 1),
(75.0, 68.0, 220.0, 18.0, 12, 2),
(85.0, 70.0, 230.0, 28.0, 14, 1),
(50.0, 58.0, 160.0, 7.0, 4, 2),
(65.0, 63.0, 190.0, 12.0, 8, 1);

insert historicoAlerta (tipo, componente, valor, fkRegistro) VALUES
('Problema', 'RAM', '100', 10),
('Cuidado', 'DISCO', '100', 10),
('Problema', 'RAM', '100', 10),
('Cuidado', 'CPU', '100', 10),
('Problema', 'Temperatura', '100', 10);
    

-- SELECTS -- 
SELECT h.IdhistoricoAlerta AS id, e.nome AS Estação, h.tipo AS Alerta, h.componente AS Componente, h.valor, h.dtHora AS Horário, h.fkRegistro FROM historicoAlerta AS H
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    JOIN Linha
    ON fkLinha = idLinha
    WHERE fkEmpresa = 1;
    
    select e.idEstacao, e.nome from Estacao AS e
    JOIN Linha ON fkLinha = idLinha
    JOIN Empresa on FkEmpresa = idEmpresa
    WHERE fkEmpresa = 1;
    
SELECT COUNT(h.tipo) AS total, h.tipo FROM historicoAlerta AS H
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    WHERE fkEstacao = 2
    AND
	h.dtHora >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
	AND h.dtHora <= NOW()
    GROUP BY tipo;
    
select * from historicoAlerta 
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    WHERE fkEstacao = 2;
    
SELECT COUNT(h.idHistoricoAlerta) AS total, h.componente FROM historicoAlerta AS H
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    WHERE fkEstacao = 2 AND
	h.dtHora >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
	AND h.dtHora <= NOW()
    GROUP BY componente
    ORDER BY total DESC
    LIMIT 1;
    
SELECT 
    l.nome AS linha,
    e.nome AS estacao
FROM 
    linha l
JOIN 
    estacao e ON l.idLinha = e.fkLinha
ORDER BY 
    l.nome, e.idEstacao;
    
    
 SELECT * from Registro JOIN especificacaoMaquina 
        ON fkespecificacaoMaquina = idespecificacaoMaquina 
        JOIN maquina
        ON fkMaquina = idMaquina
        WHERE fkEstacao = 1;
        
        SELECT * from Registro JOIN especificacaoMaquina 
        ON fkespecificacaoMaquina = idespecificacaoMaquina 
        JOIN maquina
        ON fkMaquina = idMaquina 
        WHERE fkEstacao = 2
        ORDER BY dtHora DESC;
        
        
	SELECT e.nome, h.* FROM historicoAlerta AS H
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    JOIN Linha
    ON fkLinha = idLinha
    WHERE fkEmpresa = 1
    ORDER BY idHistoricoAlerta DESC
    LIMIT 8;
/*
DELIMITER //

CREATE TRIGGER registro_insert_trigger AFTER INSERT ON registro
FOR EACH ROW
BEGIN
    DECLARE alerta_tipo VARCHAR(100);
    DECLARE alerta_componente VARCHAR(30);
    DECLARE alerta_valor DOUBLE;

    -- Verifica se o novo registro excede as métricas
    SELECT 
        CASE
            WHEN NEW.cpuPorcentagemUso > mt.maxCUidadoCpu THEN 'CPU'
            WHEN NEW.cpuTemperatura > mt.maxIdealTemp THEN 'Temperatura'
            WHEN NEW.discoUtilizado > mt.maxCuidadoDisco THEN 'Disco'
            WHEN NEW.ramUtilizada > mt.maxCUidadoRam THEN 'RAM'
            ELSE NULL
        END AS tipo,
        CASE
            WHEN NEW.cpuPorcentagemUso > mt.maxCUidadoCpu THEN NEW.cpuPorcentagemUso
            WHEN NEW.cpuTemperatura > mt.maxIdealTemp THEN NEW.cpuTemperatura
            WHEN NEW.discoUtilizado > mt.maxCuidadoDisco THEN NEW.discoUtilizado
            WHEN NEW.ramUtilizada > mt.maxCUidadoRam THEN NEW.ramUtilizada
            ELSE NULL
        END AS valor
    INTO
        alerta_tipo, alerta_valor
    FROM
        maquina m
    JOIN
        especificacaoMaquina em ON m.idMaquina = em.fkMaquina
    JOIN
        metrica mt ON m.FkMetrica = mt.idMetrica
    WHERE
        em.idEspecificacaoMaquina = NEW.fkEspecificacaoMaquina;

    -- Insere um novo alerta se o registro exceder as métricas
    IF alerta_tipo IS NOT NULL THEN
        INSERT INTO historicoAlerta (dtHora, tipo, componente, valor, fkRegistro)
        VALUES (NOW(), 'Alerta', alerta_tipo, alerta_valor, NEW.idRegistro);
    END IF;
END//

DELIMITER ;



INSERT INTO historicoAlerta (dtHora, tipo, componente, valor, fkRegistro)
SELECT 
    CURRENT_TIMESTAMP AS dtHora,
    'Alerta' AS tipo,
    CASE
        WHEN r.cpuPorcentagemUso > mt.maxCUidadoCpu THEN 'CPU'
        WHEN r.cpuTemperatura > mt.maxIdealTemp THEN 'Temperatura'
        WHEN r.discoUtilizado > mt.maxCuidadoDisco THEN 'Disco'
        WHEN r.ramUtilizada > mt.maxCUidadoRam THEN 'RAM'
        ELSE NULL
    END AS componente,
    CASE
        WHEN r.cpuPorcentagemUso > mt.maxCUidadoCpu THEN r.cpuPorcentagemUso
        WHEN r.cpuTemperatura > mt.maxIdealTemp THEN r.cpuTemperatura
        WHEN r.discoUtilizado > mt.maxCuidadoDisco THEN r.discoUtilizado
        WHEN r.ramUtilizada > mt.maxCUidadoRam THEN r.ramUtilizada
        ELSE NULL
    END AS valor,
    r.idRegistro AS fkRegistro
FROM registro r
JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
JOIN maquina m ON em.fkMaquina = m.idMaquina
JOIN metrica mt ON m.FkMetrica = mt.idMetrica
WHERE 
    r.cpuPorcentagemUso > mt.maxCUidadoCpu
    OR r.cpuTemperatura > mt.maxIdealTemp
    OR r.discoUtilizado > mt.maxCuidadoDisco
    OR r.ramUtilizada > mt.maxCUidadoRam;