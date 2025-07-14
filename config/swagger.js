import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API do Panorama",
            version: "1.0.0",
            description: "Documentação da API do Panorama usando Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local",
            },
        ],
    },
    apis: ["./routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};