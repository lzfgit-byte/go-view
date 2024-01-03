import { computed, onUnmounted, Ref, watch } from 'vue';
import { getNewData, getNewDataByLimit, setDynamicData } from './util';

export default (
  vChartRef: Ref,
  props: any,
  xAxisOneData: Ref,
  xAxisTwoData: Ref,
  seriesOneData: Ref,
  seriesTwoData: Ref,
  rd: Ref,
  limitCount: Ref<number>
) => {
  const loadData = () => {
    const categories = getNewDataByLimit(
      xAxisOneData.value,
      () => new Date().toLocaleTimeString().replace(/^\D*/, ''),
      limitCount.value
    );
    const categories2 = getNewDataByLimit(
      xAxisTwoData.value,
      (temp) => {
        return +(temp[temp.length - 1] || 0) + 1;
      },
      limitCount.value
    );
    const data = getNewDataByLimit(
      seriesOneData.value,
      () => Math.round(Math.random() * 1000),
      limitCount.value
    );
    const data2 = getNewDataByLimit(
      seriesTwoData.value,
      () => +(Math.random() * 10 + 5).toFixed(1),
      limitCount.value
    );
    setDynamicData(vChartRef, categories, categories2, data, data2);
  };
  let timer: any = null;
  const stopTimer = () => {
    timer && clearInterval(timer);
  };
  const dynamicStaticLoad = computed(
    () => props.chartConfig?.option?.dataConfigSet?.dynamicStaticLoad
  );
  const stop = watch(
    () => dynamicStaticLoad.value,
    (value) => {
      if (rd.value) {
        stopTimer();
        stop();
        return;
      }
      if (value) {
        timer = setInterval(() => {
          loadData();
        }, 2100);
      } else {
        stopTimer();
      }
    }
  );
  if (dynamicStaticLoad.value) {
    timer = setInterval(() => {
      if (rd.value) {
        stopTimer();
        return;
      }
      loadData();
    }, 2100);
  }
  onUnmounted(() => {
    stopTimer();
  });
};
