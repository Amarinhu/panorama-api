export function agenteInfo(req, method = 'GET') {
    const clientIp = req.ip;
    const agente = req.headers['user-agent'] || 'desconhecido';
    const endpoint = req.originalUrl;
    const dateTime = new Date().toISOString()

    const msg = `[INFO] - [${method}] 
    DateTime: ${dateTime} 
    Endpoint: ${endpoint}
    Client: ${clientIp}
    Agente: ${agente}`
    console.log(msg)
}