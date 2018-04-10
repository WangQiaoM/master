var brtbeacon_app_beacon_search_callback;

var brtbeacon_app_ble_enable_callback;

function on_brtbeacon_beacon_search(args) {

    if (brtbeacon_app_beacon_search_callback) {
        console.log(JSON.stringify(args));
        brtbeacon_app_beacon_search_callback(args);
    }
}

function on_app_ble_enable_callback (args) {

    if ("1"==args){
        args = "location service disable";
    }else if("2"==args){
        args = "bluetooth power off";
    }else{
        args = "ok";
    }
    brtbeacon_app_ble_enable_callback({errMsg:args})
}


var brtbeacon_app_heading_callback;
function on_app_heading_callback(heading) {
    brtbeacon_app_heading_callback &&  brtbeacon_app_heading_callback(heading);
}


var wx = {

    "config": function (obj) {

    },

    "ready": function (func) {
        func();
    },

    "hideMenuItems": function () {
    },
    "showMenuItems": function () {
    },
    "onMenuShareTimeline": function () {
    },
    "onMenuShareAppMessage": function () {
    },

    "stopSearchBeacons":function(obj){

    },

    "onSearchBeacons": function (obj) {
        brtbeacon_app_beacon_search_callback = obj.complete;
    },

    "startSearchBeacons": function (obj) {
        brtbeacon_app_ble_enable_callback = obj.complete;
        try{
            zs && zs.bleEnable();
        }catch (e){

        }
    },

    "share": function(info) {
        zs && zs.share(info);
    },
    "detail": function(info) {
        console.log("传递对象是:",info);
        zs && zs.detail(JSON.stringify(info));
    },
    "setHeading":function (callback) {
        brtbeacon_app_heading_callback = callback;
    }
};
