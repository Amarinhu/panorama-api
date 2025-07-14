import { Connection } from 'tedious';
import config from "./serverConfig.js";

let connection;

export function conectaDb(callback) {
    connection = new Connection(config);

    connection.on("connect", err => {
        if (err) {
            console.error('Falha na Conexão: ', err);
        } else {
            console.log('Conectado ao SQL Server');
            callback();
        }
    })

    connection.connect();
}

export function getConnection() {
    return connection;
}