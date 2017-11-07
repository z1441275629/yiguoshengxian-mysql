<?php
	//处理跨域  
    header("Access-Control-Allow-Origin:*"); //*号表示所有域名都可以访问  
    header("Access-Control-Allow-Method:POST,GET"); 
	
	header("content-type:text/html;charset=utf-8");
	$name=$_GET["goodsName"];
	$id=$_GET["goodsId"];
	//$count=$_GET["goodsCount"];
	$descript=$_GET["descript"];
	$price=$_GET["goodsPrice"];
	$img=$_GET["goodsImg"];
	$guige=$_GET["goodsGuige"];
	
	//建立连接
	$lianjieSQL=mysql_connect("localhost","root","qianfeng");
	//检测连接是否成功
	if(!$lianjieSQL){
		die("连接不上：".mysql_error());
	}
	//选择需要连接的库
	mysql_select_db("yiguo",$lianjieSQL);
	//执行存入数据工作
	$addUser="insert into goods(bianhao,goodsname,price,guige,descript,img)"
	 ."values('".$id."','".$name."','".$price."','".$guige."','".$descript."','".$img."')";
	//echo $addUser;
	$res = mysql_query($addUser,$lianjieSQL);
	//关闭数据库
	mysql_close($lianjieSQL);
	echo $res;//返回插入的结果，1代表成功，0(空)代表失败
?>