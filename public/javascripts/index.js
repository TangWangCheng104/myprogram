
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
//		console.log(  );
//		console.log( this );
		
		if( myCookie.getCookie("userMsg").length > 0 ){
			console.log('设置了cookie')
			let getCookie = JSON.parse( myCookie.getCookie("userMsg") );
			$("#username").val( getCookie.username );
			$("#username").attr("flage",true);
			$("#password").val( getCookie.password );
			$("#password").attr("flage",true);
		}
//		console.log( "entry")
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
	//输入密码和用户名时验证码时正则匹配一下
	username(t){
		//用户名为数字字母下划线组成
		let usernameReg = /^.\w+$/;
		let username = $(t).val();
		let word = "用户名由15位数字字母下划线组成";
		
		if( username.length > 15 ){
			$(t).val( username.slice(0,14) );
			this.alert("alertWran",word);
		}
		if( usernameReg.test(username) == false ){
			this.alert("alertWran",word);
			$(t).attr("flage",false);
			return 
		}
		$(t).attr("flage",true);
	},
	password(t){
		let passwordReg = /^\w+$/
		let password = $(t).val();
		let word = "密码由15位数字字母下划线组成";
		
		if( password.length > 15  ){
			$(t).val( password.slice(0,14) );
			this.alert("alertWran",word);
		}
//		console.log( $(t).attr("flage") )
		if( passwordReg.test(password) == false ){
			this.alert("alertWran",word);
			$(t).attr("flage",false);
			return 
		}
		$(t).attr("flage",true);
//		console.log( $(t).attr("flage") )
	},
	code(t){
		let codeReg = /^\d+$/
		let code = $(t).val();
		let word = "验证码由4位数字组成";
		
//		console.log( code )
		if( code.length > 4 ){
			$(t).val( code.slice(0,4) );
			this.alert("alertWran",word);
		}
		if( codeReg.test(code) == false ){
			this.alert("alertWran",word)
			$(t).attr("flage",false);
			return 
		}
		$(t).attr("flage",true);
	},
	//提示框弹出与消失
	alert(id,word){
		$("#"+id).text(word);
		$("#"+id).fadeIn(400);
		let timer = setTimeout(function(){
			$("#"+id).fadeOut(400);
			clearTimeout( timer );
		},3000)
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
		//引入md5,暂时空着
		
		
		let jsonData = JSON.stringify(data)
		this.flag = true;
		let that = this
//		console.log( this.num == code )
		//判断一下用户名密码是否都符合条件，然后再提交
		$(".border input").each(function(){
			console.log( $(this).attr("flage") == 'false' ) 
			if( $(this).attr("flage") == 'false' ){
				console.log("enter1")
				this.flag = false;
				if( $(this)[0].id == "username" ){
					let word = "用户名由15位数字字母下划线组成";
					that.alert("alertWran",word);
				}else if( $(this)[0].id == "password" ){
					let word = "密码由15位数字字母下划线组成";
					that.alert("alertWran",word);
				}else if( $(this)[0].id == "codeInput" ){
					let word = "验证码由4位数字组成";
					that.alert("alertWran",word);
				}
			}
		})
//		$.ajax({url:url,data:data,type:"POST",success:function(err, res ){
//			console.log( "output" );
//			console.log( res );
//		}})
		
//		console.log( this.flag )
		if( this.flag ){
			if( this.num == code ){
				//这里判断一下是否选择了记住账户名和密码
				console.log( code );
				$.post(url,data,function(result){
					//有此用户之后的操作
					if( result.status == 1 ){
						//如果勾选了cookie则设置cookie
						if( $("#remember").is(":checked") ){
							//设置cookie时间
							let expiresDay = 30;
							myCookie.setCookie("userMsg",jsonData,expiresDay);
						}
						//跳转页面
					}
				})
			}
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
var myCookie = {
	getCookie(c_name){
		if (document.cookie.length>0){
		   c_start=document.cookie.indexOf(c_name + "=")
		    	if (c_start!=-1){ 
				    c_start=c_start + c_name.length+1 
				    c_end=document.cookie.indexOf(";",c_start)
				    if (c_end==-1) c_end=document.cookie.length
				    return unescape(document.cookie.substring(c_start,c_end))
		    	} 
		  }
		  return ""
	},
	setCookie(c_name,value,expiredays){
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	},
	checkCookie(){
		username=getCookie('username')
		if (username!=null && username!=""){
			alert('Welcome again '+username+'!')
		}
		else {
			username=prompt('Please enter your name:',"")
			if (username!=null && username!=""){
				setCookie('username',username,365)
			}
		}
	}
}