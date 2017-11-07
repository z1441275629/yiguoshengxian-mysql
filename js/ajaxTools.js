function my_ajax(_obj){
	//获取参数：没有传入的设置默认值
	var obj={
		method:"get",
		sendContent:"",
		isAsyn:true,//asynchronization 异步	 asynchronous 异步的
		func:null
	}
	for(let key in _obj){
		obj[key]=_obj[key];
	}
	//ajax请求
	var xhr= new XMLHttpRequest();
	if(obj.method.toLowerCase()=="get"){
		xhr.open(obj.method.toUpperCase(),obj.url+"?"+obj.sendContent,obj.isAsyn);
		xhr.send();
	}else if(obj.method.toLowerCase()=="post"){
		xhr.open(obj.method.toUpperCase(),obj.url,obj.isAsyn);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(obj.sendContent);
	}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			obj.func(xhr.responseText);
			//console.log("交互完成");
		}
	}
}