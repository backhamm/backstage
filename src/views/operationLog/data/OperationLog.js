export const options = [
    {value: '', label: '全部'},
    {
        value: 8, label: '登录注销', children: [
            {value: '', label: '全部'},
            {value: 'LOGIN', label: '登录'},
            {value: 'LOGOUT', label: '登出'}
        ]
    }, {
        value: 9, label: '修改状态', children: [
            {value: '', label: '全部'},
            {value: 'NOLOGIN', label: '修改登录状态'},
            {value: 'NOPLAYING', label: '修改投注状态'}
        ]
    }, {
        value: 10, label: '加减点', children: [
            {value: '', label: '全部'},
            {value: 'PAYIN', label: '加点'},
            {value: 'PAYOUT', label: '减点'}
        ]
    }, {
        value: 13, label: '添加操作', children: [
            {value: '', label: '全部'},
            {value: 'ADDUSER', label: '添加用户'}
        ]
    }, {
        value: 14, label: '修改操作', children: [
            {value: '', label: '全部'},
            {value: 'EDITPWD', label: '修改登录密码'},
            {value: 'EDITMEMBER', label: '修改用户信息'},
            {value: 'EDITPERMISSION', label: '修改权限'}
        ]
    }, {
        value: 16, label: '重新结算', children: [
            {value: '', label: '全部'},
            {value: 'RECHECK', label: '重新结算'}
        ]
    }
];
export const searchParams = {
    userName: '',
    operator: '',
    ip: '',
    logName: '',
    msg: '',
    type: '',
    startTime: '',
    endTime: '',
    event: []
};
export const searchList = [
    {key: 'event', type: 'cascader', options, placeholder: '事件'},
    {key: 'userName', type: 'input', placeholder: '用户名'},
    {key: 'operator', type: 'input', placeholder: '操作人'},
    {key: 'ip', type: 'input', placeholder: 'IP'},
    {key: 'msg', type: 'input', placeholder: '日志内容'},
    {key: 'startTime', type: 'time', title: '开始时间'},
    {key: 'endTime', type: 'time', title: '结束时间'},
    {key: 'search', type: 'search'}
];
export const columns = {
    type: 'index',
    list: [
        {key: 'userName', prop: 'userName', label: '用户名', fixed: true},
        {key: 'operator', prop: 'operator', label: '操作人'},
        {key: 'type', prop: 'type', label: '事件', slot: 'type'},
        {key: 'logName', prop: 'logName', label: '功能', slot: 'logName'},
        {key: 'msg', prop: 'msg', label: '日志内容'},
        {key: 'area', prop: 'area', label: '地区'},
        {key: 'time', prop: 'time', label: '时间', slot: 'createTime', width: 150},
        {key: 'ip', prop: 'ip', label: 'IP', width: 110},
    ]
};
export const pageData = {
    pageSizes: [25, 50, 100],
    total: 0,
    limit: 25,
    page: 1
};
