/**
 * Created by zhouyang on 2017/6/6.
 * 加载文本文件
 */
define(function(){

    /**
     *
     * @param files
     * @param callBackFun
     */
    function loadSource(files,callBackFun){
        for (var i = 0, size = files.length; i < size; i++) {
            var page = files[i];
            files[i]="text!"+page;
        }

        require(files,function(){
            var pages=[];
            for (var i = 0, size = arguments.length; i < size; i++) {
                var name=files[i].replace(/text!/, '');
                pages.push({
                    name:name,
                    url:"#"+name,
                    html:arguments[i]
                });
            }

            callBackFun(pages);
        });
    }
    return loadSource;
});




