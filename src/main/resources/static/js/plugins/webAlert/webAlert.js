// JavaScript Document
(function($){
	window.webLoading={
		$wrapper:$("<div class='web-alert-wrapper web-loading-layer' style='display:none;'><div class='opacity-layer'></div><table><tr><td><div class='web-loading-box'></div></td></tr></table></div>"),
		show:function(){
			$("body").append(webLoading.$wrapper);
			webLoading.$wrapper.fadeIn(100);
		},
		hide:function(){
			$("div.web-alert-wrapper.web-loading-layer").fadeOut(100,function(){
				$("div.web-alert-wrapper.web-loading-layer").remove();
			});
		}
	};
	
	var isAlertShow=false;
	
	window.webAlert=function(opts){
		if(isAlertShow) return;
		
		isAlertShow=true;
		
		var opt={
			type:opts.type||"alert",
			content:opts.content||"hello",
			subcontent:opts.subcontent||"",
			cancel:opts.cancel||function(){},
			callback:opts.callback||function(){},
			close:opts.close||function(){}
		};
		
		
		var $AlertWrapper=$("<div class='web-alert-wrapper'><div class='opacity-layer'></div></div>");
		var $AlertTable=$("<table><tbody><tr><td></td></tr></tbody></table>");
		var $AlertModule=$("<div class='webAlert-module'><a class='close'>×</a></div>");
		
		if(opt.type=="success"||opt.type=="error"||opt.type=="warning"){
			$AlertModule.append("<div class='alert-icon "+opt.type+"'></div>");
			$AlertModule.append("<div class='h1'>"+opt.content+"</div>");
			$AlertModule.append("<div class='h3'>"+opt.subcontent+"</div>");			
			
		}else{
			
			$AlertModule.append("<div class='h2'>"+opt.content+"</div>");
			$AlertModule.append("<div class='alert-button-box'><a class='alert_yes'>确定</a></div>");
			
			if(opt.type=="confirm"){
				$AlertModule.prepend("<div class='alert-icon "+opt.type+"'></div>");	
				$AlertModule.find(".alert-button-box").prepend("<a class='alert_no'>取消</a>");
			}
			
		}
		
		
		$AlertModule.on("click",".close",function(){
			$AlertWrapper.fadeOut(100,function(){
				opt.close.apply(null);
				$AlertWrapper.remove();
				
				isAlertShow=false;
			});
			
		})
		.on("click",".alert_no",function(){
			$AlertWrapper.fadeOut(100,function(){
				opt.cancel.apply(null);
				$AlertWrapper.remove();
				
				isAlertShow=false;
			});
			
		})
		.on("click",".alert_yes",function(){
			$AlertWrapper.fadeOut(100,function(){
				opt.callback.apply(null);
				$AlertWrapper.remove();
				
				isAlertShow=false;
			});
		});
		
				
		
		$AlertTable.find("td").append($AlertModule);
		
		$("body").append($AlertWrapper.fadeIn(100).append($AlertTable));
		
	};
})(window.jQuery);