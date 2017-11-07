
function createEle(tagName){
	return document.createElement(tagName);
}
function getId(id){
	return document.getElementById(id);
}
//获取所有的商品
window.onload=function(){
	//加载页面
	my_ajax({
		"url":"../PHP/getGoods.php",
		"func":function(str){
			//console.log(str);
			console.log(eval("("+str+")"));
			//console.log(JSON.parse(str));
			var data=eval("("+str+")");
			//加载页面
			initUI(data);
			//加入购物车的点击
			addGood();
			//图片的点击：跳转到详情页
			goToDetail();
			//商品描述的点击：跳转到详情页
			goToTheHtml();
		}
	});
	
	//加入购物车的点击（在加载页面之后进行）
	//图片的点击，跳转到详情页
}
var vipTel=getCookie("vip");
console.log("vip="+vipTel);
function goToDetail(){//j_product_img
	var detail=document.getElementsByClassName("j_product_img");
	console.log(detail);
	var lenth=detail.length;
	for(let i=0;i<lenth;i++){
		detail[i].onclick=function(){
			gogogo("banana.html",{
				vip:"18829719678",
				bianhao:this.dataset.bianhao
			});	
		}
	}
}
function goToTheHtml(){//j_product_img
	var goToDetailHtml=document.getElementsByClassName("goToDetailHtml");
	console.log(goToDetailHtml);
	var lenth=goToDetailHtml.length;
	for(let i=0;i<lenth;i++){
//		goToDetailHtml[i].onclick=function(){
//			gogogo("banana.html",{
//				vip:"18829719678",
//				bianhao:this.dataset.bianhao
//			});	
//		}
	//用事件监听
		goToDetailHtml[i].addEventListener("click",function(){gogogo("banana.html",{
				vip:"18829719678",
				bianhao:this.dataset.bianhao});
			},false)
	}
}
function addGood(){
	var addToCar=document.getElementsByClassName("btn-buy");
	console.log(addToCar);
	var lenth=addToCar.length;
	for(let i=0;i<lenth;i++){
		addToCar[i].onclick=function(){
			//加入购物车
			my_ajax({
				"url":"../PHP/addToShopCar.php",
				//暂时先把会员名写成死的
				//"sendContent":"vip="+"18829719678"+"&goodsId="+this.dataset.bianhao+"&count=1",
				"sendContent":"vip="+getCookie("vip")+"&goodsId="+this.dataset.bianhao+"&count=1",
				"func":function(str){
					console.log(str);
					if(str==1){
						alert("加入购物车成功！");
					}else{
						alert("加入购物车失败");
					}
				}
			});
			
		}
	}
}
function initUI(data){
	for(var i=0;i<data.length;i++){
		//创建li
		var oLi=createEle("li");
		oLi.className="product_item j_product";
		getId("goods_list").appendChild(oLi);
		//创建div.p_img clearfix
		var oDiv1=createEle("div");
		oDiv1.className="p_img clearfix";
		oLi.appendChild(oDiv1);
			//创建a
			var oA1=createEle("a");
			oA1.href="javascript:;";
			oA1.target="_blank";
			oDiv1.appendChild(oA1);	
				//	创建img
				var oImg1=createEle("img");
				oImg1.src="../img/"+data[i].img;
				oImg1.style.width="290px";
				oImg1.style.height="290px";
				oImg1.dataset.bianhao=data[i].bianhao;
				oImg1.className="j_product_img";
				oA1.appendChild(oImg1);
		//创建div.p_info clearfix
		var oDiv2=createEle("div");
		oDiv2.className="p_info clearfix";
		oLi.appendChild(oDiv2);
			//创建div.p_name
			var oDiv21=createEle("div");
			oDiv21.className="p_name";
			oDiv2.appendChild(oDiv21);
				//创建a
				var oA2=createEle("a");
				oA2.href="javascript:;";
				oA2.target="_blank";
				oA2.className="goToDetailHtml";
				oA2.innerHTML=data[i].goodsname;
				oA2.dataset.bianhao=data[i].bianhao;
				oDiv21.appendChild(oA2);
			//创建div.p_price
			var oDiv22=createEle("div");
			oDiv22.className="p_price";
			oDiv2.appendChild(oDiv22);
				//创建span.price
				var oSpan=createEle("span");
				oSpan.className="price";
				oDiv22.appendChild(oSpan);
					//创建strong
					var oStrong=createEle("strong");
					oStrong.innerHTML="￥"+data[i].price;
					oSpan.appendChild(oStrong);
		//创建div.p-buy
		var oDiv3=createEle("div");
		oDiv3.className="p-buy";
		oLi.appendChild(oDiv3);
			//创建span
			var oSpan31=createEle("span");
			oSpan31.innerHTML=data[i].descript;
			oDiv3.appendChild(oSpan31);
			//创建a
			var oA31=createEle("a");
			oA31.className="btn-buy";
			oA31.dataset.bianhao=data[i].bianhao;//自定义属性，商品编号
			oA31.href="javascript:;";
			oA31.innerHTML="加入购物车";
			oDiv3.appendChild(oA31);	
	}
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