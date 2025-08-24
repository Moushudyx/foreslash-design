<template>
  <div class="color-panel">
    <!-- <div class="color-panel__title">{{ name }}</div> -->
    <div class="color-panel__item" v-for="item in colorList" :key="item.name" :style="{ color: item.textColor }">
      <div class="color-panel__item-name">{{ item.name }}</div>
      <div class="color-panel__item-readable">{{ item.isReadable ? '' : '文字展示不清' }}</div>
      <div class="color-panel__item-color">{{ item.color }}</div>
      <!-- <div class="color-panel__item-readability">{{ item.readability }}</div> -->
      <div class="color-panel__item-bg" :style="{ background: item.color }"></div>
    </div>
    <div class="color-panel__preview color-panel__preview-light" :style="{ background: '#fefefe', color: '#010101' }">
      <div class="color-panel__preview-text color-panel__preview-text-light">
        <span :style="{ color: recommendColor.light.textColor }">曰：遂古之初，谁传道之？上下未形，何由考之？</span>
        冥昭瞢暗，谁能极之？ 冯翼惟象，何以识之？ 明明暗暗，惟时何为？ 阴阳三合，何本何化？ 圜则九重，孰营度之？
        惟兹何功，孰初作之？ 斡维焉系，天极焉加？ 八柱何当，东南何亏？ 九天之际，安放安属？ 隅隈多有，谁知其数？
        天何所沓？十二焉分？ 日月安属？列星安陈？ 出自汤谷，次于蒙汜。 自明及晦，所行几里？ 夜光何德，死则又育？
      </div>
      <div class="color-panel__preview-button-bar" :style="{ background: recommendColor.light.bgColor }">
        <div
          class="color-panel__preview-button color-panel__preview-button-light"
          :style="{ background: recommendColor.light.primaryColor, color: recommendColor.light.primaryTextColor }"
        >
          提问
        </div>
      </div>
    </div>
    <div class="color-panel__preview color-panel__preview-dark" :style="{ background: '#010101', color: '#fefefe' }">
      <div class="color-panel__preview-text color-panel__preview-text-dark">
        <span :style="{ color: recommendColor.dark.textColor }">曰：遂古之初，谁传道之？上下未形，何由考之？</span>
        冥昭瞢暗，谁能极之？ 冯翼惟象，何以识之？ 明明暗暗，惟时何为？ 阴阳三合，何本何化？ 圜则九重，孰营度之？
        惟兹何功，孰初作之？ 斡维焉系，天极焉加？ 八柱何当，东南何亏？ 九天之际，安放安属？ 隅隈多有，谁知其数？
        天何所沓？十二焉分？ 日月安属？列星安陈？ 出自汤谷，次于蒙汜。 自明及晦，所行几里？ 夜光何德，死则又育？
      </div>
      <div class="color-panel__preview-button-bar" :style="{ background: recommendColor.dark.bgColor }">
        <div
          class="color-panel__preview-button color-panel__preview-button-dark"
          :style="{ background: recommendColor.dark.primaryColor, color: recommendColor.dark.primaryTextColor }"
        >
          提问
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateColor, isReadable, readability } from '@foreslash-ui/utils';
import { computed, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{ designColor: string; name: string; code: string; list?: [number, number][] }>(),
  {
    name: '颜色',
    code: '900',
    designColor: '#900',
    list: () =>
      [
        [1, 0.929],
        [1, 0.857],
        [1, 0.786],
        [1, 0.714],
        [1, 0.643],
        [1, 0.571],
        [1, 0.5],
        [1, 0.429],
        [1, 0.357],
        [1, 0.286],
        [1, 0.214],
        [1, 0.143],
      ] as [number, number][],
  }
);
const colorList = ref<{ color: string; textColor: string; name: string; readability: number; isReadable: boolean }[]>(
  []
);
const recommendColor = computed(() => {
  if (colorList.value.length === 0) {
    return {
      light: { bgColor: '', textColor: '', primaryColor: '', primaryTextColor: '' },
      dark: { bgColor: '', textColor: '', primaryColor: '', primaryTextColor: '' },
    };
  }
  return {
    light: {
      bgColor: colorList.value[1].color,
      textColor: colorList.value[9].color,
      primaryColor: colorList.value[8].color,
      primaryTextColor: colorList.value[0].color,
    },
    dark: {
      bgColor: colorList.value[11].color,
      textColor: colorList.value[2].color,
      primaryColor: colorList.value[9].color,
      primaryTextColor: colorList.value[0].color,
    },
  };
});

onMounted(() => {
  const colorGenerator = generateColor(props.designColor);
  // colorList.push(...colorGenerator());
  props.list.forEach((item, index) => {
    const textColor = item[1] > 0.5 ? '#010101' : '#fefefe';
    const color = colorGenerator(item[0], item[1]);
    colorList.value.push({
      color,
      textColor,
      name: `${props.code}-${index + 1}`,
      readability: readability(color, textColor),
      isReadable: isReadable(color, textColor),
    });
  });
});
</script>
<style lang="scss">
.color-panel {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  min-width: 256px;
  padding: 16px;
  box-sizing: border-box;
  .color-panel__title {
    padding: 8px 24px;
    font-size: large;
  }
  .color-panel__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px 24px;
    font-size: medium;
    transition: all 320ms ease;
    .color-panel__item-readable {
      margin-left: 16px;
      opacity: 0;
      transition: all 240ms ease;
    }
    .color-panel__item-color {
      margin-left: 16px;
      opacity: 0;
      transform: scale(0.95) translateX(12px);
      transition: all 240ms ease;
    }
    .color-panel__item-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 8px);
      height: 100%;
      z-index: -1;
      transition: all 240ms ease;
    }
    &:hover {
      .color-panel__item-readable {
        opacity: 1;
      }
      .color-panel__item-color {
        opacity: 1;
        transform: scale(1) translateX(0);
      }
      .color-panel__item-bg {
        width: 100%;
      }
    }
  }
  &:hover {
    .color-panel__item:not(:hover) {
      .color-panel__item-color,
      .color-panel__item-readable {
        opacity: 0.15;
      }
    }
  }
  .color-panel__preview {
    width: 100%;
    padding-bottom: 12px;
    margin-top: 12px;

    box-sizing: border-box;
    .color-panel__preview-text {
      padding: 12px 16px;
      box-sizing: border-box;
    }
    .color-panel__preview-button-bar {
      padding: 8px 16px;
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 8px;
      .color-panel__preview-button {
        padding: 8px 16px;
        border-radius: 8px;
      }
    }
  }
}
</style>
