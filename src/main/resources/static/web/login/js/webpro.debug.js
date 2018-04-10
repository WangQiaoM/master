
var rootProRoot="http://127.0.0.1:8080/BXHKPro/";

//拦截ajax
/**
 * dialog测试接口 
 */
Mock.mock("http://test.json", {
        'status|-100-200':0,
        'msg': '提交失败',
        'data':null
});


Mock.mock(rootProRoot+"pages/upload", {
        'status|-100-200':0,
        'msg': '提交失败',
        'data':null
});

/**
 * 默认注入的json数据 
 */
var gridViewJson={
	searchBar:[{
				"tapControl":"input",
				"titleName":"名字",
				"fieldName":"userName"
			},{
				"tapControl":"input",
				"titleName":"测试字段1",
				"fieldName":"test1"
			},{
				"tapControl":"input",
				"titleName":"测试字段2",
				"fieldName":"test2"
			}],
	"gridColums":[{"":""}],
	"gridData": {"total":28,"rows":[
				{"productid":"FI-SW-01","productname":"Koi","unitcost":10.00,"status":"P","listprice":36.50,"attr1":"Large","itemid":"EST-1"},
				{"productid":"K9-DL-01","productname":"Dalmation","unitcost":12.00,"status":"P","listprice":18.50,"attr1":"Spotted Adult Female","itemid":"EST-10"},
				{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":38.50,"attr1":"Venomless","itemid":"EST-11"},
				{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":26.50,"attr1":"Rattleless","itemid":"EST-12"},
				{"productid":"RP-LI-02","productname":"Iguana","unitcost":12.00,"status":"P","listprice":35.50,"attr1":"Green Adult","itemid":"EST-13"},
				{"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":158.50,"attr1":"Tailless","itemid":"EST-14"},
				{"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":83.50,"attr1":"With tail","itemid":"EST-15"},
				{"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":23.50,"attr1":"Adult Female","itemid":"EST-16"},
				{"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":89.50,"attr1":"Adult Male","itemid":"EST-17"},
				{"productid":"AV-CB-01","productname":"Amazon Parrot","unitcost":92.00,"status":"P","listprice":63.50,"attr1":"Adult Male","itemid":"EST-18"}
			]},
	"dataUrl":""
};

/**
 * 拦截订单功能demo 
 */
(function(){
	/**
	 * 列表数据
	 */
	Mock.mock(rootProRoot+"pages/order_test_group/list_grid.json",{
			'status':200,
	        'msg': '操作成功！',
	        'total':28,
	        'rows|10':[{
	        		"productid":"FL-DSH-@integer(20, 1000)",
	        		"productname":"@FIRST",
	        		"unitcost":"@integer(200, 500)",
	        		"status":"@character",
	        		"listprice":"@float(60, 100,2,1)",
	        		"attr1":"@FIRST",
	        		"itemid":"EST-@integer(60, 100)"
	        }]
	        
	});

	/**
	 * 数据删除 
	 */
	Mock.mock(rootProRoot+"pages/order_test_group/info_delete.json",{
			'status':200,
	        'msg': '操作成功！',
	        'data':null
	});
})();

/**
 *  默认的测试功能
 */
(function(){
	/**
	 * 列表数据
	 */
	Mock.mock(rootProRoot+"pages/test_group/list_grid.json",{
			'status':200,
	        'msg': '操作成功！',
	        'total':28,
	        'rows|10':[{
	        		"id":"FL-DSH-@integer(20, 1000)",
	        		"userName":"@cname",
	        		"city":"@city(true)",
	        		"email":"@email",
	        		"phoneNo":"@string('number', 13)",
	        		"status":"@character"
	        		
	        }]
	});
	
	/**
	 * 数据删除 
	 */
	Mock.mock(rootProRoot+"pages/test_group/info_delete.json",{
			'status':200,
	        'msg': '操作成功！',
	        'data':null
	});
	
})();

//表单默认数据
var templeFormJson={
	/** 测试dialog表单 **/
	"inDate":"",					//日期
	"test2":"kyyzy@tom.com",		//邮箱
	"test3":"123456",			//测试字串长度1，大于5
	"test4":"1234",				//测试字串长度2，小于5
	"test5":"7",					//测试数字5-10
	"test6":"7",					//测试数字5-10
	"test8":"11",				//数字大于10
	"test9":"9"					//数字小宇10
};
