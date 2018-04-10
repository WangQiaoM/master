package com.brtbeacon.plugin.navigator.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserPluginExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public UserPluginExample() {
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

        public Criteria andPlugsIdIsNull() {
            addCriterion("plugs_id is null");
            return (Criteria) this;
        }

        public Criteria andPlugsIdIsNotNull() {
            addCriterion("plugs_id is not null");
            return (Criteria) this;
        }

        public Criteria andPlugsIdEqualTo(Integer value) {
            addCriterion("plugs_id =", value, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdNotEqualTo(Integer value) {
            addCriterion("plugs_id <>", value, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdGreaterThan(Integer value) {
            addCriterion("plugs_id >", value, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("plugs_id >=", value, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdLessThan(Integer value) {
            addCriterion("plugs_id <", value, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdLessThanOrEqualTo(Integer value) {
            addCriterion("plugs_id <=", value, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdIn(List<Integer> values) {
            addCriterion("plugs_id in", values, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdNotIn(List<Integer> values) {
            addCriterion("plugs_id not in", values, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdBetween(Integer value1, Integer value2) {
            addCriterion("plugs_id between", value1, value2, "plugsId");
            return (Criteria) this;
        }

        public Criteria andPlugsIdNotBetween(Integer value1, Integer value2) {
            addCriterion("plugs_id not between", value1, value2, "plugsId");
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

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Integer value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Integer value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Integer value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Integer value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Integer value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Integer> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Integer> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Integer value1, Integer value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdIsNull() {
            addCriterion("building_extend_id is null");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdIsNotNull() {
            addCriterion("building_extend_id is not null");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdEqualTo(Integer value) {
            addCriterion("building_extend_id =", value, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdNotEqualTo(Integer value) {
            addCriterion("building_extend_id <>", value, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdGreaterThan(Integer value) {
            addCriterion("building_extend_id >", value, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("building_extend_id >=", value, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdLessThan(Integer value) {
            addCriterion("building_extend_id <", value, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdLessThanOrEqualTo(Integer value) {
            addCriterion("building_extend_id <=", value, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdIn(List<Integer> values) {
            addCriterion("building_extend_id in", values, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdNotIn(List<Integer> values) {
            addCriterion("building_extend_id not in", values, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdBetween(Integer value1, Integer value2) {
            addCriterion("building_extend_id between", value1, value2, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andBuildingExtendIdNotBetween(Integer value1, Integer value2) {
            addCriterion("building_extend_id not between", value1, value2, "buildingExtendId");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andSignsIsNull() {
            addCriterion("signs is null");
            return (Criteria) this;
        }

        public Criteria andSignsIsNotNull() {
            addCriterion("signs is not null");
            return (Criteria) this;
        }

        public Criteria andSignsEqualTo(String value) {
            addCriterion("signs =", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsNotEqualTo(String value) {
            addCriterion("signs <>", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsGreaterThan(String value) {
            addCriterion("signs >", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsGreaterThanOrEqualTo(String value) {
            addCriterion("signs >=", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsLessThan(String value) {
            addCriterion("signs <", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsLessThanOrEqualTo(String value) {
            addCriterion("signs <=", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsLike(String value) {
            addCriterion("signs like", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsNotLike(String value) {
            addCriterion("signs not like", value, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsIn(List<String> values) {
            addCriterion("signs in", values, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsNotIn(List<String> values) {
            addCriterion("signs not in", values, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsBetween(String value1, String value2) {
            addCriterion("signs between", value1, value2, "signs");
            return (Criteria) this;
        }

        public Criteria andSignsNotBetween(String value1, String value2) {
            addCriterion("signs not between", value1, value2, "signs");
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