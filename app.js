import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js"
import home from "./routes/homeRoutes.js"
import { conectaDb } from "./config/db.js"
import swagger from "./config/swagger.js";

const porta = 3000;
const app = express();

app.use(express.json());
app.use("/tarefa", tarefaRoutes)
app.use("/", home)
swagger(app);

conectaDb (() => {
    app.listen(porta, () => {
        console.log(`Servidor rodando na porta '${porta}'`)
    })
})