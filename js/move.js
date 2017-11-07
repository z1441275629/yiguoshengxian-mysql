/**
 * Created by Avery on 2017/2/15.
 * Edited by Avery on 2017/2/15 9:56.
 */

function getStyle(obj,attr){//获取css样式
    if(obj.currentStyle){//ie
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,null)[attr];
    }
}

function move(obj,json,fn){  	// 属性值可以不加px 透明度是用0-1之间的数值
    clearInterval(obj.timer)	// 清除正在执行的定时器

    var iSpeed  = 0;

    obj.timer = setInterval(function(){
        var bOver = true; //假设运动完成
        for (var attr in json){  //每个属性的遍历修改
            var iCur = 0;
            var iTarget;     //   因为我们传入的透明度参数是0-1之间，而我们的初始值是乘100的，所以目标值应该也相应的乘100
            if(attr == "opacity"){	//透明度
            	if(iCur==0){
            		iCur = parseFloat(getStyle(obj,"opacity"))*100;
               	 	iTarget = parseInt(json[attr]*100);
            	}
                
            }else{
            	if(iCur==0){
            		iCur = Math.round(parseFloat(getStyle(obj,attr)));
               		iTarget = parseInt(json[attr]);
            	}
                
            }

            iSpeed = (iTarget - iCur)/5;//获取相对速度
            //iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);//上下取整

            if(iCur != iTarget){
                bOver = false; //如果某一个属性没有完成运动
                if(attr == "opacity"){
                    obj.style.filter ='alpha(opacity:'+(iCur + iSpeed)+')';
                    obj.style.opacity =(iCur + iSpeed)/100;
                }else{
                    obj.style[attr] =iCur + iSpeed +"px";
                }
            }
        }
        if(bOver){//运动完成
            clearInterval(obj.timer);
            if(fn){
            	fn();  //如果有回调函数，执行回调函数
            }

        }

    },10)

}