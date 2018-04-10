package com.brtbeacon.plugin.navigator;

import com.aliyun.oss.spring.boot.configure.OSSManagerConfiguration;
import com.brtbeacon.plugin.navigator.entity.BuildingExt;
import com.brtbeacon.plugin.navigator.web.customizer.CustomErrorViewResolver;
import com.brtbeacon.plugin.navigator.weixin.entity.WxConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ErrorViewResolver;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;

import javax.servlet.MultipartConfigElement;

@Configuration
@Import(OSSManagerConfiguration.class)
@EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true)
@SpringBootApplication
public class WechatNavigatorApplication extends SpringBootServletInitializer {

    // 异常页面
    @Bean
    public ErrorViewResolver errorViewResolver() {
        return new CustomErrorViewResolver();
    }

    // 建筑信息
    @Bean
    @ConfigurationProperties(prefix = "build")
    public BuildingExt buildingExt() {
        return new BuildingExt();
    }

    // 微信信息
    @Bean
    @ConfigurationProperties(prefix = "wx")
    public WxConfig wxConfig() {
        return new WxConfig();
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WechatNavigatorApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(WechatNavigatorApplication.class, args);
    }


    /**
     * 文件上传配置
     * @return
     */
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        //文件最大
        factory.setMaxFileSize("10MB"); //KB,MB
        /// 设置总上传数据总大小
        factory.setMaxRequestSize("10MB");
        return factory.createMultipartConfig();
    }
}
