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

insert into Endereco values 
(null,'123456789','59123-000','132','God valle','Sky pie','12'),
(null,'987654321','77777-123','123','São Miguel','São paulo','11');
select * from Endereco;

create table Representante(
    idRepresentante int primary key auto_increment,
    nome varchar(45),
    telefone varchar(15),
    email varchar(45),
    cpf char(14),
    status tinyint(1) default 1
);

insert into Representante values
(null,'Jorge','11 1234-5678','jorjin@maingragas',55566677788,1),
(null,'Jorgina','11 1234-5678','jorjinis@mainbriar',56675586778,1); 
select * from Representante;

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

insert into Empresa values
(null,12345678901234,'The Roks','D Xeback',1,1,1);
select * from Empresa;

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
insert into LanHouse values
(null,'BigMon',12345678901234,1,1564,1,1,1),
(null,'Kaido',16328903471254,1,1984,1,1,1);
select * from LanHouse;

create table TipoUsuario (
    idTipoUsuario int primary key auto_increment,
    descTipoUsuario varchar(45)
);

insert into  tipoUsuario
    values (null, 'Empresa'),
            (null, 'Lanhouse');

select * from TipoUsuario;

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

insert into Usuario values
(null,'Figarland','figarland@gmail.com','f1234',1,1,1,2);
select * from Usuario;

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

insert into TipoComponente values(null,'RAM'),(null,'Processador'),(null,'Disco');

create table EspecificacoesComponente (
    idEspecificacoesComponente int primary key auto_increment,
    especificacao varchar(255),
    valor varchar(45)
);

create table MetricaComponente (
    idMetricaComponente int primary key auto_increment,
    minMetrica float,
    maxMetrica float,
    unidadeMedida varchar(7)
);

insert into MetricaComponente values(null,3,16,'%'),(null,null,90,'%'),(null,null,80,'%');

create table Componente (
    idComponente int primary key auto_increment,
    fkMaquina int,
    fkTipoComponente int,
    fkMetricaComponente int,
    fkEspecificacoesComponente int,
    constraint fkComponenteMaquina foreign key (fkMaquina) references Maquina(idMaquina),
    constraint fkComponenteTipoComponente foreign key (fkTipoComponente) references TipoComponente(idTipoComponente),
    constraint fkComponenteMetricaComponente foreign key (fkMetricaComponente) references MetricaComponente(idMetricaComponente),
    constraint fkComponenteEspecificacoesComponente foreign key (fkEspecificacoesComponente) references EspecificacoesComponente(idEspecificacoesComponente)
);

create table Log (
    idLog int primary key auto_increment,
    textLog varchar(45),
    valor float,
    dataLog datetime,
    statusLog tinyint,
    fkComponente int,
    constraint fkLogComponente foreign key (fkComponente) references Componente(idComponente)
);

insert into LanHouse (unidade, cnpj, codigoAcesso, fkEndereco, fkEmpresa, fkRepresentante) values ('LanHousers', '49.150.759/0001-40', 'LanHousers0152', 2, 1, 2);

insert into Usuario (nome, senha, fkEmpresa, fkLanhouse) VALUES ('KauanOliveira', 'KauanOliveira0@', 1, 2);

select * from usuario;
select * from Log;