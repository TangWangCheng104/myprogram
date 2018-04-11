var express = require('express');
var router = express.Router();
//引入nondsass
let mySql = require("../mode/mysql.js");
// let nodeSass = require('node-sass');
// //配置 nodeSass

// sass.render({
// 	outputFile : "./public/header",
// 	list : function (err,result){
// 		console.log( result );
// 	}
// })
//权限判断
//router.get('/', function(req, res) {
//	//判断
//	
//});
/* GET home page. */
router.get('/', function(req, res, next) {
		//连接数据库之后，然后渲染数据
	let tableName = "simpleTable";
    let dataUnder = 0;
    mySql._findSqlAll(tableName,function(err,result){
    	mySql._pagingData( dataUnder ,tableName ,function(error,resultData){
			console.log( result.length );
			let totalDataLength = Math.ceil( result.length / 5 );
			console.log( resultData );
			res.render('./index.ejs',{ list:resultData, totalDataLength:totalDataLength });
		})
    })
});
module.exports = router;
 