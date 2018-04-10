package com.aliyun.oss.spring.boot.configure;

import com.aliyun.oss.bean.OSSManager;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OSSManagerConfiguration
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/20
 */
@Configuration
@EnableConfigurationProperties(OSSProperties.class)
public class OSSManagerConfiguration {

    private final OSSProperties properties;

    public OSSManagerConfiguration(OSSProperties properties) {
        this.properties = properties;
    }

    @Bean
    @ConditionalOnMissingBean(OSSManager.class)
    public OSSManager buildOSSManager() {
        OSSManager.Builder builder = new OSSManager.Builder();
        builder.bucketName(properties.getBucketName());
        builder.endpoint(properties.getEndpoint()).accessKeyId(properties.getAccessKeyId());
        builder.accessKeySecret(properties.getAccessKeySecret());
        return builder.build();
    }
}
