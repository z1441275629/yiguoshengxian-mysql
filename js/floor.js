//参数：固定定位的lis数组，需要定位的元素floor,回调函数fn(跳到指定位置的函数)
function FloorEffect(obj){
	for(let key in obj){
		this[key]=obj[key];
	}
	this.initEvent();
}
FloorEffect.prototype={
	initEvent:function(){
		let that=this;
		for(let i=0;i<this.lis.length;i++){
			this.lis[i].s=this.floor[i].offsetTop;
			this.lis[i].onclick=function(){
				(document.documentElement.scrollTop=that.floor[i].offsetTop) || (document.body.scrollTop=that.floor[i].offsetTop);
			}
		}
		window.onscroll=function(event){
			for(j=0;j<that.lis.length;j++){
				that.lis[j].style.background="#ccc";
			}
			var scrollTop=document.documentElement.scrollTop|| document.body.scrollTop;
			for(let i=0;i<that.lis.length;i++){
				if(scrollTop>=that.floor[i].offsetTop && scrollTop<that.floor[i].offsetTop+that.floor[i].offsetHeight){
					that.lis[i].style.background="yellow";
					return;
				}
			}
		}
		
	}
	
	
}