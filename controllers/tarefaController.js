import { getTarefa, postTarefa } from "../models/tarefaModel.js";
import { agenteInfo } from "../utils/agenteInfo.js";

export function metodoGet(req, res) {
    agenteInfo(req, 'GET');

    getTarefa((err, tarefas) => {
        if (err) {
            console.error("Erro na consulta: ", err);
            res.status(500).send("Erro ao consultar o banco.")
        }

        res.status(200).json(tarefas)
    })
}

export function metodoPost(req, res) {
    agenteInfo(req, 'POST');

    postTarefa(req.body, (err, tarefas) => {
        if (tarefas == undefined) {
            res.status(500).send("Esse grupo não pertence a esse usuário")
        }

        if (err) {
            console.error("Erro na consulta: ", err);
            res.status(500).send("Erro ao consultar o banco.")
        }

        res.status(200).json(tarefas)
    })
}