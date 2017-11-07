<?php
	header("content-type:text/html;charset=utf-8");
	$vip=$_GET["vip"];
	$goodsId=$_GET["goodsId"];
	$goodscount=$_GET["count"];

	//echo $vip.",".$goodsId.",".$goodscount
	//建立连接
	$lianjieSQL=mysql_connect("localhost","root","qianfeng");
	//检测连接是否成功
	if(!$lianjieSQL){
		die("连接不上：".mysql_error());
	}
	//选择需要连接的库
	mysql_select_db("yiguo",$lianjieSQL);
	//如果数据库中该会员已经存在此商品，则增加加入的数量，没有此商品的话，增加此商品
	$chaxun="select * from car where vip='".$vip."' and goodsid='".$goodsId."'";
	$chaxunres=mysql_query($chaxun,$lianjieSQL);
	$rows=mysql_num_rows($chaxunres);
	if($rows==1){
		//update 表名称 set 列名称=新值 where 更新条件
		//$addToCar="update car set goodscount+=".$goodscount." where  vip=".$vip." and goodsid=".$goodsId;
		$addToCar="update car set goodscount=goodscount+".$goodscount." where  vip='".$vip."' and goodsid='".$goodsId."'";
	}else{
		$addToCar="insert into car(vip,goodsid,goodscount) values('".$vip."','".$goodsId."','".$goodscount."')";
		//$addToCar="insert into car(vip,goodsid) values('".$vip."','".$goodsId."')";
	}
	//
	//执行存入数据工作
	//echo $addToCar;
	$res = mysql_query($addToCar,$lianjieSQL);
	//关闭数据库
	mysql_close($lianjieSQL);
	echo $res;//返回插入的结果，1代表成功，0(空)代表失败
?>