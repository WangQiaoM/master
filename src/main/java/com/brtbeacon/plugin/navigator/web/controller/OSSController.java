package com.brtbeacon.plugin.navigator.web.controller;

import com.aliyun.oss.bean.OSSManager;
import com.brtbeacon.plugin.common.http.RespResult;
import com.brtbeacon.plugin.common.util.IdKeyGenerator;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;

/**
 * OSSController
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/20
 */
@Controller
@RequestMapping("/oss")
public class OSSController {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private OSSManager ossManager;

    @Autowired
    public void setOssManager(OSSManager ossManager) {
        this.ossManager = ossManager;
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<RespResult> upload(HttpSession session, @RequestParam("file") MultipartFile file) {

        final long MAX_SIZE = 100 * 1024;
        final String IDENTITY = "wechat_navigator";
        final String PLUGIN_BUCKET_PATH = "pro/wxdh";
        final String ACCESS_ROOT_URL = "http://files.brtbeacon.com";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        HttpStatus status = HttpStatus.OK;

        RespResult.Builder resp = new RespResult.Builder();

        if (file != null && file.getSize() > 0) {
            // Validate
            long size = file.getSize();
            if (size > MAX_SIZE) {
                resp.code(RespResult.Code.Failure);
                resp.message("文件超出最大上传限制：100kb。");
                return new ResponseEntity<RespResult>(resp.build(), headers, HttpStatus.BAD_REQUEST);
            }

            // 标识
            String identity;
            String phone = session.getAttribute("user").toString();

            if (StringUtils.isEmpty(phone)) {
                identity = phone;
            } else {
                identity = IDENTITY;
            }

            StringBuilder builder = new StringBuilder(PLUGIN_BUCKET_PATH).append("/");
            builder.append("upload/");
            // 路径 + 前缀
            builder.append(identity).append("/").append(DateFormatUtils.format(Calendar.getInstance(), "yyyyMMddHHmm"));
            // 文件名
            String originalName = file.getOriginalFilename();
            String suffix = originalName.substring(originalName.lastIndexOf(".")); // .jpg .png .gif
            builder.append("_").append(IdKeyGenerator.getInstance().nextKey()).append(suffix);

            InputStream in = null;
            try {
                in = file.getInputStream();
                boolean flg = ossManager.putObject(builder.toString(), size, in);
                if (flg) {
                    String url = ACCESS_ROOT_URL + "/" + builder.toString();
                    resp.result(url);
                    resp.data("url", url);
                } else {
                    resp.code(RespResult.Code.Failure);
                    resp.message("文件上传至阿里云出错");
                    status = HttpStatus.INTERNAL_SERVER_ERROR;
                }
            } catch (IOException e) {
                resp.code(RespResult.Code.Exception);
                resp.message("文件上传出错");
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                logger.error(">> Upload file error:", e);
            } finally {
                IOUtils.closeQuietly(in);
            }
        }

        return new ResponseEntity<RespResult>(resp.build(), headers, status);
    }

}
