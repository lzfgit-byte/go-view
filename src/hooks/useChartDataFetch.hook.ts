import { ref, toRaw, toRefs, watch } from 'vue';
import type VChart from 'vue-echarts';
import { customizeHttp } from '@/api/http';
import { useChartDataPondFetch } from '@/hooks/';
import type { CreateComponentType } from '@/packages/index.d';
import { ChartFrameEnum } from '@/packages/index.d';
import type { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
import { RequestDataTypeEnum } from '@/enums/httpEnum';
import {
  JSONParse,
  JSONStringify,
  fetchRouteParamsLocation,
  intervalUnitHandle,
  isPreview,
  newFunctionHandle,
} from '@/utils';
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
  const vChartRef = ref<typeof VChart | null>(null);
  let fetchInterval: any = 0;

  // 数据池
  const { addGlobalDataInterface } = useChartDataPondFetch();

  // 组件类型
  const { chartFrame } = targetComponent.chartConfig;

  // eCharts 组件配合 vChart 库更新方式
  const echartsUpdateHandle = (dataset: any) => {
    if (chartFrame === ChartFrameEnum.ECHARTS) {
      if (vChartRef.value) {
        setOption(vChartRef.value, { dataset });
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

        clearInterval(fetchInterval);

        const fetchFn = async () => {
          let request = toRaw(targetComponent.request);
          let jsonStr = JSONStringify(request);
          // TODO 添加更多动态参数
          [{ reg: /\$projectId/g, value: fetchRouteParamsLocation() }].forEach(({ reg, value }) => {
            jsonStr = jsonStr.replace(reg, value);
            request = JSONParse(jsonStr);
          });
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
  return { vChartRef };
};
