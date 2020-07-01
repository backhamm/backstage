export const searchParams = { userName: '', billNo: '', type: '', startTime: '', endTime: '' };
export const searchList = [
    { key: 'userName', type: 'input', placeholder: '用户名' },
    { key: 'billNo', type: 'input', placeholder: '订单号' },
    { key: 'type', type: 'select', title: '转账类型', options: [{ id: '', name: '全部' }, { id: 0, name: '上分 ' }, { id: 1, name: '下分' }] },
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
        {key: 'userName',prop: 'userName', label:'用户名', fixed: true},
        {key: 'money',prop: 'money', label: '转账金额', slot: 'money'},
        {key: 'balance',prop: 'balance', label: '余额'},
        {key: 'billNo',prop: 'billNo', label: '订单号'},
        {key: 'fromUserName',prop: 'fromUserName', label: '金额去向'},
        {key: 'type',prop: 'type', label: '类型', slot: 'type'},
        {key: 'time',prop: 'time', label: '转账时间', slot: 'time', width: 130},
        {key: 'ip',prop: 'ip', label: 'IP', width: 110},
        {key: 'area',prop: 'area', label: 'IP归属地'}
    ]
};
