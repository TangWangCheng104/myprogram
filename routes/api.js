let express = require("express");
let router = express.Router();
let mysql = require("../mode/mysql.js")

class PublicMsg{
	//属性
	constructor(){
		this._tableName = "simpleTable";
	}
	//方法
}

let publicExtends = new PublicMsg;
/* GET home page. */
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/* GET users listing. */
router.get('/testApi', function(req, res, next) {
	console.log("连接testApi成功");
	res.json({"status":1,"data":"good"})
});

//查询表内所有数据
router.get('/selectAll', function(req, res, next) {
	
	//获取PublicMsg中的属性
	let	tableName = publicExtends._tableName;
//	let reqBody = req.body;
//	console.log( reqBody )
	let reqBody = 2; 
	
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBody ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result})
		})
	});
	
});

router.post('/selectAll', function(req, res, next) {
	
	//获取PublicMsg中的属性
	let	tableName = publicExtends._tableName;
	let reqBody = req.body;
	console.log( reqBody )
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
});

//查询css表内的数据
router.post("/css3",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = "css3";
	let reqBody = req.body;
	console.log( reqBody )
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})

//查询html5表中的数据
router.post("/html5",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'html5';
	let reqBody = req.body;
	console.log( reqBody );
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})

//查询js中的数据
router.post("/js",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'js';
	let reqBody = req.body;
	console.log( reqBody );
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})

//查询vue中的数据
router.post("/vue",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'vue';
	let reqBody = req.body;
	console.log( reqBody );
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})

//查询wechat中的数据
router.post("/wechat",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'wechat';
	let reqBody = req.body;
	console.log( reqBody );
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})


//查询weex中的数据
router.post("/weex",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'weex';
	let reqBody = req.body;
	console.log( reqBody );
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})

//查询interviewProgram中的数据
router.post("/interview",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'interview';
	let reqBody = req.body;
	console.log( reqBody );
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})

//查询interviewProgram中的数据
router.post("/leaveMsg",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'leaveMsg';
	let reqBody = req.body;
	console.log( reqBody );
	let reqBodyData = reqBody.pageData; 
	console.log( reqBodyData )
	mysql._findSqlAll( tableName,function(err,data){
		
//		res.json({"error":err,"result":data})
		let dataLength = data.length;
		
		let dataUnder = ( Number( reqBodyData ) - 1 ) * 5;
		
		console.log( dataUnder );
		//一页5条数据
//		console.log( data.length )
		mysql._pagingData( dataUnder ,tableName ,function(error,result){
			console.log( result );
			res.json({"status":1,"data":result,"totalDataLength":dataLength})
		})
	});
	
})

//生成验证码


//登录接口
router.post("/login",function(req, res, next){
	
	//获取PublicMsg中的属性
	let	tableName = 'login';
	let reqBody = req.body;
	
	mysql._findSql( reqBody,tableName,function(err,data){
//		res.json({"error":err,"result":data})
		console.log(data)
		let dataLength = data.length;
		if( dataLength > 0 ){
			res.json({"status":1,"msg":"存在此用户"})
		}else{
			res.json({"status":0,"msg":"用户不存在"})
		}
//		console.log( dataUnder );
	});
	
})



/* GET users listing. */
router.post('/postApi', function(req, res, next) {
//	mysql._deletData(1,function(error,result){
//		res.json({"error":error,"result":result})
//	}); 
	let	tableName = publicExtends._tableName;
	let reqBody = req.body;
	let reqParams = req.params;
	let reqQuery = req.query;
	let reqParam = req.param();
	console.log( reqBody )
	mysql._updataMsql(reqBody,tableName,function(err,data){
		res.json({"error":err,"result":data})
		console.log(data) 
	});
	
});

module.exports = router;