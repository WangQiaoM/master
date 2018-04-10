/**
 * 日志工具
 */
define("logger",["webpro.config","jquery"],function(webproConfig){
    var console = window.console;
    window.logger=function(){};

    /**
     * 重载日志函数
     */
    $.each(['info',"dir", 'log', 'warn', 'error',"group","groupEnd"], function (i, value) {
        logger[value] = function (info) {
            // 通过配置来控制打印输出
            if (webproConfig.isDebug) {
                //console[value].apply(arguments);
                console[value](arguments[0],arguments[1]||"",arguments[2]||"");
            }
        };
    });

});
