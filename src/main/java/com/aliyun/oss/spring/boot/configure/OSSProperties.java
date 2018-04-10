package com.aliyun.oss.spring.boot.configure;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * OSSProperties
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/20
 */
@ConfigurationProperties(prefix = "aliyun.oss")
public class OSSProperties {

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

    public String getBucketName() {
        return bucketName;
    }

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public String getAccessKeyId() {
        return accessKeyId;
    }

    public void setAccessKeyId(String accessKeyId) {
        this.accessKeyId = accessKeyId;
    }

    public String getAccessKeySecret() {
        return accessKeySecret;
    }

    public void setAccessKeySecret(String accessKeySecret) {
        this.accessKeySecret = accessKeySecret;
    }
}
