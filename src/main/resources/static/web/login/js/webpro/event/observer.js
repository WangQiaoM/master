/**
 * Created by zhouyang on 2017/4/18.
 */
define(function(){

    /**
     * 事件处理器
     */
    var eventHandler={
        eventList:new Array(),
        /**
         * 增加监听事件源
         * @param actionName
         * @param func
         */
        addEventListener:function(eventName,func){
            var evetnObj = new Object();
            evetnObj.eventName=eventName;
            evetnObj.func=func;

            this.eventList.push(evetnObj);
        },
        /**
         * 响应监听事件
         * @param actionName
         */
        onEvent:function(actionName){
            for (var i = 0; i < this.eventList.length; i++) {
                var item = this.eventList[i];
                if(actionName==item.eventName){
                    item.func();
                }
            }
        }
    }


    return eventHandler;
});