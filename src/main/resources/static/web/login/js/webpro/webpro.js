/**
 * Created by zhouyang on 2017/5/26.
 */
define(["jquery"],function(){

    /**
     * 基础对象继承
     */
    function webPro() {
        /**
         * Array对象
         */
        (function(){

            ///**
            // *
            // */
            //Object.prototype.isArray=function(obj){
            //    if (obj instanceof Array){
            //        return true;
            //    }
            //    else{
            //        return false;
            //    }
            //}

            /**
             * 根据属性值返回数组对象
             * @param {Object} attr     属性名
             * @param {Object} val      值
             */
            Array.prototype.arrForAttrVal=function(attr,val){
                var arr= [];
                for(var i=0;i<this.length;i++){
                    if (this[i][attr] == val){
                        arr.push(this[i]);
                    }
                    else if(this[i][attr]==undefined && val==""){
                        arr.push(this[i]);
                    }
                }

                return arr;
            };

            /**
             * 返回根据属性的新数组   数组对象[{},{}]=>数组[a,b]
             * @param {Object} property
             */
            Array.prototype.byPropArr=function(property){
                var arr= [];
                for(var i=0;i<this.length;i++){

                    arr.push(this[i][property]);
                }

                return arr;
            };

            /***
             * 根据另一个对象的属性值返回数组对象
             * @param {Object} attr
             * @param {Object} val
             */
            Array.prototype.arrForListAttr=function(list,fAttr,tAttr){
                var arr= [];

                for(var i=0;i<this.length;i++){
                    for (var y=0;y<list.length;y++) {
                        if(list[y][fAttr]==this[i][tAttr]){
                            arr.push(this[i]);
                        }
                    }
                }
                return arr;
            };

            /**
             * 返回最后一个对象
             * @returns object
             */
            Array.prototype.lastObject= function () {
                if(this.length==0){
                    return null;
                }
                return this[this.length-1];
            };

            /**
             * 属性重命名
             * @param name
             * @param newName
             */
            Array.prototype.attRename= function (name,newName) {
                for (var i = 0, size = this.length; i < size; i++) {
                    var value=this[i][name];
                    delete this[i][name];
                    this[i][newName]=value;
                }
            };

            /**
             * 在JS数组指定位置插入元素
             * @param index
             * @param item
             */
            Array.prototype.insert = function (index, item) {
                this.splice(index, 0, item);
            };

            /**
             *
             * @param index
             */
            Array.prototype.removeAt=function(index){
                this.splice(index,1);
            }
        })();

        /**
         * Date对象
         */
        (function(){
            /**
             * 增加天数
             * @param number
             * @returns {Date}
             */
            Date.prototype.addDays = function(number)
            {
                var adjustDate = new Date(this.getTime() + 24*60*60*1000*number);
                return adjustDate;
            };

            /**
             * 日期格式化
             * @param fmt
             * @returns {*}
             */
            Date.prototype.format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        })();

        /**
         * String对象
         */
        (function(){
            /**
             * 全局替换
             * @param str
             * @param replaceChat
             * @returns {String}
             */
            String.prototype.replaceAll=function (str,replaceChat) {
                var C=this;
                for(var i=0;i<str.length;i++) {
                    C=C.replace(str[i],replaceChat[i]);
                }
                return C;
            };

            /**
             * 替换两边空格
             * @returns {string}
             */
            String.prototype.trim=function () {
                return this.replace(/(^[/t/n/r]*)|([/t/n/r]*$)/g,'');
            };

            /**
             * String 增加url参数值
             * @param name
             * @param value
             * @returns {string}
             */
            String.prototype.addUrlParam=function(name,value){
                var str="";
                if(this.indexOf("?")==-1){
                    str=this.toString()+"?"+name+"="+value;
                }else{
                    str=this.toString()+"&"+name+"="+value;
                }

                return str;
            }

        })();

        /**
         * jquery对象
         */
        (function(){
            /**
             * 自定义jquery函数，完成将form 数据转换为 json格式
             * @returns {{}}
             */
            $.fn.serializeJson=function(){
                var serializeObj={}; // 目标对象
                var array=this.serializeArray(); // 转换数组格式

                $(array).each(function(){ // 遍历数组的每个元素 {name : xx , value : xxx}
                    if(serializeObj[this.name]){ // 判断对象中是否已经存在 name，如果存在name

                        if($.isArray(serializeObj[this.name])){
                            serializeObj[this.name].push(this.value); // 追加一个值 hobby : ['音乐','体育']
                            serializeObj[this.name]=serializeObj[this.name].join(",");
                        }else{
                            // 将元素变为 数组 ，hobby : ['音乐','体育']
                            serializeObj[this.name]=[serializeObj[this.name],this.value];
                            serializeObj[this.name]=serializeObj[this.name].join(",");
                        }
                    }else{
                        serializeObj[this.name]=this.value; // 如果元素name不存在，添加一个属性 name:value
                    }
                });
                return serializeObj;
            };

            /**
             * 得到游览器的URL参数
             * @param name
             * @returns {null}
             */
            $.getUrlParam=function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }


        })();

    }
    return webPro;
});