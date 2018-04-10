/**
 * Created by Administrator on 2017/5/27.
 */
require.config({
   paths:{
       "jquery":"../jquery-2.1.4",
       "wh":"wh_fun"
   }
});
require(['wh'],function(wh){
    wh.tab("tab>div","main>div","tab_on");
    wh.modMeng("qrcodeClick","qrcode")
});
