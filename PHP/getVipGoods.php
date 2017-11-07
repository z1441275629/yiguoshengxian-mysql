<?php
	//处理跨域  
    header("Access-Control-Allow-Origin:*"); //*号表示所有域名都可以访问  
    header("Access-Control-Allow-Method:POST,GET"); 
	
	header("content-type:text/html;charset=utf-8");
	$vip=$_GET['vip'];
	//echo $vip;
	
	//连接数据库
	$lianjie=mysql_connect("localhost","root","qianfeng");
	if(!$lianjie){
		die("数据库连接出错：错误代码：".mysql_error());
	}
	//选择数据库
	mysql_select_db("yiguo",$lianjie);
	
	//执行核心语句
	$sqlstr="select * from car where vip='".$vip."'";
	$result=mysql_query($sqlstr,$lianjie);
	$str="[";
	$rows=mysql_fetch_array($result);//游标下移,拿出结果集中的某一行，返回值是拿到的行；
	//echo mysql_num_rows($result);//1
	
	while($rows){//因为返回的是json数据，所以最外层要用单引号，里面用双引号
		$str=$str."{'vip':'".$rows[0]."','goodsid':'".$rows[1]."','goodscount':'".$rows[2]."'}";
		$rows=mysql_fetch_array($result);//游标下移,拿出结果集中的某一行，返回值是拿到的行；
		if($rows){
			$str=$str.",";
		}
	}
	$str=$str."]";
	//关闭数据库
	mysql_close($lianjie);
	echo $str;
	
?>