const config = {
    server : "localhost",
    authentication: {
        type: "default",
        options: {
            userName: "panorama",
            password: "PanoramaWendel@2025"
        }
    },
    options : {
        database : "panorama",
        encrypt: false,
        trustServerCertificate : true,
        port: 1433
    }
}

export default config;