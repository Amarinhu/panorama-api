import { getTarefas } from "../models/tarefaModel.js";
import { agenteInfo } from "../utils/agenteInfo.js";

export function metodoGet(req, res) {
    agenteInfo(req, 'GET');

    getTarefas((err, tarefas) => {
        if (err) {
            console.error("Erro na consulta: ", err);
            res.status(500).send("Erro ao consultar o banco.")
        }
        
        res.status(200).json(tarefas)
    })
}