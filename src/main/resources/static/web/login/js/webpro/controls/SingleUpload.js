/**
 * Created by zhouyang on 2017/4/19.
 * 单文件上传
 */
define(["webpro.config","upload","logger"],function(webproConfig,upload){

    /**
     * 绑定单个图片上传插件
     * @private
     */
    function SingleUpload(dataJson,modeType) {

        var uploadImgUrl = webproConfig.uploadUrl;
        var uploadTimeout = 20 * 1000;
        var event;

        if (!uploadImgUrl) {
            logger.warn("没有配置上传文件地址");
            return;
        }

        $(".upload-single-control").each(function () {
            var self = $(this);
            var selfContent=$("<div class='upload-single-control-content'><i class='fa fa-cloud-upload'></i></div>");
            self.append(selfContent);
            self.append((function () {
                var filedName=self.attr("name");
                var fileUrl = dataJson[filedName]||"";
                var imgInput= $("<input type='hidden' name='" + filedName + "' value='"+fileUrl+"'>");

                self.removeAttr("name");
                imgInput.change(function () {
                    var imgObj = $("<img src='" + $(this).val() + "' />");
                    imgObj.css({width: selfContent.width(), height: selfContent.height()});

                    selfContent.html(imgObj);
                });

                imgInput.change();
                return imgInput;
            })());


            if(modeType=="view"){return ;}

            /**
             * 绑定上传按钮事件
             */
            selfContent.click(function (e) {
                self.append();

                // ---------- 构建上传对象 ----------
                var upfile = new upload.UploadFile({
                    editor: this,
                    uploadUrl: uploadImgUrl,
                    timeout: uploadTimeout,
                    uploadImgFns: {
                        loadfn: function (E, data) {
                            //console.dir(data);
                            self.find("input").val(data).change();
                        },
                        errorfn: function (E,data) {
                            logger.warn("上传异常:"+data);
                        },
                        timeoutfn: function (E,data) {
                            logger.warn("上传超时:"+data);
                        }
                    },
                    fileAccept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp'    // 只允许选择图片
                });

                event = e;
                upfile.selectFiles();
            });
        });
    }

    return SingleUpload;
});


