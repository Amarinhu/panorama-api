import { Request, TYPES } from "tedious";
import { getConnection } from "../config/db.js";

export function getTarefa(reqbody, callback) {
    const con = getConnection();
    const resultado = [];
    const sql =
        `SELECT T.id, G.id, T.nome, T.descricao, T.dificuldade, T.concluido, 
        T.ativo, T.template, T.id_grupo 
            FROM TAREFA T
        INNER JOIN GRUPO G ON T.ID_GRUPO = G.ID
        INNER JOIN PERFIL P ON P.id = G.id_perfil
        INNER JOIN USUARIO U ON U.id = P.id_usuario
            WHERE U.id = @idUsuario`

    const requisicao = new Request(sql, (err, qtdLinhas) => {
        if (err) {
            callback(err)
        } else {
            callback(null, resultado)
        }
    })

    requisicao.addParameter("idUsuario", TYPES.Int, reqbody.idUsuario);

    requisicao.on("row", colunas => {
        const linha = {};
        colunas.forEach(coluna => {
            linha[coluna.metadata.colName] = coluna.value
        })
        resultado.push(linha)
    })

    con.execSql(requisicao)
}

export function postTarefa(reqbody, callback) {
    const con = getConnection();
    const resultado = [];
    const sql =
        `IF EXISTS (
            select TOP 1 1 from grupo G
                INNER JOIN perfil P on P.id = G.id_perfil
                INNER JOIN usuario U on U.id = P.id_usuario
            WHERE U.id = @idUsuario 
                AND G.id = @id_grupo
        )
        BEGIN
            INSERT INTO tarefa 
                (nome, descricao, dificuldade, concluido, ativo, template, 
                intervalo, id_grupo, criado_em, atualizado_em) 
            OUTPUT INSERTED.id
            VALUES 
                (@nome, @descricao, @dificuldade, @concluido, @ativo, @template, 
                @intervalo, @id_grupo, GETDATE(), GETDATE()) 
        END `;

    const requisicao = new Request(sql, (err, qtdLinhas) => {
        if (err) {
            callback(err)
        }

        callback(null, resultado[0])
    })

    const tarefa = reqbody.tarefa

    requisicao.addParameter("idUsuario", TYPES.Int, reqbody.idUsuario);
    requisicao.addParameter("nome", TYPES.VarChar, tarefa.nome)
    requisicao.addParameter("descricao", TYPES.VarChar, tarefa.descricao)
    requisicao.addParameter("dificuldade", TYPES.Int, tarefa.dificuldade)
    requisicao.addParameter("concluido", TYPES.Bit, tarefa.concluido)
    requisicao.addParameter("ativo", TYPES.Bit, tarefa.ativo)
    requisicao.addParameter("template", TYPES.Bit, tarefa.template)
    requisicao.addParameter("intervalo", TYPES.Int, tarefa.intervalo)
    requisicao.addParameter("id_grupo", TYPES.Int, tarefa.id_grupo)

    requisicao.on("row", colunas => {
        const linha = {};
        colunas.forEach(coluna => {
            linha[coluna.metadata.colName] = coluna.value
        })
        resultado.push(linha)
    })

    con.execSql(requisicao)
}

export function putTarefa(reqbody, callback) {
    const con = getConnection();
    const resultado = [];
    const sql =
        `IF EXISTS (
            select TOP 1 1 from grupo G
                INNER JOIN perfil P on P.id = G.id_perfil
                INNER JOIN usuario U on U.id = P.id_usuario
            WHERE U.id = @idUsuario 
                AND G.id = @id_grupo
        )
        BEGIN
            UPDATE tarefa SET 
                nome = @nome, descricao = @descricao, dificuldade = @dificuldade, 
                concluido = @concluido, ativo = @ativo, template = @template, 
                intervalo = @intervalo, id_grupo = @id_grupo, atualizado_em = GETDATE() 
            OUTPUT INSERTED.id
                WHERE id = @id
        END `;

    const requisicao = new Request(sql, (err, qtdLinhas) => {
        if (err) {
            callback(err)
        }

        callback(null, resultado[0])
    })

    const tarefa = reqbody.tarefa

    requisicao.addParameter("idUsuario", TYPES.Int, reqbody.idUsuario);
    requisicao.addParameter("id", TYPES.Int, tarefa.id);
    requisicao.addParameter("nome", TYPES.VarChar, tarefa.nome)
    requisicao.addParameter("descricao", TYPES.VarChar, tarefa.descricao)
    requisicao.addParameter("dificuldade", TYPES.Int, tarefa.dificuldade)
    requisicao.addParameter("concluido", TYPES.Bit, tarefa.concluido)
    requisicao.addParameter("ativo", TYPES.Bit, tarefa.ativo)
    requisicao.addParameter("template", TYPES.Bit, tarefa.template)
    requisicao.addParameter("intervalo", TYPES.Int, tarefa.intervalo)
    requisicao.addParameter("id_grupo", TYPES.Int, tarefa.id_grupo)

    requisicao.on("row", colunas => {
        const linha = {};
        colunas.forEach(coluna => {
            linha[coluna.metadata.colName] = coluna.value
        })
        resultado.push(linha)
    })

    con.execSql(requisicao)
}