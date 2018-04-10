package com.brtbeacon.plugin.common.service;

import com.brtbeacon.persistent.mybatis.BaseExampleMapper;
import com.brtbeacon.persistent.mybatis.entity.PageBounds;
import com.brtbeacon.plugin.common.entity.BaseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Calendar;
import java.util.List;

/**
 * BaseServiceSupport
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/3/30
 */
public abstract class BaseServiceSupport<M extends BaseEntity<ID>, E, ID extends Serializable>
        implements BaseService<M, E, ID> {

    public abstract BaseExampleMapper<M, E, ID> getMapper();

    @Override
    public long countByExample(E example) {
        return getMapper().countByExample(example);
    }

    @Transactional
    @Override
    public int delete(ID id) {
        return getMapper().delete(id);
    }

    @Transactional
    @Override
    public int deleteByExample(E example) {
        return getMapper().deleteByExample(example);
    }

    @Transactional
    @Override
    public int save(M m) {
        long current = Calendar.getInstance().getTimeInMillis();
        m.setCreatedTime(current);
        return getMapper().save(m);
    }

    @Override
    public M findOne(ID id) {
        return getMapper().findOne(id);
    }

    @Transactional
    @Override
    public int update(M m) {
        long current = Calendar.getInstance().getTimeInMillis();
        m.setUpdatedTime(current);
        return getMapper().update(m);
    }

    @Transactional
    @Override
    public int updateByExample(M m, E example) {
        long current = Calendar.getInstance().getTimeInMillis();
        m.setUpdatedTime(current);
        return getMapper().updateByExample(m, example);
    }

    @Override
    public List<M> findAll(M m) {
        return getMapper().findAll(m);
    }

    @Override
    public List<M> findAll(M m, PageBounds bounds) {
        return getMapper().findAll(m, bounds);
    }

    @Override
    public List<M> findByExample(E example) {
        return getMapper().findByExample(example);
    }

    @Override
    public List<M> findByExample(E example, PageBounds bounds) {
        return getMapper().findByExample(example, bounds);
    }
}
