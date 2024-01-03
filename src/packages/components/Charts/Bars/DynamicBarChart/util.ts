import { Ref } from 'vue';

export const getNewData = (source: any, supply: (data: any) => any) => {
  let temp = source;
  temp.shift();
  temp.push(supply(temp));
  return temp;
};
export const getNewDataByLimit = (source: any[], supply: (data: any) => any, limit: number) => {
  let temp = source;
  limit = limit <= 0 ? 1 : limit;
  if (source.length < limit) {
    temp.push(supply(temp));
    return temp;
  }
  while (temp.length >= limit && limit > 0) {
    temp.shift();
  }
  temp.push(supply(temp));
  return temp;
};
export const setDynamicData = (
  vChartRef: Ref,
  categories: any,
  categories2: any,
  data: any,
  data2: any
) => {
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
