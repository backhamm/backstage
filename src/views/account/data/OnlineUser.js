export const searchParams = { userName: '' };
export const searchList = [
    { key: 'userName', type: 'input', placeholder: '用户名' },
    { key: 'search', type: 'search' }
];
export const columns = {
    type: 'index',
    list: [
        {key: 'userName',prop: 'userName', label:'用户名'},
        // {key: 'nickName',prop: 'nickName', label: '名称'},
        {key: 'ip',prop: 'ip', label: 'IP'}
    ]
};

export const pageData = {
    pageSizes: [25, 50, 100],
    total: 0,
    limit: 25,
    page: 1
};
