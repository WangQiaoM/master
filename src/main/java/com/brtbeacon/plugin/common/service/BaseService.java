package com.brtbeacon.plugin.common.service;

import com.brtbeacon.persistent.mybatis.entity.PageBounds;
import com.brtbeacon.plugin.common.entity.BaseEntity;

import java.io.Serializable;
import java.util.List;

/**
 * BaseService
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/3/30
 */
public interface BaseService<M extends BaseEntity<ID>, E, ID extends Serializable> {

    /**
     * 根据条件统计记录条数
     *
     * @param example
     * @return
     */
    long countByExample(E example);

    /**
     * 移除记录
     *
     * @param id 标识
     * @return
     */
    int delete(ID id);

    /**
     * 根据条件移除记录
     *
     * @param example
     * @return
     */
    int deleteByExample(E example);

    /**
     * 保存记录
     *
     * @param m
     * @return
     */
    int save(M m);

    /**
     * 查找单个记录
     *
     * @param id
     * @return
     */
    M findOne(ID id);

    /**
     * 更新记录
     *
     * @param m
     * @return
     */
    int update(M m);

    /**
     * 根据条件更新记录
     *
     * @param m
     * @param example
     * @return
     */
    int updateByExample(M m, E example);

    /**
     * 查找所有记录
     *
     * @param m
     * @return
     */
    List<M> findAll(M m);

    /**
     * 查找所有记录
     *
     * @param m
     * @param bounds 分页参数
     * @return
     */
    List<M> findAll(M m, PageBounds bounds);

    /**
     * 根据条件查询记录
     *
     * @param example
     * @return
     */
    List<M> findByExample(E example);

    /**
     * 根据条件查询记录
     *
     * @param example
     * @param bounds  分页参数
     * @return
     */
    List<M> findByExample(E example, PageBounds bounds);
}
