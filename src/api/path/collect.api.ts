// * 项目列表
import { http } from '@/api/http';
import { ModuleTypeEnum, RequestHttpEnum } from '@/enums/httpEnum';
import { httpErrorHandle } from '@/utils';
export interface CollectType {
  id: string;
  value: string;
  userId: string;
}
export const collectListApi = async (data: object = {}) => {
  try {
    const res = await http(RequestHttpEnum.GET)<CollectType[]>(
      `${ModuleTypeEnum.Collect}/listCollect`,
      data
    );
    return res;
  } catch {
    // eslint-disable-next-line no-undef
    httpErrorHandle();
  }
};
export const addCollect = async (data: object = {}) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.Collect}/addCollect`, data);
    return res;
  } catch {
    // eslint-disable-next-line no-undef
    httpErrorHandle();
  }
};
export const deleteCollect = async (data: object = {}) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.Collect}/deleteCollect`, data);
    return res;
  } catch {
    // eslint-disable-next-line no-undef
    httpErrorHandle();
  }
};
