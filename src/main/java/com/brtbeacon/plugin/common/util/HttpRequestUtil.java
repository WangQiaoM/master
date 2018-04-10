package com.brtbeacon.plugin.common.util;

import net.sf.json.JSONArray;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.Map.Entry;

public class HttpRequestUtil {

	private static Log log = LogFactory.getLog(HttpRequestUtil.class);

	public static synchronized String getClientIpAddr(HttpServletRequest request) {
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
		return ip.split(",")[0];
	}
	
	public static String getParameter(HttpServletRequest request, String name){
		String value = request.getParameter(name);
		if(StringUtils.isEmpty(value)){
			if("schooldataid".equals(name)){
				value=request.getHeader("sdataid");
			}else if("userid".equals(name)){
				value=request.getHeader("udataid");
			}
		}
		return value;
	}

	/**
	 * 得到序列化的参数字串
	 * @param map
	 * @return
     */
	public static synchronized String getSynchronizedParameter(Map<String,Object> map){
		List<String> tempList = new LinkedList<String>();
		Iterator iter = map.entrySet().iterator();
		while (true) {
			if (!(iter.hasNext())) break;

			Entry<String, Object> entry = (Entry<String, Object>) iter.next();
			String key = entry.getKey();
			Object value = entry.getValue();

			tempList.add(key+"="+value);
		}
		String str =StringUtils.join(tempList.toArray(),"&");
		return str;
	}

	public static synchronized Map<String, Object> getParameterMap(
			HttpServletRequest request) {
		if (request == null) {
			throw new RuntimeException("request is null!");
		}
		Map<String, Object> rsMap = new HashMap<String, Object>();
		Map map = request.getParameterMap();
		Set entryset = map.entrySet();
		Iterator iter = entryset.iterator();
		while (iter.hasNext()) {
			Entry<String, Object> entry = (Entry<String, Object>) iter.next();
			String key = entry.getKey();
			Object oldvalue = entry.getValue();
			String value = null;
			if (oldvalue instanceof String[]) {
				String[] strs = (String[]) oldvalue;
				if (strs != null && strs.length >= 1) {
					value = strs[0];
				}
			} else if (value instanceof String) {
				value = (String) oldvalue;
			}
			rsMap.put(key, value);
		}

		return rsMap;
	}

	public static synchronized String getPathPiece(HttpServletRequest request,
			int idx) {
		String uri = request.getRequestURI() + "///////////";
		log.debug("RequestURI:" + uri);

		String[] pices = uri.split("/", 13);
		idx = Math.max(0, idx);
		idx = Math.min(10, idx);

		log.debug(pices.length + "pieces:"
				+ JSONArray.fromObject(pices).toString());

		String context = request.getContextPath();
		log.debug("context:" + context);

		// uri:/interface/weixin/orginfo/
		// url:/context/interface/weixin/orginfo/

		if ("/".equals(context)) {
			return pices[idx + 1]; // pices[3];
		} else {
			return pices[idx + 2]; // pices[4];
		}
	}

	public static void main(String[] args) {
		String uri = "/" + "///////////";
		int idx = 10;
		String[] pices = uri.split("/", 13);
		idx = Math.max(0, idx);
		idx = Math.min(10, idx);

		log.debug(pices.length + "pices:"
				+ JSONArray.fromObject(pices).toString());
	}

	public static void setSessionAttribute(HttpServletRequest request,
			String string, String username) {
		// TODO Auto-generated method stub
		
	}

	public static String getSessionAttribute(HttpServletRequest request,
			String string) {
		// TODO Auto-generated method stub
		return null;
	}

	
	/**
	 * 提交参数装载到modelView
	 * @param request
	 * @param model
	 */
	public static void fillModel(HttpServletRequest request,
			Map<String, Object> model) {
		if (request == null) {
			throw new RuntimeException("request is null!");
		}
		
		Map map = request.getParameterMap();
		Set entryset = map.entrySet();
		Iterator iter = entryset.iterator();
		while (true) {
			if (!(iter.hasNext())) break;
			Entry<String, Object> entry = (Entry<String, Object>) iter.next();
			String key = entry.getKey();
			Object oldvalue = entry.getValue();
			String value = null;
			if (oldvalue instanceof String[]) {
				String[] strs = (String[]) oldvalue;
				if (strs != null && strs.length >= 1)
					value = strs[0];
			} else if (value instanceof String) {
				value = (String) oldvalue;
			}
			model.put(key, value);
		}
		
		
	}
}
