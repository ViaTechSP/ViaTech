CREATE DATABASE ViaTech;
USE ViaTech;

CREATE TABLE empresa(
idEmpresa int primary key auto_increment,
nomeFantasia VARCHAR(30) NOT NULL,
cnpj CHAR(14) UNIQUE NOT NULL,
telefoneFixo CHAR(8) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(20) NOT NULL
);

CREATE TABLE funcionario(
idFuncionario int primary key auto_increment,
nome VARCHAR(45) NOT NULL,
cargo VARCHAR(45) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(20) NOT NULL,
fkEmpresa INT,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa)
	REFERENCES empresa (idEmpresa)
);

CREATE TABLE dadosCapturados(
idDadosCapturados int primary key auto_increment,
memoriaRam INT NOT NULL,
dadosCPU INT NOT NULL,
discoRigido INT NOT NULL,
usb INT NOT NULL,
temperaturaCPU INT NOT NULL
);

CREATE TABLE endereço(
idEndereco int primary key auto_increment,
linha varchar (30) NOT NULL,
estacao VARCHAR (45) NOT NULL,
CEP CHAR(8),
bairro VARCHAR(45) NOT NULL,
rua VARCHAR(45) NOT NULL,
numero VARCHAR(4) NOT NULL
);

