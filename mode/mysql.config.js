//参数的处理
let data = {
	addData( data ){
		let dataValue = [];
		let dataName = "";
		for( value in data ){
			dataValue.push( data[value] );
			dataName += value + ",";
		}
		return {dataName,dataValue}
	},
	deleteIdData( data ){
		dataValue = data.id
		return dataValue
	},
	deleteAll( data ){
		let deleteDataValue = "";
		for( value in data ){
			deleteDataValue += value + "= '"+ data[value] + "' and ";
		} 
		return deleteDataValue
	},
	upDateData( data ){
		let setData = "";
		for( value in data ){
			setData += value + "= '"+ data[value] + "' , ";
		}
		return setData;
	},
	findData( data ){
		let findData = "";
		for( value in data ){
			findData += value + "= '"+ data[value] + "' and ";
		} 
		return findData;
	}
}

module.exports = data;





