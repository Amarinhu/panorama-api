import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js"
import atributoRoutes from "./routes/atributoRoutes.js"
import tokenRoutes from "./routes/tokenRoutes.js"
import home from "./routes/homeRoutes.js"
import { conectaDb } from "./config/db.js"
import tokenRetorno from "./controllers/authController.js";
import swagger from "./config/swagger.js";

const porta = 3000;
const app = express();

app.use(express.json());

app.use("/", home)
app.use("/token", tokenRoutes)

app.use(tokenRetorno);
app.use("/tarefa", tarefaRoutes)
app.use("/atributo", atributoRoutes)

swagger(app);

conectaDb (() => {
    app.listen(porta, () => {
        console.log(`Servidor rodando na porta '${porta}'`)
    })
})