package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;

/**
 * UserInfo
 * 
 * @author Archx[archx@foxmail.com]
 * @date 2017/12/13 1752
 */
public class UserInfo extends BaseEntity<Integer> {
    /**
     * wh_user_info.user_name
     */
    private String userName;

    /**
     * wh_user_info.pass_word
     */
    private String passWord;

    /**
     * wh_user_info.email
     */
    private String email;

    /**
     * wh_user_info.phone
     */
    private String phone;


    private String login;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord == null ? null : passWord.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }
}