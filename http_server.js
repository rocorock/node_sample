const products = [
    {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone XL',
        price: 7999,
        description: 'A large phone with one of the best screens',
        heading1: 'Sample Text',
        heading2: 'Sample Text',
        heading3: 'Sample Text',
        headingMessage1: 'Sample',
        headingMessage2: 'Sample',
        headingMessage3: 'Sample'
    },
    {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Mini',
        price: 6999,
        description: 'A great phone with one of the best cameras',
        heading1: 'Sample Text',
        heading2: 'Sample Text',
        heading3: 'Sample Text',
        headingMessage1: 'Sample',
        headingMessage2: 'Sample',
        headingMessage3: 'Sample'
    },
    {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Standard',
        price: 2999,
        description: '',
        heading1: 'Sample Text',
        heading2: 'Sample Text',
        heading3: 'Sample Text',
        headingMessage1: '',
        headingMessage2: '',
        headingMessage3: '',
    },
    {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Special',
        price: 9999,
        description: '',
        heading1: 'Sample Text',
        heading2: 'Sample Text',
        heading3: 'Sample Text',
        headingMessage1: '',
        headingMessage2: '',
        headingMessage3: ''
    }
]

const express = require('express')
const log4js = require('log4js')
const app = express()
const logger = log4js.getLogger()
logger.level = 'info'

app.route('/products')
    .get((req, res) => {
        logger.info(req.headers)
        res.json(products)
    })
app.route('/products/:id(\\d+)')
    .get((req, res) => {
        logger.info(req.headers)
        const prod_id = Number(req.params.id)
        res.json(products[prod_id])

    })

app.listen(3000)
