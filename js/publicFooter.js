function getId(id){
	return document.getElementById(id);
}
function getTag(parentNode,tagName){
	//console.log(arguments.length+","+arguments[0]+","+tagName)
	if(arguments.length==1){
		tagName=arguments[0];//这一句要放到下一句的前面，否则arguments将会改变
		parentNode=document;
	}
	//console.log(parentNode+","+tagName)
	return parentNode.getElementsByTagName(tagName);
}
function getClass(parentNode,class_name){
	if(arguments.length==1){
		class_name=arguments[0];
		parentNode=document;
	}
	var allTag=parentNode.getElementsByTagName("*");
	var arr=[];
	for(let i=0;i<allTag.length;i++){
		if(allTag[i].className==class_name){
			arr.push(allTag[i]);
		}
	}
	return arr;
}

/*****************服务背景图的设置************************/
var footer_service=getId("footer_service").getElementsByTagName("li");
for(let i=0;i<footer_service.length;i++){
	footer_service[i].style.backgroundPosition="0px "+(-1*42*i)+"px";
}
/******************底部服务背景图设置***********************/
var footer_guide=getId("footer_guide").getElementsByTagName("dl");
for(let i=0;i<footer_guide.length;i++){
	footer_guide[i].getElementsByTagName("dt")[0].style.backgroundPositionY=(-1*i*23)+"px";
}
/********************几楼的背景图设置**********************/