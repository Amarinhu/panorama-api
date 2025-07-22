import { getTarefa, postTarefa, putTarefa, deleteTarefa } from "../models/tarefaModel.js";
import { agenteInfo } from "../utils/agenteInfo.js";

export function metodoGet(req, res) {
    agenteInfo(req, 'GET');

    getTarefa(req.body, (err, tarefas) => {
        if (err) {
            console.error("Erro na consulta: ", err);
            return res.status(500).send("Erro ao consultar o banco.")
        }

        return res.status(200).json(tarefas)
    })
}

export function metodoPost(req, res) {
    agenteInfo(req, 'POST');

    postTarefa(req.body, (err, tarefas) => {
        if (tarefas == undefined) {
            return res.status(400).send("Esse grupo não pertence a esse usuário")
        }

        if (err) {
            console.error("Erro na consulta: ", err);
            return res.status(500).send("Erro ao consultar o banco.")
        }

        return res.status(200).json(tarefas)
    })
}

export function metodoPut(req, res) {
    agenteInfo(req, 'PUT');

    putTarefa(req.body, (err, tarefas) => {
        if (tarefas == undefined) {
            return res.status(400).send("Esse grupo não pertence a esse usuário")
        }

        if (err) {
            console.error("Erro na consulta: ", err);
            return res.status(500).send("Erro ao consultar o banco.")
        }

        return res.status(200).json(tarefas)
    })
}

export function metodoDelete(req, res) {
    agenteInfo(req, 'DELETE');

    deleteTarefa(req.body, (err, tarefas) => {
        if (err) {
            console.error("Erro na consulta: ", err);
            return res.status(500).send("Erro ao consultar o banco.")
        }

        if (tarefas.length === 0) {
            return res.status(404).send("O 'id' incorreto ou tarefa não pertence ao usuário")
        }

        return res.status(200).json(tarefas)
    })
}