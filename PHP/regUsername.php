<?php
	//处理跨域  
    header("Access-Control-Allow-Origin:*"); //*号表示所有域名都可以访问  
    header("Access-Control-Allow-Method:POST,GET"); 
	
	header("content-type:text/html;charset=utf-8");
	$uname=$_GET["username"];
	//建立连接
	$lianjieSQL=mysql_connect("localhost","root","qianfeng");
	//检测连接是否成功
	if(!$lianjieSQL){
		die("连接不上：".mysql_error());
	}
	//选择需要连接的库
	mysql_select_db("yiguo",$lianjieSQL);
	//执行查询工作
	//$chaxun="select * from users where uname=".$uname;//这样写会报错
	$chaxun="select * from users where uname='".$uname."'";//千万要注意，这里的等号后面是字符串
	//执行存入数据工作
	$chaxunRes=mysql_query($chaxun,$lianjieSQL);
	
	$rows=mysql_num_rows($chaxunRes);
	echo $rows;
	if($rows==0){
		echo "0";//不存在此数据，
	}else if($rows==1){
		echo "1";//存在此数据，
	}else{
		return $rows;
	}
	
	//执行存入数据工作
	//$addUser="insert into users(uname,upass) values('".$name."','".$pass."')";
	//echo $addUser;
	//$res = mysql_query($addUser,$lianjieSQL);
	//关闭数据库
	mysql_close($lianjieSQL);
	//echo $res;//返回插入的结果，1代表成功，0(空)代表失败
?>