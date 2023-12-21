// 表格数据请求动态参数 TODO 添加更多动态参数
import { fetchRouteParamsLocation } from '@/utils/router';

export const CustomListReqData = [{ reg: /\$projectId/g, value: fetchRouteParamsLocation() }];
