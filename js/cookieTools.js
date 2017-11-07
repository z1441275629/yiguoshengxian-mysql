
//保存cookie，
//参数：键（字符串）、值（字符串）、过期时间(以天为单位)（数字）
function saveCookie(key,value,baozhiqi){
	var d=new Date();
	d.setDate(d.getDate()+baozhiqi);
	//document.cookie = escape(key)+"="+escape(value)+";expires="+d;//使用escape()加密
	document.cookie = encodeURIComponent(key)+"="+encodeURIComponent(value)+";expires="+d+";path='/yiguoSQL'";
}

//删除cookie
//参数：键（字符串）
//把保质期设置为过去的时间就可以实现删除cookie
function delCookie(key){
	saveCookie(key,"",-1);
}

//获取cookie
//参数：键（字符串）
//返回值：值（字符串）	空字符（""）串代表没有此cookie	其他的字符串代表字符串的值
function getCookie(key){
	//var str=unescape(document.cookie);
	var str=decodeURIComponent(document.cookie);
	var arr=str.split("; ");
	for(var i=0;i<arr.length;i++){
		if(arr[i].indexOf(key+"=")==0){
			//console.log(arr[i].substring(key.length+1));//'159'
			//return arr[i].substring(key.length+1);
			//console.log(arr[i].split("="));//["doubi","159"],所以返回值应该写下标为1
			//return arr[i].split("=")[1];
			//console.log(arr[i].split(key+"="));//["","159"],所以返回值应该写下标为1
			return decodeURIComponent(arr[i].split(key+"=")[1]);
		}
	}
	return "";
}
