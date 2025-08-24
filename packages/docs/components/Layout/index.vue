<template>
  <Layout></Layout>
</template>
<script lang="ts" setup>
import { useData } from "vitepress";
import { nextTick, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { randomChoice } from "foreslash";
import { darkAnimations, lightAnimations } from "./animation";

const { Layout } = DefaultTheme;
const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    ...randomChoice(isDark.value ? darkAnimations : lightAnimations)({
      clientX: x,
      clientY: y,
    })
  );
});
</script>
<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}
.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
