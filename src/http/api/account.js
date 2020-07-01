import {post} from "../index";

/**
 * 账户中心
 * 账户管理
 */

// 用户管理列表
export const getDirectList = (data) => post('/admin/member/manager/directListPage', data);

// 用户管理列表
export const getAccountList = (data) => post('/admin/member/manager/listPage', data);

// 切换状态
export const setAccountStatus = (data) => post('/admin/member/manager/editStatus', data, true);

// 添加用户
export const getAccountAdd = (data) => post('/admin/member/manager/add', data, true);

// 修改用户
export const getAccountEdit = (data) => post('/admin/member/manager/edit', data, true);

// 用户筹码列表
export const getBjlQuotaSet = (data) => post('/admin/member/manager/getBjlQuotaSet', data);

// 用户所有上级
export const getAllTopInfo = (data) => post('/admin/member/manager/getAllTopInfo', data);

// 确认加减点
export const getAddSubPoints = (data) => post('/admin/member/manager/addAndSubPoints', data, true);

/**
 * 账户中心
 * 子账户管理
 */

// table列表
export const getSubAccount = (data) => post('/admin/memberSub/manager/listPage', data);

// 修改状态
export const setSubStatus = (data) => post('/admin/memberSub/manager/editStatus', data, true);

// 添加子账号
export const addSubAccount = (data) => post('/admin/memberSub/manager/addMemberSub', data, true);

// 查询子账号信息
export const getSubInfo = (data) => post('/admin/memberSub/manager/getMemberSubInfo', data);

// 编辑子账号
export const editSubAccount = (data) => post('/admin/memberSub/manager/editMemberSub', data, true);

// 编辑子账号权限
export const editSubAuth = (data) => post('/admin/memberSub/manager/editMemberSubPermission', data, true);

/**
 * 账户中心
 * 在线用户
 */

// table列表
export const getOnlineUser = (data) => post('/admin/member/online/onlineMemberlist', data);
