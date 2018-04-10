package com.brtbeacon.plugin.navigator.web.jsonp;

import com.brtbeacon.plugin.navigator.web.controller.ApiController;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

/**
 * JsonpAdvice
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/7/19 14:23
 */
@ControllerAdvice(assignableTypes = ApiController.class)
public class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

    public JsonpAdvice() {
        super("callback", "jsonp");
    }
}
