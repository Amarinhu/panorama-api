import { postToken } from "../models/tokenModel.js";
import { agenteInfo } from "../utils/agenteInfo.js";

export function metodoPost(req, res) {
    agenteInfo(req, 'POST');

    const { nome, email, senha } = req.body;

    postToken((err, resultado) => {
        if (err) {
            console.error("Erro ao gerar token: ", err);
            res.status(500).send("Erro ao consultar o banco.")
        }

        res.status(200).json(resultado)
    }, nome, email, senha)
}