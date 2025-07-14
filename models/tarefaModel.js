import { Request } from "tedious";
import { getConnection } from "../config/db.js";

export function getTarefas(callback){
    const con = getConnection();
    const resultado = [];
    const sql =
        `SELECT 
            Id, IdGrupo, Nome, InicioTarefa, FimTarefa, 
            Descricao, Dificuldade, Concluido 
        FROM 
            Tarefa;`

    const requisicao = new Request(sql, (err, qtdLinhas) => {
        if(err) {
            callback(err)
        } else {
            callback(null, resultado)
        }
    })

    requisicao.on("row", colunas => {
        const linha = {};
        colunas.forEach(coluna => {
            linha[coluna.metadata.colName] = coluna.value
        })
        resultado.push(linha)
    })

    con.execSql(requisicao)
}