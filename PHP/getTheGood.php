<?php
	//处理跨域  
    header("Access-Control-Allow-Origin:*"); //*号表示所有域名都可以访问  
    header("Access-Control-Allow-Method:POST,GET"); 
	
	header("content-type:text/html;charset=utf-8");
	$bianhao=$_GET["bianhao"];
	//echo $bianhao;
	//连接数据库
	$lianjie=mysql_connect("localhost","root","qianfeng");
	if(!$lianjie){
		die("数据库连接出错：错误代码：".mysql_error());
	}
	//选择数据库
	mysql_select_db("yiguo",$lianjie);
	
	//执行核心语句
	$sqlstr="select * from goods where bianhao=".$bianhao;
	$result=mysql_query($sqlstr,$lianjie);
	$row=mysql_num_rows($result);
	//echo $row;
	
	if($row==0){
		echo "0";//没有找到此数据
	}else{
		$rows=mysql_fetch_array($result);//游标下移,拿出结果集中的某一行，返回值是拿到的行；
		$str="{'bianhao':'".$rows[0]."','goodsname':'".$rows[1]."',"
		."'price':'".$rows[2]."','guige':'".$rows[3]."',"
		."'descript':'".$rows[4]."','img':'".$rows[5]."'}";
		echo $str;
	}	
	//关闭数据库
	mysql_close($lianjie);
	
?>