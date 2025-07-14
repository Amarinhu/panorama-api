import express from "express";
import { metodoGet } from "../controllers/tarefaController.js";

const router = express.Router();

router.get('/', metodoGet);

export default router;

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tarefa:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Tarefas]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Id:
 *                     type: integer
 *                   IdGrupo:
 *                     type: integer
 *                   Nome:
 *                     type: string
 *                   InicioTarefa:
 *                     type: string
 *                   FimTarefa:
 *                     type: string
 *                   Descricao:
 *                     type: string
 *                   Dificuldade:
 *                     type: integer
 *                   Concluido:
 *                     type: boolean
 *       500:
 *         description: Erro ao consultar o banco
 */