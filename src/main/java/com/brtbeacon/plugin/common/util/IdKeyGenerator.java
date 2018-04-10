package com.brtbeacon.plugin.common.util;

/**
 * IdKeyGenerator ID生存器
 * <p/>
 * 64位ID (42(毫秒)+5(机器ID)+5(业务编码)+12(重复累加)) twitter使用的一种方式
 *
 * @author Archx[archx@foxmail.com]
 * @date 2016/3/17 0017
 */
public class IdKeyGenerator {
    private final static long twepoch = 1288834974657L;
    // 机器标识位数
    private final static long workerIdBits = 5L;
    // 数据中心标识位数
    private final static long dataCenterIdBits = 5L;
    // 机器ID最大值
    private final static long maxWorkerId = -1L ^ (-1L << workerIdBits);
    // 数据中心ID最大值
    private final static long maxDataCenterId = -1L ^ (-1L << dataCenterIdBits);
    // 毫秒内自增位
    private final static long sequenceBits = 12L;
    // 机器ID偏左移12位
    private final static long workerIdShift = sequenceBits;
    // 数据中心ID左移17位
    private final static long dataCenterIdShift = sequenceBits + workerIdBits;
    // 时间毫秒左移22位
    private final static long timestampLeftShift = sequenceBits + workerIdBits + dataCenterIdBits;

    private final static long sequenceMask = -1L ^ (-1L << sequenceBits);

    private final static char[] digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
            'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z', '-', '_' };

    private static long lastTimestamp = -1L;

    private static IdKeyGenerator instance;

    private long sequence = 0L;
    private final long workerId;
    private final long dataCenterId;

    public IdKeyGenerator(long workerId, long dataCenterId) {
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException("worker Id can't be greater than %d or less than 0");
        }
        if (dataCenterId > maxDataCenterId || dataCenterId < 0) {
            throw new IllegalArgumentException("datacenter Id can't be greater than %d or less than 0");
        }
        this.workerId = workerId;
        this.dataCenterId = dataCenterId;
    }

    public static IdKeyGenerator getInstance() {
        if (instance == null) {
            synchronized (IdKeyGenerator.class) {
                if (instance == null)
                    instance = new IdKeyGenerator(1, 1);
            }
        }
        return instance;
    }

    /**
     * 18位数字ID
     *
     * @return 有序的18数字
     */
    public synchronized long nextId() {
        long timestamp = timeGen();
        if (timestamp < lastTimestamp) {
            try {
                throw new Exception("Clock moved backwards.  Refusing to generate id for " + (lastTimestamp - timestamp)
                                            + " milliseconds");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (lastTimestamp == timestamp) {
            // 当前毫秒内，则+1
            sequence = (sequence + 1) & sequenceMask;
            if (sequence == 0) {
                // 当前毫秒内计数满了，则等待下一秒
                timestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0;
        }
        lastTimestamp = timestamp;
        // ID偏移组合生成最终的ID，并返回ID
        long nextId = ((timestamp - twepoch) << timestampLeftShift) | (dataCenterId << dataCenterIdShift) | (workerId
                << workerIdShift) | sequence;

        return nextId;
    }

    /**
     * 10位字符串Key
     *
     * @return 10位的随机字符串
     */
    public synchronized String nextKey() {
        shuffle();
        return toUnsignedString(nextId(), 6);
    }

    /**
     * 10位字符串Key
     * <p/>
     * 排除"-","_"两个字符
     *
     * @return 10位的随机字符串
     */
    public synchronized String nextDbKey() {
        while (true) {
            String key = nextKey();
            if (key.contains("-") || key.contains("_"))
                continue;
            return key;
        }
    }

    private long tilNextMillis(final long lastTimestamp) {
        long timestamp = this.timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = this.timeGen();
        }
        return timestamp;
    }

    private long timeGen() {
        return System.currentTimeMillis();
    }

    // shift 为2的次方，如转成16进制就是4，32进制就是5... MAX=6
    private String toUnsignedString(long i, int shift) {
        char[] buf = new char[64];
        int charPos = 64;
        int radix = 1 << shift;
        long mask = radix - 1;
        do {
            buf[--charPos] = digits[(int) (i & mask)];
            i >>>= shift;
        } while (i != 0);
        return new String(buf, charPos, (64 - charPos));
    }

    // 重排序字典
    private void shuffle() {
        for (int index = digits.length - 1; index >= 0; index--) {
            //从0到index处之间随机取一个值，跟index处的元素交换 (数据类型)(最小值+Math.random()*(最大值-最小值+1))
            exchange((int) (Math.random() * (index + 1)), index);
        }
    }

    // 交换位置
    private void exchange(int p1, int p2) {
        char temp = digits[p1];
        digits[p1] = digits[p2];
        digits[p2] = temp;  //更改位置
    }

}
