//引入mysql
let mysql = require("mysql");
let mysqlConfig = require("./mysql.config.js")
//建立数据库连接
/*创建连接数据库模块*/
var connection = mysql.createConnection({
  	host:'bdm250384577.my3w.com',/*主机地址*/
	user:'bdm250384577',/*用户名*/
	password:'tangwang104',/*密码*/
	port:'3306',/*端口号*/
	database:'bdm250384577_db',/*数据库名字*/
	insecureAuth: true
});

//连接数据库
connection.connect();
 
//连接数据库
exports._contentSql = function(){
	connection.query('SELECT 1 + 1 AS solution',function(error,result,fields){
		if(error){
			console.log("连接数据库失败错误,错误信息：" + error.message );
			return
		}
		console.log( 'The solution is :' + result[0].solution );
	})
	connection.end;
}

//增
exports._insertMysql = function( data,tableName,callback ){
	
//	mysqlConfig.addData( data );
	let dataName = mysqlConfig.addData( data ).dataName;
	let dataValue = mysqlConfig.addData( data ).dataValue
	console.log( dataValue );
	let dataNameSlice = dataName.slice(0,-1);
	console.log( dataNameSlice );
//	let dataValue1 = dataValue.slice(0,-1)
	var addSql = "INSERT INTO "+tableName+"("+dataNameSlice+") VALUES(?,?,?)";
	var addSqlParams = dataValue;
	connection.query(addSql,addSqlParams,function(error,result){
		if(error){
			console.log("插入数据失败，错误信息：" + error.message )
			return
		} 
		console.log("插入数据成功：" + result.message );
		callback(error,result);
	})
	connection.end;
}
//删
exports._deletData = function( data,tableName,callback ){
	
//	//只删除id为多少的值
//	let dataValue = mysqlConfig.deleteIdData( data );
//	let deletSql = "DELETE FROM "+tableName+" where id="+dataValue;
	
	let deleteDataAll = mysqlConfig.deleteAll( data );
	let deletDataAllSlice =  deleteDataAll.slice(0,-5) ;
	let deletSql = "DELETE FROM "+tableName+" where "+deletDataAllSlice;
	
	connection.query(deletSql,function(error,result){
		if(error){
			console.log("删除数据出错，删除数据失败，错误信息："+ error.message);
			return
		}
		
		console.log("删除数据成功");
		console.log('删除数据信息：' + result );
		callback(error,result);
	})
	connection.end;
}
//改
exports._updataMsql = function( data,tableName,callback ){
	
	//对传入数据的处理
//	let updateData = mysqlConfig.upDateData( data ); 
//	//由于config里面不能处理这个字符串所以在这里处理
//	let updataDataSlice = updateData.slice(0,-3);
//	console.log( updataDataSlice )
	
	//先查询数据库
	let findCallback = function (err , findId){
		console.log("================================进入了修改阶段" + data)
		//要修改的数据
		
//		let updateSql = "UPDATE "+tableName+" SET name = 1,password = 1 WHERE id = " + findId ;
//		
//		connection.query(updateSql,function(error,result){
//			if(error){
//				console.log("修改数据失败，失败信息：" +  error.message);
//				return
//			}
//			console.log( "修改数据库数据成功,数据为：" + result.message );
//			callback(error,result);
//		})
	}
	this._findSql( data,tableName,0,findCallback ) ;
	connection.end;
}
//查
exports._findSql = function( data,tableName,callback,findCallback ){
//	console.log( data )
	//条件查询
	let getFindSqlDate = mysqlConfig.findData( data );
	console.log( data )
	
	let findSqlSlice =  getFindSqlDate.slice(0,-5) ;
	let findSql = "SELECT * FROM "+tableName+" WHERE " + findSqlSlice;
	console.log( findSql )
	//用id查询
//	let findSql = "SELECT * FROM "+tableName+" WHERE id = 6";
	
	connection.query(findSql,function(error,result){
		if(error){
			console.log("查询数据库出错，错误信息：" + error.message);
			return;
		}
		console.log("查询数据库成功");
		console.log("数据库信息：" + result );
		
//		console.log( callback(error,result) ) 
		if( callback ){
			callback(error,result);
		}
		if( findCallback ){
			let findId = result[0].id
			console.log( "==============" + findId  )
			findCallback( null,findId );
		}

	})
	
	connection.end;
}
//查询表中所有的数据

exports._findSqlAll = function( tableName,callback ){

	let findSqlStatment = "SELECT * FROM " + tableName ;
	connection.query(findSqlStatment,function(error,result){
		if(error){
			console.log("查询表中所有的数据失败，失败数据："+ error)
			return
		}
		callback(null,result);
	})
	connection.end;
}
//分页查询数据
exports._pagingData = function( dataUnder ,tableName,callback ){
	
	//查询从第五条开始后的五条数据
	let pageSql = "SELECT * FROM " + tableName + " LIMIT "+dataUnder+",5";
	connection.query(pageSql, tableName, function(error,result){
		if(error){
			console.log("查询表中所有的数据失败，失败数据："+ error)
			return
		}
		callback(null,result);
	})
	connection.end;
	
}
