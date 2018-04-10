package com.brtbeacon.plugin.navigator.service;

import com.brtbeacon.plugin.common.service.BaseServiceSupport;
import com.brtbeacon.plugin.navigator.entity.UserInfo;
import com.brtbeacon.plugin.navigator.entity.UserInfoExample;
import com.brtbeacon.plugin.navigator.repository.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * UserInfoServiceImpl
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/13 1752
 */
@Service
public class UserInfoServiceImpl extends BaseServiceSupport<UserInfo, UserInfoExample, Integer> implements UserInfoService {
    private UserInfoMapper mapper;

    @Autowired
    public void setMapper(UserInfoMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public UserInfoMapper getMapper() {
        return this.mapper;
    }

    @Override
    public UserInfo isExist(String username, String password) {
        UserInfoExample example = new UserInfoExample();
        UserInfoExample.Criteria c = example.createCriteria();
        c.andPassWordEqualTo(password);

        try {
            Long phone = Long.valueOf(username);
            c.andPhoneEqualTo(username);
        } catch (NumberFormatException e) {
            if (username.indexOf("@")!=-1){
                c.andEmailEqualTo(username);
            }else {
                c.andUserNameEqualTo(username);
            }
        }
        List<UserInfo> list = mapper.findByExample(example);
        if (list.size()==0){
            return null;
        }
        list.get(0).setLogin(username);
        return list.get(0);
    }
}