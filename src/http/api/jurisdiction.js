import {post} from "../index";

/**
 * 权限管理
 */

// 修改用户权限
export const setMemberPermission = (data) => post('/admin/permission/resource/editMemberPermission', data, true);

// 获取系统权限
export const getAuthList = (data) => post('/admin/permission/resource/getResourceList', data);
