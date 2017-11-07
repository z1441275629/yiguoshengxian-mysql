
var imgYzm=getId("imgYzm");
var tr_imgYzm=getClass("imgYzm")[0];

var phone=getId("phone");
var tr_phone=getClass("phone")[0];

var phoneYzm=getId("phoneYzm");
var getYzm=getId("getYzm");
var tr_phoneYzm=getClass("phoneYzm")[0];

var tr_pass=getClass("pass")[0];
var pass=getId("pass");

var surePass=getId("surePass");
var tr_surePass=getClass("surePass")[0];

var yaoQinMa=getId("yaoQinMa");
var tr_yaoQinMa=getClass("yaoQinMa")[0];

var regPhone=/^1[345789]\d{9}$/;
var regPass1=/((?=[\x21-\x7e]+)[^A-Za-z0-9])/;//特殊字符
var regPass2=/[a-zA-Z]/;//字母
var regPass3=/\d/;//数字
//验证手机号
phone.onfocus=function(){
	phone.flag=0;
	tr_phone.getElementsByTagName("td")[2].style.visibility="hidden";
	phone.onblur=function(){
		tr_phone.getElementsByTagName("td")[2].style.visibility="visible";
		if(phone.value==""){
			tr_phone.getElementsByTagName("td")[2].innerHTML="手机号不能为空";
		}else{
			let res=regPhone.test(phone.value);
			
			if(res){//发送ajax请求，验证手机号是否已经被注册
				//alert("是不是这？");
				my_ajax({
					"url":"../PHP/regTel.php",
					"sendContent":"tel="+phone.value,
					"func":fn
				});
				
			}else{
				tr_phone.getElementsByTagName("td")[2].innerHTML="手机号不正确";
			}
		}
	}
}
function fn(str){
	if(str==1){
		tr_phone.getElementsByTagName("td")[2].innerHTML="手机号已经被使用";
	}else{
		tr_phone.getElementsByTagName("td")[2].innerHTML="手机号可以使用";
		phone.flag=1;
	}
}
//验证密码
pass.onfocus=function(){
	pass.flag=0;
	tr_pass.getElementsByTagName("td")[2].style.visibility="hidden";
	pass.onblur=function(){
		tr_pass.getElementsByTagName("td")[2].style.visibility="visible";
		let mima=pass.value;
		//true转化为数字为1，false转化为数字为0
		let res=Number(regPass1.test(mima))+Number(regPass2.test(mima))+Number(regPass3.test(mima));
		//console.log(true+true);//2
		//console.log(true+false);//1
		if(mima.length<6 || mima.length>20){
			tr_pass.getElementsByTagName("td")[2].innerHTML="密码长度不正确";
		}else{
			switch(res){
				case 1:tr_pass.getElementsByTagName("td")[2].innerHTML="密码强度低";pass.flag=1;break;
				case 2:tr_pass.getElementsByTagName("td")[2].innerHTML="密码强度中";pass.flag=1;break;
				case 3:tr_pass.getElementsByTagName("td")[2].innerHTML="密码强度高";pass.flag=1;break;
				default:;break;
			}
		}
	}
}
//发送手机验证码
surePass.onfocus=function(){
	surePass.flag=0;
	tr_surePass.getElementsByTagName("td")[2].style.visibility="hidden";
	surePass.onblur=function(){
		tr_surePass.getElementsByTagName("td")[2].style.visibility="visible";
		if(surePass.value!=""){
			if(surePass.value==pass.value){
				tr_surePass.getElementsByTagName("td")[2].innerHTML="密码验证通过";
				surePass.flag=1;
			}else{
				tr_surePass.getElementsByTagName("td")[2].innerHTML="两次密码不一致";
			}
		}else{
			tr_surePass.getElementsByTagName("td")[2].innerHTML="密码去哪了？？？";
		}
	}
}
//图片验证码验证
imgYzm.onfocus=function(){
	imgYzm.flag=0;
	tr_imgYzm.getElementsByTagName("td")[2].style.visibility="hidden";
	imgYzm.onblur=function(){
		tr_imgYzm.getElementsByTagName("td")[2].style.visibility="visible";
		if(imgYzm.value!=""){
			if(imgYzm.value=="6541"){
				tr_imgYzm.getElementsByTagName("td")[2].innerHTML="验证码正确";
				imgYzm.flag=1;
			}else{
				tr_imgYzm.getElementsByTagName("td")[2].innerHTML="验证码不正确";
			}
		}else{
			tr_imgYzm.getElementsByTagName("td")[2].innerHTML="验证码去哪了？？？";
		}
	}
}
//手机验证码验证
phoneYzm.onfocus=function(){
	phoneYzm.flag=0;
	tr_phoneYzm.getElementsByTagName("td")[2].style.visibility="hidden";
	phoneYzm.onblur=function(){
		tr_phoneYzm.getElementsByTagName("td")[2].style.visibility="visible";
		if(phoneYzm.value!=""){
			if(phoneYzm.value=="6541"){
				tr_phoneYzm.getElementsByTagName("td")[2].innerHTML="验证码正确";
				phoneYzm.flag=1;
			}else{
				tr_phoneYzm.getElementsByTagName("td")[2].innerHTML="验证码不正确";
			}
		}else{
			tr_phoneYzm.getElementsByTagName("td")[2].innerHTML="验证码去哪了？？？";
		}
	}
}
//邀请码验证
yaoQinMa.onfocus=function(){
	yaoQinMa.flag=0;
	tr_yaoQinMa.getElementsByTagName("td")[2].style.visibility="hidden";
	yaoQinMa.onblur=function(){
		tr_yaoQinMa.getElementsByTagName("td")[2].style.visibility="visible";
		if(yaoQinMa.value!=""){
			if(yaoQinMa.value=="01001"){
				tr_yaoQinMa.getElementsByTagName("td")[2].innerHTML="邀请码正确";
				yaoQinMa.flag=1;
			}else{
				tr_yaoQinMa.getElementsByTagName("td")[2].innerHTML="邀请码不正确";
			}
		}else{
			tr_yaoQinMa.getElementsByTagName("td")[2].innerHTML="邀请码去哪了？？？";
		}
	}
}
//发送手机验证码的点击
getYzm.onclick=function(){
	if(getYzm.value=="获取验证码"){
		//向手机发送验证码
		//？？？
		getYzm.value="60s后重新发送";
		let time=60;
		var timer=setInterval(function(){
			time--;
			if(time<0){
				getYzm.value="获取验证码";
				clearInterval(timer);
			}else{
				getYzm.value=time+"s后重新发送";
			}
		},1000);
	}
}
//	getId("reg").flag=true;
//复选框是否打钩，决定能否点击注册
getId("checked").onclick=function(){
	if(getId("checked").checked==true){
		getId("reg").style.background="#008842";
		//	getId("reg").flag=true;
	}else{
		getId("reg").style.background="#ccc";
		//	getId("reg").flag=false;
	}
}
getId("reg").onclick=function(){
	if(/*getId("reg").flag*/getId("checked").checked){
		zhuce();
	}
}
function zhuce(){
	var totle=imgYzm.flag+phone.flag+phoneYzm.flag+pass.flag+surePass.flag+yaoQinMa.flag;
	console.log(totle);
	if(totle==6){
		//向后台发送请求，存储数据，以及跳转页面
		my_ajax({
			"url":"../PHP/reg.php",
			"method":"post",
			"sendContent":"tel="+phone.value+"&pass="+pass.value,
			"func":regSuccess
		});
	}else{
		alert("请完善数据");
	}
}
function regSuccess(str){
	//alert("注册成功");
	location.href="login.html";
}
