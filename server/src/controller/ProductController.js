import ProductService from '../service/ProductService.js'

export default class ProductController {
    static getAllProduct = async (req, res, next) => {
        try {
            const results = await ProductService.getAllProduct()
            res.status(200).json({
                data: results
            }).end()

        } catch (err) {
            next(err)
        }
    }

    static getOneProduct = async (req, res, next) => {
        try {
            const productId = req.params.productId
            const result = await ProductService.getOneProduct(productId)
            res.status(200).json({
                data: result
            }).end()
        } catch (err) {
            next(err)
        }
    }
}