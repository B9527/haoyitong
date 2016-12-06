// JavaScript Document
function move(obj,json,options){
			clearInterval(obj.timer);
			var start={};
			var dis={};
			options=options || {};
			options.time=options.time||1000;
			options.type=options.type||'linear';
			var bFlag=true;
			for(var name in json){
				start[name]=parseFloat(getStyle(obj,name));
				
				if(isNaN(start[name])){
					switch(name){
						case 'left':
						start[name]=obj.offsetLeft;
						break;
						case 'top':
						start[name]=obj.offsetTop;
						break;
					}
				}
				iCur=start[name]+dis[name]/iCount*n;
				dis[name]=json[name]-start[name];
				if(iCur!=json[name]){
					bFlag=false;
				}
				
			}
			var iCount=parseInt(options.time/10);
			var n=0;
			
			obj.timer=setInterval(function(){
				n++;
				var a=n/iCount;
				for(var name in json){
					switch(options.type){
						case 'linear' :
						var a=n/iCount;
						var iCur=start[name]+dis[name]*a;
						case 'ease-in' :
						var a=n/iCount;
						var iCur=start[name]+dis[name]*a*a*a;
						case 'ease-out' :
						var a=1-(n/iCount);
						var iCur=start[name]+dis[name]*(1-a*a*a);
					}
					
					
					if(name=='opacity'){
						obj.style[name]=iCur;
					}else{
						obj.style[name]=iCur+'px';
					}
				}
				if(bFlag){
					clearInterval(obj.timer);
				}
				
				if(n==iCount){
					clearInterval(obj.timer);
					options.end && options.end();
				}
			},50)
		}
		function getStyle(obj,name){
			return (obj.currentStyle || getComputedStyle(obj,false))[name];
		}