import { verToken } from "../services/verTokenModel.js";

const tokenRetorno = async (req, res, func) => {
    const { idUsuario: idUsuario, token: token } = req.body

    if (!idUsuario || !token) {
        return res.status(400).send("É preciso informar 'id' e 'token'")
    }

    try {
        const val = await verToken(idUsuario, token);
        if (!val) {
            return res.status(401).send("Token inválido ou expirado")
        }
        func()
    } catch (err) {
        func()
    }
}

export default tokenRetorno