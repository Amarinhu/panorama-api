import express from "express";
import { metodoGet } from "../controllers/atributoController.js";

const router = express.Router();

router.get('/', metodoGet);

export default router;

/**
 * @swagger
 * tags:
 *   name: Atributos
 *   description: Gerenciamento de atributos
 */

/**
 * @swagger
 * /atributo:
 *   get:
 *     summary: Lista todas as atributos
 *     tags: [Atributos]
 *     responses:
 *       200:
 *         description: Lista de atributos
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