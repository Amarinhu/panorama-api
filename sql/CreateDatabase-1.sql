CREATE DATABASE panorama;

USE panorama;

DROP TABLE IF EXISTS tarefa_atributo;
DROP TABLE IF EXISTS tarefa;
DROP TABLE IF EXISTS atributo;
DROP TABLE IF EXISTS grupo;
DROP TABLE IF EXISTS perfil;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id INT IDENTITY(1,1),
    nome VARCHAR(100),
    senha VARCHAR(60),
    criado_em DATETIME,
    atualizado_em DATETIME,
    ativo BIT,
    PRIMARY KEY(id)
);

CREATE TABLE perfil (
    id INT IDENTITY(1,1),
    id_usuario INT,
    nome VARCHAR(100),
    foto VARCHAR(200),
    email VARCHAR(100),
    descricao VARCHAR(300),
    criado_em DATETIME,
    atualizado_em DATETIME,
    ativo BIT,
    PRIMARY KEY(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE grupo (
    id INT IDENTITY(1,1),
    id_perfil INT,
    nome VARCHAR(100),
    descricao VARCHAR(300),
    criado_em DATETIME,
    atualizado_em DATETIME,
    ativo BIT,
    PRIMARY KEY(id),
    FOREIGN KEY (id_perfil) REFERENCES perfil(id)
);

CREATE TABLE tarefa (
    id INT IDENTITY(1,1),
    id_grupo INT,
    nome VARCHAR(100),
    inicio DATETIME,
    fim DATETIME,
    descricao VARCHAR(300),
    dificuldade TINYINT,
    concluido BIT,
    criado_em DATETIME,
    atualizado_em DATETIME,
    ativo BIT,
    PRIMARY KEY(id),
    FOREIGN KEY (id_grupo) REFERENCES grupo(id)
);

CREATE TABLE atributo (
    id INT IDENTITY(1,1),
    nome VARCHAR(100),
    icone VARCHAR(100),
    xp INT,
    criado_em DATETIME,
    atualizado_em DATETIME,
    ativo BIT,
    PRIMARY KEY(id)
);

CREATE TABLE tarefa_atributo (
    id INT IDENTITY(1,1),
    id_tarefa INT,
    id_atributo INT,
    criado_em DATETIME,
    atualizado_em DATETIME,
    ativo BIT,
    PRIMARY KEY(id),
    FOREIGN KEY (id_tarefa) REFERENCES tarefa(id),
    FOREIGN KEY (id_atributo) REFERENCES atributo(id)
);
