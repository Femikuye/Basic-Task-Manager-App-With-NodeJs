const {CustomAPIError} = require('../errors/commonError')
const errorHandler = (error, req, res, next) => {
    if(error instanceof CustomAPIError){
        return res.status(error.statusCode).json({msg: error.message})
    }
    return res.status(500).json({msg: "Something went wrong"})
}

module.exports = errorHandler