import tinycolor from 'tinycolor2';
import { clamp } from 'foreslash';
import { getLightnessEasing, getSaturationEasing } from './easing';
/**
 * 生成颜色
 * @param designColor 设计颜色
 * @returns 颜色生成函数
 */
export function generateColor(designColor: string) {
  const color = tinycolor(designColor);
  if (!color || !color.isValid()) throw new Error('Invalid color');
  const hue = color.toHsv().h;
  const saturationEasing = getSaturationEasing(hue);
  const lightnessEasing = getLightnessEasing(hue);
  return function (saturation: number, lightness: number) {
    const saturationValue = saturationEasing(clamp(saturation, 0, 1));
    const lightnessValue = lightnessEasing(clamp(lightness, 0, 1));
    // console.log(saturation, saturationValue, lightness, lightnessValue);
    return tinycolor({ h: hue, s: saturationValue, l: lightnessValue })!.toHexString();
    // return `hsl(${hue}, ${saturationValue * 100}%, ${lightnessValue * 100}%)`;
  };
}
/**
 * 计算颜色可读性
 * @param color1 颜色1
 * @param color2 颜色2
 * @returns 可读性
 */
export function readability(color1: string, color2: string) {
  return tinycolor.readability(color1, color2);
}
/**
 * 检查颜色可读性
 * @param color1 颜色1
 * @param color2 颜色2
 * @param level 可读性等级
 * @param size 字体大小
 * @returns 是否可读
 */
export function isReadable(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'small' | 'large' = 'small'
) {
  return tinycolor.isReadable(color1, color2, { level, size });
}
