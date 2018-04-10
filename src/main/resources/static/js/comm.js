
/*
 * extend
 */

window.$extend = {
	//table列表 加载前动画
	tableLoading:"<p class='table-data-loading'><i></i><span>loading ...</span></p>",
	
	triggerFile:function(self){
		$(self).siblings('.file-div').find('input').trigger('click');
	},
	
	tagGroup:function(callback){
		
		var $tags = $('.ivu-tag-group'), $selectTag = Object;
		
		var startX, startY, moveX, moveY, endX, endY;
		
		$tags
		.on('mousedown','.ivu-tag',function(e){
			
			startX = e.pageX;
			startY = e.pageY;
			
			$(this).addClass('active');
			
			this._isDrag = true;
			
			$selectTag = this;
			
		})
		.on('mousemove','.ivu-tag',function(e){
			if(this._isDrag){
				
				moveX = e.pageX - startX;
				moveY = e.pageY - startY;
				
				$(this).css({
					left:moveX + 'px',
					top:moveY + 'px'
				});
				
			}
		});
		
		document.addEventListener('mouseup',function(e){
			
			if(!$selectTag._isDrag) return;
			
			endX = e.pageX;
			endY = e.pageY;
			
			$tags.find('.ivu-tag').each(function(index){
				
				var w = $(this).outerWidth(),
					h = $(this).outerHeight(),
					l = $(this).offset().left,
					t = $(this).offset().top;
				
				if(endX > l && endX < (w + l) && endY > t && endY < (h + t) && !this._isDrag){
					
					var $clone = $(this).clone();
					
					$($selectTag).before($clone);
					
					$(this).before($($selectTag));
					
					$(this).remove();
					
					callback && callback($clone.index(),$($selectTag).index());
					
				}
				
			});
			
			$($selectTag).css({
				left:'',
				top:''
			}).removeClass('active');
			
			$selectTag._isDrag = false;
			
		},false);
		
	}
	
};
