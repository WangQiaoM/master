package com.brtbeacon.plugin.navigator.web.customizer;

import org.springframework.boot.autoconfigure.web.ErrorViewResolver;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * CustomErrorViewResolver
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/15.
 */
public class CustomErrorViewResolver implements ErrorViewResolver {

    private String errorViewName = "error";

    @Override
    public ModelAndView resolveErrorView(HttpServletRequest request, HttpStatus status, Map<String, Object> model) {
        // 返回自定义视图
        return new ModelAndView(errorViewName, model);
    }

    public void setErrorViewName(String errorViewName) {
        this.errorViewName = errorViewName;
    }
}

