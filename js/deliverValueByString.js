//参数说明：url是需要跳转的页面路径；sendMsg是一个对象，里面是需要传递的键值对
//无返回值
//调用环境：父页面
function gogogo(url,sendMsg){
	var str="";
	for(let key in sendMsg){
		str+=toCharCode(key)+"="+toCharCode(sendMsg[key])+"&";//这样会在最后面多一个“&”
	}
	str=str.slice(0,str.length-1);
	//console.log(str);
	location.href=""+url+"?"+str;
}
//参数说明：不需要参数；
//返回值：键值对json数组，键用key取，值用value取；
	//如果不存在，返回空字符串“”
//调用环境：子页面（或其他的网页）
function getMsgFromLocation(){
	var dizhi=location.href;
	if(dizhi.search(/\?/)!=-1){//检测网址中是否有？号（是否传递的有参数）
		var allMsg=dizhi.split("?")[1];//长字符串
		if(allMsg.length==0){
			
		}else{
			allMsg=allMsg.replace(/%20/g," ");//把（%20）转换为空格
			var arrAll=allMsg.split("&");
			var arrJson=[];
			for(var i=0;i<arrAll.length;i++){
				arrJson[i]={};
				arrJson[i].key=codeToSting(arrAll[i].split("=")[0]);
				arrJson[i].value=codeToSting(arrAll[i].split("=")[1]);
			}
			//console.log(arrJson);
			return arrJson;
		}
	}else{//网址中不存在？的时候，返回一个空的东西
		return "";
	}
}
function toCharCode(str){//把汉字转换为Unicode码
	var strCode="";
	for(let i=0;i<str.length;i++){
		strCode+=(str.charCodeAt(i)+5)+"-";//给Unicode码加5,进行加密处理
	}
	//console.log(strCode);
	strCode=strCode.slice(0,strCode.length-1);
	//console.log(strCode);
	
	return strCode;
}

function codeToSting(code){
	//console.log(code);
	var arr=code.split("-");
	var str="";
	for(var i=0;i<arr.length;i++){
		str+=String.fromCharCode(arr[i]-5);
	}
	//console.log(str);
	return str;
}
//示例
/*
 gogogo("bb.html",{
					name:"付正义",
					sex:"男",
					age:"3岁"
				}
 ); 
 */
/*
 var data=getMsgFromLocation();
*/