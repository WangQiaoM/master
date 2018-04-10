/**
 * Created by zhouyang on 2017/4/18.
 * 上传文件封装
 *
 * 使用说明:
 *
 */
define(["webpro.config","jquery","lrz"],function(webproConfig){

    var E={};

    /**
     * XHR上传
     */
    (function () {
        if (!window.FileReader || !window.FormData) {
            // 如果不支持html5的文档操作，直接返回
            return;
        }

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
            formData.append(name, convertBase64UrlToBlob(base64, fileType), Math.random() + '.' + fileExt);

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
        }

    })();

    /**
     * H5上传
     */
    (function () {
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
            var timeout =self.timeout;

            lrz(file,{width:webproConfig.uploadImgWidth}).then(function (rst) {
                //E.log('已读取' + filename + '文件');


                var submitData={
                    type:rst.base64,
                    name:rst.origin.name,
                    fileLength:rst.base64.length
                };
                $.ajax({
                    url: uploadUrl,  //这是处理文件上传的url
                    type: 'POST',
                    data: submitData,
                    dataType: "json",
                    complete :function(XMLHttpRequest){
                        onload(this, XMLHttpRequest.responseText);
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){

                    }
                });

            });

        };

        // 暴露给 E
        E.UploadFile = UploadFile;

    })();

    /**
     * from上传
     */
    (function () {
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

            // 先渲染
            self.render();

            // 先清空
            self.clear();

            // 显示
            self.show();
        };

        // 暴露给 E
        E.UploadFile = UploadFile;
    })();


    return E;
});
