package com.brtbeacon.plugin.navigator.entity;

import com.brtbeacon.plugin.common.entity.BaseEntity;

import java.util.Date;

/**
 * BuildingExt
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/04/21 1703
 */
public class BuildingExt extends BaseEntity<Integer> {
    private static final long serialVersionUID = 3612221499276146382L;
    /**
     * 建筑ID
     */
    private String buildingid;

    /**
     * 楼层集
     */
    private String floors;

    /**
     * 面积
     */
    private Integer area;

    /**
     * 备注
     */
    private String remark;

    /**
     * 状态，即当前步骤
     * 1.创建建筑
     * 2.上传图纸
     * 3.待确认
     * 4.待支付
     * 5.绘图中
     * 6.绘图完成
     */
    private String status;

    /**
     * 图纸保存路径
     */
    private String cadUrl;

    /**
     * 城市代码（以总后台规则为准）
     */
    private String cityId;

    /**
     * 建筑名称
     */
    private String name;

    /**
     * dev_building_extend.latitude
     */
    private Double latitude;

    /**
     * dev_building_extend.longitude
     */
    private Double longitude;

    /**
     * 地址
     */
    private String address;

    /**
     * 省/市信息(CQ00, 0020)
     */
    private String citys;

    /**
     * 建筑类型(不填为普通[1、普通；2、演示；3、用户演示])总表字段
     */
    private String type;

    /**
     * 创建时间
     */
    private Date time;

    /**
     * 到期时间
     */
    private Date endTime;

    /**
     * 付款时间
     */
    private Date payTime;

    /**
     * appkey
     */
    private String appkey;

    /**
     * 是否微信：0.ios+Android
     * 1.微信+ios+Android
     */
    private String isweixin;

    /**
     * 上传图纸时间
     */
    private Date uploadTime;

    /**
     * 确认时间
     */
    private Date affirmTime;

    /**
     * 确认开始绘图时间
     */
    private Date plotTime;

    /**
     * 绘图完成时间
     */
    private Date succTime;

    /**
     * 1.矢量图2.瓦片图
     */
    private String pattern;

    /**
     * 项目类型1.自定义 2.标准插件 3.定制项目
     */
    private String ptype;

    /**
     * 公众号的appid
     */
    private String appid;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 关联的订单编号
     */
    private String orderNum;

    /**
     * 父级演示建筑ID (如果当前建筑为演示建筑类型，那么这个必有值)
     */
    private String parentBuildingDemoId;

    public String getBuildingid() {
        return buildingid;
    }

    public void setBuildingid(String buildingid) {
        this.buildingid = buildingid == null ? null : buildingid.trim();
    }

    public String getFloors() {
        return floors;
    }

    public void setFloors(String floors) {
        this.floors = floors == null ? null : floors.trim();
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getCadUrl() {
        return cadUrl;
    }

    public void setCadUrl(String cadUrl) {
        this.cadUrl = cadUrl == null ? null : cadUrl.trim();
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId == null ? null : cityId.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getCitys() {
        return citys;
    }

    public void setCitys(String citys) {
        this.citys = citys == null ? null : citys.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getPayTime() {
        return payTime;
    }

    public void setPayTime(Date payTime) {
        this.payTime = payTime;
    }

    public String getAppkey() {
        return appkey;
    }

    public void setAppkey(String appkey) {
        this.appkey = appkey == null ? null : appkey.trim();
    }

    public String getIsweixin() {
        return isweixin;
    }

    public void setIsweixin(String isweixin) {
        this.isweixin = isweixin == null ? null : isweixin.trim();
    }

    public Date getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Date getAffirmTime() {
        return affirmTime;
    }

    public void setAffirmTime(Date affirmTime) {
        this.affirmTime = affirmTime;
    }

    public Date getPlotTime() {
        return plotTime;
    }

    public void setPlotTime(Date plotTime) {
        this.plotTime = plotTime;
    }

    public Date getSuccTime() {
        return succTime;
    }

    public void setSuccTime(Date succTime) {
        this.succTime = succTime;
    }

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern == null ? null : pattern.trim();
    }

    public String getPtype() {
        return ptype;
    }

    public void setPtype(String ptype) {
        this.ptype = ptype == null ? null : ptype.trim();
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid == null ? null : appid.trim();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum == null ? null : orderNum.trim();
    }

    public String getParentBuildingDemoId() {
        return parentBuildingDemoId;
    }

    public void setParentBuildingDemoId(String parentBuildingDemoId) {
        this.parentBuildingDemoId = parentBuildingDemoId == null ? null : parentBuildingDemoId.trim();
    }

    private String domainName;

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }
}