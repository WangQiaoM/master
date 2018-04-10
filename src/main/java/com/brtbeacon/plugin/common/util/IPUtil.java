package com.brtbeacon.plugin.common.util;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by cloudkg on 2017/4/21.
 * 获取远程IP地址
 */
public class IPUtil {
    /**
     *
     * getRemoteIP:获取远程请求客户端的外网IP <br/>
     *
     * @param request
     *            请求实体对象
     * @return ip 外网ip<br/>
     */
    public static String getRemoteIP(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}
