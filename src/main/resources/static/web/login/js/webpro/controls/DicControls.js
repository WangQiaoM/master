/**
 * Created by zhouyang on 2017/4/18.
 * 字典及select,多选select控件
 */
define(["jquery","logger","jqueryEasyui"],function(){

    /**
     * 构造字典对象
     * @param jsonData 字典数据
     * @returns {{map: {}, queryInfo: controls.queryInfo, valueForCodeAndKey: controls.valueForCodeAndKey, builderSelect: controls.builderSelect, builderChildSelect: controls.builderChildSelect, initChildSelect: controls.initChildSelect}}
     */
    function builder(jsonData){
        var controls={
            /**
             * 键值对象
             */
            map:{},

            /**
             * 查询字典键值
             * @param key
             * @returns {*}
             */
            queryInfo:function(key){
                if(this.map[key]==undefined){
                    this.map[key] = new Array();
                    this.map[key]=jsonData.arrForAttrVal("pcode",key);
                }
                return this.map[key];
            },

            /**
             * 根据节点键值与属性键值,显示名称
             * @param {Object} code
             * @param {Object} key
             */
            valueForCodeAndKey:function(code,key){
                var dicObj=this.queryInfo(code);

                for(var i=0,size=dicObj.length;i<size;i++){
                    if(dicObj[i].code==key){
                        return dicObj[i].name;
                    }
                }
            },

            /**
             * 通过字典构造选择控件
             * @param {Object} selObj
             */
            builderSelect:function(selObj){
                var key = selObj.attr("forDic");
                var listItem = this.queryInfo(key);

                selObj.html("");
                selObj.append("<option value=''>--请选择--</option>");

                for(var i=0,size=listItem.length;i<size;i++){
                    selObj.append("<option value='"+listItem[i].code+"'>"+listItem[i].name+"</option>");
                }
            },

            /**
             * 通过字典构造关联的下拉组件
             * @param {Object} pSelPbj
             * @param {Object} selObj
             */
            builderChildSelect:function(pSelPbj,selObj){
                var that=this;

                selObj.html("");
                selObj.append("<option value=''>--请先选:"+pSelPbj.prev().text()+"--</option>");

                pSelPbj.change(function(){
                    var selDicArr = that.queryInfo($(this).val());
                    selObj.html("");
                    selObj.append("<option value=''>--请选择--</option>");

                    for(var i=0,size=selDicArr.length;i<size;i++){
                        selObj.append("<option value='"+selDicArr[i].code+"'>"+selDicArr[i].name+"</option>");
                    }

                    console.log("返回对象:"+$(this).val() +"    by:",selDicArr);
                });

            },

            /**
             * 初始化选择控件
             * @param pSelPbj
             * @param selObj
             */
            initChildSelect:function(pSelPbj,selObj){

                var selDicArr = this.queryInfo(pSelPbj.val());

                //alert(pSelPbj.val());

                selObj.html("");
                selObj.append("<option value=''>--请选择--</option>");

                for(var i=0,size=selDicArr.length;i<size;i++){
                    selObj.append("<option value='"+selDicArr[i].code+"'>"+selDicArr[i].name+"</option>");
                }

            }
        };

        return controls;


    };

    /**
     * 渲染字典控件
     * @param dicControlsObj    字典数据对象,通过 DicControls.builder()构造
     * @param jsonData          页面注入数据对象
     * @param modeType          视图状态
     */
    function render(dicControlsObj,jsonData,modeType){

        //选择框   控件初始化
        (function () {
            //父级
            $("select[forDic]").each(function(){
                dicControlsObj.builderSelect($(this));
                $(this).val(jsonData[$(this).attr("name")]);
            });

            //子级
            $("select[forParent]").each(function(){
                var pSel = $($(this).attr("forParent"));
                if(pSel.length==0){
                    logger.warn("联动关联select 没有绑定到父级对象:",$(this).attr("forParent"));
                }
                dicControlsObj.builderChildSelect(pSel,$(this));
                $(this).val(jsonData[$(this).attr("name")]);
            });

            //复选框
            $(".easyui-combobox").each(function(){
                var selNames=(jsonData[$(this).attr("name")]||"").split(",");

                $(this).find("option:first").remove();
                $(this).combobox({
                    height:"28px",
                    panelHeight:'auto',
                    multiple:true,
                    value:selNames,
                    editable:false
                });

            });
        })();

        //TODO 表格

        //子节点 渲染数据
        $("select[forParent]").each(function(){
            var pSel = $($(this).attr("forParent"));
            dicControlsObj.initChildSelect(pSel,$(this));
        });
    }

    return {
        builder:builder,                    //用于第一次构造
        render:render                       //用户数据渲染
    };
});


