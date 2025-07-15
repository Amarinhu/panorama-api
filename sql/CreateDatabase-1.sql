USE panorama;

DROP TABLE IF EXISTS tarefa_atributo;
DROP TABLE IF EXISTS tarefa;
DROP TABLE IF EXISTS atributo;
DROP TABLE IF EXISTS grupo;
DROP TABLE IF EXISTS perfil;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id INT IDENTITY(1,1),
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    criado_em DATETIME NOT NULL,
    atualizado_em DATETIME NOT NULL,
    ativo BIT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE perfil (
    id INT IDENTITY(1,1),
    id_usuario INT,
    nome VARCHAR(100) NOT NULL,
    foto VARCHAR(200),
    email VARCHAR(100) NOT NULL,
    descricao VARCHAR(300),
    criado_em DATETIME NOT NULL,
    atualizado_em DATETIME NOT NULL,
    ativo BIT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE grupo (
    id INT IDENTITY(1,1),
    id_perfil INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(300),
    criado_em DATETIME NOT NULL,
    atualizado_em DATETIME NOT NULL,
    ativo BIT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_perfil) REFERENCES perfil(id)
);

CREATE TABLE tarefa (
    id INT IDENTITY(1,1),
    id_grupo INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    inicio DATETIME,
    fim DATETIME,
    descricao VARCHAR(300),
    dificuldade TINYINT NOT NULL,
    concluido BIT NOT NULL,
    criado_em DATETIME NOT NULL,
    atualizado_em DATETIME NOT NULL,
    ativo BIT NOT NULL,
	template BIT NOT NULL,
	intervalo INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_grupo) REFERENCES grupo(id)
);

CREATE TABLE atributo (
    id INT IDENTITY(1,1),
    nome VARCHAR(100) NOT NULL,
    icone VARCHAR(100),
    xp INT NOT NULL,
    criado_em DATETIME NOT NULL,
    atualizado_em DATETIME NOT NULL,
    ativo BIT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE tarefa_atributo (
    id INT IDENTITY(1,1),
    id_tarefa INT NOT NULL,
    id_atributo INT NOT NULL,
    criado_em DATETIME NOT NULL,
    atualizado_em DATETIME NOT NULL,
    ativo BIT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tarefa) REFERENCES tarefa(id),
    FOREIGN KEY (id_atributo) REFERENCES atributo(id)
);