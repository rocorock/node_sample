# 商品管理アプリ簡易仕様書

## 起動方法

package.jsonを含むディレクトリで、下記のコマンドにより実行する
```:sh
npm run leveldb
```
デフォルトの仕様では、http://localhost:3000 として起動する


## メインAPI

### 商品の全件取得

下記のエンドポイントにGETリクエストを行うと、DB上の全商品のレコードが返却される
|項目|値|
|---|---|
|メソッド|GET|
|エンドポイント|/products|

### 商品IDに基づく商品取得

下記のエンドポイントにGETリクエストを行うと、商品IDが一致するレコードが返却される  
商品IDは登録順に連番となっている

|項目|値|
|---|---|
|メソッド|GET|
|エンドポイント|/products/{商品ID}|

### 商品登録

下記のエンドポイントにPOSTリクエストを行うと、ボディに含まれるレコードが登録される  
登録商品の商品IDはマスター商品IDとなり、マスター商品IDは登録のたびに1ずつ増加する  
※商品IDが一致する場合、レコードが上書きされる

|項目|値|
|---|---|
|メソッド|POST|
|エンドポイント|/products|

ボディに含めるJSONは、{"product" : {JSONデータ} }の形式とする
```
POSTデータのサンプル
{"product" : {"coverImage":"./assets/img/phone-cover.jpg","name":"Phone XL","price":7999,"description":"A large phone with one of the best screens","heading1":"Sample Text","heading2":"Sample Text","heading3":"Sample Text","headingMessage1":"Sample","headingMessage2":"Sample","headingMessage3":"Sample"}}
```

## 管理API

### マスター商品ID取得
   
下記のエンドポイントにGETリクエストを行うと、マスター商品IDが返却される
|項目|値|
|---|---|
|メソッド|GET|
|エンドポイント|/manage|  

### マスター商品ID更新

下記のエンドポイントにPOSTリクエストを行うと、ボディに含まれるマスター商品IDが登録される
|項目|値|
|---|---|
|メソッド|POST|
|エンドポイント|/manage|

ボディに含めるJSONは、{"master_prd_id" : number }の形式とする
```
POSTデータのサンプル
{"master_prd_id" : 1}
```
