export const searchParams = {userName: '', startTime: '', endTime: ''};
export const searchList = [
    {key: 'userName', type: 'input', placeholder: '用户名'},
    {key: 'startTime', type: 'time', title: '开始时间'},
    {key: 'endTime', type: 'time', title: '结束时间'},
    {key: 'search', type: 'search'}
];
export const columns = {
    type: 'index',
    list: [
        {key: 'userName', prop: 'userName', label: '用户名', slot: 'userName', fixed: true},
        {key: 'nickName', prop: 'nickName', label: '别名'},
        {key: 'times', prop: 'times', label: '投注次数'},
        {key: 'totalMoney', prop: 'totalMoney', label: '下注金额'},
        {key: 'userTotalProfit', prop: 'userTotalProfit', label: '输赢金额', slot: 'userTotalProfit'},
        {key: 'totalWashProfit', prop: 'totalWashProfit', label: '洗码量'},
        {key: 'liveWash', prop: 'liveWash', label: '真人洗码', slot: 'liveWash'},
        {key: 'commission', prop: 'commission', label: '洗码佣金'},
        {key: 'liveOccupy', prop: 'liveOccupy', label: '真人占成', slot: 'liveOccupy'},
        {key: 'totalBalance', prop: 'totalBalance', label: '总金额', slot: 'totalBalance'},
        {key: 'lastProfit', prop: 'lastProfit', label: '缴上家利润'}
    ]
};
export const pageData = {
    pageSizes: [10, 30, 50],
    total: 0,
    limit: 10,
    page: 1
};

export const columnsDown = {
    type: 'index',
    list: [
        {key: 'userName', prop: 'userName', label: '用户名', slot: 'userName', fixed: true},
        {key: 'nickName', prop: 'nickName', label: '别名'},
        {key: 'times', prop: 'times', label: '投注次数'},
        {key: 'totalMoney', prop: 'totalMoney', label: '下注金额'},
        {key: 'userTotalProfit', prop: 'userTotalProfit', label: '输赢金额', slot: 'userTotalProfit'},
        {key: 'totalWashProfit', prop: 'totalWashProfit', label: '洗码量'},
        {key: 'liveWash', prop: 'liveWash', label: '真人洗码(%)', slot: 'liveWash'},
        {key: 'commission', prop: 'commission', label: '洗码佣金'},
        {key: 'totalBalance', prop: 'totalBalance', label: '总金额', slot: 'totalBalance'}
    ]
};
export const pageDataDown = {
    pageSizes: [10, 30, 50],
    total: 0,
    limit: 10,
    page: 1
};

export const captionData = {
    title: '报表规则说明',
    type: 'prompt',
    message: '<div style="text-align: left">1、每天：开始时间是从00:00::00至23:59:59，其他时间段也是按此格式。<br><br>2、每周：从当前时间所在周的周一至周日。<br><br>3、每月：从当前时间所在月的第一周的星期一往后推算4个星期的星期一。<br><br>4、洗码佣金：洗码量 “乘” 洗码占成比 = 洗码佣金 （注：如中途有修改洗码比，报表会按生成注单时洗码比来计算！）<br><br>5、总金额：会员输赢金额 “加” 洗码佣金 = 总金额<br><br>6、缴上家利润：总金额 “乘” 当前账号占成比 = 缴上家利润<br><br>7、洗码量：只有当用户下注以下几类“庄对”、“闲对”、“和”之外的下注类型发生输赢时方才计算。<br><br>8、占成比：（注：如中途有修改占成比，报表会按生成注单时占成比来计算！）</div>'
};
