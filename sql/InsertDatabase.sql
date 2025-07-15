USE panorama;

-- Usuário
INSERT INTO usuario (nome, senha, criado_em, atualizado_em, ativo)
VALUES 
    ('Cipresto', 
    '$2a$12$Q1ZZiL8AyENfOMgpP0XhZ.xw7GkK/kqg/xGFdLrF1FsRURojcjYOO', 
    GETDATE(), 
    GETDATE(), 
    1);

DECLARE @usuario_id INT = SCOPE_IDENTITY();

-- Perfil
INSERT INTO perfil (id_usuario, nome, foto, email, descricao, criado_em, atualizado_em, ativo)
VALUES 
    (@usuario_id, 
    'Arthur', 
    NULL, 
    'arthur@example.com', 
    'Perfil principal de Arthur', 
    GETDATE(), 
    GETDATE(), 
    1);

DECLARE @perfil_id INT = SCOPE_IDENTITY();

-- Grupos
INSERT INTO grupo (id_perfil, nome, descricao, criado_em, atualizado_em, ativo)
VALUES 
    (@perfil_id, 'Weekly', 'Tarefas semanais', GETDATE(), GETDATE(), 1),
    (@perfil_id, 'Daily', 'Tarefas diárias', GETDATE(), GETDATE(), 1),
    (@perfil_id, 'Monthly', 'Tarefas mensais', GETDATE(), GETDATE(), 1);

DECLARE @grupo_weekly INT, @grupo_daily INT, @grupo_monthly INT;

SELECT TOP 1 @grupo_weekly = id FROM grupo WHERE nome = 'Weekly' AND id_perfil = @perfil_id;
SELECT TOP 1 @grupo_daily = id FROM grupo WHERE nome = 'Daily' AND id_perfil = @perfil_id;
SELECT TOP 1 @grupo_monthly = id FROM grupo WHERE nome = 'Monthly' AND id_perfil = @perfil_id;

-- Atributos D&D
INSERT INTO atributo (nome, icone, xp, criado_em, atualizado_em, ativo) VALUES
    ('Força', '.\img\icone-forca.png', 0, GETDATE(), GETDATE(), 1),
    ('Destreza', '.\img\icone-destreza.png', 0, GETDATE(), GETDATE(), 1),
    ('Constituição', '.\img\icone-constituicao.png', 0, GETDATE(), GETDATE(), 1),
    ('Inteligência', '.\img\icone-inteligencia.png', 0, GETDATE(), GETDATE(), 1),
    ('Sabedoria', '.\img\icone-sabedoria.png', 0, GETDATE(), GETDATE(), 1),
    ('Carisma', '.\img\icone-carisma.png', 0, GETDATE(), GETDATE(), 1);

DECLARE @forca INT, @destreza INT, @constituicao INT, @inteligencia INT, @sabedoria INT, @carisma INT;

SELECT @forca = id FROM atributo WHERE nome = 'Força';
SELECT @destreza = id FROM atributo WHERE nome = 'Destreza';
SELECT @constituicao = id FROM atributo WHERE nome = 'Constituição';
SELECT @inteligencia = id FROM atributo WHERE nome = 'Inteligência';
SELECT @sabedoria = id FROM atributo WHERE nome = 'Sabedoria';
SELECT @carisma = id FROM atributo WHERE nome = 'Carisma';

-- Tarefas Weekly
INSERT INTO tarefa (id_grupo, nome, inicio, fim, descricao, dificuldade, concluido, criado_em, atualizado_em, ativo, template, intervalo)
VALUES 
    (@grupo_weekly, 'Limpar garagem', GETDATE(), NULL, 'Organizar e limpar a garagem', 3, 0, GETDATE(), GETDATE(), 1, 0, 7),
    (@grupo_weekly, 'Revisar orçamento', GETDATE(), NULL, 'Verificar gastos da semana', 2, 0, GETDATE(), GETDATE(), 1, 0, 7);

DECLARE @tarefa1 INT, @tarefa2 INT;
SELECT TOP 1 @tarefa1 = id FROM tarefa WHERE nome = 'Limpar garagem' AND id_grupo = @grupo_weekly;
SELECT TOP 1 @tarefa2 = id FROM tarefa WHERE nome = 'Revisar orçamento' AND id_grupo = @grupo_weekly;

INSERT INTO tarefa_atributo (id_tarefa, id_atributo) 
VALUES 
    (@tarefa1, @forca),
    (@tarefa2, @inteligencia);

-- Tarefas Daily
INSERT INTO tarefa (id_grupo, nome, inicio, fim, descricao, dificuldade, concluido, criado_em, atualizado_em, ativo, template, intervalo)
VALUES 
    (@grupo_daily, 'Meditar', GETDATE(), NULL, 'Meditar por 10 minutos', 1, 0, GETDATE(), GETDATE(), 1, 0, 1),
    (@grupo_daily, 'Alongar', GETDATE(), NULL, 'Alongamento matinal', 1, 0, GETDATE(), GETDATE(), 1, 0, 1);

DECLARE @tarefa3 INT, @tarefa4 INT;
SELECT TOP 1 @tarefa3 = id FROM tarefa WHERE nome = 'Meditar' AND id_grupo = @grupo_daily;
SELECT TOP 1 @tarefa4 = id FROM tarefa WHERE nome = 'Alongar' AND id_grupo = @grupo_daily;

INSERT INTO tarefa_atributo (id_tarefa, id_atributo) 
VALUES 
    (@tarefa3, @sabedoria),
    (@tarefa4, @destreza);

-- Tarefas Monthly
INSERT INTO tarefa (id_grupo, nome, inicio, fim, descricao, dificuldade, concluido, criado_em, atualizado_em, ativo, template, intervalo)
VALUES 
    (@grupo_monthly, 'Reunião familiar', GETDATE(), NULL, 'Organizar encontro familiar', 2, 0, GETDATE(), GETDATE(), 1, 0, 30),
    (@grupo_monthly, 'Curso online', GETDATE(), NULL, 'Completar módulo do curso online', 4, 0, GETDATE(), GETDATE(), 1, 0, 30);

DECLARE @tarefa5 INT, @tarefa6 INT;
SELECT TOP 1 @tarefa5 = id FROM tarefa WHERE nome = 'Reunião familiar' AND id_grupo = @grupo_monthly;
SELECT TOP 1 @tarefa6 = id FROM tarefa WHERE nome = 'Curso online' AND id_grupo = @grupo_monthly;

-- Uma tarefa com 2 atributos
INSERT INTO tarefa_atributo (id_tarefa, id_atributo) 
VALUES 
    (@tarefa5, @carisma),
    (@tarefa5, @sabedoria);

-- Outra tarefa com 2 atributos
INSERT INTO tarefa_atributo (id_tarefa, id_atributo) 
VALUES 
    (@tarefa6, @inteligencia),
    (@tarefa6, @constituicao);
