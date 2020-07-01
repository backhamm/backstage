const loginOptions = [
    { id: '', name: '全部' },
    { id: 0, name: '锁定 ' },
    { id: 1, name: '正常' }
];
const playOptions = [
    { id: '', name: '全部' },
    { id: 0, name: '锁定 ' },
    { id: 2, name: '正常' }
];
export const searchParams = { userName: '', nickName: '', role: '', loginStatus: '', playStatus: '' };
export const searchList = [
    { key: 'userName', type: 'input', placeholder: '用户名' },
    { key: 'nickName', type: 'input', placeholder: '名称' },
    { key: 'role', type: 'select', title: '用户组', options: [] },
    { key: 'loginStatus', type: 'select', title: '登录状态', options: loginOptions },
    { key: 'playStatus', type: 'select', title: '投注状态', options: playOptions },
    { key: 'search', type: 'search' }
];
export const addParams = {topUserName: '', userName: '', nickName: '', passWord: '', role: '', liveMoney: '0', liveOccupy: '0', liveWash: '0', showWash: '1', quotaIdList: '', moneyType: 'CNY'};
export const addList = [
    {title: '上线', key: 'topUserName', type: 'text', disabled: true},
    {title: '货币类型', key: 'moneyType', type: 'text', disabled: true},
    {title: '用户名', key: 'userName', errMsg: '4~20位数字或字母', reg: /^[a-zA-Z0-9]{4,20}$/, maxlength: 20, must: true},
    {title: '名称', key: 'nickName', errMsg: '2~10位数字、字母或汉字', reg: /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/, maxlength: 10, must: true},
    {title: '密码', key: 'passWord', errMsg: '6~16位', reg: /^.{6,16}$/, maxlength: 16, inputType: 'password', must: true},
    {title: '真人点数', key: 'liveMoney', must: true, inputType: 'number', type: 'input-prompt', prompt: ''},
    {title: '真人占成', key: 'liveOccupy', must: true, inputType: 'number', type: 'input-prompt', prompt: '', append: '%'},
    {title: '真人洗码', key: 'liveWash', must: true, inputType: 'number', type: 'input-prompt', prompt: '', append: '%'},
    {title: '隐藏洗码', key: 'showWash', type: 'switch', active: '是', inactive: '否'},
    {title: '筹码', key: 'quotaIdList', type: 'table', sort: 'crossColumn'}
];
export const editParams = {topUserName: '', userName: '', nickName: '', passWord: '', role: '', liveMoney: '0', liveOccupy: '0', liveWash: '0', showWash: '1', quotaIdList: '', moneyType: 'CNY'};
export const editList = [
    {title: '上线', key: 'topUserName', type: 'text', disabled: true},
    {title: '货币类型', key: 'moneyType', type: 'text', disabled: true},
    {title: '用户名', key: 'userName', disabled: true},
    {title: '真人点数', key: 'liveMoney', inputType: 'number', disabled: true},
    {title: '名称', key: 'nickName', errMsg: '2~10位数字、字母或汉字', reg: /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/, maxlength: 10, must: true},
    {title: '密码', key: 'passWord', errMsg: '6~16位，不修改请留空', reg: /^$|.{6,16}$/, maxlength: 16, inputType: 'password'},
    {title: '真人占成', key: 'liveOccupy', inputType: 'number', must: true, append: '%', type: 'input-prompt', prompt: ''},
    {title: '真人洗码', key: 'liveWash', inputType: 'number', must: true, append: '%', type: 'input-prompt', prompt: ''},
    {title: '隐藏洗码', key: 'showWash', type: 'switch', active: '是', inactive: '否'},
    {title: '筹码', key: 'quotaIdList', type: 'table', sort: 'crossColumn', tips: '如果筹码前面打钩小框显“灰色”不可编辑状态，那么就代表此账号下有用户正在使用此筹码，无法修改，如需修改，请先去除下级用户的相应筹码。'}
];
export const countParams = {type: '0', liveMoney: '', topUserId: '', rmk: '', userId: ''};
export const countList = [
    {title: '操作类型', key: 'type', type: 'switch', active: '加点', inactive: '减点'},
    {title: '加减点数量', key: 'liveMoney', must: true, inputType: 'number', type: 'input-prompt', prompt: ''},
    {title: '从哪一级过账', key: 'topUserId', type: 'select', must: true, options: []},
    {title: '备注', key: 'rmk', type: 'textarea'}
];
export const authParams = {resourceIdList: '', userName: ''};
export const authList = [
    {title: '', key: 'quotaIdList', type: 'table', sort: 'wholeLine'}
];
export const columns = {
    type: 'index',
    list: [
        {key: 'userName',prop: 'userName', label:'用户名', slot: 'userName', fixed: true},
        {key: 'nickName',prop: 'nickName', label: '名称'},
        {key: 'parentTreeStr',prop: 'parentTreeStr', label: '代理关系'},
        {key: 'role',prop: 'role', label: '用户组', slot: 'role'},
        {key: 'liveMoney',prop: 'liveMoney', label:'真人点数'},
        {key: 'liveOccupy',prop: 'liveOccupy', label: '真人占成', slot: 'liveOccupy'},
        {key: 'liveWash',prop: 'liveWash', label: '真人洗码', slot: 'liveWash'},
        {key: 'status',prop: 'status', label:'登录', slot: 'status'},
        {key: 'status2',prop: 'status', label: '投注', slot: 'status2'},
        {key: 'createTime',prop: 'createTime', label: '新建时间', slot: 'createTime', width: 134},
        {key: 'operating',prop: 'operating', label:'管理操作', slot: 'operating', width: 330}
    ]
};
export const userColumns = {
    list: [
        {key: 'userName',prop: 'userName', label:'用户名'},
        {key: 'nickName',prop: 'nickName', label: '名称'},
        {key: 'role',prop: 'role', label: '角色', slot: 'role'},
        {key: 'status',prop: 'status', label:'登录', slot: 'status'},
        {key: 'status2',prop: 'status', label: '投注', slot: 'status2'},
        {key: 'liveMoney',prop: 'liveMoney', label:'真人点数'},
        {key: 'liveOccupy',prop: 'liveOccupy', label: '真人占成', slot: 'liveOccupy'},
        {key: 'liveWash',prop: 'liveWash', label: '真人洗码', slot: 'liveWash'}
    ]
};

export const pageData = {
    pageSizes: [25, 50, 100],
    total: 0,
    limit: 25,
    page: 1
};
