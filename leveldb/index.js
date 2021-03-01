'use strict'
const level = require('level')
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'info'
const { join } = require('path')
// 同じディレクトリ内のdb_dataディレクトリにデータベースの状態を保存
const db = level(join(__dirname, 'db_data'))

//商品を全件取得する
exports.fetchAll = async () => {
  const result = []
  for await (const v of db.createValueStream({ gt: 'product:', lt: 'product;' })) {
    result.push(JSON.parse(v))
  }
  return result
}

//prd_idを持つ商品を取得する
exports.fetch = async (prd_id) =>  {
    return await db.get(`product:${prd_id}`).then(JSON.parse)
  }

  //master_prd_idを取得する
exports.fetch_id = async () =>  {
    return await db.get('master_prd_id')
  }

  //master_prd_idを更新する
exports.set_id = (master_prd_id) => db.batch()
    .del('master_prd_id')
    .put('master_prd_id', master_prd_id)
    .write()

// 
exports.create = product => 
  db.get('master_prd_id').then(
      id => {
          logger.info("master_prd_id is %d", id)
          //レコードの追加
          let batch = db.batch().put(`product:${id}`, JSON.stringify(product))
          //master_prd_idの値を加算する
          id++
          batch = batch.del('master_prd_id').put('master_prd_id', id)
          //DBを更新する
          return batch.write()
      }
  )
