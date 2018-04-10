/**
 * 
 */
var WebPro_dialogPage=(function(parentWindow,jsonData){

	var webPro=parentWindow.webpro;			//用户
	var msg=webPro.mainMsg;					//消息模块

	/**
	 * 初始化事件
	 */
	var _init=function(){

		//构造字典选择器
		$("select[forDic]").each(function(){
			webPro.mainDic.builderSelect($(this));
		});

		$("select[forParent]").each(function(){
			var pSel = $($(this).attr("forParent"));
			if(pSel.length==0){
				console.warn("联动关联select 没有绑定到父级对象:",$(this).attr("forParent"));
			}
			webPro.mainDic.builderChildSelect(pSel,$(this));
		});

		/**
		 * 绑定验证机制
		 * jquery1.11.3.min.js
		 * jquery.validate.js
		 */
		$("#okBtn").click(function(){
			var obj={};
			obj.rules={};

			//绑定验证函数
			$(".dialog-body-center input[validClass^='{']").each(function(){	
				obj.rules[$(this).attr("name")]=eval("("+$(this).attr("validClass")+")");
			});
			
			//验证表单
			var valBool=$(".dialog-body-center form").validate(obj).form();
			if(valBool){
				
				jsonData.queryObj=$(".dialog-body-center form").serializeJson();
				
				//ajax提交
//				alert(jsonData);
				if(jsonData.queryObj.requestUrl==""){
					webPro.mainDialog.closeDialogDiv();
					return;
				}
				
				jsonData.queryObj.keyId = $.getUrlParam("keyId");
				jsonData.queryObj.userID = webPro.setting.userID;

				console.info("请求:"+jsonData.requestUrl,jsonData.queryObj);

				$.post(jsonData.requestUrl,jsonData.queryObj,function(data){
					msg.hideAll();
					console.info("请求提交回调事件,返回对象:",data);
					
					if(data.status=="200"){
						msg.alertInfo("请求成功！");
						
						webPro.mainGridList.refreshGrid();
						webPro.mainDialog.closeDialogDiv();
					}
					else{
						msg.alertErr(data.msg+",错误代码："+data.status);
					}
				},"json");
				
			}else{
				msg.hideAll();
				msg.alertErr("提交失败，数据填写！");
			}
		});

		/**
		 * 关闭弹出窗口
		 */
		$("#closeBtn").click(function(){
			webPro.mainDialog.closeDialogDiv();
		});

		/**
		 * 根据JSON加载为表单数据
		 * @param jsonObj
         */
		var formLoadForJson=function(jsonObj){
			
			console.info("弹窗注入的JSON:",jsonObj);

			for(var itemName in jsonObj){
				var p=$(".dialog-body-center *[name='"+itemName+"']");
				if(p.length==0) continue;

				switch (p.prop("tagName").toLowerCase()){
					case "select":
						p.attr("selValue",jsonObj[itemName]);
						break;
					case "input":
						//console.log("xName:", itemName);
						p.val(jsonObj[itemName]);
						p.change();
						continue;
						break;
					default:
						break;
				}

				p.val(jsonObj[itemName]);
			}

			$("select[forParent]").each(function(){
				var pSel = $($(this).attr("forParent"));

				webPro.mainDic.initChildSelect(pSel,$(this));

				$(this).val($(this).attr("selValue"));
			});

		};

		//构造富文本控件
		var initTextarea=function(){
			if(wangEditor ===undefined) return;

			wangEditor.config.printLog = false;
			$(".textareaDiv textarea").each(function(){
				var editor = new wangEditor($(this));

		        editor.config.uploadImgUrl = webPro.setting.uploadUrl;
		        editor.config.uploadParams = {
		            userID: webPro.setting.userID
		        };

		        editor.create();
			});
		};

		var initMap=function(data){
			if(typeof(mapControl) == "undefined") return;

			//加载标记
			$(".mapControl .map-des .latTxt").text(data.lat);
			$(".mapControl .map-des .lngTxt").text(data.lnt);

			var point = new BMap.Point(data.lnt,data.lat);
			var marker = new BMap.Marker(point);// 创建标注
			mapControl.clearOverlays();
			mapControl.addOverlay(marker);             // 将标注添加到地图中

			$("input[name$='-lng']").val(data.lnt);
			$("input[name$='-lat']").val(data.lat);
			//定位标记


			mapControl.centerAndZoom(point, 13);
		}

		//加载全局默认数据
		//formLoadForJson(defaultForm);

		switch($.getUrlParam("modeType")){
			case "add":
				initTextarea();
				break;
			case "edit":
				formLoadForJson(jsonData.data);
				initTextarea();
				initMap(jsonData.data);
				break;
			case "view":
				formLoadForJson(jsonData.data);
				
				//构造HTML内容
				$(".colspan textarea").each(function(){
					var thisObj = $(this);
					var htmlObj = $(this).parent();
					
					$(thisObj).hide();
					htmlObj.addClass("textareaDiv-blank");
					htmlObj.height(thisObj.height());
					htmlObj.append(thisObj.val());
					
					//TODO 需要设置视图模态为不可编辑状态

				});

				initMap(jsonData.data);
				$("#okBtn").remove();
			break;
		}
	};

	/**
	 * 绑定日期控件
	 * lyz.calendar.min.js(该控件有些BUG，需要重新封装)
	 */
	(function(){
		$("input[mode='date-sel']").each(function(){
			$(this).after("<i class='fa fa-calendar'></i>");
		});

		if($("input[mode='date-sel']").size()>0){
			$("input[mode='date-sel']").calendar({parentWindow:$(parentWindow.document),parentObj:parentWindow});
		}
		//webpro.
	})();

	/**
	 * 绑定单个图片上传插件
	 * @private
	 */
	(function(){
		var uploadImgUrl = webPro.setting.uploadUrl;
		var uploadTimeout = 20 * 1000;
		var event;

		if (!uploadImgUrl) {
			console.warn("没有配置上传文件地址");
			return;
		}

		$(".upload-single-control").each(function(){
			var self = $(this);
			self.append("<div class='upload-single-control-content'><i class='fa fa-cloud-upload'></i></div>");
			self.append("<input type='hidden' name='"+self.attr("name")+"'>");
			self.removeAttr("name");
			var selfContent=self.find(".upload-single-control-content");
			/**
			 * 监听
			 */
			self.find("input").change(function(){
				var imgObj=$("<img src='"+$(this).val()+"' />");
				imgObj.css({width:selfContent.width(),height:selfContent.height()});

				selfContent.html(imgObj);
			});

			/**
			 * 绑定上传按钮事件
			 */
			selfContent.click(function(e){
				self.append();

				// ---------- 构建上传对象 ----------
				var upfile = new $$.UploadFile({
					editor: this,
					uploadUrl: uploadImgUrl,
					timeout: uploadTimeout,
					uploadImgFns:{
						loadfn:function(E,data){
							//console.dir(data);
							self.find("input").val(data.responseText).change();
						},
						errorfn:function(){

						},
						timeoutfn:function(){

						}
					},
					fileAccept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp'    // 只允许选择图片
				});

				event = e;
				upfile.selectFiles();
			});
		});

		/**
		 * huanpeng
		 */

		$(".weui-uploader__input").each(function(){
			var self = $(this);
			self.append("<div class='upload-single-control-content'><i class='fa fa-cloud-upload'></i></div>");
			self.append("<input type='hidden' name='"+self.attr("name")+"'>");
			self.removeAttr("name");
			var selfContent=self.find(".upload-single-control-content");
			/**
			 * 监听
			 */
			self.find("input").change(function(){
				var imgObj=$("<img src='"+$(this).val()+"' />");
				imgObj.css({width:selfContent.width(),height:selfContent.height()});

				selfContent.html(imgObj);
			});

			/**
			 * 绑定上传按钮事件
			 */
			selfContent.click(function(e){

				self.append();



				// ---------- 构建上传对象 ----------
				var upfile = new $$.UploadFile({
					editor: this,
					uploadUrl: uploadImgUrl,
					timeout: uploadTimeout,
					uploadImgFns:{
						loadfn:function(E,data){
							//console.dir(data);
							self.find("input").val(data.responseText).change();
						},
						errorfn:function(){

						},
						timeoutfn:function(){

						}
					},
					fileAccept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp'    // 只允许选择图片
				});

				event = e;
				upfile.selectFiles();
			});
		});

	})();

	/**
	 * 加载地图控件
	 * @private
	 */
	(function(){

		$(".mapControl").each(function() {
			var self = $(this);
			var controlName=self.attr("name");

			// 百度地图API功能
			var map = new BMap.Map("map-content");    					// 创建Map实例
			map.centerAndZoom(new BMap.Point(106.534, 29.535), 13);  	// 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl());   				// 添加地图类型控件
			map.setCurrentCity("重庆");          						// 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);     						// 开启鼠标滚轮缩放

			//TODO 简陋封装.需要动态配置事件
			//$(".map-control")
			map.addEventListener("click", function(e){
				$(".mapControl .map-des .latTxt").text(e.point.lat);
				$(".mapControl .map-des .lngTxt").text(e.point.lng);

				var point = new BMap.Point(e.point.lng,e.point.lat);
				var marker = new BMap.Marker(point);// 创建标注
				map.clearOverlays();
				map.addOverlay(marker);             // 将标注添加到地图中

				$("input[name='"+controlName+"-lng']").val(e.point.lng);
				$("input[name='"+controlName+"-lat']").val(e.point.lat);
			});

			window.mapControl=map;

		});
	})();

	//窗口打开窗口大小动画
	webPro.mainDialog.changeDialogSize((function(){
		var sizeObj={};
		sizeObj.heigth=0;

		var fileUploadSize = $(".upload-single-control").size();
		var fileUploadHeight=$(".upload-single-control").height();

		var mapControlSize=$(".mapControl").size();
		var mapControlHieght=$(".mapControl").height();

		//判断是否动态改成单栏与双栏样式
		if($("form>ul li").size()<=6 && $("form>ul .textareaDiv").size()==0&&mapControlSize==0){
			$("form>ul").attr("class","single-td");
		}
		else{
			$("form>ul").attr("class","double-td");
		}

		//双栏样式
		if($(".double-td").size()!=0){
			//控制li成对出现  防止空白样式
			if($(".double-td li:not(.colspan)").size()%2==1){
				$(".double-td li:not(.colspan):last").after("<li>&nbsp;</li>");
			}

			var areaConSize=$(".double-td .textareaDiv").size();
			sizeObj.heigth+=($(".double-td li").size()-areaConSize)/2*41.5;

			$(".double-td .textareaDiv").each(function(){
				sizeObj.heigth+=$(this).height()+12;
			});

			sizeObj.width=832;
		}
		//单栏样式
		else if($(".single-td").size()!=0){
			sizeObj.heigth+=$(".single-td li").size()*41.5;
			sizeObj.width=416;

			$("ul li").width(sizeObj.width-10);
		}

		sizeObj.heigth+=(mapControlHieght+5)*mapControlSize;
		sizeObj.heigth+=(fileUploadHeight - 30.5)*fileUploadSize;
		sizeObj.heigth+=$(".textareaDiv textarea").size()*20;
		sizeObj.heigth+=65;

		return sizeObj;
	})());

	var $$={};
	/**
	 * 加载插件模块
	 */
	$$.installPlugins = function(){
		var _e = function (fn) {
			var E = $$;
			if (E) {
				// 执行传入的函数
				fn(E);
			}
		};

		$$.plugin = function (fn) {
			if (!$$._plugins) {
				$$._plugins = [];
			}

			if (typeof fn === 'function') {
				$$._plugins.push(fn);
			}
		};


		// xhr 上传图片
		_e(function (E) {

			if (!window.FileReader || !window.FormData) {
				// 如果不支持html5的文档操作，直接返回
				return;
			}

			E.plugin(function () {

				var control = this;

				// -------- 将以base64的图片url数据转换为Blob --------
				function convertBase64UrlToBlob(urlData, filetype){
					//去掉url的头，并转换为byte
					var bytes = window.atob(urlData.split(',')[1]);

					//处理异常,将ascii码小于0的转换为大于0
					var ab = new ArrayBuffer(bytes.length);
					var ia = new Uint8Array(ab);
					var i;
					for (i = 0; i < bytes.length; i++) {
						ia[i] = bytes.charCodeAt(i);
					}

					return new Blob([ab], {type : filetype});
				}

				// -------- onprogress 事件 --------
				function updateProgress(e) {

				}

				// -------- xhr 上传图片 --------
				control.xhrUploadImg = function (opt) {
					// opt 数据
					var event = opt.event;
					var fileName = opt.filename || '';
					var uploadImgUrl = opt.uploadUrl;
					var base64 = opt.base64;
					var fileType = opt.fileType || 'image/png'; // 无扩展名则默认使用 png
					var name = opt.name || 'wangEditor_upload_file';
					var loadfn = opt.loadfn || onload;
					var errorfn = opt.errorfn || onerror;
					var timeoutfn = opt.timeoutfn || ontimeout;
					var uploadTimeout = opt.uploadTimeout;

					// 上传参数（如 token）
					//var params = editor.config.uploadParams || {};

					// headers
					//var headers = editor.config.uploadHeaders || {};

					// 获取文件扩展名
					var fileExt = 'png';  // 默认为 png
					if (fileName.indexOf('.') > 0) {
						// 原来的文件名有扩展名
						fileExt = fileName.slice(fileName.lastIndexOf('.') - fileName.length + 1);
					} else if (fileType.indexOf('/') > 0 && fileType.split('/')[1]) {
						// 文件名没有扩展名，通过类型获取，如从 'image/png' 取 'png'
						fileExt = fileType.split('/')[1];
					}

					// 变量声明
					var xhr = new XMLHttpRequest();
					var timeoutId;
					var formData = new FormData();

					// 超时处理
					function timeoutCallback() {
						if (timeoutId) {
							clearTimeout(timeoutId);
						}
						if (xhr && xhr.abort) {
							xhr.abort();
						}

						// 超时了就阻止默认行为
						event.preventDefault();

						// 执行回调函数，提示什么内容，都应该在回调函数中定义
						timeoutfn && timeoutfn.call(editor, xhr);

					}

					xhr.onload = function () {
						if (timeoutId) {
							clearTimeout(timeoutId);
						}

						//alert(fileName);

						// 执行load函数，任何操作，都应该在load函数中定义
						loadfn && loadfn.call(E, xhr.responseText, xhr);

					};
					xhr.onerror = function () {
						if (timeoutId) {
							clearTimeout(timeoutId);
						}

						// 超时了就阻止默认行为
						event.preventDefault();

						// 执行error函数，错误提示，应该在error函数中定义
						errorfn && errorfn.call(E, xhr);

					};
					// xhr.onprogress = updateProgress;
					xhr.upload.onprogress = updateProgress;

					// 填充数据
					formData.append(name, convertBase64UrlToBlob(base64, fileType), Math.random()+ '.' + fileExt);

					// 添加参数
					//$.each(params, function (key, value) {
					//	formData.append(key, value);
					//});

					// 开始上传
					xhr.open('POST', uploadImgUrl, true);
					// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  // 将参数解析成传统form的方式上传

					// 修改自定义配置的headers
					//$.each(headers, function (key, value) {
					//	xhr.setRequestHeader(key, value);
					//});

					// 跨域上传时，传cookie
					xhr.withCredentials = true;

					// 发送数据
					xhr.send(formData);
					timeoutId = setTimeout(timeoutCallback, uploadTimeout);

					//E.log('开始上传...并开始超时计算');
				};
			});
		});

		// h5 方式上传图片
		_e(function (E) {

			if (!window.FileReader || !window.FormData) {
				// 如果不支持html5的文档操作，直接返回
				return;
			}

			// 构造函数
			var UploadFile = function (opt) {
				this.editor = opt.editor;
				this.uploadUrl = opt.uploadUrl;
				this.timeout = opt.timeout;
				this.fileAccept = opt.fileAccept;
				this.uploadImgFns = opt.uploadImgFns;
				this.multiple = true;
			};

			UploadFile.fn = UploadFile.prototype;

			// clear
			UploadFile.fn.clear = function () {
				this.$input.val('');
				//E.log('input value 已清空');
			};

			// 渲染
			UploadFile.fn.render = function () {
				var self = this;
				if (self._hasRender) {
					// 不要重复渲染
					return;
				}

				//E.log('渲染dom');

				var fileAccept = self.fileAccept;
				var acceptTpl = fileAccept ? 'accept="' + fileAccept + '"' : '';
				var multiple = self.multiple;
				var multipleTpl = multiple ? 'multiple="multiple"' : '';
				var $input = $('<input type="file" ' + acceptTpl + ' ' + multipleTpl + '/>');
				var $container = $('<div style="visibility:hidden;"></div>');

				$container.append($input);
				$('body').append($container);

				// onchange 事件
				$input.on('change', function (e) {
					self.selected(e, $input.get(0));
				});

				// 记录对象数据
				self.$input = $input;

				// 记录
				self._hasRender = true;
			};

			// 选择
			UploadFile.fn.selectFiles = function () {
				var self = this;

				//E.log('使用 html5 方式上传');

				// 先渲染
				self.render();

				// 选择
				//E.log('选择文件');
				self.$input.click();
			};

			// 选中文件之后
			UploadFile.fn.selected = function (e, input) {
				var self = this;
				var files = input.files || [];
				if (files.length === 0) {
					return;
				}

				//E.log('选中 ' + files.length + ' 个文件');

				// 遍历选中的文件，预览、上传
				$.each(files, function (key, value) {
					self.upload(value);
				});
			};

			// 上传单个文件
			UploadFile.fn.upload = function (file) {
				var self = this;

				var uploadUrl = this.uploadUrl;
				var filename = file.name || '';
				var fileType = file.type || '';
				var uploadFileName = self.uploadImgFileName;
				var onload = self.uploadImgFns.loadfn;
				var ontimeout = self.uploadImgFns.timeoutfn;
				var onerror = self.uploadImgFns.errorfn;
				var reader = new FileReader();
				var timeout =self.timeout;


				//E.log('开始执行 ' + filename + ' 文件的上传');

				// onload事件
				reader.onload = function (e) {
					//E.log('已读取' + filename + '文件');

					var base64 = e.target.result || this.result;


					E.xhrUploadImg({
						event: e,
						filename: filename,
						base64: base64,
						fileType: fileType,
						name: uploadFileName,
						uploadUrl:uploadUrl,
						uploadTimeout:timeout,
						loadfn: function (resultText, xhr) {
							// 执行配置中的方法
							var editor = this;

							onload.call(editor, resultText, xhr);
						},
						errorfn: function (xhr) {
							if (E.isOnWebsite) {
								alert('');
							}
							// 执行配置中的方法
							var editor = this;
							onerror.call(editor, xhr);
						},
						timeoutfn: function (xhr) {
							if (E.isOnWebsite) {
								alert('');
							}
							// 执行配置中的方法
							var editor = this;
							ontimeout(editor, xhr);
						}
					});
				};

				// 开始取文件
				reader.readAsDataURL(file);
			};

			// 暴露给 E
			E.UploadFile = UploadFile;

		});

		// form方式上传图片
		_e(function (E) {

			if (window.FileReader && window.FormData) {
				// 如果支持 html5 上传，则返回
				return;
			}

			// 构造函数
			var UploadFile = function (opt) {
				this.editor = opt.editor;
				this.uploadUrl = opt.uploadUrl;
				this.timeout = opt.timeout;
				this.fileAccept = opt.fileAccept;
				this.multiple = false;
			};

			UploadFile.fn = UploadFile.prototype;

			// clear
			UploadFile.fn.clear = function () {
				this.$input.val('');
				//E.log('input value 已清空');
			};

			// 隐藏modal
			UploadFile.fn.hideModal = function () {
				this.modal.hide();
			};

			// 渲染
			UploadFile.fn.render = function () {
				var self = this;
				var editor = self.editor;
				var uploadFileName = editor.config.uploadImgFileName || 'wangEditorFormFile';
				if (self._hasRender) {
					// 不要重复渲染
					return;
				}

				// 服务器端路径
				var uploadUrl = self.uploadUrl;

				// 创建 form 和 iframe
				var iframeId = 'iframe' + E.random();
				var $iframe = $('<iframe name="' + iframeId + '" id="' + iframeId + '" frameborder="0" width="0" height="0"></iframe>');
				var multiple = self.multiple;
				var multipleTpl = multiple ? 'multiple="multiple"' : '';
				var $p = $('<p>选择图片并上传</p>');
				var $input = $('<input type="file" ' + multipleTpl + ' name="' + uploadFileName + '"/>');
				var $btn = $('<input type="submit" value="上传"/>');
				var $form = $('<form enctype="multipart/form-data" method="post" action="' + uploadUrl + '" target="' + iframeId + '"></form>');
				var $container = $('<div style="margin:10px 20px;"></div>');

				$form.append($p).append($input).append($btn);

				// 增加用户配置的参数，如 token
				$.each(editor.config.uploadParams, function (key, value) {
					$form.append( $('<input type="hidden" name="' + key + '" value="' + value + '"/>') );
				});

				$container.append($form);
				$container.append($iframe);

				self.$input = $input;
				self.$iframe = $iframe;

				// 生成 modal
				var modal = new E.Modal(editor, undefined, {
					$content: $container
				});
				self.modal = modal;

				// 记录
				self._hasRender = true;
			};

			// 绑定 iframe load 事件
			UploadFile.fn.bindLoadEvent = function () {
				var self = this;
				if (self._hasBindLoad) {
					// 不要重复绑定
					return;
				}

				var editor = self.editor;
				var $iframe = self.$iframe;
				var iframe = $iframe.get(0);
				var iframeWindow = iframe.contentWindow;
				var onload = editor.config.uploadImgFns.onload;

				// 定义load事件
				function onloadFn() {
					var resultText = $.trim(iframeWindow.document.body.innerHTML);
					if (!resultText) {
						return;
					}

					// 获取文件名
					var fileFullName = self.$input.val();  // 结果如 C:\folder\abc.png 格式
					var fileOriginalName = fileFullName;
					if (fileFullName.lastIndexOf('\\') >= 0) {
						// 获取 abc.png 格式
						fileOriginalName = fileFullName.slice(fileFullName.lastIndexOf('\\') + 1);
						if (fileOriginalName.indexOf('.') > 0) {
							// 获取 abc （即不带扩展名的文件名）
							fileOriginalName = fileOriginalName.split('.')[0];
						}
					}

					// 将文件名暂存到 editor.uploadImgOriginalName ，插入图片时，可作为 alt 属性来用
					editor.uploadImgOriginalName = fileOriginalName;

					// 执行load函数，插入图片的操作，应该在load函数中执行
					onload.call(editor, resultText);

					// 清空 input 数据
					self.clear();

					// 隐藏modal
					self.hideModal();
				}

				// 绑定 load 事件
				if (iframe.attachEvent) {
					iframe.attachEvent('onload', onloadFn);
				} else {
					iframe.onload = onloadFn;
				}

				// 记录
				self._hasBindLoad = true;
			};

			UploadFile.fn.show = function () {
				var self = this;
				var modal = self.modal;

				function show() {
					modal.show();
					self.bindLoadEvent();
				}
				setTimeout(show);
			};

			// 选择
			UploadFile.fn.selectFiles = function () {
				var self = this;

				//E.log('使用 form 方式上传');

				// 先渲染
				self.render();

				// 先清空
				self.clear();

				// 显示
				self.show();
			};

			// 暴露给 E
			E.UploadFile = UploadFile;

		});


		// 执行用户自定义事件，通过 E.ready() 添加
		var _plugins = $$._plugins;
		if (_plugins && _plugins.length) {
			$.each(_plugins, function (k, val) {
				val.call($$);
			});
		}

	};

	$$.installPlugins();

	_init();

	return $$;
});