drop database ByteGuard;

create database ByteGuard;

use ByteGuard;

create table Endereco(
    idEndereco int primary key auto_increment,
    cep char(9),
    logradouro varchar(50),
    numero varchar(5),
    bairro varchar(50),
    cidade varchar(50),
    uf char(2)
);

create table Representante(
    idRepresentante int primary key auto_increment,
    nome varchar(45),
    telefone varchar(15),
    email varchar(45),
    cpf char(14),
    status tinyint(1) default 1
);

create table Empresa(
    idEmpresa int primary key auto_increment,
    cnpj char(14),
    nomeFantasia varchar(45),
    razaoSocial varchar(45),
    status tinyint(1) default 1,
    fkRepresentante int,
    fkEndereco int,
    constraint fkEmpresaEndereco foreign key (fkEndereco) references Endereco(idEndereco),
    constraint fkEmpresaRepresentante foreign key (fkRepresentante) references Representante(idRepresentante)
);

create table LanHouse(
    idLanHouse int primary key auto_increment,
    unidade varchar(45),
    cnpj char(14),
    statusLanhouse tinyint(1) default 1,
    codigoAcesso varchar(40),
    fkEndereco int,
    fkEmpresa int,
    fkRepresentante int,
    constraint fkLanhouseEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa),
    constraint fkLanhouseEndereco foreign key (fkEndereco) references Endereco(idEndereco),
    constraint fkLanhouseRepresentante foreign key (fkRepresentante) references Representante(idRepresentante)
);

create table TipoUsuario (
    idTipoUsuario int primary key auto_increment,
    descTipoUsuario varchar(45)
);

insert into  tipoUsuario
    values (null, 'Empresa'),
            (null, 'Lanhouse');

create table Usuario(
    idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(20),
    statusUsuario tinyint(1) default 1,
    fkEmpresa int,
    fkLanhouse int,
    fkTipoUsuario int,
    constraint fkUsuarioLanhouse foreign key (fkLanhouse) references Lanhouse(idLanHouse),
    constraint fkEmpresaUsuario foreign key (fkEmpresa) references Empresa(idEmpresa),
    constraint fkTipoUsuarioUsuario foreign key (fkTipoUsuario) references TipoUsuario(idTipoUsuario)
);

create table Maquina (
    idMaquina int primary key auto_increment,
    nomeMaquina varchar(45),
    fkLanhouse int,
    constraint fkMaquinaLanhouse foreign key (fkLanhouse) references LanHouse(idLanHouse)
);

create table TipoComponente (
    idTipoComponente int primary key auto_increment,
    tipoComponente varchar(45)
);

insert into TipoComponente(tipoComponente) values ('RAM'), ('Processador'), ('Disco');

create table MetricaComponente (
    idMetricaComponente int primary key auto_increment,
    minMetrica int,
    maxMetrica int,
    unidadeMedida varchar(7)
);

create table Componente (
    idComponente int primary key auto_increment,
    valorTotal double,
    fkMaquina int,
    fkTipoComponente int,
    fkMetricaComponente int,
    constraint fkComponenteMaquina foreign key (fkMaquina) references Maquina(idMaquina),
    constraint fkComponenteTipoComponente foreign key (fkTipoComponente) references TipoComponente(idTipoComponente),
    constraint fkComponenteMetricaComponente foreign key (fkMetricaComponente) references MetricaComponente(idMetricaComponente)
);

create table EspecificacaoComponente (
    idEspecificacaoComponente int primary key auto_increment,
    especificacao varchar(100),
    valorEspecificacao varchar(100),
    fkComponente int,
    constraint fkEspecificacaoComponenteComp foreign key (fkComponente) references Componente(idComponente)
);

create table Log (
    idLog int primary key auto_increment,
    textLog varchar(45),
    valor double,
    dataLog datetime,
    statusLog tinyint,
    fkComponente int,
    constraint fkLogComponente foreign key (fkComponente) references Componente(idComponente)
);

desc Empresa;
insert into Endereco(cidade) values('São Paulo');
insert into Empresa(nomeFantasia, razaoSocial, fkEndereco) values('Empresa', 'Empresa', 1);
insert into LanHouse (unidade, cnpj, codigoAcesso, fkEndereco, fkEmpresa) values ('LanHousers', '49150759000140', 'LanHousers0152', 1, 1);
insert into Usuario (nome, senha, fkEmpresa, fkLanhouse) VALUES ('Usuario', 'Usuario0@', 1, 1);

