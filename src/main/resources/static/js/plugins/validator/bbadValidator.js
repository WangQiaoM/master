$.fn.bbadValidator=function(opts){
			
	var _this=this
		isErrorNums=0; //记录验证错误的数量
	
	_this.regExps=$.extend(false,{
		
		email:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		
		phone:/^(0|86|17951)?1[3|4|5|7|8]\d{9}$/,
		
		tel:/^0\d{2,3}-?\d{7,8}$/,
		
		phoneANDtel:/^((0|86|17951)?1[3|4|5|7|8]\d{9})|(0\d{2,3}-?\d{7,8})$/,
		
		ip:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
		
		id:/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
		
		ch:/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/,
		
		httpUrl:/^(http(s)?:\/\/)?([\w-]+\.)+[a-zA-Z0-9]+((\/|\?|&|=|\w)+)?$/
		
	},opts);
	
	_this.success=function(self){
		
		$(self).siblings(".validator-icon").remove();
		
		var $success=$("<i class='validator-icon success'></i>");
		
		$(self).css("border","1px solid #21b393").after($success);
		
	};
	
	
	_this.error=function(self,message){
		
		$(self).siblings(".validator-icon").remove();
		
		var tips=$(self).attr(message);
		
		var $error=$("<i class='validator-icon error'><p style='display: block;'>"+tips+"</p></i>");
		
		$(self).css({
			"border":"1px solid #f30"
		})
		.after($error);
		
		$error.off().on("mouseover",function(){
			$(this).find("p").css("display","");
		});
		
		//错误 加1
		isErrorNums++;
	};
	
	
	_this.check=function(self){
		
		var yzType=$(self).attr("yz-type").split(',');
		
		var value=$(self).val();
		
		for(var i in yzType){
			
			switch(yzType[i]){
				case "null":							
					if(value==""){							
						_this.error(self,"null-message");
						return false;
					}
					
				break;
				
				case "length":							
					var len=value.replace(/[^\x00-\xff]/g,"aa").length;
					
					var min=parseInt($(self).attr("min")),
						max=parseInt($(self).attr("max"));
					
					if(len<min||len>max){
						_this.error(self,"length-message");
						return false;	
					}
					
				break;
				
				case "password":
					var $pwd=$("#"+$(self).attr("eq-id"));
					if($pwd.val()!=""){
						if(value!=$pwd.val()){
							_this.error($pwd,"password-message");
							_this.error(self,"password-message");
							return false;
						}
						else{
							_this.success($pwd);
						}
					}
				break;
				
				case "minNumber":
					var min=parseFloat($(self).attr("min"));
					if(parseFloat(value)<min){
						_this.error(self,"minNumber-message");
						return false;
					}
				break;
				
				case "maxNumber":
					var max=parseFloat($(self).attr("max"));
					if(parseFloat(value)>max){
						_this.error(self,"maxNumber-message");
						return false;
					}
				break;
				
				default:
					if(!_this.regExps[yzType[i]].test(value)){
						
						var message=yzType[i]+"-message";
						
						_this.error(self,message);
						
						return false;								
					}
					
				break;
				
			}
			
			_this.success(self);
			
		}
	};
	
	
	
	$(_this).on("blur","input,textarea,select",function(){
		
		var isYz=$(this).attr("is-yz");
		
		if(isYz=="true") _this.check(this);
		
	});
	
	$(_this).on("focus","input,textarea,select",function(){
		
		var isYz=$(this).attr("is-yz");
		
		if(isYz=="true") $(this).css("border","1px solid #FF9934").siblings(".validator-icon").remove();
		
	});
	
	return {
		
		check:function(element){
			element=element||"";
			
			isErrorNums=0;
			
			if(element==""){
				
				$(_this).find("input,textarea,select").each(function(i){
					
					var isYz=$(this).attr("is-yz");
					
					if(isYz=="true")
						_this.check(this);
						
				});
				
				return !isErrorNums>0;
			}
			else{
				if($(element).attr("is-yz")=="true")
					_this.check(element);
				else{
					$(element).css("border","").siblings(".validator-icon").remove();
				}
			}
		},
		remove:function(element){
			$(element).css("border","").siblings(".validator-icon").remove();
		}
		
	};
	
};