import BezierEasing from 'bezier-easing';

export type EasingItem = [hue: number, x1: number, y1: number, x2: number, y2: number];
export type EasingMap = EasingItem[];
/** 饱和度 easing 映射 */
const SaturationEasingMap: EasingMap = [
  [0, 0.16, 0.09, 0.32, 0.18],
  [360, 0.16, 0.09, 0.32, 0.18],
];
/**
 * 获取饱和度 easing 取值
 * @param hue 颜色值
 * @returns easing 函数
 */
export function getSaturationEasing(hue: number) {
  const lastEasing = getEasingMap(SaturationEasingMap, hue);
  return BezierEasing(lastEasing[1], lastEasing[2], lastEasing[3], lastEasing[4]);
}
/** 亮度 easing 映射 */
const LightnessEasingMap: EasingMap = [
  [0, 0.25, 0.10, 0.75, 0.988],
  [60, 0.29, 0.10, 0.75, 0.98],
  [90, 0.32, 0.10, 0.75, 0.98],
  [120, 0.29, 0.10, 0.75, 0.98],
  [150, 0.25, 0.10, 0.75, 0.98],
  [180, 0.25, 0.10, 0.75, 0.98],
  [210, 0.25, 0.10, 0.75, 0.98],
  [240, 0.25, 0.10, 0.75, 0.98],
  [270, 0.25, 0.10, 0.75, 0.98],
  [300, 0.25, 0.10, 0.75, 0.98],
  [330, 0.25, 0.10, 0.75, 0.98],
  [360, 0.25, 0.10, 0.75, 0.98],
];
/**
 * 获取亮度 easing 取值
 * @param hue 颜色值
 * @returns easing 函数
 */
export function getLightnessEasing(hue: number) {
  const lastEasing = getEasingMap(LightnessEasingMap, hue);
  return BezierEasing(lastEasing[1], lastEasing[2], lastEasing[3], lastEasing[4]);
}
/**
 * 获取 easing 取值, 如果没有则查找最近的两个点然后线性插值
 * @param easingMap easing 映射
 * @param hue 颜色值
 * @returns easing 取值
 */
export function getEasingMap(easingMap: EasingMap, hue: number) {
  let lastEasing: EasingItem = easingMap[0];
  for (const item of easingMap) {
    // 查找 hue 对应的 easing 取值
    if (item[0] === hue) {
      lastEasing = [...item];
      break;
    }
    // 如果没有则查找最近的两个点然后线性插值
    if (item[0] > hue) {
      const radio = (hue - lastEasing[0]) / (item[0] - lastEasing[0]);
      lastEasing = [
        hue,
        linearInterpolation(lastEasing[1], item[1], radio),
        linearInterpolation(lastEasing[2], item[2], radio),
        linearInterpolation(lastEasing[3], item[3], radio),
        linearInterpolation(lastEasing[4], item[4], radio),
      ];
      break;
    }
    lastEasing = item;
  }
  return lastEasing;
}

// 线性插值
function linearInterpolation(x: number, y: number, radio: number) {
  return x + (y - x) * radio;
}
