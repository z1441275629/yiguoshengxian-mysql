var tel=document.getElementById("tel");
var pass=document.getElementById("pass");
var yzm=document.getElementById("yzm");
var denglu=document.getElementById("denglu");
denglu.onclick=function(){
	if(yzm.value=="6541"){
		my_ajax({
			"url":"../PHP/log.php",
			"method":"post",
			"sendContent":"tel="+tel.value+"&pass="+pass.value,
			"func":function(str){
				console.log(str);
				if(str=="1"){//登录成功
					
					//saveCookie("vip",tel.value,7);//保存cookie
					//location.href="../index.html";
					gogogo("../index.html",{vip:tel.value});
				}else{
					alert("用户名或密码不正确");
				}
			}
		});
	}
}
