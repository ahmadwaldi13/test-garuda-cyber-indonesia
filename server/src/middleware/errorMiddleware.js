import ResponseError from '../error/ResponseError.js'

export const errorMiddleware = async (err, req, res, next) => {
    if(!err) return next(err)
    if(err instanceof ResponseError) {
       return res.status(err.status).json({
            errors: err.message
        })
    }else {
       return res.status(500).json({
            errors: err.message
        })
    }
}