import { nextTick, ref, toRaw, toRefs, watch } from 'vue';
import type VChart from 'vue-echarts';
import { customizeHttp } from '@/api/http';
import { useChartDataPondFetch } from '@/hooks/';
import type { CreateComponentType } from '@/packages/index.d';
import { ChartFrameEnum } from '@/packages/index.d';
import type { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
import { RequestDataTypeEnum } from '@/enums/httpEnum';
import { intervalUnitHandle, isPreview, newFunctionHandle } from '@/utils';
import { setOption } from '@/packages/public/chart';

// 获取类型
type ChartEditStoreType = typeof useChartEditStore;

/**
 * setdata 数据监听与更改
 * @param targetComponent
 * @param useChartEditStore 若直接引会报错，只能动态传递
 * @param updateCallback 自定义更新函数
 */
export const useChartDataFetch = (
  targetComponent: CreateComponentType,
  useChartEditStore: ChartEditStoreType,
  updateCallback?: (...args: any) => any
) => {
  const vChartRef = ref<InstanceType<typeof VChart>>();
  let fetchInterval: any = 0;
  const isRequest = ref(false);

  // 数据池
  const { addGlobalDataInterface } = useChartDataPondFetch();

  // 组件类型
  const { chartFrame } = targetComponent.chartConfig;

  // eCharts 组件配合 vChart 库更新方式
  const echartsUpdateHandle = (dataset: any) => {
    if (chartFrame === ChartFrameEnum.ECHARTS) {
      if (vChartRef.value) {
        setOption(vChartRef.value as any, { dataset });
      }
    }
  };

  const requestIntervalFn = () => {
    const chartEditStore = useChartEditStore();
    // 全局数据
    const {
      requestOriginUrl,
      requestIntervalUnit: globalUnit,
      requestInterval: globalRequestInterval,
    } = toRefs(chartEditStore.getRequestGlobalConfig);

    // 目标组件
    const {
      requestDataType,
      requestUrl,
      requestIntervalUnit: targetUnit,
      requestInterval: targetInterval,
    } = toRefs(targetComponent.request);

    // 非请求类型
    if (requestDataType.value !== RequestDataTypeEnum.AJAX) return;

    try {
      // 处理地址
      if (requestUrl?.value) {
        // requestOriginUrl 允许为空
        const completePath = requestOriginUrl?.value && requestOriginUrl.value + requestUrl.value;
        if (!completePath) return;
        isRequest.value = true;
        clearInterval(fetchInterval);

        const fetchFn = async () => {
          let request = toRaw(targetComponent.request);
          const res = await customizeHttp(request, toRaw(chartEditStore.getRequestGlobalConfig));
          if (res) {
            try {
              const filter = targetComponent.filter;
              const { data } = res;
              echartsUpdateHandle(newFunctionHandle(data, res, filter));
              // 更新回调函数
              if (updateCallback) {
                updateCallback(newFunctionHandle(data, res, filter));
              }
            } catch (error) {
              console.error(error);
            }
          }
        };

        // 普通初始化与组件交互处理监听
        watch(
          () => targetComponent.request.requestParams,
          () => {
            fetchFn();
          },
          {
            immediate: true,
            deep: true,
          }
        );
        watch(
          () => targetComponent.isRefresh,
          () => {
            console.log(targetComponent.id, '重新刷新');
            if (targetComponent.isRefresh) {
              targetComponent.isRefresh = false;
              fetchFn();
            }
          }
        );

        // 定时时间
        const time =
          targetInterval?.value && targetInterval.value
            ? targetInterval.value
            : globalRequestInterval.value;
        // 单位
        const unit =
          targetInterval?.value && targetInterval.value ? targetUnit.value : globalUnit.value;
        // 开启轮询
        if (time) {
          fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit));
        } else {
          fetchFn();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  nextTick().then(() => {
    setTimeout(() => {
      if (isPreview()) {
        targetComponent.request.requestDataType === RequestDataTypeEnum.Pond
          ? addGlobalDataInterface(
              targetComponent,
              useChartEditStore,
              updateCallback || echartsUpdateHandle
            )
          : requestIntervalFn();
      } else {
        requestIntervalFn();
      }
    });
  });

  return { vChartRef, isRequest };
};
