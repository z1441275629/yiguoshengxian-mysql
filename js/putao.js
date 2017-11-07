function getId(id){
	return document.getElementById(id);
}
function getClass(_class){
	return document.getElementsByClassName(_class);
}
function getTag(tag){
	return document.getElementsByTagName(tag);
}
	//放大镜
	var Box1=getClass("zj-bigbox")[0];
	var Pop=getClass("pop")[0];
	var _Imgbox=getClass("bigImg")[0];
	var IMG=_Imgbox.getElementsByTagName("img")[0];
	var list=getClass("ul-list")[0];
	var BtnList = list.getElementsByTagName("li"); 
	var len = BtnList.length; 
	
	var bw=484,bh=484;
	var pw=242,ph=242;
	var imgw=968;imgh=968;
	
	
	var _top=0;
	Box1.onmousemove=function (event){
		var e=event||window.event;
		var _left=0;
		//左右边界 
		if(e.pageX-Box1.offsetLeft<pw/2){
			_left=0; //左
		}else if(e.pageX-Box1.offsetLeft>bw-pw/2){  
			_left=bw-pw; //右
		}else{
			_left=e.pageX-Box1.offsetLeft-pw/2;   
		}
		//上下边界
		
		if(e.pageY-Box1.offsetTop<ph/2){
			_top=0;
		}else if(e.pageY-Box1.offsetTop>(bh-ph/2)){
			_top=bh-ph;
		}else{
			_top=e.pageY-Box1.offsetTop-ph/2;
		}
	//小框
	//console.log(_left+"-"+(Box1.offsetTop));
	Pop.style.left=_left+"px";
	Pop.style.top=_top+"px";
	//大框
	IMG.style.left=(-1)*(imgw/bw)*_left+"px";
	IMG.style.top=(-1)*(imgh/bh)*_top+"px";
}
	//移上
	Box1.onmouseover=function(){
		Pop.style.display="block";
		_Imgbox.style.display="block";	
	}
	//移出
	Box1.onmouseout=function(){
		Pop.style.display="none";
		_Imgbox.style.display="none";	
	}
	
	//点击下图
	for(var i=0;i<len;i++){    //下面小图的点击
		    BtnList[i].onmouseover = function(){
		    	Box1.getElementsByTagName("img")[0].src=this.firstElementChild.src;
		    	_Imgbox.getElementsByTagName("img")[0].src=this.firstElementChild.src;
					 
				}
			}
	
	//选项卡
	    let tabshz=getId("tabs").getElementsByTagName("li");
	    let contents=getId("content").getElementsByTagName("section");
	    
	    for(let i=0;i< tabshz.length;i++){
		   tabshz[i].index=i;
		   tabshz[i].onclick=function(){
	    for(let j=0;j< tabshz.length;j++){
		    tabshz[j].className="";		    
			contents[j].style.display="none";
		}
	     this.className="active";
	        
		    contents[this.index].style.display="block";
	  }
	
	}
//	    tabshz[0].onclick=function(){		   		   
//		    contents[0].style.display="block";
//	    	contents[1].style.display="none";
//		    contents[2].style.display="none";			
//		}
//      tabshz[1].onclick=function(){       	
//          contents[0].style.display="none";
//	    	contents[1].style.display="block";
//		    contents[2].style.display="none";			
//		}
//	    tabshz[2].onclick=function(){	    	
//          contents[0].style.display="none";
//	    	contents[1].style.display="none";
//		    contents[2].style.display="block";			
//		}
	//右上点击轮播   
	//点击上移动
	    let num =0;
	    let cd= getId("List1").children.length;
	getClass("LeftBotton")[0].onclick=function(){
		// alert(1);
        num++;
        if(num>=cd-2){
       	   num=1;
       	   getId("List1").style.top="0px";
        }
        move(getId("List1"),{"top":-num *185});
	
	}
    //点击下移
    getClass("RightBotton")[0].onclick=function(){
		// alert(1);
        num--;
        if(num<0){
       	   num=cd-4;
       	   getId("List1").style.top=-(cd-3)*180+"px";
        }
        move(getId("List1"),{"top":-num *185});
	
	}
    //轮播
      let  timers=null;
        clearInterval( timers);
        timers = setInterval(getClass("LeftBotton")[0].onclick,2000);
	getClass("lunbo-ri-list")[0].onmouseover=function(){
		clearInterval(timers);
	}
	getClass("lunbo-ri-list")[0].onmouseout=function(){
		clearInterval(timers);
		timers = setInterval(getClass("LeftBotton")[0].onclick,2000);
	}
   

/*****************服务背景图的设置************************/
var footer_service=getId("footer_service").getElementsByTagName("li");
for(let i=0;i<footer_service.length;i++){
	footer_service[i].style.backgroundPosition="0px "+(-1*42*i)+"px";
}
/******************底部服务背景图设置***********************/
var footer_guide=getId("footer_guide").getElementsByTagName("dl");
for(let i=0;i<footer_guide.length;i++){
	footer_guide[i].getElementsByTagName("dt")[0].style.backgroundPositionY=(-1*i*23)+"px";
}
/********************几楼的背景图设置**********************/