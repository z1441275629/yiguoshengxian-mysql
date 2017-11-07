
function ShowBigImg(obj,multiple,_json){
	let DJson=this.setDefault(obj,_json);//设置默认值
	for(var key in DJson){
		this[key]=DJson[key];
	}
	//this.aimImg=null;
	
	this.initUI(obj,multiple);
	this.initEvent(obj,multiple);
}

ShowBigImg.prototype={
	initUI:function(obj,multiple){
		obj.style.position="relative";
		this.aimImg.style.width="100%";
		this.aimImg.style.height="100%";
	
		this.mirrorArea=document.createElement("div");
		this.mirrorArea.style.cssText="display:none;position:absolute;width:"+this.width+"px;height:"+this.height+"px;background-color:rgba(0,0,0,0.5);";
		obj.appendChild(this.mirrorArea);
	
		this.showA=document.createElement("div");
		obj.appendChild(this.showA);
		this.bigImg=document.createElement("img");
		this.bigImg.style.cssText="position:absolute;";
		this.bigImg.style.width=this.aimImg.offsetWidth*multiple+"px";
		this.bigImg.style.height=this.aimImg.offsetHeight*multiple+"px";
		this.bigImg.src=this.aimImg.src;
		
		this.showA.appendChild(this.bigImg);
		this.showA.style.cssText="display:none;overflow:hidden;position:absolute;width:"+this.width*multiple+"px;height:"+this.height*multiple+"px;";
		
		this.showA.style.left=obj.offsetWidth+10+"px";
		//this.showA.style.top=-1*obj.offsetHeight-4+"px";
		this.showA.style.top=0+"px";
	},
	initEvent:function(obj,multiple){
		let that=this;
		obj.onmouseover=function(){
			that.mirrorArea.style.display="block";
			that.showA.style.display="block";
		}
		obj.onmouseout=function(){
			that.mirrorArea.style.display="none";
			that.showA.style.display="none";
		}
		obj.onmousemove=function(){
			var e=event||window.event;
			let left=e.pageX-parseInt(that.mirrorArea.style.width)/2-obj.offsetLeft;
			let top=e.pageY-parseInt(that.mirrorArea.style.height)/2-obj.offsetTop;
			if(left<0){
				left=0;
			}else if(left>obj.offsetWidth-that.mirrorArea.offsetWidth){
				left=obj.offsetWidth-that.mirrorArea.offsetWidth
			}
			if(top<0){
				top=0;
			}else if(top>obj.offsetHeight-that.mirrorArea.offsetHeight){
				top=obj.offsetHeight-that.mirrorArea.offsetHeight;
			}
			that.mirrorArea.style.left=left+"px";
			that.mirrorArea.style.top=top+"px";
			that.bigImg.style.left=(-1*left*multiple)+"px";
			that.bigImg.style.top=(-1*top*multiple)+"px";
		}
	},
	setDefault:function(obj,_json){
		let defaultJson={
			width:"10",
			height:"10",
			
			mirrorArea:null,
			showA:null,
			aimImg:obj.getElementsByTagName("img")[0],
			bigImg:null
		
		}
		if(_json){
			for(let key in _json){
				defaultJson[key]=_json[key];
			}
		}
		return defaultJson;
	}
}
