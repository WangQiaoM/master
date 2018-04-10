/**
 * 项目配置文件文件
 */
require.config({
    urlArgs: 'v='+(new Date()).getTime(),
    baseUrl: "/js",
    paths: {
        //三方插件
        async: 'webpro/lib/require/async',
        text:"webpro/lib/require/text",
        "mock":"mock-min",

        //配置
        "webpro.config":"webpro/webpro.config",
        "webpro.init":"webpro/webpro.init",
        "webpro":"webpro/webpro",

        //视图模块
        "webpro.index": 'webpro/view/webpro.index',
        "webpro.view": "webpro/view/webpro.view",
        "webpro.dialog": "webpro/view/webpro.dialog",
        "webpro.grid": "webpro/view/webpro.grid",
        "webpro.mapgrid": "webpro/view/webpro.mapgrid",

        //微信视图框架模块
        "wxapp.index":"webpro/view/wxapp/wxapp.index",
        "wxapp.page":"webpro/view/wxapp/wxapp.page",
        "wxapp_tmpl":"webpro/view/wxapp/tmpl/wxapp.tmpl.html",
        "page_msg_success":"webpro/view/wxapp/tmpl/page_msg_success.html",
        "page_imgview":"webpro/view/wxapp/tmpl/page_imgview.html",

        //组件
        "wx.utils":"webpro/wechar/wx.utils",
        "observer":"webpro/event/observer",

        //控件
        "SingleUpload":"webpro/controls/SingleUpload",
        "DicControls":"webpro/controls/DicControls",
        "MapControls":"webpro/controls/MapControls",
        "TextAreaControls":"webpro/controls/TextAreaControls",
        "DateControls":"webpro/controls/DateControls",
        "CommonControls":"webpro/controls/CommonControls",
        "GridControls":"webpro/controls/GridControls",

        //框架组件
        "logger":"webpro/lib/utils/logger",
        "upload":"webpro/lib/utils/upload",
        "loadSource":"webpro/lib/utils/loadSource",
        "QRCode":"webpro/lib/utils/jquery.qrcode.min",

        //三方包文件
        "jquery":"jquery-2.1.4",
        "doT":"doT",
        "wangEditor":"wangEditor",
        "bootstrap":"bootstrap",
        "calendar":"lyz.calendar.min",
        "jqueryValidate":"jquery.validate",
        "jqueryEasyui":"jquery.easyui.min",
        "jqueryEasyuiCN":"easy.ui.1.5/easyui-lang-zh_CN",
        'BMap': ['http://api.map.baidu.com/api?v=2.0&ak=mXijumfojHnAaN2VxpBGoqHM'],
        "weixin":"http://res.wx.qq.com/open/js/jweixin-1.0.0",
        "lrz":"lrz/lrz.all.bundle",

        "weui.min":"webpro/lib/weui/weui.min",
        "zepto":"webpro/lib/zepto",

        //模板文件
        "home":"../../../../pages/serviceaddapp/webpro/tpl/home.html",
        "order_success":"../../../../pages/serviceaddapp/webpro/tpl/order_success.html",
        "order_over":"../../../../pages/serviceaddapp/webpro/tpl/order_over.html",
        "order_task":"../../../../pages/serviceaddapp/webpro/tpl/order_task.html",



        //车主端 模板文件
        "usercar_authphone":"../../../../pages/usercarapp/myinfo/tpl/usercar_authphone.html",
        "usercar_myinfo":"../../../../pages/usercarapp/myinfo/tpl/usercar_myinfo.html",
        "usercar_myinfoedit":"../../../../pages/usercarapp/myinfo/tpl/usercar_myinfoedit.html",


    },
    shim: {
        "doT": {
            deps: [],
            exports: "doT"
        },
        "wangEditor": {
            deps: [],
            exports: "wangEditor"
        },
        "calendar":{
            deps: ['jquery'],
            exports: "calendar"
        },
        "jqueryEasyui":{
            deps: ['jquery',"css!../../../../css/themes/gray/easyui.css"],
            exports: "jqueryEasyui"
        },
        "webpro.mapgrid":{
            deps:["css!../../../../css/webpro.mapgrid.css"],
            exports:"webpro.mapgrid"
        },
        "jqueryEasyuiCN":{
            deps: ["jquery"],
            exports: "jqueryEasyuiCN"
        },
        "BMap":{
            deps:[
                'jquery'
            ],
            exports:"BMap",
        },
        "lrz":{
            deps:[],
            exports:"lrz"
        },
        jqueryValidate:{
            deps:[],
            exports:"jqueryValidate"
        },
        bootstrap:{
            deps:['jquery'],
            exports:"bootstrap"
        },
        weixin:{
            deps:[],
            exports:"weixin"
        },
        "weui.min":{
            deps:["css!../../../../css/weui/weui.min.css"],
            exports:"weui.min"
        },
        "webpro.app":{
            deps:[],
            exports:"webpro.app"
        },
        "wxapp.index":{
            deps:["css!../../../../css/animate.css"],
            exports:"wxapp.index"
        },
        "QRCode":{
            deps:["jquery"],
            exports:"QRCode"
        }
    },
    map: {
        '*': {
            'css': '/js/webpro/lib/require-css/css.js'
        }
    }
});