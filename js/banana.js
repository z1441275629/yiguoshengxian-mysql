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


/********************放大镜**********************/
//在ajax请求之后，图片改变了在创建放大镜
/*var goodsImg=getId("goodsImg");
new ShowBigImg(goodsImg,2,{width:200,height:200});*/

/*******************根据传来的值确定页面的具体内容********************/
var receiveMsg=getMsgFromLocation();
console.log(receiveMsg);
if(receiveMsg==""){
	
}else{
	//console.log(receiveMsg[0].value);
	my_ajax({
		url:"../PHP/getTheGood.php",
		sendContent:"bianhao="+receiveMsg[1].value,
		func:function(str){
			console.log(str);
			//fn(str);//此处的fn与其他引入的js文件中的fn重名了，报错
			changHtmlMsg(str);
		}
	});
}
	
//function fn(str){
function changHtmlMsg(str){
	console.log(eval("("+str+")"));
	var theGood=eval("("+str+")");
	getId("Img").src="../img/"+theGood.img;
	getId("msg").innerHTML=theGood.goodsname;
	getId("price").innerHTML=theGood.price;
	getId("guige").innerHTML=theGood.guige;
	getId("descript").innerHTML=theGood.descript;
	console.log(getClass("addToCar"));
	getClass("addToCar")[0].dataset.bianhao=theGood.bianhao;
	var goodsImg=getId("goodsImg");
	new ShowBigImg(goodsImg,2,{width:200,height:200});
}

var vipCookie=getCookie("vip");
if(vipCookie==""){
	getId("login").innerHTML="登录";
}else{
	getId("login").innerHTML="欢迎你！"+vipCookie;
}
/********************购物车的点击******************/
getId("mycar").onclick=function(){
	location.href="shoppingCar.html";
}
/***************加入购物车的点击******************/

getClass("addToCar")[0].onclick=
function addToCar(){
	var bianhao=getClass("addToCar")[0].dataset.bianhao;
	my_ajax({
		url:"../PHP/addToShopCar.php",
		sendContent:"vip="+getCookie("vip")+"&goodsId="+bianhao+"&count="+getId("goodscount").value,
		func:function(str){
			console.log(str);
			if(str==1){
				console.log("添加成功");
			}else{
				console.log("添加失败");
			}
		}
	});
}
