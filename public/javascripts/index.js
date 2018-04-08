$(function(){
	$(".nav-item").click(function(){
		$(this).find(".nav-link").addClass("active").parent().siblings().find(".nav-link").removeClass("active");
	})
	//点击页数
	//初始定义一些变量
	var prefix="#list-html5";
	var apiName="html5";
	
	//进入时展示第一页；
	page.inter (prefix, 1, apiName )
	changeAside.chage();
//	prefix =  changeAside.chage();
//	console.log( changeAside.chage() );
	
	//点击第几页时
	$(".paging .pagimgNum").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		let thisIndex = $(this).index(".paging .pagimgNum");
		page.changePage(prefix,thisIndex-1,apiName);
	})

	//点击切换aside
	$(".list-group-item-action").click(function(){
		let timer = setTimeout(function(){
			
			prefix = changeAside.chage();
			console.log( prefix )
			$( prefix + " .paging .pagimgNum").eq(0).addClass("active").siblings().removeClass("active");
			$( prefix + " .page-inpute").val( 1 );
			clearTimeout( timer );
		},100)
	})
	
	//点击上一页下一页首页末页
	$( " .first-page,.prev-page,.next-page,.last-page,.sure-page").click(function(){
//		console.log("enter")
		console.log( prefix )
		var index ;
		$( prefix + " .paging .pagimgNum").each(function(){
			if( $(this).hasClass("active") ){
				index = $(this).index( prefix + " .paging .pagimgNum");
			}
		});
		//第一页
		if( $(this).hasClass("first-page") ){
//			console.log( "第一页" )
			page.changePage( prefix,1,apiName )
			$( prefix + " .paging .pagimgNum").eq(0).addClass("active").siblings().removeClass("active");
			$( prefix + " .page-inpute").val(1);
		}
		//上一页
		else if( $( this ).hasClass("prev-page") ){
//			console.log( "上一页" )
			
			if( index > 0 ){
				page.changePage( prefix, index,apiName )
				$( prefix + " .paging .pagimgNum").eq(index-1).addClass("active").siblings().removeClass("active");
				$( prefix + " .page-inpute").val( index );
			}
		}
		//下一页
		else if( $(this).hasClass("next-page") ){
			page.changePage( prefix, index + 2,apiName )
			$( prefix + " .paging .pagimgNum").eq(index + 1).addClass("active").siblings().removeClass("active");
			$( prefix + " .page-inpute").val( index + 1 );
		}
		//末页
		else if( $(this).hasClass("last-page") ){
//			console.log("末页")
			let pageLength = parseInt( $(".total-page").html() );
			page.changePage( prefix, pageLength,apiName )
			$( prefix + " .paging .pagimgNum").eq( pageLength -1 ).addClass("active").siblings().removeClass("active");
			$( prefix + " .page-inpute").val( pageLength );
//			page.changePage( pageLength - 1 )
			
		}
		//跳转页面
		else if( $(this).hasClass("sure-page") ){
			
			let pageLength = parseInt( $( prefix + " .page-input").val() );
			let regNum = /^[0-9]*$/ig;
//			console.log( regNum.test( pageLength ) );
//			console.log( pageLength );
			
			if( regNum.test( pageLength ) ){
//				console.log("entry")
				page.changePage( prefix, pageLength,apiName );
				$( prefix + " .paging .pagimgNum").eq( pageLength - 1 ).addClass("active").siblings().removeClass("active");
			
			}
		}
		
	})
})

let page = {
	//刚进去调用这个方法
	inter (prefix, thisIndex,apiName ){
//		console.log( prefix );
		$( prefix + " .paging .pagimgNum").eq(0).addClass("active").siblings().removeClass("active");
		this.changePage(prefix, 1, apiName );
		$( prefix + " .page-inpute").val( 1 );
	},
	//改变页数
	changePage( prefix , thisIndex,apiName ){
		let pageLength = parseInt( $(".total-page").html() );
//		console.log( thisIndex <= pageLength )
		if( thisIndex > 0 && thisIndex <= pageLength ){
			
			let content="";
			$( prefix + " .content-form").html( " " );
			let url = "http://192.168.1.163:4100/api/"+apiName;
			$.ajax({type:"post",data:{pageData:thisIndex},url:url,success:function( res ){
				let response = res.data;
	//			console.log( thisIndex );
				
				for(result in response){
//					console.log( response[result].id )
					content +=  `<ul class="content-wrap">
								 	<li class="content">${response[result].id}</li>
								 	<li class="content">${response[result].title}</li>
								 	<li class="content">${response[result].author}</li>
								 	<li class="content">${response[result].date}</li>
								 	<li class="content">${response[result].browse}</li>
								 	<li class="content">${response[result].content}</li>
								 	<li class="content">${response[result].leaveMsg}</li>
								 	<li class="content"><span class="delete">删除</span><span class="edit">修改</span></li>
							    </ul>`
				}
				$( prefix + " .content-form").html( content );
//				console.log(prefix)
			}})
			
		}
	}
}
var changeAside = {
	chage(){
		$(".list-group-item-action").each(function(){
			if( $(this).hasClass("active") ){
				prefix = "#" + $(this).attr("id").slice(0,-5);
//				debugger;
//				console.log( prefix.indexOf("css3") != 0 );
				console.log( prefix )
				if( prefix.indexOf("html5") != -1 ){
					apiName = "html5";
				}else if( prefix.indexOf("css3") != -1 ){
					apiName = "css3";
				}else if( prefix.indexOf("js") != -1 ){
					apiName = "js";
				}else if( prefix.indexOf("vue") != -1 ){
					apiName = "vue";
				}else if( prefix.indexOf("wechat") != -1 ){
					apiName = "wechat";
				}else if( prefix.indexOf("weex") != -1 ){
					apiName = "weex";
				}else if( prefix.indexOf("interview") != -1 ){
					apiName = "interview";
				}else if( prefix.indexOf("leaveMsg") != -1 ){
					apiName = "leaveMsg";
				}
				console.log( apiName )
			    page.changePage(prefix,1,apiName); 
			}
		})
		return prefix;
	}
}

//后台登录
let login = {
	
	enter (){
		
		//进入时判断是否记住密码
		console.log(  );
		console.log( this );
		
		if( $("#remember").is(":checked") ){
			$.cookie("saveMsg":)
		}
		
		this.num = "";
		for( let i = 0 ; i < 4; i ++ ){
			this.num += parseInt( Math.random() * 10 ) + "";
		}
		$("#code").text( this.num );
		
		//进入时向后台请求参数
//		let url = "http://192.168.1.163:4100/api/login";
//		let postData = "";
//		
//		$.ajax({url:url,type:"post",data:postData,function(res){
//			console.log( res )
////			$("#code").text(num);
//		}})
	},
	submit (){
		//提交
		let code = parseInt( $("#code").text() );
		let url = "http://192.168.1.163:4100/api/login";
		let username = $("#username").val();
		let password = $("#password").val();
		let data = {
			username,
			password
		}
		
		if( this.num == code ){
			console.log( code );
			$.post({url:url,data:data,type:"post",success:function(err, res ){
				console.log( "output" );
				console.log( res );
			}})
			
		}
		
	},
	//点击向后台请求验证码参数
	//随机生成验证码颜色和移动位置旋转位置
	codeColor (){
		let code = ( $("#code").text() ).split("");
		console.log( code )
//		for( let i = 0;i < 4;i ++ ){
//			code
//		}
		
		let colorArr = [1,2,3,4,5,6,7,8,9,0,A,B,C,D,E,F];
		let mathColor = ''; 
		for( let i = 0; i < 4 ; i++ ){
//			for(  )
		}
	}
}
