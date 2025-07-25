import { Request, TYPES } from "tedious";
import { getConnection } from "../config/db.js";

export function getAtributo(reqbody, callback) {
    const con = getConnection();
    const resultado = [];
    const sql =
        `SELECT DISTINCT A.id, A.nome, A.icone, A.xp, A.ativo 
            FROM atributo A
        INNER JOIN tarefa_atributo TA on TA.id_atributo = A.id
        INNER JOIN tarefa T on T.id = TA.id_tarefa
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