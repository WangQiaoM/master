package com.brtbeacon.plugin.navigator.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BuildingExtExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public BuildingExtExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andBuildingidIsNull() {
            addCriterion("buildingId is null");
            return (Criteria) this;
        }

        public Criteria andBuildingidIsNotNull() {
            addCriterion("buildingId is not null");
            return (Criteria) this;
        }

        public Criteria andBuildingidEqualTo(String value) {
            addCriterion("buildingId =", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidNotEqualTo(String value) {
            addCriterion("buildingId <>", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidGreaterThan(String value) {
            addCriterion("buildingId >", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidGreaterThanOrEqualTo(String value) {
            addCriterion("buildingId >=", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidLessThan(String value) {
            addCriterion("buildingId <", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidLessThanOrEqualTo(String value) {
            addCriterion("buildingId <=", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidLike(String value) {
            addCriterion("buildingId like", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidNotLike(String value) {
            addCriterion("buildingId not like", value, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidIn(List<String> values) {
            addCriterion("buildingId in", values, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidNotIn(List<String> values) {
            addCriterion("buildingId not in", values, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidBetween(String value1, String value2) {
            addCriterion("buildingId between", value1, value2, "buildingid");
            return (Criteria) this;
        }

        public Criteria andBuildingidNotBetween(String value1, String value2) {
            addCriterion("buildingId not between", value1, value2, "buildingid");
            return (Criteria) this;
        }

        public Criteria andFloorsIsNull() {
            addCriterion("floors is null");
            return (Criteria) this;
        }

        public Criteria andFloorsIsNotNull() {
            addCriterion("floors is not null");
            return (Criteria) this;
        }

        public Criteria andFloorsEqualTo(String value) {
            addCriterion("floors =", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsNotEqualTo(String value) {
            addCriterion("floors <>", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsGreaterThan(String value) {
            addCriterion("floors >", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsGreaterThanOrEqualTo(String value) {
            addCriterion("floors >=", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsLessThan(String value) {
            addCriterion("floors <", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsLessThanOrEqualTo(String value) {
            addCriterion("floors <=", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsLike(String value) {
            addCriterion("floors like", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsNotLike(String value) {
            addCriterion("floors not like", value, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsIn(List<String> values) {
            addCriterion("floors in", values, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsNotIn(List<String> values) {
            addCriterion("floors not in", values, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsBetween(String value1, String value2) {
            addCriterion("floors between", value1, value2, "floors");
            return (Criteria) this;
        }

        public Criteria andFloorsNotBetween(String value1, String value2) {
            addCriterion("floors not between", value1, value2, "floors");
            return (Criteria) this;
        }

        public Criteria andAreaIsNull() {
            addCriterion("area is null");
            return (Criteria) this;
        }

        public Criteria andAreaIsNotNull() {
            addCriterion("area is not null");
            return (Criteria) this;
        }

        public Criteria andAreaEqualTo(Integer value) {
            addCriterion("area =", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaNotEqualTo(Integer value) {
            addCriterion("area <>", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaGreaterThan(Integer value) {
            addCriterion("area >", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaGreaterThanOrEqualTo(Integer value) {
            addCriterion("area >=", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaLessThan(Integer value) {
            addCriterion("area <", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaLessThanOrEqualTo(Integer value) {
            addCriterion("area <=", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaIn(List<Integer> values) {
            addCriterion("area in", values, "area");
            return (Criteria) this;
        }

        public Criteria andAreaNotIn(List<Integer> values) {
            addCriterion("area not in", values, "area");
            return (Criteria) this;
        }

        public Criteria andAreaBetween(Integer value1, Integer value2) {
            addCriterion("area between", value1, value2, "area");
            return (Criteria) this;
        }

        public Criteria andAreaNotBetween(Integer value1, Integer value2) {
            addCriterion("area not between", value1, value2, "area");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNull() {
            addCriterion("remark is null");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNotNull() {
            addCriterion("remark is not null");
            return (Criteria) this;
        }

        public Criteria andRemarkEqualTo(String value) {
            addCriterion("remark =", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotEqualTo(String value) {
            addCriterion("remark <>", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThan(String value) {
            addCriterion("remark >", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("remark >=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThan(String value) {
            addCriterion("remark <", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThanOrEqualTo(String value) {
            addCriterion("remark <=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLike(String value) {
            addCriterion("remark like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotLike(String value) {
            addCriterion("remark not like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkIn(List<String> values) {
            addCriterion("remark in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotIn(List<String> values) {
            addCriterion("remark not in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkBetween(String value1, String value2) {
            addCriterion("remark between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotBetween(String value1, String value2) {
            addCriterion("remark not between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(String value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(String value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(String value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(String value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(String value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(String value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLike(String value) {
            addCriterion("status like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotLike(String value) {
            addCriterion("status not like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<String> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<String> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(String value1, String value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(String value1, String value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andCadUrlIsNull() {
            addCriterion("cad_url is null");
            return (Criteria) this;
        }

        public Criteria andCadUrlIsNotNull() {
            addCriterion("cad_url is not null");
            return (Criteria) this;
        }

        public Criteria andCadUrlEqualTo(String value) {
            addCriterion("cad_url =", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlNotEqualTo(String value) {
            addCriterion("cad_url <>", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlGreaterThan(String value) {
            addCriterion("cad_url >", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlGreaterThanOrEqualTo(String value) {
            addCriterion("cad_url >=", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlLessThan(String value) {
            addCriterion("cad_url <", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlLessThanOrEqualTo(String value) {
            addCriterion("cad_url <=", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlLike(String value) {
            addCriterion("cad_url like", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlNotLike(String value) {
            addCriterion("cad_url not like", value, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlIn(List<String> values) {
            addCriterion("cad_url in", values, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlNotIn(List<String> values) {
            addCriterion("cad_url not in", values, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlBetween(String value1, String value2) {
            addCriterion("cad_url between", value1, value2, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCadUrlNotBetween(String value1, String value2) {
            addCriterion("cad_url not between", value1, value2, "cadUrl");
            return (Criteria) this;
        }

        public Criteria andCityIdIsNull() {
            addCriterion("city_id is null");
            return (Criteria) this;
        }

        public Criteria andCityIdIsNotNull() {
            addCriterion("city_id is not null");
            return (Criteria) this;
        }

        public Criteria andCityIdEqualTo(String value) {
            addCriterion("city_id =", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotEqualTo(String value) {
            addCriterion("city_id <>", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdGreaterThan(String value) {
            addCriterion("city_id >", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdGreaterThanOrEqualTo(String value) {
            addCriterion("city_id >=", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdLessThan(String value) {
            addCriterion("city_id <", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdLessThanOrEqualTo(String value) {
            addCriterion("city_id <=", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdLike(String value) {
            addCriterion("city_id like", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotLike(String value) {
            addCriterion("city_id not like", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdIn(List<String> values) {
            addCriterion("city_id in", values, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotIn(List<String> values) {
            addCriterion("city_id not in", values, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdBetween(String value1, String value2) {
            addCriterion("city_id between", value1, value2, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotBetween(String value1, String value2) {
            addCriterion("city_id not between", value1, value2, "cityId");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("name is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("name is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("name =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("name <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("name >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("name >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("name <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("name <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("name like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("name not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("name in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("name not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("name between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("name not between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andLatitudeIsNull() {
            addCriterion("latitude is null");
            return (Criteria) this;
        }

        public Criteria andLatitudeIsNotNull() {
            addCriterion("latitude is not null");
            return (Criteria) this;
        }

        public Criteria andLatitudeEqualTo(Double value) {
            addCriterion("latitude =", value, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeNotEqualTo(Double value) {
            addCriterion("latitude <>", value, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeGreaterThan(Double value) {
            addCriterion("latitude >", value, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeGreaterThanOrEqualTo(Double value) {
            addCriterion("latitude >=", value, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeLessThan(Double value) {
            addCriterion("latitude <", value, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeLessThanOrEqualTo(Double value) {
            addCriterion("latitude <=", value, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeIn(List<Double> values) {
            addCriterion("latitude in", values, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeNotIn(List<Double> values) {
            addCriterion("latitude not in", values, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeBetween(Double value1, Double value2) {
            addCriterion("latitude between", value1, value2, "latitude");
            return (Criteria) this;
        }

        public Criteria andLatitudeNotBetween(Double value1, Double value2) {
            addCriterion("latitude not between", value1, value2, "latitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeIsNull() {
            addCriterion("longitude is null");
            return (Criteria) this;
        }

        public Criteria andLongitudeIsNotNull() {
            addCriterion("longitude is not null");
            return (Criteria) this;
        }

        public Criteria andLongitudeEqualTo(Double value) {
            addCriterion("longitude =", value, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeNotEqualTo(Double value) {
            addCriterion("longitude <>", value, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeGreaterThan(Double value) {
            addCriterion("longitude >", value, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeGreaterThanOrEqualTo(Double value) {
            addCriterion("longitude >=", value, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeLessThan(Double value) {
            addCriterion("longitude <", value, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeLessThanOrEqualTo(Double value) {
            addCriterion("longitude <=", value, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeIn(List<Double> values) {
            addCriterion("longitude in", values, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeNotIn(List<Double> values) {
            addCriterion("longitude not in", values, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeBetween(Double value1, Double value2) {
            addCriterion("longitude between", value1, value2, "longitude");
            return (Criteria) this;
        }

        public Criteria andLongitudeNotBetween(Double value1, Double value2) {
            addCriterion("longitude not between", value1, value2, "longitude");
            return (Criteria) this;
        }

        public Criteria andAddressIsNull() {
            addCriterion("address is null");
            return (Criteria) this;
        }

        public Criteria andAddressIsNotNull() {
            addCriterion("address is not null");
            return (Criteria) this;
        }

        public Criteria andAddressEqualTo(String value) {
            addCriterion("address =", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotEqualTo(String value) {
            addCriterion("address <>", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressGreaterThan(String value) {
            addCriterion("address >", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressGreaterThanOrEqualTo(String value) {
            addCriterion("address >=", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressLessThan(String value) {
            addCriterion("address <", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressLessThanOrEqualTo(String value) {
            addCriterion("address <=", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressLike(String value) {
            addCriterion("address like", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotLike(String value) {
            addCriterion("address not like", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressIn(List<String> values) {
            addCriterion("address in", values, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotIn(List<String> values) {
            addCriterion("address not in", values, "address");
            return (Criteria) this;
        }

        public Criteria andAddressBetween(String value1, String value2) {
            addCriterion("address between", value1, value2, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotBetween(String value1, String value2) {
            addCriterion("address not between", value1, value2, "address");
            return (Criteria) this;
        }

        public Criteria andCitysIsNull() {
            addCriterion("citys is null");
            return (Criteria) this;
        }

        public Criteria andCitysIsNotNull() {
            addCriterion("citys is not null");
            return (Criteria) this;
        }

        public Criteria andCitysEqualTo(String value) {
            addCriterion("citys =", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysNotEqualTo(String value) {
            addCriterion("citys <>", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysGreaterThan(String value) {
            addCriterion("citys >", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysGreaterThanOrEqualTo(String value) {
            addCriterion("citys >=", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysLessThan(String value) {
            addCriterion("citys <", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysLessThanOrEqualTo(String value) {
            addCriterion("citys <=", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysLike(String value) {
            addCriterion("citys like", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysNotLike(String value) {
            addCriterion("citys not like", value, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysIn(List<String> values) {
            addCriterion("citys in", values, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysNotIn(List<String> values) {
            addCriterion("citys not in", values, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysBetween(String value1, String value2) {
            addCriterion("citys between", value1, value2, "citys");
            return (Criteria) this;
        }

        public Criteria andCitysNotBetween(String value1, String value2) {
            addCriterion("citys not between", value1, value2, "citys");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("type is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("type is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(String value) {
            addCriterion("type =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(String value) {
            addCriterion("type <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(String value) {
            addCriterion("type >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(String value) {
            addCriterion("type >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(String value) {
            addCriterion("type <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(String value) {
            addCriterion("type <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLike(String value) {
            addCriterion("type like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotLike(String value) {
            addCriterion("type not like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<String> values) {
            addCriterion("type in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<String> values) {
            addCriterion("type not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(String value1, String value2) {
            addCriterion("type between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(String value1, String value2) {
            addCriterion("type not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTimeIsNull() {
            addCriterion("time is null");
            return (Criteria) this;
        }

        public Criteria andTimeIsNotNull() {
            addCriterion("time is not null");
            return (Criteria) this;
        }

        public Criteria andTimeEqualTo(Date value) {
            addCriterion("time =", value, "time");
            return (Criteria) this;
        }

        public Criteria andTimeNotEqualTo(Date value) {
            addCriterion("time <>", value, "time");
            return (Criteria) this;
        }

        public Criteria andTimeGreaterThan(Date value) {
            addCriterion("time >", value, "time");
            return (Criteria) this;
        }

        public Criteria andTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("time >=", value, "time");
            return (Criteria) this;
        }

        public Criteria andTimeLessThan(Date value) {
            addCriterion("time <", value, "time");
            return (Criteria) this;
        }

        public Criteria andTimeLessThanOrEqualTo(Date value) {
            addCriterion("time <=", value, "time");
            return (Criteria) this;
        }

        public Criteria andTimeIn(List<Date> values) {
            addCriterion("time in", values, "time");
            return (Criteria) this;
        }

        public Criteria andTimeNotIn(List<Date> values) {
            addCriterion("time not in", values, "time");
            return (Criteria) this;
        }

        public Criteria andTimeBetween(Date value1, Date value2) {
            addCriterion("time between", value1, value2, "time");
            return (Criteria) this;
        }

        public Criteria andTimeNotBetween(Date value1, Date value2) {
            addCriterion("time not between", value1, value2, "time");
            return (Criteria) this;
        }

        public Criteria andEndTimeIsNull() {
            addCriterion("end_time is null");
            return (Criteria) this;
        }

        public Criteria andEndTimeIsNotNull() {
            addCriterion("end_time is not null");
            return (Criteria) this;
        }

        public Criteria andEndTimeEqualTo(Date value) {
            addCriterion("end_time =", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeNotEqualTo(Date value) {
            addCriterion("end_time <>", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeGreaterThan(Date value) {
            addCriterion("end_time >", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("end_time >=", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeLessThan(Date value) {
            addCriterion("end_time <", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeLessThanOrEqualTo(Date value) {
            addCriterion("end_time <=", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeIn(List<Date> values) {
            addCriterion("end_time in", values, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeNotIn(List<Date> values) {
            addCriterion("end_time not in", values, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeBetween(Date value1, Date value2) {
            addCriterion("end_time between", value1, value2, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeNotBetween(Date value1, Date value2) {
            addCriterion("end_time not between", value1, value2, "endTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeIsNull() {
            addCriterion("pay_time is null");
            return (Criteria) this;
        }

        public Criteria andPayTimeIsNotNull() {
            addCriterion("pay_time is not null");
            return (Criteria) this;
        }

        public Criteria andPayTimeEqualTo(Date value) {
            addCriterion("pay_time =", value, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeNotEqualTo(Date value) {
            addCriterion("pay_time <>", value, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeGreaterThan(Date value) {
            addCriterion("pay_time >", value, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("pay_time >=", value, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeLessThan(Date value) {
            addCriterion("pay_time <", value, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeLessThanOrEqualTo(Date value) {
            addCriterion("pay_time <=", value, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeIn(List<Date> values) {
            addCriterion("pay_time in", values, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeNotIn(List<Date> values) {
            addCriterion("pay_time not in", values, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeBetween(Date value1, Date value2) {
            addCriterion("pay_time between", value1, value2, "payTime");
            return (Criteria) this;
        }

        public Criteria andPayTimeNotBetween(Date value1, Date value2) {
            addCriterion("pay_time not between", value1, value2, "payTime");
            return (Criteria) this;
        }

        public Criteria andAppkeyIsNull() {
            addCriterion("appkey is null");
            return (Criteria) this;
        }

        public Criteria andAppkeyIsNotNull() {
            addCriterion("appkey is not null");
            return (Criteria) this;
        }

        public Criteria andAppkeyEqualTo(String value) {
            addCriterion("appkey =", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyNotEqualTo(String value) {
            addCriterion("appkey <>", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyGreaterThan(String value) {
            addCriterion("appkey >", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyGreaterThanOrEqualTo(String value) {
            addCriterion("appkey >=", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyLessThan(String value) {
            addCriterion("appkey <", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyLessThanOrEqualTo(String value) {
            addCriterion("appkey <=", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyLike(String value) {
            addCriterion("appkey like", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyNotLike(String value) {
            addCriterion("appkey not like", value, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyIn(List<String> values) {
            addCriterion("appkey in", values, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyNotIn(List<String> values) {
            addCriterion("appkey not in", values, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyBetween(String value1, String value2) {
            addCriterion("appkey between", value1, value2, "appkey");
            return (Criteria) this;
        }

        public Criteria andAppkeyNotBetween(String value1, String value2) {
            addCriterion("appkey not between", value1, value2, "appkey");
            return (Criteria) this;
        }

        public Criteria andIsweixinIsNull() {
            addCriterion("isweixin is null");
            return (Criteria) this;
        }

        public Criteria andIsweixinIsNotNull() {
            addCriterion("isweixin is not null");
            return (Criteria) this;
        }

        public Criteria andIsweixinEqualTo(String value) {
            addCriterion("isweixin =", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinNotEqualTo(String value) {
            addCriterion("isweixin <>", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinGreaterThan(String value) {
            addCriterion("isweixin >", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinGreaterThanOrEqualTo(String value) {
            addCriterion("isweixin >=", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinLessThan(String value) {
            addCriterion("isweixin <", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinLessThanOrEqualTo(String value) {
            addCriterion("isweixin <=", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinLike(String value) {
            addCriterion("isweixin like", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinNotLike(String value) {
            addCriterion("isweixin not like", value, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinIn(List<String> values) {
            addCriterion("isweixin in", values, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinNotIn(List<String> values) {
            addCriterion("isweixin not in", values, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinBetween(String value1, String value2) {
            addCriterion("isweixin between", value1, value2, "isweixin");
            return (Criteria) this;
        }

        public Criteria andIsweixinNotBetween(String value1, String value2) {
            addCriterion("isweixin not between", value1, value2, "isweixin");
            return (Criteria) this;
        }

        public Criteria andUploadTimeIsNull() {
            addCriterion("upload_time is null");
            return (Criteria) this;
        }

        public Criteria andUploadTimeIsNotNull() {
            addCriterion("upload_time is not null");
            return (Criteria) this;
        }

        public Criteria andUploadTimeEqualTo(Date value) {
            addCriterion("upload_time =", value, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeNotEqualTo(Date value) {
            addCriterion("upload_time <>", value, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeGreaterThan(Date value) {
            addCriterion("upload_time >", value, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("upload_time >=", value, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeLessThan(Date value) {
            addCriterion("upload_time <", value, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeLessThanOrEqualTo(Date value) {
            addCriterion("upload_time <=", value, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeIn(List<Date> values) {
            addCriterion("upload_time in", values, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeNotIn(List<Date> values) {
            addCriterion("upload_time not in", values, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeBetween(Date value1, Date value2) {
            addCriterion("upload_time between", value1, value2, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andUploadTimeNotBetween(Date value1, Date value2) {
            addCriterion("upload_time not between", value1, value2, "uploadTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeIsNull() {
            addCriterion("affirm_time is null");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeIsNotNull() {
            addCriterion("affirm_time is not null");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeEqualTo(Date value) {
            addCriterion("affirm_time =", value, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeNotEqualTo(Date value) {
            addCriterion("affirm_time <>", value, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeGreaterThan(Date value) {
            addCriterion("affirm_time >", value, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("affirm_time >=", value, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeLessThan(Date value) {
            addCriterion("affirm_time <", value, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeLessThanOrEqualTo(Date value) {
            addCriterion("affirm_time <=", value, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeIn(List<Date> values) {
            addCriterion("affirm_time in", values, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeNotIn(List<Date> values) {
            addCriterion("affirm_time not in", values, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeBetween(Date value1, Date value2) {
            addCriterion("affirm_time between", value1, value2, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andAffirmTimeNotBetween(Date value1, Date value2) {
            addCriterion("affirm_time not between", value1, value2, "affirmTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeIsNull() {
            addCriterion("plot_time is null");
            return (Criteria) this;
        }

        public Criteria andPlotTimeIsNotNull() {
            addCriterion("plot_time is not null");
            return (Criteria) this;
        }

        public Criteria andPlotTimeEqualTo(Date value) {
            addCriterion("plot_time =", value, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeNotEqualTo(Date value) {
            addCriterion("plot_time <>", value, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeGreaterThan(Date value) {
            addCriterion("plot_time >", value, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("plot_time >=", value, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeLessThan(Date value) {
            addCriterion("plot_time <", value, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeLessThanOrEqualTo(Date value) {
            addCriterion("plot_time <=", value, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeIn(List<Date> values) {
            addCriterion("plot_time in", values, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeNotIn(List<Date> values) {
            addCriterion("plot_time not in", values, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeBetween(Date value1, Date value2) {
            addCriterion("plot_time between", value1, value2, "plotTime");
            return (Criteria) this;
        }

        public Criteria andPlotTimeNotBetween(Date value1, Date value2) {
            addCriterion("plot_time not between", value1, value2, "plotTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeIsNull() {
            addCriterion("succ_time is null");
            return (Criteria) this;
        }

        public Criteria andSuccTimeIsNotNull() {
            addCriterion("succ_time is not null");
            return (Criteria) this;
        }

        public Criteria andSuccTimeEqualTo(Date value) {
            addCriterion("succ_time =", value, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeNotEqualTo(Date value) {
            addCriterion("succ_time <>", value, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeGreaterThan(Date value) {
            addCriterion("succ_time >", value, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("succ_time >=", value, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeLessThan(Date value) {
            addCriterion("succ_time <", value, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeLessThanOrEqualTo(Date value) {
            addCriterion("succ_time <=", value, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeIn(List<Date> values) {
            addCriterion("succ_time in", values, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeNotIn(List<Date> values) {
            addCriterion("succ_time not in", values, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeBetween(Date value1, Date value2) {
            addCriterion("succ_time between", value1, value2, "succTime");
            return (Criteria) this;
        }

        public Criteria andSuccTimeNotBetween(Date value1, Date value2) {
            addCriterion("succ_time not between", value1, value2, "succTime");
            return (Criteria) this;
        }

        public Criteria andPatternIsNull() {
            addCriterion("pattern is null");
            return (Criteria) this;
        }

        public Criteria andPatternIsNotNull() {
            addCriterion("pattern is not null");
            return (Criteria) this;
        }

        public Criteria andPatternEqualTo(String value) {
            addCriterion("pattern =", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternNotEqualTo(String value) {
            addCriterion("pattern <>", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternGreaterThan(String value) {
            addCriterion("pattern >", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternGreaterThanOrEqualTo(String value) {
            addCriterion("pattern >=", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternLessThan(String value) {
            addCriterion("pattern <", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternLessThanOrEqualTo(String value) {
            addCriterion("pattern <=", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternLike(String value) {
            addCriterion("pattern like", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternNotLike(String value) {
            addCriterion("pattern not like", value, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternIn(List<String> values) {
            addCriterion("pattern in", values, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternNotIn(List<String> values) {
            addCriterion("pattern not in", values, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternBetween(String value1, String value2) {
            addCriterion("pattern between", value1, value2, "pattern");
            return (Criteria) this;
        }

        public Criteria andPatternNotBetween(String value1, String value2) {
            addCriterion("pattern not between", value1, value2, "pattern");
            return (Criteria) this;
        }

        public Criteria andPtypeIsNull() {
            addCriterion("ptype is null");
            return (Criteria) this;
        }

        public Criteria andPtypeIsNotNull() {
            addCriterion("ptype is not null");
            return (Criteria) this;
        }

        public Criteria andPtypeEqualTo(String value) {
            addCriterion("ptype =", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeNotEqualTo(String value) {
            addCriterion("ptype <>", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeGreaterThan(String value) {
            addCriterion("ptype >", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeGreaterThanOrEqualTo(String value) {
            addCriterion("ptype >=", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeLessThan(String value) {
            addCriterion("ptype <", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeLessThanOrEqualTo(String value) {
            addCriterion("ptype <=", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeLike(String value) {
            addCriterion("ptype like", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeNotLike(String value) {
            addCriterion("ptype not like", value, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeIn(List<String> values) {
            addCriterion("ptype in", values, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeNotIn(List<String> values) {
            addCriterion("ptype not in", values, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeBetween(String value1, String value2) {
            addCriterion("ptype between", value1, value2, "ptype");
            return (Criteria) this;
        }

        public Criteria andPtypeNotBetween(String value1, String value2) {
            addCriterion("ptype not between", value1, value2, "ptype");
            return (Criteria) this;
        }

        public Criteria andAppidIsNull() {
            addCriterion("appid is null");
            return (Criteria) this;
        }

        public Criteria andAppidIsNotNull() {
            addCriterion("appid is not null");
            return (Criteria) this;
        }

        public Criteria andAppidEqualTo(String value) {
            addCriterion("appid =", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidNotEqualTo(String value) {
            addCriterion("appid <>", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidGreaterThan(String value) {
            addCriterion("appid >", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidGreaterThanOrEqualTo(String value) {
            addCriterion("appid >=", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidLessThan(String value) {
            addCriterion("appid <", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidLessThanOrEqualTo(String value) {
            addCriterion("appid <=", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidLike(String value) {
            addCriterion("appid like", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidNotLike(String value) {
            addCriterion("appid not like", value, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidIn(List<String> values) {
            addCriterion("appid in", values, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidNotIn(List<String> values) {
            addCriterion("appid not in", values, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidBetween(String value1, String value2) {
            addCriterion("appid between", value1, value2, "appid");
            return (Criteria) this;
        }

        public Criteria andAppidNotBetween(String value1, String value2) {
            addCriterion("appid not between", value1, value2, "appid");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("user_id is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("user_id is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Long value) {
            addCriterion("user_id =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Long value) {
            addCriterion("user_id <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Long value) {
            addCriterion("user_id >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("user_id >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Long value) {
            addCriterion("user_id <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Long value) {
            addCriterion("user_id <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Long> values) {
            addCriterion("user_id in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Long> values) {
            addCriterion("user_id not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Long value1, Long value2) {
            addCriterion("user_id between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Long value1, Long value2) {
            addCriterion("user_id not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andOrderNumIsNull() {
            addCriterion("order_num is null");
            return (Criteria) this;
        }

        public Criteria andOrderNumIsNotNull() {
            addCriterion("order_num is not null");
            return (Criteria) this;
        }

        public Criteria andOrderNumEqualTo(String value) {
            addCriterion("order_num =", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumNotEqualTo(String value) {
            addCriterion("order_num <>", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumGreaterThan(String value) {
            addCriterion("order_num >", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumGreaterThanOrEqualTo(String value) {
            addCriterion("order_num >=", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumLessThan(String value) {
            addCriterion("order_num <", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumLessThanOrEqualTo(String value) {
            addCriterion("order_num <=", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumLike(String value) {
            addCriterion("order_num like", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumNotLike(String value) {
            addCriterion("order_num not like", value, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumIn(List<String> values) {
            addCriterion("order_num in", values, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumNotIn(List<String> values) {
            addCriterion("order_num not in", values, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumBetween(String value1, String value2) {
            addCriterion("order_num between", value1, value2, "orderNum");
            return (Criteria) this;
        }

        public Criteria andOrderNumNotBetween(String value1, String value2) {
            addCriterion("order_num not between", value1, value2, "orderNum");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdIsNull() {
            addCriterion("parent_building_demo_id is null");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdIsNotNull() {
            addCriterion("parent_building_demo_id is not null");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdEqualTo(String value) {
            addCriterion("parent_building_demo_id =", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdNotEqualTo(String value) {
            addCriterion("parent_building_demo_id <>", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdGreaterThan(String value) {
            addCriterion("parent_building_demo_id >", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdGreaterThanOrEqualTo(String value) {
            addCriterion("parent_building_demo_id >=", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdLessThan(String value) {
            addCriterion("parent_building_demo_id <", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdLessThanOrEqualTo(String value) {
            addCriterion("parent_building_demo_id <=", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdLike(String value) {
            addCriterion("parent_building_demo_id like", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdNotLike(String value) {
            addCriterion("parent_building_demo_id not like", value, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdIn(List<String> values) {
            addCriterion("parent_building_demo_id in", values, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdNotIn(List<String> values) {
            addCriterion("parent_building_demo_id not in", values, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdBetween(String value1, String value2) {
            addCriterion("parent_building_demo_id between", value1, value2, "parentBuildingDemoId");
            return (Criteria) this;
        }

        public Criteria andParentBuildingDemoIdNotBetween(String value1, String value2) {
            addCriterion("parent_building_demo_id not between", value1, value2, "parentBuildingDemoId");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}