use panorama;

INSERT INTO USUARIO (NOME, SENHA) VALUES
('Usuario-Base', '$2a$12$Q1ZZiL8AyENfOMgpP0XhZ.xw7GkK/kqg/xGFdLrF1FsRURojcjYOO');

INSERT INTO PERFIL (IdUsuario, Nome, Foto, Email, Descricao) VALUES
(1, 'Perfil-1', null, 'panorama@gmail.com', '')

INSERT INTO GRUPO (IdPerfil, Nome, Descricao) VALUES
(1, 'Rotina', 'Coisas relacioandas a rotina'), (1, 'Missões', 'Coisas relacionadas a missões')

INSERT INTO 
TAREFA (IdGrupo, Nome, InicioTarefa, FimTarefa, Descricao, Dificuldade, Concluido) VALUES
(1, 'Escovar os Dentes', '2025-07-13T13:30:00', '', 'Escovar os dentes', 4, 0), 
(1, 'Dever de Casa', '2025-07-12T12:05:00', '', 'Fazer o Dever de Casa', 3, 0), 
(2, 'Tomar Remédio', '2025-07-11T18:03:00', '', 'Tomar remédio X', 2, 0), 
(2, 'Ensaiar Canto', '2025-07-10T07:02:00', '', 'Ensaiar canto para casamento', 5, 0)

INSERT INTO ATRIBUTO (Nome, Icone, Xp) VALUES
('Dia a Dia', '', 0), ('Vida', '', 0)

INSERT INTO TarefaAtributo (IdTarefa, IdAtributo) VALUES
(1, 1), (2, 1), (3, 2), (4, 2)