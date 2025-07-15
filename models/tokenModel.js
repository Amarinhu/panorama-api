import { Request, TYPES } from "tedious";
import { getConnection } from "../config/db.js";
import crypto from "crypto";

export function postToken(callback, nome = null, email = null, senha) {
    const con = getConnection();
    const resultado = [];

    const sql = `
    SELECT 1 id, nome, email 
        FROM usuario 
    WHERE (senha = @senha) AND (email = @email OR nome = @nome)`

    const reqUsuario = new Request(sql, (err, qtdLinhas) => {
        if (err) {
            callback(err)
        } else if (qtdLinhas === 0) {
            callback(new Error("Usuário não encontrado ou inválido"))
        } else {
            const usuario = resultado[0];
            verificaToken(usuario.id)
        }
    })

    reqUsuario.addParameter("senha", TYPES.VarChar, senha);
    reqUsuario.addParameter("email", TYPES.VarChar, email);
    reqUsuario.addParameter("nome", TYPES.VarChar, nome);

    reqUsuario.on("row", colunas => {
        const linha = {};
        colunas.forEach(coluna => {
            linha[coluna.metadata.colName] = coluna.value;
        })
        resultado.push(linha)
    })

    con.execSql(reqUsuario);

    const verificaToken = (idUsuario) => {
        const sqlToken = `
        SELECT TOP 1 id, token, criado_em
        from token
        where id_usuario = @id_usuario
        `
        const tokens = [];

        const req = new Request(sqlToken, (err) => {
            if (err) {
                callback(err)
            } else if (tokens.length > 0) {
                const primToken = tokens[0];
                const dtToken = new Date(primToken.criado_em)
                const dtTokenBr = new Date (dtToken.getTime() + 3 * 60 * 60 * 1000)
                const dtAgora = new Date();

                const difDataMs = dtAgora - dtTokenBr;
                const difDataHrs = difDataMs / 1000 / 60 / 60;

                console.log(`${dtAgora} - ${dtTokenBr} = ${difDataMs}`)
                console.log(`${difDataMs} para Hrs = ${difDataHrs}`)
                console.log(`Maior que 1 hora? = ${difDataHrs <= 1}`)

                if (difDataHrs <= 1) {
                    callback(null, { idUsuario: idUsuario, token: primToken.token })
                } else {
                    deletaTokens(idUsuario)
                }
            } else {
                insertToken(idUsuario, gerarToken(idUsuario))
            }
        })

        req.addParameter("id_usuario", TYPES.Int, idUsuario);

        req.on("row", colunas => {
            const linha = {}
            colunas.forEach(coluna => {
                linha[coluna.metadata.colName] = coluna.value
            })
            tokens.push(linha)
        })

        con.execSql(req)
    }

    const deletaTokens = (idUsuario) => {
        const sqlDel = `
        DELETE FROM token
        WHERE id_usuario = @id_usuario`

        const req = new Request(sqlDel, (err) => {
            if (err) {
                callback(err)
            } else {
                insertToken(idUsuario, gerarToken(idUsuario))
            }
        })

        req.addParameter("id_usuario", TYPES.Int, idUsuario)

        con.execSql(req)
    }

    const insertToken = (idUsuario, token) => {
        const sql = `
        INSERT INTO token (id_usuario, criado_em, token)
        VALUES (@id_usuario, GETDATE(), @token)
        `;

        const reqInsert = new Request(sql, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, { idUsuario: idUsuario, token: token });
            }
        })

        reqInsert.addParameter("id_usuario", TYPES.Int, idUsuario);
        reqInsert.addParameter("token", TYPES.VarChar, token);

        con.execSql(reqInsert)
    }
}

const gerarToken = (idUsuario) => {
    const parteAleatoria = crypto.randomBytes(16).toString("hex");
    const base = `${idUsuario}-${Date.now()}-${parteAleatoria}`;
    return crypto.createHash("sha256").update(base).digest("hex")
}