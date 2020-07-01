import {post} from "../index";

/**
 * 游戏数据
 * 游戏报表
 * @param data
 * @returns {*}
 */
// 真人游戏总报表
export const getGameReport = (data) => post('/admin/game/report/agent', data);

// 会员真人游戏列表
export const getMemberGameReport = (data) => post('/admin/game/report/member', data);

/**
 * 游戏数据
 * 真人游戏记录
 * @param data
 * @returns {*}
 */
// 真人游戏记录
export const getGameRecord = (data) => post('/admin/game/record', data);

// 上下分记录
export const getGameTransfer = (data) => post('/admin/game/transfer', data);
