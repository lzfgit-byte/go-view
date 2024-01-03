import { computed, onUnmounted, Ref, watch } from 'vue';
import { getNewData, setDynamicData } from './util';

export default (
  vChartRef: Ref,
  props: any,
  xAxisOneData: Ref,
  xAxisTwoData: Ref,
  seriesOneData: Ref,
  seriesTwoData: Ref
) => {
  const loadData = () => {
    const categories = getNewData(xAxisOneData.value, () =>
      new Date().toLocaleTimeString().replace(/^\D*/, '')
    );
    const categories2 = getNewData(xAxisTwoData.value, (temp) => {
      return temp[temp.length - 1] + 1;
    });
    const data = getNewData(seriesOneData.value, () => Math.round(Math.random() * 1000));
    const data2 = getNewData(seriesTwoData.value, () => +(Math.random() * 10 + 5).toFixed(1));
    setDynamicData(vChartRef, categories, categories2, data, data2);
  };
  let timer: any = null;
  const dynamicStaticLoad = computed(
    () => props.chartConfig?.option?.dataConfigSet?.dynamicStaticLoad
  );
  watch(
    () => dynamicStaticLoad.value,
    (value) => {
      if (value) {
        timer = setInterval(() => {
          loadData();
        }, 2100);
      } else {
        timer && clearInterval(timer);
        timer = null;
      }
    }
  );
  if (dynamicStaticLoad.value) {
    timer = setInterval(() => {
      loadData();
    }, 2100);
  }
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
};
