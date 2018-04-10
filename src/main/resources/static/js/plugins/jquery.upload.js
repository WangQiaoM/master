(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CMD
        module.exports = factory(require('jquery'));
    } else {
        factory(global.jQuery);
    }
}(this, function ($) {

    $.extend({
        createUploadIframe: function (id, uri) {
            // create frame
            var frameId = 'jUploadFrame' + id;
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
            if (window.ActiveXObject) {
                if (typeof uri == 'boolean') {
                    iframeHtml += ' src="' + 'javascript:false' + '"';

                }
                else if (typeof uri == 'string') {
                    iframeHtml += ' src="' + uri + '"';
                }
            }
            iframeHtml += ' />';
            jQuery(iframeHtml).appendTo(document.body);

            return jQuery('#' + frameId).get(0);
        },

        createUploadForm: function (id, file) {
            // create form
            var formId = 'jUploadForm' + id;
            var fileId = 'jUploadFile' + id;
            var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
            var oldElement = jQuery(file);
            var oldName = oldElement.attr("name");
            oldElement.attr("name", "file");

            var newElement = jQuery(oldElement).clone(true);
            newElement.attr("name", oldName);


            jQuery(oldElement).before(newElement);
            jQuery(oldElement).appendTo(form);

            // set attributes
            jQuery(form).css('position', 'absolute');
            jQuery(form).css('top', '-1200px');
            jQuery(form).css('left', '-1200px');
            jQuery(form).appendTo('body');
            return form;
        },
        handleError: function (s, xhr, status, e) {
            // If a local callback was specified, fire it
            if (s.error) {
                s.error.call(s.context || s, xhr, status, e);
            }		// Fire the global callback
            if (s.global) {
                (s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
            }
        },

        uploadHttpData: function (r, type) {
            var data = !type;
            data = type == "xml" || data ? r.responseXML : r.responseText;
            // If the type is "script", eval it in global context
            if (type == "script") jQuery.globalEval(data);
            // Get the JavaScript object, if JSON is used.
            if (type == "json") {
                data = jQuery(data).text();
                eval("data=" + data + "");
            }
            // evaluate scripts within html
            if (type == "html") jQuery("<div>").html(data).evalScripts();

            return data;
        },

        ajaxFileUpload: function (s) {
            // TODO introduce global settings, allowing the client to modify
            // them for all requests, not only timeout
            s = jQuery.extend({}, jQuery.ajaxSettings, s);
            var id = new Date().getTime();
            var form = jQuery.createUploadForm(id, s.file);
            var io = jQuery.createUploadIframe(id, s.secureuri);
            var frameId = 'jUploadFrame' + id;
            var formId = 'jUploadForm' + id;
            // Watch for a new set of requests
            if (s.global && !jQuery.active++) {
                jQuery.event.trigger("ajaxStart");
            }
            var requestDone = false;
            // Create the request object
            var xml = {};
            if (s.global) jQuery.event.trigger("ajaxSend", [xml, s]);
            // Wait for a response to come back
            var uploadCallback = function (isTimeout) {
                var io = document.getElementById(frameId);
                try {
                    if (io.contentWindow) {
                        xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                        xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;
                    }
                    else if (io.contentDocument) {
                        xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                        xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                    }
                }
                catch (e) {
                    jQuery.handleError(s, xml, null, e);
                }
                if (xml || isTimeout == "timeout") {
                    requestDone = true;
                    var status;
                    try {
                        status = isTimeout != "timeout" ? "success" : "error";
                        // Make sure that the request was successful or
                        // notmodified
                        if (status != "error") {
                            // process the data (runs the xml through
                            // httpData regardless of callback)
                            var data = jQuery.uploadHttpData(xml, s.dataType);
                            // If a local callback was specified, fire it
                            // and pass it the data
                            if (s.success) s.success(data, status);

                            // Fire the global callback
                            if (s.global) jQuery.event.trigger("ajaxSuccess", [xml, s]);
                        }
                        else
                            jQuery.handleError(s, xml, status);
                    }
                    catch (e) {
                        status = "error";
                        jQuery.handleError(s, xml, status, e);
                    }

                    // The request was completed
                    if (s.global) jQuery.event.trigger("ajaxComplete", [xml, s]);

                    // Handle the global AJAX counter
                    if (s.global && !--jQuery.active) jQuery.event.trigger("ajaxStop");

                    // Process result
                    if (s.complete) s.complete(xml, status);

                    jQuery(io).unbind();

                    setTimeout(function () {
                        try {
                            jQuery(io).remove();
                            jQuery(form).remove();

                        }
                        catch (e) {
                            jQuery.handleError(s, xml, null, e);
                        }

                    }, 100);

                    xml = null;

                }
            };
            // Timeout checker
            if (s.timeout > 0) {
                setTimeout(function () {
                    // Check to see if the request is still happening
                    if (!requestDone) uploadCallback("timeout");
                }, s.timeout);
            }
            try {
                var form = jQuery('#' + formId);
                jQuery(form).attr('action', s.url);
                jQuery(form).attr('method', 'POST');
                jQuery(form).attr('target', frameId);
                if (form.encoding) {
                    jQuery(form).attr('encoding', 'multipart/form-data');
                }
                else {
                    jQuery(form).attr('enctype', 'multipart/form-data');
                }
                jQuery(form).submit();

            }
            catch (e) {
                jQuery.handleError(s, xml, null, e);
            }

            jQuery('#' + frameId).load(uploadCallback);
            return {
                abort: function () {
                }
            };
        },

        upload: function (input, url, success, error) {
            $.ajaxFileUpload({
                url: url,
                secureuri: false,
                file: input,
                dataType: 'json',
                async: true,
                success: success,
                error: error
            });
        }
    });

    $.fn.upload = function (url, success, error) {
        $.upload(this, url, success, error);
    };


    return function (url, $file, options) {
        options = options || {};
        $file.click();
        // 取消change 事件
        $file.unbind("change");

        // 验证函数
        var validate = function (elm) {
            var val = $(elm).val();
            if (!/\.(jpg|png|jpeg|PNG|JPEG|JPG)$/.test(val)) {
                if (typeof options.error == 'function') {
                    options.error("图片类型必须是.jpg .jpeg .png中的一种!");
                }
                return false;
            }
            return true;
        };
        if (typeof options.validate == 'function') {
            validate = options.validate;
        }

        // 参数
        if (options.params) {
            url += "?width=" + options.params['width'] + '&height=' + options.params['height'];
        }

        $file.change(function (e) {
            // 验证
            if (!validate(this)) {
                return;
            }
            $(this).upload(url, function (data) {
                if (typeof options.success == 'function') {
                    options.success(data);
                }
            }, function (xhr, status, error) {
                if (typeof options.error == 'function') {
                    options.error("服务器繁忙,请稍后再试!");
                }
            });

        });

    };

}));

