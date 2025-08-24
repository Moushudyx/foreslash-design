import { range } from "foreslash";

export type Animation = (event: {
  clientX: number;
  clientY: number;
}) => [
  keyframes: PropertyIndexedKeyframes | Keyframe[] | null,
  options?: number | KeyframeAnimationOptions | undefined
];

const standardOptions = {
  duration: 320,
  easing: "ease",
  pseudoElement: `::view-transition-new(root)`,
};
/** 从点击位置展开到屏幕边缘的圆 */
const keyframeExpandCircle = (x: number, y: number) => ({
  clipPath: [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ],
});
/** 从屏幕边缘收起到点击位置的圆 */
const keyframeExpandCircleReverse = (x: number, y: number) => ({
  // animate 方法不支持 mask-image 插值动画
  // maskImage: [
  //   `radial-gradient(circle at top ${y}px left ${x}px, #fff0 100%, #000f 100%`,
  //   `radial-gradient(circle at top ${y}px left ${x}px, #fff0 10%, #000f 10%`,
  // ],
  // animate 方法不支持 CSS 变量
  // "--maskSize": [
  //   `${Math.hypot(
  //     Math.max(x, innerWidth - x),
  //     Math.max(y, innerHeight - y)
  //   )}px`,
  //   "0px",
  // ],
  // 自行实现插值动画
  maskImage: range(1000, 0, {
    step: window.innerWidth > 1980 ? -8 : window.innerWidth > 1200 ? -10 : -20,
    getter: (i) =>
      `radial-gradient(circle at top ${y}px left ${x}px, #fff0 ${
        i / 10
      }%, #000f ${i / 10}%)`,
  }),
});

export const darkAnimations: Animation[] = [
  ({ clientX: x, clientY: y }) => [
    keyframeExpandCircleReverse(x, y),
    standardOptions,
  ],
];

export const lightAnimations: Animation[] = [
  ({ clientX: x, clientY: y }) => [keyframeExpandCircle(x, y), standardOptions],
];
