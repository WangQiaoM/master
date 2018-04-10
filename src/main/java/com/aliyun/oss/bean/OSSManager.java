package com.aliyun.oss.bean;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.ObjectMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.InputStream;

/**
 * OSSManager
 *
 * @author Archx[archx@foxmail.com]
 * @date 2016/11/14
 */
public class OSSManager {

    private final Logger logger = LoggerFactory.getLogger(OSSManager.class);

    /**
     * 仓库名称
     */
    private String bucketName;

    /**
     * OSS客户端
     */
    private OSSClient ossClient;

    public static class Builder {

        /**
         * 仓库名
         */
        private String bucketName;
        /**
         * 节点地址
         */
        private String endpoint;
        /**
         * 标识
         */
        private String accessKeyId;

        /**
         * 秘钥
         */
        private String accessKeySecret;

        private OSSClient ossClient;

        public String getBucketName() {
            return bucketName;
        }

        public OSSClient getOssClient() {
            return ossClient;
        }

        public Builder bucketName(String name) {
            this.bucketName = name;
            return this;
        }

        public Builder endpoint(String endpoint) {
            this.endpoint = endpoint;
            return this;
        }

        public Builder accessKeyId(String accessKeyId) {
            this.accessKeyId = accessKeyId;
            return this;
        }

        public Builder accessKeySecret(String accessKeySecret) {
            this.accessKeySecret = accessKeySecret;
            return this;
        }

        public OSSManager build() {
            if (StringUtils.isEmpty(bucketName) || StringUtils.isEmpty(endpoint) || StringUtils.isEmpty(accessKeyId)
                    || StringUtils.isEmpty(accessKeySecret)) {
                throw new IllegalArgumentException("缺失必要参数，无法构建 OSS Client");
            }
            this.ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
            return new OSSManager(this);
        }
    }

    /**
     * 构造函数
     *
     * @param bucketName 库名称
     * @param ossClient  客户端
     */
    public OSSManager(String bucketName, OSSClient ossClient) {
        this.bucketName = bucketName;
        this.ossClient = ossClient;
    }

    /**
     * 构造函数
     *
     * @param builder
     */
    public OSSManager(Builder builder) {
        this.bucketName = builder.bucketName;
        this.ossClient = builder.ossClient;
    }

    private OSSManager() {
    }

    /**
     * 上传文件
     *
     * @param key    文件路径
     * @param length 文件长度
     * @param in     文件流
     * @return boolean
     */
    public boolean putObject(String key, long length, InputStream in) {
        // 创建上传Object的Metadata
        ObjectMetadata meta = new ObjectMetadata();
        // 必须设置ContentLength
        meta.setContentLength(length);
        try {
            // 上传Object.
            ossClient.putObject(bucketName, key, in, meta);
        } catch (OSSException e) {
            logger.error("OSS 上传文件 {} 出错: {}", key, e.getMessage());
            return false;
        }
        return true;
    }

    /**
     * 拷贝文件
     *
     * @param srcKey  原始位置
     * @param destKey 目标位置
     * @return boolean
     */
    public boolean copyObject(String srcKey, String destKey) {
        return copyObject(srcKey, destKey, false);
    }

    /**
     * 拷贝文件
     *
     * @param srcKey  原始位置
     * @param destKey 目标位置
     * @param delete  是否删除原文件
     * @return boolean
     */
    public boolean copyObject(String srcKey, String destKey, boolean delete) {
        try {
            // 拷贝Object
            ossClient.copyObject(bucketName, srcKey, bucketName, destKey);
            //删除原文件
            if (delete)
                ossClient.deleteObject(bucketName, srcKey);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("OSS 复制文件 {} 至 {} 出错: {}", srcKey, destKey, e.getMessage());
            return false;
        }
        return true;
    }

    /**
     * 删除文件
     *
     * @param key 文件位置
     * @return boolean
     */
    public boolean deleteObject(String key) {
        try {
            ossClient.deleteObject(bucketName, key);
        } catch (OSSException e) {
            e.printStackTrace();
            logger.error("OSS 删除文件 {} 出错: {}", key, e.getMessage());
            return false;
        }
        return true;
    }
}
