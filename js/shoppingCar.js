
var table,trs,check,imgs,descripts,youBis,prices;
var minus,numInput,plus,sums,guiGes,deletes;
_getYuanSu();
function _getYuanSu(){
	table=document.getElementsByTagName("table")[0];
	trs=document.getElementsByTagName("tr");
	
	//ids=document.getElementsByClassName("NO");
	check=document.getElementsByClassName("check");
	imgs=document.getElementsByClassName("img");
	descripts=document.getElementsByClassName("descript");
	youBis=document.getElementsByClassName("youBi");
	prices=document.getElementsByClassName("price");
	minus=document.getElementsByClassName("minus");
	numInput=document.getElementsByClassName("numInput");
	plus=document.getElementsByClassName("plus");
	sums=document.getElementsByClassName("sum");
	guiGes=document.getElementsByClassName("specification");
	
	deletes=document.getElementsByClassName("delete");
}

	var youBiNum=document.getElementById("youBiNum");
	var zongjinge=document.getElementById("zongjinge");
	
	var arr=[];
	var arrStr=[];
	var _cookie=getCookie("goodsInf");
	console.log(_cookie);
	//delCookie("goodsInf");
	/*if(_cookie==""){
		//页面加载的时候计算初始的金额
		/*for(var i=0;i<sums.length;i++){
			var danjia=prices[i].innerHTML.split("￥")[1];
			console.log(danjia);
			var num=numInput[i].value;
			var sum=danjia*num;
			sums[i].innerHTML="￥"+sum;
		}
		*//*
		
		sumAll();
	}else{
		//根据cookie改变页面
			//数据转换string==>Array
		var arr111=JSON.parse(_cookie);
		//console.log(arr111);
		for(var i=0;i<arr111.length;i++){
			check[i].firstElementChild.checked=arr111[i].goodsChecked;
			imgs[i].firstElementChild.src=arr111[i].goodsImg;
			descripts[i].innerHTML=arr111[i].goodsDescript;
			youBis[i].innerHTML=arr111[i].goodsYouBi;
			numInput[i].value=arr111[i].goodsNum;
			prices[i].innerHTML=arr111[i].goodsPrice;
			sums[i].innerHTML=arr111[i].goodsSum;
			guiGes[i].innerHTML=arr111[i].goodsGuiGe;
		}
		sumAll();
	}
	*/
function addEvent(){
	_getYuanSu();
	xiaoji();
	sumAll();
	function xiaoji(){
		for(let i=0;i<sums.length;i++){
			var danjia=prices[i].innerHTML.split("￥")[1];
			console.log(danjia);
			var num=numInput[i].value;
			var sum=danjia*num;
			sum=Math.round(sum*100)/100;
			sums[i].innerHTML="￥"+sum;
		}	
	}
	//加号的点击事件
	for(var i=0;i<plus.length;i++){
		plus[i].index=i;
		plus[i].onclick = function(event){
			var e=event || window.event;
			e.preventDefault;
			this.parentNode.firstElementChild.style.cursor="pointer";
			//改变input的值
			var m=this.index;
			
			numInput[m].value++;
			//计算该商品总价并赋值至页面
				//获取单价
			var danjia=prices[m].innerHTML.split("￥")[1];
			console.log(danjia);
			var num=numInput[m].value;
			var sum=danjia*num;
			sum=Math.round(sum*100)/100;
			sums[m].innerHTML="￥"+sum;
			sumAll();
			//saveToCookie();
		}
	}
	//减号的点击事件
	for(var j=0;j<minus.length;j++){
		minus[j].index=j;
		minus[j].onclick=function(event){
			var e=event || window.event;
			e.preventDefault;
			var n=this.index;
			//var num=numInput[n].value;
			if(numInput[n].value>1){
				this.style.cursor="pointer";
				numInput[n].value--;
			}else{
				this.style.cursor="not-allowed";
			}
			var danjia=prices[n].innerHTML.split("￥")[1];
			console.log(danjia);
			var num=numInput[n].value;
			var sum=danjia*num;
			sum=Math.round(sum*100)/100;
			sums[n].innerHTML="￥"+sum;
			sumAll();
			//saveToCookie();
		}
	}
	//input失去焦点时，先判断内容是否为数字，然后计算总价格
	for(var i=0;i<numInput.length;i++){
		numInput[i].index=i;
		numInput[i].onblur=function(){
			var nn=this.index;
			//console.log(nn);
			if(parseInt(numInput[nn].value)>0){
				var danjia=prices[nn].innerHTML.split("￥")[1];
				//console.log(danjia);
				var num=parseInt(numInput[nn].value);
				numInput[nn].value=num;
				var sum=danjia*num;
				sums[nn].innerHTML="￥"+sum;
			}else{
				numInput[nn].value=1;
				var danjia=prices[nn].innerHTML.split("￥")[1];
				//console.log(danjia);
				var num=parseInt(numInput[nn].value);
				numInput[nn].value=num;
				var sum=danjia*num;
				sum=Math.round(sum*100)/100;
				sums[nn].innerHTML="￥"+sum;
			}
			sumAll();
			//saveToCookie();
		}
	}
	
	/*
	//保存到cookie
	function saveToCookie(){	
		for(var i=0;i<sums.length;i++){
			arr[i]=new Object;
			//arr[i].goodsId=ids[i].innerHTML;
			//arr[i].goodsName=names[i].innerHTML;
			arr[i].goodsDescript=descripts[i].innerHTML;
			arr[i].goodsYouBi=youBis[i].innerHTML;
			arr[i].goodsImg=imgs[i].firstElementChild.src;
			arr[i].goodsPrice=prices[i].innerHTML;
			arr[i].goodsNum=numInput[i].value;
			arr[i].goodsSum=sums[i].innerHTML;
			arr[i].goodsChecked=check[i].firstElementChild.checked;
			arr[i].goodsGuiGe=guiGes[i].innerHTML;
			//arr[i].goodsChecked="true";
				//var strJSON=JSON.stringify(arr[i]);
				//arrStr[i]=strJSON;
		}
		//console.log(arr);
			//var str=arrStr.toString();
		var str=JSON.stringify(arr);
		//console.log(str);
		//console.log(JSON.parse(str));
		saveCookie("goodsInf",str,30);
		sumAll();
	}
	*/
	//计算总金额,和悠币的总量,并赋值到页面上
	function sumAll(){
		var totalSum=0;
		for(let i=0;i<check.length;i++){
			if(check[i].firstElementChild.checked==true){
				totalSum+=Number(sums[i].innerHTML.split("￥")[1]);
				//console.log(Number(sums[i].firstElementChild.innerHTML.split("￥")[1]));
			}
		}
		totalSum=Math.round(totalSum*100)/100;
		zongjinge.innerHTML="￥"+totalSum;
		var zongYouBi=0;
		for(let i=0;i<check.length;i++){
			if(check[i].firstElementChild.checked==true){
				zongYouBi+=Number(youBis[i].innerHTML)*numInput[i].value;
				//console.log(Number(sums[i].firstElementChild.innerHTML.split("￥")[1]));
			}
		}
		zongYouBi=Math.round(zongYouBi*100)/100;
		youBiNum.innerHTML=zongYouBi+"<i style='color:black;font-style:normal;font-size:14px;'>个</i>";
	}
	
	//复选框的点击事件（计算总金额）需要用事件监听的方法写，因为复选框本身有点击事件
	function sumForCheckboxChanged(){
		for(var i=0;i<check.length;i++){
//			check[i].firstElementChild.onclick=function(){
//				sumAll();
//			}
			check[i].adEventLister("click",sumAll,false);
		}
	}
	
	for(var i=0;i<check.length;i++){
		check[i].addEventListener("click",sumAll,false);
		//check[i].addEventListener("click",saveToCookie,false);
		//saveToCookie();
	}
	
	//全选
	var quanxuan=document.getElementById("quanxuan");
	quanxuan.addEventListener("click",_quanxuan,false);
	document.getElementById("selectAll").addEventListener("click",_quanxuan,false);
	function _quanxuan(){
		for(var i=0;i<check.length;i++){
			check[i].firstElementChild.checked=true;
		}
		sumAll();
		//saveToCookie();
	}
	//反选
	/*
	//var fanxuan=document.getElementById("fanxuan");
	//fanxuan.addEventListener("click",_fanxuan,false);
	function _fanxuan(){
		for(var i=0;i<check.length;i++){
			//console.log(check[i].firstElementChild.checked);
			if(check[i].firstElementChild.checked==true){
				check[i].firstElementChild.checked=false;
			}else{
				check[i].firstElementChild.checked=true;
			}
		}
		saveToCookie();
	}
	*/
	
	//点击删除按钮删除一行（删除该商品）
	function deleteGood(){
		//this.parentNode.parentNode.remove();
		//table.deleteRow(this.parentNode.parentNode.rowIndex);
		//this.parentNode.parentNode.remove();
		var bh=this.dataset.goodsbh;
		console.log(bh);//为什么会一次输出好多重复的编号
		my_ajax({
			url:"../PHP/deleteGood.php",
			sendContent:"vip="+getCookie("vip")+"&goodsId="+bh,
			func:function(str){
				console.log(str);
				if(str==1){
					console.log("删除成功");
					this.parentNode.parentNode.remove();//后台删了再删除页面上的
				}else{
					console.log("删除失败");
				}
			}
		})
		
		_getYuanSu();
		sumAll();
		//delCookie("goodsInfo");
		//saveToCookie();
	}
	for(var i=0;i<deletes.length;i++){
		deletes[i].addEventListener("click",deleteGood,false);
	}
	//删除选中的商品
	function deleteSelectGood(){
		//this.parentNode.parentNode.remove();
		let oLenth=check.length;
		//console.log(check);
		//console.log(oLenth);
		for(let i=oLenth-1;i>=0;i--){
			//console.log(check[i].firstElementChild.checked);
			if(check[i].firstElementChild.checked==true){
				//table.deleteRow(i+1);
				let checkboxBH=check[i].firstElementChild.dataset.goodsbh;
				//console.log(checkboxBH);
				my_ajax({
					url:"../PHP/deleteGood.php",
					sendContent:"vip="+getCookie("vip")+"&goodsId="+checkboxBH,
					func:function(str){
						console.log(str);
						if(str==1){
							console.log("删除成功");
							//console.log(check[i].parentNode);
							check[i].parentNode.remove();
						}else{
							console.log("删除失败");
						}
					}
				})
				//check[i].parentNode.parentNode.remove();
			}
		}
		_getYuanSu();
		sumAll();
		//delCookie("goodsInfo");
		//saveToCookie();
	}
	document.getElementById("deleteSelect").addEventListener("click",deleteSelectGood,false);
	//删除所有的商品
	function deleteAllGood(){
		//this.parentNode.parentNode.remove();
//		for(let i=check.length-1;i>=0;i--){
//			check[i].parentNode.remove();
//		}
		let oLenth=check.length;
		for(let i=oLenth-1;i>=0;i--){
			
			//table.deleteRow(i+1);
			let checkboxBH=check[i].firstElementChild.dataset.goodsbh;
			//console.log(checkboxBH);
			my_ajax({
				url:"../PHP/deleteGood.php",
				sendContent:"vip="+getCookie("vip")+"&goodsId="+checkboxBH,
				func:function(str){
					console.log(str);
					if(str==1){
						console.log("删除成功");
						//console.log(check[i].parentNode);
						check[i].parentNode.remove();//只能一个一个删除，或者在所有ajax请求结束之后再删除所有的
					}else{
						console.log("删除失败");
					}
				}
			});
				//check[i].parentNode.parentNode.remove();
			
		}
		
		_getYuanSu();
		sumAll();
		//delCookie("goodsInfo");
	}
	document.getElementById("deleteAll").addEventListener("click",deleteAllGood,false);
	
	
	
	//求所选东西的总数量
	function zongLiang(){
		var zongjianshu=0;
		for(var i=0;i<numInput.length;i++){
			if(check[i].firstElementChild.checked==true){
				zongjianshu+=Number(numInput[i].value);
			}
		}
	}
}	

//动态创建购物车的页面元素
	//传入的data是一个json对象，包含以下信息imgSrc,descript,youbi,price(格式为￥31.88),num,guige
function addToMyCar(data){
	var flag=false;//flag为true代表购物车已经有此商品
	var index;//存在商品的序号
	for(let i=0;i<descripts.length;i++){
		if(data.descript==descripts[i].innerHTML){
			flag=true;
			index=i;
			break;
		}
	}
	//默认值设置youbi=0;guige="";num=1;
	var defaultValue={
		youbi:0,
		num:1,
		guige:""
	}
	for(let key in data){
		defaultValue[key] = data[key];
	}
	//先看一下购物车中是否有此商品，根据descript判断
	
	if(flag){//有的话就增加数量。而不是创建一行
		numInput[index].value=Number(numInput[index].value)+data.num;
	}else{//没有此商品，增加一行
		let oTr=document.createElement("tr");
		table.firstElementChild.appendChild(oTr);
		let oTd1=document.createElement("td");
		oTd1.className="check";
		oTd1.innerHTML="<input type='checkbox' checked data-goodsBH="+defaultValue.goodsBH+" />";
		//个checkbox一个自定义属性，记录商品编号，以供删除
		oTr.appendChild(oTd1);
		
		let oTd2=document.createElement("td");
		oTd2.className="img";
		oTd2.innerHTML="<img src='"+defaultValue.imgSrc+"' />";
		oTr.appendChild(oTd2);
		
		let oTd3=document.createElement("td");
		oTd3.className="descript";
		oTd3.innerHTML=defaultValue.descript;
		oTr.appendChild(oTd3);
		
		let oTd4=document.createElement("td");
		oTd4.className="youBi";
		oTd4.innerHTML=defaultValue.youbi;
		oTr.appendChild(oTd4);
		
		let oTd5=document.createElement("td");
		oTd5.className="price";
		oTd5.innerHTML=defaultValue.price;
		oTr.appendChild(oTd5);
		
		let oTd6=document.createElement("td");
		oTd6.className="num";
		oTd6.innerHTML="<div><span class='minus'>-</span><input type='text' class='numInput' value='"+defaultValue.num+"'/><span class='plus'>+</span></div>";
		oTr.appendChild(oTd6);
		
		let oTd7=document.createElement("td");
		oTd7.className="sum";
		oTd7.innerHTML="￥"+Math.round((defaultValue.price.split("￥")[0])*defaultValue.num*100)/100;//通过计算得到
		oTr.appendChild(oTd7);
		
		let oTd8=document.createElement("td");
		oTd8.className="specification";
		oTd8.innerHTML=defaultValue.guige;
		oTr.appendChild(oTd8);
		
		let oTd=document.createElement("td");
		oTd.className="operate";
		oTd.innerHTML="<a href='###'>移入收藏</a><a href='###' data-goodsBH="+defaultValue.goodsBH+" class='delete'>删除</a>";//添加一个自定义的属性，存放商品编号，以供删除的时候用
		oTr.appendChild(oTd);
	}	
	_getYuanSu();
	//saveToCookie();
}
/*
addToMyCar({
	imgSrc:"../img/logo.png",
	price:"￥5",
	descript:"新加的商品1",
	guige:"6个/份",
	num:2
});
addToMyCar({
	imgSrc:"../img/logo.png",
	price:"￥55",
	descript:"新加的商品2",
	guige:"6个/份",
	num:2
});
addToMyCar({
	imgSrc:"../img/logo.png",
	price:"￥55",
	descript:"新加的商品2",
	guige:"6个/份",
	num:2
});
addToMyCar({
	imgSrc:"../img/logo.png",
	price:"￥33",
	descript:"新加的商品3",
	guige:"12个/份",
	num:20
});
*/


//先根据cookie的用户名在购物车数据库表中查找此用户的所有商品，
//根据返回的商品编号请求商品详情，返回的商品数量直接用
var vipTel=getCookie("vip");
console.log(vipTel);
my_ajax({
	url:"../PHP/getVipGoods.php",
	sendContent:"vip="+vipTel,
	func:function(str){
		console.log(str);
		var data=eval("("+str+")");
		console.log(data);
		for(let i=0;i<data.length;i++){
			let bianhao=data[i].goodsid;
			console.log(bianhao);
			my_ajax({
				url:"../PHP/getTheGood.php",
				sendContent:"bianhao="+bianhao,
				func:function(str){
					console.log(str);
					let goodMsg=eval("("+str+")");
					console.log(goodMsg);
					addToMyCar({
						imgSrc:"../img/"+goodMsg.img,
						price:"￥"+goodMsg.price,
						descript:goodMsg.descript,
						guige:goodMsg.guige,
						goodsBH:goodMsg.bianhao,
						num:data[i].goodscount//数量应该是请求购物车表获取的
					});
					addEvent();//给新加的东西加事件	
				}
			});
		}
	
	}
});
