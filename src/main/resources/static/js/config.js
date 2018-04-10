require.config({
    baseUrl: '/js',
    map: {
        "*": {
            "css": "//cdn.bootcss.com/require-css/0.1.10/css.min.js"
        }
    },
    // 正式环境移除
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        "jquery": "//cdn.bootcss.com/jquery/1.11.3/jquery.min",
        "vue": "//cdn.bootcss.com/vue/2.2.6/vue.min",
        "jquery.pages": "jquery-pages.umd",
        "jquery.validator": "plugins/validator/bbadValidator.umd",
        "jquery.upload": "plugins/jquery.upload",
        "art": "plugins/webAlert/webAlert.umd",
        "utils": "scripts/utils"
    },
    shim: {
        "art": ["css!plugins/webAlert/webAlert.css"],
        "jquery.validator": ["css!plugins/validator/bbadValidator.css"],
    }
});