USE master;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = N'ByteGuard')
BEGIN
    ALTER DATABASE ByteGuard SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE ByteGuard;
END

CREATE DATABASE ByteGuard;
GO

USE ByteGuard;
GO

CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY IDENTITY(1,1),
    cep CHAR(9),
    logradouro VARCHAR(50),
    numero VARCHAR(5),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    uf CHAR(2)
);
GO

CREATE TABLE Representante (
    idRepresentante INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    telefone VARCHAR(15),
    email VARCHAR(45),
    cpf CHAR(14),
    status TINYINT DEFAULT 1
);
GO

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY IDENTITY(1,1),
    cnpj CHAR(14),
    nomeFantasia VARCHAR(45),
    razaoSocial VARCHAR(45),
    status TINYINT DEFAULT 1,
    fkRepresentante INT,
    fkEndereco INT,
    CONSTRAINT fkEmpresaEndereco FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
    CONSTRAINT fkEmpresaRepresentante FOREIGN KEY (fkRepresentante) REFERENCES Representante(idRepresentante)
);
GO

CREATE TABLE LanHouse (
    idLanHouse INT PRIMARY KEY IDENTITY(1,1),
    unidade VARCHAR(45),
    cnpj CHAR(14),
    statusLanhouse TINYINT DEFAULT 1,
    codigoAcesso VARCHAR(40),
    fkEndereco INT,
    fkEmpresa INT,
    fkRepresentante INT,
    CONSTRAINT fkLanhouseEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    CONSTRAINT fkLanhouseEndereco FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
    CONSTRAINT fkLanhouseRepresentante FOREIGN KEY (fkRepresentante) REFERENCES Representante(idRepresentante)
);
GO

CREATE TABLE TipoUsuario (
    idTipoUsuario INT PRIMARY KEY IDENTITY(1,1),
    descTipoUsuario VARCHAR(45)
);
GO

INSERT INTO TipoUsuario (descTipoUsuario)
VALUES ('Empresa'), ('Lanhouse');
GO

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(20),
    statusUsuario TINYINT DEFAULT 1,
    fkEmpresa INT,
    fkLanhouse INT,
    fkTipoUsuario INT,
    CONSTRAINT fkUsuarioLanhouse FOREIGN KEY (fkLanhouse) REFERENCES LanHouse(idLanHouse),
    CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    CONSTRAINT fkTipoUsuarioUsuario FOREIGN KEY (fkTipoUsuario) REFERENCES TipoUsuario(idTipoUsuario)
);
GO

CREATE TABLE Maquina (
    idMaquina INT PRIMARY KEY IDENTITY(1,1),
    nomeMaquina VARCHAR(45),
    fkLanhouse INT,
    CONSTRAINT fkMaquinaLanhouse FOREIGN KEY (fkLanhouse) REFERENCES LanHouse(idLanHouse)
);
GO

CREATE TABLE TipoComponente (
    idTipoComponente INT PRIMARY KEY IDENTITY(1,1),
    tipoComponente VARCHAR(45)
);
GO

INSERT INTO TipoComponente (tipoComponente)
VALUES ('RAM'), ('Processador'), ('Disco');
GO

CREATE TABLE MetricaComponente (
    idMetricaComponente INT PRIMARY KEY IDENTITY(1,1),
    minMetrica INT,
    maxMetrica INT,
    unidadeMedida VARCHAR(7)
);
GO

CREATE TABLE Componente (
    idComponente INT PRIMARY KEY IDENTITY(1,1),
    valorTotal FLOAT,
    fkMaquina INT,
    fkTipoComponente INT,
    fkMetricaComponente INT,
    CONSTRAINT fkComponenteMaquina FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
    CONSTRAINT fkComponenteTipoComponente FOREIGN KEY (fkTipoComponente) REFERENCES TipoComponente(idTipoComponente),
    CONSTRAINT fkComponenteMetricaComponente FOREIGN KEY (fkMetricaComponente) REFERENCES MetricaComponente(idMetricaComponente)
);
GO

CREATE TABLE EspecificacaoComponente (
    idEspecificacaoComponente INT PRIMARY KEY IDENTITY(1,1),
    especificacao VARCHAR(100),
    valorEspecificacao VARCHAR(100),
    fkComponente INT,
    CONSTRAINT fkEspecificacaoComponenteComp FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);
GO

CREATE TABLE Log (
    idLog INT PRIMARY KEY IDENTITY(1,1),
    textLog VARCHAR(45),
    valor FLOAT,
    dataLog DATETIME,
    statusLog TINYINT,
    fkComponente INT,
    CONSTRAINT fkLogComponente FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);
GO

INSERT INTO Endereco (cidade) VALUES ('São Paulo');
GO

INSERT INTO Empresa (nomeFantasia, razaoSocial, fkEndereco) VALUES ('Empresa', 'Empresa', 1);
GO

INSERT INTO LanHouse (unidade, cnpj, codigoAcesso, fkEndereco, fkEmpresa) VALUES ('LanHousers', '49150759000140', 'LanHousers0152', 1, 1);
GO

INSERT INTO Usuario (nome, senha, fkEmpresa, fkLanhouse) VALUES ('Usuario', 'Usuario0@', 1, 1);
GO
