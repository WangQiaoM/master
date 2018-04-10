package com.brtbeacon.plugin.common.util;

import org.apache.tomcat.util.http.fileupload.IOUtils;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * ResponseWriteUtils
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/15.
 */
public class ResponseWriteUtils {
    /**
     * 输出流
     *
     * @param response
     * @param bytes
     */
    public static void writeBytes(HttpServletResponse response, byte[] bytes) {
        ServletOutputStream outputStream = null;
        try {
            outputStream = response.getOutputStream();
            outputStream.write(bytes);
            outputStream.flush();
        } catch (IOException e) {
            throw new IllegalArgumentException("Write bytes error", e);
        } finally {
            IOUtils.closeQuietly(outputStream);
        }
    }
}
