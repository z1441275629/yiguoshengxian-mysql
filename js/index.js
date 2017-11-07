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
		tagName=arguments[0];
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

/****************接收登录信息*****************/
if(location.href.search(/_hbt/)==-1){//去除从HBuilder打开时_hbt对应的key;
	var msg=getMsgFromLocation();
	console.log(msg);
	//console.log(msg[0].value);
	if(msg!=""){
			console.log(msg[0].value);
			saveCookie("vip",msg[0].value,7);
	}
}



/*************楼层效果*******************/
var floor_guide=getId("floor_guide").getElementsByTagName("li");
var floor=[];
var curFloor=-1;
for(i=1;i<=10;i++){
	floor.push(getId("floor"+i));
}
console.log(floor);
console.log(floor_guide);
/*new FloorEffect({
	
});*/
for(let i=0;i<floor_guide.length;i++){
	floor_guide[i].s=floor[i].offsetTop;
	floor_guide[i].onclick=function(){
		(document.documentElement.scrollTop=floor[i].offsetTop) || (document.body.scrollTop=floor[i].offsetTop);
		
	}
}
window.onscroll=function(event){
	var scrollTop=document.documentElement.scrollTop|| document.body.scrollTop;
	//当滚动条到一楼上面的50px的时候显示
	//console.log(scrollTop+","+(floor[0].offsetTop-50))
	if(scrollTop>=floor[0].offsetTop-50){
		//console.log(document.getElementsByClassName("floor_guide"));
		document.getElementsByClassName("floor_guide")[0].style.display="block";
	}else{
		document.getElementsByClassName("floor_guide")[0].style.display="none";
	}
	for(j=0;j<floor_guide.length;j++){
		floor_guide[j].style.background="";
		floor_guide[j].style.color="";
		floor_guide[j].getElementsByTagName("b")[0].style.display="inline-block";
		floor_guide[j].getElementsByTagName("span")[0].style.display="none";
		//floor_guide[j].getElementsByTagName("b")[0].getElementsByTagName("i")[0].style.display="inline-block";
	}
	
	for(let i=0;i<floor_guide.length;i++){
		if(scrollTop>=floor[i].offsetTop && scrollTop<floor[i].offsetTop+floor[i].offsetHeight){
			//console.log(floor_guide[i].getElementsByTagName("span")[0]);
			curFloor=i;
			floor_guide[i].style.background="#007F4D";
			floor_guide[i].style.color="#fff";
			floor_guide[i].getElementsByTagName("b")[0].style.display="none";
			floor_guide[i].getElementsByTagName("span")[0].style.display="inline-block";
			return;
		}
	}
}
for(let i=0;i<floor_guide.length;i++){
	floor_guide[i].onmouseover=function(){
		for(let j=0;j<floor_guide.length;j++){
			if(j!=curFloor){
				floor_guide[j].style.background="";
				floor_guide[j].style.color="";
				floor_guide[j].getElementsByTagName("b")[0].style.display="inline-block";
				floor_guide[j].getElementsByTagName("span")[0].style.display="none";
			}
		}
		floor_guide[i].style.background="#007F4D";
		floor_guide[i].style.color="#fff";
		floor_guide[i].getElementsByTagName("b")[0].style.display="none";
		floor_guide[i].getElementsByTagName("span")[0].style.display="inline-block";
	}
	floor_guide[i].onclick=function(){
		//console.log(document.documentElement.scrollTop);
		if(document.documentElement.scrollTop>=0){
			let speed=(floor[i].offsetTop-document.documentElement.scrollTop)/40;
			//console.log(speed);
			let timer=setInterval(function(){
				if(speed>=0){
					if(document.documentElement.scrollTop<floor[i].offsetTop){
						document.documentElement.scrollTop+=speed;
					}else{
						clearInterval(timer);
					}
				}else{
					if(document.documentElement.scrollTop>floor[i].offsetTop){
						document.documentElement.scrollTop+=speed;
					}else{
						clearInterval(timer);
					}
				}
				
			},10);
		}else{
			let speed=(floor[i].offsetTop-document.body.scrollTop)/40;
			let timer=setInterval(function(){
				if(speed>=0){
					if(document.body.scrollTop<floor[i].offsetTop){
						document.body.scrollTop+=speed;
					}else{
						clearInterval(timer);
					}
				}else{
					if(document.body.scrollTop>floor[i].offsetTop){
						document.body.scrollTop+=speed;
					}else{
						clearInterval(timer);
					}
				}
				
			},10);
		}
	}
}
/***************楼层的背景图设置**********************/
for(let i=0;i<floor_guide.length;i++){
	floor_guide[i].getElementsByTagName("b")[0].style.backgroundPosition=(-1*i*40)+"px 0px";
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
var h2=getTag("h2");
//console.log(h2);
for(let i=0;i<h2.length-1;i++){
	h2[i].getElementsByTagName("a")[0].getElementsByTagName("i")[0].style.backgroundPositionX=(-1*i*46)+"px";
}
//10楼特殊照顾
h2[9].getElementsByTagName("a")[0].getElementsByTagName("i")[0].style.backgroundPositionX="-530px";
h2[9].getElementsByTagName("a")[0].getElementsByTagName("i")[0].style.width="56px";

//轮播图构造函数
	//传入的_obj包含{imgArr,doudouObj,URLarr,Dom,timeSpace,}
function fadeInFadeOut(_obj){
	var obj={//默认参数设置
		timeSpace:1000,
		doudouObj:{
			width:20,
			height:20,
			space:10,
			bgColor:"#ccc",
			highBgColor:"red"
		},
		transitionTime:"1.5s",
		transformBig:1.1,//变大的倍率scale（）
		transformSmall:0.5,//变小的倍率scale（）
		URLarr:[]	
	}
	for(let key in _obj){//传递参数
		obj[key] = _obj[key]; 
	}
	for(let key in obj){//相当于this.width=obj.width
		this[key] = obj[key];
	}
	
	//全局变量
	this.timer = null;
	this.leftBtn = null;
	this.rightBtn = null;
	this.imgUl = null;
	this.doudouUl = null;
	this.curOrd=0;
	this.initUI();
	this.imgs=this.Dom.getElementsByTagName("img");
	this.lis=this.Dom.getElementsByTagName("li");
	this.initEvent();
}
fadeInFadeOut.prototype={
	//初始化界面//创建页面
	initUI:function(){
		this.Dom.style.overflow="hidden";
		// 创建span
		this.leftBtn=document.createElement("span");
		this.leftBtn.style.cssText="display:none;position:absolute;"
		+"top:50%;margin-top:-25px;left:0px;width:50px;height:50px;text-align:center;"
		+"z-index:100;border-radius:50%;font-size:40px;font-weight:bolder;"
		+"background:rgba(0,0,0,0.5);color:white;line-height:50px;";
		this.leftBtn.innerHTML="<";
		this.Dom.appendChild(this.leftBtn);
		this.rightBtn=document.createElement("span");
		
		this.rightBtn.style.cssText="display:none;position:absolute;"
		+"top:50%;margin-top:-25px;right:0px;width:50px;height:50px;text-align:center;"
		+"z-index:100;border-radius:50%;font-size:40px;font-weight:bolder;"
		+"background:rgba(0,0,0,0.5);color:white;line-height:50px;";
		this.rightBtn.innerHTML=">";
		this.Dom.appendChild(this.rightBtn);
		//添加图片
		for(var i=0;i<this.imgArr.length;i++){
			let oImg=document.createElement("img");
			oImg.src=this.imgArr[i];
			oImg.style.cssText="transition:"+this.transitionTime+";position:absolute;left:0px;top:0px;width:100%;height:100%;opacity: 0;";
			this.Dom.appendChild(oImg);
		}
			//给第一个图片设置图明度，让它先显示出来
		this.Dom.getElementsByTagName("img")[0].style.opacity=1;//让第一张图片显示出来
		this.curOrd=0;
		//添加豆豆
		this.doudouUl=document.createElement("ul");
		this.doudouUl.style.cssText="position: absolute;z-index:100;bottom: 10px;"
		+"width:"+this.imgArr.length*(this.doudouObj.width+this.doudouObj.space)+"px;"
		+"left: 50%;margin-left:"+-1*(this.imgArr.length*(this.doudouObj.width+this.doudouObj.space)/2)+"px;";
		this.Dom.appendChild(this.doudouUl);
		for(let i=0;i<this.imgArr.length;i++){
			let oLi=document.createElement("li");
			oLi.style.cssText="background: "+this.doudouObj.bgColor+";float:left;border-radius:50%;"
			+"margin-left:"+this.doudouObj.space+"px;opacity:0.5;"
			+"width:"+this.doudouObj.width+"px;height:"+this.doudouObj.height+"px;";
			this.doudouUl.appendChild(oLi);
		}
			//给第一个li设置高亮状态
		this.doudouUl.getElementsByTagName("li")[0].style.background=this.doudouObj.highBgColor;
	},
	
	//向左播
	toLeft:function(){
		//改变图片
		this.curOrd--;
		if(this.curOrd<0){
			this.curOrd=this.imgArr.length-1;
		}
		//把所有的图片的透明度全设置为0，思路同豆豆li的高亮设置
		/*for(i=0;i<this.imgs.length;i++){
			this.imgs[i].style.opacity=0;
		}*/
		//move(this.imgs[(this.curOrd+1)%this.imgArr.length],{opacity:0,width:this.Dom.offsetWidth*0.5,height:this.Dom.offsetHeight*0.5});
		//move(this.imgs[this.curOrd],{opacity:1,width:this.Dom.offsetWidth*1.5,height:this.Dom.offsetHeight*1.5});
		this.imgs[(this.curOrd+1)%this.imgArr.length].style.transform="scale("+this.transformSmall+")";
		this.imgs[(this.curOrd+1)%this.imgArr.length].style.opacity=0;
		
		this.imgs[this.curOrd].style.transform="scale("+this.transformBig+")";
		this.imgs[this.curOrd].style.opacity=1;
		//改变豆豆背景色
		for(i=0;i<this.imgs.length;i++){
			this.lis[i].style.background=this.doudouObj.bgColor;
		}
		this.lis[this.curOrd].style.background=this.doudouObj.highBgColor;
	},
	
	//向右播
	toRight:function(){
		//改变图片
		this.curOrd++;
		if(this.curOrd>=this.imgArr.length){
			this.curOrd=0;
		}
		//把所有的图片的透明度全设置为0，思路同豆豆li的高亮设置
		/*for(i=0;i<this.imgs.length;i++){
			this.imgs[i].style.opacity=0;
		}*/
		let that1=this;
		//margin-left:"+(-1*oImg.offsetWidth)/2+"+px;
		for(let i=0;i<this.imgs.length;i++){
			this.imgs[i].style.left="50%";
			this.imgs[i].style.marginLeft=(-1*this.imgs[i].offsetWidth)/2+"px";
		}
		this.imgs[(this.curOrd+this.imgArr.length-1)%this.imgArr.length].style.transform="scale("+this.transformSmall+")";
		this.imgs[(this.curOrd+this.imgArr.length-1)%this.imgArr.length].style.opacity=0;
		
		this.imgs[this.curOrd].style.transform="scale("+this.transformBig+")";
		this.imgs[this.curOrd].style.opacity=1;
		//改变豆豆背景色
		for(i=0;i<this.imgs.length;i++){
			this.lis[i].style.background=this.doudouObj.bgColor;
		}
		this.lis[this.curOrd].style.background=this.doudouObj.highBgColor;
	},
	//跳转至指定页面
	toSelect:function(aimOrd){
		//改变图片
		//move(this.imgs[this.curOrd],{opacity:0});
		//move(this.imgs[aimOrd],{opacity:1});
		this.imgs[this.curOrd].style.transform="scale("+this.transformSmall+")";
		this.imgs[this.curOrd].style.opacity=0;
		
		this.imgs[aimOrd].style.transform="scale("+this.transformBig+")";
		this.imgs[aimOrd].style.opacity=1;
		this.curOrd=aimOrd;
		//改变豆豆背景色
		for(i=0;i<this.imgs.length;i++){
			this.lis[i].style.background=this.doudouObj.bgColor;
		}
		this.lis[this.curOrd].style.background=this.doudouObj.highBgColor;
		
	},
	go:function(){
		let that2=this;
		move(that2.imgs[that2.curOrd],{opacity:1,width:that2.Dom.offsetWidth*1.5,height:that2.Dom.offsetHeight*1.5});
	},
	//初始化事件
	initEvent:function(){
		let obj=this;
		//左箭头点击
		this.leftBtn.onclick=function(){
			obj.toLeft();
		}
		
		//右箭头的点击
		this.rightBtn.onclick=function(){
			obj.toRight();
		}
			
		
		//豆豆的鼠标移入
		for(let i=0;i<this.lis.length;i++){
			//this.lis[i].index=i;
			this.lis[i].onmouseover=function(){
				obj.toSelect(i);
			}
		}
		
		
		//容器的鼠标移入
		this.Dom.onmouseover=function(){
			clearInterval(obj.timer);
			obj.leftBtn.style.display = "block";
			obj.rightBtn.style.display = "block";
		}
		/*this.Dom.onmousemove=function(){
			clearInterval(obj.timer);
		}*/
		
		//容器的鼠标移出
		this.Dom.onmouseout=function(){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){obj.toRight();},obj.timeSpace);
			obj.leftBtn.style.display = "none";
			obj.rightBtn.style.display = "none";
		}
		/**/
		//页面加载时(自动播放)
//？？？		//this.timer=setInterval(obj.toRight,obj.timeSpace);
//Uncaught TypeError: Cannot read property 'length' of undefined at toRight (fadeInFadeOut.js:95)
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){obj.toRight();},obj.timeSpace);
		//这样写的话调用的对象是obj,里面的this不会转移，直接写成obj.roRight的话，调用的对象就变成了window,this会转移
	}
}


//调用轮播图
new fadeInFadeOut({
	imgArr:["img/9288706408260236_500.jpg","img/9288707492487848_500.jpg","img/9288710932505346_500.jpg","img/9288711999726360_500.jpg","img/9288712231232287.jpg"],
	Dom:document.getElementsByClassName("banner")[0],
	timeSpace:3000,
	doudouObj:{
		width:10,
		height:10,
		space:10,
		bgColor:"red",
		highBgColor:"blue"
	},
	transformBig:1.1,
	transformSmall:1.2,
	transitionTime:"1.0s"
});


my_ajax({
	"url":"json/new_file.json",
	"func":fn
});
var menuUl=document.getElementById("menuList");
function fn(str){
	//console.log(str);
	let data=JSON.parse(str);
	console.log(data);
	let arrData=data.Catrgories;
	console.log(arrData);
	for(let i=0;i<arrData.length;i++){
		//主要菜单列表
		let oLi=document.createElement("li");
		oLi.innerHTML="<p><b class='nav_icon'></b><span>"+arrData[i].CategoryName+"</span><i>&nbsp;&nbsp;&nbsp;&nbsp;&gt;</i></p>";
		menuUl.appendChild(oLi);
		//创建右边的显示区域
		let oDiv=document.createElement("div");
		oDiv.className="subMenu";
		oLi.appendChild(oDiv);
		//右边显示区域的头部
		let oh3=document.createElement("h2");
		oh3.innerHTML=arrData[i].CategoryName;
		oDiv.appendChild(oh3);
		//添加子菜单的内容
		let arrSubData=arrData[i].SubCategory0;
		//console.log(arrSubData);
		let oSubUl=document.createElement("ul");
		oDiv.appendChild(oSubUl);
		for(let j=0;j<arrSubData.length;j++){
			let oSubLi=document.createElement("li");
			oSubLi.innerHTML=arrSubData[j].CategoryName;
			oSubUl.appendChild(oSubLi);
		}
		//添加图片
		let oImg=document.createElement("img");
		//console.log(arrData[i].CategoryImageAd);
		if(arrData[i].CategoryImageAd[0]){//即烹美食没有这一个
			oImg.src=arrData[i].CategoryImageAd[0].Image;
		}else{
			oImg.src="";
		}
		oDiv.appendChild(oImg);
	}
	
	var nav_icons=document.getElementsByClassName("nav_icon");
	console.log(nav_icons);
	for(let i=0;i<nav_icons.length;i++){
		if(i<4){
			nav_icons[i].style.backgroundPositionX=(-1*i*24)+"px";
		}else if(i==4){
			nav_icons[i].style.backgroundPositionX="0px";
		}else{
			nav_icons[i].style.backgroundPositionX=(-1*(i-1)*24)+"px";
		}
		
	}
}

/*******************搜索框的设置***************************/
var searchInput=document.getElementById("searchInput");
var searchDiv=document.getElementById("searchDiv");
var initOffsetTop=searchDiv.offsetTop;
console.log(initOffsetTop);
	//onfocus背景为白色
	searchInput.onfocus=function(){
		searchInput.style.background="#fff";
	}
	//onblur背景为绿色
	searchInput.onblur=function(){
		searchInput.style.background="#e0e0e0";
	}
	//滚轮滚动到一定程度时固定定位(通过增删class实现)
	function fixSearch(){
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop>=initOffsetTop){
			//searchDiv.className += " fixed";//会有很多的fixed
			searchDiv.className = "search fixed";
			//searchDiv.style.background="rgba(120,120,120,0.5)";//写到css中
		}else{
			searchDiv.className="search";
			//searchDiv.style.background="rgba(120,120,120)";//写到css中
		}
	}
//前面用过window.onscroll了，用事件监听
window.addEventListener("scroll",fixSearch,false);

/*****************回到顶部*****************/
var goTop=document.getElementById("goTop");
goTop.onclick=function(){
	let timer=null;
	clearInterval(timer);
	let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	//move(window,{scrollTop:0});
	let speed=scrollTop/50;
	let count=0
	timer=setInterval(function(){
		count++;
		//console.log(count);
		if(count<=50){
			scrollTop -= speed;
			(document.documentElement.scrollTop=scrollTop) || (document.body.scrollTop=scrollTop);
		}else{
			clearInterval(timer);
		}
	},16);
}

//当滚动条的距离小于200px的时候隐藏，超过的时候显示回到顶部
function toggleGoTop(){
	let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop<=500){
		goTop.style.visibility="hidden";
		//move(goTop,{opacity:0});
	}else{
		goTop.style.visibility="visible";
		//move(goTop,{opacity:1});
	}
}
window.addEventListener("scroll",toggleGoTop,false);
/********************联系客服*************/

/**********登录的点击***************/
document.getElementById("login").onclick=function(){
	window.location="html/login.html";
}
document.getElementById("reg").onclick=function(){
	window.location="html/register.html";
}

/***************根据cookie改变网页头******************/
var vipCookie=getCookie("vip");
if(vipCookie==""){
	getId("login").innerHTML="[登录]";
}else{
	getId("login").innerHTML="欢迎你！"+vipCookie;
}


/********************购物车的点击******************/
getId("mycar").onclick=function(){
	location.href="html/shoppingCar.html";
}
