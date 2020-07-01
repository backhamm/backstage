import {post} from "../index";

/**
 * 系统管理
 * 操作日志
 */

// 列表
export const getLogList = (data) => post('/admin/applogs/manager/list', data);
