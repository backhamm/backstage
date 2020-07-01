import { post } from "../index";

// 登录
export const login = (data) => post('/admin/login', data, true);

// 账户概览
export const userInfo = (data, showMsg) => post('/admin/member/manager/memberInfo', data, showMsg);

// 登出
export const logout = () => post('/admin/user/logout');

// 修改密码
export const editPassword = (data) => post('/admin/member/manager/editPassword', data, true);
