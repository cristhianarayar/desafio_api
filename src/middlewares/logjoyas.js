const HandleDatabaseLogs = (req, res, next) => {
    const time = new Date()
    const url = req.url
    const method = req.method
    const queries = req.query
    console.log(` Hora ejecución de servicio ${time} servicio ejecutado:
    [API:  --> ${url} / Methpod --> ${method} /  Queries: --> ${Object.entries(queries)}]\n`)

    next();
   
}




module.exports = HandleDatabaseLogs