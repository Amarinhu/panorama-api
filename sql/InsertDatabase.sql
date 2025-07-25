USE panorama;

-- Usuário 1: Cipresto
INSERT INTO usuario (nome, senha, criado_em, atualizado_em, ativo)
VALUES 
    ('Cipresto', 
    '$2a$12$Q1ZZiL8AyENfOMgpP0XhZ.xw7GkK/kqg/xGFdLrF1FsRURojcjYOO', 
    GETDATE(), 
    GETDATE(), 
    1);
DECLARE @usuario1_id INT = SCOPE_IDENTITY();

-- Perfis de Cipresto
INSERT INTO perfil (id_usuario, nome, foto, email, descricao, criado_em, atualizado_em, ativo)
VALUES 
    (@usuario1_id, 'Arthur', NULL, 'arthur@example.com', 'Perfil principal de Arthur', GETDATE(), GETDATE(), 1),
    (@usuario1_id, 'Beatriz', NULL, 'beatriz@example.com', 'Segundo perfil de Cipresto', GETDATE(), GETDATE(), 1);

DECLARE @perfil1_id INT = SCOPE_IDENTITY() - 1; -- Arthur
DECLARE @perfil2_id INT = SCOPE_IDENTITY();     -- Beatriz

-- Usuário 2: Lucerna
INSERT INTO usuario (nome, senha, criado_em, atualizado_em, ativo)
VALUES 
    ('Lucerna', 
    '$2a$12$SOMEOTHERSALTEDHASHEDPASSWORDXxXxXxXxXxXxXxXxXx', 
    GETDATE(), 
    GETDATE(), 
    1);
DECLARE @usuario2_id INT = SCOPE_IDENTITY();

INSERT INTO perfil (id_usuario, nome, foto, email, descricao, criado_em, atualizado_em, ativo)
VALUES 
    (@usuario2_id, 'Clara', NULL, 'clara@example.com', 'Perfil de Lucerna', GETDATE(), GETDATE(), 1);
DECLARE @perfil3_id INT = SCOPE_IDENTITY();

-- ===== Macro para Grupos, Atributos e Tarefas =====
-- Criação de grupos
DECLARE @perfil_id INT;
DECLARE @grupoW INT, @grupoD INT, @grupoM INT;

DECLARE perfil_cursor CURSOR FOR 
SELECT id FROM perfil WHERE id IN (@perfil1_id, @perfil2_id, @perfil3_id);

OPEN perfil_cursor;
FETCH NEXT FROM perfil_cursor INTO @perfil_id;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Grupos
    INSERT INTO grupo (id_perfil, nome, descricao, criado_em, atualizado_em, ativo)
    VALUES 
        (@perfil_id, 'Weekly', 'Tarefas semanais', GETDATE(), GETDATE(), 1),
        (@perfil_id, 'Daily', 'Tarefas diárias', GETDATE(), GETDATE(), 1),
        (@perfil_id, 'Monthly', 'Tarefas mensais', GETDATE(), GETDATE(), 1);

    SELECT TOP 1 @grupoW = id FROM grupo WHERE nome = 'Weekly' AND id_perfil = @perfil_id;
    SELECT TOP 1 @grupoD = id FROM grupo WHERE nome = 'Daily' AND id_perfil = @perfil_id;
    SELECT TOP 1 @grupoM = id FROM grupo WHERE nome = 'Monthly' AND id_perfil = @perfil_id;

    -- Atributos
    DECLARE @atr_for INT, @atr_des INT, @atr_con INT, @atr_int INT, @atr_sab INT, @atr_car INT;

    INSERT INTO atributo (nome, icone, xp, criado_em, atualizado_em, ativo, id_perfil) VALUES
        ('Força', '.\img\icone-forca.png', 0, GETDATE(), GETDATE(), 1, @perfil_id),
        ('Destreza', '.\img\icone-destreza.png', 0, GETDATE(), GETDATE(), 1, @perfil_id),
        ('Constituição', '.\img\icone-constituicao.png', 0, GETDATE(), GETDATE(), 1, @perfil_id),
        ('Inteligência', '.\img\icone-inteligencia.png', 0, GETDATE(), GETDATE(), 1, @perfil_id),
        ('Sabedoria', '.\img\icone-sabedoria.png', 0, GETDATE(), GETDATE(), 1, @perfil_id),
        ('Carisma', '.\img\icone-carisma.png', 0, GETDATE(), GETDATE(), 1, @perfil_id);

    SELECT 
        @atr_for = MAX(CASE WHEN nome = 'Força' THEN id END),
        @atr_des = MAX(CASE WHEN nome = 'Destreza' THEN id END),
        @atr_con = MAX(CASE WHEN nome = 'Constituição' THEN id END),
        @atr_int = MAX(CASE WHEN nome = 'Inteligência' THEN id END),
        @atr_sab = MAX(CASE WHEN nome = 'Sabedoria' THEN id END),
        @atr_car = MAX(CASE WHEN nome = 'Carisma' THEN id END)
    FROM atributo WHERE id_perfil = @perfil_id;

    -- Weekly Tarefas
    DECLARE @t1 INT, @t2 INT, @t3 INT, @t4 INT;

    INSERT INTO tarefa (id_grupo, nome, inicio, fim, descricao, dificuldade, concluido, criado_em, atualizado_em, ativo, template, intervalo)
    VALUES 
        (@grupoW, 'Organizar armário', GETDATE(), NULL, 'Limpar e reorganizar armário', 2, 0, GETDATE(), GETDATE(), 1, 0, 7),
        (@grupoW, 'Planejar semana', GETDATE(), NULL, 'Planejar agenda semanal', 3, 0, GETDATE(), GETDATE(), 1, 0, 7);

    SELECT @t1 = id FROM tarefa WHERE nome = 'Organizar armário' AND id_grupo = @grupoW;
    SELECT @t2 = id FROM tarefa WHERE nome = 'Planejar semana' AND id_grupo = @grupoW;

    INSERT INTO tarefa_atributo (id_tarefa, id_atributo)
    VALUES 
        (@t1, @atr_for),
        (@t2, @atr_int);

    -- Daily Tarefas
    INSERT INTO tarefa (id_grupo, nome, inicio, fim, descricao, dificuldade, concluido, criado_em, atualizado_em, ativo, template, intervalo)
    VALUES 
        (@grupoD, 'Beber água', GETDATE(), NULL, 'Tomar 2 litros de água', 1, 0, GETDATE(), GETDATE(), 1, 0, 1),
        (@grupoD, 'Exercício leve', GETDATE(), NULL, 'Exercício por 20 minutos', 2, 0, GETDATE(), GETDATE(), 1, 0, 1);

    SELECT @t3 = id FROM tarefa WHERE nome = 'Beber água' AND id_grupo = @grupoD;
    SELECT @t4 = id FROM tarefa WHERE nome = 'Exercício leve' AND id_grupo = @grupoD;

    INSERT INTO tarefa_atributo (id_tarefa, id_atributo)
    VALUES 
        (@t3, @atr_sab),
        (@t4, @atr_des);

    -- Monthly Tarefas
    DECLARE @t5 INT, @t6 INT;

    INSERT INTO tarefa (id_grupo, nome, inicio, fim, descricao, dificuldade, concluido, criado_em, atualizado_em, ativo, template, intervalo)
    VALUES 
        (@grupoM, 'Atualizar currículo', GETDATE(), NULL, 'Revisar e atualizar currículo', 3, 0, GETDATE(), GETDATE(), 1, 0, 30),
        (@grupoM, 'Fazer check-up médico', GETDATE(), NULL, 'Exames e consultas de rotina', 4, 0, GETDATE(), GETDATE(), 1, 0, 30);

    SELECT @t5 = id FROM tarefa WHERE nome = 'Atualizar currículo' AND id_grupo = @grupoM;
    SELECT @t6 = id FROM tarefa WHERE nome = 'Fazer check-up médico' AND id_grupo = @grupoM;

    INSERT INTO tarefa_atributo (id_tarefa, id_atributo)
    VALUES 
        (@t5, @atr_car),
        (@t5, @atr_int),
        (@t6, @atr_con),
        (@t6, @atr_sab);

    FETCH NEXT FROM perfil_cursor INTO @perfil_id;
END

CLOSE perfil_cursor;
DEALLOCATE perfil_cursor;
