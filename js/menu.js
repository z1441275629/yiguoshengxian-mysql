
my_ajax({
	"url":"../json/new_file.json",
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
