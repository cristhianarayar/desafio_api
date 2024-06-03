const  {querysjoyas} = require ('../database/queries/querysjoyas')


const getCtrJoyas = async (req,res,next) => {
    
    try {
        const limitspage = req.query
        if (Object.keys(limitspage).length == 0 ){

            const response = await querysjoyas.listJoyas()
            res.json(response)

        }else if(Object.keys(limitspage).length == 3){
            const response = await querysjoyas.listQuery(limitspage)
            res.json(response)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)
    }
 
}

const getCtrFilter = async (req,res,next) => {
    try {
        const querystring = req.query
        const response = await querysjoyas.listFilter(querystring)
        res.send(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)
    }
    
}

module.exports = {getCtrJoyas,getCtrFilter}