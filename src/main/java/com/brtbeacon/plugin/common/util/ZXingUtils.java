package com.brtbeacon.plugin.common.util;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.apache.tomcat.util.http.fileupload.IOUtils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * ZXingUtils
 *
 * @author Archx[archx@foxmail.com]
 * @date 2017/4/15.
 */
public abstract class ZXingUtils {
    private static final int BLACK = 0xFF000000;
    private static final int WHITE = 0xFFFFFFFF;

    /**
     * 创建二维码
     *
     * @param content 内容
     * @param width   宽度
     * @param height  高度
     * @return 缓冲图片
     */
    public static BufferedImage createQRCodeImage(String content, int width, int height) {
        // 用于设置QR二维码参数
        Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
        // 设置QR二维码的纠错级别（H为最高级别）具体级别信息
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        // 设置编码方式
        hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
        hints.put(EncodeHintType.MARGIN, 1);
        BitMatrix bitMatrix = null;
        try {
            bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, width, height, hints);

            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    image.setRGB(x, y, bitMatrix.get(x, y) ? BLACK : WHITE);
                }
            }
            return image;
        } catch (WriterException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 创建带Logo的二维码
     *
     * @param content 内容
     * @param width   宽度
     * @param height  高度
     * @param logo    logo输入流
     * @return 缓冲图片
     */
    public static BufferedImage createQRCodeWithLogo(String content, int width, int height, InputStream logo) {
        BufferedImage image = createQRCodeImage(content, width, height);
        Graphics2D graphics = image.createGraphics();
        // logo
        try {
            BufferedImage logoImage = ImageIO.read(logo);
            // 缩放
            int widthLogo =
                    logoImage.getWidth(null) > image.getWidth() * 2 / 10 ? (image.getWidth() * 2 / 10) : logoImage
                            .getWidth(null);
            int heightLogo =
                    logoImage.getHeight(null) > image.getHeight() * 2 / 10 ? (image.getHeight() * 2 / 10) : logoImage
                            .getWidth(null);

            int x = (image.getWidth() - widthLogo) / 2;
            int y = (image.getHeight() - heightLogo) / 2;
            graphics.drawImage(logoImage, x, y, widthLogo, heightLogo, null);
            graphics.dispose();
            image.flush();
            return image;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                logo.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * 创建带Logo的二维码
     *
     * @param content 内容
     * @param width   宽度
     * @param height  高度
     * @param logo    logo字节数组
     * @return 缓冲图片
     */
    public static BufferedImage createQRCodeWithLogo(String content, int width, int height, byte[] logo) {
        InputStream in = new ByteArrayInputStream(logo);
        return createQRCodeWithLogo(content, width, height, in);
    }

    /**
     * 创建带Logo的二维码
     *
     * @param content 内容
     * @param width   宽度
     * @param height  高度
     * @param logo    logo文件
     * @return 缓冲图片
     */
    public static BufferedImage createQRCodeWithLogo(String content, int width, int height, File logo) {
        try {
            InputStream in = new FileInputStream(logo);
            return createQRCodeWithLogo(content, width, height, in);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 图片转字节数组
     *
     * @param image  二维码缓冲图片
     * @param format 图片格式
     * @return 字节数组
     */
    public static byte[] imageToBytes(BufferedImage image, String format) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, format, out);
            return out.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new byte[0];
    }

    /**
     * 生成带LOGO的二维码
     *
     * @param qrCode 二维码字节
     * @param logo   LOGO字节
     * @return
     */
    public static byte[] createQRCodeWithLogo(byte[] qrCode, byte[] logo) {
        try {
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(qrCode));
            Graphics2D graphics = image.createGraphics();

            BufferedImage logoImage = ImageIO.read(new ByteArrayInputStream(logo));

            // 缩放
            int widthLogo =
                    logoImage.getWidth(null) > image.getWidth() * 2 / 10 ? (image.getWidth() * 2 / 10) : logoImage
                            .getWidth(null);
            int heightLogo =
                    logoImage.getHeight(null) > image.getHeight() * 2 / 10 ? (image.getHeight() * 2 / 10) : logoImage
                            .getWidth(null);

            int x = (image.getWidth() - widthLogo) / 2;
            int y = (image.getHeight() - heightLogo) / 2;
            graphics.drawImage(logoImage, x, y, widthLogo, heightLogo, null);
            graphics.dispose();
            image.flush();

            return imageToBytes(image, "png");

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 二维码解码
     *
     * @param in 文件流
     * @return 二维码内容
     */
    public static String decode(InputStream in) {
        try {
            BufferedImage image = ImageIO.read(in);
            LuminanceSource source = new BufferedImageLuminanceSource(image);
            Binarizer binarizer = new HybridBinarizer(source);
            BinaryBitmap binaryBitmap = new BinaryBitmap(binarizer);
            Map<DecodeHintType, Object> hints = new HashMap<DecodeHintType, Object>();
            hints.put(DecodeHintType.CHARACTER_SET, "UTF-8");
            Result result = new MultiFormatReader().decode(binaryBitmap, hints);
            return result.getText();
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        } catch (NotFoundException e) {
            throw new IllegalArgumentException(e);
        } finally {
            IOUtils.closeQuietly(in);
        }
    }
}