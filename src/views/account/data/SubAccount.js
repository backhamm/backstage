export const addParams = {fatherId: '', userName: '', nickName: '', passWord: '', tel: ''};
export const addList = [
    {title: '用户名', key: 'userName', must: true, errMsg: '4~20位数字或字母', reg: /^[a-zA-Z0-9]{4,20}$/, maxlength: 20},
    {title: '名称', key: 'nickName', must: true, errMsg: '2~10位数字、字母或汉字', reg: /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/, maxlength: 10},
    {title: '密码', key: 'passWord', must: true, errMsg: '6~16位', inputType: 'password', reg: /^.{6,16}$/, maxlength: 16},
    {title: '手机号', key: 'tel', placeholder: '请填写正确的手机号', errMsg: '格式有误', reg: /^$|1[3456789]\d{9}$/, maxlength: 11}
];
export const editParams = {userId: '', nickName: '', passWord: '', tel: ''};
export const editList = [
    {title: '名称', key: 'nickName', must: true, errMsg: '2~10位', reg: /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/, maxlength: 10},
    {title: '密码', key: 'passWord', errMsg: '6~16位，不修改请留空', inputType: 'password', reg: /^$|.{6,16}$/, maxlength: 16},
    {title: '手机号', key: 'tel', placeholder: '请填写正确的手机号', errMsg: '格式有误', reg: /^$|1[3456789]\d{9}$/, maxlength: 11}
];
export const columns = {
    type: 'index',
    list: [
        {key: 'userName',prop: 'userName', label:'用户名', fixed: true},
        {key: 'nickName',prop: 'nickName', label: '名称'},
        {key: 'tel',prop: 'tel', label: '手机号', width: 100},
        {key: 'fatherUserName',prop: 'fatherUserName', label: '父用户名'},
        {key: 'fatherNickName',prop: 'fatherNickName', label: '父名称'},
        {key: 'status',prop: 'status', label:'状态', slot: 'status'},
        {key: 'createTime',prop: 'createTime', label: '新建时间', slot: 'createTime', width: 150},
        {key: 'operating',prop: 'operating', label:'管理操作', slot: 'operating', width: 150}
    ]
};
export const userColumns = {
    list: [
        {key: 'userName',prop: 'userName', label:'总户名'},
        {key: 'nickName',prop: 'nickName', label: '名称'},
        {key: 'role',prop: 'role', label: '角色', slot: 'role'},
        {key: 'status',prop: 'status', label:'登录', slot: 'status'},
        {key: 'status2',prop: 'status', label: '投注', slot: 'status2'},
        {key: 'liveMoney',prop: 'liveMoney', label:'真人点数'},
        {key: 'liveOccupy',prop: 'liveOccupy', label: '真人占成', slot: 'liveOccupy'},
        {key: 'liveWash',prop: 'liveWash', label: '真人洗码', slot: 'liveWash'}
    ]
};
export const authParams = {resourceIdList: '', userId: ''};
export const authList = [
    {title: '', key: 'quotaIdList', type: 'table', sort: 'wholeLine'}
];

export const pageData = {
    pageSizes: [25, 50, 100],
    total: 0,
    limit: 25,
    page: 1
};
