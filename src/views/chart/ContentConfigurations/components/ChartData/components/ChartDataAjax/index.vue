<template>
  <div class="go-chart-configurations-data-ajax">
    <n-card class="n-card-shallow">
      <SettingItemBox name="请求配置">
        <SettingItem name="类型">
          <n-tag :bordered="false" type="primary" style="border-radius: 5px">
            {{
              targetData.request.requestContentType === RequestContentTypeEnum.DEFAULT
                ? '普通请求'
                : 'SQL请求'
            }}
          </n-tag>
        </SettingItem>

        <SettingItem name="方式">
          <n-input
            size="small"
            :placeholder="targetData.request.requestHttpType || '暂无'"
            :disabled="true"
          ></n-input>
        </SettingItem>

        <SettingItem name="组件间隔">
          <n-input
            size="small"
            :placeholder="`${targetData.request.requestInterval || '暂无'}`"
            :disabled="true"
          >
            <template #suffix>
              {{ SelectHttpTimeNameObj[targetData.request.requestIntervalUnit] }}
            </template>
          </n-input>
        </SettingItem>

        <SettingItem name="全局间隔（默认）">
          <n-input
            size="small"
            :placeholder="`${GlobalRequestInterval || '暂无'} `"
            :disabled="true"
          >
            <template #suffix> {{ SelectHttpTimeNameObj[GlobalRequestIntervalUnit] }} </template>
          </n-input>
        </SettingItem>
      </SettingItemBox>

      <SettingItemBox name="源地址" :alone="true">
        <n-input size="small" :placeholder="requestOriginUrl || '暂无'" :disabled="true">
          <template #prefix>
            <n-icon :component="PulseIcon" />
          </template>
        </n-input>
      </SettingItemBox>

      <SettingItemBox name="组件地址" :alone="true">
        <n-input
          size="small"
          :placeholder="targetData.request.requestUrl || '暂无'"
          :disabled="true"
        >
          <template #prefix>
            <n-icon :component="FlashIcon" />
          </template>
        </n-input>
      </SettingItemBox>

      <div class="edit-text" @click="requestModelHandle">
        <div class="go-absolute-center">
          <n-button type="primary" secondary>编辑配置</n-button>
        </div>
      </div>
    </n-card>

    <SettingItemBox :alone="true">
      <template #name>
        测试
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <HelpOutlineIcon></HelpOutlineIcon>
            </n-icon>
          </template>
          默认赋值给 dataset 字段
        </n-tooltip>
      </template>
      <n-button type="primary" ghost @click="sendHandle">
        <template #icon>
          <n-icon>
            <FlashIcon />
          </n-icon>
        </template>
        发送请求
      </n-button>
    </SettingItemBox>

    <!-- 底部数据展示 -->
    <ChartDataMatchingAndShow
      :show="showMatching && !loading"
      :ajax="true"
    ></ChartDataMatchingAndShow>

    <!-- 骨架图 -->
    <go-skeleton :load="loading" :repeat="3"></go-skeleton>

    <!-- 请求配置model -->
    <ChartDataRequest
      v-model:modelShow="requestShow"
      :target-data="targetData"
      @send-handle="sendHandle"
    ></ChartDataRequest>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, ref, toRaw, toRefs, watchEffect } from 'vue';
  import { ChartDataRequest } from '../ChartDataRequest/index';
  import { SelectHttpType } from '../../index.d';
  import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow';
  import { useTargetData } from '../../../hooks/useTargetData.hook';
  import { icon } from '@/plugins';
  import { useDesignStore } from '@/store/modules/designStore/designStore';
  import { SettingItem, SettingItemBox } from '@/components/Pages/ChartItemSetting';
  import {
    RequestContentTypeEnum,
    RequestHttpEnum,
    ResultEnum,
    SelectHttpTimeNameObj,
  } from '@/enums/httpEnum';
  import {
    chartDataUrl,
    imageUrl,
    numberFloatUrl,
    numberIntUrl,
    rankListUrl,
    scrollBoardUrl,
    textUrl,
  } from '@/api/mock';
  import { customizeHttp, http } from '@/api/http';
  import { newFunctionHandle } from '@/utils';

  const { HelpOutlineIcon, FlashIcon, PulseIcon } = icon.ionicons5;
  const { targetData, chartEditStore } = useTargetData();

  const {
    requestOriginUrl,
    requestInterval: GlobalRequestInterval,
    requestIntervalUnit: GlobalRequestIntervalUnit,
  } = toRefs(chartEditStore.getRequestGlobalConfig);
  const designStore = useDesignStore();

  // 是否展示数据分析
  const loading = ref(false);
  const requestShow = ref(false);
  const showMatching = ref(false);

  let firstFocus = 0;
  let lastFilter: any;

  // 请求配置 model
  const requestModelHandle = () => {
    requestShow.value = true;
  };

  // 发送请求
  const sendHandle = async () => {
    if (!targetData.value?.request) {
      return;
    }
    loading.value = true;
    try {
      const res = await customizeHttp(
        toRaw(targetData.value.request),
        toRaw(chartEditStore.getRequestGlobalConfig)
      );
      loading.value = false;
      if (res) {
        const { data } = res;
        if (!data && !targetData.value.filter) {
          window['$message'].warning('您的数据不符合默认格式，请配置过滤器！');
          showMatching.value = true;
          return;
        }
        targetData.value.option.dataset = newFunctionHandle(data, res, targetData.value.filter);
        showMatching.value = true;
        return;
      }
      window['$message'].warning('没有拿到返回值，请检查接口！');
    } catch (error) {
      console.error(error);
      loading.value = false;
      window['$message'].warning('数据异常，请检查参数！');
    }
  };

  // 颜色
  const themeColor = computed(() => {
    return designStore.getAppTheme;
  });

  watchEffect(() => {
    const filter = targetData.value?.filter;
    if (lastFilter !== filter && firstFocus) {
      lastFilter = filter;
      sendHandle();
    }
    firstFocus++;
  });

  onBeforeUnmount(() => {
    lastFilter = null;
  });
</script>

<style lang="scss" scoped>
  @include go('chart-configurations-data-ajax') {
    .n-card-shallow {
      &.n-card {
        @extend .go-background-filter;
        @include deep() {
          .n-card__content {
            padding: 10px;
          }
        }
      }
      .edit-text {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 325px;
        height: 270px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s;
        @extend .go-background-filter;
        backdrop-filter: blur(2px) !important;
      }
      &:hover {
        border-color: v-bind('themeColor');
        .edit-text {
          opacity: 1;
        }
      }
    }
  }
</style>
