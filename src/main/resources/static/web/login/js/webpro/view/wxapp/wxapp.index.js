/**
 * Created by zhouyang on 2017/6/5.
 *
 * step1:   主界面节点#container
 *
 * step2:   页面项:javascript [type="text/html"]
 *
 */
define(["loadSource","webpro.config","jquery","QRCode","weui.min"],function(loadSource,webproConfig,$){

    function webproApp(homePage,pages) {
        pages.insert(0,"wxapp_tmpl");
        pages.push("page_msg_success");
        pages.push("page_imgview");

        //加载页面对象
        loadSource(pages,function(data){
            //加载框架模板页面
            (function () {
                $("body").prepend(data[0].html);

                pages.removeAt(0);
                data.removeAt(0);
            })();

            //加载动态的模板页面
            (function () {
                var pageManager={
                    mainContent:$('#container'),
                    pages:[],                       //页面对象
                    pageStack:[],                   //堆栈中的页面对象
                    pageAppendFun: function () {},
                    /**
                     * 根据页面名,跳转页面
                     * @param name
                     */
                    go: function (pageName) {

                        if(pageName==homePage){return ;}

                        var page =this.pages.arrForAttrVal("name",pageName)[0];
                        if(typeof(page)=='undefined'){
                            console.error("没找到对应的模块文件",pageName);
                            return ;
                        }

                        var pageHtml = $(page.html).addClass('slideIn').addClass(page.name);
                        pageHtml.on('animationend webkitAnimationEnd', function(){
                            pageHtml.removeClass('slideIn').addClass('js_show');
                        });

                        this.mainContent.append(pageHtml);
                        this.pageAppendFun.call(this, pageHtml);

                        location.hash = page.name==homePage?"#":page.url;
                        //增加到堆栈对象
                        this.pageStack.push(page);
                        this.pageStack.lastObject().dom=pageHtml;

                        //history.replaceState && history.replaceState({pageIndex: this.pageStack.length}, '', location.href);
                    },
                    /**
                     * 返回
                     * @param name
                     */
                    back: function (pageName) {
                        //移除当前页
                        var backPage=this.pageStack.lastObject();
                        this.pageStack.pop();

                        $(".page."+pageName).insertBefore($(".page."+this.pageStack.lastObject().name));

                        backPage.dom.addClass("slideOut").on('animationend webkitAnimationEnd', function () {
                            backPage.dom.removeClass('slideOut');
                            backPage.dom.remove();
                        });
                    },
                    /**
                     *
                     */
                    loadHomePage: function () {
                        var page =this.pages.arrForAttrVal("name",homePage)[0];
                        var pageHtml = $(page.html).addClass('slideIn').addClass(page.name);
                        pageHtml.on('animationend webkitAnimationEnd', function(){
                            pageHtml.removeClass('slideIn').addClass('js_show');
                        });

                        this.mainContent.append(pageHtml);
                        this.pageAppendFun.call(this, pageHtml);

                        //增加到堆栈对象
                        this.pageStack.push(page);
                        this.pageStack.lastObject().dom=pageHtml;
                    },
                    /**
                     * 显示成功页面
                     * @param title
                     * @param des
                     */
                    successPage: function (title,des) {
                        this.go("page_msg_success");
                        history.replaceState({
                            successPage_title:title,
                            successPage_des:des
                        },"");

                    },
                    /**
                     * 加载图片URL
                     * @param img
                     */
                    imgviewPage: function (img) {
                        this.go("page_imgview");

                        var imgData="url('"+img+"')";
                        history.replaceState({
                            imgviewPage_imgData:imgData
                        },"");
                    },
                    /**
                     * 加载二维码
                     * @param img
                     */
                    imgviewQRCode: function (txt) {
                        this.go("page_imgview");


                        var qrimg=$("<div class='tempQRCode'></div>");
                        var canvas=$(qrimg).qrcode({width: 64,height: 64,text: txt}).find('canvas').get(0);


                        var dataImg=canvas.toDataURL('image/jpg');


                        var imgData="url('"+dataImg+"')";
                        history.replaceState({
                            imgviewPage_imgData:imgData,
                        },"");

                    },
                };
                window.pageManager = pageManager;

                //var state = history.state || {};
                for (var i = 0, size = data.length; i < size; i++) {
                    pageManager.pages.push(data[i]);
                }

                //定义调用函数
                var winH = $(window).height();
                pageManager.pageAppendFun=function($html){
                    var $foot = $html.find('.page__ft');
                    if($foot.length < 1) return;

                    if($foot.position().top + $foot.height() < winH){
                        $foot.addClass('j_bottom');
                    }else{
                        $foot.removeClass('j_bottom');
                    }
                };

                pageManager.loadHomePage();

                var pageName = location.hash.indexOf('#') === 0 ? location.hash : homePage;
                pageName=pageName.replace("#","");
                pageManager.go(pageName);
            })();
        });

        $(window).on('hashchange', function () {


            var pageName = location.hash.indexOf('#') === 0 ? location.hash : homePage;
            pageName=pageName.replace("#","");

            if(pageManager.pageStack.lastObject().name==pageName){
                return ;
            }

            if (pageManager.pageStack.arrForAttrVal("name",pageName).length==1) {
                pageManager.back(pageName);
            } else {
                pageManager.go(pageName);
            }
        });

        return window.pageManager;
    }

    return webproApp;
});
