/**
 * 弹窗口视图
 *
 */
define(["webpro.config","mock","logger","bootstrap","jqueryValidate"],function(webproConfig){


	function WebPro_dialogPage(parentWindow,jsonData){
		var webPro=parentWindow.webpro;						//父节点对象
		//var msg=webPro.mainMsg;								//消息模块
		var modeType =$.getUrlParam("modeType");			//试图  模态状态[可编辑|非编辑]

		requirejs(["DicControls","CommonControls","TextAreaControls","SingleUpload"], function (DicControls,CommonControls,TextAreaControls,SingleUpload) {
			CommonControls(jsonData.data||{},modeType);				//基础控件		构造
			//MapControls(jsonData.data||{},modeType);				//地图控件		构造
			TextAreaControls(jsonData.data||{},modeType);			//富文本控件		构造
			SingleUpload(jsonData.data||{},modeType);				//单上传控件初始化	构造

			//字典控件渲染
			DicControls.render(webPro.mainDic,jsonData.data||{},modeType);
		});
	}
	return WebPro_dialogPage;
});