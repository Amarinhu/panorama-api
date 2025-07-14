import express from "express";
import { Connection, Request } from "tedious";
import config from "./serverConfig.js"

const porta = 3000;
const app = express();
const con = new Connection(config)

const stsCon = (err) => {
    if (err) {
        console.error('Falha na Conexão: ', err);
    } else {
        console.log('Conectado ao SQL Server');
        app.listen(porta, () => { console.log(`O Servidor está rodando na Porta: '${porta}'.`) })
    }
}

const metodoGet = (req, res) => {
    const resultado = [];
    const sql =
        `SELECT 
            Id, IdGrupo, Nome, InicioTarefa, FimTarefa, 
            Descricao, Dificuldade, Concluido 
        FROM 
            Tarefa;`

    const requisicao = new Request(sql, (err, qtdLinhas) => {
        if (err) {
            console.error("Erro na consulta: ", err)
            res.status(500).send("Erro ao consultar o banco.")
        } else {
            console.log(`Consulta executada retornou ${qtdLinhas} linhas`)
            res.json(resultado)
        }
    })

    requisicao.on("row", colunas => {
        const linha = {};
        colunas.forEach(coluna => {
            console.log(coluna)
            linha[coluna.metadata.colName] = coluna.value
        })
    })

    con.execSql(requisicao)

    console.log('Alguém fez o método GET')
}

con.on('connect', stsCon)
con.connect();

app.get('/', metodoGet)


