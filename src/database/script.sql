
-- criando a estrutura do banco

drop database if exists clinica_saude_vida;
create database if not exists clinica_saude_vida;

use clinica_saude_vida;

create table if not exists tb_tipos_usuario(
id_tipo_usuario integer primary key auto_increment not null unique,
nome varchar(45) not null unique
);

create table if not exists tb_atuacoes(
id_atuacao integer primary key auto_increment not null unique,
nome varchar(45) not null unique
);

create table if not exists tb_usuarios(
id_usuario integer primary key auto_increment not null unique,
nome varchar(45) not null ,
email varchar(100) not null unique,
senha varchar(60) not null,
id_tipo_usuario integer,
foreign key (id_tipo_usuario) references tb_tipos_usuario(id_tipo_usuario),
id_atuacao integer,
foreign key (id_atuacao) references tb_atuacoes(id_atuacao)
);

create table if not exists tb_andares(
id_andar integer primary key auto_increment not null unique,
nome varchar(45) not null unique
);

create table if not exists tb_salas(
id_sala integer primary key auto_increment not null unique,
nome varchar(45) not null unique,
id_andar integer,
foreign key (id_andar) references tb_andares(id_andar)
);


create table if not exists tb_atendimentos(
id_atendimento integer primary key auto_increment not null unique,
nome varchar(45) not null,
data_ativo date not null,
max_pacientes integer not null,
id_usuario integer,
foreign key (id_usuario) references tb_usuarios(id_usuario),
id_sala integer,
foreign key (id_sala) references tb_salas(id_sala)
);

create table if not exists tb_consultas(
id_consulta integer primary key auto_increment not null unique,
slot integer not null,
id_atendimento integer,
foreign key (id_atendimento) references tb_atendimentos(id_atendimento)
);

create table if not exists tb_convenios(
id_convenio integer primary key auto_increment not null unique,
nome varchar(45) not null unique
);


create table if not exists tb_pacientes(
id_paciente integer primary key auto_increment not null unique,
nome varchar(45) not null,
email varchar(100) not null unique,
data_nascimento date not null,
id_consulta integer,
foreign key (id_consulta) references tb_consultas(id_consulta),
id_convenio integer,
foreign key (id_convenio) references tb_convenios(id_convenio)

);

-- ciarndo a seed do banco


insert into tb_tipos_usuario(nome) values 
('recepcionista'),
('medico'),
('Admin');

insert into tb_atuacoes(nome) values 
('cardiologista'),
('otorrino'),
('podologia'),
('neurologista'),
('pescoço cabeça');

insert into tb_usuarios(nome,email,senha,id_atuacao,id_tipo_usuario) values 
('a','a@gmail.com','$2b$10$rXRjXif6HGL5kcgTLr/I6ewANFl2.3bWSqvlIsX0r5NVi2tIGaHKS',1,1),
('b','b@gmail.com','$2b$10$rXRjXif6HGL5kcgTLr/I6ewANFl2.3bWSqvlIsX0r5NVi2tIGaHKS',2,2),
('c','c@gmail.com','$2b$10$rXRjXif6HGL5kcgTLr/I6ewANFl2.3bWSqvlIsX0r5NVi2tIGaHKS',3,3),
('d','d@gmail.com','$2b$10$rXRjXif6HGL5kcgTLr/I6ewANFl2.3bWSqvlIsX0r5NVi2tIGaHKS',1,1),
('e','e@gmail.com','$2b$10$rXRjXif6HGL5kcgTLr/I6ewANFl2.3bWSqvlIsX0r5NVi2tIGaHKS',1,1);

insert into tb_andares(nome) values 
('0'),
('1'),
('2'),
('3'),
('4'),
('5');

insert into tb_salas(nome) values 
('a'),
('b'),
('c'),
('d'),
('e');

insert into tb_atendimentos(nome,data_ativo,max_pacientes,id_usuario,id_sala) values
('a','2026-09-10',0,3,1),
('b','2026-09-09',2,3,1),
('c','2026-09-08',10,3,1),
('d','2026-09-23',10,3,1),
('e','2026-09-24',10,3,1);


insert into tb_consultas(slot,id_atendimento) values 
(1,3),
(1,3),
(1,4),
(1,4),
(1,5);

insert into tb_convenios(nome) values 
('particular'),
('unimed'),
('bradesco'),
('aberta'),
('usisaude');



insert into tb_pacientes(nome,email,data_nascimento,id_consulta,id_convenio) values 
('a','a@gmail.com','1999-09-10',1,1),
('a','b@gmail.com','1956-10',1,2),
('a','c@gmail.com','1976-09-10',1,2),
('a','d@gmail.com','2005-09-10',1,5),
('a','e@gmail.com','1991-09-10',1,4);
