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
    telefone char(14),
    email varchar(45),
    fkEndereco int,
    status tinyint(1) default 1,
    constraint fkRepresentanteEndereco foreign key (fkEndereco) references Endereco(idEndereco)
);

create table Empresa(
    idEmpresa int primary key auto_increment,
    cnpj char(18),
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
    fkEndereco int,
    fkEmpresa int,
    fkRepresentante int,
    constraint fkLanhouseEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa),
    constraint fkLanhouseEndereco foreign key (fkEndereco) references Endereco(idEndereco),
    constraint fkLanhouseRepresentante foreign key (fkRepresentante) references Representante(idRepresentante)
);

create table Usuario(
    idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(20),
    fkLanhouse int,
    status tinyint(1) default 1,
    constraint fkUsuarioLanhouse foreign key (fkLanhouse) references Lanhouse(idLanHouse)
);