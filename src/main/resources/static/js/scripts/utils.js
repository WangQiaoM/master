define(['jquery', 'art'], function ($, art) {
    return {
        // 异步JSON请求
        "asyncJSON": function (url, data, type) {
            // IE cache fix
            if (url.indexOf('?') > -1) {
                url += '&_=' + new Date().getTime();
            } else {
                url += '?_=' + new Date().getTime();
            }
            var options = {
                url: url,
                type: 'get',
                dataType: 'json',
                beforeSend: function () {
                    art.show();
                },
                timeout: 10000,
            };
            if (typeof data == 'object') {
                options['data'] = data;
                options['type'] = 'post';
            }

            if (typeof data == 'string' && 'get,post,put,delete'.indexOf(data.toLowerCase()) > -1) {
                options['type'] = data;
            }

            // 类型指定
            if (typeof type == 'string') {
                options['type'] = type;
            }

            return $.ajax(options).fail(function (xhr) {
                art.hide();
                var message = '服务器繁忙,请稍后再试!';
                try {
                    var data = $.parseJSON(xhr.responseText);
                    if (data.message) {
                        message = data.message;
                    }
                } catch (e) {
                }
                art.error(message);
            }).always(function () {
                art.hide();
            });
        },
        // get
        "get": function (url) {
            return this.asyncJSON(url, 'get');
        },
        // post
        "post": function (url, data) {
            return this.asyncJSON(url, data);
        },
        // delete
        "delete": function (url) {
            return this.asyncJSON(url, 'delete');
        },
        // put
        "put": function (url, data) {
            return this.asyncJSON(url, data, 'put');
        },
        // 格式化日期
        "dateFormat": function (timestamp, format) {

            var that = new Date(timestamp);
            // 不是时间
            if (!that.getTime()) {
                return timestamp;
            }
            var date = {
                "M+": that.getMonth() + 1,
                "d+": that.getDate(),
                "h+": that.getHours(),
                "m+": that.getMinutes(),
                "s+": that.getSeconds(),
                "q+": Math.floor((that.getMonth() + 3) / 3),
                "S+": that.getMilliseconds()
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (that.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
            }
            return format;
        },
        // 消息格式化
        "textFormat": function (pattern) {
            var _arguments = arguments;
            return pattern.replace(/{(\d+)}/ig, function (str, index) {
                return _arguments[index] || str;
            })
        }
    };
});