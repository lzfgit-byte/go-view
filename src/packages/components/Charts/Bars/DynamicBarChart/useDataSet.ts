import { computed, onUnmounted, Ref, watch } from 'vue';
const getNewData = (source: any, supply: (data: any) => any) => {
  let temp = source;
  temp.shift();
  temp.push(supply(temp));
  return temp;
};
export default (vChartRef: Ref, props: any) => {
  const optionsC = computed(() => vChartRef.value?.option);
  const xAxisOneData = computed(() => optionsC.value?.xAxis[0]?.data);
  const xAxisTwoData = computed(() => optionsC.value?.xAxis[1]?.data);
  const seriesOneData = computed(() => optionsC.value?.series[0]?.data);
  const seriesTwoData = computed(() => optionsC.value?.series[1]?.data);
  const setData = (categories: any, categories2: any, data: any, data2: any) => {
    vChartRef.value?.setOption({
      xAxis: [
        {
          data: categories,
        },
        {
          data: categories2,
        },
      ],
      series: [
        {
          data: data,
        },
        {
          data: data2,
        },
      ],
    });
  };
  const loadData = () => {
    const categories = getNewData(xAxisOneData.value, () =>
      new Date().toLocaleTimeString().replace(/^\D*/, '')
    );
    const categories2 = getNewData(xAxisTwoData.value, (temp) => ++temp[temp.length - 1]);
    const data = getNewData(seriesOneData.value, () => Math.round(Math.random() * 1000));
    const data2 = getNewData(seriesTwoData.value, () => +(Math.random() * 10 + 5).toFixed(1));
    setData(categories, categories2, data, data2);
  };
  let timer: any = null;
  watch(
    () => props.chartConfig?.option?.loadDynamicData.value,
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
  if (props.chartConfig?.option?.loadDynamicData.value) {
    timer = setInterval(() => {
      loadData();
    }, 2100);
  }
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return { setData };
};
