import ResponseError from '../error/ResponseError.js'

export const errorMiddleware = async (err, req, res, next) => {
    if(!err) return next(err)
    if(err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end()
    }else {
        res.status(500).json({
            errors: err.message
        })
    }
}