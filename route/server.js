const express = require('express')
const log4js = require('log4js')
const router = express.Router()
const logger = log4js.getLogger()
logger.level = 'info'
const dataStrage = require(`../${process.env.npm_lifecycle_event}`)
router.use(express.json())

//productを全件取得する

router.route('/products')
    .get((req, res, next) => {
        logger.info(req.headers)
        return dataStrage.fetchAll().then(product => res.json(product), next)
    })


//prd_idのproductを取得する
router.route('/products/:id(\\d+)')
    .get((req, res, next )=> {
        logger.info(req.headers)
        const prd_id = Number(req.params.id)
        return dataStrage.fetch(prd_id).then(product => res.json(product), next)
})

//productを登録する
router.route('/products')
    .post((req, res, next) => {
        logger.info(req.body)
        const { product } = req.body
        if (typeof product !== 'object' || !product) {
            // productがリクエストに含まれない場合はステータスコード400（Bad Request）
            const err = new Error('product is required')
            err.statusCode = 400
            return next(err)
          }
        logger.info(product)
        dataStrage.create(product).then( () => res.status(201).json(product), next)
    })

// master_prd_idを更新する
router.route('/manage')
    .post((req, res, next) =>{
        logger.info(req.heagder)
        const { master_prd_id } = req.body
        if (typeof master_prd_id !== 'number' || !master_prd_id) {
            // masterがリクエストに含まれない場合はステータスコード400（Bad Request）
            const err = new Error('master_prd_id is required')
            err.statusCode = 400
            return next(err)
          }
        dataStrage.set_id( master_prd_id ).then(() => res.status(201).json(master_prd_id), next)
    }
    )

// master_prd_idを取得する
router.route('/manage')
    .get((req, res , next)=> {
        logger.info(req.headers)
        return dataStrage.fetch_id().then(master_prd_id => res.json(master_prd_id), next)
})

// エラーハンドリングミドルウェア
router.use((err, req, res, next) => {
    logger.error(err)
    res.status(err.statusCode || 500).json({ error: err.message })
  })


module.exports = router
