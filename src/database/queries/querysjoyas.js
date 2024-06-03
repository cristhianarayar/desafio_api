const { database } = require('../config')
const format = require('pg-format')

const listJoyas = async () => {
    try{

        const sql = "SELECT * FROM inventario;"
        const {rows} = await database.query(sql) 

        if(rows.length){
            return rows
        }else{
            return [{'Menssage':'Data Vacia','data':rowa}]
        }
        
    } catch(error){

        throw error

    }
}
const listQuery = async ({limits,order_by,page}) => {
    
    try{

        const [campo,direccion] = order_by.split("_")
        const offset = page * limits

        const formattedQuery = format(
            `SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s`,
            campo,
            direccion,
            limits,
            offset
        )

        const { rows: [{ count }] } = await database.query('SELECT count(*) FROM inventario')
        const totalPages = Math.floor(count / limits)
        const { rows: inventario } = await database.query(formattedQuery)
        const stockTotal = inventario.reduce((stock,inventario) => stock += inventario.stock,0)
        const results = inventario.map(inventario => ({
            name: inventario.nombre,
            href: `/joyas/${inventario.id}`
        }))

        if(inventario.length){
            return {totalJoyas: inventario.length,
                stockTotal: stockTotal,
                results,
                PageCount: totalPages} 
        }else{
            return [{'Menssage':'No se encontron datos para mostrar','data':inventario}]
        }

    }catch(error) {
        
        throw error

    }
}

const listFilter = async ({precio_max,precio_min,categoria,metal}) => {
    try{

        let filtros = []
        if (precio_max) filtros.push(`precio >= ${precio_max}`)
        if (precio_min) filtros.push(`precio <= ${precio_min}`)
        if (categoria) filtros.push(`categoria = '${categoria}'`)
        if (metal) filtros.push(`metal = '${metal}'`)
        let sql = 'SELECT * FROM inventario'
        if (filtros.length > 0) {
            filtros = filtros.join(' AND ')
    
            sql += ` WHERE ${filtros}`
        }

        const { rows: inventario } = await database.query(sql)

        if(inventario.length){
            return inventario
        }else{
            return [{'Menssage':'No se encontron datos que coincidieran','data':inventario}]
        }

    }catch(error) {
        
        throw error

    }
}

const querysjoyas = {listJoyas,listQuery,listFilter}

module.exports = {querysjoyas} 
