export const searchParams = { userName: '', orderNumber: '', gameNumber: '', startTime: '', endTime: '' };
export const searchList = [
    { key: 'userName', type: 'input', placeholder: '用户名' },
    { key: 'gameNumber', type: 'input', placeholder: '局编号' },
    { key: 'orderNumber', type: 'input', placeholder: '注单号' },
    { key: 'startTime', type: 'time', title: '开始时间' },
    { key: 'endTime', type: 'time', title: '结束时间' },
    { key: 'search', type: 'search' }
];
export const pageData = {
    pageSizes: [25, 50, 100],
    total: 0,
    limit: 25,
    page: 1
};
export const columns = {
    type: 'index',
    list: [
        {key: 'userName',prop: 'userName', label:'用户名', width: 100, fixed: true},
        {key: 'gameNum',prop: 'gameNum', label: '局编号', width: 130},
        {key: 'id',prop: 'id', label: '注单号'},
        {key: 'ju',prop: 'ju', label: '局数'},
        {key: 'sTime',prop: 'sTime', label: '下注时间', slot: 'sTime', width: 130},
        {key: 'eTime',prop: 'eTime', label: '结算时间', slot: 'eTime', width: 130},
        {key: 'orderType',prop: 'orderType', label:'下注类型'},
        {key: 'poker',prop: 'poker', label: '开奖结果'},
        {key: 'rate',prop: 'rate', label:'倍率', slot: 'rate'},
        {key: 'money',prop: 'money', label:'投注金额'},
        {key: 'userWashProfit',prop: 'userWashProfit', label:'洗码量'},
        {key: 'agentProfit',prop: 'agentProfit', label:'抽水'},
        {key: 'userProfit',prop: 'userProfit', label:'利润', slot: 'userProfit'},
        {key: 'balance',prop: 'balance', label:'余额'},
        {key: 'deviceType',prop: 'deviceType', label:'设备类型'},
        {key: 'payOutType',prop: 'payOutType', label:'派彩类型'}
    ]
};
