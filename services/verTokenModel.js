import { Request, TYPES } from "tedious";
import { getConnection } from "../config/db.js";

export function verToken(idUsuario, token) {
    const con = getConnection();
    const resultado = [];
    const sql =
        `SELECT TOP 1 T.criado_em FROM token T
        inner join usuario U on T.id_usuario = U.id
    where T.token = @token and U.id = @id_usuario and U.ativo = 1 `

    const promise = new Promise((res, rej) => {
        const req = new Request(sql, (err, qtdLinhas) => {
            if (err) {
                return rej(err)
            }

            if (qtdLinhas === 0) {
                return res(false)
            }

            const criadoEm = resultado[0].criado_em;
            const dtToken = new Date(criadoEm)
            const dtTokenBr = new Date(dtToken.getTime() + 3 * 60 * 60 * 1000)
            const dtAgora = new Date();
            const difDataMs = dtAgora - dtTokenBr;
            const tmpRestante = (1 * 60 * 60 * 1000) - difDataMs

            res(tmpRestante > 0);
        })


        req.on("row", colunas => {
            const linha = {};
            colunas.forEach(coluna => {
                linha[coluna.metadata.colName] = coluna.value
            })
            resultado.push(linha)
        })

        req.addParameter("id_usuario", TYPES.Int, idUsuario);
        req.addParameter("token", TYPES.VarChar, token);

        con.execSql(req);
    })

    return promise
}