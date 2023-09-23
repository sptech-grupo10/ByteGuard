create table Usuario(
    idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(20),
    status tinyint(1)
);

insert into Usuario values (null, 'Kauan', 'kauan@gmail.com', 'kauan123', 1);

select * from Usuario;