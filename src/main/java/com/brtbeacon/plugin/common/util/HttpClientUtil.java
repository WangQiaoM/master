package com.brtbeacon.plugin.common.util;

import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;


/**
 * 与远程服务器建立连接
 * 
 * @author mayong
 */
public class HttpClientUtil {

	private static final Log logger = LogFactory.getLog(HttpClientUtil.class);

	/**
	 * get方式请求,并返回MAP对象
	 * 
	 * @param url
	 * @param params
	 * @return
	 * @throws IOException
	 */
	/*public static synchronized Map<String, Object> sendGetToMap(String url, Map<String, Object> params) {
		String resultStr=sendGetToString(url,params);
		logger.info("send url:"+url+"\n			resultData:"+resultStr);

		// 返回参数
		Map<String, Object> reMap= JsonUtil.ToMap(resultStr);

		return reMap;
	}*/

	/**
	 * get方式请求,并返回String结果
	 * @param url
	 * @param params
     * @return
     */
	public static synchronized String sendGetToString(String url, Map<String, Object> params) {
		String resultStr="";
		// 返回参数
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = null;
		try {
			// 拼接参数
			String newurl = uriBuilder(url, params);
			logger.info("内部服务器请求地址: {}"+newurl);
			httpGet = new HttpGet(newurl);

			logger.info("打开连接，正在发送....");
			HttpResponse resp = httpClient.execute(httpGet);

			resultStr= EntityUtils.toString(resp.getEntity(), "UTF-8");

			logger.info("返回参数: " + resultStr);
		} catch (ClientProtocolException e) {
			logger.error("客户端协议异常", e);
		} catch (IOException e) {
			logger.error("IO异常", e);
		} finally {
			// 关闭连接
			try {
				httpClient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			logger.info("连接关闭");
		}

		return resultStr;
	}

	/**
	 * 发送http请求
	 *
	 * @param url					请求地址
	 * @param outputStr 			提交的数据
	 * @return 返回微信服务器响应的信息
	 */
	public static String sendPostToString(String url, String outputStr) {
		String resultStr="";

		// 拼接参数
		String newurl = HttpClientUtil.uriBuilder(url,null);

		HttpPost httpPost = new HttpPost(newurl);

		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {
			httpPost.setEntity(new StringEntity(outputStr,"utf-8"));

			logger.info("打开连接，正在发送...."+outputStr);
			HttpResponse resp = httpClient.execute(httpPost);

			resultStr= EntityUtils.toString(resp.getEntity(), "UTF-8");

			logger.info("返回参数: " + resultStr);
		} catch (ClientProtocolException e) {
			logger.error("客户端协议异常", e);
		} catch (IOException e) {
			logger.error("IO异常", e);
		} finally {
			// 关闭连接
			try {
				httpClient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			logger.info("连接关闭");
		}

		return resultStr;
	}


	/**
	 *
	 * @param url
	 * @param character
     * @return
     */
	public static synchronized String sendGetByCharacter(String url, String character){
		// 返回参数
		String resultStr ="";
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet httpGet = null;
		try {
			// 拼接参数
			httpGet = new HttpGet(url);

			logger.info("打开连接，正在发送....");
			HttpResponse resp = httpClient.execute(httpGet);

			InputStream is = resp.getEntity().getContent();

			String str = null;
			StringBuffer sb = new StringBuffer();
			BufferedReader reader =new BufferedReader(new InputStreamReader(is,
					character));
			while ((str = reader.readLine()) != null) {
				sb.append(str);
			}

			resultStr=sb.toString();

			logger.info("返回参数: " + resultStr);
		} catch (ClientProtocolException e) {
			logger.error("客户端协议异常", e);
		} catch (IOException e) {
			logger.error("IO异常", e);
		} finally {
			// 关闭连接
			httpClient.getConnectionManager().shutdown();
			logger.info("连接关闭");
		}

		return resultStr;
	}

	/**
	 * doPost请求
	 * @param url
	 * @return
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	public static JSONObject doPostStr(String url, String outStr) throws IOException{
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
		JSONObject js = null;
		httpPost.setEntity(new StringEntity(outStr,"utf-8"));
		HttpResponse httpResponse = httpClient.execute(httpPost);
		String result = EntityUtils.toString(httpResponse.getEntity(),"utf-8");
		js= JSONObject.fromObject(result) ;
		return js;
	}

	/**
	 * sendGetPublicIP (defaultIp)
	 * @author YANGBIN
	 * @since 2014-3-12
	 * @param defaultIp
	 * @return ip
	 */
	public static String sendGetPublicIP(String defaultIp){
		String str="";
		StringBuffer sb=new StringBuffer();
		InputStream is  = null;
		BufferedReader reader = null;
		try{
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpGet httpGet = null;
			String url="http://iframe.ip138.com/ic.asp";
			httpGet = new HttpGet(url);
			HttpResponse resp = httpClient.execute(httpGet);
			is = resp.getEntity().getContent();
			reader = new BufferedReader(new InputStreamReader(is,"utf-8"));
			while ((str = reader.readLine()) != null) {
				sb.append(str);
			}
			int bidx=sb.indexOf("[");
			int eidx=sb.indexOf("]");
			str=sb.substring(bidx+1, eidx);
			return str;
		}catch (Exception e) {
			return defaultIp;
		}finally{
			try {
				reader.close();
				is.close();
			} catch (Exception e) {
				
			}
			
		}
	}
	

	public synchronized static String uriBuilder(String baseUrl,Map<String,Object> params){
		URIBuilder uriBulder;
		try {
			uriBulder = new URIBuilder(baseUrl);
			// 拼接参数
			if (params != null && params.size() != 0) {
				Set<Entry<String,Object>> set= params.entrySet();
				 Iterator<Entry<String,Object>> iter =set.iterator();
				while (iter.hasNext()) {
					Entry<String,Object> entry = iter.next();
					
					uriBulder.setParameter(entry.getKey(), entry.getValue()+"");
				}
			}
			String url=uriBulder.build().toString();
			logger.debug("URIBuilder:"+url);
			return url;
		} catch (URISyntaxException e) {
			throw new RuntimeException("RuntimeException",e);
		}
		
	}


	/*public static void main(String[] args) {

		String testStr="{\"body\":{\"avgoil\":\"\",\"chepai\":\"\",\"driverMile\":\"\",\"haoyou\":\"\",\"oilfee\":\"\",\"results\":[]},\"header\":{\"alert\":true,\"code\":0,\"message\":\"success\"}}";


		GsonBuilder gb = new GsonBuilder();
		Gson g = gb.create();

		Map<String,Object> t= g.fromJson(testStr
				, new TypeToken<Map<String, Object>>() {}.getType());



	}*/


	public static synchronized String sendPostString(String url, Map<String, Object> params) {
		String resultStr="";
		// 返回参数
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpPost httpPost = null;
		try {
			// 拼接参数
			String newurl = uriBuilder(url, params);
			httpPost = new HttpPost(newurl);

			logger.info("打开连接，正在发送....");
			HttpResponse resp = httpClient.execute(httpPost);

			resultStr= EntityUtils.toString(resp.getEntity(), "UTF-8");

			logger.info("返回参数: " + resultStr);
		} catch (ClientProtocolException e) {
			logger.error("客户端协议异常", e);
		} catch (IOException e) {
			logger.error("IO异常", e);
		} finally {
			// 关闭连接
			try {
				httpClient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			logger.info("连接关闭");
		}

		return resultStr;
	}
}
