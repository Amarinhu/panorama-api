import { verToken } from "../services/verTokenModel.js";

const tokenRetorno = async (req, res, next) => {
    const usuario = req.body

    if (!usuario.idUsuario || !usuario.token) {
        return res.status(400).send("É preciso informar 'id' e 'token'")
    }

    try {
        const val = await verToken(usuario.idUsuario, usuario.token);
        if (!val) {
            return res.status(401).send("Token inválido ou expirado")
        }
        next()
    } catch (err) {
        console.error('Error: ', err)
        next()
    }
}

export default tokenRetorno