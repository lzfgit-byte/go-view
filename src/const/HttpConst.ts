// 表格数据请求动态参数 TODO 添加更多动态参数
const fetchRouteParamsLocation = () => {
  try {
    // 防止添加query参数的时候，解析ID异常
    return document.location.hash.split('?')[0].split('/').pop() || '';
  } catch (error) {
    window['$message'].warning('查询路由信息失败，请联系管理员！');
    return '';
  }
};
export const CustomListReqData = [{ reg: /\$projectId/g, value: fetchRouteParamsLocation() }];
